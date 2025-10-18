<?php
/**
 * Admin Panel Handler
 * Handles gallery metadata, categories, and image information
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Password');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$adminPassword = 'admin123'; // Change this to your desired password
$dataFile = __DIR__ . '/gallery_data.json';

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
 * Loads gallery data from JSON file
 */
function loadGalleryData() {
    global $dataFile;
    
    if (!file_exists($dataFile)) {
        return [
            'title' => 'Mi Galería de Imágenes',
            'description' => 'Colección de imágenes profesionales',
            'categories' => [],
            'images' => []
        ];
    }
    
    $content = file_get_contents($dataFile);
    $data = json_decode($content, true);
    
    if ($data === null) {
        return [
            'title' => 'Mi Galería de Imágenes',
            'description' => 'Colección de imágenes profesionales',
            'categories' => [],
            'images' => []
        ];
    }
    
    return $data;
}

/**
 * Saves gallery data to JSON file
 */
function saveGalleryData($data) {
    global $dataFile;
    
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($dataFile, $json) !== false;
}

/**
 * Handles GET requests
 */
function handleGet() {
    if ($_GET['action'] === 'getData') {
        $data = loadGalleryData();
        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
    }
}

/**
 * Handles POST requests
 */
function handlePost() {
    if (!validateAdminPassword()) {
        echo json_encode(['error' => 'Unauthorized: Admin password required']);
        return;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['action'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        return;
    }
    
    $action = $input['action'];
    $data = loadGalleryData();
    
    switch ($action) {
        case 'saveGallerySettings':
            if (isset($input['data']['title'])) {
                $data['title'] = $input['data']['title'];
            }
            if (isset($input['data']['description'])) {
                $data['description'] = $input['data']['description'];
            }
            break;
            
        case 'addCategory':
            if (isset($input['category']) && !empty($input['category'])) {
                $category = trim($input['category']);
                if (!in_array($category, $data['categories'])) {
                    $data['categories'][] = $category;
                }
            }
            break;
            
        case 'removeCategory':
            if (isset($input['index']) && is_numeric($input['index'])) {
                $index = (int)$input['index'];
                if (isset($data['categories'][$index])) {
                    array_splice($data['categories'], $index, 1);
                }
            }
            break;
            
        case 'updateImageData':
            if (isset($input['imageName']) && isset($input['field']) && isset($input['value'])) {
                $imageName = $input['imageName'];
                $field = $input['field'];
                $value = $input['value'];
                
                if (!isset($data['images'][$imageName])) {
                    $data['images'][$imageName] = [
                        'title' => 'Imagen',
                        'description' => '',
                        'category' => '',
                        'price' => ''
                    ];
                }
                
                $data['images'][$imageName][$field] = $value;
            }
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
            return;
    }
    
    if (saveGalleryData($data)) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save data']);
    }
}

// Handle the request
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGet();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePost();
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
