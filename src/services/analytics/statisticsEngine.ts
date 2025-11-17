/**
 * ═══════════════════════════════════════════════════════════════════════════
 * STATISTICS ENGINE - Motor de Análise Estatística
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Processa observações e gera insights, tendências e recomendações automáticas.
 */

import { observationLog, SurfObservation } from '../../data/calibration/observationLog';
import { spotWaveAdjustments } from '../../data/spotWaveAdjustments';

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════

export interface OverallStats {
  totalObservations: number;
  avgError: number;
  avgErrorAbs: number;
  precision: number; // Precisão em % (100 - avgErrorAbs)
  overestimated: number; // Quantidade de observações superestimadas
  underestimated: number; // Quantidade de observações subestimadas
  perfectPredictions: number; // Erro < 5%
  goodPredictions: number; // Erro < 10%
  okPredictions: number; // Erro < 20%
  poorPredictions: number; // Erro >= 20%
}

export interface SpotStats {
  spotId: string;
  spotName: string;
  observations: number;
  avgError: number;
  avgErrorAbs: number;
  precision: number;
  stdDev: number;
  confidence: 'low' | 'medium' | 'high';
  status: 'excellent' | 'good' | 'ok' | 'poor';
  errorsByDirection: DirectionError[];
  currentAdjustment?: {
    shoalingFactor: number;
    directionMultipliers: { direction: string; multiplier: number }[];
    totalMultiplier: number;
  };
  recommendedAdjustment?: {
    shoalingFactor: number;
    expectedPrecision: number;
    improvementPercent: number;
  };
}

export interface DirectionError {
  direction: string; // "E", "SE", "S", "SW", etc.
  degRange: [number, number];
  avgError: number;
  observations: number;
  status: 'good' | 'ok' | 'poor';
}

export interface TemporalTrend {
  date: string; // ISO date
  precision: number;
  observations: number;
  avgError: number;
}

export interface PNBOIAImpact {
  withPNBOIA: {
    observations: number;
    avgError: number;
    precision: number;
  };
  withoutPNBOIA: {
    observations: number;
    avgError: number;
    precision: number;
  };
  improvement: number; // Pontos percentuais
  errorReduction: number; // % de redução
}

// ═══════════════════════════════════════════════════════════════════════════
// CÁLCULOS PRINCIPAIS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calcula estatísticas globais de todas as observações
 */
export function calculateOverallStats(observations: SurfObservation[] = observationLog): OverallStats {
  if (observations.length === 0) {
    return {
      totalObservations: 0,
      avgError: 0,
      avgErrorAbs: 0,
      precision: 0,
      overestimated: 0,
      underestimated: 0,
      perfectPredictions: 0,
      goodPredictions: 0,
      okPredictions: 0,
      poorPredictions: 0,
    };
  }

  const totalObservations = observations.length;
  const avgError = observations.reduce((sum, o) => sum + o.error, 0) / totalObservations;
  const avgErrorAbs = observations.reduce((sum, o) => sum + Math.abs(o.error), 0) / totalObservations;
  const precision = Math.max(0, 100 - avgErrorAbs);

  const overestimated = observations.filter(o => o.error > 10).length;
  const underestimated = observations.filter(o => o.error < -10).length;
  const perfectPredictions = observations.filter(o => Math.abs(o.error) < 5).length;
  const goodPredictions = observations.filter(o => Math.abs(o.error) < 10).length;
  const okPredictions = observations.filter(o => Math.abs(o.error) < 20).length;
  const poorPredictions = observations.filter(o => Math.abs(o.error) >= 20).length;

  return {
    totalObservations,
    avgError,
    avgErrorAbs,
    precision,
    overestimated,
    underestimated,
    perfectPredictions,
    goodPredictions,
    okPredictions,
    poorPredictions,
  };
}

/**
 * Calcula estatísticas detalhadas por pico
 */
export function calculateSpotStats(spotId: string, observations: SurfObservation[] = observationLog): SpotStats | null {
  const spotObs = observations.filter(o => o.spotId === spotId);
  
  if (spotObs.length === 0) {
    return null;
  }

  const spotName = spotObs[0].spotName;
  const avgError = spotObs.reduce((sum, o) => sum + o.error, 0) / spotObs.length;
  const avgErrorAbs = spotObs.reduce((sum, o) => sum + Math.abs(o.error), 0) / spotObs.length;
  const precision = Math.max(0, 100 - avgErrorAbs);

  // Desvio padrão
  const variance = spotObs.reduce((sum, o) => sum + Math.pow(o.error - avgError, 2), 0) / spotObs.length;
  const stdDev = Math.sqrt(variance);

  // Confiança baseada em número de observações
  let confidence: 'low' | 'medium' | 'high';
  if (spotObs.length >= 8) confidence = 'high';
  else if (spotObs.length >= 4) confidence = 'medium';
  else confidence = 'low';

  // Status baseado em precisão
  let status: 'excellent' | 'good' | 'ok' | 'poor';
  if (precision >= 95) status = 'excellent';
  else if (precision >= 85) status = 'good';
  else if (precision >= 75) status = 'ok';
  else status = 'poor';

  // Erro por direção
  const errorsByDirection = calculateDirectionErrors(spotObs);

  // Ajuste atual
  const adjustment = spotWaveAdjustments.find(a => a.spotId === spotId);
  const currentAdjustment = adjustment ? {
    shoalingFactor: adjustment.shoalingFactor,
    directionMultipliers: adjustment.directionAdjustments.map(d => ({
      direction: `${d.minDeg}-${d.maxDeg}°`,
      multiplier: d.multiplier,
    })),
    totalMultiplier: adjustment.shoalingFactor * (adjustment.directionAdjustments[0]?.multiplier || 1),
  } : undefined;

  // Recomendação automática
  const recommendedAdjustment = generateRecommendation(avgError, avgErrorAbs, currentAdjustment);

  return {
    spotId,
    spotName,
    observations: spotObs.length,
    avgError,
    avgErrorAbs,
    precision,
    stdDev,
    confidence,
    status,
    errorsByDirection,
    currentAdjustment,
    recommendedAdjustment,
  };
}

/**
 * Calcula erros por direção de swell
 */
function calculateDirectionErrors(observations: SurfObservation[]): DirectionError[] {
  const directionBuckets: { [key: string]: { errors: number[]; range: [number, number] } } = {
    'N':  { errors: [], range: [337.5, 22.5] },
    'NE': { errors: [], range: [22.5, 67.5] },
    'E':  { errors: [], range: [67.5, 112.5] },
    'SE': { errors: [], range: [112.5, 157.5] },
    'S':  { errors: [], range: [157.5, 202.5] },
    'SW': { errors: [], range: [202.5, 247.5] },
    'W':  { errors: [], range: [247.5, 292.5] },
    'NW': { errors: [], range: [292.5, 337.5] },
  };

  observations.forEach(obs => {
    const dir = obs.offshore.direction;
    
    for (const [dirName, bucket] of Object.entries(directionBuckets)) {
      const [min, max] = bucket.range;
      let inRange = false;
      
      if (min > max) { // Wrap around (N)
        inRange = dir >= min || dir <= max;
      } else {
        inRange = dir >= min && dir <= max;
      }
      
      if (inRange) {
        bucket.errors.push(obs.error);
        break;
      }
    }
  });

  return Object.entries(directionBuckets)
    .filter(([_, bucket]) => bucket.errors.length > 0)
    .map(([direction, bucket]) => {
      const avgError = bucket.errors.reduce((sum, e) => sum + e, 0) / bucket.errors.length;
      const avgErrorAbs = bucket.errors.reduce((sum, e) => sum + Math.abs(e), 0) / bucket.errors.length;
      
      let status: 'good' | 'ok' | 'poor';
      if (avgErrorAbs < 10) status = 'good';
      else if (avgErrorAbs < 20) status = 'ok';
      else status = 'poor';

      return {
        direction,
        degRange: bucket.range,
        avgError,
        observations: bucket.errors.length,
        status,
      };
    })
    .sort((a, b) => b.observations - a.observations);
}

/**
 * Gera recomendação automática de ajuste
 */
function generateRecommendation(
  avgError: number,
  avgErrorAbs: number,
  currentAdjustment?: { totalMultiplier: number }
): { shoalingFactor: number; expectedPrecision: number; improvementPercent: number } | undefined {
  // Só gera recomendação se erro for significativo (> 10%)
  if (avgErrorAbs < 10) {
    return undefined;
  }

  const currentMultiplier = currentAdjustment?.totalMultiplier || 1.0;
  
  // Calcular novo multiplier baseado no erro médio
  // Se erro é -20% (subestimando), multiplier deve ser 0.80 (reduzir previsão)
  // Se erro é +20% (superestimando), multiplier deve ser 1.20 (aumentar previsão)
  const errorFactor = 1 - (avgError / 100); // -20% erro = 1.20 fator
  const recommendedMultiplier = currentMultiplier * errorFactor;
  
  // Limitar multiplier a valores razoáveis (0.5 a 1.5)
  const clampedMultiplier = Math.max(0.5, Math.min(1.5, recommendedMultiplier));
  
  // Estimar precisão esperada (simplificado)
  const currentPrecision = 100 - avgErrorAbs;
  const improvementFactor = Math.min(0.5, avgErrorAbs / 100); // Máximo 50% de melhoria
  const expectedPrecision = Math.min(98, currentPrecision + (avgErrorAbs * improvementFactor));
  const improvementPercent = expectedPrecision - currentPrecision;

  return {
    shoalingFactor: parseFloat(clampedMultiplier.toFixed(2)),
    expectedPrecision: parseFloat(expectedPrecision.toFixed(0)),
    improvementPercent: parseFloat(improvementPercent.toFixed(0)),
  };
}

/**
 * Calcula tendências temporais (evolução ao longo do tempo)
 */
export function calculateTemporalTrends(observations: SurfObservation[] = observationLog): TemporalTrend[] {
  if (observations.length === 0) {
    return [];
  }

  // Agrupar por data
  const byDate: { [date: string]: SurfObservation[] } = {};
  
  observations.forEach(obs => {
    const date = new Date(obs.timestamp).toISOString().split('T')[0]; // YYYY-MM-DD
    if (!byDate[date]) {
      byDate[date] = [];
    }
    byDate[date].push(obs);
  });

  // Calcular stats por data
  const trends = Object.entries(byDate)
    .map(([date, obs]) => {
      const avgErrorAbs = obs.reduce((sum, o) => sum + Math.abs(o.error), 0) / obs.length;
      const avgError = obs.reduce((sum, o) => sum + o.error, 0) / obs.length;
      const precision = Math.max(0, 100 - avgErrorAbs);

      return {
        date,
        precision,
        observations: obs.length,
        avgError,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return trends;
}

/**
 * Calcula impacto do PNBOIA (antes vs depois)
 */
export function calculatePNBOIAImpact(observations: SurfObservation[] = observationLog): PNBOIAImpact | null {
  // Filtrar observações com e sem PNBOIA
  // Assumindo que observações com PNBOIA têm melhor precisão (dados mais recentes)
  // Como não temos flag explícito, vamos usar data como proxy:
  // Antes de 01/10/2024 = sem PNBOIA
  // Depois de 01/10/2024 = com PNBOIA
  
  const cutoffDate = new Date('2024-10-01').getTime();
  
  const withoutPNBOIA = observations.filter(o => new Date(o.timestamp).getTime() < cutoffDate);
  const withPNBOIA = observations.filter(o => new Date(o.timestamp).getTime() >= cutoffDate);

  if (withoutPNBOIA.length === 0 || withPNBOIA.length === 0) {
    return null; // Não tem dados suficientes
  }

  const statsWithout = calculateOverallStats(withoutPNBOIA);
  const statsWith = calculateOverallStats(withPNBOIA);

  const improvement = statsWith.precision - statsWithout.precision;
  const errorReduction = ((statsWithout.avgErrorAbs - statsWith.avgErrorAbs) / statsWithout.avgErrorAbs) * 100;

  return {
    withPNBOIA: {
      observations: withPNBOIA.length,
      avgError: statsWith.avgErrorAbs,
      precision: statsWith.precision,
    },
    withoutPNBOIA: {
      observations: withoutPNBOIA.length,
      avgError: statsWithout.avgErrorAbs,
      precision: statsWithout.precision,
    },
    improvement,
    errorReduction,
  };
}

/**
 * Retorna picos ranqueados por prioridade de calibração
 */
export function getRankedCalibrationOpportunities(observations: SurfObservation[] = observationLog): {
  critical: SpotStats[];
  high: SpotStats[];
  medium: SpotStats[];
  calibrated: SpotStats[];
} {
  const uniqueSpots = Array.from(new Set(observations.map(o => o.spotId)));
  const allSpotStats = uniqueSpots
    .map(spotId => calculateSpotStats(spotId, observations))
    .filter((s): s is SpotStats => s !== null);

  const critical = allSpotStats.filter(s => 
    s.avgErrorAbs >= 20 && s.observations >= 3
  ).sort((a, b) => b.avgErrorAbs - a.avgErrorAbs);

  const high = allSpotStats.filter(s => 
    s.avgErrorAbs >= 15 && s.avgErrorAbs < 20 && s.observations >= 3
  ).sort((a, b) => b.avgErrorAbs - a.avgErrorAbs);

  const medium = allSpotStats.filter(s => 
    s.avgErrorAbs >= 10 && s.avgErrorAbs < 15 || s.observations < 3
  ).sort((a, b) => b.avgErrorAbs - a.avgErrorAbs);

  const calibrated = allSpotStats.filter(s => 
    s.avgErrorAbs < 10 && s.observations >= 3
  ).sort((a, b) => a.avgErrorAbs - b.avgErrorAbs);

  return { critical, high, medium, calibrated };
}

/**
 * Retorna top N picos mais precisos
 */
export function getTopPreciseSpots(n: number = 5, observations: SurfObservation[] = observationLog): SpotStats[] {
  const uniqueSpots = Array.from(new Set(observations.map(o => o.spotId)));
  const allSpotStats = uniqueSpots
    .map(spotId => calculateSpotStats(spotId, observations))
    .filter((s): s is SpotStats => s !== null)
    .filter(s => s.observations >= 3); // Mínimo 3 observações

  return allSpotStats
    .sort((a, b) => b.precision - a.precision)
    .slice(0, n);
}

/**
 * Retorna picos que mais precisam atenção
 */
export function getSpotsNeedingAttention(n: number = 5, observations: SurfObservation[] = observationLog): SpotStats[] {
  const uniqueSpots = Array.from(new Set(observations.map(o => o.spotId)));
  const allSpotStats = uniqueSpots
    .map(spotId => calculateSpotStats(spotId, observations))
    .filter((s): s is SpotStats => s !== null)
    .filter(s => s.observations >= 3); // Mínimo 3 observações

  return allSpotStats
    .sort((a, b) => b.avgErrorAbs - a.avgErrorAbs)
    .slice(0, n);
}
