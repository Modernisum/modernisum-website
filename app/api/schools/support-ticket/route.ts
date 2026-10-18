import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      schoolCode,
      contactName,
      contactEmail,
      urgency = "Normal",
      category = "General Inquiry",
      description,
    } = body;

    if (!contactName || !contactEmail || !description) {
      return NextResponse.json(
        { success: false, message: "Name, email, and description are required." },
        { status: 400 }
      );
    }

    const ticketId = `TCK-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json({
      success: true,
      message: "Support ticket registered. A Modernisum engineer will contact you shortly.",
      ticket: {
        ticketId,
        schoolCode: schoolCode || "N/A",
        urgency,
        category,
        status: "OPEN",
      },
    });
  } catch (error: any) {
    console.error("Support ticket error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit ticket" },
      { status: 500 }
    );
  }
}
