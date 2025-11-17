#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# 🚀 PUSH MANUAL - GITHUB ACTIONS
# ═══════════════════════════════════════════════════════════════════════════
#
# Este script faz push do workflow para o GitHub AGORA (sem aguardar)
#
# IMPORTANTE: Só use se você tem Git configurado localmente!
# Caso contrário, aguarde push automático do Figma Make.
#
# ═══════════════════════════════════════════════════════════════════════════

echo "════════════════════════════════════════════════════════════════"
echo "🚀 PUSH MANUAL - GITHUB ACTIONS"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  ATENÇÃO: Este script vai fazer push para o GitHub"
echo ""
read -p "Você tem certeza? (digite 'sim' para continuar): " confirma

if [ "$confirma" != "sim" ]; then
  echo ""
  echo "❌ Cancelado pelo usuário"
  echo ""
  exit 0
fi

echo ""
echo "📂 Verificando arquivos..."
echo ""

# Verificar se arquivo existe
if [ ! -f ".github/workflows/pnboia-sync.yml" ]; then
  echo "❌ ERRO: Arquivo .github/workflows/pnboia-sync.yml não encontrado!"
  echo ""
  echo "Possíveis causas:"
  echo "  • Figma Make ainda não criou o arquivo"
  echo "  • Arquivo está em lugar errado"
  echo ""
  echo "SOLUÇÃO: Aguardar push automático do Figma Make (2-5 min)"
  echo ""
  exit 1
fi

echo "✅ Arquivo encontrado: .github/workflows/pnboia-sync.yml"
echo ""

# Adicionar arquivo ao Git
echo "📝 Adicionando arquivo ao Git..."
git add .github/workflows/pnboia-sync.yml

# Verificar se há algo para commitar
if git diff --cached --quiet; then
  echo ""
  echo "ℹ️  Nenhuma mudança para commitar"
  echo "   Arquivo já está no GitHub ou não foi modificado"
  echo ""
  exit 0
fi

# Fazer commit
echo "💾 Criando commit..."
git commit -m "feat: adicionar GitHub Actions para sincronização PNBOIA

- Workflow automático a cada 3 horas
- Mantém dados das boias sempre atualizados
- Independente de tráfego do site
- 8 execuções por dia (00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 UTC)"

# Fazer push
echo "🚀 Enviando para GitHub..."
git push origin main || git push origin master

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ PUSH CONCLUÍDO COM SUCESSO!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo ""
echo "1. Aguardar 10-30 segundos (GitHub processar)"
echo ""
echo "2. Ir para: GitHub.com → Seu Repo → Actions"
echo ""
echo "3. Atualizar página (F5)"
echo ""
echo "4. Workflow 'PNBOIA Auto Sync' deve aparecer!"
echo ""
echo "5. Clicar em 'Run workflow' para testar agora"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
