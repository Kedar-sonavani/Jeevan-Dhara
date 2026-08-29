import { VolunteerCampaign } from "@/types";

export const INITIAL_VOLUNTEER_CAMPAIGNS: VolunteerCampaign[] = [
  {
    id: "vc-digital-literacy",
    slug: "digital-literacy",
    titleEn: "Digital Literacy Trainers for Rural Youth",
    titleHi: "ग्रामीण युवाओं के लिए डिजिटल साक्षरता प्रशिक्षक",
    category: "digital",
    volunteersNeeded: 20,
    volunteersEnrolled: 8,
    descriptionEn: "We need volunteers skilled in basic computers to teach digital literacy to youths in Bikaner for a 1-month program.",
    descriptionHi: "हमें बीकानेर में 1 महीने के कार्यक्रम के लिए युवाओं को डिजिटल साक्षरता सिखाने के लिए बेसिक कंप्यूटर कौशल वाले स्वयंसेवकों की आवश्यकता है।",
    image: "/images/old.jpeg",
    locationEn: "Kolasar Mandi, Bikaner",
    locationHi: "कोलासर मंडी, बीकानेर",
    featured: true,
    status: "active",
    createdAt: "2026-03-01",
  },
  {
    id: "vc-medical-camp",
    slug: "medical-camp",
    titleEn: "Medical & Health Camp Assistants",
    titleHi: "चिकित्सा एवं स्वास्थ्य शिविर सहायक",
    category: "medical",
    volunteersNeeded: 15,
    volunteersEnrolled: 12,
    descriptionEn: "Looking for volunteers to assist doctors and manage patient registration in our upcoming maternal health camp in Hanumangarh.",
    descriptionHi: "हनुमानगढ़ में हमारे आगामी मातृ स्वास्थ्य शिविर में डॉक्टरों की सहायता करने और रोगी पंजीकरण का प्रबंधन करने के लिए स्वयंसेवकों की तलाश है।",
    image: "/images/about.jpeg",
    locationEn: "Hanumangarh District",
    locationHi: "हनुमानगढ़ जिला",
    featured: false,
    status: "active",
    createdAt: "2026-03-05",
  },
  {
    id: "vc-artisan-photography",
    slug: "artisan-photography",
    titleEn: "Photographers for Artisan Storytelling",
    titleHi: "कारीगरों की कहानी बताने के लिए फोटोग्राफर",
    category: "teaching", // Closest match in the types, or we can use general/logistics
    volunteersNeeded: 5,
    volunteersEnrolled: 2,
    descriptionEn: "Volunteer your photography skills to document the stories of women weavers and their traditional handloom techniques.",
    descriptionHi: "महिला बुनकरों और उनकी पारंपरिक हथकरघा तकनीकों की कहानियों का दस्तावेजीकरण करने के लिए अपने फोटोग्राफी कौशल को स्वेच्छा से दें।",
    image: "/images/hero-charkha.jpeg",
    locationEn: "Bikaner & Surrounding Villages",
    locationHi: "बीकानेर एवं आसपास के गांव",
    featured: false,
    status: "active",
    createdAt: "2026-03-10",
  },
  {
    id: "vc-general-volunteer",
    slug: "general-volunteer",
    titleEn: "General Grassroots Volunteers",
    titleHi: "सामान्य जमीनी स्वयंसेवक",
    category: "general",
    volunteersNeeded: 50,
    volunteersEnrolled: 30,
    descriptionEn: "Join our core volunteer team to help with day-to-day NGO operations, events, and community mobilization.",
    descriptionHi: "दैनिक एनजीओ संचालन, कार्यक्रमों और सामुदायिक लामबंदी में मदद करने के लिए हमारी मुख्य स्वयंसेवक टीम में शामिल हों।",
    image: "/images/sticking.jpeg",
    locationEn: "All Active Districts, Rajasthan",
    locationHi: "सभी सक्रिय जिले, राजस्थान",
    featured: false,
    status: "active",
    createdAt: "2026-01-01",
  }
];

let campaignsStore: VolunteerCampaign[] = [...INITIAL_VOLUNTEER_CAMPAIGNS];

export function getVolunteerCampaigns(): VolunteerCampaign[] {
  return campaignsStore;
}

export function getVolunteerCampaignBySlugOrId(identifier: string): VolunteerCampaign | undefined {
  return campaignsStore.find(
    (c) => c.slug === identifier || c.id === identifier
  );
}
