/**
 * Azure Static Web Apps Dedicated Build Script
 * This script handles all the necessary fixes for React/ReactDOM resolution issues
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
console.log('====================================');

// Clean up any previous build artifacts
console.log('🧹 Cleaning up previous build artifacts...');
try {
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    execSync('rm -rf dist', { cwd: rootDir });
  }
} catch (error) {
  console.warn('⚠️ Warning during cleanup (continuing anyway):', error);
}

// Create necessary runtime shims
console.log('🔧 Creating React and ReactDOM runtime shims...');

// Create fixed React export
const reactShimPath = path.join(rootDir, 'src', 'react-shim.js');
const reactShimContent = `// React shim to fix module resolution in production builds
import * as React from 'react';
export * from 'react';
export default React;
`;

// Create fixed ReactDOM export including React 18 APIs for older React
const reactDomShimPath = path.join(rootDir, 'src', 'react-dom-shim.js');
const reactDomShimContent = `// ReactDOM shim to fix module resolution in production builds
import * as ReactDOM from 'react-dom';
export * from 'react-dom';

// Polyfill for React 18 APIs
export const createRoot = (container) => ({
  render(element) { ReactDOM.render(element, container); },
  unmount() { ReactDOM.unmountComponentAtNode(container); }
});

export const hydrateRoot = (container, element) => {
  ReactDOM.hydrate(element, container);
  return { unmount() { ReactDOM.unmountComponentAtNode(container); } };
};

export default ReactDOM;
`;

// Create fixed JSX runtime exports
const jsxRuntimePath = path.join(rootDir, 'src', 'jsx-runtime-shim.js');
const jsxRuntimeContent = `// JSX Runtime shim for production builds
import * as React from 'react';
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;
export default { jsx, jsxs, Fragment };
`;

const jsxDevRuntimePath = path.join(rootDir, 'src', 'jsx-dev-runtime-shim.js');
const jsxDevRuntimeContent = `// JSX Dev Runtime shim for production builds
import * as React from 'react';
export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;
export default { jsxDEV, jsxs, Fragment };
`;

// Write all shim files
fs.writeFileSync(reactShimPath, reactShimPath);
fs.writeFileSync(reactDomShimPath, reactDomShimContent);
fs.writeFileSync(jsxRuntimePath, jsxRuntimeContent);
fs.writeFileSync(jsxDevRuntimePath, jsxDevRuntimeContent);

// Create a temporary vite config for the build
console.log('📝 Creating optimized build configuration...');

const tempViteConfigPath = path.join(rootDir, 'vite.azure.config.js');
const viteConfigContent = `// Temporary Vite config for Azure build
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': resolve(__dirname, './src/react-shim.js'),
      'react-dom': resolve(__dirname, './src/react-dom-shim.js'),
      'react/jsx-runtime': resolve(__dirname, './src/jsx-runtime-shim.js'),
      'react/jsx-dev-runtime': resolve(__dirname, './src/jsx-dev-runtime-shim.js'),
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
`;

fs.writeFileSync(tempViteConfigPath, viteConfigContent);

// Copy assets if needed
console.log('🔄 Copying assets...');
try {
  execSync('node scripts/copy-assets.js', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.warn('⚠️ Warning during asset copying (continuing anyway):', error);
}

// Build with the temporary config
console.log('🔨 Building application...');
try {
  execSync(`npx vite build --config vite.azure.config.js`, {
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

// Clean up temporary files
console.log('🧹 Cleaning up temporary build files...');
try {
  fs.unlinkSync(tempViteConfigPath);
} catch (error) {
  console.warn('⚠️ Warning during cleanup (continuing anyway):', error);
}

console.log('🎉 Azure Static Web Apps build completed successfully!');
console.log('📦 Your application is ready for deployment in the dist/ directory');
