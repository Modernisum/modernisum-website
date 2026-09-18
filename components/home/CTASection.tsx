"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { Sparkles, ArrowRight, PhoneCall, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.2)"
          className="p-8 sm:p-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-white/80 to-purple-500/10 dark:from-black/60 dark:via-[#0b101d]/60 dark:to-black/60 text-center relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-6 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Initiate Your Transformation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
              Ready to Build Your Next{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-purple-600 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400">
                AI SaaS or School ERP?
              </span>
            </h2>

            <p className="mt-6 text-sm sm:text-lg text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed">
              Whether you need to modernize your school campus with RFID and real-time GPS, or deploy an autonomous AI SaaS platform, our senior software architects are ready to engineer your solution.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <GlassButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Request Architecture Quote
                </GlassButton>
              </Link>

              <a href="tel:+919368671007" className="w-full sm:w-auto">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  icon={<PhoneCall className="w-4 h-4 text-cyan-400" />}
                  className="w-full sm:w-auto"
                >
                  Direct Call: +91 9368671007
                </GlassButton>
              </a>
            </div>

            {/* Email Contact note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Direct inquiries: </span>
              <a href="mailto:contact@modernisum.com" className="text-cyan-600 dark:text-cyan-300 hover:underline">
                contact@modernisum.com
              </a>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
