"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language, translations } from "@/data/translations";
import {
  FileText,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Building2,
  FileCheck2,
  HardHat,
  Zap,
  ChevronRight,
  ArrowRight,
  Percent,
  Clock,
  Scale,
  Users,
  Briefcase,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";

export default function PricingPage() {
  const [language, setLanguage] = useState<Language>("ru");
  const [activeTab, setActiveTab] = useState<"all" | "individual" | "business">("all");
  const [companyName, setCompanyName] = useState("");
  const [companyBin, setCompanyBin] = useState("");
  const [requestNotes, setRequestNotes] = useState("");

  const t = translations[language];

  const handleWhatsapp = () => {
    const text = encodeURIComponent(
      language === "kz"
        ? "Сәлеметсіз бе, Prokateka! Жалға алу шарттары бойынша кеңес алғым келеді."
        : "Здравствуйте, Prokateka! Хочу проконсультироваться по условиям аренды оборудования."
    );
    window.open(`https://wa.me/${MANAGER_WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const handleSendB2BRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `ЗАПРОС СЧЕТА И ДОГОВОРА (B2B)`,
      ``,
      `Компания: ${companyName || "Не указана"}`,
      `БИН/ИИН: ${companyBin || "Не указан"}`,
      `Спецификация техники: ${requestNotes || "Консультация по условиям аренды"}`,
      ``,
      `Здравствуйте! Прошу выставить коммерческое предложение / счет на оплату с НДС.`,
    ];
    window.open(
      `https://wa.me/${MANAGER_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-navy-950">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-brand-400 transition-colors">
            {language === "kz" ? "Басты бет" : "Главная"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-brand-400 font-medium">{t.header.pricing}</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {language === "kz"
                ? "Ашық және сенімді шарттар"
                : "Прозрачные и честные условия"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {language === "kz" ? "ЖАЛҒА АЛУ ШАРТТАРЫ" : "УСЛОВИЯ АРЕНДЫ ТЕХНИКИ"}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            {language === "kz"
              ? "Жеке тұлғаларға да, заңды тұлғаларға (ТОО/ИП) да арналған толық ақпарат: құжаттар, кепілақы, Астана бойынша жеткізу және ҚҚС-пен ресми шарт."
              : "Единый раздел со всеми правилами проката для частных мастеров и строительных компаний (ТОО и ИП): порядок оформления, залог, доставка и безналичный расчет с НДС."}
          </p>
        </div>

        {/* Promotion Callout Banner (Redirecting to promotions page) */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-brand-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-black">
              %
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {language === "kz"
                  ? "Арнайы жеңілдіктер мен акциялар іздеп жүрсіз бе?"
                  : "Ищете спецпредложения и сезонные скидки?"}
              </h4>
              <p className="text-xs text-slate-300">
                {language === "kz"
                  ? "«3+1 сыйлық күні», Weekend тарифі және ұзақ мерзімге 20% жеңілдіктер «Акциялар» бөлімінде."
                  : "Акция 3+1 (4-й день бесплатно), тариф Weekend на выходные и скидки до 20% на долгосрок."}
              </p>
            </div>
          </div>

          <Link
            href="/promotions"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <span>{language === "kz" ? "Акциялар бөліміне өту" : "Перейти в раздел Акции"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Client Type Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "all"
                ? "bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/20"
                : "bg-navy-900 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            {language === "kz" ? "Барлық шарттар" : "Все условия"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("individual")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "individual"
                ? "bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/20"
                : "bg-navy-900 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{language === "kz" ? "Жеке тұлғаларға" : "Частным лицам"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("business")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "business"
                ? "bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/20"
                : "bg-navy-900 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{language === "kz" ? "Заңды тұлғаларға (ТОО/ИП)" : "Для бизнеса (ТОО и ИП)"}</span>
          </button>
        </div>

        {/* 1. INDIVIDUAL CONDITIONS (Физ. лица) */}
        {(activeTab === "all" || activeTab === "individual") && (
          <div className="mb-14 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {language === "kz"
                  ? "Жеке тұлғалар мен шеберлерге арналған шарттар"
                  : "Условия для частных лиц и мастеров"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Deposit Card */}
              <div className="p-6 rounded-3xl bg-navy-900 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {t.pricingPage.depositTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {t.pricingPage.depositDesc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{language === "kz" ? "Kaspi немесе картаға күнінде қайтару" : "Возврат залога день в день на Kaspi или карту"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{language === "kz" ? "Оператормен бірге залогсыз беріледі" : "Без залога при аренде спецтехники с оператором"}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Card */}
              <div className="p-6 rounded-3xl bg-navy-900 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                    <Truck className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {t.pricingPage.deliveryTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {t.pricingPage.deliveryDesc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>{language === "kz" ? "Құрал жеткізу:" : "Курьер (инструмент):"}</span>
                    <strong className="text-white">от 3 000 ₸</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === "kz" ? "Борттық көлік:" : "Бортовой транспорт:"}</span>
                    <strong className="text-white">от 8 000 ₸</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === "kz" ? "Ауыр техникаға трал:" : "Трал для тяжелой техники:"}</span>
                    <span className="text-slate-400">келісім бойынша</span>
                  </div>
                </div>
              </div>

              {/* Documents & Contract */}
              <div className="p-6 rounded-3xl bg-navy-900 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <FileCheck2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {language === "kz" ? "2 минутта ресімдеу" : "Оформление за 2 минуты"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {language === "kz"
                      ? "Қазақстан азаматының жеке куәлігімен ресми шарт. Қабылдау-өткізу актісі және құралды тексеру міндетті түрде жасалады."
                      : "Договор по удостоверению личности РК или паспорту. Обязательный акт приема-передачи с видеофиксацией исправности инструмента."}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{language === "kz" ? "Қағазбастылықсыз WhatsApp арқылы" : "Без очередей через WhatsApp"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{language === "kz" ? "Қауіпсіздік техникасынан нұсқаулық" : "Полный инструктаж по безопасности"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CORPORATE & B2B CONDITIONS (ТОО и ИП) */}
        {(activeTab === "all" || activeTab === "business") && (
          <div className="mb-14 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {language === "kz"
                  ? "Заңды тұлғаларға арналған шарттар (B2B, ТОО және ИП)"
                  : "Условия для юридических лиц и бизнеса (ТОО и ИП)"}
              </h2>
            </div>

            {/* 4 Pillars Grid for Business */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-navy-900 border border-white/10 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-navy-950 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck2 className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{t.forBusiness.b1Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.forBusiness.b1Desc}</p>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-navy-900 border border-white/10 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-navy-950 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <HardHat className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{t.forBusiness.b2Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.forBusiness.b2Desc}</p>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-navy-900 border border-white/10 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-navy-950 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{t.forBusiness.b3Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.forBusiness.b3Desc}</p>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-navy-900 border border-white/10 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-navy-950 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{t.forBusiness.b4Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.forBusiness.b4Desc}</p>
                </div>
              </div>
            </div>

            {/* Direct B2B Request Form Box */}
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-900 to-navy-850 border border-brand-500/20 shadow-xl">
              <div className="max-w-2xl mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {t.forBusiness.requestCtaTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {t.forBusiness.requestCtaSubtitle}
                </p>
              </div>

              <form onSubmit={handleSendB2BRequest} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {language === "kz" ? "Компания атауы (ТОО / ИП)" : "Компания (ТОО / ИП)"}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ТОО «КазСтрой»"
                    className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    БИН / ИИН
                  </label>
                  <input
                    type="text"
                    required
                    value={companyBin}
                    onChange={(e) => setCompanyBin(e.target.value)}
                    placeholder="12 цифр БИН"
                    className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {language === "kz" ? "Қажетті техника" : "Требуемая техника"}
                  </label>
                  <input
                    type="text"
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    placeholder="Компрессор, генератор..."
                    className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/40 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{t.forBusiness.requestBtn}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. Official Offer Contract Banner (ИП «Прокатека») */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0 text-brand-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {language === "kz" ? "Ресми қоғамдық оферта шарты" : "Официальный договор публичной оферты"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                {language === "kz"
                  ? "ҚР Азаматтық кодексінің 395–396 баптарына сәйкес ИП «Прокатека» (Рақымжан Наурыз Болатұлы) жабдықтарды жалға беру шартының толық 13 бөлімімен танысыңыз."
                  : "Ознакомьтесь с полным текстом договора аренды оборудования ИП «Прокатека» (в лице Рақымжан Наурыз Болатұлы, 13 разделов, банковские реквизиты Kaspi Bank, порядок акцепта)."}
              </p>
            </div>
          </div>

          <Link
            href="/offer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-navy-950 hover:bg-navy-850 border border-white/15 text-slate-200 hover:text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all"
          >
            <span>{language === "kz" ? "Оферта шартын ашу" : "Открыть договор оферты"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Fast WhatsApp Help CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-850 border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              {language === "kz"
                ? "Сұрақтарыңыз бар ма? Менеджер 2 минутта жауап береді"
                : "Остались вопросы по условиям аренды?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === "kz"
                ? "WhatsApp-қа жазыңыз — техниканың бар-жоғын, залог сомасын және жеткізу уақытын дереу есептеп береміз."
                : "Напишите в WhatsApp — дежурный менеджер моментально подскажет по наличию, залогу и времени доставки техники на ваш объект."}
            </p>
          </div>

          <button
            onClick={handleWhatsapp}
            className="flex-shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>{language === "kz" ? "WhatsApp арқылы кеңес алу" : "Консультация в WhatsApp"}</span>
          </button>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
