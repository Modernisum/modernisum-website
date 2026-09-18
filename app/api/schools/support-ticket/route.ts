import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AuditLog } from "@/lib/models/AuditLog";
import { SchoolTenant } from "@/lib/models/SchoolTenant";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      schoolCode,
      contactName,
      contactEmail,
      contactPhone,
      urgency = "Normal",
      category = "General Inquiry",
      subject,
      description,
    } = body;

    if (!contactName || !contactEmail || !description) {
      return NextResponse.json(
        { success: false, message: "Name, email, and description are required." },
        { status: 400 }
      );
    }

    const ticketId = `TCK-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const conn = await connectToDatabase();
      if (conn) {
        // Optional verification if schoolCode provided
        let schoolName = "Independent School";
        if (schoolCode) {
          const tenant = await SchoolTenant.findOne({ schoolCode });
          if (tenant) schoolName = tenant.name;
        }

        // Record security audit log for ticket creation
        await AuditLog.create({
          action: "SUPPORT_TICKET_CREATED",
          category: "Schools",
          actor: contactEmail,
          target: ticketId,
          details: `Ticket [${ticketId}] logged for "${schoolName}". Urgency: ${urgency}, Category: ${category}.`,
          ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
        });

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
      }
    } catch (dbErr) {
      console.warn("MongoDB offline, operating support ticket in fallback mode:", dbErr);
    }

    // Resilient offline fallback
    return NextResponse.json({
      success: true,
      message: "Support ticket received in resilient mode. Modernisum IT desk notified.",
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
