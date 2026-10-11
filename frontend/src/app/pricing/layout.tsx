import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цены на аренду инструмента и спецтехники — PROkateka Астана",
  description:
    "Актуальные цены на прокат строительного инструмента и оборудования в Астане. Прайс-лист для физ. и юр. лиц. Акция 3+1: четвёртый день аренды бесплатно. Выгодные тарифы, прозрачные условия.",
  openGraph: {
    title: "Цены на аренду инструмента — PROkateka Астана",
    description:
      "Прайс-лист на аренду строительного инструмента. Акция 3+1, скидки для бизнеса.",
    url: "https://prokateka.kz/pricing",
  },
  alternates: {
    canonical: "https://prokateka.kz/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
