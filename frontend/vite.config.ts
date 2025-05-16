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
      // Explicit JSX runtime replacements
      'react/jsx-runtime': resolve(__dirname, './src/jsx-runtime-fix.ts'),
      'react/jsx-dev-runtime': resolve(__dirname, './src/jsx-runtime-fix.ts')
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    // Change from 'terser' to 'esbuild' which is built-in
    minify: 'esbuild',
    rollupOptions: {
      plugins: [
        nodeResolve({
          extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
          browser: true
        }),
        commonjs({
          include: /node_modules/,
          requireReturnsDefault: 'auto'
        })
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react']
        }
      },
      external: []
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
});
