"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [service, setService] = useState("Modern School ERP Ecosystem");
  const [budget, setBudget] = useState("₹50K - ₹2L / Moderate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const servicesList = [
    "Modern School ERP Ecosystem",
    "AI-Integrated SaaS Solutions",
    "Modern Web Application (Next.js)",
    "Mobile Applications (Flutter iOS/Android)",
    "Custom Desktop Software & RFID",
    "IoT & Industrial Automation",
    "Cloud Services & Serverless Architecture",
  ];

  const budgetOptions = [
    "< ₹50,000 (Rapid Prototype)",
    "₹50,000 - ₹2,00,000 (Production App)",
    "₹2,00,000 - ₹5,00,000 (Complete Ecosystem)",
    "₹5,00,000+ (Enterprise School Network)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          serviceNeeded: service,
          budgetRange: budget,
          projectDescription: description,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setError(data.message || "Failed to submit enquiry.");
      }
    } catch (err) {
      setError("Network error. Please call +91 9368671007 directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
              <Calculator className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Direct Engineering Consultation</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
              Let&apos;s Engineer Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                Software Platform
              </span>
            </h1>
            <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
              Receive a detailed architectural blueprint and transparent milestone pricing within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.15)"
                className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10"
              >
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                      Architecture Inquiry Received
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto font-normal dark:font-light leading-relaxed">
                      Thank you, <span className="text-cyan-700 dark:text-cyan-300 font-medium">{name}</span>. Our lead software architects at our Meerut center will review your specifications and contact you shortly.
                    </p>
                    <div className="pt-4">
                      <GlassButton
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSubmitted(false);
                          setDescription("");
                        }}
                      >
                        Submit Another Inquiry
                      </GlassButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                      Interactive Quote & Architecture Request
                    </h3>

                    {error && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-300">
                        {error}
                      </div>
                    )}

                    {/* Step 1: Select Service */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-2">
                        1. Select Solution Scope *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {servicesList.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setService(s)}
                            className={`p-3 rounded-xl text-left text-xs font-medium transition-all cursor-pointer ${
                              service === s
                                ? "bg-cyan-500/15 border border-cyan-500/60 text-cyan-900 dark:text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.15)] font-semibold"
                                : "bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/[0.07]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Select Budget */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-2">
                        2. Approximate Budget Scale
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {budgetOptions.map((b, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                              budget === b
                                ? "bg-purple-500/15 border border-purple-500/60 text-purple-900 dark:text-purple-200 font-semibold"
                                : "bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-400 hover:bg-white dark:hover:bg-white/[0.07]"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Your Full Name *</label>
                        <GlassInput
                          placeholder="e.g. Dr. Rajesh Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Work Email *</label>
                        <GlassInput
                          placeholder="you@institution.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Phone / WhatsApp Number</label>
                      <GlassInput
                        placeholder="+91 9368671007"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                        Project Overview & Key Requirements *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your campus size, current bottlenecks, expected student/user volume, and timeline..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/15 p-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-sans"
                      />
                    </div>

                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      icon={<Send className="w-4 h-4" />}
                      className="w-full"
                    >
                      Submit Architecture Inquiry
                    </GlassButton>
                  </form>
                )}
              </LiquidGlassCard>
            </div>

            {/* Direct Contact Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <LiquidGlassCard
                glowColor="rgba(121, 40, 202, 0.15)"
                className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                    Direct Access
                  </span>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    Modernisum Headquarters
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal dark:font-light mt-2 leading-relaxed">
                    Prefer direct voice or in-person discussion? Our engineering team is stationed in Meerut.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                    <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Physical Address</span>
                      <span>Jail Chungi, Kila Road, Near CCS University, Meerut, Uttar Pradesh, Pin-250001</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Phone & WhatsApp</span>
                      <a href="tel:+919368671007" className="hover:text-cyan-700 text-cyan-600 dark:text-cyan-400 font-medium">
                        +91 9368671007
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                    <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Email</span>
                      <a href="mailto:contact@modernisum.com" className="hover:text-cyan-700 text-cyan-600 dark:text-cyan-400 font-medium">
                        contact@modernisum.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Working Hours</span>
                      <span>Mon - Fri: 09:00 - 18:00 IST<br />Sat: 10:00 - 15:00 IST</span>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
