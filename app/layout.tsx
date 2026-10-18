import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { LanguageProvider } from "@/lib/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Modernisum | School ERP, Autonomous Campus OS & Enterprise AI Solutions",
    template: "%s | Modernisum",
  },
  description:
    "Next-generation School ERP, Campus Operating Systems (school.modernisum.com), and Sovereign Enterprise AI. Local-first zero-cloud-lockin architecture, offline-first attendance, automated fee processing, and DPDP Act 2023 compliance.",
  keywords: [
    "MOD School",
    "MOD School OS",
    "MOD School ERP",
    "MOD School CRM",
    "MOD School Software",
    "MOD Farmer",
    "MOD Farmer OS",
    "MOD Farmer Agro",
    "MOD",
    "School ERP",
    "School CRM",
    "School OS",
    "School Management System",
    "School Management Software India",
    "Offline School ERP",
    "Local-First School ERP Software",
    "Best School ERP India",
    "Student Information System (SIS)",
    "CBSE LOC Auto-Filler",
    "ICSE School Management System",
    "Biometric Facial Vector Attendance",
    "DPDP Act 2023 Compliant School Software",
    "Enterprise AI Solutions",
    "Autonomous Enterprise OS",
    "AgroTech Precision Agriculture Software",
    "Crop Care AI Doctor",
    "Tech Solutions India",
    "Software Development Company Meerut Uttar Pradesh",
    "Modernisum",
    "school.modernisum.com",
    "Modernisum Technologies",
  ],
  authors: [{ name: "Modernisum Technologies", url: "https://modernisum.com" }],
  creator: "Modernisum Technologies",
  metadataBase: new URL("https://modernisum.com"),
  alternates: {
    canonical: "https://modernisum.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modernisum.com",
    title: "Modernisum | School ERP, Autonomous Campus OS & Enterprise AI Solutions",
    description:
      "Sovereign School ERP, Campus Management OS (school.modernisum.com), and autonomous AI enterprise pipelines. 100% data sovereignty, offline-first reliability, zero cloud lock-in.",
    siteName: "Modernisum",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Modernisum Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modernisum | School ERP, Autonomous Campus OS & Enterprise AI Solutions",
    description:
      "Sovereign School ERP, Campus Management OS, and autonomous AI enterprise systems. Offline-first zero-storage invariant.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved === 'light' ? false : true;

                  if (isDark) {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }

                  // Instant zero-flicker Subdomain Detection
                  var host = window.location.hostname;
                  var isSchool = host === 'school.modernisum.com' || host.indexOf('school.') === 0;

                  if (isSchool) {
                    document.documentElement.classList.add('is-school-subdomain');
                  }
                } catch(e) {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://modernisum.com/#organization",
                  "name": "Modernisum Technologies",
                  "alternateName": [
                    "MOD",
                    "MOD School",
                    "MOD Farmer",
                    "Modernisum",
                    "Modernisum School OS",
                    "Vidhyam School OS",
                    "Modernisum ERP"
                  ],
                  "url": "https://modernisum.com",
                  "logo": "https://modernisum.com/logo.png",
                  "legalName": "Modernisum Technologies",
                  "taxID": "UDYAM-UP-56-0049848",
                  "description": "Sovereign Enterprise Software, MOD School autonomous School ERP / School Management OS, and MOD Farmer precision agro OS engineered with zero cloud honeypots, local-first runtime, and DPDP Act 2023 compliance.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Near Water Tank, Dayalpur, Parikshitgarh",
                    "addressLocality": "Meerut",
                    "addressRegion": "Uttar Pradesh",
                    "postalCode": "250406",
                    "addressCountry": "IN"
                  },
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-9368671007",
                      "contactType": "customer service",
                      "email": "contact@modernisum.com",
                      "areaServed": "IN",
                      "availableLanguage": ["English", "Hindi"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-9368671007",
                      "contactType": "compliance officer",
                      "email": "compliance@modernisum.com",
                      "areaServed": "Global"
                    }
                  ],
                  "sameAs": [
                    "https://twitter.com/modernisum",
                    "https://linkedin.com/company/modernisum"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://modernisum.com/#software-mod-school",
                  "name": "MOD School (Autonomous School ERP & CRM)",
                  "alternateName": ["MOD School", "MOD School OS", "MOD School ERP", "MOD School CRM", "Modernisum School OS", "Vidhyam School OS"],
                  "applicationCategory": "BusinessApplication, EducationalApplication",
                  "operatingSystem": "Windows 64-bit, Android, iOS, Google Chrome",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "@id": "https://modernisum.com/#organization"
                    }
                  },
                  "description": "Local-first autonomous School ERP and School CRM operating directly on campus hardware under the proper noun MOD School. Features biometric facial vector edge-hashing, automated CBSE LOC and U-DISE+ data-filling, offline fee counters, and verifiable parental consent under DPDP Act 2023.",
                  "featureList": [
                    "Local-First SQLite Database Architecture (Zero Cloud Lock-in)",
                    "14-Day Offline Operational Grace Guarantee",
                    "Automated CBSE LOC & U-DISE+ Form Filler Extension",
                    "512-Dimension Biometric Facial Vector Edge Hashing",
                    "Verifiable Parental Consent & 100% Air-Gapped Student Isolation",
                    "BYOC (Bring Your Own Cloud) Google Drive Auto-Snapshots"
                  ],
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://modernisum.com/#organization"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://modernisum.com/#software-mod-farmer",
                  "name": "MOD Farmer (Autonomous Precision Agriculture OS & AI Crop Doctor)",
                  "alternateName": ["MOD Farmer", "MOD Farmer OS", "MOD Agro", "Agromi Agro-Tech"],
                  "applicationCategory": "BusinessApplication, AgriculturalApplication",
                  "operatingSystem": "Web, Android, Cloud, LoRaWAN",
                  "description": "Autonomous precision farming OS and AI Crop Doctor providing plant disease diagnosis, sub-surface LoRaWAN soil moisture probes, drone multispectral NDVI imagery, and APMC mandi market price forecasting.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "@id": "https://modernisum.com/#organization"
                    }
                  },
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://modernisum.com/#organization"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://modernisum.com/#website",
                  "name": "Modernisum Technologies",
                  "url": "https://modernisum.com",
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://modernisum.com/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://modernisum.com/blog?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
        <AmbientBackground />
        <LanguageProvider>
          <div className="relative z-10 flex-1 flex flex-col">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
