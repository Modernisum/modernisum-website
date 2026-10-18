import React from "react";
import type { Metadata } from "next";
import { AgromiSpecsSection } from "@/components/shared/AgromiSpecsSection";
import { FeaturesGrid } from "@/components/shared/FeaturesGrid";

export const metadata: Metadata = {
  title: "Agromi Features — Precision Hardware & AI Specifications",
  description:
    "Comprehensive technical specifications for Agromi LoRaWAN soil probes, drone multispectral NDVI scanners, solar pump actuators, and mandi price models.",
};

export default function AgromiFeaturesPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AgromiSpecsSection />
      <FeaturesGrid variant="agromi" />
    </div>
  );
}
