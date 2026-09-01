import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "af_admin";

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set.");
  }
  return password;
}

export function createAdminToken() {
  return createHmac("sha256", getAdminPassword())
    .update("angelique-franco-admin")
    .digest("hex");
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  const expected = createAdminToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminLoggedIn() {
  const store = await cookies();
  return isValidAdminToken(store.get(COOKIE_NAME)?.value);
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export type RsvpRow = {
  id: string;
  full_name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  notes: string;
  created_at: string;
};

export async function fetchAdminRsvps(): Promise<RsvpRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const password = getAdminPassword();

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are not set.");
  }

  const response = await fetch(`${url}/functions/v1/admin-rsvps`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
      "x-admin-password": password,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(payload?.error || "Could not load RSVPs.");
  }

  const payload = (await response.json()) as { rsvps?: RsvpRow[] };
  return payload.rsvps ?? [];
}
