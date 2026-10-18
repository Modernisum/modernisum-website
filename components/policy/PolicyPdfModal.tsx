"use client";

import React, { useState } from "react";
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { FirestorePolicyDoc } from "@/lib/firestore/policies";
import { PolicyPdfDocument } from "./PolicyPdfDocument";

interface PolicyPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: FirestorePolicyDoc;
  customSignatory?: {
    institutionName?: string;
    signatoryName?: string;
    referenceId?: string;
    date?: string;
  };
}

export function PolicyPdfModal({
  isOpen,
  onClose,
  policy,
  customSignatory,
}: PolicyPdfModalProps) {
  const [printing, setPrinting] = useState(false);

  if (!isOpen || !policy) return null;

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-2 sm:p-6 print:p-0 print:bg-white print:static">
      {/* ======================================================== */}
      {/* TOP CONTROLS BAR (Hidden in print)                       */}
      {/* ======================================================== */}
      <div className="w-full max-w-4xl bg-slate-900 border border-white/15 rounded-2xl p-3 sm:p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white shadow-2xl print:hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold truncate max-w-xs sm:max-w-md">
                {policy.title}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Live Firestore Synced</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Real-time dynamically generated draft • No manual PDF uploads required
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            title="Export or Save as Official PDF via Browser Print"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close PDF Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PRINT STYLESHEET (Applies only during window.print())   */}
      {/* ======================================================== */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #policy-pdf-document,
          #policy-pdf-document * {
            visibility: visible !important;
          }
          #policy-pdf-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 12mm 15mm 15mm 15mm;
          }
          .avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* ======================================================== */}
      {/* DOCUMENT CANVAS / PAPER PREVIEW                          */}
      {/* ======================================================== */}
      <div className="w-full flex justify-center pb-12 print:p-0 print:m-0">
        <PolicyPdfDocument policy={policy} customSignatory={customSignatory} />
      </div>
    </div>
  );
}
