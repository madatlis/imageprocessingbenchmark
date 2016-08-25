# Benchmark scripts comparing GD, ImageMagick, and GraphicsMagick

## Background

We needed a way to validate the server impact of several different image resizing libraries for our Drupal site. Out of the box, Drupal uses the GD library packaged with PHP. Site administrators can also install the [ImageMagick](https://www.drupal.org/project/imagemagick) module to use either ImageMagick or GraphicsMagick.

This benchmark attempts to simulate the way that Drupal would process an image with each library.

## Requirements

- Node.js 4.x.x - For primary script runner
- PHP 5.5.x - For individual benchmark scripts
- Imagemagick
- Graphicsmagick

## Install

`npm install`

## Setting up with Docker
`docker build -t <container-name> . `
`docker run -it <container-name> bash`


## Run Test

`node runner.js`

## Preliminary Results

Running this script on a 2015 Macbook Pro, I observed the following results via the script output and Activity Monitor.

<table>
    <thead>
        <tr>
            <td>Library</td>
            <td>Processing Time</td>
            <td>PHP thread ~ Memory usage</td>
            <td>Image Processing thread ~ Memory Usage</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>PHP GD</td>
            <td>17.54 seconds</td>
            <td>23.9M</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>ImageMagick</td>
            <td>24.19 seconds</td>
            <td>5.1M</td>
            <td>33.5M</td>
        </tr>
        <tr>
            <td>GraphicsMagick</td>
            <td>21.15 seconds</td>
            <td>5.1M</td>
            <td>20.1M</td>
        </tr>
    </tbody>
</table>

## @TODO

- Improvements to memory monitoring of secondary processes. Because the individual thread clears very quickly, node can't capture the memory usage as a part of the script as it currently stands. Need to investigate better way to check. Currently, the best way to monitor threads is through OS-level monitor like ps, htop, or Activity Monitor.

## Reference
- http://php.net/manual/en/book.image.php
- http://www.imagemagick.org/script/index.php
- http://www.graphicsmagick.org/
- https://docs.acquia.com/articles/scoping-impact-image-processing
