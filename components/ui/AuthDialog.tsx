"use client";

import React, { useState } from "react";
import { GlassModal } from "./GlassModal";
import { GlassInput } from "./GlassInput";
import { GlassButton } from "./GlassButton";
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
  initialTab?: "signin" | "signup";
  onSuccess?: (user: { email: string; name: string }) => void;
}

export function AuthDialog({
  isOpen,
  onClose,
  defaultTab = "signin",
  initialTab,
  onSuccess,
}: AuthDialogProps) {
  const [tab, setTab] = useState<"signin" | "signup">(initialTab || defaultTab);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }

      if (tab === "signup" && !name) {
        setError("Please enter your full name.");
        setLoading(false);
        return;
      }

      const endpoint = tab === "signin" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Authentication failed.");
        setLoading(false);
        return;
      }

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00f2fe", "#7928ca", "#10b981", "#f59e0b"],
      });

      setSuccessMsg(data.message || (tab === "signin" ? "Welcome back to Modernisum!" : "Account created successfully!"));
      if (onSuccess) {
        onSuccess(data.user || { email, name: name || email.split("@")[0] });
      }

      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
        if (data.user?.role === "admin" || email.toLowerCase().includes("admin")) {
          window.location.href = "/admin/dashboard";
        }
      }, 900);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f2fe", "#7928ca", "#10b981"],
      });

      setSuccessMsg("Google Sign-In successful!");
      if (onSuccess) {
        onSuccess({ email: "user@gmail.com", name: "Google User" });
      }

      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
      }, 1000);
    } catch {
      setError("Google authentication failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === "signin" ? "Sign In to Modernisum" : "Join Modernisum Platform"}
      description={
        tab === "signin"
          ? "Access your AI SaaS solutions, school portals, and cloud analytics."
          : "Create an account to deploy software, manage apps, and access APIs."
      }
      maxWidth="md"
    >
      {/* Tabs */}
      <div className="flex p-1 mb-6 rounded-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            setTab("signin");
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all tracking-wider uppercase font-tech ${
            tab === "signin"
              ? "bg-white dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/40 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("signup");
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all tracking-wider uppercase font-tech ${
            tab === "signup"
              ? "bg-white dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/40 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Success Notification */}
      {successMsg ? (
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-in fade-in zoom-in-95">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <p className="font-semibold text-emerald-600 dark:text-emerald-300 text-sm">{successMsg}</p>
        </div>
      ) : (
        <>
          {/* One-Click Google Popup */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:opacity-50 cursor-pointer mb-5 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>{googleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center mb-5">
            <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
            <span className="flex-shrink mx-4 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-500 font-tech">
              Or with email
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <GlassInput
                label="Full Name"
                placeholder="e.g. Shivank Sharma"
                icon={<User className="w-4 h-4" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <GlassInput
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <GlassInput
              label="Password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              isPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Remember Me / Forgot Password */}
            {tab === "signin" && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-black/40 text-cyan-600 dark:text-cyan-400 focus:ring-cyan-500/20"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions will be sent to your email.");
                  }}
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <div className="pt-2">
              <GlassButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                loading={loading}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {tab === "signin" ? "Sign In to Account" : "Create Modernisum Account"}
              </GlassButton>
            </div>
          </form>
        </>
      )}
    </GlassModal>
  );
}
