import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import { CATALOG_ITEMS } from "@/data/catalog";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let items = CATALOG_ITEMS;
  try {
    const db = readDb();
    if (db && db.equipment) {
      items = db.equipment;
    }
  } catch {}

  const item = items.find((i) => i.id === id);
  if (!item) {
    return {
      title: "Аренда оборудования | PROkateka",
      description: "Аренда строительного оборудования и инструмента в Астане.",
    };
  }

  const title = `Аренда ${item.name} в Астане | Прокат PROkateka`;
  const description = `Взять в аренду ${item.name} по цене от ${item.priceDay.toLocaleString(
    "ru-RU"
  )} ₸/сут в Астане. Доставка на объект, официальный договор, залог ${item.deposit.toLocaleString(
    "ru-RU"
  )} ₸. Заказ онлайн через WhatsApp.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: item.image ? [{ url: item.image, alt: item.name }] : undefined,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
