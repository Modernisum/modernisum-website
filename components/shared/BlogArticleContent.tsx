"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import {
  ReadingProgressBar,
  BlogShareBar,
  TableOfContents,
} from "@/components/shared/BlogReadingEnhancements";
import { BlogCommentsSection } from "@/components/shared/BlogCommentsSection";
import { SeedBlogPost } from "@/lib/seed-data";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Compass,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  fetchBlogMetrics,
  recordBlogView,
  submitBlogReaction,
  type BlogMetrics,
} from "@/lib/firestore/blogMetrics";

export interface BlogArticleContentProps {
  post: SeedBlogPost;
  nextPost?: SeedBlogPost | null;
}

function formatDateWithTime(val?: string): string {
  if (!val) return "Recent";

  if (val.includes("AM") || val.includes("PM")) {
    return val;
  }

  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(val.trim())) {
      const parts = val.trim().split("-");
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 10, 0);
      const dateStr = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `${dateStr}, 10:00 AM`;
    }

    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      const dateStr = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeStr = d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return `${dateStr}, ${timeStr}`;
    }
  } catch {}

  return val;
}

export function BlogArticleContent({ post, nextPost }: BlogArticleContentProps) {
  const [metrics, setMetrics] = useState<BlogMetrics>({ views: 0, likes: 0, dislikes: 0 });
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    recordBlogView(post.slug);
    fetchBlogMetrics(post.slug).then(setMetrics);
    try {
      const saved = localStorage.getItem(`blog_reaction_${post.slug}`) as "like" | "dislike" | null;
      if (saved) setUserReaction(saved);
    } catch {}
  }, [post.slug]);

  const handleReaction = async (type: "like" | "dislike") => {
    const previous = userReaction;
    const isTogglingOff = previous === type;
    const newReaction = isTogglingOff ? null : type;

    setUserReaction(newReaction);
    try {
      if (newReaction) {
        localStorage.setItem(`blog_reaction_${post.slug}`, newReaction);
      } else {
        localStorage.removeItem(`blog_reaction_${post.slug}`);
      }
    } catch {}

    setMetrics((prev) => {
      let likes = prev.likes;
      let dislikes = prev.dislikes;

      if (type === "like") {
        likes = isTogglingOff ? likes - 1 : likes + 1;
        if (!isTogglingOff && previous === "dislike") dislikes = dislikes - 1;
      } else {
        dislikes = isTogglingOff ? dislikes - 1 : dislikes + 1;
        if (!isTogglingOff && previous === "like") likes = likes - 1;
      }
      return { ...prev, likes: Math.max(0, likes), dislikes: Math.max(0, dislikes) };
    });

    await submitBlogReaction({
      slug: post.slug,
      reaction: type,
      previousReaction: previous,
    });
  };

  // Sanitize content: remove leading duplicate H1 and meta byline from markdown body
  const cleanedContent = post.content
    .replace(/^#\s+[^\n]+\n*/, "")
    .replace(/^\*\*Published by[^\n]+\*\*\n*/, "")
    .trim();

  // Extract H2 headings for Table of Contents from cleaned content
  const headings = (cleanedContent.match(/^##\s+(.*)/gm) || []).map((h) => {
    const text = h.replace(/^##\s+/, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { text, id };
  });

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Modernisum",
      logo: {
        "@type": "ImageObject",
        url: "https://modernisum.com/logo.png",
      },
    },
  };

  return (
    <>
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Fluid wide display with minimal lateral margins */}
      <article className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav
          className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400 mb-5 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
          <Link
            href="/blog"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
          <span className="text-cyan-700 dark:text-cyan-400 font-medium">{post.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* 2-Column Architecture Layout: Title, Banner & Content on Left, Index on Right from the start */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 min-w-0">
            {/* Meta Tags / Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                {post.readTime}
              </span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{formatDateWithTime(post.publishedAt)}</span>
              </span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="flex items-center gap-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{metrics.views > 0 ? metrics.views.toLocaleString() : "..."} Views</span>
              </span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Verified Article
              </span>
            </div>

            {/* Clean, Executive Title (Scaled down for focus & readability) */}
            <h1 className="text-xl sm:text-2xl lg:text-[32px] font-bold font-display text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
              {post.title}
            </h1>

            {/* Subtitle / Excerpt */}
            {post.excerpt && (
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
                {post.excerpt}
              </p>
            )}

            {/* Author & Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-y border-slate-200/80 dark:border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {post.author.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {post.author.role} • Meerut Engineering Lab
                  </p>
                </div>
              </div>

              <BlogShareBar title={post.title} />
            </div>

            {/* Featured Banner / Diagram Frame */}
            {post.coverImage && (
              <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-slate-200/80 dark:border-white/10 bg-slate-900/50 dark:bg-slate-950 p-2 sm:p-4 flex items-center justify-center shadow-xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1100}
                  height={650}
                  priority
                  className="w-full h-auto object-contain rounded-xl max-h-[500px]"
                />
              </div>
            )}

            {/* Mobile-only Index (collapsible on small screens) */}
            <div className="lg:hidden mb-6">
              <TableOfContents headings={headings} />
            </div>

            {/* Main Article Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-[15px] sm:text-base leading-relaxed">
              <MarkdownRenderer content={cleanedContent} />
            </div>

            {/* Tags Strip */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Real-Time Reader Feedback & Reaction Bar */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Was this architecture breakdown insightful?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Your feedback directly shapes our open engineering documentation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleReaction("like")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    userReaction === "like"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-emerald-400/40"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${userReaction === "like" ? "fill-emerald-500 text-emerald-500" : ""}`} />
                  <span>Helpful ({metrics.likes})</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReaction("dislike")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    userReaction === "dislike"
                      ? "bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 shadow-sm"
                      : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-rose-400/40"
                  }`}
                >
                  <ThumbsDown className={`w-3.5 h-3.5 ${userReaction === "dislike" ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>Needs Clarity ({metrics.dislikes})</span>
                </button>
              </div>
            </div>

            {/* Real-Time Discussion Stream */}
            <BlogCommentsSection blogSlug={post.slug} />

            {/* Next Recommended Post */}
            {nextPost && (
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.15)"
                className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 mt-10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Read Next
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                      {nextPost.title}
                    </h3>
                  </div>
                  <Link href={`/blog/${nextPost.slug}`} className="shrink-0">
                    <GlassButton variant="primary" size="sm" className="flex items-center gap-1.5 text-xs">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </GlassButton>
                  </Link>
                </div>
              </LiquidGlassCard>
            )}
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-5">
            {headings.length > 0 && <TableOfContents headings={headings} />}

            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.15)"
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                Have Questions or Need Solutions?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Our engineering studio builds custom software, edge telemetry, and resilient systems tailored to your institution or enterprise.
              </p>
              <Link href="/contact" className="block pt-1">
                <GlassButton variant="primary" size="sm" className="w-full justify-center text-xs">
                  Get in Touch
                </GlassButton>
              </Link>
            </LiquidGlassCard>
          </aside>
        </div>
      </article>
    </>
  );
}
