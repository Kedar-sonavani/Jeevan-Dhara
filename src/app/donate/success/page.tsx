"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language } from "@/types";
import {
  CheckCircle2,
  Heart,
  ShieldCheck,
  Download,
  Share2,
  ArrowRight,
  MessageCircle,
  Home,
} from "lucide-react";

function SuccessContent() {
  const [lang, setLang] = useState<Language>("en");
  const isHi = lang === "hi";
  const searchParams = useSearchParams();

  const receipt = searchParams.get("receipt") || "JDS-2026-CONFIRMED";
  const amount = searchParams.get("amount") || "2,500";
  const event = searchParams.get("event") || "General Rural Development Fund";

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `I just supported Jeevan Dhara Sansthan for "${event}". 100% transparent and 50% tax exempt under 80G. Join me: https://jeevandhara.org/donate`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white max-w-2xl w-full rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-2xl space-y-8 text-center my-6">
          
          {/* Animated Heart Icon */}
          <div className="w-20 h-20 bg-amber/20 text-terracotta rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-10 h-10 fill-terracotta animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3.5 py-1 rounded-full border border-green-200">
              <CheckCircle2 className="w-4 h-4" />
              {isHi ? "दान सफल एवं अधिकृत" : "Contribution Verified & Acknowledged"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-dark">
              {isHi ? "जीवन धारा संस्थान की ओर से हार्दिक आभार!" : "Thank You for Your Generous Support!"}
            </h1>
            <p className="text-sm text-dark/75 font-sans max-w-md mx-auto">
              {isHi
                ? "आपका सहयोग सीधे राजस्थान के ग्रामीण समुदायों में आजीविका एवं आत्मनिर्भरता का निर्माण कर रहा है।"
                : "Your contribution directly funds grassroots skills, water restoration, and livelihood tools in Rajasthan."}
            </p>
          </div>

          {/* 80G Receipt Summary Card */}
          <div className="bg-cream/60 p-6 rounded-2xl border border-sage-200 text-left space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-sage-200/80 pb-3">
              <span className="text-dark/60 font-semibold uppercase tracking-wider">
                Official 80G Receipt No.
              </span>
              <span className="font-mono font-bold text-sm text-terracotta bg-white px-2.5 py-0.5 rounded border border-sage-200">
                {receipt}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-dark/70">Amount Contributed</span>
              <span className="font-serif font-bold text-base text-dark">₹{amount}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-dark/70">Designated Initiative</span>
              <span className="font-semibold text-dark text-right max-w-xs">{event}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-sage-200/80 pt-3">
              <span className="text-dark/70 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Tax Exemption Status</span>
              </span>
              <span className="font-bold text-green-700">Eligible 80G(5) (50% Deduction)</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full py-3.5 bg-cream border border-sage-300 hover:bg-sage-100 text-dark font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{isHi ? "रसीद प्रिंट / सेव करें" : "Print / Save Receipt"}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{isHi ? "व्हाट्सएप पर शेयर करें" : "Share on WhatsApp"}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-sage-100 flex items-center justify-between text-xs text-dark/70">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-terracotta font-semibold"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isHi ? "मुख्य पृष्ठ" : "Return to Home"}</span>
            </Link>

            <Link
              href="/donate"
              className="inline-flex items-center gap-1 hover:text-terracotta font-semibold"
            >
              <span>{isHi ? "अन्य अभियान देखें" : "View Other Causes"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default function DonateSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream font-sans">
          Loading confirmation...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
