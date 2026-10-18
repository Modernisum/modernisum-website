import React from "react";
import type { Metadata } from "next";
import { PolicyCenterLayout } from "@/components/policy/PolicyCenterLayout";

export const metadata: Metadata = {
  title: "Privacy Policy & DPDP Act 2023 Compliance — MOD School | School ERP",
  description:
    "Institutional student data protection policies, minor privacy safeguards, edge biometric encryption, and DPDP Act 2023 adherence for MOD School.",
  keywords: [
    "MOD School Privacy Policy",
    "MOD School Data Protection",
    "School ERP Student Privacy",
    "DPDP Act 2023 School Software",
    "Biometric Face Recognition Privacy School",
    "Offline School Data Protection",
    "Minor Privacy Consent School ERP",
    "Zero Central Cloud School Data",
  ],
  alternates: {
    canonical: "https://school.modernisum.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & DPDP Act 2023 Compliance — MOD School",
    description:
      "Institutional data protection policies, minor privacy safeguards, edge biometric encryption, and DPDP Act 2023 adherence for MOD School.",
    url: "https://school.modernisum.com/privacy",
    siteName: "MOD School",
    type: "website",
  },
};

const schoolPrivacyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://school.modernisum.com/privacy#webpage",
      url: "https://school.modernisum.com/privacy",
      name: "MOD School Privacy Policy & DPDP Compliance",
      description:
        "Institutional student data protection policies, minor privacy safeguards, edge biometric encryption, and DPDP Act 2023 adherence for MOD School.",
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "SoftwareApplication",
        name: "MOD School (Autonomous School ERP & CRM)",
        url: "https://school.modernisum.com",
      },
    },
  ],
};

export default function SchoolPrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolPrivacyJsonLd) }}
      />
      <PolicyCenterLayout variant="school" defaultPolicySlug="privacy" />
    </>
  );
}

