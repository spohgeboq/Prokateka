"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Language, translations } from "@/data/translations";
import {
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Star,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";

interface HeroProps {
  language: Language;
  onSelectTaskFilter?: (task: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language];

  const handleWhatsappClick = (customText?: string) => {
    const text = encodeURIComponent(
      customText ||
        (language === "kz"
          ? "Сәлеметсіз бе! Маған құрылыс техникасын жалға алу қажет, бос орындар мен бағаларды анықтағым келеді."
          : "Здравствуйте! Мне требуется строительная техника в аренду, хочу уточнить наличие и расчет стоимости.")
    );
    window.open(`https://wa.me/${MANAGER_WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:py-16 md:py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-white/5">
      {/* Background Decorative Tech Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.15) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs sm:text-sm font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-5">
              {t.hero.titlePart1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-brand-500 to-orange-500 drop-shadow-sm">
                {t.hero.titleAccent}
              </span>
              {t.hero.titlePart2}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-7">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <Link
                href="/catalog"
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.ctaCatalog}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <button
                type="button"
                onClick={() => handleWhatsappClick()}
                className="flex items-center justify-center gap-2.5 bg-navy-850 hover:bg-navy-800 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-semibold px-6 py-3.5 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
                <span>{t.hero.ctaWhatsapp}</span>
              </button>
            </div>

            {/* Guarantees Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === "kz" ? "Сынақ стендінде тексеру" : "Проверка на стенде до выдачи"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === "kz" ? "Астана бойынша 45 мин жеткізу" : "Доставка по Астане за 45 мин"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === "kz" ? "Кепілақыны бірден қайтару" : "Возврат залога без задержек"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fleet Scale & Real Construction Atmosphere */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-navy-900/90 shadow-2xl p-5 sm:p-6 backdrop-blur-md transition-all">
              {/* Visual Image Container */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src="/images/excavator.jpg"
                  alt="Строительная площадка и парк техники PROkateka в Астане"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90" />

                {/* Floating Glass Badges */}
                <div className="absolute top-3.5 left-3.5 bg-navy-950/85 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {language === "kz"
                      ? "180+ бірлік қоймада • Бектұров 4Г"
                      : "180+ единиц в парке • ул. Бектурова 4Г"}
                  </span>
                </div>

                <a
                  href="https://2gis.kz/astana/geo/70000001065108547"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-3.5 right-3.5 bg-emerald-600/90 hover:bg-emerald-500 backdrop-blur-md border border-emerald-400/40 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg transition-colors"
                >
                  <span>2GIS 4.9</span>
                  <Star className="w-3 h-3 fill-white text-white" />
                  <span className="text-emerald-100 text-[10px] font-normal">(258+)</span>
                </a>

                {/* Bottom Text Overlay on Photo */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-1 text-[11px] text-brand-400 font-extrabold uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>
                      {language === "kz" ? "Астанадағы техника паркі" : "Парк оборудования в Астане"}
                    </span>
                  </div>
                  <div className="text-white font-extrabold text-base sm:text-xl leading-tight mb-1.5">
                    {language === "kz"
                      ? "Кез келген ауқымдағы құрылысқа арналған техника"
                      : "Оборудование для объектов любого масштаба"}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {language === "kz"
                      ? "Үйдегі жөндеуден бастап көпқабатты құрылысқа дейін. Қоймада әрқашан балама модельдер бар, қажет болса 2 сағатта ауыстыру кепілдігі."
                      : "От частного ремонта до монолитного строительства. Всегда есть исправные аналоги в наличии, а при необходимости — замена за 2 часа."}
                  </p>
                </div>
              </div>

              {/* 3 Metric Pills Across the Bottom */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div className="p-2.5 rounded-xl bg-navy-950/80 border border-white/5 text-center">
                  <div className="text-sm sm:text-base font-extrabold text-brand-400">180+</div>
                  <div className="text-[10px] text-slate-400">
                    {language === "kz" ? "Дайын техника" : "Единиц в наличии"}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-navy-950/80 border border-white/5 text-center">
                  <div className="text-sm sm:text-base font-extrabold text-emerald-400">45 мин</div>
                  <div className="text-[10px] text-slate-400">
                    {language === "kz" ? "Нысанға жеткізу" : "Доставка на объект"}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-navy-950/80 border border-white/5 text-center">
                  <div className="text-sm sm:text-base font-extrabold text-sky-400">100%</div>
                  <div className="text-[10px] text-slate-400">
                    {language === "kz" ? "Стендте тексеру" : "Тест перед выдачей"}
                  </div>
                </div>
              </div>

              {/* Fast Action Row */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                <span className="text-xs text-slate-400 leading-tight">
                  {language === "kz"
                    ? "Қажетті құралды 1 минутта брондаңыз"
                    : "Подбор оборудования под ваш объект за 60 секунд"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleWhatsappClick(
                      language === "kz"
                        ? "Сәлеметсіз бе! Маған Астанадағы нысанға құралдар паркінен техника қажет, нақты баға мен барын білгім келеді."
                        : "Здравствуйте! Мне требуется техника из вашего парка в Астане, подскажите по наличию и условиям."
                    )
                  }
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors shadow-md shadow-emerald-950/40"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{language === "kz" ? "WhatsApp-та білу" : "Узнать наличие в WhatsApp"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.hero.stat1Value}
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t.hero.stat1Label}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-400 tracking-tight">
              {t.hero.stat2Value}
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t.hero.stat2Label}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
              {t.hero.stat3Value}
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t.hero.stat3Label}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.hero.stat4Value}
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t.hero.stat4Label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
