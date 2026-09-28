"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EquipmentItem, MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { Language, translations } from "@/data/translations";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import {
  X,
  MessageCircle,
  Truck,
  MapPin,
  Clock,
  Sparkles,
  Info,
  Gift,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

interface RentalCalculatorModalProps {
  item: EquipmentItem | null;
  language: Language;
  onClose: () => void;
  onAddToCart?: (item: EquipmentItem) => void;
}

export const RentalCalculatorModal: React.FC<RentalCalculatorModalProps> = ({
  item,
  language,
  onClose,
  onAddToCart,
}) => {
  const { settings, calculatePromo } = useData();
  const { addItem, openCart } = useCart();

  if (!item) return null;

  const t = translations[language];

  // State
  const [days, setDays] = useState<number>(3);
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [address, setAddress] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [withOperator, setWithOperator] = useState<boolean>(
    item.tier === "heavy" ? true : false
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  // Price calculations
  const isHeavy = item.tier === "heavy";
  const isPromoEligible = !isHeavy;
  const dailyRate = isHeavy && item.priceShift ? item.priceShift : item.priceDay;

  const adjustedRate = isHeavy
    ? withOperator
      ? dailyRate
      : Math.round(dailyRate * 0.85)
    : dailyRate;

  const rawTotal = adjustedRate * days;

  // Dynamic Promotion Engine from Admin CMS
  const promoResult = calculatePromo(item, days);
  const freeDays = promoResult.freeDays;
  const promoDiscountAmount = promoResult.discountAmount;
  const discountedRent = Math.max(0, rawTotal - promoDiscountAmount);

  // Delivery cost
  const deliveryCost =
    deliveryType === "delivery"
      ? item.tier === "heavy"
        ? 0
        : 5000
      : 0;

  const totalToPay = discountedRent + deliveryCost;
  const deposit = item.deposit;

  const handleAddToCart = () => {
    addItem(item);
    setAddedToCartToast(true);
    setTimeout(() => {
      setAddedToCartToast(false);
      openCart();
      onClose();
    }, 400);
  };

  // Build clean formatted WhatsApp message without emojis & silently log lead
  const handleSendToWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();

    const itemName = language === "kz" ? item.nameKz : item.name;
    const itemCategory = language === "kz" ? item.categoryKz : item.category;
    const operatorText = isHeavy
      ? withOperator
        ? language === "kz"
          ? "Иә (операторымен бірге)"
          : "Да (с опытным оператором)"
        : language === "kz"
        ? "Жоқ (экипажсыз)"
        : "Нет (без экипажа)"
      : null;

    const deliveryText =
      deliveryType === "delivery"
        ? `${language === "kz" ? "Нысанға жеткізу" : "Доставка на объект"}: ${
            address || (language === "kz" ? "Мекенжай нақтылануда" : "Адрес уточняется")
          }`
        : `${language === "kz" ? "Қоймадан алып кету" : "Самовывоз"}: ${item.branch}`;

    const durationUnit = isHeavy
      ? language === "kz"
        ? "ауысым"
        : "смен (по 8 ч)"
      : language === "kz"
      ? "тәулік"
      : "суток";

    const promoNote =
      promoDiscountAmount > 0
        ? language === "kz"
          ? ` (Акция: ${freeDays} тәулік тегін)`
          : ` (по акции: ${freeDays} ${freeDays === 1 ? "день" : "дня"} в подарок)`
        : "";

    // 1. Silently record lead to Mini-CRM in Admin Panel
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim() || (language === "kz" ? "Клиент WhatsApp" : "Клиент WhatsApp"),
          customerPhone: customerPhone.trim() || "Не указан",
          equipmentId: item.id,
          equipmentName: itemName,
          days,
          totalPrice: totalToPay,
          deliveryType,
          address: address.trim() || undefined,
          promoApplied: promoResult.promoApplied?.titleRu || undefined,
        }),
      }).catch((err) => console.error("Silent lead record error:", err));
    } catch {
      // Non-blocking
    }

    // 2. Format WhatsApp text
    const lines = [
      `ЗАКАЗ В СЕРВИСЕ PROKATEKA`,
      ``,
      `Техника: ${itemName}`,
      `Категория: ${itemCategory}`,
      `Срок аренды: ${days} ${durationUnit}${promoNote}`,
      ...(operatorText ? [`Экипаж: ${operatorText}`] : []),
      `Получение: ${deliveryText}`,
      ``,
      `Стоимость аренды: ${discountedRent.toLocaleString("ru-RU")} ₸`,
      ...(promoDiscountAmount > 0 ? [`Выгода по акции: -${promoDiscountAmount.toLocaleString("ru-RU")} ₸`] : []),
      ...(deliveryCost > 0 ? [`Доставка: ${deliveryCost.toLocaleString("ru-RU")} ₸`] : []),
      `Возвратный залог: ${
        deposit > 0 ? `${deposit.toLocaleString("ru-RU")} ₸` : language === "kz" ? "Кепілақысыз" : "Без залога"
      }`,
      `ИТОГО К ОПЛАТЕ: ${totalToPay.toLocaleString("ru-RU")} ₸`,
      ``,
      `Клиент: ${customerName || (language === "kz" ? "Көрсетілмеген" : "Не указано")}`,
      `Телефон: ${customerPhone || (language === "kz" ? "Көрсетілмеген" : "Не указан")}`,
    ];

    const messageText = encodeURIComponent(lines.join("\n"));
    const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${waNumber}?text=${messageText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-navy-850">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>{t.calculator.title}</span>
              <span className="text-brand-500 font-black">PROkateka</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.calculator.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-navy-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {/* Selected Item Card Preview */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-navy-950 border border-white/5 mb-6">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-navy-900">
              <Image
                src={item.image}
                alt={language === "kz" ? item.nameKz : item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-brand-400 font-semibold uppercase">
                {language === "kz" ? item.categoryKz : item.category}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white truncate">
                {language === "kz" ? item.nameKz : item.name}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-300">
                <span className="font-semibold text-brand-400">
                  {dailyRate.toLocaleString("ru-RU")} ₸ /{" "}
                  {isHeavy ? (language === "kz" ? "ауысым" : "смена") : language === "kz" ? "тәулік" : "сутки"}
                </span>
                <span className="text-slate-500">•</span>
                <span>
                  {t.catalog.deposit}: {item.deposit > 0 ? `${item.deposit.toLocaleString("ru-RU")} ₸` : language === "kz" ? "Жоқ" : "Нет"}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendToWhatsapp} className="space-y-5">
            {/* 1. Duration Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {isHeavy ? t.calculator.shiftsCount : t.calculator.daysCount}
              </label>

              {/* Quick Pills */}
              <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-3">
                {(isHeavy ? [1, 2, 3, 5, 7, 14] : [1, 2, 3, 4, 7, 14]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2 text-center rounded-xl text-xs font-bold border transition-all ${
                      days === d
                        ? "bg-brand-500 text-navy-950 border-brand-500 shadow-md shadow-brand-500/20"
                        : "bg-navy-950 border-white/10 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    <span>
                      {d} {isHeavy ? (language === "kz" ? "ауыс." : "см.") : language === "kz" ? "күн" : "дн."}
                    </span>
                    {!isHeavy && d === 4 && (
                      <span className="block text-[9px] text-emerald-400 font-black uppercase tracking-tight">
                        3+1
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Range Slider */}
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
                <span className="text-sm font-extrabold text-white w-14 text-right">
                  {days} {isHeavy ? (language === "kz" ? "ауысым" : "смен") : language === "kz" ? "күн" : "дней"}
                </span>
              </div>

              {/* Promo Callout Hint when 3 days selected */}
              {isPromoEligible && days === 3 && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <Gift className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>
                      {language === "kz"
                        ? "Акция: қосымша күнді тегін алыңыз!"
                        : "Акция: возьмите дополнительный день бесплатно!"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDays(4)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap active:scale-95"
                  >
                    {language === "kz" ? "4 күнге ауыстыру" : "Взять 4 дня по цене 3"}
                  </button>
                </div>
              )}

              {/* Promo Applied Notification */}
              {isPromoEligible && freeDays > 0 && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                  <Gift className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>
                    {language === "kz"
                      ? `Акция: ${freeDays} тәулік сыйлыққа тегін қосылды!`
                      : `Акция: ${freeDays} ${freeDays === 1 ? "день" : "дня"} аренды в подарок (бесплатно)!`}
                  </span>
                </div>
              )}
            </div>

            {/* 2. Heavy Machinery Operator Toggle */}
            {isHeavy && (
              <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.calculator.operatorOption}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithOperator(true)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                      withOperator
                        ? "bg-brand-500/10 border-brand-500 text-white"
                        : "bg-navy-900 border-white/10 text-slate-400"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 text-brand-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.calculator.withOperatorText}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {language === "kz" ? "Жанармай + кәсіби маман қосылған" : "Включает работу опытного машиниста"}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithOperator(false)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                      !withOperator
                        ? "bg-brand-500/10 border-brand-500 text-white"
                        : "bg-navy-900 border-white/10 text-slate-400"
                    }`}
                  >
                    <div className="font-bold text-slate-200">
                      {t.calculator.withoutOperatorText}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {language === "kz" ? "Тек лицензиясы бар заңды тұлғаларға" : "Для юрлиц со своим оператором"}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 3. Delivery Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {t.calculator.deliveryType}
              </label>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    deliveryType === "pickup"
                      ? "bg-brand-500/10 border-brand-500 text-white"
                      : "bg-navy-950 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span>{t.calculator.pickup} (0 ₸)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("delivery")}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    deliveryType === "delivery"
                      ? "bg-brand-500/10 border-brand-500 text-white"
                      : "bg-navy-950 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Truck className="w-4 h-4 text-brand-400" />
                  <span>
                    {t.calculator.deliveryToSite} {deliveryCost > 0 ? `(+${deliveryCost.toLocaleString("ru-RU")} ₸)` : ""}
                  </span>
                </button>
              </div>

              {deliveryType === "delivery" && (
                <div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.calculator.addressPlaceholder}
                    className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* 4. Customer Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.calculator.customerName}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.calculator.namePlaceholder}
                  className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.calculator.customerPhone}
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={t.calculator.phonePlaceholder}
                  className="w-full bg-navy-950 border border-white/10 focus:border-brand-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 5. Cost Breakdown Summary */}
            <div className="p-4 rounded-xl bg-navy-950 border border-white/10 space-y-2 text-xs">
              <div className="text-xs uppercase font-extrabold text-slate-300 tracking-wider pb-1 border-b border-white/5">
                {t.calculator.summaryTitle}
              </div>

              <div className="flex justify-between text-slate-400">
                <span>{t.calculator.basePrice}</span>
                <span>{rawTotal.toLocaleString("ru-RU")} ₸</span>
              </div>

              {promoDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>
                      {promoResult.promoApplied
                        ? (language === "kz"
                            ? `${promoResult.promoApplied.titleKz} (${freeDays} күн сыйлық):`
                            : `${promoResult.promoApplied.titleRu} (${freeDays} ${freeDays === 1 ? "день" : "дня"} в подарок):`)
                        : (language === "kz"
                            ? `Акция (${freeDays} күн сыйлық):`
                            : `Акция (${freeDays} ${freeDays === 1 ? "день" : "дня"} в подарок):`)}
                    </span>
                  </span>
                  <span>-{promoDiscountAmount.toLocaleString("ru-RU")} ₸</span>
                </div>
              )}

              {deliveryCost > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>{t.calculator.deliveryCost}</span>
                  <span>+{deliveryCost.toLocaleString("ru-RU")} ₸</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>{t.calculator.depositAmount}</span>
                <span className="font-semibold text-amber-400">
                  {deposit > 0 ? `${deposit.toLocaleString("ru-RU")} ₸` : language === "kz" ? "Кепілақысыз" : "Без залога"}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-baseline justify-between text-sm sm:text-base font-extrabold text-white">
                <span>{t.calculator.totalToPay}</span>
                <span className="text-xl sm:text-2xl text-brand-400">
                  {totalToPay.toLocaleString("ru-RU")} ₸
                </span>
              </div>
            </div>

            {/* Out of Stock Notice */}
            {!item.inStock && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">
                    {language === "kz" ? "Құрал қазір нысанда" : "Оборудование сейчас на объекте"}
                  </div>
                  <div className="text-[11px] text-amber-200/80 mt-0.5">
                    {language === "kz"
                      ? "Жабдықтың босайтын уақытын немесе қоймадағы баламасын WhatsApp арқылы нақтылауға болады."
                      : "Вы можете запросить ориентировочную дату возврата или подобрать свободный аналог в WhatsApp."}
                  </div>
                </div>
              </div>
            )}

            {/* Actions: Add to Kit & Send to WhatsApp */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-750 text-slate-200 border border-white/10 hover:border-brand-500/50 font-bold py-2.5 px-4 rounded-xl transition-all text-xs sm:text-sm active:scale-[0.99]"
              >
                <ShoppingCart className="w-4 h-4 text-brand-400" />
                <span>
                  {addedToCartToast
                    ? language === "kz"
                      ? "Корзинаға қосылды..."
                      : "Добавлено в корзину..."
                    : language === "kz"
                    ? "Корзинаға қосу (жинақ құрастыру)"
                    : "Добавить в корзину (аренда комплекта)"}
                </span>
              </button>

              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2.5 font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm sm:text-base active:scale-[0.99] ${
                  item.inStock
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50"
                    : "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/50"
                }`}
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>
                  {item.inStock
                    ? t.calculator.sendWhatsappBtn
                    : language === "kz"
                    ? "Босау мерзімін WhatsApp-та білу"
                    : "Узнать дату возврата в WhatsApp"}
                </span>
              </button>

              <p className="text-[11px] text-center text-slate-400 mt-1 flex items-center justify-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{t.calculator.whatsappDirectNotice}</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
