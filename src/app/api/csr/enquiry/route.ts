import { NextResponse } from "next/server";
import { resend } from "@/lib/mailer";
import { env } from "@/lib/env";
import { escapeHtml } from "@/lib/sanitize";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactPerson,
      designation,
      email,
      phone,
      csrBudgetRange,
      areasOfInterest,
      message,
    } = body;

    if (!companyName || !contactPerson || !email) {
      return NextResponse.json(
        { success: false, error: "Company name, contact person, and email are required." },
        { status: 400 }
      );
    }

    const safeCompany = escapeHtml(companyName.trim().substring(0, 150));
    const safeContact = escapeHtml(contactPerson.trim().substring(0, 100));
    const safeDesignation = escapeHtml((designation || "").trim().substring(0, 100));
    const safeEmail = escapeHtml(email.trim().substring(0, 100));
    const safePhone = escapeHtml((phone || "").trim().substring(0, 25));
    const safeBudget = escapeHtml((csrBudgetRange || "Not Specified").trim());
    const safeAreas = Array.isArray(areasOfInterest)
      ? areasOfInterest.map((a: string) => escapeHtml(String(a).substring(0, 50)))
      : [];
    const safeMessage = escapeHtml((message || "").trim().substring(0, 3000));

    // 1. Save CSR Lead in Supabase if configured
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        await supabaseAdmin.from("csr_leads").insert({
          company_name: safeCompany,
          contact_person: safeContact,
          designation: safeDesignation || null,
          email: safeEmail,
          phone: safePhone || null,
          csr_budget_range: safeBudget,
          areas_of_interest: safeAreas,
          message: safeMessage || null,
          status: "new",
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase] CSR Lead save skipped:", dbErr);
    }

    // 2. Send notification email to NGO leadership
    try {
      if (env.RESEND_API_KEY && env.RESEND_API_KEY !== "re_placeholder") {
        await resend.emails.send({
          from: env.SENDER_EMAIL,
          to: env.NGO_ADMIN_EMAIL,
          subject: `🏢 New CSR Partnership Inquiry: ${safeCompany}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #2B2D2F; max-width: 600px; margin: auto; border: 1px solid #A7BEA9; border-radius: 8px;">
              <h2 style="color: #B85042; margin-top: 0;">New CSR Partnership Proposal</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Company:</td><td>${safeCompany}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Contact Person:</td><td>${safeContact} (${safeDesignation || "N/A"})</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>${safePhone || "N/A"}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">CSR Budget Range:</td><td>${safeBudget}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Focus Areas:</td><td>${safeAreas.join(", ") || "General"}</td></tr>
              </table>
              <div style="margin-top: 15px; padding: 12px; background: #F7F5F0; border-left: 4px solid #E7A93B; border-radius: 4px;">
                <strong>Message / Objectives:</strong><br />
                <p style="margin: 6px 0 0 0; white-space: pre-wrap;">${safeMessage || "No additional message provided."}</p>
              </div>
            </div>
          `,
        });

        // Acknowledgement to corporate partner
        await resend.emails.send({
          from: env.SENDER_EMAIL,
          to: email,
          subject: `CSR Inquiry Acknowledgement — Jeevan Dhara Sansthan`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #2B2D2F; max-width: 600px; margin: auto; border: 1px solid #A7BEA9; border-radius: 8px;">
              <h2 style="color: #B85042; margin-top: 0;">Thank You for Your CSR Partnership Interest</h2>
              <p>Dear <strong>${safeContact}</strong>,</p>
              <p>Thank you for considering <strong>Jeevan Dhara Sansthan</strong> as your CSR implementation partner. We have received your proposal for <strong>${safeCompany}</strong>.</p>
              <p>Our CSR Partnerships Officer at Kolasar Mandi, Bikaner will review your project parameters and contact you within 2 business days with our comprehensive NGO profile, audited financials, and customized implementation matrix.</p>
              <hr style="border: none; border-top: 1px solid #E9EFEA; margin: 20px 0;" />
              <p style="font-size: 12px; color: #576F5A; margin: 0;">
                <strong>Jeevan Dhara Sansthan</strong><br />
                Registration No: 58/1-8-2012 | 12AA & 80G(5) Certified | MCA CSR-1 Registered<br />
                Kolasar Mandi, Bikaner, Rajasthan 334001
              </p>
            </div>
          `,
        });
      }
    } catch (mailErr) {
      console.warn("CSR email dispatch skipped:", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "CSR Proposal successfully submitted",
    });
  } catch (err: any) {
    console.error("CSR enquiry error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit CSR inquiry" },
      { status: 500 }
    );
  }
}
