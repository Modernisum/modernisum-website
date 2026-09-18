"use client";

import React, { useState, useEffect } from "react";
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
  AlertCircle
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
  published: boolean;
  publishedAt?: string;
  comments?: CommentItem[];
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"articles" | "comments">("articles");
  const [searchQuery, setSearchQuery] = useState("");

  // Editor Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Enterprise Tech");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

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

  const openCreateModal = () => {
    setCurrentSlug(null);
    setTitle("");
    setSlug("");
    setCategory("Enterprise Tech");
    setExcerpt("");
    setContent("");
    setIsModalOpen(true);
  };

  const openEditModal = (article: ArticleItem) => {
    setCurrentSlug(article.slug);
    setTitle(article.title);
    setSlug(article.slug);
    setCategory(article.category || "Enterprise Tech");
    setExcerpt(article.excerpt || "");
    setContent(article.content || "");
    setIsModalOpen(true);
  };

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
          excerpt: excerpt || content.slice(0, 150) + "...",
          content,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchArticles();
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
      }
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  // Aggregate all comments across all articles
  const allComments: Array<CommentItem & { articleSlug: string; articleTitle: string }> = [];
  articles.forEach((art) => {
    if (art.comments && art.comments.length > 0) {
      art.comments.forEach((c) => {
        allComments.push({
          ...c,
          articleSlug: art.slug,
          articleTitle: art.title,
        });
      });
    }
  });

  const unreadCommentsCount = allComments.filter((c) => !c.isRead).length;

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Modernisum Editorial CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Blog & Community Discussions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish thought leadership articles, press releases, and moderate user discussions and inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            <span>Public Blog</span>
          </Link>
          <GlassButton onClick={openCreateModal} variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Publish Article</span>
          </GlassButton>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "articles"
              ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Articles ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("comments")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "comments"
              ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reader Comments ({allComments.length})</span>
          {unreadCommentsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-mono font-bold">
              {unreadCommentsCount} new
            </span>
          )}
        </button>
      </div>

      {/* Articles View */}
      {activeTab === "articles" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
              <Newspaper className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No blog articles found</p>
              <p className="text-xs text-slate-500 mt-1">
                Click "Publish Article" to author your first blog post.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <LiquidGlassCard key={art.slug} className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {art.category || "AI & Tech"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">/{art.slug}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{art.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <MessageSquare className="w-3 h-3 text-purple-400" />
                      <span>{art.comments?.length || 0} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(art)}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                        title="Edit article"
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
              <p className="text-xs text-slate-500 mt-1">
                Comments submitted by readers on your articles will appear here for moderation.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {allComments.map((comment, idx) => (
                <LiquidGlassCard
                  key={comment._id || idx}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    !comment.isRead ? "border-purple-500/40 bg-purple-500/[0.03]" : ""
                  }`}
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{comment.authorName}</span>
                      {comment.authorEmail && (
                        <span className="text-[11px] text-slate-500 font-mono">
                          &lt;{comment.authorEmail}&gt;
                        </span>
                      )}
                      {!comment.isRead && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Unread
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{comment.commentText}</p>
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500">
                      <span>Article:</span>
                      <Link
                        href={`/blog/${comment.articleSlug}`}
                        target="_blank"
                        className="text-purple-400 hover:underline flex items-center gap-1"
                      >
                        <span>{comment.articleTitle}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!comment.isRead && (
                      <button
                        onClick={() => handleMarkCommentRead(comment.articleSlug, comment._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Read</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.articleSlug, comment._id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
                      title="Delete Comment"
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0f19] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-purple-400" />
                <span>{currentSlug ? `Edit Article: ${title}` : "Author New Article"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Article Title</label>
                  <GlassInput
                    placeholder="e.g. The Architecture of Vidhyam School OS"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">URL Slug</label>
                  <GlassInput
                    placeholder="e.g. architecture-vidhyam-school-os"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Edge AI & Infrastructure"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Executive Excerpt</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                  placeholder="Brief summary for Google search snippets and card previews..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Article Body (Markdown supported)</label>
                <textarea
                  rows={8}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-mono text-xs"
                  placeholder="Write complete article content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

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
                      <span>Saving...</span>
                    </span>
                  ) : (
                    <span>Publish Article</span>
                  )}
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
