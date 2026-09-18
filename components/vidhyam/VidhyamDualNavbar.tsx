"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GlassButton } from "@/components/ui/GlassButton";
import { AuthDialog } from "@/components/ui/AuthDialog";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Download,
  ExternalLink,
  Zap,
  Globe,
  Smartphone,
  Cpu,
  Cloud
} from "lucide-react";

export function VidhyamDualNavbar() {
  const pathname = usePathname();
  const [parentVisible, setParentVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"vidhyam" | "modernisum">("vidhyam");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const lastScrollYRef = useRef(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY <= 30) {
        setParentVisible(true);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 70) {
        // Scrolling DOWN: smoothly collapse Modernisum parent bar
        setParentVisible(false);
        setServicesDropdownOpen(false);
      } else if (currentScrollY < lastScrollYRef.current - 5) {
        // Scrolling UP: smoothly reveal Modernisum parent bar
        setParentVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

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
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  const handleOpenDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 220);
  };

  // Full Modernisum Parent Navigation Links
  const parentNavLinks = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      subItems: [
        { name: "AI SaaS & Intelligence", href: "/services/ai-solutions", icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
        { name: "Vidhyam School OS", href: "/vidhyam", icon: <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> },
        { name: "Web Applications", href: "/services/web-development", icon: <Globe className="w-3.5 h-3.5 text-purple-400" /> },
        { name: "Mobile Apps (Android & iOS)", href: "/services/mobile-development", icon: <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> },
        { name: "Custom Hardware & IoT", href: "/services/iot-automation", icon: <Cpu className="w-3.5 h-3.5 text-amber-400" /> },
        { name: "Cloud Fleet & APIs", href: "/services/cloud-services", icon: <Cloud className="w-3.5 h-3.5 text-blue-400" /> },
      ],
    },
    { name: "School", href: "/modern-school" },
    { name: "Vidhyam", href: "/vidhyam" },
    { name: "Portfolio", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Dedicated Vidhyam Product Sub-Routes
  const vidhyamSubRoutes = [
    { name: "Overview", href: "/vidhyam" },
    { name: "Features", href: "/vidhyam/features" },
    { name: "Pricing", href: "/vidhyam/pricing" },
    { name: "Download", href: "/vidhyam/download", badge: "Win" },
    { name: "Docs", href: "/vidhyam/docs" },
    { name: "Community", href: "/vidhyam/community" },
    { name: "Support", href: "/vidhyam/support" },
    { name: "Releases", href: "/vidhyam/releases", badge: "v2.8" },
    { name: "Contact", href: "/vidhyam/contact" },
  ];

  const isSubRouteActive = (href: string) => {
    if (href === "/vidhyam") return pathname === "/vidhyam";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-auto">
        {/* ======================================================================= */}
        {/* TIER 1: FULL MODERNISUM CORPORATE NAVBAR (IDENTICAL TO SCREENSHOT)      */}
        {/* ======================================================================= */}
        <div
          className={`w-full transition-all duration-300 ease-in-out overflow-visible border-b border-slate-200/80 dark:border-white/10 ${
            parentVisible
              ? "max-h-20 opacity-100 py-2 sm:py-3 bg-white/90 dark:bg-black/50 backdrop-blur-xl"
              : "max-h-0 opacity-0 py-0 pointer-events-none -translate-y-full border-b-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-4 xl:px-8 flex items-center justify-between gap-2">
            {/* Brand Logo with Bulb 'M' */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group select-none shrink-0">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass-pill flex items-center justify-center p-1.5 border border-amber-400/40 shadow-sm shadow-amber-500/20 group-hover:border-amber-400 transition-colors shrink-0">
                <Image
                  src="/logo.png"
                  alt="Modernisum Logo"
                  width={26}
                  height={26}
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 rounded-xl bg-amber-400/20 blur-md -z-10 group-hover:bg-amber-400/35 transition-all" />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-sm sm:text-base font-bold font-tech tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  MODERNISUM
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-tech -mt-1 whitespace-nowrap hidden sm:block">
                  AI & Software Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Pill */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-3 py-1 rounded-full glass-pill border border-slate-200/80 dark:border-white/15 whitespace-nowrap flex-nowrap shrink-0">
              {parentNavLinks.map((link) => {
                const isActive = link.href === "/vidhyam";

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative shrink-0 py-0.5"
                      onMouseEnter={handleOpenDropdown}
                      onMouseLeave={handleCloseDropdown}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                      </Link>

                      {servicesDropdownOpen && (
                        <div
                          className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                          onMouseEnter={handleOpenDropdown}
                          onMouseLeave={handleCloseDropdown}
                        >
                          <div className="p-2 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200 dark:border-white/20 shadow-2xl">
                            {link.subItems?.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-xs text-slate-900 dark:text-white transition-colors"
                              >
                                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                                  {sub.icon}
                                </div>
                                <span className="text-[11px] font-medium">{sub.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-2 xl:px-2.5 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 dark:bg-white/10"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-1.5 rounded-full glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-600" />}
              </button>

              <GlassButton
                variant="ghost"
                size="sm"
                className="text-xs px-2.5"
                onClick={() => {
                  setAuthTab("signin");
                  setAuthModalOpen(true);
                }}
              >
                Sign In
              </GlassButton>

              <GlassButton
                variant="primary"
                size="sm"
                className="text-xs px-3"
                onClick={() => {
                  setAuthTab("signup");
                  setAuthModalOpen(true);
                }}
                icon={<Zap className="w-3.5 h-3.5 text-cyan-300" />}
              >
                Get Started
              </GlassButton>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* TIER 2: VIDHYAM PRODUCT SUB-BAR (PINS STICKY AT TOP-0 ON SCROLL)        */}
        {/* ======================================================================= */}
        <div
          className={`w-full transition-all duration-200 border-b ${
            scrolled
              ? "bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/10 py-2.5"
              : "bg-white/85 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-white/[0.08] py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
            {/* Vidhyam Product Brand */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link href="/vidhyam" className="flex items-center gap-2 group shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold font-display tracking-tight text-slate-900 dark:text-white">
                    Vidhyam
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300">
                    SCHOOL OS
                  </span>
                </div>
              </Link>
            </div>

            {/* Vidhyam Direct Sub-Routes Pill */}
            <nav className="hidden xl:flex items-center gap-1 shrink-0">
              {vidhyamSubRoutes.map((route) => {
                const active = isSubRouteActive(route.href);
                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                      active
                        ? "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-2xs"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{route.name}</span>
                    {route.badge && (
                      <span className="px-1.2 py-0.2 rounded text-[8px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                        {route.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTAs: Windows Download & Register */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <Link href="/vidhyam/download">
                <GlassButton variant="secondary" size="sm" className="text-xs px-2.5" icon={<Download className="w-3.5 h-3.5 text-cyan-400" />}>
                  Download App
                </GlassButton>
              </Link>

              <Link href="/vidhyam/register">
                <GlassButton variant="primary" size="sm" className="text-xs px-3" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Register School
                </GlassButton>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="xl:hidden mt-3 mx-3 p-4 rounded-2xl bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 space-y-3 shadow-2xl">
              <div className="flex rounded-xl bg-slate-100 dark:bg-white/5 p-1">
                <button
                  onClick={() => setMobileTab("vidhyam")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                    mobileTab === "vidhyam" ? "bg-cyan-500 text-white" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Vidhyam School OS
                </button>
                <button
                  onClick={() => setMobileTab("modernisum")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                    mobileTab === "modernisum" ? "bg-slate-800 text-white" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Modernisum Corporate
                </button>
              </div>

              {mobileTab === "vidhyam" ? (
                <div className="flex flex-col space-y-1">
                  {vidhyamSubRoutes.map((r) => (
                    <Link
                      key={r.name}
                      href={r.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between"
                    >
                      <span>{r.name}</span>
                      {r.badge && <span className="text-[9px] font-mono text-cyan-400">{r.badge}</span>}
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
                    <Link href="/vidhyam/download" onClick={() => setMobileMenuOpen(false)}>
                      <GlassButton variant="secondary" size="sm" className="w-full justify-center" icon={<Download className="w-3.5 h-3.5" />}>
                        Download Windows App
                      </GlassButton>
                    </Link>
                    <Link href="/vidhyam/register" onClick={() => setMobileMenuOpen(false)}>
                      <GlassButton variant="primary" size="sm" className="w-full justify-center" icon={<Sparkles className="w-3.5 h-3.5" />}>
                        Register School Workspace
                      </GlassButton>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-1">
                  {parentNavLinks.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Global Client Auth Dialog */}
      <AuthDialog isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authTab} />
    </>
  );
}
