import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Authenticate via /ops-gate
  await page.goto("http://localhost:3005/ops-gate");
  const devBtn = page.getByRole("button", { name: /1-Click Dev Login/i });
  await devBtn.click();
  await page.waitForURL("**/admin/dashboard", { timeout: 10000 });

  // 2. Go to /admin/media
  await page.goto("http://localhost:3005/admin/media");
  await page.waitForTimeout(2000);

  // 3. Upload public/logo.png through file input
  const fileInput = page.locator('input[type="file"]');
  const testLogoPath = path.resolve("public/logo.png");
  await fileInput.setInputFiles(testLogoPath);

  // 4. Wait for upload completion and confetti
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "tests/screenshots/upgraded_media_cockpit.png" });

  await browser.close();
  console.log("Media cockpit verification complete and screenshot saved!");
}

main().catch(console.error);
