"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { DemoForm } from "@/components/shared/DemoForm";
import { AuthDialog } from "@/components/ui/AuthDialog";
import { QuotationCalculator } from "@/components/shared/QuotationCalculator";
import { AskAiQuotationBot } from "@/components/shared/AskAiQuotationBot";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Calculator,
  MessageSquare,
  Headphones,
  Calendar,
  Building2,
  Sprout,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Check,
  UserCheck,
  LogIn,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getSSOUser, type AuthUser } from "@/lib/sso";

export interface ContactSectionProps {
  variant?: "modernisum" | "school" | "vidhyam" | "agromi" | "farmer";
}

export function ContactSection({ variant = "modernisum" }: ContactSectionProps) {
  // Authentication & Session State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactMode, setContactMode] = useState<"calculator" | "ai_bot" | "direct_form">("calculator");
  const [syncedSolution, setSyncedSolution] = useState<string>("mod-school");

  // State for Modernisum Enquiry Form
  const [service, setService] = useState("MOD School Autonomous School OS");
  const [budget, setBudget] = useState("₹50K - ₹2L / Moderate");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    "MOD School Autonomous School OS",
    "Agromi Autonomous Agro-Tech OS",
    "Enterprise AI & Autonomous Workforce",
    "Modern Web Application (Next.js)",
    "Mobile Applications (Flutter iOS/Android)",
    "Custom IoT & Micro-controller Edge",
    "Cloud Services & Serverless Architecture",
  ];

  const budgetOptions = [
    "< ₹50,000 (Rapid Prototype)",
    "₹50,000 - ₹2,00,000 (Production App)",
    "₹2,00,000 - ₹5,00,000 (Complete Ecosystem)",
    "₹5,00,000+ (Enterprise School Network)",
  ];

  // Sync Logged-In User Authentication & Session
  useEffect(() => {
    // 1. Initial cached SSO check
    const ssoUser = getSSOUser();
    if (ssoUser && ssoUser.email) {
      setCurrentUser(ssoUser);
      if (ssoUser.name) setName((prev) => prev || ssoUser.name);
    }

    // 2. Firebase auth state listener
    let unsubscribeAuth: (() => void) | null = null;
    try {
      unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser && fbUser.email) {
          const userObj: AuthUser = {
            id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email.split("@")[0],
            role: fbUser.email.includes("admin") ? "admin" : "client",
          };
          setCurrentUser(userObj);
          if (userObj.name) setName((prev) => prev || userObj.name);
        }
      });
    } catch (err) {
      console.warn("Auth listener warning:", err);
    }

    // 3. Custom event listener for instant multi-tab & navbar login sync
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<AuthUser | null>;
      const user = customEvent.detail;
      if (user) {
        setCurrentUser(user);
        if (user.name) setName((prev) => prev || user.name);
      } else {
        setCurrentUser(null);
      }
    };
    window.addEventListener("modernisum_auth_change", handleAuthChange);

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      window.removeEventListener("modernisum_auth_change", handleAuthChange);
    };
  }, []);

  // Click Outside to Dismiss Custom Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: Require Sign-in / Registration before submitting
    if (!currentUser || !currentUser.email) {
      setAuthModalOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || currentUser.name || "Valued Partner",
          email: currentUser.email,
          phone: phone.trim() || "+91 9368671007",
          service,
          budget,
          message: description,
          source: "contact_page",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send your request. Please try direct phone or WhatsApp.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (variant === "school" || variant === "vidhyam") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
            <Headphones className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>Institutional Relations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Connect With Our Educational Team
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Schedule a high-fidelity campus demonstration, explore customized data migration for your trust, or speak directly with our senior educational systems architects.
          </p>
        </div>

        {/* Quick Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Principal Direct Line
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Available Mon - Sat, 08:00 AM - 06:00 PM IST
              </p>
            </div>
            <a
              href="tel:+919368671007"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>+91 9368671007</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </LiquidGlassCard>

          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Official WhatsApp Desk
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Instant response from lead education engineers
              </p>
            </div>
            <a
              href="https://wa.me/919368671007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Chat on WhatsApp (+91 9368671007)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </LiquidGlassCard>

          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Institutional Email
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Formal proposals &amp; RFP documentation
              </p>
            </div>
            <a
              href="mailto:school@modernisum.com"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>school@modernisum.com</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </LiquidGlassCard>
        </div>

        {/* Embedded Interactive Demo Request Form */}
        <DemoForm variant="school" />
      </div>
    );
  }

  if (variant === "agromi" || variant === "farmer") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
            <Sprout className="w-3.5 h-3.5 text-emerald-500" />
            <span>AgroTech Deployment &amp; Pilots</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Deploy Precision Agromi on Your Farm
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Connect directly with our precision agriculture robotics and telemetry team in Meerut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <LiquidGlassCard
            glowColor="rgba(16, 185, 129, 0.2)"
            className="p-6 rounded-2xl border border-emerald-500/20 dark:border-white/10 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Agronomy Hotline
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              +91 9368671007 <br />
              <span className="text-[10px] text-slate-400">Direct Farmer &amp; FPO Desk</span>
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard
            glowColor="rgba(16, 185, 129, 0.2)"
            className="p-6 rounded-2xl border border-emerald-500/20 dark:border-white/10 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Satellite &amp; Drone Desk
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              agromi@modernisum.com <br />
              <span className="text-[10px] text-slate-400">Response within 24 Hours</span>
            </p>
          </LiquidGlassCard>
        </div>

        {/* Embedded Interactive Pilot Request Form */}
        <DemoForm variant="agromi" />
      </div>
    );
  }

  // Default: Modernisum variant
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Direct Architecture Consultation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Let&apos;s Build Your Next{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            Sovereign System
          </span>
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal dark:font-light">
          Whether you need to automate a school ecosystem, deploy agricultural telemetry, or engineer custom AI microservices, our senior architects in Meerut are ready to assist.
        </p>
      </div>

      {/* Navigation Mode Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => setContactMode("calculator")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            contactMode === "calculator"
              ? "bg-cyan-500 text-white shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>⚡ Autonomous Quotation Engine</span>
        </button>

        <button
          type="button"
          onClick={() => setContactMode("ai_bot")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            contactMode === "ai_bot"
              ? "bg-purple-600 text-white shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>💬 Ask AI Architect (Gemini)</span>
        </button>

        <button
          type="button"
          onClick={() => setContactMode("direct_form")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            contactMode === "direct_form"
              ? "bg-slate-800 dark:bg-white/20 text-white shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>📝 Custom Consultation</span>
        </button>
      </div>

      {/* Dynamic Content Based on Mode */}
      {contactMode === "calculator" && (
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.15)"
          className="p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10"
        >
          <QuotationCalculator initialSolution={syncedSolution} />
        </LiquidGlassCard>
      )}

      {contactMode === "ai_bot" && (
        <div className="max-w-4xl mx-auto">
          <AskAiQuotationBot
            onApplyQuote={(quote) => {
              if (quote?.solution) {
                const solMap: Record<string, string> = {
                  "MOD School Autonomous School OS": "mod-school",
                  "Agromi Autonomous Agro-Tech OS": "agromi",
                };
                setSyncedSolution(solMap[quote.solution] || "mod-school");
              }
              setContactMode("calculator");
            }}
          />
        </div>
      )}

      {contactMode === "direct_form" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.15)"
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Headquarters &amp; Labs
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Connect directly with our engineering team. We do not use third-party call centers—every conversation is with an active builder.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
                    <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Engineering Headquarters
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Near Water Tank, Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh, 250406
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
                    <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Direct Email
                    </div>
                    <a
                      href="mailto:contact@modernisum.com"
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline mt-0.5 block"
                    >
                      contact@modernisum.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Direct Phone &amp; WhatsApp
                    </div>
                    <a
                      href="tel:+919368671007"
                      className="text-xs font-semibold text-slate-800 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:underline mt-0.5 block"
                    >
                      +91 9368671007
                    </a>
                    <a
                      href="https://wa.me/919368671007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline mt-1"
                    >
                      <span>Direct WhatsApp Chat</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Operational Hours
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Mon - Sat: 09:00 AM - 07:00 PM IST
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed architect response within 2 hours</span>
                </div>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Right Column: Interactive Consultation & Enquiry Form */}
          <div className="lg:col-span-7">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.15)"
              className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10"
            >
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Blueprint Request Received
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{name || currentUser?.name}</strong>. Your consultation request has been linked to your verified account (<span className="text-cyan-500 font-mono">{currentUser?.email}</span>) and our senior systems architect will respond within 2 business hours.
                </p>
                <div className="pt-6">
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setPhone("");
                      setDescription("");
                    }}
                  >
                    Submit Another Request
                  </GlassButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Request Architecture Consultation
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Fill in your technical requirements to receive a detailed feasibility blueprint and proposal.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* 🌟 USER AUTHENTICATION & VERIFIED EMAIL BANNER */}
                {currentUser && currentUser.email ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div className="text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Authenticated Account: </span>
                        <span className="font-bold text-slate-900 dark:text-white">{currentUser.name || "Client"}</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-mono ml-1.5">({currentUser.email})</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 w-fit">
                      VERIFIED EMAIL LINKED
                    </span>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Sign In Required to Request Blueprint
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          Please sign in or create an account to automatically link your verified identity and email.
                        </p>
                      </div>
                    </div>
                    <GlassButton
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setAuthModalOpen(true)}
                      className="whitespace-nowrap flex items-center gap-1.5 text-xs font-bold shrink-0"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In / Register</span>
                    </GlassButton>
                  </div>
                )}

                {/* 🌟 100% VISIBLE LIQUID GLASS CUSTOM DROPDOWN (FLAWLESS IN LIGHT & DARK MODE) */}
                <div className="space-y-2 relative" ref={dropdownRef}>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Product or Solution Area
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all text-left shadow-xs cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className="truncate">{service}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${
                        isDropdownOpen ? "rotate-180 text-cyan-500" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Overlay */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden py-1.5 backdrop-blur-2xl">
                      {servicesList.map((s, idx) => {
                        const isSelected = s === service;
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => {
                              setService(s);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold"
                                : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-cyan-600 dark:hover:text-cyan-400"
                            }`}
                          >
                            <span className="truncate">{s}</span>
                            {isSelected && <Check className="w-4 h-4 text-cyan-500 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Target Investment Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {budgetOptions.map((opt, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setBudget(opt)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                          budget === opt
                            ? "bg-cyan-500/15 border-cyan-500 text-cyan-600 dark:text-cyan-300"
                            : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal & Contact Details (Email is Zero Friction from Logged In User) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Contact Name / Role *
                    </label>
                    <GlassInput
                      type="text"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Mobile Number (WhatsApp) *
                    </label>
                    <GlassInput
                      type="tel"
                      placeholder="+91 9368671007"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Requirements / Current Challenges *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly outline your campus size, current pain points, or specific feature requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                {/* Action Submit Button */}
                {currentUser ? (
                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Submitting Blueprint Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Blueprint Request</span>
                      </>
                    )}
                  </GlassButton>
                ) : (
                  <GlassButton
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Submit Blueprint Request</span>
                  </GlassButton>
                )}
              </form>
            )}
          </LiquidGlassCard>
        </div>
      </div>
      )}

      {/* Quick Office & WhatsApp Channels (Always Available Below Calculator & Bot) */}
      {contactMode !== "direct_form" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Principal Direct Line
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Available Mon - Sat, 08:00 AM - 07:00 PM IST
              </p>
            </div>
            <a
              href="tel:+919368671007"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>+91 9368671007</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </LiquidGlassCard>

          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Official WhatsApp Desk
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Instant response from lead education engineers
              </p>
            </div>
            <a
              href="https://wa.me/919368671007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Chat on WhatsApp (+91 9368671007)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </LiquidGlassCard>

          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Engineering Headquarters
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Near Water Tank, Dayalpur, Parikshitgarh, Meerut, UP 250406
              </p>
            </div>
            <a
              href="mailto:contact@modernisum.com"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>contact@modernisum.com</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </LiquidGlassCard>
        </div>
      )}

      {/* Global Auth Dialog for Sign In / Registration Gate */}
      <AuthDialog
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="signin"
      />
    </div>
  );
}
