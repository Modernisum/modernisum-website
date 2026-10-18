import { NextRequest, NextResponse } from "next/server";
import { fetchPublishedBlogs, upsertBlog, deleteBlog, FirestoreBlog } from "@/lib/firestore/blogs";

export async function GET() {
  try {
    const posts = await fetchPublishedBlogs();
    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, excerpt, content, category, authorName, authorEmail, commentText, action, targetPlatform } = body;

    if (action === "add_comment") {
      return NextResponse.json({ success: true, message: "Comment recorded." });
    }

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: "Title, slug, and content are required." },
        { status: 400 }
      );
    }

    const blogDoc: FirestoreBlog = {
      title,
      slug,
      excerpt: excerpt || content.slice(0, 160),
      content,
      category: category || "Enterprise Tech",
      targetPlatform: targetPlatform || "global",
      author: {
        name: "Modernisum Team",
        role: "Software Architect",
        avatar: "/logo.png",
      },
      tags: ["AI", "Tech"],
      coverImage: "/images/blog/ai-saas-school-erp.jpg",
      readTime: "5 min read",
      published: true,
    };

    const docId = await upsertBlog(blogDoc);
    return NextResponse.json({ success: true, message: `Article "${title}" saved to Firestore.`, id: docId });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process article request" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      await deleteBlog(slug);
      return NextResponse.json({ success: true, message: `Article "${slug}" deleted from Firestore.` });
    }

    return NextResponse.json({ success: false, message: "Slug parameter is required." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to delete" }, { status: 500 });
  }
}
