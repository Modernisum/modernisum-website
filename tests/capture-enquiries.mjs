import { chromium } from "@playwright/test";

async function captureEnquiries() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Login via ops-gate dev bypass
  await page.goto("http://localhost:3005/ops-gate");
  await page.waitForTimeout(800);
  await page.click("button:has-text('1-Click Dev Login')");
  await page.waitForURL("**/admin/dashboard");

  // Go to enquiries page
  await page.goto("http://localhost:3005/admin/enquiries");
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: "C:/Users/shivank/.gemini/antigravity/brain/3d8b8558-9c51-4752-8a4b-a5853e8df90e/live_mongodb_enquiries.png", fullPage: false });
  console.log("Captured live_mongodb_enquiries.png successfully!");
  await browser.close();
}

captureEnquiries();
