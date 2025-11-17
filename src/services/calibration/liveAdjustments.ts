/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SISTEMA DE AJUSTE AUTOMÁTICO EM TEMPO REAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este serviço lê as observações reais registradas no admin e calcula
 * fatores de correção para ajustar as previsões do site automaticamente.
 * 
 * FLUXO:
 * 1. Usuário registra no admin: "Previsto 1.2m, Real 1.5m"
 * 2. Sistema calcula: Fator = 1.5 / 1.2 = 1.25 (precisa aumentar 25%)
 * 3. Próxima previsão: 1.0m × 1.25 = 1.25m (ajustado!)
 */

export interface SpotAdjustment {
  spotId: string;
  spotName: string;
  adjustmentFactor: number; // Fator de correção (ex: 1.25 = aumentar 25%)
  confidence: 'high' | 'medium' | 'low';
  observations: number;
  lastUpdated: string;
}

// ✅ CACHE: Evita buscar do servidor repetidamente
let cachedAdjustments: Map<string, SpotAdjustment> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60000; // 1 minuto

/**
 * Carrega ajustes calculados das observações registradas
 * ⚠️ AGORA ASSÍNCRONA - Busca do servidor!
 */
export async function getSpotAdjustments(): Promise<Map<string, SpotAdjustment>> {
  // ✅ VERIFICAR CACHE PRIMEIRO
  const now = Date.now();
  if (cachedAdjustments && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('⚡ [CALIBRAÇÃO] Usando cache (válido por mais ' + Math.round((CACHE_DURATION - (now - cacheTimestamp)) / 1000) + 's)');
    return cachedAdjustments;
  }
  
  const adjustments = new Map<string, SpotAdjustment>();
  
  try {
    console.log('📊 Buscando observações do servidor...');
    
    // ✅ CORRIGIDO: Buscar observações do servidor via API
    const { getAllObservations } = await import('../observationsApi');
    const observations = await getAllObservations();
    
    if (observations.length === 0) {
      console.log('📊 [CALIBRAÇÃO] Nenhuma observação registrada no servidor');
      cachedAdjustments = adjustments;
      cacheTimestamp = now;
      return adjustments;
    }
    
    console.log(`✅ ${observations.length} observações carregadas do servidor`);
    
    // Agrupar por pico
    const spotGroups: Record<string, any[]> = {};
    observations.forEach((obs: any) => {
      if (!spotGroups[obs.spotId]) {
        spotGroups[obs.spotId] = [];
      }
      spotGroups[obs.spotId].push(obs);
    });
    
    // Calcular fator de ajuste para cada pico
    Object.keys(spotGroups).forEach(spotId => {
      const spotObs = spotGroups[spotId];
      const spotName = spotObs[0].spotName;
      
      // ✅ FILTRAR: Só usar observações com calibração ATIVADA
      const enabledObs = spotObs.filter(obs => obs.calibrationEnabled === true);
      
      if (enabledObs.length === 0) {
        console.log(`⚠️ [CALIBRAÇÃO] ${spotName}: Nenhuma observação com calibração ativada (${spotObs.length} obs total, mas todas desativadas)`);
        return; // Pular este pico
      }
      
      // Calcular média dos fatores de correção
      // Fator = Real / Previsto
      // Ex: Real 1.5m, Previsto 1.2m → Fator = 1.25 (precisa aumentar 25%)
      const factors = enabledObs.map(obs => obs.observed.height / obs.forecast.height);
      const avgFactor = factors.reduce((sum, f) => sum + f, 0) / factors.length;
      
      // Determinar confiança baseado no número de observações ATIVADAS
      let confidence: 'high' | 'medium' | 'low' = 'low';
      if (enabledObs.length >= 5) confidence = 'high';
      else if (enabledObs.length >= 2) confidence = 'medium';
      
      adjustments.set(spotId, {
        spotId,
        spotName,
        adjustmentFactor: parseFloat(avgFactor.toFixed(3)),
        confidence,
        observations: enabledObs.length,
        lastUpdated: new Date().toISOString()
      });
      
      console.log(`✅ [CALIBRAÇÃO] ${spotName}: Fator ${avgFactor.toFixed(3)}x | ${enabledObs.length} obs ativadas (${spotObs.length} total) | Confiança: ${confidence}`);
    });
    
    // ✅ SALVAR NO CACHE
    cachedAdjustments = adjustments;
    cacheTimestamp = now;
    
  } catch (error) {
    console.error('❌ Erro ao calcular ajustes:', error);
  }
  
  return adjustments;
}

/**
 * Aplica o ajuste de calibração em uma previsão
 * ⚠️ AGORA ASSÍNCRONA - Busca do servidor!
 */
export async function applyCalibratedAdjustment(
  spotId: string,
  forecastHeight: number
): Promise<{ adjusted: number; factor: number; source: string }> {
  
  const adjustments = await getSpotAdjustments();
  const adjustment = adjustments.get(spotId);
  
  if (!adjustment) {
    // Sem dados de calibração, retorna previsão original
    return {
      adjusted: forecastHeight,
      factor: 1.0,
      source: 'original'
    };
  }
  
  // Aplicar apenas se tiver confiança mínima (medium ou high)
  if (adjustment.confidence === 'low') {
    console.log(`⚠️ [CALIBRAÇÃO] ${adjustment.spotName}: Confiança BAIXA (${adjustment.observations} obs < 2), não ajustando`);
    return {
      adjusted: forecastHeight,
      factor: 1.0,
      source: 'low-confidence'
    };
  }
  
  console.log(`✅ [CALIBRAÇÃO] ${adjustment.spotName}: Confiança OK (${adjustment.confidence}), aplicando fator ${adjustment.adjustmentFactor.toFixed(3)}x`);
  
  // Aplicar fator de ajuste
  const adjusted = forecastHeight * adjustment.adjustmentFactor;
  
  console.log(
    `🎯 ${adjustment.spotName}: ${forecastHeight.toFixed(2)}m × ${adjustment.adjustmentFactor.toFixed(3)} = ${adjusted.toFixed(2)}m`
  );
  
  return {
    adjusted: parseFloat(adjusted.toFixed(2)),
    factor: adjustment.adjustmentFactor,
    source: 'calibrated'
  };
}

/**
 * Verifica se um pico tem calibração ativa
 * ⚠️ AGORA ASSÍNCRONA - Busca do servidor!
 */
export async function hasCalibration(spotId: string): Promise<boolean> {
  const adjustments = await getSpotAdjustments();
  const adjustment = adjustments.get(spotId);
  return adjustment !== undefined && adjustment.confidence !== 'low';
}

/**
 * Retorna informações de calibração para exibir no site
 * ⚠️ AGORA ASSÍNCRONA - Busca do servidor!
 */
export async function getCalibrationInfo(spotId: string): Promise<string | null> {
  const adjustments = await getSpotAdjustments();
  const adjustment = adjustments.get(spotId);
  
  if (!adjustment || adjustment.confidence === 'low') {
    return null;
  }
  
  const percentage = ((adjustment.adjustmentFactor - 1) * 100).toFixed(0);
  const direction = adjustment.adjustmentFactor > 1 ? 'maior' : 'menor';
  
  return `Calibrado (${adjustment.observations} obs, ${percentage}% ${direction})`;
}

/**
 * Limpa o cache de ajustes (útil após adicionar novas observações)
 */
export function clearAdjustmentsCache(): void {
  console.log('🔄 Cache de calibração limpo');
  cachedAdjustments = null;
  cacheTimestamp = 0;
}
