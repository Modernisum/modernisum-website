import { NextRequest, NextResponse } from "next/server";
import { uploadToGoogleDrive } from "@/lib/gdrive";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderId = (formData.get("folderId") as string) || undefined;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided in form data." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanFileName}`;

    // Attempt Google Drive Upload first
    try {
      const gdriveResult = await uploadToGoogleDrive({
        buffer,
        fileName: cleanFileName,
        mimeType: file.type || "application/octet-stream",
        folderId,
      });

      return NextResponse.json({
        success: true,
        message: "File uploaded successfully to Modernisum 5TB Google Drive storage.",
        data: {
          ...gdriveResult,
          size: `${Math.round(buffer.length / 1024)} KB`,
          storageProvider: "gdrive",
        },
      });
    } catch (gdriveError: any) {
      console.warn("⚠️ Google Drive service account upload fell back to local storage:", gdriveError.message);

      // Resilient local storage fallback (DPDP & zero-loss compliance)
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, uniqueFileName);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFileName}`;

      return NextResponse.json({
        success: true,
        message: "File uploaded and cached in high-speed local media storage.",
        data: {
          id: `local_${Date.now()}`,
          name: cleanFileName,
          mimeType: file.type || "application/octet-stream",
          publicUrl,
          thumbnailUrl: publicUrl,
          size: `${Math.round(buffer.length / 1024)} KB`,
          storageProvider: "local_resilient",
          notice: "Uploaded to local storage. (For Google Drive direct pooling, configure a Shared Drive in Google Workspace).",
        },
      });
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Media Upload Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload asset.",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
