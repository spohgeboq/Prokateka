"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language, translations } from "@/data/translations";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Building2,
  FileText,
  Navigation,
} from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { useData } from "@/context/DataContext";

export default function ContactsPage() {
  const [language, setLanguage] = React.useState<Language>("ru");
  const { settings } = useData();
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
          <span className="text-slate-200 font-semibold">{t.header.contacts}</span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Контакты и связь с сервисом Prokateka
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Отвечаем на звонки и сообщения в WhatsApp без выходных. Быстрое согласование техники на объект.
          </p>
        </div>

        {/* 3 Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Department 1: Main Dispatcher */}
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Дежурный диспетчер WhatsApp
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Бронирование техники, консультации по наличию и согласование доставки в режиме реального времени.
              </p>
            </div>
            <a
              href={`https://wa.me/${settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>

          {/* Department 2: Phone Dispatch */}
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Отдел аренды инструмента
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Горячая линия для оперативной связи с менеджером склада и диспетчерской службой.
              </p>
            </div>
            <a
              href={`tel:${settings?.contactPhone?.replace(/[^+\d]/g, "") || "+77055036772"}`}
              className="w-full flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-bold py-3 px-4 rounded-xl text-xs border border-white/10 transition-all"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>{settings?.contactPhone || "+7 705 503 6772"}</span>
            </a>
          </div>

          {/* Department 3: B2B & Accounts */}
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Бухгалтерия и договоры
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Электронные счета-фактуры (ЭСФ), акты сверок, закрывающие документы и типовые договоры.
              </p>
            </div>
            <a
              href="mailto:info@prokateka.kz"
              className="w-full flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-bold py-3 px-4 rounded-xl text-xs border border-white/10 transition-all"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>info@prokateka.kz</span>
            </a>
          </div>
        </div>

        {/* Company Requisites Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-navy-900 border border-white/10 shadow-xl mb-12">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Building2 className="w-6 h-6 text-brand-500" />
            <h2 className="text-xl font-bold text-white">
              Юридические реквизиты компании
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-slate-300">
            <div>
              <div className="text-slate-400 mb-1">Арендодатель:</div>
              <div className="font-bold text-white text-sm">{settings?.companyName || "ИП «Прокатека»"}</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Руководитель: {settings?.headName || "Рақымжан Наурыз Болатұлы"}</div>
            </div>

            <div>
              <div className="text-slate-400 mb-1">ИИН / БИН:</div>
              <div className="font-bold text-amber-400 font-mono text-sm">{settings?.companyBin || "970319350517"}</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Уведомление о регистрации ИП</div>
            </div>

            <div>
              <div className="text-slate-400 mb-1">Банк:</div>
              <div className="font-bold text-white text-sm">АО &quot;Kaspi Bank&quot;</div>
              <div className="text-slate-400 text-[11px] font-mono mt-0.5">БИК: CASPKZKA • КБе: 19</div>
            </div>

            <div>
              <div className="text-slate-400 mb-1">Расчетный счет (ИИК):</div>
              <div className="font-bold text-emerald-400 font-mono text-xs select-all">KZ90722S000009362408</div>
            </div>

            <div>
              <div className="text-slate-400 mb-1">Юридический адрес:</div>
              <div className="font-bold text-white text-sm">г. Астана, ул. Бектурова, д. 4Г</div>
            </div>

            <div>
              <div className="text-slate-400 mb-1">Телефон / WhatsApp:</div>
              <div className="font-bold text-white text-sm">{settings?.contactPhone || "+7 705 503 6772"}</div>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
