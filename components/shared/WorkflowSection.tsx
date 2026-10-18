"use client";

import React from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Compass, 
  Database, 
  Cpu, 
  Rocket, 
  Sparkles,
  Layers,
  Clock, 
  ScanFace, 
  Calendar, 
  Utensils, 
  Award, 
  Bus,
  MapPin, 
  Wifi, 
  Eye, 
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export interface WorkflowSectionProps {
  variant?: "modernisum" | "school" | "vidhyam" | "agromi" | "farmer";
}

export function WorkflowSection({ variant = "modernisum" }: WorkflowSectionProps) {
  const { isHindi } = useLanguage();

  // ==========================================
  // VARIANT: AGROMI / FARMER
  // ==========================================
  if (variant === "agromi" || variant === "farmer") {
    const steps = [
      {
        num: "01",
        title: "Field Survey & Probe Implantation",
        tagline: "Root-depth sensor deployment",
        desc: "Our field engineers map crop quadrants and insert solar LoRaWAN probes at 10cm, 25cm, and 50cm sub-surface depths to measure active root transpiration.",
        icon: <MapPin className="w-6 h-6 text-emerald-400" />,
      },
      {
        num: "02",
        title: "Mesh Activation & Soil Calibration",
        tagline: "15km solar gateway link",
        desc: "The field gateway pairs with probes over long-range LoRaWAN. AI automatically calibrates against local soil texture (alluvial, clay loam, or black soil) in minutes.",
        icon: <Wifi className="w-6 h-6 text-teal-400" />,
      },
      {
        num: "03",
        title: "Drone AI & Closed-Loop Irrigation",
        tagline: "Multispectral scans & valve actuation",
        desc: "Weekly drone flights generate NDVI canopy health heatmaps while edge relays actuate solar drip valves precisely when root moisture tension demands water.",
        icon: <Eye className="w-6 h-6 text-cyan-400" />,
      },
      {
        num: "04",
        title: "Harvest Timing & Mandi Arbitrage",
        tagline: "Peak price APMC realization",
        desc: "Our machine learning engine tracks prices across 50+ regional mandis, advising farm managers on the exact 48-hour window to harvest and sell for maximum return.",
        icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      },
    ];

    return (
      <section className="py-24 relative overflow-hidden bg-slate-50/40 dark:bg-black/40 border-y border-emerald-500/20" id="workflow">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>The Agromi Deployment Cycle</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              How It Works:{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-400">
                Precision Farming from Probe to Profit
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
              A four-stage operational loop turning real-time root telemetry and aerial spectral imaging into higher yields and optimal mandi realization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <LiquidGlassCard
                  glowColor="rgba(16, 185, 129, 0.15)"
                  className="h-full p-6 rounded-3xl border border-emerald-500/20 dark:border-white/10 flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-white/5 border border-emerald-500/20 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {st.icon}
                      </div>
                      <span className="text-2xl font-black font-mono text-emerald-600/40 dark:text-emerald-400/40">
                        {st.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
                      {st.title}
                    </h3>
                    <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-3">
                      {st.tagline}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Stage {st.num} Verified</span>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // VARIANT: SCHOOL OS
  // ==========================================
  if (variant === "school" || variant === "vidhyam") {
    const vidhyamSteps = [
      {
        time: "07:30 AM",
        title: isHindi ? "गेट पर ऑप्टिकल एंट्री" : "Gate Optical Ingress",
        subtitle: isHindi ? "टर्नस्टाइल पर कॉन्टैक्टलेस फेस AI" : "Contactless Face AI at School Turnstiles",
        desc: isHindi
          ? "छात्र व शिक्षक बिना रुके गेट से निकलते हैं। 0.38 सेकंड में हाजिरी दर्ज होती है और माता-पिता को तुरंत व्हाट्सएप पर सुरक्षित आगमन की सूचना मिलती है।"
          : "Students and teachers walk through turnstiles without stopping. High-speed neural edge cameras record attendance at 0.38 seconds per person. Parents receive instant WhatsApp arrival receipts.",
        icon: ScanFace,
        badge: isHindi ? "0.38s स्कैन स्पीड" : "0.38s Scan Latency",
      },
      {
        time: "08:30 AM",
        title: isHindi ? "ऑटोमैटिक प्रॉक्सी आवंटन" : "Autonomous Proxy Balancing",
        subtitle: isHindi ? "रियल-टाइम टाइमटेबल इंजन" : "Real-time Timetable Engine",
        desc: isHindi
          ? "सुबह किसी शिक्षक के अनुपस्थित रहने पर सिस्टम स्वतः खाली पीरियड देखकर बिना किसी क्लैश के सबसे उपयुक्त शिक्षक को क्लास सौंप देता है।"
          : "If any teacher is marked absent at morning gate check-in, the mathematical engine automatically calculates free faculty periods and reassigns substitute teachers with zero principal intervention.",
        icon: Calendar,
        badge: isHindi ? "शून्य रोस्टर क्लैश" : "Zero Roster Clashes",
      },
      {
        time: "11:30 AM",
        title: isHindi ? "कैशलेस डिजिटल कैंपस" : "Cashless Campus Digital Twin",
        subtitle: isHindi ? "स्मार्ट कार्ड मेस व लाइब्रेरी" : "RFID Mess & Library Checkpoints",
        desc: isHindi
          ? "स्मार्ट कार्ड से सुरक्षित कैंटीन, लाइब्रेरी व मेडिकल चेक-इन। माता-पिता अपने फोन पर बच्चों के दैनिक खर्चे व पोषण देख सकते हैं।"
          : "Smart identity cards allow safe canteen purchases, medical room check-ins, and library book loans. Parents monitor daily nutritional logs and campus purchases from their mobile phone.",
        icon: Utensils,
        badge: isHindi ? "कैशलेस कैंपस" : "Cashless Campus",
      },
      {
        time: "01:30 PM",
        title: isHindi ? "परीक्षा व परिणाम सिस्टम" : "Examination Telemetry",
        subtitle: isHindi ? "CBSE व ICSE ऑटो रिपोर्ट कार्ड" : "CBSE & ICSE Automated Marksheets",
        desc: isHindi
          ? "शिक्षक केवल एक बार मार्क्स दर्ज करते हैं। सिस्टम स्वतः ग्रेडिंग, पर्सेंटाइल और CBSE नियमों के अनुसार डिजिटल रिपोर्ट कार्ड तैयार कर देता है।"
          : "Teachers enter marks once via web or mobile app. Modernisum School computes co-scholastic rubrics, generates percentile bell-curves, and compiles official CBSE board-compliant report cards instantly.",
        icon: Award,
        badge: isHindi ? "CBSE अनुपालन" : "CBSE Compliant",
      },
      {
        time: "03:30 PM",
        title: isHindi ? "स्कूल बस जीपीएस ट्रैकिंग" : "Geofenced Fleet Departure",
        subtitle: isHindi ? "लाइव बस लोकेशन व पैरेंट अलर्ट" : "Real-Time Bus GPS & Parent Dispatch",
        desc: isHindi
          ? "जैसे ही बस स्कूल से रवाना होती है, जीपीएस एक्टिव हो जाता है। घर के स्टॉप से 1 किमी दूर रहने पर पेरेंट को व्हाट्सएप अलर्ट मिल जाता है।"
          : "As buses leave school premises, GPS beacons broadcast telemetry. Parents receive proximity WhatsApp alerts when the bus is 1 kilometer away from their home pickup stop.",
        icon: Bus,
        badge: isHindi ? "लाइव जीपीएस" : "Parent GPS App",
      },
    ];

    return (
      <section className="py-20 px-4 md:px-8 w-full max-w-[1760px] mx-auto relative z-10" id="workflow">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30">
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{isHindi ? "Modernisum School के साथ एक सामान्य दिन" : "A Typical Day Powered by Modernisum School"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
            {isHindi ? "आपका पूरा स्कूल कैसे चलता है ऑटोपायलट पर" : "How Your Campus Operates on Autopilot"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
            {isHindi
              ? "सुबह के गेट पर एंट्री से लेकर शाम को बसों के घर पहुंचने तक—शिक्षक, स्टाफ, छात्र और अभिभावक एक सहज सिस्टम से जुड़े रहते हैं।"
              : "From morning entrance turnstiles to evening parent fleet telemetry, Modernisum School synchronizes teachers, staff, parents, and security into one autonomous operational mesh."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vidhyamSteps.map((st) => {
            const Icon = st.icon;
            return (
              <LiquidGlassCard
                key={st.time}
                glowColor="rgba(99, 102, 241, 0.2)"
                className="p-7 flex flex-col justify-between group hover:border-indigo-400/50 transition-all border-slate-200/80 dark:border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                      {st.time}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {st.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                        {st.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {st.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light mt-3">
                    {st.desc}
                  </p>
                </div>
              </LiquidGlassCard>
            );
          })}
        </div>
      </section>
    );
  }

  // ==========================================
  // VARIANT: MODERNISUM (DEFAULT)
  // ==========================================
  const modernisumSteps = [
    {
      step: "01",
      title: "Field Immersion & Edge Discovery",
      subtitle: "On-the-ground operational friction mapping",
      desc: "Before writing code, our engineers visit the actual physical environment—school entrance gates, fleet bus depots, and agricultural acreages. We identify network dropouts, power constraints, and human factors.",
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      tag: "Phase 1: Research",
    },
    {
      step: "02",
      title: "Offline-First Resilient Architecture",
      subtitle: "Zero-dependency local computing foundations",
      desc: "We engineer systems with local databases (SQLite, IndexedDB) and deterministic sync queues. The application never freezes, drops a record, or blocks a user, even during complete broadband outages.",
      icon: <Database className="w-6 h-6 text-blue-400" />,
      tag: "Phase 2: Core Engineering",
    },
    {
      step: "03",
      title: "Hardware Telemetry & Edge AI Fusion",
      subtitle: "Micro-controllers, IoT sensors & vision models",
      desc: "We write direct device drivers and firmware for RFID gates, GPS modules, solar LoRaWAN probes, and drone cameras. Lightweight AI models execute inference right at the physical edge in sub-second timeframes.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      tag: "Phase 3: IoT & Intelligence",
    },
    {
      step: "04",
      title: "Sovereign Cloud Scale & SLA Governance",
      subtitle: "Automated failover, encryption & 99.98% uptime",
      desc: "Edge nodes synchronize with high-performance distributed cloud clusters via encrypted bidirectional sockets. We deploy automated CI/CD canary releases, multi-region backups, and round-the-clock telemetry monitoring.",
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      tag: "Phase 4: Scale & Defense",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-black/40 border-y border-slate-200/80 dark:border-white/5" id="methodology">
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Our Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            How We Build Resilient{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-purple-600 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400">
              Software & Hardware Systems
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
            A disciplined, four-phase engineering doctrine designed to deliver sub-second response times, complete offline resilience, and enterprise-grade data protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modernisumSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.15)"
                className="h-full p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/20 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-black font-mono text-cyan-600/40 dark:text-cyan-400/40">
                      {item.step}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed font-normal dark:font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                  <span>Phase Complete</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const WorkingMethodologySection = WorkflowSection;

export function VidhyamWorkflow() {
  return <WorkflowSection variant="vidhyam" />;
}

export function AgromiWorkflow() {
  return <WorkflowSection variant="agromi" />;
}
