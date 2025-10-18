// Cloudinary Upload API - Permanent image storage with optimization
import { v2 as cloudinary } from "cloudinary";
import { verifyAdminToken } from "./auth.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const { fileData, fileName, fileType, title, category } = req.body;

    if (!fileData || !fileName || !fileType) {
      return res.status(400).json({
        error: "Missing required fields: fileData, fileName, fileType",
      });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({
        error: "Invalid file type. Allowed: JPEG, PNG, WebP",
      });
    }

    // Generate unique public_id for Cloudinary
    const timestamp = Date.now();
    const sanitizedTitle = (title || fileName)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const publicId = `muebles-yeco/${
      category || "general"
    }/${sanitizedTitle}-${timestamp}`;

    // Upload to Cloudinary with optimizations
    const uploadResult = await cloudinary.uploader.upload(fileData, {
      public_id: publicId,
      folder: "muebles-yeco",
      resource_type: "image",

      // Automatic optimizations
      quality: "auto:good",
      fetch_format: "auto",

      // Generate multiple sizes
      eager: [
        { width: 800, height: 600, crop: "limit", quality: "auto:good" },
        { width: 400, height: 300, crop: "limit", quality: "auto:good" },
        { width: 200, height: 150, crop: "limit", quality: "auto:good" },
      ],

      // Tags for organization
      tags: ["muebles-yeco", category || "general"],

      // Context for metadata
      context: {
        title: title || fileName,
        category: category || "general",
        uploaded_by: "admin",
        upload_date: new Date().toISOString(),
      },
    });

    // Return comprehensive response
    return res.status(200).json({
      success: true,
      data: {
        // Original file info
        filename: fileName,
        originalName: fileName,
        type: "image",
        mimetype: fileType,

        // Cloudinary URLs
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,

        // Optimized versions
        urls: {
          original: uploadResult.secure_url,
          large: uploadResult.eager?.[0]?.secure_url || uploadResult.secure_url,
          medium:
            uploadResult.eager?.[1]?.secure_url || uploadResult.secure_url,
          thumbnail:
            uploadResult.eager?.[2]?.secure_url || uploadResult.secure_url,
        },

        // Metadata
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        bytes: uploadResult.bytes,

        // Cloudinary info
        cloudinary: {
          public_id: uploadResult.public_id,
          version: uploadResult.version,
          signature: uploadResult.signature,
          resource_type: uploadResult.resource_type,
          created_at: uploadResult.created_at,
        },
      },
      message: "Image uploaded successfully to Cloudinary",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Handle authentication errors
    if (
      error.message === "No token provided" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Handle Cloudinary specific errors
    if (error.http_code) {
      return res.status(error.http_code).json({
        error: "Cloudinary upload failed",
        details: error.message,
        cloudinary_error: true,
      });
    }

    return res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
}
