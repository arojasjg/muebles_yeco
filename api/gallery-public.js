// Public Gallery API - serves gallery data to the main website
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
    // Import gallery data from admin system
    // In production, this would come from your database
    const galleryData = {
      images: [
        {
          id: "1",
          filename: "WhatsApp Image 2025-09-22 at 21.07.37.jpeg",
          title: "Mueble de Sala 1",
          description: "Centro de entretenimiento moderno",
          category: "sala",
          isActive: true,
        },
        {
          id: "2",
          filename: "WhatsApp Image 2025-09-22 at 21.07.39.jpeg",
          title: "Mueble de Sala 2",
          description: "Estantería elegante",
          category: "sala",
          isActive: true,
        },
        {
          id: "3",
          filename: "WhatsApp Image 2025-09-22 at 21.07.45.jpeg",
          title: "Mueble de Dormitorio",
          description: "Cómoda con espejo",
          category: "dormitorio",
          isActive: true,
        },
        {
          id: "4",
          filename: "WhatsApp Image 2025-09-22 at 21.07.46.jpeg",
          title: "Closet Moderno",
          description: "Closet con puertas corredizas",
          category: "closet",
          isActive: true,
        },
        {
          id: "5",
          filename: "WhatsApp Image 2025-09-22 at 21.07.48.jpeg",
          title: "Mueble de Cocina",
          description: "Gabinetes de cocina integral",
          category: "cocina",
          isActive: true,
        },
      ],
      videos: [],
    };

    const { category, limit } = req.query;

    // Filter active items only
    let activeImages = galleryData.images.filter((item) => item.isActive);
    let activeVideos = galleryData.videos.filter((item) => item.isActive);

    // Filter by category if specified
    if (category) {
      activeImages = activeImages.filter((item) => item.category === category);
      activeVideos = activeVideos.filter((item) => item.category === category);
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit);
      activeImages = activeImages.slice(0, limitNum);
      activeVideos = activeVideos.slice(0, limitNum);
    }

    // Format for frontend consumption
    const formattedImages = activeImages.map((item) => ({
      src: `images/${item.filename}`,
      alt: item.title,
      title: item.title,
      description: item.description,
      category: item.category,
    }));

    const formattedVideos = activeVideos.map((item) => ({
      src: `images/${item.filename}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "video",
    }));

    return res.status(200).json({
      success: true,
      data: {
        images: formattedImages,
        videos: formattedVideos,
        total: formattedImages.length + formattedVideos.length,
      },
    });
  } catch (error) {
    console.error("Public gallery error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
