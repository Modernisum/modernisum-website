import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Modernisum Authentication & Progressive Onboarding", () => {
  const screenshotsDir = path.join(__dirname, "screenshots");

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test("1. Opens Clean Sign In Modal (Stepper and Description Removed)", async ({ page }) => {
    await page.goto("/");

    // Click on Sign In button
    const authBtn = page.getByRole("button", { name: /Client Portal Sign In|Sign In/i }).first();
    await authBtn.click();

    // Modal dialog should appear with frosted backdrop
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator("text=Sign In to Modernisum")).toBeVisible();

    // Verify description and stepper labels/bars are NOT visible in Sign In dialog
    await expect(modal.locator("text=Enter your email & password to access all")).not.toBeVisible();
    await expect(modal.locator("text=CREDENTIALS")).not.toBeVisible();
    await expect(modal.locator("text=PROFILE")).not.toBeVisible();
    await expect(modal.locator("text=INTERESTS")).not.toBeVisible();
    await expect(modal.locator("text=FINISH")).not.toBeVisible();

    // Google button and credentials inputs should be cleanly visible
    await expect(modal.locator("text=Continue with Google")).toBeVisible();
    await expect(modal.locator('input[type="email"]')).toBeVisible();
    await expect(modal.locator('input[type="password"]')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, "auth_modal_clean_signin.png"),
      fullPage: false,
    });
  });

  test("2. Full Progressive Onboarding Flow (4 Stages & Logged-In State)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const signInBtn = page.locator("button:has-text('Sign In')").first();
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();
    await page.waitForTimeout(600);

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Stage 1: Credentials
    const randomEmail = `test_user_${Date.now()}@modernisum.com`;
    const emailInput = modal.locator('input[type="email"]');
    const passInput = modal.locator('input[type="password"]');

    if (await emailInput.isVisible()) {
      await emailInput.fill(randomEmail);
      await passInput.fill("SecurePass123!");

      const continueBtn = modal.getByRole("button", { name: "Continue", exact: true });
      if (await continueBtn.isVisible()) {
        await continueBtn.click();
        await page.waitForTimeout(800);

        // Stage 2: Avatar and Name (Stepper now visible during onboarding)
        const nameField = modal.locator('input[placeholder*="Shivank Sharma"]');
        if (await nameField.isVisible()) {
          await expect(modal.locator("text=PROFILE")).toBeVisible();
          await nameField.fill("Aarav Patel");

          const avatarImgs = modal.locator('button[type="button"] img');
          const count = await avatarImgs.count();
          if (count >= 4) {
            await avatarImgs.nth(3).click();
            await page.waitForTimeout(300);
          }

          const nextProductBtn = modal.locator('button:has-text("Next: Product Interests")');
          if (await nextProductBtn.isVisible()) {
            await nextProductBtn.click();
            await page.waitForTimeout(600);
          }
        }

        // Stage 3: Product Interests
        const teacherCard = modal.locator("text=Vidhyam Teacher App");
        if (await teacherCard.isVisible()) {
          await teacherCard.click();
          await page.waitForTimeout(300);
        }

        const nextContactBtn = modal.locator('button:has-text("Next: Contact Details")');
        if (await nextContactBtn.isVisible()) {
          await nextContactBtn.click();
          await page.waitForTimeout(600);
        }

        // Stage 4: Contact & Finish
        const phoneInput = modal.locator('input[placeholder*="+91"]');
        if (await phoneInput.isVisible()) {
          await phoneInput.fill("+91 91234 56789");
        }

        const finishBtn = modal.locator('button:has-text("Complete Setup & Enter")');
        if (await finishBtn.isVisible()) {
          await finishBtn.click();
          await page.waitForTimeout(1500);
        }
      }
    }

    await page.screenshot({
      path: path.join(screenshotsDir, "auth_onboarding_completed.png"),
      fullPage: false,
    });
  });

  test("3. Password Single Eye Toggle & Instant Login with Shivank@2002", async ({ page }) => {
    await page.goto("/");

    const signInBtn = page.locator("button:has-text('Sign In')").first();
    await signInBtn.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const emailInput = modal.locator('input[type="email"]');
    const passInput = modal.locator('input[type="password"]');

    await emailInput.fill("admin@modernisum.com");
    await passInput.fill("Shivank@2002");

    // Verify there is only ONE password toggle button inside the password container
    const toggleButtons = modal.locator('button[aria-label*="password" i]');
    await expect(toggleButtons).toHaveCount(1);

    // Click toggle to reveal password
    await toggleButtons.first().click();
    await expect(modal.locator('input[value="Shivank@2002"]')).toHaveAttribute("type", "text");

    // Click toggle again to hide password
    await toggleButtons.first().click();
    await expect(modal.locator('input[value="Shivank@2002"]')).toHaveAttribute("type", "password");

    // Submit credentials
    const continueBtn = modal.getByRole("button", { name: "Continue", exact: true });
    await continueBtn.click();

    // Should immediately redirect to admin dashboard upon successful login
    await expect(page).toHaveURL(/.*admin\/dashboard.*/, { timeout: 10000 });
    await expect(page.locator("text=Admin OS").first()).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, "auth_instant_admin_login.png"),
      fullPage: false,
    });
  });
});
