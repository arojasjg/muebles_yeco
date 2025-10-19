// Cleanup utility to remove localStorage remnants and force Cloudinary migration
import { verifyAdminToken } from "./auth.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Verify admin authentication
    verifyAdminToken(req);

    // This endpoint serves as a signal to the frontend to clear localStorage
    // The actual cleanup happens on the client side

    return res.status(200).json({
      success: true,
      message: "localStorage cleanup initiated",
      instructions: {
        action: "clear_localStorage",
        keys: ["muebles_yeco_uploaded_images"],
        reason:
          "Migration to Cloudinary complete - localStorage no longer needed",
      },
    });
  } catch (error) {
    console.error("Cleanup error:", error);

    if (
      error.message === "No token provided" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.status(500).json({
      error: "Cleanup failed",
      details: error.message,
    });
  }
}
