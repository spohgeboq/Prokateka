"use client";

import React from "react";
import { Language, translations } from "@/data/translations";
import { Wrench, Zap, Truck, FileText, CheckCircle2 } from "lucide-react";

interface FeaturesProps {
  language: Language;
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const t = translations[language];

  const items = [
    {
      icon: <Wrench className="w-6 h-6 text-brand-400" />,
      title: t.features.f1Title,
      desc: t.features.f1Desc,
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: t.features.f2Title,
      desc: t.features.f2Desc,
    },
    {
      icon: <Truck className="w-6 h-6 text-sky-400" />,
      title: t.features.f3Title,
      desc: t.features.f3Desc,
    },
    {
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      title: t.features.f4Title,
      desc: t.features.f4Desc,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-navy-900/60 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.features.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-navy-950/60"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-950 border border-white/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
