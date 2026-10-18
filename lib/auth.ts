import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "modernisum_super_secure_jwt_secret_key_2026_modern_ai_platform"
);

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "member" | "client";
  avatar?: string;
  accountType?: string;
}

/**
 * Sign a JWT token valid for 7 days
 */
export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

/**
 * Sign a 10-year indefinite Vidhyam School OS Desktop token compatible with backend_server Claims
 */
export async function signVidhyamDesktopToken(params?: {
  userId?: string;
  schoolId?: string;
  role?: string;
}): Promise<string> {
  const VIDHYAM_SECRET = new TextEncoder().encode(
    process.env.VIDHYAM_JWT_SECRET || "dev-secret-key-vidhyam-min-32-chars-long-secure-string"
  );
  const now = Math.floor(Date.now() / 1000);
  const tenYears = now + (3650 * 24 * 60 * 60);
  const defaultUserId = "0c177052-63d4-457c-8e90-34c7748caddd";
  const defaultSchoolId = "cb20fd66-1739-4076-a684-42624f23ebc6";

  return new SignJWT({
    sub: params?.userId || defaultUserId,
    school_id: params?.schoolId || defaultSchoolId,
    role: params?.role || "school-admin",
    imp: false,
    imp_by: null,
    jti: crypto.randomUUID(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(tenYears)
    .sign(VIDHYAM_SECRET);
}

export const signSchoolDesktopToken = signVidhyamDesktopToken;

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Set HTTP-only session cookie
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  cookieStore.set("modernisum_token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    domain: isProd ? ".modernisum.com" : undefined,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  cookieStore.delete({
    name: "modernisum_token",
    domain: isProd ? ".modernisum.com" : undefined,
    path: "/",
  });
}

/**
 * Get current session user from cookie
 */
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("modernisum_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Password hash & compare
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
