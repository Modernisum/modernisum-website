"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { 
  Activity, 
  Droplets, 
  Sun, 
  Wind, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Wifi, 
  Layers, 
  Zap, 
  Sparkles,
  ArrowRight
} from "lucide-react";

interface SectorData {
  id: string;
  name: string;
  location: string;
  crop: string;
  acres: number;
  moisture: number;
  moistureStatus: "Optimal" | "Warning" | "Critical";
  npk: { n: string; p: string; k: string; score: number };
  ndvi: number;
  ndviStatus: string;
  dripStatus: string;
  temp: number;
  humidity: number;
  mandiRate: string;
  mandiTrend: string;
  aiAlert?: string;
}

const SECTORS: SectorData[] = [
  {
    id: "sec-01",
    name: "Sector Alpha: Basmati Estate",
    location: "Meerut Agro-Cluster, UP",
    crop: "Basmati Paddy 1121",
    acres: 64,
    moisture: 68,
    moistureStatus: "Optimal",
    npk: { n: "142 mg/kg", p: "38 mg/kg", k: "215 mg/kg", score: 92 },
    ndvi: 0.82,
    ndviStatus: "Dense Canopy Vigor",
    dripStatus: "Drip Line 2 Active • 420 L/hr",
    temp: 29,
    humidity: 58,
    mandiRate: "₹3,840 / Qntl",
    mandiTrend: "+4.5% forecast in 72 hrs",
    aiAlert: "Canopy health top 5% of district. Optimal harvesting window opens in 12 days.",
  },
  {
    id: "sec-02",
    name: "Sector Beta: Wheat & Mustard",
    location: "Karnal Farm Collective, Haryana",
    crop: "Sharbati Wheat HD-3086",
    acres: 140,
    moisture: 42,
    moistureStatus: "Warning",
    npk: { n: "115 mg/kg", p: "29 mg/kg", k: "180 mg/kg", score: 76 },
    ndvi: 0.69,
    ndviStatus: "Moderate Stress in Quad-3",
    dripStatus: "Scheduled: Solar Pump On at 14:00",
    temp: 31,
    humidity: 44,
    mandiRate: "₹2,490 / Qntl",
    mandiTrend: "+2.1% steady upward demand",
    aiAlert: "Sub-surface soil moisture breached 45% threshold. Solar valve cycle recommended.",
  },
  {
    id: "sec-03",
    name: "Sector Gamma: Sugarcane Agro-Park",
    location: "Muzaffarnagar Basin, UP",
    crop: "Early Maturing Sugarcane Co-0238",
    acres: 210,
    moisture: 74,
    moistureStatus: "Optimal",
    npk: { n: "165 mg/kg", p: "45 mg/kg", k: "240 mg/kg", score: 95 },
    ndvi: 0.87,
    ndviStatus: "Maximum Biomass Accumulation",
    dripStatus: "Automated Fertigation Completed",
    temp: 28,
    humidity: 62,
    mandiRate: "₹385 / Qntl (State Advised)",
    mandiTrend: "Guaranteed APMC Quota",
    aiAlert: "Zero pest/borer signatures detected by weekly drone multispectral sweep.",
  },
];

export function CockpitShowcase() {
  const [activeSectorId, setActiveSectorId] = useState("sec-01");
  const currentSector = SECTORS.find((s) => s.id === activeSectorId) || SECTORS[0];

  return (
    <section className="py-24 relative overflow-hidden" id="cockpit">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4 border border-emerald-500/30">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Interactive Farm Operations Cockpit</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Real-Time Agricultural Telemetry at{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-400">
              Your Fingertips
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
            Monitor ground-truth soil probes, drone spectral NDVI health, automated solar irrigation valves, and live mandi prices from a single pane of glass.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SECTORS.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveSectorId(sector.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                activeSectorId === sector.id
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40 shadow-md shadow-emerald-500/10"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${sector.moistureStatus === "Optimal" ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span>{sector.name}</span>
              <span className="text-[11px] opacity-70 font-mono">({sector.acres} Ac)</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <LiquidGlassCard
              glowColor="rgba(16, 185, 129, 0.2)"
              className="p-6 rounded-3xl border border-emerald-500/20 dark:border-white/10 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      {currentSector.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">{currentSector.location} • {currentSector.crop}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                    currentSector.moistureStatus === "Optimal"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  }`}>
                    {currentSector.moistureStatus}
                  </span>
                </div>

                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 dark:border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Droplets className="w-4 h-4 text-emerald-500" />
                      <span>Sub-Surface Soil Moisture (Root Zone - 25cm)</span>
                    </div>
                    <span className="text-lg font-bold font-tech text-emerald-600 dark:text-emerald-400">
                      {currentSector.moisture}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentSector.moisture}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${
                        currentSector.moistureStatus === "Optimal"
                          ? "bg-gradient-to-r from-emerald-500 to-green-400"
                          : "bg-gradient-to-r from-amber-500 to-yellow-400"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                    <span>Dry (0%)</span>
                    <span>Wilting (35%)</span>
                    <span>Field Capacity (70%)</span>
                    <span>Saturation (100%)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <span className="block text-[11px] font-mono text-slate-500">Drone NDVI Index</span>
                    <span className="text-xl font-bold font-tech text-emerald-600 dark:text-emerald-400">
                      {currentSector.ndvi}
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block mt-0.5">
                      {currentSector.ndviStatus}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <span className="block text-[11px] font-mono text-slate-500">Soil NPK Health</span>
                    <span className="text-xl font-bold font-tech text-cyan-600 dark:text-cyan-400">
                      {currentSector.npk.score}/100
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block mt-0.5">
                      N:{currentSector.npk.n}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Field Micro-Climate</span>
                    </span>
                    <span className="font-mono font-medium">{currentSector.temp}°C • {currentSector.humidity}% RH</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Solar Irrigation Valve</span>
                    </span>
                    <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">{currentSector.dripStatus}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-500" />
                      <span>APMC Mandi Rate</span>
                    </span>
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{currentSector.mandiRate} ({currentSector.mandiTrend})</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Agromi AI Copilot:</span>
                    <span className="text-slate-700 dark:text-slate-300">{currentSector.aiAlert}</span>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </div>

          <div className="lg:col-span-7">
            <LiquidGlassCard
              glowColor="rgba(16, 185, 129, 0.25)"
              className="p-4 sm:p-6 rounded-3xl border border-emerald-500/20 dark:border-white/10 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Live Field Map & Analytics Suite
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">LoRaWAN Mesh Sync: 0.18s</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 dark:border-white/15 aspect-[16/10] bg-gradient-to-br from-emerald-950/80 via-slate-950 to-slate-900 group/preview shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 p-2 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Image
                          src="/images/agromi-icon.svg"
                          alt="Agromi Logo"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-2xl sm:text-3xl font-bold font-tech text-white tracking-tight">Agromi</span>
                        <span className="text-xs text-emerald-400 font-tech block">Manage your agricultural ecosystem</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Telemetry Mesh v3.2
                      </span>
                    </div>
                  </div>

                  <div className="my-auto space-y-3 py-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Drone NDVI Multispectral Reflectance</span>
                      </span>
                      <span className="text-emerald-400 font-bold">0.82 / 1.0 (Optimal Canopy)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                      <div className="w-[15%] bg-rose-500/70" />
                      <div className="w-[20%] bg-amber-500/70" />
                      <div className="w-[40%] bg-emerald-500" />
                      <div className="w-[25%] bg-teal-400" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Severe Moisture Stress</span>
                      <span>Moderate</span>
                      <span>Healthy Canopy</span>
                      <span>Peak Vigor</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="text-emerald-400">● 16 Soil Probes Broadcasting</span>
                    <span>APMC Mandi Realization: +₹280/Qntl</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-200 dark:border-white/10 text-center">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Offline Edge</span>
                  <span className="text-[11px] text-slate-500">Syncs without internet</span>
                </div>
                <div className="border-x border-slate-200 dark:border-white/10">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Multi-Estate</span>
                  <span className="text-[11px] text-slate-500">Manage 50+ sectors</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Sub-Second</span>
                  <span className="text-[11px] text-slate-500">Instant pump control</span>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export const AgromiCockpitShowcase = CockpitShowcase;
