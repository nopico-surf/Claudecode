/**
 * TESTE PARA VERIFICAR ENDPOINT /pnboia/status
 * 
 * Este teste verifica se o endpoint está respondendo corretamente
 */

const BASE = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('🧪 TESTANDO ENDPOINT /pnboia/status');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Aguardar 2 segundos para dar tempo do servidor inicializar
setTimeout(() => {
  console.log('📡 Fazendo requisição...');
  console.log(`URL: ${BASE}/pnboia/status`);
  console.log('');
  
  fetch(`${BASE}/pnboia/status`, {
    method: 'GET',
    headers: {
      'Authorization': TOKEN
    }
  })
  .then(response => {
    console.log(`📥 Response HTTP: ${response.status} ${response.statusText}`);
    console.log('');
    
    if (!response.ok) {
      console.error(`❌ ERRO: Endpoint retornou ${response.status}`);
      console.error('');
      console.error('Possíveis causas:');
      console.error('  1. Edge Function não foi deployed corretamente');
      console.error('  2. Rota não está registrada');
      console.error('  3. Servidor deu crash durante inicialização');
      console.error('');
      return response.text().then(text => {
        console.error('Resposta do servidor:');
        console.error(text.substring(0, 500));
        throw new Error(`HTTP ${response.status}`);
      });
    }
    
    return response.json();
  })
  .then(data => {
    if (!data) return;
    
    console.log('✅ ENDPOINT FUNCIONANDO!');
    console.log('');
    console.log('📊 Resultado:');
    console.log(`   Total de boias: ${data.total}`);
    console.log(`   Boias ativas: ${data.active}`);
    console.log(`   Boias offline: ${data.offline}`);
    console.log(`   Última sync global: ${data.lastGlobalSync || 'NUNCA'}`);
    console.log('');
    
    if (data.active === 0) {
      console.log('⚠️ NENHUMA BOIA ATIVA');
      console.log('');
      console.log('Isso significa que:');
      console.log('  ✅ O endpoint está funcionando');
      console.log('  ⚠️ Mas não há dados sincronizados ainda');
      console.log('  📝 Aguarde a sincronização automática');
      console.log('  📝 Ou sincronize manualmente via POST /pnboia/sync-all');
    } else {
      console.log(`🎉 TUDO OK! ${data.active} boias com dados disponíveis`);
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
  })
  .catch(error => {
    console.error('');
    console.error('═══════════════════════════════════════════════════════════════');
    console.error('❌ TESTE FALHOU');
    console.error('═══════════════════════════════════════════════════════════════');
    console.error('Erro:', error.message);
    console.error('');
    console.error('🔧 AÇÃO REQUERIDA:');
    console.error('   1. Aguarde 30 segundos e teste novamente');
    console.error('   2. Se persistir, o Edge Function pode ter crashado');
    console.error('   3. Verifique os logs do Supabase');
  });
}, 2000);

console.log('⏳ Aguardando 2 segundos para servidor inicializar...');
console.log('');
