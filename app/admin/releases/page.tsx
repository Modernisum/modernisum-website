"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Laptop,
  Upload,
  Plus,
  Trash2,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Loader2,
  Clock
} from "lucide-react";

interface ReleaseData {
  id: string;
  version: string;
  title: string;
  releaseDate: string;
  overview: string;
  improvements: string[];
  fixes: string[];
  patches: string[];
  downloadUrl: string;
  fileSize: string;
  sha256?: string;
  isLatest: boolean;
}

export default function AdminReleasesPage() {
  const [releases, setReleases] = useState<ReleaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  );
  const [overview, setOverview] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);
  const [fixes, setFixes] = useState<string[]>([""]);
  const [patches, setPatches] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchReleases = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/releases");
      const data = await res.json();
      if (data.success) {
        setReleases(data.data);
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

  const handleCreateRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("version", version);
      formData.append("title", title);
      formData.append("releaseDate", releaseDate);
      formData.append("overview", overview);
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
        alert(data.message);
        setShowForm(false);
        setVersion("");
        setTitle("");
        setOverview("");
        setFile(null);
        fetchReleases();
      } else {
        alert(data.message || "Failed to publish release");
      }
    } catch (err) {
      console.error("Error creating release:", err);
      alert("Error publishing release");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRelease = async (ver: string) => {
    if (!confirm(`Are you sure you want to delete version ${ver}?`)) return;
    try {
      const res = await fetch(`/api/admin/releases?version=${ver}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchReleases();
      }
    } catch (err) {
      console.error("Error deleting release:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2.5">
            <Laptop className="w-7 h-7 text-cyan-400" />
            <span>Vidhyam Desktop App Releases</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish desktop installers to Google Drive storage, track changelogs, bug fixes, and verified SHA-256 hashes.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          icon={<Plus className="w-4 h-4" />}
        >
          {showForm ? "Cancel" : "Publish New Release"}
        </GlassButton>
      </div>

      {/* Publish Form */}
      {showForm && (
        <LiquidGlassCard className="p-6 sm:p-8 space-y-6 border-cyan-500/30">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold text-white font-display">
              Release Specification & Google Drive Upload
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Files uploaded are streamed directly to Modernisum's Google Drive institutional repository.
            </p>
          </div>

          <form onSubmit={handleCreateRelease} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Version Tag *</label>
                <GlassInput
                  required
                  placeholder="e.g. 2.8.1"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-medium mb-1">Release Title *</label>
                <GlassInput
                  required
                  placeholder="e.g. Chat Responsiveness Improvements"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Release Date</label>
                <GlassInput
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Windows Installer (.exe)</label>
                <input
                  type="file"
                  accept=".exe,.zip,.msi"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Overview Summary *</label>
              <textarea
                required
                rows={2}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Brief description of what this release brings..."
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Structured Changes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
              {/* Fixes */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-medium font-mono text-[11px] text-amber-300">
                  Bug Fixes (One per line)
                </label>
                <textarea
                  rows={4}
                  value={fixes.join("\n")}
                  onChange={(e) => setFixes(e.target.value.split("\n"))}
                  placeholder="Improved message responsiveness&#10;Fixed print clipping"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none font-mono"
                />
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-medium font-mono text-[11px] text-cyan-300">
                  Improvements (One per line)
                </label>
                <textarea
                  rows={4}
                  value={improvements.join("\n")}
                  onChange={(e) => setImprovements(e.target.value.split("\n"))}
                  placeholder="Sub-10ms LAN query execution&#10;Persistent folders"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none font-mono"
                />
              </div>

              {/* Patches */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-medium font-mono text-[11px] text-purple-300">
                  Security Patches (One per line)
                </label>
                <textarea
                  rows={4}
                  value={patches.join("\n")}
                  onChange={(e) => setPatches(e.target.value.split("\n"))}
                  placeholder="Updated TLS cipher suite"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none font-mono"
                />
              </div>
            </div>

            <div className="pt-3">
              <GlassButton
                type="submit"
                variant="primary"
                size="md"
                loading={submitting}
                icon={<Upload className="w-4 h-4" />}
              >
                Upload to Google Drive & Publish Version
              </GlassButton>
            </div>
          </form>
        </LiquidGlassCard>
      )}

      {/* Historical Releases Table */}
      <LiquidGlassCard className="p-0 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Published App Versions ({releases.length})
          </span>
          <Link href="/vidhyam/releases" target="_blank" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            <span>View Public Changelog</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Loading releases from Google Drive & MongoDB...</span>
          </div>
        ) : releases.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No versions published yet. Click "Publish New Release" above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Version</th>
                  <th className="py-3 px-4 sm:px-6">Title & Overview</th>
                  <th className="py-3 px-4 sm:px-6">Release Date</th>
                  <th className="py-3 px-4 sm:px-6">Changes Count</th>
                  <th className="py-3 px-4 sm:px-6">File Size</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                {releases.map((rel) => (
                  <tr key={rel.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold text-cyan-400">
                      v{rel.version}
                      {rel.isLatest && (
                        <span className="ml-2 px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-400">
                          LATEST
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 sm:px-6 max-w-xs">
                      <div className="font-semibold text-white truncate">{rel.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{rel.overview}</div>
                    </td>
                    <td className="py-3 px-4 sm:px-6 font-mono text-[11px] text-slate-400">
                      {rel.releaseDate}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-[11px] font-mono">
                      <span className="text-cyan-400">{rel.improvements?.length || 0} Imp</span> •{" "}
                      <span className="text-amber-400">{rel.fixes?.length || 0} Fix</span> •{" "}
                      <span className="text-purple-400">{rel.patches?.length || 0} Patch</span>
                    </td>
                    <td className="py-3 px-4 sm:px-6 font-mono text-[11px] text-slate-400">
                      {rel.fileSize}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a href={rel.downloadUrl} target="_blank" rel="noreferrer">
                          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </a>
                        <button
                          onClick={() => handleDeleteRelease(rel.version)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </LiquidGlassCard>
    </div>
  );
}
