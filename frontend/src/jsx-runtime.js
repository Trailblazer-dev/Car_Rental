/**
 * React JSX Runtime shim for Azure Static Web Apps
 * Provides direct exports of React JSX Runtime functionality
 */
import * as React from 'react';

// Export JSX functions
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

// Default export
export default {
  jsx,
  jsxs,
  Fragment
};
