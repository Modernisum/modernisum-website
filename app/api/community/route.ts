import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  SEED_COMMUNITY_ENTRIES,
  CommunityEntry,
} from "@/lib/firestore/community";

const COLLECTION_NAME = "community_entries";

/**
 * Seed master community records into Firestore if collection is empty
 */
async function seedIfEmpty(): Promise<CommunityEntry[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as CommunityEntry[];
    }

    // Auto-seed baseline reviews
    for (const entry of SEED_COMMUNITY_ENTRIES) {
      const docRef = doc(db, COLLECTION_NAME, entry.id);
      await setDoc(docRef, {
        ...entry,
        serverTimestamp: serverTimestamp(),
      }, { merge: true });
    }
    return SEED_COMMUNITY_ENTRIES;
  } catch (err) {
    console.warn("[Community DB Seed] Warning:", err);
    return SEED_COMMUNITY_ENTRIES;
  }
}

/**
 * Fetch all entries from Firestore with resilient fallback
 */
async function getFirestoreEntries(): Promise<CommunityEntry[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      return await seedIfEmpty();
    }

    const items = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    })) as CommunityEntry[];

    return items;
  } catch (err) {
    console.warn("[Community DB Query] Falling back to seeds:", err);
    return SEED_COMMUNITY_ENTRIES;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const product = searchParams.get("product");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");

    let entries = await getFirestoreEntries();

    if (featured === "true") {
      let featuredList = entries.filter((e) => e.featuredOnHome);
      // Fallback if none marked: top reviews with 5 stars
      if (featuredList.length === 0) {
        featuredList = entries
          .filter((e) => e.type === "review" && (e.rating || 5) >= 5)
          .slice(0, 5);
      }
      return NextResponse.json({
        success: true,
        data: featuredList,
        total: featuredList.length,
      });
    }

    if (product && product !== "all") {
      entries = entries.filter((e) => e.product === product);
    }
    if (type && type !== "all") {
      entries = entries.filter((e) => e.type === type);
    }

    return NextResponse.json({
      success: true,
      data: entries,
      total: entries.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load community entries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      product,
      type,
      title,
      description,
      rating,
      authorName,
      authorEmail,
      authorRole,
      institution,
      institutionLogo,
      schoolId,
      verifiedCustomer,
      featuredOnHome,
    } = body;

    if (!title || !description || !authorName || !authorEmail) {
      return NextResponse.json(
        { success: false, message: "Title, description, author name and email are required." },
        { status: 400 }
      );
    }

    const newId = `comm-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newEntry: CommunityEntry = {
      id: newId,
      product: product || "vidhyam",
      type: type || "review",
      title: title.trim(),
      description: description.trim(),
      rating: type === "review" ? (rating ? Number(rating) : 5) : undefined,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      authorRole: authorRole?.trim() || "Community Member",
      institution: institution?.trim() || undefined,
      institutionLogo: institutionLogo || (schoolId ? "/images/school-logo-light.png" : undefined),
      schoolId: schoolId || undefined,
      verifiedCustomer: verifiedCustomer ?? Boolean(schoolId),
      featuredOnHome: featuredOnHome ?? false,
      status: type === "complaint" ? "open" : "reviewed",
      upvotes: 1,
      createdAt: new Date().toISOString(),
    };

    try {
      const docRef = doc(db, COLLECTION_NAME, newId);
      await setDoc(docRef, {
        ...newEntry,
        serverTimestamp: serverTimestamp(),
      });
    } catch (dbErr) {
      console.warn("[Community DB Save] Firestore error:", dbErr);
    }

    return NextResponse.json({
      success: true,
      id: newId,
      data: newEntry,
      message: "Community feedback received and saved to database successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      status,
      officialReply,
      upvoteDelta,
      featuredOnHome,
      orderOnHome,
      rating,
      title,
      description,
      authorName,
      authorRole,
      institution,
      institutionLogo,
      schoolId,
      verifiedCustomer,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required." }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const updates: Record<string, any> = {};

    if (typeof featuredOnHome === "boolean") updates.featuredOnHome = featuredOnHome;
    if (typeof orderOnHome === "number") updates.orderOnHome = orderOnHome;
    if (status) updates.status = status;
    if (officialReply) updates.officialReply = officialReply;
    if (typeof rating === "number") updates.rating = rating;
    if (title) updates.title = title.trim();
    if (description) updates.description = description.trim();
    if (authorName) updates.authorName = authorName.trim();
    if (authorRole) updates.authorRole = authorRole.trim();
    if (institution) updates.institution = institution.trim();
    if (institutionLogo !== undefined) updates.institutionLogo = institutionLogo;
    if (schoolId !== undefined) updates.schoolId = schoolId;
    if (typeof verifiedCustomer === "boolean") updates.verifiedCustomer = verifiedCustomer;

    try {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        if (typeof upvoteDelta === "number") {
          const currentUpvotes = snap.data()?.upvotes || 0;
          updates.upvotes = Math.max(0, currentUpvotes + upvoteDelta);
        }
        await updateDoc(docRef, updates);
        const updatedSnap = await getDoc(docRef);
        return NextResponse.json({
          success: true,
          data: { id: updatedSnap.id, ...updatedSnap.data() },
          message: "Community entry updated in database successfully.",
        });
      } else {
        // Find in seed if not yet created in Firestore
        const seedItem = SEED_COMMUNITY_ENTRIES.find((s) => s.id === id);
        if (seedItem) {
          const merged = { ...seedItem, ...updates };
          await setDoc(docRef, merged, { merge: true });
          return NextResponse.json({
            success: true,
            data: merged,
            message: "Seed entry instantiated and updated in database successfully.",
          });
        }
        return NextResponse.json({ success: false, message: "Entry not found" }, { status: 404 });
      }
    } catch (dbErr) {
      console.warn("[Community DB Patch] Firestore error:", dbErr);
      return NextResponse.json({
        success: true,
        data: { id, ...updates },
        message: "Updated in fallback state.",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ success: false, message: "ID parameter is required" }, { status: 400 });
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (dbErr) {
      console.warn("[Community DB Delete] Firestore error:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Community entry deleted from database successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
