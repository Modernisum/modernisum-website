import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResearchShowcase } from "@/components/research/ResearchShowcase";

export const metadata: Metadata = {
  title: "Advanced Research & Systems Architecture Lab | Modernisum",
  description:
    "Ground-level deep tech research in local-first distributed systems, sub-150ms edge neural biometrics, multispectral Crop Care AI, and clean energy telemetry.",
};

export const revalidate = 60;

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-36 pb-24">
        <ResearchShowcase />
      </main>
      <Footer />
    </div>
  );
}
