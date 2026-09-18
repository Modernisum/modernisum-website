"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  HardDrive,
  Upload,
  Copy,
  Trash2,
  CheckCircle2,
  FileText,
  ExternalLink,
  Loader2,
  Search,
  Cloud,
  Check,
  Filter,
  Image as ImageIcon,
  AlertCircle,
  Key,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

interface MediaItem {
  id: string;
  name: string;
  mimeType: string;
  publicUrl: string;
  thumbnailUrl: string;
  webViewLink?: string;
  size?: number | string;
  storageProvider?: string;
  createdTime?: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "images" | "docs">("all");
  const [dragOver, setDragOver] = useState(false);
  const [authStatus, setAuthStatus] = useState<{
    isOAuthConnected: boolean;
    folderId: string;
    authUrlOob: string;
    authUrlCallback: string;
  } | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [activatingOAuth, setActivatingOAuth] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch live media from Google Drive + Local Storage
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setFiles(json.data);
      }
    } catch (err) {
      console.error("Error fetching media:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth/gdrive/status");
      const data = await res.json();
      if (data.success) {
        setAuthStatus(data);
      }
    } catch (e) {
      console.error("Failed to load auth status", e);
    }
  };

  useEffect(() => {
    fetchMedia();
    fetchAuthStatus();
  }, []);

  const handleExchangeCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    setActivatingOAuth(true);
    try {
      const res = await fetch("/api/auth/gdrive/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: manualCode }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "5TB Google Drive authenticated and connected permanently!" });
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        setManualCode("");
        fetchAuthStatus();
        fetchMedia();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to exchange auth code." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error during authorization." });
    } finally {
      setActivatingOAuth(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.data) {
        setFiles((prev) => [json.data, ...prev]);
        setMessage({
          type: "success",
          text: json.message || "Asset uploaded successfully!",
        });
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00f2fe", "#7928ca", "#10b981"],
        });
      } else {
        setMessage({
          type: "error",
          text: json.message || "Upload encountered an issue.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Network error during upload.",
      });
    } finally {
      setUploading(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset from storage?")) return;

    try {
      const res = await fetch(`/api/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        setMessage({ type: "success", text: "Asset removed successfully." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete file." });
    }
  };

  const formatFileSize = (size?: number | string) => {
    if (!size) return "";
    if (typeof size === "string") return size;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isImg = f.mimeType?.startsWith("image/") || /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f.name);
    if (filterType === "images") return matchesSearch && isImg;
    if (filterType === "docs") return matchesSearch && !isImg;
    return matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-amber-300 mb-2 border border-amber-500/30">
            <HardDrive className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Drive 5TB Storage Pool</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Media & Asset Storage Cockpit
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-light">
            Connected to user service account (<span className="text-cyan-300 font-mono">modernschool-d2054</span>) with public CDN links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            onChange={onFileInputChange}
            disabled={uploading}
            className="hidden"
            accept="image/*,application/pdf,video/*"
          />
          <GlassButton
            variant="primary"
            size="sm"
            loading={uploading}
            onClick={() => fileInputRef.current?.click()}
            icon={<Upload className="w-4 h-4" />}
          >
            {uploading ? "Uploading to Cloud..." : "Upload New Asset"}
          </GlassButton>
        </div>
      </div>

      {/* 5TB Google Drive Cloud Status & Connect Banner */}
      <LiquidGlassCard glowColor={authStatus?.isOAuthConnected ? "rgba(16, 185, 129, 0.25)" : "rgba(0, 242, 254, 0.3)"} className="p-5 sm:p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                authStatus?.isOAuthConnected
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                  : "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
              }`}>
                {authStatus?.isOAuthConnected ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>5TB CLOUD ACTIVE (DIRECT QUOTA)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>OAUTH ONE-TIME SETUP</span>
                  </>
                )}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Folder: modernisum cloud ({authStatus?.folderId || "1Nt7xkTFIJuBRpFAh9QhydkdopEP49WOl"})
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-cyan-400" />
              {authStatus?.isOAuthConnected
                ? "Google Drive 5TB Personal Quota Connected"
                : "Connect Google Drive 5TB Cloud (Permanent Auth)"}
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {authStatus?.isOAuthConnected
                ? "All uploaded images stream directly to your 5TB Google Drive with high-speed CDN public URLs (lh3.googleusercontent.com)."
                : "Google service accounts have 0 bytes storage. Link your Google account once to upload directly into your 5TB storage without quota restrictions."}
            </p>
          </div>

          {!authStatus?.isOAuthConnected && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={authStatus?.authUrlOob || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Key className="w-4 h-4" />
                <span>1. Open Google Auth Link &rarr;</span>
              </a>

              <form onSubmit={handleExchangeCode} className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="2. Paste Auth Code (4/0A...)"
                  className="px-3 py-2 text-xs rounded-xl bg-white/[0.06] border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono w-48 sm:w-56"
                />
                <button
                  type="submit"
                  disabled={activatingOAuth || !manualCode.trim()}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-cyan-500/20 text-white border border-white/20 hover:border-cyan-400/50 disabled:opacity-40 transition-all flex items-center gap-1.5 shrink-0"
                >
                  {activatingOAuth ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
                  <span>Activate</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </LiquidGlassCard>

      {/* Notification Banner */}
      {message && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
          dragOver
            ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
            : "border-white/15 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-white/[0.04]"
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white block">
            Drag & drop images or click to upload
          </span>
          <span className="text-xs text-slate-400 mt-0.5 block font-light">
            Supports WebP, PNG, JPG, SVG, and PDFs • High-speed CDN replication
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase transition-all cursor-pointer ${
              filterType === "all"
                ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            All ({files.length})
          </button>
          <button
            onClick={() => setFilterType("images")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === "images"
                ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>Images</span>
          </button>
          <button
            onClick={() => setFilterType("docs")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === "docs"
                ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Docs</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 rounded-3xl bg-white/[0.03] border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
          <HardDrive className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-400 font-medium">No media files found matching your filter</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Upload your first file to Google Drive
          </button>
        </div>
      ) : (
        /* Media Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file) => {
            const isImage =
              file.mimeType?.startsWith("image/") ||
              /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(file.name);

            return (
              <LiquidGlassCard
                key={file.id}
                glowColor="rgba(0, 242, 254, 0.15)"
                className="rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all shadow-lg"
              >
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-[4/3] w-full bg-slate-950/80 flex items-center justify-center overflow-hidden border-b border-white/5">
                  {isImage ? (
                    <Image
                      src={file.publicUrl || file.thumbnailUrl}
                      alt={file.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="300px"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                      <FileText className="w-12 h-12 text-slate-400" />
                      <span className="text-[10px] font-mono uppercase">{file.mimeType || "File"}</span>
                    </div>
                  )}

                  {/* Top Storage Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-black/60 backdrop-blur-md border border-white/15 text-cyan-300">
                      {file.storageProvider === "local" ? "Cloud Cache" : "Google Drive"}
                    </span>
                  </div>
                </div>

                {/* File Information */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-white truncate" title={file.name}>
                      {file.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      {file.mimeType} {formatFileSize(file.size) ? `• ${formatFileSize(file.size)}` : ""}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => copyUrl(file.id, file.publicUrl)}
                      className="flex-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-cyan-300 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy public CDN URL"
                    >
                      {copiedId === file.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={file.publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
                      title="Open full size"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors border border-white/10 cursor-pointer"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </LiquidGlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
