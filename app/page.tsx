import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HeroAIChatPreview } from "@/components/home/HeroAIChatPreview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ModernSchoolSection } from "@/components/home/ModernSchoolSection";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { FunFactsSection } from "@/components/home/FunFactsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { getServices, getProjects, getSiteSettings } from "@/lib/data-engine";

export const revalidate = 60; // Incremental Static Regeneration (ISR) every 60 seconds

export default async function HomePage() {
  const [services, projects, siteSettings] = await Promise.all([
    getServices(),
    getProjects(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Embedded Cognitive AI Chat Simulator */}
        <HeroAIChatPreview />

        {/* Services Bento Grid */}
        <ServicesGrid services={services} />

        {/* Flagship Modern School ERP Section */}
        <ModernSchoolSection />

        {/* Projects / Case Studies */}
        <ProjectsCarousel projects={projects} />

        {/* Fun Facts & Live KPI Metrics */}
        <FunFactsSection stats={siteSettings.funFacts} />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* SEO FAQ Accordions */}
        <FAQSection />

        {/* High Conversion CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
