-- URGENT FIX: Allow reading gallery items
-- Copy and paste this into Supabase SQL Editor and click RUN

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Public gallery items are viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON gallery;
DROP POLICY IF EXISTS "Allow public read access to active items" ON gallery;
DROP POLICY IF EXISTS "Allow service role full access" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated users to read all" ON gallery;

-- Step 2: Create simple, permissive policies

-- Allow ANYONE to read ALL gallery items (for now, we'll restrict later)
CREATE POLICY "allow_all_select"
ON gallery
FOR SELECT
TO public
USING (true);

-- Allow service role to do EVERYTHING
CREATE POLICY "allow_service_role_all"
ON gallery
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Step 3: Ensure RLS is enabled
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Step 4: Grant permissions
GRANT SELECT ON gallery TO anon;
GRANT SELECT ON gallery TO authenticated;
GRANT ALL ON gallery TO service_role;

-- Step 5: Verify - this should return your images
SELECT id, title, category, is_active, public_url 
FROM gallery 
ORDER BY created_at DESC;