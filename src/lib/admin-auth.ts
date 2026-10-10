import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "meah_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

/** The cookie holds an HMAC of the password, never the password itself. */
function sessionToken(password: string) {
  return createHmac("sha256", password).update("meah-bday-admin-session").digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isAdminConfigured() {
  return adminPassword().length > 0;
}

export function checkPassword(attempt: string) {
  const password = adminPassword();
  return password.length > 0 && safeEqual(sessionToken(attempt), sessionToken(password));
}

export function adminSessionValue() {
  return sessionToken(adminPassword());
}

export async function isAdmin() {
  if (!isAdminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return typeof value === "string" && safeEqual(value, adminSessionValue());
}
