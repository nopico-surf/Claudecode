const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Corrigindo configurações...');

// 1. Criar vite.config.ts
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});`;

// 2. Criar tailwind.config.js COMPLETO em /src
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-500',
    'text-red-500',
    // Adicione classes que podem ser dinâmicas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

try {
  fs.writeFileSync('vite.config.ts', viteConfig);
  console.log('✅ vite.config.ts criado');
  
  // Criar tailwind.config.js em /src (se não existir)
  if (!fs.existsSync('src/tailwind.config.js')) {
    fs.writeFileSync('src/tailwind.config.js', tailwindConfig);
    console.log('✅ tailwind.config.js criado em /src');
  } else {
    console.log('✅ tailwind.config.js já existe');
  }
} catch (error) {
  console.error('❌ Erro:', error);
  process.exit(1);
}

console.log('📦 Instalando dependências...');
try {
  execSync('npm install --prefer-offline --no-audit', { stdio: 'inherit' });
  console.log('✅ Dependências instaladas');
} catch (error) {
  console.warn('⚠️ Aviso:', error.message);
}

console.log('🚀 Rodando build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build concluído!');
} catch (error) {
  console.error('❌ Erro no build:', error);
  
  // Se falhar, mostrar mais detalhes
  console.log('📋 Listando arquivos /src:');
  try {
    const files = execSync('find src -name "*.tsx" -o -name "*.jsx" | head -20').toString();
    console.log(files);
  } catch (e) {}
  
  process.exit(1);
}

console.log('📊 Verificando output...');
if (fs.existsSync('build/index.html')) {
  const files = fs.readdirSync('build');
  const cssFiles = files.filter(f => f.endsWith('.css'));
  
  console.log(`✅ Build OK - ${files.length} arquivos`);
  console.log(`🎨 Arquivos CSS:`);
  
  cssFiles.forEach(file => {
    const size = fs.statSync(path.join('build', file)).size;
    console.log(`   ${file}: ${(size / 1024).toFixed(2)} KB`);
  });
} else {
  console.error('❌ Build falhou - sem index.html');
  process.exit(1);
}
