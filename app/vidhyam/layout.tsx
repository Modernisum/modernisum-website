import React from "react";
import type { Metadata } from "next";
import { VidhyamDualNavbar } from "@/components/vidhyam/VidhyamDualNavbar";
import { VidhyamFooter } from "@/components/vidhyam/VidhyamFooter";

export const metadata: Metadata = {
  title: "Vidhyam — The Autonomous School Operating System",
  description:
    "Vidhyam is the AI-driven school operating system engineered for Indian K-12 institutions. Automates 80% of administrative workloads with contactless face AI attendance, automated WhatsApp fee collection, and digital report cards.",
  keywords: [
    "School ERP",
    "School Operating System",
    "CBSE Report Cards",
    "Face AI Attendance",
    "WhatsApp Fee Collection",
    "Indian K-12 Schools",
    "Timetable Generator",
    "UDISE+ Compliance",
    "Modernisum",
  ],
  openGraph: {
    title: "Vidhyam — Autonomous School Operating System",
    description:
      "Eliminate school administrative overhead with real-time biometric telemetry, automated WhatsApp report cards, and digital fee collection.",
    type: "website",
  },
};

export default function VidhyamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300 overflow-x-hidden relative">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-100">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-purple-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-cyan-600/10 to-transparent blur-[150px] rounded-full" />
      </div>

      <VidhyamDualNavbar />
      <main className="flex-1 relative z-10 pt-24 sm:pt-28">
        {children}
      </main>
      <VidhyamFooter />
    </div>
  );
}
