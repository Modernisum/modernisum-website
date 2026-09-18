"use client";

import React from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Star, MessageSquareQuote } from "lucide-react";
import { SEED_TESTIMONIALS } from "@/lib/seed-data";

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4 border border-purple-500/30">
            <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Institutional Trust</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Validated by Leaders in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              Education & Enterprise
            </span>
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
            Real feedback from directors, founders, and VP-level executives who rely on Modernisum software systems daily.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEED_TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <LiquidGlassCard
                glowColor="rgba(121, 40, 202, 0.15)"
                className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between hover:border-purple-500/50 dark:hover:border-purple-500/40 transition-all group"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote Content */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light italic mb-6">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {review.name}
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{review.role}</p>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
