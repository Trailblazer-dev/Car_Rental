/**
 * Unified React runtime fix for Azure Static Web Apps deployment
 * This file handles both React and ReactDOM runtime exports
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Export all React APIs
export const {
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, cloneElement, createRef, Component, PureComponent,
  Children, Fragment, isValidElement, forwardRef, memo,
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;

// Export React JSX runtime functions
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const jsxDEV = React.createElement;

// Export ReactDOM APIs
export const {
  render, hydrate, unmountComponentAtNode, findDOMNode, createPortal
} = ReactDOM;

// Create React 18 compatible APIs
export const createRoot = (container: Element | DocumentFragment) => {
  return {
    render(element: React.ReactNode) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

export const hydrateRoot = (container: Element | DocumentFragment, element: React.ReactNode) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Default exports
export default React;
export { ReactDOM };
