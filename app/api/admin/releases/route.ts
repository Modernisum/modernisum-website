import { NextRequest, NextResponse } from "next/server";
import { uploadToGoogleDrive } from "@/lib/gdrive";
import {
  getAppReleases,
  createAppRelease,
  deleteAppRelease,
} from "@/lib/platform-releases-engine";
import crypto from "crypto";

export async function GET() {
  try {
    const releases = await getAppReleases();
    return NextResponse.json({ success: true, data: releases });
  } catch (error: any) {
    console.error("Failed to fetch releases:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load releases" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let version = "";
    let title = "";
    let releaseDate = "";
    let overview = "";
    let improvements: string[] = [];
    let fixes: string[] = [];
    let patches: string[] = [];
    let downloadUrl = "";
    let gdriveFileId = "";
    let fileSize = "68.4 MB";
    let sha256 = "";
    let isLatest = true;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      version = (formData.get("version") as string) || "";
      title = (formData.get("title") as string) || "";
      releaseDate = (formData.get("releaseDate") as string) || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      overview = (formData.get("overview") as string) || "";
      
      const rawImp = formData.get("improvements") as string;
      if (rawImp) {
        try { improvements = JSON.parse(rawImp); } catch { improvements = rawImp.split("\n").filter(Boolean); }
      }
      const rawFix = formData.get("fixes") as string;
      if (rawFix) {
        try { fixes = JSON.parse(rawFix); } catch { fixes = rawFix.split("\n").filter(Boolean); }
      }
      const rawPat = formData.get("patches") as string;
      if (rawPat) {
        try { patches = JSON.parse(rawPat); } catch { patches = rawPat.split("\n").filter(Boolean); }
      }

      const file = formData.get("file") as File | null;
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fileSize = `${(buffer.length / (1024 * 1024)).toFixed(1)} MB`;
        sha256 = crypto.createHash("sha256").update(buffer).digest("hex");

        try {
          const gdriveRes = await uploadToGoogleDrive({
            buffer,
            fileName: file.name,
            mimeType: file.type || "application/octet-stream",
          });
          downloadUrl = gdriveRes.publicUrl;
          gdriveFileId = gdriveRes.id;
        } catch (gErr) {
          console.warn("Google Drive upload fell back to direct release link:", gErr);
          downloadUrl = `/downloads/${file.name}`;
        }
      } else {
        downloadUrl = (formData.get("downloadUrl") as string) || `/downloads/Vidhyam-Setup-v${version}-x64.exe`;
      }
    } else {
      const body = await req.json();
      version = body.version;
      title = body.title;
      releaseDate = body.releaseDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      overview = body.overview;
      improvements = Array.isArray(body.improvements) ? body.improvements : [];
      fixes = Array.isArray(body.fixes) ? body.fixes : [];
      patches = Array.isArray(body.patches) ? body.patches : [];
      downloadUrl = body.downloadUrl || `/downloads/Vidhyam-Setup-v${version}-x64.exe`;
      fileSize = body.fileSize || "68.4 MB";
      sha256 = body.sha256 || crypto.createHash("sha256").update(version).digest("hex");
      isLatest = body.isLatest !== undefined ? body.isLatest : true;
    }

    if (!version || !title || !overview) {
      return NextResponse.json(
        { success: false, message: "Version, title, and overview are required." },
        { status: 400 }
      );
    }

    const created = await createAppRelease({
      version,
      title,
      releaseDate,
      overview,
      improvements,
      fixes,
      patches,
      downloadUrl,
      gdriveFileId,
      fileSize,
      sha256,
      isLatest,
    });

    return NextResponse.json({
      success: true,
      message: `Vidhyam Desktop OS version ${version} published and registered.`,
      data: created,
    });
  } catch (error: any) {
    console.error("Release creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to publish release" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const version = searchParams.get("version");

    if (!version) {
      return NextResponse.json(
        { success: false, message: "Version parameter is required." },
        { status: 400 }
      );
    }

    const deleted = await deleteAppRelease(version);
    return NextResponse.json({
      success: deleted,
      message: `Release version ${version} removed successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete release" },
      { status: 500 }
    );
  }
}
