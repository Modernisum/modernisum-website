import { NextResponse } from "next/server";
import {
  fetchShowcaseScreens,
  saveShowcaseScreen,
  deleteShowcaseScreen,
  reorderShowcaseScreens,
  DesktopScreenItem,
} from "@/lib/firestore/showcase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const product = searchParams.get("product") || "school";
    const data = await fetchShowcaseScreens(product);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch showcase screens" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Reorder mode
    if (body.action === "reorder" && Array.isArray(body.orderedIds)) {
      const ok = await reorderShowcaseScreens(body.orderedIds);
      return NextResponse.json({ success: ok });
    }

    // Save/update item
    const item: DesktopScreenItem = body;
    if (!item.id || !item.title) {
      return NextResponse.json(
        { success: false, error: "Screen ID and Title are required" },
        { status: 400 }
      );
    }

    const ok = await saveShowcaseScreen(item);
    return NextResponse.json({ success: ok, item });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save showcase screen" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Screen ID is required" },
        { status: 400 }
      );
    }

    const ok = await deleteShowcaseScreen(id);
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete showcase screen" },
      { status: 500 }
    );
  }
}
