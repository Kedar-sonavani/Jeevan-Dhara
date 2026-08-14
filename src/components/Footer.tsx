"use client";

import React from "react";
import Link from "next/link";
import { Heart, MapPin, Phone, Mail, ShieldCheck, ExternalLink, ArrowUpRight } from "lucide-react";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isHi = lang === "hi";

  return (
    <footer className="bg-dark text-cream border-t border-sage-900 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Col 1: Organization Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-white font-serif text-xl font-bold shadow-md">
                JD
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-tight block leading-none">
                  Jeevan Dhara
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 block mt-1">
                  Sansthan, Bikaner
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans max-w-md">
              {isHi
                ? "2012 से बीकानेर एवं उत्तरी राजस्थान में महिला सशक्तिकरण, चरखा कताई, स्वच्छता (WASH) और सतत ग्रामीण आजीविका हेतु समर्पित पंजीकृत गैर-लाभकारी संगठन।"
                : "A registered non-profit organization dedicated to empowering rural women, charkha spinning, WASH hygiene, and sustainable livelihoods across Rajasthan since 2012."}
            </p>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              {isHi ? "त्वरित लिंक" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-cream/80">
              <li>
                <Link href="/" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>{isHi ? "मुख्य पृष्ठ" : "Home"}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>{isHi ? "संस्थान परिचय एवं नेतृत्व" : "About Us & Leadership"}</span>
                  <span className="bg-terracotta/40 text-amber-200 text-[10px] px-1.5 py-0.5 rounded font-mono">New</span>
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>{isHi ? "हमारे कार्य एवं पहल" : "Our Initiatives"}</span>
                </Link>
              </li>
              <li>
                <Link href="/where-we-work" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>{isHi ? "कार्य क्षेत्र (बीकानेर व राजस्थान)" : "Where We Work"}</span>
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>{isHi ? "स्वयंसेवक बनें" : "Get Involved / Volunteer"}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>{isHi ? "संपर्क करें" : "Contact & CSR Proposals"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Registered Office Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              {isHi ? "पंजीकृत कार्यालय" : "Registered Office"}
            </h4>

            <div className="space-y-3 text-xs text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <span>
                  {isHi
                    ? "ग्राम कोलासर, तहसील श्रीडूंगरगढ़, जिला बीकानेर, राजस्थान — 334001"
                    : "Village Kolasar, Tehsil Sridungargarh, District Bikaner, Rajasthan — 334001"}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber shrink-0" />
                <span>+91 94144 86377 / +91 98291 12345</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber shrink-0" />
                <span>contact@jeevandhara.org</span>
              </div>
            </div>

            {/* Quick Donate CTA in Footer */}
            <div className="pt-2">
              <a
                href="#donate"
                className="w-full py-2.5 px-4 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 fill-dark" />
                <span>{isHi ? "दान करें" : "Donate Now"}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-cream/60">
          <p>
            © 2026 Jeevan Dhara Sansthan. {isHi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <Link href="/contact" className="hover:text-amber transition-colors">
              {isHi ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
