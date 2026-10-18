import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesGrid } from "@/components/shared/ServicesGrid";
import { ServicesHero } from "@/components/shared/ServicesHero";
import { CTASection } from "@/components/shared/CTASection";
import { getServices } from "@/lib/data-engine";

export const metadata: Metadata = {
  title: "Software Services & AI Solutions",
  description:
    "Explore Modernisum's full technology suite: Autonomous AI SaaS, High-Scale Web & Mobile Portals, Custom Edge IoT Telemetry, and Modernisum School OS.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesHero />
        </div>
        <ServicesGrid services={services} />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
