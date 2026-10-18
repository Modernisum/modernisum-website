import { NextRequest, NextResponse } from "next/server";
import { updateEnquiryOrder } from "@/lib/firestore/enquiries";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;

    if (!id || !updates || typeof updates !== "object") {
      return NextResponse.json(
        { success: false, message: "Order ID and updates payload are required." },
        { status: 400 }
      );
    }

    const success = await updateEnquiryOrder(id, updates);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to update order in database." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order successfully updated.",
    });
  } catch (error: any) {
    console.error("❌ Order update route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error updating order." },
      { status: 500 }
    );
  }
}
