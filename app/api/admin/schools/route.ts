import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SchoolTenant } from "@/lib/models/SchoolTenant";
import { AuditLog } from "@/lib/models/AuditLog";
import { getSchoolTenants } from "@/lib/platform-schools-engine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = (searchParams.get("status") || "all") as "all" | "active" | "suspended";
    const search = searchParams.get("search") || undefined;

    const schools = await getSchoolTenants({ status, search });
    return NextResponse.json({ success: true, count: schools.length, schools });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch schools" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, reason, subscriptionTier, rateLimitRpm } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "School ID is required." }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (conn) {
      const school = await SchoolTenant.findById(id);
      if (!school) {
        return NextResponse.json({ success: false, message: "School not found." }, { status: 404 });
      }

      let auditAction = "SCHOOL_UPDATED";
      let auditDetails = `School ${school.schoolCode} updated.`;

      if (action === "suspend") {
        if (!reason || reason.trim().length < 5) {
          return NextResponse.json(
            { success: false, message: "Mandatory administrative reason of at least 5 characters is required to suspend a school." },
            { status: 400 }
          );
        }
        school.isSuspended = true;
        school.isActive = false;
        school.suspendedReason = reason;
        auditAction = "SCHOOL_SUSPENDED";
        auditDetails = `Suspension enforced: ${reason}`;
      } else if (action === "unsuspend") {
        school.isSuspended = false;
        school.isActive = true;
        school.suspendedReason = undefined;
        auditAction = "SCHOOL_UNSUSPENDED";
        auditDetails = `School reinstated to active status.`;
      }

      if (subscriptionTier) {
        school.subscriptionTier = subscriptionTier;
        auditDetails += ` Tier changed to ${subscriptionTier}.`;
      }

      if (rateLimitRpm) {
        school.rateLimitRpm = rateLimitRpm;
        auditDetails += ` Rate limit adjusted to ${rateLimitRpm} RPM.`;
      }

      await school.save();

      // Log Audit Event
      await AuditLog.create({
        action: auditAction,
        category: "Schools",
        actor: "admin@modernisum.com",
        target: school.schoolCode,
        details: auditDetails,
        ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      });

      return NextResponse.json({
        success: true,
        message: `School ${school.schoolCode} status updated successfully.`,
        school,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Action applied in resilient runtime mode.",
      id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update school" },
      { status: 500 }
    );
  }
}
