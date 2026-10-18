"use client";

import React, { useRef } from "react";
import {
  Printer,
  X,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileText,
  Lock,
  Zap,
  ExternalLink,
} from "lucide-react";

export interface QuotationSlipData {
  quotationId: string;
  orderId?: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  solution: string;
  scopeTier: string;
  standardDays: number;
  expeditedDays: number;
  timeReductionPct: number;
  surgeMultiplierPct: number;
  baseCost: number;
  expeditedSurcharge: number;
  totalCost: number;
  discountPercent?: number;
  discountAmount?: number;
  finalDiscountedTotal?: number;
  advanceAmount: number;
  milestoneBalance: number;
  projectState?: "new" | "existing_legacy";
  referenceUrl?: string;
  surfaces?: string[];
  features?: string[];
  tasks?: Array<{ id: string; title: string; weightPct: number; completed: boolean }>;
  milestones?: Array<{ name: string; pct: number; amount: number; status: "pending" | "paid" }>;
  couponCode?: string;
  tokenPaid?: boolean;
  notes?: string;
  status?: string;
}

interface QuotationSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuotationSlipData;
  onBookSprint?: () => void;
}

export function QuotationSlipModal({ isOpen, onClose, data, onBookSprint }: QuotationSlipModalProps) {
  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const finalPayableTotal = data.finalDiscountedTotal ?? data.totalCost;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-14 bg-black/80 backdrop-blur-md print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col my-auto bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:my-0 print:w-full print:max-h-none">
        {/* Top Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Official Modernisum Fixed-Price Quotation &amp; Policy Slip
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Slip Content */}
        <div ref={printableRef} className="p-8 sm:p-10 space-y-7 text-slate-900 dark:text-white overflow-y-auto print:overflow-visible print:p-6 print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200 dark:border-white/10 print:border-black/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-display tracking-tight text-slate-950 dark:text-white print:text-black">
                  MODERNISUM
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 print:border-black print:text-black">
                  SOVEREIGN LABS
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm print:text-slate-700">
                Modernisum Technologies (MSME: UDYAM-UP-56-0049848) <br />
                Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406 <br />
                Direct Hotline: +91 9368671007 | Email: contact@modernisum.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 print:text-black">
                REF #{data.orderId || data.quotationId}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-700">
                Issued: {data.createdAt}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 print:text-black">
                <Lock className="w-3 h-3" />
                <span>100% Guaranteed Fixed Price</span>
              </div>
            </div>
          </div>

          {/* Client & Solution Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-white/[0.02] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 print:bg-slate-50 print:border-slate-300">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Client Credentials
              </span>
              <div className="mt-1 space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 dark:text-white print:text-black">
                  {data.clientName || "Enterprise Principal"}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-mono print:text-slate-700">
                  {data.clientEmail}
                </div>
                {data.clientPhone && (
                  <div className="text-slate-600 dark:text-slate-300 print:text-slate-700">
                    {data.clientPhone}
                  </div>
                )}
                {data.projectState === "existing_legacy" && (
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    PROJECT RESCUE &amp; UPGRADE (20-50% Built)
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Architectural Scope &amp; Target
              </span>
              <div className="mt-1 space-y-0.5 text-xs">
                <div className="font-bold text-cyan-700 dark:text-cyan-400 print:text-black">
                  {data.solution}
                </div>
                <div className="text-slate-600 dark:text-slate-300 print:text-slate-700">
                  Scope Tier: {data.scopeTier}
                </div>
                {data.referenceUrl && (
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400 truncate max-w-xs">
                    Inspiration Ref: {data.referenceUrl}
                  </div>
                )}
                {data.couponCode && (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    Partner Code Applied: {data.couponCode} (-{data.discountPercent}%)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Time Calculus & Fixed Timeline */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Turnaround Schedule &amp; Speed Multiplier</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Standard Baseline</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white print:text-black">{data.standardDays} Days</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-cyan-800 dark:text-cyan-300 block">Locked Delivery</span>
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400 print:text-black">{data.expeditedDays} Days</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Time Compression</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                  {data.timeReductionPct > 0 ? `-${data.timeReductionPct}% (${data.standardDays - data.expeditedDays}d faster)` : "Standard Pace"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-purple-700 dark:text-purple-300 block">Speed Multiplier</span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400 print:text-black">
                  +{data.surgeMultiplierPct}%
                </span>
              </div>
            </div>
          </div>

          {/* High-Level Non-Leakable Milestone Deliverables */}
          {data.tasks && data.tasks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Scope Deliverables &amp; Progress Phases (0% to 100%)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {data.tasks.map((task, idx) => (
                  <div
                    key={task.id || idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200 print:text-black truncate mr-2">
                      {idx + 1}. {task.title}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                      {task.weightPct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Breakdown Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 print:border-slate-300">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 print:bg-slate-100">
                  <th className="p-3 font-bold">Scope Deliverables</th>
                  <th className="p-3 font-bold text-center">Timeline Metric</th>
                  <th className="p-3 font-bold text-right">Fixed Investment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10 print:divide-slate-200">
                <tr>
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 dark:text-white print:text-black">
                      Core Turnkey Architecture &amp; Engineering Pod
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      Zero hourly rate variance. Modernisum absorbs all internal engineering iteration.
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-600 dark:text-slate-300 font-mono">
                    {data.standardDays} Days (Base)
                  </td>
                  <td className="p-3 text-right font-semibold text-slate-900 dark:text-white print:text-black font-mono">
                    {formatINR(data.baseCost)}
                  </td>
                </tr>

                {data.expeditedSurcharge > 0 && (
                  <tr>
                    <td className="p-3">
                      <span className="font-semibold text-purple-600 dark:text-purple-400 print:text-black">
                        Expedited Pod Mobilization &amp; Parallel Compute (+2% per 1% saved)
                      </span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                        {data.timeReductionPct}% time compression. Dedicated concurrent pods.
                      </span>
                    </td>
                    <td className="p-3 text-center text-purple-600 dark:text-purple-400 font-mono">
                      -{data.timeReductionPct}% Time
                    </td>
                    <td className="p-3 text-right font-semibold text-purple-600 dark:text-purple-400 print:text-black font-mono">
                      +{formatINR(data.expeditedSurcharge)}
                    </td>
                  </tr>
                )}

                {data.discountAmount && data.discountAmount > 0 && (
                  <tr className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    <td className="p-3">
                      Partner Referral Concession ({data.couponCode})
                    </td>
                    <td className="p-3 text-center font-mono">-{data.discountPercent}%</td>
                    <td className="p-3 text-right font-mono">-{formatINR(data.discountAmount)}</td>
                  </tr>
                )}

                <tr className="bg-slate-50 dark:bg-white/[0.03] font-bold text-sm">
                  <td className="p-3 text-slate-900 dark:text-white print:text-black">
                    100% Guaranteed Total Fixed Project Investment
                  </td>
                  <td className="p-3 text-center text-cyan-600 dark:text-cyan-400 font-mono">
                    {data.expeditedDays} Business Days
                  </td>
                  <td className="p-3 text-right text-cyan-600 dark:text-cyan-400 print:text-black font-mono text-base">
                    {formatINR(finalPayableTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dynamic Duration-Based Milestone Payment Breakdown */}
          {data.milestones && data.milestones.length > 0 ? (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Duration-Based Milestone Payment Roadmap
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Stage {idx + 1}</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{m.pct}%</span>
                    </div>
                    <div className="text-base font-black font-mono text-slate-900 dark:text-white mt-1">
                      {formatINR(m.amount)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {m.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  25% Mobilization Advance
                </span>
                <div className="text-2xl font-black font-mono mt-1 text-emerald-600 dark:text-emerald-400">
                  {formatINR(data.advanceAmount)}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                  75% Milestone Balance
                </span>
                <div className="text-2xl font-black font-mono mt-1 text-cyan-600 dark:text-cyan-400">
                  {formatINR(data.milestoneBalance)}
                </div>
              </div>
            </div>
          )}

          {/* Legal Binding Guarantees */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 text-xs text-slate-700 dark:text-slate-300 print:bg-white print:border-slate-300 print:text-black">
            <div className="font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Binding Institutional Protection Policies</span>
            </div>
            <ul className="space-y-1.5 pl-5 list-disc text-[11px] leading-relaxed">
              <li>
                <strong>100% Fixed-Price Guarantee</strong>: No hourly bill surprises. The price above is final and binding.
              </li>
              <li>
                <strong>Immutable Scope Lock</strong>: Post-approval, agreed features cannot be deleted to reduce cost. New requests are transparently added as formal Feature Upgrade Add-ons.
              </li>
              <li>
                <strong>100% Advance Refund Guarantee</strong>: If Modernisum cancels or rejects the project, 100% of the customer advance is returned immediately.
              </li>
              <li>
                <strong>On-Time Delivery SLA (-1% per 1% Delay)</strong>: For every 1% of turnaround time delayed by Modernisum, an automatic 1% deduction is applied to the final invoice.
              </li>
              <li className="list-none pt-1">
                <a
                  href="/policies/software-development"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Read full Master Software Engineering &amp; Delivery SLA Policy</span>
                  <span>&rarr;</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Booking Action Button (Hidden in Print) */}
          {onBookSprint && (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent p-4 rounded-2xl border border-cyan-500/30 print:hidden">
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Ready to Lock Sprint &amp; Reserve Engineering Pod?
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Deposit ₹3,000 priority booking fee (100% credited into your 25% advance) to generate your official Order ID.
                </p>
              </div>
              <button
                type="button"
                onClick={onBookSprint}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Zap className="w-4 h-4" />
                <span>Book Priority Sprint (₹3,000 Token)</span>
              </button>
            </div>
          )}

          {/* Footer & Signature lines */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 print:border-slate-300 print:text-black">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 print:text-black">
                Modernisum Systems Architecture Bureau
              </p>
              <p className="text-[11px]">MSME: UDYAM-UP-56-0049848 | Electronically generated via Modernisum Sovereign Core.</p>
            </div>
            <div className="border-t border-slate-400 dark:border-slate-600 pt-1 w-48 text-center text-[10px] print:border-black">
              Authorized Signature / Admin Stamp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
