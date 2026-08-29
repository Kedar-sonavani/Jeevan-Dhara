"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language, VolunteerCampaign } from "@/types";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  MapPin,
  ArrowRight,
  Users
} from "lucide-react";

function VolunteerCampaignsPortal() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang].getInvolved;
  const isHi = lang === "hi";

  const [campaigns, setCampaigns] = useState<VolunteerCampaign[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const res = await fetch("/api/volunteer-campaigns", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.campaigns?.length) {
          setCampaigns(data.campaigns);
        }
      } catch (err) {
        console.error("Failed to load volunteer campaigns:", err);
      }
    }
    loadCampaigns();
  }, []);

  const filteredCampaigns =
    selectedCategory === "all"
      ? campaigns
      : campaigns.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-linear-to-r from-dark via-dark/95 to-terracotta/90 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage-900 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-amber/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-300/30">
              <Users className="w-3.5 h-3.5 fill-amber-300" />
              {t?.badge || (isHi ? "स्वयंसेवक अभियान" : "Volunteer Campaigns")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              {isHi ? "स्वयंसेवक अवसर एवं अभियान चुनें" : "Personalised Volunteering Causes"}
            </h1>
            <p className="text-base sm:text-lg text-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              {isHi
                ? "आप जिस विशिष्ट कार्य या समुदाय में अपना समय देना चाहते हैं, उसे चुनें। आपका कौशल ग्रामीण जीवन को सशक्त बना सकता है।"
                : "Choose the exact community initiative you wish to volunteer for. Your time and skills directly empower our grassroots causes."}
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        </section>

        {/* Notice Band */}
        <div className="bg-amber-100 border-b border-amber-300/60 py-3 px-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
            <span>{isHi ? "प्रमाणपत्र एवं वास्तविक संतुष्टि" : "Field Certificate & Real-World Impact Provided"}</span>
          </div>
        </div>

        {/* Choose an Active Event or Cause */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                {isHi ? "अभियान" : "Campaigns"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-dark">
                {isHi ? "स्वयंसेवा हेतु पहल चुनें" : "Select an Initiative to Volunteer"}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "all"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "सभी अभियान" : "All Causes"}
              </button>
              <button
                onClick={() => setSelectedCategory("digital")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "digital"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "डिजिटल साक्षरता" : "Digital Literacy"}
              </button>
              <button
                onClick={() => setSelectedCategory("medical")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "medical"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "स्वास्थ्य एवं चिकित्सा" : "Medical & Health"}
              </button>
              <button
                onClick={() => setSelectedCategory("general")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "general"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "सामान्य स्वयंसेवा" : "General Volunteering"}
              </button>
            </div>
          </div>

          {/* Flagship Campaign Spotlight Card */}
          {(() => {
            const mainCampaign = campaigns.find((e) => e.featured) || campaigns[0];
            if (!mainCampaign) return null;
            const mainPercent = Math.min(100, Math.round((mainCampaign.volunteersEnrolled / mainCampaign.volunteersNeeded) * 100));

            return (
              <div className="bg-white rounded-3xl overflow-hidden border-2 border-amber/40 shadow-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-sage-100 shadow-md">
                  <Image
                    src={mainCampaign.image}
                    alt={mainCampaign.titleEn}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-amber text-dark font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md">
                    ⭐ {isHi ? "मुख्य आवश्यकता" : "Urgent Requirement"}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-sans flex items-center gap-1 text-amber-200">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{isHi ? mainCampaign.locationHi : mainCampaign.locationEn}</span>
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                        {mainCampaign.category.toUpperCase()}
                      </span>
                      <span className="text-[11px] font-semibold text-sage-900 bg-sage-100 px-2.5 py-0.5 rounded-full">
                        {mainCampaign.volunteersEnrolled} {isHi ? "पंजीकृत" : "Enrolled"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-dark leading-snug">
                      {isHi ? mainCampaign.titleHi : mainCampaign.titleEn}
                    </h3>
                    <p className="text-sm text-dark/75 font-sans leading-relaxed">
                      {isHi ? mainCampaign.descriptionHi : mainCampaign.descriptionEn}
                    </p>
                  </div>

                  {/* Progress Meter */}
                  <div className="space-y-2 pt-2 border-t border-sage-100">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-terracotta font-bold text-base">
                        {mainCampaign.volunteersEnrolled}{" "}
                        <span className="text-xs text-dark/60 font-normal">
                          {isHi ? "स्वयंसेवक तैयार" : "volunteers enrolled"}
                        </span>
                      </span>
                      <span className="text-dark/60 font-sans">
                        {mainPercent}% of {mainCampaign.volunteersNeeded} {isHi ? "लक्ष्य" : "goal"}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-cream-300 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${mainPercent}%` }}
                        className="h-full bg-linear-to-r from-terracotta via-amber to-amber-400 rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Redirect Action Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/volunteer-campaigns/${mainCampaign.slug || mainCampaign.id}`}
                      className="w-full sm:w-auto px-7 py-3.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isHi ? "अभियान का विवरण एवं आवेदन" : "View Campaign & Apply"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* All Causes Section Title */}
          <div className="pt-6">
            <h3 className="text-lg font-serif font-bold text-dark">
              {isHi ? "सभी सक्रिय स्वयंसेवा अवसर:" : "Explore All Active Volunteer Campaigns:"}
            </h3>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCampaigns.map((evt) => {
              const percent = Math.min(100, Math.round((evt.volunteersEnrolled / evt.volunteersNeeded) * 100));

              return (
                <Link
                  key={evt.id}
                  href={`/volunteer-campaigns/${evt.slug || evt.id}`}
                  className="group rounded-3xl overflow-hidden border-2 border-sage-200 hover:border-terracotta hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-white cursor-pointer"
                >
                  <div className="relative h-44 w-full bg-sage-100">
                    <Image
                      src={evt.image}
                      alt={evt.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-amber text-dark font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {evt.category}
                    </span>
                    <div className="absolute bottom-2 left-3 right-3 text-white">
                      <p className="text-[11px] font-sans flex items-center gap-1 text-amber-200">
                        <MapPin className="w-3 h-3" />
                        <span>{isHi ? evt.locationHi : evt.locationEn}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-serif font-bold text-dark leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
                        {isHi ? evt.titleHi : evt.titleEn}
                      </h3>
                      <p className="text-xs text-dark/75 font-sans mt-1.5 line-clamp-2">
                        {isHi ? evt.descriptionHi : evt.descriptionEn}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1.5 pt-2 border-t border-sage-100">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-terracotta font-bold">
                          {evt.volunteersEnrolled} {isHi ? "पंजीकृत" : "enrolled"}
                        </span>
                        <span className="text-dark/60">
                          {percent}% of {evt.volunteersNeeded}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-cream-300 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percent}%` }}
                          className="h-full bg-linear-to-r from-terracotta to-amber rounded-full transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="w-full py-3 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition flex items-center justify-center gap-2">
                        <Users className="w-3.5 h-3.5 fill-dark" />
                        <span>{isHi ? "आवेदन करें" : "Join Campaign"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default function VolunteerCampaignsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream/30 flex items-center justify-center font-sans">Loading volunteer campaigns...</div>}>
      <VolunteerCampaignsPortal />
    </Suspense>
  );
}
