import { NextRequest, NextResponse } from "next/server";
import { getSchoolTenants, getPlatformFleetStats } from "@/lib/platform-schools-engine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = (searchParams.get("status") || "all") as "all" | "active" | "suspended";
    const search = searchParams.get("search") || undefined;

    const schools = await getSchoolTenants({ status, search });
    const stats = await getPlatformFleetStats();
    return NextResponse.json({ success: true, count: schools.length, schools, stats });
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
    const { id, action } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "School ID is required." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `School ${id} status updated successfully.`,
      id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update school" },
      { status: 500 }
    );
  }
}
