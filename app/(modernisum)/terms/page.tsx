import React from "react";
import type { Metadata } from "next";
import { PolicyCenterLayout } from "@/components/policy/PolicyCenterLayout";

export const metadata: Metadata = {
  title: "Terms of Service & Master Software Licensing | Modernisum",
  description:
    "Modernisum Technologies master software licensing terms, Pure Pay-as-a-Service B2B model, on-premise local-first runtime, School ERP SLA, and zero ad-tech commitments.",
  keywords: [
    "Terms of Service",
    "School ERP License Agreement",
    "School Management Software Terms",
    "Local-First Data Sovereignty",
    "Pure Pay-as-a-Service B2B Agreement",
    "No Ad-Tech Commitment",
    "School ERP SLA",
    "Modernisum Software License",
    "Modernisum School OS Terms",
    "Enterprise Software Terms India",
    "School CRM Terms and Conditions",
    "Offline School ERP Licensing",
  ],
  alternates: {
    canonical: "https://modernisum.com/terms",
  },
  openGraph: {
    title: "Terms of Service & Master Software Licensing | Modernisum",
    description:
      "Modernisum Technologies master software licensing terms, Pure Pay-as-a-Service B2B model, and local-first data sovereignty guarantees.",
    url: "https://modernisum.com/terms",
    siteName: "Modernisum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service & Master Software Licensing | Modernisum",
    description:
      "Modernisum Technologies master software licensing terms, Pure Pay-as-a-Service B2B model, and local-first data sovereignty guarantees.",
  },
};

const termsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://modernisum.com/terms#webpage",
      url: "https://modernisum.com/terms",
      name: "Terms of Service & Master Software Licensing",
      description:
        "Modernisum Technologies master software licensing terms, Pure Pay-as-a-Service B2B model, on-premise local-first runtime, School ERP SLA, and zero ad-tech commitments.",
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://modernisum.com/#website",
        url: "https://modernisum.com",
        name: "Modernisum Technologies",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://modernisum.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Terms of Service",
            "item": "https://modernisum.com/terms",
          },
        ],
      },
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://modernisum.com/terms#document",
      name: "Modernisum Master Software Licensing Agreement",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
      },
      license: "Commercial Proprietary B2B Pay-as-a-Service",
      dateModified: "2026-10-17",
    },
  ],
};

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <PolicyCenterLayout variant="modernisum" defaultPolicySlug="terms" />
    </>
  );
}

