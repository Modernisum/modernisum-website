import { NextRequest, NextResponse } from "next/server";
import {
  getPlatformUsers,
  getPlatformUserStats,
  createPlatformUser,
  updatePlatformUser,
  toggleUserFeaturedOnHome,
  deletePlatformUser,
} from "@/lib/platform-users-engine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || undefined;
    const hasProduct = (searchParams.get("hasProduct") || "all") as "all" | "active_products" | "zero_products";
    const search = searchParams.get("search") || undefined;
    const featured = searchParams.get("featured");

    const featuredFilter = featured === "true" ? true : featured === "false" ? false : undefined;

    const users = await getPlatformUsers({
      role,
      hasProduct,
      search,
      featuredOnHome: featuredFilter,
    });
    const stats = await getPlatformUserStats();

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
      stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const newUser = await createPlatformUser({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || "",
      role: body.role || "lead",
      organization: body.organization?.trim() || "",
      institutionLogo: body.institutionLogo || undefined,
      productsActive: body.productsActive || [],
      totalSpend: Number(body.totalSpend) || 0,
      accountStatus: body.accountStatus || "active",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      lastActive: "Just now",
      source: body.source || "Admin Direct Addition",
      featuredOnHome: Boolean(body.featuredOnHome),
      orderOnHome: body.orderOnHome ? Number(body.orderOnHome) : undefined,
    });

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "Platform user created successfully in database.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, featuredOnHome, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    if (typeof featuredOnHome === "boolean") {
      await toggleUserFeaturedOnHome(id, featuredOnHome);
    }

    if (Object.keys(updates).length > 0) {
      await updatePlatformUser(id, updates);
    }

    return NextResponse.json({
      success: true,
      message: "Platform user updated successfully in database.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update user" },
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
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const ok = await deletePlatformUser(id);
    return NextResponse.json({
      success: ok,
      message: ok ? "Platform user removed from database." : "Could not delete user.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
