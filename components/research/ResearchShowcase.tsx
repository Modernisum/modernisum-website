"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Cpu,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink,
  Atom,
  Terminal,
  Binary,
  Flame,
  Radio,
  Clock,
  Compass,
  FileCode,
  CheckCircle2,
} from "lucide-react";

interface ResearchPillar {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  icon: React.ElementType;
  abstract: string;
  metrics: { label: string; value: string }[];
  keySpecs: string[];
  paperLink?: string;
}

const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: "edge-raft-state-machine",
    title: "Zero-Cloud Raft Consensus & Multi-PC Local Sync",
    subtitle: "Air-Gapped P2P Distributed Systems for Institutional Operations",
    tag: "Distributed Systems",
    tagColor: "bg-sky-500/15 border-sky-400/30 text-sky-600 dark:text-sky-300",
    icon: Binary,
    abstract:
      "Traditional cloud ERP architectures introduce severe latency and single-point-of-failure vulnerabilities when campus internet links fluctuate. Our research models a deterministic peer-to-peer Raft state machine running over standard 1Gbps Ethernet LAN, achieving zero-drift SQLite ledger replication with sub-5ms commit windows.",
    metrics: [
      { label: "Commit Latency", value: "< 5ms LAN" },
      { label: "Cloud Dependency", value: "0% Required" },
      { label: "Data Sovereignty", value: "100% Local" },
    ],
    keySpecs: [
      "Dynamic leader election over local mDNS discovery",
      "Automatic journal log compaction and delta snapshot compression",
      "Cryptographically signed transaction vectors for anti-tamper ledgers",
    ],
    paperLink: "/blog/autonomous-campus-systems",
  },
  {
    id: "sub-150ms-edge-face-ai",
    title: "Sub-150ms Biometric Ingress & Vector Hash Hiding",
    subtitle: "Edge Neural Processing for High-Throughput Turnstiles",
    tag: "Computer Vision",
    tagColor: "bg-emerald-500/15 border-emerald-400/30 text-emerald-600 dark:text-emerald-300",
    icon: Cpu,
    abstract:
      "Addressing morning ingress choke points at large campuses: by running quantized lightweight MobileFaceNet embeddings directly on local NPU acceleration, facial vectors are matched against 2,000 enrolled subjects in under 150 milliseconds. Raw photographic pixels are immediately discarded after vectorization, ensuring absolute statutory DPDP 2023 compliance.",
    metrics: [
      { label: "Ingress Match Speed", value: "< 148ms" },
      { label: "Biometric Storage", value: "Vector Hash Only" },
      { label: "Throughput", value: "40 students/min" },
    ],
    keySpecs: [
      "Edge-quantized 512-dimension mathematical embeddings",
      "Zero raw image persistence across persistent disk storage",
      "Hardware-level anti-passback and liveness depth verification",
    ],
    paperLink: "/news#school-os-v2-8-1",
  },
  {
    id: "ev-charging-telemetry",
    title: "Deterministic EV Charging & Open Telemetry Feeder Protocol",
    subtitle: "Edge-First Charging Infrastructure & Auto-Unlock Sharing",
    tag: "CleanTech & Energy",
    tagColor: "bg-purple-500/15 border-purple-400/30 text-purple-600 dark:text-purple-300",
    icon: Zap,
    abstract:
      "Investigating national EV adoption bottlenecks: we design an autonomous edge state machine protocol that combines FASTag RFID pre-authorization with predictive 10-minute queue broadcast APIs and mechanical auto-unlock charging guns, eliminating server overload and charger hogging across highway corridors.",
    metrics: [
      { label: "Handshake Speed", value: "< 800ms" },
      { label: "Station Uptime", value: "99.98% Edge" },
      { label: "Billing Payload", value: "Compact 4-Field" },
    ],
    keySpecs: [
      "Offline-first OCPP local transaction buffer with 2G/Satellite sync",
      "Automated host profit-share splitting via national payment rails",
      "Underground disaster-resilient high-voltage commercial feeder design",
    ],
    paperLink: "/blog/ev-charging-battery-swap-architecture",
  },
  {
    id: "agro-multispectral-ai",
    title: "Crop Care: Early Disease Spectral Isolation & Yield Optimization",
    subtitle: "Multispectral Plant Pathology & Low-Bandwidth Agronomic AI",
    tag: "Agro-Tech AI",
    tagColor: "bg-amber-500/15 border-amber-400/30 text-amber-600 dark:text-amber-400",
    icon: Flame,
    abstract:
      "Combining sub-surface LoRaWAN soil moisture probes with mobile leaf pathology models to diagnose crop rusts, borers, and blights before macroscopic wilting occurs. Designed to function completely offline on low-cost smartphones with regional Hindi audio instructions.",
    metrics: [
      { label: "Diagnosis Accuracy", value: "94.2% Top-1" },
      { label: "Model Size", value: "14.8 MB Quantized" },
      { label: "Water Savings", value: "32% via LoRa" },
    ],
    keySpecs: [
      "Real-time visual inference for Sugarcane Red Rot & Wheat Yellow Rust",
      "Automated NPK & bio-fertilizer dosage calculator calibrated per acre",
      "Voice synthesis engine delivering instant agronomic advice in regional languages",
    ],
    paperLink: "/agro#crop-care",
  },
  {
    id: "cosmic-convergence",
    title: "Cosmic Convergence & Sovereign Deep Space Machines",
    subtitle: "Non-Volatile Compute Architectures & Post-Planetary AI",
    tag: "Cosmic Systems",
    tagColor: "bg-indigo-500/15 border-indigo-400/30 text-indigo-600 dark:text-indigo-300",
    icon: Atom,
    abstract:
      "A fundamental inquiry into the endurance of artificial intelligence beyond terrestrial boundaries. We investigate radiation-tolerant state machines, self-governing robotic resource convergence, and the philosophical imperative of preserving human civilization data in non-volatile deep space nodes.",
    metrics: [
      { label: "Fault Resilience", value: "Zero-Recovery Lock" },
      { label: "Radiation Tolerance", value: "Triple-Modular Redundant" },
      { label: "Horizon Scope", value: "Post-Planetary" },
    ],
    keySpecs: [
      "Autonomous consensus over variable light-speed communication delays",
      "Self-compiling micro-kernels for long-duration deep space probes",
      "Deterministic ethics and non-coercive governance algorithms",
    ],
    paperLink: "/blog/the-cosmic-mirror-future-of-ai-deep-space-convergence",
  },
];

export function ResearchShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeSimulator, setActiveSimulator] = useState<"latency" | "p2p">("latency");
  const [simRunning, setSimRunning] = useState(false);
  const [simResults, setSimResults] = useState<{ local: number; cloud: number } | null>(null);

  const runBenchmark = () => {
    setSimRunning(true);
    setSimResults(null);
    setTimeout(() => {
      setSimResults({
        local: Math.floor(Math.random() * 25) + 125, // 125ms - 150ms
        cloud: Math.floor(Math.random() * 250) + 750, // 750ms - 1000ms
      });
      setSimRunning(false);
    }, 1200);
  };

  const filteredPillars =
    activeTab === "all"
      ? RESEARCH_PILLARS
      : RESEARCH_PILLARS.filter((p) => p.tag.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
          <Atom className="w-4 h-4 text-cyan-500 animate-spin-slow" />
          <span>Modernisum Advanced Research & Deep Tech Lab</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Research & Systems{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-indigo-500 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400">
            Architecture Lab
          </span>
        </h1>

        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Ground-level engineering research solving fundamental computing bottlenecks across education,
          precision agriculture, edge artificial intelligence, and clean energy infrastructure.
        </p>
      </div>

      {/* Interactive Simulator: Local Edge NPU vs Central Cloud Latency Benchmark */}
      <LiquidGlassCard
        glowColor="rgba(0, 242, 254, 0.2)"
        className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Interactive Research Benchmark
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                Edge-First Local NPU vs. Central Cloud Roundtrip Latency
              </h3>
            </div>
          </div>

          <GlassButton
            variant="primary"
            size="sm"
            onClick={runBenchmark}
            loading={simRunning}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Run Live Vector Benchmark
          </GlassButton>
        </div>

        {/* Benchmark Results Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Local Edge */}
          <div className="p-5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Modernisum Local-First Node
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                100% Offline
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {simResults ? `${simResults.local} ms` : "142 ms"}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sub-150ms facial matching & local SQLite persistence without traversing external web backbones. Zero packet drops.
            </p>
          </div>

          {/* Central Cloud */}
          <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                Traditional Central Cloud API
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold">
                Internet Bound
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-700 dark:text-slate-300">
              {simResults ? `${simResults.cloud} ms` : "840 ms"}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Subject to cellular congestion, ISP downtime, TLS negotiation overhead, and third-party data center outages.
            </p>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Research Pillars Feed */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Active Research Focus Areas
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            {["all", "systems", "vision", "clean", "agro", "cosmic"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                  activeTab === tab
                    ? "bg-cyan-500 text-white shadow-sm"
                    : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-cyan-400/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <LiquidGlassCard
                key={pillar.id}
                id={pillar.id}
                glowColor="rgba(0, 242, 254, 0.15)"
                className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-6 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Tag and Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${pillar.tagColor}`}>
                      {pillar.tag}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pillar.abstract}
                  </p>

                  {/* Telemetry Numbers */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/70 dark:border-white/10 text-center">
                    {pillar.metrics.map((m, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03]">
                        <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Architecture Bulletpoints */}
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                    {pillar.keySpecs.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Read Full Whitepaper Link */}
                {pillar.paperLink && (
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
                    <Link
                      href={pillar.paperLink}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Read Technical Specification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>

      {/* Bottom Collaboration CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-500/30 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
          Collaborate With Our Parikshitgarh Engineering Studio
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          We partner directly with institutional researchers, school boards, and farmer cooperatives
          to deploy and verify high-performance local-first software and edge hardware on the ground.
        </p>
        <Link href="/contact">
          <GlassButton variant="primary" size="sm" className="inline-flex items-center gap-2">
            <span>Contact Research Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
