export interface WaveConditions {
  height: number; // metros
  period: number; // segundos
  direction: string;
  windSpeed: number; // km/h
  windDirection: string;
  windType: string; // "Terral" | "Maral" | "Lateral" | "Fraco"
  tide: string; // "subindo" | "descendo"
  tideHeight: number; // metros
  waterTemp: number; // celsius
  rating: number; // 1-5
  timestamp: string;
  geographyAdjusted?: boolean; // Indica se os dados foram ajustados pela geografia
  geographyExplanation?: string[]; // Explicação dos ajustes
  // NOVO: Informações de bias correction PNBOIA
  biasCorrected?: boolean; // Indica se houve correção com dados de boia
  biasCorrection?: {
    buoyName: string;
    heightFactor: number; // Multiplicador aplicado
    directionOffset: number; // Graus ajustados
    confidence: number; // 0-1
    dataAge: number; // minutos
  };
}

export interface HourlyForecast {
  time: string;
  hour: number;
  waveHeight: number;
  wavePeriod: number;
  waveDirection: number;
  windSpeed: number;
  windDirection: number;
  windType: string; // "Terral" | "Maral" | "Lateral" | "Fraco"
  waterTemp: number;
  tide: string; // "subindo" | "descendo"
  tideHeight: number; // metros
  bestFor: ("beginner" | "intermediate" | "advanced" | "nosurf")[];
  rating: number;
  // NOVO: Bias correction PNBOIA
  biasCorrected?: boolean;
  biasCorrection?: {
    buoyName: string;
    heightFactor: number;
    confidence: number;
  };
  // 📊 DADOS INTERMEDIÁRIOS (para observações no admin)
  offshoreHeight?: number; // Altura RAW da API offshore
  buoyHeight?: number; // Altura após correção PNBOIA
  buoyId?: string; // ID da boia usada
  debugData?: SwellDebugData;
  // Debug específico para Palanque (todos os swells detectados)
  palanqueDebug?: {
    primarySwell?: { direction: number; height: number; period: number };
    secondarySwell?: { direction: number; height: number; period: number };
    tertiarySwell?: { direction: number; height: number; period: number };
    windWaves?: { direction: number; height: number; period: number };
    selectedSwell?: { direction: number; height: number; period: number };
    beachOrientation: number;
    acceptanceRange: { min: number; max: number };
    blockageRange?: { min: number; max: number };
  };
}

export interface SwellDebugData {
  timestamp: string;
  hourLabel: string;
  apiData: {
    combined: { height: number; direction: number; period: number };
    primary: { height: number; direction: number; period: number };
    secondary: { height: number; direction: number; period: number };
    wind: { height: number; direction: number; period: number };
  };
  selection: {
    mode: 'inteligente' | 'simples';
    totalSwells: number;
    validSwells: number;
    blockedSwells: Array<{
      source: string;
      height: number;
      direction: number;
      directionName: string;
      blockingFeature: string;
    }>;
    unblockedSwells: Array<{
      source: string;
      height: number;
      direction: number;
      directionName: string;
      score?: number;
    }>;
    selected: {
      source: string;
      height: number;
      direction: number;
      directionName: string;
      period: number;
    } | null;
  };
  geography: {
    applied: boolean;
    heightBefore: number;
    heightAfter: number;
    multiplier: number;
    features: string[];
  };
  final: {
    height: number;
    direction: number;
    directionName: string;
    period: number;
    classification: string;
  };
  // 🔍 NOVO: Análise específica de bloqueio da Ilha do Campeche
  blockageAnalysis?: {
    swellDirection: number;
    blocked: boolean;
    protectedDirections: number[];
    minDiff: number;
    reason: string;
  };
  // 🔍 NOVO: Lista de swells disponíveis (para debug visual)
  availableSwells?: Array<{
    source: string;
    height: number;
    direction: number;
    period: number;
  }>;
  // 🔍 NOVO: Swell selecionado (para debug visual)
  selectedSwell?: {
    source: string;
    height: number;
    direction: number;
    period: number;
  };
}

export interface DailyForecast {
  date: string;
  dayName: string;
  waveHeightMin: number;
  waveHeightMax: number;
  wavePeriodAvg: number;
  waveDirectionAvg: number;
  waveDirection: string; // Direção da ondulação por extenso
  windSpeedAvg: number;
  windSpeedMax: number;
  windDirectionAvg: number;
  windDirection: string; // Direção do vento por extenso
  windType: string; // "Terral" | "Maral" | "Lateral" | "Fraco"
  bestFor: ("beginner" | "intermediate" | "advanced" | "nosurf")[];
  rating: number;
  bestTimeForBeginner?: string;
  bestTimeForIntermediate?: string;
  bestTimeForAdvanced?: string;
}

// ========================================
// GEOGRAFIA E INFLUÊNCIAS
// ========================================

export interface GeographicFeature {
  type: "island" | "headland" | "peak" | "hill";
  name: string;
  distance: number; // km
  bearing: number; // graus (0-360)
  elevation?: number; // metros
}

export interface SwellProtection {
  feature: string;
  type: "island" | "headland" | "peak" | "hill";
  direction: number; // graus
  distance: number; // km
  strength: "alta" | "moderada" | "baixa";
}

export interface SwellExposure {
  feature: string;
  type: "island" | "headland" | "peak" | "hill";
  direction: number; // graus
  distance: number; // km
}

export interface WindInfluence {
  feature: string;
  elevation?: number; // metros
  direction: number; // graus
  distance: number; // km
  effect: "forte" | "moderado" | "leve";
}

export interface GeographyInfluence {
  swellProtection: SwellProtection[];
  swellExposure: SwellExposure[];
  windInfluence: WindInfluence[];
  features: GeographicFeature[];
  staticFeatures?: any[]; // 🔒 Features estáticas (opcional)
}

export interface SpotLevel {
  beginner: boolean;
  intermediate: boolean;
  advanced: boolean;
}

export interface Spot {
  id: string;
  name: string;
  beach: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  levels: SpotLevel;
  description: string;
  bestSeason: string[];
  beachOrientation?: number; // Orientação da praia em graus (0-360), onde 0=Norte, 90=Leste, 180=Sul, 270=Oeste
  conditions?: WaveConditions;
}

export interface Beach {
  name: string;
  city: string;
  state: string;
  spots: Spot[];
}

export interface City {
  name: string;
  state: string;
  beaches: Beach[];
}

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export interface GeographicFeature {
  type: "island" | "headland" | "peak" | "hill";
  name: string;
  distance: number; // km
  bearing: number; // graus (0-360)
  elevation?: number; // metros
}

export interface SwellProtection {
  feature: string;
  type: string;
  direction: number; // graus
  distance: number; // km
  strength: "alta" | "moderada" | "baixa";
}

export interface SwellExposure {
  feature: string;
  type: string;
  direction: number; // graus
  distance: number; // km
}

export interface WindInfluence {
  feature: string;
  elevation?: number; // metros
  direction: number; // graus
  distance: number; // km
  effect: "forte" | "moderado" | "leve";
}

export interface GeographyInfluence {
  swellProtection: SwellProtection[];
  swellExposure: SwellExposure[];
  windInfluence: WindInfluence[];
  features: GeographicFeature[];
  staticFeatures?: any[]; // 🔒 Features estáticas (opcional)
}