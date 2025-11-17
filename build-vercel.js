const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Preparando build...');

// 1. Criar vite.config.ts na RAIZ (Figma Make sobrescreve, então recriamos)
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html')
    }
  },
  css: {
    postcss: path.resolve(__dirname, 'src/postcss.config.js')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});`;

// 2. Criar configs Tailwind em /src (Figma Make não sobrescreve)
const postcssConfig = `export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};`;

const tailwindConfig = `export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

try {
  fs.writeFileSync('vite.config.ts', viteConfig);
  console.log('✅ vite.config.ts criado na raiz');
  
  fs.writeFileSync('src/postcss.config.js', postcssConfig);
  fs.writeFileSync('src/tailwind.config.js', tailwindConfig);
  console.log('✅ Configs Tailwind criados em /src');
} catch (error) {
  console.error('❌ Erro ao criar configs:', error);
  process.exit(1);
}

console.log('📦 Instalando Tailwind...');
try {
  execSync('npm install --save-dev @tailwindcss/postcss@latest autoprefixer@latest', { 
    stdio: 'inherit' 
  });
  console.log('✅ Tailwind instalado!');
} catch (error) {
  console.warn('⚠️ Aviso:', error.message);
}

console.log('🚀 Rodando build...');
try {
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('✅ Build concluído!');
} catch (error) {
  console.error('❌ Erro no build:', error);
  process.exit(1);
}

console.log('📊 Verificando output...');
if (fs.existsSync('build/index.html')) {
  const files = fs.readdirSync('build');
  console.log(`✅ Build OK - ${files.length} arquivos`);
} else {
  console.error('❌ Build falhou');
  process.exit(1);
}
