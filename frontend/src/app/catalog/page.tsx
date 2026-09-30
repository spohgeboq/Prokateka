"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryIcon } from "@/components/CategoryIcon";
import { CATALOG_ITEMS, EquipmentItem, EquipmentTier, PowerType } from "@/data/catalog";
import { CATEGORIES, CategoryDefinition } from "@/data/categories";
import { Language, translations } from "@/data/translations";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import {
  Wrench,
  Cog,
  Truck,
  Layers,
  MapPin,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Zap,
  Grid3X3,
  X,
  Search,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  ShoppingCart,
} from "lucide-react";

function CatalogMain() {
  const { equipment: liveEquipment, categories: liveCategories, settings, tiers } = useData();
  const { addItem, isInCart, openCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [language, setLanguage] = useState<Language>("ru");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPowerType, setSelectedPowerType] = useState<"all" | PowerType>("all");
  const [selectedBranch, setSelectedBranch] = useState<"all" | "rayymbek" | "rozybakiev">("all");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"popular" | "priceAsc" | "priceDesc">("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync category and search query from URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    } else if (!cat && selectedCategory !== "all") {
      setSelectedCategory("all");
    }

    const s = searchParams.get("search");
    if (s !== null && s !== searchQuery) {
      setSearchQuery(s);
    } else if (s === null && searchQuery !== "") {
      setSearchQuery("");
    }
  }, [searchParams]);

  // Modal calculator removed

  const t = translations[language];

  const categoriesToUse = liveCategories && liveCategories.length > 0 ? liveCategories : CATEGORIES;
  const itemsToUse = liveEquipment && liveEquipment.length > 0 ? liveEquipment : CATALOG_ITEMS;

  // Active category object if filtered
  const currentCategoryObj = useMemo(() => {
    return categoriesToUse.find((c) => c.id === selectedCategory) || null;
  }, [selectedCategory, categoriesToUse]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      router.replace("/catalog", { scroll: false });
    } else {
      router.replace(`/catalog?category=${catId}`, { scroll: false });
    }
    // Close mobile drawer on selection
    setMobileFilterOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const newQuery = params.toString();
    router.replace(`/catalog${newQuery ? `?${newQuery}` : ""}`, { scroll: false });
  };

  const handleDirectWhatsapp = (item: EquipmentItem) => {
    const itemName = language === "kz" ? item.nameKz : item.name;
    const lines = [
      `ЗАПРОС В СЕРВИСЕ PROKATEKA`,
      ``,
      `Техника: ${itemName}`,
      ``,
      language === "kz" 
        ? `Сәлеметсіз бе! Мені осы құрал қызықтырады, бағасы қанша болады және жалға алу шарттары қандай?` 
        : `Здравствуйте! Интересует аренда этой техники. Подскажите цену и условия.`,
    ];
    const waNumber = settings?.whatsappNumber || "77055036772"; 
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  // Categories will be grouped dynamically by tier during render

  // Filtered & sorted equipment
  const filteredItems = useMemo(() => {
    return itemsToUse.filter((item) => {
      // Category filter (12 categories)
      if (selectedCategory !== "all" && item.categoryId !== selectedCategory) {
        return false;
      }

      // Power type
      if (selectedPowerType !== "all" && item.powerType !== selectedPowerType) return false;

      // Branch
      if (selectedBranch !== "all" && item.branchId !== "all" && item.branchId !== selectedBranch)
        return false;

      // In stock
      if (onlyInStock && !item.inStock) return false;

      // Search
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
        const matchesSpecs = item.specs?.some(
          (s) =>
            s.key.toLowerCase().includes(query) ||
            s.value.toLowerCase().includes(query) ||
            s.keyKz.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesCat && !matchesDesc && !matchesSpecs) return false;
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
  }, [itemsToUse, selectedCategory, selectedPowerType, selectedBranch, onlyInStock, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedPowerType("all");
    setSelectedBranch("all");
    setOnlyInStock(false);
    setSearchQuery("");
    router.replace("/catalog", { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedPowerType !== "all" ||
    selectedBranch !== "all" ||
    onlyInStock ||
    searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
          <Link href="/" className="hover:text-brand-400 transition-colors">
            {language === "kz" ? "Басты бет" : "Главная"}
          </Link>
          <span>/</span>
          <button
            onClick={() => handleSelectCategory("all")}
            className={`hover:text-brand-400 transition-colors ${
              selectedCategory === "all" ? "text-slate-200 font-semibold" : ""
            }`}
          >
            {t.header.catalog}
          </button>
          {currentCategoryObj && (
            <>
              <span>/</span>
              <span className="text-brand-400 font-semibold truncate max-w-xs">
                {language === "kz" ? currentCategoryObj.nameKz : currentCategoryObj.nameRu}
              </span>
            </>
          )}
        </div>

        {/* Top Control Bar: Title & Active Badge & Sorter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {currentCategoryObj
                ? (language === "kz" ? currentCategoryObj.nameKz : currentCategoryObj.nameRu)
                : t.catalog.title}
            </h1>

            {/* Active Category Badge with 1-click removal */}
            {currentCategoryObj && (
              <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/40 text-brand-300 text-xs font-semibold px-3 py-1 rounded-full">
                <CategoryIcon name={currentCategoryObj.iconName} className="w-3.5 h-3.5 text-brand-400" />
                <span className="truncate max-w-[200px]">
                  {language === "kz" ? currentCategoryObj.nameKz : currentCategoryObj.nameRu}
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className="hover:bg-brand-500/30 rounded-full p-0.5 text-brand-400 hover:text-white transition-colors"
                  title={language === "kz" ? "Санатты сброс жасау" : "Сбросить фильтр"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Active Search Query Badge with 1-click removal */}
            {searchQuery && (
              <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/40 text-brand-300 text-xs font-semibold px-3 py-1 rounded-full">
                <Search className="w-3.5 h-3.5 text-brand-400" />
                <span className="truncate max-w-[200px]">
                  {language === "kz" ? "Іздеу: " : "Поиск: "} &ldquo;{searchQuery}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="hover:bg-brand-500/30 rounded-full p-0.5 text-brand-400 hover:text-white transition-colors"
                  title={language === "kz" ? "Іздеуді тазалау" : "Сбросить поиск"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <span className="text-xs text-slate-400">
              ({filteredItems.length} {language === "kz" ? "позиция" : "моделей"})
            </span>
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden inline-flex items-center gap-2 bg-navy-900 border border-white/10 hover:border-brand-500/40 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              <span>{language === "kz" ? "Санаттар мен сүзгілер" : "Категории и фильтры"}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">{t.catalog.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-navy-900 border border-white/10 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="popular">{t.catalog.sortPopular}</option>
                <option value="priceAsc">{t.catalog.sortPriceAsc}</option>
                <option value="priceDesc">{t.catalog.sortPriceDesc}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left Tree Sidebar + Right Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* LEFT SIDEBAR: Tree Category Catalog (Kaspi / Hilti style) */}
          <aside
            className={`
              md:block md:col-span-1 space-y-5
              ${mobileFilterOpen
                ? "fixed inset-0 z-50 bg-navy-950/98 p-5 overflow-y-auto"
                : "hidden"
              }
            `}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 md:hidden">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-500" />
                <span>{language === "kz" ? "Санаттар мен сүзгілер" : "Категории и фильтры"}</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-navy-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tree Navigation Box */}
            <div className="bg-navy-900/90 border border-white/10 p-4 rounded-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-500" />
                  <span>{language === "kz" ? "Техника санаттары" : "Категории техники"}</span>
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-slate-400 hover:text-brand-400 flex items-center gap-1 transition-colors"
                    title="Сбросить все"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === "kz" ? "Тазалау" : "Сброс"}</span>
                  </button>
                )}
              </div>

              {/* All Categories Item */}
              <button
                type="button"
                onClick={() => handleSelectCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs font-semibold mb-3 ${
                  selectedCategory === "all"
                    ? "bg-brand-500 text-navy-950 font-bold shadow-sm"
                    : "text-slate-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Grid3X3 className="w-4 h-4" />
                  <span>{language === "kz" ? "Барлық каталог" : "Все категории"}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCategory === "all" ? "bg-navy-950/20 text-navy-950" : "bg-white/5 text-slate-400"
                }`}>
                  {itemsToUse.length}
                </span>
              </button>

              {tiers.map((tier) => {
                const tierCats = categoriesToUse.filter((c) => c.tier === tier.id);
                // Removed condition: always show the tier even if empty
                return (
                  <div key={tier.id} className="mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-400/90 px-3 py-1 flex items-center gap-1.5 mb-1">
                      <CategoryIcon name={tier.iconName || (tier.id === "heavy" ? "Truck" : tier.id === "equipment" ? "Cog" : tier.id === "tool" ? "Wrench" : "Layers")} className="w-3.5 h-3.5" />
                      <span>{language === "kz" ? tier.nameKz : tier.nameRu}</span>
                    </div>
                    <div className="space-y-0.5">
                      {tierCats.map((c) => {
                        const isSelected = selectedCategory === c.id;
                        const name = language === "kz" ? c.nameKz : c.nameRu;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => handleSelectCategory(c.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs ${
                              isSelected
                                ? "bg-brand-500/20 text-brand-300 font-bold border-l-2 border-brand-500"
                                : "text-slate-300 hover:bg-navy-800 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <CategoryIcon name={c.iconName} className={`w-3.5 h-3.5 flex-shrink-0 ${
                                isSelected ? "text-brand-400" : "text-slate-400"
                              }`} />
                              <span className="truncate">{name}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 flex-shrink-0">
                              {c.itemCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Filters Box (Availability, Power, Branch) */}
            <div className="bg-navy-900/90 border border-white/10 p-4 rounded-2xl space-y-5">
              {/* In-Stock Only Toggle */}
              <div>
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-500 bg-navy-950 border-white/20 focus:ring-brand-500"
                  />
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{t.catalog.filterInStock}</span>
                  </span>
                </label>
              </div>

              {/* Power Type Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.catalog.filterPowerType}
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { id: "all", label: t.catalog.powerAll },
                    { id: "220v", label: t.catalog.power220 },
                    { id: "380v", label: t.catalog.power380 },
                    { id: "gasoline", label: t.catalog.powerGasoline },
                    { id: "diesel", label: t.catalog.powerDiesel },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedPowerType(type.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedPowerType === type.id
                          ? "bg-brand-500/10 text-brand-400 font-bold"
                          : "text-slate-300 hover:bg-navy-800"
                      }`}
                    >
                      <span>{type.label}</span>
                      {selectedPowerType === type.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Warehouse / Branch Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.catalog.filterBranch}
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { id: "all", label: t.catalog.branchAll },
                    { id: "rayymbek", label: t.catalog.branchRayymbek },
                    { id: "rozybakiev", label: t.catalog.branchRozybakiev },
                  ].map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedBranch === branch.id
                          ? "bg-brand-500/10 text-brand-400 font-bold"
                          : "text-slate-300 hover:bg-navy-800"
                      }`}
                    >
                      <span className="truncate">{branch.label}</span>
                      {selectedBranch === branch.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Apply Button */}
            <div className="md:hidden pt-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-brand-500 text-navy-950 font-bold text-sm py-3 rounded-xl shadow-lg shadow-brand-500/20"
              >
                {language === "kz" ? "Нәтижелерді көрсету" : "Показать результаты"} ({filteredItems.length})
              </button>
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID */}
          <div className="md:col-span-3">
            {/* Active Category Description Banner (if selected) */}
            {currentCategoryObj && (
              <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-brand-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-400 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon name={currentCategoryObj.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                        {language === "kz" ? "Таңдалған бөлім" : "Выбранный раздел"}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {language === "kz" ? currentCategoryObj.nameKz : currentCategoryObj.nameRu}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                      {language === "kz" ? currentCategoryObj.descriptionKz : currentCategoryObj.descriptionRu}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-slate-400 block">
                      {language === "kz" ? "Бағасы" : "Условия аренды"}
                    </span>
                    <span className="text-brand-400 font-bold text-xs">
                      {language === "kz" ? "WhatsApp-та біліңіз" : "Цена по запросу"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectCategory("all")}
                    className="bg-navy-800 hover:bg-navy-700 text-slate-200 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Вернуться ко всем категориям"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{language === "kz" ? "Барлығы" : "Все"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Product Cards or Empty State */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-navy-900/40 rounded-2xl border border-white/5">
                <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <div className="text-white font-bold text-lg">
                  {language === "kz" ? "Бұл санатта әзірге ештеңе табылмады" : "По вашему запросу ничего не найдено"}
                </div>
                <div className="text-sm text-slate-400 mt-1 mb-4">
                  {language === "kz"
                    ? "Сүзгі параметрлерін өзгертіп көріңіз немесе барлық санаттарды ашыңыз"
                    : "Попробуйте сбросить фильтры или выбрать другую категорию"}
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  {language === "kz" ? "Сүзгіні тазалау" : "Сбросить фильтры"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 transform ${
                      item.inStock
                        ? "bg-navy-900/90 hover:bg-navy-850 border border-white/10 hover:border-brand-500/50 hover:shadow-xl hover:shadow-navy-950/80 hover:-translate-y-1"
                        : "bg-navy-950/70 hover:bg-navy-900/80 border border-slate-700/40 hover:border-slate-600/70 opacity-80 hover:opacity-100 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Image & Link to [id] */}
                    <Link href={`/catalog/${item.id}`} className="relative h-48 w-full bg-navy-950 block overflow-hidden">
                      <Image
                        src={item.image}
                        alt={language === "kz" ? item.nameKz : item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          <span>{language === "kz" ? "Операторымен" : "С экипажем"}</span>
                        </div>
                      )}
                    </Link>

                    {/* Card Content */}
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

                        {/* Specs Grid */}
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

                      {/* Pricing and Action Buttons */}
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex items-baseline justify-between mb-3">
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
                              onClick={() => handleDirectWhatsapp(item)}
                              className="col-span-6 flex items-center justify-center gap-1 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold text-xs py-2 rounded-xl transition-all shadow-md shadow-brand-500/10 active:scale-95"
                            >
                              <span>{language === "kz" ? "WhatsApp арқылы сұрау" : "Запросить в WhatsApp"}</span>
                              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          ) : (
                            <a
                              href={`https://wa.me/${settings?.whatsappNumber || "77055036772"}?text=${encodeURIComponent(
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
          </div>
        </div>
      </main>

      <Footer language={language} />

    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400 text-sm">
          Загрузка каталога...
        </div>
      }
    >
      <CatalogMain />
    </Suspense>
  );
}
