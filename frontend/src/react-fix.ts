// This file ensures proper React resolution in production builds
import * as React from 'react';

// Re-export all React APIs
export default React;
export const {
  // Core React APIs
  useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef,
  createContext, createElement, Fragment, memo, forwardRef, createRef,
  Children, cloneElement, isValidElement, Component, PureComponent,
  // Other commonly used APIs
  useLayoutEffect, useImperativeHandle, useDebugValue
} = React;
