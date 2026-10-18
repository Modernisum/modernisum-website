import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const adminPath = path.join(rootDir, "app", "admin");
const hiddenAdminPath = path.join(rootDir, "app", "_admin_local");
const apiPath = path.join(rootDir, "app", "api");
const hiddenApiPath = path.join(rootDir, "app", "_api_local");
const downloadsPath = path.join(rootDir, "app", "downloads");
const hiddenDownloadsPath = path.join(rootDir, "app", "_downloads_local");
const outDir = path.join(rootDir, "out");

console.log("=================================================");
console.log(" Modernisum: Zero-Server Public Export Pipeline  ");
console.log(" Target: Firebase Spark Hosting (100% Free)      ");
console.log("=================================================\n");

let movedAdmin = false;
let movedApi = false;
let movedDownloads = false;

function safeRename(src, dest, retries = 5, delay = 800) {
  for (let i = 0; i < retries; i++) {
    try {
      if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
      }
      return;
    } catch (e) {
      if (i === retries - 1) {
        try {
          fs.cpSync(src, dest, { recursive: true });
          fs.rmSync(src, { recursive: true, force: true });
          return;
        } catch (copyErr) {
          throw e;
        }
      }
      const waitMs = delay * (i + 1);
      const start = Date.now();
      while (Date.now() - start < waitMs) {}
    }
  }
}

try {
  // Step 1: Isolate Local-Only Admin Platform & Server API Routes
  if (fs.existsSync(adminPath)) {
    console.log("🔒 [Platform Separation] Moving local admin platform to private workspace...");
    safeRename(adminPath, hiddenAdminPath);
    movedAdmin = true;
  }

  if (fs.existsSync(apiPath)) {
    console.log("🔒 [Zero-Server Isolation] Moving server API routes to local workspace...");
    safeRename(apiPath, hiddenApiPath);
    movedApi = true;
  }

  if (fs.existsSync(downloadsPath)) {
    console.log("🔒 [Zero-Server Isolation] Moving server download routes to local workspace...");
    safeRename(downloadsPath, hiddenDownloadsPath);
    movedDownloads = true;
  }

  // Step 2: Clean stale dev caches and build static site
  console.log("🧹 [Cache Cleaning] Clearing stale .next build cache...");
  const nextDir = path.join(rootDir, ".next");
  try {
    if (fs.existsSync(nextDir)) {
      fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    }
  } catch (err) {
    console.warn("⚠️ [Cache Warning] Could not completely delete .next cache, proceeding with build:", err.message);
  }


  console.log("⚡ [Next.js Build] Building optimized static website with progressive chunks...");
  process.env.BUILD_TARGET = "public";
  process.env.NODE_ENV = "production";

  execSync("node --max-old-space-size=4096 ./node_modules/next/dist/bin/next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      BUILD_TARGET: "public",
      NODE_ENV: "production",
    },
  });

  // Step 3: Verify Admin is completely absent from public build
  const publicAdminCheck = path.join(outDir, "admin");
  if (fs.existsSync(publicAdminCheck)) {
    throw new Error("SECURITY FAILURE: Admin files were detected in the public build output!");
  } else {
    console.log("✅ [Security Audit Passed] 0% admin code present in public build.");
  }

  // Remove executable and apk files from out to comply with Firebase Spark free tier
  const rawOut = path.join(outDir, "downloads", "raw");
  if (fs.existsSync(rawOut)) {
    fs.rmSync(rawOut, { recursive: true, force: true });
  }
  const downloadsOut = path.join(outDir, "downloads");
  if (fs.existsSync(downloadsOut)) {
    const files = fs.readdirSync(downloadsOut);
    for (const file of files) {
      if (file.endsWith(".apk") || file.endsWith(".exe")) {
        fs.unlinkSync(path.join(downloadsOut, file));
      }
    }
  }

  console.log("\n=================================================");
  console.log(" 🎉 Static build complete in 'out/' directory!   ");
  console.log(" Ready for instant deployment to Firebase Hosting!");
  console.log("=================================================");
} catch (error) {
  console.error("❌ Build error:", error);
  process.exitCode = 1;
} finally {
  // Step 4: Always restore local admin platform and API routes for local development
  if (movedAdmin && fs.existsSync(hiddenAdminPath)) {
    console.log("🔄 [Restore] Restoring local admin platform to 'app/admin'...");
    safeRename(hiddenAdminPath, adminPath);
  }
  if (movedApi && fs.existsSync(hiddenApiPath)) {
    console.log("🔄 [Restore] Restoring local API routes to 'app/api'...");
    safeRename(hiddenApiPath, apiPath);
  }
  if (movedDownloads && fs.existsSync(hiddenDownloadsPath)) {
    console.log("🔄 [Restore] Restoring local download routes to 'app/downloads'...");
    safeRename(hiddenDownloadsPath, downloadsPath);
  }
  console.log("✅ Local admin & API platform restored and ready for localhost:3005.");
}
