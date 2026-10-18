"use client";

import React from "react";

export function Ceo3DCartoonWorkforce() {
  return (
    <div className="relative w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto select-none">
      {/* Ambient Radial Backlights */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[520px] h-[360px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-emerald-500/15 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* 3D CARTOON SVG SCENE: CEO IN RECLINER & FAST AUTONOMOUS AGENTS */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-950 to-slate-900 shadow-2xl overflow-hidden flex items-center justify-center p-2">
          
          <svg
            viewBox="0 0 680 390"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradients for 3D Claymorphic Characters */}
              <linearGradient id="ceoSkin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd8b3" />
                <stop offset="100%" stopColor="#f39c6b" />
              </linearGradient>

              <linearGradient id="ceoSuit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <linearGradient id="ceoChair" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>

              <linearGradient id="botCyan" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>

              <linearGradient id="botEmerald" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="botPurple" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>

              <linearGradient id="holoGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Perspective Grid Floor */}
            <g opacity="0.25">
              <line x1="60" y1="360" x2="620" y2="360" stroke="#38bdf8" strokeWidth="1" />
              <line x1="120" y1="330" x2="560" y2="330" stroke="#38bdf8" strokeWidth="1" />
              <line x1="180" y1="305" x2="500" y2="305" stroke="#38bdf8" strokeWidth="1" />
              
              <line x1="220" y1="305" x2="100" y2="385" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="340" y1="305" x2="340" y2="385" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="460" y1="305" x2="580" y2="385" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
            </g>

            {/* Dynamic Data Conduits (Pulsing Lines from Agents to CEO Hub) */}
            <path
              d="M 140 260 Q 220 200 310 230"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
              opacity="0.85"
            />
            <path
              d="M 540 250 Q 460 190 370 230"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
              opacity="0.85"
            />

            {/* ============================================================== */}
            {/* 1. CENTER: THE RELAXED CEO IN 3D ERGONOMIC LOUNGE CHAIR */}
            {/* ============================================================== */}
            <g transform="translate(260, 95)">
              
              {/* Executive Chair Base & Backrest */}
              <ellipse cx="80" cy="235" rx="55" ry="12" fill="#020617" opacity="0.6" filter="url(#softGlow)" />
              {/* Hydraulic Stand & Wheels */}
              <path d="M 80 215 L 80 235 M 50 235 L 110 235" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="236" r="3" fill="#64748b" />
              <circle cx="110" cy="236" r="3" fill="#64748b" />

              {/* Plush Ergonomic Recliner (Tilted Back in Rest Mode) */}
              <g transform="rotate(-6, 80, 160)">
                {/* Backrest with 3D Depth */}
                <rect x="42" y="55" width="76" height="110" rx="20" fill="url(#ceoChair)" stroke="#06b6d4" strokeWidth="2" />
                <rect x="52" y="65" width="56" height="35" rx="10" fill="#1e293b" opacity="0.8" />
                <rect x="52" y="108" width="56" height="45" rx="10" fill="#1e293b" opacity="0.8" />
                {/* Headrest Cushion */}
                <rect x="48" y="28" width="64" height="30" rx="12" fill="url(#ceoChair)" stroke="#06b6d4" strokeWidth="1.5" />
              </g>

              {/* CEO Character Body (Relaxed, Leaning Back) */}
              {/* Torso in Sharp Executive Blazer */}
              <path
                d="M 58 115 C 58 95 102 95 102 115 L 108 175 C 108 185 52 185 52 175 Z"
                fill="url(#ceoSuit)"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              {/* Crisp Inner Shirt & Cyan Tie */}
              <path d="M 72 105 L 80 125 L 88 105 Z" fill="#ffffff" />
              <path d="M 78 120 L 82 120 L 84 150 L 80 156 L 76 150 Z" fill="#06b6d4" />

              {/* Legs (Crossed at Ankle in Pure Relaxation) */}
              <path d="M 64 175 L 60 215 L 95 215" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
              <path d="M 96 175 L 102 205 L 125 210" stroke="#0f172a" strokeWidth="11" strokeLinecap="round" />
              {/* White Minimalist Executive Sneakers */}
              <rect x="88" y="210" width="22" height="10" rx="5" fill="#f8fafc" />
              <rect x="120" y="206" width="22" height="10" rx="5" fill="#f8fafc" />

              {/* Left Arm Resting on Chair Armrest */}
              <path d="M 54 118 L 38 145 L 45 160" stroke="url(#ceoSuit)" strokeWidth="10" strokeLinecap="round" />

              {/* Right Arm: Holding Steaming Coffee Mug */}
              <path d="M 106 118 L 122 145 L 115 155" stroke="url(#ceoSuit)" strokeWidth="10" strokeLinecap="round" />
              {/* 3D Coffee Mug */}
              <g transform="translate(112, 142)">
                <rect x="0" y="2" width="16" height="18" rx="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                <path d="M 16 6 C 20 6 20 14 16 14" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                {/* Animated Rising Steam */}
                <path d="M 4 -2 Q 7 -7 4 -12" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
                <path d="M 10 -3 Q 13 -8 10 -13" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
              </g>

              {/* 3D Cartoon Head (Tilted slightly up, smiling, chill expression) */}
              <ellipse cx="80" cy="74" rx="20" ry="22" fill="url(#ceoSkin)" />
              {/* Modern Coiffed Hair */}
              <path d="M 62 70 C 60 50 82 46 98 52 C 104 56 102 68 98 72 C 94 56 68 56 62 70 Z" fill="#475569" />
              {/* Cool Executive Sunglasses / Glasses */}
              <rect x="68" y="68" width="11" height="8" rx="2" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
              <rect x="81" y="68" width="11" height="8" rx="2" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
              <line x1="79" y1="71" x2="81" y2="71" stroke="#38bdf8" strokeWidth="1" />
              {/* Confident Smile */}
              <path d="M 75 83 Q 80 88 85 83" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Floating Golden Crown above Head */}
              <g transform="translate(68, 20)">
                <path d="M 0 16 L 4 4 L 12 11 L 20 4 L 24 16 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                <circle cx="4" cy="4" r="1.5" fill="#ffffff" />
                <circle cx="12" cy="11" r="1.5" fill="#ffffff" />
                <circle cx="20" cy="4" r="1.5" fill="#ffffff" />
              </g>

              {/* Floating Thought / Status Bubble: "Core Business ☕" */}
              <g transform="translate(115, 30)">
                <rect x="0" y="0" width="115" height="32" rx="10" fill="#090d16" stroke="#fbbf24" strokeWidth="1.5" filter="url(#softGlow)" />
                <text x="12" y="20" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  CORE BIZ ONLY ☕
                </text>
              </g>
            </g>


            {/* ============================================================== */}
            {/* 2. LEFT SIDE: FAST-WORKING AI FINANCE & LEDGER BOT */}
            {/* ============================================================== */}
            <g transform="translate(60, 180)">
              {/* Bot Shadow */}
              <ellipse cx="60" cy="165" rx="35" ry="8" fill="#020617" opacity="0.6" />

              {/* Bot Body (3D Cylinder / Capsule) */}
              <rect x="36" y="70" width="48" height="60" rx="18" fill="url(#botEmerald)" stroke="#34d399" strokeWidth="2" />
              {/* Glass Visor / Eye */}
              <rect x="44" y="80" width="32" height="14" rx="7" fill="#022c22" stroke="#6ee7b7" strokeWidth="1.5" />
              <circle cx="54" cy="87" r="3" fill="#34d399" className="animate-ping" />
              <circle cx="66" cy="87" r="3" fill="#34d399" />

              {/* Floating Holographic Keyboard with Flying Invoices */}
              <g transform="translate(10, 125)">
                <polygon points="0,15 100,5 110,25 10,35" fill="url(#holoGlow)" stroke="#10b981" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="90" y2="13" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="18" y1="28" x2="88" y2="21" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="3 3" />
              </g>

              {/* Fast Typing Robot Arms */}
              <path d="M 36 95 L 18 120 L 32 135" stroke="#34d399" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 84 95 L 100 115 L 85 133" stroke="#34d399" strokeWidth="6" strokeLinecap="round" fill="none" />

              {/* Flying Auto-Settled Invoices */}
              <g transform="translate(85, 30)">
                <rect x="0" y="0" width="34" height="22" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="6" y="15" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="monospace">₹ PAID</text>
              </g>

              {/* Telemetry Tag */}
              <rect x="15" y="172" width="90" height="20" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <text x="24" y="186" fill="#6ee7b7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ⚡ LEDGER AUTO
              </text>
            </g>


            {/* ============================================================== */}
            {/* 3. RIGHT SIDE: FAST-WORKING AI WORKFLOW & TELEMETRY BOT */}
            {/* ============================================================== */}
            <g transform="translate(480, 170)">
              {/* Bot Shadow */}
              <ellipse cx="60" cy="175" rx="35" ry="8" fill="#020617" opacity="0.6" />

              {/* Bot Body (3D Spherical Head / Chassis) */}
              <rect x="36" y="70" width="48" height="60" rx="18" fill="url(#botCyan)" stroke="#38bdf8" strokeWidth="2" />
              {/* Visor */}
              <rect x="44" y="80" width="32" height="14" rx="7" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="60" cy="87" r="4" fill="#38bdf8" className="animate-pulse" />

              {/* Antenna with Pulsing Signal */}
              <line x1="60" y1="70" x2="60" y2="52" stroke="#38bdf8" strokeWidth="2.5" />
              <circle cx="60" cy="50" r="4" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1" />

              {/* Multi-tasking Mechanical Arms */}
              <path d="M 36 95 L 12 110 L 22 130" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 84 95 L 105 105 L 96 128" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" fill="none" />

              {/* Floating Holographic Circular Telemetry Ring */}
              <circle cx="20" cy="65" r="18" stroke="#0284c7" strokeWidth="3" strokeDasharray="14 6" className="animate-spin" style={{ animationDuration: "6s" }} fill="none" />
              <circle cx="20" cy="65" r="10" fill="#0369a1" opacity="0.5" />
              <text x="13" y="68" fill="#e0f2fe" fontSize="8" fontWeight="bold">99%</text>

              {/* Tag */}
              <rect x="15" y="182" width="90" height="20" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="1" />
              <text x="22" y="196" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ⚡ OPS 10x SPEED
              </text>
            </g>


            {/* ============================================================== */}
            {/* 4. REAL-TIME DATA VISUALIZATION (BARS, METERS, SPEED GRAPH) */}
            {/* ============================================================== */}
            
            {/* Floating Holographic 3D Bar Chart (Top Right) */}
            <g transform="translate(460, 25)">
              <rect x="0" y="0" width="130" height="75" rx="12" fill="#090d16" stroke="#38bdf8" strokeWidth="1" opacity="0.9" />
              <text x="12" y="18" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold">AUTO VELOCITY</text>
              {/* Dynamic 5 Bars */}
              <rect x="15" y="42" width="14" height="22" rx="3" fill="#0284c7" />
              <rect x="35" y="32" width="14" height="32" rx="3" fill="#06b6d4" />
              <rect x="55" y="24" width="14" height="40" rx="3" fill="#10b981" />
              <rect x="75" y="20" width="14" height="44" rx="3" fill="#34d399" />
              <rect x="95" y="14" width="14" height="50" rx="3" fill="#a855f7" />
            </g>

            {/* Floating Live Telemetry Gauge (Top Left) */}
            <g transform="translate(70, 25)">
              <rect x="0" y="0" width="130" height="75" rx="12" fill="#090d16" stroke="#10b981" strokeWidth="1" opacity="0.9" />
              <text x="12" y="18" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold">MANUAL DRAG</text>
              <text x="12" y="44" fill="#34d399" fontSize="20" fontWeight="900" fontFamily="monospace">0.0%</text>
              <text x="12" y="60" fill="#64748b" fontSize="8" fontFamily="monospace">Zero human routine</text>
            </g>

          </svg>
        </div>

    </div>
  );
}

export const CeoWorkforceVisual = Ceo3DCartoonWorkforce;
