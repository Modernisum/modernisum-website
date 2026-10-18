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
    const { name, email, phone, serviceNeeded, service, budgetRange, budget, projectDescription, message, quotationDetails } = body;

    const finalDescription = (projectDescription || message || "").trim();
    const finalService = (serviceNeeded || service || "General Inquiry").trim();
    const finalBudget = (budgetRange || budget || "Flexible").trim();

    if (!name || !email || !finalDescription) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email, Description)." },
        { status: 400, headers: corsHeaders }
      );
    }

    const id = await submitEnquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      serviceNeeded: finalService,
      budgetRange: finalBudget,
      projectDescription: finalDescription,
      status: "new",
      quotationDetails: quotationDetails || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your inquiry has been received. Our support team will respond shortly.",
        id,
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
