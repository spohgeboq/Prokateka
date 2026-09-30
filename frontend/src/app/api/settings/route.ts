import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";


// GET /api/settings
export async function GET() {
  const db = readDb();
  return NextResponse.json(
    { success: true, settings: db.settings },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
  );
}

// PUT /api/settings (Admin only)
export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const body = await req.json();
    const db = readDb();

    // Update settings
    if (body.settings) {
      db.settings = { ...db.settings, ...body.settings };
    }

    // Update admin credentials if provided
    if (body.adminEmail && body.adminEmail.trim()) {
      db.admin.email = body.adminEmail.trim();
    }
    if (body.adminPassword && body.adminPassword.trim()) {
      db.admin.passwordHash = body.adminPassword.trim();
    }

    writeDb(db);
    return NextResponse.json({ success: true, settings: db.settings, adminEmail: db.admin.email });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
