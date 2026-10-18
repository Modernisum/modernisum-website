import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/data-engine";

export const dynamic = "force-static";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getBlogPosts();
  const baseUrl = "https://modernisum.com";

  // Google News Sitemap indexes recent articles published within the last 48 hours or the latest batch
  const recentPosts = posts.slice(0, 15);

  const urlsXml = recentPosts
    .map((post) => {
      const loc = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt || Date.now()).toISOString();
      const title = escapeXml(post.title || "Modernisum Technology Dispatch");

      return `
  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>Modernisum Tech Dispatch</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
    })
    .join("");

  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlsXml}
</urlset>`;

  return new NextResponse(newsSitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
