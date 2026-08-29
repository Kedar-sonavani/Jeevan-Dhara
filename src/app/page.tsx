"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HeroImpactCards } from "@/components/HeroImpactCards";
import { ImpactStatsSection } from "@/components/ImpactStatsSection";
import { CampaignsShowcase } from "@/components/CampaignsShowcase";
import { AboutSection } from "@/components/AboutSection";
import { StoriesSection } from "@/components/StoriesSection";
import { DonationCtaBand } from "@/components/DonationCtaBand";
import { Footer } from "@/components/Footer";
import { Language } from "@/types";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-white to-ivory-100 text-dark">
      {/* Top Header Navigation */}
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection lang={lang} />

        {/* 2. Impact Highlights Floating Glass Bar */}
        <HeroImpactCards lang={lang} />

        {/* 3. Credibility & Trust Bar (Est 2012, 7 Districts, 80G) */}
        <ImpactStatsSection lang={lang} />

        {/* 4. Active Urgent Campaigns with Live Progress Bars */}
        <CampaignsShowcase lang={lang} />

        {/* 5. About & Mission Section */}
        <AboutSection lang={lang} />

        {/* 6. Real Stories of Change (Beneficiary Narratives) */}
        <StoriesSection lang={lang} />

        {/* 7. Full-Width Donation Conversion Band */}
        <DonationCtaBand lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
