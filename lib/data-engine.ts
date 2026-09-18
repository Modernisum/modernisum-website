import { connectToDatabase } from "@/lib/db";
import { Service, IService } from "@/lib/models/Service";
import { Project, IProject } from "@/lib/models/Project";
import { BlogPost, IBlogPost } from "@/lib/models/BlogPost";
import { SiteSettings } from "@/lib/models/SiteSettings";
import {
  SEED_SERVICES,
  SEED_PROJECTS,
  SEED_BLOG_POSTS,
  SEED_SITE_SETTINGS,
  SeedService,
  SeedProject,
  SeedBlogPost,
} from "@/lib/seed-data";

/**
 * Resilient Services Loader with Zero-Downtime Fallback
 */
export async function getServices(): Promise<SeedService[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const raw = await Service.find({}).sort({ order: 1 }).lean();
      if (raw && raw.length > 0) {
        const dbServices = JSON.parse(JSON.stringify(raw));
        return dbServices.map((s: any) => ({
          title: String(s.title || ""),
          slug: String(s.slug || ""),
          category: s.category as SeedService["category"],
          shortDescription: String(s.shortDescription || ""),
          description: String(s.description || ""),
          iconName: String(s.iconName || "Sparkles"),
          features: Array.isArray(s.features) ? s.features.map(String) : [],
          faqs: Array.isArray(s.faqs)
            ? s.faqs.map((f: any) => ({
                question: String(f.question || ""),
                answer: String(f.answer || ""),
              }))
            : [],
          highlightBadge: s.highlightBadge ? String(s.highlightBadge) : undefined,
          isPopular: Boolean(s.isPopular),
          order: Number(s.order || 0),
        }));
      }
    }
  } catch (err) {
    console.warn("⚠️ Error querying MongoDB services, falling back to seed data:", err);
  }
  return SEED_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<SeedService | null> {
  const services = await getServices();
  return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Resilient Projects Loader with Zero-Downtime Fallback
 */
export async function getProjects(): Promise<SeedProject[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const raw = await Project.find({}).sort({ order: 1 }).lean();
      if (raw && raw.length > 0) {
        const dbProjects = JSON.parse(JSON.stringify(raw));
        return dbProjects.map((p: any) => ({
          id: String(p._id || ""),
          title: String(p.title || ""),
          slug: String(p.slug || ""),
          client: String(p.client || "Enterprise Client"),
          category: String(p.category || ""),
          description: String(p.description || ""),
          imageUrl: String(p.imageUrl || "/logo.png"),
          screenshots: Array.isArray(p.screenshots)
            ? p.screenshots.map((s: any) => ({
                title: String(s.title || ""),
                category: s.category ? String(s.category) : undefined,
                caption: s.caption ? String(s.caption) : undefined,
                url: String(s.url || ""),
                thumbnailUrl: s.thumbnailUrl ? String(s.thumbnailUrl) : undefined,
              }))
            : [],
          tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
          metrics: Array.isArray(p.metrics)
            ? p.metrics.map((m: any) => ({
                label: String(m.label || ""),
                value: String(m.value || ""),
              }))
            : [],
          websiteUrl: p.websiteUrl ? String(p.websiteUrl) : undefined,
          isFeatured: Boolean(p.isFeatured),
          order: Number(p.order || 0),
        }));
      }
    }
  } catch (err) {
    console.warn("⚠️ Error querying MongoDB projects, falling back to seed data:", err);
  }
  return SEED_PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<SeedProject | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Resilient Blog Posts Loader with Zero-Downtime Fallback
 */
export async function getBlogPosts(): Promise<SeedBlogPost[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const raw = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean();
      if (raw && raw.length > 0) {
        const dbPosts = JSON.parse(JSON.stringify(raw));
        return dbPosts.map((b: any) => ({
          id: String(b._id || ""),
          title: String(b.title || ""),
          slug: String(b.slug || ""),
          excerpt: String(b.excerpt || ""),
          content: String(b.content || ""),
          category: String(b.category || "AI & Tech"),
          author: {
            name: String(b.author?.name || "Modernisum Team"),
            role: String(b.author?.role || "Software Architect"),
            avatar: String(b.author?.avatar || "/logo.png"),
          },
          tags: Array.isArray(b.tags) ? b.tags.map(String) : [],
          coverImage:
            String(b.coverImage || "").includes("firebasestorage.googleapis.com") || !b.coverImage || b.coverImage === "/logo.png"
              ? b.slug === "ai-saas-school-erp-transformation"
                ? "/images/blog/ai-saas-school-erp.jpg"
                : b.slug === "liquid-glass-design-enterprise-software"
                ? "/images/blog/liquid-glass-ui.jpg"
                : "/logo.png"
              : String(b.coverImage),
          readTime: String(b.readTime || "5 min read"),
          publishedAt: b.publishedAt ? new Date(b.publishedAt).toISOString().split("T")[0] : "2026-03-01",
          seo: {
            metaTitle: String(b.seo?.metaTitle || b.title || ""),
            metaDescription: String(b.seo?.metaDescription || b.excerpt || ""),
            keywords: Array.isArray(b.seo?.keywords)
              ? b.seo.keywords.map(String)
              : Array.isArray(b.tags)
              ? b.tags.map(String)
              : [],
          },
        }));
      }
    }
  } catch (err) {
    console.warn("⚠️ Error querying MongoDB blog posts, falling back to seed data:", err);
  }
  return SEED_BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<SeedBlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Resilient Site Settings Loader
 */
export async function getSiteSettings() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const raw = await SiteSettings.findOne({}).lean();
      if (raw) {
        const dbSettings = JSON.parse(JSON.stringify(raw));
        return {
          companyName: String(dbSettings.companyName || "Modernisum"),
          tagline: String(dbSettings.tagline || ""),
          phone: String(dbSettings.phone || "+91 9368671007"),
          email: String(dbSettings.email || "contact@modernisum.com"),
          address: String(dbSettings.address || ""),
          workingHours: String(dbSettings.workingHours || ""),
          funFacts: {
            projectsCompleted: Number(dbSettings.funFacts?.projectsCompleted || 128),
            satisfiedClients: Number(dbSettings.funFacts?.satisfiedClients || 85),
            itSpecialists: Number(dbSettings.funFacts?.itSpecialists || 24),
            smartSolutions: Number(dbSettings.funFacts?.smartSolutions || 42),
            systemUptime: String(dbSettings.funFacts?.systemUptime || "99.98%"),
          },
          socialLinks: {
            facebook: String(dbSettings.socialLinks?.facebook || ""),
            twitter: String(dbSettings.socialLinks?.twitter || ""),
            linkedin: String(dbSettings.socialLinks?.linkedin || ""),
            github: String(dbSettings.socialLinks?.github || ""),
          },
        };
      }
    }
  } catch (err) {
    console.warn("⚠️ Error querying MongoDB site settings, falling back to seed data:", err);
  }
  return SEED_SITE_SETTINGS;
}
