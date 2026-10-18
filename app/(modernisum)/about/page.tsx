import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/shared/AboutSection";

export const metadata: Metadata = {
  title: "About Us | School Management Systems & Software Engineering",
  description:
    "Learn about Modernisum: our software engineering philosophy, leadership, Meerut headquarters, and our flagship School Management System (school.modernisum.com).",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-36 pb-24">
        <AboutSection variant="modernisum" />
      </main>
      <Footer />
    </div>
  );
}
