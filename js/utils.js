/**
 * Utility Functions for Image Gallery PDF Application
 * Contains helper functions for file validation, image processing, and error handling
 */

// ===== Constants =====
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_THUMBNAIL_SIZE = 200;
const THUMBNAIL_QUALITY = 0.8;

// ===== File Validation Utilities =====

/**
 * Validates if a file is a supported image format
 * @param {File} file - The file to validate
 * @returns {boolean} - True if file is a supported image format
 */
function isValidImageFile(file) {
    if (!file || !file.type) {
        return false;
    }
    
    return SUPPORTED_IMAGE_TYPES.includes(file.type.toLowerCase());
}

/**
 * Validates file size against maximum allowed size
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum allowed size in bytes (optional)
 * @returns {boolean} - True if file size is within limits
 */
function isValidFileSize(file, maxSize = MAX_IMAGE_SIZE) {
    if (!file || typeof file.size !== 'number') {
        return false;
    }
    
    return file.size <= maxSize;
}

/**
 * Formats file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size (e.g., "2.5 MB")
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Gets file extension from filename
 * @param {string} filename - The filename
 * @returns {string} - File extension (lowercase)
 */
function getFileExtension(filename) {
    if (!filename || typeof filename !== 'string') {
        return '';
    }
    
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.slice(lastDot + 1).toLowerCase() : '';
}

// ===== Image Processing Utilities =====

/**
 * Creates a canvas element with specified dimensions
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {HTMLCanvasElement} - Canvas element
 */
function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

/**
 * Loads an image from a file or URL
 * @param {File|string} source - File object or image URL
 * @returns {Promise<HTMLImageElement>} - Promise that resolves to loaded image
 */
function loadImage(source) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        
        if (source instanceof File) {
            const url = URL.createObjectURL(source);
            img.src = url;
            
            // Clean up object URL after image loads
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
        } else if (typeof source === 'string') {
            img.src = source;
        } else {
            reject(new Error('Invalid image source'));
        }
    });
}

/**
 * Calculates optimal dimensions for thumbnail while maintaining aspect ratio
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @param {number} maxSize - Maximum thumbnail size
 * @returns {Object} - Object with width and height properties
 */
function calculateThumbnailDimensions(originalWidth, originalHeight, maxSize = MAX_THUMBNAIL_SIZE) {
    if (originalWidth <= maxSize && originalHeight <= maxSize) {
        return { width: originalWidth, height: originalHeight };
    }
    
    const aspectRatio = originalWidth / originalHeight;
    
    if (originalWidth > originalHeight) {
        return {
            width: maxSize,
            height: Math.round(maxSize / aspectRatio)
        };
    } else {
        return {
            width: Math.round(maxSize * aspectRatio),
            height: maxSize
        };
    }
}

/**
 * Generates a thumbnail from an image using canvas
 * @param {HTMLImageElement} img - Source image
 * @param {number} maxSize - Maximum thumbnail size
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} - Promise that resolves to thumbnail data URL
 */
function generateThumbnail(img, maxSize = MAX_THUMBNAIL_SIZE, quality = THUMBNAIL_QUALITY) {
    return new Promise((resolve, reject) => {
        try {
            const dimensions = calculateThumbnailDimensions(img.width, img.height, maxSize);
            const canvas = createCanvas(dimensions.width, dimensions.height);
            const ctx = canvas.getContext('2d');
            
            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw the image scaled to thumbnail size
            ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
            
            // Convert to data URL
            const thumbnailDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(thumbnailDataUrl);
        } catch (error) {
            reject(new Error(`Failed to generate thumbnail: ${error.message}`));
        }
    });
}

// ===== Error Handling Utilities =====

/**
 * Creates a standardized error object
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {*} details - Additional error details
 * @returns {Object} - Standardized error object
 */
function createError(message, code = 'UNKNOWN_ERROR', details = null) {
    return {
        message,
        code,
        details,
        timestamp: new Date().toISOString()
    };
}

/**
 * Handles file processing errors with user-friendly messages
 * @param {Error} error - The error object
 * @param {string} filename - Name of the file being processed
 * @returns {Object} - User-friendly error object
 */
function handleFileError(error, filename = 'Unknown file') {
    const errorMap = {
        'Failed to load image': {
            message: `Could not load image "${filename}". The file may be corrupted or in an unsupported format.`,
            code: 'IMAGE_LOAD_ERROR'
        },
        'Failed to generate thumbnail': {
            message: `Could not create thumbnail for "${filename}". The image may be too large or corrupted.`,
            code: 'THUMBNAIL_ERROR'
        },
        'File too large': {
            message: `"${filename}" is too large. Please use images smaller than ${formatFileSize(MAX_IMAGE_SIZE)}.`,
            code: 'FILE_SIZE_ERROR'
        },
        'Unsupported format': {
            message: `"${filename}" is not a supported image format. Please use JPEG, PNG, GIF, or WebP images.`,
            code: 'FORMAT_ERROR'
        }
    };
    
    const knownError = errorMap[error.message];
    if (knownError) {
        return createError(knownError.message, knownError.code, { originalError: error, filename });
    }
    
    return createError(
        `An unexpected error occurred while processing "${filename}".`,
        'PROCESSING_ERROR',
        { originalError: error, filename }
    );
}

// ===== DOM Utilities =====

/**
 * Safely queries for a DOM element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {Element|null} - Found element or null
 */
function safeQuerySelector(selector, parent = document) {
    try {
        return parent.querySelector(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
        return null;
    }
}

/**
 * Safely queries for multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {NodeList} - Found elements
 */
function safeQuerySelectorAll(selector, parent = document) {
    try {
        return parent.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
        return [];
    }
}

/**
 * Creates a DOM element with attributes and content
 * @param {string} tagName - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|Element} content - Element content
 * @returns {Element} - Created element
 */
function createElement(tagName, attributes = {}, content = '') {
    const element = document.createElement(tagName);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // Set content
    if (typeof content === 'string') {
        element.textContent = content;
    } else if (content instanceof Element) {
        element.appendChild(content);
    }
    
    return element;
}

// ===== Animation Utilities =====

/**
 * Animates a numeric value over time
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} callback - Function called with current value
 * @param {Function} easing - Easing function (optional)
 * @returns {Function} - Function to cancel animation
 */
function animateValue(start, end, duration, callback, easing = (t) => t) {
    const startTime = performance.now();
    let animationId;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        const currentValue = start + (end - start) * easedProgress;
        
        callback(currentValue);
        
        if (progress < 1) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    animationId = requestAnimationFrame(animate);
    
    // Return cancel function
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

/**
 * Easing functions for animations
 */
const Easing = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

// ===== Debounce and Throttle Utilities =====

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} - Debounced function
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Export utilities for use in other modules =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // File validation
        isValidImageFile,
        isValidFileSize,
        formatFileSize,
        getFileExtension,
        
        // Image processing
        loadImage,
        generateThumbnail,
        calculateThumbnailDimensions,
        createCanvas,
        
        // Error handling
        createError,
        handleFileError,
        
        // DOM utilities
        safeQuerySelector,
        safeQuerySelectorAll,
        createElement,
        
        // Animation utilities
        animateValue,
        Easing,
        
        // Function utilities
        debounce,
        throttle,
        
        // Constants
        SUPPORTED_IMAGE_TYPES,
        MAX_IMAGE_SIZE,
        MAX_THUMBNAIL_SIZE,
        THUMBNAIL_QUALITY
    };
}