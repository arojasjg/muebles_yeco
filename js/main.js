/**
 * Main Application Logic
 * Coordinates all components and handles page interactions
 */

class ImageGalleryApp {
  /**
   * Creates the main application instance
   */
  constructor() {
    // Core components
    this.gallery = null;
    this.pdfGenerator = null;

    // DOM elements
    this.elements = {
      heroSection: null,
      gallerySection: null,
      pdfSection: null,
      uploadBtn: null,
      uploadInput: null,
      generatePdfBtn: null,
      pdfProgress: null,
      progressFill: null,
      progressText: null,
      imageCount: null,
    };

    // Application state
    this.state = {
      initialized: false,
      generating: false,
    };

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initialize.bind(this));
    } else {
      this.initialize();
    }
  }

  /**
   * Initializes the application
   */
  initialize() {
    if (this.state.initialized) return;

    try {
      this._setupDOM();
      this._initializeGallery();
      this._setupSmoothScrolling();
      this._setupPDFGeneration();
      this._setupEventHandlers();
      this._setupScrollAnimations();

      this.state.initialized = true;
      console.log("Image Gallery App initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Image Gallery App:", error);
    }
  }

  /**
   * Sets up DOM element references
   * @private
   */
  _setupDOM() {
    this.elements = {
      heroSection: document.querySelector("#hero"),
      gallerySection: document.querySelector("#gallery"),
      pdfSection: document.querySelector("#pdf-section"),
      uploadBtn: document.querySelector("#upload-btn"),
      uploadInput: document.querySelector("#image-upload"),
      generatePdfBtn: document.querySelector("#generate-pdf-btn"),
      pdfProgress: document.querySelector(".pdf-progress"),
      progressFill: document.querySelector(".progress-fill"),
      progressText: document.querySelector(".progress-text"),
      imageCount: document.querySelector("#image-count"),
    };

    // Validate required elements
    const requiredElements = ["gallerySection", "generatePdfBtn"];
    for (const elementName of requiredElements) {
      if (!this.elements[elementName]) {
        throw new Error(`Required element not found: ${elementName}`);
      }
    }
  }

  /**
   * Initializes the image gallery
   * @private
   */
  _initializeGallery() {
    const galleryContainer = this.elements.gallerySection;

    this.gallery = new ImageGallery(galleryContainer, {
      thumbnailSize: 200,
      lightboxEnabled: true,
      lazyLoading: true,
      maxConcurrentLoads: 5,
      sortBy: "name",
      sortOrder: "asc",
    });

    console.log("Gallery initialized");
  }

  /**
   * Sets up smooth scrolling navigation
   * @private
   */
  _setupSmoothScrolling() {
    // Find all scroll trigger elements
    const scrollTriggers = document.querySelectorAll("[data-scroll-to]");

    scrollTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = trigger.dataset.scrollTo;
        const targetElement = document.querySelector(`#${targetId}`);

        if (targetElement) {
          this._smoothScrollTo(targetElement);
        }
      });
    });

    // Setup scroll-triggered animations
    this._setupScrollObserver();
  }

  /**
   * Smoothly scrolls to target element
   * @private
   * @param {HTMLElement} targetElement - Element to scroll to
   */
  _smoothScrollTo(targetElement) {
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 second

    let startTime = null;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (ease-in-out)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  /**
   * Sets up scroll observer for animations
   * @private
   */
  _setupScrollObserver() {
    if (!("IntersectionObserver" in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        } else {
          entry.target.classList.remove("animate-in");
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  /**
   * Sets up PDF generation functionality
   * @private
   */
  _setupPDFGeneration() {
    if (!this.elements.generatePdfBtn) return;

    this.elements.generatePdfBtn.addEventListener("click", async () => {
      await this.generatePDF();
    });
  }

  /**
   * Sets up additional event handlers
   * @private
   */
  _setupEventHandlers() {
    // Handle window resize
    window.addEventListener(
      "resize",
      debounce(() => {
        this._handleResize();
      }, 250)
    );

    // Handle scroll for header effects
    window.addEventListener(
      "scroll",
      throttle(() => {
        this._handleScroll();
      }, 16)
    ); // ~60fps

    // Handle visibility change
    document.addEventListener("visibilitychange", () => {
      this._handleVisibilityChange();
    });
  }

  /**
   * Sets up scroll-triggered animations
   * @private
   */
  _setupScrollAnimations() {
    // Add CSS for scroll animations
    const style = document.createElement("style");
    style.textContent = `
            section {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .hero-section {
                opacity: 1;
                transform: none;
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Generates PDF from current gallery images
   */
  async generatePDF() {
    if (this.state.generating) return;

    const images = this.gallery.getImages();
    if (images.length === 0) {
      this._showNotification("No images to generate PDF from", "warning");
      return;
    }

    // Check if jsPDF is loaded
    if (typeof window.jsPDF === "undefined") {
      this._showNotification(
        "PDF library is not loaded. Please refresh the page and try again.",
        "error"
      );
      console.error("jsPDF not available. window.jsPDF:", typeof window.jsPDF);
      return;
    }

    console.log("jsPDF is available, proceeding with PDF generation");

    this.state.generating = true;
    this._showPDFProgress(true);

    try {
      // Create PDF generator
      this.pdfGenerator = new PDFGenerator(images, {
        pageSize: "a4",
        orientation: "portrait",
        margin: 20,
        imagesPerPage: 4,
        imageQuality: 0.8,
        title: "Image Gallery Collection",
        author: "Image Gallery PDF",
        onProgress: (progress) => {
          this._updatePDFProgress(progress);
        },
      });

      // Generate and download PDF
      const filename = `image-gallery-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      await this.pdfGenerator.downloadPDF(filename);

      this._showNotification("PDF generated successfully!", "success");
    } catch (error) {
      console.error("PDF generation failed:", error);
      this._showNotification(
        "Failed to generate PDF. Please try again.",
        "error"
      );
    } finally {
      this.state.generating = false;
      this._showPDFProgress(false);
    }
  }

  /**
   * Shows or hides PDF progress
   * @private
   * @param {boolean} show - Whether to show progress
   */
  _showPDFProgress(show) {
    if (!this.elements.pdfProgress) return;

    if (show) {
      this.elements.pdfProgress.classList.remove("hidden");
      this.elements.pdfProgress.classList.add("active");
      this.elements.generatePdfBtn.disabled = true;
    } else {
      setTimeout(() => {
        this.elements.pdfProgress.classList.remove("active");
        this.elements.pdfProgress.classList.add("hidden");
        this.elements.generatePdfBtn.disabled =
          this.gallery.getImages().length === 0;
      }, 1000);
    }
  }

  /**
   * Updates PDF generation progress
   * @private
   * @param {Object} progress - Progress object
   */
  _updatePDFProgress(progress) {
    if (!this.elements.progressFill || !this.elements.progressText) return;

    const percentage =
      progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

    this.elements.progressFill.style.width = `${percentage}%`;

    const stageMessages = {
      calculating: "Calculating layout...",
      processing: `Processing page ${progress.current} of ${progress.total}...`,
      generating: "Generating PDF...",
      complete: "PDF ready for download!",
    };

    this.elements.progressText.textContent =
      stageMessages[progress.stage] || "Processing...";
  }

  /**
   * Shows a notification to the user
   * @private
   * @param {string} message - Notification message
   * @param {string} type - Notification type ('success', 'warning', 'error')
   */
  _showNotification(message, type = "info") {
    // Simple console notification for now
    // In a real app, you'd show a toast notification
    const styles = {
      success: "color: green; font-weight: bold;",
      warning: "color: orange; font-weight: bold;",
      error: "color: red; font-weight: bold;",
      info: "color: blue; font-weight: bold;",
    };

    console.log(`%c${message}`, styles[type] || styles.info);

    // You could also create a simple toast notification here
    this._createToastNotification(message, type);
  }

  /**
   * Creates a simple toast notification
   * @private
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   */
  _createToastNotification(message, type) {
    const toast = createElement(
      "div",
      {
        className: `toast toast-${type}`,
        style: `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${
                  type === "success"
                    ? "#10b981"
                    : type === "error"
                    ? "#ef4444"
                    : "#f59e0b"
                };
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `,
      },
      message
    );

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(0)";
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Handles window resize
   * @private
   */
  _handleResize() {
    // Re-render gallery if needed
    if (this.gallery) {
      this.gallery.render();
    }
  }

  /**
   * Handles scroll events
   * @private
   */
  _handleScroll() {
    const scrollY = window.pageYOffset;

    // Add scroll effect to hero section
    if (this.elements.heroSection) {
      const heroHeight = this.elements.heroSection.offsetHeight;
      const scrollProgress = Math.min(scrollY / heroHeight, 1);

      // Parallax effect for hero background
      const heroBackground =
        this.elements.heroSection.querySelector(".hero-background");
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollProgress * 50}px)`;
      }
    }
  }

  /**
   * Handles visibility change (tab switching)
   * @private
   */
  _handleVisibilityChange() {
    if (document.hidden) {
      // Pause any ongoing operations if needed
    } else {
      // Resume operations if needed
    }
  }

  /**
   * Gets application statistics
   * @returns {Object} - Statistics object
   */
  getStats() {
    return {
      initialized: this.state.initialized,
      generating: this.state.generating,
      gallery: this.gallery ? this.gallery.getStats() : null,
      pdfGenerator: this.pdfGenerator
        ? {
            estimatedSize: this.pdfGenerator.getEstimatedSize(),
            progress: this.pdfGenerator.getProgress(),
          }
        : null,
    };
  }

  /**
   * Destroys the application and cleans up resources
   */
  destroy() {
    // Cleanup gallery
    if (this.gallery) {
      this.gallery.destroy();
    }

    // Reset state
    this.state.initialized = false;
    this.state.generating = false;

    console.log("Image Gallery App destroyed");
  }
}

// Initialize the application
const app = new ImageGalleryApp();

// Export for debugging/testing
if (typeof window !== "undefined") {
  window.ImageGalleryApp = app;
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ImageGalleryApp;
}
