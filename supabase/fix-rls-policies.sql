-- Fix RLS Policies for Gallery Table
-- Run this in Supabase SQL Editor

-- First, let's check what policies exist
-- (Just for reference, don't need to run this part)
-- SELECT * FROM pg_policies WHERE tablename = 'gallery';

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Public gallery items are viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Enable read access for all users" ON gallery;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON gallery;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON gallery;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON gallery;

-- Create new permissive policies

-- 1. Allow EVERYONE to read active items (for public website)
CREATE POLICY "Allow public read access to active items"
ON gallery
FOR SELECT
USING (is_active = true);

-- 2. Allow SERVICE ROLE to do everything (for admin operations)
CREATE POLICY "Allow service role full access"
ON gallery
FOR ALL
USING (true)
WITH CHECK (true);

-- 3. Allow authenticated users to read all items (for admin panel)
CREATE POLICY "Allow authenticated users to read all"
ON gallery
FOR SELECT
TO authenticated
USING (true);

-- Verify RLS is enabled
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT SELECT ON gallery TO anon;
GRANT SELECT ON gallery TO authenticated;
GRANT ALL ON gallery TO service_role;

-- Update existing rows to ensure is_active is set
UPDATE gallery 
SET is_active = true 
WHERE is_active IS NULL;

-- Verify the data
SELECT id, title, category, is_active, created_at 
FROM gallery 
ORDER BY created_at DESC 
LIMIT 5;