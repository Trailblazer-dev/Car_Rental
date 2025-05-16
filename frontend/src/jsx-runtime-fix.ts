// This file ensures proper JSX runtime resolution
// It's a workaround for the "Could not resolve ./cjs/react-jsx-runtime.production.min.js" error

import * as React from 'react';

// Define all JSX runtime functions needed
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;
export const Fragment = React.Fragment;

// Add production-specific exports that might be required
export const createContext = React.createContext;
export const useState = React.useState;
export const useEffect = React.useEffect;
export const useContext = React.useContext;
export const useMemo = React.useMemo;
export const useRef = React.useRef;
export const useCallback = React.useCallback;

// Re-export all of React to ensure compatibility
const ReactShim = { ...React, jsx, jsxs, jsxDEV, Fragment };

// Export default React for components that need it
export default ReactShim;
