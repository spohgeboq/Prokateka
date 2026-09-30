"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language, translations } from "@/data/translations";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { useData } from "@/context/DataContext";
import { BranchItem } from "@/lib/db";
import {
  MapPin,
  Clock,
  Navigation,
  Phone,
  Truck,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Star,
  MessageCircle,
  Building2,
  Sparkles,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";

export default function BranchesPage() {
  const [language, setLanguage] = useState<Language>("ru");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { branches: liveBranches, settings } = useData();

  const defaultBranches: BranchItem[] = [
    {
      id: "astana-bekturova",
      nameRu: "Склад выдачи Бектурова 4Г",
      nameKz: "Бектұров 4Г қоймасы",
      addressRu: "г. Астана, ул. Абикена Бектурова, 4Г (въезд с торца)",
      addressKz: "Астана қ., Әбікен Бектұров көш., 4Г",
      gisLink: "https://2gis.kz/astana/geo/70000001065108547",
      phone: "+7 705 503 6772",
      workingHoursRu: "Ежедневно: 08:00 – 20:00 (без перерывов)",
      workingHoursKz: "Күн сайын: 08:00 – 20:00 (үзіліссіз)",
      isMain: true,
    },
  ];

  const allBranches = useMemo(() => {
    return liveBranches && liveBranches.length > 0 ? liveBranches : defaultBranches;
  }, [liveBranches]);

  // Main branch is strictly the flagship on ул. Абикена Бектурова 4Г (isMain === true or id === 'astana-bekturova')
  const mainBranch = useMemo(() => {
    return (
      allBranches.find((b) => b.isMain || b.id === "astana-bekturova") || allBranches[0]
    );
  }, [allBranches]);

  // Additional branches are all other branches added by the admin (no duplication of main branch!)
  const additionalBranches = useMemo(() => {
    return allBranches.filter((b) => b.id !== mainBranch.id && !b.isMain);
  }, [allBranches, mainBranch]);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;
  const t = translations[language];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-brand-400 transition-colors">
            {language === "kz" ? "Басты бет" : "Главная"}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold">
            {language === "kz" ? "Филиалдар мен қоймалар" : "Филиалы и склады"}
          </span>
        </div>

        {/* Page Top Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            <span>
              {language === "kz"
                ? `Астана және маңы • 1 Басты қойма + ${additionalBranches.length} қосымша пункт`
                : `Сеть складов PROkateka • Центральная база + ${additionalBranches.length} доп. пункта`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            {language === "kz"
              ? "Филиалдар мен құрал-жабдықтарды алып кету орындары"
              : "Филиалы и пункты выдачи оборудования в Астане"}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {language === "kz"
              ? "Барлық техника жұмысқа толық дайын, беру алдында сынақтан өткізіледі. Өзіңізге ыңғайлы қоймадан алып кетіңіз немесе 45–60 минутта жедел жеткізуге тапсырыс беріңіз."
              : "Вся техника обслужена и готова к работе. Забирайте инструмент самовывозом из удобной точки или оформляйте курьерскую доставку по Астане за 45–60 минут."}
          </p>
        </div>

        {/* 1. TOP HERO SECTION: FLAGSHIP MAIN BRANCH (РЕАЛЬНО КРУТОЙ ГЛАВНЫЙ ФИЛИАЛ) */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-brand-500/30 bg-gradient-to-br from-navy-900 via-navy-920 to-navy-950 shadow-2xl shadow-brand-500/10">
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top highlight bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400" />

          <div className="p-6 sm:p-10 lg:p-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Column (7 cols): Main branch info, specs & actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      <span>{language === "kz" ? "Филиал №1 • Басты база" : "Филиал №1 • Главный филиал"}</span>
                    </span>

                    <a
                      href={mainBranch.gisLink || "https://2gis.kz/astana/geo/70000001065108547"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2ba300]/15 hover:bg-[#2ba300]/25 border border-[#2ba300]/30 text-emerald-400 text-xs font-bold transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#2ba300]" />
                      <span>2GIS 4.9</span>
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-slate-400 text-[10px] font-normal">(258+ отзывов)</span>
                    </a>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{language === "kz" ? "180+ құрал дайын" : "180+ позиций в наличии"}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                    PROkateka — {language === "kz" ? mainBranch.nameKz : mainBranch.nameRu}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-medium">
                    {language === "kz"
                      ? "Астанадағы ең ірі прокат орталығы. Құралдар мен ауыр құрылыс жабдықтарының толық ассортименті, жедел беру стенді және ыңғайлы көлік кіруі."
                      : "Центральная база проката в Астане: строительное оборудование, отбойные молотки, генераторы, виброплиты, бетоноломы и спецтехника с экипажем."}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {/* Address Card */}
                    <div className="sm:col-span-2 p-3.5 rounded-2xl bg-navy-950/80 border border-white/10 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                            {language === "kz" ? "Басты мекенжай" : "Точный адрес центрального склада"}
                          </div>
                          <div className="text-white font-bold text-sm sm:text-base leading-snug">
                            {language === "kz" ? mainBranch.addressKz : mainBranch.addressRu}
                          </div>
                          <div className="text-slate-400 text-xs mt-0.5">
                            {language === "kz"
                              ? "Кез келген көлікке арналған кең парковка, ғимараттың торцынан кіру"
                              : "Удобный подъезд для грузового и легкового авто, парковка, выдача за 3 минуты"}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            language === "kz" ? mainBranch.addressKz : mainBranch.addressRu,
                            "flagship-copy"
                          )
                        }
                        className="inline-flex items-center gap-1.5 p-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-300 hover:text-white border border-white/10 flex-shrink-0 transition-colors text-xs font-semibold"
                        title={language === "kz" ? "Мекенжайды көшіру" : "Скопировать адрес"}
                      >
                        {copiedId === "flagship-copy" ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 text-xs">
                              {language === "kz" ? "Көшірілді" : "Скопировано"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-400" />
                            <span className="hidden sm:inline">
                              {language === "kz" ? "Көшіру" : "Копировать"}
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Schedule Card */}
                    <div className="p-3.5 rounded-2xl bg-navy-950/80 border border-white/10 flex items-start gap-3">
                      <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                          {language === "kz" ? "Жұмыс режимі" : "Режим работы"}
                        </div>
                        <div className="text-white font-bold text-xs sm:text-sm">
                          {language === "kz" ? mainBranch.workingHoursKz : mainBranch.workingHoursRu}
                        </div>
                        <div className="text-emerald-400 text-[11px] font-medium mt-0.5">
                          {language === "kz" ? "Үзіліссіз және демалыссыз" : "Без перерыва на обед и выходных"}
                        </div>
                      </div>
                    </div>

                    {/* Direct Phone Card */}
                    <div className="p-3.5 rounded-2xl bg-navy-950/80 border border-white/10 flex items-start gap-3">
                      <Phone className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                          {language === "kz" ? "Қойма телефоны" : "Прямая связь со складом"}
                        </div>
                        <a
                          href={`tel:${mainBranch.phone.replace(/[^0-9+]/g, "")}`}
                          className="text-white hover:text-brand-400 font-bold text-xs sm:text-sm transition-colors block"
                        >
                          {mainBranch.phone}
                        </a>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {language === "kz" ? "1 минутта техниканы брондау" : "Бронь инструмента за 1 минуту"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery & Deposit Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 mb-6">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-950/40 border border-white/5">
                      <Truck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                      <span>
                        {language === "kz"
                          ? "Жеткізу: 1 000 ₸ бастап (45–60 минут)"
                          : "Курьерская доставка от 1 000 ₸ (45–60 мин)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-950/40 border border-white/5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>
                        {language === "kz"
                          ? "Кепілақысыз (қымбат құралдарды қоспағанда)"
                          : "Без залога (кроме проф. дорогого инструмента)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={mainBranch.gisLink || "https://2gis.kz/astana/geo/70000001065108547"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#2ba300] hover:bg-[#269100] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-[#2ba300]/25"
                  >
                    <Navigation className="w-4 h-4 fill-white" />
                    <span>{language === "kz" ? "2GIS-тен ашу (маршрут)" : "Открыть в 2GIS (маршрут)"}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </a>

                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                      language === "kz"
                        ? "Сәлеметсіз бе! Бектурова 4Г басты қоймасы бойынша сұрағым бар еді."
                        : "Здравствуйте! Интересует наличие инструмента на главном складе (Бектурова 4Г)."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/30"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{language === "kz" ? "WhatsApp арқылы брондау" : "Написать в WhatsApp"}</span>
                  </a>

                  <a
                    href={`tel:${mainBranch.phone.replace(/[^0-9+]/g, "")}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-white/10 font-bold px-5 py-3.5 rounded-xl text-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-brand-400" />
                    <span>{language === "kz" ? "Қоңырау шалу" : "Позвонить"}</span>
                  </a>
                </div>
              </div>

              {/* Right Column (5 cols): Large High-Tech Map Frame */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-white/15 bg-navy-950 flex flex-col shadow-inner">
                  {/* Embedded OpenStreetMap / interactive map */}
                  <iframe
                    title="Карта главного склада PROkateka в Астане"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=71.3850%2C51.1130%2C71.4090%2C51.1250&layer=mapnik&marker=51.11916%2C71.397411"
                    className="w-full h-full flex-1 border-0 filter contrast-125 brightness-90 min-h-[300px]"
                    loading="lazy"
                  />

                  {/* Map Bottom Card Overlay */}
                  <div className="p-4 bg-navy-950/95 border-t border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 truncate">
                        <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                        <span className="truncate">PROkateka • ул. Абикена Бектурова, 4Г</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {language === "kz" ? "Астана қаласы, Есіл ауданы" : "Астана, Есильский район"}
                      </div>
                    </div>

                    <a
                      href={mainBranch.gisLink || "https://2gis.kz/astana/geo/70000001065108547"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2ba300] hover:bg-[#269100] text-white text-xs font-bold transition-colors flex-shrink-0 shadow-sm"
                    >
                      <span>2GIS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2. BOTTOM SECTION: ADDITIONAL BRANCHES (ФОТО 4 СТИЛЬ - ТОЛЬКО НОВЫЕ/ДОПОЛНИТЕЛЬНЫЕ ТОЧКИ) */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === "kz" ? "Қосымша алып кету орындары" : "Дополнительные пункты выдачи"}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {language === "kz"
                  ? `Астана және маңындағы филиалдар (${additionalBranches.length})`
                  : `Филиалы для самовывоза в Астане и пригороде (${additionalBranches.length})`}
              </h2>
            </div>

            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {language === "kz"
                ? "Администратор қосқан жаңа қоймалар"
                : "Новые склады, добавленные для вашего удобства"}
            </span>
          </div>

          {additionalBranches.length === 0 ? (
            <div className="p-8 rounded-2xl bg-navy-900 border border-white/10 text-center max-w-lg mx-auto">
              <Building2 className="w-8 h-8 text-brand-400 mx-auto mb-2 opacity-60" />
              <p className="text-slate-300 text-sm">
                {language === "kz"
                  ? "Барлық құралдар қазіргі уақытта Бектурова 4Г басты қоймасында қолжетімді."
                  : "Все оборудование в настоящее время выдается с нашего центрального склада на Бектурова 4Г."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalBranches.map((b, idx) => {
                const branchNumber = idx + 2; // №1 is the Main Branch on top, so additional start from №2!
                const name = language === "kz" ? b.nameKz : b.nameRu;
                const address = language === "kz" ? b.addressKz : b.addressRu;
                const hours = language === "kz" ? b.workingHoursKz : b.workingHoursRu;
                const tagRu = "Электро- и бензоинструмент";
                const tagKz = "Қол электр құралдары";

                return (
                  <div
                    key={b.id}
                    className="p-6 sm:p-7 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/40 transition-all flex flex-col justify-between shadow-lg hover:shadow-brand-500/5 group"
                  >
                    <div>
                      {/* Top Badge: Филиал №2, Филиал №3 etc. (Photo 4 style) */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>
                          {language === "kz" ? `${branchNumber}-филиал` : `Филиал №${branchNumber}`}
                        </span>
                      </div>

                      {/* Branch Name */}
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-3 group-hover:text-brand-400 transition-colors">
                        {name}
                      </h3>

                      {/* Address with copy button */}
                      <div className="p-3 rounded-xl bg-navy-950/70 border border-white/5 mb-3 flex items-start justify-between gap-2">
                        <p className="text-slate-300 text-sm flex items-start gap-2 min-w-0">
                          <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{address}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopy(address, b.id)}
                          className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-slate-400 hover:text-white border border-white/10 flex-shrink-0 transition-colors"
                          title={language === "kz" ? "Мекенжайды көшіру" : "Скопировать адрес"}
                        >
                          {copiedId === b.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Working Hours */}
                      <p className="text-slate-400 text-xs flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{hours}</span>
                      </p>

                      {/* Phone */}
                      {b.phone && (
                        <p className="text-slate-400 text-xs flex items-center gap-2 mb-6">
                          <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                          <a
                            href={`tel:${b.phone.replace(/[^0-9+]/g, "")}`}
                            className="text-slate-200 hover:text-brand-400 font-semibold transition-colors"
                          >
                            {b.phone}
                          </a>
                        </p>
                      )}
                    </div>

                    {/* Bottom Bar: 2GIS, WhatsApp, and Tag */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={b.gisLink || "https://2gis.kz/astana"}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#2ba300] hover:bg-[#269100] text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-colors shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5 fill-white" />
                          <span>{language === "kz" ? "2GIS-тен ашу" : "Открыть в 2GIS"}</span>
                          <ExternalLink className="w-3 h-3 text-white/80" />
                        </a>

                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                            language === "kz"
                              ? `Сәлеметсіз бе! «${name}» филиалы бойынша сұрағым бар.`
                              : `Здравствуйте! Интересует наличие инструмента на филиале «${name}».`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold py-2 px-3 rounded-xl text-xs transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <span className="text-xs text-slate-400 font-medium">
                        {language === "kz" ? tagKz : tagRu}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
