import { NextRequest, NextResponse } from "next/server";
import { fetchTelemetryStats, updateTelemetryStats } from "@/lib/firestore/telemetry";

export async function GET() {
  try {
    const stats = await fetchTelemetryStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load telemetry stats" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const updates: Record<string, any> = {};

    if (body.projectsCompleted !== undefined) updates.projectsCompleted = Number(body.projectsCompleted);
    if (body.satisfiedClients !== undefined) updates.satisfiedClients = Number(body.satisfiedClients);
    if (body.itSpecialists !== undefined) updates.itSpecialists = Number(body.itSpecialists);
    if (body.smartSolutions !== undefined) updates.smartSolutions = Number(body.smartSolutions);
    if (body.systemUptime !== undefined) updates.systemUptime = String(body.systemUptime).trim();

    const ok = await updateTelemetryStats(updates);

    return NextResponse.json({
      success: ok,
      message: ok ? "Homepage telemetry metrics updated in database successfully." : "Could not update telemetry.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
