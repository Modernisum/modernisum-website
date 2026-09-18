import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { Project } from "@/lib/models/Project";
import { BlogPost } from "@/lib/models/BlogPost";
import { SiteSettings } from "@/lib/models/SiteSettings";
import {
  SEED_SERVICES,
  SEED_PROJECTS,
  SEED_BLOG_POSTS,
  SEED_SITE_SETTINGS,
} from "@/lib/seed-data";

export async function POST() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, message: "Could not connect to MongoDB Atlas" },
        { status: 503 }
      );
    }

    // Seed Services if empty
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(SEED_SERVICES);
    }

    // Seed Projects if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(
        SEED_PROJECTS.map((p) => ({
          title: p.title,
          slug: p.slug,
          client: p.client,
          category: p.category,
          description: p.description,
          imageUrl: p.imageUrl,
          tags: p.tags,
          metrics: p.metrics,
          websiteUrl: p.websiteUrl,
          isFeatured: p.isFeatured,
          order: p.order,
        }))
      );
    }

    // Seed Blog Posts if empty
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.insertMany(
        SEED_BLOG_POSTS.map((b) => ({
          title: b.title,
          slug: b.slug,
          excerpt: b.excerpt,
          content: b.content,
          category: b.category,
          author: b.author,
          tags: b.tags,
          coverImage: b.coverImage,
          readTime: b.readTime,
          published: true,
          publishedAt: new Date(b.publishedAt),
          seo: b.seo,
        }))
      );
    }

    // Seed SiteSettings if empty
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create(SEED_SITE_SETTINGS);
    }

    return NextResponse.json({
      success: true,
      message: "Database successfully seeded with Modernisum production assets.",
      counts: {
        services: await Service.countDocuments(),
        projects: await Project.countDocuments(),
        blogPosts: await BlogPost.countDocuments(),
        settings: await SiteSettings.countDocuments(),
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Seed error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
