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
  Sparkles, 
  Smartphone, 
  Globe, 
  Cpu, 
  Cloud, 
  GraduationCap, 
  ShieldCheck,
  Zap
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 220); // 220ms grace period prevents accidental close while moving mouse across gap
  };

  // Close dropdown on route changes or component unmount
  useEffect(() => {
    setServicesDropdownOpen(false);
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Synchronize stored theme preference on client mount
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

    // Check if auth modal requested via URL query params (e.g. ?auth=signin)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const authParam = params.get("auth");
      if (authParam === "signin" || authParam === "login") {
        setAuthTab("signin");
        setAuthModalOpen(true);
      } else if (authParam === "signup") {
        setAuthTab("signup");
        setAuthModalOpen(true);
      }
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

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Services", 
      href: "/services",
      hasDropdown: true,
      subItems: [
        { name: "AI SaaS & Intelligence", href: "/services/ai-solutions", icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
        { name: "Vidhyam School OS", href: "/vidhyam", icon: <GraduationCap className="w-4 h-4 text-cyan-400" /> },
        { name: "Web Applications", href: "/services/web-development", icon: <Globe className="w-4 h-4 text-purple-400" /> },
        { name: "Mobile Apps (Android & iOS)", href: "/services/mobile-development", icon: <Smartphone className="w-4 h-4 text-emerald-400" /> },
        { name: "Custom Device Software & IoT", href: "/services/iot-automation", icon: <Cpu className="w-4 h-4 text-amber-400" /> },
        { name: "Cloud Architecture & APIs", href: "/services/cloud-services", icon: <Cloud className="w-4 h-4 text-blue-400" /> },
      ]
    },
    { name: "School", href: "/modern-school" },
    { name: "Vidhyam", href: "/vidhyam" },
    { name: "Portfolio", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-2.5 sm:py-3.5 px-3 sm:px-5 lg:px-4 xl:px-8 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 dark:bg-black/40 border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 lg:gap-2 xl:gap-4">
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
              {/* Soft Bulb Ambient Glow */}
              <div className="absolute inset-0 rounded-xl bg-amber-400/20 blur-md -z-10 group-hover:bg-amber-400/35 transition-all" />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="text-base sm:text-lg font-bold font-tech tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                MODERNISUM
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-tech -mt-1 whitespace-nowrap hidden sm:block">
                AI & Software Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pill */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-4 py-1.5 rounded-full glass-pill border border-slate-200/80 dark:border-white/15 whitespace-nowrap flex-nowrap shrink-0">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative shrink-0 py-1"
                    onMouseEnter={handleOpenDropdown}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                        setServicesDropdownOpen(false);
                      }}
                      className={`flex items-center gap-1 px-2 xl:px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 dark:bg-white/10"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Mega Dropdown with seamless hover bridge */}
                    {servicesDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseEnter={handleOpenDropdown}
                        onMouseLeave={handleCloseDropdown}
                      >
                        {/* Invisible bridge to catch cursor movement seamlessly across gap */}
                        <div className="absolute -top-3 left-0 right-0 h-5 bg-transparent pointer-events-auto" />

                        <div className="p-2 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl glass-panel-elevated border border-slate-200/80 dark:border-white/20 shadow-2xl relative">
                          <div className="p-2 border-b border-slate-200 dark:border-white/10 mb-1">
                            <span className="text-[10px] font-tech uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Enterprise Software Suites
                            </span>
                          </div>
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => {
                                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                                setServicesDropdownOpen(false);
                              }}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group/item"
                            >
                              <div className="p-2 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 group-hover/item:border-cyan-500/40 shrink-0">
                                {sub.icon}
                              </div>
                              <div>
                                <div className="text-xs font-medium text-slate-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-300 transition-colors">
                                  {sub.name}
                                </div>
                              </div>
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
                  className={`relative px-2 xl:px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 flex items-center ${
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
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none shrink-0 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>

            {/* Sign In Button (Client Portal) */}
            <GlassButton
              variant="ghost"
              size="sm"
              className="whitespace-nowrap shrink-0 px-2.5 xl:px-4"
              onClick={() => {
                setAuthTab("signin");
                setAuthModalOpen(true);
              }}
            >
              Sign In
            </GlassButton>

            {/* Get Started Button */}
            <GlassButton
              variant="primary"
              size="sm"
              className="whitespace-nowrap shrink-0 px-3 xl:px-4"
              onClick={() => {
                setAuthTab("signup");
                setAuthModalOpen(true);
              }}
              icon={<Zap className="w-3.5 h-3.5 text-cyan-300" />}
            >
              Get Started
            </GlassButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              aria-label="Toggle theme mobile"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl glass-pill text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/20 shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-cyan-500/10 dark:bg-white/10 text-cyan-600 dark:text-cyan-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <GlassButton
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthTab("signin");
                    setAuthModalOpen(true);
                  }}
                  className="w-full"
                >
                  Sign In
                </GlassButton>
                <GlassButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthTab("signup");
                    setAuthModalOpen(true);
                  }}
                  className="w-full"
                >
                  Get Started
                </GlassButton>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Interactive Liquid Glass Auth Dialog */}
      <AuthDialog
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authTab}
      />
    </>
  );
}
