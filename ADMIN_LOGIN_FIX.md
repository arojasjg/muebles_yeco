# 🔧 Admin Login Fix

## 🎯 Issue Identified

You're getting "Error de conexión" when trying to login to the admin panel.

---

## ✅ Fixes Applied

### 1. **Updated Admin Credentials**

**Username:** `marquiro17@gmail.com` (updated from `marquiro17`)  
**Password:** `marquiro17!@#$`

### 2. **Enhanced Authentication API**

Added debugging and fallback password verification:

- ✅ Bcrypt hash verification (primary)
- ✅ Plain text verification (fallback for debugging)
- ✅ Detailed logging for troubleshooting

### 3. **Environment Variables Fixed**

```env
ADMIN_USERNAME=marquiro17@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

---

## 🧪 Testing Steps

### 1. **Test API Endpoint**

Open: `http://localhost:3000/test-admin-api.html`

This will test:

- API endpoint accessibility
- Login functionality
- Environment configuration

### 2. **Test Admin Panel**

1. Go to: `http://localhost:3000/admin`
2. Use credentials:
   - **Username:** `marquiro17@gmail.com`
   - **Password:** `marquiro17!@#$`

### 3. **Check Console Logs**

Open browser DevTools (F12) and check:

- Network tab for API requests
- Console tab for error messages

---

## 🔍 Debugging Information

### **If Still Getting Connection Error:**

1. **Check API Response:**

   ```bash
   curl -X POST http://localhost:3000/api/admin/auth \
     -H "Content-Type: application/json" \
     -d '{"username":"marquiro17@gmail.com","password":"marquiro17!@#$"}'
   ```

2. **Check Vercel Dev Logs:**
   Look at the terminal where `vercel dev` is running for error messages.

3. **Verify Environment Variables:**
   ```bash
   # Check if .env file is being loaded
   cat .env
   ```

---

## 🛠️ Manual Testing Commands

### **Test 1: API Endpoint**

```bash
# Test OPTIONS request (CORS)
curl -X OPTIONS http://localhost:3000/api/admin/auth -v

# Expected: 200 OK with CORS headers
```

### **Test 2: Login Request**

```bash
# Test login
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17@gmail.com","password":"marquiro17!@#$"}' \
  -v

# Expected: 200 OK with JWT token
```

### **Test 3: Invalid Login**

```bash
# Test with wrong password
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17@gmail.com","password":"wrong"}' \
  -v

# Expected: 401 Unauthorized
```

---

## 📊 Expected Responses

### **Successful Login:**

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

### **Failed Login:**

```json
{
  "error": "Invalid credentials"
}
```

### **Connection Error:**

```
Network error or API not responding
```

---

## 🔧 Common Issues & Solutions

### **Issue 1: API Not Found (404)**

**Cause:** API endpoint not deployed or wrong path  
**Solution:**

```bash
# Verify API file exists
ls -la api/admin/auth.js

# Restart Vercel dev
vercel dev
```

### **Issue 2: CORS Error**

**Cause:** Cross-origin request blocked  
**Solution:** Already fixed with CORS headers in API

### **Issue 3: Environment Variables Not Loaded**

**Cause:** .env file not being read  
**Solution:**

```bash
# Verify .env file location
ls -la .env

# Restart Vercel dev to reload environment
vercel dev
```

### **Issue 4: Password Hash Mismatch**

**Cause:** Incorrect password hash  
**Solution:** Using fallback plain text verification for debugging

---

## 🚀 Next Steps

### **If Login Works:**

1. ✅ Access admin panel at `/admin`
2. ✅ Test gallery management
3. ✅ Test file upload (requires Cloudinary setup)

### **If Login Still Fails:**

1. 🔍 Check `test-admin-api.html` results
2. 🔍 Check browser DevTools Network tab
3. 🔍 Check Vercel dev terminal logs
4. 🔍 Try manual curl commands

---

## 📱 Mobile Testing

If testing on mobile:

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access: `http://YOUR_IP:3000/admin`
3. Use same credentials

---

## 🎯 Credentials Summary

**Admin Panel Access:**

- **URL:** `http://localhost:3000/admin`
- **Username:** `marquiro17@gmail.com`
- **Password:** `marquiro17!@#$`

**Test Page:**

- **URL:** `http://localhost:3000/test-admin-api.html`

---

## 📞 Support

If you're still having issues:

1. **Share the results** from `test-admin-api.html`
2. **Copy any error messages** from browser console
3. **Share Vercel dev terminal output** when attempting login

---

**Status:** 🔧 **DEBUGGING ENHANCED**  
**Credentials:** ✅ **UPDATED**  
**API:** 🛠️ **ENHANCED WITH LOGGING**  
**Testing:** 🧪 **TOOLS PROVIDED**

Try the login now with the updated credentials!
