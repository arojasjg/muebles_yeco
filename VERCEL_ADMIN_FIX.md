# 🔧 Vercel Admin API 404 Fix

## 🎯 Issue Identified

The admin API endpoints are returning 404 Not Found on Vercel production:

```
POST https://muebles-yeco.vercel.app/api/admin/auth
Status: 404 Not Found
```

## ✅ Root Cause Found

The `.vercelignore` file was excluding the `admin/` directory, which prevented `api/admin/` files from being deployed.

---

## 🛠️ Fixes Applied

### 1. **Updated .vercelignore**

```diff
# PHP files (not needed for static deployment)
- admin/
+ php/
*.php
*.php.bk
```

**Explanation:** Changed from excluding all `admin/` directories to only excluding `php/` directory, allowing `api/admin/` to be deployed.

### 2. **Verified API Structure**

```
api/
├── contact.js              ✅ Working
├── gallery-public.js       ✅ Working
└── admin/                  ❌ Was excluded, now ✅ Fixed
    ├── auth.js            ✅ Authentication API
    ├── gallery.js         ✅ Gallery management
    └── upload.js          ✅ File upload API
```

---

## 🚀 Deployment Steps

### 1. **Redeploy to Vercel**

```bash
# Method 1: Git push (if connected to GitHub)
git add .
git commit -m "Fix: Allow api/admin deployment by updating .vercelignore"
git push origin main

# Method 2: Direct Vercel deployment
vercel --prod --force
```

### 2. **Verify Environment Variables**

Make sure these are set in Vercel Dashboard:

```env
ADMIN_USERNAME=marquiro17@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.
JWT_SECRET=your-super-secret-jwt-key-change-in-production
GMAIL_USER=marquiro17@gmail.com
GMAIL_PASS=marquiro17!@#$
```

### 3. **Test API Endpoints**

After deployment, test:

```bash
# Test auth endpoint
curl -X POST https://muebles-yeco.vercel.app/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17@gmail.com","password":"marquiro17!@#$"}'

# Expected: 200 OK with JWT token
```

---

## 🧪 Verification Steps

### 1. **Check Vercel Function Logs**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Deployments"
4. Click on latest deployment
5. Check "Functions" tab
6. Verify `api/admin/auth.js` is listed

### 2. **Test Admin Login**

1. Go to: `https://muebles-yeco.vercel.app/admin`
2. Use credentials:
   - Username: `marquiro17@gmail.com`
   - Password: `marquiro17!@#$`
3. Should login successfully

### 3. **Check Network Tab**

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try login
4. Verify API call returns 200 instead of 404

---

## 🔍 Troubleshooting

### **If Still Getting 404:**

#### **Check 1: Verify Files Deployed**

```bash
# Check if admin files are in deployment
# In Vercel Dashboard → Functions tab
# Should see: api/admin/auth.js, api/admin/gallery.js, api/admin/upload.js
```

#### **Check 2: Environment Variables**

```bash
# In Vercel Dashboard → Settings → Environment Variables
# Verify all admin variables are set
```

#### **Check 3: Force Redeploy**

```bash
# Force a fresh deployment
vercel --prod --force

# Or trigger via Git
git commit --allow-empty -m "Force redeploy"
git push origin main
```

#### **Check 4: API File Structure**

Ensure files have correct export:

```javascript
// Each API file should have:
export default async function handler(req, res) {
  // API logic here
}
```

---

## 📊 Expected Results

### **Before Fix:**

```
❌ POST /api/admin/auth → 404 Not Found
❌ Admin login fails with "Error de conexión"
❌ Admin panel inaccessible
```

### **After Fix:**

```
✅ POST /api/admin/auth → 200 OK with JWT token
✅ Admin login successful
✅ Admin panel accessible at /admin
✅ Gallery management working
✅ File upload working (with Cloudinary)
```

---

## 🎯 Quick Test Commands

### **Test 1: API Availability**

```bash
curl -I https://muebles-yeco.vercel.app/api/admin/auth
# Expected: 200 OK (or 405 Method Not Allowed for GET)
```

### **Test 2: Login**

```bash
curl -X POST https://muebles-yeco.vercel.app/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17@gmail.com","password":"marquiro17!@#$"}'
# Expected: {"success":true,"token":"..."}
```

### **Test 3: Gallery API**

```bash
curl https://muebles-yeco.vercel.app/api/gallery-public
# Expected: {"success":true,"data":{"images":[],"videos":[]}}
```

---

## 📱 Mobile Testing

After fix, test on mobile:

1. Go to: `https://muebles-yeco.vercel.app/admin`
2. Login with credentials
3. Verify admin panel works on mobile

---

## 🔐 Security Note

After successful deployment, consider:

1. **Change JWT_SECRET** to a more secure value
2. **Use App Password** for Gmail instead of regular password
3. **Monitor function logs** for any security issues

---

## 📞 Next Steps

### **If Fix Works:**

1. ✅ Login to admin panel
2. ✅ Test gallery management
3. ✅ Setup Cloudinary for file uploads
4. ✅ Add content to gallery

### **If Still Issues:**

1. 🔍 Check Vercel deployment logs
2. 🔍 Verify environment variables
3. 🔍 Test API endpoints manually
4. 🔍 Check browser console for errors

---

## 🎉 Summary

**Issue:** `.vercelignore` was excluding `api/admin/` files  
**Fix:** Updated to exclude only `php/` directory  
**Action:** Redeploy to Vercel  
**Result:** Admin API endpoints should now work

**Status:** 🔧 **READY FOR REDEPLOYMENT**

Deploy now and the admin panel should work!
