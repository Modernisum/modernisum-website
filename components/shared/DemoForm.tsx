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
  Sparkles,
  ShieldCheck,
  Sprout,
  Send
} from "lucide-react";
import confetti from "canvas-confetti";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { useLanguage } from "@/lib/LanguageContext";

export interface DemoFormProps {
  variant?: "school" | "vidhyam" | "agromi" | "farmer";
}

export function DemoForm({ variant = "school" }: DemoFormProps) {
  const { isHindi } = useLanguage();
  // ==========================================
  // VIDHYAM STATE
  // ==========================================
  const [vidhyamData, setVidhyamData] = useState({
    schoolName: "",
    contactName: "",
    designation: "Principal",
    email: "",
    phone: "",
    students: "1,000 - 2,500",
    city: "",
    requirements: "",
  });
  const [vidhyamLoading, setVidhyamLoading] = useState(false);
  const [vidhyamSubmitted, setVidhyamSubmitted] = useState(false);
  const [vidhyamError, setVidhyamError] = useState<string | null>(null);

  // ==========================================
  // AGROMI STATE
  // ==========================================
  const [agromiName, setAgromiName] = useState("");
  const [agromiPhone, setAgromiPhone] = useState("");
  const [agromiEmail, setAgromiEmail] = useState("");
  const [agromiLocation, setAgromiLocation] = useState("");
  const [agromiAcres, setAgromiAcres] = useState("");
  const [agromiCrop, setAgromiCrop] = useState("");
  const [agromiMessage, setAgromiMessage] = useState("");
  const [agromiSubmitted, setAgromiSubmitted] = useState(false);
  const [agromiLoading, setAgromiLoading] = useState(false);

  // VIDHYAM SUBMIT
  const handleVidhyamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVidhyamLoading(true);
    setVidhyamError(null);

    const descriptionPayload = `[MODERNISUM SCHOOL CAMPUS DEMO REQUEST]
School: ${vidhyamData.schoolName}
Designation: ${vidhyamData.designation}
Enrolled Students: ${vidhyamData.students}
Location: ${vidhyamData.city}
Specific Requirements: ${vidhyamData.requirements || "Comprehensive School OS Evaluation"}`;

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${vidhyamData.contactName} (${vidhyamData.designation})`,
          email: vidhyamData.email,
          phone: vidhyamData.phone,
          serviceNeeded: "Modernisum School OS",
          budgetRange: vidhyamData.students,
          projectDescription: descriptionPayload,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setVidhyamSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#00f2fe", "#4facfe", "#10b981"],
        });
      } else {
        setVidhyamError(data.message || "Failed to submit demo request. Please try again.");
      }
    } catch {
      setVidhyamError("Network connection error. Please try again or message our WhatsApp desk directly.");
    } finally {
      setVidhyamLoading(false);
    }
  };

  // AGROMI SUBMIT
  const handleAgromiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAgromiLoading(true);

    setTimeout(() => {
      setAgromiLoading(false);
      setAgromiSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10b981", "#22c55e", "#00f2fe"],
      });
    }, 800);
  };

  // ==========================================
  // VARIANT: AGROMI / FARMER
  // ==========================================
  if (variant === "agromi" || variant === "farmer") {
    return (
      <section className="py-20 relative overflow-hidden" id="demo">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LiquidGlassCard
            glowColor="rgba(16, 185, 129, 0.25)"
            className="p-8 sm:p-12 rounded-3xl border border-emerald-500/30 dark:border-white/10"
          >
            {agromiSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Farm Pilot Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{agromiName}</span>. Our lead agro-tech field engineer will contact you at <span className="font-semibold">{agromiPhone}</span> within 24 hours to schedule your free soil audit.
                </p>
                <div className="pt-4">
                  <GlassButton
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setAgromiSubmitted(false);
                      setAgromiName("");
                      setAgromiPhone("");
                      setAgromiEmail("");
                      setAgromiLocation("");
                      setAgromiAcres("");
                      setAgromiCrop("");
                    }}
                    className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  >
                    Submit Another Inquiry
                  </GlassButton>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3 border border-emerald-500/30">
                    <Sprout className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Free Field Survey & Telemetry Audit</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
                    Request an On-Field Agromi Pilot
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Experience live sub-surface moisture probes and drone NDVI scans directly on your farm with zero upfront risk.
                  </p>
                </div>

                <form onSubmit={handleAgromiSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Full Name *
                      </label>
                      <GlassInput
                        placeholder="e.g. Sardar Gurpreet Singh"
                        value={agromiName}
                        onChange={(e) => setAgromiName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <GlassInput
                        placeholder="+91 9368671007"
                        type="tel"
                        value={agromiPhone}
                        onChange={(e) => setAgromiPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Email Address
                      </label>
                      <GlassInput
                        placeholder="grower@estate.com"
                        type="email"
                        value={agromiEmail}
                        onChange={(e) => setAgromiEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Farm Location (District & State) *
                      </label>
                      <GlassInput
                        placeholder="e.g. Meerut, Uttar Pradesh"
                        value={agromiLocation}
                        onChange={(e) => setAgromiLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Total Cultivated Land (Acres) *
                      </label>
                      <GlassInput
                        placeholder="e.g. 45 Acres"
                        value={agromiAcres}
                        onChange={(e) => setAgromiAcres(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Primary Crops Grown *
                      </label>
                      <GlassInput
                        placeholder="e.g. Basmati Rice, Sugarcane, Wheat"
                        value={agromiCrop}
                        onChange={(e) => setAgromiCrop(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Specific Operational Challenges / Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about water availability, tube-well power cuts, past pest infestations, or mandi selling hurdles..."
                      value={agromiMessage}
                      onChange={(e) => setAgromiMessage(e.target.value)}
                      className="w-full rounded-2xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={agromiLoading}
                      className="w-full justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base group"
                      icon={<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      iconPosition="right"
                    >
                      {agromiLoading ? "Scheduling Field Audit..." : "Book Complimentary Farm Pilot"}
                    </GlassButton>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Zero Obligation</span>
                    </span>
                    <span>•</span>
                    <span>Free On-Site Soil Telemetry Test</span>
                    <span>•</span>
                    <span>Modernisum Studio Guarantee</span>
                  </div>
                </form>
              </div>
            )}
          </LiquidGlassCard>
        </div>
      </section>
    );
  }

  // ==========================================
  // VARIANT: VIDHYAM (DEFAULT)
  // ==========================================
  return (
    <section id="demo" className="py-20 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
      <LiquidGlassCard glowColor="rgba(0, 242, 254, 0.35)" className="p-8 sm:p-12 border-slate-200/80 dark:border-cyan-400/30">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{isHindi ? "कैंपस डेमो शेड्यूल करें" : "Schedule Campus Demonstration"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
            {isHindi ? "अपने स्कूल में Modernisum School का लाइव अनुभव लें" : "Experience Modernisum School on Your Campus"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
            {isHindi
              ? "हमारे विशेषज्ञ आपके स्कूल आकर फेस AI अटेंडेंस और टाइमटेबल ऑटोमेशन का लाइव प्रदर्शन दिखाएंगे।"
              : "Our educational engineering architects will bring live optical turnstile telemetry and timetable generators to your conference room."}
          </p>
        </div>

        {vidhyamSubmitted ? (
          <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              {isHindi ? "डेमो सफलतापूर्वक बुक हो गया!" : "Demonstration Booked Successfully!"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              {isHindi ? (
                <>धन्यवाद, <strong>{vidhyamData.contactName}</strong>। <strong>{vidhyamData.schoolName}</strong> के लिए आपका डेमो अनुरोध दर्ज हो गया है। हमारी टीम 24 घंटे में आपसे संपर्क करेगी।</>
              ) : (
                <>Thank you, <strong>{vidhyamData.contactName}</strong>. Your campus evaluation for <strong>{vidhyamData.schoolName}</strong> has been logged directly into our engineering pipeline. We will call you within 24 hours to confirm the presentation slot.</>
              )}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setVidhyamSubmitted(false)}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline cursor-pointer font-medium"
              >
                {isHindi ? "एक और संस्थान का अनुरोध भेजें" : "Submit another institution request"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVidhyamSubmit} className="space-y-6">
            {vidhyamError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-300">
                {vidhyamError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{isHindi ? "संस्थान / स्कूल का नाम *" : "Institution / School Name *"}</span>
                </label>
                <input
                  type="text"
                  required
                  suppressHydrationWarning
                  value={vidhyamData.schoolName}
                  onChange={(e) => setVidhyamData({ ...vidhyamData, schoolName: e.target.value })}
                  placeholder={isHindi ? "उदा. मॉडर्न पब्लिक स्कूल" : "e.g. Modern Public School"}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{isHindi ? "प्रतिनिधि का नाम *" : "Representative Name *"}</span>
                </label>
                <input
                  type="text"
                  required
                  suppressHydrationWarning
                  value={vidhyamData.contactName}
                  onChange={(e) => setVidhyamData({ ...vidhyamData, contactName: e.target.value })}
                  placeholder={isHindi ? "उदा. डॉ. राजेश शर्मा" : "e.g. Dr. Rajesh Sharma"}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{isHindi ? "पद (Designation)" : "Designation"}</span>
                </label>
                <select
                  value={vidhyamData.designation}
                  suppressHydrationWarning
                  onChange={(e) => setVidhyamData({ ...vidhyamData, designation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="Principal">{isHindi ? "प्रिंसिपल / स्कूल हेड" : "Principal / Head of School"}</option>
                  <option value="Trustee">{isHindi ? "ट्रस्टी / चेयरमैन / डायरेक्टर" : "Trustee / Chairman / Director"}</option>
                  <option value="Administrator">{isHindi ? "स्कूल एडमिनिस्ट्रेटर" : "Campus Administrator"}</option>
                  <option value="IT Head">{isHindi ? "आईटी व सिस्टम हेड" : "Head of Technology & Systems"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{isHindi ? "ऑफिशियल ईमेल *" : "Official Email Address *"}</span>
                </label>
                <input
                  type="email"
                  required
                  suppressHydrationWarning
                  value={vidhyamData.email}
                  onChange={(e) => setVidhyamData({ ...vidhyamData, email: e.target.value })}
                  placeholder="e.g. principal@modernschool.edu"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isHindi ? "मोबाइल / व्हाट्सएप नंबर *" : "Direct Mobile / WhatsApp *"}</span>
                </label>
                <input
                  type="tel"
                  required
                  suppressHydrationWarning
                  value={vidhyamData.phone}
                  onChange={(e) => setVidhyamData({ ...vidhyamData, phone: e.target.value })}
                  placeholder="e.g. +91 9368671007"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isHindi ? "शहर व राज्य *" : "City & Campus Location *"}</span>
                </label>
                <input
                  type="text"
                  required
                  suppressHydrationWarning
                  value={vidhyamData.city}
                  onChange={(e) => setVidhyamData({ ...vidhyamData, city: e.target.value })}
                  placeholder={isHindi ? "उदा. मेरठ / नोएडा, उत्तर प्रदेश" : "e.g. Noida, Uttar Pradesh"}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{isHindi ? "विशेष आवश्यकताएं (टाइमटेबल, फेस AI, फीस वसूली आदि)" : "Specific Challenges (Timetables, RFID Gates, WhatsApp Fees, etc.)"}</span>
              </label>
              <textarea
                rows={3}
                suppressHydrationWarning
                value={vidhyamData.requirements}
                onChange={(e) => setVidhyamData({ ...vidhyamData, requirements: e.target.value })}
                placeholder={isHindi ? "कोई भी सवाल या डेमो के लिए उपयुक्त तारीख साझा करें..." : "Share any existing software pain points or specific dates for demonstration..."}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isHindi ? "NDA सुरक्षित • शून्य स्पैम गारंटी" : "NDA Protected • Zero Sales Spam"}</span>
              </div>

              <GlassButton
                type="submit"
                variant="primary"
                size="lg"
                loading={vidhyamLoading}
                className="w-full sm:w-auto"
                icon={<Sparkles className="w-4 h-4" />}
              >
                {isHindi ? "लाइव डेमो शेड्यूल करें" : "Schedule Campus Demonstration"}
              </GlassButton>
            </div>
          </form>
        )}
      </LiquidGlassCard>
    </section>
  );
}

export function VidhyamDemoForm() {
  return <DemoForm variant="vidhyam" />;
}

export function AgromiDemoForm() {
  return <DemoForm variant="agromi" />;
}
