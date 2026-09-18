import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { VidhyamPricingMatrix } from "@/components/vidhyam/VidhyamPricingMatrix";
import { VidhyamRoiCalculator } from "@/components/vidhyam/VidhyamRoiCalculator";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { HelpCircle, Check, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "School ERP Pricing & Plans — Vidhyam School OS",
  description: "Simple, transparent pricing for Indian schools and educational societies. Zero student per-transaction fees. 100% CBSE & ICSE compliance included.",
};

const FAQS = [
  {
    q: "Do we need to replace our existing biometric turnstiles or cameras?",
    a: "No. Vidhyam is built on open hardware standards. It integrates with any standard RTSP/ONVIF IP camera, Hikvision/Dahua turnstiles, or USB biometric scanners via our plug-and-play on-campus Cloud Relay.",
  },
  {
    q: "How does automated WhatsApp fee recovery work?",
    a: "Vidhyam connects directly to official WhatsApp Business APIs. On due dates, parents receive an interactive message with their child's detailed invoice and an instant UPI QR payment link. Money settles directly into your school bank account with zero intermediate escrow holding.",
  },
  {
    q: "How long does complete school onboarding and data migration take?",
    a: "Standard deployment takes 3 campus days. Our engineering team handles complete data ingestion from Excel/legacy software, faculty app setup, and parent master roster verification.",
  },
  {
    q: "Is student and faculty data protected under the DPDP Act 2023?",
    a: "Yes. All data is encrypted in transit and at rest using AES-256 and hosted within Indian sovereign cloud regions. Facial recognition vectors are mathematically salted and hashed; raw biometric images are never stored unencrypted.",
  },
  {
    q: "Can we generate official CBSE and ICSE marksheets directly?",
    a: "Yes. All standard CBSE grading systems (including term-end scholastic weightages, 8-point grading, and co-scholastic rubrics) are pre-configured. You can download and digitally sign thousands of marksheets in one click.",
  },
];

export default function VidhyamPricingPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      {/* 1. Pricing Tiers */}
      <VidhyamPricingMatrix />

      {/* 2. Interactive ROI Calculator */}
      <VidhyamRoiCalculator />

      {/* 3. Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>Institutional FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <LiquidGlassCard key={faq.q} glowColor="rgba(0, 242, 254, 0.2)" className="p-6 border-slate-200/80 dark:border-white/10">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {faq.a}
              </p>
            </LiquidGlassCard>
          ))}
        </div>
      </div>

      {/* 4. Consultation CTA */}
      <div className="text-center p-12 rounded-3xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 max-w-4xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
          Need a Custom Multi-Campus Proposal?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-light">
          Educational trusts operating 3 or more campuses receive customized volume discounts and on-premise engineers.
        </p>
        <Link href="/vidhyam/contact">
          <GlassButton variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Request Society Consultation
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
