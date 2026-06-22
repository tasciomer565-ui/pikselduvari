-- Piksel Duvarı veritabanı şeması
-- Supabase SQL Editor'a yapıştırın

CREATE TABLE pixels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  owner_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  tooltip TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment',
    -- pending_payment | pending_approval | approved | rejected | payment_failed
  reserved_until TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dolu alanları hızlı sorgulamak için
CREATE INDEX idx_pixels_status ON pixels(status);
CREATE INDEX idx_pixels_coords ON pixels(x, y, width, height);

-- Süresi geçmiş rezervasyonları temizlemek için (cron job ya da manuel)
CREATE OR REPLACE FUNCTION cleanup_expired_reservations()
RETURNS void AS $$
  DELETE FROM pixels
  WHERE status = 'pending_payment'
    AND reserved_until < now();
$$ LANGUAGE sql;
