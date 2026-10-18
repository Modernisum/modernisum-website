"use client";

import React from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Atom,
  Cpu,
  ShieldCheck,
  TrendingUp,
  FileSearch,
  Layers,
  Coins,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export function PatentResearchLabSection() {
  const { isHindi } = useLanguage();

  const corePillars = [
    {
      icon: FileSearch,
      title: "Global Patent Analysis & R&D",
      titleHi: "वैश्विक पेटेंट अनुसंधान व डीप टेक विकास",
      desc: "We analyze cutting-edge distributed computing, cryptography, and edge-AI patents to engineer sovereign architectures that operate ahead of industry standards.",
      descHi: "हम आधुनिक पेटेंट्स और क्रिप्टोग्राफी शोध का विश्लेषण कर सॉवरेन आर्किटेक्चर विकसित करते हैं जो इंडस्ट्री मानकों से कहीं आगे हैं।",
      badge: "Deep Tech",
      color: "cyan",
      stats: "15+ Patents Analyzed",
    },
    {
      icon: Cpu,
      title: "Bespoke Enterprise Problem Solving",
      titleHi: "कस्टम उद्यम समस्या समाधान",
      desc: "Beyond our flagship platforms, our research team solves high-friction operational bottlenecks with bespoke local-first engines, IoT relays, and tailored cloud pipelines.",
      descHi: "हमारे फ्लैगशिप उत्पादों के अतिरिक्त, हमारी रिसर्च टीम जटिल ऑपरेशनल बाधाओं के लिए कस्टम लोकल-फर्स्ट इंजन और आईओटी रिले तैयार करती है।",
      badge: "Custom Solutions",
      color: "purple",
      stats: "Zero-Lag Custom Pipelines",
    },
    {
      icon: Coins,
      title: "Uncompromising Quality, Tailored Affordability",
      titleHi: "अपरिवर्तनीय गुणवत्ता, अनुकूलित सामर्थ्य",
      desc: "Zero feature cuts, zero security compromises. We offer flexible milestone and subscription structures so every school and business can access elite engineering without debt.",
      descHi: "फीचर्स व सुरक्षा में शून्य समझौता। हम लचीले भुगतान व सब्सक्रिप्शन विकल्प प्रदान करते हैं ताकि हर छोटा-बड़ा संस्थान बिना कर्ज शीर्ष तकनीक अपना सके।",
      badge: "Zero Compromise",
      color: "emerald",
      stats: "Flexible Milestone Plans",
    },
    {
      icon: HeartHandshake,
      title: "Customer Growth Symbiosis",
      titleHi: "ग्राहक विकास सहजीविता (ग्रोथ सिम्बायोसिस)",
      desc: "We only grow when our customer's business grows. A thriving, delighted customer is our greatest foundation, backed by our Atithi Devo Bhava family care.",
      descHi: "हमारा विकास तभी संभव है जब हमारे ग्राहक का व्यवसाय फले-फूले। एक समृद्ध और संतुष्ट ग्राहक ही हमारा सबसे मजबूत आधार है।",
      badge: "Family Hospitality",
      color: "amber",
      stats: "100% Mutual Alignment",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden cv-auto">
      {/* Background Decorative Mesh Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md">
            <Atom className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Sovereign Software & Patent Research Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-tech">
            {isHindi ? (
              <>
                शोध-आधारित सॉफ्टवेयर समाधान,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                  हर व्यवसाय के अनुकूल
                </span>
              </>
            ) : (
              <>
                Patent-Backed Engineering,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                  Tailored for Every Business
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isHindi
              ? "हम केवल सॉफ्टवेयर नहीं बनाते—हम अत्याधुनिक पेटेंट्स का अध्ययन कर ऐसे समाधान रचते हैं जो वास्तविक व्यापारिक समस्याओं को जड़ से समाप्त करते हैं। सर्वोच्च गुणवत्ता और प्रत्येक संस्थान की आर्थिक क्षमता के अनुरूप।"
              : "Modernisum operates as an advanced software and patent synthesis laboratory. We engineer proprietary flagships and bespoke technical solutions with uncompromising security and scalable affordability."}
          </p>
        </div>

        {/* Stitch-Inspired 3D Pop-Out Grid */}
        <div className="stitch-3d-stage grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="preserve-3d transition-all duration-300 hover:-translate-y-1.5"
              >
                <LiquidGlassCard
                  glowColor={
                    pillar.color === "cyan"
                      ? "rgba(0, 242, 254, 0.25)"
                      : pillar.color === "purple"
                      ? "rgba(121, 40, 202, 0.25)"
                      : pillar.color === "emerald"
                      ? "rgba(16, 185, 129, 0.25)"
                      : "rgba(245, 158, 11, 0.25)"
                  }
                  className="h-full p-6 sm:p-8 flex flex-col justify-between border-slate-200/80 dark:border-white/10 group"
                >
                  <div>
                    {/* Card Top Strip */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Card Title & Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-tech mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {isHindi ? pillar.titleHi : pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {isHindi ? pillar.descHi : pillar.desc}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {pillar.stats}
                    </span>
                    <span className="text-xs font-semibold text-cyan-500 dark:text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>

        {/* Growth Symbiosis Callout Strip */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-emerald-500/10 border border-cyan-500/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-tech">
                {isHindi ? "हमारा सहजीवी विकास संकल्प" : "Our Growth Symbiosis Pledge"}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {isHindi
                  ? "हम कभी भी कृत्रिम सीमाएं या कमजोर कोड नहीं देते। उच्च तकनीक आपके बजट के अनुकूल उपलब्ध कराना हमारा धर्म है।"
                  : "We only grow when your business grows. Enterprise code quality with modular, budget-aligned scaling for businesses of all sizes."}
              </p>
            </div>
          </div>
          <Link href="/contact">
            <GlassButton variant="primary" className="whitespace-nowrap px-6 py-2.5 text-sm font-semibold">
              <span>{isHindi ? "सहयोग प्रारंभ करें" : "Discuss Custom Solution"}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </GlassButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
