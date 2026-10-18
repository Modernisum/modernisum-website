"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassButton } from "@/components/ui/GlassButton";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  FileCheck2, 
  MessageSquare, 
  Globe, 
  Users, 
  Briefcase, 
  HelpCircle, 
  Layers, 
  GraduationCap,
  Atom
} from "lucide-react";
import confetti from "canvas-confetti";
import { ModernisumLogo, VidhyamLogo, SchoolLogo, AgromiLogo } from "@/components/ui/BrandLogos";

export type FooterVariant = "modernisum" | "school" | "agromi" | "vidhyam";

interface FooterProps {
  variant?: FooterVariant;
}

export function Footer({ variant = "modernisum" }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSchoolDomain, setIsSchoolDomain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (
        host === "school.modernisum.com" ||
        host.startsWith("school.") ||
        new URLSearchParams(window.location.search).get("subdomain") === "school"
      ) {
        setIsSchoolDomain(true);
      }
    }
  }, []);

  const vPrefix = isSchoolDomain ? "" : "/mod-school";
  const schoolHomeHref = isSchoolDomain ? "/" : "/mod-school";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00f2fe", "#7928ca", "#f59e0b"],
    });
    setSubscribed(true);
    setEmail("");
  };

  // ==========================================
  // VARIANT: SCHOOL OS
  // ==========================================
  if (variant === "school" || variant === "vidhyam") {
    return (
      <footer className="relative z-10 border-t border-sky-500/20 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl pt-16 pb-12 mt-20">
        {/* Top Ambient Glow Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <Link href={schoolHomeHref} className="flex items-center group select-none">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <SchoolLogo className="w-full h-full drop-shadow-[0_2px_8px_rgba(14,165,233,0.25)] dark:drop-shadow-[0_0_14px_rgba(56,189,248,0.45)]" />
                </div>
                <div className="flex flex-col select-none w-fit ml-0.5" aria-label="ModSchool by Modernisum">
                  <span className="text-xl sm:text-2xl font-black font-tech text-slate-900 dark:text-white tracking-tight leading-none">
                    ModSchool
                  </span>
                  <div className="w-full flex justify-between items-center text-[8px] sm:text-[9px] font-bold font-tech text-sky-500 dark:text-sky-400 uppercase mt-1 leading-none select-none" aria-hidden="true">
                    <span>M</span><span>O</span><span>D</span><span>E</span><span>R</span><span>N</span><span>I</span><span>S</span><span>U</span><span>M</span>
                  </div>
                </div>
              </Link>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-light">
                ModSchool is the autonomous campus operating system engineered by Modernisum for Indian K-12 institutions.
                Eliminating administrative overhead with contactless face AI attendance,
                automated WhatsApp fee collection, and digital report cards.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>CBSE & ICSE Compliant</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>UDISE+ Ready</span>
                </span>
              </div>
            </div>

            {/* Ecosystem & Modules */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">
                School Ecosystem
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href={`${vPrefix}/download`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <span>School Desktop OS</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/15 border border-sky-400/30">Win</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/apps/employee`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Employee App (Faculty Portal)
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/apps/student`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Student & Parent Mobile App
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/apps/extension`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Clerk Co-Pilot Extension
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/download`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors font-semibold text-sky-500">
                    Application Download Hub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources & Knowledge */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/blog" className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Engineering Blog
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    News & Announcements
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/releases`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Changelog & Releases
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/docs`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Documentation & Guides
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/features`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    Platform Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company, Community & Contact */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">
                Company & Community
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href={`${vPrefix}/about`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>About School OS</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/about#team`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Our Teams & Architects</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/about#careers`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Careers</span>
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-500/10 px-1 rounded">Hiring</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${vPrefix}/contact`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li className="pt-2">
                  <a
                    href="https://wa.me/919368671007"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Principal Desk</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Terms & Policy */}
          <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} School Ecosystem. An Enterprise Solution by Modernisum Technologies (MSME: UDYAM-UP-56-0049848).</p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link href={`${vPrefix}/terms`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                Terms of Service
              </Link>
              <Link href={`${vPrefix}/privacy`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                Privacy Policy (DPDP 2023)
              </Link>
              <Link href="/security" className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                Data Sovereignty
              </Link>
              <Link href={`${vPrefix}/contact`} className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                Contact & Support
              </Link>
              <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                Modernisum Platform
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================
  // VARIANT: AGROMI AGRO-TECH
  // ==========================================
  if (variant === "agromi") {
    return (
      <footer className="relative z-10 border-t border-emerald-500/20 bg-slate-50/80 dark:bg-black/60 backdrop-blur-2xl mt-24">
        {/* Top Ambient Glow Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand Col */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/agromi" className="flex items-center gap-3 group select-none">
                <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-1 shadow-sm shadow-emerald-500/20">
                  <AgromiLogo className="w-full h-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-tech tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors leading-tight">
                    MOD Farmer
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-tech">
                    Autonomous Agricultural Ecosystem & AI Crop Doctor
                  </span>
                </div>
              </Link>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
                MOD Farmer is an autonomous agro-tech ecosystem & AI Crop Doctor engineered by{" "}
                <Link href="/" className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                  Modernisum
                </Link>
                . We empower farmers, agricultural enterprises, and FPOs with AI plant diagnostics, IoT soil telemetry, drone spectral vision, automated irrigation, and mandi intelligence.
              </p>

              <div className="flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-tech">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Crop Doctor Active • 42,000+ Acres Monitored • 99.98% SLA</span>
              </div>
            </div>

            {/* Solutions Col */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
                Agro-Tech Solutions
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/agromi#crop-care" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>Crop Care AI Doctor (Kisan Assistant)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/agromi/features#soil-mesh" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group">
                    <span>LoRaWAN Sub-Surface Soil Probes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/agromi/features#drone-ndvi" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group">
                    <span>Drone NDVI Spectral Crop Health</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/agromi/features#drip-automation" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group">
                    <span>Automated Solar Drip & Pump Valves</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/agromi/features#mandi-pricing" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group">
                    <span>Predictive Mandi Market Arbitrage</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/agromi/features#micro-weather" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group">
                    <span>Hyperlocal Micro-Weather Stations</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Col */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
                Platform & Studio
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li><Link href="/agromi" className="hover:text-emerald-500 transition-colors">Agro Cockpit</Link></li>
                <li><Link href="/agromi#crop-care" className="hover:text-emerald-500 transition-colors">Crop Care Assistant</Link></li>
                <li><Link href="/agromi/pricing" className="hover:text-emerald-500 transition-colors">Pricing & Plans</Link></li>
                <li><Link href="/agromi/about" className="hover:text-emerald-500 transition-colors">Our Mission & Field Lab</Link></li>
                <li><Link href="/agromi/contact" className="hover:text-emerald-500 transition-colors">Book Farm Pilot</Link></li>
                <li className="pt-2 border-t border-slate-200 dark:border-white/10">
                  <Link href="/research" className="hover:text-sky-500 transition-colors flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400">
                    <Atom className="w-3.5 h-3.5" />
                    <span>Research & Deep Tech Lab</span>
                  </Link>
                </li>
                <li>
                  <a href="https://school.modernisum.com" className="hover:text-sky-500 transition-colors flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>School Ecosystem</span>
                  </a>
                </li>
                <li>
                  <Link href="/" className="hover:text-cyan-500 transition-colors flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Modernisum Parent Studio</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Col */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
                Field Advisory & Pilots
              </h4>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Modernisum Field Lab, Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a href="mailto:contact@modernisum.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    contact@modernisum.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a href="tel:+919368671007" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    +91 9368671007
                  </a>
                </p>
              </div>

              <div className="pt-3">
                <Link href="/agromi/contact">
                  <span className="inline-block w-full text-center px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition-colors">
                    Schedule Free On-Field Soil Audit →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 mt-10 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Agro Ecosystem & Crop Care. A Modernisum Technology Venture. Precision Agriculture Operating System.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="/security" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Data Sovereignty</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================
  // VARIANT: MODERNISUM PARENT STUDIO (DEFAULT)
  // ==========================================
  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-2xl mt-24">
      {/* Top Ambient Glow Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" prefetch={false} className="flex items-center gap-2.5 group select-none">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <ModernisumLogo className="w-full h-full group-hover:scale-105 transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-tech tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-tight">
                  MODERNISUM
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-tech font-semibold">
                  AI & Innovative Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
              Modernisum is a premier technology & AI engineering studio architecting autonomous platforms across education and enterprise systems, powering{" "}
              <a
                href="https://school.modernisum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                school.modernisum.com
              </a>
              .
            </p>
          </div>

          {/* Software Services Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
              Software Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/school" prefetch={false} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium transition-colors flex items-center gap-1.5 group">
                  <span>School Ecosystem</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/agro" prefetch={false} className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 group text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Agro Ecosystem & Crop Care</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/research" prefetch={false} className="hover:text-sky-500 transition-colors flex items-center gap-1.5 group text-sky-600 dark:text-sky-400 font-medium">
                  <span>Research & Deep Tech Lab</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/ai-solutions" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>AI Automation & Agents</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>Web Applications</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-development" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>Mobile Apps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/iot-automation" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>IoT Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">About Us</Link></li>
              <li><Link href="/research" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors font-medium text-sky-600 dark:text-sky-400">Research Lab</Link></li>
              <li><Link href="/projects" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Works</Link></li>
              <li><Link href="/blog" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Tech Insights</Link></li>
              <li><Link href="/news" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Newsroom</Link></li>
              <li><Link href="/community" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors font-medium text-cyan-600 dark:text-cyan-400">Community & Reviews</Link></li>
              <li><Link href="/contact" prefetch={false} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
              Contact & Updates
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href="mailto:contact@modernisum.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">contact@modernisum.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href="tel:+919368671007" className="hover:text-slate-900 dark:hover:text-white transition-colors">+91 9368671007</a>
              </p>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="pt-2">
              {subscribed ? (
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed to Modernisum updates!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <GlassInput
                    placeholder="Enter work email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="py-1.5 text-xs"
                  />
                  <GlassButton type="submit" variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />} />
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Modernisum Technologies (MSME: UDYAM-UP-56-0049848). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" prefetch={false} className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" prefetch={false} className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
