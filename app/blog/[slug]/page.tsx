import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data-engine";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import {
  ReadingProgressBar,
  BlogShareBar,
  KeyArchitectureHighlights,
} from "@/components/blog/BlogReadingEnhancements";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found | Modernisum" };
  }

  return {
    title: `${post.title} | Modernisum Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage.startsWith("http")
            ? post.coverImage
            : `https://modernisum.com${post.coverImage}`,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = await getBlogPosts();
  const post = allPosts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!post) {
    notFound();
  }

  // Find next post for recommended reading
  const otherPosts = allPosts.filter((p) => p.slug.toLowerCase() !== slug.toLowerCase());
  const nextPost = otherPosts.length > 0 ? otherPosts[0] : null;

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
    <div className="flex flex-col min-h-screen">
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb with high contrast */}
          <nav
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <Link
              href="/blog"
              className="hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-slate-800 dark:text-cyan-300 font-semibold truncate max-w-[200px] sm:max-w-md">
              {post.title}
            </span>
          </nav>

          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            interactive={false}
            className="p-6 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-8 bg-white/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-2xl"
          >
            {/* Meta Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  {post.readTime}
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  {post.publishedAt}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                {post.title}
              </h1>

              {/* Author & Team Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {post.author.name}
                    </h4>
                    <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-500/20">
                  <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span>Verified Architecture Spec</span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-lg">
              <Image
                src={post.coverImage || "/images/blog/ai-saas-school-erp.jpg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 850px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Executive Highlights for AI School ERP */}
            {post.slug === "ai-saas-school-erp-transformation" && (
              <KeyArchitectureHighlights />
            )}

            {/* Content Body with Robust Markdown Parser */}
            <div className="pt-2">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Interactive Social Sharing Toolbar */}
            <div className="pt-4">
              <BlogShareBar title={post.title} />
            </div>

            {/* Tags Strip */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-600 dark:text-slate-400 mb-3">
                Related Technical Domains
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-100 hover:bg-cyan-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 hover:text-cyan-800 dark:text-slate-300 dark:hover:text-cyan-300 transition-colors cursor-default"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-50 via-slate-50 to-purple-50 dark:from-cyan-950/40 dark:via-slate-900/30 dark:to-purple-950/30 border border-cyan-500/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Modern Engineering Consultation
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Interested in Modern AI SaaS & Campus Systems?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  Connect directly with our senior software architects to design your enterprise web, mobile apps, or smart IoT infrastructure.
                </p>
              </div>
              <Link href="/contact" className="shrink-0">
                <GlassButton variant="primary" size="sm">
                  <span>Schedule Discussion</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </GlassButton>
              </Link>
            </div>
          </LiquidGlassCard>

          {/* Navigation & Next Recommended Post */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all articles</span>
            </Link>

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group p-4 rounded-2xl bg-white/80 dark:bg-white/[0.03] hover:bg-cyan-50/50 dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 transition-all flex items-center gap-4 max-w-md shadow-xs hover:shadow-md"
              >
                <div className="text-right flex-1">
                  <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 uppercase font-semibold">
                    Read Next
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {nextPost.title}
                  </h5>
                </div>
                <div className="w-9 h-9 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
