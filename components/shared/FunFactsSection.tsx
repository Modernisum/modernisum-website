"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { CheckCircle, Users, Code, Award, Activity } from "lucide-react";

interface FunFactsProps {
  stats?: {
    projectsCompleted: number;
    satisfiedClients: number;
    itSpecialists: number;
    smartSolutions: number;
    systemUptime: string;
  };
}

export function FunFactsSection({ stats }: FunFactsProps) {
  const [data, setData] = useState(
    stats || {
      projectsCompleted: 128,
      satisfiedClients: 85,
      itSpecialists: 24,
      smartSolutions: 42,
      systemUptime: "99.98%",
    }
  );

  useEffect(() => {
    let mounted = true;
    async function loadLiveTelemetry() {
      try {
        const res = await fetch("/api/admin/telemetry");
        if (res.ok) {
          const json = await res.json();
          if (mounted && json.success && json.data) {
            setData(json.data);
          }
        }
      } catch (e) {
        // Use server provided stats
      }
    }
    loadLiveTelemetry();
    return () => {
      mounted = false;
    };
  }, []);

  const kpis = [
    {
      icon: <CheckCircle className="w-6 h-6 text-cyan-400" />,
      value: `${data.projectsCompleted}+`,
      label: "Software Deliverables",
      desc: "Cross-platform enterprise apps shipped",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      value: `${data.satisfiedClients}+`,
      label: "Institutional Clients",
      desc: "Schools, logistics & tech enterprises",
    },
    {
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      value: `${data.itSpecialists}+`,
      label: "Engineers & Architects",
      desc: "Fullstack, mobile & AI specialists",
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      value: `${data.smartSolutions}+`,
      label: "Smart AI Modules",
      desc: "Autonomous workflow pipelines active",
    },
    {
      icon: <Activity className="w-6 h-6 text-pink-400" />,
      value: data.systemUptime,
      label: "Infrastructure Uptime",
      desc: "Zero single point of failure guarantee",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.1)"
          className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-cyan-50/50 via-white/80 to-purple-50/50 dark:from-cyan-950/20 dark:via-black/40 dark:to-purple-950/20 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {kpis.map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/20 dark:border-white/15 flex items-center justify-center mb-3">
                  {kpi.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300 mt-1">
                  {kpi.label}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-normal dark:font-light max-w-[140px]">
                  {kpi.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
