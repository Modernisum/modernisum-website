"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Laptop,
  Printer,
  Sparkles,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Send
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";

const CATEGORIES = [
  "Desktop Installation & Windows SmartScreen",
  "Campus LAN Multi-PC Synchronization",
  "Thermal Receipt Printer (ESC/POS 80mm/58mm)",
  "Biometric / CCTV Face AI Attendance Gate",
  "Database Backup, Mirror & Disaster Recovery",
  "WhatsApp Parent Notification Invoicing",
  "CBSE / ICSE Report Card Format Calibration",
  "Other Technical Question",
];

const FAQS = [
  {
    q: "How fast will an engineer assist if our fee counter printer stops working?",
    a: "If marked as 'Campus Emergency' (such as fee day morning), our dedicated WhatsApp and remote AnyDesk engineers respond within 15 minutes guaranteed under all active tiers.",
  },
  {
    q: "Can Modernisum engineers connect remotely to configure our master PC?",
    a: "Yes. With institutional authorization, our systems engineers connect via secure AnyDesk or TeamViewer to test LAN ports, format thermal drivers, and verify database integrity.",
  },
  {
    q: "What happens if our school broadband connection goes down?",
    a: "Vidhyam is built on an offline-first architecture. All fees, receipts, and attendance continue running locally over campus Wi-Fi without needing cloud connectivity.",
  },
];

export default function VidhyamSupportPage() {
  const [formData, setFormData] = useState({
    schoolCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    urgency: "Normal",
    category: CATEGORIES[0],
    subject: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/schools/support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setTicketResult(data.ticket);
      } else {
        alert(data.message || "Failed to submit support ticket");
      }
    } catch (err) {
      console.error("Support ticket error:", err);
      alert("Error submitting ticket to helpdesk");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* 1. Hero & SLA Overview */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Headphones className="w-3.5 h-3.5" />
          <span>Institutional Mission Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Enterprise School Helpdesk &{" "}
          <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
            Technical SLA
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          Real engineers on standby. Whether setting up your first LAN server or fine-tuning thermal receipt templates, Modernisum provides rapid remote assistance.
        </p>

        {/* SLA Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center space-y-1">
            <span className="text-lg font-bold text-cyan-500 font-mono">15 Mins</span>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Emergency SLA</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Exam day & fee counter blocks</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center space-y-1">
            <span className="text-lg font-bold text-purple-500 font-mono">Remote Desktop</span>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">AnyDesk / TeamViewer</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct hands-on configuration</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center space-y-1">
            <span className="text-lg font-bold text-emerald-500 font-mono">WhatsApp Desk</span>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Priority Channel</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct voice & chat hotline</p>
          </div>
        </div>
      </div>

      {/* 2. Main Support Split: Form & Direct Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Ticket Form */}
        <div className="lg:col-span-7">
          <LiquidGlassCard className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Submit an Institutional Support Ticket
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tickets are routed immediately to the Vidhyam systems engineering team.
              </p>
            </div>

            {ticketResult ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Ticket #{ticketResult.ticketId} Created!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    An engineer has been assigned. You will receive an update at your registered email and phone.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-mono inline-block">
                  Urgency: {ticketResult.urgency} • Status: {ticketResult.status}
                </div>
                <div className="pt-2">
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setTicketResult(null)}
                  >
                    Submit Another Request
                  </GlassButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      School Code (Optional)
                    </label>
                    <GlassInput
                      placeholder="e.g. SCH-4821"
                      value={formData.schoolCode}
                      onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Administrator Name *
                    </label>
                    <GlassInput
                      required
                      placeholder="e.g. Principal Sharma"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Contact Email *
                    </label>
                    <GlassInput
                      required
                      type="email"
                      placeholder="principal@school.edu.in"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Phone Number *
                    </label>
                    <GlassInput
                      required
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Urgency Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Normal" className="dark:bg-slate-900">Normal (Within 2 Hours)</option>
                      <option value="Urgent" className="dark:bg-slate-900">Urgent (Within 45 Minutes)</option>
                      <option value="Campus Emergency" className="dark:bg-slate-900">Campus Emergency (Within 15 Minutes)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Issue Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="dark:bg-slate-900">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Description of Issue *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what occurred, any error messages displayed, and hardware details..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={submitting}
                    className="w-full justify-center"
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Submit Ticket to Engineering Desk
                  </GlassButton>
                </div>
              </form>
            )}
          </LiquidGlassCard>
        </div>

        {/* Right Column: Direct Help Channels & FAQs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct WhatsApp Channel */}
          <LiquidGlassCard className="p-6 space-y-4 border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Direct Principal Hotline
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Instant messaging for verified campus administrators
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Skip email threads during critical operations. Ping our principal liaison on WhatsApp for quick guidance.
            </p>

            <a
              href="https://wa.me/919876543210?text=Hello%20Vidhyam%20Team,%20I%20need%20assistance%20with%20our%20school%20setup"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <GlassButton variant="secondary" size="sm" className="w-full justify-center text-emerald-600 dark:text-emerald-400 border-emerald-500/40">
                Open WhatsApp (+91 98765 43210)
              </GlassButton>
            </a>
          </LiquidGlassCard>

          {/* Quick Troubleshooting FAQs */}
          <LiquidGlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Emergency Questions
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq) => (
                <div key={faq.q} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05] space-y-1">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link href="/vidhyam/docs" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1">
                <span>Browse full documentation and tutorials</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
