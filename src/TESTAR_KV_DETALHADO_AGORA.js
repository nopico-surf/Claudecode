// ═══════════════════════════════════════════════════════════════════════════
// 🔍 TESTE DETALHADO - VER EXATAMENTE QUAL É O ERRO NO KV
// ═══════════════════════════════════════════════════════════════════════════
// 
// COPIE E COLE NO CONSOLE (F12)
// 
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log('\n🔍 TESTE DETALHADO DO KV...\n');

const url = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM';

fetch(url, {
  headers: { 
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})
.then(async response => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📡 RESPOSTA DO SERVIDOR:\n');
  console.log('Status:', response.status, response.statusText);
  console.log('Content-Type:', response.headers.get('content-type'));
  
  const text = await response.text();
  
  console.log('\n📄 CORPO DA RESPOSTA:\n');
  
  if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
    console.error('❌ Resposta é HTML (não deveria ser):\n');
    console.error(text.substring(0, 300));
  } else {
    try {
      const data = JSON.parse(text);
      
      console.log('✅ Resposta é JSON válido!\n');
      console.log('═══════════════════════════════════════════════════════════════\n');
      console.log('📊 DADOS COMPLETOS:\n');
      console.log(JSON.stringify(data, null, 2));
      
      console.log('\n═══════════════════════════════════════════════════════════════\n');
      console.log('🔍 ANÁLISE DETALHADA:\n');
      
      // Overall status
      if (data.overall) {
        console.log('Overall Status:', data.overall);
      } else {
        console.error('⚠️ Overall: UNDEFINED (problema!)');
      }
      
      // Environment variables
      if (data.env) {
        console.log('\n📋 Variáveis de Ambiente:');
        console.log('  SUPABASE_URL:', data.env.SUPABASE_URL ? '✅ Presente' : '❌ Faltando');
        console.log('  SUPABASE_SERVICE_ROLE_KEY:', data.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Presente' : '❌ Faltando');
        console.log('  SUPABASE_ANON_KEY:', data.env.SUPABASE_ANON_KEY ? '✅ Presente' : '❌ Faltando');
        console.log('  SUPABASE_DB_URL:', data.env.SUPABASE_DB_URL ? '✅ Presente' : '❌ Faltando');
        console.log('  STORMGLASS_API_KEY:', data.env.STORMGLASS_API_KEY ? '✅ Presente' : '❌ Faltando');
      } else {
        console.error('⚠️ Dados de env: NÃO RETORNADOS');
      }
      
      // Tests
      if (data.tests && data.tests.length > 0) {
        console.log('\n🧪 Resultados dos Testes KV:');
        data.tests.forEach((test, i) => {
          const icon = test.status === 'OK' ? '✅' : '❌';
          console.log(`\n${i+1}. ${icon} ${test.name}`);
          console.log('   Status:', test.status);
          if (test.error) {
            console.error('   ❌ ERRO:', test.error);
          }
          if (test.details) {
            console.log('   Detalhes:', test.details);
          }
        });
      } else {
        console.error('\n⚠️ Testes: NÃO RETORNADOS ou VAZIOS');
      }
      
      console.log('\n═══════════════════════════════════════════════════════════════\n');
      console.log('🎯 DIAGNÓSTICO FINAL:\n');
      
      if (data.overall === 'OK') {
        console.log('✅✅✅ TUDO FUNCIONANDO PERFEITAMENTE!\n');
        console.log('O sistema KV está 100% operacional.');
      } else if (data.overall === 'PARTIAL') {
        console.log('⚠️⚠️⚠️ FUNCIONAMENTO PARCIAL\n');
        console.log('Algumas operações funcionam, outras não.');
        console.log('Ver erros dos testes acima.');
      } else if (data.overall === 'ERROR') {
        console.log('❌❌❌ SISTEMA KV COM PROBLEMAS\n');
        console.log('Ver erros dos testes acima.');
      } else {
        console.error('⚠️⚠️⚠️ OVERALL: UNDEFINED\n');
        console.error('Problema ao executar diagnóstico.');
        console.error('Possível erro no servidor.');
      }
      
      console.log('\n═══════════════════════════════════════════════════════════════\n');
      
    } catch (e) {
      console.error('❌ ERRO ao parsear JSON:\n');
      console.error(e);
      console.error('\nResposta original:');
      console.error(text);
    }
  }
})
.catch(error => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.error('❌ ERRO AO FAZER REQUEST:\n');
  console.error(error);
  console.log('\n═══════════════════════════════════════════════════════════════\n');
});
