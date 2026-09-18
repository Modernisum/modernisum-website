"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

export function VidhyamNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    if (savedTheme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
      setIsDark(false);
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      setIsDark(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Overview", href: "/vidhyam" },
    { name: "Features", href: "/vidhyam/features" },
    { name: "ROI", href: "/vidhyam#roi" },
    { name: "Pricing", href: "/vidhyam/pricing" },
    { name: "About", href: "/vidhyam/about" },
    { name: "Demo", href: "/vidhyam/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-2xl shadow-slate-200/40 dark:shadow-cyan-950/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Product Line */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/vidhyam" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                    Vidhyam
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 whitespace-nowrap">
                    SCHOOL OS
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-light hidden sm:block whitespace-nowrap">
                  By Modernisum Enterprise
                </span>
              </div>
            </Link>

            {/* Link back to parent Modernisum */}
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs transition-colors shrink-0 whitespace-nowrap"
            >
              <span>Modernisum Platform</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 whitespace-nowrap flex-nowrap shrink-0">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 lg:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    active
                      ? "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & Book Demo */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>

            <Link href="/vidhyam/contact">
              <GlassButton variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Book Campus Demo
              </GlassButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-5 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center justify-between px-3 py-1.5"
              >
                <span>Modernisum Corporate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link href="/vidhyam/contact" onClick={() => setMobileMenuOpen(false)}>
                <GlassButton variant="primary" size="md" className="w-full justify-center">
                  Book Campus Demo
                </GlassButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
