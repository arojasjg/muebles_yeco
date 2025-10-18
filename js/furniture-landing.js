/**
 * Artisan Wood Furniture Landing Page
 * Interactive JavaScript with Modern Best Practices
 */

// Strict mode for better error handling
"use strict";

// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const galleryGrid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const contactForm = document.getElementById("contactForm");

// State
let currentLightboxIndex = 0;
let galleryImages = [];

// Furniture images from the images directory
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
 * Initialize the application
 */
function init() {
  setupNavigation();
  setupGallery();
  setupLightbox();
  setupContactForm();
  setupScrollEffects();
  setupSmoothScroll();
}

/**
 * Navigation functionality
 */
function setupNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    animateMenuIcon();
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      resetMenuIcon();
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/**
 * Animate mobile menu icon
 */
function animateMenuIcon() {
  const spans = navToggle.querySelectorAll("span");
  spans[0].style.transform = "rotate(45deg) translateY(8px)";
  spans[1].style.opacity = "0";
  spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
}

/**
 * Reset mobile menu icon
 */
function resetMenuIcon() {
  const spans = navToggle.querySelectorAll("span");
  spans[0].style.transform = "none";
  spans[1].style.opacity = "1";
  spans[2].style.transform = "none";
}

/**
 * Setup gallery with dynamic image loading
 */
function setupGallery() {
  galleryImages = furnitureImages.map((img, index) => ({
    src: `images/${img}`,
    alt: `Handcrafted furniture piece ${index + 1}`,
    title: `Furniture Collection ${index + 1}`,
  }));

  // Render gallery items
  galleryImages.forEach((image, index) => {
    const galleryItem = createGalleryItem(image, index);
    galleryGrid.appendChild(galleryItem);
  });

  // Add intersection observer for lazy loading
  observeGalleryItems();
}

/**
 * Create a gallery item element
 */
function createGalleryItem(image, index) {
  const item = document.createElement("div");
  item.className = "gallery-item";
  item.setAttribute("data-index", index);

  item.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" loading="lazy">
        <div class="gallery-item-overlay">
            <span>🔍</span>
        </div>
    `;

  item.addEventListener("click", () => openLightbox(index));

  return item;
}

/**
 * Observe gallery items for animations
 */
function observeGalleryItems() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(20px)";

          setTimeout(() => {
            entry.target.style.transition = "all 0.6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".gallery-item").forEach((item) => {
    observer.observe(item);
  });
}

/**
 * Setup lightbox functionality
 */
function setupLightbox() {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPreviousImage);
  lightboxNext.addEventListener("click", showNextImage);

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
    if (e.key === "ArrowLeft" && lightbox.classList.contains("active")) {
      showPreviousImage();
    }
    if (e.key === "ArrowRight" && lightbox.classList.contains("active")) {
      showNextImage();
    }
  });

  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

/**
 * Open lightbox with specific image
 */
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxImage();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Close lightbox
 */
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Show previous image in lightbox
 */
function showPreviousImage() {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

/**
 * Show next image in lightbox
 */
function showNextImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

/**
 * Update lightbox image
 */
function updateLightboxImage() {
  const image = galleryImages[currentLightboxIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.title;
}

/**
 * Setup contact form
 */
function setupContactForm() {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

/**
 * Setup scroll effects and animations
 */
function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(30px)";

        setTimeout(() => {
          entry.target.style.transition =
            "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for fade-in animations
  document
    .querySelectorAll(
      ".section-header, .about-content, .about-image, .collection-card, .testimonial-card, .contact-info, .contact-form-wrapper"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add parallax effect to hero section
 */
function setupParallax() {
  const hero = document.querySelector(".hero-background");

  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrolled = window.pageYOffset;
      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    }, 10)
  );
}

// Initialize parallax
setupParallax();

// Initialize the application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Log initialization
console.log("🪵 Artisan Wood Furniture - Landing Page Initialized");
