"use client";

import React from "react";
import { Language, translations } from "@/data/translations";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { useData } from "@/context/DataContext";

interface BranchesSectionProps {
  language: Language;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ language }) => {
  const t = translations[language];
  const { branches: liveBranches } = useData();

  const defaultBranches = [
    {
      id: "b1",
      name: t.branches.b1Name,
      nameKz: t.branches.b1Name,
      address: t.branches.b1Address,
      addressKz: t.branches.b1Address,
      workingHours: t.branches.b1Time,
      phone: "+7 (705) 631-78-87",
      gisUrl: "https://2gis.kz",
      tagRu: "Легкий инструмент + спецтехника",
      tagKz: "Жеңіл және ауыр техника",
    },
    {
      id: "b2",
      name: t.branches.b2Name,
      nameKz: t.branches.b2Name,
      address: t.branches.b2Address,
      addressKz: t.branches.b2Address,
      workingHours: t.branches.b2Time,
      phone: "+7 (705) 631-78-87",
      gisUrl: "https://2gis.kz",
      tagRu: "Электро- и бензоинструмент",
      tagKz: "Қол электр құралдары",
    },
  ];

  const branchesToRender = liveBranches && liveBranches.length > 0
    ? liveBranches.map((b, idx) => ({
        id: b.id,
        name: b.nameRu,
        nameKz: b.nameKz,
        address: b.addressRu,
        addressKz: b.addressKz,
        workingHours: b.workingHoursRu,
        phone: b.phone,
        gisUrl: b.gisLink || "https://2gis.kz",
        tagRu: idx === 0 ? "Легкий инструмент + спецтехника" : "Электро- и бензоинструмент",
        tagKz: idx === 0 ? "Жеңіл және ауыр техника" : "Қол электр құралдары",
      }))
    : defaultBranches;

  return (
    <section id="branches" className="py-16 sm:py-20 bg-navy-900/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.branches.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.branches.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branchesToRender.map((b, idx) => (
            <div
              key={b.id}
              className="p-6 sm:p-7 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === "kz" ? `${idx + 1}-филиал` : `Филиал №${idx + 1}`}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {language === "kz" ? b.nameKz : b.name}
                </h3>
                <p className="text-slate-300 text-sm mb-4 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>{language === "kz" ? b.addressKz : b.address}</span>
                </p>
                <p className="text-slate-400 text-xs flex items-center gap-2 mb-6">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{b.workingHours}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={b.gisUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === "kz" ? "Картадан көру (2GIS)" : "Открыть в 2GIS"}</span>
                </a>
                <span className="text-xs text-slate-400">
                  {language === "kz" ? b.tagKz : b.tagRu}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
