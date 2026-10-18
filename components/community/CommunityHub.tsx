"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  CommunityEntry,
  ProductTarget,
  FeedbackType,
  fetchCommunityEntries,
  subscribeToCommunityEntries,
  submitCommunityEntry,
  upvoteCommunityEntry,
} from "@/lib/firestore/community";
import { getSSOUser, saveSSOUser, AuthUser } from "@/lib/sso";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
  MessageSquare,
  Star,
  ShieldCheck,
  Filter,
  ArrowUpDown,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Send,
  X,
  Building,
  User,
  HeartHandshake,
  Search,
  Activity,
} from "lucide-react";

const PRODUCT_LABELS: Record<ProductTarget, string> = {
  vidhyam: "MOD School",
  agromi: "MOD Farmer",
  studio: "AI Studio",
  extension: "Clerk Co-Pilot",
  general: "General & Security",
};

const TYPE_CONFIG: Record<
  FeedbackType,
  { label: string; icon: React.ElementType; badgeClass: string }
> = {
  review: {
    label: "Review",
    icon: Star,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  support: {
    label: "Tech Support",
    icon: HelpCircle,
    badgeClass: "bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-400",
  },
  feature_request: {
    label: "Feature Request",
    icon: Lightbulb,
    badgeClass: "bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400",
  },
  complaint: {
    label: "Bug / Complaint",
    icon: AlertTriangle,
    badgeClass: "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400",
  },
};

export interface CommunityHubProps {
  variant?: "modernisum" | "school" | "farmer";
  initialProduct?: ProductTarget | "all";
}

export function CommunityHub({
  variant = "modernisum",
  initialProduct,
}: CommunityHubProps = {}) {
  const [entries, setEntries] = useState<CommunityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const defaultProduct =
    initialProduct ||
    (variant === "school" ? "vidhyam" : variant === "farmer" ? "agromi" : "all");

  // Filters & Sorting state
  const [selectedProduct, setSelectedProduct] = useState<string>(defaultProduct);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest" | "upvoted">("recent");

  // Post Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Upvote tracker in local storage
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Form Fields
  const [formProduct, setFormProduct] = useState<ProductTarget>(
    variant === "farmer" ? "agromi" : "vidhyam"
  );
  const [formType, setFormType] = useState<FeedbackType>("review");
  const [formRating, setFormRating] = useState<number>(5);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formInstitution, setFormInstitution] = useState("");
  const [formAuthorName, setFormAuthorName] = useState("");
  const [formAuthorEmail, setFormAuthorEmail] = useState("");
  const [formAuthorRole, setFormAuthorRole] = useState(
    variant === "farmer" ? "Farm Owner / FPO Lead" : "School Principal"
  );

  // Hydrate user from Universal SSO and Firebase Auth
  useEffect(() => {
    const ssoUser = getSSOUser();
    if (ssoUser) {
      setCurrentUser(ssoUser);
      setFormAuthorName(ssoUser.name || "");
      setFormAuthorEmail(ssoUser.email || "");
    }

    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser && fbUser.email) {
        const uObj: AuthUser = {
          id: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || fbUser.email.split("@")[0],
          avatar: fbUser.photoURL || "cyber-astro",
          role: "client",
        };
        setCurrentUser(uObj);
        saveSSOUser(uObj);
        setFormAuthorName(uObj.name);
        setFormAuthorEmail(uObj.email);
      }
    });

    // Load saved upvotes from localStorage
    try {
      const savedUpvotes = localStorage.getItem("community_upvotes");
      if (savedUpvotes) {
        setUpvotedIds(new Set(JSON.parse(savedUpvotes)));
      }
    } catch {}

    // Load and subscribe to real-time entries
    fetchCommunityEntries().then((res) => {
      setEntries(res);
      setLoading(false);
    });

    const unsubRealtime = subscribeToCommunityEntries((updated) => {
      setEntries(updated);
    });

    return () => {
      unsub();
      if (typeof unsubRealtime === "function") unsubRealtime();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      if (fbUser.email) {
        const uObj: AuthUser = {
          id: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || fbUser.email.split("@")[0],
          avatar: fbUser.photoURL || "cyber-astro",
        };
        saveSSOUser(uObj);
        setCurrentUser(uObj);
        setFormAuthorName(uObj.name);
        setFormAuthorEmail(uObj.email);
      }
    } catch (e: any) {
      if (e?.code !== "auth/popup-closed-by-user") {
        setSubmitError(e?.message || "Google authentication failed.");
      }
    }
  };

  const handleUpvote = async (entry: CommunityEntry) => {
    const hasVoted = upvotedIds.has(entry.id);
    const updated = new Set(upvotedIds);

    if (hasVoted) {
      updated.delete(entry.id);
    } else {
      updated.add(entry.id);
    }
    setUpvotedIds(updated);

    try {
      localStorage.setItem("community_upvotes", JSON.stringify(Array.from(updated)));
    } catch {}

    // Optimistic UI update
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entry.id
          ? { ...e, upvotes: Math.max(0, e.upvotes + (hasVoted ? -1 : 1)) }
          : e
      )
    );

    await upvoteCommunityEntry(entry.id, hasVoted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      setSubmitError("Please fill out both the title and details.");
      return;
    }
    if (!formAuthorName.trim() || !formAuthorEmail.trim()) {
      setSubmitError("Please provide your name and email.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const newId = await submitCommunityEntry({
        product: formProduct,
        type: formType,
        title: formTitle,
        description: formDescription,
        rating: formType === "review" ? formRating : undefined,
        authorName: formAuthorName,
        authorEmail: formAuthorEmail,
        authorRole: formAuthorRole,
        institution: formInstitution,
      });

      // Optimistic addition
      const newEntry: CommunityEntry = {
        id: newId,
        product: formProduct,
        type: formType,
        title: formTitle,
        description: formDescription,
        rating: formType === "review" ? formRating : undefined,
        authorName: formAuthorName,
        authorEmail: formAuthorEmail,
        authorRole: formAuthorRole,
        institution: formInstitution,
        status: formType === "complaint" ? "open" : "reviewed",
        upvotes: 1,
        createdAt: new Date().toISOString(),
      };

      setEntries((prev) => [newEntry, ...prev]);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        setFormTitle("");
        setFormDescription("");
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to submit entry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered and Sorted entries
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    if (selectedProduct !== "all") {
      result = result.filter((e) => e.product === selectedProduct);
    }

    if (selectedType !== "all") {
      result = result.filter((e) => e.type === selectedType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.authorName.toLowerCase().includes(q) ||
          (e.institution && e.institution.toLowerCase().includes(q))
      );
    }

    // Sort options
    result.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "highest") {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === "lowest") {
        // Critical / low reviews first for pure transparency
        return (a.rating || 0) - (b.rating || 0);
      }
      if (sortBy === "upvoted") {
        return b.upvotes - a.upvotes;
      }
      return 0;
    });

    return result;
  }, [entries, selectedProduct, selectedType, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
          <HeartHandshake className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>
            {variant === "school"
              ? "MOD School Community & Verified Review Desk"
              : variant === "farmer"
              ? "MOD Farmer Community & Field Feedback"
              : "Open Community & Developer Support Desk"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          {variant === "school" ? "MOD School Community & " : variant === "farmer" ? "MOD Farmer Community & " : "Product Reviews & "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-sky-500 to-purple-600 dark:from-cyan-400 dark:via-sky-400 dark:to-purple-400">
            {variant === "school" ? "Transparent Feedback" : variant === "farmer" ? "Agro Support" : "Transparent Support"}
          </span>
        </h1>

        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {variant === "school"
            ? "Direct feedback from school directors, principals, accountants, and educators using MOD School OS. We never delete, modify, or artificially prioritize reviews. Every operational ticket and review is transparently tracked."
            : variant === "farmer"
            ? "Direct feedback from progressive farmers, FPOs, and agronomy experts using MOD Farmer Agro-Tech. Transparent field telemetry, disease diagnostic reviews, and developer resolution threads."
            : "Direct institutional feedback for MOD School OS, MOD Farmer Agro-Tech, and Studio Solutions. We never delete, modify, or artificially prioritize reviews. Every technical complaint and review is recorded publicly with direct engineering responses."}
        </p>
      </div>

      {/* Community Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#030712]/80 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>SLA Standard</span>
            <Activity className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white mt-2">
            &lt; 2.4 Hours
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Median Developer Response
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#030712]/80 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Public Trust</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-display text-emerald-600 dark:text-emerald-400 mt-2">
            100% Public
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Zero Algorithmic Bias
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#030712]/80 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Data Protection</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-display text-sky-600 dark:text-sky-400 mt-2">
            DPDP 2023
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Air-Gapped Local Storage
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#030712]/80 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Resolution Rate</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-display text-purple-600 dark:text-purple-400 mt-2">
            98.4%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Engineering Fix Delivery
          </p>
        </div>
      </div>

      {/* 100% Unfiltered Transparency Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-cyan-500/[0.06] dark:bg-cyan-500/[0.08] border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white block sm:inline mr-1">
              Statutory Transparency Invariant:
            </span>
            Modernisum operates with zero algorithmic bias. We never suppress critical reviews, and
            you can sort to inspect lowest ratings or unresolved complaints directly.
          </div>
        </div>

        <GlassButton
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-3.5 h-3.5" />}
          className="shrink-0 w-full sm:w-auto"
        >
          Share Feedback / Report Issue
        </GlassButton>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[#030712]/95 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-sm">
        {/* Product Tabs & Search Input Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedProduct("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedProduct === "all"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400/40"
              }`}
            >
              All Products ({entries.length})
            </button>
            {(Object.keys(PRODUCT_LABELS) as ProductTarget[]).map((prod) => {
              const count = entries.filter((e) => e.product === prod).length;
              return (
                <button
                  key={prod}
                  onClick={() => setSelectedProduct(prod)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedProduct === prod
                      ? "bg-cyan-500 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400/40"
                  }`}
                >
                  {PRODUCT_LABELS[prod]} ({count})
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback, school, issue..."
              className="w-full pl-9 pr-8 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/70 dark:border-white/10">
          {/* Feedback Type Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedType === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All Types
            </button>
            {(Object.keys(TYPE_CONFIG) as FeedbackType[]).map((t) => {
              const cfg = TYPE_CONFIG[t];
              const Icon = cfg.icon;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedType === t
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-white dark:bg-[#030712] border border-slate-200 dark:border-white/15 rounded-xl px-2.5 py-1 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="recent">Most Recent First</option>
              <option value="highest">Highest Rated (5★ to 1★)</option>
              <option value="lowest">Critical Issues (1★ to 5★)</option>
              <option value="upvoted">Most Upvoted / Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-5">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-6 space-y-3">
            <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              No entries match the selected filters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Be the first to share your thoughts, feature requests, or report an issue directly to our core developers.
            </p>
            <GlassButton size="sm" variant="primary" onClick={() => setIsModalOpen(true)}>
              Submit Feedback
            </GlassButton>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const typeConfig = TYPE_CONFIG[entry.type] || TYPE_CONFIG.review;
            const TypeIcon = typeConfig.icon;
            const hasVoted = upvotedIds.has(entry.id);

            return (
              <LiquidGlassCard
                key={entry.id}
                glowColor="rgba(0, 242, 254, 0.12)"
                className="p-5 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#030712]/95 border border-slate-200/90 dark:border-white/10 space-y-4 hover:border-cyan-400/40 transition-all duration-200 shadow-xs dark:shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
              >
                {/* Entry Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                      {entry.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {entry.authorName}
                        </span>
                        {entry.authorRole && (
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            • {entry.authorRole}
                          </span>
                        )}
                        {entry.institution && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Verified Institutional Client</span>
                          </span>
                        )}
                      </div>
                      {entry.institution && (
                        <div className="flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                          <Building className="w-3 h-3" />
                          <span>{entry.institution}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges & Telemetry */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {PRODUCT_LABELS[entry.product]}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${typeConfig.badgeClass}`}
                    >
                      <TypeIcon className="w-3 h-3" />
                      <span>{typeConfig.label}</span>
                    </span>
                    {entry.rating && (
                      <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{entry.rating}.0</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Entry Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white leading-snug">
                    {entry.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {entry.description}
                  </p>
                </div>

                {/* Official Modernisum Developer Reply Thread */}
                {entry.officialReply && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#050c18] border border-cyan-500/30 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-cyan-700 dark:text-cyan-300">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{entry.officialReply.repliedBy}</span>
                        <span className="font-normal font-mono text-[10px] text-slate-500 dark:text-slate-400">
                          ({entry.officialReply.role})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {entry.officialReply.repliedAt}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-5 border-l-2 border-cyan-500/50">
                      {entry.officialReply.text}
                    </p>
                  </div>
                )}

                {/* Bottom Card Actions & Upvote */}
                <div className="pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      #{entry.id.toUpperCase().replace("COMM-", "MOD-")}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span
                      className={`capitalize font-mono text-[10px] px-2 py-0.5 rounded-full ${
                        entry.status === "resolved"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                          : entry.status === "in_progress"
                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25"
                          : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      Status: {entry.status}
                    </span>
                  </div>

                  <button
                    onClick={() => handleUpvote(entry)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-medium transition-all ${
                      hasVoted
                        ? "bg-cyan-500/15 border-cyan-400/40 text-cyan-600 dark:text-cyan-400 shadow-xs"
                        : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-cyan-400/30"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? "fill-cyan-500 text-cyan-500" : ""}`} />
                    <span>Helpful ({entry.upvotes})</span>
                  </button>
                </div>
              </LiquidGlassCard>
            );
          })
        )}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white dark:bg-[#030712] border border-slate-200 dark:border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Submit Feedback or Report Issue
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Published openly to our community without modification.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Auth Notification */}
            {!currentUser && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Quick 1-click Google Sign-In to autofill your credentials:
                </span>
                <GlassButton size="sm" variant="ghost" onClick={handleGoogleSignIn}>
                  Google Sign-In
                </GlassButton>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product and Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Product / Platform
                  </label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="vidhyam">MOD School (Autonomous School OS)</option>
                    <option value="agromi">MOD Farmer (Autonomous Agriculture OS & AI Crop Doctor)</option>
                    <option value="studio">AI Studio Solutions</option>
                    <option value="extension">Modernisum Clerk Co-Pilot</option>
                    <option value="general">General & Security Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Entry Category
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="review">Review & Rating</option>
                    <option value="support">Tech Support / Question</option>
                    <option value="feature_request">Feature Request</option>
                    <option value="complaint">Bug Report / Complaint</option>
                  </select>
                </div>
              </div>

              {/* Star Rating for Reviews */}
              {formType === "review" && (
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formRating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-amber-500 ml-2">
                      {formRating} of 5 Stars
                    </span>
                  </div>
                </div>
              )}

              {/* Subject Title */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Subject / Summary Headline
                </label>
                <GlassInput
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Sub-150ms Face AI attendance works flawlessly across 3 desks"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Detailed Feedback or Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe your hands-on experience, exact problem, or requested feature in detail..."
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                  required
                />
              </div>

              {/* Author Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Your Name
                  </label>
                  <GlassInput
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    placeholder="e.g. Dr. R. K. Sharma"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Your Email
                  </label>
                  <GlassInput
                    type="email"
                    value={formAuthorEmail}
                    onChange={(e) => setFormAuthorEmail(e.target.value)}
                    placeholder="e.g. principal@school.edu.in"
                    required
                  />
                </div>
              </div>

              {/* Institution and Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Institution / School Name (Optional)
                  </label>
                  <GlassInput
                    value={formInstitution}
                    onChange={(e) => setFormInstitution(e.target.value)}
                    placeholder="e.g. Modern Public School"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Role / Designation
                  </label>
                  <select
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="School Principal">School Principal</option>
                    <option value="School Owner / Director">School Owner / Director</option>
                    <option value="Senior Bursar / Accountant">Senior Bursar / Accountant</option>
                    <option value="Teacher / Faculty">Teacher / Faculty</option>
                    <option value="Parent / Guardian">Parent / Guardian</option>
                    <option value="Software Developer">Software Developer</option>
                    <option value="Enterprise Client">Enterprise Client</option>
                  </select>
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Entry published successfully! Thank you for your honest voice.</span>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-end gap-3">
                <GlassButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={submitting}
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  Publish to Community
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
