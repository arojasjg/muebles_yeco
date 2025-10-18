# 🚀 Checklist de Deployment - Muebles Yeco

## ✅ Pre-Deployment (Completado)

- [x] **Código funcional** - Todas las páginas cargan correctamente
- [x] **APIs implementadas** - 6 endpoints serverless configurados
- [x] **Variables de entorno** - Archivo .env configurado
- [x] **Configuración Vercel** - vercel.json optimizado
- [x] **Tests creados** - Sistema de pruebas implementado
- [x] **Documentación** - Guías completas disponibles

---

## 🌐 Deployment a Vercel

### Paso 1: Preparar el Deployment

```bash
# Verificar que estás en el directorio correcto
pwd
# Debe mostrar: /ruta/a/tu/proyecto/catalogo

# Verificar archivos principales
ls -la index.html admin.html vercel.json package.json
```

### Paso 2: Instalar Vercel CLI (si no está instalado)

```bash
npm install -g vercel
```

### Paso 3: Login a Vercel

```bash
vercel login
# Seguir las instrucciones para autenticarse
```

### Paso 4: Deploy Inicial

```bash
# Deploy de prueba
vercel

# Seguir el wizard:
# ? Set up and deploy "~/catalogo"? [Y/n] Y
# ? Which scope do you want to deploy to? [tu-usuario]
# ? Link to existing project? [y/N] N
# ? What's your project's name? muebles-yeco
# ? In which directory is your code located? ./
```

### Paso 5: Configurar Variables de Entorno

En el dashboard de Vercel (https://vercel.com/dashboard):

1. Ve a tu proyecto "muebles-yeco"
2. Click en "Settings" → "Environment Variables"
3. Agregar las siguientes variables:

```bash
# Admin Credentials
ADMIN_USERNAME = admin
ADMIN_PASSWORD_HASH = [tu-hash-generado]

# Gmail Integration
GMAIL_USER = [tu-email@gmail.com]
GMAIL_PASS = [tu-app-password]

# JWT Security
JWT_SECRET = [tu-jwt-secret-seguro]
```

### Paso 6: Deploy a Producción

```bash
vercel --prod
```

---

## 🧪 Post-Deployment Testing

### Verificar URLs Principales

```bash
# Reemplaza 'tu-dominio' con tu URL de Vercel
curl -I https://tu-dominio.vercel.app/
curl -I https://tu-dominio.vercel.app/admin
```

### Test Completo en Producción

1. Visita: `https://tu-dominio.vercel.app/test-complete-site.html`
2. Ejecuta todos los tests automáticos
3. Verifica que todos pasen ✅

### Verificar Funcionalidades Clave

#### ✅ Página Principal

- [ ] Carga sin errores
- [ ] Información de Muebles Yeco visible
- [ ] Botón WhatsApp funcional
- [ ] Galería de imágenes carga
- [ ] Formulario de contacto presente

#### ✅ Panel de Administración

- [ ] Accesible en `/admin`
- [ ] Formulario de login visible
- [ ] Estilos aplicados correctamente
- [ ] Responsive en móviles

#### ✅ APIs Funcionando

- [ ] `/api/gallery-public.js` responde
- [ ] `/api/contact.js` acepta POST
- [ ] `/api/admin/auth.js` maneja autenticación
- [ ] `/api/admin/gallery.js` gestiona imágenes

#### ✅ Integración WhatsApp

- [ ] Número correcto: +502 3768 8618
- [ ] Mensaje predefinido en español
- [ ] Link abre WhatsApp correctamente

---

## 🔧 Configuración Adicional

### Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Agregar tu dominio personalizado
3. Configurar DNS según las instrucciones

### Monitoreo y Analytics

1. Activar Vercel Analytics en el dashboard
2. Configurar alertas de uptime
3. Revisar métricas de performance

### Backup y Versionado

```bash
# Crear tag de la versión estable
git tag -a v1.0 -m "Versión inicial estable"
git push origin v1.0
```

---

## 🚨 Troubleshooting

### Problemas Comunes

#### 404 en APIs

```bash
# Verificar que las APIs están en /api/
ls -la api/
# Verificar vercel.json
cat vercel.json
```

#### 500 Internal Server Error

```bash
# Revisar logs en Vercel Dashboard
# Functions → Ver logs de la función específica
```

#### Variables de Entorno No Funcionan

1. Verificar en Vercel Dashboard → Settings → Environment Variables
2. Asegurar que están en "Production" environment
3. Re-deploy después de cambios: `vercel --prod`

#### Admin Login No Funciona

```bash
# Verificar hash de contraseña
node generate-hash.js
# Actualizar ADMIN_PASSWORD_HASH en Vercel
```

---

## 📞 Contacto y Soporte

### Información del Proyecto

- **Empresa:** Muebles Yeco
- **Ubicación:** Guatemala, Guatemala
- **Teléfono:** 3768 8618
- **Email:** marquiro17@gmail.com

### URLs de Producción

- **Sitio Web:** https://[tu-dominio].vercel.app/
- **Admin Panel:** https://[tu-dominio].vercel.app/admin
- **Tests:** https://[tu-dominio].vercel.app/test-complete-site.html

---

## ✅ Checklist Final

- [ ] **Deployment exitoso** - Vercel muestra "Ready"
- [ ] **Variables configuradas** - Todas las env vars en Vercel
- [ ] **URLs funcionando** - Sitio y admin accesibles
- [ ] **APIs respondiendo** - Todos los endpoints operativos
- [ ] **Tests pasando** - Página de tests muestra ✅
- [ ] **WhatsApp funcional** - Botón redirige correctamente
- [ ] **Formulario contacto** - Emails se envían correctamente
- [ ] **Admin panel** - Login y gestión funcionando
- [ ] **Responsive design** - Funciona en móviles
- [ ] **Performance óptimo** - Carga rápida

---

## 🎉 ¡Deployment Completado!

Una vez que todos los items estén marcados ✅, tu sitio web de Muebles Yeco estará completamente operativo en producción.

**¡Felicidades! 🎊 Tu sitio web profesional está listo para recibir clientes.**
