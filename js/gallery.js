/**
 * ImageGallery Class
 * Manages image gallery functionality including loading, display, and interaction
 */

class ImageGallery {
  /**
   * Creates a new ImageGallery instance
   * @param {HTMLElement} containerElement - The container element for the gallery
   * @param {Object} options - Configuration options
   */
  constructor(containerElement, options = {}) {
    // Validate container element
    if (!containerElement || !(containerElement instanceof HTMLElement)) {
      throw new Error("ImageGallery requires a valid container element");
    }

    this.container = containerElement;
    this.images = [];
    this.currentIndex = 0;

    // Configuration options
    this.options = {
      thumbnailSize: options.thumbnailSize || 200,
      lightboxEnabled: options.lightboxEnabled !== false,
      lazyLoading: options.lazyLoading !== false,
      maxConcurrentLoads: options.maxConcurrentLoads || 5,
      sortBy: options.sortBy || "name", // 'name', 'date', 'size'
      sortOrder: options.sortOrder || "asc", // 'asc', 'desc'
      showOverlay: options.showOverlay !== false,
      showActions: options.showActions !== false,
      ...options,
    };

    // State management
    this.state = {
      loading: false,
      error: null,
      currentView: "grid", // 'grid' | 'lightbox'
      selectedImages: new Set(),
      filters: {
        sortBy: this.options.sortBy,
        sortOrder: this.options.sortOrder,
        searchTerm: "",
      },
    };

    // DOM elements
    this.elements = {
      grid: null,
      emptyState: null,
      lightbox: null,
      loadingOverlay: null,
    };

    // Event handlers
    this.eventHandlers = new Map();

    // Initialize the gallery
    this._initialize();
  }

  /**
   * Initializes the gallery
   * @private
   */
  _initialize() {
    this._setupDOM();
    this._bindEvents();
    this._setupIntersectionObserver();
    this._loadImagesFromServer();
  }

  /**
   * Sets up the DOM structure
   * @private
   */
  _setupDOM() {
    // Find or create gallery grid
    this.elements.grid =
      this.container.querySelector(".gallery-grid") ||
      this._createGalleryGrid();

    // Find or create empty state
    this.elements.emptyState =
      this.container.querySelector(".gallery-empty") ||
      this._createEmptyState();

    // Setup lightbox if enabled
    if (this.options.lightboxEnabled) {
      this.elements.lightbox =
        document.querySelector("#lightbox") || this._createLightbox();
    }

    // Setup loading overlay
    this.elements.loadingOverlay =
      document.querySelector("#loading-overlay") ||
      this._createLoadingOverlay();
  }

  /**
   * Creates the gallery grid element
   * @private
   * @returns {HTMLElement} - Gallery grid element
   */
  _createGalleryGrid() {
    const grid = createElement("div", {
      className: "gallery-grid",
    });
    this.container.appendChild(grid);
    return grid;
  }

  /**
   * Creates the empty state element
   * @private
   * @returns {HTMLElement} - Empty state element
   */
  _createEmptyState() {
    const emptyState = createElement("div", {
      className: "gallery-empty hidden",
    });

    emptyState.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21,15 16,10 5,21"></polyline>
                </svg>
                <h3 class="empty-title">No Images Yet</h3>
                <p class="empty-description">Upload some images to get started with your gallery</p>
            </div>
        `;

    this.container.appendChild(emptyState);
    return emptyState;
  }

  /**
   * Creates the lightbox element
   * @private
   * @returns {HTMLElement} - Lightbox element
   */
  _createLightbox() {
    const lightbox = createElement("div", {
      id: "lightbox",
      className: "lightbox hidden",
    });

    lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="lightbox-content">
                    <img id="lightbox-image" src="" alt="" class="lightbox-image">
                    
                    <div class="lightbox-controls">
                        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15,18 9,12 15,6"></polyline>
                            </svg>
                        </button>
                        
                        <div class="lightbox-info">
                            <span class="lightbox-counter">1 / 10</span>
                            <span class="lightbox-title">Image Name</span>
                        </div>
                        
                        <button class="lightbox-nav lightbox-next" aria-label="Next image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(lightbox);
    return lightbox;
  }

  /**
   * Creates the loading overlay element
   * @private
   * @returns {HTMLElement} - Loading overlay element
   */
  _createLoadingOverlay() {
    const overlay = createElement("div", {
      id: "loading-overlay",
      className: "loading-overlay hidden",
    });

    overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p class="loading-text">Processing images...</p>
            </div>
        `;

    document.body.appendChild(overlay);
    return overlay;
  }

  /**
   * Binds event handlers
   * @private
   */
  _bindEvents() {
    // Gallery grid events
    this._bindEvent(
      this.elements.grid,
      "click",
      this._handleGridClick.bind(this)
    );

    // Lightbox events
    if (this.elements.lightbox) {
      this._bindEvent(
        this.elements.lightbox.querySelector(".lightbox-close"),
        "click",
        this.closeLightbox.bind(this)
      );
      this._bindEvent(
        this.elements.lightbox.querySelector(".lightbox-backdrop"),
        "click",
        this.closeLightbox.bind(this)
      );
      this._bindEvent(
        this.elements.lightbox.querySelector(".lightbox-prev"),
        "click",
        this.previousImage.bind(this)
      );
      this._bindEvent(
        this.elements.lightbox.querySelector(".lightbox-next"),
        "click",
        this.nextImage.bind(this)
      );
    }

    // Keyboard events
    this._bindEvent(document, "keydown", this._handleKeydown.bind(this));

    // Image delete events
    this._bindEvent(
      document,
      "imageDelete",
      this._handleImageDelete.bind(this)
    );

    // File upload events
    const uploadInput = document.querySelector("#image-upload");
    const uploadBtn = document.querySelector("#upload-btn");
    const refreshBtn = document.querySelector("#refresh-btn");

    if (uploadInput && uploadBtn) {
      this._bindEvent(uploadBtn, "click", () => uploadInput.click());
      this._bindEvent(uploadInput, "change", this._handleFileUpload.bind(this));
    }

    if (refreshBtn) {
      this._bindEvent(refreshBtn, "click", this.refresh.bind(this));
    }

    // Search and filter events
    const searchInput = document.querySelector("#search-input");
    const clearSearchBtn = document.querySelector("#clear-search");

    if (searchInput) {
      this._bindEvent(
        searchInput,
        "input",
        debounce(this._handleSearch.bind(this), 300)
      );
    }

    if (clearSearchBtn) {
      this._bindEvent(clearSearchBtn, "click", this._clearSearch.bind(this));
    }

    // Sort/filter events
    const sortSelect = document.querySelector("#sort-select");
    if (sortSelect) {
      this._bindEvent(sortSelect, "change", this._handleSortChange.bind(this));
    }
  }

  /**
   * Binds an event and stores the handler for cleanup
   * @private
   * @param {HTMLElement} element - Element to bind event to
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  _bindEvent(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);

      // Store for cleanup
      const key = `${element.tagName}-${event}`;
      if (!this.eventHandlers.has(key)) {
        this.eventHandlers.set(key, []);
      }
      this.eventHandlers.get(key).push({ element, event, handler });
    }
  }

  /**
   * Sets up intersection observer for lazy loading
   * @private
   */
  _setupIntersectionObserver() {
    if (!this.options.lazyLoading || !("IntersectionObserver" in window)) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      this._handleIntersection.bind(this),
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );
  }

  /**
   * Handles intersection observer events for lazy loading
   * @private
   * @param {IntersectionObserverEntry[]} entries - Intersection entries
   */
  _handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;

        if (src && !img.src) {
          img.src = src;
          img.removeAttribute("data-src");
          this.intersectionObserver.unobserve(img);
        }
      }
    });
  }

  /**
   * Handles grid click events
   * @private
   * @param {Event} event - Click event
   */
  _handleGridClick(event) {
    const galleryItem = event.target.closest(".gallery-item");
    if (!galleryItem) return;

    const imageId = galleryItem.dataset.imageId;
    const imageIndex = this.images.findIndex((img) => img.id === imageId);

    if (imageIndex !== -1) {
      this.openLightbox(imageIndex);
    }
  }

  /**
   * Handles keyboard events
   * @private
   * @param {KeyboardEvent} event - Keyboard event
   */
  _handleKeydown(event) {
    if (this.state.currentView === "lightbox") {
      switch (event.key) {
        case "Escape":
          this.closeLightbox();
          break;
        case "ArrowLeft":
          this.previousImage();
          break;
        case "ArrowRight":
          this.nextImage();
          break;
      }
    }
  }

  /**
   * Handles file upload
   * @private
   * @param {Event} event - Change event
   */
  async _handleFileUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Check if we can use server upload
    if (window.location.protocol !== "file:") {
      try {
        // Upload files to server
        await this._uploadFilesToServer(files);

        // Reload images from server to get the updated list
        await this._loadImagesFromServer();
      } catch (error) {
        console.error(
          "Server upload failed, falling back to local loading:",
          error
        );
        // Fallback to local loading if server upload fails
        await this.loadImages(files);
      }
    } else {
      // Use local loading when served via file protocol
      console.log("Using local file loading (file:// protocol detected)");
      await this.loadImages(files);
    }

    // Clear the input so the same files can be selected again
    event.target.value = "";
  }

  /**
   * Handles sort change
   * @private
   * @param {Event} event - Change event
   */
  _handleSortChange(event) {
    const [sortBy, sortOrder] = event.target.value.split("-");
    this.setSorting(sortBy, sortOrder || "asc");
  }

  /**
   * Loads images from files
   * @param {FileList|File[]} files - Files to load
   * @param {Object} options - Loading options
   * @returns {Promise<void>}
   */
  async loadImages(files, options = {}) {
    if (!files || files.length === 0) {
      this._showEmptyState();
      return;
    }

    this._showLoading(true);
    this.state.loading = true;
    this.state.error = null;

    try {
      const result = await ImageItem.fromFiles(files, {
        maxConcurrent: this.options.maxConcurrentLoads,
        onProgress: (current, total, imageItem) => {
          this._updateLoadingProgress(current, total);
          if (imageItem) {
            this.addImage(imageItem, false); // Don't re-render for each image
          }
        },
        onError: (error, file) => {
          console.warn(`Failed to load image ${file.name}:`, error);
        },
      });

      // Update image count in hero section
      this._updateImageCount();

      // Render all images at once
      this.render();

      // Show any errors
      if (result.errors.length > 0) {
        this._showErrors(result.errors);
      }
    } catch (error) {
      this.state.error = error;
      console.error("Failed to load images:", error);
    } finally {
      this._showLoading(false);
      this.state.loading = false;
    }
  }

  /**
   * Adds an image to the gallery
   * @param {ImageItem} imageItem - Image to add
   * @param {boolean} render - Whether to re-render immediately
   */
  addImage(imageItem, render = true) {
    if (!(imageItem instanceof ImageItem)) {
      throw new Error("Expected ImageItem instance");
    }

    // Check for duplicates
    const exists = this.images.some(
      (img) =>
        img.name === imageItem.name &&
        img.size === imageItem.size &&
        img.lastModified === imageItem.lastModified
    );

    if (!exists) {
      this.images.push(imageItem);

      if (render) {
        this.render();
      }
    }
  }

  /**
   * Removes an image from the gallery
   * @param {string} imageId - ID of image to remove
   */
  removeImage(imageId) {
    const index = this.images.findIndex((img) => img.id === imageId);
    if (index !== -1) {
      const removedImage = this.images.splice(index, 1)[0];
      removedImage.cleanup();

      // Update current index if needed
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = Math.max(0, this.images.length - 1);
      }

      this.render();
      this._updateImageCount();
    }
  }

  /**
   * Clears all images from the gallery
   */
  clear() {
    // Cleanup all images
    this.images.forEach((img) => img.cleanup());
    this.images = [];
    this.currentIndex = 0;

    this.render();
    this._updateImageCount();
  }

  /**
   * Sets the sorting criteria
   * @param {string} sortBy - Sort field ('name', 'date', 'size')
   * @param {string} sortOrder - Sort order ('asc', 'desc')
   */
  setSorting(sortBy, sortOrder = "asc") {
    this.state.filters.sortBy = sortBy;
    this.state.filters.sortOrder = sortOrder;

    this._sortImages();
    this.render();
  }

  /**
   * Sorts the images array
   * @private
   */
  _sortImages() {
    const { sortBy, sortOrder } = this.state.filters;

    this.images.sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "name":
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case "date":
          valueA = a.lastModified;
          valueB = b.lastModified;
          break;
        case "size":
          valueA = a.size;
          valueB = b.size;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Renders the gallery
   */
  render() {
    if (this.images.length === 0) {
      this._showEmptyState();
      return;
    }

    this._hideEmptyState();
    this._renderGrid();
  }

  /**
   * Renders the gallery grid
   * @private
   */
  _renderGrid() {
    // Clear existing content
    this.elements.grid.innerHTML = "";

    // Get filtered images
    const filteredImages = this._getFilteredImages();

    if (filteredImages.length === 0) {
      this._showEmptyState();
      return;
    }

    // Create gallery items
    filteredImages.forEach((imageItem, index) => {
      const galleryElement = imageItem.createGalleryElement({
        showOverlay: this.options.showOverlay,
        showActions: this.options.showActions,
      });

      // Add click handler
      galleryElement.addEventListener("click", () => {
        this.openLightbox(index);
      });

      // Setup lazy loading if enabled
      if (this.options.lazyLoading && this.intersectionObserver) {
        const img = galleryElement.querySelector("img");
        if (img && img.src) {
          img.dataset.src = img.src;
          img.src = "";
          this.intersectionObserver.observe(img);
        }
      }

      this.elements.grid.appendChild(galleryElement);
    });
  }

  /**
   * Opens the lightbox at specified index
   * @param {number} index - Image index
   */
  openLightbox(index) {
    if (!this.options.lightboxEnabled || !this.elements.lightbox) {
      return;
    }

    if (index < 0 || index >= this.images.length) {
      return;
    }

    this.currentIndex = index;
    this.state.currentView = "lightbox";

    this._updateLightboxContent();
    this.elements.lightbox.classList.remove("hidden");
    this.elements.lightbox.classList.add("active");

    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    // Focus management
    this.elements.lightbox.querySelector(".lightbox-close").focus();
  }

  /**
   * Closes the lightbox
   */
  closeLightbox() {
    if (!this.elements.lightbox) return;

    this.state.currentView = "grid";
    this.elements.lightbox.classList.remove("active");
    this.elements.lightbox.classList.add("hidden");

    // Restore body scrolling
    document.body.style.overflow = "";
  }

  /**
   * Shows the next image in lightbox
   */
  nextImage() {
    if (this.state.currentView !== "lightbox") return;

    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this._updateLightboxContent();
  }

  /**
   * Shows the previous image in lightbox
   */
  previousImage() {
    if (this.state.currentView !== "lightbox") return;

    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this._updateLightboxContent();
  }

  /**
   * Updates lightbox content
   * @private
   */
  _updateLightboxContent() {
    if (!this.elements.lightbox || this.images.length === 0) return;

    const currentImage = this.images[this.currentIndex];
    const img = this.elements.lightbox.querySelector("#lightbox-image");
    const counter = this.elements.lightbox.querySelector(".lightbox-counter");
    const title = this.elements.lightbox.querySelector(".lightbox-title");
    const prevBtn = this.elements.lightbox.querySelector(".lightbox-prev");
    const nextBtn = this.elements.lightbox.querySelector(".lightbox-next");

    // Update image
    img.src = currentImage.url || currentImage.createObjectURL();
    img.alt = currentImage.name;

    // Update counter and title
    counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    title.textContent = currentImage.name;

    // Update navigation buttons
    prevBtn.disabled = this.images.length <= 1;
    nextBtn.disabled = this.images.length <= 1;
  }

  /**
   * Shows or hides loading state
   * @private
   * @param {boolean} show - Whether to show loading
   */
  _showLoading(show) {
    if (!this.elements.loadingOverlay) return;

    if (show) {
      this.elements.loadingOverlay.classList.remove("hidden");
      this.elements.loadingOverlay.classList.add("active");
    } else {
      this.elements.loadingOverlay.classList.remove("active");
      this.elements.loadingOverlay.classList.add("hidden");
    }
  }

  /**
   * Updates loading progress
   * @private
   * @param {number} current - Current progress
   * @param {number} total - Total items
   */
  _updateLoadingProgress(current, total) {
    const text = this.elements.loadingOverlay?.querySelector(".loading-text");
    if (text) {
      text.textContent = `Processing images... ${current}/${total}`;
    }
  }

  /**
   * Shows empty state
   * @private
   */
  _showEmptyState() {
    this.elements.grid.innerHTML = "";
    this.elements.emptyState.classList.remove("hidden");
  }

  /**
   * Hides empty state
   * @private
   */
  _hideEmptyState() {
    this.elements.emptyState.classList.add("hidden");
  }

  /**
   * Updates image count in hero section
   * @private
   */
  _updateImageCount() {
    const countElement = document.querySelector("#image-count");
    if (countElement) {
      countElement.textContent = this.images.length;
    }

    // Enable/disable PDF button
    const pdfBtn = document.querySelector("#generate-pdf-btn");
    if (pdfBtn) {
      pdfBtn.disabled = this.images.length === 0;
    }
  }

  /**
   * Shows error messages
   * @private
   * @param {Array} errors - Array of error objects
   */
  _showErrors(errors) {
    // Simple console logging for now
    // In a real app, you'd show a toast notification or modal
    errors.forEach(({ file, error }) => {
      console.error(`Failed to load ${file.name}:`, error.message);
    });
  }

  /**
   * Gets all images
   * @returns {ImageItem[]} - Array of images
   */
  getImages() {
    return [...this.images];
  }

  /**
   * Gets current image
   * @returns {ImageItem|null} - Current image or null
   */
  getCurrentImage() {
    return this.images[this.currentIndex] || null;
  }

  /**
   * Gets gallery statistics
   * @returns {Object} - Statistics object
   */
  getStats() {
    const totalSize = this.images.reduce((sum, img) => sum + img.size, 0);
    const formats = {};

    this.images.forEach((img) => {
      const ext = img.getExtension();
      formats[ext] = (formats[ext] || 0) + 1;
    });

    return {
      totalImages: this.images.length,
      totalSize: formatFileSize(totalSize),
      formats,
      loading: this.state.loading,
      error: this.state.error,
    };
  }

  /**
   * Loads images from server directory
   * @private
   */
  async _loadImagesFromServer() {
    // Skip server loading if not served via HTTP(S)
    if (window.location.protocol === "file:") {
      console.log(
        "File protocol detected, skipping server image loading. Please serve via HTTP for full functionality."
      );
      this._showEmptyState();
      return;
    }

    try {
      this._showLoading(true);
      this.state.loading = true;

      const response = await fetch("/api/gallery");

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Clear existing images
      this.clear();

      // Convert server images to ImageItem instances
      for (const serverImage of data.images) {
        try {
          const imageItem = await this._createImageItemFromServer(serverImage);
          this.addImage(imageItem, false);
        } catch (error) {
          console.warn(
            `Failed to load server image ${serverImage.name}:`,
            error
          );
        }
      }

      // Update image count and render
      this._updateImageCount();
      this.render();

      // Show success message if images were loaded
      if (data.images.length > 0) {
        this._showNotification(
          `Loaded ${data.images.length} image(s) from server`,
          "success"
        );
      }
    } catch (error) {
      console.error("Failed to load images from server:", error);
      this.state.error = error;

      // Show empty state if no images could be loaded
      if (this.images.length === 0) {
        this._showEmptyState();
      }
    } finally {
      this._showLoading(false);
      this.state.loading = false;
    }
  }

  /**
   * Creates an ImageItem from server image data
   * @private
   * @param {Object} serverImage - Server image data
   * @returns {Promise<ImageItem>} - Promise that resolves to ImageItem
   */
  async _createImageItemFromServer(serverImage) {
    // Create a mock File object for compatibility
    const mockFile = {
      name: serverImage.name,
      size: serverImage.size,
      type: serverImage.type,
      lastModified: serverImage.lastModified,
    };

    // Create ImageItem with server data
    const imageItem = new ImageItem(mockFile, {
      dimensions: serverImage.dimensions,
      serverUrl: serverImage.url,
    });

    // Set the URL directly from server
    imageItem.url = serverImage.url;

    // Set dimensions if available from server
    if (serverImage.dimensions) {
      imageItem.dimensions = serverImage.dimensions;
      imageItem.aspectRatio =
        serverImage.dimensions.width / serverImage.dimensions.height;
    }

    // For server images, use the original URL as thumbnail
    // CSS will handle the sizing and cropping
    imageItem.thumbnail = serverImage.url;
    imageItem.thumbnailGenerated = true;

    imageItem.loaded = true;
    return imageItem;
  }

  /**
   * Uploads files to server
   * @private
   * @param {FileList} files - Files to upload
   * @returns {Promise<Object>} - Upload result
   */
  async _uploadFilesToServer(files) {
    const formData = new FormData();

    // Add all files to form data
    Array.from(files).forEach((file, index) => {
      formData.append("images[]", file);
    });

    this._showLoading(true);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Show success message
      if (result.uploaded && result.uploaded.length > 0) {
        this._showNotification(
          `Successfully uploaded ${result.uploaded.length} image(s)`,
          "success"
        );
      }

      // Show any errors
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((error) => {
          this._showNotification(error, "warning");
        });
      }

      return result;
    } catch (error) {
      this._showNotification(`Upload failed: ${error.message}`, "error");
      throw error;
    } finally {
      this._showLoading(false);
    }
  }

  /**
   * Deletes an image from the server
   * @private
   * @param {string} imageName - Name of the image to delete
   * @returns {Promise<boolean>} - Success status
   */
  async _deleteImageFromServer(imageName) {
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageName }),
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      this._showNotification(
        `Image "${imageName}" deleted successfully`,
        "success"
      );
      return true;
    } catch (error) {
      this._showNotification(
        `Failed to delete image: ${error.message}`,
        "error"
      );
      return false;
    }
  }

  /**
   * Shows a notification message
   * @private
   * @param {string} message - Notification message
   * @param {string} type - Notification type ('success', 'warning', 'error')
   */
  _showNotification(message, type = "info") {
    // Create toast notification
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
                max-width: 300px;
                word-wrap: break-word;
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

    // Remove after 4 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  /**
   * Handles image deletion event
   * @private
   * @param {CustomEvent} event - Delete event
   */
  async _handleImageDelete(event) {
    const imageItem = event.detail.imageItem;

    if (!imageItem.isServerImage) {
      // For local images, just remove from gallery
      this.removeImage(imageItem.id);
      return;
    }

    // For server images, delete from server first
    const success = await this._deleteImageFromServer(imageItem.name);

    if (success) {
      // Remove from gallery
      this.removeImage(imageItem.id);

      // Update image count
      this._updateImageCount();
    }
  }

  /**
   * Handles search input
   * @private
   * @param {Event} event - Input event
   */
  _handleSearch(event) {
    this.state.filters.searchTerm = event.target.value.toLowerCase();
    this.render();
  }

  /**
   * Clears search
   * @private
   */
  _clearSearch() {
    const searchInput = document.querySelector("#search-input");
    if (searchInput) {
      searchInput.value = "";
      this.state.filters.searchTerm = "";
      this.render();
    }
  }

  /**
   * Filters images based on search term
   * @private
   * @returns {ImageItem[]} - Filtered images
   */
  _getFilteredImages() {
    if (!this.state.filters.searchTerm) {
      return this.images;
    }

    return this.images.filter((image) =>
      image.name.toLowerCase().includes(this.state.filters.searchTerm)
    );
  }

  /**
   * Refreshes the gallery by reloading from server
   */
  async refresh() {
    await this._loadImagesFromServer();
  }

  /**
   * Destroys the gallery and cleans up resources
   */
  destroy() {
    // Cleanup images
    this.images.forEach((img) => img.cleanup());

    // Remove event listeners
    this.eventHandlers.forEach((handlers) => {
      handlers.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
    });

    // Cleanup intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    // Clear DOM
    if (this.elements.grid) {
      this.elements.grid.innerHTML = "";
    }

    // Reset state
    this.images = [];
    this.currentIndex = 0;
    this.state.loading = false;
    this.state.error = null;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ImageGallery;
}
