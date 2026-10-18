---
name: design
description: >-
  Visual aesthetics, Stitch-inspired 3D interactive stage, floating liquid glass morphism, and executive UI/UX
  design standards for Modernisum Web, MOD School, and MOD Farmer.
---

# Design & Aesthetic Engineering Standard

> **The Visual-First Design Axiom**:  
> Executive buyers and institutional decision-makers engage **90% more with visual demonstrations, interactive hardware mockups, and tactile 3D cards than plain text**.  
> We craft premium, obsidian-and-glass digital experiences with sub-second responsiveness, fluid wide-screen layouts, and zero visual clutter.

---

## 1. The 90/10 Visual Attention Law (Text Halving Invariant)

### 1.1 Halve the Text Bloat
- Whenever reviewing or designing any section, **actively cut descriptive paragraphs in half**.
- Convert lengthy explanations into:
  - **Punchy 1–3 Word Badges**: High-contrast, bold indicators (`Sub-150ms Match`, `Zero Cloud`, `Local-First LAN`).
  - **Frosted Glass Pills**: Semi-transparent badges with subtle border shine (`backdrop-blur-md`).
  - **3-Item Bullet Cards**: Compact cards using `CheckCircle2` with emerald/cyan highlights.
  - **Tactile Metrics**: Real-world quantitative proof (`₹15/mo`, `0% GST`, `ESC/POS 80mm`).

### 1.2 Visual Proof Over Technical Prose
- Rather than describing hardware workflows in text, provide an interactive, animated SVG component showing:
  - A Turnstile barrier opening with LED glow.
  - A Thermal Printer ejecting an itemized fee receipt with dynamic UPI QR.
  - A Face AI Vector Scanner analyzing a 512-dimension biometric facial embedding.

---

## 2. Universal Liquid Glass Morphs & UI Primitives

All platforms (Modernisum Studio, MOD School, MOD Farmer) share core presentation primitives:

### 2.1 `LiquidGlassCard.tsx`
- **Visual Mechanics**:
  - Semi-translucent dark background (`bg-slate-900/60` or `bg-black/40`).
  - Frosted backdrop filter (`backdrop-blur-xl` or `backdrop-blur-md`).
  - Fine border hairline (`border border-white/10` or `border-cyan-500/20`).
  - Spec-spotlight hover glow with smooth transition (`transition-all duration-300`).
  - Subtle interactive 3D perspective pop (`hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10`).

### 2.2 `GlassButton.tsx`
- Tactile, high-prestige action pills.
- Gradient border rings with subtle radial pulse on active state.
- Zero harsh flat rectangular boxes; rounded pill corners (`rounded-full` or `rounded-xl`).

### 2.3 Executive Color Palette & Lighting
- **Canvas / Surfaces**: Deep Obsidian (`#020617`, `#090D16`), Midnight Slate (`#0F172A`).
- **Luminous Accent Tones**:
  - **Cyan / Sky** (`#06B6D4` / `#38BDF8`): MOD School speed, clarity, and sovereign security.
  - **Emerald / Mint** (`#10B981` / `#34D399`): MOD Farmer precision agro-tech and active verification.
  - **Violet / Indigo** (`#8B5CF6` / `#6366F1`): Modernisum Studio deep-tech AI and R&D.
- **Static Compositor Meshes**:
  - Avoid runtime blur filters (`blur(100px)`) that degrade FPS on budget devices.
  - Use GPU-accelerated static radial gradient meshes with `transform: translate3d(0,0,0)` to maintain silky 120 FPS performance.

---

## 3. Stitch-Inspired 3D Interactive Stage & Motion Graphics

### 3.1 3D Perspective Card Layouts
- Use CSS 3D transforms (`transform-style: preserve-3d`, `perspective: 1000px`) for product showcases.
- Allow cards to pop forward on mouse hover with smooth spring transitions.

### 3.2 Animated Hardware SVGs
- **Biometric Turnstile**: Animated dual-wing turnstile gates opening inward upon RFID/Face authorization with a green status ring.
- **ESC/POS Thermal Printer**: Paper slip smoothly extending downward with a visible tear-off cutline and dynamic QR code.
- **Live GPS Fleet Map**: Pulsing vehicle beacon navigating along simulated school bus route coordinates.

---

## 4. Fluid Wide-Display Container Architecture

### 4.1 Master Screen Container
- **Full Wide-Display Standard**: Use `w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8`.
- Avoid constraining enterprise showcase grids inside narrow `max-w-7xl` boxes on 2K/4K monitors. Give elements breathing room while maintaining unified alignment.

### 4.2 Locked Horizontal Axis (Zero Wobble)
- **Zero Drag-Scroll / Overflow**: Every container must enforce `overflow-x: hidden` and `max-width: 100vw`.
- Users on mobile devices and touchscreens must never experience horizontal jitter, horizontal drag-scroll wobble, or cut-off content.

---

## 5. Typography & Executive Hierarchy

1. **Heading Typography**:
   - High-contrast, geometric sans-serif fonts with `tracking-tight` letter spacing.
   - Distinct size contrast between titles (`text-4xl` to `text-6xl`), subtitles (`text-lg`), and body labels (`text-sm`).
2. **Body Typography**:
   - Clean slate text (`text-slate-300` / `text-slate-400`) on dark surfaces.
   - Generous line height (`leading-relaxed`) for micro-copy and feature specs.
3. **Pills & Badges**:
   - Uppercase or capitalized micro-text (`text-xs font-semibold uppercase tracking-wider`).
