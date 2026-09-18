import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const ARTIFACT_DIR = "C:/Users/shivank/.gemini/antigravity/brain/19858202-8b7f-4f88-a160-5f7d744321e6";
const PROJECT_SCREENSHOTS = "D:/modernisum/modernisum-web/tests/screenshots";

if (!fs.existsSync(PROJECT_SCREENSHOTS)) {
  fs.mkdirSync(PROJECT_SCREENSHOTS, { recursive: true });
}

async function captureScreen(page, filename, fullPage = false) {
  const projectPath = path.join(PROJECT_SCREENSHOTS, filename);
  const artifactPath = path.join(ARTIFACT_DIR, filename);
  await page.screenshot({ path: projectPath, fullPage });
  fs.copyFileSync(projectPath, artifactPath);
  console.log(`📸 Saved screenshot: ${filename}`);
}

async function runAuditCapture() {
  console.log("🔍 Launching browser to audit Vidhyam Dual Navbar & New Hub Pages...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  const desktopDarkContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark"
  });
  const page = await desktopDarkContext.newPage();

  // 1. Test Dual Navbar at Top (Both bars visible)
  await page.goto("http://localhost:3005/vidhyam", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "01_vidhyam_dual_navbar_at_top.png", false);

  // 2. Test Dual Navbar on Scroll Down (Modernisum parent collapses, Vidhyam pins to top)
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  await page.waitForTimeout(600);
  await captureScreen(page, "02_vidhyam_dual_navbar_scrolled_down.png", false);

  // 3. Test Dual Navbar on Scroll Up (Modernisum parent reappears)
  await page.evaluate(() => window.scrollTo({ top: 50, behavior: "instant" }));
  await page.waitForTimeout(600);
  await captureScreen(page, "03_vidhyam_dual_navbar_scrolled_up.png", false);

  // 4. Test Windows Desktop Download Page
  await page.goto("http://localhost:3005/vidhyam/download", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "04_vidhyam_windows_download_hub.png", true);

  // 5. Test Desktop Tutorials & Documentation Page
  await page.goto("http://localhost:3005/vidhyam/docs", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "05_vidhyam_docs_tutorials.png", true);

  // 6. Test Educator Community Hub
  await page.goto("http://localhost:3005/vidhyam/community", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "06_vidhyam_educator_community.png", true);

  // 7. Test Institutional Support Helpdesk
  await page.goto("http://localhost:3005/vidhyam/support", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "07_vidhyam_support_helpdesk.png", true);

  // 8. Test Terms of Service & Licensing
  await page.goto("http://localhost:3005/vidhyam/terms", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "08_vidhyam_terms_licensing.png", true);

  // 9. Test DPDP Privacy Policy
  await page.goto("http://localhost:3005/vidhyam/privacy", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "09_vidhyam_privacy_dpdp.png", true);

  // 10. Test School Registration Step 4 Desktop Download CTA
  await page.goto("http://localhost:3005/vidhyam/register", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "10_vidhyam_register_page.png", false);

  // 11. Test Vidhyam Releases & Changelog (Pixel-matched to media_1789735960923.png)
  await page.goto("http://localhost:3005/vidhyam/releases", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "11_vidhyam_releases_changelog.png", true);

  // Authenticate as Admin
  await page.goto("http://localhost:3005/admin/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const devLoginBtn = page.locator('button:has-text("1-Click Dev Login")');
  if (await devLoginBtn.count() > 0) {
    await devLoginBtn.click();
    await page.waitForTimeout(1000);
  }

  // 12. Test Admin Releases Manager
  await page.goto("http://localhost:3005/admin/releases", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "12_admin_releases_manager.png", true);

  // 13. Test Admin Documentation CMS
  await page.goto("http://localhost:3005/admin/docs", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "13_admin_docs_cms.png", true);

  // 14. Test Admin Blog Articles & Comments CMS
  await page.goto("http://localhost:3005/admin/articles", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await captureScreen(page, "14_admin_articles_comments_cms.png", true);

  await browser.close();
  console.log("✅ All Vidhyam screens, changelog, and admin CMS modules captured successfully!");
}

runAuditCapture().catch(console.error);

