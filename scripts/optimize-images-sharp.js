#!/usr/bin/env node

/**
 * Image Optimization Script using Sharp
 * Optimizes all images for web delivery
 *
 * This script:
 * - Converts images to WebP format
 * - Creates multiple sizes for responsive images
 * - Optimizes file sizes
 * - Generates implementation code
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🎨 Image Optimization Script");
console.log("============================\n");

// Check if Sharp is installed
let sharp;
try {
  sharp = (await import("sharp")).default;
  console.log("✅ Sharp library found\n");
} catch (error) {
  console.error("❌ Sharp library not found");
  console.error("Install with: npm install sharp --save-dev\n");
  console.error("Or use manual optimization:");
  console.error("1. Go to https://squoosh.app/");
  console.error("2. Upload images");
  console.error("3. Resize and convert to WebP");
  console.error("4. Download optimized versions\n");
  process.exit(1);
}

// Configuration
const config = {
  inputDir: path.join(__dirname, "..", "images"),
  outputDir: path.join(__dirname, "..", "images", "optimized"),
  webpDir: path.join(__dirname, "..", "images", "webp"),
  sizes: {
    thumbnail: 300,
    small: 600,
    medium: 1200,
    large: 1920,
  },
  quality: {
    webp: 85,
    jpeg: 85,
    png: 90,
  },
};

// Create output directories
[config.outputDir, config.webpDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, filename) {
  const name = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();

  console.log(`📸 Processing: ${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(
      `   Original: ${metadata.width}x${metadata.height}, ${metadata.format}`
    );

    const results = [];

    // Generate different sizes
    for (const [sizeName, width] of Object.entries(config.sizes)) {
      // Skip if image is smaller than target size
      if (metadata.width < width) continue;

      // WebP version
      const webpPath = path.join(config.webpDir, `${name}-${sizeName}.webp`);
      await image
        .clone()
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: config.quality.webp })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      results.push({
        format: "webp",
        size: sizeName,
        width,
        path: webpPath,
        bytes: webpStats.size,
      });

      // JPEG/PNG version (fallback)
      const outputExt = ext === ".png" ? ".png" : ".jpg";
      const outputPath = path.join(
        config.outputDir,
        `${name}-${sizeName}${outputExt}`
      );

      if (ext === ".png") {
        await image
          .clone()
          .resize(width, null, { withoutEnlargement: true })
          .png({ quality: config.quality.png })
          .toFile(outputPath);
      } else {
        await image
          .clone()
          .resize(width, null, { withoutEnlargement: true })
          .jpeg({ quality: config.quality.jpeg })
          .toFile(outputPath);
      }

      const outputStats = fs.statSync(outputPath);
      results.push({
        format: ext === ".png" ? "png" : "jpeg",
        size: sizeName,
        width,
        path: outputPath,
        bytes: outputStats.size,
      });
    }

    // Calculate savings
    const originalSize = fs.statSync(inputPath).size;
    const webpSize =
      results.find((r) => r.format === "webp" && r.size === "medium")?.bytes ||
      originalSize;
    const savings = originalSize - webpSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    console.log(`   ✅ Generated ${results.length} versions`);
    console.log(
      `   💾 Savings: ${(savings / 1024).toFixed(1)} KB (${savingsPercent}%)\n`
    );

    return {
      filename,
      original: originalSize,
      optimized: webpSize,
      savings,
      results,
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
    return null;
  }
}

/**
 * Optimize logo specifically
 */
async function optimizeLogo() {
  const logoPath = path.join(__dirname, "..", "logo-transparent.png");

  if (!fs.existsSync(logoPath)) {
    console.log("⚠️  Logo not found, skipping\n");
    return;
  }

  console.log("🎯 Optimizing Logo\n");

  const sizes = [
    { name: "16", width: 16 },
    { name: "32", width: 32 },
    { name: "40", width: 40 },
    { name: "48", width: 48 },
    { name: "80", width: 80 },
    { name: "96", width: 96 },
    { name: "180", width: 180 },
  ];

  const image = sharp(logoPath);

  for (const size of sizes) {
    // WebP version
    await image
      .clone()
      .resize(size.width, size.width)
      .webp({ quality: 90 })
      .toFile(`logo-${size.name}.webp`);

    // PNG version
    await image
      .clone()
      .resize(size.width, size.width)
      .png({ quality: 90 })
      .toFile(`logo-${size.name}.png`);

    console.log(
      `   ✅ Created logo-${size.name}.webp and logo-${size.name}.png`
    );
  }

  const originalSize = fs.statSync(logoPath).size;
  const optimizedSize = fs.statSync("logo-40.png").size;
  const savings = originalSize - optimizedSize;
  const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

  console.log(
    `\n   💾 Logo Savings: ${(savings / 1024).toFixed(
      1
    )} KB (${savingsPercent}%)\n`
  );
}

/**
 * Main function
 */
async function main() {
  // Optimize logo first
  await optimizeLogo();

  // Get all images
  const files = fs
    .readdirSync(config.inputDir)
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .filter((file) => !file.startsWith("."));

  if (files.length === 0) {
    console.log("⚠️  No images found in images/ directory\n");
    return;
  }

  console.log(`📁 Found ${files.length} images to optimize\n`);

  const results = [];

  for (const file of files) {
    const inputPath = path.join(config.inputDir, file);
    const result = await optimizeImage(inputPath, file);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log("📊 Optimization Summary");
  console.log("======================\n");

  const totalOriginal = results.reduce((sum, r) => sum + r.original, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimized, 0);
  const totalSavings = totalOriginal - totalOptimized;
  const totalPercent = ((totalSavings / totalOriginal) * 100).toFixed(1);

  console.log(`Images Processed: ${results.length}`);
  console.log(
    `Original Size:    ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Optimized Size:   ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Total Savings:    ${(totalSavings / 1024 / 1024).toFixed(
      2
    )} MB (${totalPercent}%)\n`
  );

  console.log("✅ Optimization Complete!\n");
  console.log("Next steps:");
  console.log("1. Update HTML to use optimized images");
  console.log("2. Implement <picture> elements with WebP");
  console.log("3. Add responsive srcset attributes");
  console.log("4. Test and deploy\n");
}

// Run
main().catch((error) => {
  console.error("💥 Fatal error:", error);
  process.exit(1);
});
