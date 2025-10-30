# 🚀 Cómo Iniciar el Servidor Correctamente

## 🎯 El Problema

Estás viendo **404 Not Found nginx/1.27.2** porque:

- ❌ MAMP/nginx solo sirve archivos estáticos (HTML, CSS, JS)
- ❌ NO puede ejecutar las APIs de Vercel (funciones serverless)
- ❌ Las rutas `/api/*` no existen en un servidor estático

## ✅ Solución: Usar Vercel Dev

Vercel Dev ejecuta tanto el frontend como las APIs localmente.

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Iniciar Servidor de Desarrollo

```bash
# En el directorio del proyecto
cd /Applications/MAMP/htdocs/catalogo

# Iniciar Vercel Dev
vercel dev
```

### Paso 3: Acceder al Admin Panel

```
http://localhost:3000/admin.html
```

### Paso 4: Login

```
Username: marquiro17
Password: marquiro17!@#$
```

## 🔧 Alternativa: Modo Desarrollo Sin APIs

Si no puedes usar Vercel Dev, puedes trabajar en modo desarrollo sin APIs:

### Opción A: Bypass Completo (Desarrollo Local)

Edita `js/admin.js` y agrega esto al inicio de la clase:

```javascript
class AdminPanel {
  constructor() {
    // DEVELOPMENT MODE: Skip authentication
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.warn("⚠️ DEV MODE: Authentication bypassed");
      this.token = "dev-token";
      this.currentSection = "gallery";
      this.galleryData = { images: [], videos: [] };
      this.uploadedFile = null;
      this.init();
      setTimeout(() => this.showDashboard(), 100);
      return;
    }

    // Normal initialization
    this.token = localStorage.getItem("adminToken");
    this.currentSection = "gallery";
    this.galleryData = { images: [], videos: [] };
    this.uploadedFile = null;
    this.init();
  }
  // ... resto del código
}
```

**⚠️ IMPORTANTE**: Esto es SOLO para desarrollo. Quítalo antes de producción.

### Opción B: Mock de APIs

Crea un archivo `js/mock-api.js`:

```javascript
// Mock API for development without Vercel
window.mockAPI = {
  async login(username, password) {
    if (username === "marquiro17" && password === "marquiro17!@#$") {
      return {
        success: true,
        token: "mock-token-" + Date.now(),
        user: { username, role: "admin" },
      };
    }
    throw new Error("Invalid credentials");
  },

  async getGallery() {
    return {
      success: true,
      data: {
        images: [],
        videos: [],
        total: 0,
      },
    };
  },
};
```

Luego en `admin.html`, agrega antes de `admin.js`:

```html
<script src="js/mock-api.js"></script>
```

## 📋 Comparación de Opciones

### Opción 1: Vercel Dev (RECOMENDADO)

✅ APIs funcionan completamente
✅ Igual que producción
✅ Fácil de usar
❌ Requiere Node.js y Vercel CLI

**Comando**:

```bash
vercel dev
```

**URL**: http://localhost:3000/admin.html

### Opción 2: MAMP + Bypass Auth

✅ No requiere instalación
✅ Rápido para desarrollo frontend
❌ APIs no funcionan
❌ Solo para desarrollo

**URL**: http://localhost:8888/catalogo/admin.html

### Opción 3: Python Server + Bypass Auth

✅ Simple y rápido
✅ No requiere instalación (Python viene con macOS)
❌ APIs no funcionan
❌ Solo para desarrollo

**Comando**:

```bash
python3 -m http.server 8000
```

**URL**: http://localhost:8000/admin.html

## 🎯 Recomendación

**Para desarrollo completo con APIs**:

```bash
vercel dev
```

**Para desarrollo rápido de frontend sin APIs**:

```bash
python3 -m http.server 8000
# + Bypass auth en js/admin.js
```

## 🔍 Verificar Qué Servidor Estás Usando

Abre la consola del navegador (F12) y ejecuta:

```javascript
console.log("Protocol:", window.location.protocol);
console.log("Host:", window.location.host);
console.log("Port:", window.location.port);
```

**Si ves**:

- `localhost:3000` → Vercel Dev ✅ (APIs funcionan)
- `localhost:8888` → MAMP ❌ (APIs no funcionan)
- `localhost:8000` → Python ❌ (APIs no funcionan)
- `file://` → Archivo directo ❌ (Nada funciona)

## 🚨 Error Actual: 404 nginx

Estás viendo este error porque:

1. Estás usando MAMP (nginx)
2. MAMP no puede ejecutar `/api/admin/auth-simple`
3. Necesitas Vercel Dev para las APIs

**Solución inmediata**:

```bash
cd /Applications/MAMP/htdocs/catalogo
vercel dev
```

Luego abre: http://localhost:3000/admin.html

---

**Resumen**: Usa `vercel dev` para que las APIs funcionen, o usa bypass auth si solo necesitas el frontend.
