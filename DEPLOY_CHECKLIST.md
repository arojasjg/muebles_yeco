# Deployment Checklist - Muebles Yeco

## ✅ Pre-Deployment Verification

### 1. Environment Variables (Vercel)

Ensure these are set in Vercel dashboard:

```bash
# Supabase Configuration
SUPABASE_URL=https://igvvsqhlvbcoolntoos.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=[your-secure-password]

# Email Configuration (Gmail)
GMAIL_USER=marquiro17@gmail.com
GMAIL_APP_PASSWORD=[your-app-password]
CONTACT_EMAIL=marquiro17@gmail.com
```

### 2. Supabase Database Setup

#### Run SQL Migrations

Execute these SQL files in Supabase SQL Editor:

1. **`supabase/COPY_THIS_SQL.sql`** - Creates gallery table with all required columns
2. **`supabase/FIX_STORAGE_AND_RLS.sql`** - Sets up RLS policies for storage and database

#### Verify Database Schema

Check that `gallery` table has these columns:

- `id` (bigint, primary key)
- `title` (text)
- `description` (text)
- `category` (text)
- `public_url` (text) ⭐ **Critical for image display**
- `file_path` (text)
- `filename` (text)
- `alt_text` (text)
- `tags` (text[])
- `is_active` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- Plus: width, height, file_size, mime_type, etc.

#### Verify Storage Bucket

1. Bucket name: `muebles-yeco-gallery`
2. Public access: Enabled
3. RLS policies: Configured for public read, admin write

### 3. API Endpoints Verification

All endpoints should be accessible:

#### Public Endpoints

- ✅ `/api/gallery` - Returns gallery images from Supabase
- ✅ `/api/contact` - Handles contact form submissions

#### Admin Endpoints (require authentication)

- ✅ `/api/admin/auth` - Admin login
- ✅ `/api/admin/gallery` - CRUD operations for gallery
- ✅ `/api/admin/upload` - Image upload to Supabase

### 4. Frontend Configuration

#### Check API Endpoint Calls

Verify these files use correct endpoints:

**`js/furniture-optimized.js`:**

```javascript
// Main gallery load
const response = await fetch("/api/gallery"); ✅

// Modal gallery load
const response = await fetch("/api/gallery"); ✅
```

**`js/admin.js`:**

```javascript
// Should use /api/admin/* endpoints ✅
```

### 5. File Structure Check

```
/
├── index.html                    ✅ Main landing page
├── admin.html                    ✅ Admin panel
├── api/
│   ├── gallery.js               ✅ Public gallery API
│   ├── contact.js               ✅ Contact form API
│   └── admin/
│       ├── auth.js              ✅ Admin authentication
│       ├── gallery.js           ✅ Admin gallery CRUD
│       └── upload.js            ✅ Image upload
├── js/
│   ├── furniture-optimized.js   ✅ Main frontend logic
│   ├── admin.js                 ✅ Admin panel logic
│   └── gallery.js               ✅ Gallery component
├── lib/
│   ├── supabase.js              ✅ Public Supabase client
│   └── supabase-admin.js        ✅ Admin Supabase client
└── supabase/
    ├── COPY_THIS_SQL.sql        ✅ Database schema
    └── FIX_STORAGE_AND_RLS.sql  ✅ RLS policies
```

## 🚀 Deployment Steps

### Step 1: Push to Git

```bash
git add .
git commit -m "Fix: Gallery API endpoints and Supabase integration"
git push origin main
```

### Step 2: Vercel Auto-Deploy

Vercel will automatically deploy when you push to main branch.

### Step 3: Verify Deployment

1. Wait for Vercel deployment to complete
2. Check deployment logs for errors
3. Visit your production URL

## 🧪 Post-Deployment Testing

### Test 1: Main Page Gallery

1. Open `https://your-domain.com`
2. Scroll to gallery section
3. Verify images load from Supabase
4. Check browser console for errors
5. Click "Ver Galería Completa" button
6. Verify modal opens with all images

### Test 2: Admin Panel

1. Open `https://your-domain.com/admin.html`
2. Login with admin credentials
3. Verify gallery items load
4. Test image upload
5. Test edit functionality
6. Test delete functionality

### Test 3: Contact Form

1. Fill out contact form on main page
2. Submit form
3. Verify success message
4. Check email inbox for notification

### Test 4: Image Display

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check that images load from Supabase storage URLs:
   - Should see: `https://igvvsqhlvbcoolntoos.supabase.co/storage/v1/object/public/...`
   - Should NOT see: 404 errors or `images/oficina/...` paths

## 🐛 Troubleshooting

### Images Not Displaying

**Symptom:** Gallery shows empty or 404 errors

**Check:**

1. Database has `public_url` field populated
2. API returns `src` field with Supabase URL
3. Frontend uses correct `/api/gallery` endpoint
4. RLS policies allow public read access

**Fix:**

```sql
-- Verify RLS policies in Supabase
SELECT * FROM gallery WHERE is_active = true;
```

### Upload Not Working

**Symptom:** Upload fails or images don't appear

**Check:**

1. `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
2. Storage bucket exists and is public
3. RLS policies allow authenticated uploads

### Admin Panel Not Loading

**Symptom:** Admin panel shows errors

**Check:**

1. Admin credentials are correct
2. `/api/admin/auth` endpoint works
3. Browser has no CORS errors

## 📊 Monitoring

### Key Metrics to Watch

1. **API Response Times** - Should be < 500ms
2. **Image Load Times** - Should be < 2s
3. **Error Rate** - Should be < 1%
4. **Uptime** - Should be > 99.9%

### Vercel Analytics

Check Vercel dashboard for:

- Function execution logs
- Error tracking
- Performance metrics

### Supabase Monitoring

Check Supabase dashboard for:

- Database queries
- Storage usage
- API requests

## 🔒 Security Checklist

- [x] Service role key is environment variable (not in code)
- [x] Admin password is strong and secure
- [x] RLS policies prevent unauthorized access
- [x] CORS is properly configured
- [x] Input validation on all forms
- [x] SQL injection prevention (using Supabase client)

## 📝 Documentation

Key documents to reference:

- `GALLERY_API_FIX.md` - API endpoint fixes
- `SUPABASE_MIGRATION_COMPLETE.md` - Supabase setup
- `PRO_UPGRADE_COMPLETE.md` - Vercel Pro upgrade
- `ADMIN_CRUD_SUPABASE_COMPLETE.md` - Admin functionality

## ✨ Success Criteria

Deployment is successful when:

- [x] Main page loads without errors
- [x] Gallery displays images from Supabase
- [x] Admin panel allows CRUD operations
- [x] Contact form sends emails
- [x] No 404 errors in console
- [x] All API endpoints respond correctly
- [x] Images load from Supabase storage URLs

## 🎉 Go Live!

Once all checks pass, your site is ready for production use!

**Production URL:** https://your-domain.vercel.app
**Admin Panel:** https://your-domain.vercel.app/admin.html

---

**Last Updated:** January 19, 2025
**Version:** 2.0 (Supabase + Vercel Pro)
