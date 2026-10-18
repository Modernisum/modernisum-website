"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { saveSSOUser } from "@/lib/sso";

interface QuickLeadPromptProps {
  currentUser: { email: string; name?: string } | null;
  onSuccess?: (user: { email: string; name: string; avatar?: string; photoURL?: string }) => void;
}

function getClientEnvironment() {
  if (typeof window === "undefined" || !navigator) {
    return { os: "Desktop", browser: "Web Browser" };
  }
  const ua = navigator.userAgent;
  let os = "Desktop";
  if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Web Browser";
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Edg/i.test(ua)) browser = "Edge";
  else if (/Firefox/i.test(ua)) browser = "Firefox";

  return { os, browser };
}

export function QuickLeadPrompt({ currentUser, onSuccess }: QuickLeadPromptProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [authedUserName, setAuthedUserName] = useState<string | null>(null);

  useEffect(() => {
    // If user is already authenticated, do not show
    if (currentUser) {
      setVisible(false);
      return;
    }

    // Check if dismissed in this browser session
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("modernisum_lead_prompt_dismissed");
      if (isDismissed) {
        return;
      }
    }

    // Smooth delay (3.2s) to let the visitor engage with the hero/content first
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, [currentUser]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("modernisum_lead_prompt_dismissed", "true");
    }
  };

  const handleQuickGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      const userEmail = (fbUser.email || "").toLowerCase().trim();
      const userName = fbUser.displayName || userEmail.split("@")[0] || "Executive";
      const { os, browser } = getClientEnvironment();
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

      // 1. Direct Firestore Lead Capture (Resilient client-side write)
      if (userEmail) {
        const docId = userEmail.replace(/[@.]/g, "_");
        
        // Save to marketing_leads
        try {
          await setDoc(
            doc(db, "marketing_leads", docId),
            {
              email: userEmail,
              name: userName,
              photoURL: fbUser.photoURL || null,
              uid: fbUser.uid,
              deviceOS: os,
              browser,
              pageSource: currentPath,
              source: "top_right_google_lead",
              capturedAt: serverTimestamp(),
              lastActive: serverTimestamp(),
              status: "active_lead",
            },
            { merge: true }
          );
        } catch (leadErr) {
          console.warn("[Firestore] marketing_leads write fallback:", leadErr);
        }

        // Also record to enquiries collection so it displays in Admin Enquiries Dashboard
        try {
          await addDoc(collection(db, "enquiries"), {
            name: userName,
            email: userEmail,
            phone: "",
            serviceNeeded: "1-Click Direct Access / Demo Lead",
            budgetRange: "General Inquiry",
            projectDescription: `Authenticated via 1-Click Google Sign-In (${os} • ${browser}) on page ${currentPath}. Available for direct consultation.`,
            status: "new",
            createdAt: serverTimestamp(),
          });
        } catch (enqErr) {
          console.warn("[Firestore] enquiries write fallback:", enqErr);
        }

        // Register in users collection
        try {
          await setDoc(
            doc(db, "users", fbUser.uid),
            {
              email: userEmail,
              name: userName,
              photoURL: fbUser.photoURL || null,
              uid: fbUser.uid,
              role: userEmail.includes("admin") ? "admin" : "client",
              lastLoginAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (userErr) {
          console.warn("[Firestore] users write fallback:", userErr);
        }
      }

      // 2. Prepare user payload for global session & local storage
      const userPayload = {
        id: fbUser.uid,
        email: userEmail,
        name: userName,
        avatar: fbUser.photoURL || "cyber-astro",
        photoURL: fbUser.photoURL || undefined,
        role: userEmail.includes("admin") ? "admin" : "client",
      };

      try {
        await fetch("/api/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            name: userName,
            photoURL: fbUser.photoURL,
            uid: fbUser.uid,
          }),
        });
      } catch {}

      saveSSOUser(userPayload);

      // 3. Celebratory Micro-interaction
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.2, x: 0.85 },
        colors: ["#00f2fe", "#7928ca", "#10b981"],
      });

      setAuthedUserName(userName);

      if (onSuccess) {
        onSuccess(userPayload);
      }

      // Allow user to see the success state for 1.8s, then smoothly dismiss
      setTimeout(() => {
        setVisible(false);
      }, 1800);
    } catch (err: unknown) {
      const errorObj = err as { code?: string };
      if (errorObj?.code !== "auth/popup-closed-by-user") {
        console.warn("Google sign-in could not be completed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!visible || currentUser || dismissed) return null;

  return (
    <aside
      role="complementary"
      aria-label="Direct Demo Access"
      className="fixed top-20 sm:top-24 left-4 right-4 sm:left-auto sm:right-6 lg:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-auto"
    >
      <div className="w-full sm:w-[350px] rounded-2xl p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.7)] transition-all">
        {authedUserName ? (
          /* Success Verified View */
          <div className="flex items-center gap-3 py-1.5 animate-in fade-in duration-300">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Welcome, {authedUserName}!
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Direct access verified
              </p>
            </div>
          </div>
        ) : (
          /* Default 1-Click Google Sign-In Card */
          <div className="space-y-3">
            {/* Header: Badge & Minimal Dismiss */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                1-Click Direct Access
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Context & Invitation */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-display">
                Instant Architecture & Demo Access
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Connect in 5 seconds with Google to preview live systems and verified technical solutions.
              </p>
            </div>

            {/* High-Contrast Official Google Button */}
            <button
              type="button"
              onClick={handleQuickGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 select-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Connecting with Google...</span>
                </div>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Security Assurance */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Official Google OAuth • 100% Secure</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
