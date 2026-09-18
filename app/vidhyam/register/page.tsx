"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  Phone,
  Layers,
  Download,
  Laptop,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";

const BOARDS = [
  "CBSE - Central Board of Secondary Education",
  "ICSE - Council for the Indian School Certificate Examinations",
  "State Board (UP / Bihar / Maharashtra / Uttarakhand / etc.)",
  "IB - International Baccalaureate",
  "Cambridge CAIE / IGCSE",
  "Other Recognized Board",
];

const STREAMS = ["PCM", "PCB", "Commerce", "Arts & Humanities"];

const TIERS = [
  { id: "Starter", name: "Starter", price: "₹15,000/yr", desc: "Up to 500 Students" },
  { id: "Growth", name: "Growth", price: "₹35,000/yr", desc: "Up to 1,500 Students (Recommended)" },
  { id: "Enterprise", name: "Enterprise", price: "₹75,000/yr", desc: "Unlimited Students & Priority Support" },
];

export default function VidhyamRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [registeredSchool, setRegisteredSchool] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    affiliationBoard: "CBSE",
    affiliationNumber: "",
    streams: ["PCM", "Commerce"],
    subscriptionTier: "Growth",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Dehradun",
    pincode: "248001",
    address: "",
    contactPhone: "",
    contactEmail: "",
    adminName: "",
    adminEmail: "",
    password: "",
  });

  const toggleStream = (stream: string) => {
    setFormData((prev) => ({
      ...prev,
      streams: prev.streams.includes(stream)
        ? prev.streams.filter((s) => s !== stream)
        : [...prev.streams, stream],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/schools/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setRegisteredSchool(data.school);
        setStep(4);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering school workspace");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] flex flex-col justify-between py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Header Logo */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between mb-8 z-10">
        <Link href="/vidhyam" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
            <Image src="/logo.png" alt="Modernisum" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">VIDHYAM CLOUD</span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider block">BY MODERNISUM</span>
          </div>
        </Link>
        <Link href="/vidhyam" className="text-xs text-slate-400 hover:text-white transition-colors">
          Back to Overview →
        </Link>
      </div>

      {/* Main Registration Container */}
      <div className="max-w-xl w-full mx-auto z-10">
        <LiquidGlassCard glowColor="cyan" className="p-6 sm:p-8">
          {/* Step Progression Bar */}
          {step <= 3 && (
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
                <span>Step {step} of 3</span>
                <span className="text-cyan-300">
                  {step === 1 ? "School Profile" : step === 2 ? "Campus Location" : "Admin Credentials"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {step <= 3 ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Step 1: School Identity */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-cyan-400" />
                      School Identity & Affiliation
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Enter official institutional credentials for your school workspace.
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Official School Name</label>
                    <GlassInput
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Doon Heritage Global School"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1">Affiliation Board</label>
                      <select
                        value={formData.affiliationBoard}
                        onChange={(e) => setFormData({ ...formData, affiliationBoard: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl glass-panel border border-white/10 bg-[#07090e] text-slate-200"
                      >
                        {BOARDS.map((b) => (
                          <option key={b} value={b.split(" - ")[0]}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">Affiliation / Reg #</label>
                      <GlassInput
                        value={formData.affiliationNumber}
                        onChange={(e) => setFormData({ ...formData, affiliationNumber: e.target.value })}
                        placeholder="e.g. 213089"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1.5">Academic Streams Offered</label>
                    <div className="flex flex-wrap gap-2">
                      {STREAMS.map((s) => {
                        const isSelected = formData.streams.includes(s);
                        return (
                          <button
                            type="button"
                            key={s}
                            onClick={() => toggleStream(s)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1.5">Subscription Tier</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIERS.map((tier) => (
                        <div
                          key={tier.id}
                          onClick={() => setFormData({ ...formData, subscriptionTier: tier.id })}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            formData.subscriptionTier === tier.id
                              ? "bg-purple-500/20 text-white border-purple-500/50 shadow-[0_0_15px_rgba(121,40,202,0.2)]"
                              : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="font-bold text-white text-xs">{tier.name}</div>
                          <div className="text-[11px] text-purple-300 font-mono">{tier.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Campus Location */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      Campus Location & Contacts
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Physical campus address for geo-zoning and official records.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1">State</label>
                      <GlassInput
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. Uttarakhand"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">District</label>
                      <GlassInput
                        required
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="e.g. Dehradun"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1">City / Town</label>
                      <GlassInput
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Dehradun"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">Postal Pincode</label>
                      <GlassInput
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="248001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Campus Street Address</label>
                    <GlassInput
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Road, Sector or Enclave"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1">Campus Phone</label>
                      <GlassInput
                        required
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">Official School Email</label>
                      <GlassInput
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="info@school.edu.in"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Admin Credentials */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-emerald-400" />
                      Administrator Security Dossier
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Create master administrator credentials for initial workspace deployment.
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Principal / Director Legal Name</label>
                    <GlassInput
                      required
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      placeholder="e.g. Dr. Rajeshwar Sharma"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Admin Email (Login ID)</label>
                    <GlassInput
                      type="email"
                      required
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      placeholder="principal@school.edu.in"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Master Password</label>
                    <GlassInput
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••••••"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Minimum 8 characters with upper, lowercase and numeric characters.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Instant automated deployment to Modernisum Cloud Fleet upon submission.</span>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {step > 1 ? (
                  <GlassButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(step - 1)}
                    icon={<ArrowLeft className="w-3.5 h-3.5" />}
                  >
                    Previous
                  </GlassButton>
                ) : (
                  <div />
                )}

                <GlassButton
                  type="submit"
                  variant="primary"
                  loading={submitting}
                  icon={step === 3 ? <Sparkles className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {step === 3 ? "Complete Registration" : "Next Step"}
                </GlassButton>
              </div>
            </form>
          ) : (
            /* Step 4: Success & Workspace Confirmation */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  School Workspace Provisioned!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Welcome to the Modernisum Educational Cloud Fleet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned School Code:</span>
                  <span className="font-mono font-bold text-cyan-400">{registeredSchool?.schoolCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">School Name:</span>
                  <span className="font-semibold text-white">{registeredSchool?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Administrator:</span>
                  <span className="text-slate-300">{registeredSchool?.adminEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tier:</span>
                  <span className="text-purple-400 font-semibold">{registeredSchool?.subscriptionTier}</span>
                </div>
              </div>

              {/* Windows Desktop App Download Callout */}
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-left flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5" />
                    Install Vidhyam Desktop OS
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Use school code <strong className="text-cyan-300 font-mono">{registeredSchool?.schoolCode}</strong> inside the app.
                  </p>
                </div>
                <Link href="/vidhyam/download">
                  <GlassButton variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                    Download App
                  </GlassButton>
                </Link>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <Link href="/admin/schools">
                  <GlassButton variant="secondary" size="sm" icon={<Layers className="w-3.5 h-3.5" />}>
                    Fleet Manager
                  </GlassButton>
                </Link>
                <Link href="/vidhyam">
                  <GlassButton variant="ghost" size="sm">
                    Return to Showcase
                  </GlassButton>
                </Link>
              </div>
            </div>
          )}
        </LiquidGlassCard>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 mt-8 z-10">
        © {new Date().getFullYear()} Modernisum Technologies. All rights reserved.
      </footer>
    </div>
  );
}
