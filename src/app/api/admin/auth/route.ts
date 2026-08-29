import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { signJwt, verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, pin } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || env.ADMIN_PASSWORD;
    const expectedPin = process.env.ADMIN_PIN || env.ADMIN_PIN;

    if (!expectedPassword && !expectedPin) {
      return NextResponse.json(
        { success: false, error: "Server authentication misconfigured: ADMIN_PASSWORD not set in environment" },
        { status: 500 }
      );
    }

    const inputCredential = (password || pin || "").trim();

    // Authenticate against secure password OR pin from environment
    const isValid =
      (Boolean(expectedPassword) && inputCredential === expectedPassword) ||
      (Boolean(expectedPin) && inputCredential === expectedPin);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative password" },
        { status: 401 }
      );
    }

    // Generate cryptographic JWT Token (valid for 7 days)
    const jwtToken = signJwt({
      role: "admin",
      adminId: "jds_super_admin",
    }, 60 * 60 * 24 * 7);

    const cookieStore = await cookies();

    // Set secure httpOnly cookie with signed JWT
    cookieStore.set("jds_admin_session", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Admin authenticated successfully with secure JWT",
      token: jwtToken, // returned for Bearer auth
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("jds_admin_session")?.value;

    if (sessionToken) {
      if (sessionToken === env.ADMIN_API_SECRET) {
        return NextResponse.json({ authenticated: true, token: sessionToken });
      }
      const verified = verifyJwt(sessionToken);
      if (verified && verified.role === "admin") {
        return NextResponse.json({ authenticated: true, token: sessionToken, adminId: verified.adminId });
      }
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("jds_admin_session");
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
