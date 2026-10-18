"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ScanFace,
  Calendar,
  PhoneCall,
  Bot,
  UserPlus,
  Users,
  Maximize2,
  X,
  ExternalLink,
  Download,
  CreditCard,
  FileCheck2,
  Building2,
  FolderLock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";
import {
  DesktopScreenItem,
  SEED_SHOWCASE_SCREENS,
} from "@/lib/firestore/showcase";

import { sendEmpathySignal } from "@/lib/empathy-telemetry";

export type { DesktopScreenItem };

// Icon resolver mapping for dynamically fetched screens
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  ScanFace,
  Calendar,
  PhoneCall,
  Bot,
  UserPlus,
  Users,
  CreditCard,
  FileCheck2,
  Building2,
  FolderLock,
  ShieldAlert,
};

export function DesktopShowcase() {
  const { isHindi } = useLanguage();
  const [screens, setScreens] = useState<DesktopScreenItem[]>(() => SEED_SHOWCASE_SCREENS);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Dynamic Zero-Code-Deploy Screen Fetching
  useEffect(() => {
    let mounted = true;
    async function loadScreens() {
      try {
        const res = await fetch("/api/showcase?product=school");
        if (res.ok) {
          const json = await res.json();
          if (mounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setScreens(json.data);
          }
        }
      } catch (err) {
        console.warn("Using baseline showcase screens fallback:", err);
      }
    }
    loadScreens();
    return () => {
      mounted = false;
    };
  }, []);

  const currentIndex = screens.findIndex((s) => s.id === activeTab);
  const activeScreen = screens[currentIndex >= 0 ? currentIndex : 0] || screens[0] || SEED_SHOWCASE_SCREENS[0];

  const handleSelectTab = (screenId: string) => {
    setActiveTab(screenId);
    const selected = screens.find((s) => s.id === screenId);
    if (selected) {
      sendEmpathySignal({
        product: "school",
        intentType: "feature_inspect",
        feature: selected.title || screenId,
        language: isHindi ? "hi" : "en",
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + screens.length) % screens.length;
    handleSelectTab(screens[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % screens.length;
    handleSelectTab(screens[nextIdx].id);
  };

  const getScreenIcon = (screen: DesktopScreenItem): React.ElementType => {
    if (screen.iconName && ICON_MAP[screen.iconName]) {
      return ICON_MAP[screen.iconName];
    }
    return LayoutDashboard;
  };

  // Bilingual text helpers
  const activeTitle = (isHindi && activeScreen.titleHi) ? activeScreen.titleHi : activeScreen.title;
  const activeCaption = (isHindi && activeScreen.captionHi) ? activeScreen.captionHi : activeScreen.caption;
  const activeCategory = (isHindi && activeScreen.categoryHi) ? activeScreen.categoryHi : activeScreen.category;
  const activeImpactMetric = (isHindi && activeScreen.impactMetricHi) ? activeScreen.impactMetricHi : activeScreen.impactMetric;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="live-demo">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Streamlined Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isHindi ? "विंडोज व लिनक्स • 100% नेटिव डेस्कटॉप OS" : "Windows & Linux • Native Desktop OS"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              {isHindi ? (
                <>
                  100% नेटिव डेस्कटॉप वर्कफ़्लो{" "}
                  <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                    विंडोज और लिनक्स डेस्कटॉप
                  </span>
                </>
              ) : (
                <>
                  Native Desktop OS Workflow{" "}
                  <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                    Windows & Linux
                  </span>
                </>
              )}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light max-w-lg leading-relaxed">
            {isHindi
              ? "विंडोज और लिनक्स डेस्कटॉप ऑपरेटिंग सिस्टम पर सीधे चलने वाला 100% नेटिव सॉफ्टवेयर। सब-10ms SQLite स्पीड, बिना इंटरनेट ऑफलाइन रेजिलिएंस और जीरो वेब लेटेंसी।"
              : "Built exclusively as a high-performance native desktop OS for Windows and Linux. Sub-10ms local SQLite resilience, zero web latency, and frictionless air-gapped campus operations."}
          </p>
        </div>

        {/* 2-COLUMN SPLIT MASTER-DETAIL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT SIDE: Live Screenshot in OS Frame with Pagination       */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.25)"
              className="rounded-3xl border border-slate-200/80 dark:border-white/15 overflow-hidden shadow-2xl p-0 flex flex-col group"
            >
              {/* Desktop Window Titlebar Chrome */}
              <div className="bg-slate-200/80 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-5 py-3 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block shadow-xs" />
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block shadow-xs" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
                  <span className="ml-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                    ModSchool OS — [Windows & Linux Native Desktop]
                  </span>
                </div>

                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-xs">
                  {activeTitle}
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    OFFLINE ACTIVE
                  </div>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    title="Expand Fullscreen View"
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Screenshot Viewport */}
              <div 
                className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-slate-950 overflow-hidden cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen.id}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full"
                  >
                    {activeScreen.lightUrl && activeScreen.lightUrl !== (activeScreen.darkUrl || activeScreen.url) ? (
                      <>
                        <Image
                          src={activeScreen.darkUrl || activeScreen.url}
                          alt={`${activeTitle} (Dark Mode)`}
                          fill
                          className="object-cover object-top hidden dark:block"
                          sizes="(max-width: 1024px) 100vw, 900px"
                          priority
                        />
                        <Image
                          src={activeScreen.lightUrl}
                          alt={`${activeTitle} (Light Mode)`}
                          fill
                          className="object-cover object-top block dark:hidden"
                          sizes="(max-width: 1024px) 100vw, 900px"
                          priority
                        />
                      </>
                    ) : (
                      <Image
                        src={activeScreen.darkUrl || activeScreen.url}
                        alt={activeTitle}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 900px"
                        priority
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        {isHindi ? "पूरी स्क्रीन में देखने के लिए क्लिक करें" : "Click to view full uncompressed resolution"}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Toolbar: Slide Pagination & Quick Arrows */}
              <div className="bg-slate-100/90 dark:bg-slate-900/80 px-4 py-2.5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 dark:text-slate-400">
                    Screen <span className="text-cyan-600 dark:text-cyan-400 font-bold">{currentIndex + 1}</span> of {screens.length}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[180px] sm:max-w-none">
                    {(isHindi && activeScreen.shortTitleHi) ? activeScreen.shortTitleHi : activeScreen.shortTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                    className="p-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Slide"
                    className="p-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: Interactive Subsystem Screen Switcher Cockpit     */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-4">
            
            {/* Subsystem Switcher Panel */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{isHindi ? "कैंपस सबसिस्टम मॉड्यूल" : "Switch Subsystem Screen"}</span>
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-400">
                  {screens.length} {isHindi ? "प्रोडक्शन स्क्रीन्स" : "Production Screens"}
                </span>
              </div>

              {/* 2-Column Tabs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {screens.map((screen) => {
                  const Icon = getScreenIcon(screen);
                  const isActive = activeTab === screen.id;
                  const itemTitle = (isHindi && screen.shortTitleHi) ? screen.shortTitleHi : screen.shortTitle;
                  const itemCategory = (isHindi && screen.categoryHi) ? screen.categoryHi : screen.category;

                  return (
                    <button
                      key={screen.id}
                      onClick={() => handleSelectTab(screen.id)}
                      className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl text-xs transition-all duration-200 text-left cursor-pointer border ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-indigo-500/20 text-cyan-950 dark:text-cyan-100 border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.18)] font-bold scale-[1.01]"
                          : "bg-slate-100/70 dark:bg-white/[0.03] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-cyan-500 text-black shadow-sm"
                          : "bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-[13px]">{itemTitle}</div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {itemCategory}
                        </div>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Screen Context Strip & Quick Actions */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl space-y-3 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300">
                    {activeCategory}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-400/30 text-emerald-700 dark:text-emerald-300">
                    {activeImpactMetric}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {currentIndex + 1} / {screens.length}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {activeTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-1 leading-relaxed">
                  {activeCaption}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2.5">
                <Link
                  href="/mod-school/download"
                  className="flex-1"
                  onClick={() =>
                    sendEmpathySignal({
                      product: "school",
                      intentType: "download_intent",
                      feature: "ModSchool Windows Client Setup",
                      language: isHindi ? "hi" : "en",
                    })
                  }
                >
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center text-xs"
                    icon={<Download className="w-3.5 h-3.5 text-sky-500" />}
                  >
                    {isHindi ? "विंडोज सेटअप डाउनलोड करें" : "Download Windows Client"}
                  </GlassButton>
                </Link>
                <Link href="/mod-school/contact" className="flex-1">
                  <GlassButton
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs"
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    {isHindi ? "लाइव डेमो बुक करें" : "Book Live Demo"}
                  </GlassButton>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          >
            <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base sm:text-lg font-bold">{activeTitle}</h3>
                <p className="text-xs text-slate-400">{activeCaption}</p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 w-full my-4 flex items-center justify-center">
              <div className="relative w-full h-full max-h-[85vh]">
                {activeScreen.lightUrl && activeScreen.lightUrl !== (activeScreen.darkUrl || activeScreen.url) ? (
                  <>
                    <Image
                      src={activeScreen.darkUrl || activeScreen.url}
                      alt={`${activeTitle} (Dark Mode)`}
                      fill
                      className="object-contain hidden dark:block"
                      sizes="100vw"
                      priority
                    />
                    <Image
                      src={activeScreen.lightUrl}
                      alt={`${activeTitle} (Light Mode)`}
                      fill
                      className="object-contain block dark:hidden"
                      sizes="100vw"
                      priority
                    />
                  </>
                ) : (
                  <Image
                    src={activeScreen.darkUrl || activeScreen.url}
                    alt={activeTitle}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
              {screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTab === s.id
                      ? "bg-cyan-500 text-black font-bold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {(isHindi && s.shortTitleHi) ? s.shortTitleHi : s.shortTitle}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const VidhyamDesktopShowcase = DesktopShowcase;
