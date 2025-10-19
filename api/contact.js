// Contact Form API - Dedicated Endpoint (Vercel Pro)
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message, subject } = req.body;

    // Validation
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

    // Log contact form submission
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject: subject || "Consulta desde sitio web",
      message,
      timestamp: new Date().toISOString(),
    });

    // Here you would integrate with your email service (SendGrid, Mailgun, etc.)
    // For now, we'll just acknowledge the submission

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
      details: error.message,
    });
  }
}
