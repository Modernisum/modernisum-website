"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  ListOrdered,
  Lightbulb,
  FileText,
  Loader2,
  X
} from "lucide-react";

interface DocItem {
  _id?: string;
  slug: string;
  category: string;
  title: string;
  overview: string;
  steps: string[];
  tip?: string;
  order: number;
  isPublished: boolean;
}

const DEFAULT_CATEGORIES = [
  "Getting Started",
  "Architecture",
  "Administration",
  "Academics",
  "Financials",
  "Hardware & AI",
  "System Operations",
];

export default function AdminDocsManager() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Getting Started");
  const [overview, setOverview] = useState("");
  const [steps, setSteps] = useState<string[]>([""]);
  const [tip, setTip] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/docs");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setDocs(data.data);
      }
    } catch (err) {
      console.error("Failed to load doc modules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleOpenCreate = () => {
    setCurrentSlug(null);
    setTitle("");
    setSlug("");
    setCategory("Getting Started");
    setOverview("");
    setSteps([""]);
    setTip("");
    setOrder(docs.length + 1);
    setIsEditing(true);
  };

  const handleOpenEdit = (doc: DocItem) => {
    setCurrentSlug(doc.slug);
    setTitle(doc.title);
    setSlug(doc.slug);
    setCategory(doc.category);
    setOverview(doc.overview);
    setSteps(doc.steps && doc.steps.length > 0 ? doc.steps : [""]);
    setTip(doc.tip || "");
    setOrder(doc.order || 0);
    setIsEditing(true);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, val: string) => {
    const updated = [...steps];
    updated[index] = val;
    setSteps(updated);
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !overview) {
      alert("Please fill in Title, Slug, and Overview.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          overview,
          steps: steps.filter(Boolean),
          tip,
          order,
          isPublished: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        fetchDocs();
      } else {
        alert(data.message || "Failed to save documentation article.");
      }
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (targetSlug: string) => {
    if (!confirm(`Are you sure you want to delete documentation module "${targetSlug}"?`)) return;

    try {
      const res = await fetch(`/api/admin/docs?slug=${targetSlug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchDocs();
      } else {
        alert(data.message || "Failed to delete.");
      }
    } catch (err: any) {
      alert("Error deleting: " + err.message);
    }
  };

  const filteredDocs = docs.filter((d) => {
    const matchesCategory = selectedCategory === "All" || d.category === selectedCategory;
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.overview.toLowerCase().includes(search.toLowerCase()) ||
      d.slug.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vidhyam Knowledge Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Documentation & Tutorials CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Author and publish native desktop OS tutorials, multi-PC LAN guides, and hardware integration manuals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/vidhyam/docs"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Public Docs</span>
          </Link>
          <GlassButton onClick={handleOpenCreate} variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </GlassButton>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0f19] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>{currentSlug ? `Edit: ${title}` : "New Documentation Article"}</span>
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Article Title</label>
                  <GlassInput
                    placeholder="e.g. Windows Installation & Setup"
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
                    placeholder="e.g. windows-installation"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sort Priority Order</label>
                  <GlassInput
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Executive Overview</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="Summary of what administrators or IT staff achieve in this guide..."
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Implementation Steps ({steps.length})</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {steps.map((st, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 w-5">{i + 1}.</span>
                      <input
                        type="text"
                        value={st}
                        onChange={(e) => handleStepChange(i, e.target.value)}
                        placeholder={`Step ${i + 1} instruction...`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(i)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pro Tip / Operational Warning</span>
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="e.g. Always ensure LAN client PCs have port 7070 unblocked in Windows Defender."
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
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
                    <span>Save & Publish Article</span>
                  )}
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              selectedCategory === "All"
                ? "bg-cyan-500 text-black font-bold"
                : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
            }`}
          >
            All ({docs.length})
          </button>
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-black font-bold"
                  : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Content Table / Card Grid */}
      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Loading documentation index...</p>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-300">No documentation modules found</p>
          <p className="text-xs text-slate-500 mt-1">
            Click "Create Article" to publish your first system guide to Vidhyam Docs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <LiquidGlassCard key={doc.slug} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Order: #{doc.order}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">{doc.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {doc.overview}
                </p>
                {doc.steps && doc.steps.length > 0 && (
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2">
                    <ListOrdered className="w-3 h-3 text-cyan-400" />
                    <span>{doc.steps.length} practical steps configured</span>
                  </div>
                )}
                {doc.tip && (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 line-clamp-2">
                    Tip: {doc.tip}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-slate-500">/{doc.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(doc)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                    title="Edit article"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.slug)}
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
  );
}
