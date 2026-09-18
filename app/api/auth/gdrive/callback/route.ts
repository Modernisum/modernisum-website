import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `<html><body style="background:#0b0f19;color:white;font-family:sans-serif;padding:40px;text-align:center;">
        <h1 style="color:#ef4444;">OAuth Error</h1>
        <p>${error}</p>
        <a href="/admin/media" style="color:#00f2fe;">Back to Media Cockpit</a>
      </body></html>`,
      { headers: { "content-type": "text/html" } }
    );
  }

  if (!code) {
    return new NextResponse(
      `<html><body style="background:#0b0f19;color:white;font-family:sans-serif;padding:40px;text-align:center;">
        <h1 style="color:#f59e0b;">No Authorization Code Received</h1>
        <a href="/admin/media" style="color:#00f2fe;">Back to Media Cockpit</a>
      </body></html>`,
      { headers: { "content-type": "text/html" } }
    );
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Client ID or Client Secret missing from server environment.");
    }

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      "http://localhost:3005/api/auth/gdrive/callback"
    );

    const { tokens } = await oauth2Client.getToken(code);

    if (tokens.refresh_token) {
      const envPath = path.join(process.cwd(), ".env.local");
      let envContent = fs.readFileSync(envPath, "utf-8");
      if (envContent.includes("GOOGLE_REFRESH_TOKEN=")) {
        envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/, `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
      } else {
        envContent += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`;
      }
      fs.writeFileSync(envPath, envContent);

      const tokenPath = path.join(process.cwd(), "gdrive_token.json");
      fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));

      process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token;
    }

    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Google Drive Connected | Modernisum</title>
        <meta http-equiv="refresh" content="3;url=/admin/media" />
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #0b0f19; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(0,242,254,0.3); border-radius: 24px; padding: 48px; text-align: center; max-width: 540px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); backdrop-filter: blur(12px); }
          h1 { color: #00f2fe; margin-bottom: 12px; font-size: 28px; }
          p { color: #94a3b8; line-height: 1.6; font-size: 15px; }
          .badge { display: inline-block; background: rgba(0,242,254,0.15); color: #00f2fe; padding: 6px 16px; border-radius: 999px; font-weight: 700; font-size: 13px; letter-spacing: 0.05em; margin-bottom: 20px; }
          .btn { display: inline-block; margin-top: 24px; background: linear-gradient(135deg, #00f2fe, #4facfe); color: #050b14; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px; transition: transform 0.2s; }
          .btn:hover { transform: scale(1.03); }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">🚀 5TB CLOUD STORAGE ACTIVE</div>
          <h1>Google Drive 5TB Connected!</h1>
          <p>Aapka Google account successfully authenticate ho chuka hai. Ab nayi upload hone wali saari images seedhe aapke 5TB cloud folder me save hongi.</p>
          <p style="font-size:12px;color:#64748b;">Redirecting to Media Cockpit in 3 seconds...</p>
          <a href="/admin/media" class="btn">Enter Media Cockpit &rarr;</a>
        </div>
      </body>
      </html>`,
      { headers: { "content-type": "text/html" } }
    );
  } catch (err: any) {
    return new NextResponse(
      `<html><body style="background:#0b0f19;color:white;font-family:sans-serif;padding:40px;text-align:center;">
        <h1 style="color:#ef4444;">Token Exchange Failed</h1>
        <p>${err.message}</p>
        <a href="/admin/media" style="color:#00f2fe;">Back to Media Cockpit</a>
      </body></html>`,
      { headers: { "content-type": "text/html" } }
    );
  }
}
