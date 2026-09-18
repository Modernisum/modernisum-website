import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
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
  ExternalLink,
  Laptop,
  ArrowRight,
  FileCode
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "Download Vidhyam Desktop OS for Windows — Autonomous School ERP",
  description:
    "Official Windows installer for Vidhyam Desktop OS. Native 64-bit performance with zero cloud latency, multi-PC LAN sync, raw thermal receipt printing, and biometric integration.",
};

const SYSTEM_REQUIREMENTS = [
  { item: "Operating System", min: "Windows 10 (64-bit, 1809+)", rec: "Windows 11 (64-bit)" },
  { item: "Processor", min: "Intel Core i3 / AMD Ryzen 3", rec: "Intel Core i5 / AMD Ryzen 5 or higher" },
  { item: "System Memory (RAM)", min: "4 GB RAM", rec: "8 GB RAM (for Master LAN Server)" },
  { item: "Disk Storage", min: "500 MB Free SSD Space", rec: "2 GB NVMe SSD for 10-year local audit logs" },
  { item: "Display Resolution", min: "1366 x 768", rec: "1920 x 1080 (Full HD recommended)" },
  { item: "Network", min: "Local Campus LAN (Wi-Fi / Ethernet)", rec: "Gigabit Ethernet for 50+ Staff PCs" },
];

const PERIPHERALS = [
  {
    icon: Printer,
    title: "Thermal Receipt Printers",
    desc: "Direct USB and Network ESC/POS protocol support. Instant raw byte streaming for 80mm and 58mm roll paper with automatic cutter triggers.",
    models: "TVS RP-3200, Epson TM-T82, Posiflex, Citizen",
  },
  {
    icon: ScanFace,
    title: "Biometric Scanners & IP Cameras",
    desc: "Plug-and-play USB fingerprint ingestion and native RTSP/ONVIF stream decoding for turnstile Edge Face AI attendance.",
    models: "Mantra MFS100, Morpho MSO 1300 E3, Hikvision RTSP",
  },
  {
    icon: Server,
    title: "Multi-PC LAN Lease Lock",
    desc: "Decentralized Master-Worker architecture. Multiple fee counters and admission desks collaborate simultaneously with 60-second atomic lease locks.",
    models: "Zero dedicated cloud server requirement",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Download & Launch Setup",
    desc: "Save Vidhyam-Setup-v2.4.0-x64.exe to your school's administration or master computer. Run the installer with administrative privileges.",
  },
  {
    step: "02",
    title: "Select Campus Operating Mode",
    desc: "Choose 'Master Server Node' for the primary database PC, or 'Staff Client Station' for fee counters, teachers, and reception terminals.",
  },
  {
    step: "03",
    title: "Enter School Tenant Code",
    desc: "Input your unique School Code (e.g., SCH-4821) issued upon web registration. Your academic board, fee heads, and branding load automatically.",
  },
];

export default function VidhyamDownloadPage() {
  const sha256Checksum = "e8f4c28a9b23f5b7d34190c42ba5e917d057a62df864817a7e80d4f1295b9c02";

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* 1. Hero & Main Download CTA */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Laptop className="w-3.5 h-3.5 text-cyan-500" />
          <span>Official Windows Desktop Application</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-[1.15]">
          Experience Campus Operations at{" "}
          <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
            Native Desktop Speed
          </span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          Vidhyam runs natively on your school's Windows hardware. 100% offline resilience during internet outages,
          instantaneous 0.05-second fee receipt generation, and seamless local LAN collaboration.
        </p>

        {/* Primary Download Card */}
        <div className="pt-2">
          <LiquidGlassCard className="p-6 sm:p-8 max-w-xl mx-auto text-left relative overflow-hidden border-cyan-500/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">
                    Vidhyam-Setup-v2.4.0-x64.exe
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    STABLE
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Windows 10 / 11 (64-bit) • File size: ~68.4 MB • Rust Engine v1.85
                </p>
              </div>

              {/* Direct Download Button */}
              <a
                href="/downloads/Vidhyam-Setup-v2.4.0-x64.exe"
                download="Vidhyam-Setup-v2.4.0-x64.exe"
                className="shrink-0"
              >
                <GlassButton variant="primary" size="md" icon={<Download className="w-4 h-4" />}>
                  Download for Windows
                </GlassButton>
              </a>
            </div>

            {/* SHA-256 Checksum Verification */}
            <div className="pt-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  SHA-256 Integrity Hash:
                </span>
                <span className="text-[10px] text-slate-400">Verified institutional binary</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
                <code className="text-[10px] font-mono text-cyan-600 dark:text-cyan-300 break-all select-all">
                  {sha256Checksum}
                </code>
              </div>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Not registered notification */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <span>New campus administrator?</span>
          <Link href="/vidhyam/register" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1">
            <span>Register school for instant School Code</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 2. 3-Step Installation & Setup Walkthrough */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3-Minute Onboarding</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            How to Install & Deploy on Campus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <LiquidGlassCard key={s.step} className="p-6 space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-cyan-600 dark:text-cyan-300">
                {s.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {s.desc}
              </p>
            </LiquidGlassCard>
          ))}
        </div>
      </div>

      {/* 3. Hardware & Peripheral Compatibility */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300 bg-purple-500/10 border border-purple-400/30">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Campus Hardware Ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Engineered for Real School Counters
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light">
            No proprietary hardware locks. Vidhyam integrates directly with standard peripherals used across Indian schools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERIPHERALS.map((p) => {
            const Icon = p.icon;
            return (
              <LiquidGlassCard key={p.title} className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {p.desc}
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                  Supported: {p.models}
                </div>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>

      {/* 4. System Requirements Specifications Table */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
            Recommended System Requirements
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Lightweight footprint. Vidhyam operates smoothly even on budget classroom laptops.
          </p>
        </div>

        <LiquidGlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Component</th>
                  <th className="py-3 px-4 sm:px-6">Minimum Specification</th>
                  <th className="py-3 px-4 sm:px-6">Recommended Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-white/[0.06] text-slate-700 dark:text-slate-300">
                {SYSTEM_REQUIREMENTS.map((req) => (
                  <tr key={req.item} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900 dark:text-white">
                      {req.item}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-slate-600 dark:text-slate-400 font-mono">
                      {req.min}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-cyan-600 dark:text-cyan-400 font-mono font-medium">
                      {req.rec}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LiquidGlassCard>
      </div>

      {/* 5. Bottom Helpdesk Bridge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 text-center space-y-4 max-w-3xl mx-auto">
        <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
          Need Assistance with School Campus Deployment?
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-light">
          Modernisum offers direct remote desktop deployment assistance. Our engineers connect via AnyDesk or TeamViewer to set up your master database and thermal printers in under 30 minutes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/vidhyam/support">
            <GlassButton variant="secondary" size="sm">
              Schedule Deployment Support
            </GlassButton>
          </Link>
          <Link href="/vidhyam/docs">
            <GlassButton variant="ghost" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              Read Offline Setup Guide
            </GlassButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
