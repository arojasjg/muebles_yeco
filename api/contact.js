// Vercel Serverless Function for Contact Form
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
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
    const { name, email, phone, interest, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Prepare email content
    const emailContent = `
Nueva Consulta desde Muebles Yeco

Nombre: ${name}
Email: ${email}
Teléfono: ${phone || "No proporcionado"}
Interés: ${interest || "No especificado"}

Mensaje:
${message}

---
Enviado desde: ${req.headers.origin || "Sitio Web"}
Fecha: ${new Date().toLocaleString("es-GT", { timeZone: "America/Guatemala" })}
    `.trim();

    // For Vercel, you can use various email services
    // Option 1: Using Resend (recommended for Vercel)
    // Option 2: Using SendGrid
    // Option 3: Using Nodemailer with Gmail

    // Here's a simple implementation that logs the data
    // You'll need to configure your preferred email service

    console.log("Contact Form Submission:", {
      name,
      email,
      phone,
      interest,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with your email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contacto@muebles-yeco.com',
    //   to: 'marquiro17@gmail.com',
    //   subject: `Nueva consulta de ${name}`,
    //   text: emailContent,
    // });

    // For now, return success
    return res.status(200).json({
      success: true,
      message: "Mensaje recibido. Nos pondremos en contacto pronto.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Error al enviar el mensaje. Por favor intente nuevamente.",
    });
  }
}
