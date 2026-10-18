import React from "react";
import type { Metadata } from "next";
import { ContactSection } from "@/components/shared/ContactSection";

export const metadata: Metadata = {
  title: "Contact Agromi — Book Farm Pilot & On-Site Soil Audit",
  description:
    "Schedule an on-site soil telemetry demonstration, request a custom FPO quote, or connect with our agricultural engineers in Meerut, Western UP.",
};

export default function AgromiContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <ContactSection variant="agromi" />
    </div>
  );
}
