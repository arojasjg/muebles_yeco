// Persistent Gallery Storage for Vercel
// Uses environment variables and JSON encoding for persistence across serverless functions

// Base64 encode/decode for storing in environment variables
function encodeGalleryData(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

function decodeGalleryData(encoded) {
  try {
    return JSON.parse(Buffer.from(encoded, "base64").toString());
  } catch (error) {
    return null;
  }
}

// Default gallery data
const defaultGalleryData = {
  images: [
    {
      id: "1",
      filename: "WhatsApp Image 2025-09-22 at 21.07.37.jpeg",
      title: "Mueble de Sala 1",
      description: "Centro de entretenimiento moderno",
      category: "sala",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
      type: "image",
      imageUrl: "/images/WhatsApp Image 2025-09-22 at 21.07.37.jpeg",
    },
    {
      id: "2",
      filename: "WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
      title: "Mueble de Sala 2",
      description: "Estantería elegante",
      category: "sala",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
      type: "image",
      imageUrl: "/images/WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
    },
    {
      id: "3",
      filename: "WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
      title: "Mueble de Dormitorio",
      description: "Cómoda con espejo",
      category: "dormitorio",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
      type: "image",
      imageUrl: "/images/WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
    },
    {
      id: "4",
      filename: "WhatsApp Image 2025-09-22 at 21.07.46.jpeg",
      title: "Closet Moderno",
      description: "Closet con puertas corredizas",
      category: "closet",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
      type: "image",
      imageUrl: "/images/WhatsApp Image 2025-09-22 at 21.07.46.jpeg",
    },
    {
      id: "5",
      filename: "WhatsApp Image 2025-09-22 at 21.07.48.jpeg",
      title: "Mueble de Cocina",
      description: "Gabinetes de cocina integral",
      category: "cocina",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
      type: "image",
      imageUrl: "/images/WhatsApp Image 2025-09-22 at 21.07.48.jpeg",
    },
  ],
  videos: [],
  uploadedImages: [],
};

// In-memory cache
let cachedGalleryData = null;

// Get gallery data with persistence
export function getGalleryData() {
  // Return cached data if available
  if (cachedGalleryData) {
    return cachedGalleryData;
  }

  // Try to load from environment variable (for persistence)
  const storedData = process.env.GALLERY_DATA_STORAGE;
  if (storedData) {
    const decoded = decodeGalleryData(storedData);
    if (decoded) {
      cachedGalleryData = decoded;
      return cachedGalleryData;
    }
  }

  // Fallback to default data
  cachedGalleryData = { ...defaultGalleryData };
  return cachedGalleryData;
}

// Save gallery data (in production, this would need a database)
export function saveGalleryData(data) {
  cachedGalleryData = data;

  // In a real implementation, this would save to a database
  // For now, we'll just update the cache
  // Note: Environment variables can't be updated at runtime in Vercel

  return true;
}

// Add item to gallery
export function addGalleryItem(item) {
  const data = getGalleryData();

  if (item.type === "video") {
    data.videos.push(item);
  } else {
    // Check if it's an uploaded image with Base64 data
    if (item.dataUrl && item.dataUrl.startsWith("data:")) {
      // Store uploaded images separately with Base64 data
      data.uploadedImages.push(item);
      // Also add to main images array for display
      const imageItem = {
        ...item,
        imageUrl: item.dataUrl, // Use Base64 data URL directly
      };
      data.images.push(imageItem);
    } else {
      // Regular image with file path
      data.images.push(item);
    }
  }

  saveGalleryData(data);
  return item;
}

// Update gallery item
export function updateGalleryItem(id, updateData) {
  const data = getGalleryData();
  let itemFound = false;

  // Update in images array
  data.images = data.images.map((item) => {
    if (item.id === id) {
      itemFound = true;
      return { ...item, ...updateData, id };
    }
    return item;
  });

  // Update in videos array if not found in images
  if (!itemFound) {
    data.videos = data.videos.map((item) => {
      if (item.id === id) {
        itemFound = true;
        return { ...item, ...updateData, id };
      }
      return item;
    });
  }

  // Update in uploadedImages array
  if (!itemFound) {
    data.uploadedImages = data.uploadedImages.map((item) => {
      if (item.id === id) {
        itemFound = true;
        return { ...item, ...updateData, id };
      }
      return item;
    });
  }

  if (itemFound) {
    saveGalleryData(data);
  }

  return itemFound;
}

// Delete gallery item
export function deleteGalleryItem(id) {
  const data = getGalleryData();
  const initialImageCount = data.images.length;
  const initialVideoCount = data.videos.length;
  const initialUploadedCount = data.uploadedImages.length;

  data.images = data.images.filter((item) => item.id !== id);
  data.videos = data.videos.filter((item) => item.id !== id);
  data.uploadedImages = data.uploadedImages.filter((item) => item.id !== id);

  const itemDeleted =
    data.images.length < initialImageCount ||
    data.videos.length < initialVideoCount ||
    data.uploadedImages.length < initialUploadedCount;

  if (itemDeleted) {
    saveGalleryData(data);
  }

  return itemDeleted;
}

// Get active items
export function getActiveItems(category = null) {
  const data = getGalleryData();
  let activeImages = data.images.filter((item) => item.isActive);
  let activeVideos = data.videos.filter((item) => item.isActive);

  if (category) {
    activeImages = activeImages.filter((item) => item.category === category);
    activeVideos = activeVideos.filter((item) => item.category === category);
  }

  return {
    images: activeImages,
    videos: activeVideos,
    total: activeImages.length + activeVideos.length,
  };
}

// Find uploaded image by filename
export function findUploadedImage(filename) {
  const data = getGalleryData();

  // Look in uploadedImages first
  let found = data.uploadedImages.find((img) => img.filename === filename);
  if (found) return found;

  // Look in main images array for uploaded images
  found = data.images.find(
    (img) =>
      img.filename === filename &&
      img.dataUrl &&
      img.dataUrl.startsWith("data:")
  );

  return found;
}
