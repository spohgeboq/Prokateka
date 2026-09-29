"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EquipmentItem, CATALOG_ITEMS, Tier } from "@/data/catalog";
import { CategoryDefinition, CATEGORIES } from "@/data/categories";
import { DynamicPromotion, BranchItem, SiteSettings } from "@/lib/db";

interface DataContextType {
  equipment: EquipmentItem[];
  promotions: DynamicPromotion[];
  categories: CategoryDefinition[];
  tiers: Tier[];
  branches: BranchItem[];
  settings: SiteSettings;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  calculatePromo: (item: EquipmentItem, days: number) => {
    promoApplied?: DynamicPromotion;
    freeDays: number;
    discountAmount: number;
    finalPrice: number;
    promoNote: string;
  };
}

const defaultSettings: SiteSettings = {
  whatsappNumber: "77056317887",
  contactPhone: "+7 (705) 631-78-87",
  workingHours: "Ежедневно: 08:00 – 20:00",
  companyName: "ИП «Прокатека»",
  companyBin: "970319350517",
  headName: "Рақымжан Наурыз Болатұлы",
  youtubeVideoUrl: "https://www.youtube.com/embed/yP2RjVf02g4",
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(CATALOG_ITEMS);
  const [categories, setCategories] = useState<CategoryDefinition[]>(CATEGORIES);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [promotions, setPromotions] = useState<DynamicPromotion[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = useCallback(async () => {
    try {
      const [eqRes, prRes, catRes, brRes, setRes, tierRes] = await Promise.all([
        fetch("/api/equipment", { cache: "no-store" }),
        fetch("/api/promotions", { cache: "no-store" }),
        fetch("/api/categories", { cache: "no-store" }),
        fetch("/api/branches", { cache: "no-store" }),
        fetch("/api/settings", { cache: "no-store" }),
        fetch("/api/tiers", { cache: "no-store" }),
      ]);

      if (eqRes.ok) {
        const data = await eqRes.json();
        if (data.items) setEquipment(data.items);
      }
      if (prRes.ok) {
        const data = await prRes.json();
        if (data.promotions) setPromotions(data.promotions);
      }
      if (catRes.ok) {
        const data = await catRes.json();
        if (data.categories) setCategories(data.categories);
      }
      if (brRes.ok) {
        const data = await brRes.json();
        if (data.branches) setBranches(data.branches);
      }
      if (setRes.ok) {
        const data = await setRes.json();
        if (data.settings) setSettings(data.settings);
      }
      if (tierRes.ok) {
        const data = await tierRes.json();
        if (Array.isArray(data)) setTiers(data);
      }
    } catch (err) {
      console.error("Failed to fetch dynamic data, using fallbacks:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    
    // Refresh data when window gets focus (e.g. user returns from another tab where admin panel is open)
    const onFocus = () => refreshData();
    window.addEventListener("focus", onFocus);
    
    return () => window.removeEventListener("focus", onFocus);
  }, [refreshData]);

  // Dynamic Promotion Engine
  const calculatePromo = useCallback(
    (item: EquipmentItem, days: number) => {
      const isHeavy = item.tier === "heavy";
      const dailyRate = isHeavy && item.priceShift ? item.priceShift : item.priceDay;
      const rawTotal = dailyRate * days;

      // Heavy machinery is billed per shift, promotional free days don't apply unless specified
      if (isHeavy) {
        return {
          promoApplied: undefined,
          freeDays: 0,
          discountAmount: 0,
          finalPrice: rawTotal,
          promoNote: "",
        };
      }

      // Find applicable active promotions
      const activePromos = promotions.filter(
        (p) => p.isActive && p.applicableTiers.includes(item.tier)
      );

      // Check for best matching promo
      let bestPromo: DynamicPromotion | undefined = undefined;
      let maxFreeDays = 0;

      for (const promo of activePromos) {
        if (promo.type === "x_plus_y" && promo.payDays && promo.freeDays) {
          const cycle = promo.payDays + promo.freeDays;
          if (days >= cycle) {
            const cyclesCount = Math.floor(days / cycle);
            const calculatedFree = cyclesCount * promo.freeDays;
            if (calculatedFree > maxFreeDays) {
              maxFreeDays = calculatedFree;
              bestPromo = promo;
            }
          }
        }
      }

      const discountAmount = maxFreeDays * dailyRate;
      const finalPrice = Math.max(0, rawTotal - discountAmount);

      return {
        promoApplied: bestPromo,
        freeDays: maxFreeDays,
        discountAmount,
        finalPrice,
        promoNote: bestPromo
          ? `(акция «${bestPromo.badgeRu}»: ${maxFreeDays} ${maxFreeDays === 1 ? "день" : "дня"} в подарок)`
          : "",
      };
    },
    [promotions]
  );

  return (
    <DataContext.Provider
      value={{
        equipment,
        promotions,
        categories,
        tiers,
        branches,
        settings,
        isLoading,
        refreshData,
        calculatePromo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
