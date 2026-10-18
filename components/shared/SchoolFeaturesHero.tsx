"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";

export function SchoolFeaturesHero() {
  const { language } = useLanguage();
  const lang = language;

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-24 sm:pt-32">
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <GraduationCap className="w-4 h-4 text-cyan-500" />
          <span>Core Educational Philosophy</span>
        </div>
      </div>

      {lang === "hi" ? (
        <>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            स्कूल का काम केवल पढ़ाना और शिक्षा देना होना चाहिए, <br />
            <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              न कि मैनेजमेंट के उलझनों में समय गंवाना।
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            Modernisum School सॉफ्टवेयर को एडमिनिस्ट्रेटिव काम को न्यूनतम करने के लिए डिज़ाइन किया गया है ताकि शिक्षकों का पूरा ध्यान छात्रों पर रहे।
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Teachers Must Teach. <br />
            <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Schools Must Educate.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            A teacher&apos;s sole purpose is teaching; a school&apos;s sole purpose is educating. Modernisum School reduces administrative routines down to near-zero so educators dedicate 100% of their attention to student growth.
          </p>
        </>
      )}
    </section>
  );
}

export const VidhyamFeaturesHero = SchoolFeaturesHero;

export function SchoolFeaturesCta() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
      <div className="p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-6 shadow-sm">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
          Experience Modernisum School on Your Campus
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Schedule an on-site demonstration with our educational architects and inspect the software directly in Meerut or at your campus.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <GlassButton variant="primary" size="lg" className="flex items-center gap-2">
              <span>Book Campus Demo</span>
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
          </Link>
          <Link href="/pricing">
            <GlassButton variant="secondary" size="lg">
              View School Plans
            </GlassButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

export const VidhyamFeaturesCta = SchoolFeaturesCta;
