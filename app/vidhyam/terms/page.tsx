import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck, Scale, CheckCircle2, ArrowRight } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "Terms & Conditions — Vidhyam School OS",
  description:
    "Software license terms, local on-premise data sovereignty, and service commitments for Vidhyam School Operating System.",
};

const SECTIONS = [
  {
    num: "1",
    title: "License Grant & Desktop Runtime",
    content:
      "Modernisum Technologies grants the subscribing school or educational society a non-exclusive, non-transferable license to install and run Vidhyam Desktop OS across its authorized campus computers, local area network (LAN) nodes, and administrative terminals. The school retains perpetual rights to run its on-premise database independently of continuous cloud connection.",
  },
  {
    num: "2",
    title: "100% On-Premise Data Sovereignty",
    content:
      "All student demographic records, academic marks, biometric hashes, fee ledger entries, and faculty data created within Vidhyam remain the exclusive, sovereign property of the school. Modernisum claims zero proprietary ownership, rights, or interest in institutional data. Data stored locally on campus hardware is fully controlled and managed by the institution.",
  },
  {
    num: "3",
    title: "Multi-PC LAN & Offline Architecture",
    content:
      "Vidhyam is engineered to function autonomously over local Wi-Fi and Ethernet networks using 60-second atomic lease locks. Modernisum is not liable for data inconsistencies arising from intentional tampering with local database files, unauthorized network firewalls, or hardware storage corruption outside recommended maintenance procedures.",
  },
  {
    num: "4",
    title: "Service Level Agreement (SLA) & Support",
    content:
      "For schools enrolled in active Starter, Growth, or Enterprise plans, Modernisum provides guaranteed technical support. Standard inquiries are addressed within 2 business hours, while critical campus emergencies (such as fee collection counter or examination morning disruptions) are guaranteed a response within 15 minutes via remote AnyDesk or phone dispatch.",
  },
  {
    num: "5",
    title: "Fee Collection & Direct Banking Settlement",
    content:
      "Payment processing integrated with WhatsApp and UPI connects directly to the school's designated commercial bank account. Modernisum operates strictly as a software telemetry layer and does not hold school funds in intermediate escrow or wallet accounts.",
  },
  {
    num: "6",
    title: "Governing Law & Jurisdiction",
    content:
      "These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising in connection with the software licensing agreement shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.",
  },
];

export default function VidhyamTermsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Scale className="w-3.5 h-3.5" />
          <span>Institutional Legal Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Terms of Service & Licensing
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Effective Date: Academic Session 2026–2027 • Modernisum Technologies LLP
        </p>
      </div>

      {/* Summary Highlight Card */}
      <LiquidGlassCard className="p-6 border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>The Vidhyam Data Guarantee</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
          Your students and financial data belong exclusively to your institution. Vidhyam operates on an offline-first architecture, ensuring that your campus never suffers from third-party vendor lock-in or cloud hostage scenarios.
        </p>
      </LiquidGlassCard>

      {/* Numbered Sections */}
      <div className="space-y-6">
        {SECTIONS.map((sec) => (
          <LiquidGlassCard key={sec.num} className="p-6 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                {sec.num}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                {sec.title}
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-8 font-light">
              {sec.content}
            </p>
          </LiquidGlassCard>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <Link href="/vidhyam/privacy" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1">
          <span>Read Institutional DPDP Privacy Policy</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link href="/vidhyam/contact">
          <GlassButton variant="secondary" size="sm">
            Contact Legal Compliance Desk
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
