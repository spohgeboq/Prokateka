import { MetadataRoute } from "next";
import { readDb } from "@/lib/db";
import { CATALOG_ITEMS } from "@/data/catalog";
import { CATEGORIES } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prokateka.kz";
  const now = new Date();

  // Основные статические страницы сайта
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/branches`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/promotions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/for-business`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/offer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Динамические страницы оборудования
  let equipmentList = CATALOG_ITEMS;
  try {
    const db = readDb();
    if (db && db.equipment && db.equipment.length > 0) {
      equipmentList = db.equipment;
    }
  } catch (err) {
    console.error("Error reading db for sitemap:", err);
  }

  const equipmentRoutes: MetadataRoute.Sitemap = equipmentList.map((item) => ({
    url: `${baseUrl}/catalog/${encodeURIComponent(item.id)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Страницы фильтрации по категориям каталога
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/catalog?category=${encodeURIComponent(cat.id)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...categoryRoutes, ...equipmentRoutes];
}
