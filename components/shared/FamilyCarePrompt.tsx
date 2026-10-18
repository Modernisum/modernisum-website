"use client";

import React, { useState } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  HeartHandshake,
  MessageCircle,
  Phone,
  Building2,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  HelpCircle,
  Users,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/lib/LanguageContext";
import { sendEmpathySignal } from "@/lib/empathy-telemetry";

export interface FamilyCarePromptProps {
  className?: string;
  defaultHurdle?: string;
  product?: string;
}

export function FamilyCarePrompt({
  className = "",
  defaultHurdle = "",
  product = "school",
}: FamilyCarePromptProps) {
  const { isHindi } = useLanguage();

  const [form, setForm] = useState({
    institutionName: "",
    contactPerson: "",
    contactNumber: "",
    cityState: "",
    studentCount: "",
    challenge: defaultHurdle || "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedHurdles = [
    {
      en: "Biometric Turnstiles & Staff Loss-of-Pay (LOP)",
      hi: "बायोमेट्रिक टर्नस्टाइल व स्टाफ लेट-मार्क / LOP वेतन गणना",
    },
    {
      en: "Fee Deficit Shortfall Radar (+25%) & WhatsApp Reminders",
      hi: "फीस बकाया शॉर्टफॉल रडार (+25%) और स्वचालित व्हाट्सएप संदेश",
    },
    {
      en: "Zero-Conflict Timetable Matrix & Teacher Substitution",
      hi: "टाइमटेबल टकराव निवारण व शिक्षक अनुपस्थिति प्रतिस्थापन",
    },
    {
      en: "Govt Portals Auto-Fill (CBSE LOC & U-DISE+ Extension)",
      hi: "सरकारी पोर्टल स्वतः-भरण (CBSE LOC एवं U-DISE+ एक्सटेंशन)",
    },
    {
      en: "Bus GPS Fleet Telemetry & Parent Live Tracking",
      hi: "स्कूल बस जीपीएस ट्रैकिंग व अभिभावक लाइव रूट अलर्ट",
    },
    {
      en: "Other Institutional Operational Challenge",
      hi: "अन्य संस्थागत प्रशासनिक चुनौती",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.institutionName || !form.contactNumber) {
      setError(
        isHindi
          ? "कृपया विद्यालय का नाम और संपर्क नंबर अवश्य दर्ज करें।"
          : "Please provide your institution name and contact number."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. Send anonymous empathy signal
      sendEmpathySignal({
        product,
        intentType: "family_inquiry",
        feature: form.challenge || "General Institutional Care",
        language: isHindi ? "hi" : "en",
        metadata: {
          institution: form.institutionName,
          city: form.cityState,
        },
      });

      // 2. Submit to Family Care API
      const res = await fetch("/api/family-care/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          preferredLanguage: isHindi ? "hi" : "en",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } else {
        setError(json.error || "कुछ त्रुटि हुई। कृपया पुनः प्रयास करें।");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  const openDirectWhatsApp = () => {
    const greeting = isHindi
      ? `नमस्ते मॉडर्निज़्म टीम! मैं अपनी संस्था के लिए प्रशासनिक समाधान व मार्गदर्शन के विषय में चर्चा करना चाहता/चाहती हूँ।`
      : `Namaste Modernisum team! I would like to discuss administrative guidance for our educational institution.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(greeting)}`, "_blank");
  };

  return (
    <div className={`relative ${className}`}>
      <LiquidGlassCard className="p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-950/40 to-cyan-950/20 shadow-2xl overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <HeartHandshake className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isHindi ? "अतिथि देवो भव • आपका सत्कार स्वीकार है" : "Honored Guest • We Welcome You"}
            </h3>
            <p className="text-sm text-emerald-200/90 max-w-lg mx-auto leading-relaxed">
              {isHindi
                ? "आपकी संस्था का अनुरोध सम्मानपूर्वक प्राप्त कर लिया गया है। हमारे मुख्य वास्तुकार / प्रशासनिक विशेषज्ञ जल्द ही आपसे व्हाट्सएप या कॉल पर संपर्क करेंगे।"
                : "Your institutional challenge has been received with supreme respect. Our engineering and school administration architects will reach out shortly."}
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={openDirectWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{isHindi ? "सीधे व्हाट्सएप पर बात करें" : "Chat on WhatsApp Instantly"}</span>
              </button>
              <GlassButton
                onClick={() => setSubmitted(false)}
                className="text-xs px-4 py-2.5"
              >
                {isHindi ? "अन्य जानकारी भेजें" : "Submit Another Note"}
              </GlassButton>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Philosophy Badge & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                  {isHindi ? "अतिथि देवो भव • संस्थागत संवाद" : "Atithi Devo Bhava • Institutional Care"}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  {isHindi ? "अपनी संस्था की चुनौती साझा करें" : "Share Your School's Operational Challenge"}
                </h3>
                <p className="text-xs text-white/60 mt-1 max-w-xl">
                  {isHindi
                    ? "बिना किसी सेल्स कॉल या आक्रामक मार्केटिंग के — केवल समाधान-उन्मुख संवाद और प्रत्यक्ष मार्गदर्शन।"
                    : "Zero aggressive sales pitching. Genuine technical dialogue with architects who understand Indian school operations."}
                </p>
              </div>

              {/* Direct WhatsApp Quick Pill */}
              <button
                type="button"
                onClick={openDirectWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all self-start md:self-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isHindi ? "सीधा व्हाट्सएप संवाद" : "Direct WhatsApp"}</span>
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                {error}
              </div>
            )}

            {/* Friction-Free Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    {isHindi ? "विद्यालय / संस्था का नाम *" : "Institution Name *"}
                  </label>
                  <GlassInput
                    required
                    placeholder={
                      isHindi
                        ? "जैसे: सरस्वती विद्या मंदिर, मेरठ"
                        : "e.g. Modern Academy, Jaipur"
                    }
                    value={form.institutionName}
                    onChange={(e) => setForm({ ...form, institutionName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    {isHindi ? "व्हाट्सएप या मोबाइल नंबर *" : "WhatsApp or Mobile Number *"}
                  </label>
                  <GlassInput
                    required
                    placeholder="+91 9368671007"
                    value={form.contactNumber}
                    onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    {isHindi ? "आपका नाम व पद (वैकल्पिक)" : "Your Name & Role (Optional)"}
                  </label>
                  <GlassInput
                    placeholder={
                      isHindi
                        ? "जैसे: श्री राजेश शर्मा (प्रधानाचार्य)"
                        : "e.g. Dr. Rajesh Sharma (Principal)"
                    }
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    {isHindi ? "शहर व राज्य" : "City & State"}
                  </label>
                  <GlassInput
                    placeholder={isHindi ? "जैसे: मेरठ, उत्तर प्रदेश" : "e.g. Meerut, Uttar Pradesh"}
                    value={form.cityState}
                    onChange={(e) => setForm({ ...form, cityState: e.target.value })}
                  />
                </div>
              </div>

              {/* Predefined Hurdles Quick Selector */}
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  {isHindi ? "मुख्य प्रशासनिक समस्या / आवश्यकता:" : "Primary Operational Challenge:"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  {predefinedHurdles.map((h, idx) => {
                    const label = isHindi ? h.hi : h.en;
                    const isSelected = form.challenge === label;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setForm({ ...form, challenge: label })}
                        className={`text-left p-2.5 rounded-xl text-xs transition-all border ${
                          isSelected
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium"
                            : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? "bg-emerald-400" : "bg-white/30"
                            }`}
                          />
                          <span className="truncate">{label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <textarea
                  rows={2}
                  placeholder={
                    isHindi
                      ? "अथवा अपनी समस्या का विवरण अपने शब्दों में लिखें..."
                      : "Or write your custom requirements in brief..."
                  }
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  className="w-full p-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              {/* Submit Button & Ethics Note */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    {isHindi
                      ? "100% गोपनीय • कभी भी स्पैम या अवांछित कॉल नहीं"
                      : "100% Confidential • Zero Spam or Aggressive Calls"}
                  </span>
                </div>

                <GlassButton
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {loading
                      ? isHindi
                        ? "प्रेषित हो रहा है..."
                        : "Submitting..."
                      : isHindi
                      ? "अतिथि संवाद अनुरोध भेजें"
                      : "Send Respectful Inquiry"}
                  </span>
                </GlassButton>
              </div>
            </form>
          </div>
        )}
      </LiquidGlassCard>
    </div>
  );
}
