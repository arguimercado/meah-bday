"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, adminSessionValue, checkPassword, isAdmin } from "@/lib/admin-auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const attempt = String(formData.get("password") ?? "");
  if (!checkPassword(attempt)) {
    return { error: "That password isn't right." };
  }

  (await cookies()).set(ADMIN_COOKIE, adminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  refresh();
  return {};
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  refresh();
}

export async function deleteGuest(guestId: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
  await db.guest.delete({ where: { id: guestId } });
  refresh();
}
