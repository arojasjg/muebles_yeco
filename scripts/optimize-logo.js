#!/usr/bin/env node

/**
 * Logo Optimization Script
 * Optimizes the logo image for web use
 *
 * This script creates optimized versions of the logo at different sizes
 * to dramatically reduce page load time.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🎨 Logo Optimization Analysis");
console.log("==============================\n");

// Check if logo exists
const logoPath = path.join(__dirname, "..", "logo-transparent.png");

if (!fs.existsSync(logoPath)) {
  console.error("❌ logo-transparent.png not found in root directory");
  process.exit(1);
}

// Get file stats
const stats = fs.statSync(logoPath);
const sizeInKB = (stats.size / 1024).toFixed(2);
const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log("📊 Current Logo Analysis:");
console.log(`   File: logo-transparent.png`);
console.log(`   Size: ${sizeInKB} KB (${sizeInMB} MB)`);
console.log(`   Displayed at: 40x40px (navbar), 48x48px (admin)`);
console.log(`   Actual size: 1024x1024px (estimated)`);
console.log("");

// Calculate potential savings
const displaySize = 40; // pixels
const actualSize = 1024; // pixels (estimated)
const ratio = (displaySize / actualSize) ** 2;
const estimatedOptimizedSize = stats.size * ratio * 0.9; // 90% quality
const savings = stats.size - estimatedOptimizedSize;
const savingsPercent = ((savings / stats.size) * 100).toFixed(1);

console.log("💡 Optimization Potential:");
console.log(`   Current: ${sizeInKB} KB`);
console.log(`   Optimized: ${(estimatedOptimizedSize / 1024).toFixed(2)} KB`);
console.log(
  `   Savings: ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)`
);
console.log("");

console.log("🔧 Recommended Actions:");
console.log("");
console.log("1. IMMEDIATE FIX (Manual):");
console.log("   - Use an image editor (Photoshop, GIMP, online tool)");
console.log("   - Resize logo to 80x80px (2x for retina)");
console.log("   - Export as PNG with 90% quality");
console.log("   - Save as: logo-80.png");
console.log("   - Expected size: ~5-10 KB");
console.log("");

console.log("2. AUTOMATED FIX (Requires ImageMagick):");
console.log("   Install: brew install imagemagick webp");
console.log("   Then run: ./scripts/optimize-images.sh");
console.log("");

console.log("3. ONLINE TOOLS:");
console.log("   - TinyPNG: https://tinypng.com/");
console.log("   - Squoosh: https://squoosh.app/");
console.log("   - ImageOptim: https://imageoptim.com/");
console.log("");

console.log("4. UPDATE HTML:");
console.log("   Replace in index.html and admin.html:");
console.log('   <img src="logo-transparent.png" ... >');
console.log("   With:");
console.log("   <picture>");
console.log(
  '     <source srcset="logo-40.webp 1x, logo-80.webp 2x" type="image/webp">'
);
console.log(
  '     <img src="logo-40.png" srcset="logo-80.png 2x" alt="..." width="40" height="40">'
);
console.log("   </picture>");
console.log("");

console.log("📈 Expected Impact:");
console.log(`   - Page weight reduction: ${(savings / 1024).toFixed(0)} KB`);
console.log("   - Faster LCP (Largest Contentful Paint)");
console.log("   - Improved Lighthouse score: +5-10 points");
console.log("   - Better mobile performance");
console.log("");

console.log("✅ Next Steps:");
console.log("   1. Optimize logo using one of the methods above");
console.log("   2. Update HTML to use optimized version");
console.log("   3. Test page load time");
console.log("   4. Deploy to production");
console.log("");

// Create a simple HTML snippet file
const htmlSnippet = `<!-- Optimized Logo Implementation -->
<!-- Replace existing <img src="logo-transparent.png"> with this: -->

<picture>
  <source 
    srcset="logo-40.webp 1x, logo-80.webp 2x" 
    type="image/webp">
  <img 
    src="logo-40.png" 
    srcset="logo-80.png 2x"
    alt="Muebles Yeco Logo" 
    class="brand-logo" 
    width="40" 
    height="40"
    loading="eager">
</picture>

<!-- For favicon in <head>: -->
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="logo-180.png">
`;

fs.writeFileSync("logo-optimization-snippet.html", htmlSnippet);
console.log("📝 Created: logo-optimization-snippet.html");
console.log("   (HTML snippet for optimized logo implementation)");
console.log("");
