// Backup API for localStorage images - provides server-side persistence
import { verifyAdminToken } from "./auth.js";

// Simple server-side storage using environment variables (temporary solution)
let imageBackups = {};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case "POST":
        // Backup images from localStorage
        verifyAdminToken(req);

        const { images } = req.body;
        if (!images || !Array.isArray(images)) {
          return res.status(400).json({ error: "Images array required" });
        }

        // Store in memory (in production, this would go to a database)
        imageBackups.uploadedImages = images;
        imageBackups.lastBackup = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: `Backed up ${images.length} images`,
          timestamp: imageBackups.lastBackup,
        });

      case "GET":
        // Restore images to localStorage
        const backupData = {
          images: imageBackups.uploadedImages || [],
          lastBackup: imageBackups.lastBackup || null,
          count: (imageBackups.uploadedImages || []).length,
        };

        return res.status(200).json({
          success: true,
          data: backupData,
        });

      case "DELETE":
        // Clear backup
        verifyAdminToken(req);

        imageBackups = {};

        return res.status(200).json({
          success: true,
          message: "Backup cleared",
        });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Backup API error:", error);

    if (
      error.message === "No token provided" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
