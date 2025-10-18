# 🚀 Guía Completa de Despliegue en Vercel

## ✅ Problemas Resueltos

### Issues Corregidos:

1. ✅ Eliminado `builds` deprecado de vercel.json
2. ✅ Agregado `"type": "module"` a package.json
3. ✅ Configuración moderna de Vercel con `rewrites`
4. ✅ Headers CORS configurados correctamente
5. ✅ Archivo .vercelignore para excluir archivos innecesarios
6. ✅ Node.js 18+ especificado en engines

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com)
- Git instalado
- Repositorio en GitHub (recomendado)

## 🎯 Método 1: Despliegue desde GitHub (RECOMENDADO)

### Paso 1: Preparar el Repositorio

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Initial commit - Muebles Yeco website"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/muebles-yeco.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click en "Import Git Repository"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración
5. Click en "Deploy"

### Paso 3: Configurar Variables de Entorno (Opcional)

Si quieres usar un servicio de email:

1. En Vercel Dashboard → Tu Proyecto
2. Settings → Environment Variables
3. Agrega las variables necesarias:

```
CONTACT_EMAIL=marquiro17@gmail.com
```

Para email service (opcional):

```
RESEND_API_KEY=tu_api_key
```

## 🎯 Método 2: Despliegue con Vercel CLI

### Instalación

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# O usar npx (sin instalación global)
npx vercel
```

### Despliegue

```bash
# Login a Vercel
vercel login

# Despliegue de preview
vercel

# Despliegue a producción
vercel --prod
```

## 🧪 Testing Local

### Opción 1: Vercel Dev (Recomendado)

```bash
# Instalar dependencias (si es necesario)
npm install

# Iniciar servidor de desarrollo
vercel dev

# Abrir en navegador
# http://localhost:3000
```

### Opción 2: Servidor HTTP Simple

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# Abrir: http://localhost:8000
```

## 📁 Estructura del Proyecto

```
muebles-yeco/
├── api/
│   └── contact.js          # Serverless function
├── css/
│   └── furniture-optimized.css
├── js/
│   └── furniture-optimized.js
├── images/
│   └── *.jpeg
├── index.html              # Página principal
├── package.json            # Configuración del proyecto
├── vercel.json            # Configuración de Vercel
├── .vercelignore          # Archivos a ignorar
└── .env.example           # Variables de entorno ejemplo
```

## 🔧 Configuración de Vercel

### vercel.json Explicado

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        // CORS headers para permitir requests desde cualquier origen
      ]
    }
  ]
}
```

### package.json Explicado

```json
{
  "type": "module", // Habilita ES Modules
  "engines": {
    "node": ">=18.x" // Especifica versión de Node.js
  }
}
```

## 🧪 Verificar Funcionamiento

### 1. Página Principal

```
https://tu-dominio.vercel.app/
```

### 2. API de Contacto

```bash
curl -X POST https://tu-dominio.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### 3. WhatsApp Button

- Debe aparecer al hacer scroll
- Click debe abrir WhatsApp con mensaje predefinido

## 📊 Monitoreo y Logs

### Ver Logs de la API

1. Vercel Dashboard
2. Tu Proyecto → Deployments
3. Click en el deployment activo
4. Functions → contact
5. View Logs

### Ver Mensajes del Formulario

Los mensajes se guardan en los logs con este formato:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "1234-5678",
  "interest": "home",
  "message": "Mensaje del cliente",
  "timestamp": "2025-10-18T..."
}
```

## 🔒 Seguridad

### Headers de Seguridad (Opcional)

Agrega a `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🌐 Dominio Personalizado

### Agregar Dominio

1. Vercel Dashboard → Tu Proyecto
2. Settings → Domains
3. Add Domain
4. Sigue las instrucciones para configurar DNS

### Configuración DNS

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🐛 Troubleshooting

### Error 404: NOT_FOUND

**Causa:** Archivos no encontrados o rutas incorrectas

**Solución:**

1. Verifica que `index.html` esté en la raíz
2. Revisa que las rutas en el código sean relativas
3. Asegúrate que `.vercelignore` no excluya archivos necesarios

### Error 500: Internal Server Error

**Causa:** Error en la función serverless

**Solución:**

1. Revisa los logs en Vercel Dashboard
2. Verifica que `api/contact.js` no tenga errores de sintaxis
3. Asegúrate que las variables de entorno estén configuradas

### CORS Errors

**Causa:** Headers CORS no configurados correctamente

**Solución:**
Ya está configurado en `vercel.json`, pero verifica que:

1. Los headers estén en la configuración
2. El API responda con status 200 para OPTIONS

### WhatsApp no abre

**Causa:** Formato incorrecto del número

**Solución:**
Verifica en `js/furniture-optimized.js`:

```javascript
// Formato correcto: código de país + número (sin +, espacios, guiones)
whatsappBtn.href = "https://wa.me/50237688618?text=...";
```

## 📈 Optimizaciones

### Performance

1. **Imágenes:** Ya optimizadas con lazy loading
2. **CSS:** Inline critical CSS en `<head>`
3. **JavaScript:** Defer y async donde sea posible
4. **Caching:** Vercel maneja automáticamente

### SEO

1. **Meta tags:** Ya configurados en `index.html`
2. **Sitemap:** Crear `sitemap.xml` (opcional)
3. **robots.txt:** Crear si es necesario

## ✅ Checklist de Despliegue

- [ ] Código en GitHub
- [ ] Proyecto conectado en Vercel
- [ ] Primer despliegue exitoso
- [ ] index.html carga correctamente
- [ ] Formulario de contacto funciona
- [ ] API `/api/contact` responde
- [ ] WhatsApp button aparece y funciona
- [ ] Imágenes cargan correctamente
- [ ] CSS y JS cargan sin errores
- [ ] Responsive en móvil
- [ ] Variables de entorno configuradas (si aplica)
- [ ] Dominio personalizado configurado (opcional)
- [ ] SSL activo (automático en Vercel)

## 🎉 Resultado Esperado

Después del despliegue exitoso:

1. ✅ Sitio accesible en `https://tu-proyecto.vercel.app`
2. ✅ Formulario envía datos a `/api/contact`
3. ✅ Mensajes guardados en logs de Vercel
4. ✅ WhatsApp button funcional
5. ✅ SSL automático activo
6. ✅ CDN global de Vercel
7. ✅ Despliegues automáticos desde Git

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel Dashboard
2. Verifica la consola del navegador (F12)
3. Consulta [Vercel Docs](https://vercel.com/docs)
4. Revisa [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Última actualización:** Octubre 2025
**Versión:** 2.0 (Configuración moderna sin `builds`)
