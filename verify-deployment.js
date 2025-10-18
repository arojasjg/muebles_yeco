// Deployment verification script
import fs from "fs";
import path from "path";

console.log("🔍 Verifying Deployment Readiness...\n");

// Check required files
const requiredFiles = [
  "api/admin/auth.js",
  "api/admin/gallery.js",
  "api/admin/upload.js",
  "api/contact.js",
  "api/gallery-public.js",
  "admin.html",
  "js/admin.js",
  "index.html",
  "vercel.json",
  "package.json",
];

console.log("📁 Checking Required Files:");
let allFilesExist = true;

requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING!`);
    allFilesExist = false;
  }
});

// Check .vercelignore
console.log("\n📋 Checking .vercelignore:");
if (fs.existsSync(".vercelignore")) {
  const vercelIgnore = fs.readFileSync(".vercelignore", "utf8");
  if (vercelIgnore.includes("admin/") && !vercelIgnore.includes("php/")) {
    console.log(
      "❌ .vercelignore still excludes admin/ - this will cause 404s"
    );
    allFilesExist = false;
  } else {
    console.log("✅ .vercelignore correctly configured");
  }
} else {
  console.log("⚠️  .vercelignore not found");
}

// Check package.json dependencies
console.log("\n📦 Checking Dependencies:");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const requiredDeps = [
  "jsonwebtoken",
  "bcryptjs",
  "formidable",
  "cloudinary",
  "nodemailer",
];

requiredDeps.forEach((dep) => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - MISSING!`);
    allFilesExist = false;
  }
});

// Check vercel.json
console.log("\n⚙️  Checking vercel.json:");
const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
if (
  vercelConfig.rewrites &&
  vercelConfig.rewrites.some((r) => r.source === "/admin")
) {
  console.log("✅ Admin route configured");
} else {
  console.log("❌ Admin route not configured");
}

if (
  vercelConfig.headers &&
  vercelConfig.headers.some((h) => h.source.includes("api"))
) {
  console.log("✅ API CORS headers configured");
} else {
  console.log("❌ API CORS headers not configured");
}

// Summary
console.log("\n🎯 Deployment Readiness Summary:");
if (allFilesExist) {
  console.log("✅ ALL CHECKS PASSED - Ready for deployment!");
  console.log("\n🚀 Deploy with:");
  console.log("   git add .");
  console.log('   git commit -m "Deploy admin system"');
  console.log("   git push origin main");
  console.log("\n   OR");
  console.log("\n   vercel --prod");
} else {
  console.log("❌ SOME CHECKS FAILED - Fix issues before deploying");
}

console.log("\n📋 Environment Variables Needed in Vercel:");
console.log("   ADMIN_USERNAME=marquiro17@gmail.com");
console.log(
  "   ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS."
);
console.log("   JWT_SECRET=your-super-secret-jwt-key-change-in-production");
console.log("   GMAIL_USER=marquiro17@gmail.com");
console.log("   GMAIL_PASS=marquiro17!@#$");
console.log("   CLOUDINARY_CLOUD_NAME=your_cloud_name");
console.log("   CLOUDINARY_API_KEY=your_api_key");
console.log("   CLOUDINARY_API_SECRET=your_api_secret");
