/**
 * Prepare files for Azure Static Web Apps deployment
 * Creates necessary shims to resolve React module issues
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Preparing files for Azure Static Web Apps deployment...');

// Create JSX Runtime shim
const jsxRuntimePath = path.join(rootDir, 'src', 'jsx-runtime.js');
const jsxRuntimeContent = `/**
 * React JSX Runtime shim for Azure Static Web Apps
 * Provides direct exports of React JSX Runtime functionality
 */
import * as React from 'react';

// Export JSX functions
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default {
  jsx,
  jsxs,
  Fragment
};`;

fs.writeFileSync(jsxRuntimePath, jsxRuntimeContent);
console.log(`Created JSX Runtime shim: ${jsxRuntimePath}`);

// Create JSX Dev Runtime shim
const jsxDevRuntimePath = path.join(rootDir, 'src', 'jsx-dev-runtime.js');
const jsxDevRuntimeContent = `/**
 * React JSX Dev Runtime shim for Azure Static Web Apps
 * Provides direct exports of React JSX Dev Runtime functionality
 */
import * as React from 'react';

// Export JSX Dev functions
export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default {
  jsxDEV,
  jsxs,
  Fragment
};`;

fs.writeFileSync(jsxDevRuntimePath, jsxDevRuntimeContent);
console.log(`Created JSX Dev Runtime shim: ${jsxDevRuntimePath}`);

// Create React DOM shim
const reactDomPath = path.join(rootDir, 'src', 'react-dom.js');
const reactDomContent = `/**
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
  createPortal
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
export default ReactDOM;`;

fs.writeFileSync(reactDomPath, reactDomContent);
console.log(`Created React DOM shim: ${reactDomPath}`);

console.log('✅ Azure Static Web Apps preparation completed successfully!');
