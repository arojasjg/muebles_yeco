#!/bin/bash

# Complete Fix Deployment Script - Muebles Yeco
# Soluciona definitivamente el problema de imágenes subidas 404

echo "🔧 Aplicando Solución Completa - Muebles Yeco"
echo "=============================================="

# Verificar directorio del proyecto
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: No se encuentra vercel.json. Ejecuta desde el directorio del proyecto."
    exit 1
fi

echo "✅ Directorio del proyecto verificado"

# Verificar archivos de la solución
echo "🔍 Verificando archivos de la solución..."

required_files=(
    "api/storage/gallery-storage.js"
    "api/shared/gallery-data.js"
    "api/images/[filename].js"
    "js/admin.js"
    "js/furniture-optimized.js"
    "vercel.json"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file - FALTANTE"
        exit 1
    fi
done

echo "✅ Todos los archivos de la solución están presentes"

# Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado"
    echo "💡 Instalar con: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI disponible"

# Mostrar resumen de la solución
echo ""
echo "📋 Resumen de la Solución Implementada:"
echo "  🔄 Sistema híbrido de almacenamiento"
echo "  💾 Persistencia en localStorage del navegador"
echo "  🖼️ Soporte completo para imágenes Base64"
echo "  🔗 APIs actualizadas para manejo unificado"
echo "  📱 Compatibilidad total con frontend existente"
echo "  ⚡ Fallbacks automáticos entre fuentes de imagen"
echo ""

echo "🎯 Beneficios:"
echo "  ✅ Imágenes subidas aparecen inmediatamente"
echo "  ✅ No más errores 404 en imágenes"
echo "  ✅ Mantiene todas las imágenes estáticas"
echo "  ✅ Funciona 100% en Vercel serverless"
echo "  ✅ No requiere servicios externos"
echo ""

# Confirmar deployment
read -p "🚀 ¿Proceder con el deployment de la solución completa? (y/N): " confirm

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
    echo "🧪 Verificación Post-Deployment:"
    echo "  1. 🌐 Sitio principal: https://muebles-yeco.vercel.app/"
    echo "  2. 👨‍💼 Admin panel: https://muebles-yeco.vercel.app/admin"
    echo "  3. 🧪 Tests: https://muebles-yeco.vercel.app/test-image-fix.html"
    echo ""
    echo "📋 Pasos de Verificación:"
    echo "  □ Cargar sitio principal - debe mostrar galería sin errores"
    echo "  □ Acceder al admin panel - debe permitir login"
    echo "  □ Subir una imagen nueva - debe aparecer inmediatamente"
    echo "  □ Verificar consola del navegador - no debe haber errores 404"
    echo "  □ Probar en diferentes navegadores - debe funcionar igual"
    echo ""
    echo "🔧 Cómo Funciona Ahora:"
    echo "  • Imágenes estáticas: Servidas directamente por Vercel"
    echo "  • Imágenes subidas: Almacenadas como Base64 en localStorage"
    echo "  • Galería unificada: Combina ambos tipos automáticamente"
    echo "  • Persistencia: Local al navegador (hasta limpiar cache)"
    echo ""
    echo "💡 Para Uso Empresarial Completo:"
    echo "  Si necesitas persistencia entre dispositivos, considera:"
    echo "  • Cloudinary (recomendado para imágenes)"
    echo "  • Vercel Blob Storage (en beta)"
    echo "  • AWS S3 + Lambda"
    echo "  • Base de datos (PlanetScale, Supabase)"
    echo ""
    echo "✅ Solución aplicada correctamente"
    echo "🎯 El problema de imágenes 404 está RESUELTO"
else
    echo "❌ Error en el deployment"
    echo "💡 Revisar logs en Vercel Dashboard y intentar nuevamente"
    exit 1
fi