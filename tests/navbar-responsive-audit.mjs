import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('tests/screenshots');
const ARTIFACTS_DIR = 'C:/Users/shivank/.gemini/antigravity/brain/3d8b8558-9c51-4752-8a4b-a5853e8df90e';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function saveScreenshot(sourceBuffer, filename) {
  const localPath = path.join(SCREENSHOT_DIR, filename);
  fs.writeFileSync(localPath, sourceBuffer);
  console.log(`[SAVED LOCAL] ${localPath}`);

  if (fs.existsSync(ARTIFACTS_DIR)) {
    const artifactPath = path.join(ARTIFACTS_DIR, filename);
    fs.writeFileSync(artifactPath, sourceBuffer);
    console.log(`[SAVED ARTIFACT] ${artifactPath}`);
  }
}

async function runUnifiedNavbarAudit() {
  console.log('=== STARTING UNIFIED NAVBAR & AUTH AUDIT FOR MODERNISUM & VIDHYAM ===');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });
  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();

  // Test 1: Modernisum Homepage
  console.log('\n--- 1. Testing Modernisum Homepage (http://localhost:3005/) ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle', timeout: 30000 });

  const homeLinks = page.locator('header nav.hidden.lg\\:flex a');
  const homeCount = await homeLinks.count();
  console.log(`Modernisum Nav Links Count: ${homeCount}`);
  const homeTexts = [];
  for (let i = 0; i < homeCount; i++) {
    homeTexts.push((await homeLinks.nth(i).innerText()).trim());
  }
  console.log('Modernisum Nav Links:', homeTexts);

  const homeActive = await page.locator('header nav.hidden.lg\\:flex a[href="/"]').getAttribute('class');
  console.log('Home link active class:', homeActive?.includes('text-cyan-300'));

  let buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'unified_nav_modernisum_desktop.png');

  // Test 2: Vidhyam Page with Unified Navbar
  console.log('\n--- 2. Testing Vidhyam Page (http://localhost:3005/vidhyam) with Unified Navbar ---');
  await page.goto('http://localhost:3005/vidhyam', { waitUntil: 'networkidle', timeout: 30000 });

  const vidhyamLinks = page.locator('header nav.hidden.lg\\:flex a');
  const vidhyamCount = await vidhyamLinks.count();
  console.log(`Vidhyam Nav Links Count: ${vidhyamCount}`);
  const vidhyamTexts = [];
  for (let i = 0; i < vidhyamCount; i++) {
    vidhyamTexts.push((await vidhyamLinks.nth(i).innerText()).trim());
  }
  console.log('Vidhyam Nav Links:', vidhyamTexts);

  const vidhyamActive = await page.locator('header nav.hidden.lg\\:flex a[href="/vidhyam"]').getAttribute('class');
  const isVidhyamHighlighted = vidhyamActive?.includes('text-cyan-300') || vidhyamActive?.includes('bg-cyan-500/10') || vidhyamActive?.includes('bg-white/10');
  console.log('Vidhyam link highlighted active on /vidhyam:', isVidhyamHighlighted);

  buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'unified_nav_vidhyam_desktop.png');

  // Test 3: Sign In Auth Modal Trigger on Vidhyam Page
  console.log('\n--- 3. Testing Sign In / Client Portal Trigger from Vidhyam ---');
  const signInBtn = page.locator('header button:has-text("Sign In")').first();
  await signInBtn.click();
  await page.waitForTimeout(500);

  const authDialog = page.locator('text=Sign In to Modernisum');
  const isAuthOpen = await authDialog.isVisible();
  console.log('Auth Dialog opened on Vidhyam page:', isAuthOpen);

  buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'unified_auth_dialog_on_vidhyam.png');

  // Close auth dialog via Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // Test 4: Laptop 1024px Viewport on Vidhyam
  console.log('\n--- 4. Testing Vidhyam on 1024x768 Viewport ---');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(400);

  const boxes1024 = [];
  for (let i = 0; i < vidhyamCount; i++) {
    const box = await vidhyamLinks.nth(i).boundingBox();
    if (box) boxes1024.push(box);
  }
  if (boxes1024.length > 1) {
    const firstY = boxes1024[0].y;
    const allOnOneLine = boxes1024.every(b => Math.abs(b.y - firstY) < 5);
    console.log('Vidhyam at 1024px all links on single line:', allOnOneLine);
  }

  buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'unified_nav_vidhyam_laptop_1024.png');

  // Test 5: Mobile Viewport on Vidhyam
  console.log('\n--- 5. Testing Vidhyam on 390x844 Mobile Viewport ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  const hamburger = page.locator('header button[aria-label="Toggle mobile menu"]');
  await hamburger.click();
  await page.waitForTimeout(500);

  const drawer = page.locator('header .lg\\:hidden nav');
  const isDrawerVisible = await drawer.isVisible();
  console.log('Vidhyam Mobile drawer opened successfully:', isDrawerVisible);

  buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'unified_nav_vidhyam_mobile_drawer.png');

  await browser.close();
  console.log('\n=== UNIFIED NAVBAR AUDIT COMPLETED SUCCESSFULLY ===');
}

runUnifiedNavbarAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
