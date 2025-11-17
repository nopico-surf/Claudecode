// ═══════════════════════════════════════════════════════════════════════════
// 🎯 TESTE FINAL - TOKEN CORRETO - KV DIAGNOSTIC
// ═══════════════════════════════════════════════════════════════════════════
// 
// COPIE E COLE NO CONSOLE (F12)
// 
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log('\n🎯 TESTE FINAL COM TOKEN CORRETO...\n');

const url = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic';
const tokenCORRETO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

fetch(url, {
  headers: { 'Authorization': 'Bearer ' + tokenCORRETO }
})
.then(async response => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📡 STATUS:', response.status, response.statusText);
  
  if (!response.ok) {
    console.error('\n❌ ERRO:', response.status);
    const text = await response.text();
    console.error('Mensagem:', text.substring(0, 200));
    console.log('\n═══════════════════════════════════════════════════════════════\n');
    return;
  }
  
  const data = await response.json();
  
  console.log('\n✅✅✅ SUCESSO!\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📊 RESULTADO DO DIAGNÓSTICO KV:\n');
  console.log('Overall Status:', data.overall || 'N/A');
  console.log('Timestamp:', data.timestamp);
  
  if (data.tests && data.tests.length > 0) {
    console.log('\n🧪 TESTES EXECUTADOS:\n');
    data.tests.forEach((test, i) => {
      const icon = test.status === 'OK' ? '✅' : '❌';
      console.log(`${i+1}. ${icon} ${test.name}`);
      console.log('   Status:', test.status);
      if (test.result) {
        console.log('   Resultado:', test.result);
      }
      if (test.error) {
        console.error('   ERRO:', test.error.substring(0, 100));
      }
      console.log('');
    });
  }
  
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  if (data.overall === 'OK') {
    console.log('🎉🎉🎉 KV STORE 100% FUNCIONAL!\n');
    console.log('✅ Edge Function atualizada');
    console.log('✅ Token de autenticação válido');
    console.log('✅ KV Store conectado e operacional');
    console.log('✅ Todos os testes passaram\n');
    console.log('🌊 SISTEMA DE PREVISÃO DE ONDAS PRONTO! 🏄‍♂️\n');
  } else if (data.overall === 'PROBLEMAS DETECTADOS') {
    console.warn('⚠️ KV Store funcional MAS com alguns problemas\n');
    console.warn('Ver erros dos testes acima.\n');
  } else {
    console.error('❌ KV Store com problemas\n');
    console.error('Ver erros dos testes acima.\n');
  }
  
  console.log('═══════════════════════════════════════════════════════════════\n');
})
.catch(error => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.error('❌ ERRO AO FAZER REQUEST:\n');
  console.error(error);
  console.log('\n═══════════════════════════════════════════════════════════════\n');
});
