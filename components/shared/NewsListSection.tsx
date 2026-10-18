"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { Newspaper, Clock, Calendar, ArrowRight } from "lucide-react";

export interface NewsReleaseItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  badge?: string;
  badgeColor?: string;
  coverImage: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  href: string;
}

export interface NewsListSectionProps {
  releases: NewsReleaseItem[];
}

export function NewsListSection({ releases }: NewsListSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(releases.map((r) => r.category)))];

  const filteredReleases =
    selectedCategory === "All"
      ? releases
      : releases.filter((r) => r.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
          <Newspaper className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Modernisum Newsroom & Releases</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          News & Platform{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            Announcements
          </span>
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
          Official company milestones, platform rollouts, and engineering breakthroughs from our Meerut studio.
        </p>

        {/* Category Filter Pills */}
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

      {/* News Releases Grid (Mirrors Blog Grid Architecture) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredReleases.map((item, idx) => (
          <LiquidGlassCard
            key={item.id}
            id={item.id}
            glowColor="rgba(0, 242, 254, 0.15)"
            className="rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300"
          >
            {/* Media Container with 16:9 Cover Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950/80">
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                priority={idx === 0}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {item.category}
                </span>
              </div>
              {item.badge && (
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium backdrop-blur-md border ${
                      item.badgeColor || "bg-cyan-500/20 border-cyan-400/30 text-cyan-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                    {item.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <Link href={item.href} className="block group-hover:text-cyan-400 transition-colors">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {item.title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              {/* Author Attribution & Read Release Link */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                    {item.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.author.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {item.author.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                >
                  <span>Read Release</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </LiquidGlassCard>
        ))}
      </div>

      {/* Bottom Consultation Link */}
      <div className="text-center pt-8 border-t border-slate-200 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Looking for media inquiries or custom enterprise deployments?
        </p>
        <Link href="/contact">
          <GlassButton variant="primary" size="sm" className="inline-flex items-center gap-2">
            <span>Contact Engineering Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
