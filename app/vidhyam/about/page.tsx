import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  HeartHandshake, 
  ArrowRight,
  Cpu,
  Zap,
  Clock
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "About Vidhyam — The 80% Workload Reduction Mission",
  description: "Vidhyam is engineered to liberate school principals and teachers from clerical drudgery, returning focus to student development.",
};

const PILLARS = [
  {
    icon: Target,
    title: "The 80% Reduction Mandate",
    desc: "Indian teachers spend an average of 42% of their working hours on attendance registers, diary notices, marksheet calculations, and fee chits. Vidhyam automates this completely, giving teachers their time back.",
  },
  {
    icon: Cpu,
    title: "Mathematical Solving, Not Spreadsheets",
    desc: "Timetable scheduling, proxy allocations, and fee accounting are computational constraint problems. We replace human guesswork with deterministic algorithms that execute in milliseconds.",
  },
  {
    icon: ShieldCheck,
    title: "Indian Data Sovereignty & DPDP 2023",
    desc: "Student safety is non-negotiable. All telemetry is encrypted with AES-256 and hosted strictly within certified Indian data centers. We never monetize or share student analytics with external third parties.",
  },
  {
    icon: HeartHandshake,
    title: "Campus Empathy & Zero Technical Friction",
    desc: "Technology succeeds only when it is effortless. We design software so simple that even non-technical gatekeepers, bus drivers, and elderly faculty use it effortlessly without multi-week training programs.",
  },
];

export default function VidhyamAboutPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>Our Vision & Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Liberating Educational Leadership
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          We believe schools should be vibrant centers of human curiosity and growth—not paperwork factories consumed by clerical drudgery.
        </p>
      </div>

      {/* Hero Story Card */}
      <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.3)" className="p-8 sm:p-12 border-slate-200/80 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
              Why We Built Vidhyam
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              In 2024, our founding engineering team spent weeks observing operations inside Indian K-12 schools. What we witnessed was disheartening: brilliant teachers spending their early mornings marking paper registers, administrative staff chasing delayed fee receipts with manual ledger books, and principals resolving timetable clashes instead of mentoring students.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Existing ERP software was bloated, outdated, and required endless training. We knew there was a better path. By combining high-speed edge AI, real-time WhatsApp automation, and resilient cloud architecture, we engineered <strong>Vidhyam</strong>—an autonomous operating system that runs school operations silently in the background.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">Shivank Bhati</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">• Lead Systems Architect & Founder</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 text-center space-y-3">
            <div className="text-4xl sm:text-5xl font-black text-cyan-500 dark:text-cyan-400 font-mono">
              3+ Hrs
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Returned Every Single Day
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light max-w-xs">
              Directly invested back into individualized student attention, remedial support, and extracurricular coaching.
            </p>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Engineering Pillars */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
            The Architectural Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
            How our engineering choices protect institutional uptime, student privacy, and staff sanity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <LiquidGlassCard key={pillar.title} glowColor="rgba(99, 102, 241, 0.2)" className="p-7 border-slate-200/80 dark:border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-10 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent border border-slate-200/80 dark:border-white/10 space-y-5">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
          Discover What Vidhyam Can Do for Your Campus
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-light">
          Book an on-campus demonstration with our senior educational engineering team.
        </p>
        <Link href="/vidhyam/contact">
          <GlassButton variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Connect With Our Engineering Desk
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
