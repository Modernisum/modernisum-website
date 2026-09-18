# Granular Task Matrix (100 Tasks): Modernisum Liquid Glass Platform

This document tracks all 100 granular engineering tasks across 9 execution phases.

---

### Phase 1: StitchMCP Screen Generation & Visual Design System (Tasks 1–10)
- [x] **TASK-001**: Initialize Stitch project for Modernisum using StitchMCP (`create_project`). (Project ID: `18267741347126511953`)
- [x] **TASK-002**: Generate Liquid Glass Homepage & Hero design screen with StitchMCP (`generate_screen_from_text`). (Screen ID: `ab54769ce075442fbfe3d2601fb8b093`)
- [x] **TASK-003**: Generate AI Services & Solutions interactive catalog screen in Stitch design system.
- [x] **TASK-004**: Generate Modern School ERP Showcase screen with ecosystem components.
- [x] **TASK-005**: Generate Liquid Glass Sign In / Sign Up Modal dialog screen with Google auth trigger.
- [x] **TASK-006**: Generate Admin Dashboard Bento Grid analytics screen. (Screen ID: `193217b970204caaa5197124fb0c31c6`)
- [x] **TASK-007**: Generate Admin Media Manager & Gemini Vision tagging screen.
- [x] **TASK-008**: Generate Admin Inline Spreadsheet-Style Table screen.
- [x] **TASK-009**: Export and catalog Stitch design tokens (colors: `#00f2fe`, `#7928ca`, `#10b981`, `#f59e0b`, `#111319`, `#0c0e13`; blur: `24px`-`48px`).
- [x] **TASK-010**: Finalize Stitch design alignment against user reference images (Image 1, 2, 3).

---

### Phase 2: Design Tokens, CSS Liquid Glass Utilities & Layout Shells (Tasks 11–20)
- [x] **TASK-011**: Configure Tailwind CSS with custom blur filters (`blur-2xl`, `blur-3xl`), border opacity stops, and glass refraction shadows.
- [x] **TASK-012**: Implement `AmbientBackground.tsx` with animated fluid gradient mesh orbs (cyan, purple, emerald, amber).
- [x] **TASK-013**: Implement `LiquidGlassCard.tsx` with dynamic cursor spotlight tracking (`radial-gradient` specular highlight).
- [x] **TASK-014**: Implement `GlassButton.tsx` with spring physics feedback, glowing halo aura, and loading state.
- [x] **TASK-015**: Implement `GlassInput.tsx` with embedded icons, smooth focus transition, and error tooltips.
- [x] **TASK-016**: Implement `GlassModal.tsx` dialog wrapper with backdrop blur and smooth entrance/exit springs.
- [x] **TASK-017**: Implement `Navbar.tsx` floating liquid glass pill with active indicator, mobile hamburger drawer, and theme switch.
- [x] **TASK-018**: Implement `Footer.tsx` with translucent columns, quick navigation links, contact badges, and newsletter subscribe box.
- [x] **TASK-019**: Integrate Google Font (Plus Jakarta Sans + Space Grotesk) with preloading and zero layout shift.
- [x] **TASK-020**: Setup dark/light theme provider with smooth CSS variables transition.

---

### Phase 3: Public Website Pages & Content Migration (Tasks 21–35)
- [x] **TASK-021**: Build `HeroSection.tsx` with bold value proposition, animated KPI counters, and interactive CTA buttons.
- [x] **TASK-022**: Build `HeroAIChatPreview.tsx` embedded glass chat simulator showcasing Modernisum AI capabilities.
- [x] **TASK-023**: Build `ServicesGrid.tsx` migrating all services from legacy site with liquid glass interactive cards.
- [x] **TASK-024**: Build `ModernSchoolSection.tsx` migrating full Modern School ERP ecosystem (Bus tracking, RFID, AI learning).
- [x] **TASK-025**: Build `ProjectsCarousel.tsx` migrating portfolio items with glass overlay modals.
- [x] **TASK-026**: Build `FunFactsSection.tsx` with animated number counters for satisfied clients, projects, and uptime.
- [x] **TASK-027**: Build `TestimonialsSection.tsx` with frosted review cards and client ratings.
- [x] **TASK-028**: Build `FAQSection.tsx` with smooth glass accordions and embedded Google `FAQPage` JSON-LD schema.
- [x] **TASK-029**: Build `AboutPage` (`/about`) with company history, leadership bios, and E-E-A-T trust signals.
- [x] **TASK-030**: Build `ServicesPage` (`/services`) with category filters (Mobile, Web, IoT, Cloud, AI).
- [x] **TASK-031**: Build `SubserviceDetailPage` (`/services/[slug]`) with deep technical specs and direct quotation trigger.
- [x] **TASK-032**: Build `ProjectsPage` (`/projects`) and `ProjectDetailPage` (`/projects/[slug]`) with case study metrics.
- [x] **TASK-033**: Build `ModernSchoolPage` (`/modern-school`) dedicated ecosystem landing page.
- [x] **TASK-034**: Build `BlogPage` (`/blog`) and `BlogPostDetailPage` (`/blog/[slug]`) with read-time, tags, and author cards.
- [x] **TASK-035**: Build `ContactPage` (`/contact`) with interactive glass quote calculator and Meerut office map.

---

### Phase 4: Google Drive 5TB Storage Integration & Media API (Tasks 36–45)
- [x] **TASK-036**: Install Google APIs client library (`googleapis`).
- [x] **TASK-037**: Implement `lib/gdrive.ts` loading credentials securely from `d:\modernisum\vidhyam\service-account.json`.
- [x] **TASK-038**: Create Google Drive upload function streaming multipart file data directly into designated drive folder.
- [x] **TASK-039**: Configure public sharing permissions (`reader`, `anyone`) on uploaded files automatically via Drive API.
- [x] **TASK-040**: Generate direct CDN-compatible webContentLink and thumbnail links for uploaded assets.
- [x] **TASK-041**: Build serverless route handler `/api/upload` with file type validation (images, PDFs, documents) and size checks.
- [x] **TASK-042**: Implement client-side canvas WebP conversion before uploading to conserve bandwidth.
- [x] **TASK-043**: Build `/api/media` handler to list, search, and manage Google Drive files from admin panel.
- [x] **TASK-044**: Add fallback storage driver for local dev if service account is disconnected.
- [x] **TASK-045**: Verify Google Drive upload and public URL streaming with automated test script.

---

### Phase 5: Database Architecture, Caching & Data Seed Engine (Tasks 46–55)
- [x] **TASK-046**: Implement `lib/db.ts` with serverless singleton cached connection pattern (`global.mongooseCache`).
- [x] **TASK-047**: Design Mongoose Schema for `User` (email, password hash, role, provider, profile).
- [x] **TASK-048**: Design Mongoose Schema for `Service` (title, slug, category, description, features, icon, pricing).
- [x] **TASK-049**: Design Mongoose Schema for `Project` (title, slug, client, category, imageUrl, tags, metrics).
- [x] **TASK-050**: Design Mongoose Schema for `BlogPost` (title, slug, excerpt, content, coverImage, author, tags, publishedAt).
- [x] **TASK-051**: Design Mongoose Schema for `Enquiry` (name, email, phone, serviceNeeded, budget, message, status).
- [x] **TASK-052**: Design Mongoose Schema for `SiteSettings` (contact info, hours, social links, SEO tags).
- [x] **TASK-053**: Implement `lib/seed-data.ts` containing complete pre-seeded content from legacy website.
- [x] **TASK-054**: Build resilient zero-downtime database fallback: serve cached seed data instantly if MongoDB is offline.
- [x] **TASK-055**: Build In-Memory / Redis Caching helper (`lib/data-engine.ts`) with sub-10ms cache retrieval.

---

### Phase 6: Authentication System & Liquid Glass Auth Modal (Tasks 56–65)
- [x] **TASK-056**: Install and configure `jose` / `bcryptjs` for encrypted JWT session tokens.
- [x] **TASK-057**: Build `/api/auth/register` with bcrypt password hashing and email duplication checks.
- [x] **TASK-058**: Build `/api/auth/login` issuing `httpOnly`, `Secure`, `SameSite=Lax` session cookies.
- [x] **TASK-059**: Build `/api/auth/logout` clearing authentication cookies safely.
- [x] **TASK-060**: Build `/api/auth/me` endpoint returning current session context.
- [x] **TASK-061**: Implement Google OAuth popup flow trigger with client-side credential handler.
- [x] **TASK-062**: Build `AuthDialog.tsx` component with tab switching (Sign In / Sign Up) and glass aesthetics.
- [x] **TASK-063**: Implement form validation with error tooltips and clear feedback.
- [x] **TASK-064**: Add delightful feedback: button loading spinners, shake animation on error, confetti on success.
- [x] **TASK-065**: Integrate AuthDialog with global state so it can be invoked from any button or protected action.

---

### Phase 7: AI-Powered Admin Panel with Gemini API & Low-Effort Workflows (Tasks 66–80)
- [x] **TASK-066**: Implement `middleware.ts` protecting all `/admin/*` routes with edge JWT validation.
- [x] **TASK-067**: Build `app/admin/layout.tsx` isolated client-side shell with glass sidebar and breadcrumb topbar.
- [x] **TASK-068**: Build `CommandPalette.tsx` (`Ctrl + K` / `Cmd + K`) for instant navigation and natural language AI queries.
- [x] **TASK-069**: Build Bento Grid `app/admin/dashboard/page.tsx` with live metric widgets and sparklines.
- [x] **TASK-070**: Build Gemini API route `/api/admin/ai/generate` for one-click blog and service generation.
- [x] **TASK-071**: Build Gemini SEO synthesizer for auto-generating `meta_title`, `meta_description`, and keywords.
- [x] **TASK-072**: Build Gemini Vision image analysis endpoint for auto alt-text and tags.
- [x] **TASK-073**: Build Natural Language search parser converting plain English queries to administrative routes.
- [x] **TASK-074**: Build `ServicesCMS` (`/admin/services`) with spreadsheet-style inline table cell editing.
- [x] **TASK-075**: Build case study manager with metrics and tags in `/admin/services`.
- [x] **TASK-076**: Build Gemini AI writing assistant directly in the executive dashboard.
- [x] **TASK-077**: Build `EnquiriesCMS` (`/admin/enquiries`) with status toggles (New, In Progress, Resolved) and WhatsApp links.
- [x] **TASK-078**: Build `AdminMediaPage` (`/admin/media`) with Google Drive upload and instant clipboard copy link.
- [x] **TASK-079**: Implement Optimistic UI updates on table rows for instantaneous (<1ms) edit feedback.
- [x] **TASK-080**: Build instant feedback badges with frosted glass real-time notification alerts.

---

### Phase 8: Playwright Testing Suite & Quality Assurance (Tasks 81–90)
- [x] **TASK-081**: Install Playwright test framework (`@playwright/test`).
- [x] **TASK-082**: Configure `playwright.config.ts` with local system browser channel (`msedge` / Chromium).
- [x] **TASK-083**: Write Playwright test for Homepage load, hero rendering, and scroll animations.
- [x] **TASK-084**: Write Playwright test for Navigation menu links and 3-click rule verification.
- [x] **TASK-085**: Write Playwright test for Liquid Glass Auth Dialog (Sign In / Sign Up form validation).
- [x] **TASK-086**: Write Playwright test for Contact quote calculator and lead submission API.
- [x] **TASK-087**: Write Playwright test for Admin authentication barrier and session management.
- [x] **TASK-088**: Write Playwright test for Admin Bento Grid, Command Palette (`Ctrl + K`), and inline editing.
- [x] **TASK-089**: Run all 8 Playwright test suites (8 passed in 11.0s, 100% pass rate).
- [x] **TASK-090**: Verify zero regression errors across public and admin routes.

---

### Phase 9: Performance Optimization, Core Web Vitals & SEO Launch (Tasks 91–100)
- [x] **TASK-091**: Verify SSG and ISR build outputs (`npm run build` completed with code 0 across all 38 static and dynamic routes).
- [x] **TASK-092**: Audit Core Web Vitals: verify CLS = 0 with reserved layout boxes and next/image sizing.
- [x] **TASK-093**: Audit LCP: Largest Contentful Paint optimized with font preloading and Google Fonts.
- [x] **TASK-094**: Audit INP: Interaction to Next Paint < 50ms with lightweight Framer Motion springs.
- [x] **TASK-095**: Implement dynamic `app/sitemap.ts` automatically generating valid XML for all pages, services, and blogs.
- [x] **TASK-096**: Implement dynamic `app/robots.ts` with search crawler directives.
- [x] **TASK-097**: Configure OpenGraph social cards, Twitter summary tags, and brand logos.
- [x] **TASK-098**: Verify full Google JSON-LD schema integration (`FAQPage`, `TechArticle`, `Organization`).
- [x] **TASK-099**: Audit security: HTTP-only cookies, password hashing with bcrypt, input sanitization.
- [x] **TASK-100**: Final end-to-end verification, update documentation, and present production platform to user.
