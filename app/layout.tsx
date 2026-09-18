import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

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
    default: "Modernisum | AI-Integrated SaaS, Custom Software & School ERP",
    template: "%s | Modernisum",
  },
  description:
    "Enterprise-grade software company delivering AI-powered SaaS platforms, modern web and mobile applications, custom device software, and the flagship Modern School ERP ecosystem.",
  keywords: [
    "Modernisum",
    "AI SaaS software",
    "Modern School ERP",
    "custom software development",
    "web application development",
    "mobile apps Android iOS",
    "IoT device software",
    "AI workflow automation",
  ],
  authors: [{ name: "Modernisum Team", url: "https://modernisum.com" }],
  creator: "Modernisum",
  metadataBase: new URL("https://modernisum.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modernisum.com",
    title: "Modernisum | AI-Integrated SaaS & Custom Software Architecture",
    description:
      "Enterprise software, AI SaaS platforms, and Modern School ERP ecosystem with Apple-grade Liquid Glass experience.",
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
    title: "Modernisum | AI-Integrated SaaS & Custom Software Architecture",
    description:
      "Enterprise software, AI SaaS platforms, and Modern School ERP ecosystem.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
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
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
        <AmbientBackground />
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
