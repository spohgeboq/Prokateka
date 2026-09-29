import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { CategoryDefinition } from "@/data/categories";

export const dynamic = "force-dynamic";


// GET /api/categories
export async function GET() {
  const db = readDb();
  return NextResponse.json(
    { success: true, categories: db.categories },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
  );
}

// POST /api/categories (Admin only)
export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const body = await req.json();
    if (!body.nameRu || !body.tier) {
      return NextResponse.json({ error: "Название и раздел обязательны" }, { status: 400 });
    }

    const db = readDb();
    const id = body.id || `cat-${Date.now()}`;
    const newCategory: CategoryDefinition = {
      id,
      nameRu: body.nameRu,
      nameKz: body.nameKz || body.nameRu,
      tier: body.tier,
      iconName: body.iconName || "Wrench",
      itemCount: 0,
      startPrice: Number(body.startPrice) || 3000,
      priceUnitRu: body.priceUnitRu || (body.tier === "heavy" ? "смена" : "сутки"),
      priceUnitKz: body.priceUnitKz || (body.tier === "heavy" ? "ауысым" : "тәулік"),
      descriptionRu: body.descriptionRu || "",
      descriptionKz: body.descriptionKz || "",
    };

    db.categories.push(newCategory);
    writeDb(db);
    return NextResponse.json({ success: true, category: newCategory });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// PUT /api/categories (Admin only)
export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const body = await req.json();
    const db = readDb();
    const index = db.categories.findIndex((c) => c.id === body.id);
    if (index === -1) return NextResponse.json({ error: "Категория не найдена" }, { status: 404 });

    db.categories[index] = { ...db.categories[index], ...body };
    writeDb(db);
    return NextResponse.json({ success: true, category: db.categories[index] });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// DELETE /api/categories (Admin only)
export async function DELETE(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

    const db = readDb();
    db.categories = db.categories.filter((c) => c.id !== id);
    writeDb(db);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
