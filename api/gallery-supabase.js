// Public Gallery API - Supabase Backend for Frontend
import { SupabaseService } from "../lib/supabase.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { category, limit } = req.query;

    // Get active items from Supabase
    const filters = { isActive: true };
    if (category) filters.category = category;

    let items = await SupabaseService.getGalleryItems(filters);

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit);
      items = items.slice(0, limitNum);
    }

    // Format for frontend consumption
    const formattedImages = items.map((item) => ({
      id: item.id,
      src: item.public_url,
      alt: item.alt_text || item.title,
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags || [],
      createdAt: item.created_at,
      // Additional metadata for advanced features
      width: item.width,
      height: item.height,
      fileSize: item.file_size,
      mimeType: item.mime_type,
    }));

    return res.status(200).json({
      success: true,
      data: {
        images: formattedImages,
        videos: [], // Videos can be added later
        total: formattedImages.length,
        source: "supabase",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Public gallery error:", error);

    // Return fallback data in case of Supabase issues
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
      {
        id: "fallback-3",
        src: "/images/WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
        alt: "Mueble de Dormitorio",
        title: "Mueble de Dormitorio",
        description: "Cómoda con espejo",
        category: "dormitorio",
        tags: ["dormitorio", "comoda"],
      },
      {
        id: "fallback-4",
        src: "/images/WhatsApp Image 2025-09-22 at 21.07.46.jpeg",
        alt: "Closet Moderno",
        title: "Closet Moderno",
        description: "Closet con puertas corredizas",
        category: "closet",
        tags: ["closet", "moderno"],
      },
      {
        id: "fallback-5",
        src: "/images/WhatsApp Image 2025-09-22 at 21.07.48.jpeg",
        alt: "Mueble de Cocina",
        title: "Mueble de Cocina",
        description: "Gabinetes de cocina integral",
        category: "cocina",
        tags: ["cocina", "gabinetes"],
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
