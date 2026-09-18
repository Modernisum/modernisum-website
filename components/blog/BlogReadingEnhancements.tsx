"use client";

import React, { useState, useEffect } from "react";
import { Share2, Check, MessageCircle, Copy, Zap } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setProgress(Math.min(100, Math.max(0, scroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

interface BlogShareBarProps {
  title: string;
  url?: string;
}

export function BlogShareBar({ title, url }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm transition-colors">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <Share2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span>Share this insight:</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 bg-white dark:bg-white/10 hover:bg-cyan-50 dark:hover:bg-white/20 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 shadow-xs active:scale-95"
          title="Copy article link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* X / Twitter */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-white/10 hover:bg-cyan-50 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1"
          aria-label="Share on X"
        >
          <XIcon className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
          <span className="hidden sm:inline">Post</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-white/10 hover:bg-cyan-50 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-white/10 hover:bg-cyan-50 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export function KeyArchitectureHighlights() {
  const highlights = [
    {
      metric: "0.38s",
      title: "Contactless RFID Check-In",
      desc: "Sub-second tap-to-SMS pipeline notifying parents instantly as students cross campus turnstiles.",
    },
    {
      metric: "< 250ms",
      title: "Real-Time Bus Fleet Radar",
      desc: "Live WebSocket telemetry streaming vehicle GPS coordinates with automated 1km geofence arrival alerts.",
    },
    {
      metric: "90%",
      title: "Admin Overhead Eliminated",
      desc: "Unified AI-assisted dashboard handling automated fee reconciliation, CBSE report cards, and payroll.",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-100/80 to-purple-500/10 dark:from-cyan-950/30 dark:via-white/[0.02] dark:to-purple-950/20 border border-cyan-500/20 dark:border-cyan-400/20 shadow-lg mb-8">
      <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-300 mb-3">
        <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span>Executive Architecture Summary</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight mb-5">
        Core Architectural Breakthroughs
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((h, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                {h.metric}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-1">
                {h.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
