import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ModSchool — Autonomous School Operating System & School ERP by Modernisum",
  description:
    "ModSchool (by Modernisum) is India's leading local-first School ERP and School CRM software. Features contactless 150ms Face AI attendance, WhatsApp fee automation, CBSE LOC auto-filling, offline SQLite sovereignty, and DPDP Act 2023 compliance.",
  keywords: [
    "ModSchool",
    "Modschool",
    "ModSchool OS",
    "ModSchool ERP",
    "ModSchool CRM",
    "ModSchool Software",
    "MOD School",
    "School ERP",
    "School CRM",
    "School Management Software",
    "School Operating System",
    "Offline School ERP",
    "Best School ERP India",
    "CBSE School ERP",
    "ICSE School Management System",
    "Local-First School ERP Software",
    "School Fees Management Software",
    "Biometric Facial Vector Attendance",
    "CBSE LOC Auto-Filler",
    "Student Information System (SIS)",
    "UDISE+ Compliance Software",
    "Modernisum School OS",
    "Vidhyam School ERP",
    "School Management App",
    "K-12 School ERP India",
    "स्कूल मैनेजमेंट सॉफ्टवेयर",
    "स्कूल ईआरपी",
    "बायोमेट्रिक अटेंडेंस स्कूल",
  ],
  alternates: {
    canonical: "https://school.modernisum.com",
    languages: {
      "en-IN": "https://school.modernisum.com?lang=en",
      "hi-IN": "https://school.modernisum.com?lang=hi",
      "x-default": "https://school.modernisum.com",
    },
  },
  openGraph: {
    title: "ModSchool — Autonomous School ERP & School CRM",
    description:
      "Eliminate campus administrative overhead with local-first offline resilience, contactless Face AI attendance, and automated WhatsApp fee collection.",
    url: "https://school.modernisum.com",
    siteName: "ModSchool",
    type: "website",
  },
  icons: {
    icon: "/school-logo.svg",
    shortcut: "/school-logo.svg",
    apple: "/school-logo.svg",
  },
};

const modSchoolComprehensiveSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://school.modernisum.com/#software",
      name: "ModSchool (Autonomous School ERP & CRM)",
      alternateName: [
        "ModSchool",
        "Modschool",
        "MOD School",
        "ModSchool OS",
        "ModSchool ERP",
        "Modernisum School OS",
      ],
      applicationCategory: "EducationalApplication, BusinessApplication",
      operatingSystem: "Windows 10, Windows 11, macOS, Linux, Android, iOS",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      description:
        "Comprehensive local-first School ERP and School CRM operating system engineered under the proper noun ModSchool by Modernisum Technologies. Features offline SQLite sovereignty, 150ms face AI turnstiles, WhatsApp receipts, and DPDP Act compliance.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "134",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://school.modernisum.com/#website",
      url: "https://school.modernisum.com",
      name: "ModSchool",
      alternateName: ["ModSchool by Modernisum", "Modschool", "school.modernisum.com"],
      description: "Autonomous School ERP and Campus Operating System by Modernisum",
      publisher: {
        "@type": "Organization",
        name: "Modernisum Technologies",
        url: "https://modernisum.com",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://school.modernisum.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://school.modernisum.com/#sitelinks-navigation",
      name: "ModSchool Sitelinks Menu",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Downloads & Releases",
          description: "Download ModSchool Windows 64-bit Desktop Client OS, Faculty APK, Student APK, and Clerk MV3 Extension.",
          url: "https://school.modernisum.com/download",
        },
        {
          "@type": "WebPage",
          name: "Campus Features",
          description: "Explore 150ms Face AI Turnstiles, Timetable Matrix Solver, Automated Fee Ledger, and Bus GPS Fleet Telemetry.",
          url: "https://school.modernisum.com/features",
        },
        {
          "@type": "WebPage",
          name: "Pricing & Transparent Billing",
          description: "Interactive Transparent Billing & Capacity Calculator. Zero hidden fees, ₹20/student/mo, 100% offline free tier.",
          url: "https://school.modernisum.com/pricing",
        },
        {
          "@type": "WebPage",
          name: "Documentation & State Board Guides",
          description: "Complete technical guides for CBSE LOC, U-DISE+ integration, thermal POS hardware drivers, and DPDP Act compliance.",
          url: "https://school.modernisum.com/docs",
        },
        {
          "@type": "WebPage",
          name: "Contact & On-Campus Demo",
          description: "Book an on-site physical hardware survey, discuss tailor-made pricing, or speak directly with our core engineering team.",
          url: "https://school.modernisum.com/contact",
        },
        {
          "@type": "WebPage",
          name: "Software Releases & Changelog",
          description: "Continuous version releases, SHA-256 build checksums, security audits, and upgrade logs.",
          url: "https://school.modernisum.com/releases",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://school.modernisum.com/#breadcrumbs",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Modernisum",
          item: "https://modernisum.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "ModSchool",
          item: "https://school.modernisum.com",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://school.modernisum.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does ModSchool operate 100% offline without internet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ModSchool is built on a local-first SQLite and embedded Raft consensus architecture. All fee billing counters, admission desks, and turnstiles communicate over local LAN Wi-Fi/Ethernet with sub-15ms latency, operating seamlessly even during complete broadband blackouts.",
          },
        },
        {
          "@type": "Question",
          name: "Does ModSchool support CBSE LOC and U-DISE+ form auto-filling?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ModSchool includes the Clerk MV3 Co-Pilot browser extension, which auto-fills student data directly into government portals (CBSE LOC, U-DISE+, NSP, State Scholarship portals) with automatic in-browser photo/signature resizing to required KB limits.",
          },
        },
        {
          "@type": "Question",
          name: "How fast is the Face AI turnstile biometric gate attendance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The physical tripod and flap barrier turnstiles identify students in under 150ms using on-device NPU vector matching with anti-spoofing dual infrared cameras, processing up to 50 students per minute per gate.",
          },
        },
        {
          "@type": "Question",
          name: "Is student demographic data stored centrally on cloud servers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. ModSchool adheres to strict Zero-Central-Storage and India DPDP Act 2023 principles. Sensitive student records, marks, photos, and biometric vector hashes remain 100% air-gapped on the school's local hardware.",
          },
        },
        {
          "@type": "Question",
          name: "How does the +25% fee deficit shortfall alert work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ModSchool calculates real-time academic session progress and requires a +25% collection buffer. If collections fall below this threshold, automated polite WhatsApp alerts and parent radar banners are dispatched to maintain institutional cash liquidity.",
          },
        },
        {
          "@type": "Question",
          name: "What hardware does ModSchool integrate with directly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ModSchool interfaces directly via native USB and LAN drivers with 80mm ESC/POS thermal receipt printers, UHF 8-12m long-range RFID gate antennas, facial recognition turnstile barrier relays, and 4G LTE bus GPS trackers.",
          },
        },
        {
          "@type": "Question",
          name: "Can teachers take attendance and submit substitutions from Android phones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The Teacher & Faculty Android APK allows instant roll call, 1-tap proxy assignment acceptance, syllabus task progress tracking, and digital homework broadcasts via encrypted local relay tunnels.",
          },
        },
        {
          "@type": "Question",
          name: "What are the subscription charges for ModSchool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ModSchool operates on a transparent ₹20/student/month model (or ₹15/student/month billed annually). Small institutions and startups benefit from our tailored affordability models, with zero hidden setup charges, 0% GST (statutory MSME exemption), and a free offline single-PC tier.",
          },
        },
      ],
    },
    {
      "@type": "VideoObject",
      "@id": "https://school.modernisum.com/#walkthrough-video",
      name: "ModSchool Autonomous School ERP Complete Campus Walkthrough",
      description: "Complete architectural demonstration of ModSchool: Windows desktop offline sync, Face AI turnstiles, and parent mobile app.",
      thumbnailUrl: "https://school.modernisum.com/images/desktop/turnstile_gate_screen.png",
      uploadDate: "2026-09-15T08:00:00+05:30",
      contentUrl: "https://school.modernisum.com",
    },
  ],
};

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/50 via-slate-50 to-sky-50/30 dark:from-[#030712] dark:via-[#040918] dark:to-[#030712] text-slate-900 dark:text-slate-100 selection:bg-sky-400/30 selection:text-sky-900 dark:selection:text-sky-200 transition-colors duration-300 overflow-x-hidden relative">
      {/* Schema.org Comprehensive Structured Data for Nobel-Grade SEO & Google SERP Sitelinks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modSchoolComprehensiveSchema) }}
      />

      {/* 120 FPS Compositor-Optimized Static Ambient Canopy & Glows (Zero Blur Repaints) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 10%, rgba(56, 189, 248, 0.16) 0%, transparent 45%),
            radial-gradient(circle at 85% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 15% 75%, rgba(45, 212, 191, 0.10) 0%, transparent 40%)
          `,
          transform: "translate3d(0, 0, 0)",
          contain: "strict",
        }}
      />

      {/* Single Dedicated School OS Top Navbar (Powered by Shared Navbar Engine) */}
      <Navbar variant="school" />

      <main className="flex-1 relative z-10 pt-16 sm:pt-20">
        {children}
      </main>

      <Footer variant="school" />
    </div>
  );
}
