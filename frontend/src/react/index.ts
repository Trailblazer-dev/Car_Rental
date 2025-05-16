/**
 * React shim for Azure Static Web Apps
 * Re-exports all React APIs needed by dependencies
 */
import * as React from 'react';

// Re-export everything from React
export const {
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, cloneElement, createRef, Component, PureComponent,
  Children, Fragment, isValidElement, forwardRef, memo,
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;

// Export JSX-specific functions
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;

// Create explicit exports for jsx-runtime
export const JsxRuntime = {
  jsx: React.createElement,
  jsxs: React.createElement,
  Fragment: React.Fragment
};

// Default export
export default React;
