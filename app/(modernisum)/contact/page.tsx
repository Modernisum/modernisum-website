import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/shared/ContactSection";

export const metadata: Metadata = {
  title: "Contact Systems Architects | Modernisum Meerut HQ",
  description:
    "Direct technical consultation with Modernisum software architects. Inquire about Modernisum School OS, Agromi Agro-Tech, or custom enterprise AI systems.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-36 pb-24">
        <ContactSection variant="modernisum" />
      </main>
      <Footer />
    </div>
  );
}
