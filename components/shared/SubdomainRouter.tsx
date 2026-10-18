"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

// Dynamically load the School Home Page components
const SchoolPageContent = dynamic(
  () => import("@/app/mod-school/page").then((m) => m.default),
  { loading: () => <SectionSkeleton height="h-[800px]" title="Loading School Management System..." /> }
);

interface SubdomainRouterProps {
  modernisumContent: React.ReactNode;
}

export function SubdomainRouter({ modernisumContent }: SubdomainRouterProps) {
  const [isSchool, setIsSchool] = useState(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      return (
        host === "school.modernisum.com" ||
        host.startsWith("school.") ||
        new URLSearchParams(window.location.search).get("subdomain") === "school" ||
        document.documentElement.classList.contains("is-school-subdomain")
      );
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const isSchoolHost =
      host === "school.modernisum.com" ||
      host.startsWith("school.") ||
      new URLSearchParams(window.location.search).get("subdomain") === "school" ||
      document.documentElement.classList.contains("is-school-subdomain");

    if (isSchoolHost) {
      setIsSchool(true);
      document.title = "Modernisum School — The Autonomous School Operating System";
    }
    setMounted(true);
  }, []);

  // When visiting school.modernisum.com, render the dedicated School OS experience directly at "/"
  if (isSchool) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/50 via-slate-50 to-sky-50/30 dark:from-[#030712] dark:via-[#040918] dark:to-[#030712] text-slate-900 dark:text-slate-100 selection:bg-sky-400/30 selection:text-sky-900 dark:selection:text-sky-200 transition-colors duration-300 overflow-x-hidden relative">
        {/* Dynamic Light Sky Blue Ambient Background Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-100">
          <div className="absolute top-0 left-1/4 w-[650px] h-[600px] bg-gradient-to-br from-sky-400/20 via-sky-300/10 dark:from-sky-500/20 dark:via-blue-600/15 to-transparent blur-[150px] rounded-full" />
          <div className="absolute top-1/3 right-10 w-[550px] h-[500px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-transparent blur-[140px] rounded-full" />
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-sky-400/15 via-teal-400/10 to-transparent blur-[160px] rounded-full" />
        </div>

        {/* Subtle Sky Blue Ambient Canopy */}
        <div className="fixed top-0 inset-x-0 h-80 bg-gradient-to-b from-sky-400/10 via-sky-400/5 to-transparent dark:from-sky-500/10 dark:via-transparent pointer-events-none z-0" />

        {/* School OS Top Navbar */}
        <Navbar variant="school" />

        <main className="flex-1 relative z-10 pt-16 sm:pt-20">
          <SchoolPageContent />
        </main>

        <Footer variant="school" />
      </div>
    );
  }

  // Otherwise render standard Modernisum parent company homepage
  return <div id="modernisum-home-content">{modernisumContent}</div>;
}
