import { NextRequest, NextResponse } from "next/server";
import { signToken, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      avatar = "cyber-astro",
      phone = "",
      address = "",
      interestedProducts = [],
      accountType = "customer",
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const role = cleanEmail.includes("admin") ? "admin" : "client";

    // Save user to Firestore
    try {
      const sanitizedDocId = cleanEmail.replace(/[@.]/g, "_");
      await setDoc(
        doc(db, "users", sanitizedDocId),
        {
          name,
          email: cleanEmail,
          role,
          avatar,
          phone,
          address,
          interestedProducts,
          accountType,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (fsErr) {
      console.warn("⚠️ Firestore user save warning:", fsErr);
    }

    const token = await signToken({
      userId: `user_${Date.now()}`,
      email: cleanEmail,
      name,
      role,
      avatar,
      accountType,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: cleanEmail,
        name,
        email: cleanEmail,
        role,
        avatar,
        phone,
        address,
        interestedProducts,
        accountType,
      },
      message: "Modernisum account successfully created!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Registration error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Registration failed." },
      { status: 500 }
    );
  }
}
