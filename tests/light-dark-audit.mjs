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

async function runLightDarkAudit() {
  console.log('=== STARTING VISUAL & INTERACTIVE AUDIT (LIGHT & DARK MODES) ===');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  try {
    // ----------------------------------------------------
    // 1. LIGHT MODE AUDIT
    // ----------------------------------------------------
    console.log('\n================ LIGHT MODE AUDIT ================');
    const lightContext = await browser.newContext({
      colorScheme: 'light',
      viewport: { width: 1440, height: 900 }
    });
    const lightPage = await lightContext.newPage();

    // 1.1 Home page in Light Mode
    console.log('\n--- 1.1 Testing Home Page in Light Mode ---');
    await lightPage.goto('http://localhost:3005/', { waitUntil: 'networkidle', timeout: 30000 });
    // Force light class on html element
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(600);

    // Modern School Section in Home Page
    const modernSchoolHeader = lightPage.locator('text=Why Modern Institutions Choose Modern School ERP');
    await modernSchoolHeader.scrollIntoViewIfNeeded();
    await lightPage.waitForTimeout(600);

    // Verify CampusCockpitPreview tabs
    const fleetTab = lightPage.locator('button:has-text("GPS Fleet Radar")').first();
    console.log('Clicking GPS Fleet Radar Tab in Light Mode...');
    await fleetTab.click();
    await lightPage.waitForTimeout(400);

    const feesTab = lightPage.locator('button:has-text("Fee Ledger")').first();
    console.log('Clicking Fee Ledger Tab in Light Mode...');
    await feesTab.click();
    await lightPage.waitForTimeout(400);

    const rfidTab = lightPage.locator('button:has-text("RFID Gate Stream")').first();
    console.log('Clicking RFID Gate Stream Tab in Light Mode...');
    await rfidTab.click();
    await lightPage.waitForTimeout(400);

    let buffer = await lightPage.screenshot({ fullPage: false });
    saveScreenshot(buffer, 'modern_school_section_light_verified.png');

    // Full Home Page in Light Mode
    const fullHomeBuffer = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(fullHomeBuffer, 'homepage_full_light_verified.png');

    // 1.2 Modern School Dedicated Page (/modern-school)
    console.log('\n--- 1.2 Testing /modern-school in Light Mode ---');
    await lightPage.goto('http://localhost:3005/modern-school', { waitUntil: 'networkidle', timeout: 30000 });
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(600);

    const msPageBuffer = await lightPage.screenshot({ fullPage: false });
    saveScreenshot(msPageBuffer, 'modern_school_page_light_hero.png');

    const msPageFullBuffer = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(msPageFullBuffer, 'modern_school_page_light_full.png');

    // 1.3 About Page (/about)
    console.log('\n--- 1.3 Testing /about in Light Mode ---');
    await lightPage.goto('http://localhost:3005/about', { waitUntil: 'networkidle', timeout: 30000 });
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(500);
    const aboutFullBuffer = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(aboutFullBuffer, 'about_page_light_verified.png');

    // 1.4 Services Page (/services)
    console.log('\n--- 1.4 Testing /services in Light Mode ---');
    await lightPage.goto('http://localhost:3005/services', { waitUntil: 'networkidle', timeout: 30000 });
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(500);
    const servicesFullBuffer = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(servicesFullBuffer, 'services_page_light_verified.png');

    // 1.5 Projects Page (/projects)
    console.log('\n--- 1.5 Testing /projects in Light Mode ---');
    await lightPage.goto('http://localhost:3005/projects', { waitUntil: 'networkidle', timeout: 30000 });
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(500);
    const projectsFullBuffer = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(projectsFullBuffer, 'projects_page_light_verified.png');

    // 1.6 Blog Page (/blog)
    console.log('\n--- 1.6 Testing /blog in Light Mode ---');
    await lightPage.goto('http://localhost:3005/blog', { waitUntil: 'networkidle', timeout: 30000 });
    await lightPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await lightPage.waitForTimeout(500);
    const blogFullBuffer = await lightPage.screenshot({ fullPage: true });
    saveScreenshot(blogFullBuffer, 'blog_page_light_verified.png');

    await lightContext.close();

    // ----------------------------------------------------
    // 2. DARK MODE AUDIT
    // ----------------------------------------------------
    console.log('\n================ DARK MODE AUDIT ================');
    const darkContext = await browser.newContext({
      colorScheme: 'dark',
      viewport: { width: 1440, height: 900 }
    });
    const darkPage = await darkContext.newPage();

    console.log('\n--- 2.1 Testing Home Page in Dark Mode ---');
    await darkPage.goto('http://localhost:3005/', { waitUntil: 'networkidle', timeout: 30000 });
    await darkPage.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    await darkPage.waitForTimeout(500);

    const darkMSHeader = darkPage.locator('text=Why Modern Institutions Choose Modern School ERP');
    await darkMSHeader.scrollIntoViewIfNeeded();
    await darkPage.waitForTimeout(600);

    const darkMSBuffer = await darkPage.screenshot({ fullPage: false });
    saveScreenshot(darkMSBuffer, 'modern_school_section_dark_verified.png');

    const darkFullHome = await darkPage.screenshot({ fullPage: true });
    saveScreenshot(darkFullHome, 'homepage_full_dark_verified.png');

    console.log('\n--- 2.2 Testing /modern-school in Dark Mode ---');
    await darkPage.goto('http://localhost:3005/modern-school', { waitUntil: 'networkidle', timeout: 30000 });
    await darkPage.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    await darkPage.waitForTimeout(600);

    const darkMSPageFull = await darkPage.screenshot({ fullPage: true });
    saveScreenshot(darkMSPageFull, 'modern_school_page_dark_full.png');

    await darkContext.close();

    console.log('\n=== ALL VISUAL AUDIT TESTS COMPLETED SUCCESSFULLY ===');
  } catch (error) {
    console.error('Test failed with error:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runLightDarkAudit();
