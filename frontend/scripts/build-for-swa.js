/**
 * Build script for Azure Static Web Apps
 * Applies all fixes and performs a production build
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Building for Azure Static Web Apps...');

// Prepare necessary shim files
console.log('Preparing React shim files...');
try {
  execSync('node scripts/prepare-for-swa.js', {
    stdio: 'inherit',
    cwd: rootDir
  });
} catch (error) {
  console.error('Failed to prepare files:', error);
  process.exit(1);
}

// Run prebuild script (assets copying)
console.log('Running prebuild script...');
try {
  execSync('npm run prebuild', {
    stdio: 'inherit',
    cwd: rootDir
  });
} catch (error) {
  console.error('Warning during prebuild (continuing anyway):', error);
}

// Simplified build command for maximum compatibility
console.log('Building application...');
try {
  execSync('npx vite build --outDir dist', {
    stdio: 'inherit',
    cwd: rootDir,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      VITE_DISABLE_CODE_SPLITTING: 'true'
    }
  });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Ensure SWA config is in place
console.log('Copying SWA configuration...');
try {
  fs.copyFileSync(
    path.join(rootDir, 'staticwebapp.config.json'),
    path.join(rootDir, 'dist', 'staticwebapp.config.json')
  );
} catch (error) {
  console.error('Failed to copy SWA config (continuing anyway):', error);
}

console.log('✅ Azure Static Web Apps build completed successfully!');
