import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { generateSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 });
    }

    const db = readDb();
    if (email.toLowerCase().trim() !== db.admin.email.toLowerCase().trim() || password !== db.admin.passwordHash) {
      return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
    }

    const token = generateSessionToken(db.admin.email);

    const response = NextResponse.json({ success: true, email: db.admin.email });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 14 * 24 * 60 * 60, // 14 days
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
