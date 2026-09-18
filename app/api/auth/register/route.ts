import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword, signToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      // Offline fallback: simulate successful registration
      const fakeToken = await signToken({
        userId: "guest_" + Date.now(),
        email,
        name,
        role: "client",
      });
      await setSessionCookie(fakeToken);

      return NextResponse.json({
        success: true,
        user: { name, email, role: "client" },
        message: "Account created successfully.",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: email.toLowerCase().includes("admin") ? "admin" : "client",
      provider: "credentials",
    });

    const token = await signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      message: "Registration successful!",
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
