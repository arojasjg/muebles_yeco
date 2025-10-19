# 🔧 Supabase Schema Fix - Add Missing Columns

## ❌ **ERRORS FOUND**

```
PGRST204: Could not find the 'alt_text' column
PGRST204: Could not find the 'seo_title' column
PGRST204: Could not find the 'filename' column
... and more
```

**Root Cause:** Your `gallery` table is missing columns that the code expects.

---

## ✅ **SOLUTION: Run SQL Migration**

### **Step 1: Open Supabase SQL Editor** (1 minute)

1. Go to: https://supabase.com/dashboard/project/igyvsqhxlvbcoolnleos
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**

### **Step 2: Copy & Run Migration** (1 minute)

Copy this SQL and paste it into the SQL Editor:

```sql
-- Add Missing Columns to Gallery Table

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
```

### **Step 3: Execute** (10 seconds)

1. Click **Run** (or press Ctrl+Enter / Cmd+Enter)
2. Wait for "Success" message
3. ✅ Done!

---

## 📊 **COMPLETE SCHEMA**

After running the migration, your `gallery` table will have:

### **Basic Info:**

- `id` - Primary key (int8)
- `created_at` - Timestamp (timestamptz)
- `title` - Image title (text)
- `description` - Image description (text)
- `category` - Category name (varchar)

### **File Info:**

- `filename` - Original/sanitized filename (varchar)
- `file_path` - Path in Supabase storage (text)
- `file_size` - File size in bytes (integer)
- `mime_type` - MIME type like image/jpeg (varchar)
- `public_url` - Public URL from Supabase (text)

### **SEO & Metadata:**

- `alt_text` - Alt text for accessibility (varchar)
- `tags` - Array of tags (text[])
- `seo_title` - SEO optimized title (varchar)
- `seo_description` - SEO description (text)

### **Display Control:**

- `is_active` - Show/hide on website (boolean)
- `sort_order` - Display order (integer)
- `width` - Image width in pixels (integer)
- `height` - Image height in pixels (integer)

---

## 🧪 **VERIFY SCHEMA**

After running the migration, verify all columns exist:

```sql
SELECT
    column_name,
    data_type,
    is_nullable
FROM
    information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'gallery'
ORDER BY
    ordinal_position;
```

You should see all 18 columns listed.

---

## 🚀 **TEST UPLOAD**

After adding the columns:

1. Go to your admin panel
2. Try uploading an image
3. Fill in title and category
4. Click "Guardar"
5. ✅ Should work without column errors!

---

## 📋 **WHAT EACH COLUMN DOES**

| Column            | Purpose       | Example                                               |
| ----------------- | ------------- | ----------------------------------------------------- |
| `filename`        | File name     | `mueble-oficina-1760856253917.png`                    |
| `file_path`       | Storage path  | `images/oficina/mueble-oficina-1760856253917.png`     |
| `file_size`       | Size in bytes | `1831879`                                             |
| `mime_type`       | File type     | `image/png`                                           |
| `public_url`      | Public URL    | `https://...supabase.co/storage/v1/object/public/...` |
| `alt_text`        | Accessibility | `Muebles de oficina modernos`                         |
| `tags`            | Search tags   | `["oficina", "moderno", "escritorio"]`                |
| `seo_title`       | SEO title     | `Muebles de Oficina - Muebles Yeco`                   |
| `seo_description` | SEO desc      | `Muebles de oficina modernos y funcionales...`        |
| `is_active`       | Visibility    | `true` or `false`                                     |
| `sort_order`      | Display order | `0`, `1`, `2`, etc.                                   |
| `width`           | Image width   | `1920`                                                |
| `height`          | Image height  | `1080`                                                |

---

## ⚠️ **IMPORTANT NOTES**

### **Safe to Run:**

- ✅ Uses `IF NOT EXISTS` - won't break existing columns
- ✅ Won't delete any data
- ✅ Adds indexes for better performance
- ✅ Sets default values for existing rows

### **Existing Data:**

- Existing rows will get default values:
  - `is_active` = `true`
  - `sort_order` = `0`
  - `tags` = `[]` (empty array)
- Other new columns will be `NULL` until updated

---

## 🎉 **RESULT**

After running this migration:

- ✅ No more "column not found" errors
- ✅ Uploads will work correctly
- ✅ All CRUD operations functional
- ✅ Better performance with indexes

---

## 📝 **FILES CREATED**

- `supabase/add-missing-columns.sql` - Migration script
- `supabase/verify-schema.sql` - Verification query

**Just run the migration in Supabase SQL Editor and you're done!** 🚀
