"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { ArrowUpRight, FolderGit2, Sparkles, ExternalLink } from "lucide-react";
import { SeedProject } from "@/lib/seed-data";

interface ProjectsCarouselProps {
  projects: SeedProject[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-24 relative overflow-hidden" id="projects">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.15)"
                className="rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between h-full group hover:border-cyan-400/40 transition-all duration-300"
              >
                {/* Media Aspect Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950/60">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category & Live Badge Top Left */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300">
                      {project.category}
                    </span>
                    {project.screenshots && project.screenshots.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live UI
                      </span>
                    )}
                  </div>

                  {/* Client Tag Top Right */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md border border-white/15 text-slate-300">
                      {project.client}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light mb-6">
                      {project.description}
                    </p>

                    {/* Metrics Strip */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="text-center sm:text-left">
                            <span className="block text-xs font-mono text-slate-600 dark:text-slate-400">{m.label}</span>
                            <span className="block text-sm sm:text-base font-bold text-cyan-600 dark:text-cyan-300 font-display">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200 transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
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
