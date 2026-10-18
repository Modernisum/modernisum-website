"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0" 
      aria-hidden="true"
      style={{
        transform: "translate3d(0, 0, 0)",
        contain: "strict",
      }}
    >
      {/* 
        120 FPS Compositor-Optimized Static Ambient Radial Gradient Mesh (Zero Blur Repaints)
        Dark Mode: Cyan (#00f2fe), Purple (#7928ca), Emerald (#10b981), Solar Amber (#f59e0b)
      */}
      <div 
        className="hidden dark:block absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 10%, rgba(0, 242, 254, 0.16) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(121, 40, 202, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 10% 65%, rgba(16, 185, 129, 0.12) 0%, transparent 42%),
            radial-gradient(circle at 80% 85%, rgba(245, 158, 11, 0.10) 0%, transparent 45%)
          `,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* 
        Light Mode: Sky Blue (#0284c7), Violet (#7c3aed), Emerald (#059669), Warm Amber (#d97706)
      */}
      <div 
        className="block dark:hidden absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 10%, rgba(2, 132, 199, 0.14) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(124, 58, 237, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 10% 65%, rgba(5, 150, 105, 0.10) 0%, transparent 42%),
            radial-gradient(circle at 80% 85%, rgba(217, 119, 6, 0.08) 0%, transparent 45%)
          `,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Subtle Grid Texture Overlay for Dark Mode */}
      <div 
        className="hidden dark:block absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Subtle Grid Texture Overlay for Light Mode */}
      <div 
        className="block dark:hidden absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.2) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </div>
  );
}
