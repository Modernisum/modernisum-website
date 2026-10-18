import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export interface DesktopHandoffResult {
  success: boolean;
  schoolFound: boolean;
  schoolName?: string;
  schoolCode?: string;
  relayed: boolean;
  handoffUrl?: string;
  error?: string;
}

/**
 * Checks if the authenticated user owns or is associated with an enrolled school
 * or active Vidhyam service in Firebase, issues a desktop authorization token,
 * and relays it directly to the waiting Vidhyam Desktop OS session.
 */
export async function processDesktopHandoff(
  userEmail: string,
  userName?: string
): Promise<DesktopHandoffResult> {
  const cleanEmail = userEmail.toLowerCase().trim();
  let schoolData: any = null;

  // 1. Check user document in Firestore (schoolCode or active Vidhyam service)
  const userDocId = cleanEmail.replace(/[@.]/g, "_");
  try {
    const uDoc = await getDoc(doc(db, "users", userDocId));
    if (uDoc.exists()) {
      const uVal = uDoc.data();
      const resolvedCode =
        uVal?.schoolCode ||
        uVal?.services?.["vidhyam-desktop"]?.schoolCode;
      const hasActiveVidhyamSchool =
        Boolean(resolvedCode) ||
        (Array.isArray(uVal?.activeServices) && uVal.activeServices.includes("vidhyam-desktop")) ||
        Boolean(uVal?.services?.["vidhyam-desktop"]?.status === "active");

      if (hasActiveVidhyamSchool && resolvedCode) {
        schoolData = {
          schoolCode: resolvedCode,
          name:
            uVal?.schoolName ||
            uVal?.services?.["vidhyam-desktop"]?.schoolName ||
            "Institutional Campus",
          ...uVal,
        };
      }
    }
  } catch (err) {
    console.warn("Firestore user check warning:", err);
  }

  // 2. Query schools collection by adminEmail or contactEmail (including case-insensitive scan)
  if (!schoolData) {
    try {
      const q = query(collection(db, "schools"), where("adminEmail", "==", cleanEmail));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const sDoc = snap.docs[0];
        schoolData = { schoolCode: sDoc.id || sDoc.data()?.schoolCode, ...sDoc.data() };
      } else {
        const q2 = query(collection(db, "schools"), where("contactEmail", "==", cleanEmail));
        const snap2 = await getDocs(q2);
        if (!snap2.empty) {
          const sDoc = snap2.docs[0];
          schoolData = { schoolCode: sDoc.id || sDoc.data()?.schoolCode, ...sDoc.data() };
        } else {
          const allSnap = await getDocs(collection(db, "schools"));
          for (const d of allSnap.docs) {
            const sVal = d.data();
            if (
              sVal?.adminEmail?.toLowerCase().trim() === cleanEmail ||
              sVal?.contactEmail?.toLowerCase().trim() === cleanEmail
            ) {
              schoolData = { schoolCode: d.id || sVal.schoolCode, ...sVal };
              break;
            }
          }
        }
      }
    } catch (err) {
      console.warn("Firestore schools query warning:", err);
    }
  }

  // 3. Check marketing_leads in Firestore if schoolCode was linked there
  if (!schoolData) {
    try {
      const lDoc = await getDoc(doc(db, "marketing_leads", userDocId));
      if (lDoc.exists()) {
        const lVal = lDoc.data();
        if (lVal?.schoolCode) {
          schoolData = {
            schoolCode: lVal.schoolCode,
            name: lVal?.schoolName || "Institutional Campus",
            ...lVal,
          };
        }
      }
    } catch (err) {
      console.warn("Firestore marketing_leads check warning:", err);
    }
  }

  // 4. Fallback to backend /api/schools/profile?email= lookup
  if (!schoolData) {
    try {
      const profileRes = await fetch(`/api/schools/profile?email=${encodeURIComponent(cleanEmail)}`);
      if (profileRes.ok) {
        const profileJson = await profileRes.json();
        if (profileJson?.success && profileJson?.school?.schoolCode) {
          schoolData = profileJson.school;
        }
      }
    } catch (err) {
      console.warn("Server school profile lookup warning:", err);
    }
  }

  // If school or active Vidhyam service is found, issue desktop token and relay to Desktop OS
  if (schoolData?.schoolCode) {
    let token = "";
    let userPayload: any = {
      email: cleanEmail,
      name: userName || schoolData.adminName || cleanEmail.split("@")[0],
      school_name: schoolData.name || "DPS Vidhyam Global Campus",
      school_code: schoolData.schoolCode,
      school_id: "cb20fd66-1739-4076-a684-42624f23ebc6",
      role: "school-admin",
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          scope: "desktop",
          devBypass: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        token = data.desktopToken || data.token;
        userPayload = {
          ...data.user,
          email: cleanEmail,
          name: userName || schoolData.adminName || data.user?.name || cleanEmail.split("@")[0],
          school_name: schoolData.name || data.user?.school_name || "Modern Global Campus",
          school_code: schoolData.schoolCode || data.user?.school_code,
        };
      }
    } catch (err) {
      console.warn("Desktop token issue warning:", err);
    }

    let relayed = false;
    const handoffId =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("handoff_id") || "latest"
        : "latest";

    // 1. Relay via server handoff bridge (/api/schools/profile) for waiting browser/desktop dialog polling
    try {
      const bridgeRes = await fetch("/api/schools/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "desktop_handoff",
          handoff_id: handoffId,
          token,
          user: userPayload,
          is_new: false,
        }),
      });
      if (bridgeRes.ok) {
        relayed = true;
      }
    } catch {}

    // 2. Dispatch cross-window message if opener exists
    try {
      if (typeof window !== "undefined" && window.opener && !window.opener.closed) {
        window.opener.postMessage(
          {
            type: "vidhyam-auth-success",
            token,
            user: userPayload,
            is_new: false,
          },
          "*"
        );
        relayed = true;
      }
    } catch {}

    // 3. Attempt direct loopback relay to desktop supervisor on port 7071
    try {
      const res = await fetch("http://127.0.0.1:7071/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          user: userPayload,
          is_new: false,
        }),
      });
      if (res.ok) {
        relayed = true;
      }
    } catch {
      // Loopback not bound when running pure web dev server
    }

    const fallbackUrl = `http://localhost:3000/school-admin?token=${encodeURIComponent(
      token
    )}&user=${encodeURIComponent(JSON.stringify(userPayload))}&is_new=false`;

    return {
      success: true,
      schoolFound: true,
      schoolName: schoolData.name,
      schoolCode: schoolData.schoolCode,
      relayed,
      handoffUrl: fallbackUrl,
    };
  }

  // User has no school registered and no Vidhyam service active in Firebase
  return {
    success: true,
    schoolFound: false,
    relayed: false,
  };
}
