// ═══════════════════════════════════════════════════════════════════════════
// 🔍 VERIFICAR SE DADOS PNBOIA ESTÃO DISPONÍVEIS AGORA
// ═══════════════════════════════════════════════════════════════════════════
//
// OBJETIVO: Verificar se o sistema PNBOIA está funcionando após adicionar secrets
//
// COMO USAR:
// 1. Abrir Console (F12)
// 2. Copiar e colar este código
// 3. Pressionar Enter
// 4. Ver resultado
//
// ═══════════════════════════════════════════════════════════════════════════

(async () => {
  console.log('🌊 ════════════════════════════════════════════════════════════');
  console.log('   VERIFICAÇÃO PNBOIA - APÓS GITHUB ACTIONS SETUP');
  console.log('   ════════════════════════════════════════════════════════════');
  console.log('');

  try {
    // ────────────────────────────────────────────────────────────────────────
    // PASSO 1: Verificar status geral
    // ────────────────────────────────────────────────────────────────────────
    console.log('📊 [1/3] Verificando status geral...');
    
    const statusResponse = await fetch(
      'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status',
      {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o'
        }
      }
    );
    
    const statusData = await statusResponse.json();
    
    console.log('   Status HTTP:', statusResponse.status);
    console.log('   Boias ativas:', statusData.active || 0);
    console.log('   Total de boias:', statusData.total || 14);
    console.log('   Última atualização:', statusData.lastUpdate || 'Nunca');
    console.log('');

    if (!statusData.active || statusData.active === 0) {
      console.warn('   ⚠️  NENHUMA BOIA ATIVA!');
      console.log('');
      console.log('   💡 POSSÍVEIS CAUSAS:');
      console.log('      1. GitHub Actions ainda não rodou (aguarde próxima execução)');
      console.log('      2. Secrets não configurados corretamente');
      console.log('      3. Boias PNBOIA estão offline (marinha.mil.br)');
      console.log('');
      console.log('   🔧 SOLUÇÃO:');
      console.log('      Rodar sincronização manual agora (veja PASSO 3 abaixo)');
      console.log('');
    } else {
      console.log('   ✅ BOIAS DISPONÍVEIS!');
      console.log('');
    }

    // ────────────────────────────────────────────────────────────────────────
    // PASSO 2: Verificar boia específica (Santos)
    // ────────────────────────────────────────────────────────────────────────
    console.log('🎯 [2/3] Verificando boia de Santos (mais próxima do litoral)...');
    
    const boiaResponse = await fetch(
      'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/santos',
      {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o'
        }
      }
    );
    
    const boiaData = await boiaResponse.json();
    
    console.log('   Status HTTP:', boiaResponse.status);
    
    if (boiaResponse.status === 200 && boiaData.waveHeight) {
      console.log('   ✅ DADOS ENCONTRADOS!');
      console.log('   📊 Altura da onda:', boiaData.waveHeight, 'm');
      console.log('   📏 Período:', boiaData.wavePeriod, 's');
      console.log('   🧭 Direção:', boiaData.waveDirection, '°');
      console.log('   ⏰ Timestamp:', new Date(boiaData.timestamp).toLocaleString('pt-BR'));
      console.log('');
      console.log('   🎉 PERFEITO! Sistema PNBOIA funcionando!');
    } else {
      console.warn('   ⚠️  DADOS NÃO DISPONÍVEIS');
      console.log('   Resposta:', boiaData);
      console.log('');
      console.log('   💡 Isso é normal se:');
      console.log('      • GitHub Actions ainda não rodou pela primeira vez');
      console.log('      • Boia está offline no site da Marinha');
      console.log('');
    }
    console.log('');

    // ────────────────────────────────────────────────────────────────────────
    // PASSO 3: Sugestão de ação
    // ────────────────────────────────────────────────────────────────────────
    console.log('⚡ [3/3] Próximos passos...');
    console.log('');

    if (!statusData.active || statusData.active === 0) {
      console.log('   🔧 EXECUTAR SINCRONIZAÇÃO MANUAL AGORA:');
      console.log('');
      console.log('   1. Ir para: https://github.com/SEU_USUARIO/SEU_REPO/actions');
      console.log('   2. Clicar em: "PNBOIA Auto Sync"');
      console.log('   3. Clicar em: "Run workflow" (dropdown)');
      console.log('   4. Clicar em: "Run workflow" (botão verde)');
      console.log('   5. Aguardar 1-2 minutos');
      console.log('   6. Rodar este script novamente');
      console.log('');
      console.log('   Ou copiar e colar este código para disparar via API:');
      console.log('');
      console.log('   // Disparar sincronização manual');
      console.log('   await fetch(');
      console.log('     "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false",');
      console.log('     {');
      console.log('       method: "POST",');
      console.log('       headers: {');
      console.log('         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o"');
      console.log('       }');
      console.log('     }');
      console.log('   );');
      console.log('');
    } else {
      console.log('   ✅ SISTEMA FUNCIONANDO CORRETAMENTE!');
      console.log('');
      console.log('   📅 CRONOGRAMA AUTOMÁTICO (24/7):');
      console.log('      • A cada 3 horas (00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 UTC)');
      console.log('      • 8 sincronizações por dia');
      console.log('      • Dados sempre frescos');
      console.log('');
      console.log('   🎯 AGORA QUANDO VOCÊ ADICIONAR OBSERVAÇÕES:');
      console.log('      ✅ Dados PNBOIA estarão disponíveis');
      console.log('      ✅ Bias correction funcionará perfeitamente');
      console.log('      ✅ Calibração será precisa');
      console.log('');
    }

  } catch (error) {
    console.error('❌ ERRO:', error.message);
    console.log('');
    console.log('💡 POSSÍVEIS CAUSAS:');
    console.log('   • Edge Function offline (temporário)');
    console.log('   • Problema de rede');
    console.log('   • Aguardar alguns minutos e tentar novamente');
  }

  console.log('');
  console.log('════════════════════════════════════════════════════════════');
  console.log('🎉 VERIFICAÇÃO CONCLUÍDA!');
  console.log('════════════════════════════════════════════════════════════');
})();
