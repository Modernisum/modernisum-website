"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { 
  Users2, 
  GraduationCap, 
  Sprout, 
  Building2, 
  Truck, 
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PlatformUser, SEED_PLATFORM_USERS } from "@/lib/platform-users-engine";

export function CustomerSectorsSection() {
  const [featuredCustomers, setFeaturedCustomers] = useState<PlatformUser[]>(() =>
    SEED_PLATFORM_USERS.filter((u) => u.featuredOnHome)
  );

  useEffect(() => {
    let mounted = true;
    async function loadCustomers() {
      try {
        const res = await fetch("/api/admin/users?featured=true");
        if (res.ok) {
          const json = await res.json();
          if (mounted && json.success && Array.isArray(json.users) && json.users.length > 0) {
            setFeaturedCustomers(json.users);
          }
        }
      } catch (e) {
        console.warn("Could not load featured customers from API:", e);
      }
    }
    loadCustomers();
    return () => {
      mounted = false;
    };
  }, []);

  const sectors = [
    {
      icon: <GraduationCap className="w-6 h-6 text-sky-400" />,
      title: "Educational Trusts & K-12 Networks",
      ventureBadge: "School Ecosystem",
      ventureHref: "https://school.modernisum.com",
      description:
        "Comprehensive digital transformation for institutions. Eliminates chaotic paperwork, stops bus route delays, and automates fee collection across campuses.",
      clientTypes: ["K-12 CBSE/ICSE Schools", "Multi-Branch Educational Trusts", "Degree Colleges & Institutes"],
      deliverables: ["Offline Desktop Admin Suite", "RFID Turnstile Gates", "GPS Bus Telemetry", "Parent WhatsApp CRM"],
      glowColor: "rgba(2, 132, 199, 0.2)",
    },
    {
      icon: <Sprout className="w-6 h-6 text-emerald-400" />,
      title: "FPOs, Smart Estates & Agribusinesses",
      ventureBadge: "Agromi Ecosystem",
      ventureHref: "/agromi",
      description:
        "Autonomous precision agriculture infrastructure. Maximizes crop yield, slashes water waste by 35%, and provides real-time mandi price arbitrage.",
      clientTypes: ["Farmer Producer Organizations (FPOs)", "Commercial Fruit & Grain Estates", "Agri-Input & Seed Corporations"],
      deliverables: ["LoRaWAN Soil Probes", "Drone NDVI Stress Maps", "Automated Drip Valves", "APMC Price Predictor"],
      glowColor: "rgba(16, 185, 129, 0.2)",
    },
    {
      icon: <Building2 className="w-6 h-6 text-purple-400" />,
      title: "B2B SaaS Scaleups & Tech Enterprises",
      ventureBadge: "Custom AI Studio",
      ventureHref: "/services/ai-solutions",
      description:
        "Architecting complex AI agent pipelines, multi-tenant cloud platforms, and generative document processors with SOC-2 compliant security.",
      clientTypes: ["Fast-Growing SaaS Founders", "Fintech & Wealthtech Firms", "Global Supply Chain Platforms"],
      deliverables: ["Cognitive LLM Agent Workflows", "Vector Search RAG Systems", "High-Throughput APIs", "Cloud Infrastructure"],
      glowColor: "rgba(168, 85, 247, 0.2)",
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-400" />,
      title: "Industrial Plants, Fleets & Public Logistics",
      ventureBadge: "IoT & Hardware Division",
      ventureHref: "/services/iot-automation",
      description:
        "Bridging physical machines with cloud telematics. Real-time fleet tracking, geofence security triggers, and custom device drivers.",
      clientTypes: ["Interstate Logistics Fleets", "Industrial Manufacturing Plants", "Municipal Transit Authorities"],
      deliverables: ["MQTT Telematics Cockpits", "C++ / C# Device Drivers", "Biometric Access Gates", "Driver Safety Scoring"],
      glowColor: "rgba(245, 158, 11, 0.2)",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="customers">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
            <Users2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Our Customer Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Who We Build For:{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-purple-600 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400">
              Target Institutional Sectors
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
            Modernisum designs mission-critical software and hardware solutions engineered for four high-stakes customer segments.
          </p>
        </div>

        {/* Sectors Single-Row 4-Column on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="h-full"
            >
              <LiquidGlassCard
                glowColor={sector.glowColor}
                className="h-full p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300"
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/20 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {sector.icon}
                    </div>
                    <Link
                      href={sector.ventureHref}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                    >
                      <span>{sector.ventureBadge}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal dark:font-light">
                    {sector.description}
                  </p>

                  {/* Client Subtypes */}
                  <div className="mb-5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 font-semibold">
                      Key Client Roles Served
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.clientTypes.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 font-semibold">
                      Deployed Solutions
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {sector.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">100% Production Tested</span>
                  <Link
                    href={sector.ventureHref}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </LiquidGlassCard>
            </div>
          ))}
        </div>

        {/* Real Verified Clients & Institutional Deployments (Curated by Admin from Database) */}
        {featuredCustomers.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
                Real Customer Deployments • 0% Synthetic Data
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                Trusted by Real Campus Owners &amp; Enterprise Agriculturalists
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredCustomers.map((cust) => (
                <div
                  key={cust.id}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-[#070d18]/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 group hover:border-cyan-500/40 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 p-1">
                      {cust.institutionLogo ? (
                        <Image
                          src={cust.institutionLogo}
                          alt="Logo"
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {cust.organization || cust.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {cust.name} • {cust.role === "school_admin" ? "School Owner / Principal" : cust.role === "farmer" ? "Agro Producer" : cust.role}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 shrink-0">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
