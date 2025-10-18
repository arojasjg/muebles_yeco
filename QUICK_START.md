# ⚡ Quick Start - Despliegue Inmediato

## 🚀 Despliegue en 3 Pasos

### 1️⃣ Preparar Archivos

```bash
# Asegúrate de tener estos archivos en la raíz:
✅ index.html
✅ package.json
✅ vercel.json
✅ api/contact.js
✅ css/furniture-optimized.css
✅ js/furniture-optimized.js
✅ images/*.jpeg
✅ logo-transparent.png
```

### 2️⃣ Subir a GitHub

```bash
git init
git add .
git commit -m "Deploy Muebles Yeco"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/muebles-yeco.git
git push -u origin main
```

### 3️⃣ Conectar con Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Click "Deploy"
4. ¡Listo! 🎉

## 🧪 Testing Local (Opcional)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar servidor local
vercel dev

# Abrir: http://localhost:3000
```

## ✅ Verificar que Funciona

1. **Página Principal:** `https://tu-proyecto.vercel.app`
2. **Formulario:** Llena y envía el formulario de contacto
3. **WhatsApp:** Haz scroll y click en el botón verde
4. **Logs:** Vercel Dashboard → Functions → contact → View Logs

## 📊 Ver Mensajes del Formulario

1. Vercel Dashboard
2. Tu Proyecto → Deployments
3. Click en deployment activo
4. Functions → contact → View Logs

Los mensajes aparecen así:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Hola, me interesan sus muebles"
}
```

## 🔧 Configuración Actual

### Formulario de Contacto

- ✅ Endpoint: `/api/contact`
- ✅ Email: `marquiro17@gmail.com`
- ✅ Guarda en logs de Vercel
- ✅ Validación de campos

### WhatsApp

- ✅ Número: `+502 3768 8618`
- ✅ Botón flotante verde
- ✅ Aparece al hacer scroll
- ✅ Mensaje predefinido

## 🐛 Si Algo No Funciona

### Error 404

```bash
# Verifica que index.html esté en la raíz
ls -la index.html

# Debe mostrar: -rw-r--r-- ... index.html
```

### Formulario no envía

```bash
# Verifica que api/contact.js existe
ls -la api/contact.js

# Debe mostrar: -rw-r--r-- ... api/contact.js
```

### WhatsApp no abre

```javascript
// Verifica el número en js/furniture-optimized.js
// Debe ser: https://wa.me/50237688618
```

## 📱 Contacto

- **WhatsApp:** 3768 8618
- **Email:** marquiro17@gmail.com
- **Ubicación:** Guatemala, Guatemala

## 🎯 Próximos Pasos (Opcional)

1. **Dominio Personalizado:** Settings → Domains
2. **Email Service:** Ver `EMAIL_SETUP.md`
3. **Analytics:** Vercel incluye analytics básicos
4. **Optimizaciones:** Ver `SEO_PERFORMANCE_GUIDE.md`

---

**¿Necesitas ayuda?** Revisa `DEPLOYMENT_GUIDE.md` para guía completa.
