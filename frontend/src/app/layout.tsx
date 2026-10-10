import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { readDb } from "@/lib/db";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prokateka.kz";

export async function generateMetadata(): Promise<Metadata> {
  let googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";
  let yandexVerification = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "";

  try {
    const db = readDb();
    if (db?.settings?.googleVerification) {
      googleVerification = db.settings.googleVerification;
    }
    if (db?.settings?.yandexVerification) {
      yandexVerification = db.settings.yandexVerification;
    }
  } catch {}

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "PROkateka — Прокат и аренда строительного инструмента и спецтехники в Астане | Прокатека",
      template: "%s | PROkateka — Прокатека",
    },
    description:
      "PROkateka (Прокатека / Жалға беру орталығы) — официальный сервис аренды строительного инструмента, оборудования и тяжелой спецтехники в Астане. Доставка на объект, аренда без скрытых платежей, акции 3+1, работа с юр. и физ. лицами.",
    keywords: [
      "прокатека",
      "prokateka",
      "прокат инструмента",
      "прокат инструмента астана",
      "аренда инструмента",
      "аренда инструмента астана",
      "прокат строительного инструмента",
      "аренда строительного оборудования",
      "аренда спецтехники астана",
      "прокат отбойного молотка",
      "аренда виброплиты астана",
      "аренда генератора",
      "прокат перфоратора",
      "құралдарды жалға беру астана",
      "прокатека астана",
      "аренда лесов астана",
      "jalga beru astana",
    ],
    authors: [{ name: "PROkateka" }],
    creator: "PROkateka",
    publisher: "PROkateka",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        "ru-KZ": siteUrl,
        "kk-KZ": siteUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: "ru_KZ",
      alternateLocale: ["kk_KZ"],
      url: siteUrl,
      siteName: "PROkateka — Прокатека",
      title: "PROkateka — Прокат и аренда строительного инструмента и спецтехники в Астане",
      description:
        "Надежный прокат строительного оборудования: от перфоратора до КамАЗа и экскаватора. Быстрая доставка в день заказа, скидки 3+1, выгодные условия в Астане.",
      images: [
        {
          url: "/logo.jpeg",
          width: 800,
          height: 800,
          alt: "PROkateka — Центр аренды строительного инструмента и спецтехники",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "PROkateka — Прокат инструмента в Астане | Прокатека",
      description:
        "Аренда строительного инструмента и оборудования в Астане. Экспресс-доставка, лучшие цены, акция 3+1.",
      images: ["/logo.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: googleVerification || undefined,
      yandex: yandexVerification || undefined,
    },
    icons: {
      icon: "/logo.jpeg",
      shortcut: "/logo.jpeg",
      apple: "/logo.jpeg",
    },
    category: "construction",
  };
}

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "PROkateka",
      alternateName: ["Прокатека", "Жалға беру орталығы PROkateka", "ИП Прокатека"],
      url: siteUrl,
      logo: `${siteUrl}/logo.jpeg`,
      sameAs: [
        "https://2gis.kz/astana/geo/70000001065108547",
        "https://instagram.com/prokateka.kz",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+7-705-503-6772",
        contactType: "customer service",
        areaServed: ["KZ", "Astana"],
        availableLanguage: ["Russian", "Kazakh"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "PROkateka — Прокат строительного инструмента и спецтехники",
      alternateName: "Прокатека Астана",
      url: siteUrl,
      image: `${siteUrl}/logo.jpeg`,
      telephone: "+7-705-503-6772",
      priceRange: "₸₸",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Абикена Бектурова, 4Г",
        addressLocality: "Астана",
        addressRegion: "г. Астана",
        addressCountry: "KZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.1278,
        longitude: 71.4305,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "20:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "PROkateka",
      alternateName: "Прокатека",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/catalog?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
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
