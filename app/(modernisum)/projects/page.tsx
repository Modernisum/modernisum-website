import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsHero } from "@/components/shared/ProjectsHero";
import { ProjectsCarousel } from "@/components/shared/ProjectsCarousel";
import { CTASection } from "@/components/shared/CTASection";
import { getProjects } from "@/lib/data-engine";

export const metadata: Metadata = {
  title: "Case Studies & Architectural Portfolio | Modernisum",
  description:
    "Explore case studies of autonomous enterprise systems, Modernisum School OS, Agromi Agro-Tech, and sovereign AI architectures engineered by Modernisum.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsHero />
        </div>
        <ProjectsCarousel projects={projects} />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
