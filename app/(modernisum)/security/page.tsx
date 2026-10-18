"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  HardDrive,
  KeyRound,
  FileCheck2,
  Cpu,
  ArrowRight,
  Database,
  EyeOff,
  History,
  CheckCircle2,
  Server,
  CloudOff,
  UserCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

const SECURITY_PILLARS = [
  {
    icon: HardDrive,
    title: "Local-First Data Sovereignty",
    badge: "Zero Cloud Hostage",
    description:
      "Institutions and enterprises retain 100% physical ownership of their databases. Core computing and state storage operate on local edge hardware, immune to external cloud outages, vendor bankruptcies, or subscription extortion.",
  },
  {
    icon: KeyRound,
    title: "BYOC Google Drive Vault",
    badge: "Client-Owned Cloud",
    description:
      "Automated encrypted daily snapshots stream directly to your institution's private Google Drive. We store zero proprietary snapshots on our own multi-tenant clusters. You control the cryptographic keys and storage quota.",
  },
  {
    icon: EyeOff,
    title: "Zero-Knowledge Architecture",
    badge: "AES-256 & TLS 1.3",
    description:
      "All transit data between local desktop OS nodes, mobile client endpoints, and external hardware turnstiles is secured with TLS 1.3 and authenticated payload signing. Sensitive records remain strictly confidential.",
  },
  {
    icon: CloudOff,
    title: "Fail-Safe Offline Autonomy",
    badge: "Air-Gapped Resilient",
    description:
      "Modernisum operating systems operate seamlessly without continuous internet connectivity. Campus gate attendance, fee receipts, and farm telemetry continue uninterrupted during network disruptions.",
  },
  {
    icon: History,
    title: "Cryptographic Audit Ledger",
    badge: "1-Click Revert",
    description:
      "Every administrative mutation, space adjustment, or role permission change is recorded in an immutable audit ledger capturing actor ID, timestamp, and pre/post state diffs with 1-click historical rollback.",
  },
  {
    icon: FileCheck2,
    title: "Statutory Compliance (DPDP & GDPR)",
    badge: "Statutory Aligned",
    description:
      "Engineered from the ground up to comply with India's Digital Personal Data Protection (DPDP) Act 2023, GDPR principles, and global student data privacy frameworks. Zero telemetry tracking or ad-network harvesting.",
  },
];

const COMPLIANCE_STANDARDS = [
  { label: "DPDP Act 2023", desc: "Digital Personal Data Protection compliance with explicit parent consent workflows." },
  { label: "AES-256-GCM", desc: "Military-grade encryption for local database files, credential stores, and backup archives." },
  { label: "TLS 1.3 Protocol", desc: "Enforced encrypted transit with certificate pinning and modern cipher suites." },
  { label: "Zero Vendor Lock-In", desc: "Export complete raw relational PostgreSQL/SQLite datasets at any moment with 1 click." },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b12] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar variant="modernisum" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
        {/* Luminous Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Enterprise Data Sovereignty & Security Architecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Your Data Stays{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400">
                In Your Hands
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-3xl mx-auto"
            >
              We believe critical institutional data—student Aadhaar records, financial ledgers, and operational telemetry—should never be held hostage in black-box multi-tenant clouds. Modernisum architects local-first, zero-knowledge software with mathematically verifiable sovereignty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
              >
                Schedule Security Review
              </Link>
              <a
                href="https://school.modernisum.com"
                className="px-6 py-3 rounded-full text-sm font-semibold glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-400/40 transition-all"
              >
                Explore Modernisum School OS
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Pillars Grid */}
      <section className="py-20 relative">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Six Invariable Security Guarantees
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              How our first-principles engineering protects institutional sovereignty, operational privacy, and uninterrupted daily service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SECURITY_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <LiquidGlassCard
                  glowColor="rgba(0, 242, 254, 0.16)"
                  className="p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-400/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                        <pillar.icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
                      {pillar.description}
                    </p>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Deep Dive */}
      <section className="py-20 bg-slate-100/70 dark:bg-[#0b121e]/70 relative border-y border-slate-200 dark:border-white/5">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Cloud Lock-In Policy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
                Engineered Around Institutional Independence
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Legacy software vendors trap schools and enterprises by withholding data export, charging exorbitant migration fees, or holding admissions and fee records hostage when licenses expire.
              </p>

              <div className="space-y-4 pt-2">
                {COMPLIANCE_STANDARDS.map((item) => (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Card */}
            <LiquidGlassCard
              glowColor="rgba(56, 189, 248, 0.2)"
              className="p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-sky-500" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">SOVEREIGNTY TELEMETRY</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  VERIFIED ACTIVE
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Campus Storage Mechanism</div>
                  <div className="text-slate-200">Local SQLite / Encrypted PostgreSQL Relational Engine</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Backup Destination</div>
                  <div className="text-slate-200">School Private Google Drive (BYOC Vault via Service Account)</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Encryption Standard</div>
                  <div className="text-slate-200">AES-256-GCM at rest, TLS 1.3 in transit with mutual token auth</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Audit Retention Protocol</div>
                  <div className="text-slate-200">Tamper-evident logs with 30-365 day configurable rollback</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-xl text-center text-xs sm:text-sm font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-300 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Full Architecture Whitepaper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Protect Your Institutional Sovereignty Today
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto">
            Experience our local-first architectures firsthand. Schedule a confidential briefing with our engineering leads or download our offline campus suite.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              Direct Executive Contact
            </Link>
            <Link
              href="/mod-school/download"
              className="px-8 py-3.5 rounded-full text-sm font-semibold glass-pill text-slate-700 dark:text-slate-300 hover:text-white transition-all"
            >
              ModSchool Download Hub
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
