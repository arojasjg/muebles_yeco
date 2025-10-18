// Simple File Upload API for Vercel - No External Dependencies
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

    const { fileData, fileName, fileType, fileSize } = req.body;

    if (!fileData || !fileName || !fileType) {
      return res
        .status(400)
        .json({ error: "Missing file data, name, or type" });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({
        error: "Invalid file type. Allowed: JPEG, PNG, WebP",
      });
    }

    // Validate file size (5MB limit for base64)
    if (fileSize > 5 * 1024 * 1024) {
      return res.status(400).json({
        error: "File too large. Maximum 5MB allowed.",
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = fileName.split(".").pop();
    const uniqueFileName = `upload_${timestamp}.${extension}`;

    // For Vercel, we'll return the base64 data to be stored in the gallery
    // The frontend will handle displaying it as data URLs
    return res.status(200).json({
      success: true,
      data: {
        filename: uniqueFileName,
        originalName: fileName,
        dataUrl: fileData, // Base64 data URL
        size: fileSize,
        type: "image",
        mimetype: fileType,
        timestamp: timestamp,
      },
      message: "File processed successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);

    if (
      error.message === "No token provided" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
}
