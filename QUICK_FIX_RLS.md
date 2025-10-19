# ⚡ Quick Fix - RLS Error

## 🎯 **THE PROBLEM**

Upload failing with: `new row violates row-level security policy`

## ✅ **THE SOLUTION**

Add Supabase Service Role Key to bypass RLS for admin operations.

---

## 🚀 **3-STEP FIX**

### **Step 1: Get Service Role Key** (2 minutes)

1. Go to: https://supabase.com/dashboard/project/igyvsqhxlvbcoolnleos/settings/api
2. Scroll to **Service Role Key** section
3. Click **Reveal** and **Copy** the key
4. It looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long)

### **Step 2: Add to Vercel** (2 minutes)

1. Go to: https://vercel.com/your-username/muebles-yeco/settings/environment-variables
2. Click **Add New**
3. Enter:
   - **Name:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** (paste the key from Step 1)
   - **Environment:** Select all (Production, Preview, Development)
4. Click **Save**

### **Step 3: Redeploy** (1 minute)

```bash
# Just push any change to trigger redeploy
git commit --allow-empty -m "trigger redeploy with service role key"
git push origin main
```

Or click **Redeploy** in Vercel dashboard.

---

## 🧪 **TEST IT**

1. Wait for deployment to finish (~2 minutes)
2. Go to your admin panel
3. Try uploading an image
4. ✅ Should work now!

---

## 📝 **WHAT WE CHANGED**

- Created `lib/supabase-admin.js` - Admin client with service role
- Updated `api/admin/upload.js` - Uses admin client
- Updated `api/admin/gallery.js` - Uses admin client for CRUD

**The code is ready, just needs the environment variable!**

---

## ⚠️ **SECURITY NOTE**

The Service Role Key:

- ✅ Bypasses all RLS policies (full admin access)
- ✅ Only used in backend APIs (never exposed to frontend)
- ✅ Stored securely in environment variables
- ❌ Never commit to git
- ❌ Never use in client-side code

---

## 🎉 **DONE!**

Once you add the `SUPABASE_SERVICE_ROLE_KEY` to Vercel and redeploy, uploads will work perfectly!
