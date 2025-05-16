/**
 * Azure Static Web Apps build script with fixes for React DOM resolution
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Azure Static Web Apps Build Fix');
console.log('===================================');

// Create React DOM shim
console.log('Creating React DOM shim...');
const reactDomShimPath = path.join(rootDir, 'src', 'react-dom.js');
const reactDomShimContent = `/**
 * React DOM shim for Azure Static Web Apps
 * Provides direct exports of React DOM functionality
 */
import * as ReactDOM from 'react-dom';

// Re-export all ReactDOM methods
export const {
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  flushSync
} = ReactDOM;

// Polyfill for React 18 functionality if using older React
export const createRoot = (container) => {
  return {
    render(element) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

export const hydrateRoot = (container, element) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Default export
export default ReactDOM;
`;

fs.writeFileSync(reactDomShimPath, reactDomShimContent);
console.log(`Created React DOM shim: ${reactDomShimPath}`);

// Run the prebuild script
console.log('Running prebuild script...');
try {
  execSync('npm run prebuild', { 
    stdio: 'inherit',
    cwd: rootDir 
  });
} catch (error) {
  console.error('Error running prebuild script:', error);
  // Continue anyway
}

// Build the application with a simpler configuration
console.log('Building application...');
try {
  // Use a simpler build command with fewer options
  execSync('npx vite build --outDir dist', { 
    stdio: 'inherit',
    cwd: rootDir,
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      VITE_SKIP_CHUNK_SPLITTING: 'true' // Custom env var to signal simpler build
    }
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Copy staticwebapp.config.json
console.log('Copying Static Web App configuration...');
try {
  fs.copyFileSync(
    path.join(rootDir, 'staticwebapp.config.json'),
    path.join(rootDir, 'dist', 'staticwebapp.config.json')
  );
  console.log('Static Web App configuration copied successfully');
} catch (error) {
  console.error('Error copying SWA configuration (continuing anyway):', error);
}

console.log('Azure Static Web Apps build completed!');
