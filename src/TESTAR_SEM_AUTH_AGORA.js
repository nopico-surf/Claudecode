// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTE SEM AUTENTICAÇÃO - VER SE É PROBLEMA DE AUTH
// ═══════════════════════════════════════════════════════════════════════════
// 
// COPIE E COLE NO CONSOLE (F12)
// 
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log('\n🧪 TESTE 1: Endpoint /health (não requer auth)\n');

// TESTE 1: /health (público)
fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/health')
.then(r => r.json())
.then(data => {
  console.log('✅ /health FUNCIONA!');
  console.log('   Status:', data.status);
  console.log('   Mensagem:', data.message);
  console.log('   Heartbeat:', data.heartbeat_count);
  console.log('\n');
})
.catch(e => {
  console.error('❌ /health FALHOU:', e);
  console.log('\n');
})
.finally(() => {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('🧪 TESTE 2: Endpoint /kv-diagnostic (COM autenticação)\n');
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM';
  
  // TESTE 2: /kv-diagnostic (com auth)
  fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(async response => {
    console.log('Status:', response.status, response.statusText);
    
    if (response.status === 401) {
      console.error('\n❌ ERRO 401 UNAUTHORIZED');
      console.error('\n📋 POSSÍVEIS CAUSAS:');
      console.error('   1. Token expirado ou inválido');
      console.error('   2. Endpoint requer SERVICE_ROLE_KEY (não apenas ANON_KEY)');
      console.error('   3. CORS bloqueando request\n');
      
      const text = await response.text();
      console.error('Resposta do servidor:');
      console.error(text.substring(0, 300));
      console.log('\n');
    } else if (response.ok) {
      const data = await response.json();
      console.log('✅ /kv-diagnostic FUNCIONA!');
      console.log('\nDados:');
      console.log(JSON.stringify(data, null, 2));
      console.log('\n');
    } else {
      console.error(`⚠️ Status inesperado: ${response.status}`);
      const text = await response.text();
      console.error(text.substring(0, 300));
      console.log('\n');
    }
  })
  .catch(e => {
    console.error('❌ /kv-diagnostic FALHOU:', e);
    console.log('\n');
  })
  .finally(() => {
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('🧪 TESTE 3: Endpoint /pnboia/status (COM autenticação)\n');
    
    // TESTE 3: /pnboia/status
    fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(async response => {
      console.log('Status:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ /pnboia/status FUNCIONA!');
        console.log('   Total:', data.total);
        console.log('   Ativas:', data.active);
        console.log('   Offline:', data.offline);
        console.log('\n');
      } else {
        console.error(`⚠️ Status: ${response.status}`);
        const text = await response.text();
        console.error(text.substring(0, 200));
        console.log('\n');
      }
    })
    .catch(e => {
      console.error('❌ /pnboia/status FALHOU:', e);
      console.log('\n');
    })
    .finally(() => {
      console.log('═══════════════════════════════════════════════════════════════\n');
      console.log('📊 RESUMO GERAL:\n');
      console.log('Se /health funcionou:');
      console.log('   → Edge Function está deployada e ativa ✅\n');
      console.log('Se /kv-diagnostic deu 401:');
      console.log('   → Problema de autenticação ⚠️');
      console.log('   → Endpoint pode requerer SERVICE_ROLE_KEY\n');
      console.log('Se /pnboia/status funcionou:');
      console.log('   → Autenticação funciona para alguns endpoints ✅\n');
      console.log('═══════════════════════════════════════════════════════════════\n');
    });
  });
});
