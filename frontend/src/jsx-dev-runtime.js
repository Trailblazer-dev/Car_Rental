/**
 * React JSX Dev Runtime shim for Azure Static Web Apps
 * Provides direct exports of React JSX Dev Runtime functionality
 */
import * as React from 'react';

// Export JSX Dev functions
export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default {
  jsxDEV,
  jsxs,
  Fragment
};
