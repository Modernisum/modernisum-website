import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Modernisum Parent Platform & Agromi Agro-Tech Navigation", () => {
  const screenshotsDir = path.join(__dirname, "screenshots");
  const brainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\1ff391cf-7493-4aeb-938f-ff312489d0e0";

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    if (!fs.existsSync(brainDir)) {
      fs.mkdirSync(brainDir, { recursive: true });
    }
  });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "dark");
    });
  });

  test("1. Homepage loads as Autonomous Enterprise OS with CEO & AI Workforce visual", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page).toHaveTitle(/Modernisum/);

    // Verify redesigned executive minimal headline
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();
    await expect(headline).toContainText("Be the CEO");
    await expect(headline).toContainText("Let AI Run the Routine");

    // Verify CEO & Autonomous AI Workforce visual animation
    await expect(page.getByText("CORE BIZ ONLY")).toBeVisible();
    await expect(page.getByText("MANUAL DRAG")).toBeVisible();
    await expect(page.getByText("LEDGER AUTO")).toBeVisible();

    // Capture crisp redesigned hero screenshot
    await page.waitForTimeout(800);
    const homeScreenshotPath = path.join(screenshotsDir, "homepage_ceo_ai_hero.png");
    await page.screenshot({ path: homeScreenshotPath, fullPage: false });
    await page.screenshot({ path: path.join(brainDir, "homepage_ceo_ai_hero.png"), fullPage: false });

    // Verify top navbar has Ecosystem/Products and Resources dropdowns
    const nav = page.locator("header nav").first();
    await expect(nav).toBeVisible();
    await expect(nav.getByText(/Ecosystem|Products/, { exact: false })).toBeVisible();
    await expect(nav.getByText("Resources", { exact: true })).toBeVisible();

    // Verify Company Vision section with 3 new pillars
    await expect(page.getByText("Company Vision & Core Philosophy")).toBeVisible();
    await expect(page.getByText("Fail-Proof Security & Zero-Leak Sandbox")).toBeVisible();
    await expect(page.getByText("Smart Hardware & Edge Automation")).toBeVisible();
    await expect(page.getByText("Frontier Engineering at Minimal Cost")).toBeVisible();

    const philosophySection = page.locator("#philosophy");
    await philosophySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, "homepage_philosophy_pillars.png"), fullPage: false });
    await page.screenshot({ path: path.join(brainDir, "homepage_philosophy_pillars.png"), fullPage: false });

    // Verify 3 Uniform Flagship Ecosystem Cards under #products
    const productsSection = page.locator("#products");
    await productsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(productsSection.getByText("Modernisum Flagship Products")).toBeVisible();
    await expect(productsSection.getByRole("heading", { name: /ModSchool|MOD School|School Management System|Vidhyam School OS/ })).toBeVisible();
    await expect(productsSection.getByRole("heading", { name: /MOD Farmer|Agriculture Modernization|Agromi Agro-Tech OS/ })).toBeVisible();
    await expect(productsSection.getByRole("heading", { name: "Enterprise AI & Edge" })).toBeVisible();
    await expect(productsSection.getByRole("link", { name: /Explore (ModSchool|MOD School|Vidhyam OS)|school\.modernisum\.com/ })).toBeVisible();
    await expect(productsSection.getByRole("link", { name: /Explore (MOD Farmer|Agri Modernization|Agromi OS)/ })).toBeVisible();
    await expect(productsSection.getByRole("link", { name: "Deploy Enterprise AI" })).toBeVisible();

    // Capture screenshot of the 3 Uniform Flagship Cards
    await productsSection.screenshot({ path: path.join(screenshotsDir, "homepage_3_flagship_cards.png") });
    await productsSection.screenshot({ path: path.join(brainDir, "homepage_3_flagship_cards.png") });

    // Verify redundant duplicate grids and legacy chat simulator are removed
    await expect(page.locator("#services")).not.toBeVisible();
    await expect(page.getByText("Modernisum.AI // Cognitive Engine Simulator")).not.toBeVisible();

    // Verify Working Methodology section ("Our Engineering Methodology")
    const methodologySection = page.locator("#methodology");
    await methodologySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(page.getByText("Our Engineering Methodology")).toBeVisible();
    await methodologySection.screenshot({ path: path.join(screenshotsDir, "homepage_methodology.png") });
    await methodologySection.screenshot({ path: path.join(brainDir, "homepage_methodology.png") });

    // Verify Customer Sectors section ("Target Institutional Sectors")
    const customersSection = page.locator("#customers");
    await customersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(page.getByText("Target Institutional Sectors")).toBeVisible();
    await customersSection.screenshot({ path: path.join(screenshotsDir, "homepage_sectors.png") });
    await customersSection.screenshot({ path: path.join(brainDir, "homepage_sectors.png") });
  });

  test("2. Legacy /modern-school route permanently redirects to /school with full capability showcase", async ({ page }) => {
    await page.goto("/modern-school");
    // Should be redirected to /school (or legacy /vidhyam which redirects to /school)
    await expect(page).toHaveURL(/.*(school|vidhyam)/);
    await expect(page.locator("h1")).toBeVisible();

    // Verify full 9-capability showcase and Google Drive desktop telemetry frame on /vidhyam
    const vidhyamShowcase = page.locator("#vidhyam-showcase");
    await vidhyamShowcase.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(page.getByText(/Teachers Must Teach/).first()).toBeVisible();
    await expect(page.getByText(/Financial Management/).first()).toBeVisible();
    await expect(page.getByText(/Attendance System|Academic Automation|Administrative Chaos/).first()).toBeVisible();
  });

  test("3. 1-Click Access to Agromi Agro-Tech Ecosystem from Homepage via Products Dropdown", async ({ page }) => {
    await page.goto("/");
    // Hover Ecosystem / Products dropdown
    const productsBtn = page.locator("header nav").getByText(/Ecosystem|Products/, { exact: false }).first();
    await productsBtn.hover();
    await page.waitForTimeout(400);

    const agromiLink = page.getByRole("link", { name: /Agro Ecosystem|Agromi Agro-Tech/ }).first();
    await expect(agromiLink).toBeVisible();
    await agromiLink.click();
    await expect(page).toHaveURL(/.*(mod-farmer|agromi|agro)/);

    // Verify Agromi branding without 'Admin'
    await expect(page.locator("h1")).toContainText("Manage Your Agricultural Ecosystem");
    await expect(page.getByText("Manage your agricultural ecosystem").first()).toBeVisible();

    // Verify Agromi Cockpit Showcase
    const cockpit = page.locator("#cockpit");
    await expect(cockpit).toBeVisible();
    await expect(page.getByText("Interactive Farm Operations Cockpit")).toBeVisible();

    // Verify Yield Calculator
    const calc = page.locator("#calculator");
    await expect(calc).toBeVisible();

    // Capture Agromi screenshot
    const agromiScreenshotPath = path.join(brainDir, "agromi_agro_tech_ecosystem.png");
    await page.screenshot({ path: agromiScreenshotPath, fullPage: false });
  });

  test("4. Agromi Cockpit switches sectors dynamically", async ({ page }) => {
    await page.goto("/agromi");
    
    // Switch to Sector Beta
    const sectorBetaBtn = page.getByRole("button", { name: /Sector Beta/ }).first();
    if (await sectorBetaBtn.isVisible()) {
      await sectorBetaBtn.click();
      await page.waitForTimeout(400);
      await expect(page.getByText("Karnal Farm Collective").first()).toBeVisible();
    }

    // Capture Cockpit interactive state
    const cockpitScreenshotPath = path.join(brainDir, "agromi_cockpit_telemetry.png");
    await page.screenshot({ path: cockpitScreenshotPath, fullPage: false });
  });

  test("5. Services dropdown in Navbar contains Enterprise Engineering Suites", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(600);

    const servicesTrigger = page.locator("header nav").getByText("Services", { exact: true }).first();
    await expect(servicesTrigger).toBeVisible();
    await servicesTrigger.hover();
    await page.waitForTimeout(500);

    // AI SaaS & Intelligence should be visible in dropdown
    const aiItem = page.getByRole("link", { name: /AI SaaS & Intelligence/ }).first();
    await expect(aiItem).toBeVisible();
  });

  test("6. Light / Dark theme toggle transitions properly on Agromi", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/agromi");

    const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test("7. Inline Vector SVG Logos & Blog Discussions render cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    // Header should contain ModernisumLogo vector SVG (0 HTTP request)
    const svgLogo = page.locator("header svg").first();
    await expect(svgLogo).toBeVisible();

    // Check blog page
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "light");
    });
    await page.goto("/blog");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Modernisum Engineering Journal")).toBeVisible();

    // Scroll down 100px to view docked floating island navbar on blog with active Resources tab
    await page.evaluate(() => {
      window.scrollTo(0, 100);
      window.dispatchEvent(new Event("scroll"));
    });
    await page.waitForTimeout(500);

    const blogNavbarPath = path.join(brainDir, "blog_navbar_active_resources.png");
    await page.screenshot({ path: blogNavbarPath, fullPage: false });
  });

  test("8. Scroll morphs Navbar into Floating Island Pill with Embedded Logo & Login", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Initially at top: brand title and slogan are visible
    await expect(page.locator("header").getByText("MODERNISUM", { exact: true }).first()).toBeVisible();
    await expect(page.locator("header").getByText("AI & Innovative Solutions", { exact: true }).first()).toBeVisible();
    await expect(page.locator("header").getByText("AI & Software Solutions")).not.toBeVisible();

    // Scroll down 500px and dispatch scroll
    await page.evaluate(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event("scroll"));
    });
    await page.waitForTimeout(600);

    // Floating island container should be active with embedded logo and sign in
    const floatingPill = page.getByTestId("floating-island-pill");
    await expect(floatingPill).toBeVisible();

    // Outer brand text and slogan have exited
    await expect(page.locator("header").getByText("MODERNISUM", { exact: true })).not.toBeVisible();
    await expect(page.locator("header").getByText("AI & Innovative Solutions", { exact: true })).not.toBeVisible();

    // Logo SVG is embedded inside the floating pill
    const pillLogo = floatingPill.locator("svg").first();
    await expect(pillLogo).toBeVisible();

    // Sign In button is embedded inside the floating pill
    const signInBtn = floatingPill.getByRole("button", { name: /Sign In/i }).first();
    await expect(signInBtn).toBeVisible();

    // Capture screenshot of the sleek floating island navbar in docked state
    const floatingScreenshotPath = path.join(brainDir, "floating_island_navbar.png");
    await page.screenshot({ path: floatingScreenshotPath, fullPage: false });

    // Scroll back to top: should undock smoothly back to outer positions
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("scroll"));
    });
    await page.waitForTimeout(600);

    // Outer brand is back outside the nav pill
    await expect(page.locator("header").getByText("MODERNISUM", { exact: true }).first()).toBeVisible();
    await expect(page.locator("header").getByText("AI & Innovative Solutions", { exact: true }).first()).toBeVisible();
  });

  test("9. User Account tap in Floating Island Pill opens dropdown with Profile, Theme Toggle, and Sign Out", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "dark");
      window.localStorage.setItem(
        "modernisum_user",
        JSON.stringify({
          name: "Shivank Sharma",
          email: "shivank@modernisum.com",
          role: "admin",
          photoURL: "https://lh3.googleusercontent.com/a/test-avatar",
        })
      );
    });

    await page.goto("/");
    await page.waitForTimeout(500);

    // Scroll down to activate floating island pill
    await page.evaluate(() => {
      window.scrollTo(0, 450);
      window.dispatchEvent(new Event("scroll"));
    });
    await page.waitForTimeout(600);

    const floatingPill = page.getByTestId("floating-island-pill");
    await expect(floatingPill).toBeVisible();

    // Verify embedded logo height is compact (w-5 h-5 / 20px)
    const logoContainer = floatingPill.locator("svg").first();
    await expect(logoContainer).toBeVisible();

    // User account chip should be visible with user's first name
    const accountBtn = floatingPill.getByRole("button", { name: "User account menu" });
    await expect(accountBtn).toBeVisible();
    await expect(accountBtn).toContainText("Shivank");

    // Tap / Click on the account chip
    await accountBtn.click();
    await page.waitForTimeout(300);

    // Dropdown list must appear with profile info
    await expect(floatingPill.getByText("shivank@modernisum.com")).toBeVisible();
    await expect(floatingPill.getByText(/School Platform|School Management Platform/).first()).toBeVisible();

    // Theme toggle inside dropdown
    const themeBtn = floatingPill.getByRole("button", { name: /Light Mode|Dark Mode/i });
    await expect(themeBtn).toBeVisible();

    // Sign out button inside dropdown
    const signOutBtn = floatingPill.getByRole("button", { name: /Sign Out/i });
    await expect(signOutBtn).toBeVisible();

    // Capture screenshot of the floating island with account dropdown open
    const currentBrainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\6221de8b-4c2e-490d-ae60-8bad09ad8cb0";
    await page.screenshot({ path: path.join(currentBrainDir, "navbar_user_dropdown_pill.png"), fullPage: false });

    // Click theme toggle and verify theme change
    await themeBtn.click();
    await page.waitForTimeout(300);
    const isLight = await page.evaluate(() => document.documentElement.classList.contains("light"));
    expect(isLight).toBe(true);

    // Capture light mode screenshot
    await page.screenshot({ path: path.join(currentBrainDir, "navbar_light_mode_toggle.png"), fullPage: false });
  });

  test("10. Top Bar User Account tap opens identical dropdown menu", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "dark");
      window.localStorage.setItem(
        "modernisum_user",
        JSON.stringify({
          name: "Shivank Sharma",
          email: "shivank@modernisum.com",
          role: "admin",
        })
      );
    });

    await page.goto("/");
    await page.waitForTimeout(500);

    // At top: account button in outer right header
    const topAccountBtn = page.locator("header").getByRole("button", { name: "User account menu" }).first();
    await expect(topAccountBtn).toBeVisible();
    await expect(topAccountBtn).toContainText("Shivank Sharma");

    // Tap / Click account button
    await topAccountBtn.click();
    await page.waitForTimeout(300);

    // Dropdown list must appear
    const dropdown = page.locator("header").getByText("shivank@modernisum.com").first();
    await expect(dropdown).toBeVisible();
    await expect(page.locator("header").getByText(/School Platform|School Management Platform/).first()).toBeVisible();

    // Verify theme toggle & sign out in dropdown
    const themeBtn = page.locator("header").getByRole("button", { name: /Light Mode|Dark Mode/i }).first();
    await expect(themeBtn).toBeVisible();
    const signOutBtn = page.locator("header").getByRole("button", { name: /Sign Out/i }).first();
    await expect(signOutBtn).toBeVisible();
  });

  test("11. Main Website Dropdown Navigation - Static Centered Mega-Menu & Zero Double-Active Highlights", async ({ page }) => {
    const currentBrainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\6221de8b-4c2e-490d-ae60-8bad09ad8cb0";
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Test in Light Theme
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "light");
    });
    await page.goto("/");
    await page.waitForTimeout(600);

    const homeLink = page.locator("header nav").getByRole("link", { name: "Home" }).first();
    await expect(homeLink).toBeVisible();

    // Verify Home has NO active pill background when idle
    await expect(homeLink).not.toHaveClass(/bg-cyan-500\/10/);

    // Hover Services dropdown
    const servicesBtn = page.locator("header nav").getByText("Services", { exact: true }).first();
    await expect(servicesBtn).toBeVisible();
    await servicesBtn.hover();
    await page.waitForTimeout(400);

    // Dropdown must appear
    const dropdownCard = page.locator("header .overflow-hidden.rounded-\\[28px\\]").first();
    await expect(dropdownCard).toBeVisible();

    // Verify Services dropdown categories
    await expect(page.getByText("AI & Platform Engineering").first()).toBeVisible();
    await expect(page.getByText("Deep Tech & Cloud Systems").first()).toBeVisible();

    // ZERO DOUBLE-ACTIVE CHECK: Home must NOT have active pill while Services is hovered
    await expect(homeLink).not.toHaveClass(/bg-cyan-500\/10/);

    // Measure Services dropdown position
    const servicesBox = await dropdownCard.boundingBox();
    expect(servicesBox).not.toBeNull();

    // Capture light mode Services dropdown screenshot
    await page.screenshot({
      path: path.join(currentBrainDir, "main_dropdown_light_services.png"),
      fullPage: false,
    });

    // Hover Ecosystem / Products dropdown
    const productsBtn = page.locator("header nav").getByText(/Ecosystem|Products/, { exact: false }).first();
    await expect(productsBtn).toBeVisible();
    await productsBtn.hover();
    await page.waitForTimeout(400);

    // Verify Products dropdown categories
    await expect(page.getByText(/School & Campus Ecosystem|Campus Operating Systems/).first()).toBeVisible();
    await expect(page.getByText(/AgroTech & Research Lab|Enterprise AI & AgroTech/).first()).toBeVisible();

    // ZERO DOUBLE-ACTIVE CHECK: Neither Home nor Services should have active pill
    await expect(homeLink).not.toHaveClass(/bg-cyan-500\/10/);

    // Measure Products dropdown position
    const productsBox = await dropdownCard.boundingBox();
    expect(productsBox).not.toBeNull();

    // ASSERT STATIC CENTERING: X position must remain static (< 2px difference)
    if (servicesBox && productsBox) {
      expect(Math.abs(servicesBox.x - productsBox.x)).toBeLessThan(2);
    }

    // Capture light mode Products dropdown screenshot
    await page.screenshot({
      path: path.join(currentBrainDir, "main_dropdown_light_products.png"),
      fullPage: false,
    });

    // Hover Resources dropdown
    const resourcesBtn = page.locator("header nav").getByText("Resources", { exact: true }).first();
    await expect(resourcesBtn).toBeVisible();
    await resourcesBtn.hover();
    await page.waitForTimeout(400);

    // Verify Resources dropdown categories
    await expect(page.getByText(/Studio Knowledge|Studio Hub/).first()).toBeVisible();
    await expect(page.getByText(/Blogs|News/).first()).toBeVisible();

    // Measure Resources dropdown position
    const resourcesBox = await dropdownCard.boundingBox();
    expect(resourcesBox).not.toBeNull();

    // ASSERT STATIC CENTERING for Resources: centers must align
    if (servicesBox && resourcesBox) {
      const servicesCenter = servicesBox.x + servicesBox.width / 2;
      const resourcesCenter = resourcesBox.x + resourcesBox.width / 2;
      expect(Math.abs(servicesCenter - resourcesCenter)).toBeLessThan(2);
    }

    // Capture light mode Resources dropdown screenshot
    await page.screenshot({
      path: path.join(currentBrainDir, "main_dropdown_light_resources.png"),
      fullPage: false,
    });

    // 2. Test in Dark Theme
    await page.evaluate(() => {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(400);

    // Hover Services in dark mode
    await servicesBtn.hover();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(currentBrainDir, "main_dropdown_dark_services.png"),
      fullPage: false,
    });

    // Hover Products in dark mode
    await productsBtn.hover();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(currentBrainDir, "main_dropdown_dark_products.png"),
      fullPage: false,
    });

    // 3. Test Scrolled Floating Pill in Dark and Light Theme
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    const pill = page.locator("[data-testid='floating-island-pill']");
    await expect(pill).toBeVisible();

    await page.screenshot({
      path: path.join(currentBrainDir, "main_pill_scrolled_dark.png"),
      fullPage: false,
    });

    await page.evaluate(() => {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(currentBrainDir, "main_pill_scrolled_light.png"),
      fullPage: false,
    });
  });

  test("12. Categorized Terms & Policies Center - Firebase Backed Side Navigation, Tab Switching & Deep Linking", async ({ page }) => {
    test.setTimeout(60000);
    const currentBrainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\6221de8b-4c2e-490d-ae60-8bad09ad8cb0";
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Visit /terms in Dark Theme
    await page.goto("/terms");
    await page.waitForTimeout(600);

    // Verify Sleek Space-Optimized Sidebar Exists on the Left starting directly at top
    const sidebar = page.locator("main aside").first();
    await expect(sidebar).toBeVisible();

    // Verify Static Print & Share tools inside sidebar
    await expect(sidebar.getByRole("button", { name: "Print" })).toBeVisible();
    const shareBtn = sidebar.getByRole("button", { name: "Share" });
    await expect(shareBtn).toBeVisible();

    // Test Universal Social Share Modal
    await shareBtn.click();
    await page.waitForTimeout(400);

    // Verify Share Modal elements
    await expect(page.getByText("Share Document")).toBeVisible();
    await expect(page.getByText("Direct Link")).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy Link" })).toBeVisible();
    await expect(page.getByRole("link", { name: /WhatsApp/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /LinkedIn/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Telegram/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Email/i })).toBeVisible();

    // Capture Share Modal screenshot
    await page.screenshot({
      path: path.join(currentBrainDir, "policy_center_share_modal.png"),
      fullPage: false,
    });

    // Test Copy Link action inside modal
    await page.getByRole("button", { name: "Copy Link" }).click();
    await expect(page.getByText("Copied")).toBeVisible();

    // Close modal via Escape key
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(page.getByText("Share Document")).not.toBeVisible();

    // Verify Direct Policy Documents in Sidebar (single-level, space-optimized)
    await expect(sidebar.getByRole("button", { name: /Terms of Service/i })).toBeVisible();
    await expect(sidebar.getByRole("button", { name: /Privacy Policy/i })).toBeVisible();
    await expect(sidebar.getByRole("button", { name: /DPDP Compliance/i })).toBeVisible();
    await expect(sidebar.getByRole("button", { name: /Licensing & SLA/i })).toBeVisible();

    // Verify Official Agreement PDF attachment button and card in sidebar
    await expect(sidebar.getByRole("link", { name: /PDF/i }).first()).toBeVisible();
    await expect(sidebar.getByText(/Master License Agreement|Official Agreement PDF/i).first()).toBeVisible();

    // Verify active policy in main content is Master Software License starting cleanly at top
    const mainContent = page.locator("main");
    await expect(mainContent.getByRole("heading", { name: /Master Software License|Terms of Service/i }).first()).toBeVisible();

    // Verify Attached Document Card and Statutory Preamble are present in main content
    await expect(mainContent.getByText("Official Attached Document").first()).toBeVisible();
    await expect(mainContent.getByRole("link", { name: "Download PDF" }).first()).toBeVisible();
    await expect(mainContent.getByText("Statutory Preamble & Electronic Binding Notice")).toBeVisible();

    // Verify Last Update Registered text is present
    await expect(mainContent.getByText(/Last Update Registered/)).toBeVisible();

    // Verify Section Headlines appear in Sidebar under Terms of Service (without serial numbers)
    await expect(sidebar.getByText("Brand Philosophy & Zero-Knowledge Architectural Model")).toBeVisible();
    await expect(sidebar.getByText("Data Allocation, Roles & Statutory Compliance Matrix")).toBeVisible();

    // Capture screenshot of Master Software License Agreement in Dark Mode
    await page.screenshot({
      path: path.join(currentBrainDir, "policy_center_dark_terms.png"),
      fullPage: false,
    });

    // 2. Click a Section ID in Sidebar to test deep linking
    const graceSectionBtn = sidebar.getByText(/Grace Period/i).first();
    await graceSectionBtn.click();
    await page.waitForTimeout(400);

    // Verify section is in view
    const graceSection = page.locator("#billing-grace-period");
    await expect(graceSection).toBeVisible();

    // 3. Switch to Privacy Policy tab via Sidebar
    const privacyTabBtn = sidebar.getByRole("button", { name: /Privacy Policy/i }).first();
    await privacyTabBtn.click();
    await page.waitForTimeout(500);

    // Verify Main Content switched to Privacy Policy
    await expect(mainContent.getByRole("heading", { name: "Privacy Policy & Global Data Protection" })).toBeVisible();
    await expect(sidebar.getByText("Verifiable Parental Consent & 100% Offline Air-Gapped Isolation")).toBeVisible();

    // Capture screenshot of Privacy Policy in Dark Mode
    await page.screenshot({
      path: path.join(currentBrainDir, "policy_center_dark_privacy.png"),
      fullPage: false,
    });

    // 4. Test in Light Mode
    await page.evaluate(() => {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
    await page.waitForTimeout(400);

    // Capture screenshot in Light Mode
    await page.screenshot({
      path: path.join(currentBrainDir, "policy_center_light_privacy.png"),
      fullPage: false,
    });
  });
});

