"use client";

import React from "react";
import { Language } from "@/data/translations";

interface MobileBottomNavProps {
  language?: Language;
  cartCount?: number;
  onOpenCart?: () => void;
}

// Mobile bottom navbar has been completely disabled per user requirement.
export const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  return null;
};
