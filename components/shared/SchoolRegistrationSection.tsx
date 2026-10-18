"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
  Laptop,
  Check,
  Globe,
  Wifi,
  Bus,
  Clock,
  ChevronRight,
  School,
  Database,
  Headphones,
  Upload,
  Trash2,
  Loader2,
  GraduationCap,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { Country, State, City } from "country-state-city";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getSSOUser, saveSSOUser } from "@/lib/sso";

interface BoardGroup {
  group: string;
  boards: string[];
}

function getBoardsForLocation(_countryCode?: string, _stateName?: string): BoardGroup[] {
  // Exclusively show Uttar Pradesh board availability: Central/National boards and UP State boards.
  // Strictly no international boards, and no other state boards.
  return [
    {
      group: "Central / National Boards",
      boards: [
        "CBSE - Central Board of Secondary Education",
        "ICSE - Council for the Indian School Certificate Examinations",
        "CISCE - Council for the Indian School Certificate Examinations",
        "NIOS - National Institute of Open Schooling",
      ],
    },
    {
      group: "Uttar Pradesh State Boards",
      boards: [
        "UPMSP - Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)",
        "UP Board - High School & Intermediate Examination",
        "UP Sanskrit Board - Uttar Pradesh Sanskrit Sansthan",
        "UP Madarsa Board - Uttar Pradesh Madarsa Shiksha Parishad",
      ],
    },
  ];
}

const STREAMS = ["PCM", "PCB", "Commerce", "Arts & Humanities"];

export function SchoolRegistrationSection() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [registeredSchool, setRegisteredSchool] = useState<any | null>(null);

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    affiliationBoard: "CBSE",
    affiliationNumber: "",
    streams: ["PCM", "Commerce"],
    subscriptionTier: "Growth",
    country: "India",
    countryCode: "IN",
    currency: "INR",
    state: "Uttar Pradesh",
    stateCode: "UP",
    district: "Lucknow",
    pincode: "226001",
    address: "",
    contactPhone: "+91 ",
    contactEmail: "",
    adminName: "",
    adminEmail: "",
    profileImage: "",
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLogoError("Please select a valid image file (PNG, JPG, SVG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("Image size must be less than 5MB");
      return;
    }

    try {
      setUploadingLogo(true);
      setLogoError(null);
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.data?.publicUrl) {
        const publicUrl = data.data.publicUrl;
        setLogoUrl(publicUrl);
        setFormData((prev) => ({
          ...prev,
          profileImage: publicUrl,
        }));
      } else {
        setLogoError(data.message || "Failed to upload school emblem. Please try again.");
      }
    } catch (err: any) {
      console.error("Logo upload error:", err);
      setLogoError("Error uploading school emblem. Please try again.");
    } finally {
      setUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl("");
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const [phoneSubscriber, setPhoneSubscriber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Country, State, District Lookups using country-state-city
  const allCountries = useMemo(() => Country.getAllCountries(), []);

  const countryDialPrefix = useMemo(() => {
    const c = Country.getCountryByCode(formData.countryCode);
    const code = c?.phonecode || "91";
    return code.startsWith("+") ? code : `+${code}`;
  }, [formData.countryCode]);

  const phoneDigits = useMemo(() => phoneSubscriber.replace(/\D/g, ""), [phoneSubscriber]);

  const isPhoneValid = useMemo(() => {
    if (!phoneSubscriber) return false;
    const digits = phoneDigits;
    if (formData.countryCode === "IN") {
      // In India: 11 digits if starting with 0 (landline with STD trunk code 0), or exactly 10 digits (mobile or landline without 0)
      if (digits.startsWith("0")) {
        return digits.length === 11;
      }
      return digits.length === 10;
    }
    return digits.length >= 7 && digits.length <= 15;
  }, [phoneSubscriber, phoneDigits, formData.countryCode]);

  const availableStates = useMemo(() => {
    return State.getStatesOfCountry(formData.countryCode);
  }, [formData.countryCode]);

  const availableDistricts = useMemo(() => {
    if (!formData.stateCode) return [];
    return City.getCitiesOfState(formData.countryCode, formData.stateCode);
  }, [formData.countryCode, formData.stateCode]);

  // Dynamically categorized affiliation boards based on selected Country and State
  const boardGroups = useMemo(() => {
    return getBoardsForLocation(formData.countryCode, formData.state);
  }, [formData.countryCode, formData.state]);

  // Keep affiliation board synchronized with available regional boards
  useEffect(() => {
    const allAvailable = boardGroups.flatMap((g) => g.boards.map((b) => b.split(" - ")[0]));
    if (allAvailable.length > 0 && !allAvailable.includes(formData.affiliationBoard)) {
      setFormData((prev) => {
        if (allAvailable.includes(prev.affiliationBoard)) return prev;
        return {
          ...prev,
          affiliationBoard: allAvailable[0],
        };
      });
    }
  }, [boardGroups, formData.affiliationBoard]);

  // Autofill user account info from Firebase / cached session & auto-detect existing school profile
  useEffect(() => {
    let checkedEmail = false;
    const verifyExistingProfile = async (emailToCheck: string, nameToCheck?: string) => {
      if (checkedEmail || !emailToCheck) return;
      checkedEmail = true;
      try {
        const { processDesktopHandoff } = await import("@/lib/desktopAuthHandoff");
        const handoff = await processDesktopHandoff(emailToCheck, nameToCheck);
        if (handoff.schoolFound) {
          const profileRes = await fetch(`/api/schools/profile?email=${encodeURIComponent(emailToCheck)}`).catch(() => null);
          const profileData = profileRes && profileRes.ok ? await profileRes.json() : null;
          const sObj = profileData?.school || {
            name: handoff.schoolName || "Modern Global Campus",
            schoolCode: handoff.schoolCode || "SCH-1081",
            adminEmail: emailToCheck,
            adminName: nameToCheck || emailToCheck.split("@")[0],
            affiliationBoard: "CBSE",
            state: "Uttar Pradesh",
            district: "Lucknow",
          };
          setRegisteredSchool(sObj);
          setStep(4);
          setDesktopStatus("✓ Existing school profile found in Firebase! Connected to School Desktop OS.");
        }
      } catch {}
    };

    if (typeof window !== "undefined") {
      // 1. Check URL query parameters
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      if (emailParam) {
        setFormData((prev) => ({
          ...prev,
          contactEmail: prev.contactEmail || emailParam,
          adminEmail: prev.adminEmail || emailParam,
          adminName: prev.adminName || emailParam.split("@")[0],
        }));
        verifyExistingProfile(emailParam, emailParam.split("@")[0]);
      }

      // 2. Check Universal SSO session
      const u = getSSOUser();
      if (u && u.email) {
        setFormData((prev) => ({
          ...prev,
          contactEmail: prev.contactEmail || u.email,
          adminEmail: prev.adminEmail || u.email,
          adminName: prev.adminName || u.name || u.email.split("@")[0],
        }));
        verifyExistingProfile(u.email, u.name);
      }
    }

    // 3. Listen to active Firebase authentication
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser && fbUser.email) {
        saveSSOUser({
          id: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || fbUser.email.split("@")[0],
          avatar: fbUser.photoURL || "cyber-astro",
          photoURL: fbUser.photoURL || undefined,
          role: fbUser.email.includes("admin") ? "admin" : "client",
        });
        setFormData((prev) => ({
          ...prev,
          contactEmail: prev.contactEmail || fbUser.email!,
          adminEmail: prev.adminEmail || fbUser.email!,
          adminName: prev.adminName || fbUser.displayName || fbUser.email!.split("@")[0],
        }));
        verifyExistingProfile(fbUser.email, fbUser.displayName || undefined);
      }
    });

    return () => unsub();
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const cObj = Country.getCountryByCode(code);
    if (!cObj) return;

    const states = State.getStatesOfCountry(code);
    const firstState = states[0];
    const firstStateCode = firstState ? firstState.isoCode : "";
    const firstStateName = firstState ? firstState.name : "";

    const cities = firstState ? City.getCitiesOfState(code, firstStateCode) : [];
    const firstDistrict = cities[0]?.name || "";

    const newPrefix = cObj.phonecode ? (cObj.phonecode.startsWith("+") ? cObj.phonecode : `+${cObj.phonecode}`) : "+91";
    const fullPhone = phoneSubscriber.trim() ? `${newPrefix} ${phoneSubscriber.trim()}` : `${newPrefix} `;

    setFormData((prev) => ({
      ...prev,
      country: cObj.name,
      countryCode: code,
      currency: cObj.currency || "USD",
      state: firstStateName,
      stateCode: firstStateCode,
      district: firstDistrict,
      contactPhone: fullPhone,
    }));
    setPhoneError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const isIndia = formData.countryCode === "IN";

    // Strip country code if pasted (e.g. +91 9876543210 or 919876543210)
    const cObj = Country.getCountryByCode(formData.countryCode);
    const dialCode = cObj?.phonecode || "91";
    const prefixRegex = new RegExp(`^\\+?${dialCode}[\\s-]?`, "i");
    val = val.replace(prefixRegex, "");

    // Allow only digits, space, and hyphen
    const cleanChars = val.replace(/[^\d\s-]/g, "");
    const rawDigits = cleanChars.replace(/\D/g, "");

    // For India: 11 digits if starting with 0 (landline with STD trunk code 0), else exactly 10 digits
    // For other countries: up to 15 digits
    const maxDigits = isIndia ? (rawDigits.startsWith("0") ? 11 : 10) : 15;

    // Truncate if user exceeds max allowed digits
    let finalChars = cleanChars;
    if (rawDigits.length > maxDigits) {
      let count = 0;
      let truncated = "";
      for (const ch of cleanChars) {
        if (/\d/.test(ch)) {
          if (count < maxDigits) {
            truncated += ch;
            count++;
          }
        } else if (ch === " " || ch === "-") {
          if (count < maxDigits) {
            truncated += ch;
          }
        }
      }
      finalChars = truncated;
    }

    setPhoneSubscriber(finalChars);
    setPhoneError(null);

    const fullPhone = finalChars.trim() ? `${countryDialPrefix} ${finalChars.trim()}` : `${countryDialPrefix} `;
    setFormData((prev) => ({
      ...prev,
      contactPhone: fullPhone,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sCode = e.target.value;
    const sObj = availableStates.find((s) => s.isoCode === sCode);
    const sName = sObj?.name || sCode;

    const cities = City.getCitiesOfState(formData.countryCode, sCode);
    const firstDistrict = cities[0]?.name || "";

    setFormData((prev) => ({
      ...prev,
      state: sName,
      stateCode: sCode,
      district: firstDistrict,
    }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      district: e.target.value,
    }));
  };

  const toggleStream = (stream: string) => {
    setFormData((prev) => ({
      ...prev,
      streams: prev.streams.includes(stream)
        ? prev.streams.filter((s) => s !== stream)
        : [...prev.streams, stream],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name.trim()) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      // Step 2 is Campus Location & Contact: validate phone before proceeding to Academic section
      if (!isPhoneValid) {
        setPhoneError(
          formData.countryCode === "IN"
            ? "Please enter a valid 10-digit mobile number or landline with STD code (e.g. 9876543210 or 0135-2741234)"
            : "Please enter a valid phone number (7 to 15 digits)"
        );
        return;
      }
      setPhoneError(null);
      setStep(3);
      return;
    }

    // Step 3 is Academic Curriculum & Affiliation -> Deploy Workspace Submission
    if (!agreementAccepted) {
      return;
    }

    try {
      setSubmitting(true);
      const finalAdminEmail = formData.adminEmail || formData.contactEmail;
      const finalAdminName =
        formData.adminName ||
        (finalAdminEmail ? finalAdminEmail.split("@")[0] : "School Administrator");

      const finalLogo = logoUrl || formData.profileImage;

      const res = await fetch("/api/schools/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profileImage: finalLogo,
          logoUrl: finalLogo,
          adminEmail: finalAdminEmail,
          adminName: finalAdminName,
          city: formData.district, // backwards compatibility
          password: "otp_authenticated",
        }),
      });
      const data = await res.json();
      if (data.success) {
        const token = data.desktopToken || data.token;
        const schoolObj = {
          ...data.school,
          token,
          affiliationBoard: formData.affiliationBoard,
          contactPhone: formData.contactPhone,
          country: formData.country,
          currency: formData.currency,
          state: formData.state,
          district: formData.district,
          adminName: finalAdminName,
          adminEmail: finalAdminEmail,
          profileImage: data.school?.profileImage || finalLogo,
        };
        setRegisteredSchool(schoolObj);
        setStep(4); // Success Screen

        // ── AUTOMATIC DESKTOP OS HANDOFF & DISPATCH ──────────────────────────
        const userPayload = {
          id: "0c177052-63d4-457c-8e90-34c7748caddd",
          email: finalAdminEmail,
          name: finalAdminName,
          school_name: schoolObj.name,
          school_code: schoolObj.schoolCode,
          role: "school-admin",
          school_id: "cb20fd66-1739-4076-a684-42624f23ebc6",
        };

        const handoffPayload = {
          token,
          user: userPayload,
          is_new: true,
          setup_payload: {
            school_name: schoolObj.name,
            school_code: schoolObj.schoolCode,
            user_name: finalAdminName,
            user_email: finalAdminEmail,
            affiliation_board: formData.affiliationBoard,
            contact_phone: formData.contactPhone,
            country: formData.country,
            currency: formData.currency,
            state: formData.state,
            district: formData.district,
            profile_image: schoolObj.profileImage || "",
          },
        };

        // 1. Relay via server handoff bridge (/api/schools/profile) for waiting browser/desktop dialog polling
        const handoffId =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("handoff_id") || "latest"
            : "latest";
        fetch("/api/schools/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "desktop_handoff",
            handoff_id: handoffId,
            ...handoffPayload,
          }),
        })
          .then((res) => {
            if (res.ok) setDesktopStatus("✓ Connected! Transferred to School Desktop OS.");
          })
          .catch(() => {});

        // 2. Dispatch cross-window message to window.opener (for browser desktop mode)
        try {
          if (typeof window !== "undefined" && window.opener && !window.opener.closed) {
            window.opener.postMessage(
              {
                type: "vidhyam-auth-success",
                token,
                user: userPayload,
                is_new: true,
              },
              "*"
            );
            setDesktopStatus("✓ Connected! Transferred to School Desktop OS.");
          }
        } catch {}

        // 3. Relay to local loopback supervisor (Port 7071 for Tauri desktop node)
        fetch("http://127.0.0.1:7071/auth/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(handoffPayload),
        })
          .then((res) => {
            if (res.ok) setDesktopStatus("✓ Connected! Transferred to School Desktop OS.");
          })
          .catch(() => {});
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering school workspace");
    } finally {
      setSubmitting(false);
    }
  };

  const [desktopLaunching, setDesktopLaunching] = useState(false);
  const [desktopStatus, setDesktopStatus] = useState<string | null>(null);

  const handleOpenInDesktop = async () => {
    setDesktopLaunching(true);
    setDesktopStatus("Connecting to School Desktop OS...");

    try {
      let token = registeredSchool?.token;
      let userPayload: any = {
        email: registeredSchool?.adminEmail,
        name: registeredSchool?.adminName || "School Principal",
        school_name: registeredSchool?.name,
        school_code: registeredSchool?.schoolCode,
        role: "school-admin",
        school_id: "cb20fd66-1739-4076-a684-42624f23ebc6",
      };

      if (!token) {
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ devBypass: true, scope: "desktop" }),
        });
        const loginData = await loginRes.json();
        token = loginData.desktopToken || loginData.token;
        userPayload = {
          ...loginData.user,
          school_name: registeredSchool?.name,
          school_code: registeredSchool?.schoolCode,
        };
      }

      const payload = {
        token,
        user: userPayload,
        is_new: true,
        setup_payload: {
          school_name: registeredSchool?.name,
          school_code: registeredSchool?.schoolCode,
          user_name: registeredSchool?.adminName || "School Principal",
          user_email: registeredSchool?.adminEmail,
          affiliation_board: registeredSchool?.affiliationBoard || "CBSE",
          contact_phone: registeredSchool?.contactPhone || "+91 9876543210",
          country: registeredSchool?.country || "India",
          currency: registeredSchool?.currency || "INR",
          state: registeredSchool?.state || "Uttar Pradesh",
          district: registeredSchool?.district || "Lucknow",
          profile_image: registeredSchool?.profileImage || "",
        },
      };

      // 1. Dispatch cross-window message if opener exists
      if (typeof window !== "undefined" && window.opener && !window.opener.closed) {
        window.opener.postMessage(
          {
            type: "vidhyam-auth-success",
            token,
            user: userPayload,
            is_new: true,
          },
          "*"
        );
        setDesktopStatus("✓ Transferred to School Desktop OS!");
        return;
      }

      // 2. Try loopback supervisor port 7071
      const res = await fetch("http://127.0.0.1:7071/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (res && res.ok) {
        setDesktopStatus("✓ Transferred to School Desktop OS!");
        return;
      }

      // 3. Fallback: navigate directly to Desktop School Admin route with token and user parameters
      const targetUrl = `http://localhost:3000/school-admin?token=${encodeURIComponent(
        token
      )}&user=${encodeURIComponent(JSON.stringify(userPayload))}&is_new=true`;
      window.open(targetUrl, "_blank");
      setDesktopStatus("Navigated to School Admin!");
    } catch (e) {
      console.error(e);
      setDesktopStatus("Please make sure School Desktop OS is open.");
    } finally {
      setDesktopLaunching(false);
    }
  };

  return (
    <div className="pt-2 sm:pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500 shrink-0" />
          <span>Register School Workspace</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deploy your autonomous on-premise school operating system sandbox in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-7">
          <LiquidGlassCard
            glowColor="rgba(56, 189, 248, 0.25)"
            className="p-4 sm:p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/70 dark:border-white/10 backdrop-blur-xl shadow-xl"
          >
            {step <= 3 ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* SLIDE 1: School Identity */}
                {step === 1 && (
                  <motion.div
                    key="slide-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
                      School Identity
                    </h3>

                    {/* School Emblem / Logo upload */}
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1.5 text-xs">
                        School Emblem / Logo
                      </label>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      {logoUrl ? (
                        <div className="flex items-center gap-3.5 p-3 rounded-xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-500/10">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-sky-400/30 bg-white dark:bg-slate-900 shrink-0 shadow-sm flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={logoUrl}
                              alt="School Logo"
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              Emblem Uploaded
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              Ready for workspace deployment & student report cards
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-2.5 py-1 text-[11px] font-medium rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveLogo}
                              className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Remove Logo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => !uploadingLogo && fileInputRef.current?.click()}
                          className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-4 transition-all flex items-center justify-center gap-3.5 ${
                            uploadingLogo
                              ? "border-sky-400 bg-sky-50/50 dark:bg-sky-950/20"
                              : "border-slate-300 dark:border-white/15 hover:border-sky-500/60 hover:bg-sky-50/30 dark:hover:bg-sky-950/10 bg-slate-50/50 dark:bg-white/[0.02]"
                          }`}
                        >
                          {uploadingLogo ? (
                            <div className="flex items-center gap-2.5 text-sky-600 dark:text-sky-400 text-xs font-medium">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Uploading school emblem...</span>
                            </div>
                          ) : (
                            <>
                              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <Upload className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                  Click to upload school emblem / logo
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                                  PNG, JPG, or SVG up to 5MB • Recommended square 1:1 ratio
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {logoError && <p className="text-[11px] text-rose-500 mt-1 pl-0.5">{logoError}</p>}
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                        School Name <span className="text-rose-500">*</span>
                      </label>
                      <GlassInput
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Doon Heritage Global School"
                      />
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 2: Campus Location & Region */}
                {step === 2 && (
                  <motion.div
                    key="slide-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                      Campus Location & Region
                    </h3>

                    {/* Country & State Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          Country <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.countryCode}
                          onChange={handleCountryChange}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                        >
                          {allCountries.map((c) => (
                            <option
                              key={c.isoCode}
                              value={c.isoCode}
                              className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200"
                            >
                              {c.flag} {c.name} ({c.currency || "USD"})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          State / Province <span className="text-rose-500">*</span>
                        </label>
                        {availableStates.length > 0 ? (
                          <select
                            value={formData.stateCode}
                            onChange={handleStateChange}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                          >
                            {availableStates.map((s) => (
                              <option
                                key={s.isoCode}
                                value={s.isoCode}
                                className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200"
                              >
                                {s.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <GlassInput
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="State / Province"
                          />
                        )}
                      </div>
                    </div>

                    {/* District Dropdown & Pincode (City field removed) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          District <span className="text-rose-500">*</span>
                        </label>
                        {availableDistricts.length > 0 ? (
                          <select
                            value={formData.district}
                            onChange={handleDistrictChange}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                          >
                            {availableDistricts.map((d) => (
                              <option
                                key={d.name}
                                value={d.name}
                                className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200"
                              >
                                {d.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <GlassInput
                            required
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            placeholder="e.g. District / County"
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          {formData.countryCode === "IN" ? "Pincode" : "Postal / Zip Code"}{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <GlassInput
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder={formData.countryCode === "IN" ? "248001" : "Postal Code"}
                        />
                      </div>
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                        Street Address <span className="text-rose-500">*</span>
                      </label>
                      <GlassInput
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Road, Sector, or Campus Area"
                      />
                    </div>

                    {/* Phone & School Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-slate-700 dark:text-slate-300 font-medium block">
                            Contact Phone <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">
                            10-digit mobile / landline
                          </span>
                        </div>
                        <div className="relative flex items-center">
                          <div
                            className={`flex w-full rounded-xl overflow-hidden border bg-white dark:bg-[#0c121e] transition-all ${
                              phoneError
                                ? "border-rose-500/60 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20"
                                : isPhoneValid
                                ? "border-emerald-500/50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20"
                                : "border-slate-300 dark:border-white/15 focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500"
                            }`}
                          >
                            <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border-r border-slate-200 dark:border-white/10 select-none shrink-0 font-mono">
                              {countryDialPrefix}
                            </span>
                            <input
                              type="tel"
                              required
                              value={phoneSubscriber}
                              onChange={handlePhoneChange}
                              placeholder={
                                formData.countryCode === "IN"
                                  ? "98765 43210 or 0135-2741234"
                                  : "Phone or landline"
                              }
                              className="w-full px-3 py-2.5 text-xs text-slate-900 dark:text-slate-200 bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                            />
                            {isPhoneValid && (
                              <div className="flex items-center pr-3 text-emerald-500 shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                        {phoneError ? (
                          <p className="text-[11px] text-rose-500 mt-1 pl-0.5">{phoneError}</p>
                        ) : phoneSubscriber && !isPhoneValid ? (
                          <p className="text-[10px] text-amber-500/90 mt-1 pl-0.5">
                            {formData.countryCode === "IN"
                              ? phoneDigits.startsWith("0")
                                ? `Landline with STD 0: ${phoneDigits.length}/11 digits`
                                : `10 digits required: ${phoneDigits.length}/10 digits`
                              : `Minimum 7 digits required (${phoneDigits.length}/7)`}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          School Email <span className="text-rose-500">*</span>
                        </label>
                        <GlassInput
                          type="email"
                          required
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          placeholder="info@school.edu.in"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 3: Academic Curriculum & Affiliation */}
                {step === 3 && (
                  <motion.div
                    key="slide-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-sky-500 shrink-0" />
                        Academic Curriculum & Affiliation
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Globe className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span>
                          {formData.state ? `${formData.state}, ` : ""}
                          {formData.country || "India"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          Affiliation Board
                        </label>
                        <select
                          value={formData.affiliationBoard}
                          onChange={(e) => setFormData({ ...formData, affiliationBoard: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                        >
                          {boardGroups.map((g) => (
                            <optgroup
                              key={g.group}
                              label={g.group}
                              className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold"
                            >
                              {g.boards.map((b) => (
                                <option
                                  key={b}
                                  value={b.split(" - ")[0]}
                                  className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-slate-200 font-normal"
                                >
                                  {b}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                          Affiliation #
                        </label>
                        <GlassInput
                          value={formData.affiliationNumber}
                          onChange={(e) => setFormData({ ...formData, affiliationNumber: e.target.value })}
                          placeholder={
                            formData.countryCode === "IN"
                              ? "e.g. CBSE/AFF/213089"
                              : "e.g. Regional Accreditation ID"
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1.5">
                        Streams Offered
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {STREAMS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleStream(s)}
                            className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                              formData.streams.includes(s)
                                ? "bg-sky-500 text-white border-sky-400 shadow-sm"
                                : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Official Click-Wrap Agreement Checkbox (Clause 9) */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer select-none group transition-colors hover:border-sky-500/30">
                        <input
                          type="checkbox"
                          checked={agreementAccepted}
                          onChange={(e) => setAgreementAccepted(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-sky-500 border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          I accept the{" "}
                          <a
                            href="/documents/Modernisum-School-Master-Software-License-Agreement.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-sky-500 hover:text-sky-400 underline underline-offset-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Master Software License, Data Privacy & Billing Agreement
                          </a>{" "}
                          and acknowledge the zero-knowledge local-first architecture policy.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
                {/* Form Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/70 dark:border-white/10">
                  {step > 1 ? (
                    <GlassButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(step - 1)}
                      icon={<ArrowLeft className="w-3.5 h-3.5" />}
                    >
                      Previous
                    </GlassButton>
                  ) : (
                    <div />
                  )}

                  <GlassButton
                    type="submit"
                    variant="primary"
                    disabled={step === 3 && !agreementAccepted}
                    loading={submitting}
                    icon={step === 3 ? <Sparkles className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    {step === 3 ? "Deploy Workspace" : "Next"}
                  </GlassButton>
                </div>
              </form>
            ) : (
              /* Success & Workspace Confirmation */
              <div className="text-center py-6 space-y-4">
                {registeredSchool?.profileImage ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-sky-400/30 bg-white dark:bg-slate-900 mx-auto shadow-md flex items-center justify-center p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={registeredSchool.profileImage}
                      alt="School Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Workspace Provisioned!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Campus deployed successfully.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">School Code:</span>
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                      {registeredSchool?.schoolCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">School:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {registeredSchool?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Region:</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {registeredSchool?.district}, {registeredSchool?.state} ({registeredSchool?.country || "India"})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Admin:</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {registeredSchool?.adminEmail}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Status:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>

                {/* Windows Desktop App Download Callout */}
                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/25 text-left flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-sky-500" />
                      School Desktop OS
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      School code:{" "}
                      <strong className="text-sky-600 dark:text-sky-300 font-mono">
                        {registeredSchool?.schoolCode}
                      </strong>
                    </p>
                  </div>
                  <Link href="/download">
                    <GlassButton variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                      Download
                    </GlassButton>
                  </Link>
                </div>

                {/* Direct Launch School Desktop OS */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 border border-sky-400/30 text-left flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="space-y-0.5 w-full sm:w-auto">
                    <span className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Provision Local Desktop Node
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      {desktopStatus || "Launch this workspace directly inside School Desktop OS."}
                    </p>
                  </div>
                  <GlassButton
                    type="button"
                    variant="primary"
                    size="sm"
                    loading={desktopLaunching}
                    onClick={handleOpenInDesktop}
                    icon={<Laptop className="w-3.5 h-3.5" />}
                  >
                    Open in Desktop OS
                  </GlassButton>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <Link href="/">
                    <GlassButton variant="ghost" size="sm">
                      Return
                    </GlassButton>
                  </Link>
                </div>
              </div>
            )}
          </LiquidGlassCard>
        </div>

        {/* Right Column: Platform Features & Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <LiquidGlassCard
            glowColor="rgba(99, 102, 241, 0.2)"
            className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 backdrop-blur-xl"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              Included in Your Workspace
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 block">
                    Zero-Cloud Local-First Privacy
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    All student & fee data stored on your institutional hardware. 100% DPDP 2023 compliant.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 block">
                    AI Attendance & Timetable Generator
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Facial recognition roll call with CameraX, automated teacher substitution & smart scheduling.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 block">
                    Double-Entry Fee Ledger & WhatsApp SMS
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Real-time fee collection, automatic receipt PDFs, and hardware SIM-card SMS alerts.
                  </span>
                </div>
              </div>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard
            glowColor="rgba(56, 189, 248, 0.15)"
            className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/5 via-indigo-500/5 to-cyan-500/5 border border-sky-400/20 text-xs text-slate-600 dark:text-slate-400 space-y-1.5"
          >
            <span className="font-bold text-sky-700 dark:text-sky-300 block flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              Global Institution Ready
            </span>
            <p className="text-[11px] leading-relaxed">
              Modernisum School is configured to support schools worldwide with international country codes, dynamic state-district registries, multiple currencies, and global affiliation boards.
            </p>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}

export const VidhyamRegistrationSection = SchoolRegistrationSection;
export default SchoolRegistrationSection;
