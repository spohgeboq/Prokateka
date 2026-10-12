import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { readDb } from "@/lib/db";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prokateka.kz";

export async function generateMetadata(): Promise<Metadata> {
  let googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "XKqioAlDxGGs7zCTvM04SMDn5DiPKkOSHLyrosU6uxc";
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
      // Бренд и общие ВЧ запросы
      "прокатека",
      "prokateka",
      "prokateka kz",
      "prokateka астана",
      "прокатека астана",
      "прокатека сайт",
      "прокатека каталог",
      "прокат инструмента",
      "прокат инструментов астана",
      "аренда инструмента",
      "аренда инструментов астана",
      "прокат строительного инструмента",
      "аренда строительного оборудования",
      "аренда строительной техники астана",
      "прокат оборудования астана",
      "строительный инструмент напрокат",
      "прокат электроинструментов астана",
      // Казахский язык (семантическое ядро)
      "құрылыс құралдарын жалға алу астана",
      "құрал-саймандарды жалға беру",
      "құрылыс жабдықтарын жалға алу",
      "виброплита жалға алу",
      "генератор жалға алу",
      "құралдарды жалға беру астана",
      "компрессор жалға алу",
      "отбойник жалға алу",
      "астана құрылыс техникасын жалға беру",
      "jalga beru astana",
      // Народные и разговорные названия (P1 / P2 из семантики)
      "шлепнога аренда",
      "прокат шлепноги астана",
      "кузнечик аренда",
      "вибронога прокат",
      "чабанка аренда",
      "отбойник прокат астана",
      "отбойка аренда",
      "бензобур прокат астана",
      "дизельный генератор в аренду",
      "бензогенератор прокат астана",
      "вышка тура аренда астана",
      "леса строительные напрокат",
      "безвоздушный окрасочный аппарат аренда",
      "паркетошлифовальная машина аренда",
      "водяной плиткорез аренда",
      "грязевая мотопомпа аренда",
      // Основные категории техники
      "аренда виброплиты астана",
      "прокат виброплиты",
      "аренда вибротрамбовки",
      "аренда генератора астана",
      "аренда отбойного молотка астана",
      "аренда компрессора астана",
      "аренда швонарезчика астана",
      "аренда мотобура астана",
      "аренда осушителя воздуха астана",
      "аренда тепловой пушки астана",
      "аренда окрасочного аппарата астана",
      "аренда шлифмашины для пола",
      "аренда плиткореза астана",
      "аренда строительных лесов астана",
      "аренда мотопомпы астана",
      "аренда культиватора астана",
      "аренда газонокосилки астана",
      // География и доставка
      "аренда инструмента ильинка",
      "прокат инструмента қараөткел",
      "аренда инструмента талапкер",
      "аренда инструмента косшы",
      "прокат инструмента с доставкой астана",
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
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Виброплита или вибротрамбовка (шлепнога): в чем разница и что лучше выбрать?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Вибротрамбовка (шлепнога, вибронога, кузнечик, чабанка) идеальна для узких траншей, фундамента, глины и суглинка с мощным точечным ударом. Виброплита предназначена для больших площадей, песка, щебня, подушки под брусчатку и укладки асфальта.",
          },
        },
        {
          "@type": "Question",
          name: "Какой генератор нужен для стройки и как рассчитать мощность?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Учитывайте пусковые токи: у перфораторов, болгарок и компрессоров пусковая мощность в 2-3 раза выше номинальной. Для базового инструмента достаточно бензогенератора на 3-5 кВт. Для сварки или мощного компрессора нужен дизельный или бензиновый генератор от 6-8 до 15 кВт.",
          },
        },
        {
          "@type": "Question",
          name: "Как быстро высушить стяжку и штукатурку промышленным осушителем?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Промышленный осушитель воздуха собирает от 50 до 90 литров влаги в сутки, равномерно вытягивая влагу из толщи бетона без перегрева и растрескивания стяжки, сокращая срок сушки с 28 до 7-10 дней.",
          },
        },
        {
          "@type": "Question",
          name: "Каковы условия проката строительного инструмента и есть ли доставка по Астане?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Работаем с физлицами по договору и юрлицами с полным пакетом закрывающих документов (ЭСФ, акты). Экспресс-доставка техники день в день по Астане, а также в Ильинку (Қараөткел) и Талапкер. Действует акция 3+1 (4-й день бесплатно).",
          },
        },
      ],
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
        {/* AI Search Engine discoverability */}
        <meta name="ai-content-description" content="PROkateka — сервис аренды и проката строительного инструмента, оборудования и спецтехники в Астане. Каталог, цены, филиалы, акции, контакты. Rental service for construction tools and heavy machinery in Astana, Kazakhstan." />
        <meta name="subject" content="Аренда строительного инструмента и спецтехники" />
        <meta name="classification" content="Business, Construction Equipment Rental" />
        <meta name="coverage" content="Kazakhstan, Astana" />
        <meta name="directory" content="submission" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="3 days" />
        <meta httpEquiv="content-language" content="ru, kk" />
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
