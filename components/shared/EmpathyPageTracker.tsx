"use client";

import { useEffect, useRef } from "react";
import { sendEmpathySignal } from "@/lib/empathy-telemetry";
import { useLanguage } from "@/lib/LanguageContext";

export function EmpathyPageTracker({
  product = "school",
  pageName = "ModSchool Overview",
}: {
  product?: string;
  pageName?: string;
}) {
  const { isHindi } = useLanguage();
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Send initial page dwell intent after 10 seconds of genuine engagement
    const timer = setTimeout(() => {
      sendEmpathySignal({
        product,
        intentType: "page_dwell",
        feature: pageName,
        dwellSeconds: 10,
        language: isHindi ? "hi" : "en",
      });
    }, 10000);

    return () => {
      clearTimeout(timer);
      const elapsed = (Date.now() - startTime.current) / 1000;
      if (elapsed >= 15) {
        sendEmpathySignal({
          product,
          intentType: "page_dwell",
          feature: `${pageName}_exit`,
          dwellSeconds: Math.round(elapsed),
          language: isHindi ? "hi" : "en",
        });
      }
    };
  }, [product, pageName, isHindi]);

  return null;
}
