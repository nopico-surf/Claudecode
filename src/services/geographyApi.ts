/**
 * Geography API
 * Análise de influências geográficas nas condições de surf
 */

export interface GeographyInfluence {
  protection: 'exposed' | 'semi-protected' | 'protected';
  bestSwellDirections: string[];
  blockedDirections: string[];
  description: string;
  features: any[]; // Features geográficas detectadas
  staticFeatures?: any[]; // 🔒 Features estáticas (opcional)
}

/**
 * Analisa as influências geográficas de um pico
 */
export function analyzeGeographyInfluence(
  latitude: number,
  longitude: number,
  beachOrientation: number,
  spotId?: string
): GeographyInfluence {
  // Análise simplificada baseada na orientação
  const orientation = beachOrientation;
  
  // Costa voltada para Leste/Sudeste (maioria do Brasil)
  if (orientation >= 60 && orientation <= 150) {
    return {
      protection: 'exposed',
      bestSwellDirections: ['Leste', 'Sudeste', 'Sul'],
      blockedDirections: ['Oeste', 'Noroeste', 'Norte'],
      description: 'Praia exposta a swells do oceano Atlântico',
      features: []
    };
  }
  
  // Costa voltada para Norte/Nordeste
  if (orientation >= 0 && orientation < 60) {
    return {
      protection: 'semi-protected',
      bestSwellDirections: ['Norte', 'Nordeste', 'Leste'],
      blockedDirections: ['Sul', 'Sudoeste', 'Oeste'],
      description: 'Praia semi-protegida, recebe swells de nordeste',
      features: []
    };
  }
  
  // Costa voltada para Sul
  if (orientation > 150 && orientation <= 210) {
    return {
      protection: 'exposed',
      bestSwellDirections: ['Sul', 'Sudeste', 'Sudoeste'],
      blockedDirections: ['Norte', 'Nordeste'],
      description: 'Praia exposta a swells de sul',
      features: []
    };
  }
  
  // Outras orientações
  return {
    protection: 'semi-protected',
    bestSwellDirections: ['Leste', 'Sudeste'],
    blockedDirections: [],
    description: 'Praia com orientação variável',
    features: []
  };
}

/**
 * Calcula multiplicadores de proteção geográfica por direção
 */
export function calculateGeographyMultipliers(
  latitude: number,
  longitude: number,
  beachOrientation: number
): { [direction: number]: number } {
  const multipliers: { [direction: number]: number } = {};
  
  // Para cada direção de 0-360 em incrementos de 10 graus
  for (let dir = 0; dir < 360; dir += 10) {
    // Calcular diferença angular entre swell e orientação da praia
    let diff = Math.abs(dir - beachOrientation);
    if (diff > 180) diff = 360 - diff;
    
    // Multiplicador baseado na diferença angular
    // 0-45°: totalmente exposto (1.0)
    // 45-90°: parcialmente exposto (0.8)
    // 90-135°: protegido (0.5)
    // 135-180°: bloqueado (0.2)
    let multiplier = 1.0;
    if (diff > 135) {
      multiplier = 0.2; // Bloqueado
    } else if (diff > 90) {
      multiplier = 0.5; // Protegido
    } else if (diff > 45) {
      multiplier = 0.8; // Parcialmente exposto
    }
    
    multipliers[dir] = multiplier;
  }
  
  return multipliers;
}

/**
 * Retorna descrição geográfica de um pico
 */
export function getGeographicInfluence(
  latitude: number,
  longitude: number,
  beachOrientation: number
): string {
  const influence = analyzeGeographyInfluence(latitude, longitude, beachOrientation);
  return influence.description;
}

/**
 * Retorna descrição detalhada da geografia
 */
export function getGeographyDescription(
  latitude: number,
  longitude: number,
  beachOrientation: number
): {
  protection: string;
  bestDirections: string;
  blockedDirections: string;
} {
  const influence = analyzeGeographyInfluence(latitude, longitude, beachOrientation);
  
  const protectionMap = {
    'exposed': 'Totalmente exposta',
    'semi-protected': 'Semi-protegida',
    'protected': 'Protegida'
  };
  
  return {
    protection: protectionMap[influence.protection],
    bestDirections: influence.bestSwellDirections.join(', '),
    blockedDirections: influence.blockedDirections.join(', ')
  };
}
