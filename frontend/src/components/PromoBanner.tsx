"use client";

import React from "react";
import Link from "next/link";
import { Language } from "@/data/translations";
import {
  Gift,
  Truck,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Percent,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { useData } from "@/context/DataContext";

interface PromoBannerProps {
  language: Language;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ language }) => {
  const { promotions, settings } = useData();
  const activePromo = promotions.find((p) => p.isActive);

  const handleClaimOffer = () => {
    const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;
    const promoTitle = activePromo
      ? language === "kz"
        ? activePromo.titleKz
        : activePromo.titleRu
      : "3+1 (4-й день в подарок)";

    const text = encodeURIComponent(
      language === "kz"
        ? `Сәлеметсіз бе! «${promoTitle}» акциясы бойынша кеңес алғым келеді.`
        : `Здравствуйте! Хочу оформить акцию «${promoTitle}». Подскажите условия.`
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-brand-500/30 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Subtle decorative glow circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <Percent className="w-4 h-4 text-brand-400" />
              <span>
                {language === "kz"
                  ? "Құрылыс құралдары мен техникасын жалға беру желісі"
                  : "Сеть аренды строительных инструментов и спецтехники"}
              </span>
            </div>

            {/* Giant Central Promotion Badge (inspired by reference photo) */}
            <div className="relative inline-block w-full max-w-2xl bg-gradient-to-r from-amber-500 via-brand-500 to-amber-600 rounded-2xl p-0.5 shadow-xl shadow-brand-500/20">
              <div className="bg-navy-950/95 backdrop-blur-xl rounded-2xl py-4 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center flex-shrink-0 text-brand-400">
                  <Gift className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400">
                    {activePromo
                      ? language === "kz"
                        ? activePromo.badgeKz || "Басты акция"
                        : activePromo.badgeRu || "Главная акция"
                      : language === "kz"
                      ? "Басты акция"
                      : "Главная акция"}
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-white">
                    {activePromo ? (
                      <span>
                        {language === "kz" ? activePromo.titleKz : activePromo.titleRu}
                        {activePromo.type === "x_plus_y" && activePromo.payDays && activePromo.freeDays && (
                          <span className="text-brand-400 underline decoration-brand-500 ml-1.5">
                            ({activePromo.payDays} + {activePromo.freeDays})
                          </span>
                        )}
                      </span>
                    ) : language === "kz" ? (
                      <>
                        Құралдарды 3 күнге жалға алғанда —{" "}
                        <span className="text-brand-400 underline decoration-brand-500">4-ші күн сыйлыққа!</span>
                      </>
                    ) : (
                      <>
                        При аренде инструментов на 3 дня —{" "}
                        <span className="text-brand-400 underline decoration-brand-500">4-ый день в подарок!</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === "kz"
                ? "Астана бойынша 180+ тексерілген техника бірлігі. Жасырын төлемсіз, ресми кепілдікпен және WhatsApp арқылы жылдам ресімдеу."
                : "Более 180 проверенных единиц техники и инструмента в наличии в Астане. Без скрытых наценок, с гарантией замены и моментальным согласованием."}
            </p>

            {/* 3 Key Value Badges (exact match with the client photo) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-2">
              <div className="flex items-center gap-3 bg-navy-900/80 border border-white/10 p-3.5 rounded-2xl text-left">
                <div className="w-9 h-9 rounded-xl bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-brand-400" />
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

              <div className="flex items-center gap-3 bg-navy-900/80 border border-white/10 p-3.5 rounded-2xl text-left">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {language === "kz" ? "2 рет басу арқылы" : "Оформление в 2 клика"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {language === "kz" ? "WhatsApp немесе сайтта" : "Через сайт или WhatsApp"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-navy-900/80 border border-white/10 p-3.5 rounded-2xl text-left">
                <div className="w-9 h-9 rounded-xl bg-sky-500/15 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {language === "kz" ? "Бұзылса тез ауыстыру" : "Замена при поломке за 2 ч"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {language === "kz" ? "Құралды тез жөндейміз" : "Быстро заменим инструмент"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClaimOffer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-navy-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-brand-500/30 active:scale-95"
              >
                <span>{language === "kz" ? "Акцияны алу (WhatsApp)" : "Забрать 4-й день в подарок"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <Link
                href="/promotions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 border border-white/15 text-slate-200 hover:text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all"
              >
                <Percent className="w-4 h-4 text-brand-400" />
                <span>{language === "kz" ? "Барлық 6 акцияны көру" : "Все акции и спецпредложения"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
