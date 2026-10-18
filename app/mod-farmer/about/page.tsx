import React from "react";
import type { Metadata } from "next";
import { AboutSection } from "@/components/shared/AboutSection";

export const metadata: Metadata = {
  title: "About Agromi — Our Mission & Field Laboratory",
  description:
    "Discover Agromi's origin story as a Modernisum flagship venture, our field research laboratory in Meerut, and our vision for autonomous Indian agriculture.",
};

export default function AgromiAboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <AboutSection variant="agromi" />
    </div>
  );
}
