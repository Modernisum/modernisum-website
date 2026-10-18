import React from "react";
import type { Metadata } from "next";
import { AboutSection } from "@/components/shared/AboutSection";

export const metadata: Metadata = {
  title: "About Modernisum School — The 80% Workload Reduction Mission",
  description:
    "Modernisum School is engineered to liberate school principals and teachers from clerical drudgery, returning focus to student development.",
};

export default function SchoolAboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <AboutSection variant="school" />
    </div>
  );
}
