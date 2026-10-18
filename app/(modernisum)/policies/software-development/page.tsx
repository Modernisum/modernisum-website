import React from "react";
import type { Metadata } from "next";
import { PolicyCenterLayout } from "@/components/policy/PolicyCenterLayout";

export const metadata: Metadata = {
  title: "Custom Software Engineering, Fixed Price & Delivery SLA Agreement | Modernisum",
  description:
    "Official Software Development & SLA Policy: 100% Guaranteed Fixed Price, Zero Hourly Billing Shock, Immutable Scope Lock, 100% Advance Refund Guarantee, and MSME UDYAM-UP-56-0049848 statutory protections.",
  keywords: [
    "Software Development Policy",
    "Fixed Price Software Development",
    "Zero Hourly Billing Software Agency",
    "Software Delivery SLA",
    "Fixed Price Guarantee India",
    "Software Milestone Payments",
    "Modernisum Software Development",
    "MSME Software Agency India",
    "Software Sprint Agreement",
    "Custom Software Contract",
  ],
  alternates: {
    canonical: "https://modernisum.com/policies/software-development",
  },
  openGraph: {
    title: "Custom Software Engineering, Fixed Price & Delivery SLA Agreement | Modernisum",
    description:
      "Modernisum Technologies master software engineering terms: 100% Guaranteed Fixed Price, Zero Hourly Billing, Immutable Scope Lock, and SLA delivery delay penalties.",
    url: "https://modernisum.com/policies/software-development",
    siteName: "Modernisum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Engineering, Fixed Price & Delivery SLA Agreement | Modernisum",
    description:
      "Modernisum Technologies master software engineering terms: 100% Guaranteed Fixed Price, Zero Hourly Billing, and Immutable Scope Lock.",
  },
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://modernisum.com/policies/software-development#webpage",
      url: "https://modernisum.com/policies/software-development",
      name: "Custom Software Engineering, Guaranteed Fixed Price & Delivery SLA Agreement",
      description:
        "Official Software Development & SLA Policy: 100% Guaranteed Fixed Price, Zero Hourly Billing Shock, Immutable Scope Lock, 100% Advance Refund Guarantee, and MSME UDYAM-UP-56-0049848 statutory protections.",
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
            "name": "Policies",
            "item": "https://modernisum.com/terms",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Software Development SLA",
            "item": "https://modernisum.com/policies/software-development",
          },
        ],
      },
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://modernisum.com/policies/software-development#document",
      name: "Master Software Engineering & Fixed-Price Delivery Agreement",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
      },
      license: "Commercial Fixed-Price Pay-as-a-Service",
      dateModified: "2026-10-18",
    },
  ],
};

export default function SoftwareDevelopmentPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(policyJsonLd) }}
      />
      <PolicyCenterLayout variant="modernisum" defaultPolicySlug="software-development" />
    </>
  );
}
