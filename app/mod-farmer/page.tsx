import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/layout/Hero";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const CockpitShowcase = dynamic(
  () => import("@/components/shared/CockpitShowcase").then((m) => m.CockpitShowcase),
  { loading: () => <SectionSkeleton height="h-[620px]" title="Telemetry Farm Cockpit" /> }
);

const CropCareAssistant = dynamic(
  () => import("@/components/agro/CropCareAssistant").then((m) => m.CropCareAssistant),
  { loading: () => <SectionSkeleton height="h-[520px]" title="Crop Care Doctor & Assistant" /> }
);

const FeaturesGrid = dynamic(
  () => import("@/components/shared/FeaturesGrid").then((m) => m.FeaturesGrid),
  { loading: () => <SectionSkeleton height="h-[520px]" title="Precision Agriculture Pillars" /> }
);

const PriceCalculator = dynamic(
  () => import("@/components/shared/PriceCalculator").then((m) => m.PriceCalculator),
  { loading: () => <SectionSkeleton height="h-[480px]" title="Acreage Yield Calculator" /> }
);

const WorkflowSection = dynamic(
  () => import("@/components/shared/WorkflowSection").then((m) => m.WorkflowSection),
  { loading: () => <SectionSkeleton height="h-[400px]" title="Field Deployment Cycle" /> }
);

const PricingMatrix = dynamic(
  () => import("@/components/shared/PricingMatrix").then((m) => m.PricingMatrix),
  { loading: () => <SectionSkeleton height="h-[500px]" title="Autonomous Tier Matrix" /> }
);

const DemoForm = dynamic(
  () => import("@/components/shared/DemoForm").then((m) => m.DemoForm),
  { loading: () => <SectionSkeleton height="h-[460px]" title="Pilot Deployment Booking" /> }
);

export const revalidate = 60;

export default function AgromiPage() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Critical Viewport Hero (Instant Paint) */}
      <Hero variant="agromi" />

      {/* Progressive Telemetry Cockpit & Engines */}
      <CockpitShowcase />
      <CropCareAssistant />
      <FeaturesGrid variant="agromi" />
      <PriceCalculator variant="agromi" />
      <WorkflowSection variant="agromi" />
      <PricingMatrix variant="agromi" />
      <DemoForm variant="agromi" />
    </div>
  );
}
