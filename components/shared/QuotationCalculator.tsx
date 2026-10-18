"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { QuotationSlipModal, type QuotationSlipData } from "@/components/shared/QuotationSlipModal";
import { OrderTrackingModal } from "@/components/shared/OrderTrackingModal";
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
  Lock,
  Tag,
  Link as LinkIcon,
  Layers,
  Smartphone,
  Globe,
  LayoutDashboard,
  Cpu,
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
    id: "e-commerce",
    name: "Modern E-Commerce & Merchant Ecosystem",
    baseDays: 18,
    baseCost: 85000,
    description: "Multi-vendor storefront, payment gateways, live order tracking, and inventory cockpit.",
  },
  {
    id: "mod-school",
    name: "MOD School Autonomous School OS",
    baseDays: 30,
    baseCost: 140000,
    description: "High-density local desktop ERP, RFID turnstiles, parent bus GPS telemetry & offline resilience.",
  },
  {
    id: "agromi",
    name: "MOD Farmer Autonomous Agro-Tech OS",
    baseDays: 30,
    baseCost: 140000,
    description: "Drone telemetry, IoT soil probes, satellite spectral NDVI & farm-to-mandi logistics.",
  },
  {
    id: "sovereign-web",
    name: "Sovereign Web Platform & Custom SaaS",
    baseDays: 20,
    baseCost: 95000,
    description: "Next.js 16 + Rust edge, 120fps client experience, SEO 10/10, and high-concurrency database.",
  },
  {
    id: "mobile-suite",
    name: "Cross-Platform Mobile Suite (Flutter / Kotlin)",
    baseDays: 25,
    baseCost: 110000,
    description: "Liquid obsidian UI, biometric login, offline sync, push notifications, and app store deployment.",
  },
  {
    id: "iot-hardware",
    name: "Custom Edge IoT & Telemetry Hardware",
    baseDays: 35,
    baseCost: 180000,
    description: "ESP32/microcontroller firmware, CAN-bus integration, and real-time hardware telemetry.",
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
    description: "Distributed institutions, multi-branch sync & centralized telemetry.",
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
  // 1. Solution and Tier selections
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    initialSolution || "e-commerce"
  );
  const [selectedTierId, setSelectedTierId] = useState<string>("production");

  // 2. Project State (New vs Existing 20-50% Built)
  const [projectState, setProjectState] = useState<"new" | "existing_legacy">("new");

  // 3. Deliverables Surfaces (Checkboxes)
  const [surfaces, setSurfaces] = useState<string[]>(["web", "admin"]);

  // 4. Reference / Inspiration URL
  const [referenceUrl, setReferenceUrl] = useState("");

  // 5. Referral Partner Coupon
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

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
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Active solution & tier objects
  const activeSolution =
    SOLUTIONS.find((s) => s.id === selectedSolutionId) || SOLUTIONS[0];
  const activeTier =
    TIERS.find((t) => t.id === selectedTierId) || TIERS[1];

  // Baseline standard days & base cost
  const rawStandardDays = Math.max(4, Math.round(activeSolution.baseDays * activeTier.daysMultiplier));
  const standardDays = projectState === "existing_legacy" ? Math.max(3, Math.round(rawStandardDays * 0.6)) : rawStandardDays;
  
  const rawBaseCost = Math.round(activeSolution.baseCost * activeTier.costMultiplier);
  const baseCost = projectState === "existing_legacy" ? Math.round(rawBaseCost * 0.65) : rawBaseCost;

  // Expedited Days state (minimum 2 days production floor)
  const minDays = Math.max(2, Math.round(standardDays * 0.4));
  const [expeditedDays, setExpeditedDays] = useState<number>(standardDays);

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

  // Surface toggle helper
  const toggleSurface = (surfaceId: string) => {
    setSurfaces((prev) =>
      prev.includes(surfaceId) ? prev.filter((s) => s !== surfaceId) : [...prev, surfaceId]
    );
  };

  // Coupon validation
  const handleApplyCoupon = () => {
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === "MODERN10" || code === "PARTNER10" || code === "AGENT10") {
      setAppliedCoupon({ code, discountPercent: 10 });
      confetti({ particleCount: 30, spread: 45 });
    } else if (code === "VIP5" || code === "EARLY5") {
      setAppliedCoupon({ code, discountPercent: 5 });
      confetti({ particleCount: 20, spread: 40 });
    } else {
      setCouponError(`Coupon code "${code}" is invalid or expired.`);
      setAppliedCoupon(null);
    }
  };

  // -------------------------------------------------------------
  // FIXED PRICE & DYNAMIC MILESTONE CALCULUS
  // -------------------------------------------------------------
  const timeSavedDays = Math.max(0, standardDays - expeditedDays);
  const timeReductionPct = Math.round((timeSavedDays / standardDays) * 100);
  const surgeMultiplierPct = timeReductionPct * 2;
  const expeditedSurcharge = Math.round(baseCost * (surgeMultiplierPct / 100));
  const rawTotalCost = baseCost + expeditedSurcharge;

  const discountAmount = appliedCoupon ? Math.round(rawTotalCost * (appliedCoupon.discountPercent / 100)) : 0;
  const totalCost = rawTotalCost - discountAmount;

  // Dynamic Duration-Based Milestones
  const milestones = expeditedDays <= 4
    ? [
        { name: "50% Sprint Mobilization Advance", pct: 50, amount: Math.round(totalCost * 0.5), status: "pending" as const },
        { name: "50% Handover & Production Handover", pct: 50, amount: Math.round(totalCost * 0.5), status: "pending" as const },
      ]
    : expeditedDays <= 14
    ? [
        { name: "25% Sprint Mobilization Advance", pct: 25, amount: Math.round(totalCost * 0.25), status: "pending" as const },
        { name: "50% Midway Demo (75% Progress)", pct: 50, amount: Math.round(totalCost * 0.5), status: "pending" as const },
        { name: "25% Handover & Production Handover", pct: 25, amount: Math.round(totalCost * 0.25), status: "pending" as const },
      ]
    : [
        { name: "25% Sprint Mobilization Advance", pct: 25, amount: Math.round(totalCost * 0.25), status: "pending" as const },
        { name: "25% Core Architecture Demo (50% Build)", pct: 25, amount: Math.round(totalCost * 0.25), status: "pending" as const },
        { name: "25% Cockpit & Integration Demo (75% Build)", pct: 25, amount: Math.round(totalCost * 0.25), status: "pending" as const },
        { name: "25% Final Handover & Source Handover", pct: 25, amount: Math.round(totalCost * 0.25), status: "pending" as const },
      ];

  const advanceAmount = milestones[0]?.amount || Math.round(totalCost * 0.25);
  const milestoneBalance = totalCost - advanceAmount;

  const tasks = [
    { id: "task-1", title: "Cloud Architecture, Database Ingress & Data Models", weightPct: 25, completed: false },
    { id: "task-2", title: "Core Workflows, UI Surfaces & User Pipelines", weightPct: 25, completed: false },
    { id: "task-3", title: "Administrative Command Cockpit & Integration APIs", weightPct: 25, completed: false },
    { id: "task-4", title: "Playwright Regression Testing, Security QA & Handover", weightPct: 25, completed: false },
  ];

  const currentQuoteData: QuotationSlipData = {
    quotationId: submittedData?.quotationId || `MOD-QT-${Date.now().toString().slice(-6)}`,
    orderId: submittedData?.orderId,
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
    totalCost: rawTotalCost,
    discountPercent: appliedCoupon?.discountPercent,
    discountAmount,
    finalDiscountedTotal: totalCost,
    advanceAmount,
    milestoneBalance,
    projectState,
    referenceUrl: referenceUrl.trim(),
    surfaces,
    tasks,
    milestones,
    couponCode: appliedCoupon?.code,
    notes: notes.trim(),
    status: "pending_review",
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // Submit Free Quotation or Sprint Booking Request
  const handleSubmitQuotation = async (isPriorityBooking = false) => {
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
        projectDescription: `[100% GUARANTEED FIXED-PRICE BLUEPRINT]\nSolution: ${activeSolution.name}\nTier: ${activeTier.name}\nProject State: ${projectState}\nReference URL: ${referenceUrl || "None"}\nSurfaces: ${surfaces.join(", ")}\nTimeline: ${expeditedDays} Business Days\nGuaranteed Fixed Total: ${formatINR(totalCost)}\nAdvance: ${formatINR(advanceAmount)}\nBalance: ${formatINR(milestoneBalance)}\nClient Notes: ${notes.trim() || "Standard sovereign architecture"}`,
        projectState,
        referenceUrl: referenceUrl.trim(),
        surfaces,
        tasks,
        milestones,
        couponCode: appliedCoupon?.code || "",
        discountAmount,
        tokenPaid: isPriorityBooking,
        tokenAmount: isPriorityBooking ? 3000 : 0,
        totalFixedPrice: totalCost,
        estimatedDays: expeditedDays,
        status: isPriorityBooking ? "approved" : "new",
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

      const generatedOrderId = resJson.orderId || `MOD-ORD-${Date.now().toString().slice(-6)}`;
      const updatedSlip = { ...currentQuoteData, orderId: generatedOrderId };
      setSubmittedData(updatedSlip);
      setTrackingOrderId(generatedOrderId);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (isPriorityBooking) {
        setTrackingModalOpen(true);
      } else {
        setSlipModalOpen(true);
      }
    } catch (err: any) {
      setSubmissionError(err.message || "Submission failed. Please check network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: 100% Free Quote & Fixed Price Protection */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                100% Free Instant Quotation &amp; Guaranteed Fixed Price
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                NO HOURLY BILL SHOCK
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Explore and calculate freely. Once booked, what is quoted is 100% final.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTrackingModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
          <span>Track Existing Order</span>
        </button>
      </div>

      {/* Auth Strip */}
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
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">
              Generating quotes is 100% free. Sign in only when submitting a formal booking request.
            </span>
          </div>
          <GlassButton
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setAuthModalOpen(true)}
            className="whitespace-nowrap text-xs font-bold shrink-0 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </GlassButton>
        </div>
      )}

      {/* 1. Project State Toggle (New vs Existing 20-50% Built) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          1. Project Nature &amp; Codebase State
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setProjectState("new")}
            className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
              projectState === "new"
                ? "bg-cyan-500/15 border-cyan-500 ring-2 ring-cyan-500/30 text-slate-900 dark:text-white"
                : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
            }`}
          >
            <div className="font-bold text-xs">🚀 New Project (Built from Scratch)</div>
            <p className="text-[11px] mt-0.5 opacity-80">Full turnkey design, backend, frontend &amp; cloud deployment.</p>
          </button>

          <button
            type="button"
            onClick={() => setProjectState("existing_legacy")}
            className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
              projectState === "existing_legacy"
                ? "bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 text-slate-900 dark:text-white"
                : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
            }`}
          >
            <div className="font-bold text-xs">🛠️ Existing Codebase / Upgrade (20%–50% Built)</div>
            <p className="text-[11px] mt-0.5 opacity-80">Rescue unfinished projects, security audit, bug fixes &amp; new features.</p>
          </button>
        </div>
      </div>

      {/* 2. Choose Solution Track */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>2. Choose Domain &amp; Solution Track</span>
          <span className="text-[10px] font-normal text-slate-500">Zero language/framework markup</span>
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
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300"
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
                  <span className="text-slate-500">Base: {sol.baseDays}d</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {formatINR(sol.baseCost)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Deliverable Surfaces (Web, Mobile, Admin, IoT) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          3. Deliverable Surfaces Required
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "web", name: "Responsive Web Store", icon: Globe },
            { id: "mobile", name: "Mobile App (Android/iOS)", icon: Smartphone },
            { id: "admin", name: "Admin Cockpit", icon: LayoutDashboard },
            { id: "iot", name: "Edge IoT / Hardware", icon: Cpu },
          ].map((surf) => {
            const isChecked = surfaces.includes(surf.id);
            const Icon = surf.icon;
            return (
              <button
                type="button"
                key={surf.id}
                onClick={() => toggleSurface(surf.id)}
                className={`p-3 rounded-2xl text-left border flex items-center gap-2.5 transition-all cursor-pointer ${
                  isChecked
                    ? "bg-purple-500/15 border-purple-500 text-slate-900 dark:text-white"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Icon className={`w-4 h-4 ${isChecked ? "text-purple-500" : "text-slate-400"}`} />
                <span className="text-xs font-semibold">{surf.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Inspiration / Reference Website URL */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-cyan-500" />
          <span>4. Competitor / Inspiration Website URL (Optional)</span>
        </label>
        <input
          type="url"
          value={referenceUrl}
          onChange={(e) => setReferenceUrl(e.target.value)}
          placeholder="Paste link to any website you want your product to resemble (e.g. https://shopify.com)..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>

      {/* 5. Scale & Complexity Tier */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          5. Scale &amp; Scope Tier
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
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{tier.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tier.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Turnaround Time Slider (Expedited vs Standard) */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                6. Turnaround Schedule &amp; Speed Multiplier
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag left to compress delivery. Dedicated parallel engineering pods mobilize to meet your deadline.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 w-fit">
            ⚡ 1% Time Saved = +2% Expedited Engineering Surcharge
          </span>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs font-mono font-bold">
            <span className="text-purple-600 dark:text-purple-400">
              Locked Delivery: {expeditedDays} Business Days
            </span>
            <span className="text-slate-500">
              Standard Baseline: {standardDays} Days
            </span>
          </div>

          <input
            type="range"
            min={minDays}
            max={standardDays}
            value={expeditedDays}
            onChange={(e) => setExpeditedDays(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Fastest ({minDays} Days)</span>
            <span>Standard ({standardDays} Days)</span>
          </div>
        </div>
      </div>

      {/* 7. Partner Referral Coupon Engine */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Tag className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="w-full">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              Have a Referral Partner / Agency Coupon Code?
            </span>
            <span className="text-[11px] text-slate-500">
              Apply official affiliate codes (e.g. MODERN10) for instant concession.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="COUPON CODE"
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 border border-slate-300 dark:border-white/15 text-xs text-slate-900 dark:text-white uppercase font-mono tracking-wider w-full sm:w-36 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Apply
          </button>
        </div>
      </div>

      {appliedCoupon && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-between">
          <span>🎉 Partner Code "{appliedCoupon.code}" Applied: {appliedCoupon.discountPercent}% Discount ({formatINR(discountAmount)})!</span>
          <button
            type="button"
            onClick={() => setAppliedCoupon(null)}
            className="text-[10px] font-bold underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}

      {couponError && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
          {couponError}
        </div>
      )}

      {/* 8. Live Guaranteed Total Investment Display */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Guaranteed Fixed Investment</span>
            </div>
            <h3 className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
              {formatINR(totalCost)}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Turnaround: {expeditedDays} Business Days | SLA Protected
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
              Mobilization Advance (25%)
            </span>
            <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {formatINR(advanceAmount)}
            </span>
            <span className="text-[10px] text-slate-400 block">
              Balance {formatINR(milestoneBalance)} on Milestone Verification
            </span>
          </div>
        </div>

        {/* Dynamic Milestones Roadmap Preview */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Duration-Based Milestone Roadmap
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs"
              >
                <div className="flex justify-between font-bold text-[11px]">
                  <span>Stage {idx + 1}</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{m.pct}%</span>
                </div>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-1">
                  {formatINR(m.amount)}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{m.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Immutable Scope Lock Notice */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            <strong>Immutable Scope Lock</strong>: Price cannot be downgraded after sprint booking. Future modifications are transparently added as Feature Add-ons.
          </span>
        </div>
      </div>

      {/* Client Credentials Form */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Client &amp; Organization Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Full Name / Title *
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Dr. Rajesh Sharma (Director)"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              WhatsApp / Phone Number
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="+91 9368671007"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
            Additional Specifications / Scope Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Specific feature requests, legacy repo links, database size, or third-party API keys..."
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>

        {submissionError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submissionError}</span>
          </div>
        )}
      </div>

      {/* Two-Tier Action Buttons: 100% Free Slip vs Priority Sprint Booking */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => handleSubmitQuotation(false)}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white text-xs font-bold border border-slate-300 dark:border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Printer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Download Free Quotation Slip (100% Free)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSubmitQuotation(true)}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          <span>Book Priority Sprint (₹3,000 Token &amp; Track ID)</span>
        </button>
      </div>

      {/* Modals */}
      {submittedData && (
        <QuotationSlipModal
          isOpen={slipModalOpen}
          onClose={() => setSlipModalOpen(false)}
          data={submittedData}
          onBookSprint={() => {
            setSlipModalOpen(false);
            setTrackingModalOpen(true);
          }}
        />
      )}

      <OrderTrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        initialOrderId={trackingOrderId}
      />

      <AuthDialog isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
