// This file ensures proper JSX runtime resolution
// It's a workaround for React module resolution errors in production builds

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

// Define all JSX runtime functions needed
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;
export const Fragment = React.Fragment;

// Additional JSX runtime exports that might be required
export const createContext = React.createContext;
export const useId = React.useId;

// React DOM specific exports
export const createRoot = ReactDOMClient.createRoot;
export const hydrateRoot = ReactDOMClient.hydrateRoot;
export const render = ReactDOM.render;
export const hydrate = ReactDOM.hydrate;
export const findDOMNode = ReactDOM.findDOMNode;
export const createPortal = ReactDOM.createPortal;

// Re-export all of React to ensure compatibility
const ReactShim = { ...React, jsx, jsxs, jsxDEV, Fragment };

// Export default React for components that need it
export default ReactShim;
