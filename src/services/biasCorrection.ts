/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BIAS CORRECTION - CORREÇÃO DE VIÉS COM DADOS DE BOIAS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este módulo implementa correção de viés (bias correction) nas previsões
 * de ondas usando dados reais das boias PNBOIA.
 * 
 * CONCEITO:
 * - Modelos de previsão (Open-Meteo, NOAA, etc) têm viés sistemático
 * - Boias fornecem "verdade de terreno" (ground truth)
 * - Comparamos: Modelo previu X, Boia mediu Y
 * - Aplicamos correção: Fator = Y/X
 * - Próximas horas usam esse fator para ajustar previsão
 * 
 * IMPLEMENTAÇÃO:
 * - Versão 1.0: Bias correction simples por bins de direção
 * - Futuro: Filtro de Kalman para suavização temporal
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { PNBOIAData } from './pnboiaApi';

// ========================================
// TIPOS
// ========================================

export interface BiasCorrection {
  heightFactor: number; // Multiplicador para altura (ex: 0.85 = modelo superestimou 15%)
  directionOffset: number; // Graus a adicionar (ex: +10° = modelo errou 10° para esquerda)
  periodFactor: number; // Multiplicador para período
  confidence: number; // 0-1 (quão confiável é essa correção)
  method: 'simple' | 'directional' | 'kalman';
  appliedToDirection?: number; // Direção do swell sendo corrigido
  dataAge: number; // minutos desde a leitura da boia
  buoyName: string;
}

export interface CorrectedForecast {
  original: {
    height: number;
    direction: number;
    period: number;
  };
  corrected: {
    height: number;
    direction: number;
    period: number;
  };
  correction: BiasCorrection;
}

// ========================================
// CONFIGURAÇÃO
// ========================================

// Bins de direção para bias correction direcional (45° cada)
const DIRECTION_BINS = [
  { name: 'N', min: 337.5, max: 22.5 },
  { name: 'NE', min: 22.5, max: 67.5 },
  { name: 'E', min: 67.5, max: 112.5 },
  { name: 'SE', min: 112.5, max: 157.5 },
  { name: 'S', min: 157.5, max: 202.5 },
  { name: 'SW', min: 202.5, max: 247.5 },
  { name: 'W', min: 247.5, max: 292.5 },
  { name: 'NW', min: 292.5, max: 337.5 }
];

// Limites de segurança (evitar correções absurdas)
const MAX_HEIGHT_FACTOR = 2.0; // Máximo 2x de aumento
const MIN_HEIGHT_FACTOR = 0.3; // Mínimo 30% do valor original
const MAX_DIRECTION_OFFSET = 45; // Máximo ±45° de rotação
const MAX_DATA_AGE_MINUTES = 2160; // ✅ 36 horas (36h × 60min = 2160min)

// ========================================
// FUNÇÃO PRINCIPAL
// ========================================

/**
 * Aplica bias correction em uma previsão usando dados de boia
 * 
 * @param forecastHeight Altura prevista pelo modelo (metros)
 * @param forecastDirection Direção prevista pelo modelo (graus)
 * @param forecastPeriod Período previsto pelo modelo (segundos)
 * @param buoyData Dados da boia PNBOIA
 * @returns Previsão corrigida + detalhes da correção
 */
export function applyBiasCorrection(
  forecastHeight: number,
  forecastDirection: number,
  forecastPeriod: number,
  buoyData: PNBOIAData
): CorrectedForecast | null {
  // Validações
  if (!buoyData || !buoyData.available || !buoyData.latestReading) {
    return null;
  }
  
  // ⚠️ IMPORTANTE: Rejeitar dados MOCK
  // Dados simulados não servem para calibração!
  if (buoyData.latestReading.isMockData === true) {
    console.log(`⚠️ Bias Correction: Dados MOCK detectados - NÃO aplicar correção (boia: ${buoyData.buoy.name})`);
    return null;
  }
  
  if (buoyData.dataAge > MAX_DATA_AGE_MINUTES) {
    console.log(`⚠️ Bias Correction: Dados muito antigos (${buoyData.dataAge.toFixed(0)}min)`);
    return null;
  }
  
  const reading = buoyData.latestReading;
  
  // Calcular fatores de correção
  const heightFactor = calculateHeightFactor(forecastHeight, reading.waveHeight);
  const directionOffset = calculateDirectionOffset(forecastDirection, reading.waveDirection);
  const periodFactor = calculatePeriodFactor(forecastPeriod, reading.wavePeriod);
  
  // Aplicar limites de segurança
  const safeHeightFactor = clamp(heightFactor, MIN_HEIGHT_FACTOR, MAX_HEIGHT_FACTOR);
  const safeDirectionOffset = clamp(directionOffset, -MAX_DIRECTION_OFFSET, MAX_DIRECTION_OFFSET);
  
  // Calcular confiança baseado em:
  // - Distância da boia (mais perto = mais confiável)
  // - Idade dos dados (mais recente = mais confiável)
  // - Diferença entre previsão e medição (menor diferença = menos necessário)
  const confidence = calculateConfidence(
    buoyData.distance,
    buoyData.dataAge,
    Math.abs(heightFactor - 1.0)
  );
  
  // Aplicar correções
  const correctedHeight = forecastHeight * safeHeightFactor;
  const correctedDirection = normalizeAngle(forecastDirection + safeDirectionOffset);
  const correctedPeriod = forecastPeriod * periodFactor;
  
  const correction: BiasCorrection = {
    heightFactor: safeHeightFactor,
    directionOffset: safeDirectionOffset,
    periodFactor,
    confidence,
    method: 'simple',
    appliedToDirection: forecastDirection,
    dataAge: buoyData.dataAge,
    buoyName: buoyData.buoy.name
  };
  
  // Log detalhado (desabilitado - log no waveApi.ts)
  // console.log(`🎯 Bias Correction aplicado (${buoyData.buoy.name}):`);
  // console.log(`   Altura: ${forecastHeight.toFixed(2)}m → ${correctedHeight.toFixed(2)}m (×${safeHeightFactor.toFixed(2)})`);
  // console.log(`   Direção: ${forecastDirection}° → ${correctedDirection}° (${safeDirectionOffset >= 0 ? '+' : ''}${safeDirectionOffset}°)`);
  // console.log(`   Período: ${forecastPeriod.toFixed(1)}s → ${correctedPeriod.toFixed(1)}s (×${periodFactor.toFixed(2)})`);
  // console.log(`   Confiança: ${(confidence * 100).toFixed(0)}%`);
  // console.log(`   Boia mediu: Hs=${reading.waveHeight.toFixed(2)}m, Dir=${reading.waveDirection}°, Tp=${reading.wavePeriod.toFixed(1)}s`);
  
  return {
    original: {
      height: forecastHeight,
      direction: forecastDirection,
      period: forecastPeriod
    },
    corrected: {
      height: correctedHeight,
      direction: correctedDirection,
      period: correctedPeriod
    },
    correction
  };
}

// ========================================
// FUNÇÕES DE CÁLCULO
// ========================================

/**
 * Calcula fator de correção de altura
 * Fator = Altura Real (boia) / Altura Prevista (modelo)
 */
function calculateHeightFactor(forecast: number, measured: number): number {
  if (forecast <= 0) return 1.0;
  return measured / forecast;
}

/**
 * Calcula offset de direção
 * Offset = Direção Real - Direção Prevista (com tratamento circular)
 */
function calculateDirectionOffset(forecast: number, measured: number): number {
  let offset = measured - forecast;
  
  // Normalizar para [-180, 180]
  if (offset > 180) offset -= 360;
  if (offset < -180) offset += 360;
  
  return offset;
}

/**
 * Calcula fator de correção de período
 */
function calculatePeriodFactor(forecast: number, measured: number): number {
  if (forecast <= 0) return 1.0;
  return measured / forecast;
}

/**
 * Calcula confiança da correção (0-1)
 * 
 * Fatores:
 * - Distância: 0-100km = confiança alta, 100-300km = confiança decrescente
 * - Idade: 0-60min = alta, 60-180min = decrescente
 * - Diferença: pequena = menos importante, grande = mais importante
 */
function calculateConfidence(
  distanceKm: number,
  dataAgeMinutes: number,
  heightDifference: number
): number {
  // Confiança por distância (1.0 a 0-100km, 0.5 a 300km)
  const distanceConfidence = Math.max(0, 1.0 - (distanceKm - 100) / 200);
  
  // Confiança por idade dos dados (1.0 a 0-60min, 0.3 a 180min)
  const ageConfidence = Math.max(0.3, 1.0 - (dataAgeMinutes - 60) / 120);
  
  // Bonus por necessidade de correção (se a diferença é grande, correção é mais valiosa)
  const needBonus = Math.min(0.2, heightDifference * 0.5);
  
  const confidence = Math.min(1.0, distanceConfidence * ageConfidence + needBonus);
  
  return confidence;
}

// ========================================
// WEIGHTED CORRECTION (Melhorado)
// ========================================

/**
 * Aplica correção ponderada entre modelo e boia
 * Quanto mais confiável a boia, maior seu peso na previsão final
 */
export function applyWeightedCorrection(
  forecastHeight: number,
  forecastDirection: number,
  forecastPeriod: number,
  buoyData: PNBOIAData
): CorrectedForecast | null {
  // Validações
  if (!buoyData || !buoyData.available || !buoyData.latestReading) {
    return null;
  }
  
  if (buoyData.dataAge > MAX_DATA_AGE_MINUTES) {
    return null;
  }
  
  const reading = buoyData.latestReading;
  
  // Calcular pesos baseados em confiança
  const distanceWeight = calculateDistanceWeight(buoyData.distance);
  const ageWeight = calculateAgeWeight(buoyData.dataAge);
  const combinedWeight = distanceWeight * ageWeight;
  
  // Pesos finais: boia vs modelo
  const buoyWeight = combinedWeight;
  const modelWeight = 1.0 - buoyWeight;
  
  // Combinar previsões com pesos
  const correctedHeight = (modelWeight * forecastHeight) + (buoyWeight * reading.waveHeight);
  
  // Direção é mais complexa (circular)
  const correctedDirection = weightedCircularMean(
    forecastDirection, 
    reading.waveDirection, 
    modelWeight, 
    buoyWeight
  );
  
  const correctedPeriod = (modelWeight * forecastPeriod) + (buoyWeight * reading.wavePeriod);
  
  // Calcular fator para compatibilidade
  const heightFactor = forecastHeight > 0 ? correctedHeight / forecastHeight : 1.0;
  const directionOffset = calculateDirectionOffset(forecastDirection, correctedDirection);
  const periodFactor = forecastPeriod > 0 ? correctedPeriod / forecastPeriod : 1.0;
  
  const correction: BiasCorrection = {
    heightFactor,
    directionOffset,
    periodFactor,
    confidence: combinedWeight,
    method: 'directional',
    appliedToDirection: forecastDirection,
    dataAge: buoyData.dataAge,
    buoyName: buoyData.buoy.name
  };
  
  return {
    original: {
      height: forecastHeight,
      direction: forecastDirection,
      period: forecastPeriod
    },
    corrected: {
      height: correctedHeight,
      direction: correctedDirection,
      period: correctedPeriod
    },
    correction
  };
}

/**
 * Calcula peso baseado na distância da boia
 * 0-50km: peso 1.0 (100%)
 * 50-150km: decai linearmente para 0.5 (50%)
 * >150km: peso 0.3 (30%)
 */
function calculateDistanceWeight(distanceKm: number): number {
  if (distanceKm <= 50) return 1.0;
  if (distanceKm >= 150) return 0.3;
  return 1.0 - ((distanceKm - 50) / 100) * 0.5;
}

/**
 * Calcula peso baseado na idade dos dados
 * 0-30min: peso 1.0 (100%)
 * 30-120min: decai linearmente para 0.5 (50%)
 * >120min: peso 0.2 (20%)
 */
function calculateAgeWeight(ageMinutes: number): number {
  if (ageMinutes <= 30) return 1.0;
  if (ageMinutes >= 120) return 0.2;
  return 1.0 - ((ageMinutes - 30) / 90) * 0.5;
}

/**
 * Média ponderada circular para ângulos
 * Necessário porque ângulos são circulares (0° = 360°)
 */
function weightedCircularMean(
  angle1: number, 
  angle2: number, 
  weight1: number, 
  weight2: number
): number {
  // Converter para radianos e vetores
  const rad1 = angle1 * Math.PI / 180;
  const rad2 = angle2 * Math.PI / 180;
  
  const x = weight1 * Math.cos(rad1) + weight2 * Math.cos(rad2);
  const y = weight1 * Math.sin(rad1) + weight2 * Math.sin(rad2);
  
  // Converter de volta para graus
  const result = Math.atan2(y, x) * 180 / Math.PI;
  return normalizeAngle(result);
}

// ========================================
// KALMAN FILTER (Filtro de Kalman Simplificado)
// ========================================

interface KalmanState {
  estimate: number;
  errorCovariance: number;
  lastUpdate: number;
}

// Estado global do Kalman (em memória, poderia ser persistido)
const kalmanStates = new Map<string, KalmanState>();

/**
 * Aplica Filtro de Kalman simplificado para suavizar correções
 * 
 * O Filtro de Kalman combina:
 * - Estimativa anterior (histórico)
 * - Nova medição (boia atual)
 * - Incerteza de cada uma
 * 
 * Resultado: Previsão mais suave e menos sensível a ruído
 */
export function applyKalmanCorrection(
  spotId: string,
  forecastHeight: number,
  forecastDirection: number,
  forecastPeriod: number,
  buoyData: PNBOIAData
): CorrectedForecast | null {
  // Validações
  if (!buoyData || !buoyData.available || !buoyData.latestReading) {
    return null;
  }
  
  if (buoyData.dataAge > MAX_DATA_AGE_MINUTES) {
    return null;
  }
  
  const reading = buoyData.latestReading;
  const now = Date.now();
  
  // Calcular fator bruto
  const rawFactor = forecastHeight > 0 ? reading.waveHeight / forecastHeight : 1.0;
  
  // Obter ou inicializar estado Kalman para este pico
  const stateKey = `${spotId}_height_factor`;
  let state = kalmanStates.get(stateKey);
  
  if (!state) {
    // Primeira medição - inicializar
    state = {
      estimate: rawFactor,
      errorCovariance: 1.0, // Alta incerteza inicial
      lastUpdate: now
    };
  } else {
    // Atualizar com Kalman
    const dt = (now - state.lastUpdate) / (1000 * 60 * 60); // horas
    
    // Parâmetros do filtro
    const processNoise = 0.01 * dt; // Incerteza aumenta com tempo
    const measurementNoise = 0.05; // Incerteza da medição
    
    // Predição (estado não muda, apenas incerteza aumenta)
    const predictedEstimate = state.estimate;
    const predictedCovariance = state.errorCovariance + processNoise;
    
    // Atualização (incorporar nova medição)
    const kalmanGain = predictedCovariance / (predictedCovariance + measurementNoise);
    const newEstimate = predictedEstimate + kalmanGain * (rawFactor - predictedEstimate);
    const newCovariance = (1 - kalmanGain) * predictedCovariance;
    
    state = {
      estimate: newEstimate,
      errorCovariance: newCovariance,
      lastUpdate: now
    };
  }
  
  // Salvar estado atualizado
  kalmanStates.set(stateKey, state);
  
  // Aplicar fator suavizado
  const smoothedFactor = clamp(state.estimate, MIN_HEIGHT_FACTOR, MAX_HEIGHT_FACTOR);
  const correctedHeight = forecastHeight * smoothedFactor;
  
  // Direção e período (sem Kalman por simplicidade)
  const directionOffset = calculateDirectionOffset(forecastDirection, reading.waveDirection);
  const safeDirectionOffset = clamp(directionOffset, -MAX_DIRECTION_OFFSET, MAX_DIRECTION_OFFSET);
  const correctedDirection = normalizeAngle(forecastDirection + safeDirectionOffset);
  
  const periodFactor = forecastPeriod > 0 ? reading.wavePeriod / forecastPeriod : 1.0;
  const correctedPeriod = forecastPeriod * periodFactor;
  
  // Confiança aumenta com número de medições (menor errorCovariance)
  const confidence = Math.max(0.3, Math.min(1.0, 1.0 - state.errorCovariance));
  
  const correction: BiasCorrection = {
    heightFactor: smoothedFactor,
    directionOffset: safeDirectionOffset,
    periodFactor,
    confidence,
    method: 'kalman',
    appliedToDirection: forecastDirection,
    dataAge: buoyData.dataAge,
    buoyName: buoyData.buoy.name
  };
  
  return {
    original: {
      height: forecastHeight,
      direction: forecastDirection,
      period: forecastPeriod
    },
    corrected: {
      height: correctedHeight,
      direction: correctedDirection,
      period: correctedPeriod
    },
    correction
  };
}

/**
 * Limpa estados Kalman antigos (chamar periodicamente)
 */
export function cleanupOldKalmanStates(maxAgeHours: number = 24) {
  const now = Date.now();
  const maxAgeMs = maxAgeHours * 60 * 60 * 1000;
  
  for (const [key, state] of kalmanStates.entries()) {
    if (now - state.lastUpdate > maxAgeMs) {
      kalmanStates.delete(key);
    }
  }
}

// ========================================
// TEMPORAL DECAY (Decaimento Temporal)
// ========================================

/**
 * Aplica decaimento temporal: correções antigas têm menos peso
 * Útil quando não há dados novos de boia
 */
export function applyTemporalDecay(
  correction: BiasCorrection,
  ageHours: number
): BiasCorrection {
  // Decay exponencial: e^(-t/6h)
  // Após 6h: ~37% do peso original
  // Após 12h: ~14% do peso original
  const decayFactor = Math.exp(-ageHours / 6);
  
  // Interpolar de volta para previsão original
  const decayedHeightFactor = 1.0 + (correction.heightFactor - 1.0) * decayFactor;
  const decayedDirectionOffset = correction.directionOffset * decayFactor;
  const decayedPeriodFactor = 1.0 + (correction.periodFactor - 1.0) * decayFactor;
  
  return {
    ...correction,
    heightFactor: decayedHeightFactor,
    directionOffset: decayedDirectionOffset,
    periodFactor: decayedPeriodFactor,
    confidence: correction.confidence * decayFactor
  };
}

// ========================================
// FUNÇÕES DIRECIONAIS (v1.1 - futuro)
// ========================================

/**
 * Encontra o bin de direção para um ângulo
 */
function getDirectionBin(direction: number): string {
  const normalized = normalizeAngle(direction);
  
  for (const bin of DIRECTION_BINS) {
    if (bin.min <= bin.max) {
      if (normalized >= bin.min && normalized < bin.max) {
        return bin.name;
      }
    } else {
      // Bin que cruza 0° (Norte)
      if (normalized >= bin.min || normalized < bin.max) {
        return bin.name;
      }
    }
  }
  
  return 'N'; // Fallback
}

/**
 * Aplica bias correction específico por direção
 * (Versão futura - mais complexa)
 */
export function applyDirectionalBiasCorrection(
  forecastHeight: number,
  forecastDirection: number,
  forecastPeriod: number,
  buoyData: PNBOIAData,
  historicalBias?: Map<string, BiasCorrection>
): CorrectedForecast | null {
  // TODO: Implementar em versão futura
  // - Manter histórico de bias por bin de direção
  // - Aplicar correção específica para cada direção
  // - Suavizar com filtro de Kalman
  
  return applyBiasCorrection(forecastHeight, forecastDirection, forecastPeriod, buoyData);
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Normaliza ângulo para 0-360
 */
function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Limita valor entre min e max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calcula média de um array de números
 */
function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calcula desvio padrão
 */
function stdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = mean(values);
  const squareDiffs = values.map(val => Math.pow(val - avg, 2));
  return Math.sqrt(mean(squareDiffs));
}
