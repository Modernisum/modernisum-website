import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommunityHub } from "@/components/community/CommunityHub";

export const metadata: Metadata = {
  title: "Community Reviews, Transparent Support & Feedback | Modernisum",
  description:
    "Open community platform for MOD School, MOD Farmer, and Modernisum AI. We publish unfiltered user reviews, technical bug reports, and direct developer resolution threads with 100% transparency.",
};

export const revalidate = 60;

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#020617] dark:via-[#030712] dark:to-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40 lg:pt-44 pb-28 relative z-10">
        <CommunityHub />
      </main>
      <Footer />
    </div>
  );
}
