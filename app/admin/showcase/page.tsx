"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Monitor,
  Sparkles,
  Save,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Check,
  Globe,
  Sliders,
  Eye,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { DesktopScreenItem, SEED_SHOWCASE_SCREENS } from "@/lib/firestore/showcase";

export default function AdminShowcasePage() {
  const [screens, setScreens] = useState<DesktopScreenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<DesktopScreenItem | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<"en" | "hi">("en");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Fetch screens from API
  const loadScreens = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/showcase?product=school");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setScreens(json.data);
        if (!selectedScreen && json.data.length > 0) {
          setSelectedScreen(json.data[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load showcase screens:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScreens();
  }, []);

  const handleSelectScreen = (screen: DesktopScreenItem) => {
    setSelectedScreen({ ...screen });
  };

  const handleUpdateField = (field: keyof DesktopScreenItem, val: any) => {
    if (!selectedScreen) return;
    setSelectedScreen((prev) => prev ? { ...prev, [field]: val } : null);
  };

  const handleSaveCurrent = async () => {
    if (!selectedScreen) return;
    setSavingId(selectedScreen.id);
    setMessage(null);

    try {
      const res = await fetch("/api/showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedScreen),
      });

      const json = await res.json();
      if (json.success) {
        setMessage({ type: "success", text: `Screen "${selectedScreen.shortTitle}" saved successfully!` });
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
        // Update local list
        setScreens((prev) => prev.map((s) => (s.id === selectedScreen.id ? selectedScreen : s)));
      } else {
        setMessage({ type: "error", text: json.error || "Save failed" });
      }
    } catch (e: any) {
      setMessage({ type: "error", text: e.message || "Failed to save" });
    } finally {
      setSavingId(null);
    }
  };

  const handleMoveScreen = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= screens.length) return;

    const newScreens = [...screens];
    const temp = newScreens[index];
    newScreens[index] = newScreens[targetIndex];
    newScreens[targetIndex] = temp;

    setScreens(newScreens);
    const orderedIds = newScreens.map((s) => s.id);

    try {
      await fetch("/api/showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", orderedIds }),
      });
    } catch (e) {
      console.error("Reorder error:", e);
    }
  };

  const handleResetToBaseline = async () => {
    if (!confirm("Reset showcase screens to official baseline seed data?")) return;
    setLoading(true);
    try {
      for (const item of SEED_SHOWCASE_SCREENS) {
        await fetch("/api/showcase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      await loadScreens();
      setMessage({ type: "success", text: "Successfully reset to baseline seed screens!" });
    } catch (e) {
      setMessage({ type: "error", text: "Reset failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero-Code-Deployment CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Software Showcase & Screenshots Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
            Update desktop software screenshots, captions, impact metrics, and bilingual Hindi/English rationales without touching code or redeploying the website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={handleResetToBaseline}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset to Seeds
          </GlassButton>
          <a href="/mod-school#live-demo" target="_blank" rel="noopener noreferrer">
            <GlassButton
              variant="primary"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              View Live on Site
            </GlassButton>
          </a>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Grid: Screen List (Left 4 cols) + Screen Editor (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Screen Selector & Reordering */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-3xl bg-[#090e24] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono font-bold text-slate-400">
              <span>Screens ({screens.length})</span>
              <span>Reorder & Select</span>
            </div>

            <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
              {screens.map((screen, idx) => {
                const isSelected = selectedScreen?.id === screen.id;
                return (
                  <div
                    key={screen.id}
                    onClick={() => handleSelectScreen(screen)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400/50 text-white shadow-lg"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold text-cyan-400">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs truncate">{screen.shortTitle}</div>
                        <div className="text-[10px] text-slate-500 truncate">{screen.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveScreen(idx, "up")}
                        className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-20"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        disabled={idx === screens.length - 1}
                        onClick={() => handleMoveScreen(idx, "down")}
                        className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-20"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Screen Editor Card */}
        <div className="lg:col-span-8">
          {selectedScreen ? (
            <div className="p-6 rounded-3xl bg-[#090e24] border border-slate-800 space-y-5">
              
              {/* Screen Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/25">
                    ID: {selectedScreen.id}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Edit Screen: {selectedScreen.shortTitle}
                  </h3>
                </div>

                {/* Bilingual Language Switcher */}
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center text-xs font-mono">
                    <button
                      onClick={() => setActiveLangTab("en")}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        activeLangTab === "en" ? "bg-cyan-500 text-black font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setActiveLangTab("hi")}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        activeLangTab === "hi" ? "bg-cyan-500 text-black font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      हिन्दी (Hindi)
                    </button>
                  </div>

                  <GlassButton
                    variant="primary"
                    size="sm"
                    loading={savingId === selectedScreen.id}
                    onClick={handleSaveCurrent}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Changes
                  </GlassButton>
                </div>
              </div>

              {/* Form Fields: English vs Hindi */}
              {activeLangTab === "en" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Full Screen Title (English)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.title || ""}
                        onChange={(e) => handleUpdateField("title", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Short Title for Tabs (English)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.shortTitle || ""}
                        onChange={(e) => handleUpdateField("shortTitle", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Category Pill (English)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.category || ""}
                        onChange={(e) => handleUpdateField("category", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Impact Metric Badge (English)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.impactMetric || ""}
                        onChange={(e) => handleUpdateField("impactMetric", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Caption Description (English)
                    </label>
                    <textarea
                      rows={2}
                      value={selectedScreen.caption || ""}
                      onChange={(e) => handleUpdateField("caption", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Why Built / Operational Problem Solved (English)
                    </label>
                    <textarea
                      rows={2}
                      value={selectedScreen.whyBuilt || ""}
                      onChange={(e) => handleUpdateField("whyBuilt", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-400 mb-1">
                        शीर्षक / Full Screen Title (Hindi)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.titleHi || ""}
                        onChange={(e) => handleUpdateField("titleHi", e.target.value)}
                        placeholder="उदा. एग्जीक्यूटिव कॉकपिट और स्कूल डैशबोर्ड"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-cyan-400 mb-1">
                        संक्षिप्त नाम / Short Tab Title (Hindi)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.shortTitleHi || ""}
                        onChange={(e) => handleUpdateField("shortTitleHi", e.target.value)}
                        placeholder="उदा. डैशबोर्ड"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-400 mb-1">
                        श्रेणी / Category Pill (Hindi)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.categoryHi || ""}
                        onChange={(e) => handleUpdateField("categoryHi", e.target.value)}
                        placeholder="उदा. प्रशासनिक अवलोकन"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-cyan-400 mb-1">
                        प्रभाव मीट्रिक / Impact Metric Badge (Hindi)
                      </label>
                      <input
                        type="text"
                        value={selectedScreen.impactMetricHi || ""}
                        onChange={(e) => handleUpdateField("impactMetricHi", e.target.value)}
                        placeholder="उदा. रियल-टाइम टेलीमेट्री"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-cyan-400 mb-1">
                      विवरण / Caption Description (Hindi)
                    </label>
                    <textarea
                      rows={2}
                      value={selectedScreen.captionHi || ""}
                      onChange={(e) => handleUpdateField("captionHi", e.target.value)}
                      placeholder="दैनिक उपस्थिति मेट्रिक्स, शुल्क संग्रह सारांश..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-cyan-400 mb-1">
                      क्यों बनाया गया / Why Built (Hindi)
                    </label>
                    <textarea
                      rows={2}
                      value={selectedScreen.whyBuiltHi || ""}
                      onChange={(e) => handleUpdateField("whyBuiltHi", e.target.value)}
                      placeholder="प्राचार्यों और निदेशकों को कैंपस के दैनिक कामकाज..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* Screenshot Media URLs */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Screenshot Image Assets (Light & Dark Mode)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Dark Mode Screenshot URL
                    </label>
                    <input
                      type="text"
                      value={selectedScreen.darkUrl || selectedScreen.url || ""}
                      onChange={(e) => {
                        handleUpdateField("darkUrl", e.target.value);
                        handleUpdateField("url", e.target.value);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Light Mode Screenshot URL
                    </label>
                    <input
                      type="text"
                      value={selectedScreen.lightUrl || ""}
                      onChange={(e) => handleUpdateField("lightUrl", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Screenshot Visual Preview Thumbnail */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                  <div className="relative w-36 h-20 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                    <img
                      src={selectedScreen.darkUrl || selectedScreen.url}
                      alt={selectedScreen.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 min-w-0">
                    <div className="font-mono text-white truncate">{selectedScreen.title}</div>
                    <div className="text-[10px] text-slate-500 truncate">Previewing active image path</div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live in Next.js Showcase
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#090e24] border border-slate-800 text-slate-400 text-xs">
              Select a screen from the left to edit its details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
