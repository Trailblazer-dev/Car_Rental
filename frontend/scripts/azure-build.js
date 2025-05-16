/**
 * Azure Static Web Apps Build Script
 * Fixes React module resolution issues in production builds
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Azure Static Web Apps Build Script');
console.log('===================================');

// Run the prebuild script if it exists
console.log('🔄 Running prebuild script...');
try {
  execSync('npm run prebuild', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.warn('⚠️ Warning during prebuild (continuing anyway):', error);
}

// Build with the Azure-optimized config
console.log('🏗️ Building application...');
try {
  execSync('npx vite build --config vite.azure.config.js', {
    stdio: 'inherit',
    cwd: rootDir,
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Copy staticwebapp.config.json to dist
console.log('📋 Copying Azure Static Web App configuration...');
try {
  fs.copyFileSync(
    path.join(rootDir, 'staticwebapp.config.json'),
    path.join(rootDir, 'dist', 'staticwebapp.config.json')
  );
  console.log('✅ SWA configuration copied successfully');
} catch (error) {
  console.error('⚠️ Failed to copy SWA configuration (continuing anyway):', error);
}

console.log('🎉 Azure Static Web Apps build completed successfully!');
console.log('📦 Your application is ready for deployment in the dist/ directory');
