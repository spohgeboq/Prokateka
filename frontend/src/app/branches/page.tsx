"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language, translations } from "@/data/translations";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
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
} from "lucide-react";

export default function BranchesPage() {
  const [language, setLanguage] = useState<Language>("ru");
  const [copied, setCopied] = useState(false);
  const t = translations[language];

  const branchAddress =
    language === "kz"
      ? "Астана қ., Әбікен Бектұров көшесі, 4Г"
      : "г. Астана, ул. Абикена Бектурова, 4Г";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("г. Астана, ул. Абикена Бектурова, 4Г");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            {language === "kz" ? "Астанадағы филиал" : "Филиал в Астане"}
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {language === "kz"
                ? "Астана қ. ресми филиалы • Күн сайын 08:00 – 20:00"
                : "Официальный филиал в г. Астана • Открыто ежедневно 08:00 – 20:00"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            {language === "kz"
              ? "Астанадағы PROkateka құралдар мен жабдықтар қоймасы"
              : "Центр проката и склад оборудования PROkateka в Астане"}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {language === "kz"
              ? "Бірыңғай ресми пункт: қоймада 180+ дайын құрал бірлігі, беру алдындағы сынақ стенді, Бектұров көшесінен ыңғайлы кіру, тегін автотұрақ және қала бойынша 45 минутта жеткізу."
              : "Единая официальная база: более 180 единиц проверенного инструмента в наличии, стенд проверки перед выдачей, удобный заезд с улицы Бектурова, свободная парковка и доставка по Астане от 45 минут."}
          </p>
        </div>

        {/* Main Location Showcase (2 Columns: Specs & Actions + Interactive Map) */}
        <div className="bg-navy-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            {/* Left Col (7/12): Branch Info & Direct Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* 2GIS Trust Badge */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
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
                  PROkateka — {language === "kz" ? "Басты орталық" : "Главный филиал и склад"}
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
                      <div className="text-white font-bold">{branchAddress}</div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        {language === "kz"
                          ? "Бектұров көшесінен кіру, ғимараттың бүйір жағынан кіру, тегін автотұрақ"
                          : "Удобный заезд с ул. Бектурова, отдельный вход с торца здания, парковка"}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 bg-navy-900 border border-white/10 hover:border-brand-500/40 px-2.5 py-1.5 rounded-lg transition-all"
                      title="Скопировать адрес"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{language === "kz" ? "Көшірілді" : "Скопировано"}</span>
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
                        {language === "kz"
                          ? "Дүйсенбі – Жексенбі: 08:00 – 20:00 (Демалыссыз)"
                          : "Понедельник – Воскресенье: 08:00 – 20:00 (Без выходных)"}
                      </div>
                      <div className="text-emerald-400 text-xs mt-0.5 font-medium">
                        {language === "kz"
                          ? "Түскі үзіліссіз жұмыс істейміз"
                          : "Работаем без перерыва на обед и праздников"}
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
                        href="tel:+77056317887"
                        className="text-white hover:text-brand-400 font-bold text-base transition-colors"
                      >
                        +7 (705) 631-78-87
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
                  href="https://2gis.kz/astana/geo/70000001065108547"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#2ba300] hover:bg-[#269100] text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-[#2ba300]/20"
                >
                  <Navigation className="w-4 h-4 fill-white" />
                  <span>{language === "kz" ? "2GIS-те ашу (маршрут)" : "Открыть в 2GIS (маршрут)"}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>


                <a
                  href={`https://wa.me/${MANAGER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    language === "kz"
                      ? "Сәлеметсіз бе! Бектурова 4Г филиалында құрал бар ма екенін білгім келеді."
                      : "Здравствуйте! Хочу уточнить наличие инструмента на филиале Бектурова 4Г перед выездом."
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
                {/* Embedded Map Frame centered on Bekturova 4G, Astana */}
                <iframe
                  title="Карта филиала PROkateka в Астане"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=71.3850%2C51.1130%2C71.4090%2C51.1250&layer=mapnik&marker=51.11916%2C71.397411"
                  className="w-full h-full flex-1 border-0 filter contrast-125 brightness-90"
                  loading="lazy"
                />

                {/* Map Bottom Card Overlay */}
                <div className="p-4 bg-navy-950/95 border-t border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white text-xs font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      <span>PROkateka • ул. Бектурова 4Г</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      51.11916° N, 71.39741° E
                    </div>
                  </div>

                  <a
                    href="https://2gis.kz/astana/geo/70000001065108547"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    <span>2GIS карта</span>
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
                : "Что доступно на нашем филиале в Астане"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === "kz"
                ? "Қоймада жұмыс істеуге толық дайын, таза және кәсіби жабдықтар"
                : "Комфортный сервис для строителей, монтажников и частных мастеров"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
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

            {/* Feature 2 */}
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

            {/* Feature 3 */}
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

            {/* Feature 4 */}
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

            {/* Feature 5 */}
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

            {/* Feature 6 */}
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
            {/* Review 1 */}
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

            {/* Review 2 */}
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

            {/* Review 3 */}
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
            href={`https://wa.me/${MANAGER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              language === "kz"
                ? "Сәлеметсіз бе! Мен Бектурова 4Г филиалына келе жатырмын, құрал брондағым келеді."
                : "Здравствуйте! Планирую приехать на филиал Бектурова 4Г, хочу забронировать инструмент."
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
