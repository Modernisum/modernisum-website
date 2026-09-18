"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  ShieldAlert,
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Zap,
  Terminal,
  KeyRound
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@modernisum.com");
  const [password, setPassword] = useState("Shivank2002");
  const [loading, setLoading] = useState(false);
  const [devLoading, setDevLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 1-Click Dev Instant Bypass (Zero Password Required)
  const handleDevBypass = async () => {
    setError(null);
    setDevLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ devBypass: true }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Dev bypass failed.");
        setDevLoading(false);
        return;
      }

      setSuccessMsg("Dev Bypass Authorized! Welcome, Super Admin (Shivank).");
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f2fe", "#7928ca", "#10b981", "#f59e0b"],
      });

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 700);
    } catch {
      setError("Network error connecting to dev authorization.");
    } finally {
      setDevLoading(false);
    }
  };

  // Standard Credentials Login
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Invalid administrative credentials.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Credentials Verified: Welcome to Executive Cockpit!");
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 700);
    } catch {
      setError("Authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#07090e] text-white">
      {/* Background Chromatic Mesh */}
      <AmbientBackground />

      <div className="relative w-full max-w-md z-10 space-y-6">
        {/* Top Restricted Zone Indicator */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono uppercase text-rose-400">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            <span>Isolated Admin Gate</span>
          </div>
        </div>

        {/* Liquid Glass Security Card */}
        <LiquidGlassCard
          glowColor="rgba(0, 242, 254, 0.2)"
          className="p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center p-2.5 shadow-[0_0_30px_rgba(0,242,254,0.35)]">
              <Image
                src="/logo.png"
                alt="Modernisum"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                Executive Command Gate
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-light">
                Modernisum Operations, Gemini AI Orchestration & Cloud Storage
              </p>
            </div>
          </div>

          {/* Success State */}
          {successMsg ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="font-semibold text-emerald-300 text-sm">{successMsg}</p>
              <p className="text-xs text-slate-400 font-mono">Launching Executive Cockpit...</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* ⚡ DEV MODE 1-CLICK INSTANT BYPASS BUTTON */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-cyan-500/15 to-purple-500/10 border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,242,254,0.2)] text-center space-y-2.5">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Dev Mode Fast-Track</span>
                </div>

                <button
                  type="button"
                  onClick={handleDevBypass}
                  disabled={devLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-purple-600 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <KeyRound className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                  <span>
                    {devLoading ? "Authorizing Dev Session..." : "⚡ 1-Click Dev Login (Bypass Password)"}
                  </span>
                </button>

                <p className="text-[10px] text-slate-400 font-mono">
                  Zero password required in dev mode • Instantly enters as Super Admin
                </p>
              </div>

              {/* Security Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/10" />
                <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                  Or Credentials Login
                </span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              {/* Fallback Credentials Form */}
              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <GlassInput
                  label="Admin Email"
                  type="email"
                  placeholder="admin@modernisum.com"
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

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {error}
                  </div>
                )}

                <GlassButton
                  type="submit"
                  variant="secondary"
                  size="md"
                  className="w-full text-xs"
                  loading={loading}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Sign In with Credentials
                </GlassButton>
              </form>
            </div>
          )}
        </LiquidGlassCard>

        {/* Security Warning Footer */}
        <p className="text-center text-[10px] font-mono text-slate-500 leading-relaxed">
          Authorized Modernisum operations only. All administrative actions and Gemini AI calls are cryptographically logged.
        </p>
      </div>
    </div>
  );
}
