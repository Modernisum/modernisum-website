"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  ScanFace, 
  CreditCard, 
  GraduationCap, 
  BellRing, 
  Building2, 
  Wallet,
  Sparkles,
  ArrowRight,
  Wifi, 
  Eye, 
  Droplets, 
  TrendingUp, 
  CloudSun, 
  Database, 
  CheckCircle2, 
  Layers
} from "lucide-react";

const VIDHYAM_CAPABILITIES = [
  {
    icon: ScanFace,
    titleEn: "Face AI Gate Attendance",
    titleHi: "फेस AI गेट अटेंडेंस",
    descEn: "Contactless optical recognition at school turnstiles. Processes 45 students per minute per lane with sub-second parent SMS & WhatsApp notifications.",
    descHi: "स्कूल गेट पर बिना लाइन लगे ऑटोमैटिक पहचान। 45 छात्र प्रति मिनट प्रति लेन और पेरेंट्स को तुरंत व्हाट्सएप सूचना।",
    glow: "rgba(0, 242, 254, 0.25)",
    metricEn: "0.4s Ingress",
    metricHi: "0.4s एंट्री",
  },
  {
    icon: CreditCard,
    titleEn: "WhatsApp Fee Recovery",
    titleHi: "व्हाट्सएप फीस वसूली",
    descEn: "Automated digital invoices sent directly to parent WhatsApp with 1-click UPI payment links. Automatic double-entry ledger reconciliation with 0 bank drift.",
    descHi: "पेरेंट्स के व्हाट्सएप पर सीधे डिजिटल इनवॉइस और 1-क्लिक UPI पेमेंट। बिना किसी बैंक मिसमैच के स्वतः हिसाब।",
    glow: "rgba(160, 185, 129, 0.25)",
    metricEn: "99.8% Recovery",
    metricHi: "99.8% वसूली",
  },
  {
    icon: GraduationCap,
    titleEn: "CBSE & ICSE Marksheets",
    titleHi: "CBSE व ICSE मार्कशीट",
    descEn: "100% compliant examination report cards with automatic grading scales, co-scholastic rubric calculations, and instant digital PDF signing.",
    descHi: "CBSE/ICSE नियमों के अनुसार 100% सटीक रिपोर्ट कार्ड, ऑटोमैटिक ग्रेडिंग और तुरंत डिजिटल साइन।",
    glow: "rgba(99, 102, 241, 0.25)",
    metricEn: "UDISE+ Ready",
    metricHi: "UDISE+ रेडी",
  },
  {
    icon: BellRing,
    titleEn: "Parent Telemetry & Alerts",
    titleHi: "पेरेंट अलर्ट व बस ट्रैकिंग",
    descEn: "Real-time bus tracking with geofenced arrival alerts. Instant homework broadcasts, circulars, and attendance logs without noisy external apps.",
    descHi: "स्कूल बस की लाइव लोकेशन और स्टॉप पर पहुंचने से पहले अलर्ट। होमवर्क और नोटिस सीधे मोबाइल पर।",
    glow: "rgba(245, 158, 11, 0.25)",
    metricEn: "Instant Broadcast",
    metricHi: "तुरंत सूचना",
  },
  {
    icon: Building2,
    titleEn: "Campus Space Digital Twin",
    titleHi: "कैंपस इंफ्रास्ट्रक्चर व एसेट",
    descEn: "Physical infrastructure registry with room-by-room capacity management, asset depreciation tracking, and lab equipment valuation.",
    descHi: "क्लासरूम कैपेसिटी, लैब उपकरण और स्कूल संपत्तियों का डिजिटल और पारदर्शी रिकॉर्ड।",
    glow: "rgba(236, 72, 153, 0.25)",
    metricEn: "Asset Ledger",
    metricHi: "एसेट लेजर",
  },
  {
    icon: Wallet,
    titleEn: "1-Click Biometric Payroll",
    titleHi: "1-क्लिक बायोमेट्रिक पेरोल",
    descEn: "Seamless faculty payroll calculation derived from biometric muster rolls. Auto-calculates deductions, leaves, allowances, and generates bank pay-slips.",
    descHi: "शिक्षकों व स्टाफ की बायोमेट्रिक हाजिरी से स्वतः सैलरी कैलकुलेशन, पीएफ, लीव और बैंक पे-स्लिप।",
    glow: "rgba(168, 85, 247, 0.25)",
    metricEn: "1st of Month Auto",
    metricHi: "1 तारीख को ऑटो",
  },
];

const AGROMI_FEATURES = [
  {
    icon: <Wifi className="w-6 h-6 text-emerald-400" />,
    title: "LoRaWAN Sub-Surface Soil Mesh",
    tagline: "Root-Zone Telemetry up to 15km",
    desc: "Solar-powered probes measure soil volumetric water content, dielectric permittivity, temperature, and NPK salinity at 10cm, 25cm, and 50cm depths with zero cabling.",
    badges: ["15km Range", "5-Year Battery", "Sub-Surface Sensors"],
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    icon: <Eye className="w-6 h-6 text-teal-400" />,
    title: "Drone NDVI Multispectral Vision",
    tagline: "Autonomous Aerial Health Scanning",
    desc: "Deploy autonomous drone flight plans to capture near-infrared (NIR) and red spectral reflectance. Generates canopy vigor heatmaps detecting fungal rusts 10 days early.",
    badges: ["NDVI / NDRE", "Pest Hotspot Detection", "Ortho-Mosaic Maps"],
    glow: "rgba(20, 184, 166, 0.2)",
  },
  {
    icon: <Droplets className="w-6 h-6 text-cyan-400" />,
    title: "Autonomous Drip & Solar Valve Actuators",
    tagline: "Precision Micro-Irrigation Control",
    desc: "Edge micro-controllers automatically open solenoid drip valves and trigger solar water pumps based on root-zone tension thresholds, eliminating 35% of water waste.",
    badges: ["Zero Water Waste", "Solar DC Compatible", "Pressure Balanced"],
    glow: "rgba(6, 182, 212, 0.2)",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-400" />,
    title: "Predictive Mandi Market Arbitrage",
    tagline: "APMC Rate Forecasting AI",
    desc: "Our machine learning models analyze price movements across 50+ APMC mandis, seasonal yield forecasts, and interstate transport costs to recommend the most profitable sale window.",
    badges: ["50+ Mandis", "Price Surge Predictor", "Direct Buyer Link"],
    glow: "rgba(34, 197, 94, 0.2)",
  },
  {
    icon: <CloudSun className="w-6 h-6 text-amber-400" />,
    title: "Hyperlocal Micro-Weather Stations",
    tagline: "Farm-Level Atmosphere Monitoring",
    desc: "Ultrasonic wind sensors, solar pyranometers, and barometric dewpoint tracking predict local frost events, sudden hail, and evapotranspiration (ET₀) rates with 98% accuracy.",
    badges: ["Frost Alarm", "ET₀ Water Modeling", "48h Rain Forecast"],
    glow: "rgba(245, 158, 11, 0.2)",
  },
  {
    icon: <Database className="w-6 h-6 text-purple-400" />,
    title: "100% Offline Edge Computing",
    tagline: "Zero Cloud Dependency in Deep Rural Zones",
    desc: "Farm gates and field hubs store telemetry locally in high-performance embedded SQLite. Irrigation loops execute reliably without internet, synchronizing to cloud when linked.",
    badges: ["Zero Downtime", "Store & Forward Sync", "Local Mesh Control"],
    glow: "rgba(168, 85, 247, 0.2)",
  },
];

export interface FeaturesGridProps {
  variant?: "school" | "vidhyam" | "agromi" | "farmer" | "modernisum";
}

export function FeaturesGrid({ variant = "school" }: FeaturesGridProps) {
  const { isHindi } = useLanguage();
  if (variant === "agromi" || variant === "farmer") {
    return (
      <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-black/30 border-y border-emerald-500/20" id="features">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4 border border-emerald-500/30">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full-Stack Agricultural Technology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Six Pillars of the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-400">
                Agromi Ecosystem
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
              Designed for harsh rural environments. Every module combines robust physical sensors with intelligent software to protect crops and maximize harvest value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AGROMI_FEATURES.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <LiquidGlassCard
                  glowColor={feat.glow}
                  className="h-full p-7 rounded-3xl border border-emerald-500/20 dark:border-white/10 flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-white/5 border border-emerald-500/20 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {feat.icon}
                      </div>
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                        0{idx + 1} // Module
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
                      {feat.title}
                    </h3>
                    <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-3">
                      {feat.tagline}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed mb-6 font-normal dark:font-light">
                      {feat.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {feat.badges.map((b) => (
                        <span
                          key={b}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Field Validated</span>
                    </span>
                    <span className="font-mono text-[11px]">Sub-Second Edge</span>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Variant: Vidhyam
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10" id="features">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isHindi ? "प्रमुख क्षमताएं" : "Core Capabilities"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          {isHindi ? "आधुनिक भारतीय शिक्षण संस्थानों के लिए निर्मित" : "Engineered for Modern Indian Institutions"}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light">
          {isHindi
            ? "हर फीचर स्कूल के कागजी झंझटों को खत्म करने, फीस लीकेज रोकने और शिक्षा को सशक्त बनाने के लिए बनाया गया है।"
            : "Every capability is built from first principles to eliminate paper friction, prevent revenue leakage, and empower educational leadership."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDHYAM_CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          return (
            <LiquidGlassCard
              key={cap.titleEn}
              glowColor={cap.glow}
              className="p-7 flex flex-col justify-between group hover:border-cyan-400/50 transition-all border-slate-200/80 dark:border-white/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100/80 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-white/10">
                    {isHindi ? cap.metricHi : cap.metricEn}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {isHindi ? cap.titleHi : cap.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {isHindi ? cap.descHi : cap.descEn}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <Link
                  href="/features"
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>{isHindi ? "विस्तृत विवरण देखें" : "Technical specs"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </LiquidGlassCard>
          );
        })}
      </div>
    </section>
  );
}

export function VidhyamFeaturesGrid() {
  return <FeaturesGrid variant="vidhyam" />;
}

export function AgromiFeaturesGrid() {
  return <FeaturesGrid variant="agromi" />;
}
