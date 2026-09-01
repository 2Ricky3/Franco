"use server";

import { redirect } from "next/navigation";
import { clearAdminCookie, setAdminCookie } from "@/lib/admin";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || password !== expected) {
    redirect("/admin?error=1");
  }

  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin");
}
