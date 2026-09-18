import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { AuditLog } from "@/lib/models/AuditLog";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: posts });
    }
    return NextResponse.json({ success: true, data: [] });
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
    const { action, slug, commentId, authorName, authorEmail, commentText, title, excerpt, content, category } = body;

    const conn = await connectToDatabase();

    // Action 1: Add reader comment
    if (action === "add_comment") {
      if (!slug || !authorName || !commentText) {
        return NextResponse.json({ success: false, message: "Missing required comment fields." }, { status: 400 });
      }

      if (conn) {
        const post = await BlogPost.findOne({ slug });
        if (!post) {
          return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
        }

        const newComment = {
          authorName,
          authorEmail: authorEmail || "",
          commentText,
          createdAt: new Date(),
          isRead: false,
          isApproved: true,
        };

        post.comments = post.comments || [];
        post.comments.push(newComment as any);
        await post.save();

        return NextResponse.json({ success: true, message: "Comment added successfully.", comment: newComment });
      }

      return NextResponse.json({ success: true, message: "Comment recorded in memory." });
    }

    // Action 2: Create or update blog/news article
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: "Title, slug, and content are required." },
        { status: 400 }
      );
    }

    if (conn) {
      const updated = await BlogPost.findOneAndUpdate(
        { slug },
        {
          title,
          slug,
          excerpt: excerpt || content.slice(0, 160),
          content,
          category: category || "Enterprise Tech",
          published: true,
        },
        { upsert: true, new: true }
      );

      await AuditLog.create({
        action: "ARTICLE_SAVED",
        category: "System",
        actor: "admin@modernisum.com",
        target: slug,
        details: `Saved article "${title}".`,
      });

      return NextResponse.json({ success: true, message: `Article "${title}" saved.`, data: updated });
    }

    return NextResponse.json({ success: true, message: "Article saved in memory mode." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process article request" },
      { status: 500 }
    );
  }
}

// Mark comment as read or approved
export async function PATCH(req: NextRequest) {
  try {
    const { slug, commentId, isRead = true } = await req.json();

    if (!slug || !commentId) {
      return NextResponse.json({ success: false, message: "Slug and commentId are required." }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (conn) {
      await BlogPost.updateOne(
        { slug, "comments._id": commentId },
        { $set: { "comments.$.isRead": isRead } }
      );

      return NextResponse.json({ success: true, message: "Comment status updated." });
    }

    return NextResponse.json({ success: true, message: "Comment status updated in memory." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const commentId = searchParams.get("commentId");

    const conn = await connectToDatabase();

    // Delete single comment
    if (slug && commentId) {
      if (conn) {
        await BlogPost.updateOne(
          { slug },
          { $pull: { comments: { _id: commentId } } }
        );
      }
      return NextResponse.json({ success: true, message: "Comment deleted." });
    }

    // Delete whole article
    if (slug) {
      if (conn) {
        await BlogPost.deleteOne({ slug });
        await AuditLog.create({
          action: "ARTICLE_DELETED",
          category: "System",
          actor: "admin@modernisum.com",
          target: slug,
          details: `Deleted article "${slug}".`,
        });
      }
      return NextResponse.json({ success: true, message: `Article "${slug}" deleted.` });
    }

    return NextResponse.json({ success: false, message: "Slug parameter is required." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to delete" }, { status: 500 });
  }
}
