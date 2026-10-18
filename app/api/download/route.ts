import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SCHOOL_APPS } from "@/lib/school-downloads";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("app") || searchParams.get("id");
  const forceMirror = searchParams.get("mirror") === "true";

  if (!appId || !SCHOOL_APPS[appId]) {
    return NextResponse.json(
      { error: "Invalid app identifier. Valid options: desktop, employee, student, extension" },
      { status: 400 }
    );
  }

  const app = SCHOOL_APPS[appId];

  // If user requested mirror or Google Drive specifically
  if (forceMirror) {
    return NextResponse.redirect(app.driveMirrorUrl, { status: 307 });
  }

  // Check possible local file paths
  const possiblePaths = [
    path.join(process.cwd(), "public", "downloads", app.fileName),
    path.join(process.cwd(), "public", "downloads", `${app.id}.zip`),
    path.join(process.cwd(), "public", "downloads", `${app.id}.apk`),
    path.join(process.cwd(), "public", "downloads", `${app.id}.exe`),
  ];

  if (app.localSourcePath) {
    possiblePaths.push(app.localSourcePath);
  }

  // Find first existing file on host machine
  let foundFilePath: string | null = null;
  for (const candidate of possiblePaths) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        foundFilePath = candidate;
        break;
      }
    } catch {}
  }

  if (foundFilePath) {
    try {
      const stats = fs.statSync(foundFilePath);
      const fileStream = fs.createReadStream(foundFilePath);

      // Determine content type
      let contentType = "application/octet-stream";
      if (foundFilePath.endsWith(".apk")) {
        contentType = "application/vnd.android.package-archive";
      } else if (foundFilePath.endsWith(".zip")) {
        contentType = "application/zip";
      } else if (foundFilePath.endsWith(".exe")) {
        contentType = "application/x-msdownload";
      }

      // Readable stream for NextResponse
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new Response(webStream, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${app.fileName}"`,
          "Content-Length": stats.size.toString(),
          "Cache-Control": "public, max-age=3600, must-revalidate",
        },
      });
    } catch (e) {
      console.error("Error streaming local binary:", e);
    }
  }

  // Graceful fallback to Google Drive mirror if file is not locally on this server
  return NextResponse.redirect(app.driveMirrorUrl, { status: 307 });
}
