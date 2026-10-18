"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  IndianRupee, 
  ArrowRight,
  ShieldCheck,
  Users,
  GraduationCap,
  CheckCircle2,
  FileDown,
  Layers,
  Zap,
} from "lucide-react";

interface CropConfig {
  name: string;
  baseYieldPerAcre: number;
  mandiPricePerQntl: number;
  waterRequirementLiters: number;
}

const CROPS: Record<string, CropConfig> = {
  paddy: {
    name: "Basmati Paddy",
    baseYieldPerAcre: 22,
    mandiPricePerQntl: 3800,
    waterRequirementLiters: 1200000,
  },
  wheat: {
    name: "Wheat & Mustard",
    baseYieldPerAcre: 20,
    mandiPricePerQntl: 2400,
    waterRequirementLiters: 800000,
  },
  sugarcane: {
    name: "Sugarcane",
    baseYieldPerAcre: 380,
    mandiPricePerQntl: 380,
    waterRequirementLiters: 2000000,
  },
  cotton: {
    name: "Cotton & Oilseeds",
    baseYieldPerAcre: 14,
    mandiPricePerQntl: 6500,
    waterRequirementLiters: 900000,
  },
  horticulture: {
    name: "Fruits & Orchards",
    baseYieldPerAcre: 80,
    mandiPricePerQntl: 4200,
    waterRequirementLiters: 1100000,
  },
};

export interface PriceCalculatorProps {
  variant?: "school" | "vidhyam" | "agromi" | "farmer";
}

export type RoiCalculatorProps = PriceCalculatorProps;

export function PriceCalculator({ variant = "school" }: PriceCalculatorProps) {
  const { isHindi } = useLanguage();
  // ==========================================
  // AGROMI CALCULATOR STATE
  // ==========================================
  const [acres, setAcres] = useState<number>(50);
  const [cropKey, setCropKey] = useState<string>("paddy");
  const [irrigation, setIrrigation] = useState<"flood" | "manual" | "drip">("flood");

  // ==========================================
  // MOD SCHOOL CALCULATOR STATE
  // ==========================================
  const [students, setStudents] = useState<number>(500);
  const [employees, setEmployees] = useState<number>(35);
  const [billingCycle, setBillingCycle] = useState<"quarterly" | "annual">("quarterly");

  // ==========================================
  // VARIANT: AGROMI / FARMER
  // ==========================================
  if (variant === "agromi" || variant === "farmer") {
    const crop = CROPS[cropKey] || CROPS.paddy;
    const waterSavingPct = irrigation === "flood" ? 0.38 : irrigation === "manual" ? 0.28 : 0.18;
    const yieldBoostPct = 0.26;
    const inputSavingPerAcre = 4200;

    const currentTotalYieldQntl = acres * crop.baseYieldPerAcre;
    const additionalYieldQntl = Math.round(currentTotalYieldQntl * yieldBoostPct);
    const additionalYieldRevenue = additionalYieldQntl * crop.mandiPricePerQntl;
    const totalInputCostSaved = acres * inputSavingPerAcre;
    const totalWaterSavedKL = Math.round((acres * crop.waterRequirementLiters * waterSavingPct) / 1000);
    const totalNetProfitSurge = additionalYieldRevenue + totalInputCostSaved;

    return (
      <section className="py-24 relative overflow-hidden" id="calculator">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4 border border-emerald-500/30">
              <Calculator className="w-3.5 h-3.5 text-emerald-500" />
              <span>Interactive Profitability Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Calculate Your Projected{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-400">
                Yield Boost & Cost Savings
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
              Estimate your annual financial returns with Agromi autonomous soil probes, automated solar drip cycles, and mandi price optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6">
              <LiquidGlassCard
                glowColor="rgba(16, 185, 129, 0.2)"
                className="p-8 rounded-3xl border border-emerald-500/20 dark:border-white/10 h-full flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                      Farm & Estate Parameters
                    </h3>
                    <p className="text-xs text-slate-500">Configure acreage and current cultivation practices.</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Total Cultivated Land
                      </label>
                      <span className="text-base font-bold font-tech text-emerald-600 dark:text-emerald-400">
                        {acres} Acres
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="500"
                      step="5"
                      value={acres}
                      onChange={(e) => setAcres(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                      <span>5 Acres (Smallholding)</span>
                      <span>100 Acres</span>
                      <span>500+ Acres (Estate / FPO)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                      Primary Crop Cultivated
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(CROPS).map(([key, item]) => (
                        <button
                          key={key}
                          onClick={() => setCropKey(key)}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                            cropKey === key
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40"
                              : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-500/30"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                      Current Irrigation Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setIrrigation("flood")}
                        className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                          irrigation === "flood"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40"
                            : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                        }`}
                      >
                        Flood Irrigation
                      </button>
                      <button
                        onClick={() => setIrrigation("manual")}
                        className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                          irrigation === "manual"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40"
                            : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                        }`}
                      >
                        Manual / Rainfed
                      </button>
                      <button
                        onClick={() => setIrrigation("drip")}
                        className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                          irrigation === "drip"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40"
                            : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                        }`}
                      >
                        Basic Manual Drip
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Calibrated from Indian ICAR & field trial benchmarks</span>
                </div>
              </LiquidGlassCard>
            </div>

            <div className="lg:col-span-6">
              <LiquidGlassCard
                glowColor="rgba(16, 185, 129, 0.3)"
                className="p-8 rounded-3xl border border-emerald-500/30 dark:border-white/15 h-full flex flex-col justify-between bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Projected Annual Value
                      </span>
                      <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                        Estimated Financial Surge
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40">
                      +26% ROI
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-500/10 dark:emerald-950/30 border border-emerald-500/30 mb-6 text-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-300 block mb-1">
                      Projected Net Annual Profit Gain
                    </span>
                    <span className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
                      ₹{totalNetProfitSurge.toLocaleString("en-IN")}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Across {acres} acres of {crop.name} with Agromi automation
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                      <span className="block text-[11px] text-slate-500 font-mono">Extra Harvest</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        +{additionalYieldQntl} Qntl
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        +₹{additionalYieldRevenue.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                      <span className="block text-[11px] text-slate-500 font-mono">Input Cost Cut</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        ₹{totalInputCostSaved.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        NPK Precision
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                      <span className="block text-[11px] text-slate-500 font-mono">Water Conserved</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        {totalWaterSavedKL.toLocaleString("en-IN")} kL
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        {Math.round(waterSavingPct * 100)}% Volume
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <Link href="/agromi/contact" className="w-full">
                    <GlassButton
                      variant="primary"
                      size="lg"
                      className="w-full justify-center bg-emerald-600 hover:bg-emerald-500 text-white group"
                      icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      iconPosition="right"
                    >
                      Lock In Your Farm Pilot
                    </GlassButton>
                  </Link>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // VARIANT: MOD SCHOOL (DEFAULT)
  // ==========================================
  const studentRatePerMonth = billingCycle === "annual" ? 15 : 20;
  const employeeRatePerMonth = billingCycle === "annual" ? 15 : 20;

  const monthlyStudentBilling = students * studentRatePerMonth;
  const monthlyEmployeeBilling = employees * employeeRatePerMonth;
  const monthlyTotal = monthlyStudentBilling + monthlyEmployeeBilling;

  // Billing cycle totals
  const payableCycleAmount = billingCycle === "annual" ? monthlyTotal * 12 : monthlyTotal * 3;
  const standardAnnualPrice = (students + employees) * 20 * 12;
  const annualSavings = standardAnnualPrice - (students + employees) * 15 * 12;

  // Tangible Workload Elimination (No fake revenue promises)
  const hoursAutomatedPerYear = Math.round(employees * 2.2 * 220 + students * 0.35);

  return (
    <section id="calculator" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-24">
      {/* Executive Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-500/10 border border-sky-500/30">
          <Calculator className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>{isHindi ? "पारदर्शी सदस्यता एवं बिल गणक" : "Transparent Billing & Workload Estimator"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          {isHindi ? "अपने स्कूल का पारदर्शी सदस्यता शुल्क जानें" : "Calculate Your Transparent School Subscription"}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
          {isHindi
            ? "हम कोई काल्पनिक ROI या छात्रों की बाढ़ आने का झूठा दावा नहीं करते। हम स्कूल के दैनिक कार्यभार (Day-to-Day Workload) को समाप्त कर संचालन को 100% सुगम बनाते हैं। बेहतर सुविधाओं से स्कूल की प्रतिष्ठा स्वतः बढ़ती है।"
            : "We do not sell speculative marketing ROI or make false promises of sudden student admission floods. We guarantee absolute operational efficiency—eliminating daily administrative drag, automating governance, and elevating campus facilities."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive Headcount & Cycle Parameters */}
        <div className="lg:col-span-6">
          <LiquidGlassCard glowColor="rgba(56, 189, 248, 0.25)" className="p-7 sm:p-8 space-y-7 h-full border-slate-200/80 dark:border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{isHindi ? "कैंपस प्रोफाइल पैरामीटर्स" : "Campus Profile Parameters"}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                0% GST • MSME Exempt
              </span>
            </div>

            {/* Parameter 1: Active Regular Students */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isHindi ? "सक्रिय नियमित छात्र" : "Active Regular Students"}</span>
                </label>
                <span className="text-sm font-mono font-black text-sky-700 dark:text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-lg border border-sky-400/30">
                  {students.toLocaleString()} {isHindi ? "छात्र" : "Students"}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={students}
                onChange={(e) => setStudents(parseInt(e.target.value, 10))}
                className="w-full accent-sky-500 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>50</span>
                <span>₹{studentRatePerMonth}/student/mo</span>
                <span>3,000+</span>
              </div>
            </div>

            {/* Parameter 2: Faculty & Staff Members (Employees) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isHindi ? "कर्मचारी व शिक्षक (Employee Seats)" : "Employees & Faculty Staff"}</span>
                </label>
                <span className="text-sm font-mono font-black text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-400/30">
                  {employees} {isHindi ? "स्टाफ" : "Employees"}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>5</span>
                <span>Biometric + Payroll + Mobile App</span>
                <span>200+</span>
              </div>
            </div>

            {/* Parameter 3: Billing Prepayment Cycle Toggle */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                {isHindi ? "भुगतान चक्र चुनें (Prepayment Cycle)" : "Select Prepayment Cycle"}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setBillingCycle("quarterly")}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    billingCycle === "quarterly"
                      ? "bg-sky-500/15 border-sky-500 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/20"
                      : "bg-slate-100/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="text-xs font-bold font-display">Quarterly Prepaid</div>
                  <div className="text-[11px] font-mono mt-0.5 text-slate-600 dark:text-slate-400">
                    ₹20 / seat / mo • 3 Months
                  </div>
                  <span className="inline-block mt-1 text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                    Standard Cycle
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle("annual")}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                    billingCycle === "annual"
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                      : "bg-slate-100/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="text-xs font-bold font-display flex items-center justify-between">
                    <span>Annual Upfront</span>
                    <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-emerald-500 text-white dark:text-slate-950">
                      -25% OFF
                    </span>
                  </div>
                  <div className="text-[11px] font-mono mt-0.5 text-slate-600 dark:text-slate-400">
                    ₹15 / seat / mo • 12 Months
                  </div>
                  <span className="inline-block mt-1 text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    Best Value
                  </span>
                </button>
              </div>
            </div>

            {/* Zero Jargon Policy Note */}
            <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>
                {isHindi
                  ? "हस्ताक्षरित नीति: टीसी या पूर्व छात्र (Alumni) पर शून्य शुल्क। 7-15 दिन की ग्रेस अवधि में स्थानीय कार्य कभी बंद नहीं होता।"
                  : "Signed Policy Terms: Transferred (TC) or Alumni students incur ₹0 charge. Local school write access is never locked during grace periods."}
              </span>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Right Column: Live Subscription Bill & Workload Streamlining */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <LiquidGlassCard glowColor="rgba(56, 189, 248, 0.35)" className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between border-slate-200/80 dark:border-white/10">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {isHindi ? "पारदर्शी बिल गणना" : "Official Subscription Bill"}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  billingCycle === "annual"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                    : "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30"
                }`}>
                  {billingCycle === "annual" ? "Flat 25% Off Applied" : "Prepaid Quarter (3 Months)"}
                </span>
              </div>

              {/* Main Payable Display */}
              <div className="mt-5 mb-6 text-left">
                <div className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  ₹{payableCycleAmount.toLocaleString("en-IN")}
                </div>
                <div className="text-xs sm:text-sm text-sky-700 dark:text-sky-400 font-semibold mt-1 flex items-center gap-2">
                  <span>
                    {billingCycle === "annual"
                      ? `₹${monthlyTotal.toLocaleString("en-IN")} / month equivalent (Billed annually)`
                      : `₹${monthlyTotal.toLocaleString("en-IN")} / month equivalent (Billed quarterly)`}
                  </span>
                  {billingCycle === "annual" && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                      • Save ₹{annualSavings.toLocaleString("en-IN")}/yr
                    </span>
                  )}
                </div>
              </div>

              {/* Line-Item Transparency Breakdown */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-xs font-mono mb-5">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Students ({students} × ₹{studentRatePerMonth}/mo):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{(monthlyStudentBilling * (billingCycle === "annual" ? 12 : 3)).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Employees & Staff ({employees} × ₹{employeeRatePerMonth}/mo):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{(monthlyEmployeeBilling * (billingCycle === "annual" ? 12 : 3)).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 pt-1.5 border-t border-slate-200 dark:border-white/10 text-[11px]">
                  <span>GST (Statutory MSME Exemption):</span>
                  <span className="font-bold">₹0 (0% GST)</span>
                </div>
              </div>

              {/* Genuine Value Proposition: Workload Elimination & Student Facility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/25 space-y-1">
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold font-mono uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isHindi ? "वार्षिक कार्यभार बचत" : "Admin Hours Streamlined"}</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {hoursAutomatedPerYear.toLocaleString()} hrs / yr
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-tight">
                    {isHindi ? "रिपोर्ट कार्ड, उपस्थिति व लेजर मिलान पूर्ण स्वचालित" : "Automated report cards, attendance & daily fee ledgers"}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/25 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isHindi ? "छात्र सुविधा स्तर" : "Student Facilities"}</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    ~80% Drag Cut
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-tight">
                    {isHindi ? "बायोमेट्रिक सुरक्षा, अभिभावक रियल-टाइम अलर्ट व शून्य कतार" : "Biometric gate safety, real-time parent apps & zero queues"}
                  </div>
                </div>
              </div>

              {/* No False Marketing Claims Statement */}
              <div className="mt-4 p-3 rounded-xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                🛡️ <strong>{isHindi ? "सत्यनिष्ठा गारंटी:" : "Integrity Commitment:"}</strong>{" "}
                {isHindi
                  ? "हम छात्रों की बाढ़ आने का कोई झूठा दावा नहीं करते। हम स्कूल के रोजमर्रा के काम को आसान बनाते हैं जिससे सुविधाएं बेहतर होती हैं और स्कूल का स्तर बढ़ता है।"
                  : "We do not claim our software creates an influx of student admissions. Our sole focus is eliminating manual school workload. Superior facilities and error-free governance naturally elevate school reputation."}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-5 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="/documents/MOD-School-Official-Subscription-Pricing-Policy.pdf"
                download="MOD-School-Official-Subscription-Pricing-Policy.pdf"
                className="text-xs font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1.5"
                title="Download Official Subscription Policy PDF"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{isHindi ? "नीति पीडीएफ डाउनलोड" : "Official Policy PDF"}</span>
              </a>
              <Link href="/school/register">
                <GlassButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  {isHindi ? "7–30 दिन का फ्री ट्रायल शुरू करें" : "Start Free Evaluation Trial"}
                </GlassButton>
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
}

export function SchoolPriceCalculator() {
  return <PriceCalculator variant="school" />;
}

export function VidhyamRoiCalculator() {
  return <PriceCalculator variant="school" />;
}

export function AgromiYieldCalculator() {
  return <PriceCalculator variant="agromi" />;
}

export const RoiCalculator = PriceCalculator;
export const SchoolRoiCalculator = SchoolPriceCalculator;
