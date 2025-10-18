# ☁️ Cloudinary Setup for Image Upload

## 🎯 Issue: Upload Failing

**Error:** `"Unknown API key your_api_key_2025_2025"`

**Cause:** Cloudinary credentials are placeholder values, not real API keys.

---

## 🚀 Quick Setup (Free Account)

### **Step 1: Create Cloudinary Account**

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **"Sign Up Free"**
3. Fill in your details:
   - Email: `marquiro17@gmail.com`
   - Password: Choose a secure password
   - Company: `Muebles Yeco`

### **Step 2: Get Your Credentials**

After signup, you'll see your **Dashboard** with:

```
Cloud Name: [your-cloud-name]
API Key: [your-api-key]
API Secret: [your-api-secret]
```

**Example:**

```
Cloud Name: muebles-yeco-gt
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123456
```

---

## ⚙️ **Step 3: Update Vercel Environment Variables**

### **In Vercel Dashboard:**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `muebles-yeco` project
3. Settings → Environment Variables
4. **Update these 3 variables:**

```
CLOUDINARY_CLOUD_NAME=[your-actual-cloud-name]
CLOUDINARY_API_KEY=[your-actual-api-key]
CLOUDINARY_API_SECRET=[your-actual-api-secret]
```

### **Example Values:**

```
CLOUDINARY_CLOUD_NAME=muebles-yeco-gt
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

---

## 🔄 **Step 4: Redeploy**

After updating environment variables:

1. **Vercel Dashboard** → Deployments
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## 🧪 **Step 5: Test Upload**

1. Go to: `https://muebles-yeco.vercel.app/admin`
2. Click **"Subir Archivos"**
3. **Drag & drop** an image or click to select
4. **Fill in details** (title, description, category)
5. Click **"Guardar en Galería"**

**Expected Result:** ✅ Upload successful!

---

## 💡 **Alternative: Skip Cloudinary (Temporary)**

If you want to test without Cloudinary, I can modify the upload to work with local files:

### **Option A: Local File Upload (No Cloud)**

- Files stored in `/images/` folder
- No external dependencies
- Works immediately

### **Option B: Use Cloudinary (Recommended)**

- Professional cloud storage
- Automatic optimization
- CDN delivery
- Unlimited storage

---

## 🔍 **Cloudinary Free Plan Benefits**

✅ **25 GB storage**  
✅ **25 GB bandwidth/month**  
✅ **Automatic image optimization**  
✅ **CDN delivery worldwide**  
✅ **Image transformations**  
✅ **Video support**

Perfect for a furniture business website!

---

## 🛠️ **Quick Fix Commands**

### **Test Current Cloudinary Config:**

```bash
curl -X POST https://muebles-yeco.vercel.app/api/admin/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@test-image.jpg"
```

### **Check Environment Variables:**

In Vercel Dashboard → Settings → Environment Variables, verify:

- `CLOUDINARY_CLOUD_NAME` ≠ `your_cloud_name`
- `CLOUDINARY_API_KEY` ≠ `your_api_key`
- `CLOUDINARY_API_SECRET` ≠ `your_api_secret`

---

## 📱 **Cloudinary Dashboard Features**

After setup, you can:

- **View uploaded images** in Cloudinary console
- **Manage storage** and bandwidth usage
- **Set up transformations** (resize, crop, etc.)
- **Monitor usage** and performance

---

## 🎯 **Expected Upload Flow**

### **After Cloudinary Setup:**

1. **Select image** in admin panel
2. **Image uploads** to Cloudinary
3. **Cloudinary returns** secure URL
4. **Image saved** to gallery database
5. **Image appears** in gallery management
6. **Image shows** on main website

---

## 🔐 **Security Notes**

### **Keep API Secret Safe:**

- ✅ Store in Vercel environment variables
- ❌ Never commit to Git
- ❌ Never share publicly

### **Cloudinary Security:**

- ✅ Automatic HTTPS
- ✅ Secure API authentication
- ✅ Access control options

---

## 📞 **Need Help?**

### **If Cloudinary signup fails:**

- Try different email
- Check spam folder for verification
- Use incognito/private browser

### **If credentials don't work:**

- Double-check copy/paste
- Ensure no extra spaces
- Try regenerating API key in Cloudinary

---

## 🎉 **Success Indicators**

### **Upload Working:**

- ✅ No "Unknown API key" error
- ✅ Image appears in Cloudinary dashboard
- ✅ Image shows in admin gallery
- ✅ Image visible on main website

---

**Next Step:** Create your free Cloudinary account and get the real API credentials!

**Time needed:** 5 minutes to setup + 3 minutes to deploy

**Result:** Fully working image upload system ✨
