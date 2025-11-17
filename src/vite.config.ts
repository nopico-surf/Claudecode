import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Detecta se estamos no GitHub (com /src/) ou Figma Make (sem /src/)
const srcExists = existsSync(resolve(__dirname, 'src'));

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: srcExists ? './src' : '.',
  publicDir: srcExists ? resolve(__dirname, 'public') : './public',
  css: {
    postcss: {
      plugins: []
    }
  },
  build: {
    outDir: srcExists ? resolve(__dirname, 'build') : './build',
    emptyOutDir: true
  }
});
