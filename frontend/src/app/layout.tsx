import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROkateka | Центр аренды строительной техники и инструмента | Жалға беру орталығы",
  description: "Аренда строительного инструмента и спецтехники от перфоратора до КамАЗа и экскаватора. Быстрая доставка на объект, прозрачные цены, моментальный заказ в WhatsApp.",
  icons: {
    icon: "/logo.jpeg",
  },
};

import { DataProvider } from "@/context/DataContext";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen bg-navy-950 text-slate-100 flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <DataProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </DataProvider>
      </body>
    </html>
  );
}
