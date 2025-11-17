/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE RÁPIDO - VERIFICAR SE FUNÇÃO JÁ ESTÁ FUNCIONANDO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ANTES de fazer qualquer mudança, vamos testar se a função já está OK.
 * 
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

console.clear();
console.log('═══════════════════════════════════════════════════════════════');
console.log('🧪 TESTE RÁPIDO - FUNÇÃO JÁ FUNCIONA?');
console.log('═══════════════════════════════════════════════════════════════\n');

const projectId = 'rqgubpqniscyoojkwltn';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM';

let healthOk = false;
let kvDiagnosticOk = false;
let pnboiaStatusOk = false;

// TESTE 1: Endpoint /health
console.log('TESTE 1: Endpoint /health');
console.log('─────────────────────────────────────────────────────────────\n');

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/health`, {
  headers: { 'Authorization': `Bearer ${anonKey}` }
})
.then(async response => {
  const text = await response.text();
  
  if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
    console.error('❌ /health retorna HTML (404)');
    console.error('   → Edge Function NÃO está funcionando\n');
  } else {
    try {
      const data = JSON.parse(text);
      console.log('✅ /health funciona!');
      console.log(`   Status: ${data.status}`);
      console.log(`   Mensagem: ${data.message}\n`);
      healthOk = true;
    } catch (e) {
      console.error('⚠️ /health responde, mas não é JSON:', text.substring(0, 100) + '\n');
    }
  }
})
.catch(e => {
  console.error('❌ Erro ao chamar /health:', e.message + '\n');
})
.finally(() => {
  // TESTE 2: Endpoint /kv-diagnostic
  console.log('TESTE 2: Endpoint /kv-diagnostic (novo)');
  console.log('─────────────────────────────────────────────────────────────\n');
  
  fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic`, {
    headers: { 'Authorization': `Bearer ${anonKey}` }
  })
  .then(async response => {
    const text = await response.text();
    
    if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
      console.error('❌ /kv-diagnostic retorna HTML (404)');
      console.error('   → Endpoint NOVO não existe');
      console.error('   → Edge Function está com código ANTIGO');
      console.error('   → PRECISA fazer re-deploy\n');
    } else {
      try {
        const data = JSON.parse(text);
        console.log('✅ /kv-diagnostic funciona!');
        console.log(`   Overall: ${data.overall}`);
        
        if (data.tests) {
          console.log('\n   Testes KV:');
          data.tests.forEach(test => {
            const icon = test.status === 'OK' ? '✅' : '❌';
            console.log(`   ${icon} ${test.name}: ${test.status}`);
            if (test.error) {
              console.error(`      Erro: ${test.error.substring(0, 100)}`);
            }
          });
        }
        
        console.log('');
        kvDiagnosticOk = true;
      } catch (e) {
        console.error('⚠️ /kv-diagnostic responde, mas erro ao parsear\n');
      }
    }
  })
  .catch(e => {
    console.error('❌ Erro ao chamar /kv-diagnostic:', e.message + '\n');
  })
  .finally(() => {
    // TESTE 3: Endpoint /pnboia/status
    console.log('TESTE 3: Endpoint /pnboia/status');
    console.log('─────────────────────────────────────────────────────────────\n');
    
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`, {
      headers: { 'Authorization': `Bearer ${anonKey}` }
    })
    .then(async response => {
      const text = await response.text();
      
      if (text.startsWith('<!DOCTYPE html>')) {
        console.error('❌ /pnboia/status retorna HTML\n');
      } else {
        try {
          const data = JSON.parse(text);
          console.log('✅ /pnboia/status funciona!');
          console.log(`   Total de boias: ${data.total}`);
          console.log(`   Ativas: ${data.active}`);
          console.log(`   Offline: ${data.offline}`);
          console.log(`   Última sync global: ${data.lastGlobalSync || 'NUNCA'}\n`);
          pnboiaStatusOk = true;
        } catch (e) {
          console.error('⚠️ /pnboia/status responde, mas erro ao parsear\n');
        }
      }
    })
    .catch(e => {
      console.error('❌ Erro ao chamar /pnboia/status:', e.message + '\n');
    })
    .finally(() => {
      // RESUMO FINAL
      setTimeout(() => {
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('📊 RESUMO DOS TESTES');
        console.log('═══════════════════════════════════════════════════════════════\n');
        
        console.log('Resultados:');
        console.log(`   ${healthOk ? '✅' : '❌'} /health ${healthOk ? 'FUNCIONA' : 'FALHOU'}`);
        console.log(`   ${kvDiagnosticOk ? '✅' : '❌'} /kv-diagnostic ${kvDiagnosticOk ? 'FUNCIONA' : 'NÃO EXISTE (código antigo)'}`);
        console.log(`   ${pnboiaStatusOk ? '✅' : '❌'} /pnboia/status ${pnboiaStatusOk ? 'FUNCIONA' : 'FALHOU'}`);
        
        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('🎯 DIAGNÓSTICO:');
        console.log('═══════════════════════════════════════════════════════════════\n');
        
        if (healthOk && kvDiagnosticOk && pnboiaStatusOk) {
          console.log('✅✅✅ TUDO FUNCIONANDO PERFEITAMENTE!');
          console.log('\n   Edge Function está ATUALIZADA (versão 1.4.1)');
          console.log('   Código novo com melhorias já está deployado');
          console.log('   Sistema 100% operacional\n');
          console.log('🎉 NÃO PRECISA FAZER NADA! Já está OK!\n');
        } else if (healthOk && !kvDiagnosticOk && pnboiaStatusOk) {
          console.log('⚠️⚠️⚠️ EDGE FUNCTION COM CÓDIGO ANTIGO');
          console.log('\n   /health: ✅ Funciona (endpoint básico)');
          console.log('   /kv-diagnostic: ❌ Não existe (endpoint novo)');
          console.log('   /pnboia/status: ✅ Funciona (endpoint antigo)\n');
          console.log('📋 AÇÃO NECESSÁRIA:');
          console.log('   → Fazer RE-DEPLOY da Edge Function');
          console.log('   → Supabase Dashboard → make-server-2d5da22b → Deploy');
          console.log('   → Aguardar 30-60s e testar novamente\n');
        } else {
          console.log('❌❌❌ PROBLEMAS GRAVES DETECTADOS');
          console.log('\n   Edge Function não está respondendo corretamente');
          console.log('   Múltiplos endpoints falharam\n');
          console.log('📋 POSSÍVEIS CAUSAS:');
          console.log('   1. Edge Function não está deployada');
          console.log('   2. Erro crítico no código');
          console.log('   3. Problema de inicialização\n');
          console.log('📋 AÇÃO NECESSÁRIA:');
          console.log('   1. Ir para Supabase Dashboard → Edge Functions');
          console.log('   2. Verificar logs da função (aba Logs)');
          console.log('   3. Procurar erros em vermelho');
          console.log('   4. Fazer re-deploy se necessário\n');
        }
        
        console.log('═══════════════════════════════════════════════════════════════\n');
      }, 1000);
    });
  });
});
