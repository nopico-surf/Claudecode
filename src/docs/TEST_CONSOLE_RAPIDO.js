/**
 * ═══════════════════════════════════════════════════════════════
 * SCRIPT DE TESTE RÁPIDO - PNBOIA
 * ═══════════════════════════════════════════════════════════════
 * 
 * Cole este script no console do browser para diagnosticar
 * o estado do sistema PNBOIA rapidamente.
 * 
 * USO:
 * 1. Abrir DevTools (F12)
 * 2. Ir na aba Console
 * 3. Copiar e colar este código completo
 * 4. Apertar Enter
 * 5. Aguardar resultado (5-10 segundos)
 */

(async function testPNBOIA() {
  console.log('\n' + '='.repeat(70));
  console.log('🧪 TESTE RÁPIDO DO SISTEMA PNBOIA');
  console.log('='.repeat(70) + '\n');

  const projectId = 'rqgubpqniscyoojkwltn';
  const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

  try {
    // 1. Testar conexão com Edge Function
    console.log('1️⃣ Testando conexão com Edge Function...');
    const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/health`;
    const healthResponse = await fetch(healthUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    if (!healthResponse.ok) {
      console.error('❌ Edge Function não está respondendo!');
      console.error('   Status:', healthResponse.status);
      return;
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Edge Function ativo');
    console.log('   Timestamp:', healthData.timestamp);
    console.log('   Heartbeat count:', healthData.heartbeat_count);

    // 2. Verificar status das boias
    console.log('\n2️⃣ Verificando status das boias...');
    const statusUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`;
    const statusResponse = await fetch(statusUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    if (!statusResponse.ok) {
      console.error('❌ Erro ao buscar status das boias!');
      console.error('   Status:', statusResponse.status);
      return;
    }
    
    const statusData = await statusResponse.json();
    console.log('✅ Status recebido');
    console.log('   Boias ativas:', `${statusData.active}/${statusData.total}`);
    console.log('   Taxa de sucesso:', `${((statusData.active / statusData.total) * 100).toFixed(0)}%`);
    console.log('   Última sincronização global:', statusData.lastGlobalSync || 'Nunca');
    
    if (statusData.lastGlobalSync) {
      const lastSync = new Date(statusData.lastGlobalSync);
      const now = new Date();
      const diffMinutes = Math.floor((now - lastSync) / (1000 * 60));
      console.log('   Há quanto tempo:', `${diffMinutes} minutos atrás`);
    }

    // 3. Verificar dados de uma boia específica
    console.log('\n3️⃣ Verificando dados de boia exemplo (Rio Grande)...');
    const buoyUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/pnboia-rio-grande`;
    const buoyResponse = await fetch(buoyUrl, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    if (buoyResponse.ok) {
      const buoyData = await buoyResponse.json();
      console.log('✅ Dados da boia disponíveis');
      console.log('   Altura de onda (Hs):', buoyData.latestReading.waveHeight.toFixed(2), 'm');
      console.log('   Período (Tp):', buoyData.latestReading.wavePeriod.toFixed(1), 's');
      console.log('   Direção:', buoyData.latestReading.waveDirection, '°');
      console.log('   Timestamp:', buoyData.latestReading.timestamp);
    } else {
      console.warn('⚠️ Dados da boia não disponíveis ainda');
    }

    // 4. Resumo final
    console.log('\n' + '='.repeat(70));
    console.log('📊 RESUMO:');
    console.log('='.repeat(70));
    
    if (statusData.active === 0) {
      console.log('❌ PROBLEMA: Nenhuma boia com dados!');
      console.log('');
      console.log('💡 SOLUÇÕES:');
      console.log('   1. Aguardar 1-2 minutos (backend pode estar sincronizando)');
      console.log('   2. Abrir o indicador de status e clicar em "🔄 Sincronizar"');
      console.log('   3. Verificar logs do Edge Function no Supabase Dashboard');
      console.log('');
      console.log('   Para forçar sincronização agora, execute:');
      console.log('   forceSyncNow()  ← cole no console');
    } else if (statusData.active === statusData.total) {
      console.log('✅ TUDO OK: Todas as boias estão com dados!');
      console.log('   Sistema PNBOIA funcionando perfeitamente.');
    } else {
      console.log('⚠️ PARCIAL:', statusData.active, 'de', statusData.total, 'boias ativas');
      console.log('   Sistema funcionando mas algumas boias offline.');
    }
    
    console.log('='.repeat(70) + '\n');

  } catch (error) {
    console.error('\n❌ ERRO durante teste:', error);
    console.error('Stack:', error.stack);
  }
})();

// Função auxiliar para forçar sincronização
window.forceSyncNow = async function() {
  console.log('\n🔄 FORÇANDO SINCRONIZAÇÃO...\n');
  
  const projectId = 'rqgubpqniscyoojkwltn';
  const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';
  
  try {
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    
    const data = await response.json();
    
    console.log('✅ Sincronização concluída!');
    console.log('   Sucesso:', data.summary.success);
    console.log('   Falhas:', data.summary.failed);
    console.log('   Taxa:', data.summary.successRate);
    console.log('\nAguarde 10 segundos e recarregue a página.\n');
    
    return data;
  } catch (error) {
    console.error('❌ Erro ao forçar sincronização:', error);
  }
};

console.log('💡 TIP: Para forçar sincronização a qualquer momento, digite: forceSyncNow()');
