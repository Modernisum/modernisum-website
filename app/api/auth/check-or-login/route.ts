import { NextRequest, NextResponse } from "next/server";
import { signToken, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Master Admin Shortcut (Immediate login)
    const isMasterAdminPassword =
      password === "Shivank2002" ||
      password === "Shivank@2002" ||
      password === "Shivank@2026" ||
      password === "Admin@123";

    const isMasterAdminEmail =
      cleanEmail === "admin@modernisum.com" ||
      cleanEmail === "shivank@modernisum.com" ||
      cleanEmail.includes("admin") ||
      cleanEmail.includes("shivank");

    if (
      isMasterAdminPassword ||
      (isMasterAdminEmail && (cleanEmail === "admin@modernisum.com" || isMasterAdminPassword))
    ) {
      const adminToken = await signToken({
        userId: "admin_super",
        email: cleanEmail.includes("@") ? cleanEmail : "admin@modernisum.com",
        name: "Shivank (Admin)",
        role: "admin",
        avatar: "cyber-astro",
        accountType: "school_admin",
      });
      await setSessionCookie(adminToken);

      return NextResponse.json({
        success: true,
        status: "logged_in",
        user: {
          name: "Shivank (Admin)",
          email: cleanEmail.includes("@") ? cleanEmail : "admin@modernisum.com",
          role: "admin",
          avatar: "cyber-astro",
          accountType: "school_admin",
        },
        message: "Welcome back, Admin!",
      });
    }

    // Check Firestore user profile
    try {
      const sanitizedDocId = cleanEmail.replace(/[@.]/g, "_");
      const userDoc = await getDoc(doc(db, "users", sanitizedDocId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role || (cleanEmail.includes("admin") ? "admin" : "client");
        const token = await signToken({
          userId: userDoc.id,
          email: cleanEmail,
          name: userData.name || cleanEmail.split("@")[0],
          role,
          avatar: userData.photoURL || "cyber-astro",
        });
        await setSessionCookie(token);

        return NextResponse.json({
          success: true,
          status: "logged_in",
          user: {
            id: userDoc.id,
            name: userData.name || cleanEmail.split("@")[0],
            email: cleanEmail,
            role,
          },
          message: "Welcome back!",
        });
      }
    } catch (fsErr) {
      console.warn("⚠️ Firestore user lookup warning:", fsErr);
    }

    // Default seamless login for testing / client
    const role = cleanEmail.includes("admin") ? "admin" : "client";
    const name = cleanEmail.split("@")[0] || "Explorer";
    const token = await signToken({
      userId: `user_${Date.now()}`,
      email: cleanEmail,
      name,
      role,
      avatar: "cyber-astro",
    });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      status: "logged_in",
      user: {
        id: cleanEmail,
        name,
        email: cleanEmail,
        role,
      },
      message: `Welcome, ${name}!`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ check-or-login error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Authentication check failed." },
      { status: 500 }
    );
  }
}
