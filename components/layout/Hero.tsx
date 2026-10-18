"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { AuthDialog } from "@/components/ui/AuthDialog";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { useLanguage } from "@/lib/LanguageContext";
import { CeoWorkforceVisual } from "@/components/shared/Ceo3DCartoonWorkforce";
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck, 
  Cpu, 
  Zap, 
  GraduationCap,
  Sprout,
  CheckCircle2,
  Layers,
  Activity,
  Droplets,
  Wifi,
  TrendingUp,
  ScanFace,
  CreditCard,
  Calendar
} from "lucide-react";

export type HeroVariant = "modernisum" | "school" | "vidhyam" | "agromi" | "farmer";

interface HeroProps {
  variant?: HeroVariant;
}

export function Hero({ variant = "modernisum" }: HeroProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const { isHindi } = useLanguage();

  // ==========================================
  // VARIANT: SCHOOL OS
  // ==========================================
  if (variant === "school" || variant === "vidhyam") {
    return (
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 md:px-8">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT COLUMN: Main Text, CTAs & Metrics */}
            <div className="lg:col-span-6 space-y-7 text-left">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isHindi ? "ModSchool • स्वायत्त स्कूल ऑपरेटिंग सिस्टम" : "ModSchool • The Autonomous School Operating System"}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] font-display">
                {isHindi ? (
                  <>
                    मुख्य स्कूल वर्कलोड पूरी तरह ऑटोमेट। <br />
                    <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                      गैजेट्स व सॉफ्टवेयर का फ्रिक्शनलेस इकोसिस्टम।
                    </span>
                  </>
                ) : (
                  <>
                    Major Campus Workload Automated. <br />
                    <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                      Engineered Gadgets & Frictionless OS.
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-xl">
                {isHindi
                  ? "बायोमेट्रिक टर्नस्टाइल्स, POS प्रिंटर्स और विंडोज/लिनक्स डेस्कटॉप OS द्वारा संचालित — ModSchool फीस लीकेज, प्रॉक्सी हाजिरी और टाइमटेबल क्लैश जैसी सभी बिजनेस फ्रिक्शंस को खत्म कर स्कूल को पूर्णतः फ्रिक्शनलेस बनाता है।"
                  : "Engineered biometric turnstiles, thermal POS printers, and air-gapped desktop software — ModSchool eliminates operational friction, manual calculation errors, and clerical burden."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link href="/mod-school/contact">
                  <GlassButton
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isHindi ? "निःशुल्क स्कूल सेटअप शुरू करें" : "Start Free School Setup"}
                  </GlassButton>
                </Link>

                <Link href="#live-demo">
                  <GlassButton
                    variant="secondary"
                    size="lg"
                    icon={<ChevronRight className="w-4 h-4 text-slate-400" />}
                  >
                    {isHindi ? "लाइव डेस्कटॉप डेमो" : "Live Desktop Demo"}
                  </GlassButton>
                </Link>
              </div>

              {/* Stats Counter Row (All 3 stats visible on both mobile and desktop) */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-8 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-tech">
                    {isHindi ? "ऑटोमेटेड" : "Automated"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1 whitespace-pre-line">
                    {isHindi ? "मुख्य कैंपस\nवर्कलोड" : "Major Campus\nWorkload"}
                  </div>
                </div>
                <div className="hidden sm:block h-10 w-px bg-slate-200 dark:bg-white/10" />
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">0.38s</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1 whitespace-pre-line">
                    {isHindi ? "गेट फेस AI\nपहचान" : "Gate Face AI\nLatency"}
                  </div>
                </div>
                <div className="hidden sm:block h-10 w-px bg-slate-200 dark:bg-white/10" />
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">99.8%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1 whitespace-pre-line">
                    {isHindi ? "समय पर फीस\nवसूली" : "On-Time Fee\nRecovery"}
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
              <div className="hidden lg:flex relative w-full min-h-[520px]">
                {/* CARD 1: Gate AI Attendance Pulse */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-2 left-0 z-20 w-72"
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
                      <span>Latency: <strong className="text-cyan-600 dark:text-cyan-300">0.38s</strong></span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">98.5% Present</span>
                    </div>
                  </LiquidGlassCard>
                </motion.div>

                {/* CARD 3: Central Timetable & Conflict Engine */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute top-10 right-0 z-10 w-80"
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

                {/* CARD 2: Autonomous WhatsApp Fee Recovery */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="absolute bottom-2 left-10 z-30 w-76"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // VARIANT: AGROMI AGRO-TECH
  // ==========================================
  if (variant === "agromi") {
    return (
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Decorative radial gradients - emerald & lime aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[350px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Innovation Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-8 border border-emerald-500/30 shadow-[0_0_20px_rgba(46,125,50,0.2)]"
          >
            <Sprout className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>MOD Farmer • Autonomous Agriculture OS & AI Crop Doctor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-display text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.12]"
          >
            Manage Your Agricultural Ecosystem with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-400 drop-shadow-[0_0_35px_rgba(16,185,129,0.3)]">
              Autonomous AI & IoT
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-700 dark:text-slate-300/90 max-w-3xl mx-auto leading-relaxed font-normal dark:font-light"
          >
            Engineered by <span className="font-semibold text-slate-900 dark:text-white">Modernisum</span>, MOD Farmer connects sub-surface LoRaWAN soil telemetry, drone multispectral NDVI health scanning, automated solar irrigation valves, and predictive mandi intelligence into a unified sovereign operating system.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <a href="#cockpit">
              <GlassButton
                variant="emerald"
                size="lg"
                className="group"
                icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                iconPosition="right"
              >
                Explore Farm Cockpit
              </GlassButton>
            </a>

            <a href="#calculator">
              <GlassButton
                variant="secondary"
                size="lg"
                className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/60"
                icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
              >
                Calculate Yield Boost ROI
              </GlassButton>
            </a>

            <GlassButton
              variant="ghost"
              size="lg"
              onClick={() => setAuthOpen(true)}
              className="text-slate-700 dark:text-slate-300"
            >
              Sign In to MOD Farmer
            </GlassButton>
          </motion.div>

          {/* Real-time Field Telemetry Summary Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-emerald-500/20 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                <Droplets className="w-4 h-4" />
                <span>Water Optimization</span>
              </div>
              <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                34.8% Saved
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Automated micro-drip cycling</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Average Yield Gain</span>
              </div>
              <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                +28.5%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Validated across paddy & wheat</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                <Wifi className="w-4 h-4" />
                <span>LoRaWAN Range</span>
              </div>
              <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                15 km
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Sub-surface solar mesh probes</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span>Offline Resilience</span>
              </div>
              <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                100% Edge
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Operates with zero cell signal</p>
            </div>
          </motion.div>
        </div>

        <AuthDialog
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          productName="Agromi Farm Cockpit"
        />
      </section>
    );
  }

  // ==========================================
  // VARIANT: MODERNISUM PARENT STUDIO (DEFAULT)
  // ==========================================
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Ultra-Concise Executive Text & Direct CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Innovation Pill */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Reliable, Scalable, Future-Proof & Highly Automated • AI-Enabled Software</span>
              <span className="inline sm:hidden">Autonomous AI & Enterprise Systems</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping shrink-0" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display text-slate-900 dark:text-white leading-[1.12]"
            >
              Be the CEO. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
                Let AI Run the Routine.
              </span>
            </motion.h1>

            {/* Subtitle - Ultra concise */}
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light max-w-2xl"
            >
              We build reliable, scalable, future-proof, and highly automated AI-enabled software for any enterprise domain. From sovereign edge architectures to custom intelligent platforms, intelligent systems execute every routine while you direct strategy from the CEO chair.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1"
            >
              <GlassButton
                variant="primary"
                size="md"
                onClick={() => setAuthOpen(true)}
                icon={<ArrowRight className="w-4 h-4" />}
                className="text-xs sm:text-sm font-semibold flex-1 sm:flex-none justify-center"
              >
                Deploy AI Agents
              </GlassButton>

              <a href="#philosophy" className="flex-1 sm:flex-none">
                <GlassButton
                  variant="secondary"
                  size="md"
                  icon={<ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                  className="w-full text-xs sm:text-sm text-slate-800 dark:text-white justify-center"
                >
                  Our Philosophy
                </GlassButton>
              </a>

              <GlassButton
                variant="ghost"
                size="md"
                onClick={() => setAuthOpen(true)}
                className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 w-full sm:w-auto justify-center"
              >
                Client Portal
              </GlassButton>
            </motion.div>

            {/* Live Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 border-t border-slate-200/90 dark:border-white/10 grid grid-cols-3 gap-2 sm:gap-6 text-left"
            >
              <div>
                <div className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">0%</div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight mt-1">
                  Manual repetitive<br />drag
                </div>
              </div>
              <div className="border-l border-slate-200/90 dark:border-white/10 pl-2 sm:pl-6">
                <div className="text-xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">~0%</div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight mt-1">
                  Data leak risk<br />(Offline & E2EE)
                </div>
              </div>
              <div className="border-l border-slate-200/90 dark:border-white/10 pl-2 sm:pl-6">
                <div className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">10x</div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight mt-1">
                  Operational<br />pace
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Interactive CEO & Autonomous Workforce Visual Animation */}
          <div className="lg:col-span-6 w-full">
            <CeoWorkforceVisual />
          </div>

        </div>
      </div>

      <AuthDialog
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        productName="Modernisum Client Portal"
      />
    </section>
  );
}
