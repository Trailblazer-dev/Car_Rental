#!/bin/bash
# Script to prepare and build the React app for Azure Static Web Apps

echo "Starting build process for Azure Static Web Apps"

# Clean up previous build artifacts
echo "Cleaning up previous builds..."
rm -rf dist

# Install dependencies
echo "Installing dependencies..."
npm install --no-audit --no-fund --legacy-peer-deps

# Create React fix files if they don't exist
echo "Ensuring React fix files exist..."
mkdir -p src

# Generate React fix files if they don't exist
if [ ! -f "src/react-fix.ts" ]; then
  echo "Creating React fix file..."
  cat > src/react-fix.ts << 'EOL'
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
EOL
fi

if [ ! -f "src/react-dom-fix.ts" ]; then
  echo "Creating React DOM fix file..."
  cat > src/react-dom-fix.ts << 'EOL'
// This file ensures proper React DOM resolution in production builds
import * as ReactDOM from 'react-dom';

// Create polyfill for React 18 APIs if using older React
const createRoot = (container: Element | DocumentFragment) => {
  return {
    render(element: React.ReactNode) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

const hydrateRoot = (container: Element | DocumentFragment, element: React.ReactNode) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Export standard ReactDOM APIs
export default ReactDOM;
export const {
  render, hydrate, findDOMNode, createPortal, unmountComponentAtNode
} = ReactDOM;

// Export React 18 API polyfills
export { createRoot, hydrateRoot };
EOL
fi

# Copy assets to public directory
echo "Running prebuild scripts..."
npm run prebuild

# Build the application
echo "Building the application..."
NODE_ENV=production VITE_BUILD_MODE=azure npm run build

# Verify the build output
if [ -d "dist" ]; then
  echo "Build completed successfully! Contents of dist directory:"
  ls -la dist
  
  # Ensure staticwebapp.config.json is in the dist folder
  if [ ! -f "dist/staticwebapp.config.json" ]; then
    echo "Copying Static Web App config to dist folder"
    cp staticwebapp.config.json dist/
  fi
  
  echo "Build ready for Azure Static Web Apps deployment"
else
  echo "Build failed - dist directory not found"
  exit 1
fi
