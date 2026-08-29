"use client";

import React from "react";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";
import { Award, Landmark, Map, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ImpactStatsSectionProps {
  lang: Language;
}

export const ImpactStatsSection: React.FC<ImpactStatsSectionProps> = ({ lang }) => {
  const t = translations[lang].trust;

  const trustItems = [
    {
      icon: <Calendar className="w-8 h-8 text-terracotta" />,
      title: t.est,
      description: lang === "en" ? "Grassroots social action" : "जमीनी स्तर पर सामाजिक बदलाव",
    },
    {
      icon: <Map className="w-8 h-8 text-terracotta" />,
      title: t.districts,
      description: lang === "en" ? "Active across Rajasthan" : "राजस्थान भर में सक्रिय",
    },
    {
      icon: <Landmark className="w-8 h-8 text-terracotta" />,
      title: t.branches,
      description: lang === "en" ? "Bikaner & Hanumangarh" : "बीकानेर एवं हनुमानगढ़ शाखा",
    },
    {
      icon: <Award className="w-8 h-8 text-terracotta" />,
      title: t.taxExempt,
      description: lang === "en" ? "12AA & 80G(5) certified" : "12AA एवं 80G(5) पंजीकृत",
    },
  ];

  return (
    <section className="bg-cream border-y border-sage-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-sage-100 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-sage-50 border border-sage-100 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-lg text-dark leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-dark/70 font-sans mt-0.5">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
