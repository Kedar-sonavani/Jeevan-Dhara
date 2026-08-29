import { Resend } from "resend";
import { env } from "@/lib/env";

export const resend = new Resend(env.RESEND_API_KEY || "re_placeholder");

export interface SendReceiptEmailParams {
  to: string;
  donorName: string;
  amount: number;
  receiptNumber: string;
  panNumber?: string;
  pdfBuffer?: Buffer;
}

export async function sendReceiptEmail(params: SendReceiptEmailParams) {
  try {
    if (!env.RESEND_API_KEY || env.RESEND_API_KEY === "re_placeholder") {
      console.log("[Resend Mock] Email sent to:", params.to, "for receipt:", params.receiptNumber);
      return { success: true, mocked: true };
    }

    const { data, error } = await resend.emails.send({
      from: env.SENDER_EMAIL,
      to: params.to,
      subject: `80G Tax Exemption Receipt #${params.receiptNumber} — Jeevan Dhara Sansthan`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2B2D2F; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #A7BEA9; border-radius: 8px;">
          <h2 style="color: #B85042; margin-top: 0;">Thank You for Supporting Jeevan Dhara Sansthan</h2>
          <p>Dear <strong>${params.donorName}</strong>,</p>
          <p>We gratefully acknowledge receipt of your generous contribution of <strong>₹${params.amount.toLocaleString("en-IN")}</strong> in support of our rural community empowerment initiatives in Rajasthan.</p>
          <div style="background-color: #F7F5F0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Receipt Number:</strong> ${params.receiptNumber}</p>
            <p style="margin: 0 0 8px 0;"><strong>Donation Amount:</strong> ₹${params.amount.toLocaleString("en-IN")}</p>
            <p style="margin: 0 0 8px 0;"><strong>PAN Number:</strong> ${params.panNumber || "N/A"}</p>
            <p style="margin: 0;"><strong>Tax Exemption:</strong> Eligible for 50% deduction under Section 80G(5) of the Income Tax Act, 1961.</p>
          </div>
          <p>Your contribution directly supports women weavers, youth digital training, and drinking water sanitation across Bikaner and Hanumangarh districts.</p>
          <hr style="border: none; border-top: 1px solid #E9EFEA; margin: 20px 0;" />
          <p style="font-size: 12px; color: #576F5A; margin: 0;">
            <strong>Jeevan Dhara Sansthan</strong><br />
            Registration No: 58/1-8-2012 | 12AA & 80G(5) Certified<br />
            Kolasar Mandi, Bikaner, Rajasthan 334001
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error("[Mailer Exception]:", err);
    return { success: false, error: err };
  }
}
