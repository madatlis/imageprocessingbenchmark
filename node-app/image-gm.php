<?php
$starttime = microtime(true);

for ($i = 0; $i < 100; $i++) {
  processImage();
}

processImage();

$endtime = microtime(true);

print $endtime - $starttime . " " . (memory_get_peak_usage(true) / 1048576);

function processImage() {
  // The file
  $filename = 'src-images/space_shuttle_discovery-wide.jpg';
  $source = $filename;
  $dest = 'generated/3.jpg';

  exec('gm convert ' . $source . ' -resize 50% -quality 75% ' . $dest);
}