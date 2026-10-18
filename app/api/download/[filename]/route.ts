import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface RouteContext {
  params: Promise<{ filename: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const resolvedParams = await params;
  const rawFilename = resolvedParams?.filename || "";
  const filename = path.basename(rawFilename);

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 });
  }

  const downloadsDir = path.join(process.cwd(), "public", "downloads");
  const directPath = path.join(downloadsDir, filename);

  let targetPath: string | null = null;
  let targetFilename = filename;

  const ext = path.extname(filename).toLowerCase();
  const wantsRawExe =
    request.nextUrl.searchParams.get("format") === "exe" ||
    request.nextUrl.searchParams.get("raw") === "1";

  if (ext === ".exe" && !wantsRawExe) {
    const zipSetupPath = path.join(downloadsDir, "Vidhyam-Setup-v2.8.1-x64.zip");
    if (fs.existsSync(zipSetupPath)) {
      targetPath = zipSetupPath;
      targetFilename = "Vidhyam-Setup-v2.8.1-x64.zip";
    }
  }

  if (!targetPath && fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    targetPath = directPath;
  } else if (!targetPath) {
    if (ext === ".exe") {
      const candidates = [
        path.join(downloadsDir, "Vidhyam-Setup-v2.8.1-x64.exe"),
        path.join(downloadsDir, "raw", "Vidhyam-Setup-v2.8.1-x64.exe"),
        path.join(downloadsDir, "Vidhyam-School-OS-Setup-v1.2.0.exe"),
        path.join(downloadsDir, "raw", "Vidhyam-School-OS-Setup-v1.2.0.exe"),
        path.join(downloadsDir, "desktop.exe"),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          targetPath = candidate;
          break;
        }
      }
    } else if (ext === ".apk") {
      if (filename.toLowerCase().includes("employee")) {
        const p = path.join(downloadsDir, "Vidhyam-Employee-v1.4.0.apk");
        if (fs.existsSync(p)) targetPath = p;
      } else {
        const p = path.join(downloadsDir, "Vidhyam-Student-v1.4.0.apk");
        if (fs.existsSync(p)) targetPath = p;
      }
    } else if (ext === ".zip") {
      const candidates = [
        path.join(downloadsDir, "Vidhyam-Setup-v2.8.1-x64.zip"),
        path.join(downloadsDir, "Vidhyam-School-OS-Setup-v1.2.0.zip"),
        path.join(downloadsDir, "desktop.zip"),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          targetPath = candidate;
          break;
        }
      }
    }
  }

  if (!targetPath || !fs.existsSync(targetPath)) {
    return NextResponse.json({ error: `File "${filename}" not found on server` }, { status: 404 });
  }

  try {
    const stats = fs.statSync(targetPath);
    const fileStream = fs.createReadStream(targetPath);

    let contentType = "application/octet-stream";
    if (targetPath.endsWith(".apk")) {
      contentType = "application/vnd.android.package-archive";
    } else if (targetPath.endsWith(".zip")) {
      contentType = "application/zip";
    } else if (targetPath.endsWith(".exe")) {
      contentType = "application/x-msdownload";
    }

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Length", stats.size.toString());
    headers.set("Content-Disposition", `attachment; filename="${targetFilename}"`);
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");

    // @ts-expect-error Node ReadStream to Web ReadableStream
    return new NextResponse(fileStream, { status: 200, headers });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to read binary file", details: err?.message }, { status: 500 });
  }
}
