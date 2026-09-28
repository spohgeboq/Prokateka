import { NextResponse } from "next/server";
import { readDb, writeDb, LeadItem } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";


// GET /api/leads (Admin only)
export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

  const db = readDb();
  return NextResponse.json({ success: true, count: db.leads.length, leads: db.leads });
}

// POST /api/leads (Public: silent recording when user sends WhatsApp inquiry)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.equipmentName) {
      return NextResponse.json({ error: "Данные неполны" }, { status: 400 });
    }

    const db = readDb();
    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customerName: body.customerName || "Без имени",
      customerPhone: body.customerPhone || "Не указан",
      equipmentId: body.equipmentId || "",
      equipmentName: body.equipmentName,
      days: Number(body.days) || 1,
      durationUnit: body.durationUnit || "суток",
      deliveryType: body.deliveryType || "pickup",
      address: body.address || "",
      totalPrice: Number(body.totalPrice) || 0,
      deposit: Number(body.deposit) || 0,
      promoApplied: body.promoApplied || undefined,
      status: "new",
    };

    db.leads.unshift(newLead);
    writeDb(db);

    return NextResponse.json({ success: true, leadId: newLead.id });
  } catch {
    return NextResponse.json({ error: "Ошибка записи заявки" }, { status: 500 });
  }
}

// PATCH /api/leads (Admin only: update status)
export async function PATCH(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const { id, status } = await req.json();
    const db = readDb();
    const lead = db.leads.find((l) => l.id === id);
    if (!lead) return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });

    lead.status = status;
    writeDb(db);

    return NextResponse.json({ success: true, lead });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// DELETE /api/leads (Admin only: delete single lead or clear completed)
export async function DELETE(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = readDb();

    if (id) {
      db.leads = db.leads.filter((l) => l.id !== id);
    }

    writeDb(db);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
