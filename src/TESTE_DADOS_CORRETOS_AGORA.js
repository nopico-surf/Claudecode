/**
 * ════════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE DADOS CORRETOS - COLE NO CONSOLE (F12)
 * ════════════════════════════════════════════════════════════════════════════
 */

console.clear();
console.log('%c🔧 REMOVENDO DADOS ANTIGOS (ERRADOS)...', 'color: #ff9800; font-size: 16px; font-weight: bold');
localStorage.removeItem('nopico_observations');
console.log('%c✅ Dados antigos removidos!', 'color: #4caf50; font-size: 14px');
console.log('');

console.log('%c📊 ADICIONANDO DADOS CORRETOS...', 'color: #2196f3; font-size: 16px; font-weight: bold');

// CÁLCULOS CORRETOS
const novoCampecheError = ((1.2 - 1.1) / 1.1) * 100;  // +9.09%
const morroPedrasError = ((0.9 - 0.8) / 0.8) * 100;    // +12.5%

const testObservations = [{
  id: 'obs-test-novo-campeche-' + Date.now(),
  timestamp: new Date().toISOString(),
  spotId: 'sc-florianopolis-novo-campeche',
  spotName: 'Novo Campeche',
  offshore: { height: 1.5, period: 8, direction: 165, directionLabel: 'SE' },
  forecast: { height: 1.2, multiplier: 0.8, source: 'manual' },
  observed: { height: 1.1, quality: 4 },
  context: { tide: 'mid', wind: 'NE 15kt', sessionTime: '08:00' },
  error: parseFloat(novoCampecheError.toFixed(2)),
  errorAbsolute: parseFloat((1.2 - 1.1).toFixed(2)),
  notes: 'Teste - Ondas limpas, período bom',
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
  error: parseFloat(morroPedrasError.toFixed(2)),
  errorAbsolute: parseFloat((0.9 - 0.8).toFixed(2)),
  notes: 'Teste - Surfável',
  confidence: 'high'
}];

localStorage.setItem('nopico_observations', JSON.stringify(testObservations));

console.log('%c✅ DADOS CORRETOS ADICIONADOS!', 'color: #4caf50; font-size: 16px; font-weight: bold');
console.log('');

console.log('%c📊 VERIFICAÇÃO:', 'color: #9c27b0; font-size: 14px; font-weight: bold');
console.log('');

console.log('📍 Novo Campeche:');
console.log('   Previsto: 1.20m');
console.log('   Real: 1.10m');
console.log('   Erro: +' + novoCampecheError.toFixed(2) + '% (POSITIVO = superestimou)');
console.log('');

console.log('📍 Morro das Pedras:');
console.log('   Previsto: 0.90m');
console.log('   Real: 0.80m');
console.log('   Erro: +' + morroPedrasError.toFixed(2) + '% (POSITIVO = superestimou)');
console.log('');

console.log('%c🔄 AGORA RECARREGUE A PÁGINA:', 'color: #ff5722; font-size: 16px; font-weight: bold');
console.log('   Ctrl+Shift+R (Windows/Linux)');
console.log('   Cmd+Shift+R (Mac)');
console.log('');

console.log('%c✅ VOCÊ DEVE VER:', 'color: #4caf50; font-size: 14px; font-weight: bold');
console.log('');
console.log('   Morro das Pedras → Erro: +12% (não -11%)');
console.log('   Novo Campeche → Erro: +9% (não -8%)');
console.log('');

console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
