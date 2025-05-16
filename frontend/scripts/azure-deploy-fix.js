/**
 * Fix for Azure Static Web Apps deployment
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create the React directory if needed
const reactDir = path.join(rootDir, 'src', 'react');
if (!fs.existsSync(reactDir)) {
  fs.mkdirSync(reactDir, { recursive: true });
}

// Create the JSX runtime file
const jsxRuntimePath = path.join(reactDir, 'jsx-runtime.ts');
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

fs.writeFileSync(jsxRuntimePath, jsxRuntimeContent);
console.log(`Created JSX runtime file: ${jsxRuntimePath}`);

// Create index file
const indexPath = path.join(reactDir, 'index.ts');
const indexContent = `/**
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

// Create explicit exports for jsx-runtime
export const JsxRuntime = {
  jsx: React.createElement,
  jsxs: React.createElement,
  Fragment: React.Fragment
};

// Default export
export default React;
`;

fs.writeFileSync(indexPath, indexContent);
console.log(`Created React index file: ${indexPath}`);

console.log('React fix files created successfully for Azure Static Web Apps deployment');
