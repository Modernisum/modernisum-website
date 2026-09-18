"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Primary Optical Cyan Orb */}
      <div 
        className="absolute -top-[15%] left-[10%] w-[580px] h-[580px] rounded-full animate-orb-1 opacity-20 dark:opacity-35"
        style={{
          background: "radial-gradient(circle, #00f2fe 0%, rgba(0, 242, 254, 0) 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Secondary Electric Purple Orb */}
      <div 
        className="absolute top-[30%] -right-[10%] w-[620px] h-[620px] rounded-full animate-orb-2 opacity-15 dark:opacity-30"
        style={{
          background: "radial-gradient(circle, #7928ca 0%, rgba(121, 40, 202, 0) 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Tertiary Neon Emerald Orb */}
      <div 
        className="absolute top-[65%] left-[5%] w-[480px] h-[480px] rounded-full animate-orb-3 opacity-15 dark:opacity-25"
        style={{
          background: "radial-gradient(circle, #10b981 0%, rgba(16, 185, 129, 0) 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Solar Amber Modernisum Glow */}
      <div 
        className="absolute -bottom-[10%] right-[25%] w-[520px] h-[520px] rounded-full animate-orb-1 opacity-12 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, rgba(245, 158, 11, 0) 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Subtle Grid Texture Overlay for Dark Mode */}
      <div 
        className="hidden dark:block absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle Grid Texture Overlay for Light Mode */}
      <div 
        className="block dark:hidden absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.2) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
