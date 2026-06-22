import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const GRID_WIDTH = 1000;
export const GRID_HEIGHT = 1000;
export const BLOCK_SIZE = 10;
export const PIXEL_PRICE = 1;

export function isValidBlock(x: number, y: number, w: number, h: number) {
  if (x % BLOCK_SIZE !== 0 || y % BLOCK_SIZE !== 0) return false;
  if (w % BLOCK_SIZE !== 0 || h % BLOCK_SIZE !== 0) return false;
  if (x + w > GRID_WIDTH || y + h > GRID_HEIGHT) return false;
  if (w < BLOCK_SIZE || h < BLOCK_SIZE) return false;
  return true;
}

export function verifyAdmin(secret: string | null) {
  return secret === process.env.ADMIN_SECRET;
}
