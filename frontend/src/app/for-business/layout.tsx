import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аренда спецтехники и инструмента для бизнеса (B2B) — PROkateka Астана",
  description:
    "Прокат строительного оборудования для юридических лиц и ИП. Работа по договору с НДС, выставление счёта и акта, оперативная доставка на объект. PROkateka — надежный партнер для строительных компаний в Астане.",
  openGraph: {
    title: "PROkateka для бизнеса — B2B аренда спецтехники с НДС",
    description:
      "Работаем с юр. лицами по договору. Счета, акты, доставка на объект.",
    url: "https://prokateka.kz/for-business",
  },
  alternates: {
    canonical: "https://prokateka.kz/for-business",
  },
};

export default function ForBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
