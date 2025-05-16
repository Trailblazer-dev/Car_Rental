import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from "url";
import { dirname, resolve } from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react',
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react']
        }
      },
      external: []
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
});
