import { NextResponse } from "next/server";

export async function GET() {
  const hasRefreshToken = !!process.env.GOOGLE_REFRESH_TOKEN;
  const hasClientId = !!process.env.GOOGLE_CLIENT_ID;
  const hasClientSecret = !!process.env.GOOGLE_CLIENT_SECRET;
  const folderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || "1Nt7xkTFIJuBRpFAh9QhydkdopEP49WOl";

  const isOAuthConnected = hasRefreshToken && hasClientId && hasClientSecret;

  // Generate the direct auth URL
  const clientId = process.env.GOOGLE_CLIENT_ID || "671964901221-70lg53lproheokn7c2ujo62vj72tn8em.apps.googleusercontent.com";
  const authUrlOob = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&prompt=consent&response_type=code&client_id=${clientId}&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob`;
  const authUrlCallback = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&prompt=consent&response_type=code&client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3005%2Fapi%2Fauth%2Fgdrive%2Fcallback`;

  return NextResponse.json({
    success: true,
    isOAuthConnected,
    storageType: isOAuthConnected ? "google_drive_5tb_oauth" : "hybrid_resilient",
    folderId,
    authUrlOob,
    authUrlCallback,
  });
}
