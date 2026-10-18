import React from "react";
import type { Metadata } from "next";
import { PolicyCenterLayout } from "@/components/policy/PolicyCenterLayout";

export const metadata: Metadata = {
  title: "Official Subscription & Transparent Pricing Policy — MOD School | School ERP",
  description:
    "Official executed Subscription & Pricing Policy for MOD School. ₹20/student/mo flat rate, 25% annual discount, 7-15 day non-disruptive grace period, and 0% GST MSME compliance.",
  keywords: [
    "MOD School Pricing Policy",
    "MOD School Subscription Terms",
    "School ERP Pricing India",
    "School Management Software Cost",
    "Flat Rate School ERP",
    "Transparent School Software Pricing",
    "School ERP Refund Policy",
    "Offline School ERP Subscription",
  ],
  alternates: {
    canonical: "https://school.modernisum.com/subscription",
  },
  openGraph: {
    title: "Official Subscription & Transparent Pricing Policy — MOD School",
    description:
      "Flat rate ₹20/student/mo, 25% annual savings, non-disruptive 7-15 day grace period, and 100% equal feature parity.",
    url: "https://school.modernisum.com/subscription",
    siteName: "MOD School",
    type: "website",
  },
};

const schoolSubscriptionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://school.modernisum.com/subscription#webpage",
      url: "https://school.modernisum.com/subscription",
      name: "MOD School Official Subscription & Transparent Pricing Policy",
      description:
        "Official executed Subscription & Pricing Policy for MOD School. ₹20/student/mo flat rate, 25% annual discount, 7-15 day non-disruptive grace period, and 0% GST MSME compliance.",
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "SoftwareApplication",
        name: "MOD School (Autonomous School ERP & CRM)",
        url: "https://school.modernisum.com",
      },
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://school.modernisum.com/subscription#document",
      name: "Official Subscription, Transparent Pricing & Refund Policy",
      encodingFormat: "application/pdf",
      url: "https://school.modernisum.com/documents/MOD-School-Official-Subscription-Pricing-Policy.pdf",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
      },
      license: "Commercial Proprietary B2B Pay-as-a-Service",
      dateModified: "2026-10-17",
    },
  ],
};

export default function SchoolSubscriptionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSubscriptionJsonLd) }}
      />
      <PolicyCenterLayout variant="school" defaultPolicySlug="subscription" />
    </>
  );
}
