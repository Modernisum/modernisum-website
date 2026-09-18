import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { getBlogPosts } from "@/lib/data-engine";
import { BookOpen, Clock, ArrowRight, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights | Modernisum",
  description:
    "Technical articles and deep architectural insights on AI SaaS development, Modern School ERP ecosystems, and Liquid Glass design systems.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <LiquidGlassCard
                key={post.id}
                glowColor="rgba(0, 242, 254, 0.15)"
                className="rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950/80">
                  <Image
                    src={post.coverImage || "/images/blog/ai-saas-school-erp.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-bold text-xs">
                        {post.author.name.charAt(0)}
                      </div>
                      <span>{post.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
