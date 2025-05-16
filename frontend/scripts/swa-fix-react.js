/**
 * Azure Static Web Apps React Fix Script
 * This script ensures proper React module resolution in Azure Static Web Apps
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Azure Static Web Apps React Fix Script');
console.log('------------------------------------------');

// Create the React runtime fix file
const runtimeFixPath = path.join(rootDir, 'src', 'react-runtime-fix.ts');
const runtimeFixContent = `/**
 * Unified React runtime fix for Azure Static Web Apps deployment
 * This file handles both React and ReactDOM runtime exports,
 * including JSX runtime
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Export all React APIs
export const {
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, cloneElement, createRef, Component, PureComponent,
  Children, isValidElement, forwardRef, memo,
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;

// Export React JSX runtime functions explicitly - these are critical
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;
export const Fragment = React.Fragment;

// Export ReactDOM APIs
export const {
  render, hydrate, unmountComponentAtNode, findDOMNode, createPortal
} = ReactDOM;

// Create React 18 compatible APIs
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

// Default exports
export default React;
export { ReactDOM };
`;

console.log('📝 Creating React runtime fix file...');
fs.writeFileSync(runtimeFixPath, runtimeFixContent);
console.log('✅ React runtime fix file created successfully');

// Also create a dummy JSX runtime file to prevent direct imports of jsx-runtime
const jsxRuntimePath = path.join(rootDir, 'src', 'jsx-runtime.ts');
const jsxRuntimeContent = `// Redirect file for jsx-runtime
export * from './react-runtime-fix';
`;

console.log('📝 Creating JSX runtime redirect file...');
fs.writeFileSync(jsxRuntimePath, jsxRuntimeContent);
console.log('✅ JSX runtime redirect file created successfully');

console.log('🎉 React fixes for Azure Static Web Apps are complete!');
