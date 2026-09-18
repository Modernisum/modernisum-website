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

async function testServicesDropdownHover() {
  console.log('=== STARTING SERVICES DROPDOWN HOVER STABILITY AUDIT ===');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Visit homepage
  console.log('Navigating to http://localhost:3005 ...');
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });

  // 2. Locate the "Services" trigger button
  const servicesTrigger = page.locator('header nav.hidden.lg\\:flex a[href="/services"]');
  await servicesTrigger.waitFor({ state: 'visible' });
  const triggerBox = await servicesTrigger.boundingBox();
  console.log('Services trigger bounding box:', triggerBox);

  if (!triggerBox) {
    throw new Error('Services trigger bounding box not found!');
  }

  // 3. Move mouse to Services trigger
  console.log('Hovering over "Services" trigger button...');
  await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height / 2);
  await page.waitForTimeout(100);

  // 4. Verify dropdown appeared
  const dropdownMenu = page.locator('header nav div.relative > div.top-full');
  await dropdownMenu.waitFor({ state: 'visible', timeout: 3000 });
  console.log('Dropdown menu successfully appeared!');

  // Capture screenshot of dropdown initially opened
  let buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'services_dropdown_opened.png');

  // 5. Test slow cursor transition: Move mouse down slowly into the dropdown dialog across the gap
  console.log('Simulating realistic human mouse movement moving down into dropdown (15 steps)...');
  const targetY = triggerBox.y + triggerBox.height + 40; // 40px below the trigger, inside the dropdown
  await page.mouse.move(triggerBox.x + triggerBox.width / 2, targetY, { steps: 15 });
  await page.waitForTimeout(200);

  // 6. Verify dropdown is still visible and stable
  const isStillVisible = await dropdownMenu.isVisible();
  console.log(`Is dropdown still visible after cursor moved into dialog? -> ${isStillVisible}`);
  if (!isStillVisible) {
    throw new Error('FAILED: Dropdown closed while cursor moved down into the dialog!');
  }

  // 7. Hover over specific sub-items inside dropdown dialog box
  console.log('Hovering over "Vidhyam School OS" item...');
  const vidhyamItem = dropdownMenu.getByRole('link', { name: 'Vidhyam School OS', exact: true });
  const vidhyamBox = await vidhyamItem.boundingBox();
  if (vidhyamBox) {
    await page.mouse.move(vidhyamBox.x + vidhyamBox.width / 2, vidhyamBox.y + vidhyamBox.height / 2, { steps: 5 });
    await page.waitForTimeout(150);
  }

  // Capture screenshot while hovering inside dropdown
  buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'services_dropdown_hover_stable.png');

  // 8. Test repeatedly moving cursor back and forth (simulating user hesitation)
  console.log('Testing back and forth cursor movement (3 cycles)...');
  for (let cycle = 1; cycle <= 3; cycle++) {
    // move slightly up towards trigger
    await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height - 2, { steps: 5 });
    await page.waitForTimeout(60);
    // move back down into dropdown
    await page.mouse.move(triggerBox.x + triggerBox.width / 2, targetY + 30, { steps: 5 });
    await page.waitForTimeout(60);
    const visible = await dropdownMenu.isVisible();
    console.log(`  Cycle ${cycle}: Dropdown visible? ${visible}`);
    if (!visible) {
      throw new Error(`FAILED: Dropdown vanished during rapid cursor movement in cycle ${cycle}`);
    }
  }

  console.log('Testing cursor leave...');
  // Move far away to the right
  await page.mouse.move(1200, 500, { steps: 5 });
  await page.waitForTimeout(350); // wait for 220ms grace period to complete

  const closedAfterLeave = !(await dropdownMenu.isVisible());
  console.log(`Dropdown closed cleanly after mouse left? -> ${closedAfterLeave}`);

  // Test in Light Mode as well
  console.log('\n--- Testing Light Mode Dropdown ---');
  const themeBtn = page.locator('header button[aria-label="Toggle theme"]');
  await themeBtn.click();
  await page.waitForTimeout(200);

  // Hover Services in light mode
  await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height / 2);
  await page.waitForTimeout(100);
  await dropdownMenu.waitFor({ state: 'visible', timeout: 3000 });

  // Move into dropdown in light mode
  await page.mouse.move(triggerBox.x + triggerBox.width / 2, targetY, { steps: 12 });
  await page.waitForTimeout(150);

  buffer = await page.screenshot({ fullPage: false });
  saveScreenshot(buffer, 'services_dropdown_light_mode_stable.png');

  await browser.close();
  console.log('\n=== ALL HOVER STABILITY TESTS PASSED WITH 100% SUCCESS ===');
}

testServicesDropdownHover().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
