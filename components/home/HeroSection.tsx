"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { AuthDialog } from "@/components/ui/AuthDialog";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  School,
  CheckCircle2
} from "lucide-react";

export function HeroSection() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Innovation Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-cyan-700 dark:text-cyan-300 mb-8 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          <span>Next-Generation Software Architecture & AI SaaS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-display text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.12]"
        >
          Engineering Intelligent{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-purple-600 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400 drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
            AI SaaS Platforms
          </span>{" "}
          & Unified School Ecosystems
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-xl text-slate-700 dark:text-slate-300/90 max-w-3xl mx-auto leading-relaxed font-normal dark:font-light"
        >
          Modernisum architects high-performance cloud software, autonomous AI agent pipelines, custom mobile & desktop apps, and the award-winning <span className="text-cyan-700 dark:text-cyan-300 font-semibold dark:font-medium">Modern School ERP</span>. Zero legacy friction. Infinite scalability.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/services">
            <GlassButton
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              iconPosition="right"
              className="w-full sm:w-auto text-base group"
            >
              Explore Solutions
            </GlassButton>
          </Link>

          <Link href="/modern-school">
            <GlassButton
              variant="secondary"
              size="lg"
              icon={<School className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              className="w-full sm:w-auto text-base"
            >
              Modern School ERP
            </GlassButton>
          </Link>

          <GlassButton
            variant="ghost"
            size="lg"
            onClick={() => setAuthOpen(true)}
            className="w-full sm:w-auto text-sm"
          >
            Client Portal Sign In
          </GlassButton>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Pure Software Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Enterprise Security & SOC-Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Sub-Second Response Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Offline-First Resilient Sync</span>
          </div>
        </motion.div>
      </div>

      <AuthDialog
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab="signin"
      />
    </section>
  );
}
