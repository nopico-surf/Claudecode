/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE RÁPIDO - VERIFICAR SE KV ESTÁ RETORNANDO HTML
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

console.log('═══════════════════════════════════════════════════════════════');
console.log('🧪 TESTE RÁPIDO - KV ERRO HTML');
console.log('═══════════════════════════════════════════════════════════════\n');

const projectId = 'rqgubpqniscyoojkwltn';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM';

console.log('📡 Testando endpoint de diagnóstico KV...\n');

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic`, {
  headers: {
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json'
  }
})
.then(async response => {
  const contentType = response.headers.get('content-type');
  console.log(`Status: ${response.status}`);
  console.log(`Content-Type: ${contentType}\n`);
  
  const text = await response.text();
  
  // Verificar se é HTML
  if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
    console.error('❌ PROBLEMA CONFIRMADO: Servidor retornando HTML!');
    console.error('\n📋 ERRO:');
    console.error(text.substring(0, 300));
    console.error('\n🔧 SOLUÇÃO:');
    console.error('1. Ir para: Supabase Dashboard → Edge Functions → server → Settings');
    console.error('2. Adicionar variáveis de ambiente:');
    console.error('   SUPABASE_URL = https://rqgubpqniscyoojkwltn.supabase.co');
    console.error('   SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    console.error('3. Salvar e aguardar re-deploy (30-60s)');
    console.error('4. Rodar este teste novamente');
    return;
  }
  
  // Tentar parsear JSON
  try {
    const data = JSON.parse(text);
    console.log('✅ Resposta JSON válida!\n');
    console.log('📊 RESULTADO DO DIAGNÓSTICO:\n');
    console.log(`Overall: ${data.overall}\n`);
    
    if (data.tests && Array.isArray(data.tests)) {
      data.tests.forEach(test => {
        const icon = test.status === 'OK' ? '✅' : '❌';
        console.log(`${icon} ${test.name}: ${test.status}`);
        if (test.error) {
          console.error(`   Erro: ${test.error.substring(0, 200)}`);
        }
        if (test.result) {
          console.log(`   Resultado: ${test.result}`);
        }
      });
    } else {
      console.log('Resposta completa:', data);
    }
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    
    // Se todos OK, testar PNBOIA
    if (data.overall === 'OK') {
      console.log('\n✅ KV Store funcionando! Testando PNBOIA...\n');
      
      return fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`, {
        headers: {
          'Authorization': `Bearer ${anonKey}`
        }
      })
      .then(r => r.json())
      .then(pnboiaData => {
        console.log('✅ PNBOIA Status:');
        console.log(`   Total de boias: ${pnboiaData.total}`);
        console.log(`   Ativas: ${pnboiaData.active}`);
        console.log(`   Offline: ${pnboiaData.offline}`);
        console.log(`   Última sync global: ${pnboiaData.lastGlobalSync || 'NUNCA'}`);
        
        console.log('\n📋 Boias com dados:');
        pnboiaData.buoys.filter(b => b.hasData).forEach(b => {
          console.log(`   ✅ ${b.buoyId}: ${b.status} (${b.dataAgeMinutes} min atrás)`);
        });
        
        const semDados = pnboiaData.buoys.filter(b => !b.hasData);
        if (semDados.length > 0) {
          console.log('\n⚠️  Boias sem dados:');
          semDados.forEach(b => {
            console.log(`   ❌ ${b.buoyId}`);
          });
          console.log('\n💡 DICA: Rodar sincronização para obter dados reais:');
          console.log('   Ir para /admin → Boias PNBOIA → Sincronizar Agora');
        }
        
        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('✅ SISTEMA FUNCIONANDO PERFEITAMENTE!');
        console.log('═══════════════════════════════════════════════════════════════\n');
      });
    } else {
      console.error('\n❌ PROBLEMA DETECTADO NOS TESTES KV!');
      console.error('Ver erros acima para detalhes.');
      console.error('\n🔧 SOLUÇÃO PROVÁVEL:');
      console.error('Configurar variáveis de ambiente no Supabase Dashboard.');
      console.error('\nVer arquivo: SOLUCAO_ERRO_HTML_KV.md');
    }
    
  } catch (parseError) {
    console.error('❌ Erro ao parsear JSON:');
    console.error(parseError);
    console.error('\nResposta recebida:');
    console.error(text.substring(0, 500));
  }
})
.catch(error => {
  console.error('\n❌ ERRO NA REQUISIÇÃO:');
  console.error(error);
  console.error('\n🔧 POSSÍVEIS CAUSAS:');
  console.error('1. Edge Function não está deployada');
  console.error('2. Endpoint incorreto');
  console.error('3. Problema de rede/CORS');
  console.error('\n📋 VERIFICAR:');
  console.error('Supabase Dashboard → Edge Functions → server');
  console.error('Status deve estar: ✅ Deployed & Active');
});
