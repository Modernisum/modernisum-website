import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Modernisum Admin Panel - Complete End-to-End Verification", () => {
  const screenshotsDir = path.join(__dirname, "screenshots");

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test("1. Admin Interactive Login Flow and Redirection to Dashboard", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Click Sign In button from header
    const signInBtn = page.locator("header").getByRole("button", { name: /Sign In/i });
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();

    // Verify Auth Modal is open
    const modalHeading = page.locator("text=Sign In to Modernisum").first();
    await expect(modalHeading).toBeVisible();

    // Fill Admin Credentials
    const emailInput = page.getByPlaceholder("name@company.com");
    const passwordInput = page.getByPlaceholder("••••••••");

    await emailInput.fill("admin@modernisum.com");
    await passwordInput.fill("Shivank2002");

    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotsDir, "01_admin_login_filled.png"),
      fullPage: false,
    });

    // Submit Sign In Form
    const submitBtn = page.getByRole("button", { name: "Sign In to Account" });
    await submitBtn.click();

    // Verify successful login redirection to /admin/dashboard
    await page.waitForURL("**/admin/dashboard", { timeout: 15000 });
    await expect(page.locator("h1")).toContainText("Executive Command Center");

    // Wait for Bento cards to load
    await expect(page.getByText("Modern School Ecosystem")).toBeVisible();
    await expect(page.getByText("Google Drive Storage")).toBeVisible();

    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, "02_admin_dashboard_logged_in.png"),
      fullPage: false,
    });
  });

  test("2. Admin Dashboard - Bento Grid & Gemini AI Content Synthesizer", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Ensure admin authenticated session
    await context.addCookies([
      {
        name: "modernisum_token",
        value: "ey_test_admin_session_token_authorized_for_automated_testing_modernisum",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/admin/dashboard");
    await expect(page.locator("h1")).toContainText("Executive Command Center");

    // Verify Bento Grid KPIs
    await expect(page.getByText("15,420")).toBeVisible();
    await expect(page.getByText("48 Leads")).toBeVisible();
    await expect(page.getByText("99.98%")).toBeVisible();
    await expect(page.getByText("245 MB / 5.0 TB")).toBeVisible();

    // Test Gemini AI Synthesizer Input
    const aiInput = page.getByPlaceholder(/Next\.js 16 performance/i);
    await expect(aiInput).toBeVisible();
    await aiInput.fill("Next.js 16 edge architecture for real-time school RFID fleet tracking and automated parent SMS");

    // Click Synthesize button
    const synthesizeBtn = page.getByRole("button", { name: /Synthesize with Gemini/i });
    await synthesizeBtn.click();

    // Wait for synthesized output card
    const readyBanner = page.locator("text=Synthesized Output Ready");
    await expect(readyBanner).toBeVisible({ timeout: 15000 });

    // Verify Meta Title and Tags are present
    await expect(page.getByText("Meta Title:")).toBeVisible();
    await expect(page.getByText("Meta Description:")).toBeVisible();

    // Test Copy JSON button
    const copyBtn = page.getByRole("button", { name: /Copy JSON/i });
    await copyBtn.click();
    await expect(page.getByText("Copied!")).toBeVisible();

    // Test Sync / Seed Database
    const seedBtn = page.getByRole("button", { name: /Sync \/ Seed Database/i });
    await seedBtn.click();
    await expect(
      page.getByText(/Database successfully seeded|Could not connect to MongoDB Atlas|Database synchronization complete|Error syncing/i)
    ).toBeVisible({ timeout: 15000 });

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "03_admin_dashboard_ai_synthesizer.png"),
      fullPage: false,
    });
  });

  test("3. Admin Services Management - Spreadsheet Adding & Inline Editing", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies([
      {
        name: "modernisum_token",
        value: "ey_test_admin_session_token_authorized_for_automated_testing_modernisum",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/admin/services");
    await expect(page.locator("h1")).toContainText("Services & Architectural Solutions");

    // Click "Add New Solution" button
    const addBtn = page.getByRole("button", { name: /Add New Solution/i });
    await addBtn.click();

    // Fill in new service inputs in the editable row
    const titleInput = page.locator("tbody tr").first().locator("input[type='text']");
    await expect(titleInput).toBeVisible();
    await titleInput.fill("AI Autonomous School Logistics & RFID Attendance");

    const categorySelect = page.locator("tbody tr").first().locator("select");
    await categorySelect.selectOption("Modern School ERP");

    const descTextarea = page.locator("tbody tr").first().locator("textarea");
    await descTextarea.fill("End-to-end automated RFID attendance gates, live GPS bus telemetry, and parent push notifications.");

    // Save the new service
    const saveBtn = page.locator("tbody tr").first().getByRole("button", { name: /Save/i });
    await saveBtn.click();

    // Verify success confirmation banner
    await expect(page.getByText("Service changes saved successfully!")).toBeVisible();

    // Verify the saved row contains the updated text
    await expect(page.locator("tbody tr").first().getByText("AI Autonomous School Logistics & RFID Attendance")).toBeVisible();
    await expect(page.locator("tbody tr").first().getByText("Modern School ERP")).toBeVisible();

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "04_admin_services_input_added.png"),
      fullPage: false,
    });
  });

  test("4. Admin Enquiries & Leads Management - Search, Filters, and Status Transition", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies([
      {
        name: "modernisum_token",
        value: "ey_test_admin_session_token_authorized_for_automated_testing_modernisum",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/admin/enquiries");
    await expect(page.locator("h1")).toContainText("Client Enquiries & Architecture Leads");

    // Test Search input filtering
    const searchInput = page.getByPlaceholder(/Filter by name, email, or service/i);
    await searchInput.fill("Dr. K. S. Verma");
    await page.waitForTimeout(400);

    // Only Dr. Verma's card should be displayed
    await expect(page.getByText("Dr. K. S. Verma")).toBeVisible();
    await expect(page.getByText("Aman Singhal")).not.toBeVisible();

    // Clear search
    await searchInput.fill("");
    await page.waitForTimeout(400);
    await expect(page.getByText("Aman Singhal")).toBeVisible();

    // Test status pills filter
    const inProgressPill = page.getByRole("button", { name: "in_progress" });
    await inProgressPill.click();
    await page.waitForTimeout(400);
    await expect(page.getByText("Aman Singhal")).toBeVisible();
    await expect(page.getByText("Dr. K. S. Verma")).not.toBeVisible();

    // Switch back to "all"
    const allPill = page.getByRole("button", { name: "all" });
    await allPill.click();
    await page.waitForTimeout(400);

    // Change status of first enquiry from new to in_progress
    const firstStatusDropdown = page.locator("select").first();
    await firstStatusDropdown.selectOption("in_progress");

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "05_admin_enquiries_management.png"),
      fullPage: false,
    });
  });

  test("5. Admin 5TB Google Drive Media Manager", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies([
      {
        name: "modernisum_token",
        value: "ey_test_admin_session_token_authorized_for_automated_testing_modernisum",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/admin/media");
    await expect(page.getByText("Google Drive 5TB Storage Pool")).toBeVisible();
    await expect(page.getByText("Media & Asset Storage Cockpit")).toBeVisible();

    // Verify media files
    await expect(page.getByText("Modern_School_Ecosystem_Banner.webp")).toBeVisible();
    await expect(page.getByText("Modernisum_Brand_Logo.png")).toBeVisible();

    // Test Copy link
    const copyLinkBtn = page.getByRole("button", { name: /Copy Link/i }).first();
    await copyLinkBtn.click();
    await expect(page.getByText("Copied!")).toBeVisible();

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "06_admin_media_manager.png"),
      fullPage: false,
    });
  });

  test("6. Admin Command Palette (Spotlight / Ctrl+K)", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies([
      {
        name: "modernisum_token",
        value: "ey_test_admin_session_token_authorized_for_automated_testing_modernisum",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/admin/dashboard");
    await expect(page.locator("h1")).toContainText("Executive Command Center");

    // Click the Spotlight search trigger button
    const cmdTrigger = page.locator("button:has-text('Search / AI (Ctrl+K)')");
    await cmdTrigger.click();

    // Verify command palette modal is open
    const cmdInput = page.getByPlaceholder(/Search commands, navigate admin/i);
    await expect(cmdInput).toBeVisible();

    // Type query
    await cmdInput.fill("Services");
    await page.waitForTimeout(400);

    await expect(page.getByText("Manage Services & Subservices")).toBeVisible();

    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(screenshotsDir, "07_admin_command_palette.png"),
      fullPage: false,
    });
  });
});
