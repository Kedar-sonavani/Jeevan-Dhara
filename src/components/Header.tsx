"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange }) => {
  const t = translations[lang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-sage-200/60 shadow-2xs">

      {/* Top Banner above Main Navigation with Quote & Quick Donate CTA */}
      <div className="bg-terracotta text-cream py-2 px-4 text-xs border-b border-terracotta-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">

          {/* Quote & Tax Note */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-serif italic font-medium text-amber-200">
              {t.topQuote}
            </span>
            <span className="hidden md:inline-block text-cream/40">•</span>
            <span className="hidden md:inline-flex items-center gap-1 bg-amber-400/20 text-amber-200 text-[11px] px-2 py-0.5 rounded border border-amber-300/30">
              ✓ {t.topTaxNote}
            </span>
          </div>

          {/* Quick Donate Link in Top Banner */}
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="bg-amber hover:bg-amber-400 text-dark font-bold px-3 py-1 rounded-md text-xs shadow-xs transition active:scale-95 flex items-center gap-1.5"
            >
              <span>{t.donateNow}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo & NGO Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-terracotta/20 shadow-md group-hover:scale-105 transition-transform bg-white shrink-0">
              <Image
                src="/images/Logo.jpeg"
                alt="Jeevan Dhara Sansthan Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-serif font-bold text-xl text-terracotta tracking-tight block leading-none">
                Jeevan Dhara
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-sage-800 block mt-1">
                Sansthan, Bikaner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-dark/85">
            <Link href="/" className="hover:text-terracotta transition-colors">{t.home}</Link>
            <Link href="/about" className="hover:text-terracotta transition-colors">{t.about}</Link>
            <Link href="/our-work" className="hover:text-terracotta transition-colors">{t.ourWork}</Link>
            <Link href="/where-we-work" className="hover:text-terracotta transition-colors">{t.whereWeWork}</Link>
            <Link href="/get-involved" className="hover:text-terracotta transition-colors">{t.getInvolved}</Link>
            <Link href="/csr" className="hover:text-terracotta transition-colors">CSR</Link>
            <Link href="/transparency" className="hover:text-terracotta transition-colors">{t.transparency}</Link>
            <Link href="/contact" className="hover:text-terracotta transition-colors">{t.contact}</Link>
          </nav>

          {/* Controls: Language Switcher & Donate CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-sage-100 p-1 rounded-lg border border-sage-300/60 text-xs font-bold">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => onLanguageChange("en")}
                className={`px-3 py-1.5 rounded-md transition-all ${lang === "en"
                    ? "bg-terracotta text-white shadow-xs"
                    : "text-dark/70 hover:text-dark"
                  }`}
              >
                English
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => onLanguageChange("hi")}
                className={`px-3 py-1.5 rounded-md transition-all ${lang === "hi"
                    ? "bg-terracotta text-white shadow-xs"
                    : "text-dark/70 hover:text-dark"
                  }`}
              >
                हिंदी
              </button>
            </div>

            <Link
              href="/donate"
              className="px-5 py-2.5 bg-amber text-dark font-semibold text-sm rounded-xl shadow-xs hover:bg-amber-600 transition"
            >
              {t.donateNow}
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Language Switcher Pill for Mobile */}
            <div className="flex items-center bg-sage-100 p-0.5 rounded-lg border border-sage-300/60 text-[11px] font-bold">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => onLanguageChange("en")}
                className={`px-2 py-1 rounded ${lang === "en" ? "bg-terracotta text-white" : "text-dark/70"
                  }`}
              >
                EN
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => onLanguageChange("hi")}
                className={`px-2 py-1 rounded ${lang === "hi" ? "bg-terracotta text-white" : "text-dark/70"
                  }`}
              >
                हिं
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-dark hover:bg-sage-100 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-sage-200 space-y-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.home}</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.about}</Link>
            <Link href="/our-work" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.ourWork}</Link>
            <Link href="/where-we-work" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.whereWeWork}</Link>
            <Link href="/get-involved" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.getInvolved}</Link>
            <Link href="/csr" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">CSR Partnerships</Link>
            <Link href="/transparency" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.transparency}</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-dark hover:bg-sage-100 rounded-lg">{t.contact}</Link>
            <div className="pt-2">
              <Link href="/donate" className="block w-full text-center py-3 bg-amber text-dark font-bold rounded-xl shadow-sm">
                {t.donateNow}
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
