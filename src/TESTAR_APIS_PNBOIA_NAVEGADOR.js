/**
 * ═══════════════════════════════════════════════════════════════
 * TESTE DE APIs PNBOIA - EXECUTAR NO CONSOLE DO NAVEGADOR
 * ═══════════════════════════════════════════════════════════════
 * 
 * Este teste vai:
 * 1. Tentar sincronizar boias do SEU navegador (não do GitHub Actions)
 * 2. Mostrar logs detalhados de qual API está funcionando
 * 3. Revelar se o problema é GitHub Actions bloqueado ou APIs offline
 * 
 * INSTRUÇÕES:
 * 1. Abra o site no navegador
 * 2. Aperte F12 (DevTools)
 * 3. Vá na aba "Console"
 * 4. Cole TODO este código
 * 5. Aperte Enter
 * 6. Aguarde ~15 segundos
 * 7. Copie TODO o output e me envie
 * 
 * ═══════════════════════════════════════════════════════════════
 */

console.clear();
console.log('🌊 TESTE DE APIs PNBOIA - Iniciando...\n');

const projectId = 'rqgubpqniscyoojkwltn';
const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

async function testarSincronizacao() {
  console.log('📡 Chamando endpoint de sincronização...');
  console.log(`URL: https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false`);
  console.log('');
  
  try {
    const startTime = Date.now();
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log(`⏱️ Tempo de resposta: ${elapsed}s`);
    console.log(`📊 Status HTTP: ${response.status}\n`);
    
    if (!response.ok) {
      console.error(`❌ ERRO HTTP ${response.status}`);
      const text = await response.text();
      console.error('Resposta:', text.substring(0, 500));
      return;
    }
    
    const data = await response.json();
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📊 RESULTADO DA SINCRONIZAÇÃO:');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`Total de boias: ${data.summary.total}`);
    console.log(`✅ Sucesso: ${data.summary.success}`);
    console.log(`❌ Falhas: ${data.summary.failed}`);
    console.log(`📈 Taxa de sucesso: ${data.summary.successRate}`);
    console.log('');
    
    // Analisar métodos usados
    const methods = {
      api: 0,
      scraping: 0,
      mock: 0,
      error: 0
    };
    
    data.results.forEach(r => {
      if (!r.success) {
        methods.error++;
      } else if (r.method === 'api') {
        methods.api++;
      } else if (r.method === 'scraping') {
        methods.scraping++;
      } else if (r.method === 'mock') {
        methods.mock++;
      }
    });
    
    console.log('📈 MÉTODOS DE OBTENÇÃO:');
    console.log(`   🌐 API GOOS: ${methods.api} boias`);
    console.log(`   🕷️ Scraping: ${methods.scraping} boias`);
    console.log(`   🎭 Mock data: ${methods.mock} boias`);
    console.log(`   ❌ Erros: ${methods.error} boias`);
    console.log('');
    
    // Mostrar detalhes das boias
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📋 DETALHES POR BOIA:');
    console.log('═══════════════════════════════════════════════════════════════');
    
    data.results.forEach((r, index) => {
      const icon = r.success ? '✅' : '❌';
      const method = r.method || 'N/A';
      const height = r.data?.waveHeight || 'N/A';
      const error = r.error ? ` (${r.error.substring(0, 50)}...)` : '';
      
      console.log(`${icon} ${(index + 1).toString().padStart(2, '0')}. ${r.buoyId.padEnd(30)} | Método: ${method.padEnd(10)} | Hs: ${height}m${error}`);
    });
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🔍 DIAGNÓSTICO:');
    console.log('═══════════════════════════════════════════════════════════════');
    
    if (methods.api > 0) {
      console.log('✅ API GOOS ESTÁ FUNCIONANDO!');
      console.log('   Problema: GitHub Actions pode estar bloqueado pela API');
      console.log('   Solução: Usar sincronização manual do navegador');
    } else if (methods.scraping > 0) {
      console.log('✅ SCRAPING ESTÁ FUNCIONANDO!');
      console.log('   API GOOS offline, mas scraping do site oficial funciona');
      console.log('   Solução: Continuar usando scraping como fallback');
    } else if (methods.error === data.summary.total) {
      console.log('❌ TODAS AS FONTES ESTÃO OFFLINE!');
      console.log('   APIs PNBOIA completamente inacessíveis');
      console.log('   Motivos possíveis:');
      console.log('   - Site da Marinha fora do ar');
      console.log('   - Manutenção programada');
      console.log('   - Bloqueio de IP/região');
      console.log('   Solução: Aguardar restauração ou usar apenas dados Open-Meteo');
    } else {
      console.log('⚠️ RESULTADO PARCIAL');
      console.log('   Algumas boias funcionando, outras não');
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('💾 VERIFICAR STATUS ATUAL:');
    console.log('═══════════════════════════════════════════════════════════════');
    
    // Verificar status das boias
    const statusResponse = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );
    
    const statusData = await statusResponse.json();
    
    console.log(`Total de boias: ${statusData.total}`);
    console.log(`Ativas: ${statusData.active}`);
    console.log(`Com dados antigos: ${statusData.stale}`);
    console.log(`Offline: ${statusData.offline}`);
    console.log(`Última sincronização global: ${statusData.lastGlobalSync}`);
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('✅ TESTE CONCLUÍDO!');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('Por favor, COPIE TODO ESTE LOG e envie para análise.');
    console.log('');
    
    // Retornar dados para análise
    return {
      sincronizacao: data,
      status: statusData,
      diagnostico: {
        temDadosReais: methods.api > 0 || methods.scraping > 0,
        apiGoosOk: methods.api > 0,
        scrapingOk: methods.scraping > 0,
        tudoOffline: methods.error === data.summary.total
      }
    };
    
  } catch (error) {
    console.error('');
    console.error('═══════════════════════════════════════════════════════════════');
    console.error('❌ ERRO FATAL AO TESTAR:');
    console.error('═══════════════════════════════════════════════════════════════');
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    console.error('');
    console.error('Possíveis causas:');
    console.error('- Edge Function offline/desatualizada');
    console.error('- Erro de CORS');
    console.error('- Timeout da requisição');
    console.error('');
    throw error;
  }
}

// Executar teste
testarSincronizacao().then(resultado => {
  console.log('📦 Objeto de resultado disponível na variável "resultado"');
  window.resultadoTestePNBOIA = resultado;
}).catch(err => {
  console.error('Teste falhou:', err);
});
