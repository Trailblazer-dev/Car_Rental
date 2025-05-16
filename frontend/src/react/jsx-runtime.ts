/**
 * JSX Runtime shim for Azure Static Web Apps
 */
import * as React from 'react';

// Export the specific JSX runtime APIs
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default { jsx, jsxs, Fragment };
