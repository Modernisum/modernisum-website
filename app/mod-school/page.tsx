import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/layout/Hero";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { TrustRibbon } from "@/components/shared/TrustRibbon";

const DesktopShowcase = dynamic(
  () => import("@/components/shared/DesktopShowcase").then((m) => m.DesktopShowcase),
  { loading: () => <SectionSkeleton height="h-[600px]" title="Modernisum School Desktop UI" /> }
);

const HardwareEcosystemSection = dynamic(
  () => import("@/components/school/HardwareEcosystemSection").then((m) => m.HardwareEcosystemSection),
  { loading: () => <SectionSkeleton height="h-[550px]" title="Engineered Campus Hardware & Gadgets" /> }
);

const SchoolAdminFeaturesSection = dynamic(
  () => import("@/components/shared/SchoolAdminFeaturesSection").then((m) => m.SchoolAdminFeaturesSection),
  { loading: () => <SectionSkeleton height="h-[600px]" title="School Admin 10 Core Capabilities" /> }
);

const FeaturesGrid = dynamic(
  () => import("@/components/shared/FeaturesGrid").then((m) => m.FeaturesGrid),
  { loading: () => <SectionSkeleton height="h-[520px]" title="Campus Capabilities Grid" /> }
);

const ProductShowcase = dynamic(
  () => import("@/components/shared/ProductShowcase").then((m) => m.ProductShowcase),
  { loading: () => <SectionSkeleton height="h-[650px]" title="School OS Capabilities Showcase" /> }
);

const PriceCalculator = dynamic(
  () => import("@/components/shared/PriceCalculator").then((m) => m.PriceCalculator),
  { loading: () => <SectionSkeleton height="h-[480px]" title="Transparent Subscription Bill Calculator" /> }
);

const WorkflowSection = dynamic(
  () => import("@/components/shared/WorkflowSection").then((m) => m.WorkflowSection),
  { loading: () => <SectionSkeleton height="h-[400px]" title="Daily Campus Lifecycle" /> }
);

const PricingMatrix = dynamic(
  () => import("@/components/shared/PricingMatrix").then((m) => m.PricingMatrix),
  { loading: () => <SectionSkeleton height="h-[520px]" title="Institutional Licensing" /> }
);

const FamilyCarePrompt = dynamic(
  () => import("@/components/shared/FamilyCarePrompt").then((m) => m.FamilyCarePrompt),
  { loading: () => <SectionSkeleton height="h-[400px]" title="Atithi Devo Bhava Family Care" /> }
);

const DemoForm = dynamic(
  () => import("@/components/shared/DemoForm").then((m) => m.DemoForm),
  { loading: () => <SectionSkeleton height="h-[460px]" title="Campus On-Site Pilot Booking" /> }
);

import { EmpathyPageTracker } from "@/components/shared/EmpathyPageTracker";

export const revalidate = 60;

export default function SchoolHomePage() {
  return (
    <div className="space-y-6">
      <EmpathyPageTracker product="school" pageName="ModSchool Main Experience" />
      <Hero variant="school" />
      <TrustRibbon variant="school" />
      <DesktopShowcase />
      <HardwareEcosystemSection />
      <SchoolAdminFeaturesSection />
      <ProductShowcase />
      <FeaturesGrid variant="school" />
      <PriceCalculator variant="school" />
      <WorkflowSection variant="school" />
      <PricingMatrix variant="school" />
      <FamilyCarePrompt product="school" className="container mx-auto px-4 max-w-6xl my-8" />
      <DemoForm variant="school" />
    </div>
  );
}

