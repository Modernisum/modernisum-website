"use client";

import React, { useRef } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Printer,
  Download,
  X,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileText,
} from "lucide-react";

export interface QuotationSlipData {
  quotationId: string;
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
  advanceAmount: number;
  milestoneBalance: number;
  notes?: string;
  status?: string;
}

interface QuotationSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuotationSlipData;
}

export function QuotationSlipModal({ isOpen, onClose, data }: QuotationSlipModalProps) {
  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedBaseCost = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(data.baseCost);

  const formattedSurcharge = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(data.expeditedSurcharge);

  const formattedTotalCost = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(data.totalCost);

  const formattedAdvance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(data.advanceAmount);

  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(data.milestoneBalance);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-14 bg-black/80 backdrop-blur-md print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col my-auto bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:my-0 print:w-full print:max-h-none">
        {/* Top Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Official Modernisum Quotation &amp; Policy Slip
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
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Slip Content */}
        <div ref={printableRef} className="p-8 sm:p-10 space-y-8 text-slate-900 dark:text-white overflow-y-auto print:overflow-visible print:p-6 print:text-black">
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
                Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406 <br />
                Direct Hotline: +91 9368671007 | Email: contact@modernisum.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 print:text-black">
                REF #{data.quotationId}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-700">
                Issued: {data.createdAt}
              </div>
              <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400 print:text-black">
                Valid for: 15 Calendar Days
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
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Architectural Scope
              </span>
              <div className="mt-1 space-y-0.5 text-xs">
                <div className="font-bold text-cyan-700 dark:text-cyan-400 print:text-black">
                  {data.solution}
                </div>
                <div className="text-slate-600 dark:text-slate-300 print:text-slate-700">
                  Scope Tier: {data.scopeTier}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  {data.notes || "Turnkey deployment with 100% cloud & edge readiness."}
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Time & Acceleration Calculus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Transparent Time Calculus &amp; Speed Multiplier</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Standard Baseline</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white print:text-black">{data.standardDays} Days</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-cyan-800 dark:text-cyan-300 block">Requested Delivery</span>
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400 print:text-black">{data.expeditedDays} Days</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Time Reduction</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                  {data.timeReductionPct > 0 ? `-${data.timeReductionPct}% (${data.standardDays - data.expeditedDays}d)` : "Standard"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 print:bg-white print:border-slate-300">
                <span className="text-[10px] text-purple-700 dark:text-purple-300 block">Speed Surcharge Rate</span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400 print:text-black">
                  +{data.surgeMultiplierPct}%
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              * Policy Formula: Every 1% reduction in standard turnaround time incurs a 2% expedited compute and dedicated concurrent engineer allocation surcharge.
            </p>
          </div>

          {/* Financial Breakdown Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 print:border-slate-300">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 print:bg-slate-100">
                  <th className="p-3 font-bold">Line Item &amp; Deliverable</th>
                  <th className="p-3 font-bold text-center">Duration Metric</th>
                  <th className="p-3 font-bold text-right">Investment Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10 print:divide-slate-200">
                <tr>
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 dark:text-white print:text-black">
                      Base Architectural Scope &amp; Core Sovereign Codebase
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      Zero language or UI markup. Complete source ownership &amp; local deploy capability.
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-600 dark:text-slate-300 font-mono">
                    {data.standardDays} Days (Base)
                  </td>
                  <td className="p-3 text-right font-semibold text-slate-900 dark:text-white print:text-black font-mono">
                    {formattedBaseCost}
                  </td>
                </tr>

                {data.expeditedSurcharge > 0 && (
                  <tr>
                    <td className="p-3">
                      <span className="font-semibold text-purple-600 dark:text-purple-400 print:text-black">
                        Expedited Pod Mobilization &amp; Tooling Surcharge
                      </span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                        {data.timeReductionPct}% time compression (+2% per 1% saved). Dedicated sprint pods.
                      </span>
                    </td>
                    <td className="p-3 text-center text-purple-600 dark:text-purple-400 font-mono">
                      -{data.timeReductionPct}% Time
                    </td>
                    <td className="p-3 text-right font-semibold text-purple-600 dark:text-purple-400 print:text-black font-mono">
                      +{formattedSurcharge}
                    </td>
                  </tr>
                )}

                <tr className="bg-slate-50 dark:bg-white/[0.03] font-bold text-sm">
                  <td className="p-3 text-slate-900 dark:text-white print:text-black">
                    Total Estimated Project Budget
                  </td>
                  <td className="p-3 text-center text-cyan-600 dark:text-cyan-400 font-mono">
                    {data.expeditedDays} Days Net
                  </td>
                  <td className="p-3 text-right text-cyan-600 dark:text-cyan-400 print:text-black font-mono text-base">
                    {formattedTotalCost}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Terms & Milestone Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 print:border-black print:text-black">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  25% Mobilization Advance
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20">
                  DUE ON APPROVAL
                </span>
              </div>
              <div className="text-2xl font-black font-mono mt-2 text-emerald-600 dark:text-emerald-400 print:text-black">
                {formattedAdvance}
              </div>
              <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1">
                Locks team calendar, assigns lead engineers, and reserves compute resources.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 print:border-black print:text-black">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  75% Milestone Delivery Balance
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20">
                  UPON COMPLETION
                </span>
              </div>
              <div className="text-2xl font-black font-mono mt-2 text-cyan-600 dark:text-cyan-400 print:text-black">
                {formattedBalance}
              </div>
              <p className="text-[11px] text-cyan-700/80 dark:text-cyan-400/80 mt-1">
                Payable only after staging demonstration, test approval, and deployment handover.
              </p>
            </div>
          </div>

          {/* Modernisum Transparent Guarantees & SLA Agreement */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2.5 text-xs text-slate-700 dark:text-slate-300 print:bg-white print:border-slate-300 print:text-black">
            <div className="font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Binding Modernisum Institutional Policies</span>
            </div>
            <ul className="space-y-1.5 pl-5 list-disc text-[11px] leading-relaxed">
              <li>
                <strong>100% Full Advance Refund Guarantee</strong>: If Modernisum engineering cancels or rejects the project at any stage, 100% of the customer advance is returned immediately with zero cancellation fees.
              </li>
              <li>
                <strong>On-Time Delivery SLA (1% Credit per 1% Delay)</strong>: Modernisum guarantees strict delivery within {data.expeditedDays} business days. For every 1% of time delayed, a 1% deduction is automatically applied to your final milestone invoice.
              </li>
              <li>
                <strong>Admin Approval Workflow</strong>: This blueprint represents an estimated technical proposal. Final project commencement date and designated sprint team are confirmed by Admin within 4 business hours upon blueprint review.
              </li>
            </ul>
          </div>

          {/* Footer & Signature lines */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500 dark:text-slate-400 print:border-slate-300 print:text-black">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 print:text-black">
                Modernisum Systems Architecture Bureau
              </p>
              <p className="text-[11px]">Electronically generated via Modernisum Sovereign Core.</p>
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
