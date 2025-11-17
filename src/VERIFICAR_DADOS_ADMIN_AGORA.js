/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔍 VERIFICAR DADOS DO ADMIN - COPIE E COLE NO CONSOLE (F12)
 * ═══════════════════════════════════════════════════════════════════════════
 */

console.log('\n🔍 ════════════════════════════════════════════════════════════════');
console.log('   VERIFICAÇÃO DE DADOS DO ADMIN');
console.log('════════════════════════════════════════════════════════════════\n');

// Carregar dados do localStorage
const stored = localStorage.getItem('nopico_observations');

if (!stored) {
  console.log('❌ PROBLEMA: Nenhum dado no localStorage!');
  console.log('   Solução: Clique no botão "Adicionar Dados de Teste" no Admin\n');
} else {
  const obs = JSON.parse(stored);
  
  console.log(`✅ Total de observações: ${obs.length}\n`);
  
  obs.forEach((o, i) => {
    console.log(`[${i + 1}] ${o.spotName}`);
    console.log(`    SpotID: ${o.spotId}`);
    console.log(`    Offshore: ${o.offshore.height}m @ ${o.offshore.period}s ${o.offshore.directionLabel}`);
    console.log(`    Previsto: ${o.forecast.height}m`);
    console.log(`    Real: ${o.observed.height}m`);
    console.log(`    Erro: ${o.error}%`);
    console.log(`    Data: ${new Date(o.timestamp).toLocaleString('pt-BR')}`);
    console.log('');
  });
  
  // Validar dados corretos
  console.log('🎯 VALIDAÇÃO:');
  
  const morro = obs.find(o => o.spotId === 'sc-floripa-morropedras-1');
  const campeche = obs.find(o => o.spotId === 'sc-floripa-campeche-1');
  
  if (morro) {
    const morroOk = morro.forecast.height === 1.2 && morro.observed.height === 1.5;
    console.log(`   Morro das Pedras: ${morroOk ? '✅' : '❌'}`);
    console.log(`      Previsto: ${morro.forecast.height}m (esperado: 1.2m)`);
    console.log(`      Real: ${morro.observed.height}m (esperado: 1.5m)`);
  } else {
    console.log('   ❌ Morro das Pedras NÃO encontrado!');
  }
  
  if (campeche) {
    const campecheOk = campeche.observed.height === 1.0;
    console.log(`   Novo Campeche: ${campecheOk ? '✅' : '❌'}`);
    console.log(`      Real: ${campeche.observed.height}m (esperado: 1.0m)`);
  } else {
    console.log('   ❌ Novo Campeche NÃO encontrado!');
  }
}

console.log('\n════════════════════════════════════════════════════════════════\n');
