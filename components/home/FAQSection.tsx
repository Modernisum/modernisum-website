"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SEED_FAQS } from "@/lib/seed-data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Google FAQPage Schema for Award-Winning Technical SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SEED_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 relative overflow-hidden" id="faqs">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-3 border border-cyan-500/30">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
            Transparent answers regarding our software engineering practices, Modern School ERP, and custom AI SaaS platforms.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {SEED_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <LiquidGlassCard
                key={idx}
                glowColor="rgba(0, 242, 254, 0.1)"
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light border-t border-slate-200/80 dark:border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
