// Gallery Management API with Supabase Backend
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
        // Get all gallery items from Supabase
        const { category, active } = req.query;

        const filters = {};
        if (category) filters.category = category;
        if (active !== undefined) filters.isActive = active === "true";

        const items = await SupabaseService.getGalleryItems(filters);

        // Format for compatibility with existing frontend
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
            videos: [], // Videos will be handled separately if needed
            total: formattedItems.length,
          },
        });

      case "POST":
        // Add new gallery item to Supabase
        const {
          filename,
          title,
          description,
          category: itemCategory,
          publicUrl,
          filePath,
          fileSize,
          mimeType,
          tags,
        } = req.body;

        if (!filename || !title || !itemCategory || !publicUrl) {
          return res.status(400).json({
            error: "Filename, title, category, and publicUrl are required",
          });
        }

        const newItem = {
          title,
          description: description || "",
          category: itemCategory,
          filename,
          file_path: filePath || `images/${itemCategory}/${filename}`,
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

      case "PUT":
        // Update gallery item in Supabase
        const { id: updateId } = req.query;
        const { title, description, category, isActive, tags } = req.body;

        if (!updateId) {
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

        const updatedItem = await SupabaseService.updateGalleryItem(
          updateId,
          updateData
        );

        return res.status(200).json({
          success: true,
          data: updatedItem,
          message: "Gallery item updated successfully",
        });

      case "DELETE":
        // Delete gallery item from Supabase
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({ error: "Item ID is required" });
        }

        // First get the item to get the file path for storage deletion
        const items = await SupabaseService.getGalleryItems();
        const itemToDelete = items.find((item) => item.id === deleteId);

        if (!itemToDelete) {
          return res.status(404).json({ error: "Gallery item not found" });
        }

        // Delete from database
        await SupabaseService.deleteGalleryItem(deleteId);

        // Delete file from storage
        try {
          await SupabaseService.deleteFile(itemToDelete.file_path);
        } catch (error) {
          console.warn("Could not delete file from storage:", error);
          // Continue even if file deletion fails
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
