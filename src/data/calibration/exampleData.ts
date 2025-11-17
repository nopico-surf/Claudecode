// Dados de exemplo para testar o sistema de calibração
// Execute no console: populateExampleData()

import { addObservation } from './observationLog';

export function populateExampleData() {
  console.log('🌊 Populando dados de exemplo...');
  
  // Exemplo 1: Morro das Pedras - SE (direção boa)
  addObservation({
    spotId: 'sc-floripa-morro-pedras-1',
    spotName: 'Morro das Pedras',
    offshore: {
      height: 1.8,
      period: 14,
      direction: 150,
      directionLabel: 'SE'
    },
    forecast: {
      height: 1.5,
      multiplier: 0.83,
      source: 'manual'
    },
    observed: {
      height: 1.3,
      quality: 4
    },
    context: {
      tide: 'high',
      wind: 'NE 12kt',
      sessionTime: '08:00-10:00'
    },
    notes: 'Maré alta deixou reef fundo, ondas perderam energia',
    confidence: 'high'
  });
  
  // Exemplo 2: Morro das Pedras - SW (sombra do Campeche)
  addObservation({
    spotId: 'sc-floripa-morro-pedras-1',
    spotName: 'Morro das Pedras',
    offshore: {
      height: 2.2,
      period: 13,
      direction: 200,
      directionLabel: 'SSW'
    },
    forecast: {
      height: 1.4,
      multiplier: 0.64,
      source: 'manual'
    },
    observed: {
      height: 1.0,
      quality: 2
    },
    context: {
      tide: 'mid',
      wind: 'N 8kt',
      sessionTime: '07:30-09:00'
    },
    notes: 'SW pega MUITA sombra do Campeche. Quase não entrou onda.',
    confidence: 'high'
  });
  
  // Exemplo 3: Joaquina - S (direção ideal)
  addObservation({
    spotId: 'sc-floripa-joaquina-1',
    spotName: 'Joaquina',
    offshore: {
      height: 2.0,
      period: 15,
      direction: 170,
      directionLabel: 'S'
    },
    forecast: {
      height: 1.7,
      multiplier: 0.85,
      source: 'manual'
    },
    observed: {
      height: 1.6,
      quality: 5
    },
    context: {
      tide: 'mid',
      wind: 'NW 10kt',
      sessionTime: '09:00-11:00'
    },
    notes: 'Sul puro entrando direto. Beach break aguenta tamanho. Perfeito!',
    confidence: 'high'
  });
  
  // Exemplo 4: Joaquina - E (período curto)
  addObservation({
    spotId: 'sc-floripa-joaquina-1',
    spotName: 'Joaquina',
    offshore: {
      height: 1.5,
      period: 8,
      direction: 90,
      directionLabel: 'E'
    },
    forecast: {
      height: 1.3,
      multiplier: 0.87,
      source: 'manual'
    },
    observed: {
      height: 0.9,
      quality: 2
    },
    context: {
      tide: 'low',
      wind: 'E 18kt',
      sessionTime: '14:00-15:30'
    },
    notes: 'Wind swell (8s). Virou chop, ondas desorganizadas. Período muito curto.',
    confidence: 'medium'
  });
  
  // Exemplo 5: Matadeiro - SSW (enseada protegida)
  addObservation({
    spotId: 'sc-floripa-matadeiro-1',
    spotName: 'Matadeiro',
    offshore: {
      height: 2.5,
      period: 14,
      direction: 200,
      directionLabel: 'SSW'
    },
    forecast: {
      height: 2.0,
      multiplier: 0.80,
      source: 'manual'
    },
    observed: {
      height: 1.2,
      quality: 3
    },
    context: {
      tide: 'mid',
      wind: 'NW 6kt',
      sessionTime: '08:30-10:00'
    },
    notes: 'Proteção da enseada filtrou bastante. SSW entra mas reduz muito.',
    confidence: 'high'
  });
  
  // Exemplo 6: Santinho - NE (exposto ao vento)
  addObservation({
    spotId: 'sc-floripa-santinho-1',
    spotName: 'Santinho',
    offshore: {
      height: 1.2,
      period: 10,
      direction: 45,
      directionLabel: 'NE'
    },
    forecast: {
      height: 1.0,
      multiplier: 0.83,
      source: 'manual'
    },
    observed: {
      height: 0.7,
      quality: 2
    },
    context: {
      tide: 'high',
      wind: 'NE 20kt',
      sessionTime: '15:00-16:00'
    },
    notes: 'Vento NE onshore forte. Ondas pequenas e desorganizadas.',
    confidence: 'medium'
  });
  
  console.log('✅ 6 observações de exemplo adicionadas!');
  console.log('📊 Acesse /admin para visualizar');
}

// Função para limpar dados de exemplo
export function clearExampleData() {
  if (confirm('⚠️ Limpar TODAS as observações? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem('nopico_observations');
    console.log('✅ Observações limpas. Recarregue a página.');
  }
}

// Disponibilizar no window para uso no console
if (typeof window !== 'undefined') {
  (window as any).populateExampleData = populateExampleData;
  (window as any).clearExampleData = clearExampleData;
  
  console.log('💡 Funções disponíveis no console:');
  console.log('   populateExampleData() - Adiciona 6 observações de exemplo');
  console.log('   clearExampleData() - Limpa todas as observações');
}
