import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты PROkateka — телефон, WhatsApp, адрес в Астане",
  description:
    "Свяжитесь с PROkateka: телефон +7 705 503 6772, WhatsApp, адрес склада Бектурова 4Г, Астана. Ежедневно 08:00–20:00. Быстрое согласование аренды строительного инструмента и техники.",
  openGraph: {
    title: "Контакты PROkateka — телефон, WhatsApp, адрес в Астане",
    description:
      "Телефон +7 705 503 6772, WhatsApp, адрес: Бектурова 4Г, Астана. Отвечаем без выходных.",
    url: "https://prokateka.kz/contacts",
  },
  alternates: {
    canonical: "https://prokateka.kz/contacts",
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
