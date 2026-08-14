"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";
import { Heart, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang].about;
  const leaders = t.leaders || [];

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      {/* Header */}
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="bg-linear-to-r from-dark via-dark/95 to-terracotta/90 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-amber/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-300/30">
              <Heart className="w-3.5 h-3.5 fill-amber-300" />
              Leadership & Vision
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              {t.leadersTitle}
            </h1>
            <p className="text-base sm:text-lg text-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              {t.leadersSubtitle}
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />
        </section>

        {/* Vertical Cards Grid — Faces Behind the NGO */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-sage-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Vertical Card Image Container */}
                <div className="relative h-80 w-full overflow-hidden bg-sage-100">
                  <Image
                    src="/images/hero-charkha.jpeg"
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-transparent to-transparent" />
                  
                  {/* Tag badge */}
                  <span className="absolute top-4 left-4 bg-amber text-dark font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md">
                    {leader.tag}
                  </span>

                  {/* Leader Name overlay on image bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl font-serif font-bold leading-snug drop-shadow-sm">
                      {leader.name}
                    </h2>
                    <p className="text-xs font-medium text-amber-200">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Vertical Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-sm text-dark/80 font-sans leading-relaxed italic">
                    “{leader.bio}”
                  </p>

                  <div className="pt-4 border-t border-sage-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-terracotta flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> 
                      Jeevan Dhara Leadership
                    </span>

                    <Link
                      href="/contact"
                      className="w-9 h-9 rounded-full bg-sage-100 hover:bg-terracotta hover:text-white flex items-center justify-center text-dark transition-colors duration-200"
                      title="Contact Leader"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Back CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-sm text-dark hover:text-terracotta transition-colors border-b-2 border-dark hover:border-terracotta pb-1"
            >
              ← Back to Main Page
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-cream/80 py-8 text-center text-xs border-t border-sage-900">
        <p>© 2026 Jeevan Dhara Sansthan. Registered NGO in Kolasar, Bikaner, Rajasthan.</p>
        <p className="mt-1 text-cream/50">12AA Certified & 80G(5) Tax Exemption Eligible</p>
      </footer>
    </div>
  );
}
