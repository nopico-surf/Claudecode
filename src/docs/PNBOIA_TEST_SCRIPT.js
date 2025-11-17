/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCRIPT DE TESTE RÁPIDO - PNBOIA SCRAPER
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Como usar:
 * 1. Abrir console do navegador (F12)
 * 2. Copiar e colar este script inteiro
 * 3. Executar: testPNBOIA()
 * 
 * O script irá:
 * - Sincronizar todas as boias (com dados mockados)
 * - Verificar status
 * - Testar bias correction em Florianópolis
 * - Mostrar resultados formatados
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ========================================
// CONFIGURAÇÃO
// ========================================

// IMPORTANTE: Atualizar com seus dados do Supabase
const SUPABASE_PROJECT_ID = 'YOUR_PROJECT_ID'; // Ex: 'abcdefghijklmnop'
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';     // Ex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

function log(emoji, message, data = null) {
  console.log(`${emoji} ${message}`);
  if (data) {
    console.table(data);
  }
}

async function callAPI(endpoint, method = 'GET') {
  const url = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-2d5da22b${endpoint}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}

// ========================================
// TESTES
// ========================================

async function test1_SyncAll() {
  log('🌊', 'TESTE 1: Sincronizando TODAS as boias (modo MOCK)...');
  
  const result = await callAPI('/pnboia/sync-all?useMock=true', 'POST');
  
  log('✅', `Sincronização completa: ${result.summary.success}/${result.summary.total} boias (${result.summary.successRate})`);
  
  const tableData = result.results.map(r => ({
    'Boia': r.buoyId.replace('pnboia-', ''),
    'Status': r.success ? '✅' : '❌',
    'Método': r.method,
    'Altura': r.data ? `${r.data.waveHeight}m` : '-',
    'Direção': r.data ? `${r.data.waveDirection}°` : '-'
  }));
  
  console.table(tableData);
  
  return result;
}

async function test2_CheckStatus() {
  log('📊', 'TESTE 2: Verificando status das boias...');
  
  const result = await callAPI('/pnboia/status', 'GET');
  
  log('✅', `Status obtido: ${result.active}/${result.total} boias ativas`);
  
  const tableData = result.buoys.map(b => ({
    'Boia': b.buoyId.replace('pnboia-', ''),
    'Status': b.status === 'active' ? '✅' : '❌',
    'Tem Dados': b.hasData ? '✅' : '❌',
    'Última Sync': new Date(b.lastSync).toLocaleString('pt-BR')
  }));
  
  console.table(tableData);
  
  return result;
}

async function test3_GetBuoyData() {
  log('🎯', 'TESTE 3: Obtendo dados da boia de Florianópolis...');
  
  const result = await callAPI('/pnboia/pnboia-florianopolis', 'GET');
  
  if (result.status === 'ok') {
    log('✅', 'Dados obtidos com sucesso!');
    
    const reading = result.latestReading;
    console.log('📊 Última leitura:');
    console.log(`   Timestamp: ${new Date(reading.timestamp).toLocaleString('pt-BR')}`);
    console.log(`   Altura (Hs): ${reading.waveHeight.toFixed(2)}m`);
    console.log(`   Período (Tp): ${reading.wavePeriod.toFixed(1)}s`);
    console.log(`   Direção: ${reading.waveDirection}°`);
    console.log(`   Vento: ${reading.windSpeed.toFixed(0)}km/h @ ${reading.windDirection}°`);
    console.log(`   Temp. água: ${reading.waterTemp.toFixed(1)}°C`);
    
    console.log(`\n📈 Histórico (24h): ${result.last24h.length} leituras`);
  } else {
    log('❌', 'Boia não encontrada ou sem dados');
  }
  
  return result;
}

async function test4_SyncSingleBuoy() {
  log('🔄', 'TESTE 4: Sincronizando boia individual (Santos)...');
  
  const result = await callAPI('/pnboia/sync-one/pnboia-santos?useMock=true', 'POST');
  
  if (result.status === 'ok') {
    log('✅', `Boia ${result.buoyId} sincronizada via ${result.method}`);
    console.log('📊 Dados:');
    console.log(`   Altura: ${result.data.waveHeight.toFixed(2)}m`);
    console.log(`   Direção: ${result.data.waveDirection}°`);
    console.log(`   Período: ${result.data.wavePeriod.toFixed(1)}s`);
  } else {
    log('❌', 'Erro ao sincronizar boia');
  }
  
  return result;
}

// ========================================
// TESTE COMPLETO
// ========================================

async function testPNBOIA() {
  console.clear();
  console.log('═'.repeat(70));
  console.log('🌊 TESTE COMPLETO DO SISTEMA PNBOIA');
  console.log('═'.repeat(70));
  console.log('');
  
  try {
    // Teste 1: Sincronizar todas
    await test1_SyncAll();
    console.log('');
    
    // Aguardar 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Teste 2: Verificar status
    await test2_CheckStatus();
    console.log('');
    
    // Aguardar 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Teste 3: Obter dados de uma boia
    await test3_GetBuoyData();
    console.log('');
    
    // Aguardar 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Teste 4: Sincronizar boia individual
    await test4_SyncSingleBuoy();
    console.log('');
    
    console.log('═'.repeat(70));
    log('🎉', 'TODOS OS TESTES CONCLUÍDOS COM SUCESSO!');
    console.log('═'.repeat(70));
    console.log('');
    console.log('💡 Próximos passos:');
    console.log('   1. Configurar cron job para sincronização automática');
    console.log('   2. Testar com dados REAIS (remover ?useMock=true)');
    console.log('   3. Visitar um pico próximo a uma boia para ver bias correction');
    console.log('');
    
  } catch (error) {
    console.log('');
    console.log('═'.repeat(70));
    log('❌', 'ERRO DURANTE OS TESTES');
    console.log('═'.repeat(70));
    console.error('Detalhes:', error);
    console.log('');
    console.log('🔍 Verifique:');
    console.log('   1. SUPABASE_PROJECT_ID está correto');
    console.log('   2. SUPABASE_ANON_KEY está correto');
    console.log('   3. Backend está deployado e funcionando');
    console.log('   4. Não há bloqueio de CORS');
  }
}

// ========================================
// TESTES INDIVIDUAIS
// ========================================

// Você também pode executar testes individuais:
// await test1_SyncAll()
// await test2_CheckStatus()
// await test3_GetBuoyData()
// await test4_SyncSingleBuoy()

console.log('═'.repeat(70));
console.log('🌊 Script de teste PNBOIA carregado!');
console.log('═'.repeat(70));
console.log('');
console.log('Para executar todos os testes:');
console.log('  testPNBOIA()');
console.log('');
console.log('Para executar testes individuais:');
console.log('  test1_SyncAll()');
console.log('  test2_CheckStatus()');
console.log('  test3_GetBuoyData()');
console.log('  test4_SyncSingleBuoy()');
console.log('');
console.log('⚠️ IMPORTANTE: Configure SUPABASE_PROJECT_ID e SUPABASE_ANON_KEY no topo do script');
console.log('');
