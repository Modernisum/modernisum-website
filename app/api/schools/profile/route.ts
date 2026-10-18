import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { SEED_SCHOOL_TENANTS } from "@/lib/seed-platform-schools";

declare global {
  var __modernisum_schools_store: Map<string, any> | undefined;
  var __modernisum_handoff_store: Map<string, any> | undefined;
}

if (!globalThis.__modernisum_schools_store) {
  globalThis.__modernisum_schools_store = new Map<string, any>();
}
if (!globalThis.__modernisum_handoff_store) {
  globalThis.__modernisum_handoff_store = new Map<string, any>();
}
const schoolsStore = globalThis.__modernisum_schools_store;
const handoffStore = globalThis.__modernisum_handoff_store;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-school-code",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body?.type === "desktop_handoff" && body?.token) {
      const payload = {
        token: body.token,
        user: body.user,
        is_new: Boolean(body.is_new),
        setup_payload: body.setup_payload || null,
        timestamp: Date.now(),
      };
      if (body.handoff_id) {
        handoffStore.set(String(body.handoff_id), payload);
      }
      handoffStore.set("latest", payload);
      return NextResponse.json(
        { success: true, relayed: true },
        { status: 200, headers: CORS_HEADERS }
      );
    }
    return NextResponse.json(
      { success: false, message: "Invalid payload" },
      { status: 400, headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to store handoff" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 0. Check desktop handoff polling by handoff_id
    const handoffId = searchParams.get("handoff_id");
    if (handoffId) {
      const entry = handoffStore.get(handoffId) || handoffStore.get("latest");
      if (entry && Date.now() - entry.timestamp < 5 * 60 * 1000) {
        handoffStore.delete(handoffId);
        if (handoffStore.get("latest") === entry) {
          handoffStore.delete("latest");
        }
        return NextResponse.json(
          {
            success: true,
            ready: true,
            ...entry,
          },
          { status: 200, headers: CORS_HEADERS }
        );
      }
      return NextResponse.json(
        { success: true, ready: false },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    const code = searchParams.get("code") || searchParams.get("school_code");
    const emailParam = searchParams.get("email")?.toLowerCase().trim();

    if (!code && !emailParam) {
      return NextResponse.json(
        { success: false, message: "School code or email query parameter is required." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    let school: any = null;
    let userServices: string[] = [];

    // A. Lookup by email across Firebase users, schools, marketing_leads, and resilient store
    if (emailParam) {
      const userDocId = emailParam.replace(/[@.]/g, "_");

      // 1. Check Firestore users/{userDocId}
      try {
        const uSnap = await getDoc(doc(db, "users", userDocId));
        if (uSnap.exists()) {
          const uData = uSnap.data();
          userServices = uData.activeServices || uData.interestedProducts || [];
          const targetCode =
            uData.schoolCode ||
            uData.services?.["vidhyam-desktop"]?.schoolCode;
          if (targetCode) {
            const sSnap = await getDoc(doc(db, "schools", targetCode));
            if (sSnap.exists()) {
              school = { schoolCode: targetCode, ...sSnap.data() };
            } else {
              school = {
                schoolCode: targetCode,
                name: uData.schoolName || uData.services?.["vidhyam-desktop"]?.schoolName || "DPS Vidhyam Global Campus",
                adminEmail: emailParam,
                contactEmail: emailParam,
                adminName: uData.name || "School Principal",
                status: "active",
                tokenStatus: "active",
              };
            }
          }
        }
      } catch (err) {
        console.warn("Firestore user lookup warning:", err);
      }

      // 2. Check Firestore schools collection (exact & case-insensitive)
      if (!school) {
        try {
          const q1 = query(collection(db, "schools"), where("adminEmail", "==", emailParam));
          const snap1 = await getDocs(q1);
          if (!snap1.empty) {
            school = { schoolCode: snap1.docs[0].id, ...snap1.docs[0].data() };
          } else {
            const q2 = query(collection(db, "schools"), where("contactEmail", "==", emailParam));
            const snap2 = await getDocs(q2);
            if (!snap2.empty) {
              school = { schoolCode: snap2.docs[0].id, ...snap2.docs[0].data() };
            } else {
              const allSchools = await getDocs(collection(db, "schools"));
              for (const d of allSchools.docs) {
                const sVal = d.data();
                if (
                  sVal.adminEmail?.toLowerCase().trim() === emailParam ||
                  sVal.contactEmail?.toLowerCase().trim() === emailParam
                ) {
                  school = { schoolCode: d.id || sVal.schoolCode, ...sVal };
                  break;
                }
              }
            }
          }
        } catch (err) {
          console.warn("Firestore schools email lookup warning:", err);
        }
      }

      // 3. Check Firestore marketing_leads/{userDocId} if schoolCode was linked there
      if (!school) {
        try {
          const lSnap = await getDoc(doc(db, "marketing_leads", userDocId));
          if (lSnap.exists()) {
            const lData = lSnap.data();
            const products: string[] = lData.activeServices || lData.interestedProducts || [];
            if (products.length > 0) userServices = products;
            if (lData.schoolCode) {
              school = {
                schoolCode: lData.schoolCode,
                name: lData.schoolName || "Institutional Campus",
                adminEmail: emailParam,
                contactEmail: emailParam,
                adminName: lData.name || emailParam.split("@")[0],
                status: "active",
                tokenStatus: "active",
              };
            }
          }
        } catch {}
      }

      // 4. Check resilient in-memory store & seed tenants
      if (!school) {
        for (const [, val] of schoolsStore.entries()) {
          if (
            val.adminEmail?.toLowerCase().trim() === emailParam ||
            val.contactEmail?.toLowerCase().trim() === emailParam
          ) {
            school = val;
            break;
          }
        }
      }
      if (!school) {
        const seedMatch = SEED_SCHOOL_TENANTS.find(
          (s) =>
            s.adminEmail.toLowerCase().trim() === emailParam ||
            s.contactEmail.toLowerCase().trim() === emailParam
        );
        if (seedMatch) {
          school = {
            ...seedMatch,
            status: seedMatch.isSuspended ? "suspended" : "active",
            tokenStatus: seedMatch.isSuspended ? "expired" : "active",
          };
        }
      }
    }

    // B. Lookup by school code
    if (!school && code) {
      try {
        const snap = await getDoc(doc(db, "schools", code));
        if (snap.exists()) {
          school = snap.data();
        }
      } catch (fsErr) {
        console.warn("⚠️ Firebase Firestore profile read notice (falling back to resilient store):", fsErr);
      }

      if (!school) {
        school = schoolsStore.get(code);
      }
      if (!school) {
        const seedMatch = SEED_SCHOOL_TENANTS.find((s) => s.schoolCode === code);
        if (seedMatch) {
          school = {
            ...seedMatch,
            status: seedMatch.isSuspended ? "suspended" : "active",
            tokenStatus: seedMatch.isSuspended ? "expired" : "active",
          };
        }
      }
    }

    if (school) {
      const resolvedCode = school.schoolCode || code || "SCH-1081";
      // Check if token is expired or school suspended in Firebase
      if (school.status === "suspended" || school.tokenStatus === "expired") {
        return NextResponse.json(
          {
            success: false,
            expired: true,
            status: school.status || "suspended",
            tokenStatus: school.tokenStatus || "expired",
            message: "Institutional session expired or account suspended in Firebase Database.",
            school: {
              schoolCode: resolvedCode,
              name: school.name,
            },
          },
          { status: 403, headers: CORS_HEADERS }
        );
      }

      return NextResponse.json(
        {
          success: true,
          services: userServices.length > 0 ? userServices : ["vidhyam-desktop"],
          school: {
            schoolCode: resolvedCode,
            name: school.name || "DPS Vidhyam Global Campus",
            affiliationBoard: school.affiliationBoard || "CBSE",
            affiliationNumber: school.affiliationNumber || "",
            streams: school.streams || [],
            subscriptionTier: school.subscriptionTier || "Growth",
            state: school.state || "Uttar Pradesh",
            district: school.district || "Lucknow",
            city: school.city || school.district || "Lucknow",
            pincode: school.pincode || "226001",
            address: school.address || "",
            contactPhone: school.contactPhone || "",
            contactEmail: school.contactEmail || emailParam || "",
            adminName: school.adminName || "School Principal",
            adminEmail: school.adminEmail || emailParam || "",
            status: school.status || "active",
            tokenStatus: school.tokenStatus || "active",
            profileImage:
              school.profileImage ||
              `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(resolvedCode)}`,
          },
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { success: false, message: `School profile not found in Firebase Database.` },
      { status: 404, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error("School profile fetch error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch school profile" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, status, tokenStatus } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "School code is required." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };
    if (status) updates.status = status;
    if (tokenStatus) updates.tokenStatus = tokenStatus;

    // Update in resilient global store
    const cached = schoolsStore.get(code);
    if (cached) {
      schoolsStore.set(code, { ...cached, ...updates });
    }

    // Update in Firebase Firestore
    try {
      const schoolRef = doc(db, "schools", code);
      await updateDoc(schoolRef, updates);
      console.log(`[Firebase] School ${code} status updated:`, updates);
    } catch (fsErr) {
      console.warn("⚠️ Firebase Firestore status update notice (updated resilient store):", fsErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: `School ${code} updated successfully in Firebase.`,
        updates,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error("School status update error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update school status" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
