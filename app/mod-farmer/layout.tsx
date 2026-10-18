import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MOD Farmer — Autonomous Precision Agriculture OS & AI Crop Doctor by Modernisum",
  description:
    "MOD Farmer (by Modernisum) empowers farmers and agro-enterprises with AI plant disease diagnostics (Crop Doctor), sub-surface LoRaWAN soil moisture telemetry, drone multispectral NDVI crop health scanning, automated irrigation valves, and predictive mandi price arbitrage.",
  keywords: [
    "MOD Farmer",
    "MOD Farmer OS",
    "MOD Farmer Software",
    "MOD Agro",
    "MOD",
    "Crop Care AI Doctor",
    "Crop Care Assistant",
    "Agromi",
    "Agro-Tech",
    "Precision Agriculture",
    "Soil Moisture Sensors",
    "LoRaWAN Farming",
    "Drone NDVI",
    "Crop Disease AI",
    "Mandi Price Forecasting",
    "Smart Irrigation",
    "Modernisum",
  ],
  alternates: {
    canonical: "https://modernisum.com/agromi",
  },
  openGraph: {
    title: "MOD Farmer — Autonomous Precision Agriculture OS & AI Crop Doctor",
    description:
      "Empowering farmers with AI plant disease diagnostics (Crop Doctor), sub-surface LoRaWAN telemetry, drone spectral NDVI scanning, and predictive mandi intelligence.",
    url: "https://modernisum.com/agromi",
    siteName: "MOD Farmer",
    type: "website",
  },
};

const modFarmerSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://modernisum.com/agromi/#software",
      name: "MOD Farmer (Autonomous Precision Agriculture OS & AI Crop Doctor)",
      alternateName: ["MOD Farmer", "MOD Farmer OS", "MOD Agro", "Agromi Agro-Tech"],
      applicationCategory: "AgriculturalApplication, BusinessApplication",
      operatingSystem: "Web, Android, Cloud, LoRaWAN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      description:
        "Autonomous precision agriculture operating system and AI Crop Doctor engineered under the proper noun MOD Farmer by Modernisum Technologies. Features leaf disease diagnostics, sub-surface LoRaWAN soil moisture probes, drone multispectral NDVI imaging, and APMC mandi price forecasting.",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
        url: "https://modernisum.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://modernisum.com/agromi/#website",
      url: "https://modernisum.com/agromi",
      name: "MOD Farmer",
      description: "Autonomous Precision Agriculture Operating System & AI Crop Doctor",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
        url: "https://modernisum.com",
      },
    },
  ],
};

export default function AgromiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/50 via-slate-50 to-emerald-50/30 dark:from-[#021008] dark:via-[#03150b] dark:to-[#021008] text-slate-900 dark:text-slate-100 selection:bg-emerald-400/30 selection:text-emerald-900 dark:selection:text-emerald-200 transition-colors duration-300 overflow-x-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modFarmerSchema) }}
      />
      {/* Dynamic Emerald Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-100">
        <div className="absolute top-0 left-1/4 w-[650px] h-[600px] bg-gradient-to-br from-emerald-400/20 via-green-300/10 dark:from-emerald-500/20 dark:via-green-600/15 to-transparent blur-[150px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-400/15 via-lime-400/10 to-transparent blur-[160px] rounded-full" />
      </div>

      {/* Subtle Ambient Canopy */}
      <div className="fixed top-0 inset-x-0 h-80 bg-gradient-to-b from-emerald-400/10 via-emerald-400/5 to-transparent dark:from-emerald-500/10 dark:via-transparent pointer-events-none z-0" />

      {/* Dedicated Agromi Top Navbar (Powered by Shared Navbar Engine) */}
      <Navbar variant="agromi" />

      <main className="flex-1 relative z-10 pt-20 sm:pt-24">
        {children}
      </main>

      <Footer variant="agromi" />
    </div>
  );
}
