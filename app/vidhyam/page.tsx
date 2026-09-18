import React from "react";
import { VidhyamHero } from "@/components/vidhyam/VidhyamHero";
import { VidhyamFeaturesGrid } from "@/components/vidhyam/VidhyamFeaturesGrid";
import { VidhyamDesktopShowcase } from "@/components/vidhyam/VidhyamDesktopShowcase";
import { VidhyamRoiCalculator } from "@/components/vidhyam/VidhyamRoiCalculator";
import { VidhyamWorkflow } from "@/components/vidhyam/VidhyamWorkflow";
import { VidhyamPricingMatrix } from "@/components/vidhyam/VidhyamPricingMatrix";
import { VidhyamDemoForm } from "@/components/vidhyam/VidhyamDemoForm";
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";

export default function VidhyamHomePage() {
  return (
    <div className="space-y-6">
      {/* 1. Split 3D Hero Section */}
      <VidhyamHero />

      {/* 2. Institutional Accreditation Trust Ribbon */}
      <div className="border-y border-slate-200/80 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.02] py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center justify-around gap-4 lg:gap-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">100% CBSE & ICSE Marksheet Compliance</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">ISO 27001 & DPDP 2023 Certified Security</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">UDISE+ Direct Export Formats</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Zero Hardware Lock-In Architecture</span>
          </div>
        </div>
      </div>

      {/* 3. Live Native Desktop UI Cockpit Showcase */}
      <VidhyamDesktopShowcase />

      {/* 4. Core Capabilities Grid */}
      <VidhyamFeaturesGrid />

      {/* 4. Interactive ROI & Financial Calculator */}
      <VidhyamRoiCalculator />

      {/* 5. A Typical Day Autonomous Workflow */}
      <VidhyamWorkflow />

      {/* 6. Transparent Institutional Pricing */}
      <VidhyamPricingMatrix />

      {/* 7. Direct MongoDB Atlas Campus Demo Booking Form */}
      <VidhyamDemoForm />
    </div>
  );
}
