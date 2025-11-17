/**
 * ═══════════════════════════════════════════════════════════════
 * SCRIPT DE TESTE - DADOS REAIS PNBOIA
 * ═══════════════════════════════════════════════════════════════
 * 
 * COMO USAR:
 * 1. Abra o console do navegador (F12)
 * 2. Copie TODO este código
 * 3. Cole no console e pressione ENTER
 * 4. Aguarde o resultado
 * 
 * ═══════════════════════════════════════════════════════════════
 */

(async function testPNBOIA() {
  console.clear();
  
  console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
  console.log('%c🌊 TESTE DE DADOS REAIS - SISTEMA PNBOIA', 'color: #00A8E8; font-weight: bold; font-size: 16px');
  console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
  console.log('');
  
  // ===== PASSO 1: Obter credenciais =====
  console.log('%c📋 PASSO 1: Verificando credenciais...', 'color: #FFA500; font-weight: bold');
  
  let projectId, anonKey;
  
  try {
    // Tentar importar do módulo
    const { projectId: pId, publicAnonKey: aKey } = await import('./utils/supabase/info.tsx');
    projectId = pId;
    anonKey = aKey;
    console.log('✅ Credenciais obtidas automaticamente');
  } catch (error) {
    console.log('⚠️ Não foi possível obter credenciais automaticamente');
    console.log('');
    console.log('Por favor, cole suas credenciais:');
    console.log('');
    console.log('%cconst projectId = "SEU_PROJECT_ID";', 'background: #f0f0f0; padding: 5px; border-radius: 3px');
    console.log('%cconst anonKey = "SUA_ANON_KEY";', 'background: #f0f0f0; padding: 5px; border-radius: 3px');
    console.log('');
    console.log('Depois rode novamente este script.');
    return;
  }
  
  console.log(`Project ID: ${projectId.substring(0, 20)}...`);
  console.log('');
  
  // ===== PASSO 2: Testar conexão =====
  console.log('%c🔌 PASSO 2: Testando conexão com backend...', 'color: #FFA500; font-weight: bold');
  
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b`;
  
  try {
    const testResponse = await fetch(`${baseUrl}/pnboia/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!testResponse.ok) {
      throw new Error(`Status ${testResponse.status}: ${testResponse.statusText}`);
    }
    
    const statusData = await testResponse.json();
    console.log(`✅ Backend conectado: ${statusData.active}/${statusData.total} boias ativas`);
  } catch (error) {
    console.log('❌ Erro ao conectar:', error.message);
    console.log('');
    console.log('Possíveis causas:');
    console.log('  • Backend não está rodando');
    console.log('  • URL incorreta');
    console.log('  • Chave de autenticação inválida');
    return;
  }
  
  console.log('');
  
  // ===== PASSO 3: Sincronizar todas as boias =====
  console.log('%c🌊 PASSO 3: Sincronizando TODAS as boias...', 'color: #FFA500; font-weight: bold');
  console.log('⏳ Aguarde 2-3 minutos (buscando dados reais)...');
  console.log('');
  
  const startTime = Date.now();
  
  try {
    const syncResponse = await fetch(`${baseUrl}/pnboia/sync-all`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!syncResponse.ok) {
      throw new Error(`Status ${syncResponse.status}: ${syncResponse.statusText}`);
    }
    
    const syncData = await syncResponse.json();
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log(`✅ Sincronização concluída em ${duration}s`);
    console.log('');
    
    // ===== PASSO 4: Analisar resultados =====
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('%c📊 RESULTADOS DA SINCRONIZAÇÃO', 'color: #00A8E8; font-weight: bold; font-size: 14px');
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('');
    
    console.log(`Total de boias: ${syncData.summary.total}`);
    console.log(`Sucesso: ${syncData.summary.success} ✅`);
    console.log(`Falhas: ${syncData.summary.failed} ❌`);
    console.log(`Taxa de sucesso: ${syncData.summary.successRate}`);
    console.log('');
    
    // Agrupar por método
    const methods = { api: 0, scraping: 0, mock: 0 };
    const buoysData = [];
    
    syncData.results.forEach(result => {
      if (result.success && result.data) {
        const method = result.data.method || 'unknown';
        if (methods.hasOwnProperty(method)) {
          methods[method]++;
        }
        buoysData.push({
          id: result.buoyId,
          method: method,
          height: result.data.waveHeight,
          period: result.data.wavePeriod,
          timestamp: result.data.timestamp
        });
      }
    });
    
    console.log('%c📈 ESTATÍSTICAS POR FONTE:', 'color: #00A8E8; font-weight: bold');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`✅ API GOOS Brasil:    ${methods.api} boias (${Math.round(methods.api/syncData.summary.success*100)}%)`);
    console.log(`⚡ Scraping HTML:      ${methods.scraping} boias (${Math.round(methods.scraping/syncData.summary.success*100)}%)`);
    console.log(`⚠️  Mock (fallback):    ${methods.mock} boias (${Math.round(methods.mock/syncData.summary.success*100)}%)`);
    console.log('');
    
    // Calcular % de dados reais
    const realDataCount = methods.api + methods.scraping;
    const realDataPercent = Math.round((realDataCount / syncData.summary.success) * 100);
    
    console.log('%c🎯 INTERPRETAÇÃO:', 'color: #00A8E8; font-weight: bold');
    console.log('─────────────────────────────────────────────────────────────');
    
    if (realDataPercent >= 90) {
      console.log(`%c✅ EXCELENTE! ${realDataPercent}% dados reais`, 'color: #00FF00; font-weight: bold; font-size: 14px');
      console.log('   Sistema funcionando PERFEITAMENTE! 🎉');
    } else if (realDataPercent >= 70) {
      console.log(`%c✅ BOM! ${realDataPercent}% dados reais`, 'color: #90EE90; font-weight: bold; font-size: 14px');
      console.log('   Algumas boias podem estar offline temporariamente.');
    } else if (realDataPercent >= 50) {
      console.log(`%c⚠️ ACEITÁVEL. ${realDataPercent}% dados reais`, 'color: #FFA500; font-weight: bold; font-size: 14px');
      console.log('   Investigar se API GOOS ou site estão instáveis.');
    } else {
      console.log(`%c❌ PROBLEMA! Apenas ${realDataPercent}% dados reais`, 'color: #FF0000; font-weight: bold; font-size: 14px');
      console.log('   Verificar conectividade e status das fontes.');
    }
    
    console.log('');
    
    // ===== PASSO 5: Detalhes das boias =====
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('%c📋 DETALHES POR BOIA', 'color: #00A8E8; font-weight: bold; font-size: 14px');
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('');
    
    buoysData.forEach((buoy, index) => {
      const emoji = 
        buoy.method === 'api' ? '✅' :
        buoy.method === 'scraping' ? '⚡' :
        buoy.method === 'mock' ? '⚠️' : '❓';
      
      const methodName = 
        buoy.method === 'api' ? 'API GOOS' :
        buoy.method === 'scraping' ? 'HTML Scraping' :
        buoy.method === 'mock' ? 'MOCK (fallback)' : 'Desconhecido';
      
      const age = Math.round((Date.now() - new Date(buoy.timestamp)) / (1000 * 60));
      const ageStr = age < 60 ? `${age}min` : `${Math.round(age/60)}h`;
      
      console.log(`${index + 1}. ${emoji} ${buoy.id.replace('pnboia-', '').toUpperCase()}`);
      console.log(`   Fonte: ${methodName}`);
      console.log(`   Hs: ${buoy.height?.toFixed(2) || '?'}m | Tp: ${buoy.period?.toFixed(1) || '?'}s`);
      console.log(`   Atualização: há ${ageStr}`);
      console.log('');
    });
    
    // ===== PASSO 6: Teste de bias correction =====
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('%c🎯 TESTE DE BIAS CORRECTION', 'color: #00A8E8; font-weight: bold; font-size: 14px');
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('');
    
    console.log('Para testar o bias correction:');
    console.log('1. Acesse um pico próximo a uma boia (ex: Joaquina em Florianópolis)');
    console.log('2. Abra o console e procure por:');
    console.log('   %c🌊 PNBOIA BIAS CORRECTION ATIVO', 'background: #e8f5e9; color: #2e7d32; padding: 5px; border-radius: 3px');
    console.log('');
    console.log('Boias ativas para teste:');
    
    buoysData.filter(b => b.method !== 'mock').slice(0, 5).forEach(buoy => {
      const name = buoy.id.replace('pnboia-', '');
      console.log(`  • ${name.charAt(0).toUpperCase() + name.slice(1)} (${buoy.height?.toFixed(2)}m)`);
    });
    
    console.log('');
    
    // ===== RESUMO FINAL =====
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('%c✅ TESTE CONCLUÍDO', 'color: #00FF00; font-weight: bold; font-size: 16px');
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
    console.log('');
    
    if (realDataPercent >= 80) {
      console.log('%c🎉 Sistema está usando dados REAIS das boias!', 'background: #e8f5e9; color: #2e7d32; padding: 10px; border-radius: 5px; font-size: 14px; font-weight: bold');
    } else if (realDataPercent >= 50) {
      console.log('%c⚠️ Sistema parcialmente funcional com dados reais.', 'background: #fff3e0; color: #e65100; padding: 10px; border-radius: 5px; font-size: 14px; font-weight: bold');
    } else {
      console.log('%c❌ Sistema com muitos dados mockados. Investigar.', 'background: #ffebee; color: #c62828; padding: 10px; border-radius: 5px; font-size: 14px; font-weight: bold');
    }
    
    console.log('');
    console.log('Documentação completa: /docs/COMO_VERIFICAR_DADOS_REAIS.md');
    console.log('');
    
  } catch (error) {
    console.log('');
    console.log('%c❌ ERRO durante sincronização:', 'color: #FF0000; font-weight: bold');
    console.error(error);
    console.log('');
    console.log('Verifique:');
    console.log('  • Backend está rodando?');
    console.log('  • Credenciais corretas?');
    console.log('  • Rede funcionando?');
  }
  
  console.log('');
  console.log('%c═══════════════════════════════════════════════════════════════', 'color: #00A8E8; font-weight: bold');
  console.log('');
  
})();
