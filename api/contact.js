// Vercel Serverless Function for Contact Form with Gmail integration
import nodemailer from "nodemailer";

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

    // Log the submission
    console.log("Contact Form Submission:", {
      name,
      email,
      phone,
      interest,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email using Gmail
    try {
      // Create transporter
      const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "marquiro17@gmail.com",
          pass: process.env.GMAIL_PASS || "marquiro17!@#$",
        },
      });

      // Email to admin
      const adminMailOptions = {
        from: process.env.GMAIL_USER || "marquiro17@gmail.com",
        to: "marquiro17@gmail.com",
        subject: `🏠 Nueva Consulta - Muebles Yeco - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <div style="background: #8B4513; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🏠 Muebles Yeco</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Nueva Consulta Recibida</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #8B4513; margin-bottom: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
                Información del Cliente
              </h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #654321;">👤 Nombre:</strong>
                <span style="margin-left: 10px; font-size: 16px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #654321;">📧 Email:</strong>
                <span style="margin-left: 10px; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                </span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #654321;">📱 Teléfono:</strong>
                <span style="margin-left: 10px; font-size: 16px;">
                  ${
                    phone
                      ? `<a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a>`
                      : "No proporcionado"
                  }
                </span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #654321;">🏷️ Interés:</strong>
                <span style="margin-left: 10px; font-size: 16px; background: #D4AF37; color: white; padding: 4px 8px; border-radius: 4px;">
                  ${interest || "No especificado"}
                </span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #654321;">💬 Mensaje:</strong>
                <div style="margin-top: 10px; padding: 15px; background: #f8f8f8; border-left: 4px solid #D4AF37; border-radius: 4px; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString(
                  "es-GT",
                  { timeZone: "America/Guatemala" }
                )}</p>
                <p><strong>🌐 Origen:</strong> ${
                  req.headers.origin || "Sitio Web"
                }</p>
              </div>
              
              <div style="margin-top: 20px; text-align: center;">
                <a href="https://wa.me/50237688618?text=Hola%20${encodeURIComponent(
                  name
                )},%20recibimos%20tu%20consulta%20sobre%20muebles" 
                   style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  📱 Responder por WhatsApp
                </a>
              </div>
            </div>
          </div>
        `,
        text: emailContent,
      };

      // Auto-reply to customer
      const customerMailOptions = {
        from: process.env.GMAIL_USER || "marquiro17@gmail.com",
        to: email,
        subject: "✅ Consulta Recibida - Muebles Yeco",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <div style="background: #8B4513; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🏠 Muebles Yeco</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">¡Gracias por contactarnos!</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #8B4513; margin-bottom: 20px;">Hola ${name},</h2>
              
              <p style="line-height: 1.6; margin-bottom: 20px;">
                Hemos recibido tu consulta sobre nuestros muebles de melamina a medida. 
                Nos pondremos en contacto contigo muy pronto para asesorarte en tu proyecto.
              </p>
              
              <div style="background: #f8f8f8; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #654321; margin-top: 0;">📋 Resumen de tu consulta:</h3>
                <p><strong>Interés:</strong> ${
                  interest || "Consulta general"
                }</p>
                <p><strong>Mensaje:</strong> ${message.substring(0, 100)}${
          message.length > 100 ? "..." : ""
        }</p>
              </div>
              
              <div style="margin: 30px 0;">
                <h3 style="color: #654321;">🚀 Mientras tanto, puedes:</h3>
                <ul style="line-height: 1.8;">
                  <li>📱 Contactarnos directamente por WhatsApp: <a href="https://wa.me/50237688618" style="color: #25D366; text-decoration: none; font-weight: bold;">3768 8618</a></li>
                  <li>🌐 Visitar nuestra galería completa en el sitio web</li>
                  <li>📧 Responder este email con más detalles de tu proyecto</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://wa.me/50237688618?text=Hola,%20soy%20${encodeURIComponent(
                  name
                )}%20y%20envié%20una%20consulta%20por%20el%20sitio%20web" 
                   style="background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin: 10px;">
                  💬 Chatear por WhatsApp
                </a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; text-align: center;">
                <p><strong>Muebles Yeco</strong> - Diseñamos y fabricamos muebles de melamina a la medida</p>
                <p>📍 Guatemala, Guatemala | 📱 3768 8618 | 📧 marquiro17@gmail.com</p>
              </div>
            </div>
          </div>
        `,
        text: `
Hola ${name},

Hemos recibido tu consulta sobre nuestros muebles de melamina a medida.
Nos pondremos en contacto contigo muy pronto para asesorarte en tu proyecto.

Resumen de tu consulta:
- Interés: ${interest || "Consulta general"}
- Mensaje: ${message}

Mientras tanto, puedes contactarnos directamente:
- WhatsApp: 3768 8618
- Email: marquiro17@gmail.com

¡Gracias por confiar en Muebles Yeco!

---
Muebles Yeco
Guatemala, Guatemala
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(customerMailOptions),
      ]);

      return res.status(200).json({
        success: true,
        message:
          "Mensaje enviado exitosamente. Revisa tu email para confirmación.",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);

      // Still return success but log the email error
      return res.status(200).json({
        success: true,
        message: "Mensaje recibido. Nos pondremos en contacto pronto.",
        emailSent: false,
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Error al enviar el mensaje. Por favor intente nuevamente.",
    });
  }
}
