import { test } from "@playwright/test";
import path from "path";

test("Capture light and dark mode screenshots", async ({ page }) => {
  test.setTimeout(120000);
  const screenshotsDir = path.join(process.cwd(), "tests", "screenshots");
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Dark Mode Homepage Hero
  await page.goto("/");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "01_dark_mode_home.png"), fullPage: false });

  // 1b. Dark Mode Flagship Ventures
  const productsSec = page.locator("#products");
  if (await productsSec.isVisible()) {
    await productsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "02_dark_mode_ventures.png"), fullPage: false });
  }

  // 2. Toggle to Light Mode by clicking theme toggle
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  await themeToggle.waitFor({ state: "visible", timeout: 8000 });
  await themeToggle.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, "03_light_mode_home.png"), fullPage: false });

  // 2b. Light Mode Flagship Ventures & Vision Banner
  if (await productsSec.isVisible()) {
    await productsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "04_light_mode_ventures.png"), fullPage: false });
  }

  // 3. Light Mode Philosophy Section
  const philosophySec = page.locator("#philosophy");
  if (await philosophySec.isVisible()) {
    await philosophySec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "05_light_mode_philosophy.png"), fullPage: false });
  }

  // 4. MOD School OS in Light & Dark Mode
  await page.goto("/mod-school");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "06_light_mode_vidhyam.png"), fullPage: false });

  // Toggle back to Dark Mode
  const vidhyamThemeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  if (await vidhyamThemeToggle.isVisible()) {
    await vidhyamThemeToggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "07_dark_mode_vidhyam.png"), fullPage: false });
  }

  // 5. MOD Farmer (Agromi) in Dark Mode & Light Mode
  await page.goto("/mod-farmer");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "09_dark_mode_agromi.png"), fullPage: false });

  const agromiThemeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  if (await agromiThemeToggle.isVisible()) {
    await agromiThemeToggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "10_light_mode_agromi.png"), fullPage: false });
  }

  // 6. Services Page
  await page.goto("/services");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "11_services.png"), fullPage: false });

  // 7. About Page
  await page.goto("/about");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "12_about.png"), fullPage: false });

  // 8. Privacy Policy Page (Full Page Dark & Light)
  await page.goto("/privacy");
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, "13_privacy_full_dark.png"), fullPage: true });

  const privacyThemeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  if (await privacyThemeToggle.isVisible()) {
    await privacyThemeToggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "14_privacy_full_light.png"), fullPage: true });
    await privacyThemeToggle.click();
    await page.waitForTimeout(600);
  }

  // 9. Terms of Service Page (Full Page Dark & Light)
  await page.goto("/terms");
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, "15_terms_full_dark.png"), fullPage: true });

  const termsThemeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  if (await termsThemeToggle.isVisible()) {
    await termsThemeToggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "16_terms_full_light.png"), fullPage: true });
    await termsThemeToggle.click();
    await page.waitForTimeout(600);
  }

  // 10. EV Ecosystem Technical Blog Page (Dark & Light Mode)
  const brainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\8aa95789-3d65-4fea-8d7e-ec4e96e01704";
  await page.goto("/blog/zero-friction-ev-ecosystem-software-architecture");
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "17_ev_blog_hero_dark.png"), fullPage: false });
  await page.screenshot({ path: path.join(brainDir, "17_ev_blog_hero_dark.png"), fullPage: false });

  // Scroll to Table
  const tableEl = page.locator("table").first();
  if (await tableEl.isVisible()) {
    await tableEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "18_ev_blog_table_dark.png"), fullPage: false });
    await page.screenshot({ path: path.join(brainDir, "18_ev_blog_table_dark.png"), fullPage: false });
  }

  // Scroll to Discussion & Comments Section
  const commentsSec = page.locator("text=Comments").first();
  if (await commentsSec.isVisible()) {
    await commentsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, "19_ev_blog_comments_dark.png"), fullPage: false });
    await page.screenshot({ path: path.join(brainDir, "19_ev_blog_comments_dark.png"), fullPage: false });
  }

  // Light Mode full page capture
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, "21_ev_blog_hero_light.png"), fullPage: false });
  await page.screenshot({ path: path.join(brainDir, "21_ev_blog_hero_light.png"), fullPage: false });
  await page.screenshot({ path: path.join(screenshotsDir, "20_ev_blog_full_light.png"), fullPage: true });
  await page.screenshot({ path: path.join(brainDir, "20_ev_blog_full_light.png"), fullPage: true });

  const currentBrainDir = "C:\\Users\\shivank\\.gemini\\antigravity\\brain\\8aa95789-3d65-4fea-8d7e-ec4e96e01704";

  // 11. Patent Research & Tailored Affordability Lab Section on Homepage
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await page.waitForTimeout(600);
  const patentSec = page.locator("text=Sovereign Software & Patent Research Lab").first();
  if (await patentSec.isVisible()) {
    await patentSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(currentBrainDir, "22_patent_research_lab.png"), fullPage: false });
  }

  // 12. Hardware 3D Motion Simulation on ModSchool
  await page.goto("/mod-school");
  await page.waitForTimeout(800);
  const hardwareSec = page.locator("#hardware-ecosystem");
  if (await hardwareSec.isVisible()) {
    await hardwareSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(currentBrainDir, "23_hardware_3d_simulation.png"), fullPage: false });
  }

  // 13. Atithi Devo Bhava Family Care Desk
  const familyDesk = page.locator("text=Atithi Devo Bhava").first();
  if (await familyDesk.isVisible()) {
    await familyDesk.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(currentBrainDir, "24_atithi_devo_bhava.png"), fullPage: false });
  }
});



