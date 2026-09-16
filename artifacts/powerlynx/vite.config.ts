import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

// PORT and BASE_PATH are provided by Replit's per-artifact routing when running
// inside the Replit environment. When building/serving standalone (e.g. on
// Cloudflare Pages or any other host), fall back to sane defaults so the build
// doesn't require Replit-specific configuration.
const isReplitEnv = process.env.REPL_ID !== undefined;
const rawPort = process.env.PORT;

if (isReplitEnv && !rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort ?? 4173);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? '/';

if (isReplitEnv && !process.env.BASE_PATH) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll('\\', '/');

          if (!normalizedId.includes('/node_modules/')) {
            return undefined;
          }

          const hasPackage = (...packages: string[]) =>
            packages.some((packageName) =>
              normalizedId.includes(`/node_modules/${packageName}/`),
            );

          if (hasPackage('react', 'react-dom', 'scheduler')) {
            return 'react-vendor';
          }

          if (hasPackage('@radix-ui', 'cmdk')) {
            return 'radix-ui';
          }

          if (hasPackage('@tanstack')) {
            return 'tanstack-query';
          }

          if (hasPackage('lucide-react')) {
            return 'icons';
          }

          if (hasPackage(
            '@hookform',
            'react-hook-form',
            'zod',
          )) {
            return 'forms';
          }

          if (hasPackage('framer-motion')) {
            return 'motion';
          }

          if (hasPackage('recharts', 'd3')) {
            return 'charts';
          }

          return 'vendor';
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
