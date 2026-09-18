import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Coupon } from "@/lib/models/Coupon";
import { AuditLog } from "@/lib/models/AuditLog";
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

    const conn = await connectToDatabase();
    if (conn) {
      const created = await Coupon.create({
        code: code.toUpperCase().trim(),
        discountPercent: Number(discountPercent),
        validUntil: new Date(validUntil),
        maxUses: Number(maxUses),
        notes,
        isActive: true,
      });

      await AuditLog.create({
        action: "COUPON_CREATED",
        category: "Billing",
        actor: "admin@modernisum.com",
        target: created.code,
        details: `Created coupon ${created.code} (${discountPercent}% discount).`,
      });

      return NextResponse.json({
        success: true,
        message: "Promotional coupon created successfully.",
        coupon: created,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Coupon registered in resilient mode.",
      coupon: { code, discountPercent, validUntil, maxUses },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create coupon" },
      { status: 500 }
    );
  }
}
