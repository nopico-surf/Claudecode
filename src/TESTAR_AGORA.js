/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TESTE RÁPIDO - ERRO 500 RESOLVIDO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Cole este código no console (F12) para verificar se o sistema está OK
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const BASE = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('═══════════════════════════════════════════════════════════════');
console.log('🔍 TESTE RÁPIDO - VERIFICANDO SISTEMA');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// TESTE 1: Health Check
console.log('🧪 Teste 1: Health Check');
fetch(`${BASE}/health`, { headers: { 'Authorization': TOKEN } })
.then(r => {
  console.log(`   Status: ${r.status} ${r.statusText}`);
  return r.json();
})
.then(d => {
  console.log('   Resposta:', d.status);
  if (d.warning) console.log('   ⚠️ Warning:', d.warning);
  console.log('');
  
  // TESTE 2: Diagnóstico KV
  console.log('🧪 Teste 2: Diagnóstico KV Store');
  return fetch(`${BASE}/kv-diagnostic`, { headers: { 'Authorization': TOKEN } });
})
.then(r => {
  console.log(`   Status: ${r.status} ${r.statusText}`);
  return r.json();
})
.then(d => {
  console.log(`   Resultado: ${d.overall}`);
  console.log('   Testes:');
  d.tests.forEach(t => {
    const icon = t.status === 'OK' ? '   ✅' : '   ❌';
    console.log(`${icon} ${t.name}: ${t.status}`);
    if (t.error) {
      console.log(`      Erro: ${t.error.substring(0, 80)}...`);
    }
  });
  console.log('');
  
  // TESTE 3: Status PNBOIA
  console.log('🧪 Teste 3: Status das Boias PNBOIA');
  return fetch(`${BASE}/pnboia/status`, { headers: { 'Authorization': TOKEN } });
})
.then(r => {
  console.log(`   Status: ${r.status} ${r.statusText}`);
  if (!r.ok) {
    console.log('   ⚠️ Endpoint /pnboia/status não disponível');
    console.log('');
    throw new Error('SKIP');
  }
  return r.json();
})
.then(d => {
  if (d) {
    console.log(`   Boias ativas: ${d.active}/${d.total}`);
    console.log(`   Última sync: ${d.lastGlobalSync || 'NUNCA'}`);
  }
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('✅ TODOS OS TESTES CONCLUÍDOS!');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('📋 COPIE ESTE CONSOLE E ME ENVIE!');
})
.catch(e => {
  if (e.message === 'SKIP') {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('⚠️ ALGUNS TESTES FALHARAM');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('📋 COPIE ESTE CONSOLE E ME ENVIE!');
    return;
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('❌ ERRO DURANTE TESTES');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Erro:', e.message);
  console.log('');
  console.log('📋 COPIE ESTE CONSOLE E ME ENVIE!');
});
