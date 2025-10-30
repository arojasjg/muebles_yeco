# 🔍 Debug Admin Login - Paso a Paso

## 🎯 Herramienta de Debug Creada

He creado `test-admin-login.html` que te ayudará a identificar exactamente qué está fallando.

## 📋 Pasos para Resolver

### Paso 1: Usar la Herramienta de Debug

1. **Abre el archivo de prueba**:

   ```
   http://localhost:8888/catalogo/test-admin-login.html
   ```

   (O el puerto que uses en MAMP)

2. **Click en "Test Original Auth"**

3. **Lee los logs** - te dirán exactamente qué está fallando:
   - ✅ Si ves "LOGIN SUCCESSFUL" → El problema está en otro lado
   - ❌ Si ves "Invalid credentials" → Problema de autenticación
   - ❌ Si ves "Failed to fetch" → Problema de servidor/CORS
   - ❌ Si ves "404" → API no existe

### Paso 2: Soluciones Según el Error

#### Error: "Failed to fetch" o "Network Error"

**Causa**: Estás abriendo el archivo directamente (file://) o el servidor no está corriendo

**Solución**:

```bash
# Opción 1: MAMP (si ya lo tienes)
# Asegúrate que MAMP esté corriendo
# Accede vía: http://localhost:8888/catalogo/admin.html

# Opción 2: Python
cd /Applications/MAMP/htdocs/catalogo
python3 -m http.server 8000
# Accede vía: http://localhost:8000/admin.html

# Opción 3: Vercel Dev (para APIs)
vercel dev
# Accede vía: http://localhost:3000/admin.html
```

#### Error: "Invalid credentials" (Username mismatch)

**Causa**: El username no coincide

**Solución**:

1. Verifica que estés usando exactamente: `marquiro17` (sin espacios)
2. En Vercel, verifica que `ADMIN_USERNAME=marquiro17`
3. Copia y pega el username para evitar typos

#### Error: "Invalid credentials" (Password mismatch)

**Causa**: El password o el hash no coinciden

**Solución Rápida - Usar Auth Simple**:

1. **Modifica `js/admin.js`** para usar el endpoint simple:

Busca esta línea (aproximadamente línea 162):

```javascript
const response = await fetch("/api/admin/auth", {
```

Cámbiala a:

```javascript
const response = await fetch("/api/admin/auth-simple", {
```

2. **Guarda y prueba de nuevo**

El endpoint `auth-simple` NO usa bcrypt, solo compara strings directamente.

#### Error: "404 Not Found"

**Causa**: Las APIs no están desplegadas o no existen

**Solución**:

1. Si estás en local: Usa `vercel dev` para que las APIs funcionen
2. Si estás en producción: Verifica que el deployment se completó
3. Verifica que los archivos existan en `api/admin/auth.js`

### Paso 3: Solución Temporal - Bypass Auth (Solo Desarrollo)

Si necesitas acceso urgente para desarrollo local:

1. **Abre `js/admin.js`**

2. **Busca la función `checkAuthentication()`** (línea ~200)

3. **Agrega esto al inicio de la función**:

```javascript
checkAuthentication() {
  // TEMPORARY: Skip auth for development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.warn('⚠️ DEV MODE: Authentication bypassed');
    this.showDashboard();
    return;
  }

  // ... resto del código
}
```

**⚠️ IMPORTANTE**: Esto es SOLO para desarrollo local. Quítalo antes de subir a producción.

### Paso 4: Verificar Variables de Entorno en Vercel

Si estás en producción (Vercel):

1. **Ve a Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Verifica que existan**:
   ```
   ADMIN_USERNAME
   ADMIN_PASSWORD_HASH
   JWT_SECRET
   ```
4. **Si no existen, agrégalas**:
   ```
   ADMIN_USERNAME = marquiro17
   ADMIN_PASSWORD_HASH = $2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQXvbVxVPBn5kYk.H8xQjL8VqeS.
   JWT_SECRET = muebles-yeco-super-secret-jwt-key-2025
   ```
5. **Redeploy** el proyecto

### Paso 5: Ver Logs del Servidor

#### En Vercel:

1. Dashboard → Tu Proyecto → Deployments
2. Click en el último deployment
3. Click en "Function Logs"
4. Busca logs de `/api/admin/auth`
5. Verás exactamente qué está fallando

#### En Local (Vercel Dev):

Los logs aparecen en la terminal donde ejecutaste `vercel dev`

## 🔧 Archivos Creados para Ayudarte

### 1. `test-admin-login.html`

Herramienta de debug visual que te muestra exactamente qué está fallando.

### 2. `api/admin/auth-simple.js`

Versión simplificada de autenticación SIN bcrypt. Usa comparación directa de strings.

### 3. `api/admin/auth.js` (modificado)

Agregué logs de debug para ver qué está pasando.

## 📊 Checklist de Verificación

Marca cada item:

- [ ] Estoy accediendo vía HTTP (no file://)
- [ ] El servidor está corriendo (MAMP/Python/Vercel dev)
- [ ] Username es exactamente: `marquiro17` (sin espacios)
- [ ] Password es exactamente: `marquiro17!@#$`
- [ ] Si es Vercel: Variables de entorno están configuradas
- [ ] Si es Vercel: Hice redeploy después de agregar variables
- [ ] Probé con `test-admin-login.html` y vi los logs
- [ ] No hay errores de CORS en la consola del navegador

## 🎯 Solución Más Rápida

**Para desarrollo local inmediato**:

1. Abre `js/admin.js`
2. Busca línea ~162: `fetch("/api/admin/auth"`
3. Cámbiala a: `fetch("/api/admin/auth-simple"`
4. Guarda
5. Refresca `admin.html`
6. Login con: `marquiro17` / `marquiro17!@#$`

Esto usa el endpoint simple que NO requiere bcrypt y debería funcionar inmediatamente.

## 📞 Si Aún No Funciona

Abre `test-admin-login.html` y:

1. Click en "Test Simple Auth"
2. Copia TODOS los logs que aparecen
3. Compártelos para ver exactamente qué está fallando

Los logs te dirán:

- ✅ Qué endpoint se está usando
- ✅ Qué username/password se está enviando
- ✅ Qué respuesta está devolviendo el servidor
- ✅ Cualquier error de red o CORS

---

**Próximo paso**: Abre `test-admin-login.html` y prueba el login. Los logs te dirán exactamente qué está mal.
