import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { CTASection } from "@/components/home/CTASection";
import { getProjects } from "@/lib/data-engine";
import { FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Architectural Portfolio | Modernisum",
  description:
    "Explore case studies of software systems, Modern School ERP deployments, and custom AI SaaS engineered by Modernisum.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Proven Deliverables</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Case Studies &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                Architectural Milestones
              </span>
            </h1>
            <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
              Explore how our software systems, high-concurrency cloud pipelines, and IoT solutions deliver verifiable operational results.
            </p>
          </div>
        </div>

        <ProjectsCarousel projects={projects} />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
