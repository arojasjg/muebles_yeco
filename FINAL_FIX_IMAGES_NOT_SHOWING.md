# 🔧 FINAL FIX - Images Not Showing

## ❌ **PROBLEM**

Images upload successfully but don't show in admin or landing page.
Error: `404 Not Found` when trying to load image URLs.

## 🔍 **ROOT CAUSE**

Two issues:

1. **Database RLS policies** blocking read access
2. **Storage bucket policies** blocking public access to images

## ✅ **SOLUTION**

### **Run This SQL in Supabase** (1 minute):

1. Go to: https://supabase.com/dashboard/project/igyvsqhxlvbcoolnleos/sql/new
2. Copy and paste this SQL:

```sql
-- Fix Gallery Table RLS
DROP POLICY IF EXISTS "Public gallery items are viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Allow public read access to active items" ON gallery;
DROP POLICY IF EXISTS "allow_all_select" ON gallery;
DROP POLICY IF EXISTS "allow_service_role_all" ON gallery;

CREATE POLICY "gallery_select_all"
ON gallery FOR SELECT TO public USING (true);

CREATE POLICY "gallery_service_role_all"
ON gallery FOR ALL TO service_role USING (true) WITH CHECK (true);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON gallery TO anon;
GRANT SELECT ON gallery TO authenticated;
GRANT ALL ON gallery TO service_role;

-- Fix Storage Bucket Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
DROP POLICY IF EXISTS "storage_service_upload" ON storage.objects;
DROP POLICY IF EXISTS "storage_service_update" ON storage.objects;
DROP POLICY IF EXISTS "storage_service_delete" ON storage.objects;

CREATE POLICY "storage_public_read"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'muebles_yeco');

CREATE POLICY "storage_service_upload"
ON storage.objects FOR INSERT TO service_role
WITH CHECK (bucket_id = 'muebles_yeco');

CREATE POLICY "storage_service_update"
ON storage.objects FOR UPDATE TO service_role
USING (bucket_id = 'muebles_yeco');

CREATE POLICY "storage_service_delete"
ON storage.objects FOR DELETE TO service_role
USING (bucket_id = 'muebles_yeco');

-- Make bucket public
UPDATE storage.buckets SET public = true WHERE id = 'muebles_yeco';

-- Verify
SELECT id, title, public_url FROM gallery ORDER BY created_at DESC LIMIT 3;
SELECT id, name, public FROM storage.buckets WHERE id = 'muebles_yeco';
```

3. Click **Run**
4. Check the results at the bottom - you should see your images

### **Then Redeploy** (1 minute):

```bash
git add .
git commit -m "fix: Complete RLS and storage policies"
git push origin main
```

## 🧪 **TEST**

After running the SQL:

1. **Check Supabase Storage:**

   - Go to: Storage → muebles_yeco bucket
   - You should see your uploaded images
   - Click on an image → Copy URL
   - Open URL in browser → Should show the image

2. **Check Admin Panel:**

   - Refresh admin page
   - Images should now appear in gallery

3. **Check Landing Page:**
   - Go to main website
   - Gallery section should show images

## 📋 **WHAT THIS FIXES**

### **Database (gallery table):**

- ✅ Allows public to READ all gallery items
- ✅ Allows service role to do EVERYTHING

### **Storage (muebles_yeco bucket):**

- ✅ Allows public to READ/download images
- ✅ Allows service role to upload/update/delete
- ✅ Makes bucket public

## 🎯 **EXPECTED RESULT**

**Before:**

```
GET https://muebles-yeco.vercel.app/images/test-1760857613781.png
→ 404 Not Found ❌
```

**After:**

```
GET https://igyvsqhxlvbcoolnleos.supabase.co/storage/v1/object/public/muebles_yeco/images/test/test-1760857613781.png
→ 200 OK ✅ (image displays)
```

## 🚀 **FILES CREATED**

- `supabase/FIX_STORAGE_AND_RLS.sql` - Complete fix with verification
- `FINAL_FIX_IMAGES_NOT_SHOWING.md` - This guide

**Just run the SQL and your images will show!** 🎉
