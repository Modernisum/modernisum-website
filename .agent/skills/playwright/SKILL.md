---
name: playwright
description: >-
  Visual auditing, full-page screenshot capturing, UI/UX defect hunting, and automated end-to-end regression testing
  for Modernisum Web. Provides standardized screenshot workflows, visual layout validation, typography & text density
  judging, and in-place code remediation.
---

# Playwright Visual Auditing, Screenshot Inspection & Code Optimization Skill

> **Core Objective**:  
> Code and styling cannot be judged solely by reading text files. **Playwright is the primary visual inspection instrument** to capture high-density 1080p desktop and mobile full-page screenshots, judge visual balance, locate text bloat, identify overlapping sticky headers or clipped elements, and verify that all UI elements look focused, elegant, and frictionless.

---

## 1. Visual Inspection & Screenshot Workflow

1. **Capture Desktop & Mobile Screenshots**:
   - Playwright test suites inside `tests/` capture full-page and section screenshots directly into `tests/screenshots/` or brain artifacts:
     ```bash
     cmd /c npx playwright test tests/screenshot.spec.ts
     ```
2. **How to Judge a Screenshot (The Visual Inspection Checklist)**:
   - **Text Density Check**: Is there a paragraph longer than 3 lines? If yes, **cut the content in half** in code and convert it into high-contrast bullet badges or visual cards.
   - **Visual Weight & Hierarchy**: Does the brand logo, product title, and primary CTA immediately stand out?
   - **Spatial Balance & Whitespace**: Are containers taking full advantage of wide 1760px screens (`max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8`) with zero horizontal scrollbars?
   - **Contrast & Legibility**: In dark mode, is slate text crisp (`text-slate-200` / `text-slate-400`) against frosted glass? In light mode, is text sufficiently dark (`text-slate-900`)?
   - **Clipped or Bleeding Elements**: Check if dropdowns, sticky navbar pills, or cards clip off-screen or bleed behind lower z-index sections.

---

## 2. Standard Test Suites & Single Source of Truth

- **Tests Directory Structure**:
  - `tests/navigation.spec.ts`: Global navigation, floating island pill, dropdown megamenus, responsive drawer, theme toggle.
  - `tests/admin.spec.ts`: Admin Command Center, users management, dynamic telemetry editing, AI article generator.
  - `tests/school.spec.ts`: MOD School landing, 10 Pillars, Face AI turnstiles, Transparent Billing Calculator.
  - `tests/auth.spec.ts`: Liquid Glass AuthDialog, Sign In, Sign Up, SSO cross-domain state sync.
  - `tests/quote-calculator.spec.ts`: Interactive service quote estimator.
  - `tests/screenshot.spec.ts`: Full visual theme capture across desktop and mobile viewports.

---

## 3. Canonical Test Execution Protocol

- **Fast Static Validation First**:
  Always verify static TypeScript safety before triggering visual tests:
  ```bash
  cmd /c npx tsc --noEmit
  ```
- **Targeted Test Execution**:
  Run only the specific test file relevant to the modified surface:
  ```bash
  cmd /c npx playwright test tests/navigation.spec.ts
  cmd /c npx playwright test tests/school.spec.ts
  cmd /c npx playwright test tests/screenshot.spec.ts
  ```
- **In-Place Remediation Invariant**:
  When a visual flaw or text bloat is spotted in a screenshot, navigate immediately to the corresponding component or page file, refactor the layout or halve the copy, and re-run compilation to verify the fix.
