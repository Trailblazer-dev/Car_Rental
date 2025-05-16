# Azure Static Web Apps Deployment Guide

This guide provides instructions for deploying the CarHire frontend to Azure Static Web Apps.

## Prerequisites

- Azure account with an active subscription
- Node.js version 14 or higher
- npm or yarn

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Azure Static Web Apps

To build the application for deployment to Azure Static Web Apps, use the dedicated build script:

```bash
npm run build:azure
```

This script handles all necessary fixes for React module resolution in production builds.

## Deploying to Azure Static Web Apps

### Option 1: Using GitHub Actions (Recommended)

1. Push your code to a GitHub repository
2. In the Azure Portal, create a new Static Web App resource
3. Connect it to your GitHub repository
4. Configure the build settings:
   - Build Preset: Custom
   - App location: `/frontend`
   - Api location: `/api` (if applicable)
   - Output location: `dist`
   - Build Command: `npm run build:azure`

### Option 2: Using Azure Static Web Apps CLI

1. Install the Azure Static Web Apps CLI:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. Build the application:
   ```bash
   npm run build:azure
   ```

3. Deploy to Azure:
   ```bash
   swa deploy ./dist --env production
   ```

## Troubleshooting

If you encounter build issues related to React or module resolution:

1. Ensure you're using the `build:azure` script for production builds
2. Check that all shim files exist in the `/src` directory
3. Verify the `vite.azure.config.js` file is properly configured

For more information, see the [Azure Static Web Apps documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/).
