"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Sparkles,
  School,
  Inbox,
  Activity,
  HardDrive,
  Database,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Send,
  Loader2,
  TrendingUp,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AdminDashboardPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Gemini 1-Click Content Synthesizer
  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/admin/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, type: "blog" }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiResult(data.data);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  // Seed / Sync Database
  const handleSeedDatabase = async () => {
    setSeedLoading(true);
    setSeedMsg(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedMsg(data.message || "Database synchronization complete.");
      confetti({
        particleCount: 70,
        spread: 70,
      });
    } catch (err) {
      setSeedMsg("Error syncing database.");
    } finally {
      setSeedLoading(false);
    }
  };

  const copyResult = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(JSON.stringify(aiResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Executive Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
            Modernisum Operations, Gemini AI Automation & 5TB Cloud Storage Cockpit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="secondary"
            size="sm"
            loading={seedLoading}
            onClick={handleSeedDatabase}
            icon={<Database className="w-3.5 h-3.5 text-cyan-400" />}
          >
            Sync / Seed Database
          </GlassButton>

          <Link href="/admin/media">
            <GlassButton
              variant="primary"
              size="sm"
              icon={<HardDrive className="w-3.5 h-3.5" />}
            >
              5TB Media Manager
            </GlassButton>
          </Link>
        </div>
      </div>

      {seedMsg && (
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{seedMsg}</span>
        </div>
      )}

      {/* Bento Grid Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <LiquidGlassCard
          glowColor="rgba(121, 40, 202, 0.2)"
          className="p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <School className="w-5 h-5" />
            </div>
            <Link
              href="/admin/schools"
              className="text-[11px] text-purple-300 hover:underline flex items-center gap-0.5"
            >
              <span>Fleet</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <span className="text-xs text-slate-400 block font-mono">Cloud Schools Fleet</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            5 Schools
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-light">
            4 Active • 1 Suspended • SaaS Tier
          </p>
        </LiquidGlassCard>

        {/* KPI 2 */}
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.2)"
          className="p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Inbox className="w-5 h-5" />
            </div>
            <Link
              href="/admin/enquiries"
              className="text-[11px] text-cyan-300 hover:underline flex items-center gap-0.5"
            >
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <span className="text-xs text-slate-400 block font-mono">Inquiries & Leads</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            48 Leads
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-light">
            8 new architecture requests this week
          </p>
        </LiquidGlassCard>

        {/* KPI 3 */}
        <LiquidGlassCard
          glowColor="rgba(16, 185, 129, 0.2)"
          className="p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Online</span>
          </div>
          <span className="text-xs text-slate-400 block font-mono">Microservices Uptime</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            99.98%
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-light">
            Zero unhandled exceptions recorded
          </p>
        </LiquidGlassCard>

        {/* KPI 4 */}
        <LiquidGlassCard
          glowColor="rgba(245, 158, 11, 0.2)"
          className="p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-amber-300">5TB Pool</span>
          </div>
          <span className="text-xs text-slate-400 block font-mono">Google Drive Storage</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            245 MB / 5.0 TB
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-light">
            Vidhyam service account active
          </p>
        </LiquidGlassCard>
      </div>

      {/* AI Content Engine Section (Gemini 2.0 Integration) */}
      <div id="ai-engine">
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.15)"
          className="p-6 sm:p-8 rounded-3xl border border-cyan-500/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-semibold text-cyan-300 mb-2 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero-Effort Gemini Content Automation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                1-Click AI Blog & SEO Meta Synthesizer
              </h2>
              <p className="text-xs text-slate-300 mt-1 font-light">
                Type 3-5 keywords or a headline idea. Gemini API will synthesize an entire SEO article, tags, and meta tags.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <GlassInput
                placeholder="e.g. Next.js 16 performance optimization for RFID school buses..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
            </div>
            <GlassButton
              variant="primary"
              loading={aiLoading}
              onClick={handleGenerateAI}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Synthesize with Gemini
            </GlassButton>
          </div>

          {/* AI Result Card */}
          {aiResult && (
            <div className="mt-6 p-6 rounded-2xl bg-white/[0.03] border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-cyan-300">
                  Synthesized Output Ready
                </span>
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "Copied!" : "Copy JSON"}</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {aiResult.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 italic">
                  &ldquo;{aiResult.excerpt}&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-slate-300 space-y-2">
                <div><span className="text-cyan-400">Meta Title:</span> {aiResult.metaTitle}</div>
                <div><span className="text-purple-400">Meta Description:</span> {aiResult.metaDescription}</div>
                <div>
                  <span className="text-emerald-400">Tags:</span>{" "}
                  {aiResult.tags?.map((t: string, i: number) => (
                    <span key={i} className="mr-2 text-slate-300">#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </LiquidGlassCard>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/services">
          <LiquidGlassCard
            glowColor="rgba(121, 40, 202, 0.15)"
            className="p-6 rounded-3xl border border-white/10 hover:border-purple-400/40 transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                Manage Services & Solutions
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-light">
                Inline edit titles, feature lists, pricing, and FAQs.
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
          </LiquidGlassCard>
        </Link>

        <Link href="/admin/enquiries">
          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                View Client Enquiries & Quotes
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-light">
                Manage inbound client leads, service requirements, and budgets.
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
          </LiquidGlassCard>
        </Link>
      </div>
    </div>
  );
}
