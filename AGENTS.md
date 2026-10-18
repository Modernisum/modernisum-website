<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Testing & Verification Rules for Modernisum Web

## 1. No Standalone Ad-Hoc Test Scripts (Strictly Forbidden)
- **DO NOT** create temporary or standalone test runner scripts (`.mjs`, `.js`, etc.) in `scripts/`, `tests/`, or any other directory for testing features, auditing pages, or capturing screenshots.
- Prohibited patterns include: `test-*.mjs`, `verify-*.mjs`, `audit-*.mjs`, `capture-*.mjs`, and ad-hoc node scripts.
- All automated testing, verification, and visual screenshot capturing **MUST** be written directly as formal Playwright test suites inside `tests/<feature>.spec.ts`.

## 2. Standardized & Matching Test File Naming
- Test files must reside in `tests/` and use clean, semantic names matching the feature, page, or route being tested:
  - Homepage & Global Navigation: `tests/navigation.spec.ts`
  - Admin Panel & CMS: `tests/admin.spec.ts`
  - Authentication (Modal, Sign In, Sign Up, Progressive Flow): `tests/auth.spec.ts`
  - MOD School Ecosystem (Landing, ERP, Calculator, Demo Form): `tests/school.spec.ts`
  - Quote Calculator: `tests/quote-calculator.spec.ts`
  - Visual Theme & System Screenshots: `tests/screenshot.spec.ts`
- Avoid redundant, fragmented, or prefixed file names (e.g. do NOT create `admin-full-flow.spec.ts`, `auth-dialog.spec.ts`, `test-hover-stability.mjs`, `vidhyam-e2e.mjs`).

## 3. Single Source of Truth — Update Existing Test Files, Do NOT Create New Ones
- If a test file for a page or feature already exists, **DO NOT** create a new separate test file when making changes or testing new functionality on that page.
- **ALWAYS** update and extend the existing `.spec.ts` file for that page/feature.
- **Rationale & Mandatory Behavior:**
  - Keeps all assertions for a page in one single file.
  - Running a single test command (e.g. `npx.cmd playwright test tests/<feature>.spec.ts`) tests the entire page end-to-end and provides the complete status in one go.
  - Prevents stale test files, duplicate logic, and confusion over which test to run.

## 4. Screenshot Capture Inside Playwright Tests
- When screenshot capture is required for visual auditing or reporting:
  - Take the screenshot directly inside the corresponding test case in `tests/<feature>.spec.ts` using `await page.screenshot({ path: ... })`.
  - Save screenshots to `tests/screenshots/` or the specified brain artifact directory.
  - Do NOT create separate script files just to take screenshots.

## 5. Shared / Borrowed UI Engine & Domain-Separated Content Architecture (Mandatory)
- **Universal Reusable Presentation Engine**: Modernisum (`/`), MOD School (`/school` & `school.modernisum.com`), and MOD Farmer (`/agromi` & formerly Agromi) **MUST** borrow and share unified UI components (`components/layout/Navbar.tsx`, `Footer.tsx`, `LiquidGlassCard.tsx`, `GlassButton.tsx`, `AuthDialog.tsx`).
- **Strict Separation of Domain Content (Zero Monolithic Files)**:
  - While the UI mechanics (floating island morph, frosted glass styling, spec-spotlights, user SSO menus, and mobile drawer sheets) are 100% shared, the **content and menu configurations** for each distinct platform are completely sovereign.
  - **NEVER** cram hardcoded domain menus, previews, highlights, and copywriting into a single giant UI file (e.g. `Navbar.tsx` must never exceed 500 lines).
  - All domain-specific navigation and content configurations must live in dedicated domain files:
    - **MOD School**: `components/layout/nav/school.config.tsx`
    - **MOD Farmer**: `components/layout/nav/farmer.config.tsx`
    - **Modernisum Parent Studio**: `components/layout/nav/modernisum.config.tsx`
  - Complex sub-renderers (like `MegaDropdown.tsx`, `MobileNavDrawer.tsx`, `UserAccountMenu.tsx`) must be kept in modular sub-components under `components/layout/nav/`.

## 5.1. Mandatory Firebase Firestore Data Engine (Always Fetch from DB First)
- **Always Fetch from Firebase Firestore Before Printing**: All dynamic data displayed across the website (community reviews, featured platform clients, platform releases, telemetry fun-facts & KPIs, blog articles, and registered school profiles) **MUST ALWAYS** be fetched from Firebase Firestore before being rendered/printed on the website.
- **Zero Static JSON Files**:
  - No static data JSON files (e.g. `lib/data/`) or hardcoded synthetic data arrays in UI components are permitted.
  - Admin users must be able to curate, feature, edit, and manage all live reviews, customers, releases, and telemetry numbers directly from the Admin Panel / Sidebar Hover Flyout (`HomeShowcaseFlyout`) without touching frontend code.
- **Zero-Blank Cold Start Guarantee**:
  - When a brand-new deployment runs or a Firestore collection is temporarily empty, in-code seed initializers ensure the website is never blank or broken. As soon as the first fetch occurs, initial data is dynamically inserted into Firestore, and all subsequent reads and updates flow directly from the database.

## 5.2. Specialized Domain Skills Integration (`.agent/skills/`)
All agents and developers must strictly adhere to the domain skills located in `.agent/skills/`:
- **`user-expectations`** (`.agent/skills/user-expectations/SKILL.md`): Authoritative guide on buyer psychographics, 90% visual-driven communication, halving text bloat, zero developer jargon, and high-conversion clarity.
- **`playwright`** (`.agent/skills/playwright/SKILL.md`): Authoritative guide on visual auditing, full-page screenshot capturing, judging visual density, and screenshot-guided code remediation.

## 6. Testing Protocol — TypeScript Verification by Default, Playwright for Visual Audits & When Instructed
- **Fast Static Validation First**: When making UI, architectural, or component changes, always verify changes via TypeScript compilation / type check (`npx tsc --noEmit` or `npm run type-check`).
- **Playwright Visual Audits & Screenshot Verification**: Playwright test suites inside `tests/` are used to capture high-density 1080p desktop and mobile full-page screenshots, judge visual balance, locate text bloat, and verify that layouts remain focused and frictionless without horizontal overflow.
- **Continuous Static Reliability**: Code must always be strictly type-safe, statically verified, and compile cleanly without runtime regressions.

## 7. Fluid Wide-Display Container Architecture (Mandatory)
- **Zero Excessive Margins on Wide Screens**: All major homepage sections, product cards, and ecosystem showcases must take full advantage of wide monitors and high-resolution screens (using `w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8`).
- **No Unused Horizontal Voids**: Avoid constraining full-width interactive sections to small `max-w-7xl` boxes when large screens are available. Components must assemble seamlessly edge-to-edge with balanced padding.
- **Static & Locked Horizontal Axis**: The website layout must remain strictly static with zero horizontal jitter or drag-scroll overflow (`overflow-x: hidden`, `max-width: 100vw`). Users must never be able to drag, hold, or wobble the page horizontally.

## 8. Executive Minimalism, 90% Visual Law & Zero Functional/Backend Jargon in UI (Mandatory)
- **The 90% Visual Attention Law**:
  - Enterprise executives, school directors, investors, and modern agro-business leaders **read less than 10% of text on screen**.
  - **90% of their focus is captured exclusively by high-fidelity images, product screenshots, video previews, and interactive cards**.
  - **Halve the Text (Mandatory Text Halving Invariant)**: Whenever auditing or writing any website section, actively cut verbose paragraphs in half. Convert explanations into punchy 1–3 word labels, refined SVG icons, and 3-item bullet cards with `CheckCircle2` indicators.
- **Zero Backend Intent / Storage Architecture Exposure in UI**: Never expose architectural intentions, internal developer jargon, storage engines, or functional mechanics in user-facing UI text. End-users are school owners, principals, teachers, and parents—NOT software developers.
  - **Strictly Prohibited in UI Copy**: NEVER write "Saved to Google Drive", "5TB Google Drive", "Synced with Firebase", "Postgres", "MongoDB", "1-Click Free Access", "No password required", "Frictionless login for leads", or technical storage/pipeline descriptions in labels, subtexts, tooltips, or toasts.
  - **User Focus is 100% on Results**: Users care only about the outcome (e.g. "School Emblem / Logo", "PNG, JPG, or SVG up to 5MB", "Recommended square 1:1 ratio", "Emblem Uploaded"). All cloud storage, database syncing, and backend jobs are silent background infrastructure.
- **Google Drive Video Streaming & Apps Script SMTP Integration**:
  - High-definition product walkthrough videos and high-resolution screen demonstrations stream directly from Google Drive cloud storage.
  - Transactional logging, form submissions, and server health alerts are routed seamlessly via Google Apps Script SMTP services without degrading frontend performance.

## 9. Local-First Zero-Central-Storage, Global Strict-Compliance & Pure B2B Pay-as-a-Service Invariant (Mandatory)
- **Zero Centralized School/Student Data Storage**:
  - Modernisum products (including Vidhyam School OS) operate on a **local-first desktop architecture**.
  - All sensitive student demographics, marks, attendance, facial biometric vector hashes, and financial records reside exclusively on the institution's local hardware (e.g. SQLite / local LAN stores).
  - Modernisum central servers **NEVER** hold, store, cache, or aggregate institutional school databases.
- **Pure Pay-as-a-Service (0% Ad-Tech / 0% Data Monetization)**:
  - Modernisum operates strictly on software licensing fees (Pay-as-a-Service).
  - Under no circumstances will user data be sold, leased, or monetized for advertising. Zero advertising code, behavioral tracking scripts, or commercial ad networks may be integrated.
- **Global Multi-Jurisdiction Compliance by Design**:
  - Architecture adheres to the world's most rigorous privacy standards:
    - **India**: DPDP Act 2023 & IT Act 2000 (School as Data Fiduciary, Modernisum as Technical Conduit).
    - **European Union & UK**: GDPR & UK-GDPR (Articles 25 Privacy by Design, 28 Processor Terms, 17 Erasure).
    - **United States**: COPPA (Under-13 child protections) & FERPA (Educational records confidentiality).
    - **California**: CCPA/CPRA ("Do Not Sell My Info" by design).
- **Verifiable Parental Consent & Air-Gapped Offline Isolation**:
  - Modernisum systems support signed verifiable parental consent for mobile app access.
  - For parents who opt out of app usage, that student's records remain 100% air-gapped on the local school desktop—zero bytes cross the cloud tunnel.
- **Ephemeral E2EE Relay Tunneling**:
  - Client mobile apps communicate with local school desktop servers via end-to-end encrypted tunnels.
  - Tunnels act strictly as an ephemeral relay pipe: zero payload is stored, logged, or cached. If the local school server is offline, client apps display offline status.
- **BYOC (Bring Your Own Cloud) User Backups**:
  - Cloud backups are strictly user-directed to the customer's own cloud accounts (e.g., Google Drive via school's credentials under `drive.file` scope). Modernisum does not maintain central multi-tenant database honeypots.
- **Client-Side Automation & BYO AI API Keys**:
  - Browser extensions (Clerk MV3 Co-Pilot) execute strictly in-browser without harvesting portal forms or credentials.
  - AI document parsing / OCR operates either locally or via the customer's authorized Google Gemini API keys. Customer document data is never used for proprietary model training.
- **Strictly Restricted Central Telemetry**:
  - Only operational identifiers required for routing and billing are processed centrally: School ID, School Name, Admin Email, Admin Phone, School Address, and aggregate headcount integer for license computation (with a 14-day offline grace period).

## 10. MOD School & MOD Farmer Brand Sovereignty, Proper Noun Status & Traffic Attribution Invariant (Mandatory)
- **Parent Enterprise**: Modernisum (`Modernisum Technologies`, MSME: UDYAM-UP-56-0049848).
- **"MOD" is the official abbreviation and short form of Modernisum**.
- **Proper Nouns & Official Product Names**:
  - The flagship autonomous school operating system is strictly **"MOD School"** (formerly Vidhyam). Exact spelling: `MOD School`.
  - The flagship autonomous agriculture operating system & AI Crop Doctor is strictly **"MOD Farmer"** (formerly Agromi). Exact spelling: `MOD Farmer`.
- **Proper Noun Exclusivity & Search Identity**:
  - Whenever a user searches "MOD School" or "MOD Farmer" on Google, Bing, DuckDuckGo or any search directory, it is the legally recognized, proper noun identity belonging exclusively to Modernisum Technologies and its sovereign software suite (`school.modernisum.com` / `modernisum.com`).
  - All web traffic, search impression attribution, and trademark recognition for "MOD School" and "MOD Farmer" belong solely to Modernisum Technologies.
- **Permanent Invariant**:
  - Agents must NEVER revert "MOD School" back to "Vidhyam" or "MOD Farmer" back to "Agromi".
  - All user-facing UI copy, headings, badges, titles, navigation links, meta tags, policies, and structured JSON-LD schemas must prominently feature "MOD School" and "MOD Farmer".

## 11. Zero Speculative Marketing ROI & Admission Surge Claims — Transparent Billing & Workload Elimination Invariant (Mandatory)
- **Strictly Prohibited in UI Copy & Calculators**:
  - **No Speculative Financial ROI**: NEVER use labels like "Return on Investment", "₹X Lakhs Annual Profit Gain", "Fee Recovery Delta", or speculative revenue multipliers in user-facing calculators or marketing text.
  - **No Admission Surge Claims**: NEVER claim, promise, or imply that deploying Modernisum OS will cause an artificial influx or "flood" of new student admissions.
- **Sole Value Proposition & Product Mission**:
  - **Workload & Friction Elimination**: The product's primary advertised objective is eliminating day-to-day administrative drag and automating routine school operations (e.g. automating report cards, fee ledger reconciliation, TC generation, and attendance).
  - **Elevated Student Facilities & Governance**: The software provides enterprise-grade facilities (biometric security, real-time parent app notifications, contactless fee collection, transparent academic dossiers). While superior facilities naturally elevate school reputation and student retention organically, our direct commitment is 100% operational efficiency.
- **Interactive Calculator Architecture**:
  - All school calculators must strictly function as an **Interactive Transparent Billing & Capacity Calculator**.
  - Calculations must reflect real subscription billing per the official policy:
    - Base Student Licensing: ₹20 / student / month (Quarterly Prepaid) or ₹15 / student / month (Annual Upfront, 25% discount).
    - Faculty & Staff Licensing: Scaled transparently per employee seat.
    - Zero Hidden Charges: 0% GST (statutory MSME exemption), ₹0 parent fees, and ₹0 platform markup on third-party BYOK AI/Cloud.
  - Alongside transparent bills, the calculator displays tangible operational metrics: **Administrative Hours Streamlined** and **Facility Enhancements**, with zero speculative financial return claims.

## 12. Canonical 4-Application/Website Monorepo Directory Architecture (Mandatory)
In `modernisum-web`, the `app/` routing tree is strictly partitioned into the 4 true applications / sovereign websites + the central backend API layer:
1. **Modernisum Parent Studio Website** (`app/(modernisum)/`):
   - Grouped into the `(modernisum)` Route Group so all public studio URLs map cleanly without route prefixes (`/`, `/about`, `/services`, `/projects`, `/blog`, `/news`, `/research`, `/security`, `/contact`, `/community`, `/terms`, `/privacy`, `/auth`).
   - Contains all corporate, studio, research, and client-facing content belonging to Modernisum Technologies.
2. **MOD School Operating System Website & App** (`app/mod-school/`):
   - Canonical proper noun: **MOD School** (accessed via `school.modernisum.com` or `/mod-school`, aliased with `/school`).
   - Contains all school-specific features, billing calculator, downloads, student/employee apps, and school governance policies.
3. **MOD Farmer Agro-Tech Website & App** (`app/mod-farmer/`):
   - Canonical proper noun: **MOD Farmer** (formerly Agromi, accessed via `/mod-farmer`, aliased with `/farmer`, `/agro`, `/agromi`).
   - Contains all precision agriculture, Crop Care AI Doctor, and sensor telemetry tools.
4. **Admin Command Center Application** (`app/admin/`):
   - Executive cockpit, AI synthesizers, user management, school fleet management, and dynamic database showcase curation flyout.
5. **Central Backend API Engine** (`app/api/`):
   - REST endpoints for authentication, admin actions, telemetry, community feedback, and binary downloads (`/api/download/[filename]`).
- **Strict Anti-Pattern (Zero Loose Non-App Folders at `app/` Root)**:
  - Never place standalone content pages (e.g. `about/`, `projects/`, `news/`, `privacy/`, `terms/`, `downloads/`, `logo-preview/`) loosely at the root of `app/`.
  - Non-app folders must live inside the website to which their content belongs (`(modernisum)/`, `mod-school/`, or `mod-farmer/`), and shared assets/primitives must live outside in `components/shared/` or `components/ui/`.

