// Unified Public API Gateway - Enterprise Pattern
// Consolidates: gallery-supabase, gallery-public, contact
import { SupabaseService } from "../lib/supabase.js";
import { getActiveItems } from "./shared/gallery-data.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { action } = req.query;

    switch (action) {
      case "gallery":
        return handleGallery(req, res);
      case "contact":
        return handleContact(req, res);
      default:
        // Default to gallery for backward compatibility
        return handleGallery(req, res);
    }
  } catch (error) {
    console.error("Public API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Gallery handler (consolidates gallery-supabase and gallery-public)
async function handleGallery(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { category, limit, source } = req.query;

  try {
    let formattedImages = [];

    if (source === "local" || source === "fallback") {
      // Use local/fallback data
      const activeData = getActiveItems(category);
      let { images: activeImages } = activeData;

      if (limit) {
        const limitNum = parseInt(limit);
        activeImages = activeImages.slice(0, limitNum);
      }

      formattedImages = activeImages.map((item) => ({
        src: item.imageUrl || item.dataUrl || `images/${item.filename}`,
        alt: item.title,
        title: item.title,
        description: item.description,
        category: item.category,
      }));

      return res.status(200).json({
        success: true,
        data: {
          images: formattedImages,
          videos: [],
          total: formattedImages.length,
          source: "local",
        },
      });
    } else {
      // Use Supabase (default)
      const filters = { isActive: true };
      if (category) filters.category = category;

      let items = await SupabaseService.getGalleryItems(filters);

      if (limit) {
        const limitNum = parseInt(limit);
        items = items.slice(0, limitNum);
      }

      formattedImages = items.map((item) => ({
        id: item.id,
        src: item.public_url,
        alt: item.alt_text || item.title,
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags || [],
        createdAt: item.created_at,
        width: item.width,
        height: item.height,
        fileSize: item.file_size,
        mimeType: item.mime_type,
      }));

      return res.status(200).json({
        success: true,
        data: {
          images: formattedImages,
          videos: [],
          total: formattedImages.length,
          source: "supabase",
          timestamp: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error("Gallery error:", error);

    // Return fallback data
    const fallbackImages = [
      {
        id: "fallback-1",
        src: "/images/WhatsApp Image 2025-09-22 at 21.07.37.jpeg",
        alt: "Mueble de Sala 1",
        title: "Mueble de Sala 1",
        description: "Centro de entretenimiento moderno",
        category: "sala",
        tags: ["sala", "entretenimiento"],
      },
      {
        id: "fallback-2",
        src: "/images/WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
        alt: "Mueble de Sala 2",
        title: "Mueble de Sala 2",
        description: "Estantería elegante",
        category: "sala",
        tags: ["sala", "estanteria"],
      },
    ];

    return res.status(200).json({
      success: true,
      data: {
        images: fallbackImages,
        videos: [],
        total: fallbackImages.length,
        source: "fallback",
        error: "Supabase temporarily unavailable",
        timestamp: new Date().toISOString(),
      },
    });
  }
}

// Contact handler
async function handleContact(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  try {
    // Here you would integrate with your email service
    // For now, we'll just log and return success
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject: subject || "Consulta desde sitio web",
      message,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Mensaje enviado correctamente. Te contactaremos pronto.",
      data: {
        submitted: true,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Error al enviar el mensaje. Inténtalo de nuevo.",
    });
  }
}
