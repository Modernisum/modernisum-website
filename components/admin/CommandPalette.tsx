"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  Layers,
  Inbox,
  FolderGit2,
  HardDrive,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const commands = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" /> },
    { label: "Manage Services & Subservices", href: "/admin/services", icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { label: "Client Enquiries & Leads", href: "/admin/enquiries", icon: <Inbox className="w-4 h-4 text-emerald-400" /> },
    { label: "Google Drive 5TB Media Manager", href: "/admin/media", icon: <HardDrive className="w-4 h-4 text-amber-400" /> },
    { label: "AI 1-Click Content Engine", href: "/admin/dashboard#ai-engine", icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
    { label: "Modern School ERP Showcase", href: "/modern-school", icon: <FolderGit2 className="w-4 h-4 text-cyan-300" /> },
    { label: "Public Website Home", href: "/", icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-xl rounded-3xl glass-panel-elevated border border-cyan-500/30 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search commands, navigate admin, or generate content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="mt-3 max-h-72 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No commands matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(cmd.href)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.07] text-left text-xs text-slate-200 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                        {cmd.icon}
                      </div>
                      <span className="font-medium group-hover:text-cyan-300 transition-colors">
                        {cmd.label}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))
              )}
            </div>

            {/* Footer Hint */}
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 px-2 font-mono">
              <span>Navigate with arrows or mouse</span>
              <span>ESC to dismiss</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
