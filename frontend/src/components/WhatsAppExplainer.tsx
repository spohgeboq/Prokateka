"use client";

import React from "react";
import { Language } from "@/data/translations";
import { MessageCircle, CheckCheck, ShieldCheck, Zap } from "lucide-react";

interface WhatsAppExplainerProps {
  language: Language;
}

export const WhatsAppExplainer: React.FC<WhatsAppExplainerProps> = ({ language }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-navy-950 to-navy-900 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Explanation */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{language === "kz" ? "WHATSAPP АРҚЫЛЫ ТАПСЫРЫС" : "ЗАКАЗ И ОПОВЕЩЕНИЯ В WHATSAPP"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {language === "kz" ? (
                <>
                  Күрделі сайттарсыз: барлық тапсырыс бірден{" "}
                  <span className="text-emerald-400">WhatsApp-қа</span> келеді
                </>
              ) : (
                <>
                  Никаких сложных кабинетов: все заказы приходят прямо в{" "}
                  <span className="text-emerald-400">WhatsApp</span>
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {language === "kz"
                ? "Құрылыс нысанындағы шеберлер мен прорабтарға уақыт жоғалтудың қажеті жоқ. Сайтта техниканы таңдап, күндерді белгілесеңіз болғаны — дайын тапсырыс толық есебімен менеджердің жеке WhatsApp-ына 1 секундта түседі."
                : "Прорабам и строителям на объекте некогда заполнять громоздкие формы. Вы просто выбираете технику и даты — готовая заявка с точным расчетом стоимости и залога мгновенно поступает на WhatsApp менеджера."}
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {language === "kz" ? "Жылдам жауап (2-3 минут)" : "Моментальный ответ (2-3 минуты)"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === "kz"
                      ? "Менеджер хабарламаны бірден көріп, техниканың бос екенін растайды және жеткізуді келіседі."
                      : "Менеджер видит входящую готовую заявку на смартфоне и сразу подтверждает бронь или согласует доставку."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {language === "kz" ? "Барлық шарттар сақталады" : "История переписки и фиксация цены"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === "kz"
                      ? "Келісілген баға, мерзім мен залог көлемі чатта ресми түрде жазылып тұрады."
                      : "Все договоренности, даты, сумма аренды и залога зафиксированы в чате — никаких разногласий при возврате."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mock Phone Screen with Clean WhatsApp Message (NO EMOJIS) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-navy-900 border-4 border-slate-700 p-3 shadow-2xl relative">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* Mock WhatsApp Header */}
              <div className="bg-[#075E54] text-white p-3 rounded-t-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm">
                  P
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold truncate">PROkateka | Диспетчер</div>
                  <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>online</span>
                  </div>
                </div>
              </div>

              {/* Chat Canvas (WhatsApp Dark Style) */}
              <div className="bg-[#0B141A] p-3 rounded-b-2xl space-y-3 min-h-[340px] text-xs">
                {/* Outgoing Message from customer with plain format */}
                <div className="bg-[#005C4B] text-slate-100 p-3 rounded-xl rounded-tr-none ml-6 shadow-sm border border-emerald-900/30">
                  <div className="font-bold text-amber-300 text-[11px] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    ЗАКАЗ В СЕРВИСЕ PROKATEKA
                  </div>
                  <div className="text-slate-200 space-y-1 text-[11px] leading-relaxed">
                    <div><b>Техника:</b> Экскаватор-погрузчик JCB 3CX</div>
                    <div><b>Срок:</b> 2 смены (16 ч)</div>
                    <div><b>Экипаж:</b> С машинистом</div>
                    <div><b>Доставка:</b> г. Астана, ул. Достык 12</div>
                    <div className="text-amber-200 font-bold mt-2 pt-1 border-t border-emerald-800/30">
                      ИТОГО: 170 000 ₸ (без залога)
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200 mt-1">
                    <span>14:32</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>

                {/* Incoming Response from manager */}
                <div className="bg-[#202C33] text-slate-200 p-3 rounded-xl rounded-tl-none mr-6 shadow-sm border border-white/5">
                  <p className="text-[11px] leading-relaxed">
                    Здравствуйте! Заявка принята. Экскаватор JCB свободен, машинист Ерлан готов выехать завтра к 08:30 утра. Подготовить договор?
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 mt-1">
                    <span>14:33</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
