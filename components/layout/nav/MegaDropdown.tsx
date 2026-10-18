"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import { DropdownGroup, DropdownItem } from "./types";

interface MegaDropdownProps {
  dropdown: DropdownGroup;
  themeSpotlightGlow: string;
  activeVariant: string;
  onClose: () => void;
  onOpen: (id: string) => void;
}

export const getItemCardStyles = (color?: string, activeVariant: string = "modernisum") => {
  const c =
    color?.toLowerCase() ||
    (activeVariant === "school" ? "sky" : activeVariant === "agromi" || activeVariant === "farmer" ? "emerald" : "cyan");

  if (c.includes("emerald") || c.includes("green")) {
    return {
      iconBox:
        "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-400/25 text-emerald-600 dark:text-emerald-400 group-hover/item:border-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white group-hover/item:scale-105",
      titleHover: "group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400",
      badge: "bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-300 border-emerald-400/35",
    };
  }
  if (c.includes("indigo") || c.includes("blue")) {
    return {
      iconBox:
        "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-400/25 text-indigo-600 dark:text-indigo-400 group-hover/item:border-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white group-hover/item:scale-105",
      titleHover: "group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400",
      badge: "bg-indigo-500/15 dark:bg-indigo-500/25 text-indigo-600 dark:text-indigo-300 border-indigo-400/35",
    };
  }
  if (c.includes("amber") || c.includes("orange") || c.includes("yellow")) {
    return {
      iconBox:
        "bg-amber-500/10 dark:bg-amber-500/20 border-amber-400/25 text-amber-600 dark:text-amber-400 group-hover/item:border-amber-500 group-hover/item:bg-amber-500 group-hover/item:text-white group-hover/item:scale-105",
      titleHover: "group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400",
      badge: "bg-amber-500/15 dark:bg-amber-500/25 text-amber-600 dark:text-amber-300 border-amber-400/35",
    };
  }
  if (c.includes("purple") || c.includes("violet") || c.includes("fuchsia")) {
    return {
      iconBox:
        "bg-purple-500/10 dark:bg-purple-500/20 border-purple-400/25 text-purple-600 dark:text-purple-400 group-hover/item:border-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white group-hover/item:scale-105",
      titleHover: "group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400",
      badge: "bg-purple-500/15 dark:bg-purple-500/25 text-purple-600 dark:text-purple-300 border-purple-400/35",
    };
  }
  if (c.includes("rose") || c.includes("red") || c.includes("pink")) {
    return {
      iconBox:
        "bg-rose-500/10 dark:bg-rose-500/20 border-rose-400/25 text-rose-600 dark:text-rose-400 group-hover/item:border-rose-500 group-hover/item:bg-rose-500 group-hover/item:text-white group-hover/item:scale-105",
      titleHover: "group-hover/item:text-rose-600 dark:group-hover/item:text-rose-400",
      badge: "bg-rose-500/15 dark:bg-rose-500/25 text-rose-600 dark:text-rose-300 border-rose-400/35",
    };
  }
  if (c.includes("cyan") || c.includes("teal")) {
    return {
      iconBox:
        "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-400/25 text-cyan-600 dark:text-cyan-400 group-hover/item:border-cyan-500 group-hover/item:bg-cyan-500 group-hover/item:text-white group-hover/item:scale-105",
      titleHover: "group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400",
      badge: "bg-cyan-500/15 dark:bg-cyan-500/25 text-cyan-600 dark:text-cyan-300 border-cyan-400/35",
    };
  }
  return {
    iconBox:
      "bg-sky-500/10 dark:bg-sky-500/20 border-sky-400/25 text-sky-600 dark:text-sky-400 group-hover/item:border-sky-500 group-hover/item:bg-sky-500 group-hover/item:text-white group-hover/item:scale-105",
    titleHover: "group-hover/item:text-sky-600 dark:group-hover/item:text-sky-400",
    badge: "bg-sky-500/15 dark:bg-sky-500/25 text-sky-600 dark:text-sky-300 border-sky-400/35",
  };
};

export function MegaDropdown({
  dropdown,
  themeSpotlightGlow,
  activeVariant,
  onClose,
  onOpen,
}: MegaDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownMousePos, setDropdownMousePos] = useState({ x: 0, y: 0 });
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  // Cascading 3-pane states
  const [hoveredEcosystemCategory, setHoveredEcosystemCategory] = useState<string>("applications");
  const [hoveredEcosystemItem, setHoveredEcosystemItem] = useState<string>("school os");

  // Split preview state
  const [hoveredResourceKey, setHoveredResourceKey] = useState<string>("about");

  const handleDropdownMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dropdownRef.current) return;
    const rect = dropdownRef.current.getBoundingClientRect();
    setDropdownMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      key="static-centered-dropdown"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3.5 ${
        dropdown.hasCascadingEcosystem
          ? "w-[980px] lg:w-[1060px] max-w-[calc(100vw-24px)]"
          : dropdown.hasPreview
          ? "w-[760px] sm:w-[820px] max-w-[calc(100vw-24px)]"
          : dropdown.columns.length === 3
          ? "w-[940px] lg:w-[1020px] max-w-[calc(100vw-24px)]"
          : "w-[660px] sm:w-[700px] max-w-[calc(100vw-32px)]"
      } z-50 pointer-events-auto`}
      onMouseEnter={() => onOpen(dropdown.id)}
      onMouseLeave={onClose}
    >
      {/* Safe hover bridge */}
      <div className="absolute -top-3.5 left-0 right-0 h-7 bg-transparent pointer-events-auto" />

      {/* Luxury Frosted Card */}
      <div
        ref={dropdownRef}
        onMouseMove={handleDropdownMouseMove}
        onMouseEnter={() => setIsDropdownHovered(true)}
        onMouseLeave={() => setIsDropdownHovered(false)}
        className="overflow-hidden rounded-[28px] bg-white/98 dark:bg-[#121824]/98 backdrop-blur-3xl border border-slate-200/90 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.65)] relative p-6 sm:p-7"
      >
        {/* Specular Spotlight tracking cursor inside Dropdown */}
        {isDropdownHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-[28px] transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${dropdownMousePos.x}px ${dropdownMousePos.y}px, ${themeSpotlightGlow}, transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* 1. Cascading 3-Pane Ecosystem Layout */}
        {dropdown.hasCascadingEcosystem ? (
          (() => {
            const columns = dropdown.columns;
            const activeCol =
              columns.find(
                (col) =>
                  col.category.toLowerCase().includes(hoveredEcosystemCategory.toLowerCase()) ||
                  (hoveredEcosystemCategory === "applications" && col.category === "Applications") ||
                  (hoveredEcosystemCategory === "extensions" && col.category.includes("Extension")) ||
                  (hoveredEcosystemCategory === "devices" && col.category.includes("Device"))
              ) || columns[0];

            const activeItem =
              activeCol.items.find(
                (item) => item.name.toLowerCase() === hoveredEcosystemItem.toLowerCase()
              ) ||
              columns.flatMap((c) => c.items).find(
                (item) => item.name.toLowerCase() === hoveredEcosystemItem.toLowerCase()
              ) ||
              activeCol.items[0];

            return (
              <div className="grid grid-cols-1 md:grid-cols-[220px_310px_1fr] gap-5 relative z-10">
                {/* 1. Leftmost Column: Categories */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold font-tech uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-2 px-3 flex items-center justify-between">
                    <span>Campus Pillars</span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 font-normal">
                      3 Pillars
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {columns.map((col) => {
                      const isColActive = col.category === activeCol.category;
                      const ColIcon = col.icon || LayoutGrid;

                      return (
                        <button
                          key={col.category}
                          type="button"
                          onMouseEnter={() => {
                            setHoveredEcosystemCategory(col.category.toLowerCase());
                            if (col.items.length > 0) {
                              setHoveredEcosystemItem(col.items[0].name.toLowerCase());
                            }
                          }}
                          className={`w-full text-left group/col flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all duration-150 cursor-pointer border ${
                            isColActive
                              ? "bg-slate-100/90 dark:bg-white/[0.08] border-slate-200/80 dark:border-sky-400/40 shadow-xs"
                              : "border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                                isColActive
                                  ? "bg-sky-500/15 border-sky-400/35 text-sky-600 dark:text-sky-300 scale-105"
                                  : "bg-slate-100/80 dark:bg-white/[0.05] border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-neutral-400"
                              }`}
                            >
                              <ColIcon className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="min-w-0">
                              <div
                                className={`text-[13px] font-semibold truncate transition-colors ${
                                  isColActive
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-700 dark:text-neutral-300"
                                }`}
                              >
                                {col.category}
                              </div>
                              {col.subtitle && (
                                <div className="text-[10.5px] text-slate-400 dark:text-neutral-500 truncate">
                                  {col.subtitle}
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 transition-all ${
                              isColActive
                                ? "opacity-100 translate-x-0 text-sky-500 dark:text-sky-400"
                                : "opacity-0 -translate-x-1 group-hover/col:opacity-50 text-slate-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Middle Column: Items for Active Category */}
                <div className="border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/[0.08] pt-3 md:pt-0 md:pl-5 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold font-tech uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-2 px-3 flex items-center justify-between">
                      <span>{activeCol.category}</span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 font-normal">
                        {activeCol.items.length} Modules
                      </span>
                    </div>

                    <div className="space-y-1">
                      {activeCol.items.map((sub) => {
                        const SubIcon = sub.icon;
                        const isItemActive = sub.name.toLowerCase() === activeItem.name.toLowerCase();
                        const itemCardStyles = getItemCardStyles(sub.color, activeVariant);

                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            prefetch={false}
                            onClick={onClose}
                            onMouseEnter={() => setHoveredEcosystemItem(sub.name.toLowerCase())}
                            className={`group/item block p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                              isItemActive
                                ? "bg-slate-100/90 dark:bg-white/[0.08] border-slate-200/90 dark:border-sky-400/40 shadow-xs"
                                : "border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 mt-0.5 ${
                                    isItemActive
                                      ? itemCardStyles.iconBox
                                      : "bg-slate-100/80 dark:bg-white/[0.05] border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-neutral-400"
                                  }`}
                                >
                                  {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`text-[13px] font-semibold transition-colors ${
                                        isItemActive
                                          ? "text-slate-900 dark:text-white"
                                          : "text-slate-700 dark:text-neutral-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white"
                                      }`}
                                    >
                                      {sub.name}
                                    </span>
                                    {sub.badge && (
                                      <span
                                        className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full border ${
                                          sub.badgeColor || itemCardStyles.badge
                                        }`}
                                      >
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                                      {sub.desc}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <ChevronRight
                                className={`w-3.5 h-3.5 shrink-0 transition-all mt-1 ${
                                  isItemActive
                                    ? "opacity-100 translate-x-0 text-sky-500 dark:text-sky-400"
                                    : "opacity-0 -translate-x-1 group-hover/item:opacity-50 text-slate-400"
                                }`}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {activeCol.moreLink && (
                    <Link
                      href={activeCol.moreLink.href}
                      prefetch={false}
                      onClick={onClose}
                      className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors group/more px-2"
                    >
                      <span>{activeCol.moreLink.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/more:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                {/* 3. Rightmost Column: Live Visual Architecture & Preview */}
                <div className="border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/[0.08] pt-3 md:pt-0 md:pl-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5 px-1">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                        <span className="text-[11px] font-bold font-tech uppercase tracking-wider text-slate-400 dark:text-neutral-400">
                          Architecture Preview
                        </span>
                      </div>
                      {activeItem.preview?.tag && (
                        <span
                          className={`text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                            activeItem.preview.tagColor ||
                            "bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30"
                          }`}
                        >
                          {activeItem.preview.tag}
                        </span>
                      )}
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] p-3.5 space-y-3 shadow-xs">
                      <div>
                        <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{activeItem.preview?.title || activeItem.name}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-snug mt-0.5">
                          {activeItem.preview?.subtitle || activeItem.desc}
                        </p>
                      </div>

                      {activeItem.preview?.highlights && (
                        <div className="grid grid-cols-3 gap-1.5">
                          {activeItem.preview.highlights.map((h, hIdx) => (
                            <div
                              key={hIdx}
                              className="p-1.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/[0.06] text-center"
                            >
                              <div className="text-[9px] font-mono uppercase text-slate-400 dark:text-neutral-500 truncate">
                                {h.label}
                              </div>
                              <div className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                                {h.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeItem.preview?.features && (
                        <div className="space-y-1.5 pt-0.5">
                          {activeItem.preview.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-neutral-300 leading-tight"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 dark:text-neutral-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Local-First Sovereign</span>
                    </div>
                    <Link
                      href={activeItem.preview?.ctaHref || activeItem.href}
                      prefetch={false}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-xs transition-colors group/cta cursor-pointer"
                    >
                      <span>{activeItem.preview?.ctaText || `Open ${activeItem.name}`}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()
        ) : dropdown.hasPreview ? (
          /* 2. Split Preview Layout */
          (() => {
            const previewItems = dropdown.columns.flatMap((col) => col.items);
            const activePreviewItem =
              previewItems.find(
                (item) => item.name.toLowerCase() === hoveredResourceKey.toLowerCase()
              ) || previewItems[0];

            return (
              <div className="grid grid-cols-1 md:grid-cols-[290px_1fr] gap-6 relative z-10">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold font-tech uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-2.5 px-3 flex items-center justify-between">
                    <span>{dropdown.label || "Resources"}</span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 font-normal">
                      {previewItems.length} Sections
                    </span>
                  </div>

                  <div className="space-y-1">
                    {previewItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSelected = sub.name.toLowerCase() === activePreviewItem.name.toLowerCase();
                      const itemCardStyles = getItemCardStyles(sub.color, activeVariant);

                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          prefetch={false}
                          onClick={onClose}
                          onMouseEnter={() => setHoveredResourceKey(sub.name.toLowerCase())}
                          className={`group/item flex items-center justify-between px-3 py-2.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-slate-100/90 dark:bg-white/[0.08] border-slate-200/90 dark:border-white/15 shadow-xs"
                              : "border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                                isSelected
                                  ? itemCardStyles.iconBox
                                  : "bg-slate-100/80 dark:bg-white/[0.05] border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-neutral-400"
                              }`}
                            >
                              {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[13px] font-semibold transition-colors ${
                                    isSelected
                                      ? "text-slate-900 dark:text-white"
                                      : "text-slate-700 dark:text-neutral-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white"
                                  }`}
                                >
                                  {sub.name}
                                </span>
                                {sub.badge && (
                                  <span
                                    className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full border ${
                                      sub.badgeColor || itemCardStyles.badge
                                    }`}
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.desc && (
                                <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                                  {sub.desc}
                                </p>
                              )}
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-3.5 h-3.5 shrink-0 transition-all ${
                              isSelected
                                ? "opacity-100 translate-x-0 text-slate-900 dark:text-white"
                                : "opacity-0 -translate-x-1 group-hover/item:opacity-50 text-slate-400"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Preview of Active Resource */}
                <div className="border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/[0.08] pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold font-tech uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Highlights: {activePreviewItem.name}</span>
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activePreviewItem.activities && activePreviewItem.activities.length > 0 ? (
                        activePreviewItem.activities.map((act, idx) => (
                          <Link
                            key={idx}
                            href={act.href}
                            prefetch={false}
                            onClick={onClose}
                            className="group/act block p-3.5 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] hover:bg-slate-100/80 dark:hover:bg-white/[0.05] hover:border-slate-300 dark:hover:border-white/15 transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white group-hover/act:text-cyan-500 transition-colors">
                                {act.title}
                              </h4>
                              {act.tag && (
                                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-neutral-300 shrink-0">
                                  {act.tag}
                                </span>
                              )}
                            </div>
                            {act.desc && (
                              <p className="text-[11.5px] text-slate-500 dark:text-neutral-400 mt-1 leading-snug">
                                {act.desc}
                              </p>
                            )}
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02]">
                          <p className="text-xs text-slate-600 dark:text-neutral-300">
                            {activePreviewItem.desc || "Explore more in this section."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Continuous Sync Engine</span>
                    <Link
                      href={activePreviewItem.href}
                      prefetch={false}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Explore {activePreviewItem.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          /* 3. Multi-Column Grid Layout */
          <div
            className={`grid grid-cols-1 ${
              dropdown.columns.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            } gap-6 relative z-10`}
          >
            {dropdown.columns.map((col) => (
              <div key={col.category} className="space-y-2">
                <div className="text-[11px] font-bold font-tech uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-2 px-2 flex items-center justify-between">
                  <span>{col.category}</span>
                </div>

                <div className="space-y-1">
                  {col.items.map((sub) => {
                    const SubIcon = sub.icon;
                    const itemCardStyles = getItemCardStyles(sub.color, activeVariant);

                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        prefetch={false}
                        onClick={onClose}
                        className="group/item flex items-start gap-3 p-2.5 rounded-2xl border border-transparent hover:border-slate-200/90 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all duration-150 cursor-pointer"
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 mt-0.5 ${itemCardStyles.iconBox}`}
                        >
                          {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                              {sub.name}
                            </span>
                            {sub.badge && (
                              <span
                                className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full border ${
                                  sub.badgeColor || itemCardStyles.badge
                                }`}
                              >
                                {sub.badge}
                              </span>
                            )}
                          </div>
                          {sub.desc && (
                            <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                              {sub.desc}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
