import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// Path to Google Cloud Service Account
const SERVICE_ACCOUNT_PATH =
  process.env.GDRIVE_SERVICE_ACCOUNT_PATH ||
  "D:\\modernisum\\vidhyam\\service-account.json";

let driveClientInstance: ReturnType<typeof google.drive> | null = null;

export function getGoogleDriveClient() {
  if (driveClientInstance) return driveClientInstance;

  // 1. Check for User OAuth 2.0 Refresh Token (uses personal 5TB Google quota directly)
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (refreshToken && clientId && clientSecret) {
    try {
      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
      oauth2Client.setCredentials({ refresh_token: refreshToken });
      driveClientInstance = google.drive({ version: "v3", auth: oauth2Client });
      console.log("[GDrive] Initialized with User OAuth 2.0 credentials (5TB Cloud Storage active).");
      return driveClientInstance;
    } catch (oauthErr) {
      console.error("[GDrive] OAuth initialization error, falling back to service account:", oauthErr);
    }
  }

  // 2. Fallback to Service Account
  try {
    let credentials: any;

    if (fs.existsSync(SERVICE_ACCOUNT_PATH)) {
      const fileContent = fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf-8");
      credentials = JSON.parse(fileContent);
    } else {
      console.warn(
        `[GDrive] Service account not found at ${SERVICE_ACCOUNT_PATH}. Drive uploads disabled.`
      );
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    driveClientInstance = google.drive({ version: "v3", auth });
    return driveClientInstance;
  } catch (error) {
    console.error("[GDrive] Error initializing Google Drive client:", error);
    return null;
  }
}

/**
 * Uploads a file buffer directly to Google Drive and makes it publicly readable
 */
export async function uploadToGoogleDrive({
  buffer,
  fileName,
  mimeType,
  folderId,
}: {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  folderId?: string;
}): Promise<{
  id: string;
  name: string;
  mimeType: string;
  publicUrl: string;
  thumbnailUrl: string;
  webViewLink?: string;
}> {
  const drive = getGoogleDriveClient();
  if (!drive) {
    throw new Error("Google Drive storage client is not configured.");
  }

  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  const fileMetadata: any = {
    name: `${Date.now()}_${fileName}`,
  };

  const targetFolderId =
    folderId ||
    process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID ||
    "1Nt7xkTFIJuBRpFAh9QhydkdopEP49WOl";

  fileMetadata.parents = [targetFolderId];

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType,
      body: stream,
    },
    supportsAllDrives: true,
    fields: "id, name, mimeType, webViewLink, webContentLink",
  });

  const fileId = response.data.id;
  if (!fileId) {
    throw new Error("Failed to retrieve file ID from Google Drive.");
  }

  // Make file publicly accessible
  try {
    await drive.permissions.create({
      fileId,
      supportsAllDrives: true,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  } catch (permError) {
    console.warn("[GDrive] Could not set public permission on file:", permError);
  }

  // Generate direct, high-speed public CDN URLs
  const publicUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;

  return {
    id: fileId,
    name: response.data.name || fileName,
    mimeType: response.data.mimeType || mimeType,
    publicUrl,
    thumbnailUrl,
    webViewLink: response.data.webViewLink || undefined,
  };
}

/**
 * Lists recently uploaded media files from Google Drive
 */
export async function listGoogleDriveFiles(
  opts: number | { pageSize?: number; folderId?: string } = 20
) {
  const pageSize = typeof opts === "number" ? opts : opts.pageSize || 20;
  const folderId = typeof opts === "object" ? opts.folderId : undefined;
  const drive = getGoogleDriveClient();
  if (!drive) return [];

  try {
    let q = "trashed = false";
    if (folderId) {
      q += ` and '${folderId}' in parents`;
    }

    const res = await drive.files.list({
      pageSize,
      fields: "files(id, name, mimeType, createdTime, size, webViewLink)",
      orderBy: "createdTime desc",
      q,
    });

    return (res.data.files || []).map((f) => ({
      id: f.id!,
      name: f.name!,
      mimeType: f.mimeType!,
      createdTime: f.createdTime!,
      size: f.size ? parseInt(f.size, 10) : 0,
      publicUrl: `https://lh3.googleusercontent.com/d/${f.id}`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w500`,
      webViewLink: f.webViewLink || "",
    }));
  } catch (err) {
    console.error("[GDrive] Error listing files:", err);
    return [];
  }
}

export async function deleteGoogleDriveFile(fileId: string): Promise<boolean> {
  const drive = getGoogleDriveClient();
  if (!drive) return false;

  try {
    await drive.files.delete({ fileId });
    return true;
  } catch (err) {
    console.error("[GDrive] Error deleting file:", err);
    return false;
  }
}

export const listFilesFromGoogleDrive = listGoogleDriveFiles;
export const deleteFileFromGoogleDrive = deleteGoogleDriveFile;

