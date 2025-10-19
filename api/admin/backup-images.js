// Backup Images API - Simple backup functionality
import { verifyAdminToken } from "./auth.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Verify admin authentication
    verifyAdminToken(req);

    if (req.method === "POST") {
      // Store backup (for now, just acknowledge)
      const { images } = req.body;

      return res.status(200).json({
        success: true,
        message: `Backup acknowledged for ${images?.length || 0} images`,
        data: { backed_up: images?.length || 0 },
      });
    } else if (req.method === "GET") {
      // Return empty backup (images are now in Supabase)
      return res.status(200).json({
        success: true,
        data: { images: [] },
        message: "Images are now stored in Supabase database",
      });
    } else {
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

    return res.status(500).json({ error: "Internal server error" });
  }
}
