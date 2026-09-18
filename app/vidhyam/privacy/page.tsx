import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Database, FileCheck2, ArrowRight } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "Privacy Policy & DPDP Act 2023 Compliance — Vidhyam School OS",
  description:
    "Institutional data protection policies, minor privacy safeguards, edge biometric encryption, and DPDP Act 2023 adherence for Vidhyam School Operating System.",
};

const PRIVACY_PILLARS = [
  {
    icon: Lock,
    title: "India DPDP Act 2023 Compliance",
    desc: "Vidhyam adheres fully to the Digital Personal Data Protection Act, 2023. Institutional data fiduciary obligations and student data principal protections are implemented at the architectural core.",
  },
  {
    icon: EyeOff,
    title: "Zero Commercial Tracking & No Minor Profiling",
    desc: "We enforce an absolute zero-advertisement and zero-tracking policy. Vidhyam never analyzes student behavior for commercial targeting, nor does it sell, lease, or distribute student records to any third party.",
  },
  {
    icon: ShieldCheck,
    title: "Edge Biometric Vector Hashing",
    desc: "Facial recognition and fingerprint inputs are converted at the edge into mathematical 512-dimension hash embeddings. Raw facial pictures and fingerprint images are never stored or transmitted unencrypted.",
  },
  {
    icon: Database,
    title: "Local Encrypted Database Isolation",
    desc: "Campus records reside on the school's own local PC hardware inside encrypted database stores. Even during full cloud fleet synchronization, data in transit is encrypted using TLS 1.3 and stored using AES-256.",
  },
  {
    icon: FileCheck2,
    title: "Complete Data Portability & Erasure",
    desc: "School administrators retain complete authority to download their entire institutional dataset in standard open formats (CSV, JSON, and SQL dump) at any time with a single click.",
  },
];

export default function VidhyamPrivacyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-400/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Sovereign Data Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Privacy Policy & DPDP Compliance
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Protection of Minor Educational Data • Modernisum Technologies LLP
        </p>
      </div>

      {/* Trust Notice */}
      <LiquidGlassCard className="p-6 border-emerald-500/30 space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          <Lock className="w-4 h-4" />
          <span>Our Commitment to School Data Privacy</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
          School administrative systems handle society's most delicate data: children's marks, attendance, parent financial transactions, and health records. Vidhyam was purposefully engineered with a privacy-by-design, offline-first philosophy to ensure that no third-party cloud provider ever gains unwarranted access to your students.
        </p>
      </LiquidGlassCard>

      {/* Key Privacy Pillars */}
      <div className="space-y-4">
        {PRIVACY_PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <LiquidGlassCard key={p.title} className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  {p.title}
                </h2>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-11 font-light">
                {p.desc}
              </p>
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Legal Inquiries */}
      <div className="p-6 rounded-2xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 text-center space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
          Data Protection Officer Contact
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-light">
          For institutional audits, data processing agreements (DPAs), or regulatory DPDP inquiries, contact our legal team at{" "}
          <span className="text-cyan-600 dark:text-cyan-400 font-mono">compliance@modernisum.com</span>.
        </p>
        <div className="pt-2">
          <Link href="/vidhyam/terms">
            <GlassButton variant="secondary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Review Software Terms of Service
            </GlassButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
