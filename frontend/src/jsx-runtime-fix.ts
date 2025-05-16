// This file ensures proper JSX runtime resolution
// It's a workaround for the "Could not resolve ./cjs/react-jsx-runtime.production.min.js" error

import * as React from 'react';

// Re-export JSX runtime for correct resolution
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Export default React for components that need it
export default React;
