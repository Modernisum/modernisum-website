"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  HardDrive,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  FileCode2,
  Lock,
  Smartphone,
  Monitor,
  Users,
  Puzzle,
  Copy,
  Check,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { SchoolAppConfig, SCHOOL_APPS } from "@/lib/school-downloads";

interface AppDetailPageProps {
  app: SchoolAppConfig;
}

const APP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  desktop: Monitor,
  employee: Users,
  student: Smartphone,
  extension: Puzzle,
};

export function AppDetailPage({ app }: AppDetailPageProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const AppIcon = APP_ICONS[app.id] || Monitor;

  const copyHash = () => {
    navigator.clipboard.writeText(app.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDirectDownload = () => {
    setIsDownloading(true);
    // Trigger direct download via anchor tag with download attribute
    const link = document.createElement("a");
    link.href = app.directDownloadUrl;
    link.download = app.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2500);
  };

  const otherApps = Object.values(SCHOOL_APPS).filter((item) => item.id !== app.id);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Breadcrumb */}
      <div className="pt-4 sm:pt-6 w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link href="/school" className="hover:text-sky-500 transition-colors">
            School OS
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/school/download" className="hover:text-sky-500 transition-colors">
            Applications Hub
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-semibold">{app.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-20 sm:pb-24 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Details & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 dark:bg-sky-500/15 border border-sky-400/30 text-sky-700 dark:text-sky-300">
                  {app.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  {app.version}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Released: {app.releaseDate}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {app.name}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-sky-600 dark:text-sky-300 font-display">
                {app.tagline}
              </p>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {app.description}
              </p>

              {/* Download Buttons Row */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleDirectDownload}
                    disabled={isDownloading}
                    className="px-8 py-4 rounded-2xl text-sm font-semibold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-xl shadow-sky-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
                  >
                    <Download className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`} />
                    <span>{isDownloading ? "Starting Direct Download..." : "Direct 1-Click Download"}</span>
                  </button>

                  <a
                    href={app.driveMirrorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-2xl text-sm font-semibold glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300/80 dark:border-white/10 hover:border-sky-400/40 transition-all flex items-center gap-2"
                  >
                    <HardDrive className="w-4 h-4 text-sky-500" />
                    <span>Cloud Mirror</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>Size: <strong className="text-slate-700 dark:text-slate-200">{app.fileSize}</strong></span>
                  <span>Format: <strong className="text-slate-700 dark:text-slate-200">{app.fileFormat}</strong></span>
                  <span>Target: <strong className="text-slate-700 dark:text-slate-200">{app.targetUsers}</strong></span>
                </div>
              </div>

              {/* SHA-256 Checksum Box */}
              <div className="p-3.5 rounded-2xl bg-slate-200/60 dark:bg-white/[0.03] border border-slate-300/80 dark:border-white/10 flex items-center justify-between gap-3 text-xs font-mono max-w-xl">
                <div className="truncate text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase mr-1">SHA-256:</span>
                  <span>{app.sha256}</span>
                </div>
                <button
                  onClick={copyHash}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-sky-500 text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-colors"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive App Snapshot Card */}
            <div className="lg:col-span-5">
              <LiquidGlassCard
                glowColor="rgba(56, 189, 248, 0.22)"
                className="p-7 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <AppIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-slate-900 dark:text-white text-base">
                        {app.fileName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Authenticated Canonical Release</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Quick specs */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Current Version:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{app.version}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Direct Download:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">1-Click Local Stream</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Cloud Backup Mirror:</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400">Google Drive BYOC</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Security Integrity:</span>
                    <span className="text-slate-800 dark:text-slate-200">Zero Spyware / Clean Signed</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500 dark:text-slate-400">Offline Resilience:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Fully Functional</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-400/25 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Campus Sovereignty Guarantee</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    This software connects directly to your campus server with zero third-party data tracking. Student privacy is protected under DPDP Act 2023.
                  </p>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Capabilities */}
      <section className="py-20 bg-slate-100/70 dark:bg-[#0b121e]/70 relative border-y border-slate-200 dark:border-white/5">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Architectural Capabilities & Features
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Built from first principles for institutional reliability, speed, and ease of daily use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {app.capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <LiquidGlassCard
                  glowColor="rgba(56, 189, 248, 0.16)"
                  className="p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between hover:border-sky-400/40 transition-all duration-300"
                >
                  <div className="space-y-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/25 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {cap.description}
                    </p>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements & Specifications */}
      <section className="py-20 relative">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* System Requirements Table */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider font-mono">
                  Hardware & OS Specification
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                  System Requirements
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden bg-white/60 dark:bg-slate-900/60 divide-y divide-slate-200 dark:divide-white/5 text-xs sm:text-sm">
                <div className="flex p-4 justify-between">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Operating System</span>
                  <span className="font-medium text-slate-900 dark:text-white text-right">{app.requirements.os}</span>
                </div>
                <div className="flex p-4 justify-between">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Processor</span>
                  <span className="font-medium text-slate-900 dark:text-white text-right">{app.requirements.processor}</span>
                </div>
                <div className="flex p-4 justify-between">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Memory (RAM)</span>
                  <span className="font-medium text-slate-900 dark:text-white text-right">{app.requirements.ram}</span>
                </div>
                <div className="flex p-4 justify-between">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Storage</span>
                  <span className="font-medium text-slate-900 dark:text-white text-right">{app.requirements.storage}</span>
                </div>
                {app.requirements.runtime && (
                  <div className="flex p-4 justify-between">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Runtime / Engine</span>
                    <span className="font-medium text-slate-900 dark:text-white text-right">{app.requirements.runtime}</span>
                  </div>
                )}
                {app.requirements.network && (
                  <div className="flex p-4 justify-between">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Network</span>
                    <span className="font-medium text-slate-900 dark:text-white text-right max-w-xs">{app.requirements.network}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Release Notes / Changelog */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider font-mono">
                  Release History & Integrity
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                  Version Changelog
                </h3>
              </div>

              <div className="space-y-4">
                {app.changelog.map((log) => (
                  <div
                    key={log.version}
                    className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-400/30">
                          {log.version}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{log.date}</span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">STABLE</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {log.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link Other Vidhyam Applications */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#0b121e]/60 border-t border-slate-200 dark:border-white/5">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider font-mono">
                Complete Campus Ecosystem
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Other School OS Applications
              </h3>
            </div>
            <Link
              href="/school/download"
              className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>View All 4 Applications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherApps.map((other) => {
              const OtherIcon = APP_ICONS[other.id] || Monitor;
              return (
                <Link
                  key={other.id}
                  href={`/school/apps/${other.id}`}
                  className="group"
                >
                  <LiquidGlassCard
                    glowColor="rgba(56, 189, 248, 0.18)"
                    className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between group-hover:border-sky-400/50 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                          <OtherIcon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-200/70 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                          {other.version}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {other.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {other.tagline}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                      <span>Explore & Download</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </LiquidGlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
