#!/usr/bin/env node

/**
 * Verify Password Hash
 * Checks if a password matches a bcrypt hash
 */

const bcrypt = require("bcryptjs");

// Get from command line or use defaults
const password = process.argv[2] || "marquiro17!@#$";
const hash =
  process.argv[3] ||
  "$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.";

console.log("🔐 Verifying Password Hash");
console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);
console.log("");
console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);
console.log("");
console.log("Verifying...");
console.log("");

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error("❌ Error verifying hash:", err);
    process.exit(1);
  }

  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );

  if (result) {
    console.log("✅ HASH IS VALID!");
    console.log("");
    console.log("The password matches the hash.");
    console.log(
      "You can use this hash in your .env file or Vercel environment variables."
    );
    console.log("");
    console.log("For Vercel:");
    console.log("1. Go to Settings → Environment Variables");
    console.log("2. Add: ADMIN_PASSWORD_HASH");
    console.log(`3. Value: ${hash}`);
    console.log("4. Redeploy");
  } else {
    console.log("❌ HASH IS INVALID!");
    console.log("");
    console.log("The password does NOT match the hash.");
    console.log("You need to generate a new hash.");
    console.log("");
    console.log('Run: node scripts/generate-admin-hash.js "your-password"');
  }

  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );
});
