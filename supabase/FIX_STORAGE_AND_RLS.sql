-- Complete Fix: Database RLS + Storage Policies
-- Run this in Supabase SQL Editor

-- ============================================
-- PART 1: Fix Gallery Table RLS Policies
-- ============================================

-- Drop all existing policies on gallery table
DROP POLICY IF EXISTS "Public gallery items are viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON gallery;
DROP POLICY IF EXISTS "Allow public read access to active items" ON gallery;
DROP POLICY IF EXISTS "Allow service role full access" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated users to read all" ON gallery;
DROP POLICY IF EXISTS "allow_all_select" ON gallery;
DROP POLICY IF EXISTS "allow_service_role_all" ON gallery;

-- Create new permissive policies for gallery table
CREATE POLICY "gallery_select_all"
ON gallery FOR SELECT
TO public
USING (true);

CREATE POLICY "gallery_service_role_all"
ON gallery FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT SELECT ON gallery TO anon;
GRANT SELECT ON gallery TO authenticated;
GRANT ALL ON gallery TO service_role;

-- ============================================
-- PART 2: Fix Storage Bucket Policies
-- ============================================

-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;

-- Create new storage policies for muebles_yeco bucket

-- 1. Allow EVERYONE to read/download files (public access)
CREATE POLICY "storage_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'muebles_yeco');

-- 2. Allow service role to upload files
CREATE POLICY "storage_service_upload"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'muebles_yeco');

-- 3. Allow service role to update files
CREATE POLICY "storage_service_update"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'muebles_yeco');

-- 4. Allow service role to delete files
CREATE POLICY "storage_service_delete"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'muebles_yeco');

-- ============================================
-- PART 3: Ensure Bucket is Public
-- ============================================

-- Make sure the bucket exists and is public
UPDATE storage.buckets
SET public = true
WHERE id = 'muebles_yeco';

-- ============================================
-- PART 4: Verify Everything
-- ============================================

-- Check gallery data
SELECT id, title, category, is_active, public_url 
FROM gallery 
ORDER BY created_at DESC 
LIMIT 5;

-- Check bucket configuration
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'muebles_yeco';

-- Check storage policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

-- Check gallery policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'gallery' 
AND schemaname = 'public';