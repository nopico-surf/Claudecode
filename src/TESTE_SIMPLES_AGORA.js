// ═══════════════════════════════════════════════════════════════════════════
// 🔍 TESTE SIMPLES - DESCOBRIR POR QUE TODAS AS BOIAS SÃO MOCK
// ═══════════════════════════════════════════════════════════════════════════

const URL_BASE = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.clear();
console.log('%c═══════════════════════════════════════════════════════════════', 'color: #ffc72c; font-weight: bold; font-size: 16px');
console.log('%c🔍 TESTE SIMPLES PNBOIA', 'color: #ffc72c; font-weight: bold; font-size: 18px');
console.log('%c═══════════════════════════════════════════════════════════════', 'color: #ffc72c; font-weight: bold; font-size: 16px');
console.log('');

// PASSO 1: VERIFICAR DADOS ATUAIS
console.log('%c📊 PASSO 1: Verificando dados atuais...', 'color: #00bfff; font-weight: bold');
console.log('');

fetch(`${URL_BASE}/pnboia/data`, {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
})
.then(r => r.json())
.then(data => {
  const reais = data.buoys.filter(b => b.isMockData === false).length;
  const mocks = data.buoys.filter(b => b.isMockData === true).length;
  
  console.log(`✅ Total de boias: ${data.buoys.length}`);
  console.log(`%c🟢 Dados REAIS: ${reais}`, 'color: #00ff00; font-weight: bold; font-size: 14px');
  console.log(`%c🔵 Dados MOCK: ${mocks}`, 'color: #0099ff; font-weight: bold; font-size: 14px');
  console.log('');
  
  if (mocks > 0) {
    console.log('%c⚠️ PROBLEMA IDENTIFICADO:', 'color: #ff9900; font-weight: bold');
    console.log('Todas as boias estão usando dados MOCKADOS!');
    console.log('');
    console.log('%c🔄 PASSO 2: Forçando sincronização manual...', 'color: #00bfff; font-weight: bold');
    console.log('⏱️ Aguarde 30-60 segundos...');
    console.log('');
    
    // PASSO 2: FORÇAR SYNC MANUAL
    fetch(`${URL_BASE}/pnboia/sync-all`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    })
    .then(r => r.json())
    .then(syncResult => {
      console.log('%c✅ SINCRONIZAÇÃO CONCLUÍDA!', 'color: #00ff00; font-weight: bold; font-size: 16px');
      console.log('');
      console.log('📊 Resultado:', syncResult);
      console.log('');
      
      if (syncResult.buoys) {
        const realSynced = syncResult.buoys.filter(b => b.source && b.source !== 'mock');
        const mockSynced = syncResult.buoys.filter(b => b.source === 'mock');
        const errors = syncResult.buoys.filter(b => b.error);
        
        console.log(`%c🟢 Boias sincronizadas com DADOS REAIS: ${realSynced.length}`, 'color: #00ff00; font-weight: bold; font-size: 14px');
        console.log(`%c🔵 Boias com fallback MOCK: ${mockSynced.length}`, 'color: #0099ff; font-weight: bold; font-size: 14px');
        console.log(`%c🔴 Boias com ERRO: ${errors.length}`, 'color: #ff0000; font-weight: bold; font-size: 14px');
        console.log('');
        
        if (realSynced.length > 0) {
          console.log('%c✅ SUCESSO! Boias com dados reais:', 'color: #00ff00; font-weight: bold');
          realSynced.forEach(b => {
            console.log(`  ✓ ${b.buoyId}: ${b.waveHeight}m (fonte: ${b.source})`);
          });
        }
        
        console.log('');
        
        if (errors.length > 0) {
          console.log('%c❌ ERROS ENCONTRADOS:', 'color: #ff0000; font-weight: bold');
          errors.forEach(b => {
            console.log(`  ✗ ${b.buoyId}: ${b.error}`);
          });
        }
        
        console.log('');
        console.log('%c🔄 Recarregue a página do admin para ver os dados atualizados!', 'color: #ffc72c; font-weight: bold; font-size: 14px');
      }
    })
    .catch(err => {
      console.error('%c💥 ERRO NO SYNC:', 'color: #ff0000; font-weight: bold');
      console.error(err);
    });
  } else {
    console.log('%c✅ PERFEITO! Todas as boias estão usando dados REAIS!', 'color: #00ff00; font-weight: bold; font-size: 16px');
  }
})
.catch(err => {
  console.error('%c💥 ERRO:', 'color: #ff0000; font-weight: bold');
  console.error(err);
});
