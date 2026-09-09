"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, ShieldCheck } from "lucide-react";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang].about;
  const leaders = t.leaders || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-swap carousel every 4 seconds
  useEffect(() => {
    if (isPaused || leaders.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leaders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, leaders.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % leaders.length);
  };

  return (
    <>
      {/* 1. About Story Section */}
      <section className="bg-white border-b border-sage-200/80 overflow-hidden">
        {/* Main Full-Width Grid: Image on Left + Story Text on Right */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side: Image matching full height of container */}
          <div className="lg:col-span-5 relative min-h-87.5 lg:min-h-120">
            <Image
              src="/images/about.jpeg"
              alt="Jeevan Dhara Sansthan Rural Empowerment Project"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Side: Organization Story Text */}
          <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 lg:p-20 space-y-6 flex flex-col justify-center bg-cream/50">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-dark leading-tight mb-6">
                {t.title}
              </h2>

              <p className="text-base sm:text-lg text-dark/85 font-sans leading-relaxed mb-4">
                {t.p1}
              </p>

              <p className="text-base text-dark/75 font-sans leading-relaxed">
                {t.p2}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 2. What We Do Section (Tagline Header & Cards grouped in single sticky wrapper) */}
      <section className="bg-cream/40 border-b border-sage-200/80 relative min-h-[220vh] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Sticky Outer Container grouping Tagline + Cards */}
          <div className="sticky top-20 space-y-8">

            {/* Section Tagline / Header */}
            <div className="bg-cream/95 backdrop-blur-md py-4 px-6 rounded-2xl border border-sage-200/60 shadow-xs text-center max-w-3xl mx-auto space-y-2">
              <span className="inline-block text-xs font-bold tracking-widest text-terracotta uppercase bg-terracotta/10 px-4 py-1 rounded-full border border-terracotta/20">
                Our Key Initiatives
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-dark leading-tight">
                {lang === "en" ? "What We Do" : "हमारे प्रमुख कार्य"}
              </h3>
              <p className="text-xs sm:text-sm text-dark/75 font-sans leading-relaxed">
                {lang === "en"
                  ? "Empowering rural communities through sustainable development programs designed for long-term impact."
                  : "दीर्घकालिक प्रभाव और स्वावलंबन के लिए बनाए गए सतत विकास कार्यक्रमों के माध्यम से ग्रामीण समुदायों को सशक्त बनाना।"}
              </p>
            </div>

            {/* Stacking Cards Container inside sticky wrapper */}
            <div className="relative space-y-8">

              {/* Card 1: Women Empowerment */}
              <div className="sticky top-48 z-10 bg-white rounded-3xl border border-sage-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-90">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-xs font-bold tracking-wider text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                      {lang === "en" ? "500+ Artisans Empowered" : "500+ महिलाएं सशक्त"}
                    </span>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-dark leading-tight">
                      {lang === "en" ? "Women Empowerment & Handloom Revival" : "महिला सशक्तिकरण एवं हथकरघा पुनरुद्धार"}
                    </h4>
                    <p className="text-base sm:text-lg text-dark/80 font-sans leading-relaxed">
                      {lang === "en"
                        ? "Traditional Charkha spinning initiatives and tailoring workshops that have enabled over 500 rural women to earn sustainable monthly incomes and achieve self-reliance."
                        : "पारंपरिक चरखा कताई और सिलाई कार्यशालाएं जिन्होंने 500 से अधिक ग्रामीण महिलाओं को मासिक आय अर्जित करने और स्वावलंबन हासिल करने में सक्षम बनाया है।"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sage-100 flex items-center gap-2 text-xs font-bold text-terracotta uppercase tracking-wider">
                    <span>{lang === "en" ? "Initiative 01" : "पहल 01"}</span>
                  </div>
                </div>
                <div className="lg:col-span-5 relative min-h-62.5 lg:min-h-full bg-sage-100">
                  <Image
                    src="/images/old_lady.jpeg"
                    alt="Women Empowerment Charkha Initiative"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Card 2: Skill & Digital Training */}
              <div className="sticky top-52 z-20 bg-white rounded-3xl border border-sage-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-90">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-xs font-bold tracking-wider text-terracotta bg-terracotta/10 px-3.5 py-1.5 rounded-full border border-terracotta/20">
                      {lang === "en" ? "1,000+ Digitally Skilled" : "1,000+ डिजिटल साक्षर"}
                    </span>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-dark leading-tight">
                      {lang === "en" ? "Skill Development & Digital Literacy" : "कौशल विकास एवं डिजिटल साक्षरता"}
                    </h4>
                    <p className="text-base sm:text-lg text-dark/80 font-sans leading-relaxed">
                      {lang === "en"
                        ? "Vocational workshops, computer fundamentals, digital banking awareness, and e-governance access for youth and small rural entrepreneurs."
                        : "ग्रामीण युवाओं और छोटे उद्यमियों के लिए व्यावसायिक कार्यशालाएं, कंप्यूटर ज्ञान, डिजिटल बैंकिंग जागरूकता और ई-गवर्नेंस पहुँच।"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sage-100 flex items-center gap-2 text-xs font-bold text-terracotta uppercase tracking-wider">
                    <span>{lang === "en" ? "Initiative 02" : "पहल 02"}</span>
                  </div>
                </div>
                <div className="lg:col-span-5 relative min-h-62.5 lg:min-h-full bg-sage-100">
                  <Image
                    src="/images/old.jpeg"
                    alt="Digital & Skill Training"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Card 3: WASH & Rural Health */}
              <div className="sticky top-56 z-30 bg-white rounded-3xl border border-sage-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-90">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-xs font-bold tracking-wider text-sage-800 bg-sage-100 px-3.5 py-1.5 rounded-full border border-sage-300">
                      {lang === "en" ? "120+ Villages Reached" : "120+ गाँव आच्छादित"}
                    </span>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-dark leading-tight">
                      {lang === "en" ? "WASH & Preventive Rural Health" : "जल, स्वच्छता (WASH) एवं ग्रामीण स्वास्थ्य"}
                    </h4>
                    <p className="text-base sm:text-lg text-dark/80 font-sans leading-relaxed">
                      {lang === "en"
                        ? "Community sanitation drives, clean drinking water accessibility, hygiene education, and preventive health awareness camps across 120+ villages."
                        : "सामुदायिक स्वच्छता अभियान, स्वच्छ पेयजल उपलब्धता, स्वच्छता शिक्षा और 120+ से अधिक गांवों में निवारक स्वास्थ्य जागरूकता शिविर।"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sage-100 flex items-center gap-2 text-xs font-bold text-terracotta uppercase tracking-wider">
                    <span>{lang === "en" ? "Initiative 03" : "पहल 03"}</span>
                  </div>
                </div>
                <div className="lg:col-span-5 relative min-h-62.5 lg:min-h-full bg-sage-100">
                  <Image
                    src="/images/sticking.jpeg"
                    alt="WASH and Rural Health"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>
      {/* 2. Leaders Carousel Section (Below About) */}
      <section className="bg-cream/40 py-16 sm:py-24 border-b border-sage-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-700 uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300/60">
              <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              Leadership & Vision
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-dark">
              {t.leadersTitle}
            </h3>
            <p className="text-xs sm:text-sm text-dark/70">
              {t.leadersSubtitle}
            </p>
          </div>

          {/* 3-Card Carousel Display (Center focused, side cards faint & scaled down) */}
          {leaders.length > 0 && (
            <div
              className="relative max-w-6xl mx-auto px-4"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-4">
                {[-1, 0, 1].map((offset) => {
                  const idx = (currentIndex + offset + leaders.length) % leaders.length;
                  const isCenter = offset === 0;

                  return (
                    <div
                      key={idx + "-" + offset}
                      onClick={() => !isCenter && setCurrentIndex(idx)}
                      className={`relative rounded-3xl overflow-hidden bg-white shadow-xl border border-sage-200/80 transition-all duration-500 transform cursor-pointer ${isCenter
                        ? "scale-105 z-20 opacity-100 shadow-2xl ring-2 ring-amber/50"
                        : "hidden md:block scale-90 z-10 opacity-40 blur-[1px] hover:opacity-60 hover:blur-none"
                        }`}
                    >
                      {/* Vertical Full-Size Photo */}
                      <div className="relative w-full h-105 sm:h-115 bg-sage-100 overflow-hidden">
                        <Image
                          src={leaders[idx].image || "/images/about.jpeg"}
                          alt={leaders[idx].name}
                          fill
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover object-top transition-all duration-700"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-dark/95 via-dark/40 to-transparent" />

                        {/* Top Tag Badge */}
                        <span className="absolute top-4 left-4 bg-amber text-dark font-bold text-xs px-3 py-1 rounded-full shadow-md z-10">
                          {leaders[idx].tag}
                        </span>

                        {/* Text Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 space-y-3">
                          <p className="text-xs sm:text-sm text-cream/90 font-sans italic leading-relaxed line-clamp-3">
                            “{leaders[idx].bio}”
                          </p>

                          <div className="pt-3 border-t border-white/20">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                              {leaders[idx].role}
                            </p>
                            <h4 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                              {leaders[idx].name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows & Dot Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-sage-300 bg-white text-dark hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-200 shadow-md"
                  aria-label="Previous Leader"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {leaders.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to leader ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                        ? "w-8 bg-terracotta"
                        : "w-2.5 bg-sage-300 hover:bg-sage-400"
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-sage-300 bg-white text-dark hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-200 shadow-md"
                  aria-label="Next Leader"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. Photo Collage & Donation CTA Section (Below Leaders) */}
      <section className="bg-white py-16 sm:py-24 border-b border-sage-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-xs font-bold tracking-widest text-terracotta uppercase bg-terracotta/10 px-4 py-1.5 rounded-full border border-terracotta/20">
              Grassroots Impact Gallery
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-dark">
              {lang === "en" ? "Transforming Lives Across Rajasthan" : "राजस्थान भर में जीवन का रूपांतरण"}
            </h3>
            <p className="text-xs sm:text-sm text-dark/70">
              {lang === "en"
                ? "Every donation directly fuels women's self-reliance, clean water access, and skill training programs."
                : "प्रत्येक अनुदान सीधे महिला स्वावलंबन, स्वच्छ जल पहुँच और कौशल प्रशिक्षण कार्यक्रमों को गति देता है।"}
            </p>
          </div>

          {/* Photo Collage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

            {/* Collage Item 1: Large Featured Photo */}
            <div className="md:col-span-5 relative min-h-85 rounded-3xl overflow-hidden shadow-xl border border-sage-200 group">
              <Image
                src="/images/old_lady.jpeg"
                alt="Rural Women Empowerment Charkha Initiative"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-amber text-dark text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {lang === "en" ? "Handloom Initiative" : "हथकरघा पहल"}
                </span>
                <h4 className="text-xl font-serif font-bold mt-2">
                  {lang === "en" ? "Charkha Spinning & Weaving" : "चरखा कताई एवं बुनाई"}
                </h4>
              </div>
            </div>

            {/* Collage Item 2: DONATION CTA Card with embedded button */}
            <div className="md:col-span-4 relative min-h-85 rounded-3xl overflow-hidden shadow-2xl border border-terracotta/30 group bg-linear-to-br from-terracotta via-terracotta-700 to-dark text-white p-8 flex flex-col justify-between">
              {/* Background image underlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <Image
                  src="/images/hero-charkha.jpeg"
                  alt="Donation Impact background"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-amber text-dark px-3 py-1 rounded-full shadow-xs">
                  {lang === "en" ? "Make a Difference Today" : "आज ही बदलाव लाएं"}
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-cream leading-tight">
                  {lang === "en" ? "Support Rural Families in Need" : "ज़रूरतमंद ग्रामीण परिवारों का सहयोग करें"}
                </h4>
                <p className="text-xs sm:text-sm text-cream/90 font-sans leading-relaxed">
                  {lang === "en"
                    ? "Your support provides charkhas, clean drinking water units, and digital tools to rural artisans."
                    : "आपका सहयोग ग्रामीण कारीगरों को चरखे, स्वच्छ पेयजल इकाइयाँ और डिजिटल साधन प्रदान करता है।"}
                </p>
              </div>

              {/* Embedded Donation Button */}
              <div className="relative z-10 pt-6 border-t border-white/20">
                <a
                  href="#donate"
                  className="w-full py-3.5 px-6 bg-amber hover:bg-amber-400 text-dark font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-95 group/btn"
                >
                  <span>{lang === "en" ? "Donate Now" : "अभी दान करें"}</span>
                  <div className="w-7 h-7 rounded-full bg-dark text-amber flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                    <Heart className="w-4 h-4 fill-amber" />
                  </div>
                </a>
              </div>
            </div>

            {/* Collage Item 3: Secondary Photo Cards Stacked */}
            <div className="md:col-span-3 flex flex-col gap-6">

              <div className="relative h-40 sm:h-44 rounded-3xl overflow-hidden shadow-lg border border-sage-200 group">
                <Image
                  src="/images/old.jpeg"
                  alt="Skill Development Class"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow-sm">
                  {lang === "en" ? "Digital Training Workshops" : "डिजिटल प्रशिक्षण कार्यशालाएँ"}
                </span>
              </div>

              <div className="relative h-40 sm:h-44 rounded-3xl overflow-hidden shadow-lg border border-sage-200 group">
                <Image
                  src="/images/sticking.jpeg"
                  alt="WASH Hygiene Campaign"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow-sm">
                  {lang === "en" ? "WASH & Hygiene Drives" : "जल एवं स्वच्छता अभियान"}
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CSR & Corporate Partnerships Section (Clean & Encouraging Layout) */}
      <section className="bg-linear-to-b from-cream/40 via-white to-cream/30 py-16 sm:py-20 border-b border-sage-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

          {/* Tagline Badge */}
          <span className="inline-block text-xs font-bold tracking-widest text-terracotta uppercase bg-terracotta/10 px-4 py-1.5 rounded-full border border-terracotta/20">
            Corporate Social Responsibility (CSR)
          </span>

          {/* Inspiring Headline & Tagline */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-dark leading-tight">
              {lang === "en"
                ? "Multiply Your Impact Through Certified CSR Partnerships"
                : "प्रमाणित सीएसआर साझेदारी के माध्यम से अपने सामाजिक प्रभाव को बढ़ाएं"}
            </h3>

          </div>



          {/* Action CTA Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-terracotta hover:bg-terracotta-700 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <span>{lang === "en" ? "Partner With Us for CSR" : "सीएसआर साझेदारी हेतु संपर्क करें"}</span>
              <span className="text-lg">→</span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
};
