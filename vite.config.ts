import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
          
          // Router
          if (id.includes('node_modules/react-router-dom/')) {
            return 'router';
          }
          
          // Radix UI components
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix';
          }
          
          // UI utilities
          if (
            id.includes('node_modules/class-variance-authority/') ||
            id.includes('node_modules/clsx/') ||
            id.includes('node_modules/tailwind-merge/') ||
            id.includes('node_modules/tailwindcss-animate/')
          ) {
            return 'ui';
          }
          
          // Forms
          if (
            id.includes('node_modules/@hookform/resolvers/') ||
            id.includes('node_modules/react-hook-form/') ||
            id.includes('node_modules/zod/')
          ) {
            return 'forms';
          }
          
          // Icons
          if (
            id.includes('node_modules/react-icons/') ||
            id.includes('node_modules/lucide-react/')
          ) {
            return 'icons';
          }
          
          // Animation
          if (
            id.includes('node_modules/gsap/') ||
            id.includes('node_modules/split-type/') ||
            id.includes('node_modules/react-mouse-particles/')
          ) {
            return 'animation';
          }
          
          // Carousel
          if (id.includes('node_modules/embla-carousel-react/')) {
            return 'carousel';
          }
          
          // Date related
          if (
            id.includes('node_modules/date-fns/') ||
            id.includes('node_modules/react-day-picker/')
          ) {
            return 'date';
          }
        }
      },
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
