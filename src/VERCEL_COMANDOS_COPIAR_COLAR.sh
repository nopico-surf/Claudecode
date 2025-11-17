#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# VERCEL DEPLOY - COMANDOS PRONTOS (COPIAR E COLAR)
# ═══════════════════════════════════════════════════════════════════════════

echo "🚀 INICIANDO DEPLOY VERCEL..."
echo ""

# ═════════════════════════════════════════════════════════════════════════
# PASSO 1: INSTALAR DEPENDÊNCIAS
# ═════════════════════════════════════════════════════════════════════════

echo "📦 Passo 1/5: Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Erro ao instalar dependências!"
  exit 1
fi

echo "✅ Dependências instaladas!"
echo ""

# ═════════════════════════════════════════════════════════════════════════
# PASSO 2: INSTALAR VERCEL CLI
# ═════════════════════════════════════════════════════════════════════════

echo "📦 Passo 2/5: Instalando Vercel CLI..."
npm install -g vercel

if [ $? -ne 0 ]; then
  echo "❌ Erro ao instalar Vercel CLI!"
  exit 1
fi

echo "✅ Vercel CLI instalado!"
echo ""

# ═════════════════════════════════════════════════════════════════════════
# PASSO 3: LOGIN VERCEL
# ═════════════════════════════════════════════════════════════════════════

echo "🔐 Passo 3/5: Login Vercel..."
echo "   → Vai abrir o navegador para autenticar"
echo ""

vercel login

if [ $? -ne 0 ]; then
  echo "❌ Erro ao fazer login!"
  exit 1
fi

echo "✅ Login realizado!"
echo ""

# ═════════════════════════════════════════════════════════════════════════
# PASSO 4: DEPLOY PRODUÇÃO
# ═════════════════════════════════════════════════════════════════════════

echo "🚀 Passo 4/5: Fazendo deploy em produção..."
echo "   → Isso pode levar 2-3 minutos"
echo ""

vercel --prod

if [ $? -ne 0 ]; then
  echo "❌ Erro ao fazer deploy!"
  exit 1
fi

echo ""
echo "✅ Deploy concluído!"
echo ""

# ═════════════════════════════════════════════════════════════════════════
# PASSO 5: INSTRUÇÕES FINAIS
# ═════════════════════════════════════════════════════════════════════════

echo "═══════════════════════════════════════════════════════════════════════"
echo "🎉 DEPLOY REALIZADO COM SUCESSO!"
echo "═══════════════════════════════════════════════════════════════════════"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1️⃣ COPIAR URL DO PROJETO"
echo "   A URL foi exibida acima (exemplo: https://nopico-xxxx.vercel.app)"
echo ""
echo "2️⃣ TESTAR ENDPOINT"
echo "   Abra no navegador:"
echo "   https://SEU-PROJETO.vercel.app/api/pnboia/pnboia-florianopolis"
echo ""
echo "3️⃣ CRIAR ARQUIVO DE CONFIGURAÇÃO"
echo "   Criar: /services/vercelConfig.ts"
echo ""
echo "   Conteúdo:"
echo "   ───────────────────────────────────────────────────────────────────"
echo "   export const VERCEL_API_URL = 'https://SEU-PROJETO.vercel.app/api';"
echo "   export const USE_VERCEL_BACKEND = true;"
echo "   ───────────────────────────────────────────────────────────────────"
echo ""
echo "4️⃣ CONFIGURAR CRON JOB (Atualização automática)"
echo "   → Acessar: https://vercel.com/seu-projeto/settings/cron"
echo "   → Path: /api/pnboia/sync-all"
echo "   → Schedule: 0 */3 * * * (a cada 3 horas)"
echo ""
echo "5️⃣ MONITORAR LOGS"
echo "   → https://vercel.com/seu-projeto/logs"
echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo ""
echo "📚 Documentação completa:"
echo "   - VERCEL_SETUP_GUIA_COMPLETO.md"
echo "   - VERCEL_DIAGRAMA_VISUAL.md"
echo ""
echo "✅ Tudo pronto! 🌊🏄‍♂️"
echo ""
