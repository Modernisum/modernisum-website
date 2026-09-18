import { test, expect } from "@playwright/test";

test.describe("AI-Powered Admin Panel & Bento Grid Cockpit", () => {
  test.beforeEach(async ({ context }) => {
    // Set admin cookie to authenticate directly
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
  });

  test("Dashboard loads with Bento Grid KPIs and Gemini AI engine", async ({ page }) => {
    await page.goto("/admin/dashboard");
    await expect(page.locator("h1")).toContainText("Executive Command Center");

    // Check presence of key Bento KPIs
    await expect(page.getByText("Modern School Ecosystem")).toBeVisible();
    await expect(page.getByText("Google Drive Storage")).toBeVisible();

    // Check Gemini AI Synthesizer card
    await expect(page.getByText("1-Click AI Blog & SEO Meta Synthesizer")).toBeVisible();
  });

  test("Spreadsheet Services page loads with inline rows", async ({ page }) => {
    await page.goto("/admin/services");
    await expect(page.locator("h1")).toContainText("Services & Architectural Solutions");
    await expect(page.getByText("Modern School ERP Ecosystem").first()).toBeVisible();
  });
});
