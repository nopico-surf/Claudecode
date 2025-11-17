/**
 * Smart Swell Selector
 * Sistema inteligente para selecionar o melhor swell baseado na geografia
 */

export interface SwellData {
  height: number;
  direction: number;
  period: number;
  source: string;
}

/**
 * Seleciona o swell mais relevante baseado na orientação da praia e proteções geográficas
 */
export function selectSmartSwell(
  swells: SwellData[],
  beachOrientation: number,
  latitude: number,
  longitude: number
): SwellData | null {
  if (swells.length === 0) return null;
  if (swells.length === 1) return swells[0];
  
  // Filtrar swells com altura significativa
  const significantSwells = swells.filter(s => s.height > 0.1);
  if (significantSwells.length === 0) return swells[0];
  
  // Calcular score para cada swell
  const swellsWithScore = significantSwells.map(swell => {
    // Diferença angular entre swell e orientação da praia
    let angleDiff = Math.abs(swell.direction - beachOrientation);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;
    
    // Score baseado em:
    // 1. Alinhamento com a praia (menor diferença angular = melhor)
    // 2. Altura do swell (maior = melhor)
    // 3. Período (maior = melhor qualidade)
    
    let alignmentScore = 100 - angleDiff; // 0-100
    let heightScore = swell.height * 20; // Altura em metros × 20
    let periodScore = swell.period * 2; // Período × 2
    
    const totalScore = alignmentScore + heightScore + periodScore;
    
    return {
      ...swell,
      score: totalScore,
      angleDiff
    };
  });
  
  // Ordenar por score (maior = melhor)
  swellsWithScore.sort((a, b) => b.score - a.score);
  
  return swellsWithScore[0];
}

/**
 * Analisa múltiplos swells e retorna informações detalhadas
 */
export function analyzeSwells(
  swells: SwellData[],
  beachOrientation: number
): {
  primary: SwellData | null;
  secondary: SwellData | null;
  bestForSurf: SwellData | null;
} {
  if (swells.length === 0) {
    return { primary: null, secondary: null, bestForSurf: null };
  }
  
  // Ordenar por altura
  const sortedByHeight = [...swells].sort((a, b) => b.height - a.height);
  
  // Swell primário = maior altura
  const primary = sortedByHeight[0];
  
  // Swell secundário = segundo maior
  const secondary = sortedByHeight.length > 1 ? sortedByHeight[1] : null;
  
  // Melhor para surf = usando seleção inteligente
  const bestForSurf = selectSmartSwell(swells, beachOrientation, 0, 0);
  
  return { primary, secondary, bestForSurf };
}
