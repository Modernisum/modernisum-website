"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Star,
  CheckCircle2,
  Trash2,
  Plus,
  ExternalLink,
  Sliders,
  Sparkles,
  Building2,
  X,
  Pin,
  PinOff,
  RefreshCw,
  MessageSquareQuote,
  Eye,
  Layers,
  Users,
  ShieldCheck,
  Building,
  Activity,
} from "lucide-react";
import { CommunityEntry, SEED_COMMUNITY_ENTRIES } from "@/lib/firestore/community";
import { PlatformUser, SEED_PLATFORM_USERS } from "@/lib/platform-users-engine";

interface HomeShowcaseFlyoutProps {
  isOpen: boolean;
  isPinned: boolean;
  onClose: () => void;
  onTogglePin: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function HomeShowcaseFlyout({
  isOpen,
  isPinned,
  onClose,
  onTogglePin,
  onMouseEnter,
  onMouseLeave,
}: HomeShowcaseFlyoutProps) {
  const [entries, setEntries] = useState<CommunityEntry[]>(() => SEED_COMMUNITY_ENTRIES);
  const [users, setUsers] = useState<PlatformUser[]>(() => SEED_PLATFORM_USERS);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"reviews" | "customers" | "sections">("reviews");

  // Telemetry Metrics State (Stored in Firestore site_settings/telemetry)
  const [telemetry, setTelemetry] = useState({
    projectsCompleted: 128,
    satisfiedClients: 85,
    itSpecialists: 24,
    smartSolutions: 42,
    systemUptime: "99.98%",
  });
  const [savingTelemetry, setSavingTelemetry] = useState(false);
  const [telemetrySavedMsg, setTelemetrySavedMsg] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [resComm, resUsers, resTelem] = await Promise.all([
        fetch("/api/community"),
        fetch("/api/admin/users"),
        fetch("/api/admin/telemetry"),
      ]);

      if (resComm.ok) {
        const jsonComm = await resComm.json();
        if (jsonComm.success && Array.isArray(jsonComm.data)) {
          setEntries(jsonComm.data);
        }
      }

      if (resUsers.ok) {
        const jsonUsers = await resUsers.json();
        if (jsonUsers.success && Array.isArray(jsonUsers.users)) {
          setUsers(jsonUsers.users);
        }
      }

      if (resTelem.ok) {
        const jsonTelem = await resTelem.json();
        if (jsonTelem.success && jsonTelem.data) {
          setTelemetry(jsonTelem.data);
        }
      }
    } catch (err) {
      console.warn("Could not load data in HomeShowcaseFlyout:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTelemetry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingTelemetry(true);
      const res = await fetch("/api/admin/telemetry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(telemetry),
      });
      if (res.ok) {
        setTelemetrySavedMsg(true);
        setTimeout(() => setTelemetrySavedMsg(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save telemetry:", err);
    } finally {
      setSavingTelemetry(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleToggleReviewHome = async (id: string, currentState: boolean) => {
    try {
      setActionLoading(id);
      const res = await fetch("/api/community", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          featuredOnHome: !currentState,
        }),
      });
      if (res.ok) {
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, featuredOnHome: !currentState } : e))
        );
      }
    } catch (err) {
      console.error("Failed to toggle home review:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleCustomerHome = async (id: string, currentState: boolean) => {
    try {
      setActionLoading(id);
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          featuredOnHome: !currentState,
        }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, featuredOnHome: !currentState } : u))
        );
      }
    } catch (err) {
      console.error("Failed to toggle home customer:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (!isOpen && !isPinned) return null;

  const featuredReviews = entries.filter((e) => e.featuredOnHome);
  const availableReviews = entries.filter((e) => !e.featuredOnHome && e.type === "review");

  const featuredCustomers = users.filter((u) => u.featuredOnHome);
  const availableCustomers = users.filter(
    (u) => !u.featuredOnHome && (u.role === "school_admin" || u.role === "farmer" || (u.productsActive && u.productsActive.length > 0))
  );

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed lg:absolute top-0 left-64 h-screen w-88 sm:w-96 bg-[#0a0f1d]/98 backdrop-blur-2xl border-r border-white/10 z-50 shadow-2xl flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-left-4"
    >
      {/* Top Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
              <Globe className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white font-tech tracking-wide uppercase">
                Home Page Showcase CMS
              </h3>
              <p className="text-[10px] font-mono text-cyan-400">
                Live Marquee &amp; Real Customer Curation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePin}
              title={isPinned ? "Unpin sidebar" : "Pin sidebar open"}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                isPinned
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                  : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-xl mb-3 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Reviews ({featuredReviews.length})
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "customers"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Customers ({featuredCustomers.length})
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "sections"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sections
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-cyan-200 text-[11px]">
              {activeTab === "reviews"
                ? `${featuredReviews.length} Reviews sliding right-to-left`
                : activeTab === "customers"
                ? `${featuredCustomers.length} Real customers featured on Home`
                : "3 Homepage Sections Active"}
            </span>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            title="Refresh database records"
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* TAB 1: REVIEWS */}
        {activeTab === "reviews" && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
                  Borrowed Reviews on Home ({featuredReviews.length})
                </span>
                <Link
                  href="/admin/community"
                  className="text-[10px] font-mono text-cyan-400 hover:underline"
                >
                  All Feedback →
                </Link>
              </div>

              <div className="space-y-2">
                {featuredReviews.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 text-center bg-white/[0.02] rounded-xl border border-white/5">
                    No reviews currently borrowed. Pick from available feedback below.
                  </p>
                ) : (
                  featuredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex items-start justify-between gap-2 group"
                    >
                      <div className="min-w-0 flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 shrink-0 flex items-center justify-center p-1">
                          {review.institutionLogo ? (
                            <Image
                              src={review.institutionLogo}
                              alt="Logo"
                              width={24}
                              height={24}
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <Building2 className="w-4 h-4 text-purple-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-white truncate">
                              {review.authorName}
                            </span>
                            {review.verifiedCustomer && (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-cyan-300 truncate">
                            {review.institution || "Verified Customer"}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 italic mt-0.5">
                            &ldquo;{review.title}&rdquo;
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleReviewHome(review.id, true)}
                        disabled={actionLoading === review.id}
                        title="Remove review from Home page marquee"
                        className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono shrink-0 transition-colors cursor-pointer"
                      >
                        {actionLoading === review.id ? "..." : "Remove"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {availableReviews.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Borrow Real Reviews to Home ({availableReviews.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {availableReviews.slice(0, 5).map((review) => (
                    <div
                      key={review.id}
                      className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-200 truncate">
                          {review.authorName} •{" "}
                          <span className="text-[10px] font-normal text-slate-400">
                            {review.institution}
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {review.title}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleReviewHome(review.id, false)}
                        disabled={actionLoading === review.id}
                        title="Feature this real community review on Home Page"
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Borrow</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 2: REAL PLATFORM CUSTOMERS */}
        {activeTab === "customers" && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  Showcased Customers ({featuredCustomers.length})
                </span>
                <Link
                  href="/admin/users"
                  className="text-[10px] font-mono text-cyan-400 hover:underline"
                >
                  All Users →
                </Link>
              </div>

              <div className="space-y-2">
                {featuredCustomers.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 text-center bg-white/[0.02] rounded-xl border border-white/5">
                    No customers currently showcased. Pick from verified institutions below.
                  </p>
                ) : (
                  featuredCustomers.map((user) => (
                    <div
                      key={user.id}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex items-start justify-between gap-2 group"
                    >
                      <div className="min-w-0 flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 shrink-0 flex items-center justify-center p-1">
                          {user.institutionLogo ? (
                            <Image
                              src={user.institutionLogo}
                              alt="Logo"
                              width={24}
                              height={24}
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <Building className="w-4 h-4 text-cyan-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {user.organization || user.name}
                          </span>
                          <p className="text-[10px] text-cyan-300 truncate">
                            {user.name} ({user.role})
                          </p>
                          <span className="text-[9px] font-mono text-emerald-400">
                            {user.totalSpend > 0 ? `₹${(user.totalSpend / 100000).toFixed(1)}L Spend` : "Verified User"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleCustomerHome(user.id, true)}
                        disabled={actionLoading === user.id}
                        title="Remove customer from Home page showcase"
                        className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono shrink-0 transition-colors cursor-pointer"
                      >
                        {actionLoading === user.id ? "..." : "Remove"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {availableCustomers.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Available Real Customers ({availableCustomers.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {availableCustomers.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-200 truncate">
                          {user.organization || user.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {user.name} • {user.role}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleCustomerHome(user.id, false)}
                        disabled={actionLoading === user.id}
                        title="Showcase this real customer on Home Page"
                        className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 text-[10px] font-mono font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Feature</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 3: SECTIONS & TELEMETRY */}
        {activeTab === "sections" && (
          <div className="space-y-4">
            {/* Live Telemetry KPI Metrics Form */}
            <form onSubmit={handleSaveTelemetry} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    Homepage Telemetry KPIs
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Direct Firestore sync • 0% synthetic data
                  </span>
                </div>
                {telemetrySavedMsg && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold animate-pulse">
                    Saved to DB ✓
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Software Deliverables (e.g. 128)</label>
                  <input
                    type="number"
                    value={telemetry.projectsCompleted}
                    onChange={(e) => setTelemetry({ ...telemetry, projectsCompleted: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Institutional Clients (e.g. 85)</label>
                  <input
                    type="number"
                    value={telemetry.satisfiedClients}
                    onChange={(e) => setTelemetry({ ...telemetry, satisfiedClients: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Engineers &amp; Architects (e.g. 24)</label>
                  <input
                    type="number"
                    value={telemetry.itSpecialists}
                    onChange={(e) => setTelemetry({ ...telemetry, itSpecialists: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Smart AI Modules (e.g. 42)</label>
                  <input
                    type="number"
                    value={telemetry.smartSolutions}
                    onChange={(e) => setTelemetry({ ...telemetry, smartSolutions: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Infrastructure Uptime (e.g. 99.98%)</label>
                  <input
                    type="text"
                    value={telemetry.systemUptime}
                    onChange={(e) => setTelemetry({ ...telemetry, systemUptime: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingTelemetry}
                className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {savingTelemetry ? "Saving to Database..." : "Save Telemetry to Database"}
              </button>
            </form>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                Home Page Viewport Sections
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <span className="text-slate-200 font-semibold block">Community Reviews Marquee</span>
                    <span className="text-[10px] text-slate-400">Continuous right-to-left slide</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <span className="text-slate-200 font-semibold block">Real Enterprise Customers</span>
                    <span className="text-[10px] text-slate-400">Verified school and agro clients</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <span className="text-slate-200 font-semibold block">Flagship Ventures</span>
                    <span className="text-[10px] text-slate-400">MOD School, MOD Farmer, AI Studio</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-4 border-t border-white/10 bg-black/40 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-semibold text-cyan-200 transition-all cursor-pointer shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Live Home Page</span>
          <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
        </Link>
      </div>
    </aside>
  );
}
