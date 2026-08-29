"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";
import { MapPin, Building, Navigation, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function WhereWeWorkPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang].whereWeWork;

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#F5F1E8] overflow-hidden py-14 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            {/* Centered Image with Text Overlay */}
            <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-[#20221F]/10">
              <Image
                src="/images/transparency.jpeg"
                alt="Communities and field work in Rajasthan"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 text-center text-white flex flex-col items-center justify-end">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-amber-300 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-3">
                  Rajasthan
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold max-w-3xl leading-tight">
                  {lang === "en"
                    ? "Working directly with communities across 120+ villages."
                    : "120+ गांवों में स्थानीय समुदायों के साथ प्रत्यक्ष जमीनी कार्य।"}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-lg font-sans">
                  {lang === "en"
                    ? "Sustainable livelihoods, desert water harvesting, and youth empowerment."
                    : "सतत आजीविका, रेगिस्तानी जल संचयन और युवा सशक्तिकरण।"}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Dual Facilities Highlight (HQ & Branch) */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* HQ Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-terracotta/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 text-terracotta mb-4">
                <Building className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider bg-terracotta/10 px-3 py-1 rounded-full">
                  Primary Coordination
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-dark mb-2">
                {t.hqCard.title}
              </h3>
              <p className="text-sm font-semibold text-terracotta-700 flex items-center gap-1.5 mb-4">
                <MapPin className="w-4 h-4 shrink-0" />
                {t.hqCard.location}
              </p>
              <p className="text-sm text-dark/80 font-sans leading-relaxed">
                {t.hqCard.desc}
              </p>
            </div>

            {/* Branch Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-sage-300 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 text-sage-800 mb-4">
                <Building className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider bg-sage-100 px-3 py-1 rounded-full">
                  Field Operations Hub
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-dark mb-2">
                {t.branchCard.title}
              </h3>
              <p className="text-sm font-semibold text-sage-900 flex items-center gap-1.5 mb-4">
                <MapPin className="w-4 h-4 shrink-0" />
                {t.branchCard.location}
              </p>
              <p className="text-sm text-dark/80 font-sans leading-relaxed">
                {t.branchCard.desc}
              </p>
            </div>
          </div>
        </section>

        {/* 7 Districts Presence Grid */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
              Rajasthan Field Presence
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-dark">
              {lang === "en" ? "Districts Reached by Jeevan Dhara" : "जीवन धारा संस्थान के कार्यक्षेत्र जिले"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.districts.map((district, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-sage-200 shadow-xs hover:shadow-lg hover:border-amber transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-dark">
                      {district.name}
                    </h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                      {district.status}
                    </span>
                  </div>
                  <p className="text-sm text-dark/80 font-sans leading-relaxed">
                    {district.focus}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-sage-100 flex items-center justify-between text-xs text-dark/70 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
                    {district.villages}
                  </span>
                  <Link
                    href="/our-work"
                    className="text-terracotta font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>{lang === "en" ? "View Work" : "कार्य देखें"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-sage-100/60 border-t border-sage-200 py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-dark">
              {lang === "en"
                ? "Help us expand into more remote villages"
                : "अधिक दूरस्थ गांवों तक हमारी पहुँच बढ़ाने में सहयोग करें"}
            </h3>
            <p className="text-sm sm:text-base text-dark/80 font-sans">
              {lang === "en"
                ? "Your tax-deductible contribution directly funds training materials, clean water tank setups, and health camps."
                : "आपका कर-मुक्त योगदान सीधे प्रशिक्षण सामग्री, स्वच्छ जल टांका निर्माण और स्वास्थ्य शिविरों को वित्तपोषित करता है।"}
            </p>
            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white hover:bg-terracotta-600 font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{lang === "en" ? "Donate to Rural Development" : "ग्रामीण विकास हेतु दान करें"}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
