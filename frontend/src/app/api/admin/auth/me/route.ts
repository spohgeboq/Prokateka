import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const db = readDb();
  return NextResponse.json({
    authenticated: true,
    email: db.admin.email,
  });
}
