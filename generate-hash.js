// Generate password hash for admin
import bcrypt from "bcryptjs";

const password = "marquiro17!@#$";
const hash = bcrypt.hashSync(password, 10);

console.log("Password Hash for marquiro17!@#$:");
console.log(hash);
console.log("\nUpdate your .env file with:");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
