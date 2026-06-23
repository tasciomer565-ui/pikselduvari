-- Piksel Duvarı — Veritabanı Migration Dosyası
-- Bu dosya ile tüm tabloları sıfırdan oluşturabilirsiniz.

-- ─── Pixels tablosu ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pixels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  x INTEGER NOT NULL CHECK (x >= 0 AND x < 1000),
  y INTEGER NOT NULL CHECK (y >= 0 AND y < 1000),
  width INTEGER NOT NULL CHECK (width > 0 AND width % 10 = 0),
  height INTEGER NOT NULL CHECK (height > 0 AND height % 10 = 0),
  owner_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  tooltip TEXT DEFAULT '',
  image_url TEXT,
  price NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'reserved'
    CHECK (status IN ('reserved', 'pending_payment', 'pending_approval', 'approved', 'rejected')),
  paid_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_pixels_status ON pixels (status);
CREATE INDEX IF NOT EXISTS idx_pixels_coords ON pixels (x, y);
CREATE INDEX IF NOT EXISTS idx_pixels_created_at ON pixels (created_at DESC);

-- ─── Page Views (analytics) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views (page);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);

-- ─── Click Events (heatmap) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS click_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  region_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_click_events_coords ON click_events (x, y);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events (created_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Enable RLS on pixels table
ALTER TABLE pixels ENABLE ROW LEVEL SECURITY;

-- Allow public read of approved pixels
CREATE POLICY "Public can view approved pixels"
  ON pixels FOR SELECT
  USING (status = 'approved');

-- Allow service role to do everything
CREATE POLICY "Service role has full access"
  ON pixels FOR ALL
  USING (auth.role() = 'service_role');

-- ─── Realtime ────────────────────────────────────────────────────────────────
-- Enable Realtime for pixels table (run in Supabase Dashboard → Database → Replication)
-- ALTER PUBLICATION supabase_realtime ADD TABLE pixels;

-- ─── ALTER TABLE for existing installs (add new columns) ──────────────────────
-- Add rejection_reason column if not exists (for admin notes feature)
ALTER TABLE pixels ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE pixels ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
