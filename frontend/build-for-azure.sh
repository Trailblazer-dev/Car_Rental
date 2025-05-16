#!/bin/bash
# Script to prepare and build the React app for Azure Static Web Apps

echo "Starting build process for Azure Static Web Apps"

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund
npm install @rollup/plugin-commonjs@latest @rollup/plugin-node-resolve@latest --legacy-peer-deps

# Ensure JSX and React-DOM runtime fixes exist
echo "Checking for runtime fix files..."
if [ -f "src/jsx-runtime-fix.ts" ] && [ -f "src/react-dom-fix.ts" ]; then
  echo "Runtime fix files already exist"
else
  echo "Runtime fix files are missing or incomplete! Build will likely fail."
  exit 1
fi

# Build the application
echo "Building the application..."
NODE_ENV=production npm run build

# Verify the build output
if [ -d "dist" ]; then
  echo "Build completed successfully! Contents of dist directory:"
  ls -la dist
  
  # Ensure staticwebapp.config.json is in the dist folder
  if [ -f "dist/staticwebapp.config.json" ]; then
    echo "Static Web App config found in dist folder"
  else
    echo "Copying Static Web App config to dist folder"
    cp staticwebapp.config.json dist/
  fi
  
  echo "Build ready for Azure Static Web Apps deployment"
else
  echo "Build failed - dist directory not found"
  exit 1
fi
