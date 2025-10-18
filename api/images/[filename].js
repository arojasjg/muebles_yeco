// Dynamic image serving API for uploaded files
// This handles serving images that were uploaded through the admin panel
import { getGalleryData } from "../shared/gallery-data.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename } = req.query;

    if (!filename) {
      return res.status(400).json({ error: "Filename required" });
    }

    // Get gallery data
    const galleryData = getGalleryData();

    // Look for the image in uploaded images
    const uploadedImage = galleryData.uploadedImages?.find(
      (img) => img.filename === filename
    );

    if (uploadedImage && uploadedImage.dataUrl) {
      // Extract base64 data and mime type
      const matches = uploadedImage.dataUrl.match(/^data:([^;]+);base64,(.+)$/);

      if (matches) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");

        // Set appropriate headers
        res.setHeader("Content-Type", mimeType);
        res.setHeader("Content-Length", buffer.length);
        res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

        return res.status(200).send(buffer);
      }
    }

    // Also check in main images array
    const mainImage = galleryData.images?.find(
      (img) => img.filename === filename
    );

    if (
      mainImage &&
      mainImage.dataUrl &&
      mainImage.dataUrl.startsWith("data:")
    ) {
      // Extract base64 data and mime type
      const matches = mainImage.dataUrl.match(/^data:([^;]+);base64,(.+)$/);

      if (matches) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");

        // Set appropriate headers
        res.setHeader("Content-Type", mimeType);
        res.setHeader("Content-Length", buffer.length);
        res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

        return res.status(200).send(buffer);
      }
    }

    // If not found in uploaded images, return 404
    return res.status(404).json({
      error: "Image not found",
      message: `Image ${filename} not found in uploaded gallery data`,
    });
  } catch (error) {
    console.error("Image serving error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
