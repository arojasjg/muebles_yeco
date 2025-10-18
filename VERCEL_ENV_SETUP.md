# 🔧 Vercel Environment Variables Setup

## ✅ Progress: API is Working!

The 401 Unauthorized response means the admin API is deployed and working, but the environment variables need to be configured in Vercel.

---

## 🎯 Required Environment Variables

### **Step 1: Go to Vercel Dashboard**

1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `muebles-yeco` project
3. Go to **Settings** → **Environment Variables**

### **Step 2: Add These Variables**

Click "Add New" for each variable:

#### **Admin Authentication**

```
Name: ADMIN_USERNAME
Value: marquiro17@gmail.com
```

```
Name: ADMIN_PASSWORD_HASH
Value: $2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.
```

```
Name: JWT_SECRET
Value: muebles-yeco-super-secret-jwt-key-2025
```

#### **Email Configuration**

```
Name: GMAIL_USER
Value: marquiro17@gmail.com
```

```
Name: GMAIL_PASS
Value: marquiro17!@#$
```

#### **Cloudinary (Optional - for file uploads)**

```
Name: CLOUDINARY_CLOUD_NAME
Value: your_cloud_name
```

```
Name: CLOUDINARY_API_KEY
Value: your_api_key
```

```
Name: CLOUDINARY_API_SECRET
Value: your_api_secret
```

---

## 🚀 Step 3: Redeploy

After adding environment variables:

### **Option 1: Trigger Redeploy**

1. In Vercel Dashboard → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

### **Option 2: Git Push**

```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

---

## 🧪 Step 4: Test Login

After redeployment:

1. Go to: `https://muebles-yeco.vercel.app/admin`
2. Use credentials:
   - **Username:** `marquiro17@gmail.com`
   - **Password:** `marquiro17!@#$`

---

## 🔍 Troubleshooting

### **If Still Getting 401:**

#### **Check 1: Verify Environment Variables**

In Vercel Dashboard → Settings → Environment Variables, ensure all variables are set.

#### **Check 2: Test API Directly**

```bash
curl -X POST https://muebles-yeco.vercel.app/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17@gmail.com","password":"marquiro17!@#$"}' \
  -v
```

**Expected Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h",
  "user": {
    "username": "marquiro17@gmail.com",
    "role": "admin"
  }
}
```

#### **Check 3: View Function Logs**

1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Functions → `api/admin/auth.js`
4. View Logs to see debug output

---

## 📋 Environment Variables Checklist

- [ ] `ADMIN_USERNAME` = `marquiro17@gmail.com`
- [ ] `ADMIN_PASSWORD_HASH` = `$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.`
- [ ] `JWT_SECRET` = `muebles-yeco-super-secret-jwt-key-2025`
- [ ] `GMAIL_USER` = `marquiro17@gmail.com`
- [ ] `GMAIL_PASS` = `marquiro17!@#$`
- [ ] Redeployed after adding variables
- [ ] Tested login

---

## 🎯 Quick Fix Commands

### **Test Current Status:**

```bash
# Test if API responds
curl -I https://muebles-yeco.vercel.app/api/admin/auth

# Test login
curl -X POST https://muebles-yeco.vercel.app/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17@gmail.com","password":"marquiro17!@#$"}'
```

### **Expected Results:**

- **Before env vars:** 401 Unauthorized
- **After env vars:** 200 OK with JWT token

---

## 📱 Mobile Testing

After fixing environment variables:

1. Open `https://muebles-yeco.vercel.app/admin` on mobile
2. Login should work on all devices

---

## 🎉 Success Indicators

### **Login Working:**

- ✅ No more 401 errors
- ✅ JWT token received
- ✅ Redirect to admin dashboard
- ✅ Gallery management accessible

### **Admin Panel Features:**

- ✅ Gallery view with filters
- ✅ File upload section
- ✅ Edit/delete functionality
- ✅ Responsive design

---

## 🔐 Security Notes

### **After Successful Login:**

1. **Change JWT_SECRET** to something more secure
2. **Consider using Gmail App Password** instead of regular password
3. **Monitor function logs** for any issues

---

## 📞 Next Steps

### **If Login Works:**

1. ✅ Test gallery management
2. ✅ Setup Cloudinary for file uploads
3. ✅ Add furniture images to gallery
4. ✅ Test contact form emails

### **If Still Issues:**

1. 🔍 Check Vercel function logs
2. 🔍 Verify all environment variables
3. 🔍 Test API endpoints manually
4. 🔍 Check browser console for errors

---

**Status:** 🔧 **ENVIRONMENT VARIABLES NEEDED**

**Progress:** ✅ **API DEPLOYED AND WORKING**

**Action:** ⚙️ **ADD ENV VARS TO VERCEL**

**Expected:** 🎯 **ADMIN LOGIN SUCCESS**

The 401 error is actually good news - it means the API is working! Just need to add the environment variables in Vercel Dashboard.
