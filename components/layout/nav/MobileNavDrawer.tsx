"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sun,
  Moon,
  ChevronRight,
  GraduationCap,
  Building2,
  Activity,
} from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { NavDomainConfig, NavItem } from "./types";
import { type AuthUser } from "@/lib/sso";
import { getUserAvatar } from "./UserAccountMenu";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: NavDomainConfig;
  isSchoolDomain: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenOrderTracking?: () => void;
  isLinkActive: (item: NavItem) => boolean;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  config,
  isSchoolDomain,
  isDark,
  onToggleTheme,
  currentUser,
  onLogout,
  onOpenAuth,
  onOpenOrderTracking,
  isLinkActive,
}: MobileNavDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-auto lg:hidden">
          {/* Semi-transparent dark blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md"
          />

          {/* Slide-in floating modal sheet */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-3 bottom-3 sm:inset-x-auto sm:right-4 sm:w-96 rounded-3xl bg-white/98 dark:bg-[#090e1a]/98 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
          >
            {/* Top accent gradient line */}
            <div className={`h-[3px] w-full shrink-0 ${config.themeTopBar}`} />

            {/* Drawer Top Header with Brand Logo & Close Button */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-200/80 dark:border-white/10 shrink-0">
              <Link
                href={config.homeHref}
                prefetch={false}
                onClick={onClose}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  {config.brandPillLogoNode}
                </div>
                {config.variant === "school" ? (
                  <div className="flex flex-col justify-center select-none w-fit ml-0.5" aria-label="ModSchool Modernisum">
                    <span className="font-tech text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">
                      School
                    </span>
                    <div className="w-full flex justify-between items-center text-[7px] sm:text-[7.5px] font-bold font-tech uppercase text-amber-500 dark:text-yellow-400 leading-none mt-1 select-none" aria-hidden="true">
                      <span>M</span><span>O</span><span>D</span><span>E</span><span>R</span><span>N</span><span>I</span><span>S</span><span>U</span><span>M</span>
                    </div>
                  </div>
                ) : config.variant === "farmer" || config.variant === "agromi" ? (
                  <div className="flex flex-col justify-center select-none w-fit" aria-label="MOD Farmer Modernisum">
                    <span className="font-tech text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wider leading-none">
                      MOD FARMER
                    </span>
                    <div className="w-full flex justify-between items-center text-[7px] sm:text-[8px] font-bold font-tech uppercase text-emerald-500 dark:text-emerald-400 leading-none mt-1 select-none" aria-hidden="true">
                      <span>M</span><span>O</span><span>D</span><span>E</span><span>R</span><span>N</span><span>I</span><span>S</span><span>U</span><span>M</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center select-none">
                    <span className="font-tech text-base font-bold text-slate-900 dark:text-white tracking-wider leading-none">
                      {config.brandTitle}
                    </span>
                    {config.brandSubtitle && (
                      <span className="text-[10px] font-tech font-bold tracking-widest leading-none uppercase mt-0.5 text-slate-500 dark:text-cyan-400/90">
                        {config.brandSubtitle}
                      </span>
                    )}
                  </div>
                )}
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-2.5 overscroll-contain">
              <nav className="flex flex-col gap-2">
                {config.navItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div
                        key={item.name}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/5 space-y-3"
                      >
                        <span className="text-[11px] font-tech uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 block font-semibold">
                          {item.name}
                        </span>
                        {item.dropdown.columns.map((col) => (
                          <div key={col.category} className="space-y-1">
                            <span className="text-[10px] font-medium text-slate-400 dark:text-neutral-500 px-2 block tracking-wider uppercase">
                              {col.category}
                            </span>
                            {col.items.map((sub) => {
                              const SubIcon = sub.icon;
                              const isDownload =
                                sub.isDownload ||
                                sub.href.includes("/downloads/") ||
                                sub.href.endsWith(".exe") ||
                                sub.href.endsWith(".zip");
                              const content = (
                                <>
                                  <div className="flex items-center gap-2">
                                    {SubIcon && <SubIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                                    <span className="font-semibold">{sub.name}</span>
                                  </div>
                                  {sub.badge && (
                                    <span
                                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                                        sub.badgeColor || "bg-slate-200 dark:bg-white/10"
                                      }`}
                                    >
                                      {sub.badge}
                                    </span>
                                  )}
                                </>
                              );

                              if (isDownload) {
                                return (
                                  <a
                                    key={sub.name}
                                    href={sub.href}
                                    download
                                    onClick={onClose}
                                    className="px-3 py-2 rounded-xl text-xs flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                  >
                                    {content}
                                  </a>
                                );
                              }
                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  prefetch={false}
                                  onClick={onClose}
                                  className="px-3 py-2 rounded-xl text-xs flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                >
                                  {content}
                                </Link>
                              );
                            })}
                            {col.moreLink && (
                              <Link
                                href={col.moreLink.href}
                                prefetch={false}
                                onClick={onClose}
                                className="px-3 py-1.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400 flex items-center justify-between hover:underline"
                              >
                                <span>{col.moreLink.label}</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }

                  const MobileItemIcon = item.icon;
                  const isDownload =
                    item.isDownload || item.href.includes("/downloads/") || item.href.endsWith(".exe");

                  if (isDownload) {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        download
                        onClick={onClose}
                        className="px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      >
                        <span className="flex items-center gap-2.5">
                          {MobileItemIcon && <MobileItemIcon className="w-4 h-4 shrink-0 text-sky-500" />}
                          <span>{item.name}</span>
                        </span>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={false}
                      onClick={onClose}
                      className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                        isLinkActive(item)
                          ? config.themeActivePill
                          : "text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {MobileItemIcon && <MobileItemIcon className="w-4 h-4 shrink-0" />}
                        <span>{item.name}</span>
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Fixed Drawer Footer Actions */}
            <div className="p-3.5 sm:p-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] shrink-0 space-y-2">
              {/* Theme Toggle row for Mobile */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors cursor-pointer"
                >
                  Toggle
                </button>
              </div>

              {/* Track Project Order button */}
              {onOpenOrderTracking && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenOrderTracking();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Track Project Order</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-cyan-500/20 px-1.5 py-0.5 rounded">
                    Live
                  </span>
                </button>
              )}

              {currentUser ? (
                <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-white/5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400/50 bg-slate-900 shrink-0">
                        <img
                          src={getUserAvatar(currentUser)}
                          alt={currentUser.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="text-xs text-rose-500 hover:underline cursor-pointer shrink-0 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href={isSchoolDomain ? (currentUser.schoolId ? "/" : "/register") : "https://school.modernisum.com"}
                      prefetch={false}
                      onClick={onClose}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
                        <span>{isSchoolDomain ? (currentUser.schoolId ? "School Management Platform" : "School Registration") : "School Platform"}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>

                    <Link
                      href={isSchoolDomain ? "https://modernisum.com" : "/"}
                      prefetch={false}
                      onClick={onClose}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-purple-500" />
                        <span>Modernisum Parent Studio</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </div>
                </div>
              ) : (
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="w-full text-xs"
                >
                  Sign In
                </GlassButton>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
