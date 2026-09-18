import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = body.code?.trim();

    if (!code) {
      return NextResponse.json({ success: false, message: "Authorization code is required." }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ success: false, message: "OAuth client credentials missing in server config." }, { status: 500 });
    }

    // Try OOB first, then localhost callback redirect URI
    let tokens;
    try {
      const oauth2ClientOob = new google.auth.OAuth2(clientId, clientSecret, "urn:ietf:wg:oauth:2.0:oob");
      const res = await oauth2ClientOob.getToken(code);
      tokens = res.tokens;
    } catch (e1) {
      const oauth2ClientLocal = new google.auth.OAuth2(clientId, clientSecret, "http://localhost:3005/api/auth/gdrive/callback");
      const res = await oauth2ClientLocal.getToken(code);
      tokens = res.tokens;
    }

    if (!tokens || !tokens.refresh_token) {
      return NextResponse.json({
        success: false,
        message: "Google did not return a refresh token. Make sure prompt=consent was used.",
      }, { status: 400 });
    }

    // Persist refresh token to .env.local
    const envPath = path.join(process.cwd(), ".env.local");
    let envContent = fs.readFileSync(envPath, "utf-8");
    if (envContent.includes("GOOGLE_REFRESH_TOKEN=")) {
      envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/, `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    } else {
      envContent += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`;
    }
    fs.writeFileSync(envPath, envContent);

    // Save token file
    const tokenPath = path.join(process.cwd(), "gdrive_token.json");
    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));

    process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token;

    return NextResponse.json({
      success: true,
      message: "Google Drive 5TB Account authenticated successfully and saved permanently!",
      refreshToken: tokens.refresh_token,
    });
  } catch (error: any) {
    console.error("Exchange error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to exchange authorization code for tokens.",
    }, { status: 500 });
  }
}
