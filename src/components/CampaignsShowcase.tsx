"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DonationEvent, Language } from "@/types";
import { INITIAL_EVENTS } from "@/lib/events";
import { Sparkles, ArrowRight, Target, Users, MapPin, Heart } from "lucide-react";

interface CampaignsShowcaseProps {
  lang: Language;
}

export const CampaignsShowcase: React.FC<CampaignsShowcaseProps> = ({ lang }) => {
  const isHi = lang === "hi";
  const [events, setEvents] = useState<DonationEvent[]>(INITIAL_EVENTS);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.events?.length) {
          setEvents(data.events.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadEvents();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-sage-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-terracotta uppercase bg-terracotta/10 px-3.5 py-1.5 rounded-full border border-terracotta/20">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              {isHi ? "सक्रिय दान अभियान" : "Active Urgent Campaigns"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-dark mt-3 leading-tight">
              {isHi ? "विशिष्ट लक्ष्यों हेतु सहयोग प्रदान करें" : "Support Our Live Fundraising Campaigns"}
            </h2>
            <p className="text-sm sm:text-base text-dark/75 font-sans max-w-2xl mt-2">
              {isHi
                ? "प्रत्येक अभियान का एक स्पष्ट बजट, लक्ष्य और गांव निर्धारित है। आपकी सहायता सीधे वास्तविक उपकरण और प्रशिक्षण में परिणत होती है।"
                : "Each campaign has a dedicated target budget, timeline, and direct village footprint. Track live progress in real-time."}
            </p>
          </div>

          <div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-sage-300 hover:bg-sage-100 text-dark font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs"
            >
              <span>{isHi ? "सभी अभियान देखें" : "View All Campaigns"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => {
            const percent = Math.min(100, Math.round((evt.raisedAmount / evt.targetAmount) * 100));
            const title = isHi ? evt.titleHi : evt.titleEn;
            const desc = isHi ? evt.descriptionHi : evt.descriptionEn;
            const location = isHi ? evt.locationHi : evt.locationEn;

            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-sage-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo Frame */}
                <div className="relative h-52 w-full bg-sage-100">
                  <Image
                    src={evt.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/75 via-transparent to-transparent" />
                  
                  <span className="absolute top-3.5 left-3.5 bg-amber text-dark font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                    {evt.category}
                  </span>

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-amber-200">
                      <MapPin className="w-3.5 h-3.5" />
                      {location}
                    </span>
                    <span className="font-semibold text-white/90">
                      {evt.donorCount} {isHi ? "दानदाता" : "Donors"}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-serif font-bold text-dark leading-snug group-hover:text-terracotta transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark/75 font-sans leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  </div>

                  {/* Progress Meter */}
                  <div className="space-y-2 pt-2 border-t border-sage-100">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-terracotta font-bold text-sm">
                        ₹{evt.raisedAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-dark/60 font-sans">
                        {percent}% of ₹{evt.targetAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-cream-300 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full bg-linear-to-r from-terracotta to-amber rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/donate/${evt.slug}`}
                    className="w-full py-3 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 fill-dark" />
                    <span>{isHi ? "इस अभियान को दान दें" : "Sponsor This Goal"}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
