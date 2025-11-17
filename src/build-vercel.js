const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando build customizado para Vercel...');
console.log('');

// ============================================================================
// DETECTAR ESTRUTURA: Figma Make (raiz) ou GitHub (com /src)
// ============================================================================
const hasSrcFolder = fs.existsSync('src');
console.log(`📁 Estrutura detectada: ${hasSrcFolder ? 'GitHub (com /src)' : 'Figma Make (raiz)'}`);
console.log('');

// ============================================================================
// PASSO 1: Garantir que configs do Tailwind existem no local correto
// ============================================================================
const configDir = hasSrcFolder ? 'src' : '.';
console.log(`📝 PASSO 1: Verificando configs em /${configDir}/...`);

// Criar diretório src se necessário
if (hasSrcFolder && !fs.existsSync('src')) {
  fs.mkdirSync('src', { recursive: true });
  console.log('✅ Diretório /src criado');
}

// postcss.config.js
const postcssPath = path.join(configDir, 'postcss.config.js');
if (!fs.existsSync(postcssPath)) {
  const postcssConfig = `export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};`;
  
  fs.writeFileSync(postcssPath, postcssConfig);
  console.log(`✅ ${postcssPath} criado`);
} else {
  console.log(`✅ ${postcssPath} já existe`);
}

// tailwind.config.js
const tailwindPath = path.join(configDir, 'tailwind.config.js');
if (!fs.existsSync(tailwindPath)) {
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
  
  fs.writeFileSync(tailwindPath, tailwindConfig);
  console.log(`✅ ${tailwindPath} criado`);
} else {
  console.log(`✅ ${tailwindPath} já existe`);
}

console.log('');

// ============================================================================
// PASSO 2: Criar vite.config.ts na RAIZ
// ============================================================================
console.log('📝 PASSO 2: Criando vite.config.ts na raiz...');

const viteConfig = hasSrcFolder 
  ? `import { defineConfig } from 'vite';
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
    postcss: './src/postcss.config.js'
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
});`
  : `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: './build',
    emptyOutDir: true,
    sourcemap: false
  }
});`;

fs.writeFileSync('vite.config.ts', viteConfig);
console.log('✅ vite.config.ts criado na raiz');
console.log('');

// ============================================================================
// PASSO 3: Verificar index.html
// ============================================================================
console.log('📝 PASSO 3: Verificando index.html...');

const indexHtmlPath = hasSrcFolder ? path.join('src', 'index.html') : 'index.html';

if (!fs.existsSync(indexHtmlPath)) {
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
    <script type="module" src="${hasSrcFolder ? '/main.tsx' : './main.tsx'}"></script>
  </body>
</html>`;
  
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log(`✅ ${indexHtmlPath} criado`);
} else {
  console.log(`✅ ${indexHtmlPath} já existe`);
}
console.log('');

// ============================================================================
// PASSO 4: Instalar @tailwindcss/postcss se necessário
// ============================================================================
console.log('📦 PASSO 4: Verificando @tailwindcss/postcss...');

try {
  require.resolve('@tailwindcss/postcss');
  console.log('✅ @tailwindcss/postcss já instalado');
} catch (e) {
  console.log('📦 Instalando @tailwindcss/postcss...');
  execSync('npm install --save-dev @tailwindcss/postcss@^4.0.0 autoprefixer@^10.4.20 postcss@^8.4.47', { stdio: 'inherit' });
  console.log('✅ @tailwindcss/postcss instalado');
}
console.log('');

// ============================================================================
// PASSO 5: Rodar o build do Vite
// ============================================================================
console.log('🏗️  PASSO 5: Rodando build do Vite...');
console.log('');

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('');
  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro no build:', error.message);
  process.exit(1);
}

// ============================================================================
// PASSO 6: Verificar se o build foi gerado
// ============================================================================
console.log('');
console.log('🔍 PASSO 6: Verificando arquivos gerados...');

const buildDir = 'build';
if (fs.existsSync(buildDir)) {
  const files = fs.readdirSync(buildDir);
  console.log(`✅ Build gerado em /${buildDir}/ com ${files.length} arquivos`);
  
  // Verificar se tem CSS
  const hasCSS = files.some(file => file.endsWith('.css'));
  if (hasCSS) {
    console.log('✅ Arquivo CSS gerado com sucesso!');
  } else {
    console.warn('⚠️  ATENÇÃO: Nenhum arquivo CSS encontrado no build!');
  }
  
  // Verificar se tem JS
  const hasJS = files.some(file => file.endsWith('.js'));
  if (hasJS) {
    console.log('✅ Arquivos JavaScript gerados com sucesso!');
  }
  
  // Verificar se tem index.html
  if (files.includes('index.html')) {
    console.log('✅ index.html gerado com sucesso!');
  }
} else {
  console.error('❌ Diretório /build não foi criado!');
  process.exit(1);
}

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('🎉 BUILD CONCLUÍDO COM SUCESSO!');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('📦 Arquivos prontos em /build/');
console.log('🚀 Deploy pode prosseguir!');
console.log('');
