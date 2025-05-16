/**
 * Simplified Azure Static Web Apps build script
 * This version minimizes complexity to reduce potential build errors
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('⚡ Azure Static Web Apps Simple Build Script');
console.log('------------------------------------------');

// Copy assets to public folder
console.log('🔄 Copying assets...');
try {
  execSync('node scripts/copy-assets.js', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.error('⚠️ Asset copying produced warnings (continuing anyway):', error);
}

// Build the application with minimal settings
console.log('🏗️ Building application for Azure Static Web Apps...');
try {
  execSync('npx vite build --outDir dist', { 
    stdio: 'inherit',
    cwd: rootDir,
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Copy staticwebapp.config.json to dist
console.log('📄 Copying SWA configuration...');
try {
  fs.copyFileSync(
    path.join(rootDir, 'staticwebapp.config.json'),
    path.join(rootDir, 'dist', 'staticwebapp.config.json')
  );
} catch (error) {
  console.error('⚠️ Failed to copy SWA configuration (continuing anyway):', error);
}

console.log('🎉 Build complete!');
