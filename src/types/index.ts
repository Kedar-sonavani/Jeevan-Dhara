export type Language = "en" | "hi";

export interface DonorDetails {
  name: string;
  email: string;
  phone?: string;
  panNumber?: string;
  address?: string;
}

export interface DonationRecord {
  id?: string;
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  pan_number?: string;
  amount: number; // in rupees
  frequency: "one-time" | "monthly";
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  status: "pending" | "success" | "failed";
  receipt_number?: string;
  receipt_url?: string;
  created_at?: string;
}

export interface CSRLead {
  id?: string;
  company_name: string;
  contact_person: string;
  designation?: string;
  email: string;
  phone?: string;
  csr_budget_range?: string;
  areas_of_interest: string[];
  message?: string;
  status?: "new" | "contacted" | "converted" | "closed";
  created_at?: string;
}

export interface ImpactMetric {
  id: string;
  value: number;
  suffix: string;
  labelEn: string;
  labelHi: string;
  descriptionEn: string;
  descriptionHi: string;
}

export interface Program {
  slug: string;
  titleEn: string;
  titleHi: string;
  shortDescEn: string;
  shortDescHi: string;
  fullDescEn: string;
  fullDescHi: string;
  imagePath: string;
  beneficiaries: string;
}
