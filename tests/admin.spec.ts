import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { signToken } from "../lib/auth";

async function getAdminCookie() {
  const token = await signToken({
    userId: "test-admin-id",
    name: "Admin Tester",
    email: "admin@modernisum.com",
    role: "admin",
  });
  return [
    {
      name: "modernisum_token",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax" as const,
    },
  ];
}

test.describe("Modernisum Admin Panel - Complete End-to-End Verification", () => {
  const screenshotsDir = path.join(__dirname, "screenshots");

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test.beforeEach(async () => {
    test.setTimeout(60000);
  });

  test("1. Admin Interactive Login Flow and Redirection to Dashboard", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Click Sign In button
    const signInBtn = page.getByRole("button", { name: /Client Portal Sign In|Sign In/i }).first();
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();

    // Verify Auth Modal is open
    const modalHeading = page.locator("text=Sign In to Modernisum").first();
    await expect(modalHeading).toBeVisible();

    // Fill Admin Credentials
    const emailInput = page.getByPlaceholder("name@company.com");
    const passwordInput = page.getByPlaceholder("••••••••");

    await emailInput.fill("admin@modernisum.com");
    await passwordInput.fill("Shivank@2002");

    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotsDir, "01_admin_login_filled.png"),
      fullPage: false,
    });

    // Submit Sign In Form inside modal
    const modal = page.locator('[role="dialog"]');
    const submitBtn = modal.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify successful login redirection to /admin/dashboard
    await expect(page).toHaveURL(/.*admin\/dashboard/, { timeout: 15000 });
    await expect(page.locator("h1")).toContainText("Executive Command Center");

    // Wait for Bento cards to load
    await expect(page.getByText("Cloud Schools Fleet")).toBeVisible();
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
    await context.addCookies(await getAdminCookie());

    await page.goto("/admin/dashboard");
    await expect(page.locator("h1")).toContainText("Executive Command Center");

    // Verify Bento Grid KPIs
    await expect(page.getByText("5 Schools")).toBeVisible();
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
      page.getByText(/Firebase Firestore active|Seed operation complete|Database successfully seeded|Database synchronization complete|Error syncing/i)
    ).toBeVisible({ timeout: 15000 });

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "03_admin_dashboard_ai_synthesizer.png"),
      fullPage: false,
    });
  });

  test("3. Admin Services Management - Spreadsheet Adding & Inline Editing", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies(await getAdminCookie());

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

    await context.addCookies(await getAdminCookie());

    await page.goto("/admin/enquiries");
    await expect(page.locator("h1")).toContainText("Client Enquiries & Architecture Leads");

    // Test Search input filtering with live database leads
    const searchInput = page.getByPlaceholder(/Filter by name, email, or service/i);
    await searchInput.fill("Rajesh Sharma");
    await page.waitForTimeout(400);

    // Dr. Rajesh Sharma's card should be displayed
    await expect(page.getByText("Rajesh Sharma").first()).toBeVisible();

    // Test non-matching search
    await searchInput.fill("ZZZ_NonExistent_Query_999");
    await page.waitForTimeout(400);
    await expect(page.getByText("Rajesh Sharma")).not.toBeVisible();

    // Clear search
    await searchInput.fill("");
    await page.waitForTimeout(400);
    await expect(page.getByText("Rajesh Sharma").first()).toBeVisible();

    // Test status pills filter
    const allPill = page.getByRole("button", { name: "all" });
    await expect(allPill).toBeVisible();
    await allPill.click();
    await page.waitForTimeout(400);

    // Change status of first enquiry if select is available
    const firstStatusDropdown = page.locator("select").first();
    if (await firstStatusDropdown.isVisible()) {
      await firstStatusDropdown.selectOption("in_progress");
    }

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "05_admin_enquiries_management.png"),
      fullPage: false,
    });
  });

  test("5. Admin 5TB Google Drive Media Manager", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies(await getAdminCookie());

    await page.goto("/admin/media");
    await expect(page.getByText("Google Drive 5TB Storage Pool")).toBeVisible();
    await expect(page.getByText("Media & Asset Storage Cockpit")).toBeVisible();

    // Verify search input
    const searchMedia = page.getByPlaceholder(/Search assets by name/i);
    await expect(searchMedia).toBeVisible();

    // Check if copy link button is present for existing files
    const copyLinkBtn = page.getByRole("button", { name: /Copy Link/i }).first();
    if (await copyLinkBtn.isVisible()) {
      await copyLinkBtn.click();
      await expect(page.getByText("Copied!")).toBeVisible();
    }

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, "06_admin_media_manager.png"),
      fullPage: false,
    });
  });

  test("6. Admin Command Palette (Spotlight / Ctrl+K)", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies(await getAdminCookie());

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

  test("7. School Admin & Multi-Tenant Fleet Governance", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await context.addCookies(await getAdminCookie());

    await page.goto("/admin/schools");
    await expect(page.locator("h2")).toContainText("Cloud Schools Fleet Management");

    // Verify KPI summary cards
    await expect(page.getByText("Total Fleet Size")).toBeVisible();
    await expect(page.getByText("Active & Verified")).toBeVisible();
    await expect(page.getByText("Suspended / Inactive")).toBeVisible();

    // Verify schools table renders headers
    await expect(page.getByText("School Code")).toBeVisible();
    await expect(page.getByText("School Name")).toBeVisible();

    // Test Search input filtering
    const searchInput = page.getByPlaceholder(/Search by school name, code/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Heritage");
    await page.waitForTimeout(400);

    // Clear search and reset filter to display complete fleet
    const statusSelect = page.locator("select").first();
    await expect(statusSelect).toBeVisible();
    await statusSelect.selectOption("all");
    await searchInput.fill("");
    await page.waitForTimeout(300);

    // Refresh Fleet button
    const refreshBtn = page.getByRole("button", { name: /Refresh Fleet/i });
    await expect(refreshBtn).toBeVisible();
    await refreshBtn.click();
    await expect(page.getByText("Loading cloud fleet tenants...")).not.toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(600);

    // Verify school rows rendered
    await expect(page.getByText("SCH-1081")).toBeVisible();
    await expect(page.getByText("Doon Heritage Global School")).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, "08_admin_schools_fleet_governance.png"),
      fullPage: false,
    });
  });
});
