"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  ScanFace, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export function VidhyamHero() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Main Text, CTAs & Metrics */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>The Autonomous School Operating System</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] font-display">
              Zero administrative drag. <br />
              <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Pure educational focus.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-xl">
              Vidhyam replaces fragmented paper registers, timetable clashes, and manual fee tallying
              with an intelligent, mathematical school engine running on campus.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link href="/vidhyam/contact">
                <GlassButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Free School Setup
                </GlassButton>
              </Link>

              <Link href="/vidhyam/features">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  icon={<ChevronRight className="w-4 h-4 text-slate-400" />}
                >
                  Explore Capabilities
                </GlassButton>
              </Link>
            </div>

            {/* Stats Counter Row (All 3 stats visible on both mobile and desktop) */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-8 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">0.4s</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  Gate Face AI<br />recognition
                </div>
              </div>
              <div className="hidden sm:block h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">99.8%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  On-time fee<br />recovery
                </div>
              </div>
              <div className="hidden sm:block h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">3+ Hrs</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  Saved daily<br />per teacher
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Responsive Cockpit (Clean Stack on Mobile, Floating 3D on Desktop) */}
          <div className="lg:col-span-6 relative">
            {/* Background ambient radial glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* MOBILE LAYOUT: Clean non-overlapping vertical stack (< lg) */}
            <div className="flex flex-col gap-4 lg:hidden max-w-sm mx-auto">
              {/* Card 1 Mobile */}
              <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.35)" className="p-4 border-slate-200/80 dark:border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    Gate Attendance Telemetry
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <ScanFace className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono">1,418 / 1,440</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Students Verified Ingress</div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Latency: <strong className="text-cyan-600 dark:text-cyan-300">0.38s</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">98.5% Present</span>
                </div>
              </LiquidGlassCard>

              {/* Card 3 Mobile (Timetable) */}
              <LiquidGlassCard glowColor="rgba(99, 102, 241, 0.35)" className="p-4 border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Autonomous Engine</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Zero Roster Clashes</div>
                  </div>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Class 10-A • Mathematics</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono">Room 204</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Physics Lab • Practical</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">Sub Assigned</span>
                  </div>
                </div>
              </LiquidGlassCard>

              {/* Card 2 Mobile (Fees) */}
              <LiquidGlassCard glowColor="rgba(16, 185, 129, 0.35)" className="p-4 border-slate-200/80 dark:border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    WhatsApp Fee Recovery
                  </span>
                  <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white font-mono">₹3,84,500</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Auto-Reconciled Direct to Bank</div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>Receipts Dispatched</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">100%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full w-[96%]" />
                  </div>
                </div>
              </LiquidGlassCard>
            </div>

            {/* DESKTOP LAYOUT: Full 3D Floating Glass Cockpit (>= lg) */}
            <div className="hidden lg:flex relative w-full min-h-[500px] items-center justify-center">
              {/* CARD 1: Gate AI Attendance Pulse */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-4 z-20 w-68"
              >
                <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.35)" className="p-5 border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                      Gate Attendance Telemetry
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      LIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <ScanFace className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">1,418 / 1,440</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-light">Students Verified Ingress</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Scan Latency: <strong className="text-cyan-600 dark:text-cyan-300">0.38s</strong></span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">98.5% Present</span>
                  </div>
                </LiquidGlassCard>
              </motion.div>

              {/* CARD 2: Autonomous WhatsApp Fee Recovery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-2 right-4 z-20 w-72"
              >
                <LiquidGlassCard glowColor="rgba(16, 185, 129, 0.35)" className="p-5 border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      WhatsApp Fee Recovery
                    </span>
                    <CreditCard className="w-4 h-4 text-emerald-500" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">₹3,84,500</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-light">Auto-Reconciled Direct to Bank</div>
                  </div>

                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Parent Receipts Dispatched</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">100%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full w-[96%]" />
                    </div>
                  </div>
                </LiquidGlassCard>
              </motion.div>

              {/* CARD 3: Central Timetable & Conflict Engine */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10 w-80"
              >
                <LiquidGlassCard glowColor="rgba(99, 102, 241, 0.35)" className="p-5 border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Autonomous Engine</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Zero Roster Clashes</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Class 10-A • Mathematics</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[11px]">Room 204</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Physics Lab • Practical</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">Sub Assigned</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      48 Faculty Balanced
                    </span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-300">0.02s Math Sync</span>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
