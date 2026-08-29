"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";

import { Language } from "@/types";

import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";


export default function OurWorkPage() {
  const [lang, setLang] = useState<Language>("en");

  const t = translations[lang].ourWork;

  const isHi = lang === "hi";


  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#20221F]">

      <Header
        lang={lang}
        onLanguageChange={setLang}
      />


      <main>


        {/* ============================================================
            HERO
        ============================================================ */}

        <section className="relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-12 pb-20 lg:pt-16 lg:pb-28">


              {/* LEFT */}

              <div className="lg:col-span-6 relative z-10">

                <div className="flex items-center gap-3 mb-7">

                  <span className="w-9 h-px bg-[#A85D43]" />

                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                    {t.badge}
                  </span>

                </div>


                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] leading-[0.96] font-bold tracking-tight">

                  {isHi ? (
                    <>
                      काम जो
                      <br />
                      <span className="text-[#A85D43]">
                        बदलाव लाता है।
                      </span>
                    </>
                  ) : (
                    <>
                      Work that
                      <br />
                      creates
                      <br />
                      <span className="text-[#A85D43]">
                        lasting change.
                      </span>
                    </>
                  )}

                </h1>


                <p className="mt-8 max-w-xl text-base sm:text-lg leading-8 text-[#20221F]/60">

                  {t.subtitle}

                </p>


                <div className="mt-9 flex flex-wrap items-center gap-4">

                  <a
                    href="#programmes"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#20221F] text-white text-sm font-semibold hover:bg-[#A85D43] transition"
                  >

                    {isHi
                      ? "हमारा काम देखें"
                      : "Explore Our Work"}

                    <ArrowDown className="w-4 h-4" />

                  </a>


                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#20221F]/15 text-sm font-semibold hover:border-[#A85D43] hover:text-[#A85D43] transition"
                  >

                    {isHi
                      ? "सहयोग करें"
                      : "Support Our Work"}

                    <ArrowRight className="w-4 h-4" />

                  </Link>

                </div>


                {/* Small intro metadata */}

                <div className="mt-12 pt-7 border-t border-[#20221F]/10 grid grid-cols-2 gap-6 max-w-lg">

                  <div>

                    <p className="font-serif text-2xl font-bold">
                      04
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider font-bold text-[#20221F]/40">
                      {isHi
                        ? "मुख्य कार्यक्रम"
                        : "Core programmes"}
                    </p>

                  </div>


                  <div>

                    <p className="font-serif text-2xl font-bold">
                      01
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider font-bold text-[#20221F]/40">
                      {isHi
                        ? "साझा उद्देश्य"
                        : "Shared purpose"}
                    </p>

                  </div>

                </div>

              </div>


              {/* RIGHT IMAGE */}

              <div className="lg:col-span-6">

                <div className="relative h-[480px] sm:h-[560px] rounded-[2rem] overflow-hidden">

                  <Image
                    src={
                      t.programmes[0]?.image ||
                      "/images/community.jpg"
                    }
                    alt={
                      t.programmes[0]?.title ||
                      "Community programme"
                    }
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />


                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />


                  {/* Image caption */}

                  <div className="absolute left-6 right-6 bottom-6">

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 font-bold">
                        {isHi
                          ? "हमारी प्राथमिकता"
                          : "Our approach"}
                      </p>

                      <p className="mt-2 text-xl sm:text-2xl text-white font-serif font-bold max-w-sm">
                        {isHi
                          ? "स्थानीय जरूरतों से शुरू होकर स्थानीय क्षमता तक।"
                          : "Starting with local needs and building local capacity."}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ============================================================
            PROGRAMME INTRO
        ============================================================ */}

        <section
          id="programmes"
          className="py-20 sm:py-24 bg-white border-y border-[#20221F]/10 scroll-mt-10"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">

              <div className="lg:col-span-7">

                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#A85D43]">
                  {isHi
                    ? "हम क्या करते हैं"
                    : "What we do"}
                </span>


                <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02]">

                  {isHi
                    ? "चार क्षेत्रों में काम। एक साझा उद्देश्य।"
                    : "Four areas of work. One shared purpose."}

                </h2>

              </div>


              <div className="lg:col-span-5">

                <p className="text-sm sm:text-base leading-7 text-[#20221F]/55">

                  {isHi
                    ? "हमारे कार्यक्रम स्थानीय समुदायों की जरूरतों के आधार पर डिजाइन किए जाते हैं और दीर्घकालिक क्षमता निर्माण पर केंद्रित रहते हैं।"
                    : "Our programmes respond to local needs while focusing on practical, long-term community capacity."}

                </p>

              </div>

            </div>



            {/* ========================================================
                PROGRAMME GRID
            ======================================================== */}

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

              {t.programmes.map((prog, index) => {

                const donationEvent =
                  prog.id === "skills"
                    ? "charkha-revival"
                    : prog.id === "wash"
                      ? "desert-rainwater-tanka"
                      : prog.id === "nutrition"
                        ? "maternal-poshan-kits"
                        : "youth-digital-center";


                return (

                  <article
                    key={prog.id}
                    id={prog.id}
                    className="group bg-[#F5F1E8] rounded-[2rem] overflow-hidden border border-[#20221F]/10 hover:shadow-[0_25px_70px_rgba(0,0,0,0.10)] transition-all duration-500"
                  >

                    {/* IMAGE */}

                    <div className="relative h-[300px] sm:h-[360px] overflow-hidden">

                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />


                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />


                      {/* PROGRAMME NUMBER */}

                      <div className="absolute top-5 left-5">

                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-[#20221F] text-xs font-bold">
                          0{index + 1}
                        </span>

                      </div>


                      {/* TAG */}

                      <div className="absolute top-5 right-5">

                        <span className="px-3 py-1.5 rounded-full bg-[#E4B95E] text-[#20221F] text-[10px] font-bold uppercase tracking-wider">
                          {prog.tag}
                        </span>

                      </div>


                      {/* BOTTOM IMAGE CONTENT */}

                      <div className="absolute left-6 right-6 bottom-6">

                        <p className="text-[10px] text-white/60 uppercase tracking-[0.18em] font-bold">
                          Programme 0{index + 1}
                        </p>

                        <h3 className="mt-2 text-2xl sm:text-3xl text-white font-serif font-bold leading-tight">
                          {prog.title}
                        </h3>

                      </div>

                    </div>



                    {/* CONTENT */}

                    <div className="p-6 sm:p-8">

                      <p className="text-sm sm:text-base text-[#20221F]/65 leading-7">
                        {prog.description}
                      </p>


                      {/* POINTS */}

                      <div className="mt-7 pt-6 border-t border-[#20221F]/10">

                        <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#20221F]/35 mb-4">
                          {isHi
                            ? "मुख्य क्षेत्र"
                            : "Programme focus"}
                        </p>


                        <div className="space-y-3">

                          {prog.points.slice(0, 3).map((point, i) => (

                            <div
                              key={i}
                              className="flex items-start gap-3"
                            >

                              <div className="w-5 h-5 rounded-full bg-[#52705D]/10 flex items-center justify-center shrink-0 mt-0.5">

                                <Check className="w-3 h-3 text-[#52705D]" />

                              </div>

                              <span className="text-sm text-[#20221F]/70 leading-5">
                                {point}
                              </span>

                            </div>

                          ))}

                        </div>

                      </div>


                      {/* IMPACT + CTA */}

                      <div className="mt-8 pt-6 border-t border-[#20221F]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">

                        <div>

                          <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#20221F]/35">
                            {isHi
                              ? "मुख्य परिणाम"
                              : "Key outcome"}
                          </p>

                          <p className="mt-1 text-sm font-serif font-bold">
                            {prog.stat}
                          </p>

                        </div>


                        <Link
                          href={`/donate?event=${donationEvent}`}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#A85D43] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8E4934] transition shrink-0"
                        >

                          <Heart className="w-3.5 h-3.5 fill-current" />

                          {isHi
                            ? "सहयोग करें"
                            : "Support"}

                        </Link>

                      </div>

                    </div>

                  </article>

                );

              })}

            </div>

          </div>

        </section>



        {/* ============================================================
            HOW WE WORK
        ============================================================ */}

        <section className="py-24 bg-[#F5F1E8]">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-12 items-start">

              <div className="lg:col-span-5 lg:sticky lg:top-28">

                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#A85D43]">
                  {isHi
                    ? "हमारा तरीका"
                    : "Our approach"}
                </span>


                <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-bold leading-tight">

                  {isHi
                    ? "कार्यक्रम से ज्यादा, एक प्रक्रिया।"
                    : "More than programmes. A process."}

                </h2>


                <p className="mt-6 text-sm leading-7 text-[#20221F]/55 max-w-md">

                  {isHi
                    ? "स्थानीय समुदायों के साथ काम करते समय हम जरूरत, भागीदारी, कार्यान्वयन और निरंतर सीखने को एक साथ रखते हैं।"
                    : "When working with communities, we bring needs assessment, participation, implementation and continuous learning together."}

                </p>

              </div>


              <div className="lg:col-span-7">

                <div className="space-y-0">

                  {[
                    {
                      n: "01",
                      title: isHi
                        ? "सुनना"
                        : "Listen",
                      text: isHi
                        ? "स्थानीय समुदायों और साझेदारों से वास्तविक जरूरतों को समझना।"
                        : "Understand local needs through communities and partners.",
                    },

                    {
                      n: "02",
                      title: isHi
                        ? "डिजाइन करना"
                        : "Design",
                      text: isHi
                        ? "स्थानीय संदर्भ के अनुसार व्यावहारिक कार्यक्रम तैयार करना।"
                        : "Build practical interventions around the local context.",
                    },

                    {
                      n: "03",
                      title: isHi
                        ? "कार्यान्वित करना"
                        : "Implement",
                      text: isHi
                        ? "स्थानीय भागीदारी और साझेदारी के साथ कार्यक्रम लागू करना।"
                        : "Deliver programmes through local participation and partnerships.",
                    },

                    {
                      n: "04",
                      title: isHi
                        ? "सीखना"
                        : "Learn",
                      text: isHi
                        ? "परिणामों और समुदाय की प्रतिक्रिया से लगातार सुधार करना।"
                        : "Use outcomes and community feedback to improve the work.",
                    },
                  ].map((item) => (

                    <div
                      key={item.n}
                      className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-5 py-7 border-b border-[#20221F]/10 first:border-t"
                    >

                      <span className="font-serif text-3xl font-bold text-[#20221F]/15">
                        {item.n}
                      </span>


                      <div>

                        <h3 className="font-serif text-2xl font-bold">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#20221F]/55 max-w-xl">
                          {item.text}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ============================================================
            CSR SECTION
        ============================================================ */}

        <section className="bg-[#20221F] text-white py-20 sm:py-24">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-8">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[#E4B95E]/10 border border-[#E4B95E]/20 flex items-center justify-center">

                    <Building2 className="w-5 h-5 text-[#E4B95E]" />

                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#E4B95E]">
                    CSR Partnerships
                  </span>

                </div>


                <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-bold leading-tight max-w-3xl">

                  {t.impactBanner.title}

                </h2>


                <p className="mt-5 max-w-2xl text-sm sm:text-base leading-7 text-white/50">

                  {t.impactBanner.desc}

                </p>

              </div>


              <div className="lg:col-span-4 lg:text-right">

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#E4B95E] text-[#20221F] text-sm font-bold hover:bg-[#F0CB75] transition"
                >

                  {t.impactBanner.cta}

                  <ArrowRight className="w-4 h-4" />

                </Link>


                <p className="mt-4 text-[10px] uppercase tracking-wider text-white/30">
                  {isHi
                    ? "CSR • संस्थागत साझेदारी • सहयोग"
                    : "CSR • Institutional partnerships • Collaboration"}
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ============================================================
            FINAL NAVIGATION
        ============================================================ */}

        <section className="py-16 bg-white">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

              <div>

                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#A85D43]">
                  {isHi
                    ? "अगला कदम"
                    : "Next step"}
                </p>

                <h3 className="mt-2 font-serif text-2xl font-bold">
                  {isHi
                    ? "हमारे काम से आगे जुड़ें।"
                    : "Find your way to support the work."}
                </h3>

              </div>


              <div className="flex flex-wrap gap-3">

                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#20221F]/15 text-xs font-bold hover:border-[#A85D43] hover:text-[#A85D43] transition"
                >

                  {isHi
                    ? "प्रभाव देखें"
                    : "See Our Impact"}

                  <ArrowRight className="w-4 h-4" />

                </Link>


                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#20221F] text-white text-xs font-bold hover:bg-[#A85D43] transition"
                >

                  {isHi
                    ? "दान करें"
                    : "Donate"}

                  <Heart className="w-3.5 h-3.5 fill-current" />

                </Link>

              </div>

            </div>

          </div>

        </section>


      </main>


      <Footer lang={lang} />

    </div>
  );
}