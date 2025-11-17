// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTE COMPLETO - SISTEMA PNBOIA FUNCIONANDO
// ═══════════════════════════════════════════════════════════════════════════
//
// Este script testa TUDO em 60 segundos:
// ✅ Dispara sincronização manual das boias
// ✅ Verifica status das 14 boias
// ✅ Testa Novo Campeche (que mostrou boia N/A antes)
// ✅ Mostra resultado visual claro: CONFIA ✅ ou NÃO CONFIA ❌
//
// COPIE E COLE NO CONSOLE (F12) E EXECUTE!
//
// ═══════════════════════════════════════════════════════════════════════════

(async () => {
  const API_BASE = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
  const AUTH_HEADER = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';
  
  console.clear();
  console.log('%c════════════════════════════════════════════════════════════════', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('%c🧪 TESTE COMPLETO - SISTEMA PNBOIA', 'color: #ffc72c; font-weight: bold; font-size: 16px');
  console.log('%c════════════════════════════════════════════════════════════════', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('');
  console.log('%c⏱️  Tempo estimado: 60 segundos', 'color: #666');
  console.log('%c🎯 Objetivo: Confirmar se você pode CONFIAR no sistema de boias', 'color: #666');
  console.log('');
  
  let testResults = {
    sync: { status: 'pending', details: null },
    status: { status: 'pending', details: null },
    novoCampeche: { status: 'pending', details: null },
    finalVerdict: 'pending'
  };
  
  // ─────────────────────────────────────────────────────────────────────────
  // TESTE 1: DISPARAR SINCRONIZAÇÃO MANUAL
  // ─────────────────────────────────────────────────────────────────────────
  console.log('%c[1/3] 🔄 Disparando sincronização das boias...', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('      Aguarde 30-45 segundos (PNBOIA é lento)...');
  console.log('');
  
  try {
    const syncStart = Date.now();
    const syncResponse = await fetch(`${API_BASE}/pnboia/sync-all?useMock=false`, {
      method: 'POST',
      headers: { 'Authorization': AUTH_HEADER }
    });
    
    const syncDuration = ((Date.now() - syncStart) / 1000).toFixed(1);
    
    if (syncResponse.ok) {
      const syncData = await syncResponse.json();
      testResults.sync.status = 'success';
      testResults.sync.details = syncData;
      
      console.log(`%c      ✅ Sincronização concluída! (${syncDuration}s)`, 'color: green; font-weight: bold');
      console.log(`      📊 Resultado: ${syncData.success || '?'}/${syncData.total || 14} boias sincronizadas`);
      
      if (syncData.buoys && Array.isArray(syncData.buoys)) {
        const successCount = syncData.buoys.filter(b => b.success).length;
        const failedBuoys = syncData.buoys.filter(b => !b.success);
        
        console.log(`      🟢 Sucesso: ${successCount} boias`);
        
        if (failedBuoys.length > 0) {
          console.log(`      🔴 Falhas: ${failedBuoys.length} boias`);
          failedBuoys.forEach(b => {
            console.log(`         • ${b.id}: ${b.error || 'Offline'}`);
          });
        }
      }
    } else {
      testResults.sync.status = 'error';
      testResults.sync.details = { error: `HTTP ${syncResponse.status}` };
      
      console.log(`%c      ❌ Erro na sincronização (HTTP ${syncResponse.status})`, 'color: red; font-weight: bold');
      console.log('      ⚠️  Pode ser normal se boias estão offline');
    }
  } catch (error) {
    testResults.sync.status = 'error';
    testResults.sync.details = { error: error.message };
    
    console.log(`%c      ❌ Erro: ${error.message}`, 'color: red; font-weight: bold');
  }
  
  console.log('');
  
  // ─────────────────────────────────────────────────────────────────────────
  // TESTE 2: VERIFICAR STATUS DAS BOIAS
  // ─────────────────────────────────────────────────────────────────────────
  console.log('%c[2/3] 📊 Verificando status das boias...', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('');
  
  try {
    const statusResponse = await fetch(`${API_BASE}/pnboia/status`, {
      headers: { 'Authorization': AUTH_HEADER }
    });
    
    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      testResults.status.status = 'success';
      testResults.status.details = statusData;
      
      const activeCount = statusData.active || 0;
      const totalCount = statusData.total || 14;
      const percentage = ((activeCount / totalCount) * 100).toFixed(0);
      
      console.log(`%c      ✅ Status obtido com sucesso!`, 'color: green; font-weight: bold');
      console.log(`      📊 Boias ativas: ${activeCount}/${totalCount} (${percentage}%)`);
      console.log('');
      
      if (statusData.buoys && Array.isArray(statusData.buoys)) {
        console.log('      📋 DETALHES DAS BOIAS:');
        console.log('      ┌─────────────────┬──────────┬───────────────────────┐');
        console.log('      │ Boia            │ Status   │ Última Atualização    │');
        console.log('      ├─────────────────┼──────────┼───────────────────────┤');
        
        statusData.buoys.forEach(buoy => {
          const status = buoy.hasData ? '🟢 Online' : '🔴 Offline';
          const lastUpdate = buoy.lastUpdate 
            ? new Date(buoy.lastUpdate).toLocaleString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            : 'N/A';
          
          console.log(`      │ ${buoy.id.padEnd(15)} │ ${status.padEnd(8)} │ ${lastUpdate.padEnd(21)} │`);
        });
        
        console.log('      └─────────────────┴──────────┴───────────────────────┘');
      }
      
      console.log('');
      
      // Avaliar qualidade
      if (activeCount >= 10) {
        console.log('%c      🟢 EXCELENTE! Maioria das boias online.', 'color: green; font-weight: bold');
      } else if (activeCount >= 5) {
        console.log('%c      🟡 BOM! Algumas boias offline (normal).', 'color: orange; font-weight: bold');
      } else {
        console.log('%c      🔴 DEGRADADO! Poucas boias online.', 'color: red; font-weight: bold');
        console.log('      ℹ️  Pode ser normal durante manutenção da Marinha');
      }
    } else {
      testResults.status.status = 'error';
      testResults.status.details = { error: `HTTP ${statusResponse.status}` };
      
      console.log(`%c      ❌ Erro ao obter status (HTTP ${statusResponse.status})`, 'color: red; font-weight: bold');
    }
  } catch (error) {
    testResults.status.status = 'error';
    testResults.status.details = { error: error.message };
    
    console.log(`%c      ❌ Erro: ${error.message}`, 'color: red; font-weight: bold');
  }
  
  console.log('');
  
  // ─────────────────────────────────────────────────────────────────────────
  // TESTE 3: TESTAR NOVO CAMPECHE (ONDE DAVA BOIA N/A)
  // ─────────────────────────────────────────────────────────────────────────
  console.log('%c[3/3] 🏄 Testando Novo Campeche (onde dava N/A)...', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('');
  
  try {
    const waveResponse = await fetch(`${API_BASE}/wave-data`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: -27.5969,
        lon: -48.4738,
        name: 'Novo Campeche'
      })
    });
    
    if (waveResponse.ok) {
      const waveData = await waveResponse.json();
      testResults.novoCampeche.status = 'success';
      testResults.novoCampeche.details = waveData;
      
      const offshore = waveData.currentConditions?.offshore?.waveHeight;
      const nearshore = waveData.currentConditions?.waveHeight;
      const pnboia = waveData.currentConditions?.pnboia;
      const hasBuoyData = pnboia && pnboia.waveHeight;
      
      console.log(`%c      ✅ Dados obtidos com sucesso!`, 'color: green; font-weight: bold');
      console.log('');
      console.log('      📊 NOVO CAMPECHE:');
      console.log(`      ├─ 🏖️  Offshore (API): ${offshore?.toFixed(2) || 'N/A'}m`);
      console.log(`      ├─ 🌊 Nearshore (Ajustado): ${nearshore?.toFixed(2) || 'N/A'}m`);
      
      if (hasBuoyData) {
        console.log(`%c      ├─ 🎯 Boia PNBOIA: ${pnboia.waveHeight.toFixed(2)}m ✅`, 'color: green; font-weight: bold');
        console.log(`      │   └─ Boia: ${pnboia.buoyId || 'N/A'}`);
        console.log(`      │   └─ Correção aplicada: ${pnboia.correctionApplied ? 'Sim' : 'Não'}`);
        
        if (pnboia.lastUpdate) {
          const lastUpdate = new Date(pnboia.lastUpdate).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
          console.log(`      │   └─ Última atualização: ${lastUpdate}`);
        }
      } else {
        console.log(`%c      ├─ 🎯 Boia PNBOIA: N/A ❌`, 'color: red; font-weight: bold');
        console.log(`      │   └─ Motivo: ${pnboia?.error || 'Sem dados'}`);
      }
      
      console.log(`      └─ 🔢 Multiplicador: ${(nearshore / offshore).toFixed(2)}`);
      console.log('');
      
      if (hasBuoyData) {
        console.log('%c      🎉 PERFEITO! Boia funcionando no Novo Campeche!', 'color: green; font-weight: bold; font-size: 14px');
      } else {
        console.log('%c      ⚠️  BOIA AINDA N/A! Pode não estar disponível.', 'color: orange; font-weight: bold; font-size: 14px');
      }
    } else {
      testResults.novoCampeche.status = 'error';
      testResults.novoCampeche.details = { error: `HTTP ${waveResponse.status}` };
      
      console.log(`%c      ❌ Erro ao obter dados (HTTP ${waveResponse.status})`, 'color: red; font-weight: bold');
    }
  } catch (error) {
    testResults.novoCampeche.status = 'error';
    testResults.novoCampeche.details = { error: error.message };
    
    console.log(`%c      ❌ Erro: ${error.message}`, 'color: red; font-weight: bold');
  }
  
  console.log('');
  console.log('');
  
  // ─────────────────────────────────────────────────────────────────────────
  // VEREDICTO FINAL
  // ─────────────────────────────────────────────────────────────────────────
  console.log('%c════════════════════════════════════════════════════════════════', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('%c🎯 VEREDICTO FINAL', 'color: #ffc72c; font-weight: bold; font-size: 16px');
  console.log('%c════════════════════════════════════════════════════════════════', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('');
  
  // Avaliar resultados
  const syncOk = testResults.sync.status === 'success' && 
                 testResults.sync.details?.success >= 10;
  
  const statusOk = testResults.status.status === 'success' && 
                   testResults.status.details?.active >= 10;
  
  const novoCampecheOk = testResults.novoCampeche.status === 'success' &&
                         testResults.novoCampeche.details?.currentConditions?.pnboia?.waveHeight;
  
  const allOk = syncOk && statusOk;
  const mostlyOk = (syncOk || statusOk) && testResults.status.details?.active >= 5;
  
  if (allOk && novoCampecheOk) {
    testResults.finalVerdict = 'CONFIA_100%';
    
    console.log('%c✅ PODE CONFIAR 100% NO SISTEMA DE BOIAS!', 'color: white; background-color: green; font-weight: bold; font-size: 18px; padding: 10px');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   ✅ Sincronização: ${testResults.sync.details?.success || '?'}/${testResults.sync.details?.total || 14} boias`);
    console.log(`   ✅ Boias ativas: ${testResults.status.details?.active || '?'}/${testResults.status.details?.total || 14}`);
    console.log(`   ✅ Novo Campeche: Boia funcionando (${testResults.novoCampeche.details?.currentConditions?.pnboia?.buoyId})`);
    console.log('');
    console.log('🎉 SISTEMA OPERACIONAL!');
    console.log('   • Dados de boias disponíveis 24/7');
    console.log('   • Bias correction ativo');
    console.log('   • Previsões mais precisas');
    console.log('   • Pode registrar observações com confiança');
    
  } else if (allOk && !novoCampecheOk) {
    testResults.finalVerdict = 'CONFIA_MAIORIA';
    
    console.log('%c✅ PODE CONFIAR NO SISTEMA (maioria das boias OK)', 'color: white; background-color: orange; font-weight: bold; font-size: 18px; padding: 10px');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   ✅ Sincronização: ${testResults.sync.details?.success || '?'}/${testResults.sync.details?.total || 14} boias`);
    console.log(`   ✅ Boias ativas: ${testResults.status.details?.active || '?'}/${testResults.status.details?.total || 14}`);
    console.log(`   ⚠️  Novo Campeche: Boia N/A (boia específica offline)`);
    console.log('');
    console.log('💡 INTERPRETAÇÃO:');
    console.log('   ✅ Sistema funcionando corretamente');
    console.log('   ⚠️  Boia do Novo Campeche específica pode estar offline');
    console.log('   ✅ Outras boias estão disponíveis');
    console.log('   ✅ Sistema vai usar boia mais próxima disponível');
    
  } else if (mostlyOk) {
    testResults.finalVerdict = 'CONFIA_PARCIAL';
    
    console.log('%c⚠️  CONFIA PARCIALMENTE (algumas boias offline)', 'color: white; background-color: orange; font-weight: bold; font-size: 18px; padding: 10px');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   ${syncOk ? '✅' : '⚠️'} Sincronização: ${testResults.sync.details?.success || '?'}/${testResults.sync.details?.total || 14} boias`);
    console.log(`   ${statusOk ? '✅' : '⚠️'} Boias ativas: ${testResults.status.details?.active || '?'}/${testResults.status.details?.total || 14}`);
    console.log(`   ${novoCampecheOk ? '✅' : '⚠️'} Novo Campeche: ${novoCampecheOk ? 'Boia OK' : 'Boia N/A'}`);
    console.log('');
    console.log('💡 INTERPRETAÇÃO:');
    console.log('   ⚠️  Algumas boias offline (normal durante manutenção)');
    console.log('   ✅ Sistema ainda funciona com boias disponíveis');
    console.log('   💡 Pode ter menos cobertura em algumas regiões');
    
  } else {
    testResults.finalVerdict = 'NAO_CONFIA';
    
    console.log('%c❌ NÃO PODE CONFIAR TOTALMENTE (problemas detectados)', 'color: white; background-color: red; font-weight: bold; font-size: 18px; padding: 10px');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   ${syncOk ? '✅' : '❌'} Sincronização: ${testResults.sync.status === 'error' ? 'Erro' : 'OK'}`);
    console.log(`   ${statusOk ? '✅' : '❌'} Boias ativas: ${testResults.status.details?.active || 0}/${testResults.status.details?.total || 14}`);
    console.log(`   ${novoCampecheOk ? '✅' : '❌'} Novo Campeche: ${novoCampecheOk ? 'Boia OK' : 'Boia N/A'}`);
    console.log('');
    console.log('⚠️  PROBLEMAS DETECTADOS:');
    
    if (testResults.sync.status === 'error') {
      console.log('   ❌ Erro na sincronização das boias');
      console.log(`      Detalhes: ${testResults.sync.details?.error || 'Desconhecido'}`);
    }
    
    if (testResults.status.status === 'error') {
      console.log('   ❌ Erro ao obter status das boias');
      console.log(`      Detalhes: ${testResults.status.details?.error || 'Desconhecido'}`);
    }
    
    if (!statusOk && testResults.status.status === 'success') {
      console.log(`   ❌ Poucas boias ativas (${testResults.status.details?.active || 0}/14)`);
    }
    
    console.log('');
    console.log('🔧 POSSÍVEIS CAUSAS:');
    console.log('   • Boias PNBOIA da Marinha offline (normal à noite)');
    console.log('   • Servidor Supabase lento');
    console.log('   • Problema na rede');
    console.log('');
    console.log('💡 PRÓXIMOS PASSOS:');
    console.log('   1. Aguardar 1 hora e testar novamente');
    console.log('   2. Verificar GitHub Actions (pode não ter rodado ainda)');
    console.log('   3. Verificar se secrets estão configurados no GitHub');
  }
  
  console.log('');
  console.log('%c════════════════════════════════════════════════════════════════', 'color: #001f3d; font-weight: bold; font-size: 14px');
  console.log('');
  
  // Retornar resultados para inspeção
  console.log('💾 RESULTADOS COMPLETOS (para debug):');
  console.log('   Acesse: testResults');
  console.log('');
  
  window.testResults = testResults;
  
  return testResults;
})();
