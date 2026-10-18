import { NextRequest, NextResponse } from "next/server";
import { getPlatformCoupons } from "@/lib/platform-schools-engine";

export async function GET() {
  try {
    const coupons = await getPlatformCoupons();
    return NextResponse.json({ success: true, count: coupons.length, coupons });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, discountPercent, validUntil, maxUses = 50, notes } = body;

    if (!code || !discountPercent || !validUntil) {
      return NextResponse.json(
        { success: false, message: "Code, discount percentage, and expiry date are required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Coupon registered successfully.",
      coupon: { code: code.toUpperCase().trim(), discountPercent, validUntil, maxUses, notes, isActive: true },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create coupon" },
      { status: 500 }
    );
  }
}
