<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Final Gallery - Local jsPDF</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        
        .header { 
            text-align: center; 
            margin-bottom: 40px; 
            color: white;
        }
        .header h1 { 
            font-size: 3rem; 
            margin-bottom: 10px; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .header p { 
            font-size: 1.2rem; 
            opacity: 0.9; 
        }
        
        .controls { 
            display: flex; 
            gap: 15px; 
            justify-content: center; 
            margin-bottom: 40px; 
            flex-wrap: wrap; 
        }
        
        .btn { 
            padding: 12px 24px; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-primary { background: #4CAF50; color: white; }
        .btn-secondary { background: #2196F3; color: white; }
        .btn-accent { background: #FF9800; color: white; }
        .btn-success { background: #28a745; color: white; }
        
        .status { 
            text-align: center; 
            padding: 15px; 
            margin: 20px auto;
            border-radius: 8px;
            max-width: 600px;
            font-weight: 500;
        }
        .status.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .status.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .status.info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
        
        .gallery { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
            gap: 25px; 
            margin-top: 30px;
        }
        
        .gallery-item { 
            background: white; 
            border-radius: 15px; 
            overflow: hidden; 
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        }
        .gallery-item:hover { 
            transform: translateY(-8px) scale(1.02); 
            box-shadow: 0 15px 35px rgba(0,0,0,0.25);
        }
        
        .gallery-item img { 
            width: 100%; 
            height: 220px; 
            object-fit: cover; 
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .gallery-item:hover img { transform: scale(1.05); }
        
        .gallery-item-info { 
            padding: 20px; 
        }
        .gallery-item-title { 
            font-weight: 600; 
            margin-bottom: 8px; 
            font-size: 14px;
            word-break: break-word;
            color: #333;
        }
        .gallery-item-size { 
            color: #666; 
            font-size: 13px; 
        }
        
        .lightbox {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.95);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .lightbox.active { display: flex; }
        .lightbox img { 
            max-width: 90%; 
            max-height: 90%; 
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .lightbox-close {
            position: absolute;
            top: 30px; right: 30px;
            background: rgba(255,255,255,0.9);
            border: none;
            padding: 15px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
        }
        
        .hidden { display: none; }
        #file-input { display: none; }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: white;
            grid-column: 1 / -1;
        }
        .empty-state h3 { font-size: 1.5rem; margin-bottom: 10px; }
        .empty-state p { opacity: 0.8; }
        
        .pdf-status {
            background: rgba(255,255,255,0.1);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            margin: 10px;
            text-align: center;
        }
        
        .pdf-options-panel {
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            padding: 25px;
            margin: 20px auto;
            max-width: 1200px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
        }
        
        .pdf-options-panel h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5rem;
            text-align: center;
        }
        
        .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
        }
        
        .option-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        
        .option-section h4 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.1rem;
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 8px;
        }
        
        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .radio-group label {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .radio-group label:hover {
            background: rgba(0,123,255,0.1);
        }
        
        .radio-group input[type="radio"] {
            margin: 0;
        }
        
        .option-section label {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
            color: #495057;
            font-weight: 500;
        }
        
        .option-section select {
            padding: 8px 12px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            background: white;
            color: #495057;
            font-size: 14px;
            min-width: 150px;
        }
        
        .option-section input[type="checkbox"] {
            margin: 0;
        }
        
        .progress-container {
            background: rgba(255,255,255,0.9);
            padding: 20px;
            border-radius: 10px;
            margin: 20px auto;
            max-width: 600px;
            text-align: center;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #28a745, #20c997);
            border-radius: 4px;
            transition: width 0.3s ease;
            width: 0%;
        }
        
        .progress-text {
            color: #495057;
            font-weight: 500;
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .gallery { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
            .controls { flex-direction: column; align-items: center; }
            .btn { width: 100%; max-width: 300px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Final Gallery</h1>
            <p>Complete Image Gallery with Local jsPDF</p>
        </div>
        
        <div id="pdf-status" class="pdf-status">
            📄 Loading PDF library...
        </div>
        
        <!-- Enhanced PDF Options Panel -->
        <div class="pdf-options-panel">
            <h3>📄 Advanced PDF Generation</h3>
            
            <div class="options-grid">
                <div class="option-section">
                    <h4>Template Style</h4>
                    <div class="radio-group">
                        <label><input type="radio" name="pdfTemplate" value="portfolio" checked> 🎨 Portfolio (Professional)</label>
                        <label><input type="radio" name="pdfTemplate" value="catalog"> 📋 Catalog (Grid Layout)</label>
                        <label><input type="radio" name="pdfTemplate" value="contact-sheet"> 📷 Contact Sheet (Compact)</label>
                        <label><input type="radio" name="pdfTemplate" value="magazine"> 📖 Magazine (Mixed Layout)</label>
                    </div>
                </div>
                
                <div class="option-section">
                    <h4>Image Quality</h4>
                    <div class="radio-group">
                        <label><input type="radio" name="imageQuality" value="web"> 🌐 Web (Fast, Small)</label>
                        <label><input type="radio" name="imageQuality" value="print" checked> 🖨️ Print (High Quality)</label>
                        <label><input type="radio" name="imageQuality" value="archive"> 📦 Archive (Maximum)</label>
                    </div>
                </div>
                
                <div class="option-section">
                    <h4>Layout Options</h4>
                    <label>Images per page: 
                        <select id="imagesPerPage">
                            <option value="1">1 image per page</option>
                            <option value="2">2 images per page</option>
                            <option value="4" selected>4 images per page</option>
                            <option value="6">6 images per page</option>
                            <option value="9">9 images per page</option>
                            <option value="12">12 images per page</option>
                        </select>
                    </label>
                    <label><input type="checkbox" id="includeMetadata" checked> Include image metadata</label>
                    <label><input type="checkbox" id="addWatermark"> Add watermark</label>
                    <label><input type="checkbox" id="createTOC" checked> Generate table of contents</label>
                </div>
                
                <div class="option-section">
                    <h4>Page Settings</h4>
                    <label>Page size: 
                        <select id="pageSize">
                            <option value="a4" selected>A4 (210×297mm)</option>
                            <option value="letter">Letter (8.5×11")</option>
                            <option value="a3">A3 (297×420mm)</option>
                            <option value="tabloid">Tabloid (11×17")</option>
                        </select>
                    </label>
                    <label>Orientation: 
                        <select id="pageOrientation">
                            <option value="portrait" selected>Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>

        <div class="controls">
            <input type="file" id="file-input" multiple accept="image/*">
            <button class="btn btn-primary" onclick="document.getElementById('file-input').click()">
                📁 Upload Images
            </button>
            <button class="btn btn-secondary" onclick="refreshGallery()">
                🔄 Refresh Gallery
            </button>
            <button class="btn btn-success" id="pdf-btn" onclick="generateAdvancedPDF()" disabled>
                📄 Generate Advanced PDF (Loading...)
            </button>
            <button class="btn btn-accent" onclick="generateQuickPDF()">
                ⚡ Quick PDF
            </button>
        </div>
        
        <div id="status" class="status hidden"></div>
        
        <div id="gallery" class="gallery">
            <div class="empty-state">
                <h3>Loading images...</h3>
                <p>Please wait while we load your gallery</p>
            </div>
        </div>
        
        <div id="lightbox" class="lightbox">
            <button class="lightbox-close" onclick="closeLightbox()">✕ Close</button>
            <img id="lightbox-img" src="" alt="">
        </div>
    </div>

    <!-- Load LOCAL jsPDF -->
    <script src="lib/jspdf.umd.min.js"></script>
    
    <script>
        let jsPDFReady = false;
        let currentImages = [];
        
        // Check if jsPDF loaded
        function checkJsPDF() {
            const pdfStatus = document.getElementById('pdf-status');
            const pdfBtn = document.getElementById('pdf-btn');
            
            if (typeof window.jsPDF !== 'undefined') {
                console.log('✅ Local jsPDF loaded successfully!');
                jsPDFReady = true;
                pdfStatus.innerHTML = '✅ PDF library ready!';
                pdfStatus.style.background = 'rgba(40, 167, 69, 0.8)';
                pdfBtn.disabled = false;
                pdfBtn.innerHTML = '📄 Generate PDF';
                pdfBtn.className = 'btn btn-success';
                
                // Test jsPDF
                try {
                    const testPdf = new window.jsPDF();
                    testPdf.text('Test', 10, 10);
                    console.log('✅ jsPDF test successful!');
                } catch (error) {
                    console.error('❌ jsPDF test failed:', error);
                }
                
            } else {
                console.error('❌ Local jsPDF failed to load');
                pdfStatus.innerHTML = '❌ PDF library failed to load';
                pdfStatus.style.background = 'rgba(220, 53, 69, 0.8)';
            }
        }
        
        // Gallery functionality
        function showStatus(message, type = 'info') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = `status ${type}`;
            status.classList.remove('hidden');
            setTimeout(() => status.classList.add('hidden'), 4000);
        }
        
        async function loadImages() {
            try {
                showStatus('Loading images...', 'info');
                const response = await fetch('upload.php');
                const data = await response.json();
                
                if (data.images && data.images.length > 0) {
                    currentImages = data.images;
                    renderGallery(data.images);
                    showStatus(`Loaded ${data.images.length} images successfully`, 'success');
                } else {
                    renderEmptyGallery();
                    showStatus('No images found - upload some images to get started', 'info');
                }
            } catch (error) {
                console.error('Error loading images:', error);
                renderEmptyGallery();
                showStatus('Error loading images from server', 'error');
            }
        }
        
        function renderGallery(images) {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';
            
            images.forEach((image, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img src="${image.url}" alt="${image.name}" 
                         onclick="openLightbox('${image.url}', '${image.name}')"
                         onerror="this.style.display='none'"
                         onload="console.log('Image ${index + 1} loaded successfully')">
                    <div class="gallery-item-info">
                        <div class="gallery-item-title">${image.name}</div>
                        <div class="gallery-item-size">${formatFileSize(image.size)}</div>
                    </div>
                `;
                gallery.appendChild(item);
            });
        }
        
        function renderEmptyGallery() {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = `
                <div class="empty-state">
                    <h3>No Images Yet</h3>
                    <p>Upload some images to get started with your gallery</p>
                </div>
            `;
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        function openLightbox(src, alt) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox-img').alt = alt;
            document.getElementById('lightbox').classList.add('active');
        }
        
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
        }
        
        function refreshGallery() {
            showStatus('Refreshing gallery...', 'info');
            loadImages();
        }
        
        // File upload
        document.getElementById('file-input').addEventListener('change', async function(e) {
            const files = e.target.files;
            if (files.length === 0) return;
            
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images[]', files[i]);
            }
            
            try {
                showStatus(`Uploading ${files.length} image(s)...`, 'info');
                const response = await fetch('upload.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success && result.uploaded) {
                    showStatus(`Successfully uploaded ${result.uploaded.length} image(s)`, 'success');
                    loadImages(); // Refresh gallery
                } else {
                    showStatus('Upload failed: ' + (result.error || 'Unknown error'), 'error');
                }
            } catch (error) {
                console.error('Upload error:', error);
                showStatus('Upload failed: Network error', 'error');
            }
            
            e.target.value = ''; // Clear input
        });
        
        // Quick PDF generation (simple text catalog)
        function generateQuickPDF() {
            if (!jsPDFReady || typeof window.jsPDF === 'undefined') {
                showStatus('PDF library is not ready yet', 'error');
                return;
            }
            
            if (currentImages.length === 0) {
                showStatus('No images to generate PDF from', 'error');
                return;
            }
            
            try {
                showStatus('Generating quick PDF catalog...', 'info');
                
                const pdf = new window.jsPDF();
                
                // Add title page
                pdf.setFontSize(24);
                pdf.text('Image Gallery Collection', 20, 30);
                
                pdf.setFontSize(14);
                pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);
                pdf.text(`Total Images: ${currentImages.length}`, 20, 65);
                
                pdf.line(20, 75, 190, 75);
                
                let yPosition = 90;
                pdf.setFontSize(12);
                pdf.text('Image List:', 20, yPosition);
                yPosition += 15;
                
                pdf.setFontSize(10);
                currentImages.forEach((image, index) => {
                    if (yPosition > 270) {
                        pdf.addPage();
                        yPosition = 20;
                    }
                    
                    pdf.setFont(undefined, 'bold');
                    pdf.text(`${index + 1}.`, 20, yPosition);
                    pdf.setFont(undefined, 'normal');
                    pdf.text(image.name, 30, yPosition);
                    
                    yPosition += 8;
                    pdf.setFontSize(8);
                    pdf.text(`   Size: ${formatFileSize(image.size)} | Type: ${image.type}`, 30, yPosition);
                    if (image.dimensions) {
                        pdf.text(`   Dimensions: ${image.dimensions.width} x ${image.dimensions.height}px`, 30, yPosition + 5);
                        yPosition += 5;
                    }
                    
                    yPosition += 12;
                    pdf.setFontSize(10);
                });
                
                const filename = `quick-gallery-${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(filename);
                
                showStatus(`Quick PDF "${filename}" generated successfully!`, 'success');
                
            } catch (error) {
                console.error('PDF generation error:', error);
                showStatus('PDF generation failed: ' + error.message, 'error');
            }
        }

        // Advanced PDF generation with multiple templates and options
        async function generateAdvancedPDF() {
            if (!jsPDFReady || typeof window.jsPDF === 'undefined') {
                showStatus('PDF library is not ready yet', 'error');
                return;
            }
            
            if (currentImages.length === 0) {
                showStatus('No images to generate PDF from', 'error');
                return;
            }
            
            // Get user options
            const template = document.querySelector('input[name="pdfTemplate"]:checked').value;
            const quality = document.querySelector('input[name="imageQuality"]:checked').value;
            const imagesPerPage = parseInt(document.getElementById('imagesPerPage').value);
            const pageSize = document.getElementById('pageSize').value;
            const orientation = document.getElementById('pageOrientation').value;
            const includeMetadata = document.getElementById('includeMetadata').checked;
            const addWatermark = document.getElementById('addWatermark').checked;
            const createTOC = document.getElementById('createTOC').checked;
            
            try {
                showStatus('Generating advanced PDF...', 'info');
                showProgress(true, 0, 'Initializing advanced PDF generator...');
                
                // Initialize PDF with selected options
                const pdf = new window.jsPDF({
                    orientation: orientation,
                    unit: 'mm',
                    format: pageSize
                });
                
                // Get page dimensions
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                
                // Generate PDF based on template
                switch (template) {
                    case 'portfolio':
                        await generatePortfolioTemplate(pdf, pageWidth, pageHeight, quality, includeMetadata, addWatermark, createTOC);
                        break;
                    case 'catalog':
                        await generateCatalogTemplate(pdf, pageWidth, pageHeight, imagesPerPage, quality, includeMetadata);
                        break;
                    case 'contact-sheet':
                        await generateContactSheetTemplate(pdf, pageWidth, pageHeight, quality);
                        break;
                    case 'magazine':
                        await generateMagazineTemplate(pdf, pageWidth, pageHeight, quality, includeMetadata);
                        break;
                    default:
                        await generatePortfolioTemplate(pdf, pageWidth, pageHeight, quality, includeMetadata, addWatermark, createTOC);
                }
                
                showProgress(true, 100, 'Finalizing PDF...');
                
                const filename = `${template}-gallery-${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(filename);
                
                showProgress(false);
                showStatus(`Advanced PDF "${filename}" generated successfully with ${template} template!`, 'success');
                
            } catch (error) {
                console.error('Advanced PDF generation error:', error);
                showProgress(false);
                showStatus('Advanced PDF generation failed: ' + error.message, 'error');
            }
        }

        // Portfolio Template - Professional single image per page
        async function generatePortfolioTemplate(pdf, pageWidth, pageHeight, quality, includeMetadata, addWatermark, createTOC) {
            const margin = 20;
            const titleHeight = 40;
            const footerHeight = 20;
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - titleHeight - footerHeight - (2 * margin);
            
            // Title page
            pdf.setFontSize(32);
            pdf.setFont(undefined, 'bold');
            pdf.text('Portfolio Collection', pageWidth / 2, 60, { align: 'center' });
            
            pdf.setFontSize(16);
            pdf.setFont(undefined, 'normal');
            pdf.text(`${currentImages.length} Professional Images`, pageWidth / 2, 80, { align: 'center' });
            pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 100, { align: 'center' });
            
            // Add decorative elements
            pdf.setDrawColor(100, 100, 100);
            pdf.setLineWidth(0.5);
            pdf.line(margin, 120, pageWidth - margin, 120);
            
            // Table of Contents (if enabled)
            if (createTOC) {
                pdf.addPage();
                pdf.setFontSize(24);
                pdf.setFont(undefined, 'bold');
                pdf.text('Table of Contents', margin, 40);
                
                let yPos = 60;
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'normal');
                
                currentImages.forEach((image, index) => {
                    if (yPos > pageHeight - 40) {
                        pdf.addPage();
                        yPos = 40;
                    }
                    
                    const pageNum = index + 3; // Account for title and TOC pages
                    pdf.text(`${index + 1}. ${image.name}`, margin, yPos);
                    pdf.text(`${pageNum}`, pageWidth - margin - 20, yPos);
                    
                    // Add dotted line
                    const textWidth = pdf.getTextWidth(`${index + 1}. ${image.name}`);
                    const dotsStart = margin + textWidth + 5;
                    const dotsEnd = pageWidth - margin - 30;
                    
                    for (let x = dotsStart; x < dotsEnd; x += 3) {
                        pdf.circle(x, yPos - 2, 0.3, 'F');
                    }
                    
                    yPos += 8;
                });
            }
            
            // Process each image
            for (let i = 0; i < currentImages.length; i++) {
                const image = currentImages[i];
                
                showProgress(true, (i / currentImages.length) * 100, `Processing image ${i + 1}/${currentImages.length}: ${image.name}`);
                
                pdf.addPage();
                
                try {
                    // Load high-quality image
                    const imgData = await loadHighQualityImageForPDF(image.url, quality);
                    
                    // Calculate optimal size maintaining aspect ratio
                    const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                        imgData.width, 
                        imgData.height, 
                        availableWidth, 
                        availableHeight - 30 // Leave space for title
                    );
                    
                    const imageX = margin + offsetX;
                    const imageY = titleHeight + margin + offsetY;
                    
                    // Add subtle shadow
                    pdf.setFillColor(0, 0, 0);
                    pdf.setGState(new pdf.GState({opacity: 0.1}));
                    pdf.rect(imageX + 2, imageY + 2, finalWidth, finalHeight, 'F');
                    pdf.setGState(new pdf.GState({opacity: 1}));
                    
                    // Add image
                    pdf.addImage(imgData.dataUrl, 'JPEG', imageX, imageY, finalWidth, finalHeight, undefined, 'FAST');
                    
                    // Add watermark if enabled
                    if (addWatermark) {
                        pdf.setGState(new pdf.GState({opacity: 0.1}));
                        pdf.setFontSize(48);
                        pdf.setTextColor(128, 128, 128);
                        pdf.text('PORTFOLIO', pageWidth / 2, pageHeight / 2, { 
                            align: 'center', 
                            angle: 45 
                        });
                        pdf.setGState(new pdf.GState({opacity: 1}));
                        pdf.setTextColor(0, 0, 0);
                    }
                    
                } catch (error) {
                    console.warn(`Failed to load image ${image.name}:`, error);
                    
                    // Enhanced placeholder
                    const placeholderX = margin + availableWidth / 4;
                    const placeholderY = titleHeight + margin + availableHeight / 4;
                    const placeholderW = availableWidth / 2;
                    const placeholderH = availableHeight / 2;
                    
                    pdf.setFillColor(245, 245, 245);
                    pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH, 'F');
                    pdf.setDrawColor(200, 200, 200);
                    pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH);
                    
                    pdf.setFontSize(24);
                    pdf.setTextColor(150, 150, 150);
                    pdf.text('📷', placeholderX + placeholderW/2, placeholderY + placeholderH/2 - 10, { align: 'center' });
                    pdf.setFontSize(12);
                    pdf.text('Image not available', placeholderX + placeholderW/2, placeholderY + placeholderH/2 + 10, { align: 'center' });
                    pdf.setTextColor(0, 0, 0);
                }
                
                // Add image title
                pdf.setFontSize(18);
                pdf.setFont(undefined, 'bold');
                pdf.text(image.name, pageWidth / 2, 30, { align: 'center' });
                
                // Add metadata if enabled
                if (includeMetadata) {
                    pdf.setFontSize(10);
                    pdf.setFont(undefined, 'normal');
                    let metaY = pageHeight - 30;
                    
                    pdf.text(`File: ${image.name}`, margin, metaY);
                    pdf.text(`Size: ${formatFileSize(image.size)}`, margin, metaY + 6);
                    if (image.dimensions) {
                        pdf.text(`Dimensions: ${image.dimensions.width} × ${image.dimensions.height} pixels`, margin, metaY + 12);
                    }
                    pdf.text(`Type: ${image.type || 'Unknown'}`, margin, metaY + 18);
                }
                
                // Add page number
                pdf.setFontSize(8);
                pdf.text(`${i + 1} / ${currentImages.length}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
                
                // Small delay to prevent browser freezing
                if (i % 5 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }
        
        // Catalog Template - Grid layout with multiple images per page
        async function generateCatalogTemplate(pdf, pageWidth, pageHeight, imagesPerPage, quality, includeMetadata) {
            const margin = 15;
            const headerHeight = 25;
            const footerHeight = 15;
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - headerHeight - footerHeight - (2 * margin);
            
            // Title page
            pdf.setFontSize(28);
            pdf.setFont(undefined, 'bold');
            pdf.text('Image Catalog', pageWidth / 2, 50, { align: 'center' });
            
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'normal');
            pdf.text(`${currentImages.length} Images • ${imagesPerPage} per page`, pageWidth / 2, 70, { align: 'center' });
            pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 85, { align: 'center' });
            
            // Process images in batches
            for (let i = 0; i < currentImages.length; i += imagesPerPage) {
                const batch = currentImages.slice(i, i + imagesPerPage);
                
                showProgress(true, (i / currentImages.length) * 100, `Processing catalog page ${Math.floor(i / imagesPerPage) + 1}...`);
                
                pdf.addPage();
                
                // Page header
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'bold');
                pdf.text(`Catalog Page ${Math.floor(i / imagesPerPage) + 1}`, pageWidth / 2, 20, { align: 'center' });
                
                // Calculate grid layout
                const { cols, rows, imageWidth, imageHeight } = calculateOptimalLayout(
                    imagesPerPage, 
                    availableWidth, 
                    availableHeight - 20, // Space for titles
                    8
                );
                
                // Center the grid
                const totalGridWidth = cols * imageWidth + (cols - 1) * 8;
                const totalGridHeight = rows * imageHeight + (rows - 1) * 8;
                const startX = margin + (availableWidth - totalGridWidth) / 2;
                const startY = headerHeight + margin + (availableHeight - totalGridHeight - 20) / 2;
                
                // Add images
                for (let j = 0; j < batch.length; j++) {
                    const image = batch[j];
                    const col = j % cols;
                    const row = Math.floor(j / cols);
                    
                    const x = startX + col * (imageWidth + 8);
                    const y = startY + row * (imageHeight + 8 + 15); // Extra space for title
                    
                    try {
                        const imgData = await loadHighQualityImageForPDF(image.url, quality);
                        
                        // Add border
                        pdf.setDrawColor(200, 200, 200);
                        pdf.setLineWidth(0.2);
                        pdf.rect(x - 1, y - 1, imageWidth + 2, imageHeight + 2);
                        
                        const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                            imgData.width, imgData.height, imageWidth, imageHeight
                        );
                        
                        pdf.addImage(
                            imgData.dataUrl, 'JPEG', 
                            x + offsetX, y + offsetY, 
                            finalWidth, finalHeight, 
                            undefined, 'FAST'
                        );
                        
                        // Add image number and title
                        pdf.setFontSize(8);
                        pdf.setFont(undefined, 'bold');
                        const imageNum = i + j + 1;
                        pdf.text(`${imageNum}`, x, y + imageHeight + 8);
                        
                        pdf.setFont(undefined, 'normal');
                        const titleText = image.name.length > 25 ? 
                            image.name.substring(0, 22) + '...' : image.name;
                        pdf.text(titleText, x, y + imageHeight + 14);
                        
                    } catch (error) {
                        // Placeholder
                        pdf.setFillColor(245, 245, 245);
                        pdf.rect(x, y, imageWidth, imageHeight, 'F');
                        pdf.setDrawColor(200, 200, 200);
                        pdf.rect(x, y, imageWidth, imageHeight);
                        
                        pdf.setFontSize(10);
                        pdf.setTextColor(150, 150, 150);
                        pdf.text('📷', x + imageWidth/2, y + imageHeight/2, { align: 'center' });
                        pdf.setTextColor(0, 0, 0);
                    }
                }
                
                // Page footer
                pdf.setFontSize(8);
                pdf.text(`Images ${i + 1}-${Math.min(i + imagesPerPage, currentImages.length)} of ${currentImages.length}`, 
                    pageWidth / 2, pageHeight - 8, { align: 'center' });
                
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        // Contact Sheet Template - Maximum images per page
        async function generateContactSheetTemplate(pdf, pageWidth, pageHeight, quality) {
            const margin = 10;
            const headerHeight = 20;
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - headerHeight - (2 * margin);
            
            // Calculate optimal grid for contact sheet (maximize images)
            const maxImagesPerPage = 20;
            const { cols, rows, imageWidth, imageHeight } = calculateOptimalLayout(
                maxImagesPerPage, availableWidth, availableHeight, 3
            );
            
            // Title page
            pdf.setFontSize(24);
            pdf.setFont(undefined, 'bold');
            pdf.text('Contact Sheet', pageWidth / 2, 40, { align: 'center' });
            
            pdf.setFontSize(12);
            pdf.text(`${currentImages.length} Images • ${cols}×${rows} grid`, pageWidth / 2, 55, { align: 'center' });
            
            const actualImagesPerPage = cols * rows;
            
            for (let i = 0; i < currentImages.length; i += actualImagesPerPage) {
                const batch = currentImages.slice(i, i + actualImagesPerPage);
                
                showProgress(true, (i / currentImages.length) * 100, `Processing contact sheet ${Math.floor(i / actualImagesPerPage) + 1}...`);
                
                pdf.addPage();
                
                // Header
                pdf.setFontSize(10);
                pdf.text(`Contact Sheet ${Math.floor(i / actualImagesPerPage) + 1} • ${new Date().toLocaleDateString()}`, 
                    pageWidth / 2, 15, { align: 'center' });
                
                // Grid of images
                for (let j = 0; j < batch.length; j++) {
                    const image = batch[j];
                    const col = j % cols;
                    const row = Math.floor(j / cols);
                    
                    const x = margin + col * (imageWidth + 3);
                    const y = headerHeight + margin + row * (imageHeight + 3);
                    
                    try {
                        const imgData = await loadHighQualityImageForPDF(image.url, 'web'); // Use web quality for contact sheets
                        
                        const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                            imgData.width, imgData.height, imageWidth, imageHeight
                        );
                        
                        pdf.addImage(
                            imgData.dataUrl, 'JPEG', 
                            x + offsetX, y + offsetY, 
                            finalWidth, finalHeight, 
                            undefined, 'FAST'
                        );
                        
                        // Add image number
                        pdf.setFontSize(6);
                        pdf.setFillColor(255, 255, 255);
                        pdf.rect(x, y, 12, 6, 'F');
                        pdf.setTextColor(0, 0, 0);
                        pdf.text(`${i + j + 1}`, x + 1, y + 4);
                        
                    } catch (error) {
                        pdf.setFillColor(240, 240, 240);
                        pdf.rect(x, y, imageWidth, imageHeight, 'F');
                        pdf.setFontSize(8);
                        pdf.text('?', x + imageWidth/2, y + imageHeight/2, { align: 'center' });
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }

        // Magazine Template - Mixed layout with featured images
        async function generateMagazineTemplate(pdf, pageWidth, pageHeight, quality, includeMetadata) {
            const margin = 15;
            
            // Title page with magazine style
            pdf.setFontSize(36);
            pdf.setFont(undefined, 'bold');
            pdf.text('GALLERY', pageWidth / 2, 60, { align: 'center' });
            
            pdf.setFontSize(18);
            pdf.setFont(undefined, 'normal');
            pdf.text('MAGAZINE', pageWidth / 2, 80, { align: 'center' });
            
            pdf.setFontSize(12);
            pdf.text(`${currentImages.length} FEATURED IMAGES`, pageWidth / 2, 100, { align: 'center' });
            pdf.text(new Date().toLocaleDateString().toUpperCase(), pageWidth / 2, 115, { align: 'center' });
            
            // Add decorative elements
            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(2);
            pdf.line(margin, 130, pageWidth - margin, 130);
            pdf.line(margin, 135, pageWidth - margin, 135);
            
            // Process images with mixed layouts
            for (let i = 0; i < currentImages.length; i++) {
                const image = currentImages[i];
                
                showProgress(true, (i / currentImages.length) * 100, `Creating magazine page ${i + 1}...`);
                
                pdf.addPage();
                
                // Alternate between full-page and split layouts
                if (i % 3 === 0) {
                    // Full page image
                    await addFullPageImage(pdf, image, pageWidth, pageHeight, quality, includeMetadata, i + 1);
                } else if (i % 3 === 1 && i + 1 < currentImages.length) {
                    // Two images side by side
                    await addSideBySideImages(pdf, [image, currentImages[i + 1]], pageWidth, pageHeight, quality, includeMetadata, i + 1);
                    i++; // Skip next image as we processed it
                } else {
                    // Single image with large text area
                    await addFeaturedImage(pdf, image, pageWidth, pageHeight, quality, includeMetadata, i + 1);
                }
                
                await new Promise(resolve => setTimeout(resolve, 150));
            }
        }

        // Helper function for full page magazine image
        async function addFullPageImage(pdf, image, pageWidth, pageHeight, quality, includeMetadata, pageNum) {
            const margin = 10;
            const titleHeight = 30;
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - titleHeight - (2 * margin);
            
            try {
                const imgData = await loadHighQualityImageForPDF(image.url, quality);
                
                const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                    imgData.width, imgData.height, availableWidth, availableHeight
                );
                
                pdf.addImage(
                    imgData.dataUrl, 'JPEG', 
                    margin + offsetX, titleHeight + margin + offsetY, 
                    finalWidth, finalHeight, 
                    undefined, 'FAST'
                );
                
            } catch (error) {
                // Placeholder
                const placeholderW = availableWidth * 0.8;
                const placeholderH = availableHeight * 0.8;
                const placeholderX = margin + (availableWidth - placeholderW) / 2;
                const placeholderY = titleHeight + margin + (availableHeight - placeholderH) / 2;
                
                pdf.setFillColor(245, 245, 245);
                pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH, 'F');
            }
            
            // Add stylish title
            pdf.setFontSize(24);
            pdf.setFont(undefined, 'bold');
            pdf.text(image.name.toUpperCase(), pageWidth / 2, 20, { align: 'center' });
            
            if (includeMetadata) {
                pdf.setFontSize(8);
                pdf.setFont(undefined, 'normal');
                pdf.text(`${formatFileSize(image.size)} • ${image.type}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
            }
        }

        // Enhanced image loading function with better quality control
        function loadHighQualityImageForPDF(src, quality = 'print') {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Quality settings
                    let maxSize, jpegQuality, smoothing;
                    switch (quality) {
                        case 'archive':
                            maxSize = 2048;
                            jpegQuality = 0.95;
                            smoothing = 'high';
                            break;
                        case 'print':
                            maxSize = 1200;
                            jpegQuality = 0.9;
                            smoothing = 'high';
                            break;
                        case 'web':
                            maxSize = 600;
                            jpegQuality = 0.8;
                            smoothing = 'medium';
                            break;
                        default:
                            maxSize = 800;
                            jpegQuality = 0.85;
                            smoothing = 'high';
                    }
                    
                    let { width, height } = this;
                    const originalWidth = width;
                    const originalHeight = height;
                    
                    // Smart resizing
                    const maxDimension = Math.max(width, height);
                    if (maxDimension > maxSize) {
                        const scale = maxSize / maxDimension;
                        width = Math.round(width * scale);
                        height = Math.round(height * scale);
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Enhanced rendering
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = smoothing;
                    
                    // Apply subtle sharpening for print quality
                    if (quality === 'print' || quality === 'archive') {
                        ctx.filter = 'contrast(1.05) saturate(1.1)';
                    }
                    
                    ctx.drawImage(this, 0, 0, width, height);
                    
                    resolve({
                        dataUrl: canvas.toDataURL('image/jpeg', jpegQuality),
                        width: originalWidth,
                        height: originalHeight,
                        canvasWidth: width,
                        canvasHeight: height
                    });
                };
                img.onerror = reject;
                img.src = src;
            });
        }

        // Enhanced layout calculation
        function calculateOptimalLayout(imagesPerPage, availableWidth, availableHeight, spacing) {
            let bestLayout = { cols: 1, rows: 1, imageWidth: 0, imageHeight: 0, efficiency: 0 };
            
            for (let cols = 1; cols <= Math.min(imagesPerPage, 6); cols++) {
                const rows = Math.ceil(imagesPerPage / cols);
                
                const imageWidth = (availableWidth - (cols - 1) * spacing) / cols;
                const imageHeight = (availableHeight - (rows - 1) * spacing) / rows;
                
                // Prefer layouts that maintain good aspect ratios
                const aspectRatio = imageWidth / imageHeight;
                const aspectPenalty = Math.abs(aspectRatio - 1.4) * 0.1; // Prefer 1.4:1 ratio
                
                const efficiency = (imageWidth * imageHeight) / (availableWidth * availableHeight) - aspectPenalty;
                
                if (efficiency > bestLayout.efficiency && imageWidth > 20 && imageHeight > 20) {
                    bestLayout = { cols, rows, imageWidth, imageHeight, efficiency };
                }
            }
            
            return bestLayout;
        }

        // Enhanced dimension calculation with better centering
        function calculateImageDimensions(imgWidth, imgHeight, maxWidth, maxHeight) {
            const imgAspectRatio = imgWidth / imgHeight;
            const maxAspectRatio = maxWidth / maxHeight;
            
            let finalWidth, finalHeight, offsetX = 0, offsetY = 0;
            
            if (imgAspectRatio > maxAspectRatio) {
                finalWidth = maxWidth;
                finalHeight = maxWidth / imgAspectRatio;
                offsetY = (maxHeight - finalHeight) / 2;
            } else {
                finalHeight = maxHeight;
                finalWidth = maxHeight * imgAspectRatio;
                offsetX = (maxWidth - finalWidth) / 2;
            }
            
            return { finalWidth, finalHeight, offsetX, offsetY };
        }

        // Progress display function
        function showProgress(show, progress = 0, text = 'Processing...') {
            const container = document.getElementById('progress-container');
            if (!container) {
                // Create progress container if it doesn't exist
                const progressHTML = `
                    <div id="progress-container" class="progress-container hidden">
                        <div class="progress-bar">
                            <div id="progress-fill" class="progress-fill"></div>
                        </div>
                        <p id="progress-text" class="progress-text">Processing...</p>
                    </div>
                `;
                document.querySelector('.container').insertAdjacentHTML('beforeend', progressHTML);
                return showProgress(show, progress, text);
            }
            
            const fill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            if (show) {
                container.classList.remove('hidden');
                fill.style.width = Math.min(progress, 100) + '%';
                progressText.textContent = text;
            } else {
                container.classList.add('hidden');
            }
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
        
        // Initialize everything
        window.addEventListener('load', function() {
            console.log('🚀 Final Gallery loaded');
            
            // Check jsPDF first
            setTimeout(checkJsPDF, 100);
            
            // Load images
            loadImages();
        });
    </script>
</body>
</html>