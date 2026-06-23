/**
 * Environment variable validation
 * Validates required env vars on startup and throws descriptive errors.
 */

const REQUIRED_SERVER_VARS = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_KEY",
  "ADMIN_SECRET",
] as const;

const REQUIRED_PUBLIC_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_KEY",
] as const;

export function validateEnv() {
  const missing: string[] = [];

  for (const key of REQUIRED_SERVER_VARS) {
    if (!process.env[key]) missing.push(key);
  }

  for (const key of REQUIRED_PUBLIC_VARS) {
    if (!process.env[key]) missing.push(key);
  }

  if (missing.length > 0) {
    throw new Error(
      `Eksik environment değişkenleri: ${missing.join(", ")}\n` +
        `Lütfen .env.local dosyanızı kontrol edin.`
    );
  }
}

export const env = {
  supabaseUrl: process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY ?? "",
  adminSecret: process.env.ADMIN_SECRET ?? "",
  webhookUrl: process.env.WEBHOOK_URL ?? "",
  nextPublicUrl: process.env.NEXT_PUBLIC_URL ?? "https://pikselduvari.com",
};
