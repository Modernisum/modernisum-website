import React from "react";
import {
  Home as HomeIcon,
  Stethoscope,
  Activity,
  Sparkles,
  TrendingUp,
  BookOpen,
  CreditCard,
  Building2,
  Mail,
} from "lucide-react";
import { AgromiLogo } from "@/components/ui/BrandLogos";
import { NavDomainConfig } from "./types";

export function getFarmerNavConfig(): NavDomainConfig {
  return {
    variant: "farmer",
    homeHref: "/mod-farmer",
    brandTitle: "MOD FARMER",
    brandSubtitle: "AUTONOMOUS AGRO",
    brandBadge: null,
    accentColor: "text-emerald-500 dark:text-emerald-400",
    activePillBg: "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 dark:bg-white/10 border-emerald-400/25 dark:border-white/10",
    themeTopBar: "bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400",
    themeActivePill: "text-emerald-600 dark:text-emerald-400 font-bold hover:bg-slate-100/70 dark:hover:bg-white/5",
    themeBadgeClass: "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm",
    themeHoverItem: "hover:bg-emerald-500/[0.08] dark:hover:bg-emerald-400/[0.08] hover:border-emerald-400/30",
    themeIconBox: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-400/25 text-emerald-500 dark:text-emerald-400 group-hover/item:border-emerald-400/50 group-hover/item:scale-110",
    themeItemTitleHover: "group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-300",
    themeSpotlightGlow: "rgba(16, 185, 129, 0.28)",
    themePillBg: "bg-white/98 dark:bg-gradient-to-b dark:from-[#0f2d21]/95 dark:via-[#0a2017]/95 dark:to-[#06140e]/95 backdrop-blur-3xl",
    themePillBorder: "border-slate-200/90 dark:border-emerald-400/40 hover:dark:border-emerald-400/60",
    themePillShadow: "shadow-[0_10px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.18),inset_0_1px_1px_rgba(255,255,255,0.25)]",
    brandLogoNode: (
      <AgromiLogo className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
    ),
    brandPillLogoNode: (
      <AgromiLogo className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
    ),
    primaryCtaText: "Free Audit",
    navItems: [
      { name: "Home", href: "/mod-farmer", icon: HomeIcon },
      { name: "Crop Care", href: "/mod-farmer#crop-care", icon: Stethoscope },
      { name: "Cockpit", href: "/mod-farmer#cockpit", icon: Activity },
      { name: "Features", href: "/mod-farmer/features", icon: Sparkles },
      { name: "Yield ROI", href: "/mod-farmer#calculator", icon: TrendingUp },
      {
        name: "Resources",
        href: "/mod-farmer/pricing",
        icon: BookOpen,
        dropdown: {
          id: "agromi-resources",
          label: "Agro Hub & Crop Care",
          badge: "Farm Suite",
          columns: [
            {
              category: "Farmer Tools & Apps",
              items: [
                {
                  name: "Crop Care AI Doctor",
                  desc: "Instant plant disease diagnosis & 3-step farmer assistance",
                  href: "/mod-farmer#crop-care",
                  icon: Stethoscope,
                  color: "emerald",
                },
                {
                  name: "Pricing & Tiers",
                  desc: "Acreage sensor packages & telemetry subscriptions",
                  href: "/mod-farmer/pricing",
                  icon: CreditCard,
                  color: "emerald",
                },
                {
                  name: "About Agro",
                  desc: "Autonomous farming mission & satellite IoT infrastructure",
                  href: "/mod-farmer/about",
                  icon: Building2,
                  color: "teal",
                },
              ],
            },
            {
              category: "Outreach & Journal",
              items: [
                {
                  name: "Contact Agro-Team",
                  desc: "Book on-field deployment audit & drone telemetry demo",
                  href: "/mod-farmer/contact",
                  icon: Mail,
                  color: "rose",
                },
                {
                  name: "Field Journal",
                  desc: "Precision agriculture case studies & mandi price AI",
                  href: "/blog",
                  icon: BookOpen,
                  color: "cyan",
                },
              ],
            },
          ],
        },
      },
    ],
  };
}
