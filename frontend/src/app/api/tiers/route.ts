import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function getDbData(): any {
  return readDb();
}

function saveDbData(data: any) {
  writeDb(data);
}

// GET all tiers
export async function GET() {
  try {
    const db = getDbData();
    return NextResponse.json(db.tiers || [], {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read tiers" }, { status: 500 });
  }
}

// POST new tier
export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const db = getDbData();
    const newTier = await req.json();

    if (!newTier.id) {
      newTier.id = `tier-${Date.now()}`;
    }

    if (!db.tiers) {
      db.tiers = [];
    }
    
    db.tiers.push(newTier);
    saveDbData(db);

    return NextResponse.json(newTier);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save tier" }, { status: 500 });
  }
}

// PUT (update) existing tier
export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const db = getDbData();
    const updatedTier = await req.json();

    if (!db.tiers) db.tiers = [];
    
    db.tiers = db.tiers.map((t: any) => (t.id === updatedTier.id ? updatedTier : t));
    saveDbData(db);

    return NextResponse.json(updatedTier);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
  }
}

// DELETE a tier
export async function DELETE(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const db = getDbData();
    if (!db.tiers) db.tiers = [];
    
    db.tiers = db.tiers.filter((t: any) => t.id !== id);
    saveDbData(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete tier" }, { status: 500 });
  }
}
