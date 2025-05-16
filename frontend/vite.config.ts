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
      // Direct alias for react/jsx-runtime
      'react/jsx-runtime': resolve(__dirname, './src/jsx-runtime.js'),
      'react/jsx-dev-runtime': resolve(__dirname, './src/jsx-dev-runtime.js'),
      'react-dom': resolve(__dirname, './src/react-dom.js'),
      'react-dom/client': resolve(__dirname, './src/react-dom.js')
    },
    dedupe: ['react', 'react-dom'],
    mainFields: ['browser', 'module', 'main', 'jsnext:main'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'esbuild',
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
      // Explicitly add React DOM to include paths
      requireReturnsDefault: 'auto',
    },
    rollupOptions: {
      external: [],
      plugins: [
        nodeResolve({
          extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
          browser: true,
          preferBuiltins: false,
          // Explicitly include node_modules
          moduleDirectories: ['node_modules']
        }),
        commonjs({
          include: [/node_modules/],
          transformMixedEsModules: true
        })
      ],
      output: {
        // Remove manualChunks to simplify the build
        format: 'es'
      }
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
