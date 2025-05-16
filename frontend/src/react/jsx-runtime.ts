/**
 * JSX Runtime shim for React/JSX runtime resolution
 */
import * as React from 'react';

export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;

export default {
  jsx,
  jsxs,
  Fragment
};
