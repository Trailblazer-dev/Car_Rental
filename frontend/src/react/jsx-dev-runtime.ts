/**
 * JSX Dev Runtime shim for React/JSX development runtime resolution
 */
import * as React from 'react';

export const jsxDEV = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

export default {
  jsxDEV,
  jsxs,
  Fragment
};
