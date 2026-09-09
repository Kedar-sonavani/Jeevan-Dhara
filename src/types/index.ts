export type Language = "en" | "hi";

export interface DonorDetails {
  name: string;
  email: string;
  phone?: string;
  panNumber?: string;
  address?: string;
}

export interface DonationMilestone {
  percentage: number;
  labelEn: string;
  labelHi: string;
}

export interface DonationEvent {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  category: "skills" | "wash" | "nutrition" | "livelihood" | "emergency" | "general";
  targetAmount: number; // in INR
  raisedAmount: number; // in INR
  donorCount: number;
  descriptionEn: string;
  descriptionHi: string;
  image: string;
  locationEn: string;
  locationHi: string;
  featured?: boolean;
  status: "active" | "completed";
  milestones?: DonationMilestone[];
  createdAt?: string;
}

export interface VolunteerCampaign {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  category: "teaching" | "medical" | "logistics" | "digital" | "general";
  volunteersNeeded: number;
  volunteersEnrolled: number;
  descriptionEn: string;
  descriptionHi: string;
  image: string;
  locationEn: string;
  locationHi: string;
  featured?: boolean;
  status: "active" | "completed";
  createdAt?: string;
}

export interface ImpactStory {
  id: string;
  beneficiaryName: string;
  villageEn: string;
  villageHi: string;
  category: "skills" | "wash" | "nutrition" | "livelihood";
  headlineEn: string;
  headlineHi: string;
  storyEn: string;
  storyHi: string;
  quoteEn: string;
  quoteHi: string;
  donationImpactEn: string;
  donationImpactHi: string;
  eventSlug: string;
  image: string;
  year: string;
}

export interface DonationRecord {
  id?: string;
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  pan_number?: string;
  amount: number; // in rupees
  frequency: "one-time" | "monthly";
  event_id?: string;
  event_title?: string;
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

export interface VolunteerApplication {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  message?: string;
  created_at?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
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

export interface Leader {
  name: string;
  role: string;
  bio: string;
  tag: string;
  image?: string;
}

export interface FundAllocationItem {
  id: string;
  categoryEn: string;
  categoryHi: string;
  percentage: number;
  color: string;
}

export interface TransparencyReport {
  id: string;
  titleEn: string;
  titleHi: string;
  type: string;
  size: string;
  fileUrl: string;
  year: string;
}

export interface SiteSettings {
  fundAllocation: FundAllocationItem[];
  reports: TransparencyReport[];
  impactStats: {
    womenSkilled: string;
    villagesReached: string;
    activeVolunteers: string;
    donorsCount: string;
    biogasPlants: string;
  };
}

