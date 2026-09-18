"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import Link from "next/link";

export interface DesktopScreenItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  caption: string;
  url: string;
  thumbnailUrl: string;
  icon: React.ElementType;
  badge: string;
}

const DESKTOP_SCREENS: DesktopScreenItem[] = [
  {
    id: "dashboard",
    title: "Executive Cockpit & School Dashboard",
    shortTitle: "Dashboard",
    category: "Executive Overview",
    caption:
      "Real-time administrative telemetry: daily attendance metrics, fee collection summaries, active bus tracking alerts, and quick actions.",
    url: "https://lh3.googleusercontent.com/d/1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl&sz=w1200",
    icon: LayoutDashboard,
    badge: "Core Telemetry",
  },
  {
    id: "attendance",
    title: "Automated RFID & Face AI Attendance Console",
    shortTitle: "RFID Attendance",
    category: "Attendance & Security",
    caption:
      "Sub-second contactless campus entry logging with instant parent WhatsApp notifications and leave quota tracking.",
    url: "https://lh3.googleusercontent.com/d/1Mq_K-wM8ecoGYfOXAn2U34LlW2DCSlXf",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1Mq_K-wM8ecoGYfOXAn2U34LlW2DCSlXf&sz=w1200",
    icon: ScanFace,
    badge: "0.38s Scan Latency",
  },
  {
    id: "timetable",
    title: "Conflict-Free Timetable & Teacher Substitution Engine",
    shortTitle: "Smart Timetable",
    category: "Academic Scheduling",
    caption:
      "Intelligent timetable matrix with drag-and-drop slot reordering and automated teacher substitution resolving.",
    url: "https://lh3.googleusercontent.com/d/1klhVZQF3Sl0OI7eE5fHK8-ytjiK5XeM2",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1klhVZQF3Sl0OI7eE5fHK8-ytjiK5XeM2&sz=w1200",
    icon: Calendar,
    badge: "Zero Roster Clashes",
  },
  {
    id: "call_center",
    title: "Autonomous Voice Campaign & Parent Call Center",
    shortTitle: "AI Call Center",
    category: "Communication & CRM",
    caption:
      "Integrated outbound calling engine for batch attendance alerts, fee recovery reminders, and automated DTMF feedback collection.",
    url: "https://lh3.googleusercontent.com/d/1zolpd19pwgMUkrbOyqvxRCRkO8NVkaGA",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1zolpd19pwgMUkrbOyqvxRCRkO8NVkaGA&sz=w1200",
    icon: PhoneCall,
    badge: "Voice Telephony",
  },
  {
    id: "assistant",
    title: "Integrated AI Administrative Copilot",
    shortTitle: "AI Copilot",
    category: "Cognitive AI",
    caption:
      "Context-aware conversational assistant delivering instant student dossiers, marksheet analytics, and board policy answers.",
    url: "https://lh3.googleusercontent.com/d/11-stkPD2IHBY5rQwCQW9Z7wbLXhXRnLC",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=11-stkPD2IHBY5rQwCQW9Z7wbLXhXRnLC&sz=w1200",
    icon: Bot,
    badge: "Gemini Vision & LLM",
  },
  {
    id: "admissions",
    title: "In-Place Multi-Step Student Admission Suite",
    shortTitle: "Admissions Form",
    category: "Student Onboarding",
    caption:
      "Paperless admission workflow with instant certificate OCR, fee schedule assignment, and bus route mapping.",
    url: "https://lh3.googleusercontent.com/d/1zHW-V9GfAuSltlqUSVJvs696Y1-QGR4K",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1zHW-V9GfAuSltlqUSVJvs696Y1-QGR4K&sz=w1200",
    icon: UserPlus,
    badge: "OCR Enabled",
  },
  {
    id: "roster",
    title: "Centralized Student Information & Dossier Directory",
    shortTitle: "Roster Directory",
    category: "Records & Dossiers",
    caption:
      "Comprehensive student records with multi-attribute filtering, emergency contact cards, and complete academic audit trails.",
    url: "https://lh3.googleusercontent.com/d/1UiW8Ecr9IKOUwaOeJQJU58iFqD0v1-W6",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1UiW8Ecr9IKOUwaOeJQJU58iFqD0v1-W6&sz=w1200",
    icon: Users,
    badge: "Complete Audit Trail",
  },
];

export function VidhyamDesktopShowcase() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeScreen =
    DESKTOP_SCREENS.find((s) => s.id === activeTab) || DESKTOP_SCREENS[0];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="live-demo">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Desktop UI Inspection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            The Native Desktop Operating System{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
              In Live Action
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Directly captured from production builds of the Vidhyam Windows &amp; Mac desktop client. 
            Zero web latency, offline SQLite resilience, and native biometric hardware interfacing.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {DESKTOP_SCREENS.map((screen) => {
            const Icon = screen.icon;
            const isActive = activeTab === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-800 dark:text-cyan-200 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                    : "bg-slate-100/80 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"}`} />
                <span>{screen.shortTitle}</span>
                {isActive && (
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Glass Application Window Container */}
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.25)"
          className="rounded-3xl border border-slate-200/80 dark:border-white/15 overflow-hidden shadow-2xl p-0"
        >
          {/* Native Desktop App Title Bar */}
          <div className="bg-slate-200/70 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-4">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-xs" />
              <span className="ml-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                Vidhyam Campus Core — v3.4.2 [Production Release]
              </span>
            </div>

            {/* Middle Active Module Indicator */}
            <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 truncate">
              {activeScreen.title}
            </div>

            {/* Actions: Fullscreen Zoom & Status */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                OFFLINE-FIRST ACTIVE
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

          {/* Screenshot Display Area */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen.id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={activeScreen.url}
                  alt={activeScreen.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    Click to view full-resolution screenshot
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Screenshot Detailed Footer Strip */}
          <div className="bg-slate-50/90 dark:bg-white/[0.02] p-5 sm:p-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300">
                  {activeScreen.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 border border-indigo-400/30 text-indigo-700 dark:text-indigo-300">
                  {activeScreen.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light max-w-2xl">
                {activeScreen.caption}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/vidhyam/contact">
                <GlassButton variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Book Live Demo
                </GlassButton>
              </Link>
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Fullscreen Lightbox Modal */}
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
                <h3 className="text-base sm:text-lg font-bold">{activeScreen.title}</h3>
                <p className="text-xs text-slate-400">{activeScreen.caption}</p>
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
                <Image
                  src={activeScreen.url}
                  alt={activeScreen.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
              {DESKTOP_SCREENS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTab === s.id
                      ? "bg-cyan-500 text-black font-bold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {s.shortTitle}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
