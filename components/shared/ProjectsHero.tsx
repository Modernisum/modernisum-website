"use client";

import React from "react";
import { FolderGit2 } from "lucide-react";

export function ProjectsHero() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-4 border border-cyan-500/30">
        <FolderGit2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
        <span>Proven Deliverables</span>
      </div>
      <h1 className="text-4xl sm:text-6xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
        Case Studies &{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
          Architectural Milestones
        </span>
      </h1>
      <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
        Explore how our software systems, high-concurrency cloud pipelines, and IoT solutions deliver verifiable operational results.
      </p>
    </div>
  );
}
