"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, Shield, ArrowRight } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

const TIERS = [
  {
    name: "Starter Trial",
    price: "₹0",
    period: "Forever Free",
    desc: "For newly founded schools or pilot campus testing.",
    badge: null,
    glow: "rgba(255, 255, 255, 0.15)",
    features: [
      "Up to 100 Students",
      "Face AI Gate Attendance",
      "Parent WhatsApp Arrival Alerts",
      "Basic Fee Record Keeping",
      "Digital Student Directory",
      "Standard Community Support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Campus Pro",
    price: "₹4,999",
    period: "/ month per campus",
    desc: "The complete autonomous operating system for standard K-12 schools.",
    badge: "MOST POPULAR",
    glow: "rgba(0, 242, 254, 0.4)",
    features: [
      "Unlimited Students & Staff",
      "High-Speed Face AI Gate Turnstiles",
      "Automated WhatsApp UPI Fee Recovery",
      "CBSE & ICSE Compliant Report Cards",
      "Autonomous Substitute Timetable Engine",
      "Real-time GPS Bus Parent Fleet Telemetry",
      "1-Click Biometric Staff Payroll & Leaves",
      "24/7 Dedicated Relationship Manager",
    ],
    cta: "Deploy Campus Pro",
    highlight: true,
  },
  {
    name: "Trust & Chain",
    price: "Custom",
    period: "Multi-Campus Enterprise",
    desc: "For educational societies and multi-city school networks.",
    badge: "ENTERPRISE",
    glow: "rgba(168, 85, 247, 0.3)",
    features: [
      "All Campus Pro Features Included",
      "Centralized Multi-School Executive HQ",
      "Inter-Campus Teacher & Asset Transfers",
      "Custom ERP Domain (e.g., erp.yourschool.edu)",
      "On-Premise Cloud Relay & Edge Storage",
      "Dedicated On-Campus Engineer Deployment",
      "Tailored CBSE/State Board Curriculums",
      "Enterprise SLA & Disaster Recovery",
    ],
    cta: "Request Society Quote",
    highlight: false,
  },
];

export function VidhyamPricingMatrix() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Transparent Institution Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Invest in Administrative Freedom
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
          Simple, predictable institutional pricing with zero hidden student per-transaction fees.
        </p>

        {/* Billing Cycle Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!isAnnual ? "text-cyan-600 dark:text-cyan-300 font-bold" : "text-slate-500"}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual or monthly billing"
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer flex items-center ${
              isAnnual ? "bg-cyan-500 justify-end" : "bg-slate-300 dark:bg-white/20 justify-start"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? "text-cyan-600 dark:text-cyan-300 font-bold" : "text-slate-500"}`}>
            <span>Billed Annually</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {TIERS.map((tier) => {
          const displayPrice = tier.name === "Campus Pro"
            ? (isAnnual ? "₹3,999" : "₹4,999")
            : tier.price;
          const displayPeriod = tier.name === "Campus Pro"
            ? (isAnnual ? "/ month (paid annually)" : "/ month per campus")
            : tier.period;

          return (
            <LiquidGlassCard
              key={tier.name}
              glowColor={tier.glow}
              className={`p-8 flex flex-col justify-between relative transition-all border-slate-200/80 dark:border-white/10 ${
                tier.highlight
                  ? "border-cyan-500 dark:border-cyan-400/50 shadow-2xl shadow-cyan-500/15 scale-100 lg:-translate-y-2"
                  : ""
              }`}
            >
              <div>
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-light min-h-[36px]">
                    {tier.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-200/80 dark:border-white/10">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono">
                    {displayPrice}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-light">
                    {displayPeriod}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/vidhyam/contact" className="w-full">
                <GlassButton
                  variant={tier.highlight ? "primary" : "secondary"}
                  size="md"
                  className="w-full justify-center"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {tier.cta}
                </GlassButton>
              </Link>
            </LiquidGlassCard>
          );
        })}
      </div>
    </section>
  );
}
