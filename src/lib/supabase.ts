import { createClient } from "@supabase/supabase-js";

function cleanEnv(value: string | undefined) {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

export function getSupabaseConfig() {
  const url = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return {
    url,
    key,
    configured: url.startsWith("https://") && key.length > 20,
  };
}

export function createAnonSupabase() {
  const { url, key, configured } = getSupabaseConfig();

  if (!configured) {
    throw new Error("Supabase environment variables are not set.");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
