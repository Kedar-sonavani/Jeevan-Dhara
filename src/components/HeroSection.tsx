"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";

interface HeroProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative overflow-visible pt-16 pb-24 md:pt-24 md:pb-32 border-b border-sage/20 flex flex-col justify-center min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Women operating traditional Charkha in Bikaner, Rajasthan"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
        {/* Dark over lay for text legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-dark/95 via-dark/70 to-dark/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        {/* Banner Content (Text on Left) */}
        <div className="max-w-3xl text-left space-y-7 mt-12 md:mt-0">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-cream/90 font-sans leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-5">
            <Link
              href="#donate"
              className="px-8 py-4 bg-amber text-dark font-bold text-lg rounded-xl shadow-lg hover:bg-amber-400 hover:-translate-y-1 transition duration-300 flex items-center gap-2 group"
            >
              <span>{t.donateBtn}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/our-work"
              className="px-8 py-4 border-2 border-sage-300/50 text-white hover:bg-white/10 hover:border-white font-semibold text-lg rounded-xl shadow-xs transition duration-300 backdrop-blur-sm"
            >
              {t.csrBtn}
            </Link>
          </div>
        </div>

        {/* Impact Cards */}

      </div>
    </section>
  );
};