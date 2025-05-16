/**
 * Prepare React files for Azure Static Web Apps deployment
 * Creates necessary shim files to fix JSX runtime issues
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Preparing React files for Azure Static Web Apps...');

// Ensure directories exist
console.log('Creating directory structure...');
const reactDir = path.join(rootDir, 'src', 'react');
if (!fs.existsSync(reactDir)) {
  fs.mkdirSync(reactDir, { recursive: true });
}

// Create the runtime fix file
console.log('Creating React runtime fix file...');
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

fs.writeFileSync(path.join(rootDir, 'src', 'react-runtime-fix.ts'), runtimeFixContent);

// Create JSX runtime shim
console.log('Creating JSX runtime shim...');
const jsxRuntimeContent = `/**
 * JSX Runtime shim
 * This ensures proper import resolution for 'react/jsx-runtime'
 */
import { jsx, jsxs, Fragment } from '../react-runtime-fix';

export { jsx, jsxs, Fragment };
export default { jsx, jsxs, Fragment };
`;

fs.writeFileSync(path.join(reactDir, 'jsx-runtime.ts'), jsxRuntimeContent);

// Create JSX dev runtime shim
console.log('Creating JSX dev runtime shim...');
const jsxDevRuntimeContent = `/**
 * JSX Dev Runtime shim
 * This ensures proper import resolution for 'react/jsx-dev-runtime'
 */
import { jsx, jsxs, Fragment } from '../react-runtime-fix';

// jsxDEV is just an alias for jsx in production
export const jsxDEV = jsx;
export { jsxs, Fragment };
export default { jsxDEV, jsxs, Fragment };
`;

fs.writeFileSync(path.join(reactDir, 'jsx-dev-runtime.ts'), jsxDevRuntimeContent);

console.log('✅ React files prepared successfully for Azure Static Web Apps!');
