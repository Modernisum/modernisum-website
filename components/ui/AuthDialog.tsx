"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GlassModal } from "./GlassModal";
import { GlassInput } from "./GlassInput";
import { GlassButton } from "./GlassButton";
import {
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Smartphone,
  GraduationCap,
  Globe,
  Phone,
  MapPin,
  Shuffle,
  Check,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CARTOON_AVATARS, CartoonAvatar, getDefaultAvatar } from "@/lib/avatars";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { processDesktopHandoff } from "@/lib/desktopAuthHandoff";
import { saveSSOUser } from "@/lib/sso";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { email: string; name: string; avatar?: string }) => void;
  productName?: string;
  defaultTab?: string;
  initialTab?: string;
  initialStep?: 1 | 2 | 3 | 4;
}

interface ProductInterest {
  id: string;
  title: string;
  desc: string;
  badge: string;
  icon: React.ReactNode;
}

const AVAILABLE_PRODUCTS: ProductInterest[] = [
  {
    id: "school-desktop",
    title: "MOD School Desktop Suite",
    desc: "Offline-first school ERP, student records, fee collection & timetable",
    badge: "MOD School",
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: "agromi-agritech",
    title: "MOD Farmer Agro Platform",
    desc: "Autonomous precision farming, AI Crop Doctor, IoT soil telemetry & drone NDVI",
    badge: "MOD Farmer",
    icon: <Sprout className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "teacher-mobile-app",
    title: "MOD School Teacher App",
    desc: "Live student attendance, daily homework & quick grade entry",
    badge: "Mobile App",
    icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "student-parent-portal",
    title: "Student & Parent Portal",
    desc: "Digital report cards, online fee payment & announcements",
    badge: "Web & Portal",
    icon: <Globe className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "enterprise-ai-saas",
    title: "Enterprise AI & Custom SaaS",
    desc: "Custom web software, automated business workflows & cloud systems",
    badge: "Modernisum",
    icon: <Sparkles className="w-5 h-5 text-rose-400" />,
  },
];

export function AuthDialog({
  isOpen,
  onClose,
  onSuccess,
  productName,
}: AuthDialogProps) {
  // Current progressive step: 1 = Credentials, 2 = Profile, 3 = Interests, 4 = Contact
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<CartoonAvatar>(getDefaultAvatar());
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "school-desktop",
  ]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Reset or initialize state
  const resetForm = () => {
    setStep(1);
    setEmail("");
    setPassword("");
    setName("");
    setSelectedAvatar(getDefaultAvatar());
    setSelectedProducts(["school-desktop"]);
    setPhone("");
    setAddress("");
    setError(null);
    setSuccessMsg(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Toggle product interest
  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Randomize cartoon avatar
  const handleRandomizeAvatar = () => {
    const others = CARTOON_AVATARS.filter((a) => a.id !== selectedAvatar.id);
    const randomIndex = Math.floor(Math.random() * others.length);
    setSelectedAvatar(others[randomIndex]);
  };

  // Desktop loopback supervisor relay (Port 7071)
  const handleDesktopHandoffFlow = async (userEmail: string, userName?: string) => {
    setSuccessMsg("Connecting to School Desktop OS...");
    try {
      const handoff = await processDesktopHandoff(userEmail, userName);
      if (handoff.schoolFound) {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#818cf8", "#34d399"],
        });
        setSuccessMsg(
          handoff.relayed
            ? "✓ Successfully connected to School Desktop OS!"
            : "✓ Authorization ready! Returning to School Desktop OS..."
        );
        setTimeout(() => {
          handleClose();
          if (!handoff.relayed && handoff.handoffUrl) {
            window.location.href = handoff.handoffUrl;
          }
        }, 1200);
        return true;
      } else {
        // User has no school registered -> navigate to school onboarding
        setSuccessMsg("No school workspace found. Redirecting to registration...");
        setTimeout(() => {
          handleClose();
          router.push(`/register?origin=desktop&email=${encodeURIComponent(userEmail)}`);
        }, 1000);
        return true;
      }
    } catch (err) {
      console.warn("Desktop handoff flow error:", err);
      return false;
    }
  };

  // Step 1: Submit Credentials
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/check-or-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok && data.status === "invalid_password") {
        setError(data.message || "Incorrect password. Please try again.");
        setLoading(false);
        return;
      }

      if (!data.success && data.status !== "new_user") {
        setError(data.message || "Authentication error.");
        setLoading(false);
        return;
      }

      if (data.status === "logged_in") {
        // User is already registered and logged in!
        confetti({
          particleCount: 65,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#00f2fe", "#7928ca", "#10b981", "#f59e0b"],
        });

        if (data.user) {
          saveSSOUser(data.user);
        } else {
          saveSSOUser({ email, name: email.split("@")[0], role: email.includes("admin") ? "admin" : "client" });
        }

        if (onSuccess) {
          onSuccess(data.user);
        }

        const isDesktopOrigin =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("origin") === "desktop";

        if (isDesktopOrigin) {
          const handled = await handleDesktopHandoffFlow(data.user?.email || email, data.user?.name);
          if (handled) return;
        }

        setSuccessMsg(`Welcome back, ${data.user?.name || "Explorer"}!`);

        setTimeout(() => {
          handleClose();
          if (data.user?.role === "admin" || email.toLowerCase().includes("admin")) {
            router.push("/admin/dashboard");
          } else {
            router.refresh();
          }
        }, 800);
      } else if (data.status === "new_user") {
        // New user -> transition to Stage 2 (Name & Avatar)
        setStep(2);
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit Profile Name & Avatar
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide your name so we know how to address you.");
      return;
    }
    setError(null);
    setStep(3);
  };

  // Step 3: Product selection next
  const handleInterestsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep(4);
  };

  // Step 4: Final Registration
  const handleFinalRegister = async (skipContact = false) => {
    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        avatar: selectedAvatar.id,
        phone: skipContact ? "" : phone.trim(),
        address: skipContact ? "" : address.trim(),
        interestedProducts: selectedProducts,
        accountType: "customer",
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to complete account registration.");
        setLoading(false);
        return;
      }

      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#00f2fe", "#7928ca", "#10b981", "#f59e0b"],
      });

      const regUser = data.user || {
        id: "usr_" + Date.now(),
        email: email.trim().toLowerCase(),
        name: name.trim(),
        avatar: selectedAvatar.id,
        role: email.toLowerCase().includes("admin") ? "admin" : "client",
      };
      saveSSOUser(regUser);

      if (onSuccess) {
        onSuccess(regUser);
      }

      const isDesktopOrigin =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("origin") === "desktop";

      if (isDesktopOrigin) {
        const handled = await handleDesktopHandoffFlow(email, name);
        if (handled) return;
      }

      setSuccessMsg("Your Modernisum Universal Account is ready!");

      setTimeout(() => {
        handleClose();
        if (data.user?.role === "admin" || email.toLowerCase().includes("admin")) {
          router.push("/admin/dashboard");
        } else {
          router.refresh();
        }
      }, 950);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Single Sign-On via Firebase (Real 1-Click Marketing Lead Capture & Sign In)
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      const userEmail = fbUser.email || "";
      const userName = fbUser.displayName || userEmail.split("@")[0] || "Explorer";

      // 1. Direct Firestore Marketing Lead Write (Zero REST API, 100% Serverless)
      try {
        const { db } = await import("@/lib/firebase");
        const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
        if (userEmail) {
          const docId = userEmail.replace(/[@.]/g, "_");
          await setDoc(
            doc(db, "marketing_leads", docId),
            {
              email: userEmail.toLowerCase(),
              name: userName,
              photoURL: fbUser.photoURL || null,
              uid: fbUser.uid,
              source: "google_signin_modal",
              capturedAt: serverTimestamp(),
              lastActive: serverTimestamp(),
              interestedProducts: selectedProducts,
            },
            { merge: true }
          );
        }
      } catch (fsErr) {
        console.warn("Firestore direct lead sync warning:", fsErr);
      }

      // 2. Also sync with backend session route if on local/server
      let authedUser = {
        id: fbUser.uid,
        email: userEmail,
        name: userName,
        avatar: fbUser.photoURL || "cyber-astro",
        photoURL: fbUser.photoURL || undefined,
        role: userEmail.toLowerCase().includes("admin") ? "admin" : "client",
      };

      try {
        const res = await fetch("/api/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            name: userName,
            photoURL: fbUser.photoURL,
            uid: fbUser.uid,
            interestedProducts: selectedProducts,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.user) authedUser = data.user;
        }
      } catch (apiErr) {
        console.warn("Backend session sync fallback:", apiErr);
      }

      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f2fe", "#7928ca", "#10b981"],
      });

      saveSSOUser(authedUser);

      if (onSuccess) {
        onSuccess(authedUser);
      }

      const isDesktopOrigin =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("origin") === "desktop";

      if (isDesktopOrigin) {
        const handled = await handleDesktopHandoffFlow(userEmail, userName);
        if (handled) return;
      }

      setSuccessMsg(`Welcome, ${userName}!`);

      setTimeout(() => {
        handleClose();
        if (authedUser.email?.toLowerCase().includes("admin")) {
          router.push("/admin/dashboard");
        } else {
          router.refresh();
        }
      }, 850);
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      console.error("Firebase Google Sign-In Error:", errorObj);
      if (errorObj?.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled. Click Continue with Google to try again.");
      } else if (errorObj?.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.");
      } else {
        setError(errorObj?.message || "Google authentication failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // Dynamic titles and subtitles
  const getModalHeader = () => {
    if (step === 1) {
      return {
        title: productName ? `Access ${productName}` : "Sign In to Modernisum",
        desc: "",
      };
    }
    if (step === 2) {
      return {
        title: "Welcome! Choose Your Identity",
        desc: "Pick your cartoon avatar and tell us your name to personalize your account.",
      };
    }
    if (step === 3) {
      return {
        title: "What are you interested in?",
        desc: "Select the Modernisum tools or services you'd like to explore first.",
      };
    }
    return {
      title: "Stay Connected (Optional)",
      desc: "Add your contact number or city for updates, or skip to finish immediately.",
    };
  };

  const header = getModalHeader();

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={handleClose}
      title={header.title}
      description={header.desc}
      maxWidth={step === 3 ? "lg" : "md"}
    >
      {/* Sleek Multi-Stage Progress Stepper (Visible during onboarding flow) */}
      {step > 1 && (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2">
            {[
              { s: 1, label: "Credentials" },
              { s: 2, label: "Profile" },
              { s: 3, label: "Interests" },
              { s: 4, label: "Finish" },
            ].map((item) => {
              const isPassed = step > item.s;
              const isCurrent = step === item.s;
              return (
                <div key={item.s} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                      isPassed
                        ? "bg-gradient-to-r from-cyan-400 to-emerald-400"
                        : isCurrent
                        ? "bg-cyan-500 shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                        : "bg-slate-200 dark:bg-white/10"
                    }`}
                  />
                  <span
                    className={`mt-1.5 text-[10px] font-tech uppercase tracking-wider transition-colors ${
                      isCurrent
                        ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                        : isPassed
                        ? "text-emerald-500 font-medium"
                        : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Success Notification */}
      {successMsg ? (
        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in zoom-in-95">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-300">
            {successMsg}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connecting your workspace and preferences...
          </p>
        </div>
      ) : (
        <>
          {/* STEP 1: CREDENTIALS (Email & Password) */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
              {/* One-Click Google Authentication */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:opacity-50 cursor-pointer shadow-sm"
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
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
                <span className="flex-shrink mx-3 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-500 font-tech">
                  Or continue with email
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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

                {error && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs animate-in fade-in">
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
                    Continue
                  </GlassButton>
                </div>
              </form>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>One account works for School Desktop OS, Mobile Apps, and Modernisum.</span>
              </div>
            </div>
          )}

          {/* STEP 2: PROFILE & CARTOON AVATAR */}
          {step === 2 && (
            <form
              onSubmit={handleProfileSubmit}
              className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-200"
            >
              {/* Cartoon Avatar Picker */}
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center">
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.3)] bg-slate-900 mx-auto flex items-center justify-center relative">
                    <Image
                      src={selectedAvatar.svgUrl}
                      alt={selectedAvatar.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRandomizeAvatar}
                    title="Randomize Avatar"
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">
                  {selectedAvatar.name}
                </div>
                <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-tech uppercase tracking-wider mb-3">
                  Role Flavor: {selectedAvatar.tag}
                </div>

                {/* Avatar Selection Grid */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {CARTOON_AVATARS.map((avatar) => {
                    const isPicked = avatar.id === selectedAvatar.id;
                    return (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`w-11 h-11 rounded-full p-0.5 transition-all cursor-pointer ${
                          isPicked
                            ? "ring-2 ring-cyan-400 scale-110 shadow-[0_0_12px_rgba(0,242,254,0.4)]"
                            : "opacity-60 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-white/20 relative">
                          <Image
                            src={avatar.svgUrl}
                            alt={avatar.name}
                            width={44}
                            height={44}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Input */}
              <GlassInput
                label="Your Full Name"
                placeholder="e.g. Shivank Sharma"
                icon={<UserIcon className="w-4 h-4" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Next: Product Interests
                </GlassButton>
              </div>
            </form>
          )}

          {/* STEP 3: PRODUCT INTERESTS */}
          {step === 3 && (
            <form
              onSubmit={handleInterestsSubmit}
              className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {AVAILABLE_PRODUCTS.map((prod) => {
                  const isSelected = selectedProducts.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => toggleProduct(prod.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isSelected
                          ? "bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-400 dark:border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                          : "bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 shrink-0">
                        {prod.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {prod.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-tech">
                            {prod.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {prod.desc}
                        </p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-cyan-500 border-cyan-400 text-slate-950"
                            : "border-slate-300 dark:border-white/20"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Next: Contact Details
                </GlassButton>
              </div>
            </form>
          )}

          {/* STEP 4: CONTACT & LOCATION (Friction-less with Skip) */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-700 dark:text-cyan-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                <span>
                  Almost done! Add your contact details so our team can send you product beta keys and updates, or skip to finish right away.
                </span>
              </div>

              <GlassInput
                label="WhatsApp / Contact Number (Optional)"
                type="tel"
                placeholder="+91 9368671007"
                icon={<Phone className="w-4 h-4" />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <GlassInput
                label="City or School Name (Optional)"
                placeholder="e.g. Mumbai, India or Modern Academy"
                icon={<MapPin className="w-4 h-4" />}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              {/* Final Actions */}
              <div className="pt-2 space-y-2">
                <GlassButton
                  type="button"
                  onClick={() => handleFinalRegister(false)}
                  variant="primary"
                  size="md"
                  className="w-full"
                  loading={loading}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Complete Setup & Enter
                </GlassButton>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-3 py-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFinalRegister(true)}
                    disabled={loading}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer py-2 px-3 rounded-lg hover:bg-cyan-500/10 transition-colors"
                  >
                    Skip for now & Enter →
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </GlassModal>
  );
}
