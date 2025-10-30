-- Add Liquidación (Clearance) Category to Muebles Yeco
-- Principal Engineer Implementation
-- Date: 2025-01-19

-- Insert the new Liquidación category
INSERT INTO categories (name, description, slug, is_active) 
VALUES (
  'Liquidación',
  'Muebles en liquidación con precios especiales - Últimas unidades disponibles',
  'liquidacion',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Add a new column to gallery_items for special pricing (optional but recommended)
ALTER TABLE gallery_items 
ADD COLUMN IF NOT EXISTS is_clearance BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS clearance_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS discount_percentage INTEGER;

-- Create index for clearance items for fast filtering
CREATE INDEX IF NOT EXISTS idx_gallery_items_clearance ON gallery_items(is_clearance) WHERE is_clearance = true;

-- Add comment for documentation
COMMENT ON COLUMN gallery_items.is_clearance IS 'Indicates if this item is in clearance/liquidation';
COMMENT ON COLUMN gallery_items.original_price IS 'Original price before clearance';
COMMENT ON COLUMN gallery_items.clearance_price IS 'Special clearance price';
COMMENT ON COLUMN gallery_items.discount_percentage IS 'Discount percentage for display (e.g., 30 for 30% off)';

-- Update the public_gallery view to include clearance information
CREATE OR REPLACE VIEW public_gallery AS
SELECT 
  id,
  title,
  description,
  category,
  public_url,
  thumbnail_url,
  width,
  height,
  alt_text,
  tags,
  sort_order,
  created_at,
  is_clearance,
  original_price,
  clearance_price,
  discount_percentage
FROM gallery_items 
WHERE is_active = true 
ORDER BY 
  -- Clearance items appear first for visibility
  is_clearance DESC,
  sort_order ASC, 
  created_at DESC;

-- Grant access to the updated view
GRANT SELECT ON public_gallery TO anon, authenticated;

-- Optional: Create a dedicated view for clearance items only
CREATE OR REPLACE VIEW clearance_gallery AS
SELECT 
  id,
  title,
  description,
  category,
  public_url,
  thumbnail_url,
  width,
  height,
  alt_text,
  tags,
  sort_order,
  created_at,
  original_price,
  clearance_price,
  discount_percentage,
  -- Calculate savings
  (original_price - clearance_price) as savings_amount
FROM gallery_items 
WHERE is_active = true 
  AND is_clearance = true
ORDER BY 
  discount_percentage DESC,
  created_at DESC;

-- Grant access to clearance view
GRANT SELECT ON clearance_gallery TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Liquidación category added successfully!';
  RAISE NOTICE '✅ Clearance pricing columns added to gallery_items';
  RAISE NOTICE '✅ Indexes created for performance';
  RAISE NOTICE '✅ Views updated with clearance information';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Next steps:';
  RAISE NOTICE '1. Update admin panel to include "Liquidación" category';
  RAISE NOTICE '2. Add clearance badge/styling to frontend';
  RAISE NOTICE '3. Test filtering by clearance category';
END $$;
