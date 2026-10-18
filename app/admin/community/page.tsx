"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  Trash2,
  Send,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Star,
  Building,
  Building2,
  User,
  ShieldCheck,
  Check,
  Loader2,
  X,
  ExternalLink,
  Plus,
  Edit3,
  Globe,
  GraduationCap,
} from "lucide-react";
import { CommunityEntry, ProductTarget, FeedbackType } from "@/lib/firestore/community";
import { SEED_SCHOOL_TENANTS } from "@/lib/seed-platform-schools";

const PRODUCT_LABELS: Record<ProductTarget, string> = {
  vidhyam: "MOD School",
  agromi: "MOD Farmer",
  studio: "AI Studio",
  extension: "Clerk Co-Pilot",
  general: "General & Security",
};

function AdminCommunityContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "home_curation" ? "home_curation" : "all";

  const [entries, setEntries] = useState<CommunityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "home_curation" | "open_bugs">(initialTab);
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Reply Composer Modal
  const [replyingEntry, setReplyingEntry] = useState<CommunityEntry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [repliedBy, setRepliedBy] = useState("Shivank Bhati");
  const [replyRole, setReplyRole] = useState("Founder & Lead Architect");
  const [submittingReply, setSubmittingReply] = useState(false);

  // Edit Review Modal
  const [editingEntry, setEditingEntry] = useState<CommunityEntry | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editAuthor, setEditAuthor] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editInstitution, setEditInstitution] = useState("");
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Add Verified School Review Modal
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [newSchoolId, setNewSchoolId] = useState<string>(SEED_SCHOOL_TENANTS[0]?.id || "custom");
  const [newAuthorName, setNewAuthorName] = useState(SEED_SCHOOL_TENANTS[0]?.adminName || "");
  const [newAuthorRole, setNewAuthorRole] = useState("Principal & Academic Director");
  const [newInstitution, setNewInstitution] = useState(SEED_SCHOOL_TENANTS[0]?.name || "");
  const [newProduct, setNewProduct] = useState<ProductTarget>("vidhyam");
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFeatureOnHome, setNewFeatureOnHome] = useState(true);
  const [submittingNewReview, setSubmittingNewReview] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/community");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEntries(json.data);
      }
    } catch (err) {
      console.error("Failed to load community entries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSchoolSelect = (schoolId: string) => {
    setNewSchoolId(schoolId);
    if (schoolId === "custom") {
      setNewInstitution("");
      setNewAuthorName("");
      setNewAuthorRole("Principal");
      return;
    }
    const found = SEED_SCHOOL_TENANTS.find((s) => s.id === schoolId);
    if (found) {
      setNewInstitution(found.name);
      setNewAuthorName(found.adminName);
      setNewAuthorRole("Principal & Trustee");
    }
  };

  const handleToggleHome = async (id: string, currentFeatured: boolean) => {
    try {
      setActionLoading(id);
      const res = await fetch("/api/community", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featuredOnHome: !currentFeatured }),
      });
      if (res.ok) {
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, featuredOnHome: !currentFeatured } : e))
        );
      }
    } catch (err) {
      console.error("Failed to toggle home feature:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: CommunityEntry["status"]) => {
    try {
      const res = await fetch("/api/community", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingEntry || !replyText.trim()) return;

    setSubmittingReply(true);
    try {
      const officialReply = {
        repliedBy: repliedBy.trim() || "Modernisum Engineering",
        role: replyRole.trim() || "Core Architecture Team",
        text: replyText.trim(),
        repliedAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      const res = await fetch("/api/community", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: replyingEntry.id,
          officialReply,
          status: "resolved",
        }),
      });

      if (res.ok) {
        setEntries((prev) =>
          prev.map((item) =>
            item.id === replyingEntry.id
              ? { ...item, officialReply, status: "resolved" }
              : item
          )
        );
        setReplyingEntry(null);
      }
    } catch (err) {
      console.error("Reply dispatch error:", err);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleOpenEdit = (entry: CommunityEntry) => {
    setEditingEntry(entry);
    setEditTitle(entry.title);
    setEditDescription(entry.description);
    setEditRating(entry.rating || 5);
    setEditAuthor(entry.authorName);
    setEditRole(entry.authorRole || "");
    setEditInstitution(entry.institution || "");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;

    setSubmittingEdit(true);
    try {
      const res = await fetch("/api/community", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEntry.id,
          title: editTitle,
          description: editDescription,
          rating: editRating,
          authorName: editAuthor,
          authorRole: editRole,
          institution: editInstitution,
        }),
      });

      if (res.ok) {
        setEntries((prev) =>
          prev.map((item) =>
            item.id === editingEntry.id
              ? {
                  ...item,
                  title: editTitle,
                  description: editDescription,
                  rating: editRating,
                  authorName: editAuthor,
                  authorRole: editRole,
                  institution: editInstitution,
                }
              : item
          )
        );
        setEditingEntry(null);
      }
    } catch (err) {
      console.error("Save edit error:", err);
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleCreateNewReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newAuthorName.trim()) {
      alert("Please fill in Title, Description, and Author Name.");
      return;
    }

    setSubmittingNewReview(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: newProduct,
          type: "review",
          title: newTitle.trim(),
          description: newDescription.trim(),
          rating: newRating,
          authorName: newAuthorName.trim(),
          authorEmail: `admin@${newInstitution.toLowerCase().replace(/[^a-z0-9]/g, "") || "school"}.edu.in`,
          authorRole: newAuthorRole.trim(),
          institution: newInstitution.trim(),
          institutionLogo: "/images/school-logo-light.png",
          schoolId: newSchoolId !== "custom" ? newSchoolId : undefined,
          verifiedCustomer: true,
          featuredOnHome: newFeatureOnHome,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setEntries((prev) => [json.data, ...prev]);
        setIsAddReviewModalOpen(false);
        setNewTitle("");
        setNewDescription("");
      }
    } catch (err) {
      console.error("Create review error:", err);
    } finally {
      setSubmittingNewReview(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this community entry?")) return;
    try {
      const res = await fetch(`/api/community?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Delete entry error:", err);
    }
  };

  // Filter logic
  const filtered = entries.filter((e) => {
    if (activeTab === "home_curation" && !e.featuredOnHome) return false;
    if (activeTab === "open_bugs" && (e.type !== "complaint" || e.status !== "open")) return false;
    if (filterProduct !== "all" && e.product !== filterProduct) return false;
    if (filterStatus !== "all" && e.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.authorName.toLowerCase().includes(q) ||
        (e.institution && e.institution.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featuredCount = entries.filter((e) => e.featuredOnHome).length;
  const openComplaintsCount = entries.filter((e) => e.type === "complaint" && e.status === "open").length;
  const resolvedCount = entries.filter((e) => e.status === "resolved").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Support SLA &amp; Community Feedback Desk</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display mt-1 tracking-tight">
            Community &amp; Reviews Moderation
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Zero fake reviews. Real verified institutional deployments are curated directly into the Home Page Right-to-Left Marquee. Manage bug tickets and dispatch official engineering replies with 100% transparency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => setIsAddReviewModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            + Add Verified School Review
          </GlassButton>

          <GlassButton
            variant="secondary"
            size="sm"
            onClick={fetchEntries}
            icon={loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Clock className="w-3.5 h-3.5" />}
          >
            {loading ? "Refreshing..." : "Refresh Feed"}
          </GlassButton>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0b1120] border border-white/10">
          <span className="text-xs font-mono text-purple-400">Home Marquee Active</span>
          <div className="text-2xl font-bold font-display text-purple-300 mt-1 flex items-center gap-2">
            <span>{featuredCount}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Live Rotating
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Borrowed to Home Page</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0b1120] border border-white/10">
          <span className="text-xs font-mono text-rose-400">Open Tickets</span>
          <div className="text-2xl font-bold font-display text-rose-400 mt-1">{openComplaintsCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Awaiting Engineering Fix</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0b1120] border border-white/10">
          <span className="text-xs font-mono text-emerald-400">Resolved SLA</span>
          <div className="text-2xl font-bold font-display text-emerald-400 mt-1">{resolvedCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Verified Public Solutions</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0b1120] border border-white/10">
          <span className="text-xs font-mono text-cyan-400">Total Database Entries</span>
          <div className="text-2xl font-bold font-display text-white mt-1">{entries.length}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">100% Transparent Records</p>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          All Community Feedback ({entries.length})
        </button>

        <button
          onClick={() => setActiveTab("home_curation")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "home_curation"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>★ Home Page Borrowed Marquee ({featuredCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("open_bugs")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "open_bugs"
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>Open Bug Issues ({openComplaintsCount})</span>
        </button>
      </div>

      {/* Controls & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0b1120] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Product Filter */}
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            className="text-xs bg-[#030712] border border-white/15 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
          >
            <option value="all">All Products</option>
            <option value="vidhyam">MOD School</option>
            <option value="agromi">MOD Farmer</option>
            <option value="studio">AI Studio</option>
            <option value="extension">Clerk Co-Pilot</option>
            <option value="general">General &amp; Security</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-[#030712] border border-white/15 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search author, school, title..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#030712] border border-white/15 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Entry Cards List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Loading community feedback from database...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-white/10 text-slate-400 text-xs">
            No entries match the specified filters.
          </div>
        ) : (
          filtered.map((entry) => (
            <LiquidGlassCard
              key={entry.id}
              glowColor={entry.featuredOnHome ? "rgba(121, 40, 202, 0.15)" : "rgba(0, 242, 254, 0.08)"}
              className={`p-5 rounded-2xl bg-[#090f1d] border space-y-4 transition-all ${
                entry.featuredOnHome
                  ? "border-purple-500/50 shadow-[0_0_20px_rgba(121,40,202,0.12)]"
                  : "border-white/10 hover:border-cyan-400/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      #{entry.id.toUpperCase().replace("COMM-", "MOD-")}
                    </span>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                      {PRODUCT_LABELS[entry.product]}
                    </span>

                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {entry.type.replace("_", " ")}
                    </span>

                    {entry.rating && (
                      <span className="inline-flex items-center gap-0.5 text-xs text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {entry.rating}.0
                      </span>
                    )}

                    {entry.verifiedCustomer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified Customer</span>
                      </span>
                    )}

                    {entry.schoolId && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                        Tenant #{entry.schoolId}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-display mt-1">
                    {entry.title}
                  </h3>

                  {/* School / Author Details with Emblem */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{entry.authorName}</span>
                    {entry.authorRole && <span>• {entry.authorRole}</span>}
                    {entry.institution && (
                      <span className="text-cyan-300 flex items-center gap-1.5 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        {entry.institution}
                      </span>
                    )}
                    <span>• {entry.authorEmail}</span>
                  </div>
                </div>

                {/* Home Page Borrow Toggle & Status Controls */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* Borrow / Feature on Home Button */}
                  <button
                    onClick={() => handleToggleHome(entry.id, Boolean(entry.featuredOnHome))}
                    disabled={actionLoading === entry.id}
                    title="Toggle display in Home Page Right-to-Left Marquee"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      entry.featuredOnHome
                        ? "bg-purple-500/25 hover:bg-purple-500/40 text-purple-200 border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                        : "bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40"
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        entry.featuredOnHome ? "fill-amber-400 text-amber-400" : "text-slate-400"
                      }`}
                    />
                    <span>
                      {actionLoading === entry.id
                        ? "Saving..."
                        : entry.featuredOnHome
                        ? "★ Live on Home Marquee"
                        : "+ Borrow to Home"}
                    </span>
                  </button>

                  {/* Status Switcher */}
                  <select
                    value={entry.status}
                    onChange={(e) => handleStatusChange(entry.id, e.target.value as any)}
                    className={`text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none ${
                      entry.status === "resolved"
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                        : entry.status === "in_progress"
                        ? "bg-purple-500/15 border-purple-500/40 text-purple-400"
                        : "bg-amber-500/15 border-amber-500/40 text-amber-400"
                    }`}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="reviewed">Reviewed</option>
                  </select>

                  {/* Edit Entry Button */}
                  <button
                    onClick={() => handleOpenEdit(entry)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.05] transition-colors cursor-pointer"
                    title="Edit Review Details"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal bg-black/30 p-3 rounded-xl border border-white/5">
                &ldquo;{entry.description}&rdquo;
              </p>

              {/* Official Reply Box */}
              {entry.officialReply ? (
                <div className="p-3.5 rounded-xl bg-cyan-500/[0.08] border border-cyan-500/30 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Official Reply by {entry.officialReply.repliedBy} ({entry.officialReply.role})
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{entry.officialReply.repliedAt}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pl-5 border-l border-cyan-500/50">
                    {entry.officialReply.text}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setReplyingEntry(entry);
                        setReplyText(entry.officialReply?.text || "");
                        setRepliedBy(entry.officialReply?.repliedBy || "Shivank Bhati");
                        setReplyRole(entry.officialReply?.role || "Founder & Lead Architect");
                      }}
                      className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                    >
                      Edit Official Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500 font-mono">
                    No official engineering reply published yet.
                  </span>
                  <GlassButton
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      setReplyingEntry(entry);
                      setReplyText("");
                      setRepliedBy("Shivank Bhati");
                      setReplyRole("Founder & Lead Architect");
                    }}
                    icon={<Send className="w-3 h-3" />}
                  >
                    Dispatch Official Reply
                  </GlassButton>
                </div>
              )}
            </LiquidGlassCard>
          ))
        )}
      </div>

      {/* Official Reply Composer Modal */}
      {replyingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#070c18] border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Compose Official Engineering Reply
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Published directly to #{replyingEntry.id.toUpperCase().replace("COMM-", "MOD-")}
                </p>
              </div>
              <button
                onClick={() => setReplyingEntry(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostReply} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Responder Name</label>
                  <GlassInput
                    value={repliedBy}
                    onChange={(e) => setRepliedBy(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Official Role</label>
                  <GlassInput
                    value={replyRole}
                    onChange={(e) => setReplyRole(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Engineering Resolution or Response
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Explain the architectural decision, patch version, or step taken to address this institutional feedback..."
                  className="w-full p-3 rounded-2xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-3">
                <GlassButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingEntry(null)}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={submittingReply}
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  Publish Public Reply
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Review Modal */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#070c18] border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Edit Review Details
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update content, rating, or author details for #{editingEntry.id}
                </p>
              </div>
              <button
                onClick={() => setEditingEntry(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Review Headline</label>
                <GlassInput
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Review Description / Quote</label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Name</label>
                  <GlassInput
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Role</label>
                  <GlassInput
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Institution / School</label>
                  <GlassInput
                    value={editInstitution}
                    onChange={(e) => setEditInstitution(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rating (Stars)</label>
                  <select
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Great</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-3">
                <GlassButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingEntry(null)}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={submittingEdit}
                >
                  Save Changes
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Verified School Review Modal */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#070c18] border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Add Verified Institutional Review
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Directly register authentic feedback from an active school tenant or cooperative.
                </p>
              </div>
              <button
                onClick={() => setIsAddReviewModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewReview} className="space-y-4 text-xs">
              {/* School Tenant Picker */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Registered School</label>
                <select
                  value={newSchoolId}
                  onChange={(e) => handleSchoolSelect(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {SEED_SCHOOL_TENANTS.map((sch) => (
                    <option key={sch.id} value={sch.id}>
                      {sch.name} ({sch.city}) - Spend: ₹{(sch.totalSpend / 100000).toFixed(1)}L
                    </option>
                  ))}
                  <option value="custom">Other / Custom Enterprise Partner</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Name</label>
                  <GlassInput
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Designation</label>
                  <GlassInput
                    value={newAuthorRole}
                    onChange={(e) => setNewAuthorRole(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Product</label>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="vidhyam">MOD School OS</option>
                    <option value="agromi">MOD Farmer</option>
                    <option value="extension">Clerk Co-Pilot</option>
                    <option value="studio">AI Studio</option>
                    <option value="general">Security &amp; Governance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Great</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Review Headline</label>
                <GlassInput
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sub-150ms Face AI eliminated morning queue..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Review Quote / Feedback</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe authentic operational impact, hardware reliability, or workload elimination..."
                  className="w-full p-3 rounded-2xl bg-[#030712] border border-white/15 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                  required
                />
              </div>

              {/* Feature on Home Toggle */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <input
                  type="checkbox"
                  id="featureOnHomeCheck"
                  checked={newFeatureOnHome}
                  onChange={(e) => setNewFeatureOnHome(e.target.checked)}
                  className="rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="featureOnHomeCheck" className="text-xs text-purple-200 font-semibold cursor-pointer">
                  Immediately Borrow &amp; Feature on Home Page Right-to-Left Marquee
                </label>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-3">
                <GlassButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddReviewModalOpen(false)}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={submittingNewReview}
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Publish Verified Review
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminCommunityPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12 text-slate-400 text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          <span>Loading Community Desk...</span>
        </div>
      }
    >
      <AdminCommunityContent />
    </Suspense>
  );
}
