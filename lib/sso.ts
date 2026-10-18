"use client";

/**
 * Universal Modernisum Single Sign-On (SSO) Engine
 * Seamlessly synchronizes authentication sessions across:
 * - modernisum.com (Main Company / Parent Studio)
 * - school.modernisum.com (Vidhyam School Platform)
 * - *.modernisum.com (All Ecosystem Subdomains)
 * - localhost / development environments
 */

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  photoURL?: string;
  schoolId?: string;
  accountType?: string;
}

const SSO_COOKIE_NAME = "modernisum_sso_session";
const LOCAL_STORAGE_KEY = "modernisum_user";

/**
 * Safely encodes a string into Base64 UTF-8 for cookie transportation
 */
function encodeBase64Utf8(str: string): string {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  } catch {
    return encodeURIComponent(str);
  }
}

/**
 * Safely decodes a Base64 UTF-8 string from cookie
 */
function decodeBase64Utf8(str: string): string {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), (c: string) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  } catch {
    try {
      return decodeURIComponent(str);
    } catch {
      return str;
    }
  }
}

/**
 * Resolves the cookie domain to enable cross-subdomain sharing
 * Returns ".modernisum.com" on production/staging, or "" on localhost
 */
export function getSSODomain(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname.toLowerCase();
  if (host === "modernisum.com" || host.endsWith(".modernisum.com")) {
    return ".modernisum.com";
  }
  return "";
}

/**
 * Retrieves a cookie value by name from document.cookie
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? match[3] : null;
}

/**
 * Ensures the shared cross-subdomain cookie exists if user is logged into localStorage
 */
function ensureSSOCookie(user: AuthUser): void {
  if (typeof window === "undefined" || !user?.email) return;
  const existing = getCookie(SSO_COOKIE_NAME);
  if (!existing) {
    const jsonStr = JSON.stringify(user);
    const encoded = encodeBase64Utf8(jsonStr);
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    const domain = getSSODomain();
    const domainAttr = domain ? `; domain=${domain}` : "";
    const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${SSO_COOKIE_NAME}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax${domainAttr}${secureAttr}`;
  }
}

/**
 * Retrieves the active SSO User from:
 * 1. URL handoff parameter (?sso_user=...)
 * 2. localStorage ("modernisum_user")
 * 3. Shared Cross-Subdomain Cookie ("modernisum_sso_session" on .modernisum.com)
 */
export function getSSOUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  // 1. Check URL sso handoff parameter (for immediate cross-origin redirect handoff)
  try {
    const params = new URLSearchParams(window.location.search);
    const ssoParam = params.get("sso_user");
    if (ssoParam) {
      const decodedJson = decodeBase64Utf8(ssoParam);
      const user = JSON.parse(decodedJson);
      if (user && user.email) {
        saveSSOUser(user);
        // Clean URL parameter without reloading
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("sso_user");
        window.history.replaceState({}, "", cleanUrl.pathname + (cleanUrl.search ? cleanUrl.search : ""));
        return user;
      }
    }
  } catch (e) {
    console.warn("SSO URL parameter parse warning:", e);
  }

  // 2. Check localStorage on current origin
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const u = JSON.parse(cached);
      if (u?.email) {
        ensureSSOCookie(u);
        return u;
      }
    }
  } catch {}

  // 3. Check shared cookie across modernisum.com and school.modernisum.com
  try {
    const rawCookie = getCookie(SSO_COOKIE_NAME);
    if (rawCookie) {
      const decodedJson = decodeBase64Utf8(rawCookie);
      const user = JSON.parse(decodedJson);
      if (user && user.email) {
        // Hydrate localStorage on this origin
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        return user;
      }
    }
  } catch (e) {
    console.warn("SSO cookie parse warning:", e);
  }

  return null;
}

/**
 * Saves authenticated user session universally:
 * - Persists to local origin localStorage
 * - Writes to shared domain cookie (.modernisum.com) valid across all subdomains
 * - Dispatches 'modernisum_auth_change' event for instant reactive UI updates
 */
export function saveSSOUser(user: AuthUser): void {
  if (typeof window === "undefined" || !user?.email) return;

  try {
    // 1. Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));

    // 2. Save to shared cookie (.modernisum.com)
    const jsonStr = JSON.stringify(user);
    const encoded = encodeBase64Utf8(jsonStr);
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    const domain = getSSODomain();
    const domainAttr = domain ? `; domain=${domain}` : "";
    const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${SSO_COOKIE_NAME}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax${domainAttr}${secureAttr}`;

    // Also mirror to modernisum_user cookie as secondary fallback
    document.cookie = `modernisum_user=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax${domainAttr}${secureAttr}`;

    // 3. Broadcast auth change
    window.dispatchEvent(new CustomEvent("modernisum_auth_change", { detail: user }));
  } catch (e) {
    console.warn("Failed to save SSO user:", e);
  }
}

/**
 * Clears user session globally from:
 * - Current origin localStorage
 * - Shared .modernisum.com cookies
 * - Local cookies
 * - Dispatches 'modernisum_auth_change' event
 */
export function clearSSOUser(): void {
  if (typeof window === "undefined") return;

  try {
    // 1. Remove localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    // 2. Clear cookies
    const domain = getSSODomain();
    if (domain) {
      document.cookie = `${SSO_COOKIE_NAME}=; domain=${domain}; path=/; max-age=0; SameSite=Lax`;
      document.cookie = `modernisum_user=; domain=${domain}; path=/; max-age=0; SameSite=Lax`;
    }
    document.cookie = `${SSO_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `modernisum_user=; path=/; max-age=0; SameSite=Lax`;

    // 3. Broadcast auth change
    window.dispatchEvent(new CustomEvent("modernisum_auth_change", { detail: null }));
  } catch (e) {
    console.warn("Failed to clear SSO user:", e);
  }
}
