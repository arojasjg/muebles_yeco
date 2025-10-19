-- Add Missing Columns to Gallery Table
-- Run this in Supabase SQL Editor

-- Add filename column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS filename VARCHAR(255);

-- Add file_path column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS file_path TEXT;

-- Add file_size column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS file_size INTEGER;

-- Add mime_type column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);

-- Add public_url column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS public_url TEXT;

-- Add alt_text column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS alt_text VARCHAR(255);

-- Add tags column (array of text)
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Add seo_title column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);

-- Add seo_description column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Add is_active column (if not exists)
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add sort_order column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add width column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS width INTEGER;

-- Add height column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS height INTEGER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_filename ON gallery(filename);
CREATE INDEX IF NOT EXISTS idx_gallery_public_url ON gallery(public_url);
CREATE INDEX IF NOT EXISTS idx_gallery_is_active ON gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON gallery(sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_tags ON gallery USING GIN(tags);

-- Update existing rows to have default values
UPDATE gallery 
SET 
  is_active = COALESCE(is_active, true),
  sort_order = COALESCE(sort_order, 0),
  tags = COALESCE(tags, ARRAY[]::TEXT[])
WHERE is_active IS NULL OR sort_order IS NULL OR tags IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN gallery.filename IS 'Original or sanitized filename';
COMMENT ON COLUMN gallery.file_path IS 'Path in Supabase storage bucket';
COMMENT ON COLUMN gallery.file_size IS 'File size in bytes';
COMMENT ON COLUMN gallery.mime_type IS 'MIME type (e.g., image/jpeg)';
COMMENT ON COLUMN gallery.public_url IS 'Public URL from Supabase storage';
COMMENT ON COLUMN gallery.alt_text IS 'Alt text for accessibility';
COMMENT ON COLUMN gallery.tags IS 'Array of tags for search/filtering';
COMMENT ON COLUMN gallery.seo_title IS 'SEO optimized title';
COMMENT ON COLUMN gallery.seo_description IS 'SEO optimized description';
COMMENT ON COLUMN gallery.is_active IS 'Whether item is visible on website';
COMMENT ON COLUMN gallery.sort_order IS 'Display order (lower = first)';
COMMENT ON COLUMN gallery.width IS 'Image width in pixels';
COMMENT ON COLUMN gallery.height IS 'Image height in pixels';