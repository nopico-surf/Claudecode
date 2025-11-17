#!/usr/bin/env node

/**
 * Script para corrigir imports com versões incorretas
 * Remove @version de todos os imports de pacotes
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Iniciando correção de imports...\n');

// Padrões a corrigir (remover @versão)
const patterns = [
  // Radix UI
  { regex: /@radix-ui\/(react-[a-z-]+)@[\d.]+/g, replacement: '@radix-ui/$1' },
  // Lucide React
  { regex: /lucide-react@[\d.]+/g, replacement: 'lucide-react' },
  // Class Variance Authority
  { regex: /class-variance-authority@[\d.]+/g, replacement: 'class-variance-authority' },
  // Sonner (toast notifications)
  { regex: /sonner@[\d.]+/g, replacement: 'sonner' },
  // Next Themes
  { regex: /next-themes@[\d.]+/g, replacement: 'next-themes' },
  // React Day Picker
  { regex: /react-day-picker@[\d.]+/g, replacement: 'react-day-picker' },
  // Embla Carousel
  { regex: /embla-carousel-react@[\d.]+/g, replacement: 'embla-carousel-react' },
  // CMDK (Command menu)
  { regex: /cmdk@[\d.]+/g, replacement: 'cmdk' },
  // Input OTP
  { regex: /input-otp@[\d.]+/g, replacement: 'input-otp' },
  // React Resizable Panels
  { regex: /react-resizable-panels@[\d.]+/g, replacement: 'react-resizable-panels' },
  // Recharts
  { regex: /recharts@[\d.]+/g, replacement: 'recharts' },
  // Vaul (drawer)
  { regex: /vaul@[\d.]+/g, replacement: 'vaul' },
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  let changesCount = 0;

  patterns.forEach(({ regex, replacement }) => {
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, replacement);
      changed = true;
      changesCount += matches.length;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)} - ${changesCount} imports corrigidos`);
    return changesCount;
  }

  return 0;
}

function scanDirectory(dir) {
  let totalFixed = 0;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      totalFixed += scanDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      totalFixed += fixFile(filePath);
    }
  });

  return totalFixed;
}

// Diretórios a processar
const directories = [
  path.join(process.cwd(), 'components', 'ui'),
  path.join(process.cwd(), 'components', 'admin'),
  path.join(process.cwd(), 'components'),
];

let grandTotal = 0;

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`\n📂 Processando: ${path.relative(process.cwd(), dir)}`);
    const fixed = scanDirectory(dir);
    grandTotal += fixed;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`✅ CONCLUÍDO! ${grandTotal} imports corrigidos no total.`);
console.log('='.repeat(50) + '\n');

if (grandTotal > 0) {
  console.log('✨ Todos os imports agora estão sem versões especificadas.');
  console.log('🚀 Você pode fazer push para o GitHub agora!');
} else {
  console.log('ℹ️  Nenhum import incorreto encontrado.');
}
