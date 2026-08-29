import crypto from "crypto";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

const JWT_SECRET: string = process.env.JWT_SECRET || env.JWT_SECRET || "";

function getJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is missing. Please set it in .env.local");
  }
  return JWT_SECRET;
}

interface JwtPayload {
  role: string;
  adminId: string;
  iat: number;
  exp: number;
}

/**
 * Base64 URL encode utility
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Base64 URL decode utility
 */
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return Buffer.from(str, "base64").toString("utf-8");
}

/**
 * Cryptographically sign and create a JWT token with HS256
 */
export function signJwt(payload: Omit<JwtPayload, "iat" | "exp">, expiresInSeconds = 60 * 60 * 24 * 7): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", getJwtSecret())
    .update(signatureInput)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${signatureInput}.${signature}`;
}

/**
 * Verify and decode an HS256 signed JWT token
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const expectedSignature = crypto
      .createHmac("sha256", getJwtSecret())
      .update(signatureInput)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    // Timing-safe signature comparison
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: JwtPayload = JSON.parse(base64UrlDecode(encodedPayload));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Verify Admin Authentication from Authorization Header OR httpOnly Cookie JWT
 */
export async function verifyAdminAuth(request: Request): Promise<boolean> {
  // 1. Check Bearer token in Authorization header
  const authHeader = request.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === env.ADMIN_API_SECRET) return true;
    const verified = verifyJwt(token);
    if (verified && verified.role === "admin") {
      return true;
    }
  }

  // 2. Check httpOnly cookie session with JWT
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("jds_admin_session")?.value;
    if (sessionCookie) {
      if (sessionCookie === env.ADMIN_API_SECRET) return true;
      const verified = verifyJwt(sessionCookie);
      if (verified && verified.role === "admin") {
        return true;
      }
    }
  } catch {
    // Context issue with cookies()
  }

  return false;
}
