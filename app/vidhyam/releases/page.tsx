"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Layers,
  ArrowUpRight,
  Filter
} from "lucide-react";
import { SEED_RELEASES, ReleaseItem } from "@/lib/release-types";

export default function VidhyamReleasesPage() {
  const [releases, setReleases] = useState<ReleaseItem[]>(SEED_RELEASES);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "rel_2_8_1-fixes": true,
    "rel_2_8_0-improvements": true,
  });
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    async function loadReleases() {
      try {
        const res = await fetch("/api/admin/releases");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setReleases(json.data);
        }
      } catch (err) {
        console.warn("Using baseline release data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReleases();
  }, []);

  const toggleAccordion = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const sortedReleases = [...releases].sort((a, b) => {
    if (a.isLatest && !b.isLatest) return -1;
    if (!a.isLatest && b.isLatest) return 1;
    return b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: "base" });
  });

  return (
    <div className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-3xl mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Release History & Architecture Changelog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Vidhyam Desktop Releases
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Comprehensive release notes, performance benchmarks, and security enhancements for Vidhyam School OS. Each Windows build is cryptographically verified and backed by high-speed enterprise mirrors.
        </p>
      </div>

      {/* Release Timeline List */}
      <div className="space-y-12 sm:space-y-16">
        {sortedReleases.map((release) => {
          const impKey = `${release.id || release.version}-improvements`;
          const fixKey = `${release.id || release.version}-fixes`;
          const patKey = `${release.id || release.version}-patches`;

          const isImpOpen = !!openSections[impKey];
          const isFixOpen = !!openSections[fixKey];
          const isPatOpen = !!openSections[patKey];

          return (
            <div
              key={release.id || release.version}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start"
            >
              {/* Left Column: Version & Date (Pixel-matched to user screenshot) */}
              <div className="lg:col-span-3 pt-2">
                <div className="flex lg:flex-col items-baseline lg:items-start justify-between lg:justify-start gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {release.version}
                    </span>
                    {release.isLatest && (
                      <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                    {release.releaseDate}
                  </span>
                </div>
              </div>

              {/* Right Column: Clean Rounded Card Container (Pixel-matched) */}
              <div className="lg:col-span-9 bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 sm:py-9 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all">
                {/* Card Header: Title and Description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-slate-200/60 dark:border-white/5">
                  <div className="md:col-span-5">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                      {release.title}
                    </h2>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {release.overview}
                    </p>
                  </div>
                </div>

                {/* Card Body: Expandable Accordions */}
                <div className="mt-4 divide-y divide-slate-200/60 dark:divide-white/5 text-sm">
                  {/* Accordion 1: Improvements */}
                  <div className="py-3.5">
                    <button
                      onClick={() => toggleAccordion(impKey)}
                      className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                        Improvements ({release.improvements?.length || 0})
                      </span>
                      <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-slate-400 transition-colors">
                        {isImpOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                    {isImpOpen && (
                      <div className="pt-3 pb-1 pl-1">
                        {release.improvements && release.improvements.length > 0 ? (
                          <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                            {release.improvements.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-slate-400 dark:text-slate-500 select-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-400 dark:text-slate-500 italic pl-3">
                            No structural improvements logged for this patch build.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: Fixes */}
                  <div className="py-3.5">
                    <button
                      onClick={() => toggleAccordion(fixKey)}
                      className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                        Fixes ({release.fixes?.length || 0})
                      </span>
                      <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-slate-400 transition-colors">
                        {isFixOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                    {isFixOpen && (
                      <div className="pt-3 pb-1 pl-1">
                        {release.fixes && release.fixes.length > 0 ? (
                          <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                            {release.fixes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-slate-400 dark:text-slate-500 select-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-400 dark:text-slate-500 italic pl-3">
                            No bugs reported or patched in this version.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Accordion 3: Patches */}
                  <div className="py-3.5">
                    <button
                      onClick={() => toggleAccordion(patKey)}
                      className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                        Patches ({release.patches?.length || 0})
                      </span>
                      <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-slate-400 transition-colors">
                        {isPatOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                    {isPatOpen && (
                      <div className="pt-3 pb-1 pl-1">
                        {release.patches && release.patches.length > 0 ? (
                          <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                            {release.patches.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-slate-400 dark:text-slate-500 select-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-400 dark:text-slate-500 italic pl-3">
                            Zero hotfixes required for this milestone.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Direct Binary Download & Hash Verification */}
                <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={release.downloadUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download v{release.version} ({release.fileSize})</span>
                    </a>
                    <Link
                      href="/vidhyam/download"
                      className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      System Specs
                    </Link>
                  </div>

                  {release.sha256 && (
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-black/30 px-3 py-1.5 rounded-lg border border-slate-300/60 dark:border-white/5">
                      <span className="text-slate-400">SHA256:</span>
                      <span>{release.sha256.slice(0, 12)}...{release.sha256.slice(-8)}</span>
                      <button
                        onClick={() => copyToClipboard(release.sha256 || "")}
                        title="Copy complete SHA256 checksum"
                        className="hover:text-cyan-400 transition-colors ml-1 p-0.5"
                      >
                        {copiedHash === release.sha256 ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Support Banner */}
      <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200/60 dark:from-slate-900/80 dark:to-slate-900/40 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Need an enterprise roll-out or custom build?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Our engineering team can deploy Vidhyam across campus LAN servers, turnstiles, and biometric devices.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/vidhyam/support"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 transition-colors"
          >
            Contact Engineering Support
          </Link>
        </div>
      </div>
    </div>
  );
}
