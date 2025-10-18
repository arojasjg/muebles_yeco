// Gallery Management API for Vercel
import { verifyAdminToken } from "./auth.js";
import {
  getGalleryData,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../shared/gallery-data.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Verify admin authentication for all methods except GET
    if (req.method !== "GET") {
      verifyAdminToken(req);
    }

    switch (req.method) {
      case "GET":
        // Get all gallery items
        const { category, active } = req.query;
        const galleryData = getGalleryData();
        let items = [...galleryData.images, ...galleryData.videos];

        if (category) {
          items = items.filter((item) => item.category === category);
        }

        if (active !== undefined) {
          items = items.filter((item) => item.isActive === (active === "true"));
        }

        return res.status(200).json({
          success: true,
          data: {
            images: galleryData.images,
            videos: galleryData.videos,
            filtered: items,
            total: items.length,
          },
        });

      case "POST":
        // Add new gallery item
        const {
          filename,
          title,
          description,
          category: itemCategory,
          type = "image",
        } = req.body;

        if (!filename || !title || !itemCategory) {
          return res
            .status(400)
            .json({ error: "Filename, title, and category are required" });
        }

        const newItem = {
          id: Date.now().toString(),
          filename,
          title,
          description: description || "",
          category: itemCategory,
          uploadDate: new Date().toISOString(),
          isActive: true,
          type,
          // Support both Cloudinary URLs and base64 data
          imageUrl: req.body.imageUrl || null, // Cloudinary URL
          dataUrl: req.body.dataUrl || null, // Base64 fallback
          cloudinaryData: req.body.cloudinaryData || null, // Full Cloudinary metadata
        };

        const addedItem = addGalleryItem(newItem);

        return res.status(201).json({
          success: true,
          data: addedItem,
          message: "Gallery item added successfully",
        });

      case "PUT":
        // Update gallery item
        const { id: updateId } = req.query;
        const updateData = req.body;

        if (!updateId) {
          return res.status(400).json({ error: "Item ID is required" });
        }

        const itemFound = updateGalleryItem(updateId, updateData);

        if (!itemFound) {
          return res.status(404).json({ error: "Gallery item not found" });
        }

        return res.status(200).json({
          success: true,
          message: "Gallery item updated successfully",
        });

      case "DELETE":
        // Delete gallery item
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({ error: "Item ID is required" });
        }

        const itemDeleted = deleteGalleryItem(deleteId);

        if (!itemDeleted) {
          return res.status(404).json({ error: "Gallery item not found" });
        }

        return res.status(200).json({
          success: true,
          message: "Gallery item deleted successfully",
        });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Gallery API error:", error);

    if (
      error.message === "No token provided" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
