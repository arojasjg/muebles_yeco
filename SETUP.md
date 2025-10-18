# Image Gallery PDF - Setup Guide

## Quick Start with Herd

1. **Make sure Herd is running** and your project is properly configured
2. **Access your project** via `http://catalogo.test/` (or your configured domain)
3. **Upload images** using the "Upload Images" button
4. **Generate PDFs** with the "Generate PDF Album" button

## Features

### ✅ Automatic Folder Scanning

- The gallery automatically loads images from the `/images/` directory when served via HTTP
- Images are displayed in a responsive grid layout with thumbnails

### ✅ Server Upload Functionality

- Upload multiple images at once through the web interface
- Images are automatically saved to the `/images/` directory
- Supports JPEG, PNG, GIF, and WebP formats
- Maximum file size: 50MB per image

### ✅ PDF Generation

- Create professional PDF albums from your gallery images
- Optimized layouts with proper spacing and sizing
- Maintains image quality while optimizing file size

### ✅ Responsive Design

- Works on desktop, tablet, and mobile devices
- Touch-friendly interface for mobile users
- Lightbox view for detailed image viewing

## Troubleshooting

### CORS Errors

If you see CORS errors in the console:

- Make sure you're accessing the site via HTTP (e.g., `http://catalogo.test/`)
- Don't open `index.html` directly in the browser (file:// protocol)
- Ensure Herd is running and properly configured

### Upload Issues

If uploads aren't working:

- Check that the `/images/` directory exists and is writable
- Verify PHP is enabled in your Herd configuration
- Check the browser console for error messages

### No Images Loading

If the gallery appears empty:

- Click the "Refresh" button to reload from server
- Check that images exist in the `/images/` directory
- Verify image formats are supported (JPEG, PNG, GIF, WebP)

## File Structure

```
/
├── index.html              # Main application
├── upload.php              # Server-side upload handler
├── images/                 # Image storage directory
├── css/                    # Stylesheets
├── js/                     # JavaScript files
└── .htaccess              # Apache configuration
```

## Development Notes

- The application uses vanilla JavaScript (no frameworks required)
- PHP is required for server-side upload functionality
- Images are processed client-side for thumbnails and PDF generation
- All styling uses CSS custom properties for easy theming

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android
