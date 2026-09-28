"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RentalCalculatorModal } from "@/components/RentalCalculatorModal";
import { CATALOG_ITEMS, EquipmentItem, MANAGER_WHATSAPP_NUMBER } from "@/data/catalog";
import { Language, translations } from "@/data/translations";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Share2,
  Phone,
  Layers,
  ChevronRight,
  Gift,
  ShoppingCart,
  Settings,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const itemId = params?.id as string;

  const { equipment: liveEquipment, settings, calculatePromo } = useData();
  const { addItem, openCart } = useCart();

  const [language, setLanguage] = useState<Language>("ru");
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  const t = translations[language];

  // Find equipment by ID (from live CMS data or fallback)
  const allItems = liveEquipment && liveEquipment.length > 0 ? liveEquipment : CATALOG_ITEMS;
  const item = allItems.find((i) => i.id === itemId) || CATALOG_ITEMS[0];

  // Photos
  const gallery = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];

  // Price calculations
  const isHeavy = item.tier === "heavy";
  const isPromoEligible = !isHeavy;
  const dailyRate = isHeavy && item.priceShift ? item.priceShift : item.priceDay;
  const baseTotal = dailyRate * selectedDays;

  // Dynamic Promotion Engine from Admin CMS
  const promoResult = calculatePromo(item, selectedDays);
  const freeDays = promoResult.freeDays;
  const promoDiscountAmount = promoResult.discountAmount;
  const rentTotal = Math.max(0, baseTotal - promoDiscountAmount);

  // Accessories total
  const accessoriesTotal = (item.accessories || [])
    .filter((acc) => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.price, 0);

  const totalToPay = rentTotal + accessoriesTotal;

  const toggleAccessory = (accId: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(accId) ? prev.filter((id) => id !== accId) : [...prev, accId]
    );
  };

  const handleAddToCart = () => {
    addItem(item);
    setAddedToCartToast(true);
    setTimeout(() => {
      setAddedToCartToast(false);
      openCart();
    }, 400);
  };

  const handleDirectWhatsapp = () => {
    const itemName = language === "kz" ? item.nameKz : item.name;
    const durationUnit = isHeavy
      ? language === "kz"
        ? "ауысым"
        : "смен"
      : language === "kz"
      ? "тәулік"
      : "суток";

    const waNumber = settings?.whatsappNumber || MANAGER_WHATSAPP_NUMBER;

    if (!item.inStock) {
      const lines = [
        `*ЗАПРОС СРОКА АРЕНДЫ В СЕРВИСЕ PROKATEKA*`,
        `---------------------------------`,
        `*Техника:* ${itemName}`,
        `*Статус:* В данный момент на объекте`,
        `---------------------------------`,
        language === "kz"
          ? `Сәлеметсіз бе! Мені «${itemName}» қызықтырады. Осы жабдық қашан босайтынын немесе қоймада ұқсас бос құрал бар-жоғын білуге бола ма?`
          : `Здравствуйте! Интересует «${itemName}». Подскажите, пожалуйста, когда освободится данный инструмент или есть ли свободный аналог в наличии на складе?`,
      ];
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank");
      return;
    }

    // Silently log lead to Mini-CRM in Admin Panel
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: language === "kz" ? "Клиент WhatsApp (Карточка товара)" : "Клиент WhatsApp (Карточка товара)",
          customerPhone: "Не указан",
          equipmentId: item.id,
          equipmentName: itemName,
          days: selectedDays,
          totalPrice: totalToPay,
          deliveryType: "pickup",
          promoApplied: promoResult.promoApplied?.titleRu || undefined,
        }),
      }).catch(() => {});
    } catch {}

    const promoNote =
      promoDiscountAmount > 0
        ? language === "kz"
          ? ` (Акция: ${freeDays} күн сыйлыққа)`
          : ` (по акции: ${freeDays} ${freeDays === 1 ? "день" : "дня"} в подарок)`
        : "";

    const lines = [
      `ЗАКАЗ В СЕРВИСЕ PROKATEKA`,
      ``,
      `Техника: ${itemName}`,
      `Срок: ${selectedDays} ${durationUnit}${promoNote}`,
      `Сумма аренды: ${rentTotal.toLocaleString("ru-RU")} ₸`,
      ...(promoDiscountAmount > 0 ? [`Выгода по акции: -${promoDiscountAmount.toLocaleString("ru-RU")} ₸`] : []),
      `Залог: ${item.deposit > 0 ? `${item.deposit.toLocaleString("ru-RU")} ₸` : "0 ₸"}`,
      `ИТОГО: ${totalToPay.toLocaleString("ru-RU")} ₸`,
      ``,
      `Здравствуйте! Хочу забронировать эту модель на указанный срок. Сориентируйте по доставке?`,
    ];

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  // Similar items in category
  const similarItems = allItems.filter((i) => i.id !== item.id && i.tier === item.tier).slice(0, 3);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-10 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-brand-400 transition-colors">
            {language === "kz" ? "Басты бет" : "Главная"}
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-brand-400 transition-colors">
            {t.header.catalog}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate max-w-xs">
            {language === "kz" ? item.nameKz : item.name}
          </span>
        </div>

        {/* Back Button */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{t.productDetail.backToCatalog}</span>
        </Link>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Image Gallery & Badges (7 cols) */}
          <div className="lg:col-span-7">
            {/* Main Stage Image */}
            <div className="relative h-80 sm:h-96 md:h-[460px] w-full rounded-2xl overflow-hidden bg-navy-900 border border-white/10 shadow-2xl mb-4">
              <Image
                src={gallery[activePhotoIndex] || item.image}
                alt={language === "kz" ? item.nameKz : item.name}
                fill
                priority
                className={`object-cover transition-all duration-500 ${
                  item.inStock ? "" : "grayscale contrast-90 brightness-85"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md ${
                    item.inStock
                      ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-300"
                      : "bg-amber-950/80 border border-amber-500/40 text-amber-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.inStock ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                    }`}
                  />
                  <span>
                    {item.inStock ? t.catalog.inStock : t.catalog.outOfStock}
                  </span>
                </span>

                {item.popular && (
                  <span className="bg-brand-500 text-navy-950 text-xs font-extrabold uppercase px-2.5 py-1 rounded-full shadow">
                    TOP ВЫБОР
                  </span>
                )}
              </div>

              {/* Warehouse Location Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-navy-950/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span className="truncate">{language === "kz" ? item.branchKz : item.branch}</span>
                </div>
                {item.inStock ? (
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {language === "kz" ? "Беруге дайын" : "Готов к выдаче"}
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-400 font-semibold">
                    {language === "kz" ? "Қазір жалға берілген" : "В аренде на объекте"}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {gallery.map((photo, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setActivePhotoIndex(pIdx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activePhotoIndex === pIdx
                        ? "border-brand-500 shadow-md shadow-brand-500/20"
                        : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={photo} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Included in Box */}
            <div className="mt-8 p-5 rounded-2xl bg-navy-900 border border-white/10 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {t.productDetail.included}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.productDetail.includedText}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Quick Specs & Rent Calculator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-2">
                {language === "kz" ? item.categoryKz : item.category}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
                {language === "kz" ? item.nameKz : item.name}
              </h1>

              {/* Out of Stock Notice Banner */}
              {!item.inStock && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-amber-300 font-black text-sm">
                    !
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      {t.productDetail.rentedOutNoticeTitle}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t.productDetail.rentedOutNoticeDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-navy-900 border border-white/10 mb-6 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {dailyRate.toLocaleString("ru-RU")} ₸
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isHeavy ? t.catalog.perShift : t.catalog.perDay}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">{t.catalog.deposit}:</div>
                  <div className="text-sm font-bold text-amber-400">
                    {item.deposit > 0 ? `${item.deposit.toLocaleString("ru-RU")} ₸` : "0 ₸ (Без залога)"}
                  </div>
                </div>
              </div>

              {/* Days Quick Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isHeavy ? t.calculator.shiftsCount : t.calculator.daysCount}
                </label>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-3">
                  {(isHeavy ? [1, 2, 3, 5, 7, 14] : [1, 2, 3, 4, 7, 14]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDays(d)}
                      className={`py-2 text-center rounded-xl text-xs font-bold border transition-all ${
                        selectedDays === d
                          ? "bg-brand-500 text-navy-950 border-brand-500 font-extrabold shadow-md shadow-brand-500/20"
                          : "bg-navy-900 border-white/10 text-slate-300 hover:border-white/20"
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

                {/* Range bar */}
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={selectedDays}
                    onChange={(e) => setSelectedDays(Number(e.target.value))}
                    className="w-full accent-brand-500 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-white w-14 text-right">
                    {selectedDays} {isHeavy ? (language === "kz" ? "ауысым" : "смен") : language === "kz" ? "күн" : "дн."}
                  </span>
                </div>

                {/* Promo Callout Hint */}
                {isPromoEligible && selectedDays === 3 && (
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
                      onClick={() => setSelectedDays(4)}
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
                        ? `Акция: ${freeDays} күн сыйлыққа тегін қосылды!`
                        : `Акция: ${freeDays} ${freeDays === 1 ? "день" : "дня"} аренды в подарок (бесплатно)!`}
                    </span>
                  </div>
                )}
              </div>

              {/* Optional Accessories / Consumables */}
              {item.accessories && item.accessories.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-navy-900 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.productDetail.accessoriesTitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-3">
                    {t.productDetail.accessoriesSubtitle}
                  </p>
                  <div className="space-y-2">
                    {item.accessories.map((acc) => {
                      const isChecked = selectedAccessories.includes(acc.id);
                      return (
                        <label
                          key={acc.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-navy-950/80 border border-white/5 cursor-pointer text-xs select-none hover:border-brand-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAccessory(acc.id)}
                              className="w-3.5 h-3.5 rounded text-brand-500 bg-navy-900 border-white/20 focus:ring-brand-500"
                            />
                            <span className="text-slate-200">
                              {language === "kz" ? acc.nameKz : acc.name}
                            </span>
                          </div>
                          <span className="text-brand-400 font-semibold">
                            +{acc.price.toLocaleString("ru-RU")} ₸
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Breakdown Summary */}
              <div className="p-4 rounded-xl bg-navy-900 border border-white/10 mb-6 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Аренда ({selectedDays} {isHeavy ? "смен" : "суток"}):</span>
                  <span>{baseTotal.toLocaleString("ru-RU")} ₸</span>
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
                {accessoriesTotal > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Расходники и оснастка:</span>
                    <span>+{accessoriesTotal.toLocaleString("ru-RU")} ₸</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex items-baseline justify-between text-base font-extrabold text-white">
                  <span>Итого к оплате:</span>
                  <span className="text-xl text-brand-400">
                    {totalToPay.toLocaleString("ru-RU")} ₸
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-navy-850 hover:bg-navy-800 text-slate-200 border border-white/10 hover:border-brand-500/50 font-bold py-3 px-4 rounded-xl transition-all text-xs active:scale-[0.99]"
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

                {item.inStock ? (
                  <button
                    type="button"
                    onClick={handleDirectWhatsapp}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/50 transition-all text-sm active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>{t.productDetail.whatsappRentBtn}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleDirectWhatsapp}
                    className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-950/40 transition-all text-sm active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 fill-navy-950" />
                    <span>{t.productDetail.whatsappCheckDateBtn}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-850 text-slate-300 font-semibold py-2.5 px-4 rounded-xl border border-white/10 transition-colors text-xs"
                >
                  <span>{language === "kz" ? "Жеткізу мен кепілақыны есептеу" : "Рассчитать точную доставку и залог"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        {item.specs && item.specs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 shadow-inner">
                <Settings className="w-5 h-5" />
              </span>
              {t.productDetail.specsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gradient-to-r from-navy-900 to-navy-900/40 border border-white/5 hover:border-brand-500/30 transition-all text-sm gap-1 sm:gap-4 group"
                >
                  <span className="text-slate-400 font-medium flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-500 transition-colors" />
                    {language === "kz" ? spec.keyKz || spec.key : spec.key}
                  </span>
                  <span className="text-white font-bold sm:text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-navy-900 border border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {t.productDetail.descriptionTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === "kz" ? item.descriptionKz : item.description}
          </p>
        </div>

        {/* Similar Equipment */}
        {similarItems.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              {t.productDetail.similarTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {similarItems.map((sim) => (
                <Link
                  key={sim.id}
                  href={`/catalog/${sim.id}`}
                  className="group block p-4 rounded-2xl bg-navy-900 border border-white/10 hover:border-brand-500/50 transition-all"
                >
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-navy-950">
                    <Image src={sim.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-brand-400 transition-colors">
                    {language === "kz" ? sim.nameKz : sim.name}
                  </h4>
                  <div className="text-xs font-semibold text-brand-400 mt-1">
                    {(sim.tier === "heavy" && sim.priceShift ? sim.priceShift : sim.priceDay).toLocaleString("ru-RU")} ₸ / {sim.tier === "heavy" ? "смена" : "сутки"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer language={language} />

      {modalOpen && (
        <RentalCalculatorModal
          item={item}
          language={language}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
