"use client";

import React, { useState } from "react";
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
  Wrench,
  CheckCircle2,
  Star,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
  Sparkles,
  MessageCircle,
  Car,
  ArrowRight,
  Building2,
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

  const branchesToRender: BranchItem[] =
    liveBranches && liveBranches.length > 0 ? liveBranches : defaultBranches;

  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    branchesToRender[0]?.id || "astana-bekturova"
  );

  const currentBranch =
    branchesToRender.find((b) => b.id === selectedBranchId) || branchesToRender[0];

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;

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

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {language === "kz"
                ? `Астана қ. ресми қоймалары • Барлығы: ${branchesToRender.length} нүкте`
                : `Официальные филиалы и пункты выдачи в г. Астана • Всего: ${branchesToRender.length}`}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            {language === "kz"
              ? "Астанадағы PROkateka құралдар мен жабдықтар қоймалары"
              : "Филиалы и центры проката оборудования PROkateka в Астане"}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {language === "kz"
              ? "Қоймаларымызда 180+ дайын құрал бірлігі, беру алдындағы сынақ стенді, ыңғайлы көлік кіруі, тегін автотұрақ және қала бойынша 45 минутта жеткізу бар."
              : "Все филиалы оборудованы стендом проверки перед выдачей, удобным заездом для любого транспорта, парковкой и доставкой по Астане от 45 минут."}
          </p>
        </div>

        {/* All Branches Cards Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {language === "kz" ? "Біздің мекенжайлар" : "Адреса пунктов выдачи"}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {branchesToRender.length} {language === "kz" ? "қойма" : "склада"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branchesToRender.map((b, idx) => {
              const isSelected = b.id === currentBranch.id;
              const name = language === "kz" ? b.nameKz : b.nameRu;
              const address = language === "kz" ? b.addressKz : b.addressRu;
              const hours = language === "kz" ? b.workingHoursKz : b.workingHoursRu;

              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? "bg-navy-900 border-brand-500 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/50"
                      : "bg-navy-900/80 hover:bg-navy-900 border-white/10 hover:border-white/25"
                  }`}
                >
                  <div>
                    {/* Top Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          b.isMain
                            ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                            : "bg-white/5 text-slate-300 border border-white/10"
                        }`}
                      >
                        {b.isMain
                          ? language === "kz"
                            ? "Басты филиал"
                            : "Главный филиал"
                          : language === "kz"
                          ? `${idx + 1}-бөлімше`
                          : `Филиал №${idx + 1}`}
                      </span>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === "kz" ? "Таңдалған" : "Выбран"}</span>
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-white font-bold text-base sm:text-lg mb-3 leading-snug">
                      {name}
                    </h3>

                    {/* Address with copy button */}
                    <div className="p-3 rounded-xl bg-navy-950/80 border border-white/5 mb-3 flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 leading-relaxed font-medium">
                          {address}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(address, b.id);
                        }}
                        className="p-1 rounded-lg bg-navy-900 hover:bg-navy-800 text-slate-400 hover:text-white border border-white/10 flex-shrink-0 transition-colors"
                        title="Скопировать адрес"
                      >
                        {copiedId === b.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-2 text-xs text-slate-300 mb-2">
                      <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{hours}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-xs text-slate-300 mb-4">
                      <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                      <a
                        href={`tel:${b.phone.replace(/[^0-9+]/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:text-brand-400 font-semibold transition-colors"
                      >
                        {b.phone}
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                    <a
                      href={b.gisLink || "https://2gis.kz/astana"}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#2ba300] hover:bg-[#269100] text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-white" />
                      <span>2GIS</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>

                    <a
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                        language === "kz"
                          ? `Сәлеметсіз бе! «${name}» филиалы бойынша сұрағым бар.`
                          : `Здравствуйте! Интересует наличие инструмента на филиале: «${name}».`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold py-2 px-3 rounded-xl text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Branch Showcase & Map */}
        <div className="bg-navy-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            {/* Left Col (7/12): Branch Info & Direct Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* 2GIS Trust Badge */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <a
                    href={currentBranch.gisLink || "https://2gis.kz/astana"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#2ba300]/15 hover:bg-[#2ba300]/25 border border-[#2ba300]/30 text-emerald-400 px-3 py-1 rounded-xl text-xs font-bold transition-colors"
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
                    <span className="text-slate-400 text-[11px] font-normal">
                      (258+ {language === "kz" ? "пікір" : "отзывов"})
                    </span>
                  </a>

                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-navy-950 px-3 py-1 rounded-xl border border-white/5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                    <span>{language === "kz" ? "Тексерілген ұйым" : "Проверенная компания"}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  PROkateka — {language === "kz" ? currentBranch.nameKz : currentBranch.nameRu}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {language === "kz"
                    ? "Құрылыс, жөндеу және монтаж жұмыстарына арналған кәсіби құралдар мен жабдықтарды тез әрі сенімді жалға беру орталығы."
                    : "Специализированный центр проката электро- и бензоинструмента, оборудования для бетона, генераторов и строительной техники."}
                </p>

                {/* Key Location Parameters */}
                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3 bg-navy-950/80 p-3.5 rounded-2xl border border-white/5">
                    <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                        {language === "kz" ? "Мекенжайы" : "Точный адрес филиала"}
                      </div>
                      <div className="text-white font-bold">
                        {language === "kz" ? currentBranch.addressKz : currentBranch.addressRu}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        {language === "kz"
                          ? "Көлікке ыңғайлы кіру, тегін автотұрақ және жедел беру"
                          : "Удобный заезд, парковка и оперативная выдача оборудования"}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(
                          language === "kz" ? currentBranch.addressKz : currentBranch.addressRu,
                          "main-showcase"
                        )
                      }
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 bg-navy-900 border border-white/10 hover:border-brand-500/40 px-2.5 py-1.5 rounded-lg transition-all"
                      title="Скопировать адрес"
                    >
                      {copiedId === "main-showcase" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">
                            {language === "kz" ? "Көшірілді" : "Скопировано"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{language === "kz" ? "Көшіру" : "Копировать"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-3 bg-navy-950/80 p-3.5 rounded-2xl border border-white/5">
                    <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                        {language === "kz" ? "Жұмыс кестесі" : "Режим работы пункта выдачи"}
                      </div>
                      <div className="text-white font-bold">
                        {language === "kz" ? currentBranch.workingHoursKz : currentBranch.workingHoursRu}
                      </div>
                      <div className="text-emerald-400 text-xs mt-0.5 font-medium">
                        {language === "kz"
                          ? "Демалыссыз және түскі үзіліссіз жұмыс істейміз"
                          : "Работаем без перерыва на обед и выходных"}
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Phone */}
                  <div className="flex items-start gap-3 bg-navy-950/80 p-3.5 rounded-2xl border border-white/5">
                    <Phone className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                        {language === "kz" ? "Тікелей байланыс телефоны" : "Прямая связь со складом"}
                      </div>
                      <a
                        href={`tel:${currentBranch.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-white hover:text-brand-400 font-bold text-base transition-colors"
                      >
                        {currentBranch.phone}
                      </a>
                      <div className="text-slate-400 text-xs mt-0.5">
                        {language === "kz"
                          ? "Қоймадағы техниканың барын телефон арқылы 1 минутта растаймыз"
                          : "Подтверждение наличия инструмента по звонку за 1 минуту"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={currentBranch.gisLink || "https://2gis.kz/astana"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#2ba300] hover:bg-[#269100] text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-[#2ba300]/20"
                >
                  <Navigation className="w-4 h-4 fill-white" />
                  <span>{language === "kz" ? "2GIS-те ашу (маршрут)" : "Открыть в 2GIS (маршрут)"}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>

                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    language === "kz"
                      ? `Сәлеметсіз бе! «${currentBranch.nameKz}» филиалында құрал бар ма екенін білгім келеді.`
                      : `Здравствуйте! Хочу уточнить наличие инструмента на филиале «${currentBranch.nameRu}» перед выездом.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{language === "kz" ? "WhatsApp-қа жазу" : "Написать в WhatsApp"}</span>
                </a>
              </div>
            </div>

            {/* Right Col (5/12): Live Map Integration */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-white/15 bg-navy-950 flex flex-col shadow-inner">
                {/* Embedded Map Frame */}
                <iframe
                  title="Карта филиала PROkateka в Астане"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=71.3850%2C51.1130%2C71.4090%2C51.1250&layer=mapnik&marker=51.11916%2C71.397411"
                  className="w-full h-full flex-1 border-0 filter contrast-125 brightness-90 min-h-[300px]"
                  loading="lazy"
                />

                {/* Map Bottom Card Overlay */}
                <div className="p-4 bg-navy-950/95 border-t border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white text-xs font-bold flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span className="truncate">PROkateka • {currentBranch.nameRu}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {currentBranch.addressRu}
                    </div>
                  </div>

                  <a
                    href={currentBranch.gisLink || "https://2gis.kz/astana"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors flex-shrink-0"
                  >
                    <span>2GIS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Advantages of Picking Up at this Branch */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {language === "kz"
                ? "Филиалдан құрал алудың артықшылықтары"
                : "Что доступно на наших филиалах в Астане"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === "kz"
                ? "Қоймада жұмыс істеуге толық дайын, таза және кәсіби жабдықтар"
                : "Комфортный сервис для строителей, монтажников и частных мастеров"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {language === "kz"
                    ? "Сынақ стендінде тексеру"
                    : "Стенд проверки перед выдачей"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Әрбір құрал сіздің көзіңізше іске қосылып, барлық функциялары толық тексеріледі."
                    : "Каждый инструмент запускается и тестируется под нагрузкой в вашем присутствии перед подписанием договора."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {language === "kz"
                    ? "180+ құрал түрі қолма-қол"
                    : "180+ единиц техники в наличии"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Перфораторлар, виброплиталар, генераторлар, шаңсорғыштар, нивелирлер және кескіштер."
                    : "Широкий парк: отбойные молотки, бензорезы, мотопомпы, лазерные уровни и тепловые пушки."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {language === "kz"
                    ? "Шығын материалдары бар"
                    : "Магазин оснастки и расходников"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Бұрғылар, алмаз дискілері, майлар, пышақтар мен қорғаныс құралдары осында сатылады."
                    : "Буры SDS, алмазные диски по бетону, пильные цепи, масло 2Т/4Т и СИЗ прямо на складе."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {language === "kz"
                    ? "2 минутта жылдам ресімдеу"
                    : "Оформление за 2 минуты"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Жеке куәлік немесе Kaspi арқылы қағазбастылықсыз электронды келісімшарт."
                    : "Быстрый договор по удостоверению личности или для ТОО/ИП с закрывающими документами."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {language === "kz"
                    ? "Тиеуге тегін көмек"
                    : "Помощь при погрузке в авто"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Біздің қызметкерлер ауыр виброплитаны немесе генераторды көлігіңізге тиеуге көмектеседі."
                    : "Сотрудники склада аккуратно помогут погрузить тяжелое оборудование в ваш багажник или кузов."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {language === "kz"
                    ? "Астана бойынша жедел жеткізу"
                    : "Экспресс-доставка по Астане"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Егер келуге уақыт болмаса, құралды 45-60 минутта нысаныңызға жеткізіп береміз."
                    : "Если нет возможности приехать лично — доставим оборудование на стройплощадку за 45 минут."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real 2GIS Customer Reviews Section */}
        <div className="bg-navy-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span>2GIS Отзывы</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === "kz"
                  ? "Клиенттер біз туралы не айтады"
                  : "Реальные отзывы клиентов в 2GIS"}
              </h3>
            </div>

            <a
              href="https://2gis.kz/astana/geo/70000001065108547"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs border border-white/10 transition-colors self-start md:self-auto"
            >
              <span>{language === "kz" ? "2GIS-тегі барлық 258+ пікірді оқу" : "Читать все 258+ отзывов в 2GIS"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-navy-950 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-sm">Бауыржан С.</span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  «Отличный прокат в Астане! Брал отбойный молоток Bosch на 2 дня. Инструмент в идеале, чистый, выдали за пару минут. Залог вернули сразу после сдачи.»
                </p>
              </div>
              <div className="text-[11px] text-slate-500 mt-4">2GIS Проверенный отзыв</div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-950 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-sm">Арман Т.</span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  «Брали виброплиту и генератор для заливки фундамента. Все завели и проверили при нас на складе на Бектурова. Ребята профи, подсказали по маслу.»
                </p>
              </div>
              <div className="text-[11px] text-slate-500 mt-4">2GIS Проверенный отзыв</div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-950 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-sm">Ерлан М.</span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  «Удобный подъезд на машине, прямо возле входа припарковался. Оформили через Kaspi за 2 минуты, расходники тут же докупил. 10 из 10.»
                </p>
              </div>
              <div className="text-[11px] text-slate-500 mt-4">2GIS Проверенный отзыв</div>
            </div>
          </div>
        </div>

        {/* Pre-Visit WhatsApp CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-850 border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              {language === "kz"
                ? "Филиалға келуді жоспарлап отырсыз ба?"
                : "Планируете приехать на филиал за инструментом?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === "kz"
                ? "WhatsApp-қа алдын ала жазыңыз — біз қажетті техниканы брондап, сіз келгенше тексеріп дайындап қоямыз."
                : "Напишите в WhatsApp перед выездом — менеджер моментально забронирует технику и подготовит её к выдаче, чтобы вы не теряли ни минуты."}
            </p>
          </div>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
              language === "kz"
                ? `Сәлеметсіз бе! Мен «${currentBranch.nameKz}» филиалына келе жатырмын, құрал брондағым келеді.`
                : `Здравствуйте! Планирую приехать на филиал «${currentBranch.nameRu}», хочу забронировать инструмент.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-950/50 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{language === "kz" ? "Алдын ала брондау" : "Забронировать перед выездом"}</span>
          </a>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
