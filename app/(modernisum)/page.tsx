import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { CompanyVisionSection } from "@/components/shared/CompanyVisionSection";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { getProjects, getSiteSettings } from "@/lib/data-engine";

const ModernisumFlagshipVentures = dynamic(
  () => import("@/components/shared/ModernisumFlagshipVentures").then((m) => m.ModernisumFlagshipVentures),
  { loading: () => <SectionSkeleton height="h-[550px]" title="Modernisum Flagship Products" /> }
);

const WorkflowSection = dynamic(
  () => import("@/components/shared/WorkflowSection").then((m) => m.WorkflowSection),
  { loading: () => <SectionSkeleton height="h-[400px]" title="Engineering Protocol" /> }
);

const CustomerSectorsSection = dynamic(
  () => import("@/components/shared/CustomerSectorsSection").then((m) => m.CustomerSectorsSection),
  { loading: () => <SectionSkeleton height="h-[380px]" title="Target Sectors" /> }
);

const ProjectsCarousel = dynamic(
  () => import("@/components/shared/ProjectsCarousel").then((m) => m.ProjectsCarousel),
  { loading: () => <SectionSkeleton height="h-[480px]" title="Engineering Portfolio" /> }
);

const FunFactsSection = dynamic(
  () => import("@/components/shared/FunFactsSection").then((m) => m.FunFactsSection),
  { loading: () => <SectionSkeleton height="h-[260px]" title="Telemetry Metrics" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/shared/TestimonialsSection").then((m) => m.TestimonialsSection),
  { loading: () => <SectionSkeleton height="h-[380px]" title="Client Testimonials" /> }
);

const FAQSection = dynamic(
  () => import("@/components/shared/FAQSection").then((m) => m.FAQSection),
  { loading: () => <SectionSkeleton height="h-[420px]" title="Frequently Asked Questions" /> }
);

const CTASection = dynamic(
  () => import("@/components/shared/CTASection").then((m) => m.CTASection),
  { loading: () => <SectionSkeleton height="h-[320px]" title="Architecture Consultation" /> }
);

const PatentResearchLabSection = dynamic(
  () => import("@/components/shared/PatentResearchLabSection").then((m) => m.PatentResearchLabSection),
  { loading: () => <SectionSkeleton height="h-[500px]" title="Patent Research & Solutions Lab" /> }
);

const FamilyCarePrompt = dynamic(
  () => import("@/components/shared/FamilyCarePrompt").then((m) => m.FamilyCarePrompt),
  { loading: () => <SectionSkeleton height="h-[350px]" title="Atithi Devo Bhava Family Care" /> }
);

import { SubdomainRouter } from "@/components/shared/SubdomainRouter";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, siteSettings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);

  return (
    <SubdomainRouter
      modernisumContent={
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1">
            {/* Critical Viewport Chunks (Instant Paint) */}
            <Hero variant="modernisum" />
            <CompanyVisionSection />

            {/* 3 Uniform Flagship Ecosystem Cards: Vidhyam, Agromi & Enterprise AI */}
            <ModernisumFlagshipVentures />

            {/* Patent Research Lab & Tailored Affordability */}
            <PatentResearchLabSection />

            {/* Progressive Below-The-Fold Flow */}
            <WorkflowSection variant="modernisum" />
            <CustomerSectorsSection />
            <ProjectsCarousel projects={projects} />
            <FunFactsSection stats={siteSettings.funFacts} />
            <TestimonialsSection />

            {/* Atithi Devo Bhava Hospitality & Family Care Desk */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 cv-auto">
              <FamilyCarePrompt product="modernisum" />
            </div>

            <FAQSection />
            <CTASection />
          </main>

          <Footer />
        </div>
      }
    />
  );
}
