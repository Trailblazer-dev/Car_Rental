// This file ensures proper JSX runtime resolution
// It's a workaround for the "Could not resolve ./cjs/react-jsx-runtime.production.min.js" error

import * as React from 'react';

// Define all JSX runtime functions needed
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;
export const Fragment = React.Fragment;

// Re-export all of React to ensure compatibility
const ReactShim = { ...React, jsx, jsxs, jsxDEV, Fragment };

// Export default React for components that need it
export default ReactShim;
