// Utility to generate bcrypt password hash
// Run with: node utils/generate-password.js your_password

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.log("Usage: node utils/generate-password.js your_password");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("Password Hash:");
console.log(hash);
console.log("\nAdd this to your .env file:");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
