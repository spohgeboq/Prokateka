"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATALOG_ITEMS, EquipmentItem, EquipmentTier } from "@/data/catalog";
import { Language, translations } from "@/data/translations";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import {
  Wrench,
  Cog,
  Truck,
  ArrowRight,
  Layers,
  MapPin,
  Sparkles,
  MessageCircle,
  ShoppingCart,
  Check,
} from "lucide-react";

interface CatalogSectionProps {
  language: Language;
  searchQuery: string;
  onSelectEquipment: (item: EquipmentItem) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  language,
  searchQuery,
  onSelectEquipment,
}) => {
  const t = translations[language];
  const { equipment: liveEquipment, settings, tiers } = useData();
  const { addItem, isInCart, openCart } = useCart();

  const [activeTier, setActiveTier] = useState<"all" | EquipmentTier>("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<"popular" | "priceAsc" | "priceDesc">("popular");

  const itemsToUse = liveEquipment && liveEquipment.length > 0 ? liveEquipment : CATALOG_ITEMS;

  // Filtered & sorted items
  const filteredItems = useMemo(() => {
    return itemsToUse.filter((item) => {
      // Tier filter
      if (activeTier !== "all" && item.tier !== activeTier) return false;

      // Stock filter
      if (onlyInStock && !item.inStock) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName =
          item.name.toLowerCase().includes(query) ||
          item.nameKz.toLowerCase().includes(query);
        const matchesCat =
          item.category.toLowerCase().includes(query) ||
          item.categoryKz.toLowerCase().includes(query);
        const matchesDesc =
          item.description.toLowerCase().includes(query) ||
          item.descriptionKz.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.tier === "heavy" && a.priceShift ? a.priceShift : a.priceDay;
      const priceB = b.tier === "heavy" && b.priceShift ? b.priceShift : b.priceDay;

      if (sortBy === "priceAsc") return priceA - priceB;
      if (sortBy === "priceDesc") return priceB - priceA;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [activeTier, onlyInStock, sortBy, searchQuery]);

  return (
    <section id="catalog-preview" className="py-14 sm:py-20 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === "kz" ? "ЖАБДЫҚТАР ПАРКІ" : "ПАРК ОБОРУДОВАНИЯ"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.catalog.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 no-scrollbar gap-2">
          <button
            onClick={() => setActiveTier("all")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTier === "all"
                ? "bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/20 font-bold"
                : "bg-navy-900 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <span>{t.catalog.tabAll}</span>
            <span className="text-[11px] opacity-75 font-normal">
              ({itemsToUse.length})
            </span>
          </button>

          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTier === tier.id
                  ? "bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/20 font-bold"
                  : "bg-navy-900 border border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              <Cog className="w-4 h-4" />
              <span>{language === "kz" ? tier.nameKz : tier.nameRu}</span>
              <span className="text-[11px] opacity-75 font-normal">
                ({itemsToUse.filter((i) => i.tier === tier.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Sub-filters Bar: In Stock + Sorting */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-navy-900/60 border border-white/5">
          <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="w-4 h-4 rounded text-brand-500 bg-navy-950 border-white/20 focus:ring-brand-500"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {t.catalog.filterInStock}
            </span>
          </label>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">{t.catalog.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-navy-950 border border-white/10 text-xs sm:text-sm text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-500"
              >
                <option value="popular">{t.catalog.sortPopular}</option>
                <option value="priceAsc">{t.catalog.sortPriceAsc}</option>
                <option value="priceDesc">{t.catalog.sortPriceDesc}</option>
              </select>
            </div>

            <Link
              href="/catalog"
              className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              <span>{language === "kz" ? "Толық каталогқа" : "В полный каталог"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-navy-900/30 rounded-2xl border border-white/5">
            <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <div className="text-white font-bold text-lg">
              {language === "kz" ? "Ештеңе табылмады" : "По вашему запросу ничего не найдено"}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {language === "kz"
                ? "Іздеу сөзін өзгертіп көріңіз немесе барлық санаттарды қараңыз"
                : "Попробуйте изменить поисковый запрос или сбросить фильтры"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 transform ${
                  item.inStock
                    ? "bg-navy-900/90 hover:bg-navy-850 border border-white/10 hover:border-brand-500/50 hover:shadow-xl hover:shadow-navy-950/80 hover:-translate-y-1"
                    : "bg-navy-950/70 hover:bg-navy-900/80 border border-slate-700/40 hover:border-slate-600/70 opacity-80 hover:opacity-100 hover:-translate-y-0.5"
                }`}
              >
                {/* Image & Badges */}
                <Link href={`/catalog/${item.id}`} className="relative h-48 w-full bg-navy-950 block overflow-hidden">
                  <Image
                    src={item.image}
                    alt={language === "kz" ? item.nameKz : item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={`object-cover transition-all duration-500 ${
                      item.inStock
                        ? "group-hover:scale-105"
                        : "grayscale contrast-90 brightness-75 group-hover:grayscale-[0.35] group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md ${
                        item.inStock
                          ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-300"
                          : "bg-amber-950/80 border border-amber-500/40 text-amber-300"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.inStock ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                        }`}
                      />
                      <span>
                        {item.inStock ? t.catalog.inStock : t.catalog.outOfStock}
                      </span>
                    </span>

                    {item.popular && (
                      <span className="bg-brand-500 text-navy-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                        TOP
                      </span>
                    )}
                  </div>

                  {item.tier === "heavy" && (
                    <div className="absolute bottom-2 left-2.5 bg-navy-950/90 border border-brand-500/30 text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-400" />
                      <span>{language === "kz" ? "Операторымен" : "С водителем/оператором"}</span>
                    </div>
                  )}
                </Link>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">
                      {language === "kz" ? item.categoryKz : item.category}
                    </div>

                    <Link href={`/catalog/${item.id}`} className="block">
                      <h3
                        className={`font-bold text-sm sm:text-base leading-snug line-clamp-2 transition-colors mb-3 ${
                          item.inStock
                            ? "text-white group-hover:text-brand-400"
                            : "text-slate-300 group-hover:text-amber-300"
                        }`}
                      >
                        {language === "kz" ? item.nameKz : item.name}
                      </h3>
                    </Link>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-1.5 bg-navy-950/70 p-2.5 rounded-xl border border-white/5 mb-3 text-[11px]">
                      {item.specs.slice(0, 4).map((spec, sIdx) => (
                        <div key={sIdx} className="min-w-0">
                          <span className="text-slate-400 block truncate">
                            {language === "kz" ? spec.keyKz : spec.key}:
                          </span>
                          <span className="text-slate-200 font-semibold truncate block">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                      <span className="truncate">{language === "kz" ? item.branchKz : item.branch}</span>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div>
                        <div className="text-base font-bold text-white">
                          {language === "kz" ? "Бағасын WhatsApp-та біліңіз" : "Цена по запросу в WhatsApp"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-1.5">
                      <Link
                        href={`/catalog/${item.id}`}
                        className="col-span-4 flex items-center justify-center bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-xs py-2 rounded-xl border border-white/10 transition-colors"
                      >
                        {t.catalog.btnDetails}
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          addItem(item);
                          openCart();
                        }}
                        title={isInCart(item.id) ? "Уже в корзине" : "Добавить в корзину"}
                        className={`col-span-2 flex items-center justify-center rounded-xl border transition-all active:scale-95 ${
                          isInCart(item.id)
                            ? "bg-brand-500/20 border-brand-500 text-brand-300"
                            : "bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border-white/10"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>

                      {item.inStock ? (
                        <button
                          type="button"
                          onClick={() => onSelectEquipment(item)}
                          className="col-span-6 flex items-center justify-center gap-1 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold text-xs py-2 rounded-xl transition-all shadow-md shadow-brand-500/10 active:scale-95"
                        >
                          <span>{t.catalog.btnRent}</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      ) : (
                        <a
                          href={`https://wa.me/${settings?.whatsappNumber || "77056317887"}?text=${encodeURIComponent(
                            language === "kz"
                              ? `Сәлеметсіз бе! Мені «${item.nameKz}» қызықтырады. Осы жабдық қашан босайтынын немесе ұқсас құрал бар-жоғын білуге бола ма?`
                              : `Здравствуйте! Интересует «${item.name}». Подскажите, пожалуйста, когда освободится данный инструмент или есть ли свободный аналог?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="col-span-6 flex items-center justify-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 font-bold text-[10px] py-2 px-1 rounded-xl transition-all active:scale-95 text-center leading-tight"
                        >
                          <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{t.catalog.btnCheckDate}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-850 border border-brand-500/30 hover:border-brand-500 text-brand-400 font-bold px-8 py-3.5 rounded-xl text-sm transition-all transform hover:-translate-y-0.5"
          >
            <span>{language === "kz" ? "Барлық 180+ техника каталогын ашу" : "Перейти в полный каталог (180+ позиций)"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
