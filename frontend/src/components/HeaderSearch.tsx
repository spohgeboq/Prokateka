"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Language } from "@/data/translations";
import { CATALOG_ITEMS, EquipmentItem } from "@/data/catalog";
import { CATEGORIES, CategoryDefinition } from "@/data/categories";
import { CategoryIcon } from "./CategoryIcon";
import { useData } from "@/context/DataContext";
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Layers,
  Sparkles,
} from "lucide-react";

interface HeaderSearchProps {
  language: Language;
  className?: string;
  onSelectAction?: () => void;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  language,
  className = "",
  onSelectAction,
}) => {
  const router = useRouter();
  const { equipment: liveEquipment, categories: liveCategories } = useData();
  
  const itemsToUse = liveEquipment && liveEquipment.length > 0 ? liveEquipment : CATALOG_ITEMS;
  const categoriesToUse = liveCategories && liveCategories.length > 0 ? liveCategories : CATEGORIES;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular quick tags when query is empty
  const popularTags = useMemo(
    () => [
      { ru: "Экскаватор JCB", kz: "JCB экскаваторы" },
      { ru: "Виброплита 90 кг", kz: "Діріл плита 90 кг" },
      { ru: "Перфоратор SDS-Max", kz: "SDS-Max перфораторы" },
      { ru: "КамАЗ 20т", kz: "КамАЗ 20т аударғыш" },
      { ru: "Генератор 10 кВт", kz: "Генератор 10 кВт" },
      { ru: "Болгарка 230 мм", kz: "Болгарка 230 мм" },
    ],
    []
  );

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter matching categories
  const matchingCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categoriesToUse.filter((c) => {
      return (
        c.nameRu.toLowerCase().includes(q) ||
        c.nameKz.toLowerCase().includes(q) ||
        c.descriptionRu.toLowerCase().includes(q) ||
        c.descriptionKz.toLowerCase().includes(q)
      );
    }).slice(0, 3);
  }, [query]);

  // Filter matching equipment items
  const matchingEquipment = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return itemsToUse.filter((item) => {
      const matchName =
        item.name.toLowerCase().includes(q) ||
        item.nameKz.toLowerCase().includes(q);
      const matchCat =
        item.category.toLowerCase().includes(q) ||
        item.categoryKz.toLowerCase().includes(q);
      const matchDesc =
        item.description.toLowerCase().includes(q) ||
        item.descriptionKz.toLowerCase().includes(q);
      const matchSpecs = item.specs.some(
        (s) =>
          s.key.toLowerCase().includes(q) ||
          s.value.toLowerCase().includes(q) ||
          s.keyKz.toLowerCase().includes(q)
      );
      return matchName || matchCat || matchDesc || matchSpecs;
    }).slice(0, 5);
  }, [query]);

  const totalResultsCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    return itemsToUse.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.nameKz.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.categoryKz.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.descriptionKz.toLowerCase().includes(q)
      );
    }).length;
  }, [query]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    setIsOpen(false);
    inputRef.current?.blur();
    router.push(`/catalog?search=${encodeURIComponent(cleanQuery)}`);
    if (onSelectAction) onSelectAction();
  };

  const handleSelectTag = (tagText: string) => {
    setQuery(tagText);
    setIsOpen(false);
    router.push(`/catalog?search=${encodeURIComponent(tagText)}`);
    if (onSelectAction) onSelectAction();
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              language === "kz"
                ? "Техника мен құралдарды іздеу (JCB, перфоратор...)"
                : "Поиск техники и инструмента (JCB, перфоратор...)"
            }
            className="w-full bg-navy-900/90 hover:bg-navy-900 border border-white/10 focus:border-brand-500 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Очистить"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>

      {/* Live Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-navy-950/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn text-xs">
          {/* STATE 1: Empty Query - Popular Suggestions */}
          {!query.trim() && (
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
                <span>{language === "kz" ? "Жиі ізделетін сұраныстар" : "Популярные запросы"}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, idx) => {
                  const tagLabel = language === "kz" ? tag.kz : tag.ru;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectTag(tagLabel)}
                      className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-brand-500/20 text-slate-300 hover:text-brand-300 border border-white/10 hover:border-brand-500/30 transition-all text-xs font-medium"
                    >
                      {tagLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STATE 2: Query Active */}
          {query.trim() && (
            <div className="divide-y divide-white/5 max-h-[460px] overflow-y-auto no-scrollbar">
              {/* Category Matches */}
              {matchingCategories.length > 0 && (
                <div className="p-3 bg-navy-900/40">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-brand-500" />
                    <span>{language === "kz" ? "Сәйкес санаттар" : "Категории"}</span>
                  </div>
                  <div className="space-y-1">
                    {matchingCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/catalog?category=${cat.id}`}
                        onClick={() => {
                          setIsOpen(false);
                          if (onSelectAction) onSelectAction();
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-navy-850 border border-transparent hover:border-white/10 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
                            <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-white group-hover:text-brand-400 font-semibold truncate">
                            {language === "kz" ? cat.nameKz : cat.nameRu}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex-shrink-0 ml-2">
                          {cat.itemCount} {language === "kz" ? "модель" : "моделей"}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment Items Matches */}
              {matchingEquipment.length > 0 && (
                <div className="p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-brand-500" />
                    <span>{language === "kz" ? "Табылған техника" : "Оборудование и техника"}</span>
                  </div>
                  <div className="space-y-1">
                    {matchingEquipment.map((item) => {
                      const title = language === "kz" ? item.nameKz : item.name;
                      const price = language === "kz" ? "Бағасын WhatsApp-та біліңіз" : "Цена по запросу в WhatsApp";

                      return (
                        <Link
                          key={item.id}
                          href={`/catalog/${item.id}`}
                          onClick={() => {
                            setIsOpen(false);
                            if (onSelectAction) onSelectAction();
                          }}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-navy-900 border border-transparent hover:border-white/10 transition-colors group gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0 border border-white/10">
                              <Image
                                src={item.image}
                                alt={title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-white font-bold text-xs truncate group-hover:text-brand-400 transition-colors">
                                {title}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {language === "kz" ? item.categoryKz : item.category}
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="text-xs font-extrabold text-brand-400">
                              {price}
                            </div>
                            <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>{language === "kz" ? "Қоймада бар" : "В наличии"}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty Results State */}
              {matchingCategories.length === 0 && matchingEquipment.length === 0 && (
                <div className="p-6 text-center">
                  <div className="text-slate-300 font-bold mb-1">
                    {language === "kz"
                      ? "Сұраныс бойынша ештеңе табылмады"
                      : "По вашему запросу ничего не найдено"}
                  </div>
                  <div className="text-xs text-slate-500 mb-4">
                    {language === "kz"
                      ? "Сөзді дұрыс жазғаныңызды тексеріңіз немесе каталогты ашыңыз"
                      : "Проверьте правильность написания или посмотрите весь каталог"}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/catalog");
                      if (onSelectAction) onSelectAction();
                    }}
                    className="bg-navy-900 hover:bg-navy-850 text-brand-400 border border-brand-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    {language === "kz" ? "Каталогқа өту" : "Перейти в каталог"}
                  </button>
                </div>
              )}

              {/* View All Matches Footer */}
              {totalResultsCount > 0 && (
                <div className="p-3 bg-navy-900/60 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 transition-all font-bold text-xs"
                  >
                    <span>
                      {language === "kz"
                        ? `Барлық нәтижелерді көру (${totalResultsCount})`
                        : `Показать все результаты поиска (${totalResultsCount})`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
