"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";

import { Language } from "@/types";

import {
  ArrowRight,
  Check,
  Handshake,
  Heart,
  Users,
} from "lucide-react";


export default function GetInvolvedPage() {
  const [lang, setLang] = useState<Language>("en");

  const t = translations[lang].getInvolved;

  const isHi = lang === "hi";


  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#20221F]">

      <Header
        lang={lang}
        onLanguageChange={setLang}
      />


      <main>


        {/* ============================================================
            GET INVOLVED HERO
        ============================================================ */}

        <section className="relative overflow-hidden bg-[#F5F1E8]">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            {/* Top intro */}

            <div className="pt-14 sm:pt-20 lg:pt-24">

              <div className="flex items-center gap-3">

                <span className="w-8 h-px bg-[#A85D43]" />

                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                  {t.badge}
                </span>

              </div>

            </div>


            {/* Main hero */}

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-7 pb-12">

              {/* Heading */}

              <div className="lg:col-span-8">

                <h1 className="font-serif text-[3.8rem] sm:text-6xl lg:text-[7rem] leading-[0.88] tracking-[-0.04em] font-bold text-[#20221F]">

                  {isHi ? (
                    <>
                      बदलाव में
                      <br />
                      <span className="text-[#A85D43]">
                        आपका हिस्सा।
                      </span>
                    </>
                  ) : (
                    <>
                      Be part of
                      <br />
                      <span className="text-[#A85D43]">
                        something meaningful.
                      </span>
                    </>
                  )}

                </h1>

              </div>


              {/* Description */}

              <div className="lg:col-span-4 pb-2">

                <p className="text-sm sm:text-base leading-7 text-[#20221F]/60 max-w-sm">
                  {t.subtitle}
                </p>

              </div>

            </div>


            {/* ==========================================================
                IMAGE + ACTIONS
            ========================================================== */}

            <div className="grid lg:grid-cols-12 gap-6 pb-16">


              {/* IMAGE */}

              <div className="lg:col-span-8">

                <div className="relative h-[360px] sm:h-[450px] lg:h-[500px] rounded-[2rem] overflow-hidden">

                  <Image
                    src="/images/about.jpeg"
                    alt={
                      isHi
                        ? "समुदाय के साथ स्वयंसेवक"
                        : "Volunteers working with the community"
                    }
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />


                  {/* subtle overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />


                  <div className="absolute left-6 sm:left-9 bottom-6 sm:bottom-8 max-w-md">

                    <p className="text-white font-serif text-2xl sm:text-3xl font-bold leading-tight">
                      {isHi
                        ? "हर योगदान एक कदम आगे है।"
                        : "Every contribution moves the work forward."}
                    </p>

                  </div>

                </div>

              </div>


              {/* ACTION PANEL */}

              <div className="lg:col-span-4 bg-[#E8E0D2] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A85D43]">
                    {isHi
                      ? "आप कैसे जुड़ सकते हैं"
                      : "Choose your way"}
                  </p>


                  <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#20221F]">
                    {isHi
                      ? "एक रास्ता चुनें।"
                      : "Find your way in."}
                  </h2>

                </div>


                <div className="mt-10 space-y-3">

                  <Link
                    href="/donate"
                    className="group flex items-center justify-between p-4 rounded-xl bg-[#A85D43] text-white hover:bg-[#8E4934] transition"
                  >

                    <div className="flex items-center gap-3">

                      <Heart className="w-4 h-4 fill-current" />

                      <span className="text-sm font-bold">
                        {isHi ? "सहयोग करें" : "Give"}
                      </span>

                    </div>

                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                  </Link>


                  <Link
                    href="/volunteer-campaigns"
                    className="group flex items-center justify-between p-4 rounded-xl bg-white text-[#20221F] border border-[#20221F]/10 hover:border-[#52705D]/40 transition"
                  >

                    <div className="flex items-center gap-3">

                      <Users className="w-4 h-4 text-[#52705D]" />

                      <span className="text-sm font-bold">
                        {isHi ? "स्वयंसेवा करें" : "Volunteer"}
                      </span>

                    </div>

                    <ArrowRight className="w-4 h-4 text-[#52705D] group-hover:translate-x-1 transition-transform" />

                  </Link>


                  <Link
                    href="/contact"
                    className="group flex items-center justify-between p-4 rounded-xl bg-white text-[#20221F] border border-[#20221F]/10 hover:border-[#C59B38]/50 transition"
                  >

                    <div className="flex items-center gap-3">

                      <Handshake className="w-4 h-4 text-[#C59B38]" />

                      <span className="text-sm font-bold">
                        {isHi ? "साझेदारी करें" : "Partner"}
                      </span>

                    </div>

                    <ArrowRight className="w-4 h-4 text-[#C59B38] group-hover:translate-x-1 transition-transform" />

                  </Link>

                </div>


                <div className="mt-8 pt-6 border-t border-[#20221F]/10">

                  <p className="text-xs leading-5 text-[#20221F]/50">
                    {isHi
                      ? "आपके समय, कौशल और संसाधनों के अनुसार योगदान का रास्ता चुनें।"
                      : "Choose a contribution that fits your time, skills and resources."}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ============================================================
            WAYS TO GET INVOLVED (TRANSITION & AVENUES)
        ============================================================ */}

        <section
          id="ways"
          className="py-20 sm:py-28 bg-[#F5F1E8]"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">


            {/* HEADER */}

            <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">

              <div className="lg:col-span-7">

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                  {isHi
                    ? "तीन तरीके"
                    : "Three ways to participate"}
                </span>

                <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold leading-tight">
                  {isHi
                    ? "अपने लिए उपयुक्त भूमिका चुनें।"
                    : "Find the role that feels right for you."}
                </h2>

              </div>


              <div className="lg:col-span-5">

                <p className="text-sm sm:text-base leading-7 text-[#20221F]/55">
                  {isHi
                    ? "हर व्यक्ति या संस्था अलग तरीके से योगदान दे सकती है। आपके समय, कौशल और संसाधनों के अनुसार एक रास्ता चुनें।"
                    : "People and organisations contribute in different ways. Choose a path that fits your time, skills and resources."}
                </p>

              </div>

            </div>



            {/* AVENUES */}

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

              {t.avenues.map((ave, index) => {

                const icons = [
                  Heart,
                  Users,
                  Handshake,
                ];

                const Icon = icons[index] || Heart;


                return (

                  <article
                    key={index}
                    className="group rounded-[2rem] bg-white border border-[#20221F]/10 overflow-hidden hover:shadow-[0_25px_60px_rgba(0,0,0,0.09)] transition-all duration-500 flex flex-col justify-between"
                  >

                    {/* CARD TOP */}

                    <div className="p-7 sm:p-8">

                      <div className="flex items-start justify-between gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-[#F5F1E8] border border-[#20221F]/10 flex items-center justify-center">

                          <Icon
                            className={`w-5 h-5 ${index === 0
                              ? "text-[#A85D43]"
                              : index === 1
                                ? "text-[#C59B38]"
                                : "text-[#52705D]"
                              }`}
                          />

                        </div>


                        <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#20221F]/40">
                          0{index + 1}
                        </span>

                      </div>


                      <h3 className="mt-8 font-serif text-2xl sm:text-3xl font-bold leading-tight">
                        {ave.title}
                      </h3>


                      <p className="mt-4 text-sm leading-7 text-[#20221F]/60">
                        {ave.desc}
                      </p>


                      {/* BENEFIT */}

                      <div className="mt-7 pt-6 border-t border-[#20221F]/10">

                        <div className="flex items-start gap-3">

                          <div className="w-5 h-5 rounded-full bg-[#52705D]/10 flex items-center justify-center shrink-0 mt-0.5">

                            <Check className="w-3 h-3 text-[#52705D]" />

                          </div>

                          <p className="text-xs leading-5 font-semibold text-[#20221F]/65">
                            {ave.benefit}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* CTA */}

                    <div className="px-7 sm:px-8 pb-7 sm:pb-8">

                      <Link
                        href={ave.href}
                        className="group/link flex items-center justify-between rounded-xl bg-[#20221F] text-white px-5 py-4 hover:bg-[#A85D43] transition"
                      >

                        <span className="text-xs font-bold uppercase tracking-wider">
                          {ave.cta}
                        </span>

                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />

                      </Link>

                    </div>

                  </article>

                );

              })}

            </div>

          </div>

        </section>



        {/* ============================================================
            CONTRIBUTION TYPES
        ============================================================ */}

        <section className="py-20 sm:py-24 bg-white border-t border-[#20221F]/10">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-12 items-start">

              <div className="lg:col-span-5">

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                  {isHi
                    ? "आप क्या दे सकते हैं"
                    : "What you can bring"}
                </span>


                <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-bold leading-tight">
                  {isHi
                    ? "योगदान केवल पैसे का नाम नहीं है।"
                    : "Contribution is more than money."}
                </h2>


                <p className="mt-6 max-w-md text-sm leading-7 text-[#20221F]/55">
                  {isHi
                    ? "किसी पहल में अपना समय देना, किसी टीम के साथ कौशल साझा करना या संस्थागत साझेदारी बनाना — ये सभी बदलाव में योगदान देने के तरीके हैं।"
                    : "Giving your time, sharing your skills or building an institutional partnership can all be meaningful ways to contribute."}
                </p>

              </div>


              <div className="lg:col-span-7">

                <div className="grid sm:grid-cols-2 gap-4">

                  {[
                    {
                      title: isHi ? "समय" : "Time",
                      desc: isHi
                        ? "स्वयंसेवा और समुदाय के साथ समय बिताना।"
                        : "Volunteer your time and work alongside communities.",
                    },
                    {
                      title: isHi ? "कौशल" : "Skills",
                      desc: isHi
                        ? "अपनी विशेषज्ञता किसी उद्देश्य के लिए साझा करें।"
                        : "Share your professional or practical skills.",
                    },
                    {
                      title: isHi ? "संसाधन" : "Resources",
                      desc: isHi
                        ? "जरूरतमंद पहलों के लिए आर्थिक सहयोग।"
                        : "Provide financial support where it is needed.",
                    },
                    {
                      title: isHi ? "साझेदारी" : "Partnership",
                      desc: isHi
                        ? "संस्था या व्यवसाय के रूप में दीर्घकालिक सहयोग।"
                        : "Build longer-term collaboration as an organisation or business.",
                    },
                  ].map((item, index) => (

                    <div
                      key={item.title}
                      className="bg-[#F5F1E8] rounded-2xl border border-[#20221F]/10 p-6 sm:p-7"
                    >

                      <span className="text-3xl font-serif font-bold text-[#20221F]/10">
                        0{index + 1}
                      </span>


                      <h3 className="mt-6 font-serif text-xl font-bold">
                        {item.title}
                      </h3>


                      <p className="mt-2 text-sm leading-6 text-[#20221F]/55">
                        {item.desc}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ============================================================
            PARTNERSHIP CTA
        ============================================================ */}

        <section className="py-20 sm:py-24 bg-[#20221F] text-white">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-8">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[#E4B95E]/10 border border-[#E4B95E]/20 flex items-center justify-center">

                    <Handshake className="w-5 h-5 text-[#E4B95E]" />

                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#E4B95E]">
                    {isHi
                      ? "साझेदारी"
                      : "Partnership"}
                  </span>

                </div>


                <h2 className="mt-6 max-w-3xl font-serif text-4xl sm:text-5xl font-bold leading-tight">
                  {isHi
                    ? "आपके विचार से एक नई साझेदारी शुरू हो सकती है।"
                    : "Have an idea for a partnership?"}
                </h2>


                <p className="mt-5 max-w-2xl text-sm sm:text-base leading-7 text-white/50">
                  {isHi
                    ? "हम CSR टीमों, संस्थाओं, स्वयंसेवकों और अन्य साझेदारों के साथ नए सहयोग के लिए बातचीत का स्वागत करते हैं।"
                    : "We welcome conversations with CSR teams, organisations, volunteers and other partners about creating meaningful collaboration."}
                </p>

              </div>


              <div className="lg:col-span-4 lg:text-right">

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#E4B95E] text-[#20221F] px-7 py-4 text-sm font-bold hover:bg-[#F0CB75] transition"
                >

                  {isHi
                    ? "संपर्क करें"
                    : "Start a conversation"}

                  <ArrowRight className="w-4 h-4" />

                </Link>

              </div>

            </div>

          </div>

        </section>



        {/* ============================================================
            FINAL NAVIGATION
        ============================================================ */}

        <section className="py-14 bg-white">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div>

                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#A85D43]">
                  {isHi
                    ? "अगला कदम"
                    : "Next step"}
                </p>

                <p className="mt-2 font-serif text-xl font-bold">
                  {isHi
                    ? "देखें कि आपका सहयोग कहां जा सकता है।"
                    : "See where your support can go."}
                </p>

              </div>


              <div className="flex flex-wrap gap-3">

                <Link
                  href="/our-work"
                  className="inline-flex items-center gap-2 rounded-full border border-[#20221F]/15 px-5 py-3 text-xs font-bold hover:border-[#A85D43] hover:text-[#A85D43] transition"
                >

                  {isHi
                    ? "हमारा काम"
                    : "Our Work"}

                  <ArrowRight className="w-4 h-4" />

                </Link>


                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-full bg-[#A85D43] text-white px-5 py-3 text-xs font-bold hover:bg-[#8E4934] transition"
                >

                  <Heart className="w-3.5 h-3.5 fill-current" />

                  {isHi
                    ? "दान करें"
                    : "Donate"}

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