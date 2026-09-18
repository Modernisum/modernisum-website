import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  MapPin,
  Mail,
  Phone,
  Code2,
  Cpu,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Precision Software Architecture & AI SaaS",
  description:
    "Learn about Modernisum: our software engineering philosophy, leadership, Meerut headquarters, and the vision behind Modern School ERP.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Shivank & Modernisum Core",
      role: "Lead Systems Architect & Technology Director",
      bio: "Spearheads cross-platform distributed architecture, offline sync protocols, and high-concurrency Node.js / Flutter ecosystems.",
      image: "/logo.png",
    },
    {
      name: "AI & Cognitive Engineering Lab",
      role: "AI SaaS & Agent Pipelines",
      bio: "Focuses on multimodal vision models, autonomous workflow orchestration, and generative microservices integration.",
      image: "/logo.png",
    },
    {
      name: "Mobile & Embedded Systems Guild",
      role: "Flutter & Hardware Interfacing",
      bio: "Engineers sub-second RFID drivers, native Bluetooth/serial protocols, and 120 FPS mobile experiences on Android & iOS.",
      image: "/logo.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
            <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Company Overview & Engineering Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Architecting the Future of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              Intelligent Software
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal dark:font-light max-w-3xl mx-auto leading-relaxed">
            Modernisum is an engineering-driven software company headquartered in Meerut, Uttar Pradesh. We design and deliver AI-integrated SaaS, resilient mobile applications, embedded device controllers, and the flagship Modern School ERP ecosystem.
          </p>
        </section>

        {/* Mission & Strict Business Scope */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.15)"
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
                Pure Software Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
                Modernisum focuses exclusively on pure software applications and cloud architectures. We do not provide or broker physical GPU server clusters or hardware rigs. Our expertise is crafting ultra-efficient, lightweight code that maximizes performance on standard cloud and edge hardware.
              </p>
            </LiquidGlassCard>

            <LiquidGlassCard
              glowColor="rgba(121, 40, 202, 0.15)"
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
                Offline-First Resilience
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
                In real-world environments like schools and factories, internet drops are frequent. Our systems are engineered with local SQLite caching and automatic conflict-free synchronization, ensuring that critical operations never halt.
              </p>
            </LiquidGlassCard>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
              Engineering Leadership
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Hands-on architects dedicated to code quality, security, and human-centric UI design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <LiquidGlassCard
                key={idx}
                glowColor="rgba(0, 242, 254, 0.12)"
                className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-cyan-400/40">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{member.name}</h4>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 block mb-3">{member.role}</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </section>

        {/* Headquarters & Trust Section (E-E-A-T) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  Registered Development Center
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1 mb-4">
                  Modernisum Technology Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light mb-6">
                  Strategically located in Meerut adjacent to CCS University, serving education networks, logistics corporations, and SaaS businesses across North India and globally.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>Jail Chungi, Kila Road, Near CCS University, Meerut, Uttar Pradesh, Pin-250001</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <a href="tel:+919368671007" className="hover:text-cyan-600 dark:hover:text-cyan-300">+91 9368671007</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <a href="mailto:contact@modernisum.com" className="hover:text-cyan-600 dark:hover:text-cyan-300">contact@modernisum.com</a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 space-y-4">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">Our Commitments</h4>
                <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Strict confidentiality & NDA for all client architectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>100% intellectual property ownership transferred to client</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Direct WhatsApp & phone access to core engineers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Sub-24-hour response on all critical bug reports</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/contact">
                    <GlassButton variant="primary" size="sm" className="w-full">
                      Connect with Engineering Team
                    </GlassButton>
                  </Link>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
