-- Verify Gallery Table Schema
-- Run this to check if all columns exist

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'gallery'
ORDER BY 
    ordinal_position;

-- Expected columns:
-- id, created_at, title, description, category
-- filename, file_path, file_size, mime_type, public_url
-- alt_text, tags, seo_title, seo_description
-- is_active, sort_order, width, height