"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Laptop,
  Smartphone,
  Users2,
  Puzzle,
  Upload,
  Plus,
  Trash2,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Loader2,
  Clock,
  HardDrive,
  RefreshCw,
  FolderGit2,
  X,
  FileCode,
} from "lucide-react";
import { AppTargetType, ReleaseItem } from "@/lib/release-types";

export default function AdminReleasesPage() {
  const [releases, setReleases] = useState<ReleaseItem[]>([]);
  const [appStats, setAppStats] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AppTargetType | "all">("school-admin");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [targetApp, setTargetApp] = useState<AppTargetType>("school-admin");
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  );
  const [overview, setOverview] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileSize, setFileSize] = useState("68.4 MB");
  const [sha256, setSha256] = useState("");
  const [isLatest, setIsLatest] = useState(true);
  const [broadcastAnnouncement, setBroadcastAnnouncement] = useState(true);
  const [improvements, setImprovements] = useState<string[]>([""]);
  const [fixes, setFixes] = useState<string[]>([""]);
  const [patches, setPatches] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchReleases = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/releases");
      const data = await res.json();
      if (data.success) {
        setReleases(data.data || []);
        if (data.appStats) {
          setAppStats(data.appStats);
        }
      }
    } catch (err) {
      console.error("Failed to load releases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const openPublishModal = (appKey?: AppTargetType) => {
    const key = appKey || (activeTab === "all" ? "school-admin" : activeTab);
    setTargetApp(key);
    const stat = appStats[key];
    const nextVer = stat?.nextVersions?.patch || "1.0.1";
    setVersion(nextVer);
    setTitle("");
    setOverview("");
    setDownloadUrl("");
    setSha256("");
    setFile(null);
    setImprovements([""]);
    setFixes([""]);
    setPatches([]);
    setShowModal(true);
  };

  const applySemver = (ver: string) => {
    setVersion(ver);
  };

  const handleCreateRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("appTarget", targetApp);
      formData.append("version", version);
      formData.append("title", title);
      formData.append("releaseDate", releaseDate);
      formData.append("overview", overview);
      formData.append("downloadUrl", downloadUrl);
      formData.append("fileSize", fileSize);
      formData.append("sha256", sha256);
      formData.append("isLatest", String(isLatest));
      formData.append("broadcastAnnouncement", String(broadcastAnnouncement));
      formData.append("improvements", JSON.stringify(improvements.filter(Boolean)));
      formData.append("fixes", JSON.stringify(fixes.filter(Boolean)));
      formData.append("patches", JSON.stringify(patches.filter(Boolean)));

      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/admin/releases", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchReleases();
      } else {
        alert(data.message || "Failed to publish release");
      }
    } catch (err) {
      console.error("Error creating release:", err);
      alert("Network error publishing release");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (ver: string) => {
    if (!confirm(`Are you sure you want to delete version ${ver}?`)) return;
    try {
      const res = await fetch(`/api/admin/releases?version=${ver}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchReleases();
      } else {
        alert(data.message || "Failed to delete release");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReleases = activeTab === "all" ? releases : releases.filter((r) => r.appTarget === activeTab);

  const getTargetIcon = (target: string) => {
    switch (target) {
      case "school-admin":
        return <Laptop className="w-4 h-4 text-cyan-400" />;
      case "employee-app":
        return <Users2 className="w-4 h-4 text-purple-400" />;
      case "student-app":
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case "clerk-copilot":
      default:
        return <Puzzle className="w-4 h-4 text-amber-400" />;
    }
  };

  const currentStat = appStats[targetApp];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-cyan-400" />
            App Releases & Google Drive Mirror
          </h2>
          <p className="text-sm text-slate-400">
            Publish and distribute builds for MOD School Desktop OS, Employee App, Student App, and Clerk Co-Pilot.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={fetchReleases}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}
          >
            Refresh
          </GlassButton>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => openPublishModal()}
            icon={<Plus className="w-4 h-4" />}
          >
            Publish New Version
          </GlassButton>
        </div>
      </div>

      {/* 3 Core Apps Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("school-admin")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "school-admin"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-500/10"
              : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
          }`}
        >
          <Laptop className="w-4 h-4 text-cyan-400" />
          <span>MOD School Desktop OS</span>
          {appStats["school-admin"]?.latestVersion && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
              v{appStats["school-admin"].latestVersion}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("employee-app")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "employee-app"
              ? "bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-lg shadow-purple-500/10"
              : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
          }`}
        >
          <Users2 className="w-4 h-4 text-purple-400" />
          <span>Employee & Faculty App</span>
          {appStats["employee-app"]?.latestVersion && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-mono">
              v{appStats["employee-app"].latestVersion}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("student-app")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "student-app"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-500/10"
              : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Student & Parent App</span>
          {appStats["student-app"]?.latestVersion && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
              v{appStats["student-app"].latestVersion}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("clerk-copilot")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "clerk-copilot"
              ? "bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-lg shadow-amber-500/10"
              : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
          }`}
        >
          <Puzzle className="w-4 h-4 text-amber-400" />
          <span>Clerk MV3 Co-Pilot</span>
        </button>

        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-white/15 text-white border border-white/20"
              : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
          }`}
        >
          <span>All ({releases.length})</span>
        </button>
      </div>

      {/* Cloud Mirror Telemetry Card */}
      {activeTab !== "all" && appStats[activeTab] && (
        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Google Drive Storage Sync
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Folder: <strong className="text-slate-200">{appStats[activeTab]?.meta?.gdriveFolder}</strong>
              </span>
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              {getTargetIcon(activeTab)}
              <span>{appStats[activeTab]?.meta?.name}</span>
            </div>
            <div className="text-xs text-slate-400">
              Platform Target: <span className="text-slate-200">{appStats[activeTab]?.meta?.platform}</span> • Latest: <strong className="text-emerald-400 font-mono">v{appStats[activeTab]?.latestVersion}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openPublishModal(activeTab)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish v{appStats[activeTab]?.nextVersions?.patch}</span>
            </button>
          </div>
        </div>
      )}

      {/* Releases List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading releases catalog...</div>
        ) : filteredReleases.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No releases registered for this target application.</div>
        ) : (
          filteredReleases.map((rel) => (
            <div
              key={rel.id || rel.version}
              className={`p-6 rounded-2xl border transition-all ${
                rel.isLatest
                  ? "bg-[#0c1424] border-cyan-500/30 shadow-lg shadow-cyan-500/5"
                  : "bg-[#0c121e]/80 border-white/10"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {getTargetIcon(rel.appTarget)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-white font-display">
                        v{rel.version}
                      </span>
                      {rel.isLatest && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          LATEST PRODUCTION
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-mono">
                        {rel.appName || rel.appTarget}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200 mt-0.5">{rel.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-slate-400">{rel.releaseDate}</span>
                  <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {rel.fileSize}
                  </span>
                  <a
                    href={rel.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => handleDelete(rel.version)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete release"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">{rel.overview}</p>

              {/* Improvements & Fixes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-white/5">
                {rel.improvements && rel.improvements.length > 0 && (
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Improvements & Features
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {rel.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rel.fixes && rel.fixes.length > 0 && (
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold mb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Fixes & Security Patches
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {rel.fixes.map((fix, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-cyan-400">•</span>
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {rel.sha256 && (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span className="uppercase text-slate-400 font-semibold">SHA-256:</span>
                  <span className="truncate text-slate-300">{rel.sha256}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Publish New Version Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl glass-panel-elevated border border-white/15 rounded-2xl p-6 relative shadow-2xl my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                GOOGLE DRIVE MIRROR RELEASE
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Publish New Application Release</h3>
            <p className="text-xs text-slate-400 mb-5">
              Deploy new binary builds with automated version calculation, checksum verification, and community broadcast.
            </p>

            <form onSubmit={handleCreateRelease} className="space-y-4 text-xs">
              {/* Target Application Selection */}
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Select Application Target</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetApp("school-admin");
                      const stat = appStats["school-admin"];
                      setVersion(stat?.nextVersions?.patch || "2.8.2");
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      targetApp === "school-admin"
                        ? "bg-cyan-500/20 border-cyan-400 text-white"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    <Laptop className="w-4 h-4 mb-1 text-cyan-400" />
                    <div className="font-semibold text-[11px]">School Desktop OS</div>
                    <div className="text-[10px] text-slate-500">Admin & Server</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetApp("employee-app");
                      const stat = appStats["employee-app"];
                      setVersion(stat?.nextVersions?.patch || "1.4.3");
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      targetApp === "employee-app"
                        ? "bg-purple-500/20 border-purple-400 text-white"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    <Users2 className="w-4 h-4 mb-1 text-purple-400" />
                    <div className="font-semibold text-[11px]">Employee App</div>
                    <div className="text-[10px] text-slate-500">Android APK</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetApp("student-app");
                      const stat = appStats["student-app"];
                      setVersion(stat?.nextVersions?.patch || "1.6.1");
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      targetApp === "student-app"
                        ? "bg-emerald-500/20 border-emerald-400 text-white"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mb-1 text-emerald-400" />
                    <div className="font-semibold text-[11px]">Student & Parent</div>
                    <div className="text-[10px] text-slate-500">Android APK</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetApp("clerk-copilot");
                      const stat = appStats["clerk-copilot"];
                      setVersion(stat?.nextVersions?.patch || "1.2.1");
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      targetApp === "clerk-copilot"
                        ? "bg-amber-500/20 border-amber-400 text-white"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    <Puzzle className="w-4 h-4 mb-1 text-amber-400" />
                    <div className="font-semibold text-[11px]">Clerk Co-Pilot</div>
                    <div className="text-[10px] text-slate-500">Browser MV3</div>
                  </button>
                </div>
              </div>

              {/* Next Version Auto-Calculator */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">
                    Next Version Auto-Calculator:
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Current: <strong className="text-cyan-400">v{currentStat?.latestVersion || "1.0.0"}</strong>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applySemver(currentStat?.nextVersions?.patch || "1.0.1")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Patch:</span>
                    <strong className="text-white">v{currentStat?.nextVersions?.patch || "1.0.1"}</strong>
                    <span className="text-[10px] text-emerald-400/80">(Bug Fixes)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applySemver(currentStat?.nextVersions?.minor || "1.1.0")}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Minor:</span>
                    <strong className="text-white">v{currentStat?.nextVersions?.minor || "1.1.0"}</strong>
                    <span className="text-[10px] text-cyan-400/80">(New Modules)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applySemver(currentStat?.nextVersions?.major || "2.0.0")}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Major:</span>
                    <strong className="text-white">v{currentStat?.nextVersions?.major || "2.0.0"}</strong>
                    <span className="text-[10px] text-purple-400/80">(Milestone)</span>
                  </button>
                </div>
              </div>

              {/* Version & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Target Version Tag</label>
                  <GlassInput
                    required
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. 2.8.2"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Release Title / Focus</label>
                  <GlassInput
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Turnstile Biometric Stream Optimization"
                  />
                </div>
              </div>

              {/* Overview */}
              <div>
                <label className="text-slate-300 block mb-1">Release Overview & Executive Summary</label>
                <textarea
                  required
                  rows={2}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Summary of architectural enhancements, security upgrades, and operational performance..."
                  className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Binary / File Upload / Drive Link */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="text-slate-300 font-medium">Binary Storage & Cloud Mirror</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 text-[11px] block mb-1">Upload File (Auto SHA256 & Drive Upload)</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const f = e.target.files[0];
                          setFile(f);
                          setFileSize(`${(f.size / (1024 * 1024)).toFixed(1)} MB`);
                        }
                      }}
                      className="w-full text-[11px] text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300 file:cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[11px] block mb-1">Google Drive Direct Link (Optional override)</label>
                    <GlassInput
                      value={downloadUrl}
                      onChange={(e) => setDownloadUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Broadcast and Latest Checkboxes */}
              <div className="flex flex-col sm:flex-row gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={broadcastAnnouncement}
                    onChange={(e) => setBroadcastAnnouncement(e.target.checked)}
                    className="rounded border-white/20 bg-black text-cyan-400 focus:ring-0"
                  />
                  <span>Broadcast release announcement to Community Feed & School Dashboards</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={isLatest}
                    onChange={(e) => setIsLatest(e.target.checked)}
                    className="rounded border-white/20 bg-black text-cyan-400 focus:ring-0"
                  />
                  <span>Mark as Latest Production Build</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <GlassButton variant="ghost" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </GlassButton>
                <GlassButton variant="primary" type="submit" loading={submitting}>
                  Publish & Synchronize
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
