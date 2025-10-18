/**
 * Muebles Yeco - Optimized JavaScript
 * Performance-focused, SEO-friendly, Accessible
 */

"use strict";

// Performance optimization: Use passive event listeners
const passiveSupported = (() => {
  let supported = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get() {
        supported = true;
      },
    });
    window.addEventListener("test", null, opts);
    window.removeEventListener("test", null, opts);
  } catch (e) {}
  return supported;
})();

// DOM Elements - Cached for performance
const DOM = {
  navbar: document.getElementById("navbar"),
  navToggle: document.getElementById("navToggle"),
  navMenu: document.getElementById("navMenu"),
  galleryGrid: document.getElementById("galleryGrid"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightboxImage"),
  lightboxCaption: document.getElementById("lightboxCaption"),
  lightboxClose: document.getElementById("lightboxClose"),
  lightboxPrev: document.getElementById("lightboxPrev"),
  lightboxNext: document.getElementById("lightboxNext"),
  contactForm: document.getElementById("contactForm"),
};

// State
let currentLightboxIndex = 0;
let galleryImages = [];

// Optimized furniture images list
const furnitureImages = [
  "WhatsApp Image 2025-09-22 at 21.07.37.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.39 (1).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.40.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.41 (1).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.41 (2).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.41.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.45 (1).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.46 (1).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.46.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.47 (1).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.47.jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.48 (1).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.48 (2).jpeg",
  "WhatsApp Image 2025-09-22 at 21.07.48 (3).jpeg",
];

/**
 * Initialize application
 */
function init() {
  setupNavigation();
  setupGallery();
  setupLightbox();
  setupContactForm();
  setupScrollEffects();
  setupSmoothScroll();
  setupPerformanceOptimizations();
  setupWhatsAppButton();
  setupGalleryButton();
}

/**
 * Navigation setup
 */
function setupNavigation() {
  DOM.navToggle?.addEventListener("click", toggleMobileMenu);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Optimized scroll handler with RAF
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    passiveSupported ? { passive: true } : false
  );
}

function toggleMobileMenu() {
  const isExpanded = DOM.navMenu.classList.toggle("active");
  DOM.navToggle.setAttribute("aria-expanded", isExpanded);
  animateMenuIcon(isExpanded);
}

function closeMobileMenu() {
  DOM.navMenu.classList.remove("active");
  DOM.navToggle.setAttribute("aria-expanded", "false");
  resetMenuIcon();
}

function animateMenuIcon(isOpen) {
  const spans = DOM.navToggle.querySelectorAll("span");
  if (isOpen) {
    spans[0].style.transform = "rotate(45deg) translateY(8px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
  } else {
    resetMenuIcon();
  }
}

function resetMenuIcon() {
  const spans = DOM.navToggle.querySelectorAll("span");
  spans.forEach((span) => {
    span.style.transform = "none";
    span.style.opacity = "1";
  });
}

function handleScroll() {
  if (window.scrollY > 100) {
    DOM.navbar.classList.add("scrolled");
  } else {
    DOM.navbar.classList.remove("scrolled");
  }
}

/**
 * localStorage helpers for uploaded images
 */
function getStoredUploadedImages() {
  try {
    const stored = localStorage.getItem("muebles_yeco_uploaded_images");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Could not retrieve stored images:", error);
    return [];
  }
}

/**
 * Gallery setup with lazy loading
 */
async function setupGallery() {
  try {
    // Try to load from admin API first
    const response = await fetch("/api/gallery-public");
    if (response.ok) {
      const data = await response.json();
      galleryImages = [...data.data.images, ...data.data.videos];

      // Add locally stored uploaded images (same approach as admin panel)
      const storedImages = getStoredUploadedImages();
      if (storedImages.length > 0) {
        const formattedStoredImages = storedImages.map((img) => ({
          src: img.dataUrl,
          alt: img.title,
          title: img.title,
          description: img.description,
          category: img.category,
        }));
        galleryImages = [...galleryImages, ...formattedStoredImages];
      }
    } else {
      // Fallback to static images only if API fails
      galleryImages = furnitureImages.map((img, index) => ({
        src: `images/${img}`,
        alt: `Mueble artesanal de melamina ${index + 1}`,
        title: `Colección de Muebles ${index + 1}`,
      }));

      // Only add localStorage images in fallback mode when API is not available
      const storedImages = getStoredUploadedImages();
      if (storedImages.length > 0) {
        const formattedStoredImages = storedImages.map((img) => ({
          src: img.dataUrl,
          alt: img.title,
          title: img.title,
          description: img.description,
          category: img.category,
        }));
        galleryImages = [...galleryImages, ...formattedStoredImages];
      }
    }
  } catch (error) {
    console.log("Using fallback gallery data");
    // Fallback to static images
    galleryImages = furnitureImages.map((img, index) => ({
      src: `images/${img}`,
      alt: `Mueble artesanal de melamina ${index + 1}`,
      title: `Colección de Muebles ${index + 1}`,
    }));

    // Add stored images only in error/fallback case
    const storedImages = getStoredUploadedImages();
    if (storedImages.length > 0) {
      const formattedStoredImages = storedImages.map((img) => ({
        src: img.dataUrl,
        alt: img.title,
        title: img.title,
        description: img.description,
        category: img.category,
      }));
      galleryImages = [...galleryImages, ...formattedStoredImages];
    }
  }

  // Create gallery items with fragment for better performance
  const fragment = document.createDocumentFragment();
  galleryImages.forEach((image, index) => {
    fragment.appendChild(createGalleryItem(image, index));
  });
  DOM.galleryGrid?.appendChild(fragment);

  // Setup intersection observer for lazy loading
  observeGalleryItems();
}

function createGalleryItem(image, index) {
  const item = document.createElement("div");
  item.className = "gallery-item";
  item.setAttribute("data-index", index);

  // Use data-src for lazy loading
  item.innerHTML = `
        <img data-src="${image.src}" alt="${image.alt}" loading="lazy" width="300" height="350">
        <div class="gallery-item-overlay">
            <span aria-hidden="true">🔍</span>
        </div>
    `;

  item.addEventListener("click", () => openLightbox(index));

  return item;
}

function observeGalleryItems() {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector("img");
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }

          // Animate entry
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(20px)";

          requestAnimationFrame(() => {
            entry.target.style.transition = "all 0.6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  document.querySelectorAll(".gallery-item").forEach((item) => {
    imageObserver.observe(item);
  });
}

/**
 * Lightbox functionality
 */
function setupLightbox() {
  DOM.lightboxClose?.addEventListener("click", closeLightbox);
  DOM.lightboxPrev?.addEventListener("click", showPreviousImage);
  DOM.lightboxNext?.addEventListener("click", showNextImage);

  document.addEventListener("keydown", handleLightboxKeyboard);
  DOM.lightbox?.addEventListener("click", handleLightboxBackgroundClick);
}

function handleLightboxKeyboard(e) {
  if (!DOM.lightbox.classList.contains("active")) return;

  switch (e.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      showPreviousImage();
      break;
    case "ArrowRight":
      showNextImage();
      break;
  }
}

function handleLightboxBackgroundClick(e) {
  if (e.target === DOM.lightbox) {
    closeLightbox();
  }
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxImage();
  DOM.lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  DOM.lightbox.focus();
}

function closeLightbox() {
  DOM.lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function showPreviousImage() {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

function showNextImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const image = galleryImages[currentLightboxIndex];
  DOM.lightboxImage.src = image.src;
  DOM.lightboxImage.alt = image.alt;
  DOM.lightboxCaption.textContent = image.title;
}

/**
 * Contact form with validation
 */
function setupContactForm() {
  DOM.contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(DOM.contactForm);
    const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    try {
      // Send to Vercel API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          interest: formData.get("interest"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showFormSuccess();
        DOM.contactForm.reset();
      } else {
        showFormError(data.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showFormError("Error de conexión. Por favor intente nuevamente.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Por favor completa todos los campos requeridos.");
    return false;
  }

  if (!isValidEmail(email)) {
    alert("Por favor ingresa un email válido.");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormSuccess() {
  const message = document.createElement("div");
  message.className = "form-success";
  message.textContent = "¡Gracias por tu mensaje! Te contactaremos pronto.";
  message.style.cssText =
    "background:#d4edda;color:#155724;padding:1rem;border-radius:8px;margin-top:1rem;text-align:center;animation:slideIn 0.3s ease";

  DOM.contactForm.appendChild(message);
  setTimeout(() => message.remove(), 5000);
}

function showFormError(errorMessage) {
  const message = document.createElement("div");
  message.className = "form-error";
  message.textContent = errorMessage;
  message.style.cssText =
    "background:#f8d7da;color:#721c24;padding:1rem;border-radius:8px;margin-top:1rem;text-align:center;animation:slideIn 0.3s ease";

  DOM.contactForm.appendChild(message);
  setTimeout(() => message.remove(), 5000);
}

/**
 * Scroll effects with Intersection Observer
 */
function setupScrollEffects() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(30px)";

          requestAnimationFrame(() => {
            entry.target.style.transition =
              "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  const elements = document.querySelectorAll(
    ".section-header, .about-content, .about-image, .collection-card, .testimonial-card, .contact-info, .contact-form-wrapper"
  );
  elements.forEach((el) => observer.observe(el));
}

/**
 * Smooth scrolling
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Performance optimizations
 */
function setupPerformanceOptimizations() {
  // Preload critical images
  const criticalImages = [
    "images/WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
    "images/WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });

  // Parallax effect with RAF
  setupParallax();

  // Prefetch next page
  const galleryLink = document.querySelector('a[href="visual-gallery.php"]');
  if (galleryLink) {
    const prefetch = document.createElement("link");
    prefetch.rel = "prefetch";
    prefetch.href = "visual-gallery.php";
    document.head.appendChild(prefetch);
  }
}

/**
 * Parallax effect
 */
function setupParallax() {
  const hero = document.querySelector(".hero-background");
  if (!hero) return;

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    passiveSupported ? { passive: true } : false
  );
}

/**
 * Utility: Debounce
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Performance monitoring (development only)
if (window.performance && window.performance.timing) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`🚀 Página cargada en ${pageLoadTime}ms`);
    }, 0);
  });
}

/**
 * WhatsApp floating button
 */
function setupWhatsAppButton() {
  const whatsappBtn = document.createElement("a");
  whatsappBtn.href =
    "https://wa.me/50237688618?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20muebles";
  whatsappBtn.target = "_blank";
  whatsappBtn.rel = "noopener noreferrer";
  whatsappBtn.className = "whatsapp-float";
  whatsappBtn.setAttribute("aria-label", "Chatear por WhatsApp");
  whatsappBtn.innerHTML = `
    <svg viewBox="0 0 32 32" width="32" height="32">
      <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.050-13.485 13.485-13.485s13.485 6.050 13.485 13.485c0 7.435-6.050 13.485-13.485 13.485zM21.305 18.405c-0.365-0.182-2.159-1.067-2.494-1.189s-0.578-0.182-0.822 0.182c-0.243 0.365-0.944 1.189-1.158 1.433s-0.426 0.274-0.791 0.091c-0.365-0.182-1.542-0.569-2.937-1.811-1.086-0.968-1.818-2.165-2.032-2.53s-0.022-0.562 0.16-0.744c0.164-0.164 0.365-0.426 0.548-0.639s0.243-0.365 0.365-0.609c0.122-0.243 0.061-0.456-0.030-0.639s-0.822-1.981-1.127-2.713c-0.296-0.713-0.598-0.617-0.822-0.628-0.213-0.011-0.456-0.013-0.7-0.013s-0.639 0.091-0.974 0.456c-0.335 0.365-1.279 1.250-1.279 3.048s1.310 3.535 1.492 3.778c0.182 0.243 2.550 3.897 6.182 5.467 0.863 0.373 1.537 0.596 2.062 0.762 0.869 0.277 1.66 0.238 2.286 0.145 0.698-0.104 2.159-0.883 2.463-1.735s0.304-1.583 0.213-1.735c-0.091-0.152-0.335-0.243-0.7-0.426z"/>
    </svg>
    <span class="whatsapp-tooltip">¿Necesitas ayuda?</span>
  `;

  document.body.appendChild(whatsappBtn);

  // Animate on scroll
  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 300) {
        whatsappBtn.classList.add("visible");
      } else {
        whatsappBtn.classList.remove("visible");
      }
      lastScroll = currentScroll;
    },
    passiveSupported ? { passive: true } : false
  );
}

/**
 * Setup Gallery Button functionality
 */
function setupGalleryButton() {
  const showAllBtn = document.getElementById("showAllGallery");
  if (!showAllBtn) return;

  showAllBtn.addEventListener("click", () => {
    showFullGallery();
  });
}

/**
 * Show full gallery functionality
 */
function showFullGallery() {
  // Create modal overlay
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
    <div class="gallery-modal-content">
      <div class="gallery-modal-header">
        <h2>Galería Completa - Muebles Yeco</h2>
        <button class="gallery-modal-close" aria-label="Cerrar galería">&times;</button>
      </div>
      <div class="gallery-modal-filters">
        <select id="modalCategoryFilter">
          <option value="">Todas las categorías</option>
          <option value="sala">Sala</option>
          <option value="dormitorio">Dormitorio</option>
          <option value="cocina">Cocina</option>
          <option value="oficina">Oficina</option>
          <option value="closet">Closet</option>
        </select>
      </div>
      <div class="gallery-modal-grid" id="modalGalleryGrid">
        <!-- Gallery items will be loaded here -->
      </div>
    </div>
  `;

  // Add modal styles
  const style = document.createElement("style");
  style.textContent = `
    .gallery-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }
    
    .gallery-modal-content {
      background: var(--bg-white);
      border-radius: 12px;
      width: 100%;
      max-width: 1200px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .gallery-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid var(--border-color);
      background: var(--bg-light);
    }
    
    .gallery-modal-header h2 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin: 0;
    }
    
    .gallery-modal-close {
      background: none;
      border: none;
      font-size: 2rem;
      color: var(--text-light);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: var(--transition);
    }
    
    .gallery-modal-close:hover {
      background: var(--error);
      color: white;
    }
    
    .gallery-modal-filters {
      padding: 1rem 2rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .gallery-modal-filters select {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 1rem;
    }
    
    .gallery-modal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }
    
    .modal-gallery-item {
      background: var(--bg-white);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      cursor: pointer;
    }
    
    .modal-gallery-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .modal-gallery-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      filter: contrast(115%) brightness(108%);
      transition: all 0.3s ease;
    }
    
    .modal-gallery-item:hover img {
      filter: contrast(120%) brightness(112%) saturate(105%);
    }
    
    .modal-gallery-info {
      padding: 1rem;
    }
    
    .modal-gallery-title {
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }
    
    .modal-gallery-description {
      font-size: 0.9rem;
      color: var(--text-light);
      margin-bottom: 0.5rem;
    }
    
    .modal-gallery-category {
      display: inline-block;
      background: var(--accent-color);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      text-transform: capitalize;
    }
    
    @media (max-width: 768px) {
      .gallery-modal {
        padding: 1rem;
      }
      
      .gallery-modal-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
      }
      
      .gallery-modal-header {
        padding: 1rem;
      }
      
      .gallery-modal-filters {
        padding: 1rem;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(modal);

  // Load gallery items
  loadModalGallery();

  // Setup event listeners
  const closeBtn = modal.querySelector(".gallery-modal-close");
  const categoryFilter = modal.querySelector("#modalCategoryFilter");

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal);
    document.head.removeChild(style);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    }
  });

  categoryFilter.addEventListener("change", () => {
    filterModalGallery(categoryFilter.value);
  });

  // Prevent body scroll
  document.body.style.overflow = "hidden";

  // Restore body scroll when modal closes
  const originalClose = closeBtn.onclick;
  closeBtn.onclick = () => {
    document.body.style.overflow = "";
    if (originalClose) originalClose();
  };
}

/**
 * Load gallery items into modal
 */
async function loadModalGallery() {
  const grid = document.getElementById("modalGalleryGrid");
  if (!grid) return;

  try {
    // Try to load from admin API
    const response = await fetch("/api/gallery-public");
    let items = [];

    if (response.ok) {
      const data = await response.json();
      items = [...data.data.images, ...data.data.videos];
    } else {
      // Fallback to static images
      items = furnitureImages.map((img, index) => ({
        src: `images/${img}`,
        title: `Mueble ${index + 1}`,
        description: "Mueble de melamina a medida",
        category: index % 2 === 0 ? "sala" : "dormitorio",
      }));
    }

    renderModalGallery(items);
  } catch (error) {
    console.log("Using fallback gallery data for modal");
    // Fallback to static images
    const items = furnitureImages.map((img, index) => ({
      src: `images/${img}`,
      title: `Mueble ${index + 1}`,
      description: "Mueble de melamina a medida",
      category: index % 2 === 0 ? "sala" : "dormitorio",
    }));
    renderModalGallery(items);
  }
}

/**
 * Render gallery items in modal
 */
function renderModalGallery(items) {
  const grid = document.getElementById("modalGalleryGrid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item, index) => `
    <div class="modal-gallery-item" onclick="openLightbox(${index})">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="modal-gallery-info">
        <div class="modal-gallery-title">${item.title}</div>
        <div class="modal-gallery-description">${
          item.description || "Mueble de melamina personalizado"
        }</div>
        <span class="modal-gallery-category">${item.category || "mueble"}</span>
      </div>
    </div>
  `
    )
    .join("");

  // Update global gallery images for lightbox
  galleryImages = items;
}

/**
 * Filter modal gallery by category
 */
function filterModalGallery(category) {
  const items = document.querySelectorAll(".modal-gallery-item");

  items.forEach((item) => {
    const itemCategory = item.querySelector(
      ".modal-gallery-category"
    ).textContent;

    if (!category || itemCategory === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

console.log("🪵 Muebles Yeco - Optimizado y listo");
