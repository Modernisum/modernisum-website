import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_POLICIES_SEED, fetchPolicyBySlug } from "@/lib/firestore/policies";
import { PolicyPdfDocument } from "@/components/policy/PolicyPdfDocument";
import Link from "next/link";
import { ArrowLeft, Printer, CheckCircle2 } from "lucide-react";

interface PrintPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DEFAULT_POLICIES_SEED.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PrintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = await fetchPolicyBySlug(slug);
  if (!policy) return { title: "Policy Document | Modernisum" };

  return {
    title: `${policy.title} (Official Executed PDF) | Modernisum`,
    description: `Official executed legal agreement: ${policy.summaryTitle}. Govt. of India MSME: UDYAM-UP-56-0049848.`,
  };
}

export default async function PolicyPrintPage({ params }: PrintPageProps) {
  const { slug } = await params;
  const policy = await fetchPolicyBySlug(slug);

  if (!policy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-6 px-3 sm:px-6 print:p-0 print:bg-white">
      {/* Top Floating Control Bar (Hidden when printing/saving as PDF) */}
      <div className="max-w-[850px] mx-auto mb-4 bg-slate-900 text-white p-3 sm:p-4 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between gap-3 print:hidden">
        <Link
          href={`/policies/software-development#${policy.slug}`}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Policy Center</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Live Firestore Synced</span>
          </span>

          <button
            type="button"
            id="print-btn"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            // Client-side script triggers native print
            onClickCapture={undefined}
          >
            <Printer className="w-4 h-4" />
            <span>Save as Official PDF</span>
          </button>
        </div>
      </div>

      {/* Auto-print client trigger script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("DOMContentLoaded", function() {
              const btn = document.getElementById("print-btn");
              if (btn) {
                btn.addEventListener("click", function() {
                  window.print();
                });
              }
            });
          `,
        }}
      />

      {/* Clean Document Canvas */}
      <PolicyPdfDocument policy={policy} />
    </div>
  );
}
