<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Professional image gallery with PDF generation - Transform your photo collections into beautiful galleries and downloadable PDF albums"
    />
    <meta
      name="keywords"
      content="image gallery, photo album, PDF generator, photo collection, digital gallery"
    />
    <meta name="author" content="Image Gallery PDF" />

    <title>Image Gallery PDF - Beautiful Photo Collections & PDF Albums</title>

    <!-- Preconnect to Google Fonts for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="css/hero.css" />
    <link rel="stylesheet" href="css/gallery.css" />
    <link rel="stylesheet" href="css/responsive.css" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </head>
  <body>
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Transform Your Photos Into
            <span class="hero-title-accent">Beautiful Galleries</span>
          </h1>
          <p class="hero-subtitle">
            Create stunning image galleries from your photo collections and
            generate professional PDF albums with just a few clicks. Perfect for
            portfolios, memories, and sharing your visual stories.
          </p>
          <div class="hero-actions">
            <button
              class="btn btn-primary btn-lg hero-cta"
              data-scroll-to="gallery"
            >
              <span>Explore Gallery</span>
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 13l3 3 7-7"></path>
              </svg>
            </button>
            <button
              class="btn btn-secondary btn-lg"
              data-scroll-to="pdf-section"
            >
              <span>Create PDF</span>
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                ></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
            </button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number" id="image-count">0</span>
              <span class="stat-label">Images Loaded</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">PDF</span>
              <span class="stat-label">Ready to Generate</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Gallery Preview Section -->
    <section id="gallery" class="gallery-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Your Image Gallery</h2>
          <p class="section-subtitle">
            Browse through your photo collection in a beautiful, responsive
            layout. Click any image to view it in full size with smooth
            navigation controls.
          </p>
        </div>

        <div class="gallery-controls">
          <div class="gallery-upload">
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              class="hidden"
            />
            <button class="btn btn-outline" id="upload-btn">
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Upload Images</span>
            </button>
            
            <button class="btn btn-outline" id="refresh-btn">
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="23,4 23,10 17,10"></polyline>
                <polyline points="1,20 1,14 7,14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          <div class="gallery-filters">
            <select id="sort-select" class="filter-select">
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="size">Sort by Size</option>
            </select>
          </div>
        </div>

        <div class="gallery-container">
          <div id="gallery-grid" class="gallery-grid">
            <!-- Gallery images will be dynamically inserted here -->
          </div>

          <div id="gallery-empty" class="gallery-empty">
            <div class="empty-state">
              <svg
                class="empty-icon"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21,15 16,10 5,21"></polyline>
              </svg>
              <h3 class="empty-title">No Images Yet</h3>
              <p class="empty-description">
                Upload some images to get started with your gallery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PDF Generation Section -->
    <section id="pdf-section" class="pdf-section">
      <div class="container">
        <div class="pdf-content">
          <div class="pdf-info">
            <h2 class="section-title">Create Beautiful PDF Albums</h2>
            <p class="section-subtitle">
              Transform your image gallery into a professionally formatted PDF
              document. Perfect for printing, sharing, or archiving your photo
              collections.
            </p>

            <div class="pdf-features">
              <div class="feature-item">
                <svg
                  class="feature-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  ></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
                <div class="feature-text">
                  <h4>Professional Layout</h4>
                  <p>
                    Optimized grid layouts with proper spacing and alignment
                  </p>
                </div>
              </div>

              <div class="feature-item">
                <svg
                  class="feature-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                </svg>
                <div class="feature-text">
                  <h4>High Quality</h4>
                  <p>Maintains image quality while optimizing file size</p>
                </div>
              </div>

              <div class="feature-item">
                <svg
                  class="feature-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <div class="feature-text">
                  <h4>Instant Download</h4>
                  <p>Generate and download your PDF in seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div class="pdf-actions">
            <button
              id="generate-pdf-btn"
              class="btn btn-primary btn-xl pdf-cta"
              disabled
            >
              <svg
                class="btn-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                ></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
              <span>Generate PDF Album</span>
            </button>

            <div class="pdf-progress hidden">
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <p class="progress-text">Generating your PDF...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <h3 class="footer-title">Image Gallery PDF</h3>
            <p class="footer-description">
              Transform your photo collections into beautiful galleries and
              professional PDF albums.
            </p>
          </div>

          <div class="footer-links">
            <a href="#hero" class="footer-link" data-scroll-to="hero">Home</a>
            <a href="#gallery" class="footer-link" data-scroll-to="gallery"
              >Gallery</a
            >
            <a
              href="#pdf-section"
              class="footer-link"
              data-scroll-to="pdf-section"
              >PDF Generator</a
            >
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            &copy; 2024 Image Gallery PDF. Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="lightbox hidden">
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-container">
        <button class="lightbox-close" aria-label="Close lightbox">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="lightbox-content">
          <img id="lightbox-image" src="" alt="" class="lightbox-image" />

          <div class="lightbox-controls">
            <button
              class="lightbox-nav lightbox-prev"
              aria-label="Previous image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            <div class="lightbox-info">
              <span class="lightbox-counter">1 / 10</span>
              <span class="lightbox-title">Image Name</span>
            </div>

            <button class="lightbox-nav lightbox-next" aria-label="Next image">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay hidden">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">Processing images...</p>
      </div>
    </div>

    <!-- Third-party Libraries -->
    <script src="lib/jspdf.umd.min.js"></script>

    <!-- JavaScript -->
    <script src="js/utils.js"></script>
    <script src="js/image-item.js"></script>
    <script src="js/gallery.js"></script>
    <script src="js/pdf-generator.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
