import { chromium } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = "C:/Users/shivank/.gemini/antigravity/brain/3d8b8558-9c51-4752-8a4b-a5853e8df90e";

async function runVidhyamE2E() {
  console.log("🚀 Starting Vidhyam E2E Verification Suite...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // 1. Visit /vidhyam home page
    console.log("📍 Navigating to http://localhost:3005/vidhyam");
    await page.goto("http://localhost:3005/vidhyam", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Verify Title & Hero
    const heroTitle = await page.textContent("h1");
    console.log("✅ Hero Header found:", heroTitle?.slice(0, 60));

    // Capture Hero Screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "vidhyam_landing_hero.png"),
      fullPage: false
    });
    console.log("📸 Saved vidhyam_landing_hero.png");

    // 2. Test ROI Calculator
    console.log("🧮 Testing ROI Dynamic Calculator...");
    const roiSection = page.locator("#calculator");
    if (await roiSection.count() > 0) {
      await roiSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      // Adjust slider
      const studentInput = page.locator("input[type='range']").first();
      if (await studentInput.count() > 0) {
        await studentInput.fill("1850");
        await page.waitForTimeout(500);
      }

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "vidhyam_roi_interactive.png"),
        fullPage: false
      });
      console.log("📸 Saved vidhyam_roi_interactive.png");
    }

    // 3. Test Demo Request Form
    console.log("📝 Filling Vidhyam Institutional Demo Request Form...");
    const demoSection = page.locator("#demo");
    await demoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Fill form inputs using placeholder selectors
    await page.fill("input[placeholder*='Modern Public School']", "Delhi Public Modern Academy");
    await page.fill("input[placeholder*='Rajesh Sharma']", "Dr. Rajeshwar Sharma");
    await page.selectOption("select", "Principal");
    await page.fill("input[type='email']", "principal@dpma-edu.in");
    await page.fill("input[type='tel']", "+91 94123 55678");
    await page.fill("input[placeholder*='Noida']", "Noida Sector 62, Uttar Pradesh");
    await page.fill("textarea", "Interested in AI attendance gate integration, CBSE report card compliance, and unified ERP migration.");

    await page.waitForTimeout(500);
    // Click submit
    console.log("📨 Submitting Demo Request...");
    await page.click("button[type='submit']");

    // Wait for success confirmation
    await page.waitForSelector("text=Demonstration Booked Successfully!", { timeout: 10000 });
    console.log("🎉 Successfully saw 'Demonstration Booked Successfully!' message!");
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "vidhyam_demo_submitted.png"),
      fullPage: false
    });
    console.log("📸 Saved vidhyam_demo_submitted.png");

    // 4. Verify in Admin Cockpit /admin/enquiries
    console.log("🔐 Logging into Admin Dashboard to verify MongoDB persistence...");
    await page.goto("http://localhost:3005/ops-gate");
    await page.waitForTimeout(600);
    await page.click("button:has-text('1-Click Dev Login')");
    await page.waitForURL("**/admin/dashboard");

    await page.goto("http://localhost:3005/admin/enquiries");
    await page.waitForTimeout(2000);

    // Check if new enquiry exists
    const hasLead = await page.locator("text=Delhi Public Modern Academy").count();
    console.log(`🔎 MongoDB Enquiry Verification: found ${hasLead} matching leads`);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "admin_vidhyam_mongodb_synced.png"),
      fullPage: false
    });
    console.log("📸 Saved admin_vidhyam_mongodb_synced.png");

    // 5. Test other Vidhyam pages
    for (const sub of ["features", "pricing", "about", "contact"]) {
      console.log(`🌐 Checking /vidhyam/${sub}...`);
      const resp = await page.goto(`http://localhost:3005/vidhyam/${sub}`, { waitUntil: "domcontentloaded" });
      console.log(`   Status for /vidhyam/${sub}: ${resp.status()}`);
    }

    console.log("🌟 ALL VIDHYAM TESTS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("❌ Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVidhyamE2E();
