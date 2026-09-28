import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Доступ запрещен" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // We get file extension
    const filename = file.name || "upload.jpg";
    const ext = path.extname(filename) || ".jpg";
    const newFilename = `${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, newFilename);
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${newFilename}`;

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Ошибка при загрузке файла" }, { status: 500 });
  }
}
