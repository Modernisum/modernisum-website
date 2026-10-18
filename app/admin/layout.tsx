"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModernisumLogo } from "@/components/ui/BrandLogos";
import { usePathname, useRouter } from "next/navigation";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { HomeShowcaseFlyout } from "@/components/admin/HomeShowcaseFlyout";
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
  Scale,
  MessageSquare,
  Users,
  Bell,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Monitor,
  Activity,
  HeartHandshake,
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
  const [activeSuite, setActiveSuite] = useState<"platform" | "school">("platform");

  // Community Alerts Notification State
  const [communityAlerts, setCommunityAlerts] = useState<any[]>([]);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [unreadAlertCount, setUnreadAlertCount] = useState(2);

  // Home Showcase Hover Flyout State
  const [homeFlyoutOpen, setHomeFlyoutOpen] = useState(false);
  const [homeFlyoutPinned, setHomeFlyoutPinned] = useState(false);
  const flyoutCloseTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterHome = () => {
    if (flyoutCloseTimer.current) {
      clearTimeout(flyoutCloseTimer.current);
      flyoutCloseTimer.current = null;
    }
    setHomeFlyoutOpen(true);
  };

  const handleMouseLeaveHome = () => {
    if (!homeFlyoutPinned) {
      flyoutCloseTimer.current = setTimeout(() => {
        setHomeFlyoutOpen(false);
      }, 350);
    }
  };

  const fetchCommunityAlerts = async () => {
    try {
      const res = await fetch("/api/community");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        // filter issues or pending review
        const alerts = data.data.slice(0, 5);
        setCommunityAlerts(alerts);
        const pendingCount = data.data.filter((d: any) => d.status === "in_review" || d.status === "open").length;
        setUnreadAlertCount(pendingCount || 2);
      }
    } catch (e) {
      console.warn("Could not load community alerts in admin layout:", e);
    }
  };

  useEffect(() => {
    fetchCommunityAlerts();
  }, [pathname]);

  const platformNavItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      name: "Empathy Radar",
      href: "/admin/empathy-radar",
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      badge: "अतिथि लाइव",
    },
    {
      name: "Showcase & Screens",
      href: "/admin/showcase",
      icon: <Monitor className="w-4 h-4 text-sky-400" />,
      badge: "Zero-Code CMS",
    },
    {
      name: "Home Showcase",
      href: "/admin/community?tab=home_curation",
      icon: <Globe className="w-4 h-4" />,
      badge: "Hover CMS",
      isHomeTrigger: true,
    },
    { name: "Users Directory", href: "/admin/users", icon: <Users className="w-4 h-4" />, badge: "All Leads & Admins" },
    { name: "Schools Fleet", href: "/admin/schools", icon: <Building2 className="w-4 h-4" />, badge: "₹20.5L Spend" },
    { name: "App Releases", href: "/admin/releases", icon: <Laptop className="w-4 h-4" />, badge: "3 Core Apps" },
    {
      name: "Family Care Desk",
      href: "/admin/family-desk",
      icon: <HeartHandshake className="w-4 h-4 text-emerald-400" />,
      badge: "अतिथि सेवा",
    },
    {
      name: "Community Desk",
      href: "/admin/community",
      icon: <MessageSquare className="w-4 h-4" />,
      alertCount: unreadAlertCount,
    },
    { name: "Blog & Articles", href: "/admin/articles", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Policies & Legal", href: "/admin/policies", icon: <Scale className="w-4 h-4" /> },
    { name: "5TB Drive Media", href: "/admin/media", icon: <HardDrive className="w-4 h-4" /> },
    { name: "Inquiries & Leads", href: "/admin/enquiries", icon: <Inbox className="w-4 h-4" /> },
    { name: "Docs & Tutorials", href: "/admin/docs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Services", href: "/admin/services", icon: <Layers className="w-4 h-4" /> },
    { name: "Coupons", href: "/admin/coupons", icon: <Ticket className="w-4 h-4" /> },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const schoolSuiteNavItems = [
    { name: "Schools Fleet & Spend", href: "/admin/schools", icon: <Building2 className="w-4 h-4" />, badge: "5 Tenants" },
    { name: "App Releases (Mirror)", href: "/admin/releases", icon: <Laptop className="w-4 h-4" />, badge: "v2.8.1" },
    { name: "Showcase & Screens", href: "/admin/showcase", icon: <Monitor className="w-4 h-4 text-sky-400" /> },
    { name: "Community Tickets", href: "/admin/community", icon: <MessageSquare className="w-4 h-4" />, alertCount: unreadAlertCount },
    { name: "Knowledge & Manuals", href: "/admin/docs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Compliance & Policies", href: "/admin/policies", icon: <Scale className="w-4 h-4" /> },
    { name: "5TB Google Drive Pool", href: "/admin/media", icon: <HardDrive className="w-4 h-4" /> },
    { name: "Return to Central Suite", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  const activeNavItems = activeSuite === "school" ? schoolSuiteNavItems : platformNavItems;

  React.useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light");
    html.classList.add("dark");
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div
      className="dark min-h-screen flex bg-[#07090e] text-[#f8fafc]"
      style={{
        ["--glass-bg" as string]: "rgba(255, 255, 255, 0.035)",
        ["--glass-bg-hover" as string]: "rgba(255, 255, 255, 0.065)",
        ["--glass-border" as string]: "rgba(255, 255, 255, 0.12)",
        ["--glass-border-highlight" as string]: "rgba(255, 255, 255, 0.35)",
        ["--text-primary" as string]: "#f8fafc",
        ["--text-secondary" as string]: "#94a3b8",
        ["--text-muted" as string]: "#64748b",
        ["--bg-abyss" as string]: "#07090e",
      }}
    >
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
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0c121e]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-4 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 py-3 mb-4 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <ModernisumLogo className="w-full h-full drop-shadow-[0_0_12px_rgba(241,176,27,0.5)]" />
              </div>
              <div>
                <span className="font-bold text-sm text-white font-tech tracking-wider block leading-tight">
                  MODERNISUM
                </span>
                <span className="text-[10px] font-mono text-cyan-300 block -mt-0.5">
                  Platform Admin
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

          {/* Dual-Tier Suite Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/10 mb-4 text-xs font-mono">
            <button
              onClick={() => setActiveSuite("platform")}
              className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                activeSuite === "platform"
                  ? "bg-cyan-500/20 text-cyan-300 font-bold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Platform Core
            </button>
            <button
              onClick={() => setActiveSuite("school")}
              className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                activeSuite === "school"
                  ? "bg-purple-500/20 text-purple-300 font-bold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              MOD School
            </button>
          </div>

          {/* Quick Search Spotlight Trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-400 mb-4 transition-all group cursor-pointer"
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
              {activeSuite === "school" ? "MOD School Dedicated OS" : "Core Fleet & Modules"}
            </span>
            {activeNavItems.map((item: any) => {
              const active = pathname === item.href;
              const isHomeTrigger = Boolean(item.isHomeTrigger);
              return (
                <div
                  key={item.href}
                  onMouseEnter={isHomeTrigger ? handleMouseEnterHome : undefined}
                  onMouseLeave={isHomeTrigger ? handleMouseLeaveHome : undefined}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={active ? "text-cyan-400" : "text-slate-400"}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>

                    {item.alertCount !== undefined && item.alertCount > 0 ? (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {item.alertCount}
                      </span>
                    ) : item.badge ? (
                      <span className="text-[10px] font-mono text-slate-500 hidden xl:inline">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </div>
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
                <span className="text-[10px] text-slate-400 font-mono">Modernisum OS</span>
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

      {/* Modernisum Home Showcase Hover Flyout Sub-Sidebar */}
      <HomeShowcaseFlyout
        isOpen={homeFlyoutOpen}
        isPinned={homeFlyoutPinned}
        onClose={() => {
          setHomeFlyoutOpen(false);
          setHomeFlyoutPinned(false);
        }}
        onTogglePin={() => setHomeFlyoutPinned((p) => !p)}
        onMouseEnter={handleMouseEnterHome}
        onMouseLeave={handleMouseLeaveHome}
      />

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
            {/* Live Community Incident Notification Trigger */}
            <div className="relative">
              <button
                onClick={() => setAlertsOpen(!alertsOpen)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                title="Community Complaints & Telemetry Alerts"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {unreadAlertCount > 0 && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                )}
                <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                  {unreadAlertCount} Alerts
                </span>
              </button>

              {/* Alerts Floating Dropdown */}
              {alertsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel-elevated border border-white/15 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>Community Incidents & Feedback</span>
                    </div>
                    <Link
                      href="/admin/community"
                      onClick={() => setAlertsOpen(false)}
                      className="text-[11px] font-mono text-cyan-400 hover:underline"
                    >
                      View Desk &rarr;
                    </Link>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {communityAlerts.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">No active community tickets.</p>
                    ) : (
                      communityAlerts.map((alert) => (
                        <div
                          key={alert.id || alert.ticketId}
                          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                            <span className="text-cyan-400 font-bold">{alert.ticketId}</span>
                            <span>{alert.createdAt}</span>
                          </div>
                          <div className="text-xs font-semibold text-white line-clamp-1">{alert.title}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{alert.description}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/10 text-center">
                    <Link
                      href="/admin/community"
                      onClick={() => setAlertsOpen(false)}
                      className="block w-full py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors"
                    >
                      Open Full Community Desk ({communityAlerts.length} Tickets)
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
