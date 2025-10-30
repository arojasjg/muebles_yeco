// Simple Admin Authentication - For Testing
// Use this temporarily if auth.js is not working

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "muebles-yeco-super-secret-jwt-key-2025";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
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
      // Simple login - NO BCRYPT
      const { username, password } = req.body;

      console.log("Simple auth attempt:", {
        username,
        hasPassword: !!password,
      });

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password required" });
      }

      // Simple validation - HARDCODED for testing
      const validUsername = "marquiro17";
      const validPassword = "marquiro17!@#$";

      if (username !== validUsername) {
        console.log("Username mismatch:", username, "vs", validUsername);
        return res.status(401).json({
          error: "Invalid credentials",
          debug: `Expected username: ${validUsername}`,
        });
      }

      if (password !== validPassword) {
        console.log("Password mismatch");
        return res.status(401).json({
          error: "Invalid credentials",
          debug: "Password mismatch",
        });
      }

      // Generate token
      const token = jwt.sign(
        {
          username: username,
          role: "admin",
          iat: Math.floor(Date.now() / 1000),
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log("Authentication successful");

      return res.status(200).json({
        success: true,
        token: token,
        expiresIn: "24h",
        user: { username: username, role: "admin" },
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
          user: { username: decoded.username, role: decoded.role },
        });
      } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
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
