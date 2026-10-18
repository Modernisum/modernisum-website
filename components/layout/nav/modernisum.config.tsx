import React from "react";
import {
  Home as HomeIcon,
  Layers,
  Sparkles,
  Globe,
  Smartphone,
  Cpu,
  Cloud,
  ShieldCheck,
  Package,
  GraduationCap,
  Puzzle,
  Sprout,
  Atom,
  BookOpen,
  Building2,
  Newspaper,
  MessageSquare,
  Mail,
} from "lucide-react";
import { ModernisumLogo } from "@/components/ui/BrandLogos";
import { NavDomainConfig } from "./types";

export function getModernisumNavConfig(): NavDomainConfig {
  return {
    variant: "modernisum",
    homeHref: "/",
    brandTitle: "MODERNISUM",
    brandSubtitle: "AI & Innovative Solutions",
    brandBadge: null,
    accentColor: "text-cyan-500 dark:text-cyan-400",
    activePillBg: "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 dark:bg-white/10 border-cyan-400/25 dark:border-white/10",
    themeTopBar: "bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-500",
    themeActivePill: "text-cyan-600 dark:text-cyan-400 font-bold hover:bg-slate-100/70 dark:hover:bg-white/5",
    themeBadgeClass: "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-sm",
    themeHoverItem: "hover:bg-cyan-500/[0.08] dark:hover:bg-cyan-400/[0.08] hover:border-cyan-400/30",
    themeIconBox: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-400/25 text-cyan-500 dark:text-cyan-400 group-hover/item:border-cyan-400/50 group-hover/item:scale-110",
    themeItemTitleHover: "group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-300",
    themeSpotlightGlow: "rgba(0, 242, 254, 0.22)",
    themePillBg: "bg-white/98 dark:bg-gradient-to-b dark:from-[#141d2f]/95 dark:via-[#0d1522]/95 dark:to-[#080d16]/95 backdrop-blur-3xl",
    themePillBorder: "border-slate-200/90 dark:border-cyan-400/40 hover:dark:border-cyan-400/60",
    themePillShadow: "shadow-[0_10px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.18),inset_0_1px_1px_rgba(255,255,255,0.25)]",
    brandLogoNode: (
      <ModernisumLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
    ),
    brandPillLogoNode: (
      <ModernisumLogo className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
    ),
    primaryCtaText: "Get Started",
    navItems: [
      { name: "Home", href: "/", icon: HomeIcon },
      {
        name: "Services",
        href: "/services",
        icon: Layers,
        dropdown: {
          id: "mod-services",
          label: "Enterprise Engineering Suites",
          columns: [
            {
              category: "AI & Platform Engineering",
              items: [
                {
                  name: "AI SaaS & Intelligence",
                  desc: "Autonomous reasoning & edge AI platforms",
                  href: "/services/ai-solutions",
                  icon: Sparkles,
                  color: "cyan",
                },
                {
                  name: "Web Applications",
                  desc: "High-scale responsive cloud portals",
                  href: "/services/web-development",
                  icon: Globe,
                  color: "purple",
                },
                {
                  name: "Mobile Apps (Android & iOS)",
                  desc: "Offline-first cross-platform experiences",
                  href: "/services/mobile-development",
                  icon: Smartphone,
                  color: "emerald",
                },
              ],
            },
            {
              category: "Deep Tech & Cloud Systems",
              items: [
                {
                  name: "Custom Device Software & IoT",
                  desc: "Embedded firmware & telemetry",
                  href: "/services/iot-automation",
                  icon: Cpu,
                  color: "amber",
                },
                {
                  name: "Cloud Architecture & APIs",
                  desc: "Microservices & distributed systems",
                  href: "/services/cloud-services",
                  icon: Cloud,
                  color: "sky",
                },
                {
                  name: "Security & Zero-Trust",
                  desc: "Data sovereignty sandboxes & encryption",
                  href: "/security",
                  icon: ShieldCheck,
                  color: "emerald",
                },
              ],
            },
          ],
        },
      },
      {
        name: "Ecosystem",
        href: "/mod-school",
        icon: Package,
        dropdown: {
          id: "mod-ecosystem",
          label: "Sovereign Ecosystems & R&D",
          badge: "Flagships & Labs",
          columns: [
            {
              category: "School & Campus Ecosystem",
              items: [
                {
                  name: "School Ecosystem",
                  badge: "Flagship OS",
                  badgeColor: "bg-cyan-500/15 border-cyan-400/30 text-cyan-600 dark:text-cyan-300",
                  desc: "Autonomous campus OS: multi-PC offline sync, biometric turnstiles, fee ledgers & parent portal.",
                  href: "/mod-school",
                  icon: GraduationCap,
                  color: "cyan",
                },
                {
                  name: "Clerk Co-Pilot Extension",
                  badge: "V3",
                  desc: "Government portal auto-filler for CBSE LOC & smart image resizer.",
                  href: "/mod-school/apps/extension",
                  icon: Puzzle,
                  color: "amber",
                },
                {
                  name: "Student & Parent App",
                  badge: "Portal",
                  badgeColor: "bg-blue-500/15 border-blue-400/30 text-blue-600 dark:text-blue-300",
                  desc: "Real-time fee receipts, digital homework, bus tracking beacons & push notices.",
                  href: "/mod-school/apps/student",
                  icon: Smartphone,
                  color: "sky",
                },
              ],
            },
            {
              category: "AgroTech & Research Lab",
              items: [
                {
                  name: "Agro Ecosystem & Crop Care",
                  badge: "Crop Care AI",
                  badgeColor: "bg-emerald-500/15 border-emerald-400/30 text-emerald-600 dark:text-emerald-300",
                  desc: "Autonomous precision agriculture, satellite telemetry & AI Crop Doctor for farmers.",
                  href: "/mod-farmer",
                  icon: Sprout,
                  color: "emerald",
                },
                {
                  name: "Research & Deep Tech Lab",
                  badge: "R&D Lab",
                  badgeColor: "bg-sky-500/15 border-sky-400/30 text-sky-600 dark:text-sky-300",
                  desc: "Sub-150ms Edge AI, Raft P2P sync, multispectral crop vision & latency benchmarks.",
                  href: "/research",
                  icon: Atom,
                  color: "sky",
                },
                {
                  name: "Enterprise AI & Automation",
                  badge: "Custom OS",
                  badgeColor: "bg-purple-500/15 border-purple-400/30 text-purple-600 dark:text-purple-300",
                  desc: "Deterministic AI agent pipelines, local execution sandboxes, and autonomous enterprise systems.",
                  href: "/services/ai-solutions",
                  icon: Cpu,
                  color: "purple",
                },
                {
                  name: "Edge IoT & Turnstiles",
                  badge: "Hardware",
                  badgeColor: "bg-teal-500/15 border-teal-400/30 text-teal-600 dark:text-teal-300",
                  desc: "Sub-150ms facial recognition turnstiles, RFID smart gates & thermal scanners.",
                  href: "/mod-school/features#turnstiles",
                  icon: ShieldCheck,
                  color: "emerald",
                },
              ],
            },
          ],
        },
      },
      {
        name: "Resources",
        href: "/about",
        icon: BookOpen,
        dropdown: {
          id: "mod-resources",
          label: "Studio Knowledge & Resources",
          badge: "Hub",
          hasPreview: true,
          columns: [
            {
              category: "Studio Hub",
              items: [
                {
                  name: "About",
                  desc: "Parent studio vision, core methodology & leadership principles",
                  href: "/about",
                  icon: Building2,
                  color: "purple",
                  activities: [
                    {
                      title: "Parent Studio Vision & Engineering Mindset",
                      desc: "Our ground-level problem solving philosophy & core methodology",
                      href: "/about#vision",
                      date: "Studio",
                      tag: "Vision",
                    },
                    {
                      title: "Permanent Studio Setup: Parikshitgarh, Meerut",
                      desc: "Local-first R&D studio operating with direct institutional touchpoints",
                      href: "/about#contact",
                      date: "Location",
                      tag: "HQ",
                    },
                  ],
                },
                {
                  name: "Blogs",
                  desc: "Deep tech, AI SaaS architectures & engineering playbooks",
                  href: "/blog",
                  icon: BookOpen,
                  color: "cyan",
                  activities: [
                    {
                      title: "EV Ecosystem & Battery Swapping Telemetry",
                      desc: "Telemetry pipelines, battery swap stations & edge charging diagnostics",
                      href: "/blog/ev-charging-battery-swap-architecture",
                      date: "Latest Post",
                      tag: "Architecture",
                    },
                    {
                      title: "Autonomous Campus Systems: Offline-First Desktop OS",
                      desc: "Local-first LAN synchronization, DPDP 2023 compliance & edge turnstiles",
                      href: "/blog/autonomous-campus-systems",
                      date: "Deep Dive",
                      tag: "EdTech",
                    },
                  ],
                },
                {
                  name: "News",
                  desc: "Platform announcements, corporate milestones & press releases",
                  href: "/news",
                  icon: Newspaper,
                  color: "amber",
                  activities: [
                    {
                      title: "MOD School OS v2.8.1 Released with Sub-150ms Face AI",
                      desc: "Multi-PC LAN synchronization & ESC/POS receipt printing hardware",
                      href: "/news#school-os-v2-8-1",
                      date: "Oct 2026",
                      tag: "Milestone",
                    },
                    {
                      title: "Modernisum Expands Ground-Level Field Deployments",
                      desc: "Direct R&D team rollouts across regional schools and enterprises",
                      href: "/news#ground-deployments",
                      date: "Oct 2026",
                      tag: "Deployments",
                    },
                  ],
                },
                {
                  name: "Research Lab",
                  desc: "Edge AI benchmarks, Raft P2P sync & Crop Care multispectral vision",
                  href: "/research",
                  icon: Atom,
                  color: "sky",
                },
                {
                  name: "Community",
                  desc: "Unfiltered reviews, public bug reports & direct engineering support",
                  href: "/community",
                  icon: MessageSquare,
                  color: "indigo",
                },
                {
                  name: "Terms & Policy",
                  desc: "Master terms, data sovereignty & compliance commitments",
                  href: "/terms",
                  icon: ShieldCheck,
                  color: "emerald",
                },
              ],
            },
          ],
        },
      },
      { name: "Contact", href: "/contact", icon: Mail },
    ],
  };
}
