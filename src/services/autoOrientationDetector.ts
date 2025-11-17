/**
 * Auto Orientation Detector
 * Detecta automaticamente a orientação de uma praia baseada em coordenadas geográficas
 */

/**
 * Detecta a orientação da praia baseado na localização geográfica do Brasil
 * @param latitude Latitude da praia
 * @param longitude Longitude da praia
 * @param manualOrientation Orientação manual (se fornecida, retorna ela)
 * @returns Orientação em graus (0-360)
 */
export function getBeachOrientation(
  latitude: number,
  longitude: number,
  manualOrientation?: number
): number {
  // Se orientação manual foi fornecida, usa ela
  if (manualOrientation !== undefined) {
    return manualOrientation;
  }

  // Detecção automática baseada na região do Brasil
  
  // Costa Norte (AP, PA, MA, PI): voltada para Norte/Nordeste (30-70°)
  if (latitude > -5) {
    return 40; // Nordeste
  }
  
  // Costa Nordeste (CE, RN, PB, PE, AL, SE, BA norte): voltada para Leste (80-100°)
  if (latitude > -13) {
    return 90; // Leste
  }
  
  // Costa Leste/Sudeste (BA sul, ES, RJ, SP, PR, SC norte): voltada para Sudeste (100-150°)
  if (latitude > -28) {
    return 120; // Leste-Sudeste
  }
  
  // Costa Sul (SC sul, RS): voltada para Leste/Sul (90-180°)
  return 100; // Leste com tendência ao Sul
}
