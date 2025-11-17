const fs = require('fs');
const path = require('path');

console.log('🔧 Corrigindo estrutura antes do build...');

// Verificar se estamos no ambiente correto (GitHub Actions ou Vercel)
const isCI = process.env.CI || process.env.VERCEL;

if (isCI) {
  console.log('🌐 Ambiente detectado: GitHub/Vercel');
  
  // Sobrescrever vite.config.ts com versão para /src/
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: './src',
  publicDir: resolve(__dirname, './public'),
  css: {
    postcss: {
      plugins: []
    }
  },
  build: {
    outDir: resolve(__dirname, './build'),
    emptyOutDir: true,
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});`;

  fs.writeFileSync('vite.config.ts', viteConfig);
  console.log('✅ vite.config.ts corrigido para /src/');

  // Criar postcss.config.js se não existir
  const postcssConfig = `export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};`;
  
  if (!fs.existsSync('postcss.config.js')) {
    fs.writeFileSync('postcss.config.js', postcssConfig);
    console.log('✅ postcss.config.js criado');
  }

  // Criar tailwind.config.js se não existir
  const tailwindConfig = `export default {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
  
  if (!fs.existsSync('tailwind.config.js')) {
    fs.writeFileSync('tailwind.config.js', tailwindConfig);
    console.log('✅ tailwind.config.js criado');
  }
} else {
  console.log('🏠 Ambiente local detectado - mantendo vite.config.ts original');
}

// Garantir que /src/index.html existe e está correto
const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Previsão de ondas por nível de surf para todos os picos do Brasil. Consulte altura das ondas, direção do vento, maré e temperatura da água em tempo real." />
    <meta name="keywords" content="surf, ondas, previsão, Brasil, picos de surf, forecast" />
    <title>Previsão de ondas por nível de surf | nopico.com.br</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>`;

const srcIndexPath = path.join('src', 'index.html');
if (!fs.existsSync('src')) {
  fs.mkdirSync('src', { recursive: true });
  console.log('✅ Diretório /src criado');
}

if (!fs.existsSync(srcIndexPath)) {
  fs.writeFileSync(srcIndexPath, indexHtml);
  console.log('✅ /src/index.html criado');
} else {
  console.log('✅ /src/index.html já existe');
}

console.log('🚀 Estrutura corrigida! Iniciando build...');
