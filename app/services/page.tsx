import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CTASection } from "@/components/home/CTASection";
import { getServices } from "@/lib/data-engine";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Services & AI Solutions",
  description:
    "Explore Modernisum's full suite of software solutions: AI-Integrated SaaS, Modern Web & Mobile Apps, Custom Embedded Device Software, and Modern School ERP.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Fullstack Engineering Spectrum</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Enterprise Software,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                AI SaaS & Smart Systems
              </span>
            </h1>
            <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
              We engineer mission-critical digital systems with sub-second response times, zero operational downtime, and intuitive Liquid Glass user interfaces.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero GPU Hardware Overhead (Pure Software)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Offline-First Data Synchronization</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Dedicated Architecture Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Bento Grid */}
        <ServicesGrid services={services} />

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
