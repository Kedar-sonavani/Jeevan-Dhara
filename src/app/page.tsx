"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HeroImpactCards } from "@/components/HeroImpactCards";
// import { ImpactStatsSection } from "@/components/ImpactStatsSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Language } from "@/types";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-white to-ivory-100 text-dark">
      {/* Top Header Navigation */}
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection lang={lang} />

        {/* Impact Highlights Bar */}
        <HeroImpactCards lang={lang} />

        {/* About & Mission Section */}
        <AboutSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
