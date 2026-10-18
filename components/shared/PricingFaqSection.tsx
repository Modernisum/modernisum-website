"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ArrowRight,
  Sprout,
  GraduationCap,
} from "lucide-react";

export interface PricingFaqSectionProps {
  variant?: "school" | "vidhyam" | "agromi" | "farmer";
}

export function PricingFaqSection({ variant = "school" }: PricingFaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const schoolFaqConfig = {
    badge: "Institutional FAQ",
    badgeIcon: GraduationCap,
    badgeColor: "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border-cyan-400/30",
    accentGlow: "rgba(0, 242, 254, 0.15)",
    title: "Frequently Asked Questions",
    subtitle: "Clear, transparent answers for school principals, trust chairpersons, and bursars.",
      faqs: [
        {
          q: "What is the per-student subscription rate and billing cycle?",
          a: "MOD School operates on a transparent flat rate of ₹20 per Active Regular Student per month. Prepayment is available via Quarterly Advance (₹60/quarter, 0% off) or Annual Upfront (₹180/year per student with a flat 25% discount, saving ₹60/student). Only currently enrolled active regular students are billed; Transfer Certificate (TC), dropped, or Alumni students incur ₹0 charge. 0% GST applies under statutory MSME threshold.",
        },
        {
          q: "What happens if our payment is delayed? Will our local school records be locked?",
          a: "Never. Modernisum strictly guarantees a Non-Blocking Grace Period. Schools receive a 7-to-15 calendar day grace window with advance dashboard alerts. Even if unpaid past 15 days, local PC academic workflows and database write operations are NEVER blocked. Only external mobile app tunnel visibility and read analytics pause. The School Admin can decrypt and export 100% of their database into a local ZIP file on their PC anytime—zero vendor lock-in.",
        },
        {
          q: "How does third-party AI and Google Cloud backup integration work?",
          a: "To eliminate markup, schools integrate their own Google Gemini API key directly (running smoothly on Google's 15 RPM free tier via low-token context logic). Automated hourly AES-256 encrypted backups sync directly to the school's own private Google Drive account via OAuth refresh tokens.",
        },
        {
          q: "Do we need to replace our existing biometric turnstiles or cameras?",
          a: "No. MOD School is built on open hardware standards. It integrates with any standard RTSP/ONVIF IP camera, Hikvision/Dahua turnstiles, or USB biometric scanners via our plug-and-play on-campus Cloud Relay.",
        },
        {
          q: "How does automated WhatsApp fee recovery work?",
          a: "MOD School connects directly to official WhatsApp Business APIs. On due dates, parents receive an interactive message with their child's detailed invoice and an instant UPI QR payment link. Money settles directly into your school bank account with zero intermediate escrow holding.",
        },
        {
          q: "Is student and faculty data protected under the DPDP Act 2023?",
          a: "Yes. The School is the sole Data Fiduciary; 100% of student records reside on the School's local desktop computer. Facial recognition vectors are mathematically salted and hashed; raw biometric images are never stored in any cloud honeypot.",
        },
      ],
      hotlineText: "Have custom school trust licensing requirements?",
      ctaText: "Speak with Lead School Architect",
      ctaHref: "/contact",
    };

  const data = {
    school: schoolFaqConfig,
    vidhyam: schoolFaqConfig,
    agromi: {
      badge: "Precision Ag FAQ",
      badgeIcon: Sprout,
      badgeColor: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
      accentGlow: "rgba(16, 185, 129, 0.2)",
      title: "Frequently Asked Questions",
      subtitle: "Operational details for estate managers, progressive farmers, and FPO directors.",
      faqs: [
        {
          q: "Does Agromi hardware require existing broadband or Wi-Fi on the farm?",
          a: "No. Agromi probes communicate via a dedicated long-range LoRaWAN solar gateway that operates independently of broadband. For remote transmission, the gateway houses an industrial multi-carrier 4G/2G SIM or stores telemetry locally on edge storage.",
        },
        {
          q: "Can the solar irrigation controller run our existing tube-well or submersible pump?",
          a: "Yes. Our relay controllers interface with standard 3-phase and single-phase motor starters (up to 15 HP) and latching 12V/24V solenoid drip valves with built-in dry-run and phase-reversal protection.",
        },
        {
          q: "How often do drone multispectral scans take place?",
          a: "For our Commercial Estate & FPO plan, autonomous drone sweeps are performed bi-weekly during critical vegetative and flowering stages. Emergency pest scans can be triggered on demand.",
        },
        {
          q: "What happens during a complete cellular network outage in our village?",
          a: "Agromi is 100% offline-first. The local gateway continues to collect soil telemetry, evaluate root-zone thresholds, and actuate irrigation valves on schedule. When connectivity returns, all records synchronize seamlessly.",
        },
        {
          q: "Can multiple family members or farm staff access the mobile cockpit?",
          a: "Yes. The Commercial Estate plan includes multi-seat access with role-based permissions for farm owners, field supervisors, and tractor operators with SMS / WhatsApp alerts.",
        },
      ],
      hotlineText: "Need tailored acreage sizing or drone flight zones?",
      ctaText: "Consult Agricultural Engineer",
      ctaHref: "/mod-farmer/contact",
    },
  };

  const config =
    variant === "farmer" || variant === "agromi"
      ? data.agromi
      : data[variant as keyof typeof data] || data.school;
  const BadgeIcon = config.badgeIcon;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${config.badgeColor}`}
        >
          <BadgeIcon className="w-3.5 h-3.5" />
          <span>{config.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
          {config.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {config.subtitle}
        </p>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3">
        {config.faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <LiquidGlassCard
              key={idx}
              glowColor={config.accentGlow}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer"
              onClick={() => toggle(idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white text-left">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-cyan-500 dark:text-cyan-400" : ""
                  }`}
                />
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Support Strip */}
      <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {config.hotlineText}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Direct access to dedicated solution engineers with zero sales pressure.
          </div>
        </div>
        <Link href={config.ctaHref} className="shrink-0">
          <GlassButton variant="primary" size="sm" className="flex items-center gap-1.5">
            <span>{config.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
