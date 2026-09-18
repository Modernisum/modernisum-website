import { test, expect } from "@playwright/test";

test.describe("Liquid Glass Authentication Dialog", () => {
  test("Opens Sign In modal and switches to Sign Up tab", async ({ page }) => {
    await page.goto("/");

    // Click on Client Portal Sign In button
    const authBtn = page.getByRole("button", { name: /Client Portal Sign In|Sign In/i }).first();
    await authBtn.click();

    // Modal dialog should appear with frosted backdrop
    const modal = page.locator("text=Sign In to Modernisum").first();
    await expect(modal).toBeVisible();

    // Switch to Sign Up tab
    const signUpTab = page.getByRole("button", { name: "Sign Up" });
    await signUpTab.click();

    // Full name input should now be visible
    const nameInput = page.getByPlaceholder("e.g. Shivank Sharma");
    await expect(nameInput).toBeVisible();
  });
});
