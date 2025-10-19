// Supabase Admin Client - Server-side only with Service Role
import { createClient } from "@supabase/supabase-js";

// Supabase configuration with SERVICE ROLE (admin access)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase service role environment variables");
}

// Create Supabase ADMIN client with service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  db: {
    schema: "public",
  },
});

// Storage bucket configuration
export const STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_NAME || "muebles_yeco";

// Storage paths
export const STORAGE_PATHS = {
  IMAGES: "images",
  THUMBNAILS: "thumbnails",
  TEMP: "temp",
};

// Admin Service for upload operations (bypasses RLS)
export class SupabaseAdminService {
  // File Upload with admin privileges
  static async uploadImage(file, filename, category = "general") {
    try {
      const filePath = `${STORAGE_PATHS.IMAGES}/${category}/${filename}`;

      const { data, error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      return {
        path: data.path,
        fullPath: data.fullPath,
        publicUrl: urlData.publicUrl,
        id: data.id,
      };
    } catch (error) {
      console.error("Supabase admin upload error:", error);
      throw error;
    }
  }

  // Delete file from storage with admin privileges
  static async deleteFile(path) {
    try {
      const { error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Supabase admin delete error:", error);
      throw error;
    }
  }

  // Database operations with admin privileges (bypasses RLS)
  static async insertGalleryItem(item) {
    try {
      const { data, error } = await supabaseAdmin
        .from("gallery")
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Supabase admin insert error:", error);
      throw error;
    }
  }

  static async updateGalleryItem(id, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from("gallery")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Supabase admin update error:", error);
      throw error;
    }
  }

  static async deleteGalleryItem(id) {
    try {
      const { error } = await supabaseAdmin
        .from("gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Supabase admin delete error:", error);
      throw error;
    }
  }

  static async getGalleryItems(filters = {}) {
    try {
      let query = supabaseAdmin
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.category) {
        query = query.eq("category", filters.category);
      }

      if (filters.isActive !== undefined) {
        query = query.eq("is_active", filters.isActive);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Supabase admin select error:", error);
      throw error;
    }
  }
}

export default supabaseAdmin;
