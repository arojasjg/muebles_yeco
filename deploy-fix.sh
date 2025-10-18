#!/bin/bash

# Deploy Fix Script - Muebles Yeco
# Aplica el fix para imágenes subidas y re-deploya a Vercel

echo "🔧 Aplicando Fix para Imágenes Subidas - Muebles Yeco"
echo "=================================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: No se encuentra vercel.json. Ejecuta desde el directorio del proyecto."
    exit 1
fi

echo "✅ Directorio del proyecto verificado"

# Verificar archivos del fix
echo "🔍 Verificando archivos del fix..."

files_to_check=(
    "api/images/[filename].js"
    "api/shared/gallery-data.js"
    "vercel.json"
    "UPLOAD_IMAGE_FIX.md"
    "test-image-fix.html"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file - FALTANTE"
        exit 1
    fi
done

echo "✅ Todos los archivos del fix están presentes"

# Verificar que Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado"
    echo "💡 Instalar con: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI disponible"

# Mostrar resumen del fix
echo ""
echo "📋 Resumen del Fix:"
echo "  • API dinámica para imágenes subidas: /api/images/[filename].js"
echo "  • Soporte Base64 en galería compartida"
echo "  • Rewrite rules actualizadas en vercel.json"
echo "  • Sistema unificado para imágenes estáticas y subidas"
echo ""

# Confirmar deployment
read -p "🚀 ¿Proceder con el deployment a producción? (y/N): " confirm

if [[ $confirm != [yY] && $confirm != [yY][eE][sS] ]]; then
    echo "❌ Deployment cancelado"
    exit 0
fi

echo "🚀 Iniciando deployment a Vercel..."

# Deploy a producción
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ¡Deployment exitoso!"
    echo ""
    echo "🧪 Próximos pasos:"
    echo "  1. Verificar que el sitio carga: https://muebles-yeco.vercel.app/"
    echo "  2. Probar admin panel: https://muebles-yeco.vercel.app/admin"
    echo "  3. Ejecutar tests: https://muebles-yeco.vercel.app/test-image-fix.html"
    echo "  4. Verificar que no hay errores 404 en imágenes"
    echo ""
    echo "🔧 Si persisten problemas:"
    echo "  • Revisar logs en Vercel Dashboard"
    echo "  • Verificar variables de entorno"
    echo "  • Limpiar cache del navegador (Ctrl+F5)"
    echo ""
    echo "✅ Fix aplicado correctamente"
else
    echo "❌ Error en el deployment"
    echo "💡 Revisar logs y intentar nuevamente"
    exit 1
fi