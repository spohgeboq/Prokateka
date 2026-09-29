"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useData } from "@/context/DataContext";
import { Language, translations } from "@/data/translations";
import {
  X,
  Trash2,
  ShoppingCart,
  MessageCircle,
  Truck,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

interface CartDrawerProps {
  language?: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ language = "ru" }) => {
  const { items, isOpen, closeCart, removeItem, clearCart } = useCart();
  const { settings, calculatePromo } = useData();

  const [days, setDays] = useState<number>(3);
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const t = translations[language];

  // Calculate pricing for each item and overall kit
  let rawEquipmentSum = 0;
  let totalDiscount = 0;
  let totalDeposit = 0;
  let hasHeavyMachinery = false;

  const calculatedItems = items.map(({ equipment }) => {
    const isHeavy = equipment.tier === "heavy";
    if (isHeavy) hasHeavyMachinery = true;

    const dailyRate = isHeavy && equipment.priceShift ? equipment.priceShift : equipment.priceDay;
    const itemRaw = dailyRate * days;
    rawEquipmentSum += itemRaw;
    totalDeposit += equipment.deposit;

    const promoResult = calculatePromo(equipment, days);
    const itemDiscount = promoResult.discountAmount;
    totalDiscount += itemDiscount;

    return {
      equipment,
      dailyRate,
      itemRaw,
      itemDiscount,
      itemFinal: itemRaw - itemDiscount,
      isHeavy,
      promoResult,
    };
  });

  // Package discount if 2 or more items are selected simultaneously
  const isMultiItem = items.length >= 2;
  const packageBonusDiscount = isMultiItem && totalDiscount === 0 ? Math.round(rawEquipmentSum * 0.1) : 0;
  const finalDiscount = totalDiscount > 0 ? totalDiscount : packageBonusDiscount;

  const deliveryCost =
    deliveryType === "delivery"
      ? hasHeavyMachinery
        ? 0
        : 5000
      : 0;

  const totalRent = Math.max(0, rawEquipmentSum - finalDiscount);
  const totalToPay = totalRent + deliveryCost;

  const handleCheckoutWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    // 1. Silently record lead to Mini-CRM in Admin Panel
    const itemsDescription = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${language === "kz" ? i.equipment.nameKz : i.equipment.name}`
      )
      .join(", ");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim() || (language === "kz" ? "Клиент WhatsApp (Комплект)" : "Клиент WhatsApp (Комплект)"),
          customerPhone: customerPhone.trim() || "Не указан",
          equipmentId: "multi-kit",
          equipmentName: `Комплект (${items.length} поз.): ${itemsDescription}`,
          days,
          totalPrice: totalToPay,
          deliveryType,
          address: address.trim() || undefined,
          promoApplied: finalDiscount > 0 ? (totalDiscount > 0 ? "X+Y Promo" : "Скидка на комплект 10%") : undefined,
        }),
      });
    } catch (err) {
      console.error("Failed to silently record cart lead:", err);
    }

    // 2. Build multi-item formatted WhatsApp message
    const waNumber = settings.whatsappNumber || "77056317887";

    const lines = [
      `ЗАПРОС СПИСКА ОБОРУДОВАНИЯ В PROKATEKA`,
      ``,
      `Позиции в запросе (${items.length} шт.):`,
      ...items.map((ci, idx) => {
        const title = language === "kz" ? ci.equipment.nameKz : ci.equipment.name;
        return `${idx + 1}. ${title}`;
      }),
      ``,
      `Желаемый срок аренды: ${days} ${language === "kz" ? "тәулік / ауысым" : "суток"}`,
      `Получение: ${
        deliveryType === "delivery"
          ? `${language === "kz" ? "Жеткізу" : "Доставка на объект"}: ${address || (language === "kz" ? "Нақтылануда" : "Адрес уточняется")}`
          : language === "kz" ? "Қоймадан алып кету (Өз бетімен)" : "Самовывоз со склада"
      }`,
      ``,
      `Просьба рассчитать стоимость аренды.`,
      `Клиент: ${customerName.trim() || (language === "kz" ? "Көрсетілмеген" : "Не указано")}`,
      `Телефон: ${customerPhone.trim() || (language === "kz" ? "Көрсетілмеген" : "Не указан")}`,
    ];

    const messageText = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${waNumber}?text=${messageText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-navy-900 border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-navy-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{language === "kz" ? "Брондау корзинасы" : "Корзина оборудования"}</span>
                {items.length > 0 && (
                  <span className="text-xs bg-brand-500 text-navy-950 px-2 py-0.5 rounded-full font-black">
                    {items.length}
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                {language === "kz"
                  ? "Бірнеше позицияны бірге брондау және жеңілдік алу"
                  : "Аренда комплекта в один клик без регистрации"}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-navy-950 border border-white/10 flex items-center justify-center text-slate-500 mx-auto mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {language === "kz" ? "Корзина бос" : "Ваша корзина пуста"}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
                {language === "kz"
                  ? "Каталогтан қажетті құралдарды таңдап, «Корзинаға» түймесін басыңыз"
                  : "Добавляйте необходимые инструменты или спецтехнику, чтобы рассчитать весь комплект"}
              </p>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold text-xs transition-all"
              >
                <span>{language === "kz" ? "Каталогқа өту" : "Перейти в каталог"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                  <span>{language === "kz" ? "Таңдалған жабдықтар:" : "Выбранные позиции:"}</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-400 hover:text-rose-300 font-medium"
                  >
                    {language === "kz" ? "Тазарту" : "Очистить все"}
                  </button>
                </div>

                {items.map(({ equipment }) => {
                  const dailyRate =
                    equipment.tier === "heavy" && equipment.priceShift
                      ? equipment.priceShift
                      : equipment.priceDay;

                  return (
                    <div
                      key={equipment.id}
                      className="p-3 rounded-xl bg-navy-950 border border-white/5 flex items-center gap-3 relative group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0">
                        <Image
                          src={equipment.image}
                          alt={language === "kz" ? equipment.nameKz : equipment.name}
                          fill
                          className={`object-cover ${!equipment.inStock ? "grayscale opacity-60" : ""}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] uppercase font-bold text-brand-400 truncate">
                            {language === "kz" ? equipment.categoryKz : equipment.category}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                              equipment.inStock
                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {equipment.inStock
                              ? language === "kz"
                                ? "Қоймада"
                                : "В наличии"
                              : language === "kz"
                              ? "Жалға берілген"
                              : "В аренде"}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">
                          {language === "kz" ? equipment.nameKz : equipment.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1 text-xs">
                          <span className="text-slate-300 text-[10px]">
                            {language === "kz" ? "Бағасын WhatsApp-та біліңіз" : "Цена по запросу"}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(equipment.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                            title="Удалить из комплекта"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Package Settings: Duration & Delivery */}
              <div className="p-3.5 rounded-xl bg-navy-850 border border-white/10 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>{language === "kz" ? "Жалдау мерзімі:" : "Срок аренды комплекта:"}</span>
                    <span className="text-brand-400 font-bold">
                      {days} {language === "kz" ? "тәулік" : "суток"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {[1, 2, 3, 5, 7, 10, 14, 30].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`flex-1 min-w-[38px] py-1.5 rounded-lg text-xs font-bold transition-all ${
                          days === d
                            ? "bg-brand-500 text-navy-950 shadow"
                            : "bg-navy-950 text-slate-300 hover:bg-navy-900 border border-white/5"
                        }`}
                      >
                        {d}д
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery selector */}
                <div>
                  <div className="text-xs font-semibold text-white mb-1.5">
                    {language === "kz" ? "Алу тәсілі:" : "Способ получения:"}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType("pickup")}
                      className={`p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
                        deliveryType === "pickup"
                          ? "bg-brand-500/10 border-brand-500 text-brand-300"
                          : "bg-navy-950 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{language === "kz" ? "Өз бетімен" : "Самовывоз"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType("delivery")}
                      className={`p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
                        deliveryType === "delivery"
                          ? "bg-brand-500/10 border-brand-500 text-brand-300"
                          : "bg-navy-950 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{language === "kz" ? "Нысанға жеткізу" : "Доставка"}</span>
                    </button>
                  </div>

                  {deliveryType === "delivery" && (
                    <input
                      type="text"
                      placeholder={language === "kz" ? "Жеткізу мекенжайы..." : "Адрес доставки в Алматы / области..."}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-2 w-full px-3 py-2 bg-navy-950 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  )}
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      {language === "kz" ? "Аты-жөніңіз:" : "Ваше имя:"}
                    </label>
                    <input
                      type="text"
                      placeholder="Имя"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-navy-950 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      {language === "kz" ? "Телефон нөмірі:" : "Телефон:"}
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 700 000 00 00"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-navy-950 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Price Informational Block */}
              <div className="p-3.5 rounded-xl bg-navy-950 border border-white/10 text-xs">
                <div className="flex items-start gap-2 text-brand-400 font-medium">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {language === "kz" 
                      ? "Таңдалған жабдықтардың нақты бағасын және жеткізу құнын WhatsApp арқылы менеджер есептеп береді." 
                      : "Точная стоимость аренды и доставки для выбранного списка будет рассчитана менеджером в WhatsApp."}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Checkout Button */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-navy-850">
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>
                {language === "kz"
                  ? "Комплектіні WhatsApp арқылы тапсырыс беру"
                  : "Оформить весь комплект в WhatsApp"}
              </span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              {language === "kz"
                ? "Аккаунт немесе тіркелу қажет емес. Менеджер жедел жауап береді."
                : "Без регистрации и паролей. Прямой расчет и бронь в чате с менеджером."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
