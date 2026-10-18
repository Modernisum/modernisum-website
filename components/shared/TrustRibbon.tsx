"use client";

import React from "react";
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export interface TrustRibbonProps {
  variant?: "school" | "vidhyam" | "modernisum" | "agromi" | "farmer";
}

export function TrustRibbon({ variant = "school" }: TrustRibbonProps) {
  const { isHindi } = useLanguage();

  const items = {
    vidhyam: [
      {
        icon: ShieldCheck,
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: isHindi ? "100% CBSE व ICSE मार्कशीट अनुपालन" : "100% CBSE & ICSE Marksheet Compliance",
      },
      {
        icon: Award,
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: isHindi ? "ISO 27001 व DPDP 2023 प्रमाणित सुरक्षा" : "ISO 27001 & DPDP 2023 Certified Security",
      },
      {
        icon: FileCheck,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: isHindi ? "UDISE+ डायरेक्ट एक्सपोर्ट फॉर्मेट" : "UDISE+ Direct Export Formats",
      },
      {
        icon: CheckCircle2,
        iconColor: "text-amber-600 dark:text-amber-400",
        label: isHindi ? "शून्य हार्डवेयर लॉक-इन आर्किटेक्चर" : "Zero Hardware Lock-In Architecture",
      },
    ],
    agromi: [
      {
        icon: ShieldCheck,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "India Licensed ISM LoRaWAN 865-867 MHz",
      },
      {
        icon: Award,
        iconColor: "text-teal-600 dark:text-teal-400",
        label: "IP68 Submersible Hermetic Probe Housing",
      },
      {
        icon: FileCheck,
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "2,400+ APMC Daily Mandi Price Ingestion",
      },
      {
        icon: CheckCircle2,
        iconColor: "text-lime-600 dark:text-lime-400",
        label: "100% Offline Grid & Solar Valve Control",
      },
    ],
    modernisum: [
      {
        icon: ShieldCheck,
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Sovereign Offline Sandboxes & DPDP 2023",
      },
      {
        icon: Award,
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "99.98% High-Concurrency Uptime SLA",
      },
      {
        icon: FileCheck,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "Sub-Second Sync Across Flutter & Next.js",
      },
      {
        icon: CheckCircle2,
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Deterministic AI Pipelines With Zero Data Leak",
      },
    ],
  };

  const list =
    variant === "school" || variant === "vidhyam"
      ? items.vidhyam
      : variant === "farmer" || variant === "agromi"
      ? items.agromi
      : items[variant as keyof typeof items] || items.vidhyam;

  return (
    <div className="border-y border-slate-200/80 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.02] py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center justify-around gap-4 lg:gap-6">
        {list.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5">
              <Icon className={`w-5 h-5 shrink-0 ${item.iconColor}`} />
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
