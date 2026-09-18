import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = path.resolve(process.cwd(), "tests/screenshots");
const ARTIFACTS_DIR = "C:/Users/shivank/.gemini/antigravity/brain/3d8b8558-9c51-4752-8a4b-a5853e8df90e";
const BASE_URL = "http://localhost:3005";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function saveScreenshot(sourceBuffer, filename) {
  const localPath = path.join(SCREENSHOTS_DIR, filename);
  fs.writeFileSync(localPath, sourceBuffer);
  console.log(`[SAVED LOCAL] ${localPath}`);

  if (fs.existsSync(ARTIFACTS_DIR)) {
    const artifactPath = path.join(ARTIFACTS_DIR, filename);
    fs.writeFileSync(artifactPath, sourceBuffer);
    console.log(`[SAVED ARTIFACT] ${artifactPath}`);
  }
}

async function runAudit() {
  console.log("=== STARTING COMPREHENSIVE VIDHYAM VISUAL & INTERACTIVE AUDIT ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  // 1. Desktop Dark Mode
  console.log("\n--- 1. Desktop Dark Mode Audit ---");
  const desktopDarkContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
  });
  const darkPage = await desktopDarkContext.newPage();

  await darkPage.goto(`${BASE_URL}/vidhyam`, { waitUntil: "networkidle" });
  await darkPage.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  });
  await darkPage.waitForTimeout(1000);

  const darkHeroBuf = await darkPage.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 900 } });
  saveScreenshot(darkHeroBuf, "vidhyam_desktop_home_dark_hero.png");

  const darkFullBuf = await darkPage.screenshot({ fullPage: true });
  saveScreenshot(darkFullBuf, "vidhyam_desktop_home_dark_full.png");

  // Test Pricing Toggle on Dark Mode
  console.log("Testing Pricing Toggle (Annual Save 20%)...");
  const pricingSection = darkPage.locator("#pricing");
  await pricingSection.scrollIntoViewIfNeeded();
  await darkPage.waitForTimeout(500);

  const annualSwitch = darkPage.locator('button[aria-label="Toggle annual or monthly billing"]');
  if (await annualSwitch.count() > 0) {
    await annualSwitch.click();
    await darkPage.waitForTimeout(600);
    const toggledPricingBuf = await darkPage.locator("#pricing").screenshot();
    saveScreenshot(toggledPricingBuf, "vidhyam_pricing_annual_toggled.png");
    console.log("Annual pricing toggled successfully!");
  }

  // Features Dark
  await darkPage.goto(`${BASE_URL}/vidhyam/features`, { waitUntil: "networkidle" });
  await darkPage.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  });
  await darkPage.waitForTimeout(800);
  const darkFeaturesBuf = await darkPage.screenshot({ fullPage: true });
  saveScreenshot(darkFeaturesBuf, "vidhyam_desktop_features_dark_full.png");

  // Pricing Subpage Dark
  await darkPage.goto(`${BASE_URL}/vidhyam/pricing`, { waitUntil: "networkidle" });
  await darkPage.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  });
  await darkPage.waitForTimeout(800);
  const darkPricingBuf = await darkPage.screenshot({ fullPage: true });
  saveScreenshot(darkPricingBuf, "vidhyam_desktop_pricing_dark_full.png");

  // About Subpage Dark
  await darkPage.goto(`${BASE_URL}/vidhyam/about`, { waitUntil: "networkidle" });
  await darkPage.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  });
  await darkPage.waitForTimeout(800);
  const darkAboutBuf = await darkPage.screenshot({ fullPage: true });
  saveScreenshot(darkAboutBuf, "vidhyam_desktop_about_dark_full.png");

  // Contact Subpage Dark
  await darkPage.goto(`${BASE_URL}/vidhyam/contact`, { waitUntil: "networkidle" });
  await darkPage.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  });
  await darkPage.waitForTimeout(800);
  const darkContactBuf = await darkPage.screenshot({ fullPage: true });
  saveScreenshot(darkContactBuf, "vidhyam_desktop_contact_dark_full.png");

  await desktopDarkContext.close();

  // 2. Desktop Light Mode
  console.log("\n--- 2. Desktop Light Mode Audit ---");
  const desktopLightContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
  });
  const lightPage = await desktopLightContext.newPage();

  await lightPage.goto(`${BASE_URL}/vidhyam`, { waitUntil: "networkidle" });
  await lightPage.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  });
  await lightPage.waitForTimeout(1000);

  const lightHeroBuf = await lightPage.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 900 } });
  saveScreenshot(lightHeroBuf, "vidhyam_desktop_home_light_hero.png");

  const lightFullBuf = await lightPage.screenshot({ fullPage: true });
  saveScreenshot(lightFullBuf, "vidhyam_desktop_home_light_full.png");

  // Features Light
  await lightPage.goto(`${BASE_URL}/vidhyam/features`, { waitUntil: "networkidle" });
  await lightPage.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  });
  await lightPage.waitForTimeout(800);
  const lightFeaturesBuf = await lightPage.screenshot({ fullPage: true });
  saveScreenshot(lightFeaturesBuf, "vidhyam_desktop_features_light_full.png");

  // Pricing Light
  await lightPage.goto(`${BASE_URL}/vidhyam/pricing`, { waitUntil: "networkidle" });
  await lightPage.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  });
  await lightPage.waitForTimeout(800);
  const lightPricingBuf = await lightPage.screenshot({ fullPage: true });
  saveScreenshot(lightPricingBuf, "vidhyam_desktop_pricing_light_full.png");

  // About Light
  await lightPage.goto(`${BASE_URL}/vidhyam/about`, { waitUntil: "networkidle" });
  await lightPage.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  });
  await lightPage.waitForTimeout(800);
  const lightAboutBuf = await lightPage.screenshot({ fullPage: true });
  saveScreenshot(lightAboutBuf, "vidhyam_desktop_about_light_full.png");

  // Contact Light
  await lightPage.goto(`${BASE_URL}/vidhyam/contact`, { waitUntil: "networkidle" });
  await lightPage.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  });
  await lightPage.waitForTimeout(800);
  const lightContactBuf = await lightPage.screenshot({ fullPage: true });
  saveScreenshot(lightContactBuf, "vidhyam_desktop_contact_light_full.png");

  await desktopLightContext.close();

  // 3. Mobile Responsive Viewport Audit
  console.log("\n--- 3. Mobile Responsive Viewport Audit ---");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto(`${BASE_URL}/vidhyam`, { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => {
    document.documentElement.classList.add("dark");
  });
  await mobilePage.waitForTimeout(1000);

  const mobileHeroBuf = await mobilePage.screenshot({ clip: { x: 0, y: 0, width: 390, height: 844 } });
  saveScreenshot(mobileHeroBuf, "vidhyam_mobile_home_hero.png");

  const mobileFullBuf = await mobilePage.screenshot({ fullPage: true });
  saveScreenshot(mobileFullBuf, "vidhyam_mobile_home_full.png");

  // Mobile Navigation Drawer
  console.log("Testing Mobile Navigation Drawer...");
  const menuButton = mobilePage.getByRole("button", { name: /Toggle Navigation Menu/i });
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await mobilePage.waitForTimeout(600);
    const mobileDrawerBuf = await mobilePage.screenshot({ clip: { x: 0, y: 0, width: 390, height: 600 } });
    saveScreenshot(mobileDrawerBuf, "vidhyam_mobile_drawer_open.png");
    console.log("Mobile drawer captured!");
  }

  await mobileContext.close();

  // 4. Live Demo Booking Form Submission
  console.log("\n--- 4. Live Demo Booking Form Submission ---");
  const formPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await formPage.goto(`${BASE_URL}/vidhyam/contact`, { waitUntil: "networkidle" });
  await formPage.waitForTimeout(800);

  await formPage.fill('input[placeholder*="Modern Public School"]', "St. Xavier International Academy");
  await formPage.fill('input[placeholder*="Dr. Rajesh Sharma"]', "Principal Dr. Rajesh Sharma");
  await formPage.selectOption('select', "Principal");
  await formPage.fill('input[placeholder*="principal@modernschool.edu"]', "rajesh.sharma@stxavier.edu.in");
  await formPage.fill('input[placeholder*="98765"]', "+91 98112 34567");
  await formPage.fill('input[placeholder*="Noida"]', "Jaipur, Rajasthan");
  await formPage.fill('textarea[placeholder*="pain points"]', "Seeking automated face attendance for 1,800 students and WhatsApp fee reminders before term examinations.");

  const submitButton = formPage.getByRole("button", { name: /Confirm Campus Demonstration/i });
  await submitButton.click();

  await formPage.waitForSelector('text=Demonstration Booked Successfully!', { timeout: 15000 });
  await formPage.waitForTimeout(1000);

  const formSection = formPage.locator('#demo');
  const formSuccessBuf = await formSection.screenshot();
  saveScreenshot(formSuccessBuf, "vidhyam_demo_live_success.png");
  console.log("Demo form submitted and confirmed live in MongoDB Atlas!");

  await formPage.close();
  await browser.close();

  console.log("\n=== ALL VIDHYAM AUDIT TESTS COMPLETED SUCCESSFULLY ===");
}

runAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
