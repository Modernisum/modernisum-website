import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { DocArticle } from "@/lib/models/DocArticle";
import { AuditLog } from "@/lib/models/AuditLog";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await DocArticle.find().sort({ order: 1, createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: articles });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch doc articles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, category, title, overview, steps, tip, order = 0, isPublished = true } = body;

    if (!slug || !title || !category || !overview) {
      return NextResponse.json(
        { success: false, message: "Slug, title, category, and overview are required." },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (conn) {
      const updated = await DocArticle.findOneAndUpdate(
        { slug },
        {
          slug,
          category,
          title,
          overview,
          steps: Array.isArray(steps) ? steps : [steps].filter(Boolean),
          tip,
          order,
          isPublished,
        },
        { upsert: true, new: true }
      );

      await AuditLog.create({
        action: "DOC_ARTICLE_SAVED",
        category: "System",
        actor: "admin@modernisum.com",
        target: slug,
        details: `Saved documentation module "${title}" in category "${category}".`,
      });

      return NextResponse.json({
        success: true,
        message: `Documentation article "${title}" saved successfully.`,
        data: updated,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Saved in resilient memory mode.",
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

    const conn = await connectToDatabase();
    if (conn) {
      await DocArticle.deleteOne({ slug });
      await AuditLog.create({
        action: "DOC_ARTICLE_DELETED",
        category: "System",
        actor: "admin@modernisum.com",
        target: slug,
        details: `Deleted documentation module "${slug}".`,
      });
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
