"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassButton } from "@/components/ui/GlassButton";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight, Shield } from "lucide-react";
import confetti from "canvas-confetti";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00f2fe", "#7928ca", "#f59e0b"],
    });
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-2xl mt-24">
      {/* Top Ambient Glow Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center p-1.5 border border-amber-400/40 shadow-sm shadow-amber-500/20">
                <Image
                  src="/logo.png"
                  alt="Modernisum Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-tech tracking-tight text-slate-900 dark:text-white">
                  MODERNISUM
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-tech">
                  AI SaaS & Software Architecture
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
              Modernisum delivers cutting-edge AI-integrated SaaS platforms, custom enterprise web & mobile software, automation tools, and the flagship Modern School ERP ecosystem.
            </p>

            <div className="flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-tech">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational • 99.98% SLA</span>
            </div>
          </div>

          {/* Software Services Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
              Software Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/services/ai-solutions" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>AI SaaS & Automation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>Enterprise Web Applications</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-development" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>Mobile Apps (Android & iOS)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/iot-automation" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 group">
                  <span>Custom Device Software & IoT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/modern-school" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors flex items-center gap-1.5 group">
                  <span>Modern School ERP Ecosystem</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/vidhyam" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium transition-colors flex items-center gap-1.5 group">
                  <span className="flex items-center gap-1.5">
                    <span>Vidhyam School OS</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-tech font-bold uppercase rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Platform</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Portfolio & Work</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Tech Insights</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Contact & Quotes</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-slate-300 font-tech">
              Contact & Updates
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>Jail Chungi, Kila Road, Near CCS University, Meerut, Uttar Pradesh, 250001</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href="mailto:contact@modernisum.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">contact@modernisum.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href="tel:+919368671007" className="hover:text-slate-900 dark:hover:text-white transition-colors">+91 9368671007</a>
              </p>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="pt-2">
              {subscribed ? (
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed to Modernisum updates!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <GlassInput
                    placeholder="Enter work email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="py-1.5 text-xs"
                  />
                  <GlassButton type="submit" variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />} />
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Modernisum. All rights reserved. Precision Software Architecture.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Security Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
