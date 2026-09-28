"use client";

import React from "react";
import { Language, translations } from "@/data/translations";
import { Search, MessageSquare, Truck, RotateCcw } from "lucide-react";

interface HowItWorksProps {
  language: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  const t = translations[language];

  const steps = [
    {
      num: t.howItWorks.step1Num,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <Search className="w-5 h-5 text-brand-400" />,
    },
    {
      num: t.howItWorks.step2Num,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
    },
    {
      num: t.howItWorks.step3Num,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <Truck className="w-5 h-5 text-sky-400" />,
    },
    {
      num: t.howItWorks.step4Num,
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: <RotateCcw className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-navy-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/50 transition-all duration-300"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy-950 border border-white/10 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-brand-500/40 tracking-wider">
                  {step.num}
                </span>
              </div>

              <h3 className="text-white font-bold text-base mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
