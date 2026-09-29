import { NextResponse } from "next/server";
import { readDb, writeDb, BranchItem } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";


// GET /api/branches
export async function GET() {
  const db = readDb();
  return NextResponse.json(
    { success: true, branches: db.branches },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
  );
}

// POST /api/branches (Admin only)
export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const body = await req.json();
    if (!body.nameRu || !body.addressRu) {
      return NextResponse.json({ error: "Название и адрес филиала обязательны" }, { status: 400 });
    }

    const db = readDb();
    const id = body.id || `branch-${Date.now()}`;
    const newBranch: BranchItem = {
      id,
      nameRu: body.nameRu,
      nameKz: body.nameKz || body.nameRu,
      addressRu: body.addressRu,
      addressKz: body.addressKz || body.addressRu,
      gisLink: body.gisLink || "https://2gis.kz/astana/geo/70000001065108547",
      phone: body.phone || "+7 705 503 6772",
      workingHoursRu: body.workingHoursRu || "Ежедневно: 08:00 – 20:00",
      workingHoursKz: body.workingHoursKz || "Күн сайын: 08:00 – 20:00",
      isMain: Boolean(body.isMain),
    };

    db.branches.push(newBranch);
    writeDb(db);
    return NextResponse.json({ success: true, branch: newBranch });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// PUT /api/branches (Admin only)
export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const body = await req.json();
    const db = readDb();
    const index = db.branches.findIndex((b) => b.id === body.id);
    if (index === -1) return NextResponse.json({ error: "Филиал не найден" }, { status: 404 });

    db.branches[index] = { ...db.branches[index], ...body };
    writeDb(db);
    return NextResponse.json({ success: true, branch: db.branches[index] });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// DELETE /api/branches (Admin only)
export async function DELETE(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

    const db = readDb();
    db.branches = db.branches.filter((b) => b.id !== id);
    writeDb(db);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
