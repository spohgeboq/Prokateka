import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Акции и скидки на аренду инструмента — PROkateka Астана",
  description:
    "Действующие акции PROkateka: 3+1 (четвёртый день бесплатно), 5+2 (неделя по цене 5 дней), скидки для постоянных клиентов и строительных бригад. Экономьте на аренде техники в Астане.",
  openGraph: {
    title: "Акции PROkateka — бесплатные дни аренды инструмента",
    description:
      "3+1, 5+2 и другие акции на прокат строительного инструмента в Астане.",
    url: "https://prokateka.kz/promotions",
  },
  alternates: {
    canonical: "https://prokateka.kz/promotions",
  },
};

export default function PromotionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
