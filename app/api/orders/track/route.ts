import { NextRequest, NextResponse } from "next/server";
import { fetchEnquiryByOrderId } from "@/lib/firestore/enquiries";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId") || searchParams.get("query") || "";

    if (!orderId.trim()) {
      return NextResponse.json(
        { success: false, message: "Order ID or Email is required." },
        { status: 400 }
      );
    }

    const order = await fetchEnquiryByOrderId(orderId.trim());

    if (!order) {
      return NextResponse.json(
        { success: false, message: `No active project found matching "${orderId.trim()}". Please check your Order ID or contact support.` },
        { status: 404 }
      );
    }

    // Sanitize and return public tracking data
    const trackingData = {
      orderId: order.orderId || order.id,
      clientName: order.name,
      clientEmail: order.email,
      serviceNeeded: order.serviceNeeded,
      status: order.status || "new",
      projectState: order.projectState || "new",
      referenceUrl: order.referenceUrl || "",
      surfaces: order.surfaces || [],
      features: order.features || [],
      progressPct: order.progressPct ?? 0,
      totalFixedPrice: order.totalFixedPrice ?? order.quotationDetails?.totalCost ?? 0,
      estimatedDays: order.estimatedDays ?? order.quotationDetails?.expeditedDays ?? order.quotationDetails?.standardDays ?? 14,
      approvedStartDate: order.approvedStartDate || null,
      slaDeliveryDate: order.slaDeliveryDate || null,
      assignedPod: order.assignedPod || "Dedicated AI Engineering Pod",
      tasks: order.tasks || order.quotationDetails?.tasks || [],
      milestones: order.milestones || order.quotationDetails?.milestones || [],
      screenshots: order.screenshots || [],
      meetingUrl: order.meetingUrl || null,
      tokenPaid: Boolean(order.tokenPaid),
      tokenAmount: order.tokenAmount || 0,
      advancePaid: Boolean(order.advancePaid),
      createdAt: order.createdAt,
    };

    return NextResponse.json({
      success: true,
      data: trackingData,
    });
  } catch (error: any) {
    console.error("❌ Order tracking route error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order tracking status." },
      { status: 500 }
    );
  }
}
