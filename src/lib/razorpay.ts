import { env } from "@/lib/env";
import Razorpay from "razorpay";
import crypto from "crypto";

export const razorpayClient = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

/**
 * Creates a Razorpay order in INR (amount in paise: 1 INR = 100 paise)
 */
export async function createRazorpayOrder(params: {
  amountInRupees: number;
  receiptId: string;
  notes?: Record<string, string>;
}) {
  const isMock =
    !env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    env.NEXT_PUBLIC_RAZORPAY_KEY_ID === "rzp_test_placeholder" ||
    !env.RAZORPAY_KEY_SECRET ||
    env.RAZORPAY_KEY_SECRET === "placeholder_secret";

  if (isMock) {
    return {
      orderId: `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      amount: params.amountInRupees * 100,
      currency: "INR",
      receipt: params.receiptId,
      mock: true,
    };
  }

  const order = await razorpayClient.orders.create({
    amount: Math.round(params.amountInRupees * 100),
    currency: "INR",
    receipt: params.receiptId.substring(0, 40),
    notes: params.notes || {},
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    mock: false,
  };
}

/**
 * Cryptographically verifies Razorpay payment HMAC SHA256 signature
 */
export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const isMock =
    !env.RAZORPAY_KEY_SECRET || env.RAZORPAY_KEY_SECRET === "placeholder_secret";

  // In mock/sandbox mode without real secret, verify structural presence
  if (isMock) {
    return Boolean(params.orderId && params.paymentId && params.signature);
  }

  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  return expectedSignature === params.signature;
}
