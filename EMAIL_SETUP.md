# Configuración de Email para Formulario de Contacto

## Opción 1: Resend (Recomendado para Vercel)

Resend es el servicio de email más fácil de integrar con Vercel.

### Pasos:

1. Crea una cuenta en [resend.com](https://resend.com)
2. Obtén tu API Key
3. Agrega la variable de entorno en Vercel:

   ```
   RESEND_API_KEY=tu_api_key_aqui
   ```

4. Instala el paquete:

   ```bash
   npm install resend
   ```

5. Actualiza `api/contact.js`:

   ```javascript
   import { Resend } from "resend";

   const resend = new Resend(process.env.RESEND_API_KEY);

   await resend.emails.send({
     from: "contacto@tudominio.com",
     to: "marquiro17@gmail.com",
     subject: `Nueva consulta de ${name}`,
     text: emailContent,
   });
   ```

## Opción 2: SendGrid

1. Crea cuenta en [sendgrid.com](https://sendgrid.com)
2. Obtén tu API Key
3. Agrega en Vercel:

   ```
   SENDGRID_API_KEY=tu_api_key_aqui
   ```

4. Instala:

   ```bash
   npm install @sendgrid/mail
   ```

5. Código:

   ```javascript
   const sgMail = require("@sendgrid/mail");
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

   await sgMail.send({
     to: "marquiro17@gmail.com",
     from: "contacto@tudominio.com",
     subject: `Nueva consulta de ${name}`,
     text: emailContent,
   });
   ```

## Opción 3: Nodemailer con Gmail

1. Configura una contraseña de aplicación en Gmail
2. Agrega en Vercel:

   ```
   GMAIL_USER=marquiro17@gmail.com
   GMAIL_PASS=tu_contraseña_de_aplicacion
   ```

3. Instala:

   ```bash
   npm install nodemailer
   ```

4. Código:

   ```javascript
   const nodemailer = require("nodemailer");

   const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: process.env.GMAIL_USER,
       pass: process.env.GMAIL_PASS,
     },
   });

   await transporter.sendMail({
     from: process.env.GMAIL_USER,
     to: "marquiro17@gmail.com",
     subject: `Nueva consulta de ${name}`,
     text: emailContent,
   });
   ```

## Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las variables necesarias según el servicio elegido
4. Redeploy tu proyecto

## Contacto por WhatsApp

El botón de WhatsApp ya está configurado con tu número:

- Número: +502 3768 8618
- Aparece automáticamente después de hacer scroll
- Incluye mensaje predefinido

## Testing Local

Para probar localmente, crea un archivo `.env.local`:

```
RESEND_API_KEY=tu_api_key
CONTACT_EMAIL=marquiro17@gmail.com
```

Y ejecuta:

```bash
vercel dev
```

## Notas Importantes

- El formulario actual guarda los datos en los logs de Vercel
- Puedes ver los mensajes en: Vercel Dashboard → Deployments → Functions → Logs
- Para producción, implementa una de las opciones de email arriba
- El WhatsApp es funcional inmediatamente sin configuración adicional
