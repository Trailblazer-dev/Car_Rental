/**
 * JSX Dev Runtime shim for Azure Static Web Apps
 */
import * as React from 'react';

// Export the specific JSX dev runtime APIs
export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default { jsxDEV, jsxs, Fragment };
