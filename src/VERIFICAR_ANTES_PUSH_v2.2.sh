#!/bin/bash

echo "🔍 VERIFICAÇÃO PRÉ-PUSH v2.2"
echo "=============================="
echo ""

echo "1️⃣ Verificando se _headers é ARQUIVO (não pasta)..."
if [ -f "public/_headers" ]; then
  echo "   ✅ public/_headers é um ARQUIVO"
  echo "   📄 Tamanho: $(wc -c < public/_headers) bytes"
else
  if [ -d "public/_headers" ]; then
    echo "   ❌ ERRO: public/_headers é uma PASTA!"
    echo "   🚨 DELETAR pasta antes do push!"
    exit 1
  else
    echo "   ❌ ERRO: public/_headers não existe!"
    exit 1
  fi
fi

echo ""
echo "2️⃣ Verificando se favicon.svg existe..."
if [ -f "public/favicon.svg" ]; then
  echo "   ✅ public/favicon.svg existe"
  echo "   📄 Tamanho: $(wc -c < public/favicon.svg) bytes"
else
  echo "   ❌ ERRO: public/favicon.svg não existe!"
  exit 1
fi

echo ""
echo "3️⃣ Verificando se favicon.png existe..."
if [ -f "public/favicon.png" ]; then
  echo "   ✅ public/favicon.png existe"
  echo "   📄 Tamanho: $(wc -c < public/favicon.png) bytes"
else
  echo "   ⚠️  AVISO: public/favicon.png não existe (opcional)"
fi

echo ""
echo "4️⃣ Verificando conteúdo do _headers..."
if grep -q "v2.2" "public/_headers"; then
  echo "   ✅ _headers contém versão v2.2"
else
  echo "   ⚠️  AVISO: _headers não contém v2.2"
fi

echo ""
echo "5️⃣ Verificando HTML..."
if grep -q "v=2.2" "index.html"; then
  echo "   ✅ index.html contém favicon v=2.2"
else
  echo "   ⚠️  AVISO: index.html não contém favicon v=2.2"
fi

echo ""
echo "6️⃣ Verificando App.tsx..."
if grep -q "v2.2" "App.tsx"; then
  echo "   ✅ App.tsx contém versão v2.2"
else
  echo "   ⚠️  AVISO: App.tsx não contém v2.2"
fi

echo ""
echo "=============================="
echo "✅ VERIFICAÇÃO COMPLETA!"
echo ""
echo "Se todos os checks passaram, pode fazer:"
echo "  git add ."
echo "  git commit -m 'fix: favicon v2.2 - _headers definitivamente como arquivo'"
echo "  git push origin main"
