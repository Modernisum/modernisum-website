"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CommandPalette } from "@/components/admin/CommandPalette";
import {
  LayoutDashboard,
  Layers,
  Inbox,
  HardDrive,
  Globe,
  LogOut,
  Sparkles,
  Command,
  Search,
  Menu,
  X,
  Building2,
  Ticket,
  ShieldCheck,
  Laptop,
  BookOpen,
  Newspaper,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Schools Fleet", href: "/admin/schools", icon: <Building2 className="w-4 h-4" /> },
    { name: "App Releases", href: "/admin/releases", icon: <Laptop className="w-4 h-4" /> },
    { name: "Docs & Tutorials", href: "/admin/docs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Blog & Comments", href: "/admin/articles", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Services", href: "/admin/services", icon: <Layers className="w-4 h-4" /> },
    { name: "Inquiries & Leads", href: "/admin/enquiries", icon: <Inbox className="w-4 h-4" /> },
    { name: "Coupons", href: "/admin/coupons", icon: <Ticket className="w-4 h-4" /> },
    { name: "5TB Drive Media", href: "/admin/media", icon: <HardDrive className="w-4 h-4" /> },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[#07090e] text-[#f8fafc]">
      {/* Command Palette */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
        />
      )}

      {/* Liquid Glass Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col justify-between p-4 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 py-3 mb-6 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                <Image
                  src="/logo.png"
                  alt="Modernisum"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-sm text-white font-display block">
                  Modernisum
                </span>
                <span className="text-[10px] font-mono text-cyan-300 block -mt-0.5">
                  Admin OS
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Spotlight Trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-400 mb-6 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search / AI (Ctrl+K)</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-slate-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 px-3 tracking-wider block mb-2">
              Core Management
            </span>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  <span className={active ? "text-cyan-400" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom User & Live Site Action */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-xs text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>View Public Site</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">↗</span>
          </Link>

          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xs font-bold">
                A
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-tight">Admin</span>
                <span className="text-[10px] text-slate-400 font-mono">Modernisum</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer p-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 glass-panel border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-300 hover:text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Admin</span>
              <span>/</span>
              <span className="text-cyan-300 capitalize">
                {pathname.replace("/admin/", "") || "dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Gemini AI Engine Ready</span>
            </button>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
