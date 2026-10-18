import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Vidhyam School Ecosystem Suite", () => {
  const screenshotsDir = path.join(__dirname, "screenshots");

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test("1. Vidhyam Landing Page - Hero & Value Proposition", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/school");
    await expect(page).toHaveTitle(/ModSchool|MOD School|Modernisum School|School OS|Vidhyam/i);

    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Verify brand logo layout in Navbar: School with MODERNISUM below
    const brandContainer = page.locator("header").locator("[aria-label*='School'], [aria-label*='ModSchool']").first();
    await expect(brandContainer).toBeVisible();
    await expect(brandContainer.getByText(/School|ModSchool/i)).toBeVisible();
    await expect(brandContainer.getByText("MODERNISUM")).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, "vidhyam_landing_hero.png"),
      fullPage: false,
    });
  });

  test("2. Vidhyam Interactive ROI Calculator", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/school");

    const roiSection = page.locator("#calculator");
    if (await roiSection.count() > 0) {
      await roiSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const studentSlider = page.locator("input[type='range']").first();
      if (await studentSlider.count() > 0) {
        await studentSlider.fill("1850");
        await page.waitForTimeout(300);
      }

      await page.screenshot({
        path: path.join(screenshotsDir, "vidhyam_roi_interactive.png"),
        fullPage: false,
      });
    }
  });

  test("3. Vidhyam Institutional Demo Request Form", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/school");

    const demoSection = page.locator("#demo");
    if (await demoSection.count() > 0) {
      await demoSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const schoolInput = page.locator("input[placeholder*='Modern Public School']");
      if (await schoolInput.count() > 0) {
        await schoolInput.fill("Delhi Public Modern Academy");
      }

      const nameInput = page.locator("input[placeholder*='Rajesh Sharma']");
      if (await nameInput.count() > 0) {
        await nameInput.fill("Dr. Rajeshwar Sharma");
      }

      const emailInput = page.locator("input[type='email']").last();
      if (await emailInput.count() > 0) {
        await emailInput.fill("principal@dpma-edu.in");
      }

      await page.screenshot({
        path: path.join(screenshotsDir, "vidhyam_demo_form_filled.png"),
        fullPage: false,
      });
    }
  });

  test("4. Vidhyam Features Page & Navigation Verification", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Verify Navbar has "Ecosystem" linking to /mod-school/features (or /school/features)
    await page.goto("/school");
    const ecosystemNavLink = page.locator("header nav").getByRole("link", { name: "Ecosystem" }).first();
    await expect(ecosystemNavLink).toBeVisible();
    await expect(ecosystemNavLink).toHaveAttribute("href", /\/(mod-school|school)\/features/);
    await expect(page.locator("header nav").getByText("Use Cases")).not.toBeVisible();

    // 2. Navigate to Features page
    await page.goto("/mod-school/features");
    await expect(page).toHaveURL(/\/(mod-school|school|vidhyam)\/features/);
    await expect(page).toHaveTitle(/Features.*Capabilities|Platform Capabilities & Features/i);

    // 3. Verify Core Educational Philosophy Banner
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Teachers Must Teach");
    await expect(page.getByText("Schools Must Educate").first()).toBeVisible();

    // 4. Verify Reusable Bento Showcase Cards
    await expect(page.getByText(/Financial Management/).first()).toBeVisible();
    await expect(page.getByText(/Smart Academic Automation/).first()).toBeVisible();
    await expect(page.getByText(/Attendance System|Attendance/).first()).toBeVisible();
    await expect(page.getByText(/Browser Extension|Extension/).first()).toBeVisible();
    await expect(page.getByText(/Desktop Security|Offline/).first()).toBeVisible();

    // 5. Verify the Large Financial Ledger Card Interactive Tabs
    const expensesTab = page.getByRole("button", { name: "expenses" });
    if (await expensesTab.isVisible()) {
      await expensesTab.click();
      await page.waitForTimeout(200);
    }

    // 6. Capture Light Mode Screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, "vidhyam_features_page_light.png"),
      fullPage: false,
    });

    // 7. Test in Dark Theme
    await page.evaluate(() => {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(300);

    // 8. Capture Dark Mode Screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, "vidhyam_features_page_dark.png"),
      fullPage: false,
    });
  });

  test("5. Vidhyam Navbar Dropdown with Core Capabilities individual cards & Home Icon", async ({ page }) => {
    const brainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\6221de8b-4c2e-490d-ae60-8bad09ad8cb0";
    await page.setViewportSize({ width: 1440, height: 900 });

    // Test in Light Theme first
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "light");
    });
    await page.goto("/school");
    await page.waitForTimeout(600);

    // Verify "Home" link with icon exists and has NO active pill when idle
    const homeLink = page.locator("header nav").getByRole("link", { name: "Home" }).first();
    await expect(homeLink).toBeVisible();
    await expect(homeLink).not.toHaveClass(/bg-sky-500\/10/);

    const ecosystemBtn = page.locator("header nav").getByText("Ecosystem", { exact: true }).first();
    await expect(ecosystemBtn).toBeVisible();
    await ecosystemBtn.hover();
    await page.waitForTimeout(400);

    // ZERO DOUBLE-ACTIVE: Home must NOT have active pill while Ecosystem is hovered
    await expect(homeLink).not.toHaveClass(/bg-sky-500\/10/);

    // 1. Verify Ecosystem Dropdown in Light Theme
    const dropdownCard = page.locator("header .overflow-hidden.rounded-\\[28px\\]").first();
    await expect(dropdownCard).toBeVisible();

    // Verify 3 distinct categories in Ecosystem dropdown
    await expect(page.getByText("Applications", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Extensions & Plugins", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Devices & Hardware", { exact: true }).first()).toBeVisible();

    // Verify dropdown items across categories
    const schoolOsItem = page.getByText("School OS").first();
    await expect(schoolOsItem).toBeVisible();
    await expect(page.getByText("Employee App").first()).toBeVisible();
    await expect(page.getByText("Student App").first()).toBeVisible();

    // Hover over Extensions & Plugins category to reveal plugins
    const extCat = page.locator("header").getByText("Extensions & Plugins", { exact: true }).first();
    if (await extCat.isVisible()) {
      await extCat.hover();
      await page.waitForTimeout(300);
      await expect(page.getByText("Browser Extension").first()).toBeVisible();
      await expect(page.getByText("Financial & Fee Plugins").first()).toBeVisible();
    }

    // Measure bounding box of Ecosystem dropdown
    const ecoBox = await dropdownCard.boundingBox();
    expect(ecoBox).not.toBeNull();

    // Hover over School OS item to trigger mouse spotlight and card hover styling
    await schoolOsItem.hover();
    await page.waitForTimeout(400);

    // Capture light mode ecosystem dropdown screenshot
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_dropdown_light_ecosystem.png"),
      fullPage: false,
    });

    // 2. Hover over "Resources" link to verify Static Centered Dropdown
    const resourcesBtn = page.locator("header nav").getByText("Resources", { exact: true }).first();
    await expect(resourcesBtn).toBeVisible();
    await resourcesBtn.hover();
    await page.waitForTimeout(400);

    // ZERO DOUBLE-ACTIVE: Neither Home nor Ecosystem should have active pill while Resources is hovered
    await expect(homeLink).not.toHaveClass(/bg-sky-500\/10/);
    await expect(ecosystemBtn).not.toHaveClass(/bg-sky-500\/10/);

    // Verify distinct category and items in Resources dropdown
    await expect(page.getByText(/Campus Resources|Campus Hub/).first()).toBeVisible();
    await expect(page.getByText("About").first()).toBeVisible();
    await expect(page.getByText("Blogs").first()).toBeVisible();
    await expect(page.getByText("Terms & Policy").first()).toBeVisible();

    // Measure bounding box of Resources dropdown
    const resBox = await dropdownCard.boundingBox();
    expect(resBox).not.toBeNull();

    // ASSERT STATIC DROPDOWN: The center coordinate of the dropdown must remain static (within 25px)
    if (ecoBox && resBox) {
      const ecoCenter = ecoBox.x + ecoBox.width / 2;
      const resCenter = resBox.x + resBox.width / 2;
      expect(Math.abs(ecoCenter - resCenter)).toBeLessThan(25);
    }

    // Capture light mode resources dropdown screenshot
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_dropdown_light_resources.png"),
      fullPage: false,
    });

    // 3. Verify Pricing link is adjacent to Resources and Download is removed from navbar
    const pricingLink = page.locator("header nav").getByRole("link", { name: "Pricing" }).first();
    await expect(pricingLink).toBeVisible();
    await expect(pricingLink).toHaveAttribute("href", /\/(mod-school|vidhyam|school)\/pricing/);
    await expect(page.locator("header nav").getByRole("link", { name: "Download" })).not.toBeVisible();

    // Hover Pricing link to verify clean single hover state
    await pricingLink.hover();
    await page.waitForTimeout(300);
    await expect(homeLink).not.toHaveClass(/bg-sky-500\/10/);
    await expect(ecosystemBtn).not.toHaveClass(/bg-sky-500\/10/);
    await expect(resourcesBtn).not.toHaveClass(/bg-sky-500\/10/);

    // 3. Test in Dark Theme
    await page.evaluate(() => {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(400);

    // Hover Ecosystem in dark mode
    await ecosystemBtn.hover();
    await page.waitForTimeout(300);
    const darkSchoolOsItem = page.getByText("School OS").first();
    await darkSchoolOsItem.hover();
    await page.waitForTimeout(300);

    // Capture dark mode dropdown screenshot
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_dropdown_dark_ecosystem.png"),
      fullPage: false,
    });

    // Test scrolled floating island pill logo visibility & transparency
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    const pill = page.locator("[data-testid='floating-island-pill']");
    await expect(pill).toBeVisible();

    // Capture floating pill in dark mode
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_pill_scrolled_dark.png"),
      fullPage: false,
    });

    // Switch to light mode while scrolled to test light mode floating pill
    await page.evaluate(() => {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
    await page.waitForTimeout(400);

    // Capture floating pill in light mode
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_pill_scrolled_light.png"),
      fullPage: false,
    });
  });

  test("6. Vidhyam Registration Page - Left-Aligned Split Layout & Light/Dark Theme Verification", async ({ page }) => {
    const brainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\6221de8b-4c2e-490d-ae60-8bad09ad8cb0";
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Test in Light Theme first
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "light");
    });
    await page.goto("/vidhyam/register");
    await page.waitForTimeout(600);

    // Verify main page title
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Register School");

    // Verify redundant duplicate mini-header is removed
    await expect(page.getByText("BY MODERNISUM", { exact: true })).not.toBeVisible();

    // Verify 2-Column Split Layout: Form on Left, Telemetry Cockpit on Right
    const formHeading = page.getByRole("heading", { name: "School Identity" });
    await expect(formHeading).toBeVisible();

    const rightColHeading = page.getByText(/Included in Your Workspace|Fleet Telemetry/);
    await expect(rightColHeading).toBeVisible();

    // Verify form input is interactive
    const schoolNameInput = page.locator("input[placeholder*='Doon Heritage']");
    await expect(schoolNameInput).toBeVisible();
    await schoolNameInput.fill("Delhi Public Academy");

    // Advance to Step 2
    const nextBtn = page.getByRole("button", { name: "Next", exact: true });
    await nextBtn.click();
    await page.waitForTimeout(400);

    // Verify Step 2 is active
    await expect(page.getByRole("heading", { name: "Campus Location" })).toBeVisible();

    // Return to Step 1
    const prevBtn = page.getByRole("button", { name: "Previous" });
    await prevBtn.click();
    await page.waitForTimeout(300);
    await expect(formHeading).toBeVisible();

    // Capture Light Mode screenshot
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_register_light_split.png"),
      fullPage: false,
    });

    // 2. Switch to Dark Mode
    await page.evaluate(() => {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(400);

    // Capture Dark Mode screenshot
    await page.screenshot({
      path: path.join(brainDir, "vidhyam_register_dark_split.png"),
      fullPage: false,
    });
  });

  test("7. Vidhyam Native Desktop & Hardware Gadgets Ecosystem Verification", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/school");

    // 1. Verify Native Desktop & Live Client Workflow (Windows & Linux Subsystems)
    const liveDemoSection = page.locator("#live-demo");
    await expect(liveDemoSection).toBeVisible();
    await expect(liveDemoSection.getByText(/Windows & Linux/i).first()).toBeVisible();
    await expect(liveDemoSection.getByText(/Native Desktop.*Workflow|100% नेटिव डेस्कटॉप वर्कफ़्लो/i).first()).toBeVisible();

    // 2. Verify Hardware Ecosystem Section
    const hardwareSection = page.locator("#hardware-ecosystem");
    await expect(hardwareSection).toBeVisible();
    await expect(hardwareSection.getByText(/Engineered Campus Gadgets|इंजीनियर्ड गैजेट्स व टूल्स/i)).toBeVisible();
    await expect(hardwareSection.getByText(/Face AI Gate Turnstiles|फेस AI बायोमेट्रिक टर्नस्टाइल/i).first()).toBeVisible();
  });
});

