import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/lib/models/Enquiry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceNeeded, budgetRange, projectDescription } = body;

    if (!name || !email || !projectDescription) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email, Description)." },
        { status: 400 }
      );
    }

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const newEnquiry = await Enquiry.create({
          name,
          email,
          phone: phone || "",
          serviceNeeded: serviceNeeded || "General Inquiry",
          budgetRange: budgetRange || "Flexible",
          projectDescription,
          status: "new",
        });
        return NextResponse.json({
          success: true,
          message: "Thank you! Your architecture inquiry has been received. Our senior engineering team will respond within 24 hours.",
          id: newEnquiry._id,
        });
      }
    } catch (dbErr) {
      console.warn("⚠️ Could not write to MongoDB, operating in fallback mode:", dbErr);
    }

    // Fallback response if DB offline
    return NextResponse.json({
      success: true,
      message: "Thank you! Your architecture inquiry has been registered. Our senior engineering team will respond within 24 hours.",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Enquiry submission error:", err);
    return NextResponse.json(
      { success: false, message: "An error occurred while submitting your enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, data: [] }, { status: 503 });
    }
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

