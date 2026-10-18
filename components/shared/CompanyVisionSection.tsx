"use client";

import React from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { 
  Lock, 
  Cpu, 
  Zap, 
  Workflow, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

export function CompanyVisionSection() {
  const pillars = [
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: "Fail-Proof Security & Zero-Leak Sandbox",
      tagline: "Offline desktop runtimes, on-prem AI, and E2EE",
      description:
        "We build fail-proof architectures using native offline desktop runtimes, self-hosted on-premise AI models, and isolated execution sandboxes with end-to-end encryption. Enterprise intelligence never leaves your perimeter—reducing data leak probability to literally ~0%.",
      badge: "Sovereign Security",
      footer: "Strict Sandbox Isolation • ~0% Leak Probability",
      glowColor: "rgba(0, 242, 254, 0.2)",
      borderColor: "group-hover:border-cyan-500/40",
    },
    {
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      title: "Smart Hardware & Edge Automation",
      tagline: "Eliminating IT friction so you focus purely on production",
      description:
        "We engineer custom edge hardware components, IoT micro-controllers, and intelligent physical sensors that absorb heavy operational workloads automatically. Your workforce never wastes time managing servers—staying 100% dedicated to core business production.",
      badge: "Automated Edge Hardware",
      footer: "Industrial-Grade Edge • 100% Production Focus",
      glowColor: "rgba(16, 185, 129, 0.2)",
      borderColor: "group-hover:border-emerald-500/40",
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Frontier Engineering at Minimal Cost",
      tagline: "High-tech institutional platforms with zero inflated markups",
      description:
        "We deliver cutting-edge software and cognitive AI systems at the guaranteed minimum possible cost. By engineering lean, high-performance native architectures with zero recurring SaaS taxes, we deliver institutional-grade technology with unbeatable ROI.",
      badge: "Minimal Cost • High ROI",
      footer: "Zero SaaS Bloat • Guaranteed Minimum Cost",
      glowColor: "rgba(168, 85, 247, 0.2)",
      borderColor: "group-hover:border-purple-500/40",
    },
  ];

  return (
    <section 
      id="philosophy" 
      className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-black/40 border-y border-slate-200/80 dark:border-white/5 scroll-mt-28"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Company Vision & Core Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            How We Guarantee{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400">
              Fail-Proof Reliability
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300/90 leading-relaxed font-normal dark:font-light">
            Engineered so institutional leaders operate as visionary CEOs while private AI agents, secure offline sandboxes, and automated hardware handle the heavy operational lifting.
          </p>
        </div>

        {/* Vision Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <LiquidGlassCard
                glowColor={pillar.glowColor}
                className={`h-full p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group ${pillar.borderColor} transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/20 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4">
                    {pillar.tagline}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{pillar.footer}</span>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>

        {/* Parent Holding Impact Strip */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-500/10 via-slate-100/90 to-emerald-500/10 dark:from-cyan-950/40 dark:via-slate-900/50 dark:to-emerald-950/40 border border-slate-200/90 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Workflow className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                The Autonomous CEO Architecture
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You lead strategy with peace of mind. Sovereign AI agents, zero-leak sandboxes, and automated edge hardware run your operations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-xs font-mono text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>~0% Leak Risk</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-white/20" />
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% Production Focus</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-white/20" />
            <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Minimal Delivery Cost</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
