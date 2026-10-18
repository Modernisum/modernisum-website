---
name: architecture
description: >-
  Authoritative monorepo directory partitioning, data flows, database layer, offline mirrors, and routing
  architecture for Modernisum Web.
---

# Codebase Architecture, Directory Map & Data Flow Standards

> **The Sovereign Monorepo Axiom**:  
> Modernisum Web is a multi-platform monorepo hosting three customer-facing portals, a central administrative cockpit, and high-performance API endpoints.  
> Architecture is strictly partitioned, data flows database-first through Firebase Firestore, and legal terms are mirrored in version-controlled offline storage.

---

## 1. Canonical 4-Application Monorepo Directory Partitioning

The `app/` directory is strictly partitioned into four applications plus the API layer:

```
app/
├── (modernisum)/         # 1. Modernisum Parent Studio Website
│   ├── about/            # Corporate vision, history & philosophy
│   ├── blog/             # Deep-tech articles & thought leadership
│   ├── contact/          # Enterprise inquiry & quote initiation
│   ├── policies/         # Legal policy center & printable PDF routes
│   ├── services/         # Custom software engineering services
│   └── page.tsx          # Studio homepage
├── mod-school/           # 2. MOD School Operating System Portal
│   ├── download/         # Desktop x64, Android APKs, Clerk Extension
│   ├── releases/         # Version logs, SHA-256 hashes, changelogs
│   ├── docs/             # Visual onboarding, hardware guides & manuals
│   └── page.tsx          # MOD School landing & billing calculator
├── mod-farmer/           # 3. MOD Farmer Precision Agro-Tech App
│   ├── care/             # Crop disease diagnosis & AI agronomist
│   ├── telemetry/        # Soil, moisture & microclimate sensor feeds
│   └── page.tsx          # MOD Farmer portal
├── admin/                # 4. Admin Command Center & Showcase CMS
│   ├── empathy-radar/    # Client interaction signals & intent radar
│   ├── policies/         # Policy editor, real-time PDF previewer
│   ├── releases/         # Software release manager & hash updater
│   ├── showcase/         # Showcase screen manager & screenshot uploader
│   └── page.tsx          # Executive cockpit overview
└── api/                  # 5. Central REST Endpoints & Binary Engines
    ├── auth/             # Session, token verification & user roles
    ├── download/         # High-speed binary installer streaming
    ├── showcase/         # Dynamic showcase screenshot endpoints
    └── telemetry/        # Privacy-preserving empathy beacon ingestion
```

> [!IMPORTANT]
> **Strict Anti-Pattern (Zero Loose Non-App Folders at `app/` Root)**:  
> Never place loose feature folders (e.g. `about/`, `blog/`, `privacy/`, `terms/`) directly at the root of `app/`. They must live inside their respective application route group (`(modernisum)/`, `mod-school/`, or `mod-farmer/`).

---

## 2. Sovereign Domain Navigation Architecture

While presentation primitives are shared, domain menu content is completely segregated:

```
components/
├── layout/
│   ├── Navbar.tsx                # Master floating navbar (< 500 lines)
│   ├── Footer.tsx                # Universal multi-platform footer
│   └── nav/
│       ├── modernisum.config.tsx # Studio menu config, pills & links
│       ├── school.config.tsx     # MOD School menu config & ERP links
│       ├── farmer.config.tsx     # MOD Farmer precision tools & links
│       ├── MegaDropdown.tsx      # Multi-column hover flyout menu
│       ├── MobileNavDrawer.tsx   # Mobile responsive slide-over sheet
│       └── UserAccountMenu.tsx   # User profile & authentication flyout
```

- **Invariant**: `Navbar.tsx` acts purely as an orchestrator and must never exceed 500 lines of code.

---

## 3. Database Layer & Data Flow Architecture (Firebase Firestore)

### 3.1 Primary Data Engine: Firebase Firestore
All dynamic showcase data, client reviews, software releases, and empathy signals are queried directly from Firebase Firestore:

| Firestore Collection | Service Layer | Purpose | Admin Cockpit Control |
| :--- | :--- | :--- | :--- |
| `software_showcase` | `lib/firestore/showcase.ts` | Desktop app screenshots, impact metrics, categories | `/admin/showcase` |
| `platform_releases` | `lib/firestore/releases.ts` | Releases, downloads, file sizes, SHA-256 hashes | `/admin/releases` |
| `community_entries` | `lib/firestore/reviews.ts` | Real verified school & enterprise client reviews | `/admin` Flyout |
| `policies` | `lib/firestore/policies.ts` | Official legal terms, SLAs, pricing schedules | `/admin/policies` |
| `empathy_radar` | `lib/firestore/telemetry.ts` | Client problem signals and hardware intent | `/admin/empathy-radar` |

### 3.2 Mandatory DB-First Invariant & In-Code Cold-Start Seeds
- **DB-First Fetch**: UI components always fetch from Firestore before rendering.
- **Zero Static Hardcoding**: Admin users curate content without requiring code edits or redeployments.
- **Zero-Blank Cold Start**: Every Firestore service defines an in-code master seed (e.g., `DEFAULT_POLICIES_SEED`). If a collection is empty, the seed is automatically written to Firestore so the site is never blank.

### 3.3 Offline JSON Mirror for Policies (`lib/data/policies.json`)
- **Offline Access Rationale**: AI agent sandboxes, local terminal tasks, and Next.js static builds cannot reliably run network queries against Firestore.
- **Dual Synchronization**: Whenever terms, SLAs, pricing, or architecture change, update both:
  1. `lib/firestore/policies.ts` (Firestore seed and live mutation helpers)
  2. `lib/data/policies.json` (Local version-controlled offline mirror)
- Agents must read `lib/data/policies.json` as the offline single source of truth.

---

## 4. Component Directory Map

```
components/
├── ui/                 # Base design system (Button, Dialog, Dropdown, Input, Badge)
├── shared/             # Cross-platform widgets (AuthDialog, ContactModal, LiquidGlassCard)
├── layout/             # Master Navbar, Footer, and domain configs
└── policy/             # Real-time vector PDF generators
    ├── PolicyPdfDocument.tsx # Vector printable A4 document template
    ├── PolicyPdfModal.tsx    # Live print previewer with print isolation
    └── PolicyCenterLayout.tsx# Public policy browser UI
```

---

## 5. Testing & Verification Architecture

1. **Standardized Semantic Playwright Suites**:
   - `tests/navigation.spec.ts` — Global headers, footers, route transitions.
   - `tests/admin.spec.ts` — Cockpit CMS, showcase updates, release curation.
   - `tests/auth.spec.ts` — Authentication modal, progressive onboarding.
   - `tests/school.spec.ts` — MOD School landing, capacity calculator, ERP demo.
   - `tests/quote-calculator.spec.ts` — Software cost estimation calculator.
   - `tests/screenshot.spec.ts` — Visual themes and 1080p full-page audits.
2. **Strict Test Invariants**:
   - Zero standalone ad-hoc test scripts (`test-*.mjs`, `audit-*.mjs`).
   - Single source of truth: extend existing `.spec.ts` files, never create fragmented duplicates.
   - Static type checking (`npx tsc --noEmit`) runs by default; Playwright test suites only run when explicitly requested by user.
