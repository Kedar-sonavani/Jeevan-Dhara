import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default("placeholder-key"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default("placeholder-service-key"),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().optional().default("rzp_test_placeholder"),
  RAZORPAY_KEY_SECRET: z.string().optional().default("placeholder_secret"),
  RESEND_API_KEY: z.string().optional().default("re_placeholder"),
  NGO_ADMIN_EMAIL: z.string().optional().default("admin@jeevandhara.org"),
  SENDER_EMAIL: z.string().optional().default("donations@jeevandhara.org"),
  ADMIN_PIN: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  ADMIN_API_SECRET: z.string().optional(),
  JWT_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
