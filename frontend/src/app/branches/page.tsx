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
  CheckCircle2,
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

  // Guarantee that the main branch (Бектурова 4Г) is strictly first (Филиал №1),
  // and all branches added by admin appear sequentially below it (Филиал №2, №3, etc.)
  const sortedBranches = useMemo(() => {
    const raw = liveBranches && liveBranches.length > 0 ? liveBranches : defaultBranches;
    return [...raw].sort((a, b) => {
      if (a.isMain || a.id === "astana-bekturova") return -1;
      if (b.isMain || b.id === "astana-bekturova") return 1;
      return 0;
    });
  }, [liveBranches]);

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

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>
              {language === "kz"
                ? `Астана қ. және маңы бойынша ${sortedBranches.length} пункт`
                : `Сеть складов и пунктов выдачи PROkateka • Всего: ${sortedBranches.length}`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            {language === "kz" ? "Филиалдар мен алып кету орындары" : "Филиалы и склады выдачи оборудования"}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {language === "kz"
              ? "Құралды өзіңізге ең жақын қоймадан алып кетуге немесе Астана қаласы бойынша 45-60 минутта жедел жеткізуге тапсырыс бере аласыз."
              : "Заберите инструмент самовывозом из удобной для вас точки или закажите оперативную курьерскую доставку по Астане за 45–60 минут."}
          </p>
        </div>

        {/* Branches Grid (Matches Photo 4: 2 columns, beautiful cards, sequential order) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sortedBranches.map((b, idx) => {
            const isMainBranch = idx === 0 || b.isMain;
            const name = language === "kz" ? b.nameKz : b.nameRu;
            const address = language === "kz" ? b.addressKz : b.addressRu;
            const hours = language === "kz" ? b.workingHoursKz : b.workingHoursRu;
            const tagRu = isMainBranch ? "Легкий инструмент + спецтехника" : "Электро- и бензоинструмент";
            const tagKz = isMainBranch ? "Жеңіл және ауыр техника" : "Қол электр құралдары";

            return (
              <div
                key={b.id}
                className="p-6 sm:p-7 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/40 transition-all flex flex-col justify-between shadow-lg hover:shadow-brand-500/5 group"
              >
                <div>
                  {/* Top Badge: Филиал №1 / Филиал №2 etc. */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {language === "kz"
                          ? isMainBranch
                            ? "1-филиал (Басты қойма)"
                            : `${idx + 1}-филиал`
                          : isMainBranch
                          ? "Филиал №1 (Главный склад)"
                          : `Филиал №${idx + 1}`}
                      </span>
                    </div>

                    {isMainBranch && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        {language === "kz" ? "Негізгі нүкте" : "Основная база"}
                      </span>
                    )}
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
                          ? `Сәлеметсіз бе! «${name}» филиалында құрал бар ма екенін білгім келеді.`
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

        {/* Map & Delivery Overview Banner */}
        <div className="bg-navy-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <a
                  href="https://2gis.kz/astana/geo/70000001065108547"
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
                </a>

                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-navy-950 px-3 py-1 rounded-xl border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                  <span>{language === "kz" ? "Сенімді прокат" : "Проверенный сервис"}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {language === "kz" ? "Астана бойынша жедел жеткізу" : "Доставка по всем районам Астаны от 1 000 ₸"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === "kz"
                  ? "Қоймаға баруға уақытыңыз болмаса, біз құралды құрылыс нысанына дейін 45–60 минутта курьермен жеткізіп береміз. Ауыр техника мен станоктар борттық көлікпен тасымалданады."
                  : "Если нет возможности заехать на склад, мы оперативно доставим инструмент на ваш объект курьером за 45–60 минут. Оборудование и спецтехника доставляются бортовым транспортом."}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    language === "kz"
                      ? "Сәлеметсіз бе! Маған құралды жеткізу бойынша кеңес қажет."
                      : "Здравствуйте! Нужна доставка инструмента, подскажите по наличию и времени."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{language === "kz" ? "WhatsApp арқылы жеткізуге тапсырыс" : "Заказать доставку в WhatsApp"}</span>
                </a>

                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-white/10 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <span>{language === "kz" ? "Каталогты қарау" : "Смотреть каталог техники"}</span>
                </Link>
              </div>
            </div>

            {/* Right Map Preview */}
            <div className="lg:col-span-5">
              <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/15 bg-navy-950">
                <iframe
                  title="Карта PROkateka в Астане"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=71.3850%2C51.1130%2C71.4090%2C51.1250&layer=mapnik&marker=51.11916%2C71.397411"
                  className="w-full h-full border-0 filter contrast-125 brightness-90"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 p-2.5 bg-navy-950/90 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-white font-semibold truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                    <span className="truncate">PROkateka • ул. Абикена Бектурова, 4Г</span>
                  </div>
                  <a
                    href="https://2gis.kz/astana/geo/70000001065108547"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2ba300] hover:underline font-bold flex-shrink-0 ml-2"
                  >
                    2GIS →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
