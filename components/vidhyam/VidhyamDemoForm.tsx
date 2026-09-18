"use client";

import React, { useState } from "react";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  ShieldCheck 
} from "lucide-react";
import confetti from "canvas-confetti";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export function VidhyamDemoForm() {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactName: "",
    designation: "Principal",
    email: "",
    phone: "",
    students: "1,000 - 2,500",
    city: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const descriptionPayload = `[VIDHYAM CAMPUS DEMO REQUEST]
School: ${formData.schoolName}
Designation: ${formData.designation}
Enrolled Students: ${formData.students}
Location: ${formData.city}
Specific Requirements: ${formData.requirements || "Comprehensive School OS Evaluation"}`;

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.contactName} (${formData.designation})`,
          email: formData.email,
          phone: formData.phone,
          serviceNeeded: "Vidhyam Autonomous School OS",
          budgetRange: formData.students,
          projectDescription: descriptionPayload,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#00f2fe", "#4facfe", "#10b981"],
        });
      } else {
        setError(data.message || "Failed to submit demo request. Please try again.");
      }
    } catch {
      setError("Network connection error. Please try again or message our WhatsApp desk directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
      <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.35)" className="p-8 sm:p-12 border-slate-200/80 dark:border-cyan-400/30">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Schedule Campus Demonstration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
            Experience Vidhyam on Your Campus
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
            Our educational engineering architects will bring live optical turnstile telemetry and timetable generators to your conference room.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Demonstration Booked Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.contactName}</strong>. Your campus evaluation for <strong>{formData.schoolName}</strong> has been logged directly into our engineering pipeline. We will call you within 24 hours to confirm the presentation slot.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline cursor-pointer font-medium"
              >
                Submit another institution request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* School Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Institution / School Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="e.g. Modern Public School"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Contact Person */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Representative Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Designation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Designation</span>
                </label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="Principal">Principal / Head of School</option>
                  <option value="Trustee">Trustee / Chairman / Director</option>
                  <option value="Administrator">Campus Administrator</option>
                  <option value="IT Head">Head of Technology & Systems</option>
                </select>
              </div>

              {/* Official Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Official Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. principal@modernschool.edu"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Direct Mobile / WhatsApp *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Student Count Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>City & Campus Location *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Noida, Uttar Pradesh"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Specific Requirements */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Specific Challenges (Timetables, RFID Gates, WhatsApp Fees, etc.)</span>
              </label>
              <textarea
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Share any existing software pain points or specific dates for demonstration..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>NDA Protected • Zero Sales Spam</span>
              </div>

              <GlassButton
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full sm:w-auto"
                icon={<Sparkles className="w-4 h-4" />}
              >
                {loading ? "Registering Demo..." : "Confirm Campus Demonstration"}
              </GlassButton>
            </div>
          </form>
        )}
      </LiquidGlassCard>
    </section>
  );
}
