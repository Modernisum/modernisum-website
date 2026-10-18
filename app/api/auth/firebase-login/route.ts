import { NextRequest, NextResponse } from "next/server";
import { signToken, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, photoURL, uid, interestedProducts } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Valid email is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = (name && name.trim()) || cleanEmail.split("@")[0] || "Explorer";
    const role = cleanEmail.includes("admin") ? "admin" : "client";

    // 1. Marketing Lead & User Capture into Firestore
    try {
      const sanitizedDocId = cleanEmail.replace(/[@.]/g, "_");
      const userRef = doc(db, "users", sanitizedDocId);
      await setDoc(
        userRef,
        {
          email: cleanEmail,
          name: cleanName,
          photoURL: photoURL || null,
          uid: uid || null,
          role,
          provider: "firebase_auth",
          interestedProducts: interestedProducts || ["vidhyam-desktop"],
          lastActive: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (fsErr) {
      console.warn("⚠️ Non-blocking Firestore user sync warning:", fsErr);
    }

    // 2. Issue Unified Session JWT & HTTP-Only Cookie
    const token = await signToken({
      userId: uid || "fb_" + Date.now(),
      email: cleanEmail,
      name: cleanName,
      role: role as "admin" | "member" | "client",
      avatar: photoURL || "cyber-astro",
      accountType: "customer",
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: uid || cleanEmail,
        name: cleanName,
        email: cleanEmail,
        role,
        avatar: photoURL || "cyber-astro",
        photoURL: photoURL || undefined,
      },
      message: "Firebase authentication completed successfully.",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Firebase login endpoint error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process Firebase login." },
      { status: 500 }
    );
  }
}
