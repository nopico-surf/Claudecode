#!/bin/bash

echo "🔍 VERIFICAÇÃO RÁPIDA - TAILWIND CSS V4"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

errors=0

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 VERIFICANDO ARQUIVOS..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. postcss.config.js
echo "1️⃣  /postcss.config.js"
if [ -f "postcss.config.js" ]; then
    if grep -q "@tailwindcss/postcss" "postcss.config.js"; then
        echo -e "${GREEN}   ✅ Existe com @tailwindcss/postcss${NC}"
    else
        echo -e "${RED}   ❌ Existe mas sem @tailwindcss/postcss${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 2. tailwind.config.js
echo "2️⃣  /tailwind.config.js"
if [ -f "tailwind.config.js" ]; then
    if grep -q "index.html" "tailwind.config.js"; then
        echo -e "${GREEN}   ✅ Existe com index.html no content${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Existe mas sem index.html explícito${NC}"
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 3. styles/globals.css
echo "3️⃣  /styles/globals.css"
if [ -f "styles/globals.css" ]; then
    if grep -q "@tailwind base" "styles/globals.css"; then
        echo -e "${GREEN}   ✅ Existe com @tailwind directives${NC}"
    else
        echo -e "${RED}   ❌ Existe mas sem @tailwind directives${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 4. package.json
echo "4️⃣  /package.json"
if [ -f "package.json" ]; then
    if grep -q "@tailwindcss/postcss" "package.json"; then
        echo -e "${GREEN}   ✅ Existe com @tailwindcss/postcss${NC}"
    else
        echo -e "${RED}   ❌ Existe mas sem @tailwindcss/postcss${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 5. build-vercel.js
echo "5️⃣  /build-vercel.js"
if [ -f "build-vercel.js" ]; then
    if grep -q "hasSrcFolder" "build-vercel.js"; then
        echo -e "${GREEN}   ✅ Existe com detecção inteligente${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Existe mas sem detecção de estrutura${NC}"
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 6. vercel.json
echo "6️⃣  /vercel.json"
if [ -f "vercel.json" ]; then
    if grep -q "build-vercel.js" "vercel.json"; then
        echo -e "${GREEN}   ✅ Existe com buildCommand correto${NC}"
    else
        echo -e "${RED}   ❌ Existe mas sem buildCommand${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 7. index.html
echo "7️⃣  /index.html"
if [ -f "index.html" ]; then
    if grep -q "main.tsx" "index.html"; then
        echo -e "${GREEN}   ✅ Existe com script main.tsx${NC}"
    else
        echo -e "${RED}   ❌ Existe mas sem script main.tsx${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# 8. main.tsx
echo "8️⃣  /main.tsx"
if [ -f "main.tsx" ]; then
    if grep -q "globals.css" "main.tsx"; then
        echo -e "${GREEN}   ✅ Existe com import globals.css${NC}"
    else
        echo -e "${RED}   ❌ Existe mas sem import globals.css${NC}"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}   ❌ Não encontrado${NC}"
    errors=$((errors + 1))
fi
echo ""

# Resultado final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ TUDO CORRETO! PRONTO PARA PUSH!${NC}"
    echo ""
    echo "🚀 Execute:"
    echo "   git add ."
    echo "   git commit -m \"feat: configurar Tailwind CSS v4 final\""
    echo "   git push"
else
    echo -e "${RED}❌ ENCONTRADOS $errors ERROS!${NC}"
    echo ""
    echo "📋 Revise os arquivos acima antes do push."
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
