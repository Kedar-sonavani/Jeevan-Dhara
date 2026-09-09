import { SiteSettings, FundAllocationItem, TransparencyReport } from "@/types";

export const INITIAL_SETTINGS: SiteSettings = {
  fundAllocation: [
    {
      id: "fa-1",
      categoryEn: "Program Implementation & Artisan Materials",
      categoryHi: "प्रत्यक्ष कार्यक्रम क्रियान्वयन एवं कच्ची सामग्री",
      percentage: 82,
      color: "#B85042",
    },
    {
      id: "fa-2",
      categoryEn: "Community Mobilization & Field Operations",
      categoryHi: "समुदाय लामबंदी एवं क्षेत्रीय संचालन",
      percentage: 10,
      color: "#E7A93B",
    },
    {
      id: "fa-3",
      categoryEn: "Administration, Audit & Statutory Compliance",
      categoryHi: "प्रशासनिक व्यय, ऑडिट एवं वैधानिक अनुपालन",
      percentage: 8,
      color: "#A7BEA9",
    },
  ],
  reports: [
    {
      id: "rep-1",
      titleEn: "Annual Impact & Activities Report 2024-25",
      titleHi: "वार्षिक प्रभाव एवं गतिविधि रिपोर्ट 2024-25",
      type: "PDF Document",
      size: "2.4 MB",
      fileUrl: "/documents/annual-report-2024-25.pdf",
      year: "2024-25",
    },
    {
      id: "rep-2",
      titleEn: "Audited Financial Statements FY 2023-24",
      titleHi: "ऑडिट वित्तीय विवरण वित्त वर्ष 2023-24 (Form 10B)",
      type: "PDF Document",
      size: "1.8 MB",
      fileUrl: "/documents/audited-financials-2023-24.pdf",
      year: "2023-24",
    },
    {
      id: "rep-3",
      titleEn: "12AA & 80G Statutory Certificate",
      titleHi: "12AA एवं 80G(5) आयकर छूट प्रमाण पत्र",
      type: "PDF Document",
      size: "850 KB",
      fileUrl: "/documents/80g-12aa-certificate.pdf",
      year: "Permanent",
    },
  ],
  impactStats: {
    womenSkilled: "500+",
    villagesReached: "120+",
    activeVolunteers: "30+",
    donorsCount: "1,500+",
    biogasPlants: "45+",
  },
};

let settingsStore: SiteSettings = { ...INITIAL_SETTINGS };

export function getSiteSettings(): SiteSettings {
  return settingsStore;
}

export function updateFundAllocation(allocation: FundAllocationItem[]): SiteSettings {
  settingsStore.fundAllocation = allocation;
  return settingsStore;
}

export function updateReports(reports: TransparencyReport[]): SiteSettings {
  settingsStore.reports = reports;
  return settingsStore;
}

export function updateImpactStats(stats: SiteSettings["impactStats"]): SiteSettings {
  settingsStore.impactStats = { ...settingsStore.impactStats, ...stats };
  return settingsStore;
}

export function updateAllSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  settingsStore = {
    ...settingsStore,
    ...newSettings,
  };
  return settingsStore;
}
