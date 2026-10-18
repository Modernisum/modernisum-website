"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Newspaper,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Edit,
  Eye,
  Check,
  Search,
  Filter,
  Loader2,
  X,
  Clock,
  Send,
  User,
  AlertCircle,
  Globe,
  Sparkles,
  Smartphone,
  Monitor,
  Zap,
  Award,
} from "lucide-react";

interface CommentItem {
  _id: string;
  authorName: string;
  authorEmail: string;
  commentText: string;
  createdAt: string;
  isRead: boolean;
  isApproved: boolean;
}

interface ArticleItem {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  targetPlatform?: "global" | "school" | "farmer" | "research" | string;
  published: boolean;
  publishedAt?: string;
  comments?: CommentItem[];
  focusKeyword?: string;
}

interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  searchIntent: string;
  suggestedTitle: string;
  focusKeyword: string;
  difficulty: string;
  outline: string[];
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"articles" | "comments">("articles");
  const [searchQuery, setSearchQuery] = useState("");

  // Editor Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Enterprise Tech");
  const [targetPlatform, setTargetPlatform] = useState("global");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [saving, setSaving] = useState(false);
  const [pingSuccess, setPingSuccess] = useState<string | null>(null);

  // SERP Preview Simulator & Trending Topics
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");
  const [isTrendingModalOpen, setIsTrendingModalOpen] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      setLoadingTopics(true);
      const res = await fetch("/api/admin/ai/trending-topics");
      const data = await res.json();
      if (data.success && Array.isArray(data.topics)) {
        setTrendingTopics(data.topics);
      }
    } catch (err) {
      console.error("Failed to fetch trending topics:", err);
    } finally {
      setLoadingTopics(false);
    }
  };

  const openCreateModal = () => {
    setCurrentSlug(null);
    setTitle("");
    setSlug("");
    setCategory("Enterprise Tech");
    setTargetPlatform("global");
    setExcerpt("");
    setContent("");
    setFocusKeyword("");
    setPingSuccess(null);
    setIsModalOpen(true);
  };

  const openEditModal = (article: ArticleItem) => {
    setCurrentSlug(article.slug);
    setTitle(article.title);
    setSlug(article.slug);
    setCategory(article.category || "Enterprise Tech");
    setTargetPlatform(article.targetPlatform || "global");
    setExcerpt(article.excerpt || "");
    setContent(article.content || "");
    setFocusKeyword(article.focusKeyword || "");
    setPingSuccess(null);
    setIsModalOpen(true);
  };

  const applyTrendingTopic = (topic: TrendingTopic) => {
    setTitle(topic.suggestedTitle);
    setSlug(topic.suggestedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    setFocusKeyword(topic.focusKeyword);
    setCategory(topic.category === "cbse_compliance" ? "CBSE & Compliance" : "School ERP & EdTech");
    setExcerpt(
      `An authoritative architectural guide on ${topic.topic.toLowerCase()}, detailing implementation benchmarks and zero-re-entry automation.`
    );
    setContent(
      `## Executive Summary\n\n${topic.topic} represents a high-priority operational requirement for modern institutions.\n\n### Key Deliverables\n${topic.outline
        .map((b) => `- ${b}`)
        .join("\n")}\n\n### Architectural Synthesis\nModSchool autonomous school operating system eliminates manual friction...`
    );
    setIsTrendingModalOpen(false);
  };

  // Real-Time SEO Scoring Calculus
  const seoCalculus = useMemo(() => {
    const kw = focusKeyword.trim().toLowerCase();
    if (!kw) {
      return { score: 0, grade: "No Keyword Set", inTitle: false, inSlug: false, inExcerpt: false, inContent: false };
    }

    const inTitle = title.toLowerCase().includes(kw);
    const inSlug = slug.toLowerCase().includes(kw.replace(/\s+/g, "-"));
    const inExcerpt = excerpt.toLowerCase().includes(kw);
    const inContent = content.toLowerCase().includes(kw);

    let points = 0;
    if (inTitle) points += 30;
    if (inSlug) points += 25;
    if (inExcerpt) points += 25;
    if (inContent) points += 20;

    let grade = "Needs Focus Keyword";
    if (points >= 90) grade = "10/10 Nobel-Grade SEO";
    else if (points >= 75) grade = "8/10 Strong SEO";
    else if (points >= 50) grade = "6/10 Moderate SEO";
    else grade = "Low SEO Coverage";

    return { score: points, grade, inTitle, inSlug, inExcerpt, inContent };
  }, [focusKeyword, title, slug, excerpt, content]);

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert("Please fill in Title, Slug, and Article Content.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          targetPlatform,
          excerpt: excerpt || content.slice(0, 150) + "...",
          content,
          focusKeyword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Trigger Instant Search Engine Indexing (IndexNow + Google Sitemap)
        try {
          const articleUrl = `https://modernisum.com/blog/${slug}`;
          await fetch("/api/admin/seo/ping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ urls: [articleUrl, "https://modernisum.com/feed.xml"] }),
          });
          setPingSuccess("IndexNow & Google News sitemaps pinged for instant indexing!");
        } catch {}

        setTimeout(() => {
          setIsModalOpen(false);
          fetchArticles();
        }, 800);
      } else {
        alert(data.message || "Failed to save article");
      }
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteArticle = async (targetSlug: string) => {
    if (!confirm(`Are you sure you want to delete article "${targetSlug}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles?slug=${targetSlug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchArticles();
      } else {
        alert(data.message || "Failed to delete article");
      }
    } catch (err: any) {
      alert("Error deleting: " + err.message);
    }
  };

  const handleMarkCommentRead = async (articleSlug: string, commentId: string) => {
    try {
      const res = await fetch("/api/admin/articles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: articleSlug, commentId, isRead: true }),
      });
      const data = await res.json();
      if (data.success) {
        fetchArticles();
      }
    } catch (err) {
      console.error("Failed to mark comment as read:", err);
    }
  };

  const handleDeleteComment = async (articleSlug: string, commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`/api/admin/articles?slug=${articleSlug}&commentId=${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchArticles();
      } else {
        alert(data.message || "Failed to delete comment");
      }
    } catch (err: any) {
      alert("Error deleting comment: " + err.message);
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allComments = articles.flatMap((a) =>
    (a.comments || []).map((c) => ({
      ...c,
      articleTitle: a.title,
      articleSlug: a.slug,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Actions Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-tech tracking-tight flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-cyan-400" />
            <span>Articles &amp; Nobel SEO Newsroom</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish educational articles, simulate Google SERP sitelinks, and broadcast instant IndexNow &amp; Google News pings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <GlassButton
            variant="secondary"
            onClick={() => {
              setIsTrendingModalOpen(true);
              if (trendingTopics.length === 0) fetchTrendingTopics();
            }}
            className="flex items-center gap-1.5 text-xs text-amber-400 border-amber-500/30 hover:border-amber-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Trending Topics</span>
          </GlassButton>

          <GlassButton variant="primary" onClick={openCreateModal} className="flex items-center gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Author New Article</span>
          </GlassButton>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "articles"
              ? "bg-cyan-500/15 text-cyan-400 border border-cyan-400/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>Articles ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("comments")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "comments"
              ? "bg-purple-500/15 text-purple-400 border border-purple-400/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Comments ({allComments.length})</span>
        </button>
      </div>

      {/* Articles View */}
      {activeTab === "articles" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <GlassInput
              placeholder="Search articles by title, slug, or category..."
              className="pl-9 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
              <Newspaper className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No articles found</p>
              <p className="text-xs text-slate-500 mt-1">Click &apos;Author New Article&apos; to write your first dispatch.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArticles.map((art) => (
                <LiquidGlassCard key={art.slug} className="p-4 sm:p-5 flex flex-col justify-between space-y-4 group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
                        {art.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {art.targetPlatform === "school" ? "school.modernisum.com" : "modernisum.com"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-tech group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[150px]">
                      /{art.slug}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/blog/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="View Live Article"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => openEditModal(art)}
                        className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-colors"
                        title="Edit Article & SERP"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.slug)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Comments View */}
      {activeTab === "comments" && (
        <div className="space-y-4">
          {allComments.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No reader comments recorded</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allComments.map((comment, idx) => (
                <LiquidGlassCard key={comment._id || idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{comment.authorName}</span>
                      {comment.authorEmail && (
                        <span className="text-[11px] text-slate-500 font-mono">&lt;{comment.authorEmail}&gt;</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{comment.commentText}</p>
                    <div className="text-[10px] text-slate-500 pt-1">
                      <span>Article: </span>
                      <Link href={`/blog/${comment.articleSlug}`} target="_blank" className="text-cyan-400 hover:underline">
                        {comment.articleTitle}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!comment.isRead && (
                      <button
                        onClick={() => handleMarkCommentRead(comment.articleSlug, comment._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Read</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.articleSlug, comment._id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor Modal with Google SERP Simulator */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080d1a] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-cyan-400" />
                  <span>{currentSlug ? `Edit Article: ${title}` : "Author New Article & SERP Engine"}</span>
                </h2>
                <span className="text-[11px] font-mono text-cyan-400/80">Nobel-Grade SEO Mastery (10/10)</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {pingSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{pingSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveArticle} className="space-y-5">
              {/* Focus Keyword & SEO Score Badge */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Focus SEO Keyword / Search Query:</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        seoCalculus.score >= 90
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : seoCalculus.score >= 60
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      }`}
                    >
                      {seoCalculus.grade} ({seoCalculus.score}%)
                    </span>
                  </div>
                </div>

                <GlassInput
                  placeholder="e.g. cbse loc auto fill OR school fee deficit radar"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="text-xs"
                />

                {/* Checklist indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                  <span className={`flex items-center gap-1 ${seoCalculus.inTitle ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Title (+30)
                  </span>
                  <span className={`flex items-center gap-1 ${seoCalculus.inSlug ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Slug (+25)
                  </span>
                  <span className={`flex items-center gap-1 ${seoCalculus.inExcerpt ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Excerpt (+25)
                  </span>
                  <span className={`flex items-center gap-1 ${seoCalculus.inContent ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Content (+20)
                  </span>
                </div>
              </div>

              {/* Title & Slug with Character Length Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Article Title</span>
                    <span className={`text-[10px] font-mono ${title.length > 60 ? "text-amber-400" : "text-slate-400"}`}>
                      {title.length}/60 chars
                    </span>
                  </div>
                  <GlassInput
                    placeholder="e.g. CBSE LOC 2026: Automated Registration Guide"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!currentSlug) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                      }
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Canonical URL Slug</label>
                  <GlassInput
                    placeholder="e.g. cbse-loc-automated-registration"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Category & Destination Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. CBSE & Compliance"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Subdomain</label>
                  <select
                    value={targetPlatform}
                    onChange={(e) => setTargetPlatform(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0c121e] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="global">Global Portal (modernisum.com)</option>
                    <option value="school">MOD School Ecosystem (school.modernisum.com)</option>
                    <option value="farmer">MOD Farmer Agro-Tech (modernisum.com/farmer)</option>
                    <option value="research">Research &amp; Engineering Whitepapers</option>
                  </select>
                </div>
              </div>

              {/* Excerpt with Character Counter */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Executive Excerpt (SERP Meta Description)</span>
                  <span className={`text-[10px] font-mono ${excerpt.length > 155 ? "text-amber-400" : "text-slate-400"}`}>
                    {excerpt.length}/155 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="Concise summary for Google search snippets and social previews..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              {/* 🌟 GOOGLE SERP CARD LIVE SIMULATOR */}
              <div className="p-4 rounded-2xl bg-[#202124] border border-white/15 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LIVE GOOGLE SERP CARD PREVIEW</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setSerpDevice("desktop")}
                      className={`px-2 py-0.5 rounded ${serpDevice === "desktop" ? "bg-white/20 text-white font-bold" : "text-slate-400"}`}
                    >
                      <Monitor className="w-3 h-3 inline mr-1" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setSerpDevice("mobile")}
                      className={`px-2 py-0.5 rounded ${serpDevice === "mobile" ? "bg-white/20 text-white font-bold" : "text-slate-400"}`}
                    >
                      <Smartphone className="w-3 h-3 inline mr-1" /> Mobile
                    </button>
                  </div>
                </div>

                {/* Google Result Card Visual Rendering */}
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] font-bold text-black">
                      M
                    </div>
                    <span className="text-[#dadce0] font-medium text-xs">
                      {targetPlatform === "school" ? "ModSchool OS" : "Modernisum"}
                    </span>
                    <span className="text-[#9aa0a6] text-[11px] truncate">
                      https://{targetPlatform === "school" ? "school.modernisum.com" : "modernisum.com"} › blog › {slug || "your-article-slug"}
                    </span>
                  </div>

                  <div className="text-[#8ab4f8] text-base sm:text-lg font-medium hover:underline cursor-pointer leading-snug">
                    {title || "Article Headline Will Appear Here — Modernisum Engineering"}
                  </div>

                  <div className="text-[#bdc1c6] text-xs sm:text-sm leading-relaxed">
                    {excerpt || "Excerpt description will be displayed on Google search results with keyword matching highlights..."}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Article Body (Markdown)</label>
                <textarea
                  rows={7}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                  placeholder="Write article markdown content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <GlassButton type="submit" variant="primary" disabled={saving}>
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing &amp; Auto-Indexing...</span>
                    </span>
                  ) : (
                    <span>Publish &amp; Broadcast Pings</span>
                  )}
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Daily Trending Topics Modal */}
      {isTrendingModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b101d] border border-cyan-400/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Gemini Flash Daily Trending Topics Radar</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">High-CTR educational search intents for CBSE, ICSE &amp; State Boards</p>
              </div>
              <button onClick={() => setIsTrendingModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingTopics ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        Keyword: {topic.focusKeyword}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                        {topic.difficulty} Difficulty
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{topic.suggestedTitle}</h4>
                    <p className="text-xs text-slate-400">{topic.searchIntent}</p>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          openCreateModal();
                          applyTrendingTopic(topic);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Use Topic &amp; Auto-Fill Outline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
