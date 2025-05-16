/**
 * Azure Static Web Apps CLI Build Helper
 * This script helps with configuring and building for SWA
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Running Azure Static Web Apps build helper...');

// Create necessary fix files
console.log('📝 Creating React fix files...');

const reactFixContent = `// This file ensures proper React resolution in production builds
import * as React from 'react';

// Re-export all React APIs
export default React;
export const {
  // Core React APIs
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, Fragment, memo, forwardRef, createRef,
  Children, cloneElement, isValidElement, Component, PureComponent,
  // Other commonly used APIs
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;`;

const reactDomFixContent = `// This file ensures proper React DOM resolution in production builds
import * as ReactDOM from 'react-dom';

// Create polyfill for React 18 APIs if using older React
const createRoot = (container: Element | DocumentFragment) => {
  return {
    render(element: React.ReactNode) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

const hydrateRoot = (container: Element | DocumentFragment, element: React.ReactNode) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Export standard ReactDOM APIs
export default ReactDOM;
export const {
  render, hydrate, findDOMNode, createPortal, unmountComponentAtNode
} = ReactDOM;

// Export React 18 API polyfills
export { createRoot, hydrateRoot };`;

fs.writeFileSync(path.join(__dirname, 'src', 'react-fix.ts'), reactFixContent);
fs.writeFileSync(path.join(__dirname, 'src', 'react-dom-fix.ts'), reactDomFixContent);

// Run the prebuild script
console.log('🔄 Running prebuild asset copying...');
try {
  execSync('node scripts/copy-assets.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error running prebuild script:', error);
  process.exit(1);
}

// Run the build command
console.log('🏗️ Building application for Azure Static Web Apps...');
try {
  execSync('npx vite build --outDir dist --assetsDir assets --emptyOutDir', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production', VITE_BUILD_MODE: 'azure' }
  });
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Ensure SWA config is in dist
console.log('📋 Ensuring Static Web App config is in place...');
try {
  fs.copyFileSync(
    path.join(__dirname, 'staticwebapp.config.json'),
    path.join(__dirname, 'dist', 'staticwebapp.config.json')
  );
} catch (error) {
  console.error('❌ Error copying SWA config:', error);
  process.exit(1);
}

console.log('✅ Azure Static Web Apps build completed successfully!');
console.log('📦 Your application is ready for deployment!');
