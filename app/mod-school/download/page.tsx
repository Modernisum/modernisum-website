"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  ShieldCheck,
  Cpu,
  HardDrive,
  Printer,
  ScanFace,
  Server,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Laptop,
  ArrowRight,
  Monitor,
  Users,
  Smartphone,
  Puzzle,
  FileCode2,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { SCHOOL_APPS, SchoolAppConfig } from "@/lib/school-downloads";

const APP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  desktop: Monitor,
  employee: Users,
  student: Smartphone,
  extension: Puzzle,
};

const PERIPHERALS = [
  {
    icon: Printer,
    title: "Thermal Receipt Printers",
    desc: "Direct USB and Network ESC/POS protocol support. Instant raw byte streaming for 80mm and 58mm roll paper with automatic cutter triggers.",
    models: "TVS RP-3200, Epson TM-T82, Posiflex, Citizen",
  },
  {
    icon: ScanFace,
    title: "Biometric Scanners & Turnstiles",
    desc: "Plug-and-play USB fingerprint ingestion and native RFID/Wiegand controller integration for contactless gate attendance.",
    models: "Mantra MFS100, Morpho MSO 1300 E3, Hikvision RTSP",
  },
  {
    icon: Server,
    title: "Multi-PC LAN Collaboration",
    desc: "Real-time anti-collision CRDT synchronization. Multiple fee counters and admission desks collaborate simultaneously without internet dependency.",
    models: "Zero dedicated cloud server requirement",
  },
];

export default function SchoolDownloadPage() {
  const [downloadingApp, setDownloadingApp] = useState<string | null>(null);
  const [copiedAppHash, setCopiedAppHash] = useState<string | null>(null);
  const [apps, setApps] = useState<SchoolAppConfig[]>(() => Object.values(SCHOOL_APPS));

  // Dynamic Zero-Code-Deploy Releases Sync
  useEffect(() => {
    async function syncDynamicReleases() {
      try {
        const res = await fetch("/api/admin/releases");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const releases: any[] = json.data;
          setApps((prevApps) =>
            prevApps.map((app) => {
              const matched = releases.find((r) => {
                if (app.id === "desktop") return r.appTarget === "school-admin";
                if (app.id === "employee") return r.appTarget === "employee-app";
                if (app.id === "student") return r.appTarget === "student-app";
                if (app.id === "extension") return r.appTarget === "clerk-copilot";
                return false;
              });
              if (matched) {
                return {
                  ...app,
                  version: matched.version ? `v${matched.version.replace(/^v/i, '')}` : app.version,
                  fileSize: matched.fileSize || app.fileSize,
                  directDownloadUrl: matched.downloadUrl || app.directDownloadUrl,
                  sha256: matched.sha256 || app.sha256,
                  releaseDate: matched.releaseDate || app.releaseDate,
                };
              }
              return app;
            })
          );
        }
      } catch (e) {
        console.warn("Using baseline app downloads fallback:", e);
      }
    }
    syncDynamicReleases();
  }, []);

  const handleDownload = (app: SchoolAppConfig) => {
    setDownloadingApp(app.id);
    const link = document.createElement("a");
    link.href = app.directDownloadUrl;
    link.download = app.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadingApp(null), 2500);
  };

  const handleCopyHash = (appId: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedAppHash(appId);
    setTimeout(() => setCopiedAppHash(null), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 w-full max-w-[1760px] mx-auto space-y-20">
      {/* 1. Hero & Suite Overview */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-6 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-600 dark:text-sky-300 text-xs font-mono font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Unified Campus Software & Mobile Suite</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-[1.12]"
        >
          Download Modernisum School{" "}
          <span className="bg-gradient-to-r from-sky-600 via-blue-500 to-indigo-600 dark:from-sky-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
            Campus Applications
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto"
        >
          Four synchronized applications engineered for complete school autonomy. 100% offline-first local desktop administration, sub-second teacher roll calls, live student bus tracking, and 1-click government form auto-filling.
        </motion.p>
      </div>

      {/* 2. All 4 Applications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
        {apps.map((app, idx) => {
          const AppIcon = APP_ICONS[app.id] || Monitor;
          const isCurrentDownloading = downloadingApp === app.id;
          const isCopied = copiedAppHash === app.id;

          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col"
            >
              <LiquidGlassCard
                glowColor="rgba(56, 189, 248, 0.18)"
                className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 h-full flex flex-col justify-between hover:border-sky-400/50 transition-all duration-300 shadow-lg"
              >
                {/* Top Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <AppIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                        {app.version}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
                      {app.badge}
                    </span>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                      {app.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light line-clamp-3">
                    {app.tagline}
                  </p>

                  {/* Metadata Specs Strip */}
                  <div className="pt-2 pb-1 border-y border-slate-100 dark:border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Size / Format:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {app.fileSize} • {app.fileFormat}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Updated:</span>
                      <span className="text-slate-700 dark:text-slate-200">{app.releaseDate}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2.5 pt-5">
                  <button
                    onClick={() => handleDownload(app)}
                    disabled={isCurrentDownloading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Download className={`w-4 h-4 ${isCurrentDownloading ? "animate-bounce" : ""}`} />
                    <span>{isCurrentDownloading ? "Starting..." : "Direct 1-Click Download"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={app.driveMirrorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg text-[11px] font-semibold glass-pill text-slate-600 dark:text-slate-300 hover:text-white text-center flex items-center justify-center gap-1.5"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-sky-500" />
                      <span>Cloud Mirror</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <Link
                      href={`/apps/${app.id}`}
                      className="py-2 px-3 rounded-lg text-[11px] font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 flex items-center justify-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* SHA-256 mini copy */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                    <span className="truncate max-w-[160px]">SHA: {app.sha256.substring(0, 16)}...</span>
                    <button
                      onClick={() => handleCopyHash(app.id, app.sha256)}
                      className="hover:text-sky-500 flex items-center gap-1 cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Hardware & Peripherals Section */}
      <div className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Turnkey Plug-and-Play Compatibility
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
            Tested Campus Peripherals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Direct hardware communication without requiring bespoke third-party bridge software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERIPHERALS.map((p) => (
            <LiquidGlassCard
              key={p.title}
              className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <p.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {p.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {p.desc}
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5">
                Supported: <span className="text-slate-700 dark:text-slate-300">{p.models}</span>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>

      {/* 4. Executive Security Guarantee */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 border border-sky-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>DPDP ACT 2023 & DATA SOVEREIGNTY COMPLIANT</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            Looking for Institutional Cloud & Deployment Whitepaper?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-2xl">
            Read our complete security architecture register covering local offline sandboxing, zero-knowledge relays, and Bring Your Own Cloud (BYOC) institutional vaults.
          </p>
        </div>

        <Link
          href="/security"
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 hover:border-sky-400/50 shadow-md transition-all shrink-0 flex items-center gap-2"
        >
          <span>Security Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
