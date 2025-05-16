#!/bin/bash
# Script to prepare and build the React app for Azure Static Web Apps

# Install dependencies
npm install --legacy-peer-deps
npm install @rollup/plugin-commonjs @rollup/plugin-node-resolve --legacy-peer-deps

# Build the application
NODE_ENV=production npm run build

# Verify the build output
if [ -d "dist" ]; then
  echo "Build completed successfully! Contents of dist directory:"
  ls -la dist
else
  echo "Build failed - dist directory not found"
  exit 1
fi

echo "Build ready for Azure Static Web Apps deployment"
