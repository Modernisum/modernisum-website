import { NextResponse } from "next/server";
import { getPlatformAuditLogs } from "@/lib/platform-schools-engine";

export async function GET() {
  try {
    const logs = await getPlatformAuditLogs();
    return NextResponse.json({ success: true, count: logs.length, logs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch audit logs" },
      { status: 500 }
    );
  }
}
