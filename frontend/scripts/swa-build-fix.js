/**
 * Azure Static Web Apps Build Fix Script
 * Resolves React module resolution issues in production builds
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Azure Static Web Apps Build Fix Script');
console.log('========================================');

// Create React shim files
console.log('📝 Creating React shim files...');

// Create React shim
const reactShimPath = path.join(rootDir, 'src', 'react-shim.js');
const reactShimContent = `// React shim to fix module resolution in production builds
import * as React from 'react';
export * from 'react';
export default React;
`;

// Create ReactDOM shim
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

// Create JSX Runtime shim
const jsxRuntimePath = path.join(rootDir, 'src', 'jsx-runtime-shim.js');
const jsxRuntimeContent = `// JSX Runtime shim for production builds
import * as React from 'react';
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;
export default { jsx, jsxs, Fragment };
`;

// Create JSX Dev Runtime shim
const jsxDevRuntimePath = path.join(rootDir, 'src', 'jsx-dev-runtime-shim.js');
const jsxDevRuntimeContent = `// JSX Dev Runtime shim for production builds
import * as React from 'react';
export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;
export default { jsxDEV, jsxs, Fragment };
`;

// Ensure the src directory exists
if (!fs.existsSync(path.join(rootDir, 'src'))) {
  fs.mkdirSync(path.join(rootDir, 'src'), { recursive: true });
}

// Write all shim files
fs.writeFileSync(reactShimPath, reactShimContent);
fs.writeFileSync(reactDomShimPath, reactDomShimContent);
fs.writeFileSync(jsxRuntimePath, jsxRuntimeContent);
fs.writeFileSync(jsxDevRuntimePath, jsxDevRuntimeContent);

console.log('✅ React shim files created successfully!');

// Create a temporary optimized Vite config for Azure build
console.log('📝 Creating optimized build configuration...');

const tempViteConfigPath = path.join(rootDir, 'vite.azure.config.js');
const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// Special production configuration for Azure Static Web Apps
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
console.log('✅ Azure-optimized Vite config created successfully!');

// Run the prebuild script if it exists (to copy assets)
console.log('🔄 Running prebuild script...');
try {
  execSync('npm run prebuild', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.warn('⚠️ Warning during prebuild (continuing anyway):', error);
}

// Build with the optimized config
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

// Clean up temporary build config
console.log('🧹 Cleaning up temporary build files...');
try {
  fs.unlinkSync(tempViteConfigPath);
} catch (error) {
  console.warn('⚠️ Warning during cleanup (continuing anyway):', error);
}

console.log('🎉 Azure Static Web Apps build completed successfully!');
console.log('📦 Your application is ready for deployment in the dist/ directory');
