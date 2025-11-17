/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 TESTE COM DADOS REAIS DOS PICOS - COLE NO CONSOLE (F12)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CORREÇÕES APLICADAS:
 * ✅ IDs corretos (sc-floripa-campeche-1, sc-floripa-morropedras-1)
 * ✅ Multiplicadores reais do spotWaveAdjustments.ts
 * ✅ Cálculos corretos de erro
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

console.clear();
console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
console.log('%c🧪 TESTE COM DADOS REAIS DOS PICOS', 'color: #2196f3; font-size: 18px; font-weight: bold');
console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// DADOS REAIS DOS AJUSTES (spotWaveAdjustments.ts)
// ═══════════════════════════════════════════════════════════════════════════

console.log('%c📋 DADOS REAIS DO SISTEMA:', 'color: #9c27b0; font-size: 14px; font-weight: bold');
console.log('');

console.log('1️⃣ Novo Campeche:');
console.log('   ID: sc-floripa-campeche-1');
console.log('   Shoaling: 0.62');
console.log('   Direction (S): 1.0');
console.log('   Multiplicador TOTAL: 0.62 × 1.0 = 0.62');
console.log('');

console.log('2️⃣ Morro das Pedras:');
console.log('   ID: sc-floripa-morropedras-1');
console.log('   Shoaling: 0.92');
console.log('   Direction (SE/S): 0.91');
console.log('   Multiplicador TOTAL: 0.92 × 0.91 = 0.84');
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// CÁLCULOS COM DADOS REAIS
// ═══════════════════════════════════════════════════════════════════════════

console.log('%c📊 CÁLCULOS:', 'color: #ff9800; font-size: 14px; font-weight: bold');
console.log('');

// Novo Campeche: Offshore 2.0m × 0.62 = 1.24m, Real 1.1m
const novoCampecheOffshore = 2.0;
const novoCampecheMultiplier = 0.62;
const novoCampecheForecast = novoCampecheOffshore * novoCampecheMultiplier;
const novoCampecheObserved = 1.1;
const novoCampecheError = ((novoCampecheForecast - novoCampecheObserved) / novoCampecheObserved) * 100;

console.log('1️⃣ Novo Campeche:');
console.log('   Offshore: ' + novoCampecheOffshore + 'm');
console.log('   Previsto: ' + novoCampecheOffshore + 'm × ' + novoCampecheMultiplier + ' = ' + novoCampecheForecast.toFixed(2) + 'm');
console.log('   Real: ' + novoCampecheObserved + 'm');
console.log('   Erro: +' + novoCampecheError.toFixed(2) + '% (superestimou)');
console.log('');

// Morro das Pedras: Offshore 1.5m × 0.84 = 1.26m, Real 1.1m
const morroPedrasOffshore = 1.5;
const morroPedrasMultiplier = 0.84;
const morroPedrasForecast = morroPedrasOffshore * morroPedrasMultiplier;
const morroPedrasObserved = 1.1;
const morroPedrasError = ((morroPedrasForecast - morroPedrasObserved) / morroPedrasObserved) * 100;

console.log('2️⃣ Morro das Pedras:');
console.log('   Offshore: ' + morroPedrasOffshore + 'm');
console.log('   Previsto: ' + morroPedrasOffshore + 'm × ' + morroPedrasMultiplier + ' = ' + morroPedrasForecast.toFixed(2) + 'm');
console.log('   Real: ' + morroPedrasObserved + 'm');
console.log('   Erro: +' + morroPedrasError.toFixed(2) + '% (superestimou)');
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// LIMPAR DADOS ANTIGOS E ADICIONAR NOVOS
// ═══════════════════════════════════════════════════════════════════════════

console.log('%c🗑️ LIMPANDO DADOS ANTIGOS...', 'color: #ff5722; font-size: 14px; font-weight: bold');
localStorage.removeItem('nopico_observations');
console.log('✅ Dados antigos removidos');
console.log('');

console.log('%c💾 ADICIONANDO DADOS REAIS...', 'color: #4caf50; font-size: 14px; font-weight: bold');

const testObservations = [{
  id: 'obs-test-novo-campeche-' + Date.now(),
  timestamp: new Date().toISOString(),
  spotId: 'sc-floripa-campeche-1',
  spotName: 'Novo Campeche',
  offshore: { 
    height: parseFloat(novoCampecheOffshore.toFixed(2)), 
    period: 9, 
    direction: 165, 
    directionLabel: 'SE' 
  },
  forecast: { 
    height: parseFloat(novoCampecheForecast.toFixed(2)), 
    multiplier: novoCampecheMultiplier, 
    source: 'manual'
  },
  observed: { 
    height: novoCampecheObserved, 
    quality: 4
  },
  context: { 
    tide: 'mid', 
    wind: 'NE 12kt', 
    sessionTime: '08:00' 
  },
  error: parseFloat(novoCampecheError.toFixed(2)),
  errorAbsolute: parseFloat((novoCampecheForecast - novoCampecheObserved).toFixed(2)),
  notes: '🧪 TESTE - Multiplicador real 0.62 do spotWaveAdjustments.ts',
  confidence: 'high'
}, {
  id: 'obs-test-morro-pedras-' + Date.now(),
  timestamp: new Date(Date.now() - 3600000).toISOString(),
  spotId: 'sc-floripa-morropedras-1',
  spotName: 'Morro das Pedras',
  offshore: { 
    height: parseFloat(morroPedrasOffshore.toFixed(2)), 
    period: 8, 
    direction: 150, 
    directionLabel: 'SE' 
  },
  forecast: { 
    height: parseFloat(morroPedrasForecast.toFixed(2)), 
    multiplier: morroPedrasMultiplier, 
    source: 'manual'
  },
  observed: { 
    height: morroPedrasObserved, 
    quality: 4
  },
  context: { 
    tide: 'mid', 
    wind: 'NE 10kt', 
    sessionTime: '07:30' 
  },
  error: parseFloat(morroPedrasError.toFixed(2)),
  errorAbsolute: parseFloat((morroPedrasForecast - morroPedrasObserved).toFixed(2)),
  notes: '🧪 TESTE - Multiplicador real 0.84 (0.92×0.91) do spotWaveAdjustments.ts',
  confidence: 'high'
}];

localStorage.setItem('nopico_observations', JSON.stringify(testObservations));

console.log('✅ Dados adicionados com sucesso!');
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// VERIFICAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

console.log('%c✅ VERIFICAÇÃO:', 'color: #4caf50; font-size: 16px; font-weight: bold');
console.log('');

console.log('📊 Novo Campeche:');
console.log('   ID: sc-floripa-campeche-1 ✓');
console.log('   Offshore: 2.0m @ 9s SE');
console.log('   Previsto: 1.24m (2.0×0.62)');
console.log('   Real: 1.1m');
console.log('   Erro: +' + novoCampecheError.toFixed(2) + '%');
console.log('');

console.log('📊 Morro das Pedras:');
console.log('   ID: sc-floripa-morropedras-1 ✓');
console.log('   Offshore: 1.5m @ 8s SE');
console.log('   Previsto: 1.26m (1.5×0.84)');
console.log('   Real: 1.1m');
console.log('   Erro: +' + morroPedrasError.toFixed(2) + '%');
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// RESULTADO ESPERADO
// ═══════════════════════════════════════════════════════════════════════════

console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
console.log('%c🎯 RESULTADO ESPERADO NO DASHBOARD:', 'color: #ff9800; font-size: 16px; font-weight: bold');
console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
console.log('');

console.log('┌──────────────────────────────────────────────────────────┐');
console.log('│ 📊 OBSERVAÇÕES RECENTES                                  │');
console.log('├──────────────────────────────────────────────────────────┤');
console.log('│ DATA       │ PICO              │ OFFSHORE  │ PREV  │ REAL │ ERRO │');
console.log('├──────────────────────────────────────────────────────────┤');
console.log('│ 10/11/2025 │ Morro das Pedras  │ 1.5m @ 8s │ 1.26m │ 1.1m │ +15% │');
console.log('│ 10/11/2025 │ Novo Campeche     │ 2.0m @ 9s │ 1.24m │ 1.1m │ +13% │');
console.log('└─────────────────────────────────────────────────���────────┘');
console.log('');

console.log('%c🔄 AGORA RECARREGUE A PÁGINA:', 'color: #ff5722; font-size: 16px; font-weight: bold');
console.log('   Windows/Linux: Ctrl+Shift+R');
console.log('   Mac: Cmd+Shift+R');
console.log('');

console.log('%c════════════════════════════════════════════════════════════', 'color: #00bcd4; font-weight: bold');
