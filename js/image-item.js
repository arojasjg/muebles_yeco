/**
 * ImageItem Class
 * Represents an individual image with metadata, thumbnail generation, and validation
 */

class ImageItem {
    /**
     * Creates a new ImageItem instance
     * @param {File|Object} file - The image file or file-like object
     * @param {Object} metadata - Additional metadata (optional)
     */
    constructor(file, metadata = {}) {
        // Validate file input (allow both File objects and file-like objects)
        if (!file || (typeof file !== 'object')) {
            throw new Error('ImageItem requires a valid File object or file-like object');
        }
        
        // Core file properties
        this.file = file;
        this.name = file.name;
        this.size = file.size;
        this.type = file.type;
        this.lastModified = file.lastModified;
        
        // Server-specific properties
        this.isServerImage = !!metadata.serverUrl;
        this.serverUrl = metadata.serverUrl || null;
        
        // URLs for display
        this.url = null;
        this.thumbnail = null;
        
        // Image properties
        this.dimensions = metadata.dimensions || null;
        this.aspectRatio = null;
        
        // State tracking
        this.loaded = false;
        this.thumbnailGenerated = false;
        this.error = null;
        
        // Additional metadata
        this.metadata = {
            uploadDate: new Date(),
            ...metadata
        };
        
        // Validate the file (skip validation for server images)
        if (!this.isServerImage) {
            this._validateFile();
        }
        
        // Generate unique ID
        this.id = this._generateId();
    }
    
    /**
     * Validates the image file
     * @private
     */
    _validateFile() {
        if (!isValidImageFile(this.file)) {
            throw createError(
                'Unsupported format',
                'FORMAT_ERROR',
                { filename: this.name, type: this.type }
            );
        }
        
        if (!isValidFileSize(this.file)) {
            throw createError(
                'File too large',
                'FILE_SIZE_ERROR',
                { filename: this.name, size: this.size }
            );
        }
    }
    
    /**
     * Generates a unique ID for the image
     * @private
     * @returns {string} - Unique identifier
     */
    _generateId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const nameHash = this.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return `img_${nameHash}_${timestamp}_${random}`;
    }
    
    /**
     * Creates an object URL for the image file
     * @returns {string} - Object URL for the image
     */
    createObjectURL() {
        if (!this.url) {
            if (this.isServerImage && this.serverUrl) {
                this.url = this.serverUrl;
            } else if (this.file instanceof File) {
                this.url = URL.createObjectURL(this.file);
            }
        }
        return this.url;
    }
    
    /**
     * Gets the image dimensions by loading the image
     * @returns {Promise<Object>} - Promise that resolves to dimensions object
     */
    async getDimensions() {
        if (this.dimensions) {
            return this.dimensions;
        }
        
        try {
            const img = await loadImage(this.file);
            this.dimensions = {
                width: img.width,
                height: img.height
            };
            this.aspectRatio = img.width / img.height;
            return this.dimensions;
        } catch (error) {
            const processedError = handleFileError(error, this.name);
            this.error = processedError;
            throw processedError;
        }
    }
    
    /**
     * Generates a thumbnail for the image
     * @param {number} maxSize - Maximum thumbnail size (optional)
     * @param {number} quality - JPEG quality 0-1 (optional)
     * @returns {Promise<string>} - Promise that resolves to thumbnail data URL
     */
    async generateThumbnail(maxSize = MAX_THUMBNAIL_SIZE, quality = THUMBNAIL_QUALITY) {
        if (this.thumbnail) {
            return this.thumbnail;
        }
        
        try {
            // Load the image first
            const img = await loadImage(this.file);
            
            // Store dimensions if not already available
            if (!this.dimensions) {
                this.dimensions = {
                    width: img.width,
                    height: img.height
                };
                this.aspectRatio = img.width / img.height;
            }
            
            // Generate thumbnail
            this.thumbnail = await generateThumbnail(img, maxSize, quality);
            this.thumbnailGenerated = true;
            
            return this.thumbnail;
        } catch (error) {
            const processedError = handleFileError(error, this.name);
            this.error = processedError;
            throw processedError;
        }
    }
    
    /**
     * Loads the image and generates thumbnail if needed
     * @param {Object} options - Loading options
     * @returns {Promise<ImageItem>} - Promise that resolves to this ImageItem
     */
    async load(options = {}) {
        const {
            generateThumbnail: shouldGenerateThumbnail = true,
            thumbnailSize = MAX_THUMBNAIL_SIZE,
            thumbnailQuality = THUMBNAIL_QUALITY
        } = options;
        
        try {
            // Create object URL
            this.createObjectURL();
            
            // Get dimensions
            await this.getDimensions();
            
            // Generate thumbnail if requested
            if (shouldGenerateThumbnail) {
                await this.generateThumbnail(thumbnailSize, thumbnailQuality);
            }
            
            this.loaded = true;
            return this;
        } catch (error) {
            this.error = error;
            throw error;
        }
    }
    
    /**
     * Gets formatted file size
     * @returns {string} - Human-readable file size
     */
    getFormattedSize() {
        return formatFileSize(this.size);
    }
    
    /**
     * Gets file extension
     * @returns {string} - File extension
     */
    getExtension() {
        return getFileExtension(this.name);
    }
    
    /**
     * Gets formatted last modified date
     * @returns {string} - Formatted date string
     */
    getFormattedDate() {
        return new Date(this.lastModified).toLocaleDateString();
    }
    
    /**
     * Checks if the image is in landscape orientation
     * @returns {boolean} - True if landscape
     */
    isLandscape() {
        return this.aspectRatio > 1;
    }
    
    /**
     * Checks if the image is in portrait orientation
     * @returns {boolean} - True if portrait
     */
    isPortrait() {
        return this.aspectRatio < 1;
    }
    
    /**
     * Checks if the image is square
     * @returns {boolean} - True if square
     */
    isSquare() {
        return Math.abs(this.aspectRatio - 1) < 0.01;
    }
    
    /**
     * Creates a DOM element for the gallery item
     * @param {Object} options - Rendering options
     * @returns {HTMLElement} - Gallery item element
     */
    createGalleryElement(options = {}) {
        const {
            showOverlay = true,
            showActions = true,
            className = 'gallery-item'
        } = options;
        
        // Create main container
        const container = createElement('div', {
            className: `${className} ${this.loaded ? 'loaded' : 'loading'}`,
            dataset: { imageId: this.id }
        });
        
        // Create image element
        const img = createElement('img', {
            className: 'gallery-item-image',
            src: this.thumbnail || this.url || '',
            alt: this.name,
            loading: 'lazy'
        });
        
        container.appendChild(img);
        
        // Add overlay if requested
        if (showOverlay && this.loaded) {
            const overlay = this._createOverlayElement(showActions);
            container.appendChild(overlay);
        }
        
        // Add loading state if not loaded
        if (!this.loaded) {
            const loadingElement = createElement('div', {
                className: 'gallery-item-loading'
            });
            const spinner = createElement('div', {
                className: 'loading-spinner-small'
            });
            loadingElement.appendChild(spinner);
            container.appendChild(loadingElement);
        }
        
        return container;
    }
    
    /**
     * Creates the overlay element for gallery items
     * @param {boolean} showActions - Whether to show action buttons
     * @returns {HTMLElement} - Overlay element
     * @private
     */
    _createOverlayElement(showActions = true) {
        const overlay = createElement('div', {
            className: 'gallery-item-overlay'
        });
        
        // Title
        const title = createElement('div', {
            className: 'gallery-item-title'
        }, this.name);
        
        // Meta information
        const meta = createElement('div', {
            className: 'gallery-item-meta'
        });
        
        const size = createElement('span', {
            className: 'gallery-item-size'
        }, this.getFormattedSize());
        
        meta.appendChild(size);
        
        // Actions
        if (showActions) {
            const actions = createElement('div', {
                className: 'gallery-item-actions'
            });
            
            // View action
            const viewBtn = createElement('button', {
                className: 'gallery-item-action gallery-item-view',
                'aria-label': 'View image'
            });
            viewBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            `;
            actions.appendChild(viewBtn);
            
            // Delete action (only for server images)
            if (this.isServerImage) {
                const deleteBtn = createElement('button', {
                    className: 'gallery-item-action gallery-item-delete',
                    'aria-label': 'Delete image'
                });
                deleteBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                `;
                
                // Add click handler for delete
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent opening lightbox
                    this._handleDelete();
                });
                
                actions.appendChild(deleteBtn);
            }
            
            meta.appendChild(actions);
        }
        
        overlay.appendChild(title);
        overlay.appendChild(meta);
        
        return overlay;
    }
    
    /**
     * Handles image deletion
     * @private
     */
    async _handleDelete() {
        if (!confirm(`Are you sure you want to delete "${this.name}"?`)) {
            return;
        }
        
        // Dispatch custom event for gallery to handle
        const deleteEvent = new CustomEvent('imageDelete', {
            detail: { imageItem: this }
        });
        document.dispatchEvent(deleteEvent);
    }
    
    /**
     * Cleans up resources (revokes object URLs)
     */
    cleanup() {
        if (this.url && !this.isServerImage) {
            URL.revokeObjectURL(this.url);
            this.url = null;
        }
    }
    
    /**
     * Converts the ImageItem to a plain object for serialization
     * @returns {Object} - Plain object representation
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            size: this.size,
            type: this.type,
            lastModified: this.lastModified,
            dimensions: this.dimensions,
            aspectRatio: this.aspectRatio,
            loaded: this.loaded,
            thumbnailGenerated: this.thumbnailGenerated,
            metadata: this.metadata,
            error: this.error
        };
    }
    
    /**
     * Creates a copy of the ImageItem
     * @returns {ImageItem} - New ImageItem instance
     */
    clone() {
        const cloned = new ImageItem(this.file, this.metadata);
        cloned.url = this.url;
        cloned.thumbnail = this.thumbnail;
        cloned.dimensions = this.dimensions;
        cloned.aspectRatio = this.aspectRatio;
        cloned.loaded = this.loaded;
        cloned.thumbnailGenerated = this.thumbnailGenerated;
        cloned.error = this.error;
        return cloned;
    }
    
    /**
     * Static method to create ImageItem from file with validation
     * @param {File} file - The image file
     * @param {Object} metadata - Additional metadata
     * @returns {Promise<ImageItem>} - Promise that resolves to ImageItem
     */
    static async fromFile(file, metadata = {}) {
        try {
            const imageItem = new ImageItem(file, metadata);
            await imageItem.load();
            return imageItem;
        } catch (error) {
            throw handleFileError(error, file.name);
        }
    }
    
    /**
     * Static method to create multiple ImageItems from files
     * @param {FileList|File[]} files - Array of files
     * @param {Object} options - Processing options
     * @returns {Promise<ImageItem[]>} - Promise that resolves to array of ImageItems
     */
    static async fromFiles(files, options = {}) {
        const {
            onProgress = null,
            onError = null,
            maxConcurrent = 5
        } = options;
        
        const fileArray = Array.from(files);
        const results = [];
        const errors = [];
        
        // Process files in batches to avoid overwhelming the browser
        for (let i = 0; i < fileArray.length; i += maxConcurrent) {
            const batch = fileArray.slice(i, i + maxConcurrent);
            const batchPromises = batch.map(async (file, index) => {
                try {
                    const imageItem = await ImageItem.fromFile(file);
                    if (onProgress) {
                        onProgress(i + index + 1, fileArray.length, imageItem);
                    }
                    return imageItem;
                } catch (error) {
                    if (onError) {
                        onError(error, file);
                    }
                    errors.push({ file, error });
                    return null;
                }
            });
            
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults.filter(item => item !== null));
        }
        
        return { images: results, errors };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageItem;
}