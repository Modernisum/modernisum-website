import React from "react";
import type { Metadata } from "next";
import { PolicyCenterLayout } from "@/components/policy/PolicyCenterLayout";

export const metadata: Metadata = {
  title: "Master Software License, Data Privacy & Billing Policy — MOD School | School ERP",
  description:
    "Official executed Master Software License, Data Privacy, and Billing Policy for MOD School under Section 10A of the IT Act, 2000, DPDP Act 2023, and Indian Contract Act 1872.",
  keywords: [
    "MOD School Terms",
    "MOD School License Agreement",
    "MOD School OS SLA",
    "Master Software License School ERP",
    "School ERP License Agreement",
    "Offline School ERP Terms",
    "School Management Software Terms India",
    "CBSE School Software License",
    "School CRM Terms",
  ],
  alternates: {
    canonical: "https://school.modernisum.com/terms",
  },
  openGraph: {
    title: "Master Software License, Data Privacy & Billing Policy — MOD School",
    description:
      "Institutional software licensing terms, local-first on-premise runtime, and data sovereignty guarantees for MOD School.",
    url: "https://school.modernisum.com/terms",
    siteName: "MOD School",
    type: "website",
  },
};

const schoolTermsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://school.modernisum.com/terms#webpage",
      url: "https://school.modernisum.com/terms",
      name: "MOD School Master Software License, Data Privacy & Billing Policy",
      description:
        "Official executed Master Software License, Data Privacy, and Billing Policy for MOD School under Section 10A of the IT Act, 2000, DPDP Act 2023, and Indian Contract Act 1872.",
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "SoftwareApplication",
        name: "MOD School (Autonomous School ERP & CRM)",
        url: "https://school.modernisum.com",
      },
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://school.modernisum.com/terms#document",
      name: "Master Software License, Data Privacy & Billing Policy",
      encodingFormat: "application/pdf",
      url: "https://school.modernisum.com/documents/MOD-School-Master-Software-License-Agreement.pdf",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
      },
      license: "Commercial Proprietary B2B Pay-as-a-Service",
      dateModified: "2026-10-17",
    },
  ],
};

export default function SchoolTermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolTermsJsonLd) }}
      />
      <PolicyCenterLayout variant="school" defaultPolicySlug="terms" />
    </>
  );
}

