// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTE ULTRA-SIMPLES - EDGE FUNCTION ESTÁ ATUALIZADA?
// ═══════════════════════════════════════════════════════════════════════════
// 
// COPIE TUDO E COLE NO CONSOLE (F12)
// 
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log('\n🧪 TESTANDO EDGE FUNCTION...\n');

const url = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM';

fetch(url, {
  headers: { 'Authorization': 'Bearer ' + token }
})
.then(response => response.text())
.then(text => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
    console.log('❌❌❌ EDGE FUNCTION COM CÓDIGO ANTIGO!\n');
    console.log('Endpoint /kv-diagnostic NÃO EXISTE (retornou HTML 404)\n');
    console.log('📋 AÇÃO NECESSÁRIA:\n');
    console.log('1. Ir para: https://supabase.com/dashboard/project/rqgubpqniscyoojkwltn/functions');
    console.log('2. Clicar em "make-server-2d5da22b"');
    console.log('3. Procurar botão "Deploy" (canto superior direito)');
    console.log('4. Clicar em "Deploy" e aguardar 30-60s');
    console.log('5. Rodar este teste novamente\n');
    console.log('═══════════════════════════════════════════════════════════════\n');
  } else {
    try {
      const data = JSON.parse(text);
      console.log('✅✅✅ EDGE FUNCTION ATUALIZADA!\n');
      console.log('Endpoint /kv-diagnostic EXISTE (código novo deployado)\n');
      console.log('📊 RESULTADO DO DIAGNÓSTICO:\n');
      console.log('Overall:', data.overall);
      console.log('\nTestes KV:');
      if (data.tests) {
        data.tests.forEach(test => {
          const icon = test.status === 'OK' ? '✅' : '❌';
          console.log(icon, test.name + ':', test.status);
          if (test.error) {
            console.log('   Erro:', test.error.substring(0, 80));
          }
        });
      }
      console.log('\n═══════════════════════════════════════════════════════════════\n');
      
      if (data.overall === 'OK') {
        console.log('🎉 SISTEMA 100% FUNCIONAL!\n');
        console.log('✅ Edge Function atualizada');
        console.log('✅ KV Store funcionando');
        console.log('✅ Variáveis de ambiente OK\n');
        console.log('NÃO PRECISA FAZER NADA! ✅\n');
      } else {
        console.log('⚠️ EDGE FUNCTION ATUALIZADA, MAS HÁ PROBLEMAS NO KV\n');
        console.log('Ver erros acima.\n');
      }
      
      console.log('═══════════════════════════════════════════════════════════════\n');
    } catch (e) {
      console.log('⚠️ Resposta não é HTML nem JSON:\n');
      console.log(text.substring(0, 200));
      console.log('\n═══════════════════════════════════════════════════════════════\n');
    }
  }
})
.catch(error => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('❌ ERRO AO CHAMAR EDGE FUNCTION:\n');
  console.log(error);
  console.log('\n═══════════════════════════════════════════════════════════════\n');
});
