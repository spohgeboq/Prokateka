import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function getDbData() {
  const fileData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(fileData);
}

function saveDbData(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET all tiers
export async function GET() {
  try {
    const db = getDbData();
    return NextResponse.json(db.tiers || []);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read tiers" }, { status: 500 });
  }
}

// POST new tier
export async function POST(req: Request) {
  try {
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
