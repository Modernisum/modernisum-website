"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Check,
  Sparkles,
  ArrowRight,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Banknote,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const VIDHYAM_TIERS = [
  {
    name: "Free Evaluation Trial",
    price: "₹0",
    period: "7 to 30 Days Trial",
    desc: "Full unrestricted evaluation for newly onboarding schools. Standard 7-day trial, extendable up to 30 days.",
    badge: "100% FREE TRIAL",
    glow: "rgba(255, 255, 255, 0.15)",
    features: [
      "100% Equal Feature Parity (All Features Included)",
      "Zero Setup Fees • No Credit Card Required",
      "Windows & Linux Native Subsystems",
      "Face AI & RFID Gate Attendance",
      "CBSE & ICSE Marksheets & Dossiers",
      "E2EE Cloud Tunnel for Mobile Apps",
      "Unconditional Local Decrypted ZIP Export",
    ],
    cta: "Start Free Evaluation Trial",
    href: "/school/register",
    highlight: false,
  },
  {
    name: "Quarterly Prepaid",
    price: "₹20",
    period: "/ student / mo (₹60 / quarter)",
    desc: "Standard prepayment cycle. Billed strictly on currently enrolled Active Regular students. TC, dropped, or Alumni = ₹0.",
    badge: "STANDARD CYCLE (0% OFF)",
    glow: "rgba(0, 242, 254, 0.4)",
    features: [
      "100% Feature Parity (No Paid Tiers or Credits)",
      "100 Active Students = ₹6,000 / Quarter",
      "200 Active Students = ₹12,000 / Quarter",
      "500 Active Students = ₹30,000 / Quarter",
      "Razorpay & RBI-Compliant UPI AutoPay Mandate",
      "7–15 Day Non-Disruptive Grace Period",
      "Local Write & Academic Work NEVER Blocked",
      "Google Gemini AI (BYOK - 15 RPM Free Tier)",
      "0% GST (Statutory MSME Exemption)",
    ],
    cta: "Deploy Quarterly Plan",
    href: "/mod-school/register",
    highlight: false,
  },
  {
    name: "Annual Upfront",
    price: "₹15",
    period: "/ student / mo (₹180 / year)",
    desc: "Flat 25% discount applied. Maximum savings for school trusts, societies, and autonomous campuses.",
    badge: "BEST VALUE — FLAT 25% OFF",
    glow: "rgba(16, 185, 129, 0.4)",
    features: [
      "Save ₹60 / Student Every Year (Flat 25% OFF)",
      "100 Active Students = ₹18,000 / Year (Save ₹6,000)",
      "200 Active Students = ₹36,000 / Year (Save ₹12,000)",
      "500 Active Students = ₹90,000 / Year (Save ₹30,000)",
      "Strictly Prepaid (Starts on Payment Success Date)",
      "Razorpay / UPI AutoPay / Instant PDF Invoices",
      "7–15 Day Grace Period & Local Write Security",
      "Local Decrypted ZIP Export Guaranteed Anytime",
      "0% GST (Statutory MSME Exemption)",
    ],
    cta: "Lock In 25% Annual Discount",
    href: "/mod-school/register",
    highlight: true,
  },
];

const AGROMI_PLANS = [
  {
    name: "Pilot Farmer",
    tag: "Smallholdings up to 25 Acres",
    priceMonthly: 1499,
    priceAnnual: 1199,
    description: "Essential precision telemetry for progressive growers wanting to eliminate water waste and track mandi rates.",
    features: [
      "Up to 25 acres farm coverage",
      "4x Solar LoRaWAN soil moisture probes",
      "Sub-surface root zone tracking (10cm/25cm)",
      "Mobile dashboard & WhatsApp notifications",
      "Daily micro-weather & frost alerts",
      "Regional APMC mandi price updates",
      "Standard field support",
    ],
    highlight: false,
    buttonText: "Start Farm Pilot",
    buttonVariant: "secondary" as const,
  },
  {
    name: "Commercial Estate & FPO",
    tag: "Estates up to 150 Acres",
    priceMonthly: 4999,
    priceAnnual: 3999,
    description: "Full autonomous automation for commercial orchards, seed growers, and Farmer Producer Organizations.",
    features: [
      "Up to 150 acres multi-sector coverage",
      "16x Solar LoRaWAN probes + 1x Solar Gateway",
      "Full NPK, soil salinity & moisture telemetry",
      "Bi-weekly drone multispectral NDVI scans",
      "Automated solar drip valve relay triggers",
      "AI APMC price surge arbitrage predictor",
      "100% offline edge sync support",
      "Quarterly field agronomist inspection",
    ],
    highlight: true,
    badge: "Most Popular for Estates",
    buttonText: "Deploy Estate System",
    buttonVariant: "primary" as const,
  },
  {
    name: "Agri-Corporation & State Mandi",
    tag: "500+ Acres / Cooperatives",
    priceCustom: "Custom Enterprise",
    description: "Custom deep-tech infrastructure for large sugar mills, contract farming corporations, and federations.",
    features: [
      "Unlimited acreage & multi-district telemetry",
      "Custom drone fleet dispatch & GIS mapping",
      "Direct cold-storage & warehouse IoT integration",
      "ERP & SAP database bidirectional sync",
      "Dedicated on-field telemetry engineer",
      "Sovereign data hosting & custom ML models",
      "24/7 SLA with 99.98% hardware guarantee",
    ],
    highlight: false,
    buttonText: "Contact Enterprise Sales",
    buttonVariant: "secondary" as const,
  },
];

export interface PricingMatrixProps {
  variant?: "school" | "vidhyam" | "agromi" | "farmer";
}

export function PricingMatrix({ variant = "school" }: PricingMatrixProps) {
  const { isHindi } = useLanguage();
  const isAgro = variant === "agromi" || variant === "farmer";
  const [isAnnual, setIsAnnual] = useState(isAgro);

  if (isAgro) {
    return (
      <section className="py-24 relative overflow-hidden" id="pricing">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Transparent Investment Plans</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Predictable Pricing Designed for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-400">
                Measurable ROI
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
              Turnkey hardware, cloud software, and drone analytics bundled into transparent plans that pay for themselves within one crop cycle.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full glass-pill border border-emerald-500/20 bg-slate-100 dark:bg-white/5">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  !isAnnual
                    ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {AGROMI_PLANS.map((plan, idx) => {
              const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <LiquidGlassCard
                    glowColor={plan.highlight ? "rgba(16, 185, 129, 0.3)" : "rgba(16, 185, 129, 0.1)"}
                    className={`h-full p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                      plan.highlight
                        ? "border-emerald-500/50 dark:border-emerald-400/40 shadow-xl shadow-emerald-500/10 bg-emerald-500/[0.04]"
                        : "border-emerald-500/20 dark:border-white/10"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {plan.tag}
                        </span>
                        {plan.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {plan.description}
                      </p>

                      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                        {plan.priceCustom ? (
                          <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                            Custom Quote
                          </span>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white">
                              ₹{price?.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                              / month {isAnnual ? "(billed annually)" : ""}
                            </span>
                          </div>
                        )}
                      </div>

                      <ul className="space-y-3 mb-8 text-xs text-slate-700 dark:text-slate-300">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Link href="/agromi/contact" className="w-full">
                        <GlassButton
                          variant={plan.buttonVariant}
                          size="md"
                          className={`w-full justify-center group ${
                            plan.highlight
                              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                              : "border-emerald-500/30 hover:border-emerald-500/60"
                          }`}
                          icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                          iconPosition="right"
                        >
                          {plan.buttonText}
                        </GlassButton>
                      </Link>
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Variant: Vidhyam (MOD School)
  return (
    <section id="pricing" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>{isHindi ? "MOD School • पारदर्शी स्कूल बिलिंग" : "MOD School • Transparent Flat Pricing"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          {isHindi ? "समतल ₹20/छात्र बिलिंग — 0% GST एवं पूर्ण फीचर्स" : "₹20 / Active Student / Month — Equal Features for All"}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
          {isHindi
            ? "कोई 'बेसिक' या 'प्रो' भेदभाव नहीं। हर स्कूल को मिलते हैं 100% फीचर्स, 7-15 दिन का नॉन-डिस्ट्रप्टिव ग्रेस पीरियड और 0% GST (MSME रजिस्टर्ड)।"
            : "No 'Basic' or 'Pro' division. Every campus receives 100% feature parity, 7–15 day non-disruptive grace period, and 0% GST (Govt. MSME Exempt)."}
        </p>
      </div>

      {/* Official Executed Policy Download Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-emerald-500/10 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/30">
                Official Executed Policy Documents
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Govt. MSME: UDYAM-UP-56-0049848
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
              Official Subscription, Transparent Pricing & Master License Policies
            </h4>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <a
            href="/documents/MOD-School-Official-Subscription-Pricing-Policy.pdf"
            download="MOD-School-Official-Subscription-Pricing-Policy.pdf"
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Pricing Policy PDF (980 KB)</span>
          </a>
          <a
            href="/documents/MOD-School-Master-Software-License-Agreement.pdf"
            download="MOD-School-Master-Software-License-Agreement.pdf"
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>License Agreement PDF (1.05 MB)</span>
          </a>
        </div>
      </div>

      {/* 3 Main Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {VIDHYAM_TIERS.map((tier) => (
          <LiquidGlassCard
            key={tier.name}
            glowColor={tier.glow}
            className={`p-8 flex flex-col justify-between relative transition-all border-slate-200/80 dark:border-white/10 ${
              tier.highlight
                ? "border-emerald-500 dark:border-emerald-400/50 shadow-2xl shadow-emerald-500/15 scale-100 lg:-translate-y-2"
                : ""
            }`}
          >
            <div>
              {tier.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase text-white shadow-md ${
                  tier.highlight
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600"
                }`}>
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
                  {tier.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-light">
                  {tier.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                      tier.highlight ? "text-emerald-500" : "text-cyan-600 dark:text-cyan-400"
                    }`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href={tier.href} className="w-full">
              <GlassButton
                variant={tier.highlight ? "primary" : "secondary"}
                size="md"
                className={`w-full justify-center ${
                  tier.highlight ? "bg-emerald-600 hover:bg-emerald-500 text-white" : ""
                }`}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {tier.cta}
              </GlassButton>
            </Link>
          </LiquidGlassCard>
        ))}
      </div>

      {/* Official Cycle Calculator Table from PDF */}
      <LiquidGlassCard interactive={false} className="p-6 sm:p-8 space-y-5 border-cyan-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              {isHindi ? "आधिकारिक छात्र गणना मैट्रिक्स (INR)" : "Transparent Per-Student Pricing & Cycle Calculator (INR)"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
              {isHindi
                ? "केवल नामांकित सक्रिय नियमित छात्रों (Active Regular) पर देय। टीसी या ड्रॉपआउट छात्रों पर ₹0 शुल्क।"
                : "Billed strictly on currently enrolled Active Regular students. TC, dropped, or Alumni students incur ₹0 charge."}
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 self-start sm:self-auto">
            0% GST (MSME Exempt)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-mono">
                <th className="pb-3 pr-4 font-bold">Active Regular Students</th>
                <th className="pb-3 px-4 font-bold">Monthly Base Calculation</th>
                <th className="pb-3 px-4 font-bold">Quarterly Prepaid (0% OFF)</th>
                <th className="pb-3 pl-4 font-bold text-emerald-600 dark:text-emerald-400">Annual Upfront (Flat 25% OFF)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-white/5 font-mono">
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">1 Active Student</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">1 × ₹20 = ₹20 / Mo</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">₹60 / Quarter</td>
                <td className="py-3 pl-4 text-emerald-600 dark:text-emerald-400 font-bold">₹180 / Year (Save ₹60)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">100 Active Students</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">100 × ₹20 = ₹2,000 / Mo</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">₹6,000 / Quarter</td>
                <td className="py-3 pl-4 text-emerald-600 dark:text-emerald-400 font-bold">₹18,000 / Year (Save ₹6,000)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">200 Active Students</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">200 × ₹20 = ₹4,000 / Mo</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">₹12,000 / Quarter</td>
                <td className="py-3 pl-4 text-emerald-600 dark:text-emerald-400 font-bold">₹36,000 / Year (Save ₹12,000)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">500 Active Students</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">500 × ₹20 = ₹10,000 / Mo</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">₹30,000 / Quarter</td>
                <td className="py-3 pl-4 text-emerald-600 dark:text-emerald-400 font-bold">₹90,000 / Year (Save ₹30,000)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4 Invariant Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-200/80 dark:border-white/10">
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
              <span>100% Equal Parity</span>
            </div>
            <p className="text-[11px] text-slate-500 font-light">
              No paid tiers or feature cuts. Every school gets every feature.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>7–15 Day Grace</span>
            </div>
            <p className="text-[11px] text-slate-500 font-light">
              Local academic & write operations are NEVER locked during grace.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span>Local ZIP Export</span>
            </div>
            <p className="text-[11px] text-slate-500 font-light">
              Decrypt and download your complete local database anytime.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>BYOK Gemini AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-light">
              ₹0 AI markup. Runs smoothly on Google Gemini 15 RPM free tier.
            </p>
          </div>
        </div>
      </LiquidGlassCard>
    </section>
  );
}

export function SchoolPricingMatrix() {
  return <PricingMatrix variant="school" />;
}

export const VidhyamPricingMatrix = SchoolPricingMatrix;

export function AgromiPricingMatrix() {
  return <PricingMatrix variant="agromi" />;
}
