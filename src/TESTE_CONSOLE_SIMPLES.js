// COPIE ESTE CÓDIGO COMPLETO E COLE NO CONSOLE (F12)
// Depois aperte Enter e aguarde ~15 segundos

fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.clear();
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🌊 TESTE DE SINCRONIZAÇÃO PNBOIA');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  console.log('📊 RESUMO:');
  console.log('Total:', data.summary.total);
  console.log('Sucesso:', data.summary.success);
  console.log('Falhas:', data.summary.failed);
  console.log('Taxa de sucesso:', data.summary.successRate);
  console.log('');
  
  const methods = { api: 0, scraping: 0, mock: 0, error: 0 };
  data.results.forEach(r => {
    if (!r.success) methods.error++;
    else if (r.method === 'api') methods.api++;
    else if (r.method === 'scraping') methods.scraping++;
    else if (r.method === 'mock') methods.mock++;
  });
  
  console.log('📈 MÉTODOS:');
  console.log('API GOOS:', methods.api, 'boias');
  console.log('Scraping:', methods.scraping, 'boias');
  console.log('Mock:', methods.mock, 'boias');
  console.log('Erros:', methods.error, 'boias');
  console.log('');
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📋 DETALHES POR BOIA:');
  console.log('═══════════════════════════════════════════════════════════════');
  
  data.results.forEach((r, i) => {
    const icon = r.success ? '✅' : '❌';
    const num = String(i + 1).padStart(2, '0');
    const id = r.buoyId.padEnd(30);
    const method = (r.method || 'N/A').padEnd(10);
    const height = r.data?.waveHeight || 'N/A';
    const err = r.error ? ' (' + r.error.substring(0, 40) + '...)' : '';
    console.log(icon + ' ' + num + '. ' + id + ' | ' + method + ' | Hs: ' + height + 'm' + err);
  });
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🔍 DIAGNÓSTICO:');
  console.log('═══════════════════════════════════════════════════════════════');
  
  if (methods.api > 0) {
    console.log('✅ API GOOS FUNCIONANDO!');
    console.log('   → GitHub Actions pode estar bloqueado');
    console.log('   → Solução: Sincronização manual do navegador');
  } else if (methods.scraping > 0) {
    console.log('✅ SCRAPING FUNCIONANDO!');
    console.log('   → API GOOS offline, mas scraping OK');
  } else if (methods.error === data.summary.total) {
    console.log('❌ TODAS AS FONTES OFFLINE!');
    console.log('   → APIs PNBOIA completamente inacessíveis');
    console.log('   → Site da Marinha pode estar fora do ar');
  } else {
    console.log('⚠️ RESULTADO PARCIAL');
  }
  
  console.log('');
  console.log('✅ COPIE TODO ESTE LOG E ME ENVIE!');
  console.log('═══════════════════════════════════════════════════════════════');
  
  return data;
})
.catch(err => {
  console.error('❌ ERRO:', err.message);
  console.error('Stack:', err.stack);
});
