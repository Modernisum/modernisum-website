import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('tests/screenshots');
const ARTIFACTS_DIR = 'C:/Users/shivank/.gemini/antigravity/brain/3d8b8558-9c51-4752-8a4b-a5853e8df90e';

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

async function testScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  });

  // Scroll smoothly through each section to trigger whileInView
  const sections = ['#services', '#projects', '#testimonials', '#faqs'];
  for (const s of sections) {
    const el = page.locator(s);
    if (await el.count() > 0) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      const buf = await page.screenshot();
      saveScreenshot(buf, `scrolled_${s.replace('#', '')}_light.png`);
    }
  }

  // Now take full page after all sections came into view
  const fullBuf = await page.screenshot({ fullPage: true });
  saveScreenshot(fullBuf, 'homepage_fully_scrolled_light.png');

  await browser.close();
}

testScroll();
