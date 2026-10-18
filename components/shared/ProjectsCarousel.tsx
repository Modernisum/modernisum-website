"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ArrowUpRight, FolderGit2, ChevronLeft, ChevronRight } from "lucide-react";
import { SeedProject } from "@/lib/seed-data";

interface ProjectsCarouselProps {
  projects: SeedProject[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    checkScrollState();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollState, { passive: true });
      window.addEventListener("resize", checkScrollState);
      return () => {
        el.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, [filteredProjects]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.75, 480);
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden scroll-mt-32" id="projects">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-3 border border-cyan-500/30">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Proven Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Featured Case Studies &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                Architectural Milestones
              </span>
            </h2>
          </div>

          {/* Filter Pills & Carousel Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-700 dark:text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                      : "glass-pill text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Previous & Next Carousel Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200/80 dark:border-white/10">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Case Study"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 cursor-pointer shadow-sm"
                    : "border-slate-200 dark:border-white/5 bg-slate-100/40 dark:bg-white/[0.02] text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next Case Study"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 cursor-pointer shadow-sm"
                    : "border-slate-200 dark:border-white/5 bg-slate-100/40 dark:bg-white/[0.02] text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Single-Row Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-1 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px] xl:w-[470px] shrink-0 snap-start flex flex-col"
            >
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.18)"
                className="rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between h-full group hover:border-cyan-400/50 transition-all duration-300 shadow-md"
              >
                {/* Media Aspect Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950/60">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 340px, (max-width: 1200px) 440px, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Top Badges Bar - Unified Flex with Truncation to Prevent Collisions */}
                  <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between gap-2 pointer-events-none z-10">
                    <div className="flex items-center gap-1.5 min-w-0 shrink">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-black/75 backdrop-blur-md border border-white/20 text-cyan-300 truncate max-w-[150px] sm:max-w-[190px]">
                        {project.category}
                      </span>
                      {project.screenshots && project.screenshots.length > 0 && (
                        <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-emerald-500/25 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live UI
                        </span>
                      )}
                    </div>

                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-black/75 backdrop-blur-md border border-white/15 text-slate-300 truncate max-w-[130px] sm:max-w-[170px] shrink-0 text-right">
                      {project.client}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-2.5 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light mb-5 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Metrics Strip */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">{m.label}</span>
                            <span className="block text-base sm:text-lg font-bold text-cyan-600 dark:text-cyan-300 font-display">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                    <Link
                      href={project.websiteUrl || `/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200 transition-colors group/link"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
