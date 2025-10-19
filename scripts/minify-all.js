#!/usr/bin/env node

/**
 * Minification Script for Muebles Yeco
 * Minifies all CSS and JS files for production
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple CSS minifier
function minifyCSS(css) {
  return (
    css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove whitespace
      .replace(/\s+/g, " ")
      // Remove spaces around special characters
      .replace(/\s*([{}:;,>+~])\s*/g, "$1")
      // Remove trailing semicolons
      .replace(/;}/g, "}")
      // Remove unnecessary quotes
      .replace(/url\((['"]?)([^'"()]+)\1\)/g, "url($2)")
      .trim()
  );
}

// Simple JS minifier
function minifyJS(js) {
  return (
    js
      // Remove single-line comments (but preserve URLs)
      .replace(/(?:^|\s)\/\/(?![^\n]*https?:).*$/gm, "")
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      // Remove spaces around operators and punctuation
      .replace(/\s*([{}();,:])\s*/g, "$1")
      .replace(/\s*([=+\-*/<>!&|])\s*/g, "$1")
      // Remove spaces after keywords
      .replace(
        /\b(if|for|while|function|return|var|let|const|class|new)\s+/g,
        "$1 "
      )
      .trim()
  );
}

// Files to minify
const filesToMinify = [
  // CSS files
  {
    input: "css/furniture-optimized.css",
    output: "css/furniture-optimized.min.css",
    type: "css",
  },

  // JS files
  {
    input: "js/furniture-optimized.js",
    output: "js/furniture-optimized.min.js",
    type: "js",
  },
  { input: "js/admin.js", output: "js/admin.min.js", type: "js" },
  {
    input: "js/storage-warning.js",
    output: "js/storage-warning.min.js",
    type: "js",
  },

  // Library files
  { input: "lib/supabase.js", output: "lib/supabase.min.js", type: "js" },
  {
    input: "lib/supabase-admin.js",
    output: "lib/supabase-admin.min.js",
    type: "js",
  },
];

console.log("🗜️  Minifying CSS and JS files...\n");

let totalOriginalSize = 0;
let totalMinifiedSize = 0;
let filesProcessed = 0;

filesToMinify.forEach((file) => {
  try {
    const inputPath = path.join(__dirname, "..", file.input);
    const outputPath = path.join(__dirname, "..", file.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${file.input} (not found)`);
      return;
    }

    const content = fs.readFileSync(inputPath, "utf8");
    const originalSize = Buffer.byteLength(content, "utf8");

    let minified;
    if (file.type === "css") {
      minified = minifyCSS(content);
    } else {
      minified = minifyJS(content);
    }

    const minifiedSize = Buffer.byteLength(minified, "utf8");
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    fs.writeFileSync(outputPath, minified, "utf8");

    console.log(`✅ ${file.input}`);
    console.log(
      `   ${(originalSize / 1024).toFixed(1)} KB → ${(
        minifiedSize / 1024
      ).toFixed(1)} KB (${reduction}% reduction)`
    );

    totalOriginalSize += originalSize;
    totalMinifiedSize += minifiedSize;
    filesProcessed++;
  } catch (error) {
    console.error(`❌ Error minifying ${file.input}:`, error.message);
  }
});

console.log("\n📊 Summary:");
console.log(`   Files processed: ${filesProcessed}`);
console.log(`   Original size: ${(totalOriginalSize / 1024).toFixed(1)} KB`);
console.log(`   Minified size: ${(totalMinifiedSize / 1024).toFixed(1)} KB`);
console.log(
  `   Total reduction: ${(
    (1 - totalMinifiedSize / totalOriginalSize) *
    100
  ).toFixed(1)}%`
);
console.log("\n✅ Minification complete!\n");
