import React from "react";
import type { Metadata } from "next";
import { ContactSection } from "@/components/shared/ContactSection";
import { FamilyCarePrompt } from "@/components/shared/FamilyCarePrompt";
import { EmpathyPageTracker } from "@/components/shared/EmpathyPageTracker";

export const metadata: Metadata = {
  title: "Contact Educational Desk & Book Demo — Modernisum School OS",
  description:
    "Schedule an on-campus demonstration of Modernisum School OS. Connect directly with our educational engineering team via phone or WhatsApp.",
};

export default function SchoolContactPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <EmpathyPageTracker product="school" pageName="ModSchool Contact & Hospitality" />
      <div className="container mx-auto px-4 max-w-6xl">
        <FamilyCarePrompt product="school" />
      </div>
      <ContactSection variant="school" />
    </div>
  );
}

