"use client";

import React, { useState } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  Layers,
  Sparkles,
  Edit2,
  Check,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { SEED_SERVICES, SeedService } from "@/lib/seed-data";

export default function AdminServicesPage() {
  const [services, setServices] = useState<SeedService[]>(SEED_SERVICES);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleInlineChange = (slug: string, field: keyof SeedService, value: any) => {
    setServices((prev) =>
      prev.map((s) => (s.slug === slug ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = (slug: string) => {
    setEditingSlug(null);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">
            Services & Architectural Solutions
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Spreadsheet-style inline management for core software offerings.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            const newSlug = `custom-service-${Date.now()}`;
            setServices([
              {
                title: "New AI Architecture Solution",
                slug: newSlug,
                category: "AI SaaS",
                shortDescription: "Custom AI pipeline engineered for high-concurrency scaling.",
                description: "Deep technical specifications and cloud orchestration architecture.",
                iconName: "Sparkles",
                features: ["Microservices Architecture", "Automated Data Ingestion"],
                faqs: [],
                order: services.length + 1,
              },
              ...services,
            ]);
            setEditingSlug(newSlug);
          }}
        >
          Add New Solution
        </GlassButton>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Service changes saved successfully!</span>
        </div>
      )}

      {/* Spreadsheet Table */}
      <LiquidGlassCard
        glowColor="rgba(0, 242, 254, 0.1)"
        className="rounded-3xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3.5 px-4">Title & Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Short Description</th>
                <th className="py-3.5 px-4">Badge</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((service) => {
                const isEditing = editingSlug === service.slug;
                return (
                  <tr
                    key={service.slug}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Title */}
                    <td className="py-3 px-4 max-w-[200px]">
                      {isEditing ? (
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) =>
                            handleInlineChange(service.slug, "title", e.target.value)
                          }
                          className="w-full bg-white/5 border border-cyan-400/50 rounded-lg px-2 py-1 text-white font-medium focus:outline-none"
                        />
                      ) : (
                        <div>
                          <span className="font-semibold text-white block">
                            {service.title}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400">
                            /{service.slug}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <select
                          value={service.category}
                          onChange={(e) =>
                            handleInlineChange(service.slug, "category", e.target.value)
                          }
                          className="bg-black border border-white/20 rounded-lg px-2 py-1 text-white text-xs"
                        >
                          <option value="Modern School ERP">Modern School ERP</option>
                          <option value="AI SaaS">AI SaaS</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile Development">Mobile Development</option>
                          <option value="Custom Software">Custom Software</option>
                          <option value="IoT & Automation">IoT & Automation</option>
                          <option value="Cloud & APIs">Cloud & APIs</option>
                        </select>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                          {service.category}
                        </span>
                      )}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-4 max-w-[320px]">
                      {isEditing ? (
                        <textarea
                          rows={2}
                          value={service.shortDescription}
                          onChange={(e) =>
                            handleInlineChange(service.slug, "shortDescription", e.target.value)
                          }
                          className="w-full bg-white/5 border border-cyan-400/50 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none"
                        />
                      ) : (
                        <p className="text-slate-300 font-light truncate max-w-[300px]">
                          {service.shortDescription}
                        </p>
                      )}
                    </td>

                    {/* Badge */}
                    <td className="py-3 px-4">
                      {service.highlightBadge ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {service.highlightBadge}
                        </span>
                      ) : (
                        <span className="text-slate-600 font-mono text-[10px]">None</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => handleSave(service.slug)}
                          className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-medium text-xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingSlug(service.slug)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`/services/${service.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            title="Preview Public Page"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
