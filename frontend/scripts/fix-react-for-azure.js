/**
 * This script creates the necessary React shim files for Azure Static Web Apps
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create the directory if it doesn't exist
const reactDir = path.join(rootDir, 'src', 'react');
if (!fs.existsSync(reactDir)) {
  fs.mkdirSync(reactDir, { recursive: true });
  console.log(`Created directory: ${reactDir}`);
}

// Create the React index file
const reactIndexContent = `/**
 * React shim for Azure Static Web Apps
 * Re-exports all React APIs needed by dependencies
 */
import * as React from 'react';

// Re-export everything from React
export const {
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, cloneElement, createRef, Component, PureComponent,
  Children, Fragment, isValidElement, forwardRef, memo,
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;

// Export JSX-specific functions
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;

// Default export
export default React;
`;

fs.writeFileSync(path.join(reactDir, 'index.ts'), reactIndexContent);
console.log('Created React index file');

// Create the JSX runtime file
const jsxRuntimeContent = `/**
 * JSX Runtime shim for Azure Static Web Apps
 */
import * as React from 'react';

// Export the specific JSX runtime APIs
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default { jsx, jsxs, Fragment };
`;

fs.writeFileSync(path.join(reactDir, 'jsx-runtime.ts'), jsxRuntimeContent);
console.log('Created JSX runtime file');

// Create the JSX dev runtime file
const jsxDevRuntimeContent = `/**
 * JSX Dev Runtime shim for Azure Static Web Apps
 */
import * as React from 'react';

// Export the specific JSX dev runtime APIs
export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default { jsxDEV, jsxs, Fragment };
`;

fs.writeFileSync(path.join(reactDir, 'jsx-dev-runtime.ts'), jsxDevRuntimeContent);
console.log('Created JSX dev runtime file');

console.log('React fix files created successfully!');
