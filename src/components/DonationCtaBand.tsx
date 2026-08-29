"use client";

import React from "react";
import Link from "next/link";
import { Language } from "@/types";
import { Heart, ArrowRight, ShieldCheck } from "lucide-react";

interface DonationCtaBandProps {
  lang: Language;
}

export const DonationCtaBand: React.FC<DonationCtaBandProps> = ({ lang }) => {
  const isHi = lang === "hi";

  return (
    <section className="bg-linear-to-r from-terracotta via-terracotta-600 to-terracotta-700 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-terracotta-800 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-amber/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-300/30">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>12AA & 80G(5) Registered • 50% Tax Exemption</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          {isHi
            ? "₹500 का सहयोग, एक ग्रामीण महिला का स्वावलंबन"
            : "A Contribution of ₹500 Can Equip a Woman with Self-Reliance"}
        </h2>

        <p className="text-base sm:text-lg text-cream/90 font-sans max-w-3xl mx-auto leading-relaxed">
          {isHi
            ? "पारंपरिक चरखे से सूत कातने से लेकर स्कूलों में स्वच्छ पेयजल तक—आपका प्रत्येक दान सीधे राजस्थान के 120+ गांवों में वास्तविक परिवर्तन लाता है।"
            : "From traditional charkha spinning kits to school drinking water tanks—every rupee is directly deployed toward on-ground rural transformation across 120+ villages."}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/donate"
            className="px-8 py-4 bg-amber hover:bg-amber-400 text-dark font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl transition flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-dark" />
            <span>{isHi ? "अभी सहयोग राशि दान करें" : "Donate to Active Causes"}</span>
          </Link>
          <Link
            href="/our-work"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm uppercase tracking-wider rounded-xl transition backdrop-blur-xs"
          >
            <span>{isHi ? "हमारे कार्य देखें" : "Explore Programmes"}</span>
          </Link>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber/20 rounded-full blur-3xl" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-dark/30 rounded-full blur-3xl" />
    </section>
  );
};
