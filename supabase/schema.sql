-- Supabase Database Schema for Muebles Yeco
-- Enterprise-grade schema with proper indexing and constraints

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table for organizing furniture types
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  slug VARCHAR(100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery items table - main table for all furniture images
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  
  -- File information
  filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL, -- Supabase storage path
  file_size INTEGER,
  mime_type VARCHAR(100),
  
  -- URLs
  public_url TEXT NOT NULL, -- Supabase public URL
  thumbnail_url TEXT, -- Optional thumbnail
  
  -- Metadata
  width INTEGER,
  height INTEGER,
  alt_text VARCHAR(255),
  
  -- Status and organization
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  -- SEO and search
  tags TEXT[], -- Array of tags for search
  seo_title VARCHAR(255),
  seo_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Foreign key to categories (soft reference for flexibility)
  CONSTRAINT fk_category CHECK (category IS NOT NULL)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_items_created_at ON gallery_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_items_sort_order ON gallery_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_items_tags ON gallery_items USING GIN(tags);

-- Categories index
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_gallery_items_updated_at 
  BEFORE UPDATE ON gallery_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (name, description, slug) VALUES
  ('Sala', 'Muebles para sala de estar', 'sala'),
  ('Cocina', 'Muebles y gabinetes de cocina', 'cocina'),
  ('Dormitorio', 'Muebles para dormitorio', 'dormitorio'),
  ('Closet', 'Closets y armarios', 'closet'),
  ('Oficina', 'Muebles de oficina', 'oficina'),
  ('Baño', 'Muebles para baño', 'bano')
ON CONFLICT (slug) DO NOTHING;

-- Row Level Security (RLS) policies
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery items (for website visitors)
CREATE POLICY "Public gallery items are viewable by everyone" ON gallery_items
  FOR SELECT USING (is_active = true);

-- Public read access for categories
CREATE POLICY "Public categories are viewable by everyone" ON categories
  FOR SELECT USING (is_active = true);

-- Admin access policies (will be handled by service role in API)
-- These policies allow full access when using the service role key

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('muebles_yeco', 'muebles_yeco', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'muebles_yeco');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'muebles_yeco');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'muebles_yeco');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'muebles_yeco');

-- Create a view for public gallery access (optimized for frontend)
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
  created_at
FROM gallery_items 
WHERE is_active = true 
ORDER BY sort_order ASC, created_at DESC;

-- Grant access to the view
GRANT SELECT ON public_gallery TO anon, authenticated;