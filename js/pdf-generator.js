/**
 * PDFGenerator Class
 * Handles PDF document creation with image layout and optimization
 */

class PDFGenerator {
  /**
   * Creates a new PDFGenerator instance
   * @param {ImageItem[]} images - Array of ImageItem instances
   * @param {Object} options - Configuration options
   */
  constructor(images = [], options = {}) {
    // Validate jsPDF availability with detailed logging
    console.log("Checking jsPDF availability...");
    console.log("window.jsPDF:", typeof window.jsPDF);
    console.log("window.jsPDF object:", window.jsPDF);

    if (typeof window.jsPDF === "undefined") {
      console.error("jsPDF not found on window object");
      throw new Error(
        "jsPDF library is required but not loaded. Please refresh the page and try again."
      );
    }

    // Use global jsPDF reference
    this.jsPDF = window.jsPDF;
    console.log("jsPDF initialized successfully:", this.jsPDF);

    this.images = images;

    // Configuration options
    this.options = {
      pageSize: options.pageSize || "a4",
      orientation: options.orientation || "portrait",
      margin: options.margin || 20,
      imagesPerPage: options.imagesPerPage || 4,
      imageQuality: options.imageQuality || 0.8,
      title: options.title || "Image Gallery",
      author: options.author || "Image Gallery PDF",
      subject: options.subject || "Generated from Image Gallery",
      keywords: options.keywords || "images, gallery, pdf",
      ...options,
    };

    // PDF dimensions (in mm for jsPDF)
    this.pageDimensions = this._getPageDimensions();

    // Layout calculations
    this.layout = null;

    // Progress tracking
    this.progress = {
      current: 0,
      total: 0,
      stage: "idle", // 'idle', 'calculating', 'processing', 'generating', 'complete'
    };

    // Event callbacks
    this.callbacks = {
      onProgress: options.onProgress || null,
      onError: options.onError || null,
      onComplete: options.onComplete || null,
    };
  }

  /**
   * Gets page dimensions based on size and orientation
   * @private
   * @returns {Object} - Page dimensions object
   */
  _getPageDimensions() {
    const sizes = {
      a4: { width: 210, height: 297 },
      a3: { width: 297, height: 420 },
      letter: { width: 216, height: 279 },
      legal: { width: 216, height: 356 },
    };

    const size = sizes[this.options.pageSize.toLowerCase()] || sizes.a4;

    if (this.options.orientation === "landscape") {
      return {
        width: size.height,
        height: size.width,
      };
    }

    return size;
  }

  /**
   * Calculates optimal layout for images on pages
   * @returns {Object} - Layout configuration
   */
  calculateLayout() {
    if (this.images.length === 0) {
      throw new Error("No images provided for PDF generation");
    }

    this._updateProgress("calculating", 0, this.images.length);

    const { width: pageWidth, height: pageHeight } = this.pageDimensions;
    const { margin, imagesPerPage } = this.options;

    // Available space for images
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2 - 30; // Reserve space for page numbers

    // Calculate grid dimensions
    const gridConfig = this._calculateGridDimensions(
      imagesPerPage,
      availableWidth,
      availableHeight
    );

    // Calculate image positions and sizes
    const pages = this._calculateImagePositions(
      gridConfig,
      availableWidth,
      availableHeight
    );

    this.layout = {
      pageWidth,
      pageHeight,
      margin,
      availableWidth,
      availableHeight,
      gridConfig,
      pages,
      totalPages: pages.length,
    };

    return this.layout;
  }

  /**
   * Calculates grid dimensions for optimal image placement
   * @private
   * @param {number} imagesPerPage - Target images per page
   * @param {number} availableWidth - Available width
   * @param {number} availableHeight - Available height
   * @returns {Object} - Grid configuration
   */
  _calculateGridDimensions(imagesPerPage, availableWidth, availableHeight) {
    // Find optimal grid layout
    const aspectRatio = availableWidth / availableHeight;
    let bestConfig = null;
    let bestScore = 0;

    // Try different grid configurations
    for (
      let cols = 1;
      cols <= Math.ceil(Math.sqrt(imagesPerPage * 2));
      cols++
    ) {
      const rows = Math.ceil(imagesPerPage / cols);
      const actualImagesPerPage = cols * rows;

      if (actualImagesPerPage < imagesPerPage * 0.8) continue; // Too few images

      const cellWidth = availableWidth / cols;
      const cellHeight = availableHeight / rows;
      const cellAspectRatio = cellWidth / cellHeight;

      // Score based on how well it uses the available space
      const utilizationScore = Math.min(cellWidth * cellHeight, 1);
      const aspectScore = 1 - Math.abs(cellAspectRatio - 1); // Prefer square-ish cells
      const efficiencyScore = imagesPerPage / actualImagesPerPage;

      const totalScore =
        utilizationScore * 0.4 + aspectScore * 0.3 + efficiencyScore * 0.3;

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestConfig = {
          cols,
          rows,
          cellWidth: cellWidth - 5, // Small gap between images
          cellHeight: cellHeight - 5,
          actualImagesPerPage,
        };
      }
    }

    return (
      bestConfig || {
        cols: 2,
        rows: 2,
        cellWidth: availableWidth / 2 - 5,
        cellHeight: availableHeight / 2 - 5,
        actualImagesPerPage: 4,
      }
    );
  }

  /**
   * Calculates positions and sizes for all images
   * @private
   * @param {Object} gridConfig - Grid configuration
   * @param {number} availableWidth - Available width
   * @param {number} availableHeight - Available height
   * @returns {Array} - Array of page configurations
   */
  _calculateImagePositions(gridConfig, availableWidth, availableHeight) {
    const pages = [];
    const { cols, rows, cellWidth, cellHeight, actualImagesPerPage } =
      gridConfig;

    for (let i = 0; i < this.images.length; i += actualImagesPerPage) {
      const pageImages = this.images.slice(i, i + actualImagesPerPage);
      const imagePositions = [];

      pageImages.forEach((image, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        // Calculate position
        const x = this.options.margin + col * (cellWidth + 5);
        const y = this.options.margin + row * (cellHeight + 5);

        // Calculate size maintaining aspect ratio
        const imageSize = this._calculateImageSize(
          image,
          cellWidth,
          cellHeight
        );

        // Center the image in its cell
        const centeredX = x + (cellWidth - imageSize.width) / 2;
        const centeredY = y + (cellHeight - imageSize.height) / 2;

        imagePositions.push({
          image,
          x: centeredX,
          y: centeredY,
          width: imageSize.width,
          height: imageSize.height,
        });
      });

      pages.push({
        pageNumber: pages.length + 1,
        images: imagePositions,
      });
    }

    return pages;
  }

  /**
   * Calculates optimal size for an image within given constraints
   * @private
   * @param {ImageItem} image - Image item
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {Object} - Size object with width and height
   */
  _calculateImageSize(image, maxWidth, maxHeight) {
    if (!image.dimensions) {
      // Fallback if dimensions not available
      return { width: maxWidth, height: maxHeight };
    }

    const { width: imgWidth, height: imgHeight } = image.dimensions;
    const aspectRatio = imgWidth / imgHeight;

    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width, height };
  }

  /**
   * Generates the PDF document
   * @returns {Promise<Blob>} - Promise that resolves to PDF blob
   */
  async generatePDF() {
    if (this.images.length === 0) {
      throw new Error("No images to generate PDF from");
    }

    try {
      // Calculate layout if not already done
      if (!this.layout) {
        this.calculateLayout();
      }

      this._updateProgress("processing", 0, this.layout.totalPages);

      // Create jsPDF instance
      const pdf = new this.jsPDF({
        orientation: this.options.orientation,
        unit: "mm",
        format: this.options.pageSize,
      });

      // Set document properties
      pdf.setProperties({
        title: this.options.title,
        author: this.options.author,
        subject: this.options.subject,
        keywords: this.options.keywords,
        creator: "Image Gallery PDF Generator",
      });

      // Process each page
      for (
        let pageIndex = 0;
        pageIndex < this.layout.pages.length;
        pageIndex++
      ) {
        const page = this.layout.pages[pageIndex];

        // Add new page (except for first page)
        if (pageIndex > 0) {
          pdf.addPage();
        }

        // Add page title
        await this._addPageHeader(pdf, page.pageNumber, this.layout.totalPages);

        // Add images to page
        await this._addImagesToPage(pdf, page.images);

        // Add page footer
        this._addPageFooter(pdf, page.pageNumber, this.layout.totalPages);

        this._updateProgress(
          "processing",
          pageIndex + 1,
          this.layout.totalPages
        );
      }

      this._updateProgress(
        "generating",
        this.layout.totalPages,
        this.layout.totalPages
      );

      // Generate PDF blob
      const pdfBlob = pdf.output("blob");

      this._updateProgress(
        "complete",
        this.layout.totalPages,
        this.layout.totalPages
      );

      if (this.callbacks.onComplete) {
        this.callbacks.onComplete(pdfBlob);
      }

      return pdfBlob;
    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      throw error;
    }
  }

  /**
   * Adds header to PDF page
   * @private
   * @param {jsPDF} pdf - PDF instance
   * @param {number} pageNumber - Current page number
   * @param {number} totalPages - Total pages
   */
  async _addPageHeader(pdf, pageNumber, totalPages) {
    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text(this.options.title, this.options.margin, this.options.margin - 5);

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    const pageText = `Page ${pageNumber} of ${totalPages}`;
    const pageTextWidth = pdf.getTextWidth(pageText);
    pdf.text(
      pageText,
      this.layout.pageWidth - this.options.margin - pageTextWidth,
      this.options.margin - 5
    );
  }

  /**
   * Adds images to PDF page
   * @private
   * @param {jsPDF} pdf - PDF instance
   * @param {Array} imagePositions - Array of image position objects
   */
  async _addImagesToPage(pdf, imagePositions) {
    for (const position of imagePositions) {
      try {
        await this._addImageToPDF(pdf, position);
      } catch (error) {
        console.warn(
          `Failed to add image ${position.image.name} to PDF:`,
          error
        );
        // Continue with other images
      }
    }
  }

  /**
   * Adds a single image to PDF
   * @private
   * @param {jsPDF} pdf - PDF instance
   * @param {Object} position - Image position object
   */
  async _addImageToPDF(pdf, position) {
    const { image, x, y, width, height } = position;

    // Get image data
    let imageData;
    if (image.url) {
      imageData = image.url;
    } else {
      imageData = image.createObjectURL();
    }

    // Load image to get format
    const img = await loadImage(imageData);

    // Determine image format
    let format = "JPEG";
    if (image.type.includes("png")) {
      format = "PNG";
    } else if (image.type.includes("gif")) {
      format = "GIF";
    } else if (image.type.includes("webp")) {
      format = "WEBP";
    }

    // Add image to PDF
    pdf.addImage(
      img,
      format,
      x,
      y,
      width,
      height,
      undefined, // alias
      "FAST" // compression
    );
  }

  /**
   * Adds footer to PDF page
   * @private
   * @param {jsPDF} pdf - PDF instance
   * @param {number} pageNumber - Current page number
   * @param {number} totalPages - Total pages
   */
  _addPageFooter(pdf, pageNumber, totalPages) {
    const footerY = this.layout.pageHeight - 10;

    pdf.setFontSize(8);
    pdf.setFont(undefined, "normal");

    // Add generation date
    const date = new Date().toLocaleDateString();
    pdf.text(`Generated on ${date}`, this.options.margin, footerY);

    // Add image count
    const imageCount = `${this.images.length} images`;
    const imageCountWidth = pdf.getTextWidth(imageCount);
    pdf.text(
      imageCount,
      this.layout.pageWidth - this.options.margin - imageCountWidth,
      footerY
    );
  }

  /**
   * Downloads the generated PDF
   * @param {string} filename - Filename for download
   * @returns {Promise<void>}
   */
  async downloadPDF(filename = null) {
    const pdfBlob = await this.generatePDF();

    // Generate filename if not provided
    if (!filename) {
      const date = new Date().toISOString().split("T")[0];
      filename = `image-gallery-${date}.pdf`;
    }

    // Create download link
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  }

  /**
   * Updates progress and calls callback
   * @private
   * @param {string} stage - Current stage
   * @param {number} current - Current progress
   * @param {number} total - Total items
   */
  _updateProgress(stage, current, total) {
    this.progress = { stage, current, total };

    if (this.callbacks.onProgress) {
      this.callbacks.onProgress(this.progress);
    }
  }

  /**
   * Gets current progress
   * @returns {Object} - Progress object
   */
  getProgress() {
    return { ...this.progress };
  }

  /**
   * Sets images for PDF generation
   * @param {ImageItem[]} images - Array of ImageItem instances
   */
  setImages(images) {
    this.images = images;
    this.layout = null; // Reset layout
  }

  /**
   * Updates options
   * @param {Object} options - New options
   */
  updateOptions(options) {
    this.options = { ...this.options, ...options };
    this.pageDimensions = this._getPageDimensions();
    this.layout = null; // Reset layout
  }

  /**
   * Gets estimated PDF file size
   * @returns {number} - Estimated size in bytes
   */
  getEstimatedSize() {
    if (this.images.length === 0) return 0;

    // Rough estimation based on image count and average size
    const averageImageSize =
      this.images.reduce((sum, img) => sum + img.size, 0) / this.images.length;
    const compressionRatio = this.options.imageQuality * 0.5; // Rough estimate

    return Math.round(this.images.length * averageImageSize * compressionRatio);
  }

  /**
   * Static method to create PDFGenerator from gallery
   * @param {ImageGallery} gallery - Gallery instance
   * @param {Object} options - PDF options
   * @returns {PDFGenerator} - New PDFGenerator instance
   */
  static fromGallery(gallery, options = {}) {
    const images = gallery.getImages();
    return new PDFGenerator(images, options);
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = PDFGenerator;
}
