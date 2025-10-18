# 🎨 Image Gallery PDF - Professional Photo Management

A modern, responsive web application for managing image galleries and generating professional PDF albums.

## ✨ Features

### 🖼️ **Gallery Management**

- **Automatic Image Loading**: Scans `/images/` directory on page load
- **File Upload**: Drag & drop or click to upload multiple images
- **Image Search**: Real-time search through image names
- **Sorting Options**: Sort by name, date, or file size
- **Delete Images**: Remove images from server (with confirmation)
- **Responsive Grid**: Adapts to any screen size

### 📄 **PDF Generation**

- **Professional Layouts**: Optimized grid layouts with proper spacing
- **High Quality**: Maintains image quality while optimizing file size
- **Multiple Pages**: Automatically distributes images across pages
- **Instant Download**: Generate and download PDFs in seconds
- **Progress Tracking**: Real-time progress indicators

### 🎯 **User Experience**

- **Lightbox View**: Full-screen image viewing with navigation
- **Touch Friendly**: Optimized for mobile and tablet devices
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Keyboard Navigation**: Arrow keys for lightbox navigation

## 🚀 Quick Start

### Option 1: PHP Development Server (Recommended)

```bash
# Navigate to project directory
cd ~/Sites/catalogo

# Start the server
./start-server.sh

# Or manually:
php -S localhost:8000
```

### Option 2: Using Herd/Valet

```bash
# Link the project
herd link catalogo

# Access via: http://catalogo.test
```

## 📁 Project Structure

```
catalogo/
├── index.php              # Main application
├── upload.php             # File upload handler
├── delete.php             # File deletion handler
├── images/                # Image storage directory
├── css/                   # Stylesheets
│   ├── styles.css         # Base styles & variables
│   ├── hero.css           # Hero section styles
│   ├── gallery.css        # Gallery & lightbox styles
│   └── responsive.css     # Mobile responsiveness
├── js/                    # JavaScript modules
│   ├── main.js            # Application coordinator
│   ├── gallery.js         # Gallery functionality
│   ├── image-item.js      # Individual image handling
│   ├── pdf-generator.js   # PDF creation logic
│   └── utils.js           # Utility functions
└── start-server.sh        # Development server script
```

## 🛠️ Technical Details

### **Frontend Technologies**

- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Modern styling with custom properties and grid layouts
- **Vanilla JavaScript**: ES6+ with modular architecture
- **Canvas API**: Image processing and thumbnail generation

### **Backend Technologies**

- **PHP 8.3+**: Server-side file handling
- **File API**: Local file system operations
- **JSON API**: RESTful endpoints for CRUD operations

### **Key Libraries**

- **jsPDF**: PDF document generation
- **Intersection Observer**: Lazy loading implementation
- **File API**: Browser file handling

## 🎮 Usage Guide

### **Uploading Images**

1. Click "Upload Images" button
2. Select multiple images (JPEG, PNG, GIF, WebP)
3. Images are automatically saved to `/images/` directory
4. Gallery refreshes to show new images

### **Managing Images**

- **Search**: Type in search box to filter images
- **Sort**: Use dropdown to sort by name, date, or size
- **View**: Click any image for lightbox view
- **Delete**: Click red trash icon (server images only)
- **Navigate**: Use arrow keys or buttons in lightbox

### **Generating PDFs**

1. Ensure images are loaded in gallery
2. Click "Generate PDF Album" button
3. Wait for processing (progress bar shows status)
4. PDF automatically downloads when complete

## ⚙️ Configuration

### **Upload Settings** (upload.php)

```php
$maxFileSize = 50 * 1024 * 1024; // 50MB per file
$maxFiles = 20;                   // Max files per upload
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
```

### **PDF Settings** (js/pdf-generator.js)

```javascript
const options = {
  pageSize: "a4", // Page size
  orientation: "portrait", // Page orientation
  margin: 20, // Page margins (mm)
  imagesPerPage: 4, // Target images per page
  imageQuality: 0.8, // JPEG quality (0-1)
};
```

## 🔧 Development

### **Adding New Features**

1. **CSS**: Add styles to appropriate CSS file
2. **JavaScript**: Create new modules or extend existing classes
3. **PHP**: Add new endpoints following existing patterns

### **Debugging**

- **Browser Console**: Check for JavaScript errors
- **Network Tab**: Monitor API requests/responses
- **PHP Logs**: Check server error logs for PHP issues

## 📱 Browser Support

- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+ ✅

## 🔒 Security Features

- **File Validation**: Server-side type and size checking
- **Path Traversal Protection**: Prevents directory traversal attacks
- **CORS Headers**: Proper cross-origin resource sharing
- **Input Sanitization**: Clean user inputs and filenames

## 🚨 Troubleshooting

### **Common Issues**

**403 Forbidden Error**

- Ensure web server is running
- Check file permissions (755 for directories, 644 for files)
- Verify server configuration

**Images Not Loading**

- Check `/images/` directory exists and is readable
- Verify image file formats are supported
- Click "Refresh" button to reload from server

**Upload Failures**

- Check file size limits (50MB default)
- Verify `/images/` directory is writable
- Ensure PHP upload settings allow large files

**PDF Generation Issues**

- Verify jsPDF library is loaded
- Check browser console for JavaScript errors
- Ensure images are fully loaded before generating PDF

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ using modern web technologies**
