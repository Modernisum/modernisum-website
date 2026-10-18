"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Scale,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  ExternalLink,
  Save,
  Check,
  ChevronDown,
  ChevronRight,
  Trash2,
  Clock,
  Award,
  Printer,
} from "lucide-react";
import { PolicyPdfModal } from "@/components/policy/PolicyPdfModal";
import {
  FirestorePolicyDoc,
  PolicySectionItem,
  POLICY_CATEGORIES,
  DEFAULT_POLICIES_SEED,
  subscribeToPolicies,
  savePolicy,
} from "@/lib/firestore/policies";

export default function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<FirestorePolicyDoc[]>(DEFAULT_POLICIES_SEED);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>("terms");
  const [loading, setLoading] = useState<boolean>(false);
  const [seeding, setSeeding] = useState<boolean>(false);
  const [isAdminPdfModalOpen, setIsAdminPdfModalOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State for Adding / Editing a Clause
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editSectionId, setEditSectionId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formSlugId, setFormSlugId] = useState<string>("");
  const [formNumber, setFormNumber] = useState<string>("");
  const [formTag, setFormTag] = useState<string>("Recently Added");
  const [formContent, setFormContent] = useState<string>("");
  const [formBullets, setFormBullets] = useState<string>("");
  const [isRecentlyAdded, setIsRecentlyAdded] = useState<boolean>(true);

  // 1. Subscribe to Firebase live policies
  useEffect(() => {
    const unsub = subscribeToPolicies((updated) => {
      if (updated && updated.length > 0) {
        setPolicies(updated);
      }
    });
    return () => unsub();
  }, []);

  const activePolicy = policies.find((p) => p.id === selectedPolicyId || p.slug === selectedPolicyId) || policies[0];

  // Seed All Policies to Firebase
  const handleSeedAll = async () => {
    setSeeding(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/policies/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: `Firebase Live: ${data.message} (${data.seededCount} policies, 24+ categorized headlines).`,
        });
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Failed to seed policies.",
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Network error while connecting to Firebase.",
      });
    } finally {
      setSeeding(false);
      setTimeout(() => setFeedback(null), 8000);
    }
  };

  // Open Form to Add New Clause
  const handleOpenAddForm = () => {
    setEditSectionId(null);
    setFormTitle("");
    setFormSlugId("");
    setFormNumber(String((activePolicy?.sections?.length || 0) + 1));
    setFormTag("Recently Added");
    setFormContent("");
    setFormBullets("");
    setIsRecentlyAdded(true);
    setIsFormOpen(true);
  };

  // Open Form to Edit an Existing Clause
  const handleOpenEditForm = (sec: PolicySectionItem) => {
    setEditSectionId(sec.id);
    setFormTitle(sec.title);
    setFormSlugId(sec.id);
    setFormNumber(String(sec.number || ""));
    setFormTag(sec.tag || "");
    setFormContent(sec.content?.join("\n\n") || "");
    setFormBullets(sec.bullets?.join("\n") || "");
    setIsRecentlyAdded(sec.isRecentlyAdded ?? true);
    setIsFormOpen(true);
  };

  // Save Clause to Policy in Firebase
  const handleSaveClause = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      setFeedback({ type: "error", message: "Clause title and content are required." });
      return;
    }

    setLoading(true);
    try {
      const slugId =
        formSlugId.trim() ||
        formTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const paragraphs = formContent
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const bulletList = formBullets
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean);

      const newSection: PolicySectionItem = {
        id: slugId,
        title: formTitle.trim(),
        number: formNumber.trim() || undefined,
        tag: formTag.trim() || undefined,
        isRecentlyAdded: isRecentlyAdded,
        lastAddedOrUpdated: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        content: paragraphs,
        bullets: bulletList.length > 0 ? bulletList : undefined,
      };

      let updatedSections = [...activePolicy.sections];
      if (editSectionId) {
        // Replace existing section
        updatedSections = updatedSections.map((s) => (s.id === editSectionId ? newSection : s));
      } else {
        // Add new section to policy
        updatedSections.push(newSection);
      }

      const updatedPolicy: FirestorePolicyDoc = {
        ...activePolicy,
        lastUpdated: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        changelogNotice: `Policy Addition: Clause "${newSection.title}" ${
          editSectionId ? "updated" : "added"
        } in active policy registry.`,
        sections: updatedSections,
      };

      await savePolicy(updatedPolicy);

      setFeedback({
        type: "success",
        message: `Policy Clause "${newSection.title}" saved in Firebase! Categorized headlines updated in UI.`,
      });
      setIsFormOpen(false);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Failed to save clause to Firebase.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 8000);
    }
  };

  // Delete a Clause from Policy
  const handleDeleteClause = async (secId: string) => {
    if (!confirm("Are you sure you want to remove this clause from the active policy?")) return;

    setLoading(true);
    try {
      const updatedSections = activePolicy.sections.filter((s) => s.id !== secId);
      const updatedPolicy: FirestorePolicyDoc = {
        ...activePolicy,
        sections: updatedSections,
        lastUpdated: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      await savePolicy(updatedPolicy);
      setFeedback({
        type: "success",
        message: "Clause removed from Firebase policy registry.",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Failed to remove clause.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 6000);
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Firebase Policy Engine & Legal Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Policies & Categorized Headlines Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            Manage legal agreements, DPDP Act 2023 clauses, and local-first data sovereignty disclosures backed by
            Firebase Firestore.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAdminPdfModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer"
            title="Generate real-time executive PDF from current database"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Generate Live PDF</span>
          </button>

          <Link
            href="/terms"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
          >
            <span>Preview Live Terms</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleSeedAll}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${seeding ? "animate-spin" : ""}`} />
            <span>{seeding ? "Seeding..." : "Seed All to Firebase"}</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-medium animate-fadeIn ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Quick Policy Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {policies.map((p) => {
          const isSelected = p.id === selectedPolicyId || p.slug === selectedPolicyId;
          return (
            <button
              key={p.slug}
              onClick={() => {
                setSelectedPolicyId(p.slug);
                setIsFormOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-sm"
                  : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-slate-400"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{p.shortTitle}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10 font-mono text-slate-300">
                {p.sections.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Policy Details & Clauses List */}
      {activePolicy && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Policy Summary & Action */}
          <div className="lg:col-span-4 space-y-6">
            <LiquidGlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                  {activePolicy.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {activePolicy.sections.length} Headlines
                </span>
              </div>

              <h2 className="text-lg font-bold font-display text-white">{activePolicy.title}</h2>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {activePolicy.summaryDescription}
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-slate-400 font-mono">
                <div>Effective: {activePolicy.effectiveDate}</div>
                <div>Last Updated: {activePolicy.lastUpdated}</div>
              </div>

              <button
                onClick={handleOpenAddForm}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Clause / Headline</span>
              </button>
            </LiquidGlassCard>
          </div>

          {/* Right Column: Clauses List / Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Add / Edit Form Modal/Drawer */}
            {isFormOpen && (
              <LiquidGlassCard className="p-6 space-y-5 border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-transparent">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold font-display text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{editSectionId ? "Edit Policy Clause" : "Add New Clause to Policy"}</span>
                  </h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveClause} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400 uppercase">Number</label>
                      <input
                        type="text"
                        value={formNumber}
                        onChange={(e) => setFormNumber(e.target.value)}
                        placeholder="e.g. 1, 2, 3"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-mono text-slate-400 uppercase">Clause Title</label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. 14-Day Offline Operational Grace Guarantee"
                        required
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400 uppercase">Anchor Slug ID</label>
                      <input
                        type="text"
                        value={formSlugId}
                        onChange={(e) => setFormSlugId(e.target.value)}
                        placeholder="e.g. offline-grace-guarantee"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400 uppercase">Tag / Category Badge</label>
                      <input
                        type="text"
                        value={formTag}
                        onChange={(e) => setFormTag(e.target.value)}
                        placeholder="e.g. Recently Added, DPDP Act 2023"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">
                      Content Paragraphs (Separate with double line breaks)
                    </label>
                    <textarea
                      rows={5}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="Enter legal description and clauses here..."
                      required
                      className="w-full p-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">
                      Bullet Points (Optional - 1 per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formBullets}
                      onChange={(e) => setFormBullets(e.target.value)}
                      placeholder="Bullet 1: Detail...&#10;Bullet 2: Detail..."
                      className="w-full p-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isRecentlyAdded"
                      checked={isRecentlyAdded}
                      onChange={(e) => setIsRecentlyAdded(e.target.checked)}
                      className="rounded bg-white/10 border-white/20 text-cyan-500 focus:ring-cyan-500/30"
                    />
                    <label htmlFor="isRecentlyAdded" className="text-xs text-slate-300">
                      Mark as &ldquo;Recently Added Clause&rdquo; (Displays New badge in sidebar and policy notice)
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono transition-colors disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{loading ? "Saving to Firebase..." : "Save Clause to Firebase"}</span>
                    </button>
                  </div>
                </form>
              </LiquidGlassCard>
            )}

            {/* List of Existing Clauses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>Categorized Clauses in {activePolicy.shortTitle}</span>
                <span>{activePolicy.sections.length} total</span>
              </div>

              {activePolicy.sections.map((sec) => (
                <LiquidGlassCard key={sec.id} className="p-4 sm:p-5 space-y-3 group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {sec.number || "•"}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white font-display">{sec.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400">#{sec.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {sec.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {sec.tag}
                        </span>
                      )}
                      {sec.isRecentlyAdded && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                          Recently Added
                        </span>
                      )}
                      <button
                        onClick={() => handleOpenEditForm(sec)}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClause(sec.id)}
                        className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete clause"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 pl-8 font-light leading-relaxed">
                    {sec.content?.[0] || ""}
                  </p>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Real-Time Live PDF Generator & Print Preview Modal */}
      <PolicyPdfModal
        isOpen={isAdminPdfModalOpen}
        onClose={() => setIsAdminPdfModalOpen(false)}
        policy={activePolicy}
      />
    </div>
  );
}
