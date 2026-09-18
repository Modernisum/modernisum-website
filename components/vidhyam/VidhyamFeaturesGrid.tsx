"use client";

import React from "react";
import { 
  ScanFace, 
  CreditCard, 
  GraduationCap, 
  BellRing, 
  Building2, 
  Wallet,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

const CAPABILITIES = [
  {
    icon: ScanFace,
    title: "Face AI Gate Attendance",
    desc: "Contactless optical recognition at school turnstiles. Processes 45 students per minute per lane with sub-second parent SMS & WhatsApp notifications.",
    glow: "rgba(0, 242, 254, 0.25)",
    metric: "0.4s Ingress",
  },
  {
    icon: CreditCard,
    title: "WhatsApp Fee Recovery",
    desc: "Automated digital invoices sent directly to parent WhatsApp with 1-click UPI payment links. Automatic double-entry ledger reconciliation with 0 bank drift.",
    glow: "rgba(16, 185, 129, 0.25)",
    metric: "99.8% Recovery",
  },
  {
    icon: GraduationCap,
    title: "CBSE & ICSE Marksheets",
    desc: "100% compliant examination report cards with automatic grading scales, co-scholastic rubric calculations, and instant digital PDF signing.",
    glow: "rgba(99, 102, 241, 0.25)",
    metric: "UDISE+ Ready",
  },
  {
    icon: BellRing,
    title: "Parent Telemetry & Alerts",
    desc: "Real-time bus tracking with geofenced arrival alerts. Instant homework broadcasts, circulars, and attendance logs without noisy external apps.",
    glow: "rgba(245, 158, 11, 0.25)",
    metric: "Instant Broadcast",
  },
  {
    icon: Building2,
    title: "Campus Space Digital Twin",
    desc: "Physical infrastructure registry with room-by-room capacity management, asset depreciation tracking, and lab equipment valuation.",
    glow: "rgba(236, 72, 153, 0.25)",
    metric: "Asset Ledger",
  },
  {
    icon: Wallet,
    title: "1-Click Biometric Payroll",
    desc: "Seamless faculty payroll calculation derived from biometric muster rolls. Auto-calculates deductions, leaves, allowances, and generates bank pay-slips.",
    glow: "rgba(168, 85, 247, 0.25)",
    metric: "1st of Month Auto",
  },
];

export function VidhyamFeaturesGrid() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Engineered for Modern Indian Institutions
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
          Every capability is built from first principles to eliminate paper friction, prevent revenue leakage, and empower educational leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          return (
            <LiquidGlassCard
              key={cap.title}
              glowColor={cap.glow}
              className="p-7 flex flex-col justify-between group hover:border-cyan-400/50 transition-all border-slate-200/80 dark:border-white/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100/80 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-white/10">
                    {cap.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <Link
                  href="/vidhyam/features"
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>Technical specs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </LiquidGlassCard>
          );
        })}
      </div>
    </section>
  );
}
