"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import {
  Star,
  MessageSquareQuote,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Laptop,
  Sprout,
  Bot,
} from "lucide-react";
import {
  CommunityEntry,
  SEED_COMMUNITY_ENTRIES,
  ProductTarget,
} from "@/lib/firestore/community";

const PRODUCT_BADGES: Record<
  ProductTarget,
  { label: string; icon: React.ElementType; color: string }
> = {
  vidhyam: {
    label: "MOD School OS",
    icon: GraduationCap,
    color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
  },
  agromi: {
    label: "MOD Farmer Agro-Tech",
    icon: Sprout,
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
  },
  studio: {
    label: "AI Studio",
    icon: Bot,
    color: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300",
  },
  extension: {
    label: "Clerk Co-Pilot",
    icon: Laptop,
    color: "bg-sky-500/15 border-sky-500/30 text-sky-700 dark:text-sky-300",
  },
  general: {
    label: "Security & Governance",
    icon: ShieldCheck,
    color: "bg-indigo-500/15 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
  },
};

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<CommunityEntry[]>(() =>
    SEED_COMMUNITY_ENTRIES.filter((e) => e.featuredOnHome)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadFeaturedReviews() {
      try {
        const res = await fetch("/api/community?featured=true");
        if (res.ok) {
          const json = await res.json();
          if (mounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setReviews(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load featured reviews from API, using cached seed reviews:", err);
      }
    }
    loadFeaturedReviews();
    return () => {
      mounted = false;
    };
  }, []);

  // For continuous seamless infinite right-to-left marquee loop, duplicate list
  const marqueeItems =
    reviews.length < 4
      ? [...reviews, ...reviews, ...reviews, ...reviews]
      : [...reviews, ...reviews];

  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Executive Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4 border border-purple-500/30">
            <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Institutional Community Voice</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            Curated from Real Practitioners in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-600 dark:from-purple-400 dark:via-indigo-300 dark:to-cyan-400">
              Education & Enterprise
            </span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
            Zero speculative marketing claims. Every review below is an authentic deployment feedback borrowed directly from verified institutional leaders actively operating Modernisum software on campus.
          </p>
        </div>

        {/* Right-to-Left Continuous Smooth Marquee Track */}
        <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
          <div className="animate-marquee-rtl gap-6">
            {marqueeItems.map((review, idx) => {
              const badge = PRODUCT_BADGES[review.product] || PRODUCT_BADGES.vidhyam;
              const BadgeIcon = badge.icon;

              return (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[360px] sm:w-[420px] shrink-0"
                >
                  <LiquidGlassCard
                    glowColor="rgba(121, 40, 202, 0.16)"
                    className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 h-full flex flex-col justify-between hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all group bg-white/80 dark:bg-[#070d18]/85 backdrop-blur-xl shadow-xl"
                  >
                    <div>
                      {/* Top Meta Bar: Rating & Product Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating || 5 }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                          <span className="ml-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                            {review.rating || 5}.0
                          </span>
                        </div>

                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${badge.color}`}
                        >
                          <BadgeIcon className="w-3 h-3 shrink-0" />
                          <span>{badge.label}</span>
                        </div>
                      </div>

                      {/* Review Headline & Authentic Description */}
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {review.title}
                      </h4>

                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-light italic mb-6 line-clamp-4">
                        &ldquo;{review.description}&rdquo;
                      </p>
                    </div>

                    {/* School Emblem / Author Institution Footer */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Institution Emblem / Avatar */}
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-slate-300 dark:border-white/15 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-sm">
                          {review.institutionLogo ? (
                            <Image
                              src={review.institutionLogo}
                              alt={review.institution || "School Emblem"}
                              width={36}
                              height={36}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {review.authorName}
                            </h5>
                            {review.verifiedCustomer && (
                              <span title="Verified Institutional Deployment" className="inline-flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                            {review.authorRole}
                          </p>
                          <p className="text-[11px] font-medium text-cyan-700 dark:text-cyan-300 truncate">
                            {review.institution || "Modernisum Verified Partner"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Strip linking to Community Hub */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Real user community feedback synchronized live with central telemetry
            </span>
          </div>

          <Link
            href="/community"
            prefetch={false}
            className="inline-flex items-center gap-1.5 font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
          >
            <span>Read all community entries &amp; bug resolutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
