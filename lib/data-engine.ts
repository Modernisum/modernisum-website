import {
  SEED_SERVICES,
  SEED_PROJECTS,
  SEED_BLOG_POSTS,
  SEED_SITE_SETTINGS,
  SeedService,
  SeedProject,
  SeedBlogPost,
} from "@/lib/seed-data";
import { fetchPublishedBlogs, fetchBlogBySlug as fetchFirestoreBlogBySlug } from "@/lib/firestore/blogs";

/**
 * Resilient Services Loader
 */
export async function getServices(): Promise<SeedService[]> {
  return SEED_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<SeedService | null> {
  const services = await getServices();
  return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Resilient Projects Loader
 */
export async function getProjects(): Promise<SeedProject[]> {
  return SEED_PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<SeedProject | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Resilient Blog Posts Loader with Firestore & Seed Data Fallback
 */
export async function getBlogPosts(): Promise<SeedBlogPost[]> {
  try {
    // 1. Direct Firebase Firestore Query (Free Spark Tier, Zero Server)
    const firestoreBlogs = await fetchPublishedBlogs();
    if (firestoreBlogs && firestoreBlogs.length > 0) {
      const mapped = firestoreBlogs.map((b) => ({
        id: b.id || b.slug,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category as any,
        author: {
          name: b.author?.name || "Modernisum Team",
          role: b.author?.role || "Software Architect",
          avatar: b.author?.avatar || "/logo.png",
        },
        tags: b.tags || [],
        coverImage: b.coverImage || "/images/blog/ai-saas-school-erp.jpg",
        readTime: b.readTime || "5 min read",
        publishedAt: b.publishedAt
          ? typeof b.publishedAt === "string"
            ? b.publishedAt
            : b.publishedAt?.toDate
            ? b.publishedAt.toDate().toISOString()
            : new Date().toISOString()
          : "2026-03-01T10:00:00",
        seo: {
          metaTitle: b.seo?.metaTitle || b.title,
          metaDescription: b.seo?.metaDescription || b.excerpt,
          keywords: b.seo?.keywords || b.tags || [],
        },
      }));

      const firestoreSlugs = new Set(mapped.map((b) => b.slug.toLowerCase()));
      const missingFromFirestore = SEED_BLOG_POSTS.filter(
        (s) => !firestoreSlugs.has(s.slug.toLowerCase())
      );
      return [...missingFromFirestore, ...mapped];
    }
  } catch (firestoreErr) {
    console.warn("⚠️ Firestore blogs query fallback to seed data:", firestoreErr);
  }

  return SEED_BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<SeedBlogPost | null> {
  try {
    const firestoreBlog = await fetchFirestoreBlogBySlug(slug);
    if (firestoreBlog) {
      return {
        id: firestoreBlog.id || firestoreBlog.slug,
        title: firestoreBlog.title,
        slug: firestoreBlog.slug,
        excerpt: firestoreBlog.excerpt,
        content: firestoreBlog.content,
        category: firestoreBlog.category as any,
        author: {
          name: firestoreBlog.author?.name || "Modernisum Team",
          role: firestoreBlog.author?.role || "Software Architect",
          avatar: firestoreBlog.author?.avatar || "/logo.png",
        },
        tags: firestoreBlog.tags || [],
        coverImage: firestoreBlog.coverImage || "/images/blog/ai-saas-school-erp.jpg",
        readTime: firestoreBlog.readTime || "5 min read",
        publishedAt: firestoreBlog.publishedAt
          ? typeof firestoreBlog.publishedAt === "string"
            ? firestoreBlog.publishedAt
            : firestoreBlog.publishedAt?.toDate
            ? firestoreBlog.publishedAt.toDate().toISOString()
            : new Date().toISOString()
          : "2026-03-01T10:00:00",
        seo: {
          metaTitle: firestoreBlog.seo?.metaTitle || firestoreBlog.title,
          metaDescription: firestoreBlog.seo?.metaDescription || firestoreBlog.excerpt,
          keywords: firestoreBlog.seo?.keywords || firestoreBlog.tags || [],
        },
      };
    }
  } catch (err) {
    console.warn("⚠️ Firestore single blog query fallback:", err);
  }

  const posts = await getBlogPosts();
  return posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Resilient Site Settings Loader (Fetched from Firebase Firestore with Seed Fallback)
 */
export async function getSiteSettings() {
  try {
    const { fetchTelemetryStats } = await import("@/lib/firestore/telemetry");
    const funFacts = await fetchTelemetryStats();
    return {
      ...SEED_SITE_SETTINGS,
      funFacts,
    };
  } catch (err) {
    console.warn("Could not fetch telemetry stats from Firestore:", err);
  }
  return SEED_SITE_SETTINGS;
}

/**
 * Resilient Featured Community Reviews Loader for Home Page
 */
export async function getFeaturedCommunityReviews() {
  try {
    const { fetchFeaturedCommunityEntries } = await import("@/lib/firestore/community");
    const reviews = await fetchFeaturedCommunityEntries();
    if (reviews && reviews.length > 0) return reviews;
  } catch (err) {
    console.warn("Could not fetch featured community reviews from Firestore:", err);
  }
  const { SEED_COMMUNITY_ENTRIES } = await import("@/lib/firestore/community");
  return SEED_COMMUNITY_ENTRIES.filter((e) => e.featuredOnHome);
}

