// Gallery Management API - Dedicated Endpoint (Vercel Pro)
import { verifyAdminToken } from "./auth.js";
import { SupabaseService } from "../../lib/supabase.js";

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
        return handleGet(req, res);
      case "POST":
        return handlePost(req, res);
      case "PUT":
        return handlePut(req, res);
      case "DELETE":
        return handleDelete(req, res);
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

    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

// GET - List gallery items
async function handleGet(req, res) {
  const { category, active } = req.query;

  const filters = {};
  if (category) filters.category = category;
  if (active !== undefined) filters.isActive = active === "true";

  const items = await SupabaseService.getGalleryItems(filters);

  const formattedItems = items.map((item) => ({
    id: item.id,
    filename: item.filename,
    title: item.title,
    description: item.description,
    category: item.category,
    imageUrl: item.public_url,
    publicUrl: item.public_url,
    isActive: item.is_active,
    uploadDate: item.created_at,
    type: "image",
    tags: item.tags || [],
    supabaseData: {
      path: item.file_path,
      size: item.file_size,
      mimeType: item.mime_type,
    },
  }));

  return res.status(200).json({
    success: true,
    data: {
      images: formattedItems,
      videos: [],
      total: formattedItems.length,
    },
  });
}

// POST - Add new gallery item
async function handlePost(req, res) {
  const {
    filename,
    title,
    description,
    category,
    publicUrl,
    filePath,
    fileSize,
    mimeType,
    tags,
  } = req.body;

  if (!filename || !title || !category || !publicUrl) {
    return res.status(400).json({
      error: "Filename, title, category, and publicUrl are required",
    });
  }

  const newItem = {
    title,
    description: description || "",
    category,
    filename,
    file_path: filePath || `images/${category}/${filename}`,
    file_size: fileSize || 0,
    mime_type: mimeType || "image/jpeg",
    public_url: publicUrl,
    alt_text: title,
    tags: tags || [],
    seo_title: title,
    seo_description: description || title,
    is_active: true,
    sort_order: 0,
  };

  const addedItem = await SupabaseService.insertGalleryItem(newItem);

  return res.status(201).json({
    success: true,
    data: addedItem,
    message: "Gallery item added successfully",
  });
}

// PUT - Update gallery item
async function handlePut(req, res) {
  const { id } = req.query;
  const { title, description, category, isActive, tags } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  const updateData = {};
  if (title !== undefined) {
    updateData.title = title;
    updateData.alt_text = title;
    updateData.seo_title = title;
  }
  if (description !== undefined) {
    updateData.description = description;
    updateData.seo_description = description;
  }
  if (category !== undefined) updateData.category = category;
  if (isActive !== undefined) updateData.is_active = isActive;
  if (tags !== undefined) updateData.tags = tags;

  const updatedItem = await SupabaseService.updateGalleryItem(id, updateData);

  return res.status(200).json({
    success: true,
    data: updatedItem,
    message: "Gallery item updated successfully",
  });
}

// DELETE - Remove gallery item
async function handleDelete(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  // Get item details for storage cleanup
  const items = await SupabaseService.getGalleryItems();
  const itemToDelete = items.find((item) => item.id == id);

  if (!itemToDelete) {
    return res.status(404).json({ error: "Gallery item not found" });
  }

  // Delete from database
  await SupabaseService.deleteGalleryItem(id);

  // Delete file from storage
  try {
    await SupabaseService.deleteFile(itemToDelete.file_path);
  } catch (error) {
    console.warn("Could not delete file from storage:", error);
    // Continue even if storage deletion fails
  }

  return res.status(200).json({
    success: true,
    message: "Gallery item deleted successfully",
  });
}
