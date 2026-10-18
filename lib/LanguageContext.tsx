"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SiteLanguage = "en" | "hi";

interface LanguageContextType {
  language: SiteLanguage;
  setLanguage: (lang: SiteLanguage) => void;
  toggleLanguage: () => void;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  isHindi: false,
});

const STORAGE_KEY = "modernisum_site_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default strictly to English ("en"). Modern browsers provide built-in translation.
  const [language, setLanguageState] = useState<SiteLanguage>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "hi" || urlLang === "en") {
        setLanguageState(urlLang);
        document.documentElement.setAttribute("lang", urlLang);
        return;
      }
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as SiteLanguage;
        if (stored === "hi" || stored === "en") {
          setLanguageState(stored);
          document.documentElement.setAttribute("lang", stored);
          return;
        }
      } catch {
        // Ignore
      }
      document.documentElement.setAttribute("lang", "en");
    }
  }, []);

  const setLanguage = (lang: SiteLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
    // Update html lang attribute dynamically
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang === "hi" ? "hi" : "en");
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    isHindi: language === "hi",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
