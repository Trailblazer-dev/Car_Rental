import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from "url";
import { dirname, resolve } from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
      // Ensure all React imports are consolidated through our runtime fix
      'react': resolve(__dirname, './src/react-runtime-fix.ts'),
      'react-dom': resolve(__dirname, './src/react-runtime-fix.ts'),
      'react-dom/client': resolve(__dirname, './src/react-runtime-fix.ts'),
      'react/jsx-runtime': resolve(__dirname, './src/react-runtime-fix.ts'),
      'react/jsx-dev-runtime': resolve(__dirname, './src/react-runtime-fix.ts')
    },
    dedupe: ['react', 'react-dom'],
    mainFields: ['browser', 'module', 'main'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    // Change from 'terser' to 'esbuild' which is built-in
    minify: 'esbuild',
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    },
    rollupOptions: {
      plugins: [
        nodeResolve({
          extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
          browser: true,
          preferBuiltins: false
        }),
        commonjs({
          include: /node_modules/,
          requireReturnsDefault: 'auto'
        })
      ],
      output: {
        // Create separate chunks for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler') || id.includes('object-assign')) {
              return 'vendor-react';
            }
            if (id.includes('lucide')) {
              return 'vendor-ui';
            }
            if (id.includes('react-router') || id.includes('react-dom')) {
              return 'vendor-router';
            }
            return 'vendor'; // all other packages
          }
        },
        // Ensure consistent output format
        format: 'es'
      },
      external: []
    }
  },
  // This ensures the public directory is properly copied to the build output
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    // Ensure JSX is correctly transformed
    jsx: 'automatic'
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
});
