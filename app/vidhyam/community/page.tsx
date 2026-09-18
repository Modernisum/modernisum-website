"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  Calendar,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  Award,
  CheckCircle2
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

const CIRCLES = [
  {
    title: "CBSE Principals Network",
    members: "420+ Leaders",
    focus: "Curriculum pacing, UDISE+ compliance, board circulars & term exam standards.",
    badge: "Accredited",
  },
  {
    title: "ICSE Academic Leads",
    members: "190+ Educators",
    focus: "Continuous assessment rubrics, laboratory scheduling & CISCE compliance.",
    badge: "Active",
  },
  {
    title: "School IT & Infrastructure",
    members: "380+ Specialists",
    focus: "Thermal printer troubleshooting, LAN server nodes, CCTV RTSP integration.",
    badge: "Technical",
  },
  {
    title: "Budget Private Schools Consortium",
    members: "510+ Founders",
    focus: "100% fee recovery workflows, parent WhatsApp communications & lean operations.",
    badge: "Strategic",
  },
];

const DISCUSSIONS = [
  {
    id: 1,
    title: "Transitioning 1,800 students from thumb biometrics to contactless Face AI gate ingress",
    author: "Dr. Sunita Verma",
    role: "Principal, Dehradun World School",
    replies: 42,
    upvotes: 128,
    category: "Automation",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Optimal configuration for 8-period timetable with 3 shared science laboratories",
    author: "Rajeshwar Rao",
    role: "Academic Coordinator, Hyderabad",
    replies: 31,
    upvotes: 94,
    category: "Timetable",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Achieving 99.4% on-time fee recovery using automated WhatsApp reminders",
    author: "Manish Aggarwal",
    role: "Managing Trustee, DPS Moradabad",
    replies: 57,
    upvotes: 182,
    category: "Financials",
    time: "1 day ago",
  },
  {
    id: 4,
    title: "UDISE+ annual data audit: Complete export verification checklist for 2026-27",
    author: "Priya Sundaram",
    role: "Senior IT Administrator, Bengaluru",
    replies: 24,
    upvotes: 76,
    category: "Compliance",
    time: "2 days ago",
  },
];

const WISHLIST = [
  { feature: "Live School Bus GPS Parent App Alert", votes: 342, status: "In Development" },
  { feature: "RFID Smart Card Library Self-Checkout", votes: 268, status: "Planned for Q4" },
  { feature: "AI Lesson Planner for State Board Syllabus", votes: 195, status: "Under Evaluation" },
  { feature: "Cafeteria Prepaid Wallet & Canteen POS", votes: 147, status: "Community Idea" },
];

export default function VidhyamCommunityPage() {
  const [votedItems, setVotedItems] = useState<Record<string, boolean>>({});

  const toggleVote = (feature: string) => {
    setVotedItems((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* 1. Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Educator & Leader Community</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Where School Leaders Shape the Future of{" "}
          <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
            Campus Operations
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          Join 1,200+ school principals, administrators, and academic coordinators across India exchanging operational workflows, timetable solutions, and fee automation tactics.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/919876543210?text=Hi%20Vidhyam,%20I%20would%20like%20to%20join%20the%20Principal%20Community%20Group"
            target="_blank"
            rel="noreferrer"
          >
            <GlassButton variant="primary" size="md" icon={<MessageSquare className="w-4 h-4" />}>
              Join WhatsApp Principal Circle
            </GlassButton>
          </a>
          <Link href="/vidhyam/register">
            <GlassButton variant="secondary" size="md">
              Register School Workspace
            </GlassButton>
          </Link>
        </div>
      </div>

      {/* 2. Educator Circles */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
            Specialized Professional Circles
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dedicated forums filtered by institutional board and administrative role.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CIRCLES.map((c) => (
            <LiquidGlassCard key={c.title} className="p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-600 dark:text-cyan-400">
                  {c.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">{c.members}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                {c.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {c.focus}
              </p>
            </LiquidGlassCard>
          ))}
        </div>
      </div>

      {/* 3. Trending Discussions & Feature Roadmap Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Discussions Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Trending Administrator Discussions
              </h3>
            </div>
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {DISCUSSIONS.map((d) => (
              <LiquidGlassCard key={d.id} className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                    {d.category}
                  </span>
                  <span className="text-[11px] text-slate-400">{d.time}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  {d.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{d.author}</span>
                    <span className="text-slate-400 text-[10px]">({d.role})</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {d.replies}
                    </span>
                    <span className="flex items-center gap-1 text-cyan-500">
                      <ThumbsUp className="w-3 h-3" />
                      {d.upvotes}
                    </span>
                  </div>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </div>

        {/* Feature Wishlist / Voting Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Community Feature Wishlist
            </h3>
          </div>

          <LiquidGlassCard className="p-5 space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              Modernisum prioritizes engineering sprints based on direct school principal upvotes. Vote for capabilities you want next:
            </p>

            <div className="space-y-3">
              {WISHLIST.map((item) => {
                const isVoted = votedItems[item.feature];
                return (
                  <div
                    key={item.feature}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 overflow-hidden">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {item.feature}
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300">
                        {item.status}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleVote(item.feature)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isVoted
                          ? "bg-cyan-500 text-white shadow-xs"
                          : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{item.votes + (isVoted ? 1 : 0)}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <Link href="/vidhyam/contact">
                <span className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline">
                  Submit a new feature proposal →
                </span>
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
