/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TESTE COMPLETO PNBOIA - DIAGNÓSTICO TOTAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Cole este código no console (F12) para diagnosticar completamente o sistema
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const BASE_URL = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('═══════════════════════════════════════════════════════════════');
console.log('🧪 TESTE COMPLETO PNBOIA - DIAGNÓSTICO TOTAL');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// TESTE 1: Health Check
console.log('🧪 TESTE 1: Health Check do Servidor');
fetch(`${BASE_URL}/health`, { headers: { 'Authorization': TOKEN } })
.then(r => {
  console.log(`✅ Servidor respondeu: HTTP ${r.status}`);
  return r.json();
})
.then(d => {
  console.log('   Dados:', d);
  console.log('');
  
  // TESTE 2: Endpoint de teste PNBOIA
  console.log('🧪 TESTE 2: Endpoint de Teste PNBOIA');
  return fetch(`${BASE_URL}/pnboia/test`, { headers: { 'Authorization': TOKEN } });
})
.then(r => {
  console.log(`✅ PNBOIA test: HTTP ${r.status}`);
  return r.json();
})
.then(d => {
  console.log('   Endpoints disponíveis:', d.endpoints);
  console.log('');
  
  // TESTE 3: DEBUG - Ver o que está no KV store
  console.log('🧪 TESTE 3: DEBUG - Verificar dados no KV store');
  return fetch(`${BASE_URL}/pnboia/debug`, { headers: { 'Authorization': TOKEN } });
})
.then(r => {
  console.log(`✅ Debug: HTTP ${r.status}`);
  return r.json();
})
.then(d => {
  console.log('   Última sync global:', d.globalLastSync);
  console.log(`   Boias com dados: ${d.summary.withData}/${d.summary.total}`);
  console.log('');
  console.log('   Detalhes de cada boia:');
  d.buoys.forEach(b => {
    const status = b.hasData ? '✅' : '❌';
    console.log(`   ${status} ${b.buoyId}: ${b.lastSync}`);
  });
  console.log('');
  
  // TESTE 4: Endpoint /pnboia/status
  console.log('🧪 TESTE 4: Endpoint /pnboia/status');
  return fetch(`${BASE_URL}/pnboia/status`, { headers: { 'Authorization': TOKEN } });
})
.then(r => {
  console.log(`✅ Status: HTTP ${r.status}`);
  if (!r.ok) {
    return r.text().then(t => {
      throw new Error(`HTTP ${r.status}: ${t}`);
    });
  }
  return r.json();
})
.then(d => {
  console.log(`   Total: ${d.total} boias`);
  console.log(`   Ativas: ${d.active}`);
  console.log(`   Offline: ${d.offline}`);
  console.log(`   Última sync: ${d.lastGlobalSync || 'NUNCA'}`);
  console.log('');
  
  // SE NÃO HOUVER DADOS, SINCRONIZAR
  if (d.active === 0) {
    console.log('⚠️ Nenhuma boia ativa! Vou sincronizar agora...');
    console.log('');
    console.log('🧪 TESTE 5: Sincronização Completa');
    console.log('⏱️ Isso pode demorar 20-60 segundos...');
    
    return fetch(`${BASE_URL}/pnboia/sync-all?useMock=false`, {
      method: 'POST',
      headers: { 'Authorization': TOKEN }
    });
  } else {
    console.log('✅ Sistema já tem dados! Pulando sincronização.');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('✅✅✅ TODOS OS TESTES PASSARAM! ✅✅✅');
    console.log('═══════════════════════════════════════════════════════════════');
    return null;
  }
})
.then(r => {
  if (!r) return null; // Já tinha dados
  
  console.log(`✅ Sync iniciado: HTTP ${r.status}`);
  if (!r.ok) {
    return r.text().then(t => {
      throw new Error(`HTTP ${r.status}: ${t}`);
    });
  }
  return r.json();
})
.then(d => {
  if (!d) return; // Já tinha dados
  
  console.log('✅ Sincronização concluída!');
  console.log(`   Sucesso: ${d.summary.success}/${d.summary.total} boias`);
  console.log(`   Taxa de sucesso: ${d.summary.successRate}`);
  console.log('');
  console.log('   Detalhes:');
  d.results.forEach(r => {
    if (r.success) {
      console.log(`   ✅ ${r.buoyId}: ${r.data?.waveHeight}m ondas`);
    } else {
      console.log(`   ❌ ${r.buoyId}: ${r.error}`);
    }
  });
  console.log('');
  console.log('🔄 Aguarde 5 segundos para verificar novamente...');
  
  // Aguardar 5s e verificar novamente
  return new Promise(resolve => setTimeout(resolve, 5000))
    .then(() => fetch(`${BASE_URL}/pnboia/status`, { headers: { 'Authorization': TOKEN } }));
})
.then(r => {
  if (!r) return; // Já tinha dados
  
  return r.json();
})
.then(d => {
  if (!d) return; // Já tinha dados
  
  console.log('');
  console.log('🔍 Verificação pós-sincronização:');
  console.log(`   Ativas: ${d.active}/${d.total}`);
  console.log(`   Última sync: ${d.lastGlobalSync || 'NUNCA'}`);
  console.log('');
  
  if (d.active > 0) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🎉🎉🎉 SUCESSO TOTAL! SISTEMA FUNCIONANDO! 🎉🎉🎉');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('🔄 Recarregue a página agora (Ctrl+R) e veja os dados!');
  } else {
    console.log('⚠️ Sincronização completou mas nenhuma boia está ativa.');
    console.log('   Isso pode significar que as boias da Marinha estão offline.');
  }
})
.catch(error => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('❌❌❌ ERRO ENCONTRADO! ❌❌❌');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Tipo:', error.name);
  console.log('Mensagem:', error.message);
  console.log('');
  console.log('📋 COPIE ESTA MENSAGEM E ME ENVIE!');
  console.log('Stack trace:');
  console.log(error.stack);
});
