<?php
// Simple test file to check if PHP is working
echo "PHP is working! Current time: " . date('Y-m-d H:i:s');
echo "<br>";
echo "Document root: " . $_SERVER['DOCUMENT_ROOT'];
echo "<br>";
echo "Current directory: " . __DIR__;
echo "<br>";
echo "Images directory exists: " . (is_dir(__DIR__ . '/images') ? 'Yes' : 'No');
echo "<br>";
echo "Images directory writable: " . (is_writable(__DIR__ . '/images') ? 'Yes' : 'No');

// Test the upload.php endpoint
echo "<br><br>";
echo "<a href='upload.php'>Test upload.php endpoint</a>";
echo "<br>";
echo "<a href='index.php'>Go to main gallery</a>";
?>