import { test, expect } from "@playwright/test";

test.describe("Interactive Quote Calculator & Inquiry Submission", () => {
  test("Submits architectural inquiry successfully with confirmation", async ({ page }) => {
    // Set authenticated session in localStorage
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "modernisum_sso_user",
        JSON.stringify({
          id: "test-user-123",
          email: "director@testschool.edu",
          name: "Test School Director",
          role: "client",
        })
      );
    });

    await page.goto("/contact");

    // Select service in custom or native select dropdown
    const serviceBtn = page.getByRole("button", { name: /MOD School Autonomous School OS|Product or Solution Area/i }).first();
    if (await serviceBtn.isVisible()) {
      await serviceBtn.click();
      await page.waitForTimeout(200);
      const optionBtn = page.getByRole("button", { name: "MOD School Autonomous School OS" }).last();
      if (await optionBtn.isVisible()) {
        await optionBtn.click();
      }
    }

    // Fill contact details
    const nameInput = page.getByPlaceholder("e.g. Dr. Rajesh Sharma");
    if (await nameInput.isVisible()) {
      await nameInput.fill("Test School Director");
    }

    const phoneInput = page.getByPlaceholder("+91 9368671007");
    if (await phoneInput.isVisible()) {
      await phoneInput.fill("+91 9368671007");
    }

    await page.getByPlaceholder(/Briefly outline your campus size/i).fill("Looking for 25 buses GPS tracking and 2000 RFID cards.");

    // Submit form
    await page.getByRole("button", { name: /Submit Blueprint Request/i }).click();

    // Verify confirmation
    await expect(page.getByText(/Blueprint Request Received|Enquiry Received/i)).toBeVisible({ timeout: 10000 });
  });
});
