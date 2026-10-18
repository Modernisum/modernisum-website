import React from "react";
import type { Metadata } from "next";
import { PolicyCenterLayout } from "@/components/policy/PolicyCenterLayout";

export const metadata: Metadata = {
  title: "Privacy Policy & Global Data Protection | Modernisum",
  description:
    "Modernisum's comprehensive Privacy Policy: Local-first zero-central-storage architecture, DPDP Act 2023 compliance, GDPR, COPPA/FERPA, edge biometric face hashing, and zero data monetization.",
  keywords: [
    "Privacy Policy",
    "DPDP Act 2023 Compliant School ERP",
    "Local-First Zero Central Storage",
    "Student Data Privacy",
    "GDPR Compliant School Software",
    "COPPA FERPA Compliance",
    "Biometric Face Recognition Privacy",
    "School CRM Data Security",
    "Modernisum Privacy Policy",
    "Data Protection Modernisum",
    "Offline School ERP Privacy",
    "Child Privacy Protection India",
  ],
  alternates: {
    canonical: "https://modernisum.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Global Data Protection | Modernisum",
    description:
      "Modernisum's comprehensive Privacy Policy: Local-first zero-central-storage architecture, DPDP Act 2023, GDPR, and minor privacy safeguards.",
    url: "https://modernisum.com/privacy",
    siteName: "Modernisum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Global Data Protection | Modernisum",
    description:
      "Modernisum's comprehensive Privacy Policy: Local-first zero-central-storage architecture, DPDP Act 2023, GDPR, and minor privacy safeguards.",
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://modernisum.com/privacy#webpage",
      url: "https://modernisum.com/privacy",
      name: "Privacy Policy & Global Data Protection",
      description:
        "Modernisum's comprehensive Privacy Policy: Local-first zero-central-storage architecture, DPDP Act 2023 compliance, GDPR, COPPA/FERPA, edge biometric face hashing, and zero data monetization.",
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
            "name": "Privacy Policy",
            "item": "https://modernisum.com/privacy",
          },
        ],
      },
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://modernisum.com/privacy#document",
      name: "Modernisum Global Privacy Policy & Data Sovereignty Charter",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
      },
      license: "All Rights Reserved - Modernisum Technologies",
      dateModified: "2026-10-17",
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <PolicyCenterLayout variant="modernisum" defaultPolicySlug="privacy" />
    </>
  );
}

