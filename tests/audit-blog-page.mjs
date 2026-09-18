import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('tests/screenshots');
const ARTIFACTS_DIR = 'C:/Users/shivank/.gemini/antigravity/brain/6d47e356-7381-4c9b-bf8c-fcf2aa8c1970';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
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

async function auditBlogPage() {
  console.log('=== STARTING PLAYWRIGHT AUDIT FOR BLOG POST ===');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const url = 'http://localhost:3005/blog/ai-saas-school-erp-transformation';
  const consoleErrors = [];

  try {
    // 1. Desktop Light Mode
    console.log('\n--- 1. Desktop Light Mode ---');
    const lightContext = await browser.newContext({
      colorScheme: 'light',
      viewport: { width: 1440, height: 900 },
    });
    const lightPage = await lightContext.newPage();
    lightPage.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[Light Desktop Console Error] ${msg.text()}`);
      }
    });

    await lightPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(1000);

    const shotLightFull = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(shotLightFull, 'blog_ai_saas_light_desktop_full.png');

    const shotLightHero = await lightPage.screenshot();
    saveScreenshot(shotLightHero, 'blog_ai_saas_light_desktop_hero.png');

    // 2. Desktop Dark Mode
    console.log('\n--- 2. Desktop Dark Mode ---');
    const darkContext = await browser.newContext({
      colorScheme: 'dark',
      viewport: { width: 1440, height: 900 },
    });
    const darkPage = await darkContext.newPage();
    darkPage.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[Dark Desktop Console Error] ${msg.text()}`);
      }
    });

    await darkPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await darkPage.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    await darkPage.waitForTimeout(1000);

    const shotDarkFull = await darkPage.screenshot({ fullPage: true });
    saveScreenshot(shotDarkFull, 'blog_ai_saas_dark_desktop_full.png');

    const shotDarkHero = await darkPage.screenshot();
    saveScreenshot(shotDarkHero, 'blog_ai_saas_dark_desktop_hero.png');

    // 3. Mobile Light Mode
    console.log('\n--- 3. Mobile Light Mode ---');
    const mobileLightContext = await browser.newContext({
      colorScheme: 'light',
      viewport: { width: 390, height: 844 },
      isMobile: true,
    });
    const mobileLightPage = await mobileLightContext.newPage();
    await mobileLightPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await mobileLightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await mobileLightPage.waitForTimeout(1000);

    const shotMobileLightFull = await mobileLightPage.screenshot({ fullPage: true });
    saveScreenshot(shotMobileLightFull, 'blog_ai_saas_light_mobile_full.png');

    // 4. Mobile Dark Mode
    console.log('\n--- 4. Mobile Dark Mode ---');
    const mobileDarkContext = await browser.newContext({
      colorScheme: 'dark',
      viewport: { width: 390, height: 844 },
      isMobile: true,
    });
    const mobileDarkPage = await mobileDarkContext.newPage();
    await mobileDarkPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await mobileDarkPage.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    await mobileDarkPage.waitForTimeout(1000);

    const shotMobileDarkFull = await mobileDarkPage.screenshot({ fullPage: true });
    saveScreenshot(shotMobileDarkFull, 'blog_ai_saas_dark_mobile_full.png');

    // Check overflow
    const overflowCheck = await lightPage.evaluate(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth
      };
    });
    console.log('Desktop Overflow Check:', overflowCheck);

    const mobileOverflowCheck = await mobileLightPage.evaluate(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth
      };
    });
    console.log('Mobile Overflow Check:', mobileOverflowCheck);

    console.log('\nConsole Errors:', consoleErrors);
  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    await browser.close();
  }
}

auditBlogPage();
