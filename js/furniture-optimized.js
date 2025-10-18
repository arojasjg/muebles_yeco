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
 * Gallery setup with lazy loading
 */
function setupGallery() {
  galleryImages = furnitureImages.map((img, index) => ({
    src: `images/${img}`,
    alt: `Mueble artesanal de madera ${index + 1}`,
    title: `Colección de Muebles ${index + 1}`,
  }));

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

    // Simulate submission (replace with actual API)
    setTimeout(() => {
      showFormSuccess();
      DOM.contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
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
    "background:#d4edda;color:#155724;padding:1rem;border-radius:8px;margin-top:1rem;text-align:center";

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

console.log("🪵 Muebles Yeco - Optimizado y listo");
