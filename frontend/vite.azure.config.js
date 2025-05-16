import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// Special production configuration for Azure Static Web Apps
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': resolve(__dirname, './src/react-shim.js'),
      'react-dom': resolve(__dirname, './src/react-dom-shim.js'),
      'react/jsx-runtime': resolve(__dirname, './src/jsx-runtime-shim.js'),
      'react/jsx-dev-runtime': resolve(__dirname, './src/jsx-dev-runtime-shim.js'),
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
