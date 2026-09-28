"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language } from "@/data/translations";
import { PROMOTIONS, Promotion } from "@/data/promotions";
import {
  Tag,
  Gift,
  Calendar,
  Building2,
  Truck,
  Layers,
  Percent,
  Clock,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { useData } from "@/context/DataContext";

export default function PromotionsPage() {
  const { promotions: livePromotions, settings } = useData();
  const [language, setLanguage] = useState<Language>("ru");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelRu: "Все акции", labelKz: "Барлық акциялар" },
    { id: "tools", labelRu: "Инструменты", labelKz: "Құралдар" },
    { id: "equipment", labelRu: "Оборудование", labelKz: "Жабдықтар" },
    { id: "packages", labelRu: "Комплекты", labelKz: "Жиынтықтар" },
    { id: "business", labelRu: "Для бизнеса (B2B)", labelKz: "Бизнес үшін (B2B)" },
  ];

  // Map CMS dynamic promotions if available, or fallback to default PROMOTIONS
  const activeCMSPromos: Promotion[] = (livePromotions && livePromotions.length > 0)
    ? livePromotions.filter((p) => p.isActive).map((p) => ({
        id: p.id,
        category: "tools" as const,
        badgeRu: p.badgeRu || (p.type === "x_plus_y" ? `Акция ${p.payDays}+${p.freeDays}` : "Спецпредложение"),
        badgeKz: p.badgeKz || (p.type === "x_plus_y" ? `${p.payDays}+${p.freeDays} акциясы` : "Арнайы ұсыныс"),
        discount: p.type === "x_plus_y" ? `+${p.freeDays} дн. бесплатно` : "Скидка",
        catalogQuery: "all",
        titleRu: p.titleRu,
        titleKz: p.titleKz,
        subtitleRu: p.subtitleRu || (p.type === "x_plus_y" ? `Оплачиваете ${p.payDays} суток — ${p.freeDays} суток получаете бесплатно` : "Выгодные условия аренды"),
        subtitleKz: p.subtitleKz || (p.type === "x_plus_y" ? `${p.payDays} тәулік төлесеңіз — ${p.freeDays} тәулік тегін беріледі` : "Жалға алудың тиімді шарттары"),
        descriptionRu: p.descriptionRu,
        descriptionKz: p.descriptionKz,
        benefitHighlightRu: p.type === "x_plus_y" ? `${p.freeDays} суток бесплатно` : "Экономия до 25%",
        benefitHighlightKz: p.type === "x_plus_y" ? `${p.freeDays} тәулік тегін` : "25%-ға дейін үнемдеу",
        iconName: "Gift" as const,
        whatsappMessageRu: `Здравствуйте! Хочу воспользоваться акцией «${p.titleRu}». Подскажите условия бронирования.`,
        whatsappMessageKz: `Сәлеметсіз бе! Мені «${p.titleKz}» акциясы қызықтырады. Шарттарын айтып жібересіз бе?`,
        conditionsRu: [
          "Распространяется на строительное оборудование и инструмент",
          "Действует во всех филиалах сети PROkateka",
          "Возвратный залог и доставка рассчитываются стандартно",
        ],
        conditionsKz: [
          "Құрылыс жабдықтары мен құралдарға жарамды",
          "PROkateka желісінің барлық филиалдарында қолжетімді",
          "Кепілақы мен жеткізу стандартты есептеледі",
        ],
      }))
    : PROMOTIONS;

  const filteredPromotions = selectedCategory === "all"
    ? activeCMSPromos
    : activeCMSPromos.filter((p) => p.category === selectedCategory);

  const handleWhatsappClaim = (promo: Promotion) => {
    const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;
    const text = encodeURIComponent(
      language === "kz" ? promo.whatsappMessageKz : promo.whatsappMessageRu
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
  };

  const getPromoIcon = (iconName: Promotion["iconName"]) => {
    switch (iconName) {
      case "Gift":
        return <Gift className="w-5 h-5 text-amber-400" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-sky-400" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      case "Truck":
        return <Truck className="w-5 h-5 text-brand-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-purple-400" />;
      case "Percent":
      default:
        return <Percent className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-navy-950">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              {language === "kz" ? "Басты бет" : "Главная"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-brand-400 font-medium">
              {language === "kz" ? "Акциялар мен арнайы ұсыныстар" : "Акции и спецпредложения"}
            </span>
          </nav>

          {/* Hero Banner Header */}
          <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-10 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>
                  {language === "kz"
                    ? "Тиімді шарттар • 25%-ға дейін үнемдеу"
                    : "Выгодные условия • Экономия до 25%"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {language === "kz" ? (
                  <>
                    ҚҰРЫЛЫС ТЕХНИКАСЫ МЕН ҚҰРАЛДАРЫНА{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-300">
                      АРНАЙЫ АКЦИЯЛАР
                    </span>
                  </>
                ) : (
                  <>
                    АКЦИИ И СПЕЦПРЕДЛОЖЕНИЯ НА{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-300">
                      АРЕНДУ ТЕХНИКИ
                    </span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === "kz"
                  ? "Құралдар мен ауыр техниканы тиімді шарттармен жалға алыңыз: 3+1 сыйлық күні, демалыс күндеріне арналған Weekend тарифі, заңды тұлғаларға арнайы жеңілдіктер және Астана бойынша тегін жеткізу."
                  : "Пользуйтесь проверенным оборудованием с максимальной выгодой: акция 3+1 (4-й день бесплатно), тариф Weekend на выходные, скидки до 20% для строительных компаний и бесплатная доставка на объект."}
              </p>
            </div>

            {/* Quick 3 Value Props Bar (Inspired by the Reference Banner) */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-navy-900/60 p-3.5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {language === "kz" ? "Ыңғайлы жеткізу" : "Выгодные условия доставки"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {language === "kz" ? "Астана бойынша 2 сағатта" : "От 2 часов прямо на объект"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-navy-900/60 p-3.5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {language === "kz" ? "2 минутта ресімдеу" : "Оформление за 2 минуты"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {language === "kz" ? "WhatsApp немесе онлайн" : "Через WhatsApp или онлайн"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-navy-900/60 p-3.5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {language === "kz" ? "2 сағатта ауыстыру" : "Замена при поломке за 2 ч"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {language === "kz" ? "Тез жөндеу немесе жаңа құрал" : "Быстрый ремонт или замена"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/25 scale-[1.02]"
                    : "bg-navy-900 text-slate-300 hover:text-white hover:bg-navy-850 border border-white/10"
                }`}
              >
                {language === "kz" ? cat.labelKz : cat.labelRu}
              </button>
            ))}
          </div>

          {/* Promotions Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {filteredPromotions.map((promo) => (
              <div
                key={promo.id}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent top glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 group-hover:bg-brand-500/15 rounded-full blur-2xl transition-all pointer-events-none" />

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-navy-900 border border-white/10 flex items-center justify-center flex-shrink-0">
                        {getPromoIcon(promo.iconName)}
                      </div>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        {language === "kz" ? promo.badgeKz : promo.badgeRu}
                      </span>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
                      {promo.discount}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {language === "kz" ? promo.titleKz : promo.titleRu}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-300/90 font-medium mb-3">
                    {language === "kz" ? promo.subtitleKz : promo.subtitleRu}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {language === "kz" ? promo.descriptionKz : promo.descriptionRu}
                  </p>

                  {/* Conditions List */}
                  <div className="space-y-2 mb-6 bg-navy-900/70 rounded-2xl p-4 border border-white/5">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      {language === "kz" ? "Акция шарттары:" : "Условия акции:"}
                    </div>
                    {(language === "kz" ? promo.conditionsKz : promo.conditionsRu).map((c, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculation / Savings Showcase */}
                  {promo.calculation && (
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-850 border border-brand-500/20">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>{language === "kz" ? "Мысал есептеу:" : "Пример выгоды:"}</span>
                        <span className="font-semibold text-white">
                          {language === "kz" ? promo.calculation.periodKz : promo.calculation.periodRu}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-200 mb-2 truncate">
                        {language === "kz" ? promo.calculation.itemTitleKz : promo.calculation.itemTitleRu}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-slate-500 line-through text-xs">
                            {promo.calculation.oldPrice.toLocaleString("ru-RU")} ₸
                          </span>
                          <span className="text-base sm:text-lg font-black text-brand-400">
                            {promo.calculation.newPrice.toLocaleString("ru-RU")} ₸
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">
                            {language === "kz" ? "Үнемдеу:" : "Экономия:"}
                          </span>
                          <span className="text-xs font-black text-emerald-400">
                            +{promo.calculation.savings.toLocaleString("ru-RU")} ₸
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsappClaim(promo)}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-emerald-950/40 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{language === "kz" ? "WhatsApp-та белсендіру" : "Активировать в WhatsApp"}</span>
                  </button>

                  <Link
                    href={promo.catalogQuery}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-navy-900 hover:bg-navy-800 border border-white/10 text-slate-200 hover:text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all"
                  >
                    <span>{language === "kz" ? "Каталогта көру" : "В каталог"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom FAQ / Rules of Promotions */}
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              <span>
                {language === "kz"
                  ? "Акциялар бойынша жиі қойылатын сұрақтар"
                  : "Частые вопросы по акциям"}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">
                  {language === "kz" ? "Жеңілдіктер қосыла ма?" : "Суммируются ли скидки?"}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Әрбір тапсырысқа ең тиімді бір акция қолданылады. Бір мезгілде бірнеше акцияны қосу мүмкін емес."
                    : "К одному договору аренды применяется одна наиболее выгодная для клиента акция. Скидки по разным спецпредложениям не суммируются."}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">
                  {language === "kz" ? "Заңды тұлғаларға жарамды ма?" : "Действует ли для ТОО и ИП?"}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Иә, акциялар жеке тұлғаларға да, заңды тұлғаларға да жарамды. Толық ЭШФ және орындалған жұмыстар актілері беріледі."
                    : "Да, спецпредложения действуют как для физических лиц, так и для юридических лиц с предоставлением полного комплекта бухгалтерских документов с НДС."}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">
                  {language === "kz" ? "Құрал бұзылса не болады?" : "Что делать при неисправности?"}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {language === "kz"
                    ? "Акциялық жабдық толық кепілдікпен беріледі. Техникалық ақау шыққан жағдайда 2 сағат ішінде ауыстырып береміз."
                    : "На акционное оборудование действует стандартная гарантия исправности. При поломке диспетчер оперативно организует замену в течение 2 часов."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
