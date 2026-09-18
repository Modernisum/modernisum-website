"use client";

import React from "react";
import { Clock, ScanFace, Calendar, Utensils, Award, Bus, CheckCircle2 } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

const STEPS = [
  {
    time: "07:30 AM",
    title: "Gate Optical Ingress",
    subtitle: "Contactless Face AI at School Turnstiles",
    desc: "Students and teachers walk through turnstiles without stopping. High-speed neural edge cameras record attendance at 0.38 seconds per person. Parents receive instant WhatsApp arrival receipts.",
    icon: ScanFace,
    badge: "0.38s Scan Latency",
  },
  {
    time: "08:30 AM",
    title: "Autonomous Proxy Balancing",
    subtitle: "Real-time Timetable Engine",
    desc: "If any teacher is marked absent at morning gate check-in, the mathematical engine automatically calculates free faculty periods and reassigns substitute teachers with zero principal intervention.",
    icon: Calendar,
    badge: "Zero Roster Clashes",
  },
  {
    time: "11:30 AM",
    title: "Cashless Campus Digital Twin",
    subtitle: "RFID Mess & Library Checkpoints",
    desc: "Smart identity cards allow safe canteen purchases, medical room check-ins, and library book loans. Parents monitor daily nutritional logs and campus purchases from their mobile phone.",
    icon: Utensils,
    badge: "Cashless Campus",
  },
  {
    time: "01:30 PM",
    title: "Examination Telemetry",
    subtitle: "CBSE & ICSE Automated Marksheets",
    desc: "Teachers enter marks once via web or mobile app. Vidhyam computes co-scholastic rubrics, generates percentile bell-curves, and compiles official CBSE board-compliant report cards instantly.",
    icon: Award,
    badge: "CBSE Compliant",
  },
  {
    time: "03:30 PM",
    title: "Geofenced Fleet Departure",
    subtitle: "Real-Time Bus GPS & Parent Dispatch",
    desc: "As buses leave school premises, GPS beacons broadcast telemetry. Parents receive proximity WhatsApp alerts when the bus is 1 kilometer away from their home pickup stop.",
    icon: Bus,
    badge: "Parent GPS App",
  },
];

export function VidhyamWorkflow() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30">
          <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>A Typical Day Powered by Vidhyam</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          How Your Campus Operates on Autopilot
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
          From morning bus arrival to afternoon departure, administrative friction is resolved silently in milliseconds.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-10">
        {STEPS.map((step, idx) => {
          return (
            <div key={step.time} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[37px] sm:-left-[53px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-cyan-500 flex items-center justify-center text-cyan-600 dark:text-cyan-300 shadow-md dark:shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/30 group-hover:scale-125 transition-transform">
                <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
              </div>

              <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.2)" className="p-6 sm:p-7 border-slate-200/80 dark:border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-400/30">
                      {step.time}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 self-start sm:self-auto">
                    {step.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {step.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {step.desc}
                </p>
              </LiquidGlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
