import { cookies } from "next/headers";
import { readDb } from "./db";

const SESSION_COOKIE_NAME = "prokateka_admin_token";
// Simple secure token payload: base64 encoded with timestamp & email check
const SECRET_SALT = "prokateka_secret_salt_2026";

export function generateSessionToken(email: string): string {
  const payload = {
    email,
    created: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload) + "::" + SECRET_SALT).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [jsonStr, salt] = decoded.split("::");
    if (salt !== SECRET_SALT) return false;
    const payload = JSON.parse(jsonStr);
    const db = readDb();
    if (payload.email !== db.admin.email) return false;
    // Session valid for 14 days
    if (Date.now() - payload.created > 14 * 24 * 60 * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { SESSION_COOKIE_NAME };
