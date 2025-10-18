# 📋 Admin Panel Navigation Guide

## 🎯 How to Access Upload and Edit Features

### **Current Admin Panel Sections:**

1. **📊 Galería** - View and manage existing images
2. **📁 Subir Archivos** - Upload new images and videos
3. **🚪 Cerrar Sesión** - Logout

---

## 🔄 **Step-by-Step Navigation**

### **1. Upload New Images**

1. **Login to admin panel:** `https://muebles-yeco.vercel.app/admin`
2. **Click "Subir Archivos" button** in the top navigation
3. **You should see:**
   - Drag & drop area
   - File selection button
   - Upload form

### **2. Edit Existing Images**

1. **Stay in "Galería" section** (default view)
2. **Look for existing images** in the grid
3. **Click "✏️ Editar" button** on any image
4. **Edit modal should open** with:
   - Title field
   - Description field
   - Category dropdown
   - Status toggle

---

## 🧪 **Troubleshooting Navigation**

### **If "Subir Archivos" doesn't work:**

1. **Check browser console** (F12 → Console tab)
2. **Look for JavaScript errors**
3. **Try refreshing the page**
4. **Make sure you're logged in**

### **If no images show in gallery:**

1. **Click "🔄 Actualizar" button**
2. **Check the status message**
3. **Try different filter options**

---

## 🎨 **What You Should See**

### **Gallery Section (Default):**

```
📊 Gestión de Galería                    🔄 Actualizar

[Filter Dropdowns: Categories | Status]

[Grid of images with Edit/Delete buttons]
```

### **Upload Section:**

```
📁 Subir Nuevos Archivos

[Drag & Drop Area]
📁 Arrastra archivos aquí o haz clic para seleccionar
Formatos soportados: JPG, PNG, WebP, MP4, WebM (máx. 10MB)

[Upload Form - appears after selecting file]
```

---

## 🔧 **Quick Debug Steps**

### **1. Check Navigation Buttons**

Look for these buttons in the top bar:

- **Galería** (should be active/highlighted)
- **Subir Archivos** (click this for upload)
- **Cerrar Sesión** (logout)

### **2. Test Section Switching**

```javascript
// Open browser console (F12) and run:
document.querySelector('[data-section="upload"]').click();
```

### **3. Check Current Section**

```javascript
// In browser console:
console.log(document.querySelector(".admin-section.active").id);
// Should show: "gallerySection" or "uploadSection"
```

---

## 📱 **Mobile Navigation**

On mobile devices:

1. **Navigation might be collapsed**
2. **Look for hamburger menu** (☰)
3. **Tap to expand navigation**
4. **Select "Subir Archivos"**

---

## 🎯 **Expected Behavior**

### **Gallery Section Features:**

- ✅ View all uploaded images
- ✅ Filter by category (Sala, Dormitorio, etc.)
- ✅ Filter by status (Active/Inactive)
- ✅ Edit button on each image
- ✅ Delete button on each image
- ✅ Refresh button

### **Upload Section Features:**

- ✅ Drag & drop file upload
- ✅ Click to select files
- ✅ File validation (type & size)
- ✅ Upload progress indication
- ✅ Metadata form (title, description, category)
- ✅ Save to gallery button

---

## 🔍 **If Still Not Working**

### **Check These:**

1. **JavaScript Console Errors:**

   - Press F12 → Console tab
   - Look for red error messages
   - Share any errors you see

2. **Network Tab:**

   - Press F12 → Network tab
   - Try clicking "Subir Archivos"
   - Check if any requests fail

3. **Admin Panel State:**
   ```javascript
   // Check if admin panel is properly initialized
   console.log(window.adminPanel);
   ```

---

## 📞 **Quick Test**

Try this in browser console (F12):

```javascript
// Force switch to upload section
document
  .querySelectorAll(".admin-section")
  .forEach((s) => s.classList.remove("active"));
document.getElementById("uploadSection").classList.add("active");
document
  .querySelectorAll(".nav-btn")
  .forEach((b) => b.classList.remove("active"));
document.querySelector('[data-section="upload"]').classList.add("active");
```

---

## 🎉 **Success Indicators**

### **Upload Section Working:**

- ✅ "Subir Archivos" button is highlighted
- ✅ Drag & drop area is visible
- ✅ File input works when clicked
- ✅ Upload form appears after file selection

### **Edit Feature Working:**

- ✅ Images show in gallery grid
- ✅ "✏️ Editar" buttons are visible
- ✅ Edit modal opens when clicked
- ✅ Form fields are populated with current data

---

**Try clicking "Subir Archivos" in the top navigation bar - that should take you to the upload section!**
