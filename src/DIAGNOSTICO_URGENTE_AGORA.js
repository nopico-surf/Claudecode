/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🚨 DIAGNÓSTICO URGENTE - ERRO HTML MESMO COM VARIÁVEIS CONFIGURADAS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * SITUAÇÃO:
 * - Variáveis de ambiente ✅ CONFIGURADAS no Supabase
 * - MAS ainda recebendo HTML ao invés de JSON
 * 
 * VAMOS DESCOBRIR A CAUSA REAL!
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
 * ═══════════════════════════════════════════════════════════════════════════
 */

console.clear();
console.log('═══════════════════════════════════════════════════════════════');
console.log('🚨 DIAGNÓSTICO URGENTE - ERRO HTML');
console.log('═══════════════════════════════════════════════════════════════\n');

const projectId = 'rqgubpqniscyoojkwltn';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM';

console.log('📋 INFORMAÇÕES:');
console.log(`   Project ID: ${projectId}`);
console.log(`   Variáveis de ambiente: ✅ Configuradas no Supabase`);
console.log('');

// TESTE 1: Verificar se Edge Function responde
console.log('TESTE 1: Edge Function está respondendo?');
console.log('─────────────────────────────────────────────────────────────\n');

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/health`, {
  headers: {
    'Authorization': `Bearer ${anonKey}`
  }
})
.then(async response => {
  console.log(`✅ Status: ${response.status}`);
  console.log(`   Content-Type: ${response.headers.get('content-type')}`);
  
  const text = await response.text();
  
  if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
    console.error('\n❌ PROBLEMA: Edge Function retornando HTML!');
    console.error('\n📋 HTML recebido:');
    console.error(text.substring(0, 500));
    console.error('\n🔍 POSSÍVEIS CAUSAS:');
    console.error('   1. Edge Function não está deployada');
    console.error('   2. Rota /health não existe');
    console.error('   3. Erro de runtime no servidor');
    console.error('\n🔧 PRÓXIMO PASSO:');
    console.error('   Verificar logs da Edge Function no Supabase Dashboard');
    console.error('   Edge Functions → server → Logs');
  } else {
    try {
      const data = JSON.parse(text);
      console.log('\n✅ Resposta JSON válida:');
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('\n⚠️ Resposta não é JSON nem HTML:');
      console.error(text.substring(0, 300));
    }
  }
})
.catch(error => {
  console.error('\n❌ ERRO ao chamar /health:');
  console.error(error);
})
.finally(() => {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('\nTESTE 2: Endpoint /kv-diagnostic');
  console.log('─────────────────────────────────────────────────────────────\n');
  
  // TESTE 2: Diagnóstico KV
  fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic`, {
    headers: {
      'Authorization': `Bearer ${anonKey}`
    }
  })
  .then(async response => {
    console.log(`Status: ${response.status}`);
    console.log(`Content-Type: ${response.headers.get('content-type')}`);
    
    const text = await response.text();
    
    if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
      console.error('\n❌ PROBLEMA CONFIRMADO: /kv-diagnostic retorna HTML!');
      console.error('\n🔍 CAUSA PROVÁVEL:');
      console.error('   Edge Function não reconhece a rota /kv-diagnostic');
      console.error('   OU a Edge Function não está atualizada com código novo');
      console.error('\n🔧 SOLUÇÃO:');
      console.error('   1. Fazer RE-DEPLOY da Edge Function');
      console.error('   2. Supabase Dashboard → Edge Functions → server → Deploy');
      console.error('   3. Aguardar 30-60 segundos');
      console.error('   4. Rodar este teste novamente');
    } else {
      try {
        const data = JSON.parse(text);
        console.log('\n✅ Diagnóstico KV obtido com sucesso:');
        console.log(JSON.stringify(data, null, 2));
        
        console.log('\n📊 ANÁLISE DOS TESTES:');
        if (data.tests) {
          data.tests.forEach(test => {
            const icon = test.status === 'OK' ? '✅' : '❌';
            console.log(`${icon} ${test.name}: ${test.status}`);
            if (test.error) {
              console.error(`   Erro: ${test.error}`);
            }
          });
        }
        
        if (data.overall === 'OK') {
          console.log('\n✅ KV STORE FUNCIONANDO PERFEITAMENTE!');
          console.log('   O erro HTML não é do KV.');
        } else {
          console.error('\n❌ PROBLEMAS NO KV DETECTADOS!');
          console.error('   Ver erros acima.');
        }
      } catch (e) {
        console.error('\n⚠️ Erro ao parsear resposta:');
        console.error(text.substring(0, 300));
      }
    }
  })
  .catch(error => {
    console.error('\n❌ ERRO ao chamar /kv-diagnostic:');
    console.error(error);
  })
  .finally(() => {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('\nTESTE 3: Endpoint PNBOIA status');
    console.log('─────────────────────────────────────────────────────────────\n');
    
    // TESTE 3: PNBOIA status
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`, {
      headers: {
        'Authorization': `Bearer ${anonKey}`
      }
    })
    .then(async response => {
      console.log(`Status: ${response.status}`);
      const text = await response.text();
      
      if (text.startsWith('<!DOCTYPE html>')) {
        console.error('\n❌ /pnboia/status também retorna HTML!');
        console.error('   Problema é GERAL na Edge Function.');
      } else {
        try {
          const data = JSON.parse(text);
          console.log('\n✅ PNBOIA status obtido:');
          console.log(`   Total: ${data.total}`);
          console.log(`   Ativas: ${data.active}`);
          console.log(`   Offline: ${data.offline}`);
        } catch (e) {
          console.error('\n⚠️ Erro ao parsear:', text.substring(0, 200));
        }
      }
    })
    .catch(error => {
      console.error('\n❌ Erro:', error);
    })
    .finally(() => {
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('📋 RESUMO DO DIAGNÓSTICO');
      console.log('═══════════════════════════════════════════════════════════════\n');
      console.log('Se TODOS os endpoints retornaram HTML:');
      console.log('   → Edge Function não está deployada OU desatualizada');
      console.log('   → Fazer RE-DEPLOY manual no Supabase Dashboard\n');
      console.log('Se ALGUNS endpoints funcionaram:');
      console.log('   → Problema específico em certas rotas');
      console.log('   → Verificar logs da Edge Function\n');
      console.log('Se TODOS funcionaram:');
      console.log('   → Problema já foi resolvido! ✅\n');
      console.log('PRÓXIMO PASSO:');
      console.log('   1. Ver resultado dos 3 testes acima');
      console.log('   2. Se HTML: Fazer re-deploy da Edge Function');
      console.log('   3. Se JSON: Problema resolvido!');
      console.log('\n═══════════════════════════════════════════════════════════════\n');
    });
  });
});
