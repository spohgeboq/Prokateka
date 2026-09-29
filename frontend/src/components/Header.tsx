"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { HeaderSearch } from "./HeaderSearch";
import { Language, translations } from "@/data/translations";
import { CATEGORIES } from "@/data/categories";
import { CategoryIcon } from "./CategoryIcon";
import {
  Phone,
  Clock,
  MessageCircle,
  Menu,
  X,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Building2,
  FileText,
  MapPin,
  Layers,
  ArrowRight,
  Truck,
  Cog,
  Wrench,
  Percent,
  Scale,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { useData } from "@/context/DataContext";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onSearchChange,
  searchQuery = "",
  cartCount = 0,
  onOpenCart,
}) => {
  const { cartCount: globalCartCount, openCart } = useCart();
  const { settings } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogMegaMenuOpen, setCatalogMegaMenuOpen] = useState(false);
  const [mobileCatalogExpanded, setMobileCatalogExpanded] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const t = translations[language];

  const effectiveCartCount = cartCount > 0 ? cartCount : globalCartCount;
  const effectiveOpenCart = onOpenCart || openCart;

  // Close mega menu on route change
  useEffect(() => {
    setCatalogMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleWhatsappManagerClick = () => {
    const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;
    const text = encodeURIComponent(
      language === "kz"
        ? "Сәлеметсіз бе, Prokateka! Құрылыс техникасын жалға алу бойынша кеңес алғым келеді."
        : "Здравствуйте, Prokateka! Хочу проконсультироваться по поводу аренды строительной техники."
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
  };

  const navLinks = [
    {
      href: "/promotions",
      label: t.header.promotions,
      icon: <Percent className="w-4 h-4 text-amber-400" />,
      isPromo: true,
    },
    { href: "/pricing", label: t.header.pricing, icon: <FileText className="w-4 h-4" /> },
    { href: "/offer", label: t.header.offer, icon: <Scale className="w-4 h-4" /> },
    { href: "/branches", label: t.header.branches, icon: <MapPin className="w-4 h-4" /> },
  ];

  const heavyCategories = CATEGORIES.filter((c) => c.tier === "heavy");
  const equipmentCategories = CATEGORIES.filter((c) => c.tier === "equipment");
  const toolCategories = CATEGORIES.filter((c) => c.tier === "tool");

  const handleMouseEnterCatalog = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setCatalogMegaMenuOpen(true);
  };

  const handleMouseLeaveCatalog = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setCatalogMegaMenuOpen(false);
    }, 200);
  };

  return (
    <header className="relative z-40 w-full" onMouseLeave={handleMouseLeaveCatalog}>
      {/* 1. Compact Top Bar */}
      <div className="bg-navy-950/95 border-b border-white/5 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Tagline & Quick Info */}
          <div className="flex items-center gap-4 hidden sm:flex">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              {t.topBar.hours}
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t.topBar.fastDelivery}
            </span>
          </div>

          {/* Right: Phone & Minimalist KZ / RU switch */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <a
              href={`tel:${t.topBar.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 font-medium text-slate-200 hover:text-brand-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>{t.topBar.phone}</span>
            </a>

            {/* Discreet Language Switcher: small, subtle pill */}
            <div className="inline-flex items-center bg-navy-900 border border-white/10 rounded-full p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => onLanguageChange("kz")}
                className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                  language === "kz"
                    ? "bg-brand-500 text-navy-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Qazaqsha"
              >
                KZ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("ru")}
                className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                  language === "ru"
                    ? "bg-brand-500 text-navy-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Русский"
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Glassmorphism */}
      <div className="glass-panel border-b border-white/10 px-3 sm:px-4 py-2.5 sm:py-3.5 relative z-40">
        {/* Main Logo & Desktop Navigation */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6 py-1">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <BrandLogo size="md" className="scale-[0.82] sm:scale-100 origin-left" />
          </Link>

          {/* Center Search Input with Instant Popover (Desktop) */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <HeaderSearch language={language} />
          </div>

          {/* Desktop Multi-page Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs xl:text-sm font-medium">
            {/* Catalog Button with Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterCatalog}
            >
              <Link
                href="/catalog"
                className={`flex items-center gap-1.5 py-1 transition-colors ${
                  pathname.startsWith("/catalog") || catalogMegaMenuOpen
                    ? "text-brand-400 font-bold border-b-2 border-brand-500"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t.header.catalog}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    catalogMegaMenuOpen ? "rotate-180 text-brand-400" : "text-slate-400"
                  }`}
                />
              </Link>
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.isPromo) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-all py-1 flex items-center gap-1.5 ${
                      isActive
                        ? "text-amber-400 font-extrabold border-b-2 border-amber-400"
                        : "text-amber-400 hover:text-amber-300 font-bold"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px] font-black">
                      %
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-brand-400 font-bold border-b-2 border-brand-500"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: WhatsApp Direct & Booking Drawer & Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* WhatsApp Direct Manager Button */}
            <button
              onClick={handleWhatsappManagerClick}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium p-2 sm:px-3.5 sm:py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-950/40 active:scale-95 flex-shrink-0"
              title="Открыть чат с менеджером в WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
              <span className="hidden sm:inline text-xs sm:text-sm">{t.header.whatsappManager}</span>
            </button>

            {/* Cart / Booking Drawer Trigger */}
            <button
              onClick={effectiveOpenCart}
              className="relative flex items-center justify-center bg-navy-850 hover:bg-navy-800 border border-white/10 text-white p-2 sm:p-2.5 rounded-xl transition-all active:scale-95 flex-shrink-0"
              title={t.header.cart}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
              {effectiveCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-navy-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {effectiveCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-300 hover:text-white p-2 rounded-xl bg-navy-900 border border-white/10 flex-shrink-0 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden w-full mt-2.5">
          <HeaderSearch
            language={language}
            onSelectAction={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>

      {/* 3. DESKTOP MEGA DROPDOWN (12 CATEGORIES) */}
      {catalogMegaMenuOpen && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-navy-950/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl z-30 transition-all duration-200 animate-fadeIn"
          onMouseEnter={handleMouseEnterCatalog}
          onMouseLeave={handleMouseLeaveCatalog}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-3 gap-8">
              {/* Column 1: Heavy Equipment (Спецтехника) */}
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Truck className="w-4 h-4" />
                  <span>{language === "kz" ? "Ауыр арнайы техника" : "Спецтехника и транспорт"}</span>
                </div>
                <div className="space-y-1.5">
                  {heavyCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/catalog?category=${c.id}`}
                      onClick={() => setCatalogMegaMenuOpen(false)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-900 border border-transparent hover:border-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy-900 group-hover:bg-amber-500/20 text-slate-300 group-hover:text-amber-400 flex items-center justify-center flex-shrink-0 transition-colors">
                        <CategoryIcon name={c.iconName} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors truncate">
                          {language === "kz" ? c.nameKz : c.nameRu}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {c.itemCount} {language === "kz" ? "модель" : "моделей"} • {language === "kz" ? "бағасы WhatsApp-та" : "цена по запросу"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Equipment (Оборудование) */}
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-blue-400">
                  <Cog className="w-4 h-4" />
                  <span>{language === "kz" ? "Құрылыс жабдықтары" : "Строительное оборудование"}</span>
                </div>
                <div className="space-y-1.5 max-h-[310px] overflow-y-auto pr-1 no-scrollbar">
                  {equipmentCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/catalog?category=${c.id}`}
                      onClick={() => setCatalogMegaMenuOpen(false)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-900 border border-transparent hover:border-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy-900 group-hover:bg-blue-500/20 text-slate-300 group-hover:text-blue-400 flex items-center justify-center flex-shrink-0 transition-colors">
                        <CategoryIcon name={c.iconName} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors truncate">
                          {language === "kz" ? c.nameKz : c.nameRu}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {c.itemCount} {language === "kz" ? "модель" : "моделей"} • {language === "kz" ? "бағасы WhatsApp-та" : "цена по запросу"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Hand Tools (Инструмент) */}
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Wrench className="w-4 h-4" />
                  <span>{language === "kz" ? "Кәсіби құралдар" : "Электро- и бензоинструмент"}</span>
                </div>
                <div className="space-y-1.5">
                  {toolCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/catalog?category=${c.id}`}
                      onClick={() => setCatalogMegaMenuOpen(false)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-900 border border-transparent hover:border-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy-900 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 flex items-center justify-center flex-shrink-0 transition-colors">
                        <CategoryIcon name={c.iconName} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors truncate">
                          {language === "kz" ? c.nameKz : c.nameRu}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {c.itemCount} {language === "kz" ? "модель" : "моделей"} • {language === "kz" ? "бағасы WhatsApp-та" : "цена по запросу"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar of Mega menu */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === "kz" ? "180+ позиция қолжетімді" : "Все 180+ позиций проверены и в наличии"}</span>
                </span>
                <span>•</span>
                <span>{language === "kz" ? "Астана бойынша 2 сағатта жеткізу" : "Доставка по Астане за 2 часа"}</span>
              </div>

              <Link
                href="/catalog"
                onClick={() => setCatalogMegaMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-500/20"
              >
                <span>{language === "kz" ? "Барлық каталогқа өту" : "Перейти в полный каталог"}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 border-b border-white/10 px-4 py-4 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            {/* Mobile Catalog with Expandable Accordion */}
            <div className="border-b border-white/5 pb-2">
              <button
                type="button"
                onClick={() => setMobileCatalogExpanded(!mobileCatalogExpanded)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-navy-900 text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-brand-500" />
                  <span className="font-bold">{t.header.catalog} (12 {language === "kz" ? "санат" : "категорий"})</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    mobileCatalogExpanded ? "rotate-180 text-brand-400" : ""
                  }`}
                />
              </button>

              {mobileCatalogExpanded && (
                <div className="pl-4 pr-1 py-2 space-y-1 border-l-2 border-brand-500/30 ml-4 mt-1">
                  <Link
                    href="/catalog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-xs text-brand-400 font-bold hover:underline"
                  >
                    → {language === "kz" ? "Барлық каталог (180+ позиция)" : "Весь каталог (180+ позиций)"}
                  </Link>
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/catalog?category=${c.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-1.5 text-xs text-slate-300 hover:text-white"
                    >
                      <span className="truncate pr-2">{language === "kz" ? c.nameKz : c.nameRu}</span>
                      <span className="text-[10px] text-slate-500">
                        {c.itemCount} {language === "kz" ? "модель" : "моделей"}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg border-b border-white/5 hover:bg-navy-900 transition-colors ${
                  link.isPromo ? "text-amber-400 font-bold bg-amber-500/5" : "text-slate-200 hover:text-brand-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={link.isPromo ? "text-amber-400" : "text-brand-500"}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
