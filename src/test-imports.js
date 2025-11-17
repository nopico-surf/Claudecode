#!/usr/bin/env node

/**
 * Script para testar se há imports incorretos antes do deploy
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando imports antes do deploy...\n');

const problematicPatterns = [
  /@radix-ui\/react-[a-z-]+@[\d.]+/g,
  /lucide-react@[\d.]+/g,
  /class-variance-authority@[\d.]+/g,
  /sonner@[\d.]+/g,
  /next-themes@[\d.]+/g,
  /react-day-picker@[\d.]+/g,
  /embla-carousel-react@[\d.]+/g,
  /cmdk@[\d.]+/g,
  /input-otp@[\d.]+/g,
  /react-resizable-panels@[\d.]+/g,
  /recharts@[\d.]+/g,
  /vaul@[\d.]+/g,
];

// Exceções permitidas
const allowedPatterns = [
  'react-hook-form@7.55.0', // Especificado nas instruções
  'jsr:@supabase/supabase-js@', // Arquivo protegido kv_store.tsx
];

let hasErrors = false;
let totalFiles = 0;
let totalIssues = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.relative(process.cwd(), filePath);
  let fileHasIssues = false;

  problematicPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // Verificar se é uma exceção permitida
        const isAllowed = allowedPatterns.some(allowed => match.includes(allowed));
        if (!isAllowed) {
          if (!fileHasIssues) {
            console.log(`❌ ${fileName}:`);
            fileHasIssues = true;
            hasErrors = true;
          }
          console.log(`   → ${match}`);
          totalIssues++;
        }
      });
    }
  });

  totalFiles++;
  return fileHasIssues;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== 'build' && file !== '.git') {
      scanDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      checkFile(filePath);
    }
  });
}

// Verificar diretórios principais
const dirsToCheck = ['components', 'services', 'hooks', 'data'];

dirsToCheck.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    scanDirectory(dirPath);
  }
});

console.log('\n' + '='.repeat(50));
console.log(`📊 Total: ${totalFiles} arquivos verificados`);

if (hasErrors) {
  console.log(`❌ ERRO: ${totalIssues} imports incorretos encontrados!`);
  console.log('='.repeat(50));
  console.log('\n💡 Execute: node fix-imports.js\n');
  process.exit(1);
} else {
  console.log(`✅ Nenhum import incorreto encontrado!`);
  console.log('='.repeat(50));
  console.log('\n🚀 Pronto para deploy!\n');
  process.exit(0);
}
