"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  GraduationCap, 
  ScanFace, 
  CreditCard, 
  FileText, 
  AppWindow, 
  Lock, 
  BellRing, 
  BookOpen, 
  Bus, 
  CalendarCheck2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Filter, 
  Clock, 
  ShieldCheck, 
  Camera, 
  Maximize2,
  DollarSign,
  PieChart as PieIcon,
  BarChart3,
  ExternalLink,
} from "lucide-react";

export function ProductShowcase() {
  const { language } = useLanguage();
  const lang = language;
  const [financeTab, setFinanceTab] = useState<"overview" | "collections" | "expenses" | "materials">("overview");
  const [selectedQuarter, setSelectedQuarter] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q2");

  const [examStatus, setExamStatus] = useState<"idle" | "generating" | "completed">("idle");
  const [scanActive, setScanActive] = useState<boolean>(false);
  const [formProgress, setFormProgress] = useState<number>(88);

  const triggerExamSim = () => {
    setExamStatus("generating");
    setTimeout(() => {
      setExamStatus("completed");
    }, 1200);
  };

  const copy = {
    hi: {
      tag: "Modernisum School OS",
      visionTitle: "स्कूल का काम केवल पढ़ाना और शिक्षा देना होना चाहिए, न कि मैनेजमेंट के उलझनों में समय गंवाना।",
      visionDesc: "Modernisum School सॉफ्टवेयर को एडमिनिस्ट्रेटिव काम को न्यूनतम करने के लिए डिज़ाइन किया गया है ताकि शिक्षकों का पूरा ध्यान छात्रों पर रहे।",
      finance: {
        title: "Advanced Financial Management",
        badge: "Large Card • Institutional Ledger",
        desc: "सभी एक्सपेंस, मैटेरियल रिपोर्ट्स और फाइनेंस की 100% ट्रांसपेरेंट ट्रैकिंग एडवांस फिल्टर्स के साथ।",
      },
      academic: {
        title: "Smart Academic Automation",
        badge: "1-Click Execution",
        desc: "सिंगल-क्लिक से तुरंत एग्जाम पेपर जनरेट करें, अनाउंस करें और फोन द्वारा कॉपियां चेक करें।",
      },
      attendance: {
        title: "Fail-Proof Attendance System",
        badge: "100% Accurate Sync",
        desc: "बिना किसी ह्यूमन इंटरवेंशन या फिंगरप्रिंट की समस्या के 100% सटीक अटेंडेंस ट्रैकिंग।",
      },
      extension: {
        title: "Smart Browser Extension",
        badge: "Auto-Fill Engine",
        desc: "एक्सटेंशन की मदद से स्क्रीन के पास से ही फॉर्म्स को 80-90% ड्रैग-एंड-ड्रॉप या ऑटोमेटेड तरीके से भरना।",
      },
      security: {
        title: "Offline Desktop Security",
        badge: "Zero-Leak Architecture",
        desc: "सुरक्षित डेटा प्रोसेसिंग के लिए ऑफलाइन डेस्कटॉप सॉफ्टवेयर और एंड-टू-एंड एन्क्रिप्टेड टनलिंग।",
      },
      alerts: {
        title: "Predictive System Alerts",
        badge: "Active Radar",
        desc: "फाइनेंस, एकेडमिक इश्यू या कंप्लेंट्स के लिए तुरंत अलर्ट और नोटिफिकेशन सिस्टम।",
      },
      curriculum: {
        title: "Ready-to-Use Curriculum Tracker",
        badge: "Practical Focus",
        desc: "टीचर्स के लिए प्री-असाइन टास्क और डीप-डाइव शेड्यूलर ताकि फोकस प्रैक्टिकल एजुकेशन पर रहे।",
      },
      transit: {
        title: "Real-Time Transit Transparency",
        badge: "Live Fleet Telemetry",
        desc: "स्टूडेंट ऐप पर बस की लाइव लोकेशन और सटीक टाइमिंग की जानकारी।",
      },
      events: {
        title: "Smart Event Planner",
        badge: "Step-by-Step Guide",
        desc: "इनोवेशन क्लासेज और इवेंट्स के लिए खाली समय और बजट का ऑटो-एनालिसिस कर स्टेप-बाय-स्टेप गाइड।",
      },
    },
    en: {
      tag: "Modernisum School OS",
      visionTitle: "Schools Must Educate, Teachers Must Teach — Not Waste Hours in Administrative Chaos.",
      visionDesc: "Modernisum School is engineered to minimize administrative friction down to near-zero so educators dedicate 100% of their attention to students.",
      finance: {
        title: "Advanced Financial Management",
        badge: "Large Card • Institutional Ledger",
        desc: "100% transparent tracking of all expenses, material reports, and campus finances with advanced multi-dimensional filters.",
      },
      academic: {
        title: "Smart Academic Automation",
        badge: "1-Click Execution",
        desc: "Generate syllabus-aligned exam papers in 1 click, broadcast announcements, and scan-grade answer sheets directly via smartphone.",
      },
      attendance: {
        title: "Fail-Proof Attendance System",
        badge: "100% Accurate Sync",
        desc: "100% accurate contactless turnstile attendance tracking with zero human intervention or fingerprint hardware issues.",
      },
      extension: {
        title: "Smart Browser Extension",
        badge: "Auto-Fill Engine",
        desc: "Side-docked browser extension autofills 80-90% of state board & scholarship portal forms with drag-and-drop ease.",
      },
      security: {
        title: "Offline Desktop Security",
        badge: "Zero-Leak Architecture",
        desc: "Offline desktop software for secure campus data processing and zero-leak end-to-end encrypted tunneling.",
      },
      alerts: {
        title: "Predictive System Alerts",
        badge: "Active Radar",
        desc: "Instant predictive notification radar for pending fees, academic bottlenecks, and institutional complaints.",
      },
      curriculum: {
        title: "Ready-to-Use Curriculum Tracker",
        badge: "Practical Focus",
        desc: "Pre-assigned task schedules and deep-dive syllabus milestones so teachers focus entirely on practical education.",
      },
      transit: {
        title: "Real-Time Transit Transparency",
        badge: "Live Fleet Telemetry",
        desc: "Sub-second live school bus GPS tracking with precision arrival ETAs and notifications on student mobile apps.",
      },
      events: {
        title: "Smart Event Planner",
        badge: "Step-by-Step Guide",
        desc: "Autonomous event & innovation workshop planner with step-by-step room availability and budget expense forecasting.",
      },
    },
  };

  const t = copy[lang];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/70 dark:bg-black/40 border-y border-slate-200/80 dark:border-white/5 scroll-mt-28" id="vidhyam-showcase">
      <div className="absolute top-1/4 left-1/10 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/10 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. SHORT PHILOSOPHY BANNER */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
              <GraduationCap className="w-4 h-4 text-cyan-500" />
              <span>{t.tag}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.visionTitle}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            {t.visionDesc}
          </p>
        </div>

        {/* 2. ASYMMETRIC BENTO GRID: 9 CORE REUSABLE CAPABILITIES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* FEATURE 3 (THE BIG CARD): Advanced Financial Management */}
          <div className="lg:col-span-8">
            <LiquidGlassCard
              glowColor="rgba(16, 185, 129, 0.3)"
              className="h-full p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-emerald-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                          {t.finance.badge}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Double-Entry Certified
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                        {t.finance.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono">
                    {(["overview", "collections", "expenses", "materials"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setFinanceTab(tab)}
                        className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                          financeTab === tab
                            ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-6 max-w-2xl">
                  {t.finance.desc}
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/20 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Q2 Collection</span>
                      <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">₹42,85,000</span>
                      <span className="text-[10px] text-emerald-400/80 block mt-0.5">99.8% Recovery</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Operating Expense</span>
                      <span className="text-lg sm:text-xl font-black font-mono text-cyan-400">₹18,40,250</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Payroll & Campus</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Material Purchases</span>
                      <span className="text-lg sm:text-xl font-black font-mono text-amber-400">₹3,12,800</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Lab, Sports, Stationery</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Net Surplus</span>
                      <span className="text-lg sm:text-xl font-black font-mono text-purple-400">₹21,31,950</span>
                      <span className="text-[10px] text-purple-400/80 block mt-0.5">Direct to Bank Account</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                      <span className="flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Monthly Fee Flow & Reconciliation Telemetry</span>
                      </span>
                      <span className="text-emerald-400 font-bold">0 Bank Drift</span>
                    </div>

                    <div className="h-20 w-full flex items-end justify-between gap-2 pt-2 px-2 rounded-xl bg-slate-900/60 border border-white/5">
                      {[
                        { month: "Apr", val: 85, exp: 35 },
                        { month: "May", val: 92, exp: 40 },
                        { month: "Jun", val: 98, exp: 38 },
                        { month: "Jul", val: 89, exp: 42 },
                        { month: "Aug", val: 95, exp: 41 },
                        { month: "Sep", val: 100, exp: 39 },
                      ].map((item) => (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <div className="w-full max-w-[28px] flex items-end gap-1 h-full">
                            <div
                              style={{ height: `${item.val}%` }}
                              className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-700"
                            />
                            <div
                              style={{ height: `${item.exp}%` }}
                              className="w-full bg-gradient-to-t from-slate-600 to-slate-400 rounded-t-sm opacity-60 transition-all duration-700"
                            />
                          </div>
                          <span className="text-[9px] font-mono text-slate-500">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Automated Double-Entry Ledger • 0 Manual Tallying</span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  Real-time Auditable Export
                </span>
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 1: Smart Academic Automation */}
          <div className="lg:col-span-4">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.25)"
              className="h-full p-6 sm:p-7 rounded-3xl border border-cyan-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-cyan-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {t.academic.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-1.5">
                  {t.academic.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-5">
                  {t.academic.desc}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/20 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Class 10 Physics Exam</span>
                    <span className="text-cyan-400 font-bold">100 Marks</span>
                  </div>

                  <button
                    onClick={triggerExamSim}
                    className="w-full py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    {examStatus === "generating" ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Paper...</span>
                      </>
                    ) : examStatus === "completed" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                        <span>Ready in 1.4s! (100 Qs)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Click to Generate Paper</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-white/5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Camera className="w-3 h-3 text-cyan-400" />
                      <span>Phone Camera Grading</span>
                    </span>
                    <span className="font-mono text-cyan-400">0.8s / copy</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="text-cyan-600 dark:text-cyan-300 font-mono text-[11px]">2-3 Days Drag &rarr; 10 Mins Done</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 2: Fail-Proof Attendance System */}
          <div className="lg:col-span-4">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.25)"
              className="h-full p-6 sm:p-7 rounded-3xl border border-cyan-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-cyan-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <ScanFace className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t.attendance.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-1.5">
                  {t.attendance.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-4">
                  {t.attendance.desc}
                </p>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold">
                      IN
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Main Turnstile Lane 2</div>
                      <div className="text-[10px] font-mono text-emerald-400">1,418 / 1,440 Verified</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">0 Errors</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-cyan-600 dark:text-cyan-300 text-[11px]">Arrival & Departure Automated</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 4: Smart Browser Extension */}
          <div className="lg:col-span-4">
            <LiquidGlassCard
              glowColor="rgba(245, 158, 11, 0.25)"
              className="h-full p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-amber-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <AppWindow className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {t.extension.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-1.5">
                  {t.extension.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-4">
                  {t.extension.desc}
                </p>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-300">UDISE+ Portal Auto-Map</span>
                    <span className="text-amber-400 font-bold">{formProgress}% Filled</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${formProgress}%` }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>Drag & Drop Ready</span>
                    <span className="text-emerald-400">0 Manual Errors</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-600 dark:text-amber-300 text-[11px]">80-90% Drag-and-Drop Auto-Fill</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 5: Offline Desktop Security */}
          <div className="lg:col-span-4">
            <LiquidGlassCard
              glowColor="rgba(99, 102, 241, 0.25)"
              className="h-full p-6 sm:p-7 rounded-3xl border border-indigo-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-indigo-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {t.security.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-1.5">
                  {t.security.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-4">
                  {t.security.desc}
                </p>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-indigo-500/20 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Campus Desktop Local Sandbox</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">E2EE Tunnel</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-indigo-600 dark:text-indigo-300 text-[11px]">No Third-Party Cloud Leaks</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 6: Predictive System Alerts */}
          <div className="lg:col-span-3 sm:col-span-6">
            <LiquidGlassCard
              glowColor="rgba(244, 63, 94, 0.25)"
              className="h-full p-5 sm:p-6 rounded-3xl border border-rose-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-rose-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-400 mb-3">
                  <BellRing className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1">
                  {t.alerts.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {t.alerts.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-rose-600 dark:text-rose-300">
                <span>{t.alerts.badge}</span>
                <span className="text-emerald-500 dark:text-emerald-400">Active</span>
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 7: Ready-to-Use Curriculum Tracker */}
          <div className="lg:col-span-3 sm:col-span-6">
            <LiquidGlassCard
              glowColor="rgba(56, 189, 248, 0.25)"
              className="h-full p-5 sm:p-6 rounded-3xl border border-sky-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-sky-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1">
                  {t.curriculum.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {t.curriculum.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-sky-600 dark:text-sky-300">
                <span>{t.curriculum.badge}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 8: Real-Time Transit Transparency */}
          <div className="lg:col-span-3 sm:col-span-6">
            <LiquidGlassCard
              glowColor="rgba(234, 179, 8, 0.25)"
              className="h-full p-5 sm:p-6 rounded-3xl border border-yellow-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-yellow-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-yellow-500/15 border border-yellow-400/30 flex items-center justify-center text-yellow-400 mb-3">
                  <Bus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1">
                  {t.transit.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {t.transit.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-yellow-600 dark:text-yellow-300">
                <span>{t.transit.badge}</span>
                <span className="text-emerald-500 dark:text-emerald-400">&lt; 1s Sync</span>
              </div>
            </LiquidGlassCard>
          </div>

          {/* FEATURE 9: Smart Event Planner */}
          <div className="lg:col-span-3 sm:col-span-6">
            <LiquidGlassCard
              glowColor="rgba(168, 85, 247, 0.25)"
              className="h-full p-5 sm:p-6 rounded-3xl border border-purple-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-purple-400/50 transition-all duration-300 shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-3">
                  <CalendarCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1">
                  {t.events.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {t.events.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-purple-600 dark:text-purple-300">
                <span>{t.events.badge}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </LiquidGlassCard>
          </div>

        </div>

        {/* 3. ORIGINAL DESKTOP SCREENSHOT SHOWCASE FROM GOOGLE DRIVE */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-950/80 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                VERIFIED NATIVE DESKTOP TELEMETRY
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                Inspect Real Campus Operations Cockpit
              </h3>
            </div>
            
            <Link href="/download" prefetch={false}>
              <GlassButton
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Download Campus Suite
              </GlassButton>
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/9] bg-slate-900 group shadow-2xl">
            <Image
              src="/images/vidhyam/dashboard_dark.png"
              alt="Modernisum School Native Desktop Telemetry"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-5">
              <div className="flex flex-wrap items-center justify-between w-full gap-3 text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Real Campus Desktop Cockpit • Local SQLite & Real-time Sync</span>
                </span>
                <span className="text-slate-400">0% External Cloud Leak</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export const VidhyamProductShowcase = ProductShowcase;
