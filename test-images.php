<?php
// Test page to verify image loading
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test Images</title>
    <style>
        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .test-item {
            border: 2px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            background: #f0f0f0;
        }
        .test-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }
        .test-item p {
            padding: 10px;
            margin: 0;
            font-size: 12px;
            background: white;
        }
        .debug {
            background: #e0e0e0;
            padding: 15px;
            margin: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Image Loading Test</h1>
    
    <div class="debug">
        <h3>Debug Information:</h3>
        <?php
        $imagesDir = __DIR__ . '/images/';
        echo "<p><strong>Images directory:</strong> " . $imagesDir . "</p>";
        echo "<p><strong>Directory exists:</strong> " . (is_dir($imagesDir) ? 'Yes' : 'No') . "</p>";
        echo "<p><strong>Directory readable:</strong> " . (is_readable($imagesDir) ? 'Yes' : 'No') . "</p>";
        
        if (is_dir($imagesDir)) {
            $files = scandir($imagesDir);
            $imageFiles = [];
            foreach ($files as $file) {
                if ($file != '.' && $file != '..' && $file != 'README.md') {
                    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                    if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                        $imageFiles[] = $file;
                    }
                }
            }
            echo "<p><strong>Image files found:</strong> " . count($imageFiles) . "</p>";
            echo "<p><strong>Files:</strong> " . implode(', ', array_slice($imageFiles, 0, 5)) . (count($imageFiles) > 5 ? '...' : '') . "</p>";
        }
        ?>
    </div>
    
    <div class="test-grid">
        <?php
        if (is_dir($imagesDir)) {
            $files = scandir($imagesDir);
            $count = 0;
            foreach ($files as $file) {
                if ($file != '.' && $file != '..' && $file != 'README.md') {
                    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                    if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                        $filePath = 'images/' . $file;
                        $fileSize = filesize($imagesDir . $file);
                        echo '<div class="test-item">';
                        echo '<img src="' . htmlspecialchars($filePath) . '" alt="' . htmlspecialchars($file) . '" onload="console.log(\'Loaded: ' . $file . '\')" onerror="console.error(\'Failed to load: ' . $file . '\')">';
                        echo '<p><strong>' . htmlspecialchars($file) . '</strong><br>';
                        echo 'Size: ' . number_format($fileSize / 1024, 1) . ' KB</p>';
                        echo '</div>';
                        $count++;
                        if ($count >= 12) break; // Limit to first 12 images
                    }
                }
            }
        }
        ?>
    </div>
    
    <script>
        console.log('Test page loaded');
        
        // Count loaded images
        let loadedCount = 0;
        let totalImages = document.querySelectorAll('.test-item img').length;
        
        document.querySelectorAll('.test-item img').forEach((img, index) => {
            img.addEventListener('load', function() {
                loadedCount++;
                console.log(`Image ${index + 1} loaded: ${this.src}`);
                if (loadedCount === totalImages) {
                    console.log('All images loaded successfully!');
                }
            });
            
            img.addEventListener('error', function() {
                console.error(`Failed to load image ${index + 1}: ${this.src}`);
            });
        });
        
        setTimeout(() => {
            console.log(`Loaded ${loadedCount}/${totalImages} images`);
        }, 3000);
    </script>
</body>
</html>