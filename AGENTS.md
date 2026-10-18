<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Modernisum Web — Master Architecture & Agent Invariants

> **Core System Directives**:
> 1. All mandatory invariants below are non-negotiable and strictly enforced across all platforms.
> 2. Procedural guides, runbooks, and deep standards live in [`.agent/skills/`](file:///d:/modernisum/modernisum-web/.agent/skills/). Keep this file concise and token-efficient.

---

## 1. No Standalone Ad-Hoc Test Scripts (Strictly Forbidden)
- **DO NOT** create ad-hoc test runner scripts (`test-*.mjs`, `audit-*.mjs`, standalone node scripts) in `scripts/`, `tests/`, or elsewhere.
- All verification and screenshot tests must be written as formal Playwright test suites in `tests/<feature>.spec.ts`. See [`playwright`](file:///d:/modernisum/modernisum-web/.agent/skills/playwright/SKILL.md).

## 2. Standardized Semantic Test Suite Naming
- Maintain clean, matching test names: `navigation.spec.ts`, `admin.spec.ts`, `auth.spec.ts`, `school.spec.ts`, `quote-calculator.spec.ts`, `screenshot.spec.ts`.
- Never create fragmented or prefixed test files (`admin-full-flow.spec.ts`, `test-hover.mjs`).

## 3. Single Source of Truth for Test Files
- Always update and extend existing `.spec.ts` files. Never create new test files for pages that already have a test suite.

## 4. Screenshot Capture Inside Playwright Tests
- Take screenshots directly inside Playwright test cases using `await page.screenshot({ path: ... })`.
- Save screenshots to `tests/screenshots/` or the designated artifact directory.

## 5. Universal Reusable UI Engine & Sovereign Domain Configurations
- Modernisum (`/`), MOD School (`/mod-school`), and MOD Farmer (`/mod-farmer`) share presentation primitives (`Navbar.tsx`, `Footer.tsx`, `LiquidGlassCard.tsx`, `GlassButton.tsx`, `AuthDialog.tsx`).
- `Navbar.tsx` must never exceed 500 lines. Domain navigation configurations must live separately in:
  - MOD School: `components/layout/nav/school.config.tsx`
  - MOD Farmer: `components/layout/nav/farmer.config.tsx`
  - Modernisum Parent Studio: `components/layout/nav/modernisum.config.tsx`

## 6. Mandatory Firebase Firestore Data Engine (Always Fetch from DB First)
- All dynamic showcase data (reviews, clients, releases, telemetry KPIs) must be fetched from Firebase Firestore.
- Zero static JSON files for dynamic UI data. Admins manage and curate showcase items via Admin Panel / Flyout without code deployments. In-code seeds provide cold-start resilience.

## 7. Specialized Domain Skills Integration (`.agent/skills/`)
All agents must adhere to the specialized modular domain skills:
- [`architecture`](file:///d:/modernisum/modernisum-web/.agent/skills/architecture/SKILL.md): Monorepo partitioning, Firestore data flows, offline mirrors, and routing architecture.
- [`design`](file:///d:/modernisum/modernisum-web/.agent/skills/design/SKILL.md): 3D interactive stage, liquid glass morphism, fluid wide-screen layouts, and visual-first standards.
- [`seo`](file:///d:/modernisum/modernisum-web/.agent/skills/seo/SKILL.md): Google SERP Sitelinks 6-pack, structured JSON-LD schemas, syndication feeds, and keyword hygiene.
- [`user-expectations`](file:///d:/modernisum/modernisum-web/.agent/skills/user-expectations/SKILL.md): 90% visual law, text halving, buyer psychographics, zero developer jargon.
- [`playwright`](file:///d:/modernisum/modernisum-web/.agent/skills/playwright/SKILL.md): Visual auditing, full-page screenshots, layout verification, defect remediation.
- [`documentation`](file:///d:/modernisum/modernisum-web/.agent/skills/documentation/SKILL.md): Statutory legal drafting (Contract Act, IT Act Sec 10A, DPDP Act 2023, MSME), SLA terms, 100% advance refunds, visual tutorial manuals.
- [`agy-customizations`](file:///C:/Users/shivank/.gemini/antigravity/builtin/skills/agy-customizations/SKILL.md): Standard Antigravity customization, rule and skill management, loading priorities.

## 8. Testing Protocol — TypeScript Verification by Default
- Verify all changes with static type checking (`npx tsc --noEmit`).
- Do NOT trigger Playwright test suites automatically unless explicitly instructed by the user.

## 9. Fluid Wide-Display Container Architecture
- Use full wide-screen layout containers (`w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8`). Avoid restricting sections to narrow `max-w-7xl` boxes.
- Strictly prevent horizontal drag-scroll or overflow (`overflow-x: hidden`, `max-width: 100vw`). Zero horizontal wobble.

## 10. Executive Minimalism & 90% Visual Attention Law
- Institutional buyers read <10% of text; 90% of focus is on images, video walkthroughs, and interactive cards.
- **Halve the Text**: Actively convert long paragraphs into punchy 1–3 word labels, refined SVG icons, and 3-item bullet cards with `CheckCircle2`.
- **Zero Technical Jargon in UI**: Never expose internal storage, database types, or cloud pipelines to users. Focus 100% on operational results. See [`user-expectations`](file:///d:/modernisum/modernisum-web/.agent/skills/user-expectations/SKILL.md).

## 11. Master Product, SEO & Marketing Experience Blueprint
- Surface company philosophy, code security, transparent flat pricing, verified social telemetry, and direct contact options (WhatsApp, phone, demo booking).
- Blog articles must act as visual, interactive conversion funnels for flagship platforms (MOD School, MOD Farmer, Studio AI Solutions).

## 12. Local-First Zero-Central-Storage & Global Privacy Compliance
- MOD School operates on a local-first desktop architecture. Student demographics, marks, attendance, and biometric vectors stay strictly on institutional hardware (LAN/SQLite). Modernisum servers hold zero personal data.
- Pure Pay-as-a-Service model: 0% ad-tech, 0% data monetization.
- Compliant with India DPDP Act 2023 & IT Act 2000, GDPR/UK-GDPR, FERPA, COPPA, and CCPA/CPRA. Backups are user-directed (BYOC via school Google Drive). Ephemeral E2EE relay tunnels only.

## 13. MOD School & MOD Farmer Brand Sovereignty
- **Parent Enterprise**: Modernisum Technologies (`UDYAM-UP-56-0049848`). "MOD" is the official abbreviation of Modernisum.
- **Proper Nouns**: Always use **"MOD School"** (never "Vidhyam") and **"MOD Farmer"** (never "Agromi"). Search attribution and branding belong exclusively to Modernisum.

## 14. Zero Speculative Marketing ROI & Admission Surge Claims
- Prohibited in UI and calculators: Speculative revenue multipliers ("₹X Lakhs Profit"), ROI claims, or promises of artificial admission surges.
- Value proposition is 100% focused on **Workload & Administrative Friction Elimination** and **Elevated Campus Governance**.
- Billing Calculators must strictly display transparent statutory licensing: ₹20/student/mo (quarterly) or ₹15/student/mo (annual upfront), 0% GST (statutory MSME exemption), ₹0 parent fee.

## 15. Canonical 4-Application Monorepo Directory Architecture
The `app/` routing directory is strictly partitioned into:
1. `app/(modernisum)/`: Modernisum Parent Studio website (`/`, `/about`, `/services`, `/blog`, `/policies`, `/contact`).
2. `app/mod-school/`: MOD School website & portal (`/mod-school`, aliased with `/school`).
3. `app/mod-farmer/`: MOD Farmer precision agro-tech app (`/mod-farmer`, aliased with `/farmer`, `/agro`).
4. `app/admin/`: Admin Command Center & Showcase CMS cockpit (`/admin`).
5. `app/api/`: REST endpoints & binary download engine.
- Anti-pattern: Zero loose non-app folders at root of `app/`.

## 16. The "Atithi Devo Bhava" Cultural Philosophy & Bilingual Standard
- Unregistered visitors are honored guests (**अतिथि**): Zero aggressive countdowns, forced phone walls, or hostile popups.
- Registered customers are family: We partner to eliminate operational distress.
- Bilingual Standard: Support high-fidelity English and Hindi (`isHindi` toggle via `LanguageContext`).

## 17. Zero-Code-Deployment Dynamic CMS & Guest Empathy Radar
- Showcase items (`software_showcase`), releases (`platform_releases`), and reviews (`community_entries`) must be editable via Admin Panel without code redeployments.
- Privacy-preserving telemetry signals aggregate in Admin Empathy Radar (`/admin/empathy-radar`) to anticipate client needs.

## 18. Pan-India Universal Professional English UI & Header Hygiene
- Main Navigation, Header, action pills, and primary section titles must remain 100% in crisp, professional English.
- Regional search keywords and Hindi terms reside in background metadata, JSON-LD schemas, and dedicated regional guides.

## 19. Uncompromising Technology with Tailored Affordability
- Enterprise-grade architecture and security are never compromised for smaller institutions.
- We adapt commercial arrangements to client capacity: *"We only grow when our customer's business grows."*

## 20. 120 FPS Performance & Google SERP Sitelinks 6-Pack
- Use compositor-friendly static CSS gradient meshes (`transform: translate3d(0,0,0)`) instead of heavy blur filters.
- Use `content-visibility: auto` below the fold. Maintain Sitelinks Searchbox schemas, RSS feeds (`/feed.xml`), and News Sitemaps (`/news-sitemap.xml`).

## 21. Automated Terms, Policies & SLA Synchronization & Local JSON Mirror Invariant
- **Automatic Policy Impact Assessment**: Whenever changes are made to pricing, SLAs, delivery commitments, delay penalties, refund terms, or architecture, agents **MUST immediately update the corresponding terms and policies**.
- **Dual-Storage Synchronization**: Update both:
  1. **Firebase Firestore Engine**: In `lib/firestore/policies.ts` (master seed `DEFAULT_POLICIES_SEED` and Firestore updates).
  2. **Local JSON Offline Mirror**: In [`lib/data/policies.json`](file:///d:/modernisum/modernisum-web/lib/data/policies.json).
- **Offline Agent Access**: Agents must read `lib/data/policies.json` as the offline single source of truth when auditing or answering policy questions in sandboxed, offline, or build-time contexts.
- **Real-Time Vector PDF Generation**: Policies are never uploaded manually. PDF documents render on-demand via `PolicyPdfDocument.tsx` and printable routes (`/policies/[slug]/print`). See [`documentation`](file:///d:/modernisum/modernisum-web/.agent/skills/documentation/SKILL.md).

## 22. Antigravity Customizations & Continuous Self-Refinement Invariant
- **Built-in `agy-customizations` Engine**:
  - Whenever agent instructions (`AGENTS.md`), project rules, or specialized domain skills require refinement, upgrades, bug corrections, or new operational patterns, the agent **MUST automatically activate `agy-customizations`**.
- **Mandatory User Proposal & Approval Protocol**:
  - Agents must NEVER modify `AGENTS.md` or `.agent/skills/` silently without user visibility.
  - The agent must automatically formulate a structured proposal artifact (`learning_proposal.md`) in the brain directory with `RequestFeedback: true`, detailing:
    1. Classification & Scope
    2. Operational Rationale & Token Impact
    3. Exact Text Diffs / Skill Specifications
  - The proposal must be submitted directly to the user for explicit review and approval before execution.
- **Context Economy & Progressive Disclosure**:
  - Keep `AGENTS.md` strictly lean, high-density, and invariant-focused (<250 lines). Long guides or tutorials must never be placed in `AGENTS.md`.
  - Deep procedural workflows and templates live exclusively in modular on-demand skills (`.agent/skills/`), leveraging Antigravity's progressive disclosure to prevent token consumption bloat.
