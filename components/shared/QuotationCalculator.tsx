"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { QuotationSlipModal, type QuotationSlipData } from "@/components/shared/QuotationSlipModal";
import { AuthDialog } from "@/components/ui/AuthDialog";
import { getSSOUser, type AuthUser } from "@/lib/sso";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import confetti from "canvas-confetti";
import {
  Calculator,
  Clock,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  Send,
  AlertCircle,
  LogIn,
  UserCheck,
  IndianRupee,
  RefreshCw,
  Scale,
} from "lucide-react";

interface SolutionConfig {
  id: string;
  name: string;
  baseDays: number;
  baseCost: number;
  description: string;
}

const SOLUTIONS: SolutionConfig[] = [
  {
    id: "mod-school",
    name: "MOD School Autonomous School OS",
    baseDays: 30,
    baseCost: 140000,
    description: "High-density local desktop ERP, RFID turnstiles, parent bus GPS telemetry & offline resilience.",
  },
  {
    id: "agromi",
    name: "Agromi Autonomous Agro-Tech OS",
    baseDays: 30,
    baseCost: 140000,
    description: "Drone telemetry, IoT soil probes, satellite spectral NDVI & farm-to-mandi logistics.",
  },
  {
    id: "sovereign-web",
    name: "Modern Sovereign Web Platform (Next.js 16 + Rust)",
    baseDays: 20,
    baseCost: 80000,
    description: "Sub-second 120fps client experience, SEO 10/10 architecture, and ultra-scalable backend.",
  },
  {
    id: "mobile-suite",
    name: "Cross-Platform Mobile Suite (Flutter / Kotlin)",
    baseDays: 25,
    baseCost: 110000,
    description: "Liquid obsidian UI, biometrics, offline sync, push notifications, and app store deployment.",
  },
  {
    id: "enterprise-ai",
    name: "Enterprise AI & Autonomous Workforce",
    baseDays: 20,
    baseCost: 150000,
    description: "Custom Gemini/multi-agent task pipelines, document OCR, automated workflows, and self-healing bots.",
  },
  {
    id: "iot-hardware",
    name: "Custom Edge IoT & Hardware Telemetry",
    baseDays: 35,
    baseCost: 180000,
    description: "ESP32/STM32 microcontroller firmware, CAN-bus integration, real-time telemetry protocols.",
  },
];

interface TierConfig {
  id: string;
  name: string;
  daysMultiplier: number;
  costMultiplier: number;
  description: string;
}

const TIERS: TierConfig[] = [
  {
    id: "mvp",
    name: "Rapid Prototype / MVP",
    daysMultiplier: 0.5,
    costMultiplier: 0.5,
    description: "Core features to launch and validate in market quickly.",
  },
  {
    id: "production",
    name: "Production Single-Org",
    daysMultiplier: 1.0,
    costMultiplier: 1.0,
    description: "Complete institutional deployment with multi-user roles.",
  },
  {
    id: "multi-campus",
    name: "Multi-Campus Ecosystem",
    daysMultiplier: 1.5,
    costMultiplier: 2.2,
    description: "Distributed institutions, multi-branch synchronization & centralized telemetry.",
  },
  {
    id: "enterprise",
    name: "Sovereign Enterprise Scale",
    daysMultiplier: 2.0,
    costMultiplier: 4.5,
    description: "Unlimited scale, dedicated failover clustering, 24/7 dedicated engineering SLA.",
  },
];

interface QuotationCalculatorProps {
  initialSolution?: string;
  onQuoteCalculated?: (data: QuotationSlipData) => void;
}

export function QuotationCalculator({ initialSolution, onQuoteCalculated }: QuotationCalculatorProps) {
  // Solution and Tier selections
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    initialSolution || "mod-school"
  );
  const [selectedTierId, setSelectedTierId] = useState<string>("production");

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Form Details
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<QuotationSlipData | null>(null);
  const [slipModalOpen, setSlipModalOpen] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Active solution & tier objects
  const activeSolution =
    SOLUTIONS.find((s) => s.id === selectedSolutionId) || SOLUTIONS[0];
  const activeTier =
    TIERS.find((t) => t.id === selectedTierId) || TIERS[1];

  // Baseline standard days & base cost
  const standardDays = Math.max(7, Math.round(activeSolution.baseDays * activeTier.daysMultiplier));
  const baseCost = Math.round(activeSolution.baseCost * activeTier.costMultiplier);

  // Expedited Days state (clamped between minDays and standardDays)
  const minDays = Math.max(5, Math.round(standardDays * 0.35));
  const [expeditedDays, setExpeditedDays] = useState<number>(standardDays);

  // Re-sync expeditedDays if standardDays changes
  useEffect(() => {
    setExpeditedDays((prev) => Math.min(Math.max(prev, minDays), standardDays));
  }, [standardDays, minDays]);

  // Auth sync
  useEffect(() => {
    const ssoUser = getSSOUser();
    if (ssoUser && ssoUser.email) {
      setCurrentUser(ssoUser);
      if (ssoUser.name) setClientName((p) => p || ssoUser.name);
    }

    let unsubscribe: (() => void) | null = null;
    try {
      unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser && fbUser.email) {
          const userObj: AuthUser = {
            id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || "",
          };
          setCurrentUser(userObj);
          if (userObj.name) setClientName((p) => p || userObj.name);
        }
      });
    } catch (e) {
      // ignore
    }

    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<AuthUser | null>;
      const user = customEvent.detail;
      if (user) {
        setCurrentUser(user);
        if (user.name) setClientName((p) => p || user.name);
      } else {
        setCurrentUser(null);
      }
    };
    window.addEventListener("modernisum_auth_change", handleAuthChange);

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener("modernisum_auth_change", handleAuthChange);
    };
  }, []);

  // -------------------------------------------------------------
  // CALCULATIONS (STRICT MODERNISUM FORMULA):
  // 1. Time reduction % = ((standardDays - expeditedDays) / standardDays) * 100
  // 2. Surge % = 2 * time reduction %
  // 3. Surcharge = baseCost * (surge / 100)
  // 4. Total Cost = baseCost + surcharge
  // 5. 25% Advance = totalCost * 0.25
  // 6. 75% Milestone Balance = totalCost * 0.75
  // -------------------------------------------------------------
  const timeSavedDays = Math.max(0, standardDays - expeditedDays);
  const timeReductionPct = Math.round((timeSavedDays / standardDays) * 100);
  const surgeMultiplierPct = timeReductionPct * 2;
  const expeditedSurcharge = Math.round(baseCost * (surgeMultiplierPct / 100));
  const totalCost = baseCost + expeditedSurcharge;
  const advanceAmount = Math.round(totalCost * 0.25);
  const milestoneBalance = totalCost - advanceAmount;

  const currentQuoteData: QuotationSlipData = {
    quotationId: submittedData?.quotationId || `MOD-QT-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    clientName: clientName || currentUser?.name || "Client",
    clientEmail: currentUser?.email || "unverified@client.local",
    clientPhone: clientPhone || "+91 9368671007",
    solution: activeSolution.name,
    scopeTier: activeTier.name,
    standardDays,
    expeditedDays,
    timeReductionPct,
    surgeMultiplierPct,
    baseCost,
    expeditedSurcharge,
    totalCost,
    advanceAmount,
    milestoneBalance,
    notes: notes.trim(),
    status: "pending_approval",
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpeditedDays(Number(e.target.value));
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // Submit Blueprint Request
  const handleSubmitBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!currentUser || !currentUser.email) {
      setAuthModalOpen(true);
      return;
    }

    if (!clientName.trim()) {
      setSubmissionError("Please provide your Name or Organization title.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: clientName.trim(),
        email: currentUser.email,
        phone: clientPhone || "+91 9368671007",
        serviceNeeded: `${activeSolution.name} (${activeTier.name})`,
        budgetRange: `${formatINR(totalCost)} (${expeditedDays} Days Turnaround)`,
        projectDescription: `[AUTOMATED BLUEPRINT QUOTATION REQUEST]\nSolution: ${activeSolution.name}\nTier: ${activeTier.name}\nStandard Timeline: ${standardDays} Days\nExpedited Timeline: ${expeditedDays} Days (${timeReductionPct}% accelerated, +${surgeMultiplierPct}% surge)\nBase Cost: ${formatINR(baseCost)}\nExpedited Surcharge: ${formatINR(expeditedSurcharge)}\nTotal Budget: ${formatINR(totalCost)}\n25% Advance: ${formatINR(advanceAmount)}\n75% Milestone Balance: ${formatINR(milestoneBalance)}\nClient Notes: ${notes.trim() || "Standard sovereign architecture"}`,
        status: "new",
        quotationDetails: currentQuoteData,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      if (!res.ok || !resJson.success) {
        throw new Error(resJson.message || "Failed to submit quotation request.");
      }

      setSubmittedData(currentQuoteData);
      setSlipModalOpen(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setSubmissionError(err.message || "Submission failed. Please check network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Auth Gate / Verified Account Strip */}
      {currentUser && currentUser.email ? (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-600 dark:text-slate-400">Verified Client Identity: </span>
              <strong className="text-slate-900 dark:text-white">{currentUser.name || "Enterprise User"}</strong>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono ml-1.5">({currentUser.email})</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 w-fit">
            AUTHENTICATED
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Sign In to Lock Quotation &amp; Generate Blueprint
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Sign in to link your official business email and bypass sales calls with direct engineer scheduling.
              </p>
            </div>
          </div>
          <GlassButton
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setAuthModalOpen(true)}
            className="whitespace-nowrap flex items-center gap-1.5 text-xs font-bold shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </GlassButton>
        </div>
      )}

      {/* 1. Solution Track Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>1. Choose Solution Architecture</span>
          <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">Zero language/framework markup</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOLUTIONS.map((sol) => {
            const isSelected = sol.id === selectedSolutionId;
            return (
              <button
                type="button"
                key={sol.id}
                onClick={() => setSelectedSolutionId(sol.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-500 text-slate-900 dark:text-white ring-2 ring-cyan-500/30 shadow-md"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{sol.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 ml-1" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Base: {sol.baseDays}d</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {formatINR(sol.baseCost)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Scope & Complexity Tier Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          2. Scope &amp; Scale Tier
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                type="button"
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-500/15 border-purple-500 text-slate-900 dark:text-white ring-2 ring-purple-500/30"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{tier.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tier.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The Core Time-Acceleration Engine Slider */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                3. Delivery Turnaround &amp; Speed Multiplier
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Drag left to expedite delivery. Dedicated sprint pods and compute mobilize to meet your deadline.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold">
            <span>⚡ 1% Time Saved = +2% Expedited Engineering Surcharge</span>
          </div>
        </div>

        {/* The Slider Control */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-mono font-bold">
            <span className="text-purple-600 dark:text-purple-400">
              Expedited: {expeditedDays} Business Days
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Standard Baseline: {standardDays} Days
            </span>
          </div>

          <input
            type="range"
            min={minDays}
            max={standardDays}
            value={expeditedDays}
            onChange={handleSliderChange}
            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 transition-all"
          />

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Fastest Turnaround ({minDays} Days)</span>
            <span>Standard Pace ({standardDays} Days)</span>
          </div>
        </div>

        {/* Live Calculation Feedback Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Base Investment
            </span>
            <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
              {formatINR(baseCost)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">At standard {standardDays}d</span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
            <span className="text-[10px] text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
              Expedited Surcharge
            </span>
            <span className="text-sm font-bold font-mono text-purple-600 dark:text-purple-400">
              +{formatINR(expeditedSurcharge)}
            </span>
            <span className="text-[10px] text-purple-700/80 dark:text-purple-300/80 block mt-0.5">
              {timeReductionPct > 0 ? `-${timeReductionPct}% time (+${surgeMultiplierPct}%)` : "No surcharge"}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-[10px] text-cyan-800 dark:text-cyan-300 uppercase tracking-wider block">
              Total Budget
            </span>
            <span className="text-base font-black font-mono text-cyan-600 dark:text-cyan-400">
              {formatINR(totalCost)}
            </span>
            <span className="text-[10px] text-cyan-700/80 dark:text-cyan-300/80 block mt-0.5">
              Net {expeditedDays} business days
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
              25% Mobilization Advance
            </span>
            <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
              {formatINR(advanceAmount)}
            </span>
            <span className="text-[10px] text-emerald-700/80 dark:text-emerald-300/80 block mt-0.5">
              Due on Admin Approval
            </span>
          </div>
        </div>
      </div>

      {/* 4. Modernisum Binding Policies & Contractual Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              25% Advance Lock
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
              Pay only 25% to initiate sprint. Balance 75% payable strictly on milestone acceptance.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              100% Full Refund Guarantee
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
              If Modernisum cancels or fails to mobilize your project, 100% of your advance is immediately refunded.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              On-Time SLA (-1% per 1% Delay)
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
              Strict delivery within {expeditedDays}d. For every 1% time delayed, 1% is deducted from the final invoice.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Client Information & Submission */}
      <form onSubmit={handleSubmitBlueprint} className="space-y-4">
        {submissionError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {submissionError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Client / Enterprise Name *
            </label>
            <GlassInput
              type="text"
              placeholder="e.g. Dr. Rajesh Sharma / DPS Meerut"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Direct Phone / WhatsApp *
            </label>
            <GlassInput
              type="tel"
              placeholder="+91 9368671007"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Brief Scope Notes / Custom Requests
          </label>
          <textarea
            rows={3}
            placeholder="Outline campus size, existing ERP, or specific modules needed..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmittedData(currentQuoteData);
              setSlipModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Preview &amp; Print Quotation Slip</span>
          </button>

          <GlassButton
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
          >
            {isSubmitting ? (
              <span>Submitting Blueprint...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Blueprint &amp; Lock 25% Advance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </GlassButton>
        </div>

        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 pt-1">
          * Submission sends this blueprint directly to the Admin Queue. Sprint lead and confirmed start date are approved within 4 hours.
        </p>
      </form>

      {/* Official Quotation Slip Modal */}
      {slipModalOpen && submittedData && (
        <QuotationSlipModal
          isOpen={slipModalOpen}
          onClose={() => setSlipModalOpen(false)}
          data={submittedData}
        />
      )}

      {/* Auth Dialog */}
      {authModalOpen && (
        <AuthDialog isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      )}
    </div>
  );
}
