"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthDialog } from "@/components/ui/AuthDialog";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getSSOUser, saveSSOUser, clearSSOUser, type AuthUser } from "@/lib/sso";
import { NavbarVariant, NavDomainConfig, NavItem } from "./nav/types";
import { getSchoolNavConfig } from "./nav/school.config";
import { getFarmerNavConfig } from "./nav/farmer.config";
import { getModernisumNavConfig } from "./nav/modernisum.config";
import { MegaDropdown } from "./nav/MegaDropdown";
import { UserAccountMenu } from "./nav/UserAccountMenu";
import { MobileNavDrawer } from "./nav/MobileNavDrawer";

export type { NavbarVariant } from "./nav/types";

interface NavbarProps {
  variant?: NavbarVariant;
}

export function Navbar({ variant = "modernisum" }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSchoolDomain, setIsSchoolDomain] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    if (
      host === "school.modernisum.com" ||
      host.startsWith("school.") ||
      new URLSearchParams(window.location.search).get("subdomain") === "school"
    ) {
      setIsSchoolDomain(true);
    }
  }, []);

  const activeVariant: NavbarVariant = isSchoolDomain
    ? "school"
    : variant === "vidhyam"
    ? "school"
    : variant;

  // Retrieve clean domain-specific content configuration
  const config: NavDomainConfig =
    activeVariant === "school"
      ? getSchoolNavConfig(isSchoolDomain)
      : activeVariant === "agromi" || activeVariant === "farmer"
      ? getFarmerNavConfig()
      : getModernisumNavConfig();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // User Account Dropdown states
  const [pillUserDropdownOpen, setPillUserDropdownOpen] = useState(false);
  const [topUserDropdownOpen, setTopUserDropdownOpen] = useState(false);

  // Active Dropdown state for mega-menus
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Spotlight effect on the navbar pill
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillMousePos, setPillMousePos] = useState({ x: 0, y: 0 });
  const [isPillHovered, setIsPillHovered] = useState(false);

  const handlePillMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    setPillMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleOpenDropdown = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  // Close dropdown on route changes or unmount
  useEffect(() => {
    setActiveDropdown(null);
    setPillUserDropdownOpen(false);
    setTopUserDropdownOpen(false);
    setMobileMenuOpen(false);
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Scroll detection for floating island morph
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(scrollPos > 35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Sync theme
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    const initialDark = savedTheme === "light" ? false : true;

    if (initialDark) {
      html.classList.remove("light");
      html.classList.add("dark");
      setIsDark(true);
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      setIsDark(false);
    }

    // Auto-handoff to desktop OS if already authenticated
    let desktopHandoffTriggered = false;
    let hasAuthenticatedUser = false;

    const triggerDesktopHandoffIfPresent = async (userEmail: string, userName?: string) => {
      if (desktopHandoffTriggered) return;
      if (typeof window === "undefined") return;

      const currentPath = window.location.pathname || "";
      if (
        currentPath.includes("/register") ||
        currentPath.includes("/mod-school/register") ||
        currentPath.includes("/vidhyam/register") ||
        (pathname &&
          (pathname.includes("/register") ||
            pathname.includes("/mod-school/register") ||
            pathname.includes("/vidhyam/register")))
      ) {
        return;
      }

      const params = new URLSearchParams(window.location.search);
      if (params.get("origin") !== "desktop") return;

      desktopHandoffTriggered = true;
      setAuthModalOpen(false);

      try {
        const { processDesktopHandoff } = await import("@/lib/desktopAuthHandoff");
        const handoff = await processDesktopHandoff(userEmail, userName);
        if (handoff.schoolFound) {
          try {
            window.history.replaceState({}, "", window.location.pathname);
          } catch {}

          if (window.opener && !window.opener.closed) {
            setTimeout(() => {
              try {
                window.close();
              } catch {}
            }, 600);
          } else if (!handoff.relayed && handoff.handoffUrl) {
            window.location.href = handoff.handoffUrl;
          }
        } else {
          if (!window.location.pathname.includes("/register")) {
            const handoffId = params.get("handoff_id") || "";
            const handoffQuery = handoffId ? `&handoff_id=${encodeURIComponent(handoffId)}` : "";
            router.push(
              `/register?origin=desktop&email=${encodeURIComponent(userEmail)}${handoffQuery}`
            );
          }
        }
      } catch (err) {
        console.warn("Desktop handoff auto-detect warning:", err);
      }
    };

    // 1. Check existing cached user session via Universal Cross-Subdomain SSO
    const ssoUser = getSSOUser();
    if (ssoUser && ssoUser.email) {
      hasAuthenticatedUser = true;
      setCurrentUser(ssoUser);
      setAuthModalOpen(false);
      triggerDesktopHandoffIfPresent(ssoUser.email, ssoUser.name);
    }

    // 2. Firebase Auth session listener
    let unsubscribeAuth: (() => void) | null = null;
    try {
      unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser && fbUser.email) {
          hasAuthenticatedUser = true;
          const userObj: AuthUser = {
            id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email.split("@")[0],
            role: fbUser.email.includes("admin") ? "admin" : "client",
            avatar: fbUser.photoURL || "cyber-astro",
            photoURL: fbUser.photoURL || undefined,
          };
          setCurrentUser(userObj);
          setAuthModalOpen(false);
          saveSSOUser(userObj);
          triggerDesktopHandoffIfPresent(fbUser.email, fbUser.displayName || undefined);
        }
      });
    } catch (err) {
      console.warn("Firebase onAuthStateChanged error:", err);
    }

    // 3. Listen to SSO cross-tab or cross-subdomain auth changes & window focus
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<AuthUser | null>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
        setAuthModalOpen(false);
      } else {
        setCurrentUser(null);
      }
    };
    window.addEventListener("modernisum_auth_change", handleAuthChange);

    const handleWindowFocus = () => {
      const freshUser = getSSOUser();
      if (freshUser && freshUser.email) {
        setCurrentUser((prev) => {
          if (!prev || prev.email !== freshUser.email) {
            return freshUser;
          }
          return prev;
        });
      } else if (!freshUser) {
        setCurrentUser((prev) => (prev ? null : prev));
      }
    };
    window.addEventListener("focus", handleWindowFocus);

    // 4. Probe backend API when running on localhost as secondary fallback
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ) {
      fetch("/api/auth/me")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user?.email) {
            hasAuthenticatedUser = true;
            setCurrentUser(data.user);
            setAuthModalOpen(false);
            saveSSOUser(data.user);
            triggerDesktopHandoffIfPresent(data.user.email, data.user.name);
          }
        })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("modernisum_auth_change", handleAuthChange);
      window.removeEventListener("focus", handleWindowFocus);
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
    } catch {}
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    clearSSOUser();
    setCurrentUser(null);
    window.location.reload();
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      html.classList.add("light");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  const isLinkActive = (item: NavItem) => {
    if (item.href === config.homeHref) return pathname === config.homeHref;
    if (item.dropdown) {
      return item.dropdown.columns.some((col) =>
        col.items.some((sub) => {
          const pureSubHref = sub.href.split("#")[0];
          return (
            pathname === sub.href ||
            (pureSubHref !== "/" && pathname === pureSubHref) ||
            (pureSubHref !== "/" && pureSubHref.length > 1 && pathname.startsWith(pureSubHref))
          );
        })
      );
    }
    return pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
  };

  const activeDropdownItem = config.navItems.find(
    (item) => item.dropdown && item.dropdown.id === activeDropdown
  );

  return (
    <>
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-40 w-full pointer-events-none px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1760px] mx-auto flex items-center justify-between relative h-11 sm:h-12">
          {/* A. Outer Left: Brand Logo & Title (Outside nav pill when at top) */}
          <div className="flex items-center shrink-0 min-w-0 pointer-events-auto">
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  key="top-brand"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, transition: { duration: 0.22, ease: "easeOut" } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center"
                >
                  <Link
                    href={config.homeHref}
                    prefetch={false}
                    className="flex items-center gap-2.5 sm:gap-3 group select-none"
                    title={`${config.brandTitle || "Modernisum"} Home`}
                  >
                    <div className="flex items-center justify-center shrink-0">
                      {config.brandLogoNode}
                    </div>
                    {config.variant === "school" ? (
                      <div className="flex flex-col justify-center select-none w-fit ml-0.5" aria-label="ModSchool Modernisum">
                        <span className="text-[18px] sm:text-[20px] font-black font-tech tracking-tight text-slate-900 dark:text-white leading-none">
                          School
                        </span>
                        <div className="w-full flex justify-between items-center text-[7px] sm:text-[7.5px] font-bold font-tech uppercase text-amber-500 dark:text-yellow-400 leading-none mt-1 select-none" aria-hidden="true">
                          <span>M</span><span>O</span><span>D</span><span>E</span><span>R</span><span>N</span><span>I</span><span>S</span><span>U</span><span>M</span>
                        </div>
                      </div>
                    ) : config.variant === "farmer" || config.variant === "agromi" ? (
                      <div className="flex flex-col justify-center select-none w-fit" aria-label="MOD Farmer by Modernisum">
                        <span className="text-[17px] sm:text-[19px] font-black font-tech tracking-wider text-slate-900 dark:text-white leading-none">
                          MOD FARMER
                        </span>
                        <div className="w-full flex justify-between items-center text-[7px] sm:text-[8px] font-bold font-tech uppercase text-emerald-500 dark:text-emerald-400 leading-none mt-1 select-none" aria-hidden="true">
                          <span>M</span><span>O</span><span>D</span><span>E</span><span>R</span><span>N</span><span>I</span><span>S</span><span>U</span><span>M</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center select-none">
                        <span className="text-[15px] sm:text-[17px] font-bold font-tech tracking-wider text-slate-900 dark:text-white leading-none">
                          {config.brandTitle}
                        </span>
                        {config.brandSubtitle && (
                          <span className="text-[10px] sm:text-[11px] font-tech font-bold tracking-widest leading-none uppercase mt-1 text-slate-500 dark:text-cyan-400/90">
                            {config.brandSubtitle}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* B. Center: Compact Floating Island Pill */}
          <motion.div
            ref={pillRef}
            data-testid="floating-island-pill"
            onMouseMove={handlePillMouseMove}
            onMouseEnter={() => setIsPillHovered(true)}
            onMouseLeave={() => setIsPillHovered(false)}
            initial={false}
            animate={{
              paddingLeft: scrolled ? "10px" : "14px",
              paddingRight: scrolled ? "10px" : "14px",
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute left-1/2 -translate-x-1/2 pointer-events-auto ${
              scrolled ? "flex" : "hidden lg:flex"
            } items-center h-10 sm:h-11 rounded-full backdrop-blur-2xl border transition-all duration-300 group/pill overflow-visible ${
              config.themePillBg
            } ${config.themePillBorder} ${config.themePillShadow}`}
          >
            {/* Ambient Glass Sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-white/20 via-white/[0.05] to-transparent dark:from-white/[0.14] dark:via-white/[0.03] dark:to-transparent" />
            </div>

            {/* Specular Spotlight tracking cursor */}
            {isPillHovered && (
              <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="w-full h-full transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(220px circle at ${pillMousePos.x}px ${pillMousePos.y}px, ${config.themeSpotlightGlow}, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Embedded Logo in pill: ONLY when scrolled */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  key="scrolled-pill-logo"
                  initial={{ opacity: 0, width: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, width: "auto", scale: 1, x: 0 }}
                  exit={{ opacity: 0, width: 0, scale: 0.8, x: -10, transition: { duration: 0.22, ease: "easeOut" } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden flex items-center mr-2 shrink-0"
                >
                  <Link href={config.homeHref} prefetch={false} className="flex items-center group">
                    <div className="flex items-center justify-center shrink-0">
                      {config.brandPillLogoNode}
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Links: ALWAYS centered in pill */}
            <div className="hidden lg:flex items-center shrink-0">
              <div className="relative flex items-center shrink-0">
                <nav className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0">
                  {config.navItems.map((item) => {
                    const ItemIcon = item.icon;

                    if (item.dropdown) {
                      const isOpen = activeDropdown === item.dropdown.id;
                      return (
                        <div
                          key={item.name}
                          className="shrink-0 py-1"
                          onMouseEnter={() => handleOpenDropdown(item.dropdown!.id)}
                          onMouseLeave={handleCloseDropdown}
                        >
                          <Link
                            href={item.href}
                            prefetch={false}
                            onClick={handleCloseDropdown}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[13.5px] sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 border ${
                              isOpen
                                ? `${config.activePillBg} font-semibold shadow-xs`
                                : "border-transparent text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5"
                            }`}
                          >
                            {ItemIcon && <ItemIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isOpen
                                  ? "rotate-180 text-current opacity-100"
                                  : "opacity-50 group-hover:opacity-80"
                              }`}
                            />
                          </Link>
                        </div>
                      );
                    }

                    const isDownload =
                      item.isDownload ||
                      item.href.includes("/downloads/") ||
                      item.href.endsWith(".exe") ||
                      item.href.endsWith(".zip");

                    if (isDownload) {
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          download
                          onMouseEnter={handleCloseDropdown}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13.5px] sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 border border-transparent text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5"
                        >
                          {ItemIcon && <ItemIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-sky-500" />}
                          <span>{item.name}</span>
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        prefetch={false}
                        onMouseEnter={handleCloseDropdown}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13.5px] sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 border border-transparent text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5"
                      >
                        {ItemIcon && <ItemIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Unified Static Centered Dropdown Mega-Menu */}
                <AnimatePresence>
                  {activeDropdownItem && activeDropdownItem.dropdown && (
                    <MegaDropdown
                      dropdown={activeDropdownItem.dropdown}
                      themeSpotlightGlow={config.themeSpotlightGlow}
                      activeVariant={config.variant}
                      onClose={handleCloseDropdown}
                      onOpen={handleOpenDropdown}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Embedded Sign In / Account Chip in pill: ONLY when scrolled */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  key="scrolled-pill-auth"
                  initial={{ opacity: 0, width: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, width: "auto", scale: 1, x: 0 }}
                  exit={{ opacity: 0, width: 0, scale: 0.8, x: 10, transition: { duration: 0.22, ease: "easeOut" } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center ml-2 shrink-0 relative"
                >
                  <UserAccountMenu
                    currentUser={currentUser}
                    isOpen={pillUserDropdownOpen}
                    onToggle={() => setPillUserDropdownOpen((prev) => !prev)}
                    onClose={() => setPillUserDropdownOpen(false)}
                    onLogout={handleLogout}
                    isDark={isDark}
                    onToggleTheme={toggleTheme}
                    onOpenAuth={() => setAuthModalOpen(true)}
                    isSchoolDomain={isSchoolDomain}
                    compact={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Drawer Trigger inside pill when scrolled */}
            {scrolled && (
              <div className="flex lg:hidden items-center ml-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-lg text-slate-900 dark:text-white cursor-pointer"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            )}
          </motion.div>

          {/* C. Outer Right: Theme Toggle & Sign In (Outside nav pill when at top) */}
          <div className="flex items-center justify-end shrink-0 pointer-events-auto">
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  key="top-actions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.22, ease: "easeOut" } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-1.5 sm:gap-3"
                >
                  {/* Theme Toggle (outside nav at top) */}
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 sm:p-2 rounded-full glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer hover:rotate-12"
                    aria-label="Toggle theme"
                  >
                    {isDark ? (
                      <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600" />
                    )}
                  </button>

                  {/* Sign In / Account Chip (outside nav at top) */}
                  <UserAccountMenu
                    currentUser={currentUser}
                    isOpen={topUserDropdownOpen}
                    onToggle={() => setTopUserDropdownOpen((prev) => !prev)}
                    onClose={() => setTopUserDropdownOpen(false)}
                    onLogout={handleLogout}
                    isDark={isDark}
                    onToggleTheme={toggleTheme}
                    onOpenAuth={() => setAuthModalOpen(true)}
                    isSchoolDomain={isSchoolDomain}
                    compact={false}
                  />

                  {/* Mobile Trigger at top */}
                  <div className="flex lg:hidden items-center ml-0.5 sm:ml-1">
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="p-1.5 sm:p-2 rounded-xl glass-pill text-slate-900 dark:text-white"
                      aria-label="Toggle mobile menu"
                    >
                      {mobileMenuOpen ? (
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        config={config}
        isSchoolDomain={isSchoolDomain}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthModalOpen(true)}
        isLinkActive={isLinkActive}
      />

      {/* Interactive Liquid Glass Auth Dialog */}
      <AuthDialog isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
