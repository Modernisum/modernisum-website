import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsListSection, NewsReleaseItem } from "@/components/shared/NewsListSection";

export const metadata: Metadata = {
  title: "News & Platform Announcements | Modernisum",
  description:
    "Official announcements, product milestones, and technical releases from Modernisum and Vidhyam School OS.",
};

export const revalidate = 60;

const NEWS_RELEASES: NewsReleaseItem[] = [
  {
    id: "school-os-v2-8-1",
    title: "Vidhyam Campus Suite v2.8.1 Released with Sub-150ms Face AI & POS Esc/Pos Printing",
    category: "Platform Release",
    date: "17 Oct 2026",
    excerpt:
      "Our flagship school management desktop platform introduces zero-cloud multi-PC LAN synchronization, sub-150ms facial turnstile ingress, and direct 80mm ESC/POS dual-copy receipt printing.",
    badge: "School OS v2.8.1",
    badgeColor: "bg-emerald-500/15 border-emerald-400/30 text-emerald-600 dark:text-emerald-300",
    coverImage: "/images/vidhyam/dashboard_dark.png",
    readTime: "3 min read",
    author: {
      name: "Vidhyam Core Team",
      role: "Desktop Platform Lead",
      avatar: "/logo.png",
    },
    href: "/mod-school/releases",
  },
  {
    id: "ground-deployments",
    title: "Modernisum Expands Ground-Level Field Deployments Across Regional Schools",
    category: "Ecosystem Milestone",
    date: "17 Oct 2026",
    excerpt:
      "Direct R&D team rollouts and hands-on administrative feedback loops operating out of our permanent Parikshitgarh studio, solving real campus pain points directly with teachers and principals.",
    badge: "Field R&D",
    badgeColor: "bg-cyan-500/15 border-cyan-400/30 text-cyan-600 dark:text-cyan-300",
    coverImage: "/images/vidhyam/attendance_dark.png",
    readTime: "2 min read",
    author: {
      name: "R&D Field Team",
      role: "On-Ground Deployments",
      avatar: "/logo.png",
    },
    href: "/about",
  },
  {
    id: "ev-diagnostics-research",
    title: "Designing a Zero-Friction EV Ecosystem: Open APIs & Auto-Unlock Feeder Architecture",
    category: "Architecture Spec",
    date: "16 Oct 2026",
    excerpt:
      "Modernisum publishes an extensive architectural blueprint addressing India's EV adoption gap: sub-second FASTag auto-debit, offline-first edge state machines, auto-unlock gun sharing, and underground DISCOM feeder lines.",
    badge: "Technical Blueprint",
    badgeColor: "bg-purple-500/15 border-purple-400/30 text-purple-600 dark:text-purple-300",
    coverImage: "/images/blog/ev-ecosystem-banner.png",
    readTime: "7 min read",
    author: {
      name: "Shivank Bhati",
      role: "Chief Technology Architect",
      avatar: "/logo.png",
    },
    href: "/blog/ev-charging-battery-swap-architecture",
  },
  {
    id: "offline-lan-sync",
    title: "Zero-Cloud Multi-PC Local Area Sync: The Autonomous Campus LAN Protocol",
    category: "Platform Release",
    date: "15 Oct 2026",
    excerpt:
      "Engineered for high-throughput campus bursars: peer-to-peer raft state machines keep multiple fee billing computers synchronized in real-time even when internet lines are severed.",
    badge: "LAN Raft v1.2",
    badgeColor: "bg-sky-500/15 border-sky-400/30 text-sky-600 dark:text-sky-300",
    coverImage: "/images/vidhyam/fee_ledger_dark.png",
    readTime: "4 min read",
    author: {
      name: "Distributed Systems Lab",
      role: "Core Systems Engineer",
      avatar: "/logo.png",
    },
    href: "/blog/autonomous-campus-systems",
  },
  {
    id: "extension-v3",
    title: "Clerk Co-Pilot Extension v3.0 Published with Automated CBSE LOC Form Filling",
    category: "Ecosystem Milestone",
    date: "10 Mar 2026",
    excerpt:
      "Browser extension for school administrative staff automates government portal data entry, client-side 40KB image resizing, and error detection without harvesting school login credentials.",
    badge: "Extension v3.0",
    badgeColor: "bg-amber-500/15 border-amber-400/30 text-amber-600 dark:text-amber-300",
    coverImage: "/images/vidhyam/extension_dark.png",
    readTime: "4 min read",
    author: {
      name: "Browser Extensions Lab",
      role: "Automation Architect",
      avatar: "/logo.png",
    },
    href: "/mod-school/apps/extension",
  },
  {
    id: "data-sovereignty-policy",
    title: "Local-First Data Sovereignty Policy Formalized Across All Platforms",
    category: "Security",
    date: "01 Mar 2026",
    excerpt:
      "Modernisum codifies strict compliance with DPDP Act 2023, GDPR, and FERPA standards. All institutional data remains on local hardware—zero centralized multi-tenant honeypots.",
    badge: "DPDP & GDPR",
    badgeColor: "bg-sky-500/15 border-sky-400/30 text-sky-600 dark:text-sky-300",
    coverImage: "/images/blog/ai-saas-school-erp.jpg",
    readTime: "5 min read",
    author: {
      name: "Information Security Board",
      role: "Compliance & Governance",
      avatar: "/logo.png",
    },
    href: "/security",
  },
];

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-36 pb-24">
        <NewsListSection releases={NEWS_RELEASES} />
      </main>
      <Footer />
    </div>
  );
}
