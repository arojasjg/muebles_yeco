<?php
/**
 * Image Delete Handler
 * Handles deletion of images from the images directory
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$uploadDir = __DIR__ . '/images/';

/**
 * Handles image deletion
 */
function handleDelete() {
    global $uploadDir;
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        return ['error' => 'Method not allowed'];
    }
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['imageName']) || empty($input['imageName'])) {
        http_response_code(400);
        return ['error' => 'Image name is required'];
    }
    
    $imageName = $input['imageName'];
    
    // Validate filename (security check)
    if (strpos($imageName, '..') !== false || strpos($imageName, '/') !== false) {
        http_response_code(400);
        return ['error' => 'Invalid filename'];
    }
    
    $filePath = $uploadDir . $imageName;
    
    // Check if file exists
    if (!file_exists($filePath)) {
        http_response_code(404);
        return ['error' => 'Image not found'];
    }
    
    // Check if it's actually a file (not a directory)
    if (!is_file($filePath)) {
        http_response_code(400);
        return ['error' => 'Invalid file'];
    }
    
    // Attempt to delete the file
    if (unlink($filePath)) {
        return [
            'success' => true,
            'message' => "Image '$imageName' deleted successfully"
        ];
    } else {
        http_response_code(500);
        return ['error' => 'Failed to delete image'];
    }
}

// Handle the request
try {
    $result = handleDelete();
    echo json_encode($result);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>