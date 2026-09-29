import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { EquipmentItem } from "@/data/catalog";

export const dynamic = "force-dynamic";


// GET /api/equipment (Public)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get("tier");
    const category = searchParams.get("category");
    const inStock = searchParams.get("inStock");

    const db = readDb();
    let items = db.equipment;

    if (tier && tier !== "all") {
      items = items.filter((item) => item.tier === tier);
    }
    if (category && category !== "all") {
      items = items.filter((item) => item.categoryId === category);
    }
    if (inStock === "true") {
      items = items.filter((item) => item.inStock);
    }

    return NextResponse.json({ success: true, count: items.length, items });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при получении каталога" }, { status: 500 });
  }
}

// POST /api/equipment (Admin only: create new item)
export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name || !body.tier) {
      return NextResponse.json({ error: "Укажите название и категорию техники" }, { status: 400 });
    }

    const db = readDb();
    const id = body.id || `item-${Date.now()}`;

    const newItem: EquipmentItem = {
      id,
      name: body.name,
      nameKz: body.nameKz || body.name,
      tier: body.tier,
      categoryId: body.categoryId || "general",
      category: body.category || "Общее оборудование",
      categoryKz: body.categoryKz || "Жалпы жабдықтар",
      powerType: body.powerType || "220v",
      image: body.image || "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      gallery: body.gallery || [body.image || "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"],
      priceDay: Number(body.priceDay) || 0,
      priceShift: body.priceShift ? Number(body.priceShift) : undefined,
      deposit: Number(body.deposit) || 0,
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
      stockCount: 1,
      branch: body.branch || "Склад Бектурова 4Г (Астана)",
      branchKz: body.branchKz || "Бектұров 4Г қоймасы (Астана)",
      branchId: body.branchId || "astana-bekturova",
      popular: Boolean(body.popular),
      featured: Boolean(body.featured),
      operatorIncluded: Boolean(body.operatorIncluded),
      specs: body.specs || [],
      accessories: body.accessories || [],
      description: body.description || "",
      descriptionKz: body.descriptionKz || "",
    };

    db.equipment.unshift(newItem);
    writeDb(db);

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: "Не удалось добавить позицию" }, { status: 500 });
  }
}

// PUT /api/equipment (Admin only: update item or toggle status)
export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID позиции обязателен" }, { status: 400 });
    }

    const db = readDb();
    const index = db.equipment.findIndex((i) => i.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Позиция не найдена" }, { status: 404 });
    }

    // Merge updates
    db.equipment[index] = {
      ...db.equipment[index],
      ...body,
    };

    writeDb(db);
    return NextResponse.json({ success: true, item: db.equipment[index] });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при обновлении" }, { status: 500 });
  }
}

// DELETE /api/equipment (Admin only: delete item)
export async function DELETE(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID позиции обязателен" }, { status: 400 });
    }

    const db = readDb();
    const initialLength = db.equipment.length;
    db.equipment = db.equipment.filter((i) => i.id !== id);

    if (db.equipment.length === initialLength) {
      return NextResponse.json({ error: "Позиция не найдена" }, { status: 404 });
    }

    writeDb(db);
    return NextResponse.json({ success: true, message: "Позиция удалена" });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при удалении" }, { status: 500 });
  }
}
