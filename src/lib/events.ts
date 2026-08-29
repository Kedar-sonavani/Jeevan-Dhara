import { DonationEvent } from "@/types";

export const INITIAL_EVENTS: DonationEvent[] = [
  {
    id: "evt-charkha-revival",
    slug: "charkha-revival",
    titleEn: "Solar Charkha & Handloom Sponsorship for 50 Rural Women",
    titleHi: "50 ग्रामीण महिलाओं हेतु सौर चरखा एवं हथकरघा प्रायोजन",
    category: "skills",
    targetAmount: 250000,
    raisedAmount: 185000,
    donorCount: 42,
    descriptionEn: "Provide 50 modern 8-spindle solar charkhas, wool carding tools, and 3 months of advanced training to women in Kolasar and Dungargarh villages.",
    descriptionHi: "कोलासर एवं डूंगरगढ़ के गांवों में महिलाओं को 50 आधुनिक 8-तकुआ सौर चरखे, ऊन प्रसंस्करण उपकरण और 3 महीने का उन्नत प्रशिक्षण प्रदान करना।",
    image: "/images/hero-charkha.jpeg",
    locationEn: "Bikaner District, Rajasthan",
    locationHi: "बीकानेर जिला, राजस्थान",
    featured: true,
    status: "active",
    createdAt: "2026-01-15",
  },
  {
    id: "evt-desert-rainwater-tanka",
    slug: "desert-rainwater-tanka",
    titleEn: "Community Rainwater Tank (Tanka) Restoration in 10 Desert Villages",
    titleHi: "10 रेगिस्तानी गांवों में सामुदायिक वर्षा जल टांका पुनरुद्धार",
    category: "wash",
    targetAmount: 300000,
    raisedAmount: 210000,
    donorCount: 56,
    descriptionEn: "Restoring and building desiltation filters for 10 community rainwater storage tanks (Tankas) providing clean drinking water to over 1,200 rural families.",
    descriptionHi: "10 सामुदायिक वर्षा जल संचयन टांकों का पुनरुद्धार एवं फिल्टर निर्माण, जिससे 1,200 से अधिक ग्रामीण परिवारों को स्वच्छ पेयजल उपलब्ध होगा।",
    image: "/images/sticking.jpeg",
    locationEn: "Hanumangarh & Bikaner",
    locationHi: "हनुमानगढ़ एवं बीकानेर",
    featured: true,
    status: "active",
    createdAt: "2026-02-01",
  },
  {
    id: "evt-youth-digital-center",
    slug: "youth-digital-center",
    titleEn: "Rural Youth Digital Lab & E-Governance Access Center",
    titleHi: "ग्रामीण युवा डिजिटल लैब एवं ई-गवर्नेंस सेवा केंद्र",
    category: "livelihood",
    targetAmount: 150000,
    raisedAmount: 95000,
    donorCount: 28,
    descriptionEn: "Equipping a dedicated rural computer center with 10 refurbished PCs, solar power backup, and internet connectivity to train 200 youths in digital skills.",
    descriptionHi: "10 कंप्यूटरों, सौर बैकअप और इंटरनेट के साथ ग्रामीण कंप्यूटर सेंटर स्थापित करना, जिससे 200 युवाओं को डिजिटल साक्षरता दी जा सके।",
    image: "/images/old.jpeg",
    locationEn: "Kolasar Mandi, Bikaner",
    locationHi: "कोलासर मंडी, बीकानेर",
    featured: false,
    status: "active",
    createdAt: "2026-02-10",
  },
  {
    id: "evt-maternal-poshan-kits",
    slug: "maternal-poshan-kits",
    titleEn: "Maternal Health & Fortified Poshan Kits for 300 Mothers",
    titleHi: "300 गर्भवती एवं धात्री माताओं हेतु पोषण किट एवं स्वास्थ्य सहायता",
    category: "nutrition",
    targetAmount: 180000,
    raisedAmount: 140000,
    donorCount: 39,
    descriptionEn: "Providing fortified nutrition kits (dry fruits, iron & calcium supplements, pulses) and preventive health checkups to combat anaemia in rural Rajasthan.",
    descriptionHi: "एनीमिया मुक्ति हेतु ग्रामीण महिलाओं को पोषण आहार किट (सूखे मेवे, आयरन व कैल्शियम सप्लीमेंट्स, दालें) एवं निःशुल्क स्वास्थ्य जांच उपलब्ध कराना।",
    image: "/images/about.jpeg",
    locationEn: "Sri Ganganagar & Bikaner",
    locationHi: "श्रीगंगानगर एवं बीकानेर",
    featured: false,
    status: "active",
    createdAt: "2026-02-18",
  },
  {
    id: "general",
    slug: "general",
    titleEn: "General NGO Fund - Where Most Needed",
    titleHi: "सामान्य ग्रामीण विकास निधि - जहाँ सर्वाधिक आवश्यकता हो",
    category: "general",
    targetAmount: 500000,
    raisedAmount: 385000,
    donorCount: 142,
    descriptionEn: "Allows Jeevan Dhara to deploy funds flexibly wherever the grassroots need is most urgent across Rajasthan.",
    descriptionHi: "आपका दान हमारे सभी सक्रिय कार्यक्रमों में तात्कालिक प्राथमिकताओं के अनुसार आवंटित किया जाएगा।",
    image: "/images/hero-charkha.jpeg",
    locationEn: "All Districts, Rajasthan",
    locationHi: "सभी जिले, राजस्थान",
    featured: false,
    status: "active",
    createdAt: "2026-01-01",
  },
];

// In-memory / localStorage bridge for real-time campaign management
let eventsStore: DonationEvent[] = [...INITIAL_EVENTS];

export function getEvents(): DonationEvent[] {
  return eventsStore;
}

export function getEventBySlugOrId(identifier: string): DonationEvent | undefined {
  return eventsStore.find(
    (e) => e.slug === identifier || e.id === identifier
  );
}

export function addEvent(event: Omit<DonationEvent, "id" | "raisedAmount" | "donorCount">): DonationEvent {
  const newEvent: DonationEvent = {
    ...event,
    id: `evt-${Date.now()}`,
    raisedAmount: 0,
    donorCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  eventsStore = [newEvent, ...eventsStore];
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<DonationEvent>): DonationEvent | null {
  const index = eventsStore.findIndex((e) => e.id === id);
  if (index === -1) return null;
  eventsStore[index] = { ...eventsStore[index], ...updates };
  return eventsStore[index];
}

export function deleteEvent(id: string): boolean {
  const initialLength = eventsStore.length;
  eventsStore = eventsStore.filter((e) => e.id !== id);
  return eventsStore.length < initialLength;
}

export function recordDonationToEvent(eventId: string, amount: number): DonationEvent | null {
  const event = eventsStore.find((e) => e.id === eventId || e.slug === eventId);
  if (!event) return null;
  event.raisedAmount += amount;
  event.donorCount += 1;
  return event;
}
