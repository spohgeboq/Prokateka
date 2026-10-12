import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import { CATALOG_ITEMS } from "@/data/catalog";
import { CATEGORIES } from "@/data/categories";

export async function generateMetadata(): Promise<Metadata> {
  let totalItems = CATALOG_ITEMS.length;
  let totalCategories = CATEGORIES.length;

  try {
    const db = readDb();
    if (db?.equipment?.length) totalItems = db.equipment.length;
    if (db?.categories?.length) totalCategories = db.categories.length;
  } catch {}

  const title = `Каталог оборудования — ${totalItems}+ единиц техники в аренду | PROkateka Астана`;
  const description = `Полный каталог аренды строительного инструмента и оборудования в Астане: виброплиты, шлепноги (вибротрамбовки), генераторы, отбойные молотки, осушители воздуха, тепловые пушки, безвоздушная покраска, мотобуры, строительные леса. ${totalItems} единиц техники в ${totalCategories} категориях. Цены от 3 000 ₸/сут, экспресс-доставка.`;

  return {
    title,
    description,
    keywords: [
      "каталог аренды инструмента астана",
      "прокат строительного инструмента астана",
      "аренда виброплиты астана",
      "аренда шлепноги астана",
      "аренда вибротрамбовки астана",
      "прокат генератора астана",
      "аренда отбойного молотка астана",
      "аренда компрессора астана",
      "аренда осушителя воздуха астана",
      "прокат тепловой пушки астана",
      "аренда окрасочного аппарата астана",
      "аренда мотобура астана",
      "аренда плиткореза астана",
      "аренда строительных лесов астана",
      "аренда мотопомпы астана",
      "құрылыс құралдарын жалға алу астана",
      "виброплита жалға алу",
      "генератор жалға алу",
    ],
    openGraph: {
      title,
      description,
      url: "https://prokateka.kz/catalog",
    },
    alternates: {
      canonical: "https://prokateka.kz/catalog",
    },
  };
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
