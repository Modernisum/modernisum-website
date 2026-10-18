"use client";

import React from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  MapPin,
  Mail,
  Phone,
  Code2,
  Cpu,
  Zap,
  Target,
  GraduationCap,
  Sprout,
  HeartHandshake,
  ArrowRight,
  Wifi,
  Droplets,
  TrendingUp,
} from "lucide-react";

export interface AboutSectionProps {
  variant?: "modernisum" | "school" | "vidhyam" | "agromi" | "farmer";
}

export function AboutSection({ variant = "modernisum" }: AboutSectionProps) {
  const content = {
    modernisum: {
      badgeIcon: GraduationCap,
      badgeText: "Flagship Platform: school.modernisum.com",
      badgeColor: "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      accentGlow: "rgba(0, 242, 254, 0.15)",
      accentText: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400",
      title: "Autonomous School Management Systems",
      subtitle:
        "Modernisum engineers high-performance School Management Systems for modern campuses. Our flagship operating platform, school.modernisum.com, delivers offline-first reliability, contactless attendance, and complete administrative automation.",
      narrativeTitle: "Why We Build For Schools",
      narrative:
        "School administrators and faculty spend too much time on paperwork, manual registers, fee calculations, and fragmented portals. We built school.modernisum.com to automate major daily campus operations with zero internet dependence, zero recurring vendor lock-in, and total campus control.",
      pillars: [
        {
          icon: Zap,
          title: "Offline-First Multi-PC LAN",
          desc: "Full school administration continues seamlessly even during internet blackouts with instant local network sync.",
        },
        {
          icon: ShieldCheck,
          title: "Double-Entry Fee Ledgers",
          desc: "Flawless student fee collection, zero bank reconciliation drift, automated WhatsApp receipts, and thermal POS printing.",
        },
        {
          icon: Cpu,
          title: "Sub-Second Attendance Automation",
          desc: "0.38s RFID and face recognition turnstile integrations with instant parent departure alerts and bus fleet GPS.",
        },
        {
          icon: Target,
          title: "Sovereign Campus Data Privacy",
          desc: "100% Indian data sovereignty, DPDP 2023 compliance, and automated U-DISE+ and board compliance reports.",
        },
      ],
      metrics: [
        { label: "Campuses Powered", value: "150+" },
        { label: "Students Managed", value: "85K+" },
        { label: "Faculty Empowered", value: "4,200+" },
        { label: "Routine Operations", value: "Automated" },
      ],
      leadership: [
        {
          name: "Shivank & Modernisum Core",
          role: "Lead Systems Architect & Technology Director",
          bio: "Architects school.modernisum.com and cross-platform offline engines for high-concurrency school operations.",
        },
        {
          name: "School Systems Engineering Guild",
          role: "Academic Portals & Examination Engines",
          bio: "Specialists in student information systems, automated report card generation, and CBSE/ICSE compliance pipelines.",
        },
        {
          name: "Campus Hardware & IoT Guild",
          role: "Turnstiles, RFID & Fleet Telemetry",
          bio: "Engineers sub-second gate turnstile relays, contactless attendance hardware, and live school bus GPS tracking.",
        },
      ],
      headquarters: {
        title: "School Management System Headquarters",
        address: "Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406",
        email: "contact@modernisum.com",
        phone: "+91 9368671007",
        ctaText: "Launch school.modernisum.com",
        ctaHref: "https://school.modernisum.com",
      },
    },
    vidhyam: {
      badgeIcon: GraduationCap,
      badgeText: "Our Vision & Heritage",
      badgeColor: "text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10",
      accentGlow: "rgba(56, 189, 248, 0.15)",
      accentText: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 dark:from-cyan-400 dark:via-sky-400 dark:to-indigo-300",
      title: "Liberating Educational Leadership",
      subtitle:
        "We believe schools should be vibrant centers of human curiosity and growth—not paperwork factories consumed by clerical drudgery.",
      narrativeTitle: "The Autonomous Campus Mission",
      narrative:
        "Indian school principals and teachers spend an average of 42% of their working hours on attendance registers, diary notices, marksheet calculations, and fee chits. Modernisum School automates this completely, giving educators their focus back to students.",
      pillars: [
        {
          icon: Target,
          title: "Major Workload Automation",
          desc: "Automates attendance, fee collection, report card generation, and compliance rosters in one unified platform.",
        },
        {
          icon: Cpu,
          title: "Mathematical Optimization",
          desc: "Timetable scheduling, proxy allocations, and fee accounting are handled deterministically in milliseconds.",
        },
        {
          icon: ShieldCheck,
          title: "Indian Data Sovereignty",
          desc: "AES-256 encrypted telemetry hosted strictly within certified Indian data centers. Compliant with DPDP 2023.",
        },
        {
          icon: HeartHandshake,
          title: "Campus Empathy & Zero Friction",
          desc: "Designed so effortlessly that gatekeepers, bus staff, and faculty adopt it with zero multi-week training.",
        },
      ],
      metrics: [
        { label: "Active Campuses", value: "150+" },
        { label: "Students Managed", value: "85K+" },
        { label: "Faculty Empowered", value: "4,200+" },
        { label: "CBSE / ICSE Compliance", value: "100%" },
      ],
      leadership: [
        {
          name: "Modernisum School Core Lab",
          role: "School OS Architecture Team",
          bio: "Specialists in K-12 operational software, offline-first desktop sandboxes, and automated CBSE/ICSE grading pipelines.",
        },
        {
          name: "Campus Security Guild",
          role: "Biometric & Turnstile Engineering",
          bio: "Builds tamper-proof face AI recognition, gate turnstile relays, and GPS bus transport tracking systems.",
        },
        {
          name: "Parent Telemetry Desk",
          role: "Instant WhatsApp & Mobile Systems",
          bio: "Delivers direct WhatsApp fee collection, automated instant report cards, and parent communication channels.",
        },
      ],
      headquarters: {
        title: "Modernisum School Solutions Desk",
        address: "Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406",
        email: "contact@modernisum.com",
        phone: "+91 9368671007",
        ctaText: "Book Campus Demonstration",
        ctaHref: "/contact",
      },
    },
    agromi: {
      badgeIcon: Sprout,
      badgeText: "A Modernisum Technology Venture",
      badgeColor: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      accentGlow: "rgba(16, 185, 129, 0.15)",
      accentText: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300",
      title: "Engineering the Digital Soul of Modern Agriculture",
      subtitle:
        "Agromi was born from a fundamental observation: Indian agricultural soil is rich, but farmers are forced to fly blind without root-level telemetry. We set out to change that.",
      narrativeTitle: "Root-Level Telemetry & Precision Farming",
      narrative:
        "Modern farming requires real-time data from beneath the soil and above the canopy. Agromi unifies long-range LoRaWAN sub-surface sensors, multispectral drone imagery, and automated solar irrigation into an intuitive operating system.",
      pillars: [
        {
          icon: Wifi,
          title: "Precision LoRaWAN Telemetry",
          desc: "Sub-surface soil moisture, EC salinity, and NPK probes transmitting up to 15km without cellular dependence.",
        },
        {
          icon: Cpu,
          title: "Multispectral Drone NDVI",
          desc: "Detects crop stress, fungal blights, and nutrient starvation up to 10 days before visible symptoms appear.",
        },
        {
          icon: Droplets,
          title: "Automated Solar Irrigation",
          desc: "Actuates solenoid valves and pump starters precisely when root moisture hits mathematical thresholds.",
        },
        {
          icon: TrendingUp,
          title: "Predictive Mandi Intelligence",
          desc: "Machine learning models forecasting commodity price fluctuations to optimize harvesting windows.",
        },
      ],
      metrics: [
        { label: "Acreage Monitored", value: "12,000+" },
        { label: "Water Conserved", value: "35%" },
        { label: "Yield Increase", value: "+28%" },
        { label: "Wireless Range", value: "15 km" },
      ],
      leadership: [
        {
          name: "Agromi Soil & Hardware Lab",
          role: "LoRaWAN & Sensor Systems",
          bio: "Engineers hermetically sealed IP68 agricultural probes and micro-solar energy harvesting controllers.",
        },
        {
          name: "Aerial Spectral Research",
          role: "Drone Orthomosaic & NDVI AI",
          bio: "Develops automated aerial mission grids and computer vision pipelines for early disease detection.",
        },
        {
          name: "Agricultural Economics Group",
          role: "Mandi Price Forecasting",
          bio: "Builds time-series neural networks tracking APMC mandi price dynamics across Northern and Western India.",
        },
      ],
      headquarters: {
        title: "Agromi Western UP Field Lab",
        address: "Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406",
        email: "agromi@modernisum.com",
        phone: "+91 9368671007",
        ctaText: "Schedule On-Site Farm Pilot",
        ctaHref: "/mod-farmer/contact",
      },
    },
  };

  const data =
    variant === "school" || variant === "vidhyam"
      ? content.vidhyam
      : variant === "farmer" || variant === "agromi"
      ? content.agromi
      : content[variant as keyof typeof content] || content.modernisum;
  const BadgeIcon = data.badgeIcon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 border ${data.badgeColor}`}
        >
          <BadgeIcon className="w-3.5 h-3.5" />
          <span>{data.badgeText}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          {data.title}
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal dark:font-light">
          {data.subtitle}
        </p>
      </div>

      {/* 2. Philosophy Narrative Bento Card */}
      <LiquidGlassCard
        glowColor={data.accentGlow}
        className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-white/10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className={`text-2xl sm:text-3xl font-bold font-display ${data.accentText}`}>
            {data.narrativeTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
            {data.narrative}
          </p>
        </div>
      </LiquidGlassCard>

      {/* 3. Core Pillars Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Architectural Principles
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Engineered from first principles for reliability, security, and zero operational drag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <LiquidGlassCard
                key={idx}
                glowColor={data.accentGlow}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-white/10 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
                  <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>

      {/* 4. Live Telemetry Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.metrics.map((metric, idx) => (
          <LiquidGlassCard
            key={idx}
            glowColor={data.accentGlow}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 text-center"
          >
            <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
              {metric.value}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
              {metric.label}
            </div>
          </LiquidGlassCard>
        ))}
      </div>

      {/* 5. Leadership & Engineering Guilds */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Engineering Guilds
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            The specialized builders behind our platforms and mission-critical codebases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.leadership.map((member, idx) => (
            <LiquidGlassCard
              key={idx}
              glowColor={data.accentGlow}
              className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 text-cyan-600 dark:text-cyan-400 font-bold border border-slate-200 dark:border-white/10">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>

      {/* 6. Headquarters & Direct Access Card */}
      <LiquidGlassCard
        glowColor={data.accentGlow}
        className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <MapPin className="w-4 h-4" />
            <span>Headquarters & Labs</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            {data.headquarters.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {data.headquarters.address}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              {data.headquarters.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              {data.headquarters.phone}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <Link href={data.headquarters.ctaHref}>
            <GlassButton variant="primary" size="lg" className="flex items-center gap-2">
              <span>{data.headquarters.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
          </Link>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
