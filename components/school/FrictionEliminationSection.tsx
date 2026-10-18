"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";
import {
  CreditCard,
  ScanFace,
  FileSpreadsheet,
  Calendar,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";

interface FrictionItem {
  id: string;
  number: string;
  categoryEn: string;
  categoryHi: string;
  painTitleEn: string;
  painTitleHi: string;
  painDescriptionEn: string;
  painDescriptionHi: string;
  solutionTitleEn: string;
  solutionTitleHi: string;
  solutionDescriptionEn: string;
  solutionDescriptionHi: string;
  metricEn: string;
  metricHi: string;
  metricLabelEn: string;
  metricLabelHi: string;
  screenshotUrl: string;
  screenshotAlt: string;
  hardwareToolEn: string;
  hardwareToolHi: string;
  icon: React.ElementType;
  accentGlow: string;
  accentBorder: string;
  accentText: string;
}

const FRICTIONS: FrictionItem[] = [
  {
    id: "fee-leakage",
    number: "01",
    categoryEn: "Financial Operations",
    categoryHi: "वित्तीय संचालन",
    painTitleEn: "Uncollected Fee Leakage & Bank Reconciliation Chaos",
    painTitleHi: "किश्तों का छूटना, फीस लीकेज और मैन्युअल बैंक मिलान में गलतियां",
    painDescriptionEn:
      "Fragmented fee concessions, untracked installment dates, and manual paper receipts lead to ₹3L - ₹10L annual uncollected dues and exhausting bank statement mismatches.",
    painDescriptionHi:
      "मैन्युअल बहीखातों में किश्तों और छूट का सही हिसाब न होने से हर साल लाखों की फीस अटक जाती है। बैंक स्टेटमेंट से एक-एक पर्ची मिलाने में स्टाफ के सैकड़ों घंटे बर्बाद होते हैं।",
    solutionTitleEn: "Dual Thermal POS + Automated WhatsApp Recovery",
    solutionTitleHi: "80mm POS थर्मल प्रिंटर + ऑटोमेटेड व्हाट्सएप फीस रिकवरी",
    solutionDescriptionEn:
      "Modernisum School deploys dual-slip 80mm thermal printers with 1-click ledger reconciliation. WhatsApp automated reminders dispatch digitally signed receipts straight to parent phones.",
    solutionDescriptionHi:
      "80mm थर्मल प्रिंटर से सेकंडों में दोहरी रसीद (स्कूल + पैरेंट) निकलती है। पैरेंट्स को समय पर सौम्य व्हाट्सएप रिमाइंडर और सीधे बैंक खाते में 100% पारदर्शी डिजिटल समाधान मिलता है।",
    metricEn: "99.8%",
    metricHi: "99.8%",
    metricLabelEn: "On-Time Fee Recovery Rate",
    metricLabelHi: "समय पर फीस वसूली दर",
    screenshotUrl: "/images/vidhyam/fee_ledger_dark.png",
    screenshotAlt: "Modernisum School Dual-Rate Fee Ledger & Space Micro P&L",
    hardwareToolEn: "80mm Dual Thermal POS + Local Bank Gateway",
    hardwareToolHi: "80mm ड्यूल थर्मल POS प्रिंटर + लोकल बैंक गेटवे",
    icon: CreditCard,
    accentGlow: "rgba(16, 185, 129, 0.25)",
    accentBorder: "border-emerald-500/30",
    accentText: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "proxy-attendance",
    number: "02",
    categoryEn: "Campus Security & Attendance",
    categoryHi: "परिसर सुरक्षा एवं हाजिरी",
    painTitleEn: "Morning Gate Congestion & 25-Min Roll Call Fatigue",
    painTitleHi: "गेट पर भारी भीड़, 25 मिनट का मैन्युअल रोल-कॉल और फर्जी हाजिरी",
    painDescriptionEn:
      "Physical gate bottlenecks cause delayed assemblies. Teachers waste 25 minutes of instructional time marking registers, while proxy attendance and hallway wanderers slip through unnoticed.",
    painDescriptionHi:
      "सुबह गेट पर लाइन लगने से असेंबली लेट होती है। शिक्षक हर क्लास में 25 मिनट हाजिरी लगाने में गंवाते हैं। प्रॉक्सी अटेंडेंस और गेट से अंदर आकर क्लास से गायब होने वाले बच्चों का पता नहीं चलता।",
    solutionTitleEn: "Sub-150ms Face AI Turnstiles + Wanderer Radar",
    solutionTitleHi: "0.38s फेस AI टर्नस्टाइल गेट + वांडरर अलर्ट राडार",
    solutionDescriptionEn:
      "High-throughput optical face AI turnstiles verify students in 0.38 seconds, automatically sending instant WhatsApp entry notices to parents and flagging Gate-to-Classroom wanderers.",
    solutionDescriptionHi:
      "0.38 सेकंड में बिना लाइन लगे सुरक्षित गेट एंट्री होती है। छात्र के कदम रखते ही अभिभावक को व्हाट्सएप पर सुरक्षित आगमन का संदेश जाता है और क्लास न पहुंचने पर तुरंत अलर्ट मिलता है।",
    metricEn: "<0.38s",
    metricHi: "<0.38s",
    metricLabelEn: "Gate Verification Latency",
    metricLabelHi: "गेट फेस AI पहचान स्पीड",
    screenshotUrl: "/images/vidhyam/ops_gate_screen.png",
    screenshotAlt: "Modernisum School Sub-150ms Face AI Gate Console",
    hardwareToolEn: "Face AI Gate Turnstiles + UHF Long-Range RFID",
    hardwareToolHi: "फेस AI बैरियर टर्नस्टाइल्स + लॉन्ग-रेंज RFID",
    icon: ScanFace,
    accentGlow: "rgba(6, 182, 212, 0.25)",
    accentBorder: "border-cyan-500/30",
    accentText: "text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "govt-portal-drudgery",
    number: "03",
    categoryEn: "Government Compliance",
    categoryHi: "सरकारी अनुपालन एवं फॉर्म्स",
    painTitleEn: "Weeks of Manual Re-Typing into U-DISE+, CBSE & RTE Portals",
    painTitleHi: "U-DISE+, CBSE LOC और सरकारी पोर्टल्स पर हफ्तों की टाइपिंग",
    painDescriptionEn:
      "School clerks endure 3-4 weeks of clerical burnout re-typing thousands of student demographics into sluggish government portals, incurring high human typo rates and compliance stress.",
    painDescriptionHi:
      "हर साल स्कूल क्लर्क को U-DISE+, CBSE LOC, RTE और स्कॉलरशिप पोर्टल्स पर हजारों छात्रों का डाटा एक-एक करके भरना पड़ता है। सर्वर डाउन होने और टाइपो एरर से भारी सिरदर्दी होती है।",
    solutionTitleEn: "Clerk Co-Pilot Browser Extension (Manifest V3)",
    solutionTitleHi: "क्लर्क को-पायलट ब्राउज़र एक्सटेंशन (85% ऑटो-फिल)",
    solutionDescriptionEn:
      "The dedicated Modernisum Clerk extension auto-populates 85% of government portal forms directly from your air-gapped local database with a single keystroke, eliminating manual re-typing.",
    solutionDescriptionHi:
      "हमारा क्लर्क एक्सटेंशन सरकारी वेबसाइट पर स्क्रीन के पास ही एक्टिव होकर स्थानीय डेटाबेस से 85% फॉर्म्स स्वतः भर देता है। किसी भी बाहरी डाटा लीक के बिना मिनटों में काम पूरा होता है।",
    metricEn: "-85%",
    metricHi: "-85%",
    metricLabelEn: "Clerical Portal Entry Hours",
    metricLabelHi: "सरकारी फॉर्म भरने के घंटों में बचत",
    screenshotUrl: "/images/vidhyam/extension_dark.png",
    screenshotAlt: "Modernisum School Clerk Co-Pilot Extension",
    hardwareToolEn: "In-Browser MV3 Auto-Fill Co-Pilot Engine",
    hardwareToolHi: "इन-ब्राउज़र MV3 ऑटो-फिल को-पायलट इंजन",
    icon: FileSpreadsheet,
    accentGlow: "rgba(245, 158, 11, 0.25)",
    accentBorder: "border-amber-500/30",
    accentText: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "teacher-absence",
    number: "04",
    categoryEn: "Academic Scheduling",
    categoryHi: "एकेडमिक टाइमटेबल व प्रॉक्सी",
    painTitleEn: "Morning Substitute Panic & Roster Clashing Chaos",
    painTitleHi: "सुबह शिक्षक का अचानक न आना और टाइमटेबल में अफरा-तफरी",
    painDescriptionEn:
      "Sudden 7:30 AM teacher sick calls trigger frantic morning chaos in the principal's office. Hand-assigned substitutes cause room clashes, subject mismatches, and unruly empty classrooms.",
    painDescriptionHi:
      "सुबह अचानक किसी शिक्षक के बीमार होने पर कौन सी क्लास में किसे भेजना है, इस पर अफरा-तफरी मच जाती है। मैन्युअल एडजस्टमेंट से खाली पीरियड रह जाते हैं और बच्चों की पढ़ाई बाधित होती है।",
    solutionTitleEn: "5-Factor Conflict-Free Proxy Solver in <3 Seconds",
    solutionTitleHi: "5-फैक्टर टाइमटेबल सॉल्वर: 3 सेकंड में संतुलित प्रॉक्सी",
    solutionDescriptionEn:
      "The autonomous scheduling engine computes competency match, teacher workload limits, and room availability to allocate proxy teachers seamlessly in under 3 seconds with zero room clashes.",
    solutionDescriptionHi:
      "सिस्टम 3 सेकंड में शिक्षक की योग्यता, विषय और वर्कलोड का विश्लेषण करके तुरंत सबसे उपयुक्त शिक्षक को प्रॉक्सी क्लास असाइन कर देता है। स्कूल में एक भी क्लास खाली नहीं रहती।",
    metricEn: "<3s",
    metricHi: "<3s",
    metricLabelEn: "Substitute Allocation Speed",
    metricLabelHi: "ऑटो प्रॉक्सी आवंटन समय",
    screenshotUrl: "/images/vidhyam/timetable_dark.png",
    screenshotAlt: "Modernisum School Smart Timetable & Substitution Engine",
    hardwareToolEn: "LAN Distributed Real-Time Roster Matrix",
    hardwareToolHi: "लोकल नेटवर्क रीयल-टाइम रोस्टर मैट्रिक्स",
    icon: Calendar,
    accentGlow: "rgba(99, 102, 241, 0.25)",
    accentBorder: "border-indigo-500/30",
    accentText: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "internet-outage",
    number: "05",
    categoryEn: "Infrastructure & Data Sovereignty",
    categoryHi: "डेटा संप्रभुता व ऑफलाइन बैकअप",
    painTitleEn: "Internet Outages Halt Counters; Central Cloud Data Leak Risks",
    painTitleHi: "इंटरनेट जाते ही सॉफ्टवेयर ठप पड़ना और छात्र डेटा लीक का खतरा",
    painDescriptionEn:
      "Cloud ERPs crash the instant campus broadband cuts out, stalling fee counters and gate locks. Storing private student biometrics on multi-tenant servers exposes schools to severe privacy liabilities.",
    painDescriptionHi:
      "इंटरनेट या वाई-फाई बंद होते ही वेब आधारित सॉफ्टवेयर बंद हो जाते हैं, जिससे फीस काउंटर पर अभिभावक परेशान होते हैं। बच्चों का बायोमेट्रिक डाटा थर्ड-पार्टी क्लाउड पर रखने से भारी रिस्क रहता है।",
    solutionTitleEn: "100% Local-First Desktop OS with P2P Raft LAN Sync",
    solutionTitleHi: "100% ऑफलाइन लोकल-फर्स्ट डेस्कटॉप OS (Raft LAN सिंक)",
    solutionDescriptionEn:
      "Modernisum School runs natively on local desktop hardware. Fee desks, gates, and terminals synchronize across campus LAN without needing internet. Data remains 100% private under school custody.",
    solutionDescriptionHi:
      "हमारा सॉफ्टवेयर 100% ऑफलाइन डेस्कटॉप पर चलता है। इंटरनेट बंद होने पर भी फीस, एडमिशन और गेट सामान्य रूप से चलते रहते हैं। आपके छात्रों का संवेदनशील डेटा सिर्फ आपके स्कूल में सुरक्षित रहता है।",
    metricEn: "0ms",
    metricHi: "0ms",
    metricLabelEn: "Offline Local Execution Latency",
    metricLabelHi: "ऑफलाइन स्थानीय निष्पादन लेटेंसी",
    screenshotUrl: "/images/vidhyam/settings_dark.png",
    screenshotAlt: "Modernisum School Enterprise Audit Ledger & Air-Gapped Settings",
    hardwareToolEn: "Air-Gapped Multi-PC Campus Server Architecture",
    hardwareToolHi: "एयर-गैप्ड मल्टी-PC लोकल सर्वर नेटवर्क",
    icon: WifiOff,
    accentGlow: "rgba(168, 85, 247, 0.25)",
    accentBorder: "border-purple-500/30",
    accentText: "text-purple-600 dark:text-purple-400",
  },
];

export function FrictionEliminationSection() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [selectedId, setSelectedId] = useState<string>("fee-leakage");
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);

  const activeItem = FRICTIONS.find((f) => f.id === selectedId) || FRICTIONS[0];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-900/[0.03] dark:bg-black/60 border-y border-slate-200/80 dark:border-white/10" id="friction-matrix">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            <span>{isHi ? "80% मैनेजमेंट वर्कलोड का स्थायी समाधान" : "Frictionless Automation Blueprint"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            {isHi ? (
              <>
                स्कूल की 5 बड़ी समस्याएं (Frictions) और उनका{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  100% ऑटोमेटेड समाधान
                </span>
              </>
            ) : (
              <>
                Eliminating 80% Workload:{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  5 Campus Frictions Solved
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            {isHi
              ? "Modernisum School केवल सॉफ्टवेयर नहीं, बल्कि गैजेट्स, टूल्स और ऑटोमेशन का पूर्ण इकोसिस्टम है जो स्कूल के दैनिक कागजी काम, मानवीय गलतियों और वित्तीय लीकेज को हमेशा के लिए समाप्त करता है।"
              : "Modernisum School is an integrated hardware and software operating system engineered to eliminate manual calculation errors, clerical burnout, and operational leakages."}
          </p>
        </div>

        {/* Master Selector Pills (Clean tabs on mobile, horizontal matrix on desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none sm:justify-center">
          {FRICTIONS.map((item) => {
            const isSelected = item.id === selectedId;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-medium shrink-0 transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg"
                    : "bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/10 hover:border-cyan-400/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-white/10 text-slate-500"
                }`}>
                  {item.number}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{isHi ? item.categoryHi : item.categoryEn}</span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE ITEM SHOWCASE: 2-COLUMN DEEP-DIVE COMPARISON */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* LEFT COLUMN: The Problem vs The Solution Spec */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Card 1: Traditional School Pain (Friction) */}
              <div className="p-6 rounded-3xl bg-rose-500/[0.04] dark:bg-rose-500/[0.08] border border-rose-500/20 relative overflow-hidden">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{isHi ? "पारंपरिक स्कूल की समस्या (Friction)" : "The Traditional Campus Friction"}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {isHi ? activeItem.painTitleHi : activeItem.painTitleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-light">
                  {isHi ? activeItem.painDescriptionHi : activeItem.painDescriptionEn}
                </p>
              </div>

              {/* Card 2: Modernisum School Engineered Solution */}
              <LiquidGlassCard
                glowColor={activeItem.accentGlow}
                className={`p-6 sm:p-7 rounded-3xl border ${activeItem.accentBorder} flex-1 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider ${activeItem.accentText}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isHi ? "मॉडर्निज़म ऑटोमेटेड समाधान" : "Modernisum Engineered Solution"}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                      80% Workload Gone
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {isHi ? activeItem.solutionTitleHi : activeItem.solutionTitleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3 font-light">
                    {isHi ? activeItem.solutionDescriptionHi : activeItem.solutionDescriptionEn}
                  </p>
                </div>

                {/* Metric and Hardware Badge */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                      {isHi ? activeItem.metricHi : activeItem.metricEn}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {isHi ? activeItem.metricLabelHi : activeItem.metricLabelEn}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {isHi ? "शामिल गैजेट / टूल" : "Included Gadget / Tool"}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {isHi ? activeItem.hardwareToolHi : activeItem.hardwareToolEn}
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>

            {/* RIGHT COLUMN: Real Administrative UI Screenshot in Glass Frame */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <LiquidGlassCard
                glowColor={activeItem.accentGlow}
                className="rounded-3xl border border-slate-200/80 dark:border-white/15 overflow-hidden shadow-2xl p-0 flex flex-col group cursor-zoom-in"
                onClick={() => setPreviewModalOpen(true)}
              >
                {/* Titlebar Chrome */}
                <div className="bg-slate-200/80 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-5 py-3 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                      Modernisum School — {isHi ? activeItem.categoryHi : activeItem.categoryEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      LIVE SYSTEM
                    </span>
                    <button
                      title="Enlarge View"
                      className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Screenshot Viewport */}
                <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={activeItem.screenshotUrl}
                    alt={activeItem.screenshotAlt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 750px"
                    priority
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Hover hint pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3 text-cyan-400" />
                    <span>{isHi ? "बड़ा करके देखें" : "Click to inspect screen"}</span>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM METRICS BANNER: 80% Workload Reduction Affirmation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10 border border-cyan-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isHi
                ? "स्कूल के 80% गैर-शैक्षणिक बोझ को हमेशा के लिए समाप्त करें"
                : "Eliminate 80% of Non-Instructional Administrative Drag"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light">
              {isHi
                ? "हमारी इंजीनियरिंग टीम आपके स्कूल परिसर में हार्डवेयर गैजेट्स इंस्टॉल करती है और स्थानीय सर्वर सेटअप पूरा करती है।"
                : "Our field engineering team installs barrier hardware gadgets and deploys native local desktop servers directly on campus."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919368671007"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>{isHi ? "प्रिंसिपल कंसल्टेशन बुक करें" : "Book Principal Pilot"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {previewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl"
            >
              {/* Modal Titlebar */}
              <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                    {isHi ? activeItem.solutionTitleHi : activeItem.solutionTitleEn}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isHi ? activeItem.categoryHi : activeItem.categoryEn} — {isHi ? activeItem.hardwareToolHi : activeItem.hardwareToolEn}
                  </div>
                </div>

                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="relative flex-1 min-h-[500px] w-full bg-slate-950 p-2 overflow-auto">
                <div className="relative w-full h-[65vh]">
                  <Image
                    src={activeItem.screenshotUrl}
                    alt={activeItem.screenshotAlt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
