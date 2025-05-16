/**
 * Azure Static Web Apps build script
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('⚡ Azure Static Web Apps Build Script');
console.log('-----------------------------------');

// First apply React fixes
console.log('🔄 Applying React fixes for Azure Static Web Apps...');
try {
  execSync('node scripts/swa-fix-react.js', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.error('❌ Failed to apply React fixes:', error);
  process.exit(1);
}

// Copy assets to public folder
console.log('🔄 Running prebuild script to copy assets...');
try {
  execSync('node scripts/copy-assets.js', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Assets copied successfully');
} catch (error) {
  console.error('❌ Failed to copy assets:', error);
  process.exit(1);
}

// Build the application
console.log('🏗️ Building application for Azure Static Web Apps...');
try {
  execSync('vite build --outDir dist --assetsDir assets --emptyOutDir', { 
    stdio: 'inherit',
    cwd: rootDir,
    env: { ...process.env, NODE_ENV: 'production', VITE_BUILD_MODE: 'azure' }
  });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Copy staticwebapp.config.json to dist
console.log('📄 Copying Static Web App configuration...');
const swaConfigSrc = path.join(rootDir, 'staticwebapp.config.json');
const swaConfigDest = path.join(rootDir, 'dist', 'staticwebapp.config.json');

try {
  fs.copyFileSync(swaConfigSrc, swaConfigDest);
  console.log('✅ Static Web App configuration copied successfully');
} catch (error) {
  console.error('❌ Failed to copy SWA configuration:', error);
  process.exit(1);
}

console.log('🎉 Azure Static Web Apps build complete!');
console.log('📦 Your app is ready in the dist/ directory');
