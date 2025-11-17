/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE INSTANTÂNEO - SISTEMA DE CALIBRAÇÃO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12) para testar:
 */

console.log('\n🧪 ════════════════════════════════════════════════════════════════');
console.log('   TESTE INSTANTÂNEO - SISTEMA DE CALIBRAÇÃO');
console.log('════════════════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════════════════════
// 1. LIMPAR DADOS ANTIGOS
// ═══════════════════════════════════════════════════════════════════════════
console.log('🗑️  PASSO 1: Limpando dados antigos...');
localStorage.removeItem('nopico_observations');
console.log('✅ localStorage limpo!\n');

// ═══════════════════════════════════════════════════════════════════════════
// 2. ADICIONAR DADOS DE TESTE CORRETOS
// ═══════════════════════════════════════════════════════════════════════════
console.log('📝 PASSO 2: Adicionando observações reais...\n');

// Morro das Pedras: PREVISTO 1.2m, REAL 1.5m (SUBESTIMOU!)
const morroPedrasForecast = 1.2;
const morroPedrasObserved = 1.5;
const morroPedrasMultiplier = 0.84;
const morroPedrasOffshore = parseFloat((morroPedrasForecast / morroPedrasMultiplier).toFixed(2));
const morroPedrasError = parseFloat((((morroPedrasForecast - morroPedrasObserved) / morroPedrasObserved) * 100).toFixed(2));

console.log('📊 Morro das Pedras:');
console.log('   Previsto: ' + morroPedrasForecast + 'm');
console.log('   Real: ' + morroPedrasObserved + 'm');
console.log('   Erro: ' + morroPedrasError + '%');
console.log('   Fator de correção: ' + (morroPedrasObserved / morroPedrasForecast).toFixed(3) + 'x\n');

// Novo Campeche
const novoCampecheObserved = 1.0;
const novoCampecheForecast = 1.0;

const testObservations = [
  {
    id: 'obs-test-novo-campeche-' + Date.now(),
    timestamp: new Date().toISOString(),
    spotId: 'sc-floripa-campeche-1',
    spotName: 'Novo Campeche',
    forecast: {
      height: novoCampecheForecast,
      direction: 86,
      period: 8,
      source: 'open-meteo'
    },
    observed: {
      height: novoCampecheObserved,
      direction: 90,
      period: 8
    },
    context: {
      tide: 'mid',
      wind: 'SE 12kt',
      sessionTime: '08:00'
    },
    error: 0,
    errorAbsolute: 0,
    notes: '📍 REAL - Novo Campeche estava em 1.0m hoje (10/11/2025)',
    confidence: 'high'
  },
  {
    id: 'obs-test-morro-pedras-' + Date.now(),
    timestamp: new Date().toISOString(),
    spotId: 'sc-floripa-morropedras-1',
    spotName: 'Morro das Pedras',
    forecast: {
      height: morroPedrasForecast,
      direction: 133,
      period: 7,
      source: 'open-meteo'
    },
    observed: {
      height: morroPedrasObserved,
      direction: 135,
      period: 7
    },
    context: {
      tide: 'mid',
      wind: 'NE 10kt',
      sessionTime: '07:30'
    },
    error: morroPedrasError,
    errorAbsolute: morroPedrasForecast - morroPedrasObserved,
    notes: '📍 REAL - Morro das Pedras estava em 1.5m hoje (10/11/2025)',
    confidence: 'high'
  }
];

localStorage.setItem('nopico_observations', JSON.stringify(testObservations));
console.log('✅ 2 observações salvas no localStorage!\n');

// ═══════════════════════════════════════════════════════════════════════════
// 3. VERIFICAR SE OS DADOS FORAM SALVOS CORRETAMENTE
// ═══════════════════════════════════════════════════════════════════════════
console.log('🔍 PASSO 3: Verificando dados salvos...\n');

const stored = localStorage.getItem('nopico_observations');
if (stored) {
  const obs = JSON.parse(stored);
  console.log('✅ Total de observações: ' + obs.length);
  
  obs.forEach((o, i) => {
    console.log('\n   [' + (i+1) + '] ' + o.spotName);
    console.log('       SpotID: ' + o.spotId);
    console.log('       Previsto: ' + o.forecast.height + 'm');
    console.log('       Real: ' + o.observed.height + 'm');
    console.log('       Erro: ' + o.error + '%');
  });
} else {
  console.log('❌ ERRO: Nenhum dado encontrado!');
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. TESTAR O SISTEMA DE CALIBRAÇÃO
// ═══════════════════════════════════════════════════════════════════════════
console.log('\n\n🎯 PASSO 4: Testando sistema de calibração...\n');

// Simular função getSpotAdjustments
const observations = JSON.parse(localStorage.getItem('nopico_observations') || '[]');
console.log('📊 Observações carregadas: ' + observations.length);

// Agrupar por pico
const spotGroups = {};
observations.forEach(obs => {
  if (!spotGroups[obs.spotId]) {
    spotGroups[obs.spotId] = [];
  }
  spotGroups[obs.spotId].push(obs);
});

console.log('📍 Picos únicos: ' + Object.keys(spotGroups).length + '\n');

// Calcular fatores de ajuste
Object.keys(spotGroups).forEach(spotId => {
  const spotObs = spotGroups[spotId];
  const spotName = spotObs[0].spotName;
  
  // Calcular média dos fatores de correção
  const factors = spotObs.map(obs => obs.observed.height / obs.forecast.height);
  const avgFactor = factors.reduce((sum, f) => sum + f, 0) / factors.length;
  
  // Determinar confiança
  let confidence = 'low';
  if (spotObs.length >= 5) confidence = 'high';
  else if (spotObs.length >= 2) confidence = 'medium';
  
  console.log('✅ ' + spotName + ':');
  console.log('   Observações: ' + spotObs.length);
  console.log('   Fator de correção: ' + avgFactor.toFixed(3) + 'x');
  console.log('   Confiança: ' + confidence);
  console.log('   Status: ' + (confidence !== 'low' ? '🟢 ATIVO' : '🔴 INATIVO (precisa ≥2 obs)'));
  
  // Exemplo de aplicação
  if (confidence !== 'low') {
    const exemploPrevisao = 1.0;
    const exemploAjustado = exemploPrevisao * avgFactor;
    console.log('   Exemplo: ' + exemploPrevisao.toFixed(2) + 'm → ' + exemploAjustado.toFixed(2) + 'm\n');
  } else {
    console.log('\n');
  }
});

console.log('\n════════════════════════════════════════════════════════════════');
console.log('✅ TESTE CONCLUÍDO!');
console.log('════════════════════════════════════════════════════════════════\n');

console.log('🔄 PRÓXIMO PASSO: Recarregue a página e vá para o site do Morro das Pedras');
console.log('   A previsão deve estar AJUSTADA automaticamente!\n');
