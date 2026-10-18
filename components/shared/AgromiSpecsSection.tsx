"use client";

import React from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Wifi,
  Eye,
  Droplets,
  TrendingUp,
  CloudSun,
  Database,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

export function AgromiSpecsSection() {
  const deepDives = [
    {
      id: "soil-mesh",
      icon: Wifi,
      title: "LoRaWAN Sub-Surface Soil Moisture & NPK Probes",
      specList: [
        { label: "Wireless Protocol", val: "LoRaWAN 865-867 MHz (India Licensed ISM Band)" },
        { label: "Line of Sight Range", val: "Up to 15 kilometers with high-gain omni antenna" },
        { label: "Measurement Depths", val: "Multi-point: 10 cm, 25 cm, 50 cm root zones" },
        { label: "Battery Life", val: "5+ Years on integrated micro solar panel + LiFePO4" },
        { label: "Waterproofing", val: "IP68 Submersible hermetic enclosure" },
        { label: "Sensors Measured", val: "Volumetric Water Content (VWC), EC Salinity, Temp, NPK Status" },
      ],
      description:
        "Engineered to withstand heavy tilling, tractor vibration, and seasonal monsoon waterlogging. The probes transmit sub-surface soil dielectric permittivity directly to the field hub every 15 minutes, enabling pinpoint water profiling.",
    },
    {
      id: "drone-ndvi",
      icon: Eye,
      title: "Autonomous Drone Multispectral NDVI Crop Health Scanning",
      specList: [
        { label: "Camera Spectral Bands", val: "Green (560nm), Red (650nm), RedEdge (730nm), NIR (840nm)" },
        { label: "Ground Sampling Dist", val: "Under 2.5 cm / pixel at 80m flight altitude" },
        { label: "Flight Automation", val: "Autonomous waypoint grid dispatch via Agromi Cockpit" },
        { label: "Processed Indices", val: "NDVI (Canopy Vigor), NDRE (Chlorophyll), Thermal (Moisture Stress)" },
        { label: "Analysis Turnaround", val: "On-site edge stitched ortho-mosaic within 35 minutes" },
      ],
      description:
        "Captures subtle leaf reflectance changes invisible to the human eye. By analyzing Near-Infrared (NIR) reflectance, Agromi pinpoints crop fungal blights, stem borer attacks, and nitrogen starvation up to 10 days before visible symptoms emerge.",
    },
    {
      id: "solar-valves",
      icon: Droplets,
      title: "Solar Smart Irrigation Valve & Pump Actuators",
      specList: [
        { label: "Relay Capacity", val: "3-Phase & 1-Phase motor starters up to 15 HP" },
        { label: "Power Source", val: "40W Solar Panel + MPPT Charge Controller + 12V 18Ah Battery" },
        { label: "Actuation Response", val: "Sub-second latching solenoid valve command" },
        { label: "Fail-Safe Protocol", val: "Auto cut-off on pipe pressure burst, dry-run, or phase imbalance" },
        { label: "Feedback Loop", val: "Digital flow-meter pulse verification confirming actual discharge" },
      ],
      description:
        "Eliminates late-night trips to turn on tube wells. Integrated motor protection prevents coil burnouts during low village voltage, and pulse flow meters verify that each crop sector receives its precise volumetric allocation.",
    },
    {
      id: "mandi-forecasting",
      icon: TrendingUp,
      title: "Mandi Price Forecasting & APMC Market Intelligence",
      specList: [
        { label: "Historical Data Depth", val: "10+ Years of daily mandi modal price records across 2,400 APMCs" },
        { label: "Predictive Horizon", val: "7-day, 14-day, and 30-day directional price projection" },
        { label: "Factors Modeled", val: "Arrival volumes, seasonal rainfall, cold-storage stocks, festival demand" },
        { label: "Alert Triggers", val: "SMS / WhatsApp notification when local price exceeds harvest target" },
        { label: "Accuracy Metric", val: "Mean Absolute Percentage Error (MAPE) under 6.8% on major staples" },
      ],
      description:
        "Empowers farmers to move from distress selling to strategic market timing. Machine learning models correlate arrival trends, weather anomalies, and festival cycles to advise optimal harvesting windows.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4 border border-emerald-500/30">
          <Layers className="w-3.5 h-3.5 text-emerald-500" />
          <span>Hardware & Algorithmic Blueprint</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
          Precision Engineering for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            Real Agricultural Scale
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
          Agromi is built for harsh field environments. Read our hardware telemetry specifications, communication protocols, and edge compute performance metrics.
        </p>
      </div>

      {/* Specifications Deep Dive Cards */}
      <div className="space-y-10">
        {deepDives.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <LiquidGlassCard
              key={spec.id}
              glowColor="rgba(16, 185, 129, 0.2)"
              className="p-8 sm:p-12 rounded-3xl border border-emerald-500/20 dark:border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    Specification Module 0{index + 1}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                    {spec.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {spec.description}
                  </p>
                </div>

                {/* Right Specification Table */}
                <div className="lg:col-span-7 bg-slate-100/80 dark:bg-black/30 rounded-2xl p-6 border border-slate-200/80 dark:border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    <span>Hardware & Protocol Parameters</span>
                  </h3>
                  <div className="divide-y divide-slate-200 dark:divide-white/10">
                    {spec.specList.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1"
                      >
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          {item.label}
                        </span>
                        <span className="font-mono font-semibold text-slate-900 dark:text-emerald-300">
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <LiquidGlassCard
        glowColor="rgba(16, 185, 129, 0.25)"
        className="p-8 sm:p-12 rounded-3xl border border-emerald-500/30 dark:border-white/10 text-center space-y-6"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
            Inspect the Hardware in Meerut
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Visit our Western UP research acreage or schedule an engineer-assisted pilot on your land.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/agromi/contact">
            <GlassButton variant="primary" size="lg" className="flex items-center gap-2">
              <span>Book On-Site Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
          </Link>
          <Link href="/agromi/pricing">
            <GlassButton variant="secondary" size="lg">
              View Licensing Tiers
            </GlassButton>
          </Link>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
