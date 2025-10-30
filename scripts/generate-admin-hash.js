#!/usr/bin/env node

/**
 * Generate Admin Password Hash
 * Usage: node scripts/generate-admin-hash.js [password]
 */

const bcrypt = require("bcryptjs");

// Get password from command line or use default
const password = process.argv[2] || "marquiro17!@#$";

console.log("🔐 Generating Admin Password Hash");
console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);
console.log("");
console.log(`Password: ${password}`);
console.log("");

// Generate hash with salt rounds = 10
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("❌ Error generating hash:", err);
    process.exit(1);
  }

  console.log("✅ Hash generated successfully!");
  console.log("");
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );
  console.log("Hash:");
  console.log(hash);
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );
  console.log("");
  console.log("📝 Update your .env file:");
  console.log("");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log("");
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );
  console.log("");
  console.log("🧪 Testing hash...");

  // Test the hash
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error("❌ Error testing hash:", err);
      process.exit(1);
    }

    if (result) {
      console.log("✅ Hash verification successful!");
      console.log("");
      console.log("🎉 You can now use these credentials:");
      console.log(`   Username: ${process.env.ADMIN_USERNAME || "marquiro17"}`);
      console.log(`   Password: ${password}`);
    } else {
      console.error("❌ Hash verification failed!");
      process.exit(1);
    }
  });
});
