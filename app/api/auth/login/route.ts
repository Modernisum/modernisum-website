import { NextRequest, NextResponse } from "next/server";
import { signToken, setSessionCookie, signVidhyamDesktopToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, identifier: rawId, password, devBypass, scope } = body;

    const identifier = (username || email || rawId || "").trim();

    // 1-Click Dev Mode Bypass for Instant Testing
    if (devBypass) {
      const adminToken = await signToken({
        userId: "admin_super",
        email: "admin@modernisum.com",
        name: "Shivank (Admin)",
        role: "admin",
      });
      await setSessionCookie(adminToken);

      const desktopToken = await signVidhyamDesktopToken({
        userId: "0c177052-63d4-457c-8e90-34c7748caddd",
        schoolId: "cb20fd66-1739-4076-a684-42624f23ebc6",
        role: "school-admin",
      });

      return NextResponse.json({
        success: true,
        token: scope === "desktop" ? desktopToken : adminToken,
        desktopToken,
        user: {
          id: "0c177052-63d4-457c-8e90-34c7748caddd",
          user_id: "0c177052-63d4-457c-8e90-34c7748caddd",
          name: "Shivank (Admin)",
          username: "admin",
          email: "admin@modernisum.com",
          role: "school-admin",
          school_id: "cb20fd66-1739-4076-a684-42624f23ebc6",
        },
        message: "Dev Bypass Authorized: Welcome Super Admin!",
      });
    }

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Username/Email and password are required." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.toLowerCase();
    const cleanEmail = cleanIdentifier.includes("@") ? cleanIdentifier : `${cleanIdentifier}@modernisum.com`;

    // Master Admin Credentials
    const isMasterAdminPassword =
      password === "Shivank2002" ||
      password === "Shivank@2002" ||
      password === "Shivank@2026" ||
      password === "Admin@123" ||
      password === "Password@123";

    const isMasterAdminEmail =
      cleanEmail === "admin@modernisum.com" ||
      cleanEmail === "shivank@modernisum.com" ||
      cleanIdentifier === "admin" ||
      cleanIdentifier === "shivank" ||
      cleanIdentifier.includes("admin") ||
      cleanIdentifier.includes("shivank");

    const role = (isMasterAdminEmail || isMasterAdminPassword || cleanIdentifier.includes("admin")) ? "admin" : "client";
    const name = role === "admin" ? "Shivank (Admin)" : (cleanIdentifier.split("@")[0] || "Client User");
    const userId = "0c177052-63d4-457c-8e90-34c7748caddd";
    const schoolId = "cb20fd66-1739-4076-a684-42624f23ebc6";

    const token = await signToken({
      userId,
      email: cleanEmail,
      name,
      role,
    });
    await setSessionCookie(token);

    const desktopToken = await signVidhyamDesktopToken({
      userId,
      schoolId,
      role: "school-admin",
    });

    return NextResponse.json({
      success: true,
      token: scope === "desktop" ? desktopToken : token,
      desktopToken,
      user: {
        id: userId,
        user_id: userId,
        name,
        email: cleanEmail,
        username: cleanIdentifier.split("@")[0],
        role: "school-admin",
        school_id: schoolId,
      },
      message: role === "admin" ? "Welcome back, Admin!" : "Logged in successfully.",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Login error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
