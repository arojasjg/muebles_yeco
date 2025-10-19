#!/usr/bin/env node

/**
 * Upload all images from images/ folder to Supabase
 * This script uploads images to Supabase storage and creates database entries
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  console.error(
    "Required: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY"
  );
  console.error(`Found URL: ${supabaseUrl ? "✓" : "✗"}`);
  console.error(`Found Service Key: ${supabaseServiceKey ? "✓" : "✗"}`);
  process.exit(1);
}

// Create Supabase admin client (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Image categories based on filename patterns
const categorizeImage = (filename) => {
  const lower = filename.toLowerCase();

  // You can customize these rules based on your images
  if (lower.includes("sala") || lower.includes("living")) return "sala";
  if (lower.includes("cocina") || lower.includes("kitchen")) return "cocina";
  if (lower.includes("dormitorio") || lower.includes("bedroom"))
    return "dormitorio";
  if (lower.includes("oficina") || lower.includes("office")) return "oficina";
  if (lower.includes("closet") || lower.includes("armario")) return "closet";

  // Default category
  return "sala";
};

// Generate title from filename
const generateTitle = (filename) => {
  // Remove extension and clean up
  let title = filename.replace(/\.(jpeg|jpg|png|gif)$/i, "");

  // Remove "WhatsApp Image" prefix
  title = title.replace(/^WhatsApp Image /i, "");

  // Remove date pattern
  title = title.replace(/\d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2}/g, "");

  // Clean up extra spaces and parentheses
  title = title.replace(/\s*\(\d+\)\s*/g, " ");
  title = title.trim();

  // If title is empty, use a generic name
  if (!title) {
    title = "Mueble de Melamina";
  }

  return title;
};

// Upload single image
async function uploadImage(imagePath, filename) {
  try {
    console.log(`\n📤 Uploading: ${filename}`);

    // Read file
    const fileBuffer = fs.readFileSync(imagePath);
    const fileStats = fs.statSync(imagePath);

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const sanitizedName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");
    const uniqueFilename = `${sanitizedName}_${timestamp}${ext}`;
    const storagePath = `gallery/${uniqueFilename}`;

    // Upload to Supabase storage
    console.log(`   ↗️  Uploading to storage: ${storagePath}`);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("muebles_yeco")
      .upload(storagePath, fileBuffer, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("muebles_yeco")
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;
    console.log(`   ✅ Storage URL: ${publicUrl}`);

    // Generate metadata
    const category = categorizeImage(filename);
    const title = generateTitle(filename);
    const description = `Mueble de melamina personalizado - ${category}`;

    // Insert into database
    console.log(`   💾 Inserting into database...`);
    const { data: dbData, error: dbError } = await supabase
      .from("gallery")
      .insert({
        title: title,
        description: description,
        category: category,
        public_url: publicUrl,
        file_path: storagePath,
        filename: uniqueFilename,
        alt_text: title,
        tags: [category, "melamina", "muebles"],
        is_active: true,
        file_size: fileStats.size,
        mime_type: "image/jpeg",
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database insert failed: ${dbError.message}`);
    }

    console.log(`   ✅ Database entry created (ID: ${dbData.id})`);
    console.log(`   📝 Title: "${title}"`);
    console.log(`   🏷️  Category: ${category}`);

    return {
      success: true,
      filename,
      id: dbData.id,
      publicUrl,
      title,
      category,
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return {
      success: false,
      filename,
      error: error.message,
    };
  }
}

// Main function
async function main() {
  console.log("🚀 Starting Supabase Image Upload");
  console.log("=====================================\n");

  // Get images directory
  const imagesDir = path.join(__dirname, "..", "images");

  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  // Get all image files
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(jpeg|jpg|png|gif)$/i.test(file))
    .filter((file) => !file.startsWith("."));

  console.log(`📁 Found ${files.length} images in ${imagesDir}\n`);

  if (files.length === 0) {
    console.log("⚠️  No images found to upload");
    process.exit(0);
  }

  // Upload all images
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const imagePath = path.join(imagesDir, filename);

    console.log(`\n[${i + 1}/${files.length}] Processing: ${filename}`);

    const result = await uploadImage(imagePath, filename);
    results.push(result);

    if (result.success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Print summary
  console.log("\n\n=====================================");
  console.log("📊 Upload Summary");
  console.log("=====================================");
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📁 Total: ${files.length}`);

  if (errorCount > 0) {
    console.log("\n❌ Failed uploads:");
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`   - ${r.filename}: ${r.error}`);
      });
  }

  if (successCount > 0) {
    console.log("\n✅ Successfully uploaded images:");
    results
      .filter((r) => r.success)
      .forEach((r) => {
        console.log(`   - ${r.title} (${r.category}) - ID: ${r.id}`);
      });
  }

  console.log("\n🎉 Upload complete!");
  console.log("\n💡 Next steps:");
  console.log("   1. Visit your Supabase dashboard to verify uploads");
  console.log("   2. Test the gallery at: /test-gallery-images.html");
  console.log("   3. Check the main page: /index.html");
}

// Run the script
main().catch((error) => {
  console.error("\n💥 Fatal error:", error);
  process.exit(1);
});
