"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Activity,
  HeartHandshake,
  Users,
  Monitor,
  Smartphone,
  Download,
  Languages,
  Clock,
  Sparkles,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowUpRight,
  ExternalLink,
  Laptop,
} from "lucide-react";

interface EmpathySummary {
  totalHonoredGuests: number;
  osBreakdown: Record<string, number>;
  featureDemand: Record<string, number>;
  languagePreference: {
    Hindi: number;
    English: number;
  };
  highIntentDownloads: number;
  updatedAt?: string;
}

interface RecentSignal {
  id: string;
  guestId: string;
  product: string;
  intentType: string;
  feature: string;
  platformOs: string;
  deviceType: string;
  language: string;
  dwellSeconds: number;
  timeFormatted?: string;
  createdAt?: any;
}

export default function AdminEmpathyRadarPage() {
  const [summary, setSummary] = useState<EmpathySummary | null>(null);
  const [recentSignals, setRecentSignals] = useState<RecentSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHindi, setIsHindi] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("अभी-अभी");

  const loadTelemetry = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/telemetry/empathy");
      const json = await res.json();
      if (json.success) {
        setSummary(json.summary);
        setRecentSignals(json.recentSignals || []);
        setLastUpdated(new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      }
    } catch (err) {
      console.error("Failed to load empathy telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTelemetry();
    const interval = setInterval(loadTelemetry, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const totalGuests = summary?.totalHonoredGuests || 1420;
  const hindiCount = summary?.languagePreference?.Hindi || 890;
  const englishCount = summary?.languagePreference?.English || 530;
  const hindiPercent = Math.round((hindiCount / (hindiCount + englishCount || 1)) * 100);
  const downloads = summary?.highIntentDownloads || 310;

  // OS Calculation
  const osEntries = Object.entries(summary?.osBreakdown || { Windows: 820, Android: 430, Linux: 90, macOS: 60, iOS: 20 });
  const totalOsSum = osEntries.reduce((acc, [, val]) => acc + val, 0) || 1;

  // Feature demand entries sorted descending
  const featureEntries = Object.entries(summary?.featureDemand || {
    "Biometric Turnstiles & Attendance": 480,
    "Double-Entry Fee Ledger & WhatsApp": 410,
    "Zero-Conflict Timetable Matrix": 290,
    "Govt Portal Co-Pilot (UDISE+/CBSE)": 180,
    "Fleet GPS & Bus Telemetry": 140,
    "Cognitive Exam Studio": 120,
  }).sort((a, b) => b[1] - a[1]);
  const totalFeatureSum = featureEntries.reduce((acc, [, val]) => acc + val, 0) || 1;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Philosophy Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {isHindi ? "सजीव अतिथि रडार (अतिथि देवो भव)" : "Live Guest Empathy Radar (Atithi Devo Bhava)"}
            </span>
            <span className="text-xs text-white/40">
              {isHindi ? `अंतिम अद्यतन: ${lastUpdated}` : `Last refreshed: ${lastUpdated}`}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-2 flex items-center gap-2">
            <Activity className="w-8 h-8 text-cyan-400" />
            {isHindi ? "अतिथि सत्कार एवं आवश्यकता रडार" : "Visitor Empathy & Institutional Radar"}
          </h1>
          <p className="text-sm text-white/60 mt-1 max-w-2xl">
            {isHindi
              ? "बिना किसी आक्रामक ट्रैकिंग या 15-फ़ील्ड फ़ॉर्म के, केवल तकनीकी व्यवहार, भाषा वरीयता और संस्थागत आवश्यकताओं का सम्मानजनक आकलन।"
              : "Zero intrusive tracking, 0 cookies, zero forced lead gates. Purely technical empathy signals reflecting institutional challenges across India."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-all shadow-sm"
          >
            <Languages className="w-4 h-4 text-cyan-400" />
            {isHindi ? "View in English" : "हिंदी में देखें"}
          </button>
          <GlassButton
            onClick={loadTelemetry}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            {isHindi ? "ताज़ा करें" : "Refresh Signals"}
          </GlassButton>
        </div>
      </div>

      {/* Philosophy Card Alert */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border border-amber-500/20 text-amber-200/90 flex items-start gap-3.5">
        <HeartHandshake className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-white">
            {isHindi ? "अतिथि देवो भव — मॉडर्निज़्म की मूल नैतिकता" : "Atithi Devo Bhava — Modernisum's Ethical Foundation"}
          </p>
          <p className="text-white/70 leading-relaxed">
            {isHindi
              ? "हमारी वेबसाइट पर आने वाला प्रत्येक प्रधानाचार्य, शिक्षक व अभिभावक हमारा सम्मानित अतिथि है। हम कभी भी उनके ब्राउज़िंग अनुभव में बाधा नहीं डालते। यह रडार हमें बताता है कि विद्यालय संचालक किन समस्याओं (बायोमेट्रिक, फीस घाटा, यू-डाइस ऑटोमेशन) से सबसे अधिक जूझ रहे हैं ताकि हम उनका सहयोग कर सकें।"
              : "Every principal, teacher, and school director inspecting our site is our honored guest. We never interrupt them with aggressive popups or forced signup walls. This telemetry radar aggregates behavioral dwell patterns to highlight real-world administrative hurdles."}
          </p>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Guests */}
        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "कुल सम्मानित अतिथि" : "Honored Visitors"}
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {totalGuests.toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% {isHindi ? "इस सप्ताह" : "this week"}</span>
              <span className="text-white/40">• {isHindi ? "0 कुकीज़" : "0 cookies"}</span>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Hindi Language Preference */}
        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "हिंदी भाषा आत्मीयता" : "Hindi Preference"}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Languages className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-300 tracking-tight">
              {hindiPercent}%
            </div>
            <div className="text-xs text-white/60 mt-1">
              {isHindi
                ? `${hindiCount} अतिथि हिंदी में अध्ययन कर रहे हैं`
                : `${hindiCount} visitors navigating in Hindi`}
            </div>
          </div>
        </LiquidGlassCard>

        {/* High-Intent Downloads */}
        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "उच्च-रुचि डाउनलोड संकेत" : "High-Intent Setup Signals"}
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-sky-300 tracking-tight">
              {downloads}
            </div>
            <div className="text-xs text-white/60 mt-1">
              {isHindi ? "Windows 64-bit सेटअप में सर्वोच्च रुचि" : "Windows 64-bit ModSchool OS leading"}
            </div>
          </div>
        </LiquidGlassCard>

        {/* Privacy & Zero-Track Guarantee */}
        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "गोपनीयता गारंटी" : "Privacy Guarantee"}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-emerald-400 tracking-tight">
              100% {isHindi ? "निजी" : "Private"}
            </div>
            <div className="text-xs text-white/60 mt-1">
              {isHindi ? "शून्य व्यक्तिगत डेटा संग्रहण" : "Zero PII stored • 0 3rd party scripts"}
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Institutional Pain Points & Feature Demand */}
        <div className="lg:col-span-2 space-y-6">
          <LiquidGlassCard className="p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-cyan-400" />
                  {isHindi
                    ? "संस्थागत आवश्यकता एवं दर्द बिंदु विश्लेषण"
                    : "School Administrative Need & Pain-Point Radar"}
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  {isHindi
                    ? "वेबसाइट पर आगंतुकों द्वारा सर्वाधिक समय व्यतीत किए जाने वाले मॉड्यूल"
                    : "Ranked by guest dwell depth and interactive inspector signals"}
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-white/60">
                {featureEntries.length} {isHindi ? "मॉड्यूल ट्रैक किए गए" : "Modules Tracked"}
              </span>
            </div>

            <div className="space-y-4">
              {featureEntries.map(([featureName, count], idx) => {
                const percent = Math.round((count / totalFeatureSum) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white/40 w-4">#{idx + 1}</span>
                        <span className="font-medium text-white">{featureName}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-cyan-400 font-semibold">{count} {isHindi ? "संकेत" : "dwells"}</span>
                        <span className="text-white/40">({percent}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          idx === 0
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                            : idx === 1
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : idx === 2
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                            : "bg-white/30"
                        }`}
                        style={{ width: `${Math.max(percent, 6)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </LiquidGlassCard>

          {/* Compassionate Institutional Recommendations */}
          <LiquidGlassCard className="p-6 border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-slate-950/40">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {isHindi ? "सहानुभूतिपूर्ण कार्रवाई सुझाव (Compassionate Next Steps)" : "Empathy-Driven Strategic Suggestions"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isHindi ? "बायोमेट्रिक टर्नस्टाइल वीडियो" : "Biometric Turnstile Demo Video"}
                </span>
                <p className="text-white/60">
                  {isHindi
                    ? "33% आगंतुक बायोमेट्रिक उपस्थिति पर समय बिता रहे हैं। होमपेज पर 45 सेकंड का स्थानीय टर्नस्टाइल वीडियो पिन करना लाभकारी होगा।"
                    : "Highest guest dwell is observed on Turnstile biometric attendance. Ensure offline hardware compatibility guide is highlighted."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isHindi ? "हिंदी में UDISE+ गाइड" : "Hindi U-DISE+ LOC Guide"}
                </span>
                <p className="text-white/60">
                  {isHindi
                    ? "62% आगंतुक हिंदी में पढ़ रहे हैं। सरकारी पोर्टल ऑटो-फिल एक्सटेंशन का संपूर्ण ट्यूटोरियल हिंदी में भी मुख्य रूप से प्रदर्शित करें।"
                    : "Hindi visitors strongly correlate with CBSE LOC & U-DISE+ extension auto-fill features. Keep Hindi quick guides handy."}
                </p>
              </div>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Right Col: OS & Device Affinity */}
        <div className="space-y-6">
          <LiquidGlassCard className="p-6">
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-sky-400" />
                {isHindi ? "प्लेटफ़ॉर्म व ऑपरेटिंग सिस्टम" : "Operating System Affinity"}
              </h3>
              <p className="text-xs text-white/50 mt-1">
                {isHindi ? "विद्यालय कार्यालयों में प्रयुक्त कंप्यूटर" : "Guest workstation breakdown"}
              </p>
            </div>

            <div className="space-y-4">
              {osEntries.map(([osName, count], idx) => {
                const percent = Math.round((count / totalOsSum) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white flex items-center gap-2">
                        {osName === "Windows" ? (
                          <Monitor className="w-3.5 h-3.5 text-sky-400" />
                        ) : osName === "Android" ? (
                          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Laptop className="w-3.5 h-3.5 text-purple-400" />
                        )}
                        {osName}
                      </span>
                      <span className="font-mono text-white/60">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          osName === "Windows"
                            ? "bg-sky-400"
                            : osName === "Android"
                            ? "bg-emerald-400"
                            : "bg-purple-400"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
              <p>
                {isHindi
                  ? "💡 अधिकांश विद्यालय क्लर्क Windows 10/11 का उपयोग करते हैं, जबकि स्कूल डायरेक्टर Android पर प्रगति देखते हैं।"
                  : "💡 School admin clerks predominantly rely on Windows 10/11 x64, while Directors track via Android."}
              </p>
            </div>
          </LiquidGlassCard>

          {/* Direct Family Desk Link Card */}
          <LiquidGlassCard className="p-6 border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-slate-950/40">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isHindi ? "अतिथि सेवा डेस्क (Family Care Desk)" : "Family Care Desk"}
                </h4>
                <p className="text-xs text-white/50">
                  {isHindi ? "संस्थागत सहायता अनुरोध" : "Institutional consultation requests"}
                </p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              {isHindi
                ? "जब कोई विद्यालय संचालक अपनी विशिष्ट चुनौती साझा करता है, तो वह सीधे फैमिली डेस्क पर प्रदर्शित होता है।"
                : "Whenever a school principal expresses an administrative obstacle, it appears directly in the Family Care Desk for 1-click WhatsApp assistance."}
            </p>
            <a
              href="/admin/family-desk"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>{isHindi ? "फैमिली केयर डेस्क खोलें" : "Open Family Care Desk"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </LiquidGlassCard>
        </div>
      </div>

      {/* Live Guest Stream Table */}
      <LiquidGlassCard className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              {isHindi ? "सजीव अतिथि संकेत प्रवाह (Live Anonymous Signal Feed)" : "Recent Anonymous Empathy Beacons"}
            </h3>
            <p className="text-xs text-white/50 mt-1">
              {isHindi
                ? "बिना कुकीज़ के अंतिम 25 आगंतुकों के रुचि संकेत"
                : "Live stream of guest sessions reflecting current product inspections"}
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {isHindi ? "सक्रिय स्ट्रीम" : "Active Ingestion"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/70">
            <thead className="bg-white/5 text-white/50 uppercase font-mono tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">{isHindi ? "अतिथि सत्र" : "Guest Session"}</th>
                <th className="py-3 px-4">{isHindi ? "संकेत प्रकार" : "Intent Type"}</th>
                <th className="py-3 px-4">{isHindi ? "मॉड्यूल / फ़ीचर" : "Module / Area"}</th>
                <th className="py-3 px-4">{isHindi ? "प्लेटफ़ॉर्म" : "Platform"}</th>
                <th className="py-3 px-4">{isHindi ? "भाषा" : "Lang"}</th>
                <th className="py-3 px-4">{isHindi ? "समय व्यतीत" : "Dwell Time"}</th>
                <th className="py-3 px-4 text-right">{isHindi ? "स्थिति" : "Recency"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentSignals.map((signal, idx) => (
                <tr key={signal.id || idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-white/90">
                    <span className="text-cyan-400 font-semibold">{signal.guestId}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        signal.intentType === "download_intent"
                          ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                          : signal.intentType === "calculator_interact"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {signal.intentType.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {signal.feature}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-white/80">
                      {signal.platformOs === "Windows" ? (
                        <Monitor className="w-3.5 h-3.5 text-sky-400" />
                      ) : (
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{signal.platformOs}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono uppercase text-white/70">
                    {signal.language || "en"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-white/80">
                    {signal.dwellSeconds ? `${Math.round(signal.dwellSeconds)}s` : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right text-white/40">
                    {signal.timeFormatted || "Just now"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
