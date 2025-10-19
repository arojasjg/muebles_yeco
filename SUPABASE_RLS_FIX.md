# 🔒 Supabase RLS Fix - Service Role Key Required

## ❌ **ISSUE: Row Level Security Policy Violation**

**Error:** `new row violates row-level security policy`  
**Status Code:** 403  
**Root Cause:** Using anonymous key for admin operations

---

## 🔍 **PROBLEM ANALYSIS**

### **What Happened:**

```
Upload Request → Supabase Storage
  ↓
Using: NEXT_PUBLIC_SUPABASE_ANON_KEY (anonymous key)
  ↓
Permission: READ ONLY ❌
  ↓
Result: 403 Forbidden - RLS policy violation
```

### **Why It Failed:**

Supabase has **Row Level Security (RLS)** enabled, which means:

- **Anonymous Key** = Read-only access (for public website)
- **Service Role Key** = Full admin access (bypasses RLS)

We were trying to **upload** (write operation) using the **anonymous key**, which only has **read** permissions.

---

## ✅ **SOLUTION IMPLEMENTED**

### **Created Admin Client:**

```javascript
// lib/supabase-admin.js
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ← Service role key!
);
```

### **Updated APIs:**

```javascript
// api/admin/upload.js
import { SupabaseAdminService } from "../../lib/supabase-admin.js";

// Now uses admin client (bypasses RLS)
await SupabaseAdminService.uploadImage(buffer, filename, category);
await SupabaseAdminService.insertGalleryItem(data);
```

---

## 🔑 **REQUIRED: Add Service Role Key**

### **Step 1: Get Your Service Role Key**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `igyvsqhxlvbcoolnleos`
3. Go to **Settings** → **API**
4. Find **Service Role Key** (secret)
5. Copy the key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

⚠️ **IMPORTANT:** This is a SECRET key - never expose it in frontend code!

### **Step 2: Add to Vercel Environment Variables**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `muebles-yeco`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   ```
   Name:  SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneXZzcWh4bHZiY29vbG5sZW9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDc3MzIxMiwiZXhwIjoyMDc2MzQ5MjEyfQ.YOUR_SERVICE_ROLE_KEY_HERE
   ```
5. Select **Production**, **Preview**, and **Development**
6. Click **Save**

### **Step 3: Add to Local .env File**

```bash
# Add to your .env file
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_SERVICE_ROLE_KEY_HERE
```

### **Step 4: Redeploy**

```bash
# Commit changes
git add .
git commit -m "fix: Use Supabase service role for admin operations"

# Push to trigger deployment
git push origin main
```

---

## 📊 **KEY COMPARISON**

### **Anonymous Key (Public):**

```
Purpose: Public website access
Permissions: READ ONLY
Use in: Frontend, public APIs
RLS: Enforced ✅
Example: Gallery display, public data
```

### **Service Role Key (Admin):**

```
Purpose: Admin operations
Permissions: FULL ACCESS (bypasses RLS)
Use in: Backend APIs only
RLS: Bypassed ⚠️
Example: Upload, delete, admin CRUD
```

---

## 🔒 **SECURITY BEST PRACTICES**

### **✅ DO:**

- Use service role key ONLY in backend APIs
- Store service role key in environment variables
- Never expose service role key in frontend
- Use anonymous key for public operations

### **❌ DON'T:**

- Never commit service role key to git
- Never use service role key in frontend code
- Never expose service role key in client-side JavaScript
- Never share service role key publicly

---

## 🧪 **TESTING AFTER FIX**

### **1. Verify Environment Variable:**

```bash
# In Vercel dashboard, check:
SUPABASE_SERVICE_ROLE_KEY = ey... (should be set)
```

### **2. Test Upload:**

1. Go to admin panel
2. Upload an image
3. Fill in title and category
4. Click "Guardar"
5. ✅ Should succeed without RLS error

### **3. Expected Success Response:**

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Muebles de oficina",
    "publicUrl": "https://igyvsqhxlvbcoolnleos.supabase.co/storage/v1/object/public/muebles_yeco/images/oficina/muebles-de-oficina-1760856253917.png"
  },
  "message": "Image uploaded successfully to Supabase"
}
```

---

## 📋 **FILES UPDATED**

### **Created:**

- ✅ `lib/supabase-admin.js` - Admin client with service role

### **Updated:**

- ✅ `api/admin/upload.js` - Uses admin client for uploads
- ✅ `api/admin/gallery.js` - Uses admin client for CRUD

### **Environment Variables Required:**

```bash
# Public (already set)
NEXT_PUBLIC_SUPABASE_URL=https://igyvsqhxlvbcoolnleos.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (anon key)

# Admin (NEEDS TO BE ADDED)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service role key) ⚠️ REQUIRED
```

---

## 🎯 **DEPLOYMENT CHECKLIST**

- [ ] Get service role key from Supabase dashboard
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to local `.env` file
- [ ] Commit and push changes
- [ ] Wait for Vercel deployment
- [ ] Test upload in admin panel
- [ ] Verify no RLS errors

---

## 🚀 **STATUS**

**Code Changes:** ✅ **COMPLETE**  
**Environment Variable:** ⚠️ **REQUIRED**  
**Deployment:** 🔄 **PENDING ENV VAR**

**Next Step:** Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables, then redeploy!
