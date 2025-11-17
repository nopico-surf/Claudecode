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

// 2. Criar tailwind.config.js em /src com PATHS ABSOLUTOS
const tailwindConfig = `import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.resolve(__dirname, './index.html'),
    path.resolve(__dirname, './**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, './admin/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

try {
  fs.writeFileSync('vite.config.ts', viteConfig);
  console.log('✅ vite.config.ts criado');
  
  fs.writeFileSync('src/tailwind.config.js', tailwindConfig);
  console.log('✅ tailwind.config.js criado com paths absolutos');
} catch (error) {
  console.error('❌ Erro:', error);
  process.exit(1);
}

console.log('🔍 Listando arquivos React/TS em /src...');
try {
  const files = execSync('find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | grep -v node_modules | head -30').toString();
  console.log(files);
  console.log('📊 Total de arquivos encontrados:', files.split('\n').filter(f => f).length);
} catch (e) {
  console.warn('⚠️ Não foi possível listar arquivos');
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
  process.exit(1);
}

console.log('📊 Analisando CSS gerado...');
if (fs.existsSync('build')) {
  const files = fs.readdirSync('build/assets');
  const cssFiles = files.filter(f => f.endsWith('.css'));
  
  console.log(`✅ Build OK`);
  console.log(`📁 Arquivos CSS gerados:`);
  
  cssFiles.forEach(file => {
    const fullPath = path.join('build/assets', file);
    const size = fs.statSync(fullPath).size;
    const sizeKB = (size / 1024).toFixed(2);
    console.log(`   ${file}: ${sizeKB} KB`);
    
    if (size < 5000) {
      console.warn(`   ⚠️ ALERTA: CSS muito pequeno! Tailwind pode não estar compilando tudo.`);
    }
  });
} else {
  console.error('❌ Build falhou');
  process.exit(1);
}
