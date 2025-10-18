// Gallery Management API for Vercel
import { verifyAdminToken } from "./auth.js";

// In-memory storage for demo (in production, use a database like Vercel KV, PlanetScale, or Supabase)
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
    },
    {
      id: "2",
      filename: "WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
      title: "Mueble de Sala 2",
      description: "Estantería elegante",
      category: "sala",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
    },
    {
      id: "3",
      filename: "WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
      title: "Mueble de Dormitorio",
      description: "Cómoda con espejo",
      category: "dormitorio",
      uploadDate: "2025-10-18T00:00:00Z",
      isActive: true,
    },
  ],
  videos: [],
};

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
        };

        if (type === "video") {
          galleryData.videos.push(newItem);
        } else {
          galleryData.images.push(newItem);
        }

        return res.status(201).json({
          success: true,
          data: newItem,
          message: "Gallery item added successfully",
        });

      case "PUT":
        // Update gallery item
        const { id: updateId } = req.query;
        const updateData = req.body;

        if (!updateId) {
          return res.status(400).json({ error: "Item ID is required" });
        }

        let itemFound = false;

        // Update in images array
        galleryData.images = galleryData.images.map((item) => {
          if (item.id === updateId) {
            itemFound = true;
            return { ...item, ...updateData, id: updateId }; // Preserve ID
          }
          return item;
        });

        // Update in videos array if not found in images
        if (!itemFound) {
          galleryData.videos = galleryData.videos.map((item) => {
            if (item.id === updateId) {
              itemFound = true;
              return { ...item, ...updateData, id: updateId }; // Preserve ID
            }
            return item;
          });
        }

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

        const initialImageCount = galleryData.images.length;
        const initialVideoCount = galleryData.videos.length;

        galleryData.images = galleryData.images.filter(
          (item) => item.id !== deleteId
        );
        galleryData.videos = galleryData.videos.filter(
          (item) => item.id !== deleteId
        );

        const itemDeleted =
          galleryData.images.length < initialImageCount ||
          galleryData.videos.length < initialVideoCount;

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
