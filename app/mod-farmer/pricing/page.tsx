import React from "react";
import type { Metadata } from "next";
import { PricingMatrix } from "@/components/shared/PricingMatrix";
import { PriceCalculator } from "@/components/shared/PriceCalculator";
import { PricingFaqSection } from "@/components/shared/PricingFaqSection";

export const metadata: Metadata = {
  title: "Agromi Pricing & Plans — Transparent Farm Investment",
  description:
    "Explore transparent pricing plans for Agromi autonomous farming operating system. Hardware, cloud software, and drone spectral scans bundled with measurable efficiency.",
};

export default function AgromiPricingPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <PricingMatrix variant="agromi" />
        <PriceCalculator variant="agromi" />
        <PricingFaqSection variant="agromi" />
      </div>
    </div>
  );
}
