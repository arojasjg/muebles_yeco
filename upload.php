<?php
/**
 * Image Upload Handler
 * Handles file uploads to the images directory
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$uploadDir = __DIR__ . '/images/';
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$maxFileSize = 50 * 1024 * 1024; // 50MB
$maxFiles = 20; // Maximum files per upload
$adminPassword = 'admin123'; // Change this to your desired password

// Create images directory if it doesn't exist
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create upload directory']);
        exit();
    }
}

/**
 * Validates admin password
 */
function validateAdminPassword() {
    global $adminPassword;
    
    $headers = getallheaders();
    $password = $headers['X-Admin-Password'] ?? '';
    
    if ($password !== $adminPassword) {
        http_response_code(401);
        return false;
    }
    
    return true;
}

/**
 * Handles file upload
 */
function handleUpload() {
    global $uploadDir, $allowedTypes, $maxFileSize, $maxFiles;
    
    // Check admin password for uploads
    if (!validateAdminPassword()) {
        return ['error' => 'Unauthorized: Admin password required'];
    }
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        return ['error' => 'Method not allowed'];
    }
    
    if (!isset($_FILES['images']) || !is_array($_FILES['images']['name'])) {
        http_response_code(400);
        return ['error' => 'No files uploaded'];
    }
    
    $files = $_FILES['images'];
    $fileCount = count($files['name']);
    
    if ($fileCount > $maxFiles) {
        http_response_code(400);
        return ['error' => "Too many files. Maximum $maxFiles files allowed"];
    }
    
    $uploadedFiles = [];
    $errors = [];
    
    for ($i = 0; $i < $fileCount; $i++) {
        $fileName = $files['name'][$i];
        $fileTmpName = $files['tmp_name'][$i];
        $fileSize = $files['size'][$i];
        $fileError = $files['error'][$i];
        $fileType = $files['type'][$i];
        
        // Skip if no file
        if ($fileError === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        
        // Check for upload errors
        if ($fileError !== UPLOAD_ERR_OK) {
            $errors[] = "Upload error for $fileName: " . getUploadErrorMessage($fileError);
            continue;
        }
        
        // Validate file type
        if (!in_array($fileType, $allowedTypes)) {
            $errors[] = "$fileName: Unsupported file type. Allowed: JPEG, PNG, GIF, WebP";
            continue;
        }
        
        // Validate file size
        if ($fileSize > $maxFileSize) {
            $errors[] = "$fileName: File too large. Maximum size: " . formatBytes($maxFileSize);
            continue;
        }
        
        // Generate unique filename
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $uniqueFileName = generateUniqueFileName($fileName, $fileExtension);
        $targetPath = $uploadDir . $uniqueFileName;
        
        // Move uploaded file
        if (move_uploaded_file($fileTmpName, $targetPath)) {
            $uploadedFiles[] = [
                'originalName' => $fileName,
                'fileName' => $uniqueFileName,
                'size' => $fileSize,
                'type' => $fileType,
                'url' => 'images/' . $uniqueFileName
            ];
        } else {
            $errors[] = "$fileName: Failed to save file";
        }
    }
    
    return [
        'success' => true,
        'uploaded' => $uploadedFiles,
        'errors' => $errors,
        'count' => count($uploadedFiles)
    ];
}

/**
 * Lists all images in the images directory
 */
function listImages() {
    global $uploadDir, $allowedTypes;
    
    if (!is_dir($uploadDir)) {
        return ['images' => []];
    }
    
    $images = [];
    $files = scandir($uploadDir);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $filePath = $uploadDir . $file;
        
        if (!is_file($filePath)) {
            continue;
        }
        
        $mimeType = mime_content_type($filePath);
        
        if (!in_array($mimeType, $allowedTypes)) {
            continue;
        }
        
        $fileSize = filesize($filePath);
        $lastModified = filemtime($filePath);
        
        $images[] = [
            'name' => $file,
            'url' => 'images/' . $file,
            'size' => $fileSize,
            'type' => $mimeType,
            'lastModified' => $lastModified * 1000, // Convert to milliseconds for JavaScript
            'dimensions' => getImageDimensions($filePath)
        ];
    }
    
    // Sort by last modified (newest first)
    usort($images, function($a, $b) {
        return $b['lastModified'] - $a['lastModified'];
    });
    
    return ['images' => $images];
}

/**
 * Gets image dimensions
 */
function getImageDimensions($filePath) {
    $imageInfo = getimagesize($filePath);
    
    if ($imageInfo === false) {
        return null;
    }
    
    return [
        'width' => $imageInfo[0],
        'height' => $imageInfo[1]
    ];
}

/**
 * Generates a unique filename
 */
function generateUniqueFileName($originalName, $extension) {
    $baseName = pathinfo($originalName, PATHINFO_FILENAME);
    $baseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $baseName);
    $baseName = substr($baseName, 0, 50); // Limit length
    
    $timestamp = time();
    $random = substr(md5(uniqid()), 0, 8);
    
    return $baseName . '_' . $timestamp . '_' . $random . '.' . $extension;
}

/**
 * Formats bytes to human readable format
 */
function formatBytes($bytes) {
    $units = ['B', 'KB', 'MB', 'GB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    
    $bytes /= (1 << (10 * $pow));
    
    return round($bytes, 2) . ' ' . $units[$pow];
}

/**
 * Gets upload error message
 */
function getUploadErrorMessage($errorCode) {
    switch ($errorCode) {
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            return 'File too large';
        case UPLOAD_ERR_PARTIAL:
            return 'File partially uploaded';
        case UPLOAD_ERR_NO_TMP_DIR:
            return 'No temporary directory';
        case UPLOAD_ERR_CANT_WRITE:
            return 'Cannot write to disk';
        case UPLOAD_ERR_EXTENSION:
            return 'Upload stopped by extension';
        default:
            return 'Unknown upload error';
    }
}

/**
 * Handles image deletion
 */
function handleDelete() {
    global $uploadDir;
    
    // Check admin password for deletions
    if (!validateAdminPassword()) {
        return ['error' => 'Unauthorized: Admin password required'];
    }
    
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        http_response_code(405);
        return ['error' => 'Method not allowed'];
    }
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['imageName']) || empty($input['imageName'])) {
        http_response_code(400);
        return ['error' => 'Image name is required'];
    }
    
    $imageName = basename($input['imageName']); // Sanitize filename
    $filePath = $uploadDir . $imageName;
    
    // Security check: ensure file is within upload directory
    $realPath = realpath($filePath);
    $realUploadDir = realpath($uploadDir);
    
    if ($realPath === false || strpos($realPath, $realUploadDir) !== 0) {
        http_response_code(400);
        return ['error' => 'Invalid file path'];
    }
    
    // Check if file exists
    if (!file_exists($filePath)) {
        http_response_code(404);
        return ['error' => 'Image not found'];
    }
    
    // Delete the file
    if (unlink($filePath)) {
        return [
            'success' => true,
            'message' => 'Image deleted successfully',
            'deletedFile' => $imageName
        ];
    } else {
        http_response_code(500);
        return ['error' => 'Failed to delete image'];
    }
}

// Handle the request
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // List images
        $result = listImages();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Delete image
        $result = handleDelete();
    } else {
        // Upload images
        $result = handleUpload();
    }
    
    echo json_encode($result);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>