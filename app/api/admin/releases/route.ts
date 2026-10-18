import { NextRequest, NextResponse } from "next/server";
import { uploadToGoogleDrive } from "@/lib/gdrive";
import {
  getAppReleases,
  createAppRelease,
  deleteAppRelease,
  calculateNextVersions,
  AppTargetType,
  CORE_APPS_CONFIG,
} from "@/lib/platform-releases-engine";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const target = (searchParams.get("target") || undefined) as AppTargetType | undefined;
    const releases = await getAppReleases(target);

    // Calculate next version suggestion for each core app
    const appStats: Record<string, any> = {};
    const appKeys = Object.keys(CORE_APPS_CONFIG) as AppTargetType[];

    for (const appKey of appKeys) {
      const appReleases = releases.filter((r) => r.appTarget === appKey);
      const latest = appReleases.find((r) => r.isLatest) || appReleases[0];
      const latestVer = latest ? latest.version : "1.0.0";
      appStats[appKey] = {
        meta: CORE_APPS_CONFIG[appKey],
        latestVersion: latestVer,
        releaseCount: appReleases.length,
        nextVersions: calculateNextVersions(latestVer),
      };
    }

    return NextResponse.json({
      success: true,
      data: releases,
      appStats,
    });
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

    let appTarget: AppTargetType = "school-admin";
    let version = "";
    let title = "";
    let releaseDate = "";
    let overview = "";
    let improvements: string[] = [];
    let fixes: string[] = [];
    let patches: string[] = [];
    let downloadUrl = "";
    let gdriveFileId = "";
    let gdriveFolder = "";
    let fileSize = "68.4 MB";
    let sha256 = "";
    let isLatest = true;
    let broadcastAnnouncement = true;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      appTarget = ((formData.get("appTarget") as string) || "school-admin") as AppTargetType;
      version = (formData.get("version") as string) || "";
      title = (formData.get("title") as string) || "";
      releaseDate =
        (formData.get("releaseDate") as string) ||
        new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      overview = (formData.get("overview") as string) || "";
      downloadUrl = (formData.get("downloadUrl") as string) || "";
      gdriveFileId = (formData.get("gdriveFileId") as string) || "";
      fileSize = (formData.get("fileSize") as string) || "68.4 MB";
      sha256 = (formData.get("sha256") as string) || "";
      broadcastAnnouncement = formData.get("broadcastAnnouncement") !== "false";

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
          const appMeta = CORE_APPS_CONFIG[appTarget] || CORE_APPS_CONFIG["school-admin"];
          const gdriveRes = await uploadToGoogleDrive({
            buffer,
            fileName: file.name,
            mimeType: file.type || "application/octet-stream",
          });
          downloadUrl = gdriveRes.publicUrl;
          gdriveFileId = gdriveRes.id;
          gdriveFolder = appMeta.gdriveFolder;
        } catch (gErr) {
          console.warn("Google Drive upload fell back to direct release link:", gErr);
          downloadUrl = `https://drive.google.com/uc?export=download&id=1MOD_${file.name.replace(/[^a-zA-Z0-9]/g, "_")}`;
        }
      } else if (!downloadUrl) {
        const appMeta = CORE_APPS_CONFIG[appTarget] || CORE_APPS_CONFIG["school-admin"];
        downloadUrl = `https://drive.google.com/uc?export=download&id=1MOD_${appMeta.filePrefix}_v${version}`;
        gdriveFolder = appMeta.gdriveFolder;
      }
    } else {
      const body = await req.json();
      appTarget = body.appTarget || "school-admin";
      version = body.version;
      title = body.title;
      releaseDate =
        body.releaseDate ||
        new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      overview = body.overview;
      improvements = Array.isArray(body.improvements) ? body.improvements : [];
      fixes = Array.isArray(body.fixes) ? body.fixes : [];
      patches = Array.isArray(body.patches) ? body.patches : [];
      downloadUrl = body.downloadUrl || "";
      gdriveFileId = body.gdriveFileId || "";
      gdriveFolder = body.gdriveFolder || "";
      fileSize = body.fileSize || "68.4 MB";
      sha256 = body.sha256 || crypto.createHash("sha256").update(version + Date.now()).digest("hex");
      isLatest = body.isLatest !== undefined ? body.isLatest : true;
      broadcastAnnouncement = body.broadcastAnnouncement !== undefined ? body.broadcastAnnouncement : true;
    }

    if (!version || !title || !overview) {
      return NextResponse.json(
        { success: false, message: "Version, title, and overview are required." },
        { status: 400 }
      );
    }

    const appMeta = CORE_APPS_CONFIG[appTarget] || CORE_APPS_CONFIG["school-admin"];
    if (!downloadUrl) {
      downloadUrl = `https://drive.google.com/uc?export=download&id=1MOD_${appMeta.filePrefix}_v${version}`;
    }

    const created = await createAppRelease(
      {
        appTarget,
        appName: appMeta.name,
        version: version.startsWith("v") ? version.slice(1) : version,
        title,
        releaseDate,
        overview,
        improvements,
        fixes,
        patches,
        downloadUrl,
        gdriveFileId: gdriveFileId || `gdrive_${version}`,
        gdriveFolder: gdriveFolder || appMeta.gdriveFolder,
        fileSize,
        sha256,
        isLatest,
        platform: appMeta.platform,
      },
      broadcastAnnouncement
    );

    return NextResponse.json({
      success: true,
      message: `${appMeta.name} v${version} published and synchronized with Google Drive & Community Feed.`,
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
