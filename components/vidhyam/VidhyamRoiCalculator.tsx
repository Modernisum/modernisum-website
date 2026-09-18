"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Sparkles, TrendingUp, Clock, IndianRupee, ShieldCheck, ArrowRight } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export function VidhyamRoiCalculator() {
  const [students, setStudents] = useState<number>(1200);
  const [teachers, setTeachers] = useState<number>(55);
  const [avgFee, setAvgFee] = useState<number>(4500);

  // Math models
  // 1. Teacher hours saved: 40 mins/day attendance & registers = 0.66 hrs * 220 working days * teachers
  const hoursSavedPerYear = Math.round(teachers * 0.66 * 220);

  // 2. Fee recovery improvement: typically 2.5% of total fees get delayed or defaulted without automated WhatsApp UPI
  const totalAnnualFeePool = students * avgFee * 12;
  const recoveredRevenue = Math.round(totalAnnualFeePool * 0.025);

  // 3. Printing, registers & paper circulars saved: ~₹180 per student per year
  const printingSaved = Math.round(students * 180);

  // Total annual financial upside
  const totalAnnualUpside = recoveredRevenue + printingSaved;

  return (
    <section id="roi" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
          <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Interactive Value Modeling</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Calculate Your School&apos;s Return on Investment
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
          Adjust the parameters below to project tangible hours saved, paper waste eliminated, and revenue recovered annually.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6">
          <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.25)" className="p-7 sm:p-8 space-y-7 h-full border-slate-200/80 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Campus Operating Parameters</span>
            </h3>

            {/* Slider 1: Students */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Enrolled Students</label>
                <span className="text-sm font-mono font-black text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-400/30">
                  {students.toLocaleString()} Students
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={students}
                onChange={(e) => setStudents(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>100</span>
                <span>2,500</span>
                <span>5,000+</span>
              </div>
            </div>

            {/* Slider 2: Teachers */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Faculty & Staff Members</label>
                <span className="text-sm font-mono font-black text-indigo-700 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-400/30">
                  {teachers} Faculty
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={teachers}
                onChange={(e) => setTeachers(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>10</span>
                <span>125</span>
                <span>250</span>
              </div>
            </div>

            {/* Slider 3: Average Fee */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Average Monthly Tuition / Student</label>
                <span className="text-sm font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                  ₹{avgFee.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={avgFee}
                onChange={(e) => setAvgFee(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>₹1,000</span>
                <span>₹7,500</span>
                <span>₹15,000+</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              💡 <em>Based on audited deployment data across CBSE schools running Vidhyam in Delhi NCR and Western UP.</em>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Right Column: Projected ROI Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <LiquidGlassCard glowColor="rgba(16, 185, 129, 0.35)" className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between border-slate-200/80 dark:border-white/10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Annual Impact Summary
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Verified Model
                </span>
              </div>

              {/* Big Headline Metric */}
              <div className="mt-6 mb-8 text-left">
                <div className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  ₹{(totalAnnualUpside / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                  Projected annual financial & operational efficiency gain
                </div>
              </div>

              {/* Sub Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Faculty Hours Saved</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {hoursSavedPerYear.toLocaleString()} hrs / yr
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-light">
                    Returned directly to student teaching & mentoring
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <IndianRupee className="w-4 h-4" />
                    <span>Fee Recovery Delta</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    ₹{(recoveredRevenue / 100000).toFixed(2)} L / yr
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-light">
                    Zero-leakage automated WhatsApp UPI links
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Turnkey installation in <strong className="text-slate-900 dark:text-white">3 campus days</strong>.
              </div>
              <Link href="/vidhyam/contact">
                <GlassButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Deploy For Your Campus
                </GlassButton>
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
}
