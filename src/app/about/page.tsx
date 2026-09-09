"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";
import { Heart, ArrowUpRight, ShieldCheck, Calendar, Star, Compass } from "lucide-react";

export default function AboutPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang].about;
  const leaders = t.leaders || [];
  const timelineEvents = t.timelineEvents || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#20221F]">
      {/* Header Navigation */}
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="pt-16 sm:pt-24 lg:pt-32 pb-10 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#A85D43]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
              {t.badge}
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]">
            {t.title}
          </h1>
        </section>

        {/* 1. Origin & Genesis Story Section */}
        <section className="px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto mb-24">
          <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden border border-[#20221F]/10 shadow-sm">
            <Image
              src="/images/hero-charkha.jpeg"
              alt="Rural women spinning Charkha in Bikaner, Rajasthan"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-16 sm:mt-20">
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#20221F]">
                {t.storyTitle}
              </h2>
              <div className="mt-6 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A85D43]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#A85D43]">
                  Est. August 2012
                </span>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg sm:text-xl text-[#20221F]/80 font-sans leading-relaxed">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>
          </div>
        </section>

        {/* 2. Operational Philosophy Section */}
        <section className="bg-[#E8E0D2] py-12 sm:py-16 px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="w-5 h-5 mx-auto mb-4 text-[#A85D43]" />
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-[#20221F] mb-4">
              “{t.methodologyDesc}”
            </h2>
            <p className="font-bold uppercase tracking-[0.2em] text-[11px] text-[#A85D43]">
              {t.methodologyTitle}
            </p>
          </div>
        </section>

        {/* 3. Journey Timeline Section */}
        <section className="py-24 sm:py-32 max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#20221F]">
              {t.timelineTitle}
            </h2>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-[#20221F]/15 ml-4 md:ml-32 space-y-16">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Milestone Year Dot */}
                <span className="absolute -left-[5px] top-2 flex w-[9px] h-[9px] rounded-full bg-[#A85D43] group-hover:scale-150 transition-transform duration-300" />

                {/* Year Label */}
                <span className="absolute -left-20 md:-left-32 top-0 hidden md:block text-right font-serif text-2xl font-bold text-[#20221F]/30 transition-colors duration-300 group-hover:text-[#A85D43]">
                  {evt.year}
                </span>

                {/* Event Text */}
                <div>
                  <span className="inline-block md:hidden font-serif font-bold text-lg text-[#A85D43] mb-2">
                    {evt.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#20221F] mb-3">
                    {evt.title}
                  </h3>
                  <p className="text-base text-[#20221F]/70 font-sans leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Leadership Section */}
        <section className="py-24 sm:py-32 border-t border-[#20221F]/10 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#20221F] mb-5">
                {t.leadersTitle}
              </h2>
              <p className="text-lg text-[#20221F]/60 font-sans leading-relaxed">
                {t.leadersSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {leaders.map((leader, index) => (
                <div key={index} className="group">
                  {/* Image wrapper */}
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl bg-[#E8E0D2] mb-6">
                    <Image
                      src={leader.image || "/images/about.jpeg"}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Tag badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[#20221F] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        {leader.tag}
                      </span>
                    </div>
                  </div>

                  {/* Leader details */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#20221F]">
                        {leader.name}
                      </h3>
                      <p className="text-[#A85D43] font-bold text-xs uppercase tracking-widest mt-2">
                        {leader.role}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="w-10 h-10 rounded-full border border-[#20221F]/10 hover:border-[#A85D43] hover:bg-[#A85D43] hover:text-white flex items-center justify-center text-[#20221F] transition-all duration-300"
                      title="Contact Leader"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <p className="text-[15px] text-[#20221F]/70 font-sans leading-relaxed italic border-l-2 border-[#A85D43]/30 pl-4">
                    “{leader.bio}”
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Back CTA */}
            <div className="mt-24 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-sm text-[#20221F] hover:text-[#A85D43] transition-colors border-b-2 border-transparent hover:border-[#A85D43] pb-1"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <Footer lang={lang} />
    </div>
  );
}
