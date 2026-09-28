import { NextResponse } from "next/server";
import { readDb, writeDb, DynamicPromotion } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/promotions
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("activeOnly");

    const db = readDb();
    let promos = db.promotions;

    if (activeOnly === "true") {
      promos = promos.filter((p) => p.isActive);
    }

    return NextResponse.json({ success: true, count: promos.length, promotions: promos });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при получении акций" }, { status: 500 });
  }
}

// POST /api/promotions (Admin only: create new promotion)
export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.titleRu || !body.payDays || !body.freeDays) {
      return NextResponse.json({ error: "Заполните название и формулу акции (оплата дней + подарочные дни)" }, { status: 400 });
    }

    const db = readDb();
    const payDays = Number(body.payDays);
    const freeDays = Number(body.freeDays);
    const minDays = Number(body.minDays) || payDays + freeDays;

    const newPromo: DynamicPromotion = {
      id: body.id || `promo-${Date.now()}`,
      type: "x_plus_y",
      badgeRu: body.badgeRu || `${payDays}+${freeDays}`,
      badgeKz: body.badgeKz || `${payDays}+${freeDays}`,
      payDays,
      freeDays,
      minDays,
      titleRu: body.titleRu,
      titleKz: body.titleKz || body.titleRu,
      subtitleRu: body.subtitleRu || `Оплачивайте ${payDays} суток — ${freeDays} ${freeDays === 1 ? "день" : "дня"} в подарок!`,
      subtitleKz: body.subtitleKz || `${payDays} тәулікті төлеп — ${freeDays} күн тегін сыйлыққа алыңыз!`,
      descriptionRu: body.descriptionRu || "",
      descriptionKz: body.descriptionKz || "",
      applicableTiers: body.applicableTiers || ["tool", "equipment"],
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      createdAt: new Date().toISOString(),
    };

    db.promotions.push(newPromo);
    writeDb(db);

    return NextResponse.json({ success: true, promotion: newPromo });
  } catch (err) {
    return NextResponse.json({ error: "Не удалось добавить акцию" }, { status: 500 });
  }
}

// PUT /api/promotions (Admin only: update promotion)
export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID акции обязателен" }, { status: 400 });
    }

    const db = readDb();
    const index = db.promotions.findIndex((p) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Акция не найдена" }, { status: 404 });
    }

    db.promotions[index] = {
      ...db.promotions[index],
      ...body,
    };

    writeDb(db);
    return NextResponse.json({ success: true, promotion: db.promotions[index] });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при обновлении акции" }, { status: 500 });
  }
}

// DELETE /api/promotions (Admin only: delete promotion)
export async function DELETE(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID акции обязателен" }, { status: 400 });
    }

    const db = readDb();
    const initialLength = db.promotions.length;
    db.promotions = db.promotions.filter((p) => p.id !== id);

    if (db.promotions.length === initialLength) {
      return NextResponse.json({ error: "Акция не найдена" }, { status: 404 });
    }

    writeDb(db);
    return NextResponse.json({ success: true, message: "Акция успешно удалена" });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при удалении акции" }, { status: 500 });
  }
}
