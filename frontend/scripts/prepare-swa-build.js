/**
 * Azure Static Web Apps build preparation script
 * Creates all necessary files for proper React/JSX resolution
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Preparing files for Azure Static Web Apps build...');

// Create directories if they don't exist
const reactDir = path.join(rootDir, 'src', 'react');
if (!fs.existsSync(reactDir)) {
  fs.mkdirSync(reactDir, { recursive: true });
  console.log('Created directory:', reactDir);
}

// Create React shim files
const files = [
  {
    path: path.join(reactDir, 'jsx-runtime.ts'),
    content: `/**
 * JSX Runtime shim for React/JSX runtime resolution
 */
import * as React from 'react';

export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

export default {
  jsx,
  jsxs,
  Fragment
};`
  },
  {
    path: path.join(reactDir, 'jsx-dev-runtime.ts'),
    content: `/**
 * JSX Dev Runtime shim for React/JSX development runtime resolution
 */
import * as React from 'react';

export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

export default {
  jsxDEV,
  jsxs,
  Fragment
};`
  },
  {
    path: path.join(reactDir, 'index.ts'),
    content: `/**
 * React main module shim
 */
import * as React from 'react';
export * from 'react';
export default React;`
  },
  {
    path: path.join(rootDir, 'src', 'react-dom-fix.ts'),
    content: `/**
 * ReactDOM shim for Azure Static Web Apps
 */
import * as ReactDOM from 'react-dom';

// Export standard ReactDOM APIs
export const {
  render, hydrate, unmountComponentAtNode, findDOMNode, createPortal
} = ReactDOM;

// Create React 18 compatible APIs for older React versions
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
export default ReactDOM;`
  }
];

// Write all files
for (const file of files) {
  fs.writeFileSync(file.path, file.content);
  console.log(`Created file: ${file.path}`);
}

console.log('✅ Files prepared successfully for Azure Static Web Apps build!');
