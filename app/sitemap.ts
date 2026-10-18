import { MetadataRoute } from "next";
import { getServices, getProjects, getBlogPosts } from "@/lib/data-engine";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://modernisum.com";
  const schoolBaseUrl = "https://school.modernisum.com";

  const [services, projects, blogPosts] = await Promise.all([
    getServices(),
    getProjects(),
    getBlogPosts(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    // 1. Root Portals
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: schoolBaseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },

    // 2. ModSchool Subdomain Pages (Canonical school.modernisum.com)
    {
      url: `${schoolBaseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${schoolBaseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${schoolBaseUrl}/download`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${schoolBaseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${schoolBaseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${schoolBaseUrl}/releases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${schoolBaseUrl}/apps/desktop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${schoolBaseUrl}/apps/extension`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${schoolBaseUrl}/apps/student`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${schoolBaseUrl}/apps/employee`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${schoolBaseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${schoolBaseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.70,
    },
    {
      url: `${schoolBaseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.70,
    },

    // 3. ModSchool Parent Studio Path Aliases (/mod-school/*)
    {
      url: `${baseUrl}/mod-school`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/mod-school/features`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mod-school/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mod-school/download`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // 4. ModFarmer & Agro Ecosystem
    {
      url: `${baseUrl}/mod-farmer`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },

    // 5. Studio Core & Institutional Pages
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.60,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.60,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.80,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
