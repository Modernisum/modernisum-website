"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  HardDrive,
  Server,
  CloudOff,
  Cpu,
  Clock,
  Banknote,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  Sparkles,
  RefreshCw,
  FileText,
  Award,
  Building2,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  ChevronRight,
  Globe,
  FileCheck2,
  Layers,
  Share2,
  Download,
  FileDown,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ShareModal } from "@/components/ui/ShareModal";
import {
  FirestorePolicyDoc,
  PolicySectionItem,
  POLICY_CATEGORIES,
  DEFAULT_POLICIES_SEED,
  subscribeToPolicies,
} from "@/lib/firestore/policies";

interface PolicyCenterLayoutProps {
  variant?: "modernisum" | "school" | "vidhyam";
  defaultPolicySlug?: string;
}

export function PolicyCenterLayout({
  variant = "modernisum",
  defaultPolicySlug = "terms",
}: PolicyCenterLayoutProps) {
  const [policies, setPolicies] = useState<FirestorePolicyDoc[]>(DEFAULT_POLICIES_SEED);
  const [activeSlug, setActiveSlug] = useState<string>(defaultPolicySlug);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);
  const [firebaseStatus, setFirebaseStatus] = useState<"synced" | "fallback" | "seeding">("synced");

  const isVidhyam = variant === "vidhyam" || variant === "school";
  const accentText = isVidhyam ? "text-sky-600 dark:text-sky-400" : "text-cyan-600 dark:text-cyan-400";
  const accentBg = isVidhyam ? "bg-sky-500/10" : "bg-cyan-500/10";
  const accentBorder = isVidhyam ? "border-sky-500/30" : "border-cyan-500/30";
  const accentRing = isVidhyam ? "ring-sky-500/20" : "ring-cyan-500/20";
  const accentGlow = isVidhyam ? "from-sky-500/20 to-indigo-500/10" : "from-cyan-500/20 to-indigo-500/10";

  // 1. Subscribe to Firebase Firestore live policies
  useEffect(() => {
    const unsubscribe = subscribeToPolicies(
      (updatedPolicies) => {
        if (updatedPolicies && updatedPolicies.length > 0) {
          setPolicies(updatedPolicies);
          setFirebaseStatus("synced");
        }
      },
      (variant === "vidhyam" || variant === "school") ? "vidhyam" : "all"
    );

    return () => unsubscribe();
  }, [variant]);

  // 2. Handle initial deep-link hash and tab switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // Find which policy contains this section ID
        for (const pol of policies) {
          const match = pol.sections.find((s) => s.id === hash);
          if (match) {
            setActiveSlug(pol.slug);
            setActiveSectionId(hash);
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 300);
            return;
          }
        }
      }
    }
  }, [policies]);

  // Current active policy document
  const currentPolicy = useMemo(() => {
    return policies.find((p) => p.slug === activeSlug) || policies[0] || DEFAULT_POLICIES_SEED[0];
  }, [policies, activeSlug]);

  // Direct sorted policies list for compact, space-optimized navigation
  const sortedPolicies = useMemo(() => {
    return [...policies].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [policies]);

  // Handle section jump
  const scrollToSection = (secId: string, policySlug?: string) => {
    if (policySlug && policySlug !== activeSlug) {
      setActiveSlug(policySlug);
    }
    setActiveSectionId(secId);

    setTimeout(() => {
      const el = document.getElementById(secId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", `#${secId}`);
        }
      }
    }, 100);
  };

  // Copy link to section
  const handleCopyLink = (secId: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${secId}`;
      navigator.clipboard.writeText(url);
      setCopiedId(secId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Seed policies to Firebase Firestore directly with live feedback
  const handleSeedToFirebase = async () => {
    setIsSeeding(true);
    setSeedNotice(null);
    try {
      const res = await fetch("/api/policies/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedNotice(
          `Firebase Live: Added ${data.seededCount} categorized master policies and ${currentPolicy.sections.length} headlines into Firebase Firestore.`
        );
        setFirebaseStatus("synced");
      } else {
        setSeedNotice(`Seed notice: ${data.error || "Seeded default local registry"}`);
      }
    } catch (err: any) {
      setSeedNotice("Policies synchronized in local-first registry.");
    } finally {
      setIsSeeding(false);
      setTimeout(() => setSeedNotice(null), 6000);
    }
  };

  // Scroll spy to highlight current section in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = currentPolicy.sections;
      const scrollY = window.scrollY;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 200) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPolicy]);

  // Previous and next policy switching
  const currentIndex = policies.findIndex((p) => p.slug === activeSlug);
  const prevPolicy = currentIndex > 0 ? policies[currentIndex - 1] : null;
  const nextPolicy = currentIndex < policies.length - 1 ? policies[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar variant={variant} />

      <main className="flex-1 w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-16">
        {/* Master Policy Center Grid (Sidebar Left + Content Right) starting directly at top */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: DIRECT POLICIES & QUICK ACTIONS            */}
          {/* ======================================================== */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-14 space-y-2.5">
            {/* Quick Action Tools: Print, Share & Agreement PDF (Statically pinned in left sidebar) */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.print();
                  }
                }}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 transition-all shadow-xs"
                title="Print or Export PDF"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-500" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 transition-all shadow-xs"
                title="Share Document"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Share</span>
              </button>
              <a
                href="/documents/Modernisum-School-Master-Software-License-Agreement.pdf"
                download="Modernisum-School-Master-Software-License-Agreement.pdf"
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 transition-all shadow-xs"
                title="Download Official Agreement PDF (758 KB)"
              >
                <FileDown className="w-3.5 h-3.5 text-cyan-500" />
                <span>PDF</span>
              </a>
            </div>

            {/* Official Attached Agreements & Policies in Sidebar */}
            <div className="space-y-2">
              <a
                href="/documents/MOD-School-Master-Software-License-Agreement.pdf"
                download="MOD-School-Master-Software-License-Agreement.pdf"
                className="block p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-transparent border border-cyan-500/30 hover:border-cyan-400 transition-all group"
                title="Download Official Executed Master Software License & Agreement PDF"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors truncate">
                        Master License Agreement
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        1.05 MB • 4 Pages • MSME
                      </div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors shrink-0 ml-1" />
                </div>
              </a>

              <a
                href="/documents/MOD-School-Official-Subscription-Pricing-Policy.pdf"
                download="MOD-School-Official-Subscription-Pricing-Policy.pdf"
                className="block p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/30 hover:border-emerald-400 transition-all group"
                title="Download Official Subscription, Transparent Pricing & Refund Policy PDF"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Banknote className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors truncate">
                        Subscription & Pricing PDF
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        980 KB • 2 Pages • 0% GST
                      </div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0 ml-1" />
                </div>
              </a>
            </div>

            {/* Compact Direct Policy Navigation List (Single level, zero redundant category headers) */}
            <div className="space-y-1.5">
              {sortedPolicies.map((pol) => {
                const isActive = pol.slug === activeSlug;

                return (
                  <div
                    key={pol.slug}
                    className={`rounded-2xl transition-all ${
                      isActive
                        ? "bg-white/90 dark:bg-white/[0.05] border border-cyan-500/30 dark:border-cyan-400/30 shadow-xs"
                        : "hover:bg-slate-100/70 dark:hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    {/* Policy Tab Header Button */}
                    <button
                      onClick={() => {
                        setActiveSlug(pol.slug);
                        setActiveSectionId("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        if (typeof window !== "undefined") {
                          window.history.replaceState(null, "", `#${pol.slug}`);
                        }
                      }}
                      className="w-full flex items-center justify-between p-2.5 text-left group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                            isActive
                              ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                              : "bg-slate-200/60 dark:bg-white/5 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"
                          }`}
                        >
                          {pol.slug === "terms" && <Scale className="w-3.5 h-3.5" />}
                          {pol.slug === "subscription" && <Banknote className="w-3.5 h-3.5" />}
                          {pol.slug === "privacy" && <ShieldCheck className="w-3.5 h-3.5" />}
                          {pol.slug === "dpdp" && <Lock className="w-3.5 h-3.5" />}
                          {pol.slug === "licensing" && <FileCheck2 className="w-3.5 h-3.5" />}
                          {pol.slug !== "terms" &&
                            pol.slug !== "subscription" &&
                            pol.slug !== "privacy" &&
                            pol.slug !== "dpdp" &&
                            pol.slug !== "licensing" && <FileText className="w-3.5 h-3.5" />}
                        </span>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-bold transition-colors truncate ${
                              isActive
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                            }`}
                          >
                            {pol.shortTitle}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {pol.sections.length} clauses
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? "text-cyan-500 rotate-90"
                            : "text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5"
                        }`}
                      />
                    </button>

                    {/* Expandable Section Headlines for Active Policy */}
                    {isActive && (
                      <div className="px-2.5 pb-2.5 pt-1 space-y-0.5 border-t border-slate-200/60 dark:border-white/5">
                        {pol.sections.map((sec) => {
                          const isSecActive = activeSectionId === sec.id;

                          return (
                            <button
                              key={sec.id}
                              onClick={() => scrollToSection(sec.id, pol.slug)}
                              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors truncate block ${
                                isSecActive
                                  ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-semibold"
                                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                              }`}
                            >
                              {sec.title}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Category Quick Tabs Bar */}
            <div className="lg:hidden p-3 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Quick Switch Document</span>
              <div className="flex flex-wrap gap-1.5">
                {sortedPolicies.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => {
                      setActiveSlug(p.slug);
                      setActiveSectionId("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      p.slug === activeSlug
                        ? "bg-cyan-500 text-white"
                        : "bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {p.shortTitle}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* RIGHT MAIN CONTENT: ACTIVE POLICY & STRUCTURED CLAUSES   */}
          {/* ======================================================== */}
          <div className="flex-1 w-full max-w-5xl space-y-8">
            {/* Active Policy Header & Metadata */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-slate-900 dark:text-white">
                {currentPolicy.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-light">
                {currentPolicy.badge && (
                  <>
                    <span className="inline-flex items-center gap-1 font-mono text-cyan-600 dark:text-cyan-400 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>{currentPolicy.badge}</span>
                    </span>
                    <span>•</span>
                  </>
                )}
                <span>Effective Date: {currentPolicy.effectiveDate}</span>
                <span>•</span>
                <span>Last Update Registered: {currentPolicy.lastUpdated}</span>
              </div>
            </div>

            {/* Official Attached Statutory Agreement & Policy Cards (PDF Public Downloads) */}
            {((currentPolicy.pdfAttachments && currentPolicy.pdfAttachments.length > 0)
              ? currentPolicy.pdfAttachments
              : currentPolicy.pdfAttachment
              ? [currentPolicy.pdfAttachment]
              : []
            ).map((att, attIdx) => (
              <div
                key={att.fileName || attIdx}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-purple-500/10 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/30">
                        Official Attached Document
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {att.fileSize}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {att.fileName}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-light">
                      {att.sealText}
                    </p>
                    {att.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-light">
                        {att.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1.5"
                    title="Open PDF directly in browser"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </a>
                  <a
                    href={att.url}
                    download={att.fileName}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm"
                    title="Download official executed PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}

            {/* Statutory Preamble & Electronic Binding Notice */}
            {currentPolicy.preamble && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border-l-4 border-cyan-500 border-y border-r border-slate-200/80 dark:border-white/10 space-y-1.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                  {currentPolicy.preamble.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {currentPolicy.preamble.text}
                </p>
              </div>
            )}

            {/* Executive Commitment Card */}
            <LiquidGlassCard
              interactive={false}
              className="p-5 sm:p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-indigo-500/[0.04] space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    {currentPolicy.summaryTitle}
                  </h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
                    {currentPolicy.summarySubtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {currentPolicy.summaryDescription}
              </p>
            </LiquidGlassCard>

            {/* Structured Policy Clauses / Sections */}
            <div className="space-y-6">
              {currentPolicy.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  {/* Single Clean Card Content with Headline INSIDE */}
                  <LiquidGlassCard interactive={false} className="p-6 sm:p-7 space-y-4">
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                      {sec.title}
                    </h3>

                    {/* Paragraphs */}
                    {sec.content.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {/* Highlights Grid (if any) */}
                    {sec.highlights && sec.highlights.length > 0 && (
                      <div
                        className={`grid grid-cols-1 ${
                          sec.highlights.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"
                        } gap-3 pt-1`}
                      >
                        {sec.highlights.map((h, hIdx) => (
                          <div
                            key={hIdx}
                            className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 space-y-1.5"
                          >
                            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                              {h.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                              {h.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Structured Table (if any) */}
                    {sec.table && (
                      <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-white/10 my-2">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 dark:bg-white/[0.04] border-b border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono">
                              {sec.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3 font-bold uppercase tracking-wider text-[11px]">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/60 dark:divide-white/5 text-slate-600 dark:text-slate-300 font-light">
                            {sec.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3 whitespace-pre-line align-top leading-relaxed">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Code Snippet / Click-Wrap Box (if any) */}
                    {sec.codeSnippet && (
                      <div className="rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-900/90 text-slate-200 p-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/30 shadow-inner">
                        {sec.codeSnippet}
                      </div>
                    )}

                    {/* Official Sign-Off Block (if any) */}
                    {sec.signoffBlock && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-cyan-500/30 space-y-2">
                          <div className="text-[11px] font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">
                            FOR LICENSOR (TECHNOLOGY PROVIDER)
                          </div>
                          <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                            <p>
                              <strong className="text-slate-900 dark:text-white">Entity:</strong>{" "}
                              {sec.signoffBlock.licensor.entity}
                            </p>
                            <p>
                              <strong className="text-slate-900 dark:text-white">MSME Reg. No.:</strong>{" "}
                              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                                {sec.signoffBlock.licensor.msme}
                              </span>
                            </p>
                            <p>
                              <strong className="text-slate-900 dark:text-white">Authorized By:</strong>{" "}
                              {sec.signoffBlock.licensor.authorizedBy}
                            </p>
                            <p>
                              <strong className="text-slate-900 dark:text-white">Address:</strong>{" "}
                              {sec.signoffBlock.licensor.address}
                            </p>
                            <p>
                              <strong className="text-slate-900 dark:text-white">Web / Mail:</strong>{" "}
                              {sec.signoffBlock.licensor.webMail}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-2.5">
                          <div className="text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                            FOR LICENSEE (ONBOARDING SCHOOL)
                          </div>
                          <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                            <div>
                              <span className="text-[10px] text-slate-400 block font-mono">
                                {sec.signoffBlock.licensee.institutionPrompt}
                              </span>
                              <div className="border-b border-dashed border-slate-300 dark:border-white/20 pb-0.5 font-medium text-slate-900 dark:text-white">
                                ____________________________________
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block font-mono">
                                {sec.signoffBlock.licensee.signatoryPrompt}
                              </span>
                              <div className="border-b border-dashed border-slate-300 dark:border-white/20 pb-0.5 font-medium text-slate-900 dark:text-white">
                                Principal / Authorized Signatory
                              </div>
                            </div>
                            <p>
                              <strong className="text-slate-900 dark:text-white">Acceptance Mode:</strong>{" "}
                              {sec.signoffBlock.licensee.acceptanceMode}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bullets (if any) */}
                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light list-disc pl-5">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Alert Callout Box (if any) */}
                    {sec.alert && (
                      <div
                        className={`p-3.5 rounded-xl space-y-1.5 ${
                          sec.alert.type === "critical"
                            ? "bg-rose-500/[0.04] border border-rose-500/20"
                            : sec.alert.type === "warning"
                            ? "bg-amber-500/[0.04] border border-amber-500/20"
                            : "bg-cyan-500/[0.04] border border-cyan-500/20"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 font-bold text-xs font-mono uppercase ${
                            sec.alert.type === "critical"
                              ? "text-rose-600 dark:text-rose-400"
                              : sec.alert.type === "warning"
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-cyan-600 dark:text-cyan-400"
                          }`}
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{sec.alert.title}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 font-light list-disc pl-4">
                          {sec.alert.items.map((it, itIdx) => (
                            <li key={itIdx}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </LiquidGlassCard>
                </section>
              ))}
            </div>

            {/* Bottom Prev / Next Navigation Bar */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevPolicy ? (
                <button
                  onClick={() => {
                    setActiveSlug(prevPolicy.slug);
                    setActiveSectionId("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-start gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-cyan-500" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 font-mono">Previous Document</div>
                    <div>{prevPolicy.shortTitle}</div>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextPolicy && (
                <button
                  onClick={() => {
                    setActiveSlug(nextPolicy.slug);
                    setActiveSectionId("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors text-right"
                >
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-mono">Next Document</div>
                    <div>{nextPolicy.shortTitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-500" />
                </button>
              )}
            </div>

            {/* Statutory Corporate Details & Grievance Contact Card */}
            <LiquidGlassCard interactive={false} className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold font-display text-base">
                <Building2 className="w-4 h-4 text-cyan-500" />
                <span>Statutory Contracting Desk & Grievance Redressal</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400 font-light">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>
                      Registered MSME:{" "}
                      <strong className="font-mono text-cyan-600 dark:text-cyan-400">UDYAM-UP-56-0049848</strong>
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406, India</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                    <a href="mailto:compliance@modernisum.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                      compliance@modernisum.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                    <a href="tel:+919368671007" className="text-slate-900 dark:text-white hover:underline">
                      +91 9368671007
                    </a>
                  </p>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </main>

      <Footer variant={variant} />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${currentPolicy.title} | Modernisum`}
        description={currentPolicy.summaryDescription}
        variant={variant}
      />
    </div>
  );
}
