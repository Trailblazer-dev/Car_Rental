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

// Ensure the React runtime fix file exists
const runtimeFixPath = path.join(rootDir, 'src', 'react-runtime-fix.ts');
const runtimeFixContent = `/**
 * Unified React runtime fix for Azure Static Web Apps deployment
 * This file handles both React and ReactDOM runtime exports
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Export all React APIs
export const {
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, cloneElement, createRef, Component, PureComponent,
  Children, Fragment, isValidElement, forwardRef, memo,
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;

// Export React JSX runtime functions
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;

// Export ReactDOM APIs
export const {
  render, hydrate, unmountComponentAtNode, findDOMNode, createPortal
} = ReactDOM;

// Create React 18 compatible APIs
export const createRoot = (container: Element | DocumentFragment) => {
  return {
    render(element: React.ReactNode) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

export const hydrateRoot = (container: Element | DocumentFragment, element: React.ReactNode) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Default exports
export default React;
export const ReactDOMDefault = ReactDOM;
`;

console.log('📝 Creating React runtime fix file...');
fs.writeFileSync(runtimeFixPath, runtimeFixContent);
console.log('✅ Runtime fix file created successfully');

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
    env: { ...process.env, NODE_ENV: 'production' }
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
