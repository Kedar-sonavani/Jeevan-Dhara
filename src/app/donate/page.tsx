"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language, DonationEvent } from "@/types";
import { INITIAL_EVENTS } from "@/lib/events";
import {
  Heart,
  ShieldCheck,
  Check,
  Sparkles,
  Lock,
  Target,
  Users,
  MapPin,
  Filter,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function DonatePortal() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang].donate;
  const isHi = lang === "hi";

  // Events list state
  const [events, setEvents] = useState<DonationEvent[]>(INITIAL_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch live events from API
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.events?.length) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }
    loadEvents();
  }, []);

  // Filtered Events
  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-linear-to-r from-dark via-dark/95 to-terracotta/90 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage-900 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-amber/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-300/30">
              <Heart className="w-3.5 h-3.5 fill-amber-300" />
              {t.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              {isHi ? "विशिष्ट सेवा पहल एवं दान अभियान चुनें" : "Personalised Cause & Project Donation"}
            </h1>
            <p className="text-base sm:text-lg text-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              {isHi
                ? "आप जिस विशिष्ट कार्य या समुदाय को सहयोग देना चाहते हैं, उसे सीधे चुनें। आपका 100% दान उसी परियोजना में उपयोग किया जाएगा।"
                : "Choose the exact community initiative you wish to support. 100% of your tax-exempt contribution directly funds your selected cause."}
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        </section>

        {/* 80G Tax Exemption Notice Band */}
        <div className="bg-amber-100 border-b border-amber-300/60 py-3 px-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
            <span>{t.taxNotice}</span>
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
                {isHi ? "सहयोग हेतु पहल / अभियान चुनें" : "Select an Initiative / Event to Sponsor"}
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
                onClick={() => setSelectedCategory("skills")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "skills"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "हथकरघा एवं कौशल" : "Skills & Handloom"}
              </button>
              <button
                onClick={() => setSelectedCategory("wash")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "wash"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "जल एवं स्वच्छता (WASH)" : "WASH & Water"}
              </button>
              <button
                onClick={() => setSelectedCategory("livelihood")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "livelihood"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "डिजिटल व आजीविका" : "Digital & Livelihood"}
              </button>
              <button
                onClick={() => setSelectedCategory("general")}
                className={`px-3.5 py-1.5 rounded-full transition ${selectedCategory === "general"
                    ? "bg-terracotta text-white shadow-xs"
                    : "bg-white border border-sage-200 text-dark/70 hover:bg-sage-100"
                  }`}
              >
                {isHi ? "सामान्य कोष" : "General Fund"}
              </button>
            </div>
          </div>

          {/* Flagship Campaign Spotlight Card */}
          {(() => {
            const mainCampaign = events.find((e) => e.featured) || events[0];
            if (!mainCampaign) return null;
            const mainPercent = Math.min(100, Math.round((mainCampaign.raisedAmount / mainCampaign.targetAmount) * 100));

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
                    ⭐ {isHi ? "मुख्य सक्रिय अभियान" : "Main Live Campaign"}
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
                        {mainCampaign.donorCount} {isHi ? "दानदाता जुड़े" : "Donors Supporting"}
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
                        ₹{mainCampaign.raisedAmount.toLocaleString("en-IN")}{" "}
                        <span className="text-xs text-dark/60 font-normal">
                          {isHi ? "एकत्रित" : "raised"}
                        </span>
                      </span>
                      <span className="text-dark/60 font-sans">
                        {mainPercent}% of ₹{mainCampaign.targetAmount.toLocaleString("en-IN")} {isHi ? "लक्ष्य" : "goal"}
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
                      href={`/donate/${mainCampaign.slug || mainCampaign.id}`}
                      className="w-full sm:w-auto px-7 py-3.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isHi ? "अभियान का विवरण देखें" : "View Campaign"}</span>
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
              {isHi ? "सभी सक्रिय अभियान तथा विशिष्ट पहल:" : "Explore All Active Initiatives & Campaigns:"}
            </h3>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Specific Events */}
            {filteredEvents.map((evt) => {
              const percent = Math.min(100, Math.round((evt.raisedAmount / evt.targetAmount) * 100));

              return (
                <Link
                  key={evt.id}
                  href={`/donate/${evt.slug || evt.id}`}
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
                    <span className="absolute top-3 right-3 bg-dark/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                      80G Tax-Exempt
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
                          ₹{evt.raisedAmount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-dark/60">
                          {percent}% of ₹{evt.targetAmount.toLocaleString("en-IN")}
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
                        <Heart className="w-3.5 h-3.5 fill-dark" />
                        <span>{isHi ? "इस अभियान को दान दें" : "Sponsor This Goal"}</span>
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

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream/30 flex items-center justify-center font-sans">Loading donation causes...</div>}>
      <DonatePortal />
    </Suspense>
  );
}
