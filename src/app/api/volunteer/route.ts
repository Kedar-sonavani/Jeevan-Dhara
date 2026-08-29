import { NextResponse } from "next/server";
import { resend } from "@/lib/mailer";
import { env } from "@/lib/env";
import { escapeHtml } from "@/lib/sanitize";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, city, interest, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone number are required" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim().substring(0, 100));
    const safeEmail = escapeHtml(email.trim().substring(0, 100));
    const safePhone = escapeHtml(phone.trim().substring(0, 20));
    const safeCity = escapeHtml((city || "Rajasthan").trim().substring(0, 100));
    const safeInterest = escapeHtml((interest || "General Volunteer").trim().substring(0, 100));
    const safeMessage = escapeHtml((message || "").trim().substring(0, 2000));

    // 1. Save to Supabase if configured
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        await supabaseAdmin.from("volunteer_applications").insert({
          name: safeName,
          email: safeEmail,
          phone: safePhone,
          city: safeCity,
          interest: safeInterest,
          message: safeMessage || null,
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase] Volunteer application save skipped:", dbErr);
    }

    // 2. Send confirmation email to applicant if Resend is configured
    try {
      if (env.RESEND_API_KEY && env.RESEND_API_KEY !== "re_placeholder") {
        await resend.emails.send({
          from: env.SENDER_EMAIL,
          to: email,
          subject: "Volunteer Application Received — Jeevan Dhara Sansthan",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #2B2D2F; max-width: 600px; margin: auto; border: 1px solid #A7BEA9; border-radius: 8px;">
              <h2 style="color: #B85042; margin-top: 0;">Thank You for Stepping Forward, ${safeName}!</h2>
              <p>We have successfully received your volunteer application for <strong>${safeInterest}</strong>.</p>
              <p>Our district coordinator in Rajasthan will review your profile and reach out within 48 hours.</p>
              <hr style="border: none; border-top: 1px solid #E9EFEA; margin: 20px 0;" />
              <p style="font-size: 12px; color: #576F5A; margin: 0;">
                <strong>Jeevan Dhara Sansthan</strong><br />
                Kolasar Mandi, Bikaner, Rajasthan
              </p>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.warn("Volunteer notification email skipped:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Volunteer application successfully registered",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process volunteer application" },
      { status: 500 }
    );
  }
}
