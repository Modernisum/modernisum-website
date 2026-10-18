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

## 6. Executive Minimalism, 90% Visual Law & Zero Functional/Backend Jargon in UI (Mandatory)
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
- **Short Words & Visuals Over Long Text**:
  - Keep all UI labels, button text, and badges ultra-concise (1-3 words maximum).
  - Communicate concepts through refined SVG icons, smooth micro-interactions, and visual cards rather than descriptive paragraphs or cluttered helper captions.
  - Eliminate verbose disclaimers and distracting badges that degrade executive aesthetics.

## 7. The Master Product, SEO & Marketing Experience Blueprint (Mandatory)
- **What Executives & Institutional Buyers Actually Look For**:
  - **Company Philosophy & Methodology**: How we build, our engineering mindset, and our core principles ("Kam Karne Ka Tarika").
  - **Code Quality & Security Policies**: Enterprise-grade security, data sovereignty, offline-first reliability, and clean architecture.
  - **Transparent, Irresistible Pricing**: Clear flat pricing tiers, zero hidden traps, transparent billing calculators, and unbeatable value proposition.
  - **Direct, Frictionless Contact**: Instant access to human founders/architects (direct demo booking, WhatsApp, phone, email) without hurdles.
  - **Verified Social Proof & Telemetry**: Quantitative user counts, live system counters, verified institutional reviews, and ratings.
  - **Company Identity**: Headquarters location, years of operation, leadership transparency, and active customer sectors.
- **The "Hypnotic" SEO Content Funnel (Articles to Product Conversion)**:
  - Organic discovery happens through high-value technical and educational articles (Search Engine ranking).
  - Every blog article must have an immersive reading UX — high visual fidelity, interactive charts, and contextual product showcases that naturally compel readers to explore our flagship products (MOD School OS, MOD Farmer Agro-Tech, and Modernisum Custom AI Solutions).
- **Interactive Demonstrations & Micro-Animations Over Text**:
  - Replace static walls of text with interactive software demos, sliders (e.g. transparent billing calculator, farm telemetry cockpits), and micro-animations.
  - Explain features using ultra-short 1-3 word phrases and high-fidelity SVG icons. Senior decision-makers comprehend the entire product in seconds.

## 8. Testing Protocol — TypeScript Verification by Default, Playwright Only on Explicit Request (Mandatory)
- **Do NOT run Playwright tests automatically**: When making UI, architectural, or component changes, verify changes via TypeScript compilation / type check (`npx tsc --noEmit` or `npm run type-check`).
- **Run Playwright tests ONLY when explicitly asked by the user**: Do not trigger Playwright tests (`npx playwright test ...`) unless the user explicitly instructs to run Playwright tests.
- **Continuous Static Reliability**: Code must always be strictly type-safe, statically verified, and compile cleanly without runtime regressions.

## 9. Fluid Wide-Display Container Architecture (Mandatory)
- **Zero Excessive Margins on Wide Screens**: All major homepage sections, product cards, and ecosystem showcases must take full advantage of wide monitors and high-resolution screens (using `w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8`).
- **No Unused Horizontal Voids**: Avoid constraining full-width interactive sections to small `max-w-7xl` boxes when large screens are available. Components must assemble seamlessly edge-to-edge with balanced padding.
- **Static & Locked Horizontal Axis**: The website layout must remain strictly static with zero horizontal jitter or drag-scroll overflow (`overflow-x: hidden`, `max-width: 100vw`). Users must never be able to drag, hold, or wobble the page horizontally.

## 10. Local-First Zero-Central-Storage, Global Strict-Compliance & Pure B2B Pay-as-a-Service Invariant (Mandatory)
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

## 11. MOD School & MOD Farmer Brand Sovereignty, Proper Noun Status & Traffic Attribution Invariant (Mandatory)
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

## 12. Zero Speculative Marketing ROI & Admission Surge Claims — Transparent Billing & Workload Elimination Invariant (Mandatory)
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

## 13. Canonical 4-Application/Website Monorepo Directory Architecture (Mandatory)
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

## 14. The "Atithi Devo Bhava" Cultural Philosophy, Family-First Ecosystem & Bilingual Standard (Mandatory)
- **Indian Cultural Foundation ("अतिथि देवो भव")**:
  - In our worldview, every unregistered visitor exploring Modernisum or its software products (MOD School, MOD Farmer) is an honored guest (**अतिथि**).
  - Indian hospitality mandates treating guests with supreme dignity, courtesy, and respect:
    - **Zero Hostile Patterns**: NO intrusive lead capture popups, NO aggressive countdown timers, NO high-pressure sales coercion, NO blocking access to releases, live demos, or calculators behind forced phone numbers.
  - **Registered Users as Beloved Family Members**:
    - When a guest registers or adopts our platform, they become part of our extended family.
    - Our purpose is NOT commercial exploitation or aggressive monetization; it is standing with our family members, understanding their operational distress (fee leakage, gate ingress bottlenecks, administrative burn-out, compliance anxiety), and lifting their burdens with sovereign software.
  - **Direct Compassionate Family Care Desk**:
    - Any guest or school director can share their real challenges without feeling patronized or insulted. We listen and offer engineering solutions without hidden charges.
- **Strict Bilingual English & Hindi Standard**:
  - All customer-facing value propositions, empathy prompts, software showcase explanations, and family touchpoints MUST provide high-fidelity bilingual support (`isHindi` toggle via `LanguageContext`).
  - Both English and Hindi copy must read authentically, professionally, and respectfully.

## 15. Zero-Code-Deployment Dynamic CMS & Non-Intrusive Empathy Radar Mandate (Mandatory)
- **The Zero-Code-Deployment Principle**:
  - Our core engineering role is building and advancing sovereign software products—NOT constantly modifying website JSX and redeploying code.
  - Once deployed, **ALL dynamic presentation content MUST be editable and managed directly from the Admin Panel via Firebase Firestore**:
    1. **Software Showcase & Screenshots** (`software_showcase` in Firestore): Desktop UI screenshots, category pills, "Why Built" rationales, impact metrics, and light/dark mode URLs are dynamically queried by `DesktopShowcase.tsx` via `/api/showcase`. No code changes required to publish new app screens.
    2. **Software Releases & Downloads** (`platform_releases` in Firestore): Releases, version bumps, file sizes, SHA-256 hashes, and changelogs across Windows x64 Desktop, Employee APK, Student APK, and Clerk MV3 Extension flow from Firestore. Updating in the Admin Panel immediately updates `/mod-school/download` and `/mod-school/releases`.
    3. **Authentic Community Voice Marquee** (`community_entries` in Firestore): Real reviews from verified institutions with real school logos slide smoothly right-to-left. 1-click toggle (`featuredOnHome` / `featuredOnSchool`) in the Admin Panel immediately curates the marquee. Zero synthetic or fake testimonials.
- **Non-Intrusive Empathy Signals (Privacy-Preserving Telemetry)**:
  - We understand customer needs without demanding lengthy 15-field forms.
  - Non-intrusive client beacons observe platform intent (Windows vs Android vs Extension), problem areas lingered on (Turnstiles, Fee Dues, Timetable Solver), and language preferences.
  - The Admin **"Guest Empathy Radar"** (`/admin/empathy-radar`) aggregates these interaction signals in real-time, allowing the engineering team to know what features institutions actually need before they even ask.

## 16. Pan-India Universal Professional English UI & Header Hygiene Invariant (Mandatory)
- **Pan-India Enterprise Invariant**: 90% of school traffic comes from Indian institutions across all 28 states (Tamil Nadu, Karnataka, Maharashtra, Gujarat, Kerala, West Bengal, Punjab, UP, etc.). English is the universally accepted professional language across all boards (CBSE, ICSE, State Boards).
- **Header & Navbar Hygiene Standard**:
  - The visible Header, Navbar, top-level banner callouts, and primary container titles MUST strictly remain 100% in crisp, professional, high-prestige English.
  - **NEVER** place forced local-language (Hindi/regional) text inside visible navigation bars, main action pills, or top-level layout containers.
  - All regional search intent (Hindi queries, state board compliance terms) MUST live strictly in background metadata: `<meta name="keywords">`, JSON-LD structured schemas, server-rendered `hreflang` alternate tags, and dedicated regional compliance guides (`/mod-school/docs/state-boards/...`).

## 17. Uncompromising Technology with Tailored Affordability & Customer Growth Symbiosis (Mandatory)
- **Quality Non-Negotiable Invariant**: Modernisum NEVER degrades features, removes security encryption, reduces performance, or introduces artificial software limits for smaller clients. Every customer receives our full enterprise-grade, patent-backed software architecture.
- **Tailored Affordability Model**:
  - We actively collaborate with every school, startup, and enterprise to tailor subscription and project budgets to their realistic operational capacity.
  - Both parties thrive sustainably: the client business expands without debt or software barriers, and Modernisum's engineering team is compensated fairly without operational strain.
- **Core Business Axiom**:
  - *"We only grow when our customer's business grows. A thriving, delighted customer is our greatest foundation."*
  - The parent Modernisum studio homepage prominently features this growth symbiosis and the "Atithi Devo Bhava" family hospitality model.

## 18. Visual-First Storytelling (90% Visuals, 3D Interactive Stage & Hardware Motion Graphics) (Mandatory)
- **Zero Plain-Text Wall Policy**: Modern school leaders and enterprise founders engage 90% more with visual demonstrations than long text paragraphs.
- **Stitch-Inspired 3D Interactive Stage**:
  - Use Stitch-style 3D Pop-Out glass cards with subtle perspective depth (`transform-style: preserve-3d`).
  - Interactive animated SVG motion graphics for hardware: Turnstiles (opening barrier with LED pulse), Thermal receipt printers (ESC/POS paper cut), live GPS bus route telemetry, and 512-dimension face AI vector scanner.
  - Embed high-framerate software walkthrough containers equipped with official `VideoObject` schema.

## 19. Visual Screenshot Regression Holds & Playwright E2E Invariant (Mandatory)
- **Screenshot Verification Hold Protocol**:
  - Whenever visual layout, branding, navigation, or color components are modified, capture and hold before/after screenshots in the artifacts directory.
  - Inspect and analyze the screenshot visually against expected design specifications. A task is NEVER complete until the visual result matches expectations 100%.
  - Synchronize and update corresponding Playwright E2E test cases to assert new navigation titles (e.g., `Ecosystem`), new schemas, and RSS feed XML validity.

## 20. 120 FPS Buttery-Smooth Performance & Google SERP Sitelinks 6-Pack Architecture (Mandatory)
- **Compositor Zero-Repaint Standard**:
  - Replaces moving background elements with heavy blur filters (`blur(90px..120px)`) with hardware-accelerated static CSS radial gradient meshes (`transform: translate3d(0,0,0)`).
  - Apply `content-visibility: auto` with `contain-intrinsic-size` on below-the-fold sections, guaranteeing LCP < 1.2s, INP < 50ms, and CLS = 0.000.
- **Google SERP Sitelinks 6-Pack**:
  - Embed `SiteNavigationElement` and `SearchAction` (Sitelinks Searchbox) on `school.modernisum.com` targeting Downloads, Features, Pricing, Docs, Contact, and Releases.
  - Live automated RSS 2.0 / Atom feed (`/feed.xml`) and Google News Sitemap (`/news-sitemap.xml`) for 15-30 minute article indexing.
