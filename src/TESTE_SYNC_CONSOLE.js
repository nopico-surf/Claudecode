/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TESTE RÁPIDO: SINCRONIZAÇÃO PNBOIA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Cole este código no console do navegador (F12 → Console)
 * para testar a sincronização manual e ver exatamente onde está o problema.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// 🧪 TESTE 1: Verificar se servidor está respondendo
console.log('🧪 TESTE 1: Health Check do Servidor');
fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/health', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o'
  }
})
.then(r => {
  console.log('✅ Servidor respondeu com status:', r.status);
  return r.json();
})
.then(d => {
  console.log('✅ TESTE 1 PASSOU - Servidor OK:', d);
  console.log('');
  
  // 🧪 TESTE 2: Testar endpoint de teste PNBOIA
  console.log('🧪 TESTE 2: Endpoint de Teste PNBOIA');
  return fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/test', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o'
    }
  });
})
.then(r => {
  console.log('✅ PNBOIA test respondeu com status:', r.status);
  return r.json();
})
.then(d => {
  console.log('✅ TESTE 2 PASSOU - PNBOIA endpoint OK:', d);
  console.log('');
  
  // 🧪 TESTE 3: Sincronizar TODAS as boias (ESTE É O IMPORTANTE!)
  console.log('🧪 TESTE 3: Sincronização Completa');
  console.log('⏱️ Isso pode demorar 20-30 segundos...');
  
  return fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o'
    }
  });
})
.then(r => {
  console.log('✅ Sync-all respondeu com status:', r.status);
  if (!r.ok) {
    return r.text().then(text => {
      throw new Error(`Erro HTTP ${r.status}: ${text}`);
    });
  }
  return r.json();
})
.then(d => {
  console.log('');
  console.log('🎉 TESTE 3 PASSOU - Sincronização Completa!');
  console.log('📊 Resumo:', d.summary);
  console.log(`   ✅ Sucesso: ${d.summary.success}/${d.summary.total} boias`);
  console.log(`   ❌ Falhas: ${d.summary.failed}/${d.summary.total} boias`);
  console.log('');
  console.log('🔍 Detalhes de cada boia:');
  d.results.forEach(r => {
    if (r.success) {
      console.log(`   ✅ ${r.buoyId}: ${r.waveHeight}m ondas`);
    } else {
      console.log(`   ❌ ${r.buoyId}: ${r.error}`);
    }
  });
  console.log('');
  console.log('✅✅✅ TODOS OS TESTES PASSARAM! ✅✅✅');
  console.log('');
  console.log('🔄 Agora recarregue a página (Ctrl+R) e os dados devem aparecer!');
})
.catch(error => {
  console.error('');
  console.error('❌❌❌ ERRO ENCONTRADO! ❌❌❌');
  console.error('');
  console.error('Tipo:', error.name);
  console.error('Mensagem:', error.message);
  console.error('Stack:', error.stack);
  console.error('');
  console.error('📋 COPIE ESTA MENSAGEM E ME ENVIE!');
});
