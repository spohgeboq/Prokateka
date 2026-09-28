"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language, translations } from "@/data/translations";
import {
  Building2,
  FileCheck2,
  ShieldAlert,
  Zap,
  CheckCircle2,
  MessageCircle,
  FileSpreadsheet,
  ArrowRight,
  HardHat,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";

export default function ForBusinessPage() {
  const [language, setLanguage] = useState<Language>("ru");
  const [companyBin, setCompanyBin] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requestNotes, setRequestNotes] = useState("");

  const t = translations[language];

  const handleSendB2BRequest = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `ЗАПРОС СЧЕТА И ДОГОВОРА (B2B)`,
      ``,
      `Компания: ${companyName || "Не указана"}`,
      `БИН/ИИН: ${companyBin || "Не указан"}`,
      `Спецификация техники: ${requestNotes || "Консультация по условиям"}`,
      ``,
      `Здравствуйте! Прошу выставить коммерческое предложение / счет на оплату с НДС.`,
    ];

    const url = `https://wa.me/${MANAGER_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  const businessPillars = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-brand-400" />,
      title: t.forBusiness.b1Title,
      desc: t.forBusiness.b1Desc,
    },
    {
      icon: <HardHat className="w-6 h-6 text-emerald-400" />,
      title: t.forBusiness.b2Title,
      desc: t.forBusiness.b2Desc,
    },
    {
      icon: <Zap className="w-6 h-6 text-sky-400" />,
      title: t.forBusiness.b3Title,
      desc: t.forBusiness.b3Desc,
    },
    {
      icon: <Building2 className="w-6 h-6 text-amber-400" />,
      title: t.forBusiness.b4Title,
      desc: t.forBusiness.b4Desc,
    },
  ];

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
          <span className="text-slate-200 font-semibold">{t.header.forBusiness}</span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>КОРПОРАТИВНЫЙ СЕРВИС B2B</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {t.forBusiness.title}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            {t.forBusiness.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {businessPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/10 flex items-start gap-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-navy-950 border border-white/10 flex items-center justify-center flex-shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive B2B Request Form */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 border border-brand-500/20 shadow-2xl max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {t.forBusiness.requestCtaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.forBusiness.requestCtaSubtitle}
            </p>
          </div>

          <form onSubmit={handleSendB2BRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Наименование ТОО или ИП
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ТОО «КазСтройМонтаж»"
                className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                БИН / ИИН компании
              </label>
              <input
                type="text"
                required
                value={companyBin}
                onChange={(e) => setCompanyBin(e.target.value)}
                placeholder="12 цифр БИН"
                className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Какая техника и на какой срок требуется?
              </label>
              <textarea
                rows={3}
                required
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                placeholder="Например: Экскаватор JCB на 10 смен + 2 самосвала КамАЗ с 1 октября на объект в мкр. Алмагуль"
                className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-950/50 transition-all text-sm active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.forBusiness.requestBtn}</span>
            </button>
          </form>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
