import { test, expect } from "@playwright/test";

test.describe("Interactive Quote Calculator & Inquiry Submission", () => {
  test("Submits architectural inquiry successfully with confirmation", async ({ page }) => {
    await page.goto("/contact");

    // Select service pill
    await page.getByRole("button", { name: "Modern School ERP Ecosystem" }).click();

    // Fill contact details
    await page.getByPlaceholder("e.g. Dr. Rajesh Sharma").fill("Test School Director");
    await page.getByPlaceholder("you@institution.com").fill("director@testschool.edu");
    await page.getByPlaceholder("+91 9368671007").fill("+91 9876543210");
    await page.getByPlaceholder(/Tell us about your campus size/i).fill("Looking for 25 buses GPS tracking and 2000 RFID cards.");

    // Submit form
    await page.getByRole("button", { name: "Submit Architecture Inquiry" }).click();

    // Verify confirmation
    await expect(page.getByText("Architecture Inquiry Received")).toBeVisible({ timeout: 10000 });
  });
});
