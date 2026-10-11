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
  const description = `Полный каталог аренды строительного инструмента и оборудования в Астане. ${totalItems} единиц техники в ${totalCategories} категориях: перфораторы, виброплиты, генераторы, сварка, экскаваторы и спецтехника. Цены от 3 000 ₸/сут, доставка на объект.`;

  return {
    title,
    description,
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
