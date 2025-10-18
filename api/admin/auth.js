// Admin Authentication API for Vercel
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  // In production, use bcrypt hash: bcrypt.hashSync('your_password', 10)
  passwordHash:
    process.env.ADMIN_PASSWORD_HASH ||
    "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 'password'
};

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "POST") {
      // Login
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password required" });
      }

      // Debug logging
      console.log("Login attempt:", {
        providedUsername: username,
        expectedUsername: ADMIN_CREDENTIALS.username,
        providedPassword: password,
        passwordHash: ADMIN_CREDENTIALS.passwordHash,
      });

      // Verify credentials
      if (username !== ADMIN_CREDENTIALS.username) {
        console.log(
          "Username mismatch:",
          username,
          "vs",
          ADMIN_CREDENTIALS.username
        );
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check password - support both bcrypt hash and plain text for debugging
      let isValidPassword = false;

      try {
        // Try bcrypt first
        isValidPassword = await bcrypt.compare(
          password,
          ADMIN_CREDENTIALS.passwordHash
        );
      } catch (error) {
        console.log("Bcrypt comparison failed, trying plain text");
      }

      // If bcrypt fails, try plain text comparison for debugging
      if (!isValidPassword) {
        // For debugging: allow plain text password "marquiro17!@#$"
        if (password === "marquiro17!@#$") {
          isValidPassword = true;
        }
      }

      if (!isValidPassword) {
        console.log("Login attempt failed for:", username);
        console.log("Password provided:", password);
        console.log("Expected hash:", ADMIN_CREDENTIALS.passwordHash);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          username: username,
          role: "admin",
          iat: Math.floor(Date.now() / 1000),
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        success: true,
        token: token,
        expiresIn: "24h",
        user: {
          username: username,
          role: "admin",
        },
      });
    } else if (req.method === "GET") {
      // Verify token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
      }

      const token = authHeader.substring(7);

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({
          valid: true,
          user: {
            username: decoded.username,
            role: decoded.role,
          },
        });
      } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Utility function to verify admin token (for other APIs)
export function verifyAdminToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.substring(7);
  return jwt.verify(token, JWT_SECRET);
}
