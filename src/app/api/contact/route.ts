import { NextResponse } from "next/server";
import { resend } from "@/lib/mailer";
import { env } from "@/lib/env";
import { escapeHtml } from "@/lib/sanitize";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim().substring(0, 100));
    const safeEmail = escapeHtml(email.trim().substring(0, 100));
    const safePhone = escapeHtml((phone || "").trim().substring(0, 20));
    const safeSubject = escapeHtml((subject || "General Inquiry").trim().substring(0, 150));
    const safeMessage = escapeHtml(message.trim().substring(0, 2000));

    // 1. Save to Supabase if configured
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        await supabaseAdmin.from("contact_inquiries").insert({
          name: safeName,
          email: safeEmail,
          phone: safePhone || null,
          subject: safeSubject,
          message: safeMessage,
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase] Contact inquiry save skipped:", dbErr);
    }

    // 2. Send sanitized acknowledgement email to user
    try {
      if (env.RESEND_API_KEY && env.RESEND_API_KEY !== "re_placeholder") {
        await resend.emails.send({
          from: env.SENDER_EMAIL,
          to: email,
          subject: `Inquiry Received: ${safeSubject} — Jeevan Dhara Sansthan`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #2B2D2F; max-width: 600px; margin: auto; border: 1px solid #A7BEA9; border-radius: 8px;">
              <h2 style="color: #B85042; margin-top: 0;">Thank You for Reaching Out</h2>
              <p>Dear <strong>${safeName}</strong>,</p>
              <p>We have received your message regarding <strong>${safeSubject}</strong>:</p>
              <blockquote style="background: #F7F5F0; padding: 12px 16px; border-left: 4px solid #E7A93B; margin: 15px 0; border-radius: 4px; font-style: italic;">
                ${safeMessage}
              </blockquote>
              <p>Our official team at Kolasar Mandi, Bikaner will review your inquiry and respond within 24 to 48 business hours.</p>
              <hr style="border: none; border-top: 1px solid #E9EFEA; margin: 20px 0;" />
              <p style="font-size: 12px; color: #576F5A; margin: 0;">
                <strong>Jeevan Dhara Sansthan</strong><br />
                Registration No: 58/1-8-2012 | 12AA & 80G(5) Certified<br />
                Kolasar Mandi, Bikaner, Rajasthan 334001
              </p>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.warn("Contact inquiry email notification skipped:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Official inquiry submitted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
