// Padrões Master calibrados a partir de praias referência (Floripa)
// Serão replicados para praias similares do Brasil

export interface DirectionAdjustment {
  minDeg: number;
  maxDeg: number;
  multiplier: number;
  reason: string;
}

export interface MasterPattern {
  id: string;
  name: string;
  description: string;
  
  // Características que definem o padrão
  orientation: string;    // "SE", "S", "E", etc
  exposure: 'open' | 'protected' | 'bay';
  bottomType: 'sand-gradual' | 'sand-steep' | 'reef-shallow' | 'reef-medium' | 'rock-point' | 'mixed';
  
  // Multiplicadores calibrados
  baseMultiplier: number;
  directionAdjustments: DirectionAdjustment[];
  
  // Sensibilidade ao período
  periodSensitivity: {
    ideal: [number, number];    // [min, max] em segundos
    good: [number, number];
    poor: [number, number];
    notes?: string;
  };
  
  // Efeito da maré (opcional)
  tideEffect?: {
    low: number;     // Multiplicador em maré baixa
    mid: number;     // Maré média (1.0 = base)
    high: number;    // Maré alta
  };
  
  // Ventos ideais
  bestWinds?: string[];  // ['NW', 'N', 'W']
  
  // Referência
  reference: string;      // "Joaquina (Floripa)"
  referencedSpots: string[]; // IDs dos picos usados para calibrar
  
  // Confiança do padrão
  confidence: 'high' | 'medium' | 'low';
  observations: number;   // Total de observações
  averageError: number;   // % de erro médio
  
  // Onde foi aplicado
  appliedTo: string[];    // IDs dos picos que usam este padrão
  
  // Metadata
  createdAt: string;
  lastUpdated: string;
}

// Padrões master (inicialmente vazios, serão calibrados)
export const masterPatterns: { [key: string]: MasterPattern } = {
  // Exemplo de estrutura - será preenchido com calibração
  'SE-beach-open': {
    id: 'SE-beach-open',
    name: 'SE Beach Break Aberto',
    description: 'Praia de areia aberta para Sudeste, declive gradual',
    
    orientation: 'SE',
    exposure: 'open',
    bottomType: 'sand-gradual',
    
    baseMultiplier: 0.88, // Placeholder - será calibrado
    directionAdjustments: [
      { minDeg: 120, maxDeg: 150, multiplier: 0.95, reason: 'E/SE entra bem' },
      { minDeg: 150, maxDeg: 180, multiplier: 1.02, reason: 'S/SSE ideal' },
      { minDeg: 180, maxDeg: 210, multiplier: 0.85, reason: 'SW reduzido' }
    ],
    
    periodSensitivity: {
      ideal: [12, 16],
      good: [10, 12],
      poor: [6, 10],
      notes: 'Swell longo funciona melhor'
    },
    
    bestWinds: ['NW', 'N', 'W'],
    
    reference: 'Joaquina (Floripa) - AGUARDANDO CALIBRAÇÃO',
    referencedSpots: [], // Será preenchido
    
    confidence: 'low',
    observations: 0,
    averageError: 0,
    
    appliedTo: [],
    
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  
  'SE-reef-protected': {
    id: 'SE-reef-protected',
    name: 'SE Reef Protegido',
    description: 'Reef raso com proteção parcial (ilha/ponta)',
    
    orientation: 'SE',
    exposure: 'protected',
    bottomType: 'reef-shallow',
    
    baseMultiplier: 0.85,
    directionAdjustments: [
      { minDeg: 130, maxDeg: 160, multiplier: 1.05, reason: 'SE puro ideal' },
      { minDeg: 160, maxDeg: 180, multiplier: 0.98, reason: 'S bom' },
      { minDeg: 180, maxDeg: 220, multiplier: 0.75, reason: 'SW bloqueado' }
    ],
    
    periodSensitivity: {
      ideal: [12, 15],
      good: [10, 12],
      poor: [6, 10],
      notes: 'Reef precisa período >10s'
    },
    
    tideEffect: {
      low: 0.92,
      mid: 1.0,
      high: 0.88
    },
    
    reference: 'Morro das Pedras (Floripa) - AGUARDANDO CALIBRAÇÃO',
    referencedSpots: [],
    
    confidence: 'low',
    observations: 0,
    averageError: 0,
    
    appliedTo: [],
    
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  
  'S-bay-protected': {
    id: 'S-bay-protected',
    name: 'S Enseada Protegida',
    description: 'Enseada com proteção, areia com declive',
    
    orientation: 'S',
    exposure: 'bay',
    bottomType: 'sand-steep',
    
    baseMultiplier: 0.82,
    directionAdjustments: [
      { minDeg: 140, maxDeg: 180, multiplier: 0.95, reason: 'SE/S entra' },
      { minDeg: 180, maxDeg: 210, multiplier: 1.08, reason: 'SSW ideal' },
      { minDeg: 210, maxDeg: 240, multiplier: 0.88, reason: 'SW proteção' }
    ],
    
    periodSensitivity: {
      ideal: [12, 16],
      good: [10, 12],
      poor: [6, 10]
    },
    
    reference: 'Matadeiro (Floripa) - AGUARDANDO CALIBRAÇÃO',
    referencedSpots: [],
    
    confidence: 'low',
    observations: 0,
    averageError: 0,
    
    appliedTo: [],
    
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
};

// Helper para encontrar padrão por ID
export function getPattern(patternId: string): MasterPattern | undefined {
  return masterPatterns[patternId];
}

// Helper para listar todos os padrões
export function getAllPatterns(): MasterPattern[] {
  return Object.values(masterPatterns);
}

// Helper para padrões calibrados (confiança média/alta)
export function getCalibratedPatterns(): MasterPattern[] {
  return getAllPatterns().filter(p => p.confidence !== 'low');
}

// Helper para atualizar padrão
export function updatePattern(patternId: string, updates: Partial<MasterPattern>) {
  if (masterPatterns[patternId]) {
    masterPatterns[patternId] = {
      ...masterPatterns[patternId],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
  }
}
