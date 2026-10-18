import React from "react";
import type { Metadata } from "next";
import { PricingMatrix } from "@/components/shared/PricingMatrix";
import { PriceCalculator } from "@/components/shared/PriceCalculator";
import { PricingFaqSection } from "@/components/shared/PricingFaqSection";

export const metadata: Metadata = {
  title: "School ERP Pricing & Plans — Modernisum School OS",
  description:
    "Simple, transparent pricing for Indian schools and educational societies. Zero student per-transaction fees. 100% CBSE & ICSE compliance included.",
};

export default function SchoolPricingPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <PricingMatrix variant="school" />
      <PriceCalculator variant="school" />
      <PricingFaqSection variant="school" />
    </div>
  );
}
