// Public Gallery API - serves gallery data to the main website
import { getActiveItems } from "./shared/gallery-data.js";

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
    const { category, limit } = req.query;

    // Get active items from shared data store
    const activeData = getActiveItems(category);
    let { images: activeImages, videos: activeVideos } = activeData;

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit);
      activeImages = activeImages.slice(0, limitNum);
      activeVideos = activeVideos.slice(0, limitNum);
    }

    // Format for frontend consumption
    const formattedImages = activeImages.map((item) => ({
      src: item.imageUrl || item.dataUrl || `images/${item.filename}`, // Use imageUrl, base64 data URL, or file path
      alt: item.title,
      title: item.title,
      description: item.description,
      category: item.category,
    }));

    const formattedVideos = activeVideos.map((item) => ({
      src: item.imageUrl || item.dataUrl || `images/${item.filename}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "video",
    }));

    return res.status(200).json({
      success: true,
      data: {
        images: formattedImages,
        videos: formattedVideos,
        total: formattedImages.length + formattedVideos.length,
      },
    });
  } catch (error) {
    console.error("Public gallery error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
