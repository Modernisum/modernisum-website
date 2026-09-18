"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { CampusCockpitPreview } from "./CampusCockpitPreview";
import {
  School,
  Monitor,
  Smartphone,
  Navigation,
  CreditCard,
  Brain,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function ModernSchoolSection() {
  const pillars = [
    {
      icon: <Monitor className="w-5 h-5 text-cyan-400" />,
      title: "Desktop & Cloud Admin Panel",
      desc: "Unified institution control: admissions, timetables, fee ledgers, exam grades, and staff biometrics in an offline-resilient desktop app.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      title: "Triple Native Mobile Apps",
      desc: "Tailored native apps for Parents, Teachers, and Students. Push notifications for assignments, homework, and fee receipts.",
    },
    {
      icon: <Navigation className="w-5 h-5 text-emerald-400" />,
      title: "Real-Time GPS Bus Fleet Tracking",
      desc: "Sub-second bus telemetry on interactive maps. Automated proximity geofence alerts notify parents 5-10 minutes prior to arrival.",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-amber-400" />,
      title: "Smart RFID / NFC I-Card Attendance",
      desc: "Contactless gate turnstile check-ins. Instant automated SMS and app alerts dispatched to parents within 0.4 seconds of tap.",
    },
    {
      icon: <Brain className="w-5 h-5 text-pink-400" />,
      title: "AI Personalized Learning Tools",
      desc: "Cognitive assessment engine detects learning gaps and generates customized remedial quizzes tailored to each student's pace.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
      title: "Admission CRM & Growth Engine",
      desc: "Automated enrollment lead capture, WhatsApp communication campaigns, and high-conversion landing pages for schools.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-transparent dark:bg-gradient-to-b dark:from-transparent dark:via-slate-950/40 dark:to-transparent">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4 border border-purple-500/30">
            <School className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Flagship EdTech Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Modern School –{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400">
              Complete Digital Campus
            </span>{" "}
            Ecosystem
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
            Eliminating fragmented registers, manual paperwork, and bus anxiety. Modern School bridges campus administration with future-ready intelligence across 15,000+ active students.
          </p>
        </div>

        {/* Hero Visual & Key Value Prop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative"
          >
            <CampusCockpitPreview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Why Modern Institutions Choose Modern School ERP
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal dark:font-light">
                Traditional schools suffer from disconnected software: an accounting software for fees, an Excel sheet for attendance, and WhatsApp groups for parent notices. Modern School replaces everything with a synchronized, offline-resilient architecture.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: "For School Management", desc: "10x faster fee auditing, automated admissions, and zero payroll errors." },
                { title: "For Teachers", desc: "Grade exams in clicks, publish homework, and track class attendance in under 15 seconds." },
                { title: "For Parents", desc: "Live bus GPS, instant arrival alerts, digital fee payment, and direct teacher chat." },
                { title: "For Students", desc: "Interactive AI study modules, digitized library, and performance leaderboards." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 shrink-0" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h5>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
              <Link href="/modern-school" className="w-full sm:w-auto">
                <GlassButton
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Explore Modern School Ecosystem
                </GlassButton>
              </Link>
              <Link href="/vidhyam" className="w-full sm:w-auto">
                <GlassButton
                  variant="secondary"
                  icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Launch Vidhyam AI OS
                </GlassButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 6 Technology Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <LiquidGlassCard
                glowColor="rgba(121, 40, 202, 0.15)"
                className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between hover:border-purple-500/50 dark:hover:border-purple-500/40 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Production Ready • 100% Reliable</span>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
