#!/bin/bash

# Image Optimization Script for Muebles Yeco
# Principal Engineer - Performance Optimization

echo "🎨 Image Optimization Script"
echo "=============================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Installing..."
    echo "Run: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed for WebP conversion
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp not found. Installing..."
    echo "Run: brew install webp"
    exit 1
fi

echo "✅ Required tools found"
echo ""

# Create optimized directory
mkdir -p images/optimized
mkdir -p images/webp

# 1. CRITICAL: Optimize Logo (826 KiB → ~5 KiB)
echo "📦 Optimizing logo..."
if [ -f "logo-transparent.png" ]; then
    # Create 40x40 version (navbar)
    convert logo-transparent.png -resize 40x40 -quality 90 logo-40.png
    cwebp -q 90 logo-40.png -o logo-40.webp
    
    # Create 80x80 version (2x retina)
    convert logo-transparent.png -resize 80x80 -quality 90 logo-80.png
    cwebp -q 90 logo-80.png -o logo-80.webp
    
    # Create 48x48 version (admin)
    convert logo-transparent.png -resize 48x48 -quality 90 logo-48.png
    cwebp -q 90 logo-48.png -o logo-48.webp
    
    # Create 96x96 version (2x admin)
    convert logo-transparent.png -resize 96x96 -quality 90 logo-96.png
    cwebp -q 90 logo-96.png -o logo-96.webp
    
    # Create favicon sizes
    convert logo-transparent.png -resize 32x32 -quality 90 favicon-32.png
    convert logo-transparent.png -resize 16x16 -quality 90 favicon-16.png
    
    echo "✅ Logo optimized:"
    ls -lh logo-*.png logo-*.webp 2>/dev/null | awk '{print "   "$9" - "$5}'
else
    echo "❌ logo-transparent.png not found"
fi

echo ""

# 2. Optimize Gallery Images
echo "📸 Optimizing gallery images..."
count=0
for img in images/*.jpeg images/*.jpg images/*.png 2>/dev/null; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        ext="${filename##*.}"
        
        echo "   Processing: $filename"
        
        # Create optimized JPEG/PNG
        convert "$img" -strip -quality 85 -resize '1200x1200>' "images/optimized/$filename"
        
        # Create WebP version
        cwebp -q 85 "$img" -o "images/webp/${name}.webp" -resize 1200 0
        
        # Create thumbnail (300x300)
        convert "$img" -strip -quality 80 -resize '300x300^' -gravity center -extent 300x300 "images/optimized/${name}-thumb.${ext}"
        cwebp -q 80 "images/optimized/${name}-thumb.${ext}" -o "images/webp/${name}-thumb.webp"
        
        count=$((count + 1))
    fi
done

echo "✅ Optimized $count gallery images"
echo ""

# 3. Generate size comparison report
echo "📊 Size Comparison Report"
echo "========================="
echo ""

if [ -f "logo-transparent.png" ] && [ -f "logo-40.png" ]; then
    original_size=$(stat -f%z "logo-transparent.png")
    optimized_size=$(stat -f%z "logo-40.png")
    savings=$((original_size - optimized_size))
    percent=$((savings * 100 / original_size))
    
    echo "Logo Optimization:"
    echo "  Original:  $(numfmt --to=iec-i --suffix=B $original_size)"
    echo "  Optimized: $(numfmt --to=iec-i --suffix=B $optimized_size)"
    echo "  Savings:   $(numfmt --to=iec-i --suffix=B $savings) ($percent%)"
    echo ""
fi

# Calculate total savings
if [ -d "images/optimized" ]; then
    original_total=0
    optimized_total=0
    
    for img in images/*.jpeg images/*.jpg images/*.png 2>/dev/null; do
        if [ -f "$img" ]; then
            original_total=$((original_total + $(stat -f%z "$img")))
        fi
    done
    
    for img in images/optimized/*.jpeg images/optimized/*.jpg images/optimized/*.png 2>/dev/null; do
        if [ -f "$img" ]; then
            optimized_total=$((optimized_total + $(stat -f%z "$img")))
        fi
    done
    
    if [ $original_total -gt 0 ]; then
        total_savings=$((original_total - optimized_total))
        total_percent=$((total_savings * 100 / original_total))
        
        echo "Gallery Images:"
        echo "  Original:  $(numfmt --to=iec-i --suffix=B $original_total)"
        echo "  Optimized: $(numfmt --to=iec-i --suffix=B $optimized_total)"
        echo "  Savings:   $(numfmt --to=iec-i --suffix=B $total_savings) ($total_percent%)"
    fi
fi

echo ""
echo "🎉 Optimization Complete!"
echo ""
echo "Next steps:"
echo "1. Update HTML to use optimized images"
echo "2. Implement <picture> element with WebP"
echo "3. Add responsive srcset attributes"
echo "4. Test on production"
