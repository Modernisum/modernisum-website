"use client";

import React, { useState, useEffect } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import {
  Copy,
  Check,
  Share2,
  Mail,
  ExternalLink,
  MessageCircle,
  Send,
  Globe,
  Smartphone,
} from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
  description?: string;
  variant?: "modernisum" | "school" | "vidhyam" | "agromi";
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  url,
  description = "Explore sovereign technologies, campus operating systems, and autonomous enterprise solutions.",
  variant = "modernisum",
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || "");
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(url || window.location.href);
      setSupportsNativeShare(typeof navigator !== "undefined" && !!navigator.share);
    }
  }, [url, isOpen]);

  const handleCopy = async () => {
    if (typeof window !== "undefined" && currentUrl) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = currentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or share failed silently
      }
    }
  };

  const shareText = `${title} — ${description}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareChannels = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      bgColor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bgColor: "bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white",
    },
    {
      name: "X (Twitter)",
      icon: TwitterXIcon,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      bgColor: "bg-slate-500/15 border-slate-500/30 text-slate-800 dark:text-slate-200 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-black hover:text-white",
    },
    {
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      bgColor: "bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%0A%0A${encodedUrl}`,
      bgColor: "bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white",
    },
  ];

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Document"
      description="Distribute verified legal frameworks, technology releases, and platform documents."
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Document Preview Card */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-[10.5px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>modernisum.com</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
            {title}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-light">
            {description}
          </div>
        </div>

        {/* 1-Click Copy Link Bar */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Direct Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono truncate focus:outline-none"
              />
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 shadow-xs border ${
                copied
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-cyan-500 hover:bg-cyan-400 border-cyan-400 text-slate-950 font-bold"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Grid */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Share via Social & Messaging
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {shareChannels.map((channel) => {
              const ChannelIcon = channel.icon;
              return (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-xs font-medium cursor-pointer ${channel.bgColor}`}
                >
                  <ChannelIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </a>
              );
            })}

            {/* Native OS Share (if supported) */}
            {supportsNativeShare && (
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all text-xs font-medium cursor-pointer"
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Device Share</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassModal>
  );
}
