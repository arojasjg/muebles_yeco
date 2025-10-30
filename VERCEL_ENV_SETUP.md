# 🚀 Configuración de Variables de Entorno en Vercel

## 🎯 El Problema

El error "Invalid credentials" en producción (Vercel) ocurre porque:

1. Las variables de entorno locales (`.env`) **NO se suben** a Vercel automáticamente
2. Necesitas configurarlas manualmente en el dashboard de Vercel
3. El hash de la contraseña debe ser correcto

## ✅ Solución: Configurar Variables en Vercel

### Paso 1: Acceder a Vercel Dashboard

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto "catalogo" o "muebles-yeco"
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agregar Variables de Entorno

Agrega estas variables **EXACTAMENTE** como se muestran:

#### 🔐 Autenticación Admin

```
Variable Name: ADMIN_USERNAME
Value: marquiro17
Environment: Production, Preview, Development
```

```
Variable Name: ADMIN_PASSWORD_HASH
Value: $2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.
Environment: Production, Preview, Development
```

```
Variable Name: JWT_SECRET
Value: muebles-yeco-super-secret-jwt-key-2025
Environment: Production, Preview, Development
```

#### 📧 Email (Nodemailer)

```
Variable Name: GMAIL_USER
Value: marquiro17@gmail.com
Environment: Production, Preview, Development
```

```
Variable Name: GMAIL_PASS
Value: marquiro17!@#$
Environment: Production, Preview, Development
```

#### 🗄️ Supabase

```
Variable Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://igyvsqhxlvbcoolnleos.supabase.co
Environment: Production, Preview, Development
```

```
Variable Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneXZzcWh4bHZiY29vbG5sZW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NzMyMTIsImV4cCI6MjA3NjM0OTIxMn0.M0hrB58AHmG3u0BZhxuxOCmlzFpZx3emPuOB8Y9Yifw
Environment: Production, Preview, Development
```

```
Variable Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneXZzcWh4bHZiY29vbG5sZW9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDc3MzIxMiwiZXhwIjoyMDc2MzQ5MjEyfQ.3NywWmH9FU7EFBQukXwyzwFB8BMNCQj1EYbt3bKOkME
Environment: Production, Preview, Development
```

```
Variable Name: SUPABASE_STORAGE_NAME
Value: muebles_yeco
Environment: Production, Preview, Development
```

### Paso 3: Re-deploy

Después de agregar las variables:

1. Ve a **Deployments**
2. Click en el último deployment
3. Click en **"Redeploy"** (tres puntos → Redeploy)
4. O simplemente haz un nuevo commit:
   ```bash
   git commit --allow-empty -m "Trigger redeploy with env vars"
   git push origin main
   ```

## 🔑 Generar Nuevo Hash de Contraseña

Si quieres cambiar la contraseña o generar un nuevo hash:

### Opción 1: Online (Rápido)

1. Ve a: https://bcrypt-generator.com/
2. Ingresa tu contraseña: `marquiro17!@#$`
3. Rounds: `10`
4. Click "Generate"
5. Copia el hash generado
6. Úsalo en Vercel como `ADMIN_PASSWORD_HASH`

### Opción 2: Node.js Script

```bash
# Instalar bcryptjs si no está instalado
npm install bcryptjs

# Crear script temporal
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('marquiro17!@#$', 10, (err, hash) => console.log('Hash:', hash));"
```

### Opción 3: Usar el Script Incluido

```bash
node scripts/generate-admin-hash.js "marquiro17!@#$"
```

## 🧪 Verificar Hash Actual

Para verificar si el hash actual es correcto:

```bash
node -e "const bcrypt = require('bcryptjs'); const hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.'; bcrypt.compare('marquiro17!@#$', hash, (err, result) => console.log('Valid:', result));"
```

Si devuelve `Valid: true`, el hash es correcto.

## 🎯 Configuración Recomendada en Vercel

### Variables PÚBLICAS (Frontend)

Estas empiezan con `NEXT_PUBLIC_` y son accesibles desde el navegador:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Variables PRIVADAS (Backend/API)

Estas solo son accesibles en las funciones serverless:

```
ADMIN_USERNAME
ADMIN_PASSWORD_HASH
JWT_SECRET
GMAIL_USER
GMAIL_PASS
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_STORAGE_NAME
```

## 🔍 Debugging en Vercel

### Ver Logs de Deployment

1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Click en el último deployment
4. Ve a **Function Logs**
5. Busca errores relacionados con autenticación

### Verificar Variables

En Vercel, puedes verificar que las variables estén configuradas:

1. **Settings** → **Environment Variables**
2. Verifica que todas estén presentes
3. Verifica que estén en los ambientes correctos (Production, Preview, Development)

### Test de API en Producción

```bash
# Reemplaza con tu URL de Vercel
curl -X POST https://tu-proyecto.vercel.app/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"marquiro17","password":"marquiro17!@#$"}'
```

Respuesta esperada:

```json
{
  "success": true,
  "token": "eyJhbGc...",
  "expiresIn": "24h"
}
```

## ⚠️ Problemas Comunes

### 1. Hash Incorrecto

**Síntoma**: "Invalid credentials" incluso con contraseña correcta

**Solución**:

- Genera un nuevo hash usando bcrypt-generator.com
- Actualiza `ADMIN_PASSWORD_HASH` en Vercel
- Redeploy

### 2. Variables No Cargadas

**Síntoma**: Error "No token provided" o variables undefined

**Solución**:

- Verifica que las variables estén en el ambiente correcto
- Redeploy después de agregar variables
- Espera 1-2 minutos para que se propaguen

### 3. CORS Error

**Síntoma**: Error de CORS al hacer login

**Solución**:

- Las APIs ya tienen configuración CORS
- Verifica que estés accediendo desde el dominio correcto
- No uses `file://` protocol

### 4. JWT Secret Faltante

**Síntoma**: Error al generar token

**Solución**:

- Agrega `JWT_SECRET` en Vercel
- Usa un valor seguro y único
- Redeploy

## 📋 Checklist de Verificación

Antes de hacer login en producción:

- [ ] Todas las variables están en Vercel Settings
- [ ] Variables están en ambiente "Production"
- [ ] Se hizo redeploy después de agregar variables
- [ ] El hash de contraseña es correcto
- [ ] JWT_SECRET está configurado
- [ ] Supabase keys están configuradas
- [ ] No hay errores en Function Logs

## 🔐 Seguridad

### Cambiar Contraseña en Producción

1. **Genera nuevo hash**:

   ```bash
   # Usa una contraseña fuerte
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('TuNuevaContraseñaSegura123!', 10, (err, hash) => console.log(hash));"
   ```

2. **Actualiza en Vercel**:

   - Settings → Environment Variables
   - Edita `ADMIN_PASSWORD_HASH`
   - Pega el nuevo hash
   - Save

3. **Redeploy**

4. **Usa la nueva contraseña** para login

### Recomendaciones de Seguridad

- ✅ Usa contraseñas fuertes (mínimo 12 caracteres)
- ✅ Incluye mayúsculas, minúsculas, números y símbolos
- ✅ Cambia la contraseña periódicamente
- ✅ No compartas las credenciales
- ✅ Usa JWT_SECRET único y complejo
- ✅ Mantén las variables de entorno privadas

## 🎉 Resumen Rápido

### Para que funcione en Vercel:

1. **Ve a Vercel Dashboard** → Tu Proyecto → Settings → Environment Variables

2. **Agrega estas 3 variables críticas**:

   ```
   ADMIN_USERNAME = marquiro17
   ADMIN_PASSWORD_HASH = $2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.
   JWT_SECRET = muebles-yeco-super-secret-jwt-key-2025
   ```

3. **Redeploy** el proyecto

4. **Login** con:
   ```
   Username: marquiro17
   Password: marquiro17!@#$
   ```

**Tiempo estimado**: 5 minutos ⏱️

---

**Estado**: Variables de entorno necesarias identificadas  
**Acción**: Configurar en Vercel Dashboard  
**Resultado esperado**: Login funcionando en producción ✅
