// Simple Upload API - Alias to Supabase Upload for compatibility
import uploadSupabase from "./upload-supabase.js";

export default async function handler(req, res) {
  // This is just an alias to the Supabase upload endpoint
  // for backward compatibility with existing frontend code
  return uploadSupabase(req, res);
}
