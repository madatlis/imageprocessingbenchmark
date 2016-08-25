<?php
$starttime = microtime(true);

for ($i = 0; $i < 100; $i++) {
  processImage();
}

$endtime = microtime(true);

print $endtime - $starttime . " " . (memory_get_peak_usage(true) / 1048576);

function processImage() {
  // The file
  $filename = 'src-images/space_shuttle_discovery-wide.jpg';
  $percent = 0.5;

// Get new dimensions
  list($width, $height) = getimagesize($filename);
  $new_width = $width * $percent;
  $new_height = $height * $percent;

// Resample
  $image_p = imagecreatetruecolor($new_width, $new_height);
  $image = imagecreatefromjpeg($filename);
  imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

// Output
  imagejpeg($image_p, 'generated/1.jpg', 75);

  imagedestroy($image_p);
  imagedestroy($image);
}