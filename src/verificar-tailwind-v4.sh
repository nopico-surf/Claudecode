#!/bin/bash

echo "🔍 VERIFICANDO CONFIGURAÇÃO TAILWIND CSS V4..."
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0

# 1. Verificar postcss.config.js
echo "1️⃣  Verificando /postcss.config.js..."
if [ -f "postcss.config.js" ]; then
    if grep -q "@tailwindcss/postcss" "postcss.config.js"; then
        echo -e "${GREEN}✅ postcss.config.js com @tailwindcss/postcss${NC}"
    else
        echo -e "${RED}❌ postcss.config.js sem @tailwindcss/postcss${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}❌ postcss.config.js não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 2. Verificar tailwind.config.js
echo "2️⃣  Verificando /tailwind.config.js..."
if [ -f "tailwind.config.js" ]; then
    if grep -q "content:" "tailwind.config.js"; then
        echo -e "${GREEN}✅ tailwind.config.js com content paths${NC}"
    else
        echo -e "${RED}❌ tailwind.config.js sem content paths${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}❌ tailwind.config.js não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 3. Verificar globals.css
echo "3️⃣  Verificando /styles/globals.css..."
if [ -f "styles/globals.css" ]; then
    if grep -q "@tailwind base" "styles/globals.css"; then
        echo -e "${GREEN}✅ globals.css com @tailwind directives${NC}"
    else
        echo -e "${RED}❌ globals.css sem @tailwind directives${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}❌ styles/globals.css não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 4. Verificar package.json
echo "4️⃣  Verificando /package.json..."
if [ -f "package.json" ]; then
    if grep -q "@tailwindcss/postcss" "package.json"; then
        echo -e "${GREEN}✅ package.json com @tailwindcss/postcss${NC}"
    else
        echo -e "${YELLOW}⚠️  package.json sem @tailwindcss/postcss (será instalado no build)${NC}"
    fi
    if grep -q "autoprefixer" "package.json"; then
        echo -e "${GREEN}✅ package.json com autoprefixer${NC}"
    else
        echo -e "${YELLOW}⚠️  package.json sem autoprefixer${NC}"
    fi
else
    echo -e "${RED}❌ package.json não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 5. Verificar vite.config.ts
echo "5️⃣  Verificando /vite.config.ts..."
if [ -f "vite.config.ts" ]; then
    if grep -q "postcss" "vite.config.ts"; then
        echo -e "${GREEN}✅ vite.config.ts com configuração PostCSS${NC}"
    else
        echo -e "${RED}❌ vite.config.ts sem configuração PostCSS${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}❌ vite.config.ts não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# Resultado final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ TUDO CONFIGURADO CORRETAMENTE!${NC}"
    echo ""
    echo "🚀 Você pode fazer push agora:"
    echo "   git add ."
    echo "   git commit -m \"fix: configurar Tailwind CSS v4\""
    echo "   git push"
else
    echo -e "${RED}❌ ENCONTRADOS $errors ERROS!${NC}"
    echo ""
    echo "📋 Revise os arquivos acima e corrija os problemas."
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Mostrar conteúdo dos arquivos principais
echo "📄 CONTEÚDO DOS ARQUIVOS:"
echo ""

echo "▶️  postcss.config.js:"
cat postcss.config.js 2>/dev/null || echo "Arquivo não encontrado"
echo ""

echo "▶️  tailwind.config.js:"
cat tailwind.config.js 2>/dev/null || echo "Arquivo não encontrado"
echo ""

echo "▶️  styles/globals.css (primeiras 5 linhas):"
head -n 5 styles/globals.css 2>/dev/null || echo "Arquivo não encontrado"
echo ""
