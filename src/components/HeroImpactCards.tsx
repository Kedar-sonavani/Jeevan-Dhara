"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Language } from "@/types";

import { translations } from "@/i18n/translations";

interface HeroImpactCardsProps {
  lang: Language;
}

// Animated counting number component
const CounterNumber: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const HeroImpactCards: React.FC<HeroImpactCardsProps> = ({ lang }) => {
  const t = translations[lang].hero;
  const cardsData = t.counterCards || [];

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 md:-mt-28">
      {/* Translucent Big Glass Container */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.7, ease: "easeOut" }}
         className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cardsData.map((card: any, index: number) => {
            const targetNumber = parseInt(card.number, 10) || 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl p-7 flex flex-col justify-between shadow-md hover:shadow-xl hover:bg-white/95 transition-all duration-300 group"
              >
                <div>
                  {/* Persona Tagline */}
                  <span className="inline-block text-xs font-semibold tracking-wide text-dark/70 px-3.5 py-1.5 rounded-full border border-sage-200 bg-sage-50 mb-6">
                    {card.tagline}
                  </span>

                  {/* Animated Counter */}
                  <div className="text-5xl sm:text-6xl font-bold font-sans tracking-tight text-dark mb-2">
                    <CounterNumber target={targetNumber} suffix={card.suffix} />
                  </div>

                  {/* Label */}
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-dark/70 mb-8 leading-snug">
                    {card.label}
                  </p>
                </div>

                {/* Action Button */}
                <Link
                  href={card.href}
                  className="w-full py-3.5 px-5 rounded-xl border-2 border-dark text-dark font-bold text-xs tracking-widest uppercase flex items-center justify-between group-hover:bg-amber transition-colors duration-300 shadow-xs"
                >
                  <span>{card.btnText}</span>
                  <div className="w-7 h-7 rounded-full border-2 border-dark flex items-center justify-center bg-white/90 group-hover:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
