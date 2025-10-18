#!/bin/bash
# Script para iniciar el servidor de desarrollo de la galería

echo "🚀 Iniciando Image Gallery PDF Server..."
echo "📂 Directorio: ~/Sites/catalogo"
echo "🌐 URL: http://localhost:8000"
echo ""
echo "✨ Funcionalidades disponibles:"
echo "   • Carga automática de imágenes desde /images/"
echo "   • Subida de nuevas imágenes"
echo "   • Generación de PDFs"
echo "   • Galería responsiva con lightbox"
echo ""
echo "⏹️  Para detener el servidor: Ctrl+C"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Cambiar al directorio del proyecto
cd ~/Sites/catalogo

# Iniciar el servidor PHP
php -S localhost:8000