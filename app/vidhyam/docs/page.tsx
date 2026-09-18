"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Laptop,
  Network,
  Users,
  Calendar,
  Printer,
  ScanFace,
  FileCheck2,
  HardDrive,
  Search,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Terminal,
  ShieldCheck,
  ArrowRight,
  Check
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

const DOC_TOPICS = [
  {
    id: "install",
    title: "Windows Installation & Setup",
    icon: Laptop,
    category: "Getting Started",
    desc: "Deploy Vidhyam Desktop OS on Windows 10/11 64-bit systems with zero external runtime dependencies.",
    content: {
      overview: "Vidhyam installs as a standalone, native 64-bit Windows application packaging the Rust core engine and local database engine.",
      steps: [
        "Run `Vidhyam-Setup-v2.4.0-x64.exe` as Administrator.",
        "Select the installation directory (Default: `C:\\Program Files\\Vidhyam OS\\`).",
        "Choose your database directory. For schools with dedicated backup drives, point to `D:\\VidhyamData\\`.",
        "Launch Vidhyam and enter your School Tenant Code (e.g. `SCH-4821`) to download board schemes and licensing keys.",
      ],
      tip: "Vidhyam bundles its own isolated embedded database. You do NOT need to install Node.js, Python, or external database software.",
    },
  },
  {
    id: "lan",
    title: "Multi-PC Campus LAN Sync",
    icon: Network,
    category: "Architecture",
    desc: "Connect fee counters, reception, and principal desks across campus local Wi-Fi/Ethernet with atomic lease locking.",
    content: {
      overview: "Vidhyam utilizes a Master-Worker peer architecture designed for zero cloud latency and offline resilience.",
      steps: [
        "Designate the primary administration computer as 'Master Server Node' in Settings -> Campus Network.",
        "Note the local IP address displayed (e.g. `192.168.1.150:7070`).",
        "On other campus computers (Fee Counter, Reception, Staff Room), select 'Staff Client Station' and input the Master IP.",
        "Data operations synchronize with 60-second atomic lease locks, preventing double fee collection or admission collision.",
      ],
      tip: "Even if broadband internet goes down, campus staff can continue issuing fee receipts and taking attendance uninterrupted over local Wi-Fi.",
    },
  },
  {
    id: "students",
    title: "Student Admissions & KYC",
    icon: Users,
    category: "Administration",
    desc: "Manage CBSE/ICSE admissions, UDISE+ student PEN numbers, caste categories, and document uploads.",
    content: {
      overview: "Complete student life-cycle management from entrance enquiry to class promotion and alumni tracking.",
      steps: [
        "Navigate to Students -> New Admission.",
        "Input Student Master Data: Name, Gender, DOB, Aadhaar/Birth Certificate details, and Blood Group.",
        "Assign Class & Section (e.g., Class 10-A) and roll number.",
        "Attach parent WhatsApp contact numbers for automated notifications.",
      ],
      tip: "Bulk student import via Excel (.xlsx) is supported with instant data validation for UDISE+ field standards.",
    },
  },
  {
    id: "timetable",
    title: "Autonomous AI Timetable Engine",
    icon: Calendar,
    category: "Academics",
    desc: "Generate clash-free weekly schedules respecting teacher workload limits, science labs, and sports periods.",
    content: {
      overview: "Mathematical constraint-satisfaction solver eliminating manual timetable scheduling conflicts.",
      steps: [
        "Go to Timetable -> Constraints Config.",
        "Define teacher maximum consecutive lectures (e.g., max 3 lectures per day per teacher).",
        "Tag shared infrastructure: Physics Lab, Chemistry Lab, Computer Lab, Sports Ground.",
        "Click 'Synthesize Timetable'. The engine solves 40+ constraints in under 2.4 seconds.",
      ],
      tip: "When a teacher is on leave, use 'Instant Smart Substitute' to automatically assign available free subject teachers.",
    },
  },
  {
    id: "fees",
    title: "Fees & Thermal Printing (ESC/POS)",
    icon: Printer,
    category: "Financials",
    desc: "Configure fee heads, discounts, installment cycles, and print raw 80mm/58mm thermal receipts in 0.05s.",
    content: {
      overview: "Instant counter fee receipts with QR codes for online verification and double-entry ledger bookkeeping.",
      steps: [
        "Connect your USB or LAN Thermal Printer (TVS, Epson, Citizen, Posiflex).",
        "Navigate to Settings -> Hardware -> Thermal Receipt Printer.",
        "Select Paper Width: 80mm (Standard 48 characters) or 58mm (Compact 32 characters).",
        "Perform a Test Print to verify direct ESC/POS byte streaming.",
      ],
      tip: "Thermal printing bypasses the Windows print spooler dialog for instant one-click paper feed and auto-cutter triggering.",
    },
  },
  {
    id: "attendance",
    title: "Biometric & Edge Face AI Attendance",
    icon: ScanFace,
    category: "Automation",
    desc: "Connect USB fingerprint scanners and IP CCTV RTSP streams for high-speed student and staff ingress logging.",
    content: {
      overview: "Face recognition and biometric thumb scanning with edge vector hashing under 0.38 seconds.",
      steps: [
        "For Biometrics: Plug in Mantra MFS100 or Morpho MSO 1300 scanner. Install standard OEM driver.",
        "For Turnstiles: Add RTSP URL (e.g. `rtsp://admin:pass@192.168.1.200:554/ch1`) in Settings -> Face AI Gate.",
        "Calibrate camera field-of-view for optimal ambient lighting and walking distance.",
        "Arrival logs instantly trigger WhatsApp alerts to parents upon campus entry.",
      ],
      tip: "Biometric face embeddings are mathematically hashed 512-dimension vectors; raw photographs are never stored unencrypted.",
    },
  },
  {
    id: "exams",
    title: "CBSE & ICSE CCE Report Cards",
    icon: FileCheck2,
    category: "Academics",
    desc: "Scholastic and co-scholastic mark entry, automated 8-point grading, and one-click bulk PDF printing.",
    content: {
      overview: "100% compliant with standard CBSE Continuous and Comprehensive Evaluation (CCE) formats.",
      steps: [
        "Navigate to Examinations -> Assessment Scheme.",
        "Select Scheme: CBSE 2-Term (PA1, Mid-Term, PA2, Annual) or ICSE Semester format.",
        "Teachers enter marks via the Staff Portal or bulk Excel upload.",
        "Click 'Batch Generate Report Cards' to create digitally signed, print-ready PDF marksheets for the entire school.",
      ],
      tip: "Includes automated calculation of attendance percentage, teacher remarks, and grade point averages (GPA).",
    },
  },
  {
    id: "backups",
    title: "Encrypted Backups & Disaster Recovery",
    icon: HardDrive,
    category: "Security",
    desc: "Automated daily local snapshots, secondary USB mirror syncing, and encrypted cloud archive options.",
    content: {
      overview: "Bulletproof data preservation ensuring your school records survive hardware failure or OS crashes.",
      steps: [
        "Go to Settings -> Backup & Disaster Recovery.",
        "Enable 'Automated Daily Snapshot at 5:00 PM'.",
        "Plug in an external school backup USB drive and configure it as the secondary mirror target.",
        "In case of PC crash: Install Vidhyam on a new PC and choose 'Restore from Backup Snapshot'.",
      ],
      tip: "All backup archives are AES-256 encrypted with your institution's private encryption key.",
    },
  },
];

export default function VidhyamDocsPage() {
  const [selectedTopic, setSelectedTopic] = useState(DOC_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = DOC_TOPICS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Header & Search */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vidhyam Desktop Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Desktop OS Tutorials & Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Comprehensive step-by-step guides for installing, configuring, and operating Vidhyam across campus hardware.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pt-1 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. thermal printer, LAN setup, CBSE)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm"
          />
        </div>
      </div>

      {/* 2. Interactive Split Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Topic Navigation Index */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 pb-1">
            Tutorial Modules ({filteredTopics.length})
          </div>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-600 dark:text-cyan-300 shadow-sm"
                      : "bg-white/40 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.06] text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        {topic.category}
                      </span>
                    </div>
                    <div className="text-xs font-semibold truncate text-slate-900 dark:text-white">
                      {topic.title}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {topic.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 px-2">
            <Link href="/vidhyam/download">
              <GlassButton variant="secondary" size="sm" className="w-full justify-center" icon={<Laptop className="w-3.5 h-3.5" />}>
                Download Windows Installer
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Right Column: Detailed Tutorial Content */}
        <div className="lg:col-span-8">
          <LiquidGlassCard className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-white/10 pb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <span>Category: {selectedTopic.category}</span>
                <span>•</span>
                <span>Module ID: #{selectedTopic.id}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                {selectedTopic.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {selectedTopic.content.overview}
              </p>
            </div>

            {/* Step by step guide */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">
                Operational Procedure
              </h3>
              <div className="space-y-3">
                {selectedTopic.content.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architect Advice / Best Practice */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1 text-xs">
              <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modernisum Architect Recommendation</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {selectedTopic.content.tip}
              </p>
            </div>

            {/* Support Bridge */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Encountering an atypical hardware error or custom turnstile requirement?
              </span>
              <Link href="/vidhyam/support">
                <GlassButton variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Open Campus Support Ticket
                </GlassButton>
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
