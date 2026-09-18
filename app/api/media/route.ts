import { NextRequest, NextResponse } from "next/server";
import { listFilesFromGoogleDrive, deleteFileFromGoogleDrive } from "@/lib/gdrive";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "40", 10);
    const folderId = searchParams.get("folderId") || undefined;

    // 1. Fetch Google Drive assets
    let gdriveFiles: any[] = [];
    try {
      gdriveFiles = await listFilesFromGoogleDrive({ pageSize, folderId });
    } catch (err) {
      console.warn("⚠️ Google Drive listing warning:", err);
    }

    // 2. Fetch local storage assets from public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const localFiles: any[] = [];

    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        try {
          const stats = fs.statSync(path.join(uploadsDir, file));
          const ext = path.extname(file).toLowerCase();
          const isImg = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"].includes(ext);

          localFiles.push({
            id: `local_${file}`,
            name: file,
            mimeType: isImg ? `image/${ext.replace(".", "")}` : "application/octet-stream",
            createdTime: stats.mtime.toISOString(),
            size: stats.size,
            publicUrl: `/uploads/${file}`,
            thumbnailUrl: `/uploads/${file}`,
            webViewLink: `/uploads/${file}`,
            storageProvider: "local",
          });
        } catch {
          // ignore corrupted temp file
        }
      }
    }

    // Sort local files newest first
    localFiles.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());

    // Combine local and Google Drive files
    const combined = [...localFiles, ...gdriveFiles];

    return NextResponse.json({
      success: true,
      data: combined,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Media listing error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("id");

    if (!fileId) {
      return NextResponse.json(
        { success: false, message: "File ID required" },
        { status: 400 }
      );
    }

    // Check if it's a local file
    if (fileId.startsWith("local_")) {
      const fileName = fileId.replace("local_", "");
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return NextResponse.json({ success: true, message: "Local file deleted" });
    }

    // Otherwise delete from Google Drive
    const ok = await deleteFileFromGoogleDrive(fileId);
    return NextResponse.json({ success: ok });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
