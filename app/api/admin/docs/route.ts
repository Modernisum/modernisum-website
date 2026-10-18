import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, data: [] });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, category, title, overview } = body;

    if (!slug || !title || !category || !overview) {
      return NextResponse.json(
        { success: false, message: "Slug, title, category, and overview are required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Documentation article "${title}" saved successfully.`,
      data: body,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save doc article" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug parameter is required." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Doc article "${slug}" deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete doc article" },
      { status: 500 }
    );
  }
}
