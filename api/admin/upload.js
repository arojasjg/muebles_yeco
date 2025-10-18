// File Upload API for Vercel with Cloudinary integration
import { verifyAdminToken } from "./auth.js";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary (you'll need to set these environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

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

    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        error: "Invalid file type. Allowed: JPEG, PNG, WebP, MP4, WebM",
      });
    }

    // Determine resource type
    const resourceType = file.mimetype.startsWith("video/") ? "video" : "image";

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.filepath, {
      folder: "muebles-yeco",
      resource_type: resourceType,
      public_id: `${Date.now()}_${file.originalFilename?.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      )}`,
      transformation:
        resourceType === "image"
          ? [
              {
                width: 1200,
                height: 1200,
                crop: "limit",
                quality: "auto:good",
              },
              { format: "auto" },
            ]
          : undefined,
    });

    // Generate thumbnail for videos
    let thumbnailUrl = null;
    if (resourceType === "video") {
      const thumbnailResult = await cloudinary.uploader.upload(
        uploadResult.public_id,
        {
          resource_type: "video",
          format: "jpg",
          transformation: [
            { width: 400, height: 300, crop: "fill" },
            { start_offset: "1" }, // Get frame at 1 second
          ],
        }
      );
      thumbnailUrl = thumbnailResult.secure_url;
    }

    return res.status(200).json({
      success: true,
      data: {
        filename: uploadResult.public_id,
        originalName: file.originalFilename,
        url: uploadResult.secure_url,
        thumbnailUrl,
        size: file.size,
        type: resourceType,
        mimetype: file.mimetype,
        width: uploadResult.width,
        height: uploadResult.height,
        cloudinaryId: uploadResult.public_id,
      },
      message: "File uploaded successfully",
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
