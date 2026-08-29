"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImpactStory, Language } from "@/types";
import { INITIAL_STORIES } from "@/lib/stories";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Quote } from "lucide-react";

interface StoriesSectionProps {
  lang: Language;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ lang }) => {
  const isHi = lang === "hi";
  const [stories, setStories] = useState<ImpactStory[]>(INITIAL_STORIES);
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    async function loadStories() {
      try {
        const res = await fetch("/api/stories", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.stories?.length) {
          setStories(data.stories);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadStories();
  }, []);

  const activeStory = stories[activeIndex] || stories[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-cream/60 border-b border-sage-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-terracotta uppercase bg-terracotta/10 px-3.5 py-1.5 rounded-full border border-terracotta/20">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              {isHi ? "सच्ची कहानियां" : "Real Stories of Transformation"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-dark mt-3 leading-tight">
              {isHi ? "दान से बदलती जिंदगियों की दास्तान" : "How Your Donations Create Real Change"}
            </h2>
            <p className="text-sm sm:text-base text-dark/75 font-sans max-w-2xl mt-2">
              {isHi
                ? "देखें कि कैसे आपका एक छोटा सा योगदान राजस्थान के सुदूर गांवों में महिलाओं और परिवारों के जीवन में स्वावलंबन और सम्मान ला रहा है।"
                : "Meet the rural artisans, mothers, and youth whose lives took a positive turn through donor-supported initiatives across Rajasthan."}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-sage-300 hover:bg-terracotta hover:text-white hover:border-terracotta flex items-center justify-center text-dark transition-colors shadow-xs cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-sage-300 hover:bg-terracotta hover:text-white hover:border-terracotta flex items-center justify-center text-dark transition-colors shadow-xs cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Story Showcase Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-sage-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 transition-all duration-500">
          
          {/* Left Column: Beneficiary Image */}
          <div className="lg:col-span-5 relative min-h-72 lg:min-h-120 bg-sage-100">
            <Image
              src={activeStory.image}
              alt={activeStory.beneficiaryName}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4 bg-amber text-dark font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              {activeStory.category}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-200">
                {isHi ? activeStory.villageHi : activeStory.villageEn} • {activeStory.year}
              </p>
              <h3 className="text-2xl font-serif font-bold leading-tight">
                {activeStory.beneficiaryName}
              </h3>
            </div>
          </div>

          {/* Right Column: Story Narrative */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-dark leading-snug">
                {isHi ? activeStory.headlineHi : activeStory.headlineEn}
              </h4>

              <p className="text-base sm:text-lg text-dark/85 font-sans leading-relaxed">
                {isHi ? activeStory.storyHi : activeStory.storyEn}
              </p>

              {/* Quote Block */}
              <div className="relative p-5 bg-cream/70 rounded-2xl border-l-4 border-amber space-y-2">
                <Quote className="w-6 h-6 text-amber/40 absolute right-4 top-4" />
                <p className="text-sm sm:text-base font-sans italic text-dark/90 leading-relaxed">
                  {isHi ? activeStory.quoteHi : activeStory.quoteEn}
                </p>
                <p className="text-xs font-bold text-terracotta uppercase tracking-wider">
                  — {activeStory.beneficiaryName}
                </p>
              </div>
            </div>

            {/* Bottom Impact Note & CTA */}
            <div className="pt-6 border-t border-sage-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-semibold text-sage-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-terracotta shrink-0" />
                <span>{isHi ? activeStory.donationImpactHi : activeStory.donationImpactEn}</span>
              </div>

              <Link
                href={`/donate/${activeStory.eventSlug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shrink-0"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isHi ? "इस पहल को दान दें" : "Support This Cause"}</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
