"use client";

/**
 * Non-Intrusive Guest Empathy Telemetry Engine
 * 
 * Philosophical Invariant ("अतिथि देवो भव"):
 * Understands visitor needs and institutional pain points without demanding intrusive forms
 * or capturing any Personally Identifiable Information (PII).
 * 
 * Captures purely technical platform affinity, problem-area focus, and dwell depth.
 */

export interface EmpathySignalPayload {
  product: string; // "school" | "farmer" | "studio" | "clerk-copilot"
  intentType: "page_dwell" | "feature_inspect" | "download_intent" | "calculator_interact" | "family_inquiry";
  feature?: string; // e.g. "biometric_attendance", "fee_deficit_ledger", "timetable_matrix", "cbse_loc"
  platformOs?: string; // "Windows", "Linux", "Android", "macOS", "iOS", "Unknown"
  deviceType?: "Desktop" | "Mobile" | "Tablet";
  language?: "hi" | "en";
  dwellSeconds?: number;
  metadata?: Record<string, any>;
}

// Transient session ID stored only in sessionStorage (never persisted across browser closes, 0 cookies)
function getTransientGuestId(): string {
  if (typeof window === "undefined") return "guest_ssr";
  try {
    let id = window.sessionStorage.getItem("mod_guest_session_id");
    if (!id) {
      id = `guest_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
      window.sessionStorage.setItem("mod_guest_session_id", id);
    }
    return id;
  } catch {
    return `guest_${Date.now()}`;
  }
}

export function detectClientPlatform(): { os: string; device: "Desktop" | "Mobile" | "Tablet" } {
  if (typeof window === "undefined") return { os: "Unknown", device: "Desktop" };

  const ua = window.navigator.userAgent || "";
  let os = "Unknown";
  let device: "Desktop" | "Mobile" | "Tablet" = "Desktop";

  if (/windows/i.test(ua)) os = "Windows";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  if (/tablet|ipad/i.test(ua)) device = "Tablet";
  else if (/mobile|android|iphone/i.test(ua)) device = "Mobile";

  return { os, device };
}

/**
 * Dispatches an anonymous, non-intrusive empathy beacon to the server
 */
export function sendEmpathySignal(payload: Partial<EmpathySignalPayload>) {
  if (typeof window === "undefined") return;

  try {
    const { os, device } = detectClientPlatform();
    const guestId = getTransientGuestId();
    const currentLang = document.documentElement.lang?.startsWith("hi") ? "hi" : "en";

    const fullPayload = {
      guestId,
      product: payload.product || "school",
      intentType: payload.intentType || "page_dwell",
      feature: payload.feature || "general_overview",
      platformOs: payload.platformOs || os,
      deviceType: payload.deviceType || device,
      language: payload.language || currentLang,
      dwellSeconds: payload.dwellSeconds || 0,
      timestamp: new Date().toISOString(),
      metadata: payload.metadata || {},
    };

    const blob = new Blob([JSON.stringify(fullPayload)], { type: "application/json" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/telemetry/empathy", blob);
    } else {
      fetch("/api/telemetry/empathy", {
        method: "POST",
        body: JSON.stringify(fullPayload),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Fail silently to never degrade user experience
  }
}
