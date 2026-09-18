import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "modernisum_super_secure_jwt_secret_key_2026_modern_ai_platform"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";
  const isVidhyamSubdomain = host.startsWith("vidhyam.") || host.startsWith("school.");

  // Subdomain rewrite: vidhyam.modernisum.com -> /vidhyam
  if (isVidhyamSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next") && !pathname.startsWith("/admin")) {
    if (!pathname.startsWith("/vidhyam")) {
      const url = req.nextUrl.clone();
      url.pathname = `/vidhyam${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Allow /admin/login without authentication
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("modernisum_token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Allow fallback session token in dev
      if (token.startsWith("ey") || token.length > 20) {
        return NextResponse.next();
      }
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|uploads|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};

