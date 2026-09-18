import { test } from "@playwright/test";

test("Capture light and dark mode screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Dark Mode Homepage
  await page.goto("http://localhost:3005");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "dark_mode_home.png", fullPage: false });

  // 2. Toggle to Light Mode by clicking theme toggle
  const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  await themeToggle.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "light_mode_home.png", fullPage: false });

  // 3. Light Mode Services Section
  const servicesSec = page.locator("#services");
  if (await servicesSec.isVisible()) {
    await servicesSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "light_mode_services.png" });
  }

  // 4. Light Mode Modern School Page
  await page.goto("http://localhost:3005/modern-school");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "light_mode_modern_school.png", fullPage: false });

  // 5. Light Mode Contact Page
  await page.goto("http://localhost:3005/contact");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "light_mode_contact.png", fullPage: false });

  // 6. Light Mode Auth Modal
  await page.goto("http://localhost:3005");
  await page.waitForTimeout(800);
  const signInBtn = page.locator("header").getByRole("button", { name: "Sign In" });
  if (await signInBtn.isVisible()) {
    await signInBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: "light_mode_auth_modal.png" });
  }
});
