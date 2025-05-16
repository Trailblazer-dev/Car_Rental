/**
 * This script copies assets from src/assets to public/images
 * Run with: node scripts/copy-assets.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination directories
const sourceDir = path.resolve(__dirname, '../src/assets');
const targetDir = path.resolve(__dirname, '../public/images');

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created directory:', targetDir);
}

// Function to copy files
const copyFiles = (dir, targetBase) => {
  // Read directory
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  // Process each file
  files.forEach(file => {
    const sourcePath = path.join(dir, file.name);
    
    // Get relative path from source base directory
    const relativePath = path.relative(sourceDir, sourcePath);
    
    // Destination path in target directory
    const targetPath = path.join(targetBase, relativePath);
    
    if (file.isDirectory()) {
      // Create subdirectory if it doesn't exist
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
        console.log('Created directory:', targetPath);
      }
      
      // Recursively copy subdirectory
      copyFiles(sourcePath, targetBase);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
      console.log('Copied:', relativePath);
    }
  });
};

// Execute the copy function
try {
  copyFiles(sourceDir, targetDir);
  console.log('Assets successfully copied to public/images');
} catch (error) {
  console.error('Error copying assets:', error);
  process.exit(1);
}
