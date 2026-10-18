import { NextRequest, NextResponse } from "next/server";
import { submitEnquiry, fetchAllEnquiries } from "@/lib/firestore/enquiries";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      serviceNeeded,
      service,
      budgetRange,
      budget,
      projectDescription,
      message,
      quotationDetails,
      orderId,
      referenceUrl,
      surfaces,
      features,
      projectState,
      tasks,
      milestones,
      couponCode,
      discountAmount,
      partnerCommission,
      tokenPaid,
      tokenAmount,
      totalFixedPrice,
      estimatedDays,
    } = body;

    const finalDescription = (projectDescription || message || "").trim();
    const finalService = (serviceNeeded || service || "Custom Software Sprint").trim();
    const finalBudget = (budgetRange || budget || "Guaranteed Fixed Price").trim();

    if (!name || !email || !finalDescription) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email, Description)." },
        { status: 400, headers: corsHeaders }
      );
    }

    const { id, orderId: generatedOrderId } = await submitEnquiry({
      orderId: orderId || undefined,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      serviceNeeded: finalService,
      budgetRange: finalBudget,
      projectDescription: finalDescription,
      projectState: projectState || "new",
      referenceUrl: referenceUrl ? referenceUrl.trim() : "",
      surfaces: Array.isArray(surfaces) ? surfaces : [],
      features: Array.isArray(features) ? features : [],
      tasks: Array.isArray(tasks) ? tasks : (quotationDetails?.tasks || []),
      milestones: Array.isArray(milestones) ? milestones : (quotationDetails?.milestones || []),
      couponCode: couponCode || "",
      discountAmount: Number(discountAmount) || 0,
      partnerCommission: Number(partnerCommission) || 0,
      tokenPaid: Boolean(tokenPaid),
      tokenAmount: Number(tokenAmount) || 0,
      totalFixedPrice: Number(totalFixedPrice) || (quotationDetails?.totalCost || 0),
      estimatedDays: Number(estimatedDays) || (quotationDetails?.expeditedDays || quotationDetails?.standardDays || 14),
      status: "new",
      quotationDetails: quotationDetails || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your official quotation blueprint has been registered. Order ID generated.",
        id,
        orderId: generatedOrderId,
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Enquiry submission error:", err);
    return NextResponse.json(
      { success: false, message: "An error occurred while submitting your enquiry." },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await fetchAllEnquiries();
    return NextResponse.json({ success: true, data: enquiries }, { headers: corsHeaders });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: corsHeaders });
  }
}
