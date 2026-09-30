"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { Language, translations } from "@/data/translations";
import { Phone, MapPin, Clock, MessageCircle, Mail, ShieldCheck, FileText, ChevronRight, Percent, Scale } from "lucide-react";
import { MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { useData } from "@/context/DataContext";

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];
  const { settings, tiers } = useData();

  return (
    <footer id="contacts" className="bg-navy-950 border-t border-white/10 py-12 sm:py-16 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-white/5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
                {language === "kz" ? "100% Тексерілген техника" : "100% Исправная техника"}
              </h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                {language === "kz" ? "Әрбір тапсырыс алдында сынақтан өтеді" : "Проходит проверку и чистку перед каждой выдачей"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
                {language === "kz" ? "WhatsApp арқылы бронь" : "Бронь через WhatsApp"}
              </h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                {language === "kz" ? "Диспетчер 2-3 минутта жауап береді" : "Диспетчер подтверждает заявку за 2 минуты"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
                {language === "kz" ? "Демалыссыз 08:00 – 20:00" : "Без выходных 08:00 – 20:00"}
              </h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                {language === "kz" ? "Қабылдау мен беру үзіліссіз" : "Выдача и возврат техники в любой день"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
                {language === "kz" ? "ҚҚС-пен ресми шарт" : "Официально с НДС"}
              </h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                {language === "kz" ? "ЭШФ және АВР құжаттары толық" : "ЭСФ, акты выполненных работ для ТОО и ИП"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <BrandLogo size="md" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-5">
              {t.footer.about}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${MANAGER_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Диспетчер</span>
              </a>

              <a
                href="tel:+77055036772"
                className="inline-flex items-center gap-2 bg-navy-900 border border-white/10 hover:border-brand-500 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-brand-500" />
                <span>+7 705 503 6772</span>
              </a>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              {t.footer.categoriesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {tiers.slice(0, 4).map((tier) => (
                <li key={tier.id}>
                  <Link href={`/catalog?tier=${tier.id}`} className="hover:text-brand-400 transition-colors">
                    {language === "kz" ? tier.nameKz : tier.nameRu}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalog" className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
                  <span>{language === "kz" ? "Барлық каталог" : "Весь каталог"}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/catalog" className="hover:text-brand-400 transition-colors">
                  {t.header.catalog}
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{t.header.promotions}</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-400 transition-colors">
                  {t.header.pricing}
                </Link>
              </li>
              <li>
                <Link href="/offer" className="hover:text-brand-400 transition-colors">
                  {t.header.offer}
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-brand-400 transition-colors">
                  {t.header.branches}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-brand-400 transition-colors">
                  {t.header.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contacts */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              {t.footer.contactsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span>{t.branches.b1Address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{settings?.workingHours || t.branches.b1Time}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>info@prokateka.kz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Requisites Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{settings?.companyName ? `© ${new Date().getFullYear()} ${settings.companyName}. Все права защищены.` : t.footer.rights}</div>
          <div className="text-[11px] text-slate-400">
            {settings?.companyBin ? `БИН/ИИН: ${settings.companyBin}` : t.footer.bin}
          </div>
        </div>
      </div>
    </footer>
  );
};
