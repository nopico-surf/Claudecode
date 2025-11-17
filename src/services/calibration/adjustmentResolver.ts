// Resolve qual ajuste aplicar (hierarquia de prioridade)
// 1. Manual override (spotWaveAdjustments.ts) - SEMPRE GANHA
// 2. Padrão calibrado (masterPatterns.ts) - Se tiver confiança
// 3. Fallback genérico - Valores seguros

import { spotWaveAdjustments } from '../../data/spotWaveAdjustments';
import { Spot } from '../../types/surf';
import { masterPatterns } from '../../data/patterns/masterPatterns';

// Feature flag para ativar/desativar padrões
const USE_PATTERN_MATCHING = false; // ← DESLIGADO por padrão (segurança)

export interface ResolvedAdjustment {
  source: 'manual' | 'pattern' | 'default';
  confidence: 'high' | 'medium' | 'low';
  patternId?: string;
  patternName?: string;
  
  // Ajustes
  shoalingFactor: number;
  directionAdjustments: Array<{
    minDeg: number;
    maxDeg: number;
    multiplier: number;
    reason: string;
  }>;
}

// Ajuste padrão seguro (fallback)
const DEFAULT_SAFE_ADJUSTMENT: ResolvedAdjustment = {
  source: 'default',
  confidence: 'low',
  shoalingFactor: 0.90,
  directionAdjustments: []
};

/**
 * Resolve qual ajuste aplicar para um pico
 */
export function resolveAdjustment(spot: Spot): ResolvedAdjustment {
  // 1. PRIORIDADE MÁXIMA: Ajuste manual
  const manualOverride = spotWaveAdjustments[spot.id];
  
  if (manualOverride) {
    console.log(`✅ [${spot.name}] Usando ajuste MANUAL (spotWaveAdjustments.ts)`);
    return {
      source: 'manual',
      confidence: 'high',
      shoalingFactor: manualOverride.shoalingFactor,
      directionAdjustments: manualOverride.directionAdjustments || []
    };
  }
  
  // 2. Se padrões estão habilitados, tentar match
  if (USE_PATTERN_MATCHING) {
    const pattern = findBestPattern(spot);
    
    if (pattern && pattern.confidence !== 'low') {
      console.log(`🤖 [${spot.name}] Aplicando padrão: ${pattern.name}`);
      return {
        source: 'pattern',
        confidence: pattern.confidence,
        patternId: pattern.id,
        patternName: pattern.name,
        shoalingFactor: pattern.baseMultiplier,
        directionAdjustments: pattern.directionAdjustments
      };
    }
  }
  
  // 3. Fallback genérico
  console.log(`⚠️ [${spot.name}] Usando ajuste PADRÃO genérico`);
  return DEFAULT_SAFE_ADJUSTMENT;
}

/**
 * Encontra melhor padrão para um pico (simplificado por enquanto)
 */
function findBestPattern(spot: Spot): typeof masterPatterns[string] | null {
  // Por enquanto, retorna null (não implementado ainda)
  // Será implementado quando tivermos auto-detecção de orientação
  return null;
}

/**
 * Verifica se um pico tem ajuste manual
 */
export function hasManualAdjustment(spotId: string): boolean {
  return !!spotWaveAdjustments[spotId];
}

/**
 * Lista todos os picos com ajuste manual
 */
export function getSpotsWithManualAdjustments(): string[] {
  return Object.keys(spotWaveAdjustments);
}

/**
 * Estatísticas do sistema de ajustes
 */
export function getAdjustmentStats(allSpots: Spot[]) {
  const total = allSpots.length;
  const withManual = getSpotsWithManualAdjustments().length;
  const withPattern = 0; // TODO: calcular quando patterns estiverem ativos
  const withDefault = total - withManual - withPattern;
  
  return {
    total,
    withManual,
    withPattern,
    withDefault,
    coverage: {
      manual: ((withManual / total) * 100).toFixed(1) + '%',
      pattern: ((withPattern / total) * 100).toFixed(1) + '%',
      default: ((withDefault / total) * 100).toFixed(1) + '%'
    }
  };
}
