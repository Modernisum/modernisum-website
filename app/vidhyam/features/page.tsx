import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ScanFace, 
  CreditCard, 
  GraduationCap, 
  Bus, 
  Calendar, 
  Wallet, 
  Check, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Cpu,
  Zap
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "Platform Capabilities & Modules — Vidhyam School OS",
  description: "Detailed technical specifications of Vidhyam's Face AI attendance, automated WhatsApp fee reconciliation, CBSE report cards, and bus GPS telemetry.",
};

const FEATURE_SECTIONS = [
  {
    id: "face-attendance",
    icon: ScanFace,
    title: "Optical Edge Face AI Gate Telemetry",
    tag: "ATTENDANCE ENGINE",
    badge: "0.38s Ingress Speed",
    headline: "End long queues and roll-call delays forever.",
    desc: "Vidhyam deploys neural face recognition at school turnstiles and classroom entrypoints. Operating locally with edge fallback, students and faculty walk through at a normal pace without tapping cards or pausing.",
    bullets: [
      "45 students processed per minute per turnstile lane",
      "Liveness detection prevents spoofing with photographs or mobile screens",
      "Instant WhatsApp arrival notification dispatched to parents in under 1.2 seconds",
      "Offline sync mode preserves ingress records during campus broadband outages",
    ],
    glow: "rgba(0, 242, 254, 0.3)",
  },
  {
    id: "fee-automation",
    icon: CreditCard,
    title: "Automated WhatsApp Fee Collection & Double-Entry Ledger",
    tag: "FINANCIAL OS",
    badge: "99.8% Recovery Rate",
    headline: "Zero bank reconciliation drift. Zero manual receipt books.",
    desc: "Replace manual paper counter collections with direct UPI, NetBanking, and Card payment links sent directly inside parents' WhatsApp conversations on scheduled fee dates.",
    bullets: [
      "Automated WhatsApp fee reminders 7, 3, and 1 day prior to due date",
      "Instant digital PDF receipts with institutional digital signature and QR verification",
      "Direct settlement into your designated school bank account without intermediary holding",
      "Fine calculation, transport fee add-ons, and sibling discount rules configured effortlessly",
    ],
    glow: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "autonomous-timetable",
    icon: Calendar,
    title: "Constraint-Based Autonomous Timetable Engine",
    tag: "ACADEMIC SCHEDULER",
    badge: "0 Roster Clashes",
    headline: "Mathematical period allocation in milliseconds.",
    desc: "Designing master timetables takes weeks of stressful permutations. Vidhyam's mathematical solver balances subject quotas, lab equipment access, and faculty preferences instantaneously.",
    bullets: [
      "Instant proxy teacher reassignment when faculty logs morning sick leave",
      "Multi-campus and shared specialist teacher scheduling",
      "Room capacity constraints preventing double-booked science laboratories or sports fields",
      "Interactive drag-and-drop schedule board with immediate clash alerts",
    ],
    glow: "rgba(99, 102, 241, 0.3)",
  },
  {
    id: "fleet-telemetry",
    icon: Bus,
    title: "Real-Time Bus GPS & Geofenced Parent Alerts",
    tag: "CHILD SAFETY",
    badge: "Live Telemetry",
    headline: "End frantic morning phone calls to school reception.",
    desc: "Equip buses with smart GPS telemetry. Parents track their child's school bus on an interactive map with predictive arrival countdowns.",
    bullets: [
      "Proximity WhatsApp alerts when bus crosses 1km from pickup point",
      "RFID student boarding validation ensuring students never alight at incorrect stops",
      "Overspeeding and route-deviation alerts dispatched directly to the transport manager",
      "SOS panic buttons and direct driver calling with privacy masking",
    ],
    glow: "rgba(245, 158, 11, 0.3)",
  },
  {
    id: "cbse-reports",
    icon: GraduationCap,
    title: "CBSE & ICSE Compliant Examination Portfolios",
    tag: "EXAMINATION ENGINE",
    badge: "UDISE+ Ready",
    headline: "Generate 2,000 compliant marksheets in under 4 minutes.",
    desc: "Teachers enter term assessment marks from their phone. Vidhyam automatically formats compliant CBSE, ICSE, and State Board marksheets with scholastic curves and co-scholastic rubrics.",
    bullets: [
      "Pre-configured CBSE 8-point & 9-point grading scales and weightage calculations",
      "Teacher remarks generation with individualized student improvement suggestions",
      "One-click PDF download portal for parents with historical academic progress graphs",
      "Direct UDISE+ and board export formatting eliminating duplicate data entry",
    ],
    glow: "rgba(236, 72, 153, 0.3)",
  },
  {
    id: "biometric-payroll",
    icon: Wallet,
    title: "One-Click Biometric Faculty Payroll & HRMS",
    tag: "STAFF MANAGEMENT",
    badge: "1st of Month Auto",
    headline: "From morning punch-in to month-end salary credit.",
    desc: "Derived straight from biometric turnstile records, staff payroll accounts for sick leaves, late-markings, provident fund (PF), and income tax deductions without spreadsheets.",
    bullets: [
      "Automated attendance muster roll compliant with Department of Education inspection norms",
      "Faculty self-service portal for leave applications, salary slip downloads, and duty rotas",
      "Bulk NEFT / RTGS bank transfer file generation for all major Indian banks",
      "Automated performance metrics linked to syllabus completion velocity",
    ],
    glow: "rgba(168, 85, 247, 0.3)",
  },
];

export default function VidhyamFeaturesPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>Technical Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Comprehensive Campus Operating Suite
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Deep-dive into the mathematical engines, telemetry protocols, and automated workflows powering the next generation of educational leadership.
        </p>
      </div>

      {/* Feature Sections */}
      <div className="space-y-16">
        {FEATURE_SECTIONS.map((sec, idx) => {
          const Icon = sec.icon;
          const isEven = idx % 2 === 0;

          return (
            <LiquidGlassCard
              key={sec.id}
              glowColor={sec.glow}
              className="p-8 sm:p-12 border-slate-200/80 dark:border-white/10"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`}>
                <div className={`space-y-5 ${isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-400/30">
                      {sec.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10">
                      {sec.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                    {sec.title}
                  </h2>

                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                    {sec.headline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {sec.desc}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {sec.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`lg:col-span-5 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="p-8 rounded-3xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center text-cyan-500 dark:text-cyan-300">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {sec.tag}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-light max-w-xs">
                      Zero legacy database dependencies. Sub-second reactive updates across faculty mobile apps and management consoles.
                    </div>
                    <div className="pt-2 w-full">
                      <Link href="/vidhyam/contact" className="block w-full">
                        <GlassButton variant="secondary" size="sm" className="w-full justify-center">
                          Request Module Demo
                        </GlassButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-12 rounded-3xl bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent border border-cyan-400/30 space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
          Ready to Modernize Your Campus Operations?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-light">
          Join leading Indian K-12 institutions saving thousands of hours and recovering 99.8% of tuition fees on time.
        </p>
        <Link href="/vidhyam/contact">
          <GlassButton variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Schedule Your Campus Consultation
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
