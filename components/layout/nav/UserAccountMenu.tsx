"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  GraduationCap,
  Building2,
  Activity,
} from "lucide-react";
import { type AuthUser } from "@/lib/sso";
import { getAvatarById } from "@/lib/avatars";

interface UserAccountMenuProps {
  currentUser: AuthUser | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  onOpenOrderTracking?: () => void;
  isSchoolDomain: boolean;
  compact?: boolean;
}

export const getUserAvatar = (user: AuthUser | null) => {
  if (!user) return getAvatarById("cyber-astro").svgUrl;
  if (user.photoURL && (user.photoURL.startsWith("http") || user.photoURL.startsWith("/"))) {
    return user.photoURL;
  }
  if (user.avatar && (user.avatar.startsWith("http") || user.avatar.startsWith("/"))) {
    return user.avatar;
  }
  return getAvatarById(user.avatar).svgUrl;
};

export function UserAccountMenu({
  currentUser,
  isOpen,
  onToggle,
  onClose,
  onLogout,
  isDark,
  onToggleTheme,
  onOpenAuth,
  onOpenOrderTracking,
  isSchoolDomain,
  compact = false,
}: UserAccountMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!currentUser) {
    return (
      <button
        onClick={onOpenAuth}
        className={`${
          compact ? "px-3.5 py-1 text-xs" : "px-2.5 sm:px-3.5 py-1 text-xs"
        } font-semibold rounded-full bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20 active:from-sky-500/25 active:to-blue-500/25 text-sky-600 dark:text-sky-300 border border-sky-400/35 dark:border-sky-400/30 shadow-sm shadow-sky-500/20 transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-102`}
      >
        Sign In
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center gap-1.5 ${
          compact
            ? "bg-slate-100 dark:bg-white/10 hover:bg-slate-200/80 dark:hover:bg-white/15 pl-1 pr-2 py-0.5"
            : "sm:gap-2 bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 p-1 sm:pl-1.5 sm:pr-3 sm:py-1"
        } rounded-full text-xs text-slate-800 dark:text-white cursor-pointer transition-all border border-transparent hover:border-cyan-400/30 select-none`}
        aria-label="User account menu"
        aria-expanded={isOpen}
      >
        <div
          className={`${
            compact ? "w-5 h-5" : "w-5 h-5 sm:w-6 sm:h-6"
          } rounded-full overflow-hidden border border-cyan-400/50 bg-slate-900 shrink-0`}
        >
          <img
            src={getUserAvatar(currentUser)}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <span
          className={`font-semibold ${
            compact ? "text-[11px] max-w-[80px]" : "hidden sm:inline-block max-w-[100px]"
          } truncate`}
        >
          {compact ? currentUser.name.split(" ")[0] : currentUser.name}
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu on Tap/Click */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-60 sm:w-64 p-2.5 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_65px_rgba(0,0,0,0.7)] z-50 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Profile Info */}
            <div className="p-2.5 border-b border-slate-100 dark:border-white/10 mb-1.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/50 bg-slate-900 shrink-0">
                <img
                  src={getUserAvatar(currentUser)}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email}
                </div>
              </div>
            </div>

            {/* Ecosystem Cross-Platform Links */}
            <div className="space-y-1 mb-1">
              <Link
                href={
                  isSchoolDomain
                    ? currentUser.schoolId
                      ? "/"
                      : "/register"
                    : "https://school.modernisum.com"
                }
                prefetch={false}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
                  <span>
                    {isSchoolDomain
                      ? currentUser.schoolId
                        ? "School Management Platform"
                        : "School Registration"
                      : "School Platform"}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href={isSchoolDomain ? "https://modernisum.com" : "/"}
                prefetch={false}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Modernisum Parent Studio</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            {/* Track Project Order */}
            {onOpenOrderTracking && (
              <div className="border-t border-slate-100 dark:border-white/10 my-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenOrderTracking();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Track Project Order</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded font-bold">
                    Live
                  </span>
                </button>
              </div>
            )}

            {/* Theme Change Toggle */}
            <div className="border-t border-slate-100 dark:border-white/10 my-1 pt-1">
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {isDark ? (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  )}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5">
                  {isDark ? "Dark" : "Light"}
                </span>
              </button>
            </div>

            {/* Sign Out */}
            <div className="border-t border-slate-100 dark:border-white/10 mt-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
