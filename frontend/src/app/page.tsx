"use client";

import React, { useState } from "react";
import { Language } from "@/data/translations";
import { EquipmentItem, CATALOG_ITEMS } from "@/data/catalog";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { CatalogSection } from "@/components/CatalogSection";
import { WhatsAppExplainer } from "@/components/WhatsAppExplainer";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { BranchesSection } from "@/components/BranchesSection";
import { PromoBanner } from "@/components/PromoBanner";
import { Footer } from "@/components/Footer";
import { RentalCalculatorModal } from "@/components/RentalCalculatorModal";

import { useCart } from "@/context/CartContext";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("ru");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const { openCart, cartCount } = useCart();

  const handleSelectEquipment = (item: EquipmentItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-navy-950">
      {/* 1. Header with Language Switch & Search */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        cartCount={cartCount}
        onOpenCart={openCart}
      />

      {/* 2. Hero Section */}
      <main className="flex-1">
        <Hero
          language={language}
          onSelectTaskFilter={(query) => setSearchQuery(query)}
        />

        {/* 3. 12 Categories Visual Showcase */}
        <CategoryShowcase language={language} />

        {/* 3.1 Promotions Banner (Client Offer: 3+1 & Service Guarantees) */}
        <PromoBanner language={language} />

        {/* 4. Catalog Section with Interactive Filters */}
        <CatalogSection
          language={language}
          searchQuery={searchQuery}
          onSelectEquipment={handleSelectEquipment}
        />

        {/* 4. WhatsApp Direct Notification Explainer */}
        <WhatsAppExplainer language={language} />

        {/* 5. Features Grid */}
        <Features language={language} />

        {/* 6. How It Works */}
        <HowItWorks language={language} />

        {/* 7. Branches & Pickup Locations */}
        <BranchesSection language={language} />
      </main>

      {/* 8. Footer */}
      <Footer language={language} />

      {/* 9. Interactive Rental & WhatsApp Calculator Modal */}
      {selectedItem && (
        <RentalCalculatorModal
          item={selectedItem}
          language={language}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
