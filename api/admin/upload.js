// Image Upload API - Dedicated Endpoint (Vercel Pro)
import { verifyAdminToken } from "./auth.js";
import { SupabaseAdminService } from "../../lib/supabase-admin.js";

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

    const { fileData, fileName, fileType, title, description, category, tags } =
      req.body;

    if (!fileData || !fileName || !fileType || !title || !category) {
      return res.status(400).json({
        error:
          "Missing required fields: fileData, fileName, fileType, title, category",
      });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({
        error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF",
      });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    if (buffer.length > maxSize) {
      return res.status(400).json({
        error: "File too large. Maximum 10MB allowed.",
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const extension = fileName.split(".").pop();
    const uniqueFileName = `${sanitizedTitle}-${timestamp}.${extension}`;

    // Upload to Supabase Storage using ADMIN client (bypasses RLS)
    const uploadResult = await SupabaseAdminService.uploadImage(
      buffer,
      uniqueFileName,
      category
    );

    // Prepare gallery item data
    const galleryItemData = {
      title,
      description: description || "",
      category,
      filename: uniqueFileName,
      file_path: uploadResult.path,
      file_size: buffer.length,
      mime_type: fileType,
      public_url: uploadResult.publicUrl,
      alt_text: title,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
      seo_title: title,
      seo_description: description || title,
      is_active: true,
      sort_order: 0,
    };

    // Save to database using ADMIN client (bypasses RLS)
    const galleryItem = await SupabaseAdminService.insertGalleryItem(
      galleryItemData
    );

    // Return comprehensive response
    return res.status(200).json({
      success: true,
      data: {
        id: galleryItem.id,
        title: galleryItem.title,
        description: galleryItem.description,
        category: galleryItem.category,
        filename: galleryItem.filename,
        originalName: fileName,
        type: "image",
        mimetype: fileType,
        size: galleryItem.file_size,
        publicUrl: galleryItem.public_url,
        url: galleryItem.public_url,
        tags: galleryItem.tags,
        isActive: galleryItem.is_active,
        createdAt: galleryItem.created_at,
        supabaseData: {
          path: galleryItem.file_path,
          bucket: process.env.SUPABASE_STORAGE_NAME,
          id: galleryItem.id,
        },
      },
      message: "Image uploaded successfully to Supabase",
    });
  } catch (error) {
    console.error("Upload error:", error);

    if (
      error.message === "No token provided" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (error.code) {
      return res.status(400).json({
        error: "Supabase operation failed",
        details: error.message,
        code: error.code,
      });
    }

    return res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
}
