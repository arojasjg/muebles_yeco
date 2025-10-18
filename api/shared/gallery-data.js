// Shared Gallery Data Store for Vercel
// This provides a centralized data source for both admin and public APIs

// In-memory storage that persists during the serverless function lifecycle
let galleryData = {
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
    },
  ],
  videos: [],
};

// Export functions to manage gallery data
export function getGalleryData() {
  return galleryData;
}

export function addGalleryItem(item) {
  if (item.type === "video") {
    galleryData.videos.push(item);
  } else {
    galleryData.images.push(item);
  }
  return item;
}

export function updateGalleryItem(id, updateData) {
  let itemFound = false;

  // Update in images array
  galleryData.images = galleryData.images.map((item) => {
    if (item.id === id) {
      itemFound = true;
      return { ...item, ...updateData, id };
    }
    return item;
  });

  // Update in videos array if not found in images
  if (!itemFound) {
    galleryData.videos = galleryData.videos.map((item) => {
      if (item.id === id) {
        itemFound = true;
        return { ...item, ...updateData, id };
      }
      return item;
    });
  }

  return itemFound;
}

export function deleteGalleryItem(id) {
  const initialImageCount = galleryData.images.length;
  const initialVideoCount = galleryData.videos.length;

  galleryData.images = galleryData.images.filter((item) => item.id !== id);
  galleryData.videos = galleryData.videos.filter((item) => item.id !== id);

  return (
    galleryData.images.length < initialImageCount ||
    galleryData.videos.length < initialVideoCount
  );
}

export function getActiveItems(category = null) {
  let activeImages = galleryData.images.filter((item) => item.isActive);
  let activeVideos = galleryData.videos.filter((item) => item.isActive);

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
