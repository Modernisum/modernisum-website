import { NextResponse } from "next/server";
import { getPlatformFleetStats } from "@/lib/platform-schools-engine";

export async function GET() {
  try {
    const stats = await getPlatformFleetStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch platform stats" },
      { status: 500 }
    );
  }
}
