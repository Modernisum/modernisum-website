import React from "react";
import type { Metadata } from "next";
import { VidhyamDemoForm } from "@/components/vidhyam/VidhyamDemoForm";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { 
  Building2, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Headphones
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Educational Desk & Book Demo — Vidhyam School OS",
  description: "Schedule an on-campus demonstration of Vidhyam School OS. Connect directly with our educational engineering team via phone or WhatsApp.",
};

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    title: "Principal Direct Line",
    detail: "+91 98765 43210",
    desc: "Available Monday to Saturday, 08:00 AM - 06:00 PM IST",
    cta: "Call Directly",
    href: "tel:+919876543210",
  },
  {
    icon: MessageSquare,
    title: "Official WhatsApp Desk",
    detail: "+91 98765 43210",
    desc: "Instant chat with an educational systems architect",
    cta: "Open WhatsApp",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Mail,
    title: "Institutional Inquiries",
    detail: "vidhyam@modernisum.com",
    desc: "Send formal RFPs, school trust proposals, and tenders",
    cta: "Send Email",
    href: "mailto:vidhyam@modernisum.com",
  },
];

export default function VidhyamContactPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
          <Headphones className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>Institutional Relations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Connect With Our Educational Team
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Whether you require an on-campus presentation for your school board or a technical feasibility audit of existing hardware, we are here to assist.
        </p>
      </div>

      {/* Direct Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONTACT_CHANNELS.map((ch) => {
          const Icon = ch.icon;
          return (
            <LiquidGlassCard key={ch.title} glowColor="rgba(0, 242, 254, 0.25)" className="p-6 flex flex-col justify-between border-slate-200/80 dark:border-white/10">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1">
                  {ch.title}
                </h3>
                <div className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-300 mb-2">
                  {ch.detail}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {ch.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200/80 dark:border-white/10">
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                >
                  {ch.cta} &rarr;
                </a>
              </div>
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Embedded Booking Form directly storing in MongoDB Atlas */}
      <VidhyamDemoForm />
    </div>
  );
}
