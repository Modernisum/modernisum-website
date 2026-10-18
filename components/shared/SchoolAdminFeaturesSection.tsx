"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";
import {
  CreditCard,
  ScanFace,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

interface TrustPillar {
  id: string;
  badgeHi: string;
  badgeEn: string;
  metricHi: string;
  metricEn: string;
  icon: React.ElementType;
  glow: string;
  accentBorder: string;
  accentText: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  descriptionHi: string;
  descriptionEn: string;
  pointsHi: string[];
  pointsEn: string[];
}

const TRUST_PILLARS: TrustPillar[] = [
  {
    id: "financial-peace",
    badgeHi: "वित्तीय पारदर्शिता",
    badgeEn: "Financial Peace",
    metricHi: "99.8% समय पर वसूली",
    metricEn: "99.8% On-Time Recovery",
    icon: CreditCard,
    glow: "rgba(16, 185, 129, 0.25)",
    accentBorder: "border-emerald-500/30",
    accentText: "text-emerald-600 dark:text-emerald-400",
    titleHi: "शून्य वित्तीय लीकेज एवं पारदर्शी फीस प्रबंधन",
    titleEn: "Zero Fee Leakage & Transparent Financials",
    subtitleHi: "स्कूल का एक-एक रुपया सुरक्षित, बिना किसी मैन्युअल हिसाब या बैंक मिसमैच के",
    subtitleEn: "Every rupee accounted for with zero manual tallying and no bank drift",
    descriptionHi:
      "अक्सर स्कूलों में किश्तों, लेट फीस और कंसेशन का हिसाब रखने में लाखों की लीकेज हो जाती है। Modernisum School में हर छात्र की फीस का सटीक ब्योरा स्वतः दर्ज होता है, माता-पिता को समय पर रिमाइंडर जाता है और तुरंत अधिकृत डिजिटल रसीद मिलती है।",
    descriptionEn:
      "Schools routinely face revenue leakages from fragmented fee waivers and untracked installment schedules. Modernisum School automates the entire fee cycle with transparent ledgers, automated WhatsApp due reminders, and instant authorized receipts.",
    pointsHi: [
      "किश्तों और लेट फीस का 100% सटीक और ऑटोमेटेड हिसाब",
      "पेरेंट्स को व्हाट्सएप पर सौम्य फीस रिमाइंडर व तुरंत रसीद",
      "प्रिंसिपल के लिए दैनिक फीस कलेक्शन का 1-क्लिक क्लियर ऑडिट",
    ],
    pointsEn: [
      "Automated tracking of installments, fines, and fee concessions",
      "Instant WhatsApp payment acknowledgements & digital receipts",
      "Single-click daily collection audits for principals and trustees",
    ],
  },
  {
    id: "campus-safety",
    badgeHi: "परिसर सुरक्षा",
    badgeEn: "Campus Safety",
    metricHi: "0.38s सुरक्षित गेट एंट्री",
    metricEn: "0.38s Safe Gate Entry",
    icon: ScanFace,
    glow: "rgba(6, 182, 212, 0.25)",
    accentBorder: "border-cyan-500/30",
    accentText: "text-cyan-600 dark:text-cyan-400",
    titleHi: "सुरक्षित परिसर एवं माता-पिता का अटूट विश्वास",
    titleEn: "Child Safety & Instant Parent Assurance",
    subtitleHi: "गेट पर त्वरित एंट्री और बस की लाइव लोकेशन से माता-पिता हमेशा निश्चिंत",
    subtitleEn: "Sub-second gate attendance and live bus tracking keep parents assured",
    descriptionHi:
      "जैसे ही छात्र स्कूल गेट से प्रवेश करता है, 0.38 सेकंड में बिना लाइन लगे अटेंडेंस दर्ज हो जाती है और माता-पिता के फोन पर तुरंत सुरक्षित आगमन का मैसेज पहुंच जाता है। स्कूल बस की लाइव लोकेशन भी पैरेंट ऐप पर पारदर्शी दिखती है।",
    descriptionEn:
      "When a student steps through the school gate, attendance is logged in 0.38 seconds without long queues, and an immediate confirmation reaches parents on WhatsApp. Parents also track school buses live without calling drivers or the reception.",
    pointsHi: [
      "बिना लाइन लगे 0.38 सेकंड में सुरक्षित कॉन्टैक्टलेस एंट्री",
      "छात्र के गेट अंदर या बाहर जाते ही पैरेंट को तुरंत व्हाट्सएप संदेश",
      "स्कूल बस की लाइव लोकेशन ताकि माता-पिता को स्टैंड पर इंतजार न करना पड़े",
    ],
    pointsEn: [
      "Queue-free 0.38s contactless entry at campus gates",
      "Instant WhatsApp notification as student arrives or departs",
      "Live school bus GPS tracking so parents never wait in anxiety",
    ],
  },
  {
    id: "teacher-freedom",
    badgeHi: "शिक्षकों का समय",
    badgeEn: "Educator Time",
    metricHi: "3s में प्रॉक्सी टीचर",
    metricEn: "3s Auto Proxy Allocation",
    icon: GraduationCap,
    glow: "rgba(99, 102, 241, 0.25)",
    accentBorder: "border-indigo-500/30",
    accentText: "text-indigo-600 dark:text-indigo-400",
    titleHi: "कागजी काम खत्म — शिक्षक केवल पढ़ाने पर ध्यान दें",
    titleEn: "Zero Clerical Drag — Teachers Focus on Teaching",
    subtitleHi: "टाइमटेबल, प्रॉक्सी और परीक्षा की तैयारी अब बिना किसी सिरदर्द के",
    subtitleEn: "Timetables, substitute arrangements, and exam setups run seamlessly",
    descriptionHi:
      "जब कोई शिक्षक अचानक छुट्टी पर होता है, तो स्कूल में खाली पीरियड की समस्या बन जाती है। हमारा स्कूल सिस्टम 3 सेकंड में बिना किसी क्लैश के सबसे उपयुक्त शिक्षक को क्लास असाइन कर देता है। शिक्षकों को घंटों रजिस्टर या पेपर्स बनाने में नहीं उलझना पड़ता।",
    descriptionEn:
      "Sudden teacher absences disrupt morning schedules. Modernisum School automatically allocates substitute teachers in under 3 seconds based on subject match and workload balance. Teachers spend their energy inspiring students rather than managing paperwork.",
    pointsHi: [
      "टीचर की अनुपस्थिति पर 3 सेकंड में क्लास का ऑटो-सब्स्टिट्यूशन",
      "सिलेबस के अनुसार संतुलित प्रश्न-पत्र कुछ ही पलों में तैयार",
      "मोबाइल ऐप से 1-टैप अटेंडेंस और तुरंत डायरी व होमवर्क शेयरिंग",
    ],
    pointsEn: [
      "Instant substitute teacher allocation under 3 seconds",
      "Balanced, syllabus-compliant question papers generated in moments",
      "One-tap mobile roll call and digital homework broadcasting",
    ],
  },
  {
    id: "offline-sovereignty",
    badgeHi: "ऑफलाइन विश्वसनीयता",
    badgeEn: "Offline Resilience",
    metricHi: "100% बिना इंटरनेट चालू",
    metricEn: "100% Works Without Internet",
    icon: ShieldCheck,
    glow: "rgba(168, 85, 247, 0.25)",
    accentBorder: "border-purple-500/30",
    accentText: "text-purple-600 dark:text-purple-400",
    titleHi: "100% ऑफलाइन भरोसा एवं संपूर्ण डेटा गोपनीयता",
    titleEn: "100% Offline Reliability & Complete Data Privacy",
    subtitleHi: "इंटरनेट बंद हो तब भी स्कूल का कोई काम नहीं रुकेगा, डेटा स्कूल के पास सुरक्षित",
    subtitleEn: "Operations never pause during internet outages; your school data stays private",
    descriptionHi:
      "इंटरनेट चले जाने पर अक्सर वेब-आधारित सॉफ्टवेयर ठप पड़ जाते हैं जिससे काउंटर पर फीस या एडमिशन रुक जाते हैं। हमारा स्कूल सॉफ्टवेयर पूरी तरह ऑफलाइन डेस्कटॉप पर चलता है। आपके स्कूल और छात्रों का संवेदनशील डेटा आपके अपने कंप्यूटर पर 100% सुरक्षित रहता है।",
    descriptionEn:
      "Web-only software stops working whenever the campus internet glitches, halting fee counters and admissions. Modernisum School runs natively on your school's desktop offline. Sensitive student records remain strictly private under your institution's sole ownership.",
    pointsHi: [
      "ब्रॉडबैंड या बिजली कटने पर भी फीस काउंटर व गेट 100% एक्टिव",
      "स्कूल के सभी कंप्यूटर्स आपस में बिना इंटरनेट लोकल नेटवर्क पर सिंक",
      "डेटा का पूर्ण मालिकाना हक स्कूल के पास, कोई थर्ड-पार्टी क्लाउड लीक नहीं",
    ],
    pointsEn: [
      "Fee counters and admission desks operate 100% without internet",
      "School computers sync seamlessly across local campus LAN",
      "Sole data ownership remains with your institution with zero third-party leakage",
    ],
  },
];

export function SchoolAdminFeaturesSection() {
  const { language } = useLanguage();
  const lang = language;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/70 dark:bg-black/40 border-y border-slate-200/80 dark:border-white/5 scroll-mt-28" id="school-trust">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
              <HeartHandshake className="w-3.5 h-3.5 text-cyan-500" />
              <span>{lang === "hi" ? "स्कूल प्रबंधन का अटूट भरोसा" : "Institutional Trust & Peace of Mind"}</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            {lang === "hi" ? (
              <>
                स्कूल प्रबंधन Modernisum School को ही{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  क्यों चुनता है?
                </span>
              </>
            ) : (
              <>
                Why School Leadership{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Chooses Modernisum School
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === "hi"
              ? "बिना किसी तकनीकी झंझट के पूरे स्कूल का सुगम संचालन। मैनेजमेंट को 100% वित्तीय पारदर्शिता, शिक्षकों को पढ़ाने की आजादी और अभिभावकों को सुरक्षित परिसर का भरोसा।"
              : "Built for school principals, trustees, and administrative heads. Effortless campus operations with total financial transparency, teacher freedom, and parent assurance."}
          </p>
        </div>

        {/* 4 Clean, Elegant Trust Cards (No complex categories, no search bar, no tech jargon) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="flex">
                <LiquidGlassCard
                  glowColor={pillar.glow}
                  className="w-full h-full p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl flex flex-col justify-between group hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Header: Icon & Metric Badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                        {lang === "hi" ? pillar.metricHi : pillar.metricEn}
                      </span>
                    </div>

                    {/* Card Title & Subtitle */}
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                        {lang === "hi" ? pillar.badgeHi : pillar.badgeEn}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                        {lang === "hi" ? pillar.titleHi : pillar.titleEn}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {lang === "hi" ? pillar.subtitleHi : pillar.subtitleEn}
                      </p>
                    </div>

                    {/* Practical Non-Technical Explanation */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                      {lang === "hi" ? pillar.descriptionHi : pillar.descriptionEn}
                    </p>

                    {/* 3 Key Practical Benefit Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
                      {(lang === "hi" ? pillar.pointsHi : pillar.pointsEn).map((point, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subtle Card Footer */}
                  <div className="pt-4 mt-5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                    <span>{lang === "hi" ? "सत्यापित समाधान" : "Verified Solution"}</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 via-slate-100/90 to-indigo-500/10 dark:from-cyan-950/40 dark:via-slate-900/90 dark:to-indigo-950/40 backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === "hi" ? "निःशुल्क ऑन-साइट प्रदर्शन" : "Zero-Commitment On-Site Demo"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              {lang === "hi"
                ? "क्या आप अपने स्कूल में स्कूल ऑपरेटिंग सिस्टम का लाइव अनुभव देखना चाहते हैं?"
                : "Experience School OS Live in Action on Your Campus"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl">
              {lang === "hi"
                ? "हमारी टीम आपके परिसर में आकर 30 मिनट का निःशुल्क लाइव डेमो प्रस्तुत करेगी। कोई तकनीकी झंझट नहीं।"
                : "Our team will demonstrate our School OS live at your school campus. Quick 30-minute setup with zero technical friction."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/contact">
              <GlassButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                {lang === "hi" ? "ऑन-साइट डेमो बुक करें" : "Book On-Site Demo"}
              </GlassButton>
            </Link>
            <a href="/downloads/Vidhyam-Setup-v2.8.1-x64.zip" download>
              <GlassButton variant="secondary" size="md" icon={<Download className="w-4 h-4 text-sky-500" />}>
                {lang === "hi" ? "विंडोज सॉफ्टवेयर डाउनलोड" : "Download Windows Client"}
              </GlassButton>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export const SchoolAdminFeatures = SchoolAdminFeaturesSection;
