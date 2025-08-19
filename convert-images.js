/**
 * Image Conversion Script for FitForge
 * 
 * This script converts images to WebP and AVIF formats for better performance.
 * It requires Sharp library for image processing.
 * 
 * Usage:
 * 1. Install dependencies: npm install sharp glob
 * 2. Run: node convert-images.js
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import sharp from 'sharp';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const config = {
  // Source directories to scan for images
  sourceDirs: [
    path.join(__dirname, 'src', 'assets'),
    path.join(__dirname, 'public', 'assets')
  ],
  // Image extensions to convert
  extensions: ['.jpg', '.jpeg', '.png', '.jfif'],
  // Output formats
  formats: ['webp', 'avif'],
  // Responsive sizes for larger images (width in pixels)
  responsiveSizes: [320, 640, 960, 1280, 1920],
  // Minimum size for responsive images (width in pixels)
  minSizeForResponsive: 600,
  // Quality settings (0-100)
  quality: {
    webp: 80,
    avif: 70
  }
};

/**
 * Convert a single image to multiple formats
 */
async function convertImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    
    // Skip if not in our target extensions
    if (!config.extensions.includes(ext)) {
      return;
    }
    
    console.log(`Processing: ${imagePath}`);
    
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const { width } = metadata;
    
    // Base path without extension
    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
    
    // Convert to each format
    for (const format of config.formats) {
      // Base conversion with original size
      await sharp(imagePath)
        .toFormat(format, { quality: config.quality[format] })
        .toFile(`${basePath}.${format}`);
      
      console.log(`Created: ${basePath}.${format}`);
      
      // Create responsive versions if image is large enough
      if (width >= config.minSizeForResponsive) {
        for (const size of config.responsiveSizes.filter(s => s < width)) {
          await sharp(imagePath)
            .resize(size)
            .toFormat(format, { quality: config.quality[format] })
            .toFile(`${basePath}-${size}w.${format}`);
          
          console.log(`Created: ${basePath}-${size}w.${format}`);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error converting ${imagePath}:`, error);
    return false;
  }
}

/**
 * Main function to process all images
 */
async function main() {
  try {
    console.log('Starting image conversion...');
    
    // Find all images in source directories
    let imagePaths = [];
    
    for (const dir of config.sourceDirs) {
      const patterns = config.extensions.map(ext => `${dir}/**/*${ext}`);
      const files = await glob(patterns, { nocase: true });
      imagePaths = [...imagePaths, ...files];
    }
    
    console.log(`Found ${imagePaths.length} images to process`);
    
    // Process each image
    let successCount = 0;
    let errorCount = 0;
    
    for (const imagePath of imagePaths) {
      const success = await convertImage(imagePath);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
    
    console.log('\nConversion complete!');
    console.log(`Successfully converted: ${successCount} images`);
    console.log(`Failed conversions: ${errorCount} images`);
    console.log('\nNext steps:');
    console.log('1. Check the converted images in your assets directories');
    console.log('2. Deploy your site to see the optimized images in action');
    
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the script
main();