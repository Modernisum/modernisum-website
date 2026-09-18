import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  MessageSquare, 
  Smartphone, 
  Building2, 
  FileCheck2 
} from "lucide-react";

export function VidhyamFooter() {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-display text-slate-900 dark:text-white">Vidhyam</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300">
                SCHOOL OS
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-light">
              Autonomous school operating system engineered for Indian K-12 institutions.
              Eliminating 80% of administrative overhead with contactless face AI attendance,
              automated WhatsApp fee collection, and digital report cards.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>CBSE & ICSE Compliant</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>UDISE+ Ready</span>
              </span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/vidhyam/features" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Face AI Gate Attendance
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/features" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  WhatsApp Fee Invoicing
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/features" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Autonomous Timetable
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/features" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Bus GPS Telemetry
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/features" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  One-Click Staff Payroll
                </Link>
              </li>
            </ul>
          </div>

          {/* Product & Downloads */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">
              Platform & App
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/vidhyam/download" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <span>Windows Desktop App</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15">v2.4</span>
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/docs" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Desktop Tutorials & Docs
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/pricing" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Pricing Plans & ROI
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/community" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Educator Community
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/support" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Institutional Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">
              Modernisum Suite
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>Parent Agency</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/about" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/vidhyam/contact" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  Contact & Demo Booking
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Principal Desk</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Terms & Privacy */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Vidhyam School OS. Engineered & Powered by Modernisum.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/vidhyam/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Terms & Licensing
            </Link>
            <Link href="/vidhyam/privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              DPDP Privacy Policy
            </Link>
            <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Modernisum Architecture
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
