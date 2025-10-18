# Guía de Despliegue en Vercel

## 🚀 Despliegue Rápido

### 1. Preparar el Proyecto

Tu proyecto ya está listo para Vercel con:

- ✅ Formulario de contacto funcional
- ✅ API serverless en `/api/contact.js`
- ✅ Botón flotante de WhatsApp
- ✅ Configuración de Vercel (`vercel.json`)

### 2. Desplegar en Vercel

#### Opción A: Desde GitHub (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Click en "Add New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente la configuración
6. Click en "Deploy"

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

### 3. Configurar Variables de Entorno (Opcional)

Si quieres usar un servicio de email:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega según el servicio que elijas:

**Para Resend:**

```
RESEND_API_KEY=tu_api_key
```

**Para SendGrid:**

```
SENDGRID_API_KEY=tu_api_key
```

**Para Gmail:**

```
GMAIL_USER=marquiro17@gmail.com
GMAIL_PASS=tu_contraseña_de_aplicacion
```

### 4. Verificar Funcionamiento

Después del despliegue:

1. **Formulario de Contacto:**

   - Llena el formulario en tu sitio
   - Los mensajes se guardan en los logs de Vercel
   - Ve a: Dashboard → Deployments → Functions → Logs

2. **WhatsApp:**

   - El botón aparece al hacer scroll
   - Click abre WhatsApp con mensaje predefinido
   - Número: +502 3768 8618

3. **API Endpoint:**
   - Prueba: `https://tu-dominio.vercel.app/api/contact`
   - Método: POST
   - Body: JSON con name, email, message

## 📱 Funcionalidades Implementadas

### Formulario de Contacto

- ✅ Validación de campos
- ✅ Envío a API serverless
- ✅ Mensajes de éxito/error
- ✅ Responsive y accesible

### Botón de WhatsApp

- ✅ Flotante en esquina inferior derecha
- ✅ Aparece después de scroll
- ✅ Animación de pulso
- ✅ Tooltip informativo
- ✅ Link directo a chat con mensaje

### API Serverless

- ✅ Endpoint: `/api/contact`
- ✅ Validación de datos
- ✅ CORS configurado
- ✅ Logs en Vercel
- ✅ Listo para integrar email

## 🔧 Personalización

### Cambiar Número de WhatsApp

Edita `js/furniture-optimized.js`:

```javascript
whatsappBtn.href = "https://wa.me/TU_NUMERO?text=Tu%20mensaje";
```

### Cambiar Email de Destino

Edita `api/contact.js` o configura variable de entorno:

```javascript
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "marquiro17@gmail.com";
```

### Personalizar Mensaje de WhatsApp

En `js/furniture-optimized.js`:

```javascript
const mensaje = encodeURIComponent("Tu mensaje personalizado aquí");
whatsappBtn.href = `https://wa.me/50237688618?text=${mensaje}`;
```

## 📊 Monitoreo

### Ver Mensajes del Formulario

1. Vercel Dashboard
2. Tu proyecto → Deployments
3. Click en el deployment activo
4. Functions → contact
5. View Logs

### Analytics

Vercel incluye analytics básicos:

- Visitas
- Rendimiento
- Errores

## 🐛 Troubleshooting

### El formulario no envía

1. Verifica que la URL del API sea correcta
2. Revisa la consola del navegador (F12)
3. Verifica los logs en Vercel

### WhatsApp no abre

1. Verifica el formato del número: `50237688618`
2. Asegúrate que el número incluya código de país
3. Prueba el link directamente

### Errores de CORS

Ya está configurado en `api/contact.js`, pero si hay problemas:

```javascript
res.setHeader("Access-Control-Allow-Origin", "*");
```

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [WhatsApp API](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)
- [Guía de Email](./EMAIL_SETUP.md)

## ✅ Checklist de Despliegue

- [ ] Código subido a GitHub
- [ ] Proyecto conectado en Vercel
- [ ] Primer despliegue exitoso
- [ ] Formulario probado
- [ ] WhatsApp probado
- [ ] Variables de entorno configuradas (si usas email)
- [ ] Dominio personalizado configurado (opcional)
- [ ] SSL activo (automático en Vercel)

## 🎉 ¡Listo!

Tu sitio está ahora en producción con:

- Formulario de contacto funcional
- Botón de WhatsApp flotante
- API serverless
- SSL automático
- CDN global
- Despliegues automáticos desde Git

¡Felicidades! 🚀
