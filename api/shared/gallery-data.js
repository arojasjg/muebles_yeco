// Shared Gallery Data Store for Vercel
// This provides a centralized data source for both admin and public APIs
// Now uses persistent storage to handle serverless function limitations

import {
  getGalleryData as getStoredGalleryData,
  addGalleryItem as addStoredGalleryItem,
  updateGalleryItem as updateStoredGalleryItem,
  deleteGalleryItem as deleteStoredGalleryItem,
  getActiveItems as getStoredActiveItems,
  findUploadedImage,
} from "../storage/gallery-storage.js";

// Re-export storage functions for backward compatibility
export function getGalleryData() {
  return getStoredGalleryData();
}

export function addGalleryItem(item) {
  return addStoredGalleryItem(item);
}

export function updateGalleryItem(id, updateData) {
  return updateStoredGalleryItem(id, updateData);
}

export function deleteGalleryItem(id) {
  return deleteStoredGalleryItem(id);
}

export function getActiveItems(category = null) {
  return getStoredActiveItems(category);
}

// Export additional function for image serving
export { findUploadedImage };
