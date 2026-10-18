"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { 
  GraduationCap, 
  Sprout, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Activity, 
  Boxes,
  TrendingUp,
  Download,
  Monitor,
  Smartphone,
  Network
} from "lucide-react";

export function ModernisumFlagshipVentures() {
  // Interactive micro-simulation state for Vidhyam (3 subsystems)
  const [vidhyamTab, setVidhyamTab] = useState<"admin" | "gate" | "ecosystem">("admin");
  // Interactive micro-simulation state for Agromi
  const [soilSector, setSoilSector] = useState<"Sector A" | "Sector B">("Sector A");
  // Interactive micro-simulation state for Enterprise AI
  const [aiTurbo, setAiTurbo] = useState<boolean>(true);

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-slate-50/70 dark:bg-black/40 border-y border-slate-200/80 dark:border-white/5 scroll-mt-28" id="products">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* HEADER: Three Flagship Ecosystems                              */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 mb-4">
            <Boxes className="w-3.5 h-3.5 text-cyan-500" />
            <span>Modernisum Flagship Products</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            Three Autonomous Platforms. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Zero Operational Drag.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            We replace manual administrative friction with sovereign AI agents, private offline sandboxes, and edge IoT telemetry across education, agriculture, and high-velocity enterprises.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 3 UNIFORM EQUAL-HEIGHT CARDS                                   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          {/* ------------------------------------------------------------ */}
          {/* CARD 1: VIDHYAM AUTONOMOUS SCHOOL OS                         */}
          {/* ------------------------------------------------------------ */}
          <div className="flex">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.25)"
              className="w-full h-full p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header with 2.5+ Years Maturity Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      2.5+ Yrs R&D
                    </span>
                    <span className="px-2 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                      4 Native Apps
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                    ModSchool
                  </h3>
                  <p className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                    Autonomous School OS • Teachers Must Teach.
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-2.5">
                    Engineered across 2.5+ years of on-ground campus R&D. Our flagship ModSchool operating system completely eliminates administrative friction—unifying 100% offline Windows administration, teacher roll call APKs, live bus GPS, double-entry fee ledgers, and state board filing into one sovereign platform.
                  </p>
                </div>

                {/* Interactive Subsystem Telemetry Console (Replaces single Exam button) */}
                <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-cyan-500/20 space-y-3 font-mono text-xs">
                  {/* Subsystem Switcher Tabs */}
                  <div className="flex items-center justify-between gap-1 pb-1 border-b border-slate-200/80 dark:border-white/10 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setVidhyamTab("admin")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        vidhyamTab === "admin"
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Admin OS
                    </button>
                    <button
                      type="button"
                      onClick={() => setVidhyamTab("gate")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        vidhyamTab === "gate"
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Turnstiles
                    </button>
                    <button
                      type="button"
                      onClick={() => setVidhyamTab("ecosystem")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        vidhyamTab === "ecosystem"
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      4 Apps Suite
                    </button>
                  </div>

                  {/* Dynamic Telemetry Data Grid */}
                  {vidhyamTab === "admin" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                          <span className="text-slate-500 dark:text-slate-400 block">Q2 Fee Collection</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">₹42.85L (99.8%)</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                          <span className="text-slate-500 dark:text-slate-400 block">LAN Workstations</span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">50+ PCs (CRDT)</span>
                        </div>
                      </div>
                      <div className="text-[10px] px-2.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 shrink-0 text-cyan-500" />
                        <span>100% Offline SQLite • ESC/POS Thermal Printing • 0 Bank Drift</span>
                      </div>
                    </div>
                  )}

                  {vidhyamTab === "gate" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                          <span className="text-slate-500 dark:text-slate-400 block">Turnstile Ingress</span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">0.38s / Student</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                          <span className="text-slate-500 dark:text-slate-400 block">Teacher Substitution</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">&lt;3s Conflict-Free</span>
                        </div>
                      </div>
                      <div className="text-[10px] px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-500" />
                        <span>Edge Face AI & RFID Gate Relays • 100% WhatsApp Delivery</span>
                      </div>
                    </div>
                  )}

                  {vidhyamTab === "ecosystem" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                          <span className="text-slate-500 dark:text-slate-400 block">Platform Breadth</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">Win64 + 2 APKs + V3</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                          <span className="text-slate-500 dark:text-slate-400 block">Govt Portal Autofill</span>
                          <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">U-DISE+ / Board Forms</span>
                        </div>
                      </div>
                      <div className="text-[10px] px-2.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 shrink-0 text-indigo-500" />
                        <span>Live GPS Bus Fleet Telemetry • Zero Cloud Lock-in Local Vault</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 10 Uniform Architectural Pillars Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2.5 gap-y-1.5 pt-1 text-[10.5px] font-mono text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5" title="Double-Entry Ledger & Zero Bank Drift">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">Double-Entry Fee Ledger (0 Drift)</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="0.38s RFID & Edge Face AI Gate Ingress">
                    <CheckCircle2 className="w-3 h-3 text-cyan-500 dark:text-cyan-400 shrink-0" />
                    <span className="truncate">0.38s RFID & Face AI Turnstiles</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Autonomous Timetable Matrix & Substitution (<3s)">
                    <CheckCircle2 className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <span className="truncate">Timetable & Substitute Solver (&lt;3s)</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="100% Offline-First Multi-PC LAN Collaboration (CRDT)">
                    <CheckCircle2 className="w-3 h-3 text-sky-500 dark:text-sky-400 shrink-0" />
                    <span className="truncate">100% Offline LAN Sync (50+ PCs)</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Direct 80mm ESC/POS Thermal Receipt Hardware Link">
                    <CheckCircle2 className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="truncate">POS 80mm Thermal Receipts</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="4 Native Apps: Desktop Win64, Mobile APKs & MV3 Extension">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">4 Native Apps (Win64/APK/MV3)</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Govt Portal Auto-Filler (U-DISE+, RTE & State Boards)">
                    <CheckCircle2 className="w-3 h-3 text-teal-500 dark:text-teal-400 shrink-0" />
                    <span className="truncate">Govt Portal Autofill (U-DISE+)</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Live School Bus GPS Fleet Telemetry & Proximity Alerts">
                    <CheckCircle2 className="w-3 h-3 text-blue-500 dark:text-blue-400 shrink-0" />
                    <span className="truncate">Live Bus GPS Fleet Telemetry</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Instant Automated WhatsApp & Multi-Channel Broadcast">
                    <CheckCircle2 className="w-3 h-3 text-purple-500 dark:text-purple-400 shrink-0" />
                    <span className="truncate">Instant WhatsApp Broadcast</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Cognitive AI Question Studio & Diagnostic Analytics">
                    <CheckCircle2 className="w-3 h-3 text-pink-500 dark:text-pink-400 shrink-0" />
                    <span className="truncate">Cognitive AI Exam Studio</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA with Direct .EXE Download */}
              <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2.5">
                <Link href="/mod-school" className="flex-1">
                  <GlassButton
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Explore ModSchool
                  </GlassButton>
                </Link>
                <a
                  href="/downloads/Vidhyam-Setup-v2.8.1-x64.zip"
                  download
                  className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 transition-all shrink-0 flex items-center gap-1.5"
                  title="Direct Windows Installer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Win64</span>
                </a>
              </div>
            </LiquidGlassCard>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 2: AGRICULTURE MODERNIZATION (VISION)                  */}
          {/* ------------------------------------------------------------ */}
          <div className="flex">
            <LiquidGlassCard
              glowColor="rgba(16, 185, 129, 0.25)"
              className="w-full h-full p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-emerald-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-emerald-400/60 transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                    AUTONOMOUS AGRO OS
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                    MOD Farmer
                  </h3>
                  <p className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    Autonomous Agro OS & AI Crop Doctor
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-2.5">
                    Engineered by Modernisum as an autonomous field assistant. MOD Farmer empowers farmers and agricultural enterprises with AI leaf disease diagnostics (Crop Doctor), sub-surface LoRaWAN soil moisture sensing, drone spectral NDVI mapping, and APMC mandi market price prediction.
                  </p>
                </div>

                {/* Interactive Micro-Telemetry Widget */}
                <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-emerald-500/20 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">LoRaWAN Edge Soil Probes</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">35% Water Saved</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 block">{soilSector} Moisture</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">{soilSector === "Sector A" ? "68% Optimal" : "74% Rich"}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 block">Mandi Arbitrage</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">₹2,480/q (+4.8%)</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={() => setSoilSector(soilSector === "Sector A" ? "Sector B" : "Sector A")}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>Switch Probe: {soilSector} (Live NDVI)</span>
                  </button>
                </div>

                {/* 3 Uniform Verified Metric Pills */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>LoRaWAN Multi-Depth Soil Sensing</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>Drone NDVI Aerial Crop Health Maps</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span>Sub-Second APMC Mandi Price Predictor</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-white/10">
                <Link href="/agromi" prefetch={false} className="block w-full">
                  <GlassButton
                    variant="primary"
                    size="md"
                    className="w-full justify-center !bg-emerald-500/20 hover:!bg-emerald-500/30 !text-emerald-600 dark:!text-emerald-300 !border-emerald-500/40"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Explore MOD Farmer
                  </GlassButton>
                </Link>
              </div>
            </LiquidGlassCard>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 3: ENTERPRISE AI & EDGE SYSTEMS                         */}
          {/* ------------------------------------------------------------ */}
          <div className="flex">
            <LiquidGlassCard
              glowColor="rgba(168, 85, 247, 0.25)"
              className="w-full h-full p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-purple-500/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-purple-400/60 transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-105 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                    ENTERPRISE AI
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                    Enterprise AI & Edge
                  </h3>
                  <p className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mt-1">
                    You Direct as CEO. Sovereign AI Runs the Routine.
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-2.5">
                    Bespoke autonomous workforce pipelines and custom edge IoT controllers that eliminate repetitive operational overhead with enterprise security.
                  </p>
                </div>

                {/* Interactive Micro-Telemetry Widget */}
                <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-purple-500/20 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">Autonomous Workforce Nodes</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{aiTurbo ? "10x Turbo Mode" : "Standard 1x Pace"}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 block">Tasks Handled</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-xs">{aiTurbo ? "14,850 Auto" : "1,240 Sync"}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 block">Cloud Leak Risk</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">~0% Sandbox</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={() => setAiTurbo(!aiTurbo)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 dark:text-purple-300 border border-purple-400/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                    <span>Toggle Pace: {aiTurbo ? "4 Active Autonomous Nodes" : "Idle Sentinel"}</span>
                  </button>
                </div>

                {/* 3 Uniform Verified Metric Pills */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 shrink-0" />
                    <span>4-Node Autonomous AI Workforce</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <span>Private Offline On-Premises Sandboxes</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
                    <span>Custom Micro-controller Hardware Fusion</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-white/10">
                <Link href="/contact" prefetch={false} className="block w-full">
                  <GlassButton
                    variant="primary"
                    size="md"
                    className="w-full justify-center !bg-purple-500/20 hover:!bg-purple-500/30 !text-purple-600 dark:!text-purple-300 !border-purple-500/40"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Deploy Enterprise AI
                  </GlassButton>
                </Link>
              </div>
            </LiquidGlassCard>
          </div>

        </div>

      </div>
    </section>
  );
}
