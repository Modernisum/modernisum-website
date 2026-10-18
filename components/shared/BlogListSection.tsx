"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { SeedBlogPost } from "@/lib/seed-data";
import { BookOpen, Clock, ArrowRight, User, Calendar, Tag } from "lucide-react";

export interface BlogListSectionProps {
  posts: SeedBlogPost[];
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

export function BlogListSection({ posts }: BlogListSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
          <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Modernisum Engineering Journal</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Software Architecture &{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            AI Innovations
          </span>
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
          Deep technical breakdowns written by our senior engineering architects in Meerut.
        </p>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post, idx) => (
          <LiquidGlassCard
            key={post.id || post.slug}
            glowColor="rgba(0, 242, 254, 0.15)"
            className="rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300"
          >
            {/* Media Container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950/80">
              <Image
                src={post.coverImage || "/images/blog/ai-saas-school-erp.jpg"}
                alt={post.title}
                fill
                priority={idx === 0}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span>{formatDateWithTime(post.publishedAt)}</span>
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block group-hover:text-cyan-400 transition-colors">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Read Link */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {post.author.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                >
                  <span>Read Spec</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </LiquidGlassCard>
        ))}
      </div>
    </div>
  );
}
