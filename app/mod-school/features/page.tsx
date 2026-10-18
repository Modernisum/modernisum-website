import React from "react";
import type { Metadata } from "next";
import { SchoolFeaturesHero, SchoolFeaturesCta } from "@/components/shared/SchoolFeaturesHero";
import { TrustRibbon } from "@/components/shared/TrustRibbon";
import { FrictionEliminationSection } from "@/components/school/FrictionEliminationSection";
import { SchoolAdminFeaturesSection } from "@/components/shared/SchoolAdminFeaturesSection";
import { DesktopShowcase } from "@/components/shared/DesktopShowcase";
import { ProductShowcase } from "@/components/shared/ProductShowcase";

export const metadata: Metadata = {
  title: "School Admin Features & Capabilities — Modernisum School OS",
  description:
    "Explore the 10 architectural pillars of Modernisum School Admin: Campus Digital Twin, Dual-Rate Financial Micro-P&L, 5-Factor Timetable Substitution, Autonomous Exam Studio, Contactless Gate AI, Local LAN IVR Telephony, Document Vault & Govt Co-Pilot, and Offline Desktop Sovereignty.",
};

export default function SchoolFeaturesPage() {
  return (
    <div className="w-full space-y-16 sm:space-y-24 py-8 sm:py-12">
      <SchoolFeaturesHero />
      <TrustRibbon variant="school" />
      <FrictionEliminationSection />
      <SchoolAdminFeaturesSection />
      <DesktopShowcase />
      <ProductShowcase />
      <SchoolFeaturesCta />
    </div>
  );
}

