"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { 
  Sparkles, 
  GraduationCap, 
  Globe, 
  Smartphone, 
  Cpu, 
  Zap, 
  Cloud, 
  ArrowUpRight,
  Check
} from "lucide-react";
import { SeedService } from "@/lib/seed-data";

interface ServicesGridProps {
  services: SeedService[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-purple-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-cyan-400" />,
  Globe: <Globe className="w-6 h-6 text-blue-400" />,
  Smartphone: <Smartphone className="w-6 h-6 text-emerald-400" />,
  Cpu: <Cpu className="w-6 h-6 text-indigo-400" />,
  Zap: <Zap className="w-6 h-6 text-amber-400" />,
  Cloud: <Cloud className="w-6 h-6 text-sky-400" />,
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Glow aura */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-medium text-cyan-700 dark:text-cyan-300 mb-4">
            <span>Specialized Software Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Tailored Software Architectures for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              High-Velocity Scale
            </span>
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            From smart educational ecosystems to autonomous AI workflows, we engineer bespoke digital platforms built for sub-second performance and unshakeable resilience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isFlagship = service.category === "Modern School ERP" || service.isPopular;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={isFlagship && index === 0 ? "lg:col-span-2" : ""}
              >
                <LiquidGlassCard
                  glowColor={
                    service.category === "Modern School ERP"
                      ? "rgba(121, 40, 202, 0.18)"
                      : "rgba(0, 242, 254, 0.15)"
                  }
                  className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/40 transition-all duration-300 group"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/20 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {ICON_MAP[service.iconName] || <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />}
                      </div>
                      <div className="flex items-center gap-2">
                        {service.highlightBadge && (
                          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-cyan-500/10 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 border border-cyan-500/30 dark:border-cyan-400/30 text-cyan-700 dark:text-cyan-300">
                            {service.highlightBadge}
                          </span>
                        )}
                        <Link
                          href={`/services/${service.slug}`}
                          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all"
                          aria-label={`View ${service.title}`}
                        >
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Title & Category */}
                    <div className="mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {service.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal dark:font-light">
                      {service.shortDescription}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, isFlagship && index === 0 ? 6 : 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs font-medium">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200 inline-flex items-center gap-1.5 transition-colors font-semibold"
                    >
                      <span>Explore Technical Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
