import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публичная оферта — условия аренды оборудования PROkateka",
  description:
    "Общие условия аренды строительного оборудования ИП «Прокатека». Правила приёма-передачи, залог, ответственность сторон, условия доставки и возврата техники.",
  openGraph: {
    title: "Публичная оферта PROkateka — условия аренды",
    description:
      "Юридические условия аренды строительного оборудования в Астане.",
    url: "https://prokateka.kz/offer",
  },
  alternates: {
    canonical: "https://prokateka.kz/offer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
