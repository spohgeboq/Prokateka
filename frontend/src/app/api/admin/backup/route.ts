import { NextResponse } from "next/server";
import { readDb, writeDb, DatabaseSchema } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/admin/backup -> Export full database as JSON download
export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const db = readDb();
    const jsonStr = JSON.stringify(db, null, 2);
    const dateStr = new Date().toISOString().split("T")[0];

    return new NextResponse(jsonStr, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="prokateka_backup_${dateStr}.json"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при создании резервной копии" }, { status: 500 });
  }
}

// POST /api/admin/backup -> Restore database from uploaded JSON
export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const payload = (await req.json()) as Partial<DatabaseSchema>;
    if (!payload || !Array.isArray(payload.equipment) || !Array.isArray(payload.categories)) {
      return NextResponse.json(
        { error: "Некорректный формат файла резервной копии" },
        { status: 400 }
      );
    }

    const currentDb = readDb();
    const updatedDb: DatabaseSchema = {
      equipment: payload.equipment || currentDb.equipment,
      categories: payload.categories || currentDb.categories,
      promotions: payload.promotions || currentDb.promotions,
      branches: payload.branches || currentDb.branches,
      settings: { ...currentDb.settings, ...(payload.settings || {}) },
      leads: payload.leads || currentDb.leads,
      admin: currentDb.admin, // keep current admin credentials intact
    };

    writeDb(updatedDb);

    return NextResponse.json({
      success: true,
      message: "База данных успешно восстановлена",
      counts: {
        equipment: updatedDb.equipment.length,
        categories: updatedDb.categories.length,
        branches: updatedDb.branches.length,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка при восстановлении базы данных" }, { status: 500 });
  }
}
