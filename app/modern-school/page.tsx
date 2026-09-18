import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { CampusCockpitPreview } from "@/components/home/CampusCockpitPreview";
import {
  School,
  Monitor,
  Smartphone,
  Navigation,
  CreditCard,
  Brain,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Activity,
  Users,
  Building,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Modern School ERP Ecosystem | Complete Digital Campus Management",
  description:
    "Flagship school management platform: Desktop Admin Suite, Parent/Teacher Mobile Apps, Real-Time GPS Bus Tracking, and Contactless RFID Attendance.",
};

export default function ModernSchoolPage() {
  const ecosystemModules = [
    {
      icon: <Monitor className="w-6 h-6 text-cyan-400" />,
      title: "Desktop & Cloud Admin Suite",
      desc: "Offline-first administrative cockpit built with Flutter Desktop and SQLite. Reconciles complex fee installments, generates CBSE/ICSE report cards, and handles staff biometric payroll without internet bottlenecks.",
      badges: ["Offline SQLite", "Thermal Receipt Printer Driver", "Cloud Auto-Sync"],
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-400" />,
      title: "Triple Native Mobile Apps",
      desc: "Dedicated Android and iOS applications for Parents, Teachers, and Students. Features real-time fee payment gateway, homework attachments, circulars, and instant teacher-parent chat.",
      badges: ["Flutter Native", "Push Notifications", "Biometric Login"],
    },
    {
      icon: <Navigation className="w-6 h-6 text-emerald-400" />,
      title: "Live GPS Bus Fleet Telemetry",
      desc: "Sub-second GPS vehicle tracking streaming live telemetry over WebSockets. Automated geofence triggers dispatch push notifications to parents 5-10 minutes prior to pickup or drop.",
      badges: ["< 250ms Latency", "Driver Speed Alarms", "Geofence Alerts"],
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-400" />,
      title: "Smart RFID / NFC I-Card Attendance",
      desc: "Turnstile contactless student check-in. Students tap their smart school ID card and parents receive automated SMS and app alerts within 0.4 seconds of arrival and departure.",
      badges: ["0.4s Tap Speed", "Instant SMS Gateway", "Automated Defaulter List"],
    },
    {
      icon: <Brain className="w-6 h-6 text-pink-400" />,
      title: "AI Personalized Learning Tools",
      desc: "Adaptive question generation engine that analyzes classroom test results to isolate conceptual weaknesses and produce customized revision worksheets for each student.",
      badges: ["Adaptive Quizzes", "Weakness Heatmaps", "Gamified Study"],
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      title: "Admissions CRM & Growth Pipeline",
      desc: "Capture inquiry leads from website and social campaigns. Automated WhatsApp follow-up workflows convert inquiries into verified campus enrollments.",
      badges: ["WhatsApp Automation", "Inquiry Pipeline", "Fee Forecasting"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-purple-700 dark:text-purple-300 mb-6 border border-purple-500/30">
              <School className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Transforming Campus Operations Since 2024</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight max-w-5xl mx-auto">
              Modern School –{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400">
                The Intelligent Operating System
              </span>{" "}
              for Forward-Thinking Institutions
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-700 dark:text-slate-300 font-normal dark:font-light max-w-3xl mx-auto leading-relaxed">
              One unified digital ecosystem integrating Desktop Admin, Native Mobile Apps, Real-Time GPS Fleet Tracking, and RFID Attendance for over 15,000+ active students.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?service=Modern%20School%20ERP">
                <GlassButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Book Interactive Campus Demo
                </GlassButton>
              </Link>
              <Link href="/vidhyam">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
                >
                  Explore Vidhyam AI OS
                </GlassButton>
              </Link>
              <a href="tel:+919368671007">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  icon={<PhoneCall className="w-4 h-4 text-cyan-400" />}
                >
                  +91 9368671007
                </GlassButton>
              </a>
            </div>

            {/* Metrics Strip */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Students Powered", val: "15,000+" },
                { label: "RFID Scan Speed", val: "< 0.4s" },
                { label: "Bus Fleet Tracked", val: "120+ Buses" },
                { label: "Admin Time Saved", val: "80%" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center"
                >
                  <span className="block text-2xl sm:text-3xl font-bold font-display text-cyan-600 dark:text-cyan-300">
                    {m.val}
                  </span>
                  <span className="block text-xs text-slate-600 dark:text-slate-400 mt-1 font-mono">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Big Preview Cockpit Card */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <CampusCockpitPreview />
        </section>

        {/* 6 Core Modules Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Six Interlocking Pillars of the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
                Modern School Ecosystem
              </span>
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              Each module functions seamlessly as an independent tool or synchronized into the complete campus network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemModules.map((mod, idx) => (
              <LiquidGlassCard
                key={idx}
                glowColor="rgba(121, 40, 202, 0.15)"
                className="p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between hover:border-purple-500/50 dark:hover:border-purple-500/40 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {mod.icon}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed mb-6">
                    {mod.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/80 dark:border-white/5">
                  {mod.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-700 dark:text-cyan-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </section>

        {/* Vidhyam AI OS Next-Gen Platform Bridge */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.25)"
            className="p-8 sm:p-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-purple-600/10"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-500/15 dark:bg-cyan-500/10 border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Next-Gen Autonomous AI Platform</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                  Looking for AI Face Recognition & WhatsApp Fees?
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed">
                  Discover <strong>Vidhyam School OS</strong> — our optical turnstile gate telemetry, WhatsApp automated fee collection, and autonomous constraint-based timetable engine engineered specifically for premier CBSE & ICSE campuses.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link href="/vidhyam">
                  <GlassButton variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Explore Vidhyam OS
                  </GlassButton>
                </Link>
                <Link href="/vidhyam/pricing">
                  <GlassButton variant="secondary" size="lg">
                    Calculate ROI
                  </GlassButton>
                </Link>
              </div>
            </div>
          </LiquidGlassCard>
        </section>

        {/* Benefits Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.12)"
            className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-white/10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white text-center mb-8">
              The Modern School Transformation Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-500/20 space-y-3">
                <h4 className="text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <span>❌ Traditional School Operations</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>• Manual paper registers prone to loss & proxy marking</li>
                  <li>• Anxious parents constantly calling school regarding bus delays</li>
                  <li>• Disconnected fee spreadsheets causing billing discrepancies</li>
                  <li>• Slow, manual exam report card generation taking weeks</li>
                  <li>• Zero offline capability if internet goes down</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <span>✅ With Modern School ERP</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <li>• Instant 0.4s RFID contactless check-in with auto SMS</li>
                  <li>• Sub-second GPS bus tracking with 5-minute arrival alerts</li>
                  <li>• Automated digital fee gateway with instant PDF receipts</li>
                  <li>• 1-click automated CBSE/ICSE report card compilation</li>
                  <li>• 100% offline-first desktop resilience with auto cloud sync</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/contact?service=Modern%20School%20ERP">
                <GlassButton variant="primary" size="lg">
                  Request Custom Campus Quotation
                </GlassButton>
              </Link>
            </div>
          </LiquidGlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
