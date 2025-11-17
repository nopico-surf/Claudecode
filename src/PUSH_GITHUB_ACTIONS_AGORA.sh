#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# 🚀 PUSH GITHUB ACTIONS - SCRIPT AUTOMÁTICO
# ═══════════════════════════════════════════════════════════════════════════

echo "════════════════════════════════════════════════════════════════"
echo "🚀 PUSH GITHUB ACTIONS - AUTOMÁTICO"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Este script vai fazer push do workflow para o GitHub."
echo ""
echo "⚠️  IMPORTANTE: Figma Make NÃO consegue fazer push de .github/"
echo "   Por isso este push manual é OBRIGATÓRIO!"
echo ""

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ ERRO: Git não está instalado!"
    echo ""
    echo "SOLUÇÃO:"
    echo "  • Windows: https://git-scm.com/download/win"
    echo "  • Mac: brew install git"
    echo "  • Linux: sudo apt install git"
    echo ""
    exit 1
fi

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
    echo "❌ ERRO: Esta pasta não é um repositório Git!"
    echo ""
    echo "SOLUÇÃO:"
    echo "  1. Navegue até a pasta do projeto"
    echo "  2. Execute este script novamente"
    echo ""
    exit 1
fi

echo "✅ Git detectado!"
echo ""

# Verificar se arquivo existe
if [ ! -f ".github/workflows/pnboia-sync.yml" ]; then
    echo "❌ ERRO: Arquivo .github/workflows/pnboia-sync.yml não encontrado!"
    echo ""
    echo "SOLUÇÃO:"
    echo "  • Aguardar Figma Make criar o arquivo"
    echo "  • OU verificar se pasta .github existe"
    echo ""
    exit 1
fi

echo "✅ Arquivo encontrado: .github/workflows/pnboia-sync.yml"
echo ""

# Mostrar status atual
echo "📋 Status atual do Git:"
echo "────────────────────────────────────────────────────────────────"
git status --short
echo "────────────────────────────────────────────────────────────────"
echo ""

# Confirmar com usuário
read -p "Deseja continuar com o push? (digite 'sim' para confirmar): " confirma

if [ "$confirma" != "sim" ]; then
    echo ""
    echo "❌ Cancelado pelo usuário"
    echo ""
    exit 0
fi

echo ""
echo "🚀 Iniciando push..."
echo ""

# Adicionar .github/ ao Git
echo "1️⃣  Adicionando .github/ ao Git..."
git add .github/

# Verificar se há algo para commitar
if git diff --cached --quiet; then
    echo ""
    echo "ℹ️  Nenhuma mudança para commitar"
    echo "   Arquivo já está no GitHub ou não foi modificado"
    echo ""
    
    # Verificar se workflow já existe no GitHub
    echo "🔍 Verificando se workflow já existe no GitHub..."
    echo ""
    echo "Por favor, verifique manualmente:"
    echo "  GitHub → Code → .github → workflows → pnboia-sync.yml"
    echo ""
    echo "SE EXISTE:"
    echo "  ✅ Push já foi feito anteriormente"
    echo "  ➡️  Ir para GitHub → Actions e atualizar (F5)"
    echo ""
    echo "SE NÃO EXISTE:"
    echo "  ❌ Problema desconhecido"
    echo "  ➡️  Fazer push manual (ver instruções no arquivo)"
    echo ""
    exit 0
fi

# Fazer commit
echo "2️⃣  Criando commit..."
git commit -m "feat: adicionar GitHub Actions para sincronização automática PNBOIA

- Workflow automático a cada 3 horas
- Mantém dados das boias sempre atualizados
- Independente de tráfego do site
- 8 execuções por dia
- Elimina dados MOCK (sempre dados reais)"

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERRO ao fazer commit!"
    echo ""
    echo "Possíveis causas:"
    echo "  • Git não está configurado (nome/email)"
    echo "  • Conflito com commit anterior"
    echo ""
    echo "SOLUÇÃO:"
    echo "  git config --global user.name \"Seu Nome\""
    echo "  git config --global user.email \"seu@email.com\""
    echo ""
    exit 1
fi

echo "✅ Commit criado com sucesso!"
echo ""

# Fazer push
echo "3️⃣  Enviando para GitHub..."

# Tentar main primeiro
git push origin main 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Push para 'main' bem-sucedido!"
else
    # Se falhar, tentar master
    echo "⚠️  Branch 'main' não encontrada, tentando 'master'..."
    git push origin master 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Push para 'master' bem-sucedido!"
    else
        echo ""
        echo "❌ ERRO ao fazer push!"
        echo ""
        echo "Possíveis causas:"
        echo "  • Não tem permissão para fazer push"
        echo "  • Branch não existe (nem main nem master)"
        echo "  • Conflito com commits remotos"
        echo ""
        echo "SOLUÇÃO:"
        echo "  1. Verificar qual é a branch principal:"
        echo "     git branch"
        echo ""
        echo "  2. Fazer push para a branch correta:"
        echo "     git push origin NOME_DA_BRANCH"
        echo ""
        exit 1
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ PUSH CONCLUÍDO COM SUCESSO!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo ""
echo "1. Aguardar 30 segundos (GitHub processar)"
echo ""
echo "2. Ir para: GitHub.com → Seu Repo → Code"
echo "   Navegar: .github → workflows → pnboia-sync.yml"
echo "   Verificar: Arquivo aparece? ✅"
echo ""
echo "3. Ir para: GitHub.com → Seu Repo → Actions"
echo "   Atualizar: Pressionar F5"
echo "   Verificar: 'PNBOIA Auto Sync' aparece? ✅"
echo ""
echo "4. Testar: Clicar em 'Run workflow'"
echo "   Aguardar: 30-60 segundos"
echo "   Ver logs: '✅ 14/14 boias sincronizadas'"
echo ""
echo "5. Verificar Admin: /admin → Boias PNBOIA"
echo "   Dados: MOCK → REAL ✅"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🎉 AGORA O GITHUB ACTIONS VAI RODAR AUTOMATICAMENTE A CADA 3H!"
echo "🎉 DADOS DAS BOIAS NUNCA MAIS VÃO FICAR OBSOLETOS (MOCK)!"
echo ""
