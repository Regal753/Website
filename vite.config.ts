import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const configuredBasePath = process.env.BASE_PATH?.trim() || '/';
const basePath = configuredBasePath.endsWith('/') ? configuredBasePath : `${configuredBasePath}/`;

export default defineConfig({
  base: basePath,
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
