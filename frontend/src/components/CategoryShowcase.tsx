"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Language } from "@/data/translations";
import { useData } from "@/context/DataContext";
import { CategoryIcon } from "./CategoryIcon";
import {
  ArrowRight,
  Grid3X3,
  Truck,
  Cog,
  Wrench,
  Sparkles,
} from "lucide-react";

interface CategoryShowcaseProps {
  language: Language;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ language }) => {
  const [activeTier, setActiveTier] = useState<string>("all");
  const { categories: liveCategories, tiers } = useData();

  const filteredCategories = liveCategories.filter((cat) => {
    if (activeTier === "all") return true;
    return cat.tier === activeTier;
  });

  const getTierBadge = (tierId: string) => {
    const tier = tiers.find(t => t.id === tierId);
    const label = tier ? (language === "kz" ? tier.nameKz : tier.nameRu) : tierId;
    
    switch (tierId) {
      case "heavy":
        return {
          label,
          className: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        };
      case "equipment":
        return {
          label,
          className: "bg-blue-500/10 text-blue-300 border-blue-500/20",
        };
      case "tool":
        return {
          label,
          className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        };
      default:
        return {
          label,
          className: "bg-brand-500/10 text-brand-300 border-brand-500/20",
        };
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-navy-900/60 border-y border-white/5 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>{language === "kz" ? "САНАТТАР БОЙЫНША ТАҢДАУ" : "НАВИГАЦИЯ ПО КАТЕГОРИЯМ"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {language === "kz"
                ? "Қажетті жабдықты жылдам табу"
                : "Каталог по направлениям работ"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              {language === "kz"
                ? "12 негізгі санат: қол құралдарынан бастап ауыр жер қазу машиналарына дейін. Барлығы дайын әрі тексерілген."
                : "12 специализированных категорий: от ручных перфораторов до экскаваторов и самосвалов. Выберите нужный раздел для быстрого заказа."}
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300 group transition-colors self-start md:self-auto"
          >
            <span>{language === "kz" ? "Толық каталогты ашу" : "Открыть весь каталог"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tier filter tabs: Compact segmented pill control, NO horizontal scroll */}
        <div className="flex justify-start sm:justify-center mb-8">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-navy-950/90 border border-white/10 rounded-2xl shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTier("all")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTier === "all"
                  ? "bg-brand-500 text-navy-950 font-bold shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>{language === "kz" ? "Барлығы" : "Все"}</span>
              <span className="text-[11px] opacity-75 font-normal">({liveCategories.length})</span>
            </button>

            {tiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTier(tier.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTier === tier.id
                    ? "bg-brand-500 text-navy-950 font-bold shadow-md shadow-brand-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {tier.id === "heavy" ? <Truck className="w-4 h-4" /> : tier.id === "equipment" ? <Cog className="w-4 h-4" /> : tier.id === "tool" ? <Wrench className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                <span>{language === "kz" ? tier.nameKz : tier.nameRu}</span>
                <span className="text-[11px] opacity-75 font-normal">
                  ({liveCategories.filter((c) => c.tier === tier.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCategories.map((category) => {
            const badge = getTierBadge(category.tier);
            const title = language === "kz" ? category.nameKz : category.nameRu;
            const desc = language === "kz" ? category.descriptionKz : category.descriptionRu;
            const unit = language === "kz" ? category.priceUnitKz : category.priceUnitRu;

            return (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group relative flex flex-col justify-between p-5 bg-navy-950/80 hover:bg-navy-850/90 border border-white/10 hover:border-brand-500/50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-navy-950/90 transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Icon + Tier Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 group-hover:bg-brand-500 group-hover:text-navy-950 group-hover:border-brand-500 flex items-center justify-center transition-all duration-300 shadow-sm">
                      <CategoryIcon name={category.iconName} className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base leading-snug group-hover:text-brand-400 transition-colors mb-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {desc}
                  </p>
                </div>

                {/* Footer: Price & Item Count */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">
                      {language === "kz" ? "Бағасы" : "Цена"}
                    </span>
                    <span className="text-white font-bold text-xs">
                      {language === "kz" ? "WhatsApp-та біліңіз" : "По запросу в WhatsApp"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>
                      {category.itemCount}{" "}
                      {language === "kz" ? "модель" : "моделей"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner for custom request */}
        <div className="mt-8 p-5 sm:p-6 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {language === "kz"
                  ? "Қажетті жабдықты таба алмадыңыз ба?"
                  : "Не нашли нужную позицию в списке категорий?"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === "kz"
                  ? "Біздің паркте 180-ден астам құралдар бар. Менеджерге WhatsApp арқылы жазыңыз, 5 минутта тауып береміз."
                  : "В нашем парке свыше 180 единиц техники. Напишите менеджеру в WhatsApp — подберем нужный инструмент за 5 минут."}
              </div>
            </div>
          </div>

          <Link
            href="/contacts"
            className="flex-shrink-0 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
          >
            {language === "kz" ? "Менеджермен байланысу" : "Связаться с менеджером"}
          </Link>
        </div>
      </div>
    </section>
  );
};
