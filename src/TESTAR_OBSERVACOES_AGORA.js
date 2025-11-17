/**
 * ════════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE RÁPIDO - OBSERVAÇÕES
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * COLE NO CONSOLE (F12) AGORA:
 */

console.clear();

// Verificar dados
const raw = localStorage.getItem('nopico_observations');
const obs = raw ? JSON.parse(raw) : [];

console.log('%c🔍 DIAGNÓSTICO RÁPIDO', 'background: #001f3d; color: #ffc72c; font-size: 18px; padding: 10px; font-weight: bold');
console.log('');

if (obs.length === 0) {
  console.log('%c❌ NENHUMA OBSERVAÇÃO ENCONTRADA', 'color: #f44336; font-size: 16px; font-weight: bold');
  console.log('');
  console.log('🎯 SOLUÇÃO: Vou criar uma observação de TESTE para você!');
  console.log('');
  console.log('Execute este comando:');
  console.log('');
  console.log('%c// COPIE E COLE ABAIXO:', 'color: #00bcd4; font-size: 14px; font-weight: bold');
  console.log('');
  console.log(`
const testObs = [{
  id: 'obs-test-novo-campeche-' + Date.now(),
  timestamp: new Date().toISOString(),
  spotId: 'sc-florianopolis-novo-campeche',
  spotName: 'Novo Campeche',
  offshore: { height: 1.5, period: 8, direction: 165, directionLabel: 'SE' },
  forecast: { height: 1.2, multiplier: 0.8, source: 'manual' },
  observed: { height: 1.1, quality: 4 },
  context: { tide: 'mid', wind: 'NE 15kt', sessionTime: '08:00' },
  error: -8.3,
  errorAbsolute: -0.1,
  notes: 'Teste - Ondas limpas, bom período',
  confidence: 'high'
}, {
  id: 'obs-test-morro-pedras-' + Date.now(),
  timestamp: new Date(Date.now() - 3600000).toISOString(),
  spotId: 'sc-florianopolis-morro-das-pedras',
  spotName: 'Morro das Pedras',
  offshore: { height: 1.2, period: 7, direction: 180, directionLabel: 'S' },
  forecast: { height: 0.9, multiplier: 0.75, source: 'manual' },
  observed: { height: 0.8, quality: 3 },
  context: { tide: 'high', wind: 'E 10kt', sessionTime: '07:00' },
  error: -11.1,
  errorAbsolute: -0.1,
  notes: 'Teste - Ondas pequenas mas surfáveis',
  confidence: 'high'
}];

localStorage.setItem('nopico_observations', JSON.stringify(testObs));
console.log('%c✅ 2 OBSERVAÇÕES DE TESTE CRIADAS!', 'color: #4caf50; font-size: 16px; font-weight: bold');
console.log('');
console.log('🔄 Agora RECARREGUE a página /admin:');
console.log('   • Ctrl+Shift+R (Windows/Linux)');
console.log('   • Cmd+Shift+R (Mac)');
console.log('');
console.log('📊 Você deve ver:');
console.log('   Total de Observações: 2');
console.log('   Picos Calibrados: 2');
console.log('   - Novo Campeche');
console.log('   - Morro das Pedras');
  `);
  
} else {
  console.log('%c✅ OBSERVAÇÕES ENCONTRADAS!', 'color: #4caf50; font-size: 16px; font-weight: bold');
  console.log('');
  console.log(`📊 Total: ${obs.length} observação(ões)`);
  console.log('');
  
  const bySpot = {};
  obs.forEach(o => {
    if (!bySpot[o.spotName]) {
      bySpot[o.spotName] = 0;
    }
    bySpot[o.spotName]++;
  });
  
  console.log('🏖️ Picos:');
  Object.entries(bySpot).forEach(([name, count]) => {
    console.log(`   📍 ${name}: ${count}× observações`);
  });
  console.log('');
  
  console.log('%c📋 TODAS AS OBSERVAÇÕES:', 'color: #2196f3; font-size: 14px; font-weight: bold');
  console.table(obs.map(o => ({
    'Data': new Date(o.timestamp).toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    'Pico': o.spotName,
    'Previsto': o.forecast.height.toFixed(2) + 'm',
    'Real': o.observed.height.toFixed(2) + 'm',
    'Erro': o.error.toFixed(1) + '%',
    'Qualidade': '⭐'.repeat(o.observed.quality),
    'Notas': (o.notes || '').substring(0, 30)
  })));
  
  console.log('');
  console.log('%c🔄 SE NÃO APARECEM NO DASHBOARD:', 'color: #ff9800; font-size: 14px; font-weight: bold');
  console.log('');
  console.log('   Recarregue a página com:');
  console.log('   • Ctrl+Shift+R (Windows/Linux)');
  console.log('   • Cmd+Shift+R (Mac)');
  console.log('');
  console.log('   Os dados devem aparecer instantaneamente!');
  console.log('');
}

console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
