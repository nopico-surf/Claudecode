// Sistema de confiança por pico e condições

export interface SpotConfidence {
  spotId: string;
  spotName: string;
  overall: 'high' | 'medium' | 'low' | 'none';
  totalObservations: number;
  
  byDirection: {
    [key: string]: { // "SE-140-160"
      confidence: 'high' | 'medium' | 'low';
      observations: number;
      averageError: number; // %
    }
  };
  
  byPeriod: {
    [key: string]: { // "12-14s"
      confidence: 'high' | 'medium' | 'low';
      observations: number;
      averageError: number;
    }
  };
  
  byTide: {
    low: { confidence: 'high' | 'medium' | 'low'; observations: number };
    mid: { confidence: 'high' | 'medium' | 'low'; observations: number };
    high: { confidence: 'high' | 'medium' | 'low'; observations: number };
  };
  
  lastUpdated: string;
}

// Calcula nível de confiança baseado em número de observações
export function calculateConfidence(observations: number): 'high' | 'medium' | 'low' | 'none' {
  if (observations >= 8) return 'high';
  if (observations >= 3) return 'medium';
  if (observations >= 1) return 'low';
  return 'none';
}

// Calcula confiança de um pico baseado em observações
export function calculateSpotConfidence(spotId: string, observations: any[]): SpotConfidence {
  const spotObs = observations.filter(o => o.spotId === spotId);
  
  // Agrupar por direção
  const byDirection: any = {};
  const byPeriod: any = {};
  const byTide = { low: [], mid: [], high: [] };
  
  spotObs.forEach(obs => {
    // ✅ PROTEÇÃO: Verificar se obs tem estrutura válida
    if (!obs || !obs.offshore || !obs.context) {
      console.warn('⚠️ Observação com estrutura inválida:', obs);
      return;
    }
    
    // Por direção (faixas de 20°)
    const dirKey = getDirectionKey(obs.offshore.direction);
    if (!byDirection[dirKey]) {
      byDirection[dirKey] = { observations: 0, errors: [] };
    }
    byDirection[dirKey].observations++;
    byDirection[dirKey].errors.push(obs.error);
    
    // Por período (faixas de 2s)
    const periodKey = getPeriodKey(obs.offshore.period);
    if (!byPeriod[periodKey]) {
      byPeriod[periodKey] = { observations: 0, errors: [] };
    }
    byPeriod[periodKey].observations++;
    byPeriod[periodKey].errors.push(obs.error);
    
    // Por maré - ✅ PROTEÇÃO: Verificar se tide é válido
    const tide = obs.context.tide;
    if (tide && (tide === 'low' || tide === 'mid' || tide === 'high')) {
      byTide[tide].push(obs);
    }
    // Observações com maré desconhecida são ignoradas silenciosamente
  });
  
  // Processar direções
  const directionConfidence: any = {};
  Object.keys(byDirection).forEach(key => {
    const data = byDirection[key];
    directionConfidence[key] = {
      confidence: calculateConfidence(data.observations),
      observations: data.observations,
      averageError: average(data.errors)
    };
  });
  
  // Processar períodos
  const periodConfidence: any = {};
  Object.keys(byPeriod).forEach(key => {
    const data = byPeriod[key];
    periodConfidence[key] = {
      confidence: calculateConfidence(data.observations),
      observations: data.observations,
      averageError: average(data.errors)
    };
  });
  
  // Processar marés
  const tideConfidence = {
    low: {
      confidence: calculateConfidence(byTide.low.length),
      observations: byTide.low.length
    },
    mid: {
      confidence: calculateConfidence(byTide.mid.length),
      observations: byTide.mid.length
    },
    high: {
      confidence: calculateConfidence(byTide.high.length),
      observations: byTide.high.length
    }
  };
  
  return {
    spotId,
    spotName: spotObs[0]?.spotName || '',
    overall: calculateConfidence(spotObs.length),
    totalObservations: spotObs.length,
    byDirection: directionConfidence,
    byPeriod: periodConfidence,
    byTide: tideConfidence,
    lastUpdated: new Date().toISOString()
  };
}

// Helpers
function getDirectionKey(deg: number): string {
  const directions = [
    { range: [0, 45], label: 'N' },
    { range: [45, 90], label: 'NE' },
    { range: [90, 135], label: 'E' },
    { range: [135, 180], label: 'SE' },
    { range: [180, 225], label: 'S' },
    { range: [225, 270], label: 'SW' },
    { range: [270, 315], label: 'W' },
    { range: [315, 360], label: 'NW' }
  ];
  
  const dir = directions.find(d => deg >= d.range[0] && deg < d.range[1]) || directions[0];
  const roundedStart = Math.floor(deg / 20) * 20;
  const roundedEnd = roundedStart + 20;
  
  return `${dir.label}-${roundedStart}-${roundedEnd}`;
}

function getPeriodKey(period: number): string {
  const roundedStart = Math.floor(period / 2) * 2;
  const roundedEnd = roundedStart + 2;
  return `${roundedStart}-${roundedEnd}s`;
}

function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
}
