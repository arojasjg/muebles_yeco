// Supabase Client Configuration - Enterprise Grade Setup
import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create Supabase client with optimized configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We handle auth with JWT
    autoRefreshToken: false,
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "X-Client-Info": "muebles-yeco@1.0.0",
    },
  },
});

// Storage bucket configuration
export const STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_NAME || "muebles_yeco";

// Database table names
export const TABLES = {
  GALLERY_ITEMS: "gallery",
  CATEGORIES: "categories",
};

// Storage paths
export const STORAGE_PATHS = {
  IMAGES: "images",
  THUMBNAILS: "thumbnails",
  TEMP: "temp",
};

// Helper functions for common operations
export class SupabaseService {
  // File Upload with automatic optimization
  static async uploadImage(file, filename, category = "general") {
    try {
      const filePath = `${STORAGE_PATHS.IMAGES}/${category}/${filename}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

      return {
        path: data.path,
        fullPath: data.fullPath,
        publicUrl,
        id: data.id,
      };
    } catch (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }
  }

  // Get public URL for a file
  static getPublicUrl(path) {
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

    return data.publicUrl;
  }

  // Delete file from storage
  static async deleteFile(path) {
    try {
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }
  }

  // Database operations
  static async insertGalleryItem(item) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }
  }

  static async getGalleryItems(filters = {}) {
    try {
      let query = supabase
        .from(TABLES.GALLERY_ITEMS)
        .select("*")
        .order("created_at", { ascending: false });

      // Apply filters
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
      console.error("Supabase select error:", error);
      throw error;
    }
  }

  static async updateGalleryItem(id, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
  }

  static async deleteGalleryItem(id) {
    try {
      const { error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .select("count", { count: "exact", head: true });

      if (error) throw error;

      return {
        database: true,
        storage: true,
        count: data?.length || 0,
      };
    } catch (error) {
      console.error("Supabase health check error:", error);
      return {
        database: false,
        storage: false,
        error: error.message,
      };
    }
  }
}

export default supabase;
