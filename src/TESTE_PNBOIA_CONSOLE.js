/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCRIPT DE TESTE PNBOIA - COLE NO CONSOLE DO NAVEGADOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este script testa todos os endpoints PNBOIA e mostra o resultado no console.
 * 
 * COMO USAR:
 * 1. Abra o console do navegador (F12 → Console)
 * 2. Cole este script inteiro
 * 3. Pressione Enter
 * 4. Aguarde os resultados
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

(async function testPNBOIA() {
  console.clear();
  console.log('%c🌊 TESTE COMPLETO PNBOIA', 'background: #001f3d; color: #ffc72c; font-size: 20px; padding: 10px;');
  console.log('');
  
  const projectId = "rqgubpqniscyoojkwltn";
  const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o";
  
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b`;
  
  console.log('📡 Base URL:', baseUrl);
  console.log('');
  
  // Teste 1: Endpoint de teste
  console.log('%c📍 TESTE 1: Endpoint de teste', 'background: #4CAF50; color: white; padding: 4px;');
  try {
    const testUrl = `${baseUrl}/pnboia/test`;
    console.log('URL:', testUrl);
    
    const response = await fetch(testUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    console.log('Status:', response.status, response.statusText);
    const data = await response.json();
    console.log('Resposta:', data);
    console.log('✅ Endpoint de teste funcionando!');
  } catch (err) {
    console.error('❌ Erro no endpoint de teste:', err);
  }
  console.log('');
  
  // Teste 2: Status das boias
  console.log('%c📍 TESTE 2: Status das boias', 'background: #2196F3; color: white; padding: 4px;');
  try {
    const statusUrl = `${baseUrl}/pnboia/status`;
    console.log('URL:', statusUrl);
    
    const response = await fetch(statusUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    console.log('Status:', response.status, response.statusText);
    const data = await response.json();
    console.log('Resposta:', data);
    console.log(`✅ Status: ${data.active}/${data.total} boias ativas`);
  } catch (err) {
    console.error('❌ Erro no status:', err);
  }
  console.log('');
  
  // Teste 3: Dados das boias
  console.log('%c📍 TESTE 3: Dados das boias', 'background: #FF9800; color: white; padding: 4px;');
  try {
    const dataUrl = `${baseUrl}/pnboia/data`;
    console.log('URL:', dataUrl);
    
    const response = await fetch(dataUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    console.log('Status:', response.status, response.statusText);
    const data = await response.json();
    console.log('Resposta:', data);
    console.log(`✅ Dados: ${data.buoys?.length || 0} boias com dados`);
  } catch (err) {
    console.error('❌ Erro nos dados:', err);
  }
  console.log('');
  
  // Teste 4: Estatísticas
  console.log('%c📍 TESTE 4: Estatísticas', 'background: #9C27B0; color: white; padding: 4px;');
  try {
    const statsUrl = `${baseUrl}/pnboia/statistics`;
    console.log('URL:', statsUrl);
    
    const response = await fetch(statsUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    console.log('Status:', response.status, response.statusText);
    const data = await response.json();
    console.log('Resposta:', data);
    console.log('✅ Estatísticas carregadas');
  } catch (err) {
    console.error('❌ Erro nas estatísticas:', err);
  }
  console.log('');
  
  // Resumo final
  console.log('%c🎯 TESTES CONCLUÍDOS', 'background: #001f3d; color: #ffc72c; font-size: 16px; padding: 8px;');
  console.log('');
  console.log('Se todos os testes mostraram ✅, o servidor está funcionando!');
  console.log('Se algum teste falhou, veja os detalhes acima.');
  console.log('');
  console.log('💡 PRÓXIMO PASSO:');
  console.log('Se as boias estão offline (0/14 ativas), execute a sincronização:');
  console.log('');
  console.log('%cClique no botão "Sincronizar Todas" no dashboard', 'background: #ffc72c; color: #001f3d; padding: 8px;');
  console.log('');
  
})();
