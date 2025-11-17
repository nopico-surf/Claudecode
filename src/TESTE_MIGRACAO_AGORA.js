/**
 * ════════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE COMPLETO DA MIGRAÇÃO PARA BANCO DE DADOS
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
 */

console.log('🚀 Iniciando teste de migração...\n');

// ════════════════════════════════════════════════════════════════════════════
// 1️⃣ VERIFICAR LOCALSTORAGE
// ════════════════════════════════════════════════════════════════════════════

const localData = localStorage.getItem('nopico_observations');
const localObs = localData ? JSON.parse(localData) : [];

console.log('📦 LOCALSTORAGE:');
console.log(`   Total: ${localObs.length} observações`);
if (localObs.length > 0) {
  console.log(`   Primeira: ${localObs[0].spotName} - ${localObs[0].observed.height}m`);
  console.log(`   Última: ${localObs[localObs.length-1].spotName} - ${localObs[localObs.length-1].observed.height}m`);
}
console.log('');

// ════════════════════════════════════════════════════════════════════════════
// 2️⃣ VERIFICAR SERVIDOR
// ════════════════════════════════════════════════════════════════════════════

console.log('☁️ TESTANDO SERVIDOR...');

// Pegar credenciais do window (se disponível)
const projectId = window.supabaseProjectId || 'SEU_PROJECT_ID_AQUI';
const anonKey = window.supabaseAnonKey || 'SEU_ANON_KEY_AQUI';

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/observations`, {
  headers: {
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
  console.log('✅ SERVIDOR RESPONDEU:');
  console.log(`   Total: ${data.total} observações`);
  
  if (data.observations && data.observations.length > 0) {
    console.log(`   Primeira: ${data.observations[0].spotName} - ${data.observations[0].observed.height}m`);
    console.log(`   Última: ${data.observations[data.observations.length-1].spotName} - ${data.observations[data.observations.length-1].observed.height}m`);
  }
  
  console.log('');
  
  // ════════════════════════════════════════════════════════════════════════════
  // 3️⃣ COMPARAR LOCALSTORAGE vs SERVIDOR
  // ════════════════════════════════════════════════════════════════════════════
  
  console.log('📊 COMPARAÇÃO:');
  console.log(`   localStorage: ${localObs.length} observações`);
  console.log(`   Servidor:     ${data.total} observações`);
  
  if (localObs.length > 0 && data.total === 0) {
    console.log('');
    console.log('⚠️ ATENÇÃO: Você tem dados no localStorage mas servidor está vazio!');
    console.log('');
    console.log('🔄 Execute a migração:');
    console.log('   1. Vá em /admin/calibration');
    console.log('   2. A migração deve ocorrer automaticamente');
    console.log('   3. Ou execute no console:');
    console.log('');
    console.log('   import("./services/observationsApi.ts").then(m => m.migrateLocalStorageToServer());');
  } else if (data.total > 0) {
    console.log('');
    console.log('✅ SUCESSO! Dados no servidor!');
    console.log('');
    console.log('🎉 Agora você pode acessar de qualquer navegador/dispositivo!');
  } else {
    console.log('');
    console.log('ℹ️ Nenhuma observação registrada ainda.');
    console.log('   Vá em /admin/calibration para adicionar observações.');
  }
  
  console.log('');
  console.log('═'.repeat(80));
  console.log('✅ TESTE CONCLUÍDO!');
  console.log('═'.repeat(80));
})
.catch(error => {
  console.error('❌ ERRO AO ACESSAR SERVIDOR:', error.message);
  console.log('');
  console.log('⚠️ Possíveis causas:');
  console.log('   1. Servidor offline (aguardar inicialização)');
  console.log('   2. Credenciais incorretas (verificar projectId e anonKey)');
  console.log('   3. CORS bloqueado (verificar console)');
  console.log('');
  console.log('💡 Fallback ativo: Usando localStorage temporariamente');
  console.log(`   Total no localStorage: ${localObs.length} observações`);
});

// ════════════════════════════════════════════════════════════════════════════
// 4️⃣ ESTATÍSTICAS DO SERVIDOR
// ════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log('');
  console.log('📈 Buscando estatísticas...');
  
  fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/observations/stats`, {
    headers: {
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(stats => {
    console.log('✅ ESTATÍSTICAS:');
    console.log(`   Total: ${stats.stats.total}`);
    console.log(`   Picos únicos: ${stats.stats.uniqueSpots}`);
    console.log(`   Erro médio: ${stats.stats.avgError}%`);
    if (stats.stats.latestSpot) {
      console.log(`   Última: ${stats.stats.latestSpot} (${stats.stats.latestTimestamp})`);
    }
  })
  .catch(e => console.log('⚠️ Estatísticas indisponíveis'));
}, 1000);
