import { NextResponse } from "next/server";
import { generateReceiptNumber } from "@/lib/receipt";
import { createRazorpayOrder } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorName,
      donorEmail,
      donorPhone,
      panNumber,
      address,
      amount,
      frequency,
      eventId,
      eventTitle,
    } = body;

    const parsedAmount = Number(amount);

    if (!donorName || !donorEmail || !parsedAmount || parsedAmount < 100) {
      return NextResponse.json(
        { success: false, error: "Missing required donor fields or minimum amount is ₹100" },
        { status: 400 }
      );
    }

    const receiptNumber = generateReceiptNumber();

    // 1. Create Razorpay order (or mock order if sandbox/keys not configured)
    const razorpayOrder = await createRazorpayOrder({
      amountInRupees: parsedAmount,
      receiptId: receiptNumber,
      notes: {
        donorName,
        donorEmail,
        panNumber: panNumber || "",
        eventId: eventId || "general",
        eventTitle: eventTitle || "General Rural Development Fund",
      },
    });

    // 2. Attempt to save pending record to Supabase if configured
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        await supabaseAdmin.from("donations").insert({
          donor_name: donorName,
          donor_email: donorEmail,
          donor_phone: donorPhone || null,
          pan_number: panNumber || null,
          amount: parsedAmount * 100, // paise
          frequency: frequency || "one-time",
          event_id: eventId || "general",
          event_title: eventTitle || "General Fund",
          razorpay_order_id: razorpayOrder.orderId,
          status: "pending",
          receipt_number: receiptNumber,
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase] Pending donation save skipped or table not initialized:", dbErr);
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.orderId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receiptNumber,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      mock: razorpayOrder.mock,
      eventId: eventId || "general",
      eventTitle: eventTitle || "General Rural Development Fund",
    });
  } catch (error: any) {
    console.error("Donation order creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create donation order" },
      { status: 500 }
    );
  }
}
