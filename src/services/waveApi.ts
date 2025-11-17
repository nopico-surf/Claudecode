import { WaveConditions, HourlyForecast, DailyForecast } from '../types/surf';
import { getBeachOrientation } from './autoOrientationDetector';
import { analyzeGeographyInfluence, calculateGeographyMultipliers } from './geographyApi';
import { selectSmartSwell, SwellData } from './smartSwellSelector';
import { getNOAAWaveData, getNOAAWeatherData, NOAA_INFO } from './noaaApi';
import { getWeatherbitMarineData, getWeatherbitWeatherData, WEATHERBIT_INFO } from './weatherbitApi';
import { fetchStormGlassMarineData, convertStormGlassToOpenMeteoFormat } from './stormglassApi';
import { correctWaveHeightForCoast } from './bathymetryApi'; // 🌊 GEBCO (versão simplificada)
import { applyWaveAdjustments, getSpotAdjustment, getSpotAdjustmentHybrid } from '../data/spotWaveAdjustments'; // 🎯 AJUSTES POR PICO v1.4 (híbrido)
import { getPNBOIAData } from './pnboiaApi'; // 🌊 PNBOIA - DADOS REAIS DAS BOIAS DA MARINHA
import { applyBiasCorrection } from './biasCorrection'; // 🎯 BIAS CORRECTION COM BOIAS

// ========================================
// CONFIGURAÇÕES
// ========================================

// 🌊 SELETOR DE API DE ONDAS
// Toggle entre diferentes APIs para comparar dados
export type WaveApiSource = 'open-meteo' | 'noaa' | 'weatherbit' | 'stormglass';

// 🎛️ CONFIGURAÇÃO GLOBAL - ALTERE AQUI PARA TROCAR DE API
export const WAVE_API_SOURCE: WaveApiSource = 'open-meteo'; // ✅ VOLTOU PARA OPEN-METEO (produção)

// 🔧 FLAG DE CONTROLE: Seletor Inteligente de Swell
// v2.0 - Sistema reescrito com lógica mais robusta
// 🚨 DESATIVADO: Voltando ao sistema de proteção geográfica tradicional
const ENABLE_SMART_SWELL_SELECTOR = false;

// 🌊 FLAG DE CONTROLE: Ajuste Costa/Oceano via GEBCO
// Aplica correção de shoaling (amplificação em água rasa)
// ✅ VERSÃO SIMPLIFICADA - API grátis sem autenticação (GEBCO)
const ENABLE_COAST_ADJUSTMENT = false; // ❌ DESATIVADO v1.3 - Estava aumentando muito as ondas (~13%)

// 🎯 CALIBRAÇÃO GLOBAL DE ONDAS
// Fator multiplicador aplicado APÓS todos os ajustes (geografia + spot)
// Usado para calibrar o sistema com base em observações reais
// Valores sugeridos:
//   1.0  = sem ajuste (previsões iguais aos cálculos)
//   0.85 = reduz 15% (conservador - ondas menores que o previsto)
//   0.90 = reduz 10% (moderado)
//   0.95 = reduz 5%  (leve ajuste)
// 📊 v1.6: DESATIVADO - Sem atenuação global (1.0)
const GLOBAL_CALIBRATION_FACTOR = 1.0; // ❌ DESATIVADO - Sem redução global

// 🌊 FLAG DE CONTROLE: PNBOIA Bias Correction
// Aplica correção de viés usando dados reais das boias da Marinha do Brasil
// ✅ ATIVADO v2.0 - Usa boias PNBOIA para corrigir offshore antes dos ajustes manuais
const ENABLE_PNBOIA_BIAS_CORRECTION = true; // ✅ ATIVO - Melhora precisão offshore

const TIMEZONE = 'America/Sao_Paulo';
const FORECAST_DAYS = 7;

// 💾 CACHE DE STORMGLASS (evita múltiplas chamadas de API)
// Cache persiste durante toda a sessão do navegador
const stormglassCache = new Map<string, {
  data: any;
  timestamp: number;
}>();

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hora

// Log do modo ativo
console.log(`\n${'='.repeat(70)}`);
const apiDisplayName = WAVE_API_SOURCE === 'noaa' ? '🇺🇸 NOAA WAVEWATCH III' 
  : WAVE_API_SOURCE === 'weatherbit' ? '☁️ WEATHERBIT MARINE'
  : WAVE_API_SOURCE === 'stormglass' ? '⛈️ STORMGLASS API (TESTE COM CACHE)'
  : '🌐 OPEN-METEO MARINE';
console.log(`🌊 API SOURCE: ${apiDisplayName}`);
console.log(`🔧 MODO DE SELEÇÃO DE SWELL: ${ENABLE_SMART_SWELL_SELECTOR ? '🧠 INTELIGENTE (Smart Swell Selector)' : '🗺️ PRÉ-FILTRO GEOGRÁFICO (calculateGeographyMultipliers)'}`);
console.log(`🎯 CALIBRAÇÃO GLOBAL: ${GLOBAL_CALIBRATION_FACTOR < 1.0 ? `✅ ATIVA (×${GLOBAL_CALIBRATION_FACTOR} = ${((1 - GLOBAL_CALIBRATION_FACTOR) * 100).toFixed(0)}% menor)` : '❌ DESATIVADA (×1.0)'}`);

if (WAVE_API_SOURCE === 'noaa') {
  console.log(`\n🇺🇸 ${NOAA_INFO.name}`);
  console.log(`   Provider: ${NOAA_INFO.provider}`);
  console.log(`   Modelo: ${NOAA_INFO.model}`);
  console.log(`   ✅ ${NOAA_INFO.description}`);
  console.log(`   ✅ Atualização: ${NOAA_INFO.updateFrequency}`);
  console.log(`   ✅ Cobertura: ${NOAA_INFO.coverage}`);
} else if (WAVE_API_SOURCE === 'weatherbit') {
  console.log(`\n☁️ ${WEATHERBIT_INFO.name}`);
  console.log(`   Provider: ${WEATHERBIT_INFO.provider}`);
  console.log(`   Modelo: ${WEATHERBIT_INFO.model}`);
  console.log(`   ✅ ${WEATHERBIT_INFO.description}`);
  console.log(`   ✅ Atualização: ${WEATHERBIT_INFO.updateFrequency}`);
  console.log(`   ✅ Free Limit: ${WEATHERBIT_INFO.freeLimit}`);
  console.log(`   🔑 Requer API Key: ${WEATHERBIT_INFO.signupUrl}`);
} else if (WAVE_API_SOURCE === 'stormglass') {
  console.log(`\n⛈️ StormGlass API (MODO TESTE COM CACHE)`);
  console.log(`   ✅ Dados agregados de múltiplas fontes (NOAA, MetOffice, etc.)`);
  console.log(`   ✅ API profissional usada em apps de surf comerciais`);
  console.log(`   ✅ Swell primário + secundário + wind waves`);
  console.log(`   ⚠️ CACHE ATIVO: Dados salvos localmente para testes`);
  console.log(`   🔑 API Key configurada`);
} else {
  console.log(`\n🌐 Open-Meteo Marine API`);
  console.log(`   ✅ Gratuita e sem limites de quota`);
  console.log(`   ✅ Dados completos: wave_height, swell, wind_waves, vento`);
  console.log(`   ✅ Cobertura global com 7 dias de previsão`);
}

if (!ENABLE_SMART_SWELL_SELECTOR) {
  console.log(`\n🗺️ Pré-filtro Geográfico ATIVO`);
  console.log(`   🛡️ Swells bloqueados (fator < 5%) são removidos ANTES da seleção`);
  console.log(`   📊 Seleciona o maior swell ENTRE OS NÃO BLOQUEADOS`);
}
console.log(`${'='.repeat(70)}\n`);

// As alturas de ondas são usadas diretamente da API Open-Meteo Marine,
// sem aplicação de fator de redução global.

// ========================================
// TIPOS INTERNOS DA API
// ========================================

interface MarineApiResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    wave_height: number[];
    wave_period: number[];
    wave_direction: number[];
    // Dados de swells individuais (quando disponíveis)
    swell_wave_height?: number[];
    swell_wave_direction?: number[];
    swell_wave_period?: number[];
    wind_wave_height?: number[];
    wind_wave_direction?: number[];
    wind_wave_period?: number[];
  };
  daily: {
    time: string[];
    wave_height_max: number[];
    wave_period_max: number[];
  };
}

interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
  };
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Converte graus em direção cardeal predominante (8 direções principais)
 * Retorna apenas: Norte, Nordeste, Leste, Sudeste, Sul, Sudoeste, Oeste, Noroeste
 */
export function degreesToDirection(degrees: number): string {
  const directions = [
    'Norte',     // 0°
    'Nordeste',  // 45°
    'Leste',     // 90°
    'Sudeste',   // 135°
    'Sul',       // 180°
    'Sudoeste',  // 225°
    'Oeste',     // 270°
    'Noroeste'   // 315°
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// Alias para compatibilidade
export const getDirectionFromDegrees = degreesToDirection;

/**
 * Calcula a diferença angular mínima entre dois ângulos (0-180°)
 */
function angleDifference(angle1: number, angle2: number): number {
  let diff = Math.abs(angle1 - angle2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

/**
 * Escolhe o melhor swell baseado na orientação da praia
 * 
 * LÓGICA:
 * - Quando há múltiplos swells, escolhe aquele que ENTRA NO PICO
 * - Swell que entra = direção mais próxima à orientação da praia
 * - Exemplo: Praia orientada a 90° (Leste)
 *   - Swell de 85° (Leste) → diff 5° → ENTRA NO PICO ✅
 *   - Swell de 270° (Oeste) → diff 180° → Vem de trás ❌
 * 
 * @param swells Array de swells com altura, direção e período
 * @param beachOrientation Orientação da praia em graus (0-360)
 * @returns O swell que melhor entra no pico
 */
function selectBestSwellForBeach(
  swells: Array<{ height: number; direction: number; period: number; source: string }>,
  beachOrientation: number,
  showLog: boolean = false
): { height: number; direction: number; period: number; source: string } | null {
  if (swells.length === 0) return null;
  if (swells.length === 1) return swells[0];
  
  // Filtrar swells com altura significativa (>0.1m)
  const significantSwells = swells.filter(s => s.height > 0.1);
  if (significantSwells.length === 0) return swells[0];
  
  // Calcular score para cada swell
  // Score = quão bem o swell entra no pico (quanto menor a diferença angular, melhor)
  const swellsWithScore = significantSwells.map(swell => {
    const angularDiff = angleDifference(swell.direction, beachOrientation);
    
    // Score: prioriza swells que entram diretamente no pico
    // - diff 0-45°: score alto (entra muito bem)
    // - diff 45-90°: score médio (entra de lado)
    // - diff 90-180°: score baixo (não entra bem ou vem de trás)
    let score = 0;
    
    if (angularDiff <= 45) {
      score = 100 - angularDiff; // 100 a 55
    } else if (angularDiff <= 90) {
      score = 55 - (angularDiff - 45); // 55 a 10
    } else {
      score = 10 - ((angularDiff - 90) / 9); // 10 a 0
    }
    
    // Bonus por altura (swell maior tem prioridade se a diferença de direção for pequena)
    score = score + (swell.height * 5);
    
    return { ...swell, angularDiff, score };
  });
  
  // Ordenar por score (maior = melhor)
  swellsWithScore.sort((a, b) => b.score - a.score);
  
  const best = swellsWithScore[0];
  
  if (showLog) {
    console.log(`\n🌊 ===== SELEÇÃO DE SWELL =====`);
    console.log(`📍 Orientação da praia: ${beachOrientation}° (${degreesToDirection(beachOrientation)})`);
    console.log(`\n🔍 Swells disponíveis:`);
    swellsWithScore.forEach((s, i) => {
      const icon = i === 0 ? '✅' : '❌';
      console.log(`${icon} ${s.source}:`);
      console.log(`   Altura: ${s.height.toFixed(2)}m | Direção: ${s.direction}° (${degreesToDirection(s.direction)})`);
      console.log(`   Diferença angular: ${s.angularDiff.toFixed(0)}° | Score: ${s.score.toFixed(1)}`);
    });
    console.log(`\n✅ Swell escolhido: ${best.source}`);
    console.log(`   ${best.height.toFixed(2)}m de ${degreesToDirection(best.direction)} (${best.direction}°)`);
    console.log(`   Entra no pico com ${best.angularDiff.toFixed(0)}° de diferença`);
    console.log(`================================\n`);
  }
  
  return {
    height: best.height,
    direction: best.direction,
    period: best.period,
    source: best.source
  };
}

/**
 * Determina tipo de vento baseado na orientação da praia
 * PRIORIDADE: "Fraco" (≤9km/h) tem precedência sobre tudo
 * 
 * LÓGICA v4 - QUADRANTES GEOGRÁFICOS ABSOLUTOS:
 * Combina ângulo relativo com quadrante geográfico absoluto para classificar
 * corretamente ventos em praias com diferentes orientações.
 * 
 * CONCEITO:
 * - Costa brasileira: Oceano está a LESTE/SUDESTE, Terra está a OESTE/NOROESTE
 * - Ventos de Leste (60-150°): tendem a vir do MAR → MARAL
 * - Ventos de Oeste (210-330°): tendem a vir da TERRA → TERRAL
 * - Ventos de Sul (150-210°) e Norte (330-60°): DEPENDE da orientação da praia
 * 
 * ALGORITMO:
 * 1. Calcular ângulo relativo (quanto o vento difere da orientação)
 * 2. Verificar quadrante absoluto do vento
 * 3. Combinar ambos para classificar
 * 
 * REGRAS:
 * - relativeDeg ≤35° ou ≥325°: SEMPRE Maral (vento alinhado com orientação)
 * - Ventos de Oeste (210-330°): SEMPRE Terral (vento de terra para costa leste BR)
 * - Ventos de Leste (45-150°): Maral se rel<90°, senão Lateral
 * - Ventos de Sul (150-210°): Lateral/Terral dependendo do rel
 */
function getWindType(windDirection: number, windSpeed: number, beachOrientation: number): string {
  // SEMPRE classificar como Fraco se vento <= 9km/h, independente da direção
  if (windSpeed <= 9) return 'Fraco';
  
  // Normalizar ângulos para 0-360
  windDirection = ((windDirection % 360) + 360) % 360;
  beachOrientation = ((beachOrientation % 360) + 360) % 360;
  
  // Calcular ângulo RELATIVO do vento em relação à orientação da praia
  let relativeDeg = (windDirection - beachOrientation + 360) % 360;
  
  // DEBUG: Log detalhado
  console.log(`🌊 CLASSIFICAÇÃO DE VENTO (v4 - Quadrantes Geográficos):
    ├─ Direção do vento: ${windDirection}° (${degreesToDirection(windDirection)})
    ├─ Orientação da praia: ${beachOrientation}° (${degreesToDirection(beachOrientation)})
    ├─ Ângulo relativo: ${relativeDeg}°
    ├─ Velocidade: ${windSpeed} km/h`);
  
  // REGRA 0: VENTOS DE LESTE/SUDESTE - Costa Brasileira
  // Para a costa brasileira, o oceano Atlântico está a LESTE
  // Ventos de Leste (60-150°) vêm do MAR = MARAL
  // EXCEÇÃO CRÍTICA: Para praias NORDESTE (0-60°), vento SE/Sul vem do CONTINENTE (traseiro) = TERRAL
  if (windDirection >= 60 && windDirection <= 150) {
    // EXCEÇÃO 1: Praias Norte/Nordeste (0-60°) + vento SE/Sul (135-150°) = TERRAL (vem do continente)
    if (beachOrientation >= 0 && beachOrientation <= 60 && windDirection >= 135) {
      console.log(`    └─ ✅ TERRAL (praia Norte/NE ${beachOrientation}° + vento SE ${windDirection}°: vem do continente, não do oceano)`);
      return 'Terral';
    }
    
    // EXCEÇÃO 2: Se o vento está muito atrás da praia (relativeDeg entre 145-215°), é terral
    if (relativeDeg >= 145 && relativeDeg <= 215) {
      console.log(`    └─ ✅ TERRAL (vento Leste/Sudeste ${windDirection}° está ATRÁS da praia ${beachOrientation}°: traseiro)`);
      return 'Terral';
    }
    
    // Caso contrário, vento de Leste/Sudeste vem do oceano = MARAL
    console.log(`    └─ ⚠️ MARAL (vento Leste/Sudeste ${windDirection}° vem do oceano Atlântico)`);
    return 'Maral';
  }
  
  // REGRA 0.5: PRAIAS SUL/SUDESTE (150-200°) - Vento Sul/Sudoeste SEMPRE MARAL
  // Para praias que olham para o Sul/Sudeste, ventos de Sul (150-240°) vêm do oceano
  if (beachOrientation >= 150 && beachOrientation <= 200) {
    if (windDirection >= 150 && windDirection <= 240) {
      console.log(`    └─ ⚠️ MARAL (praia Sul/Sudeste ${beachOrientation}° + vento Sul/Sudoeste ${windDirection}°: vem do oceano)`);
      return 'Maral';
    }
  }
  
  // REGRA 0.6: DELETADA - estava INVERTIDA!
  // Praias LESTE (85-110°): as regras gerais já funcionam corretamente
  // - Vento Leste (60-150°) = MARAL (Regra 0)
  // - Vento Norte/Sul = TERRAL (Regra 4 - traseiro/perpendicular)
  // - Vento Oeste (210-330°) = TERRAL (Regra 2)
  
  // REGRA 1: Vento MUITO ALINHADO com orientação (±35°) = Maral
  if (relativeDeg <= 35 || relativeDeg >= 325) {
    console.log(`    └─ ⚠️ MARAL (alinhado: ${relativeDeg}° em [-35°, +35°])`);
    return 'Maral';
  }
  
  // REGRA 2: Vento de OESTE - depende da orientação da praia
  // Para praias que olham SUL/SUDESTE (120-200°): vento SUDOESTE pode vir do mar
  if (windDirection >= 210 && windDirection <= 330) {
    // Exceção: Praias orientadas para Sul/Sudeste (120-200°)
    // Vento Sudoeste (210-240°) vem do oceano = MARAL
    if (beachOrientation >= 120 && beachOrientation <= 200 && windDirection >= 210 && windDirection <= 240) {
      console.log(`    └─ ⚠️ MARAL (praia Sul/Sudeste + vento Sudoeste ${windDirection}°: vem do oceano)`);
      return 'Maral';
    }
    
    // Para outras praias: vento de Oeste é terral
    console.log(`    └─ ✅ TERRAL (oeste: ${windDirection}° em [210°, 330°])`);
    return 'Terral';
  }
  
  // REGRA 3: Diagonal (35-75°) - Depende da orientação da praia E do quadrante do vento
  if (relativeDeg > 35 && relativeDeg < 75) {
    // Para praias NORTE/NORDESTE (0-60°): vento SE/Sul vem do continente = TERRAL
    if (beachOrientation >= 0 && beachOrientation <= 60 && windDirection >= 135 && windDirection <= 200) {
      console.log(`    └─ ✅ TERRAL (praia Norte/NE + vento SE/Sul ${windDirection}°: vem do continente)`);
      return 'Terral';
    }
    // Para praias LESTE-SUDESTE (75-150°): vento SE/Sul vem do oceano = MARAL
    // Praias mais ao Nordeste (< 75°): Sul é mais lateral
    if (beachOrientation >= 75 && beachOrientation <= 150 && windDirection >= 120 && windDirection <= 200) {
      console.log(`    └─ ⚠️ MARAL (praia Leste/ESE/SE 75-150° + vento SE/Sul ${windDirection}°: vem do oceano)`);
      return 'Maral';
    }
    // Outros casos: lateral
    console.log(`    ─ ↔️ LATERAL (diagonal: ${relativeDeg}° em (35-75°))`);
    return 'Lateral';
  }
  
  // REGRA 3.5: Perpendicular (75-105°) - Depende do quadrante do vento
  if (relativeDeg >= 75 && relativeDeg <= 105) {
    // Para praias LESTE-SUDESTE (75-150°) + vento SE/Sul/SSW: vem do oceano = MARAL
    // Praias Nordeste (< 75°): Sul é muito lateral, não MARAL
    if (beachOrientation >= 75 && beachOrientation <= 150 && windDirection >= 120 && windDirection <= 210) {
      console.log(`    └─ ⚠️ MARAL (praia Leste/ESE/SE 75-150° + vento SE/Sul/SSW ${windDirection}°: vem do oceano)`);
      return 'Maral';
    }
  }
  
  // REGRA 3.6: Traseiro diagonal (105-150°) - Vem do oceano APENAS para praias Leste-Sudeste
  if (relativeDeg > 105 && relativeDeg <= 150) {
    // APENAS para praias LESTE-SUDESTE (85-150°) + vento Sul/Sudoeste: vem do oceano = MARAL
    // Praias Nordeste (< 85°): Sul é LATERAL, não MARAL!
    if (beachOrientation >= 85 && beachOrientation <= 150 && windDirection >= 180 && windDirection <= 240) {
      console.log(`    └─ ⚠️ MARAL (praia Leste/ESE/SE 85-150° + vento Sul/SSW ${windDirection}°: traseiro do oceano)`);
      return 'Maral';
    }
  }
  
  // REGRA 4.5: PRAIAS NORTE/NORDESTE - Vento Norte é MARAL/LATERAL
  // Para praias que olham Norte/Nordeste (0-90°), vento do quadrante Norte (330-30°) vem do oceano
  // 🔧 CORREÇÃO: Praias com orientação 60-90° (mais para Leste), vento Norte pode ser mais LATERAL
  if (beachOrientation >= 0 && beachOrientation <= 90) {
    // Vento Norte/Nordeste (330-30° absoluto)
    if (windDirection >= 330 || windDirection <= 30) {
      // Para praias mais ao Norte (0-50°): Norte é MARAL
      if (beachOrientation >= 0 && beachOrientation <= 50) {
        console.log(`    └─ ⚠️ MARAL (praia Norte 0-50° + vento Norte ${windDirection}°: vem do oceano)`);
        return 'Maral';
      }
      // Para praias Nordeste (50-90°): Norte é LATERAL ou MARAL dependendo do ângulo relativo
      // relativeDeg próximo de 300° (vento vindo de trás-lateral)
      if (relativeDeg >= 285 && relativeDeg <= 325) {
        console.log(`    └─ ↔️ LATERAL (praia Nordeste 50-90° + vento Norte ${windDirection}°: lateral traseiro)`);
        return 'Lateral';
      }
      console.log(`    └─ ⚠️ MARAL (praia Nordeste + vento Norte ${windDirection}°: vem do oceano)`);
      return 'Maral';
    }
  }
  
  // REGRA 4: Perpendicular ou traseiro (75-285°)
  if (relativeDeg >= 75 && relativeDeg <= 285) {
    console.log(`    └─ ✅ TERRAL (traseiro/perpendicular: ${relativeDeg}° em [75°, 285°])`);
    return 'Terral';
  }
  
  // REGRA 5: Diagonal traseira (285-320°)
  console.log(`    └─ ↔️ LATERAL (diagonal traseira: ${relativeDeg}° em (285-320°))`);
  return 'Lateral';
}

/**
 * Calcula média circular para direções
 */
function circularMean(angles: number[]): number {
  if (angles.length === 0) return 0;
  
  let sinSum = 0;
  let cosSum = 0;
  
  angles.forEach(angle => {
    const rad = (angle * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  });
  
  const meanRad = Math.atan2(sinSum / angles.length, cosSum / angles.length);
  let meanDeg = (meanRad * 180) / Math.PI;
  
  if (meanDeg < 0) meanDeg += 360;
  
  return meanDeg;
}

/**
 * Determina para quem a condição é boa
 * Baseado nas regras:
 * - Iniciantes: 0.3-0.7m com vento terral ou maral ≤16km/h
 * - Intermediários: 0.5-1.7m com vento terral, maral ≤16km/h ou lateral <25km/h
 * - Avançados: acima de 0.95m com vento adequado OU acima de 1.5m com qualquer vento
 * - Sem Surf: ondas <0.3m ou vento maral forte (≥17km/h) em ondas <0.95m
 * 
 * NOTA: 0.95m é usado ao invés de 1.0m para considerar arredondamentos na UI
 * (valores entre 0.95-1.0m são exibidos como "1.0m" para o usuário)
 */
function getBestFor(waveHeight: number, windSpeed: number, windType: string, wavePeriod: number = 0): ("beginner" | "intermediate" | "advanced" | "nosurf")[] {
  const levels: ("beginner" | "intermediate" | "advanced" | "nosurf")[] = [];
  
  // 🔍 DEBUG: Log dos valores recebidos
  console.log('🔍 getBestFor DEBUG:', { waveHeight, windSpeed, windType, wavePeriod });
  
  // ❌ REGRA 1: Ondas muito pequenas - SEMPRE sem surf
  if (waveHeight < 0.3) {
    console.log('❌ REGRA 1: Ondas < 0.3m → nosurf');
    return ['nosurf'];
  }
  
  // ✅ REGRA 2: Ondas grandes (≥1.5m) - AVANÇADOS surfam em QUALQUER VENTO
  // Esta regra tem PRIORIDADE sobre bloqueios de vento
  if (waveHeight >= 1.5) {
    console.log('✅ REGRA 2: Ondas >= 1.5m → advanced');
    return ['advanced'];
  }
  
  // 🔴 REGRA 3: Ondas médias-grandes (1.0-1.5m) com vento maral forte - APENAS AVANÇADOS
  // Surfistas avançados conseguem surfar nessa condição, mesmo com vento ruim
  // IMPORTANTE: Usar >= 0.95 para considerar arredondamentos (0.95-1.0m exibidos como 1m na UI)
  if (waveHeight >= 0.95 && windType === 'Maral' && windSpeed >= 17) {
    console.log('🔴 REGRA 3: Ondas 0.95-1.5m + Maral >= 17km/h → advanced');
    return ['advanced'];
  }
  
  // ❌ REGRA 4: Vento Maral forte (≥17km/h) em ondas <0.95m - Sem surf
  // Ondas pequenas com vento maral forte são realmente difíceis de surfar
  // IMPORTANTE: Só bloqueia se waveHeight < 0.95m (ondas ≥0.95m são surfáveis por avançados)
  // Usa 0.95 ao invés de 1.0 para considerar arredondamentos na UI
  if (windType === 'Maral' && windSpeed >= 17 && waveHeight < 0.95) {
    console.log('❌ REGRA 4: Maral >= 17km/h + ondas < 0.95m → nosurf');
    return ['nosurf'];
  }
  
  // 🌬️ Verificar se vento está bom para cada nível
  const windOKForBeginners = windType === 'Terral' || windType === 'Fraco' || (windType === 'Maral' && windSpeed <= 16);
  const windOKForIntermediate = windOKForBeginners || (windType === 'Lateral' && windSpeed < 25);
  
  // 🟢 Iniciante: 0.3-0.7m com vento terral ou maral ≤16km/h
  if (waveHeight >= 0.3 && waveHeight <= 0.7 && windOKForBeginners) {
    levels.push('beginner');
  }
  
  // 🟡 Intermediário: 0.5-1.7m com vento terral, maral ≤16km/h ou lateral <25km/h
  if (waveHeight >= 0.5 && waveHeight <= 1.7 && windOKForIntermediate) {
    levels.push('intermediate');
  }
  
  // 🔴 Avançado: acima de 0.95m com vento adequado
  // Nota: ondas ≥1.5m já foram tratadas acima (REGRA 2)
  // Usa 0.95 ao invés de 1.0 para considerar arredondamentos na UI (0.95m exibido como 1.0m)
  if (waveHeight >= 0.95 && windOKForIntermediate) {
    levels.push('advanced');
  }
  
  // Fallback: se passou de todas as verificações mas não se encaixou,
  // considera intermediário (surfável mas não ideal)
  if (levels.length === 0) {
    console.log('⚠️ FALLBACK: Nenhum nível definido → intermediate');
    levels.push('intermediate');
  }
  
  console.log('📊 RESULTADO FINAL:', levels);
  return levels;
}

/**
 * Calcula rating de 1-5 baseado nas condições
 */
function calculateRating(waveHeight: number, windSpeed: number, windType: string): number {
  let rating = 3; // Base
  
  // Altura ideal: 0.5-2.0m
  if (waveHeight >= 0.5 && waveHeight <= 2.0) {
    rating += 0.5;
  } else if (waveHeight < 0.3 || waveHeight > 3.0) {
    rating -= 1;
  }
  
  // Vento
  if (windType === 'Terral') {
    rating += 1;
  } else if (windType === 'Maral') {
    rating -= 0.5;
  }
  
  if (windSpeed < 15) {
    rating += 0.5;
  } else if (windSpeed > 30) {
    rating -= 1;
  }
  
  return Math.max(1, Math.min(5, rating));
}

/**
 * Obtém nome do dia da semana comparando com a data atual de São Paulo
 */
function getDayName(dateStr: string, index: number): string {
  // Obter data atual em São Paulo (UTC-3)
  const now = new Date();
  const saoPauloTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const todayStr = saoPauloTime.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Obter data de amanhã
  const tomorrow = new Date(saoPauloTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Extrair apenas a parte da data (YYYY-MM-DD) do dateStr
  const forecastDateStr = dateStr.substring(0, 10);
  
  // Comparar as datas
  if (forecastDateStr === todayStr) return 'Hoje';
  if (forecastDateStr === tomorrowStr) return 'Amanhã';
  
  // Caso contrário, retornar o dia da semana
  const date = new Date(dateStr + 'T12:00:00'); // Meio-dia para evitar problemas de timezone
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return days[date.getDay()];
}

// ========================================
// FUNÇÃO PRINCIPAL
// ========================================

export async function getWaveData(
  latitude: number,
  longitude: number,
  beachOrientation?: number, // Agora é opcional - usa detecção automática se não fornecido
  selectedDate?: string, // Opcional: se fornecido, retorna todas as 24h daquele dia
  spotId?: string // Opcional: ID do spot para buscar features específicas
): Promise<{
  current: WaveConditions;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}> {
  try {
    // 🚀 DETECÇÃO AUTOMÁTICA DE ORIENTAÇÃO baseada nas coordenadas geográficas
    const finalOrientation = getBeachOrientation(latitude, longitude, beachOrientation);
    
    console.log(`\n🌊 Buscando dados para: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    console.log(`🧭 Orientação da praia: ${finalOrientation}° ${beachOrientation ? '(manual)' : '(AUTO-DETECTADA)'}`);
    const sourceDisplay = WAVE_API_SOURCE === 'noaa' ? '🇺🇸 NOAA' 
      : WAVE_API_SOURCE === 'weatherbit' ? '☁️ Weatherbit'
      : WAVE_API_SOURCE === 'stormglass' ? '⛈️ StormGlass (CACHE)'
      : '🌐 Open-Meteo';
    console.log(`📡 Fonte de dados: ${sourceDisplay}\n`);
    
    // ===== BUSCAR DADOS DA API SELECIONADA =====
    
    let marineData: MarineApiResponse;
    let weatherData: WeatherApiResponse;
    
    if (WAVE_API_SOURCE === 'noaa') {
      // 🇺🇸 USAR NOAA WAVEWATCH III
      console.log('🇺🇸 Buscando dados do NOAA WaveWatch III...');
      const noaaMarineData = await getNOAAWaveData(latitude, longitude, FORECAST_DAYS);
      const noaaWeatherData = await getNOAAWeatherData(latitude, longitude, FORECAST_DAYS);
      
      // Converter formato NOAA para formato MarineApiResponse/WeatherApiResponse
      marineData = noaaMarineData as any;
      weatherData = noaaWeatherData as any;
      
    } else if (WAVE_API_SOURCE === 'weatherbit') {
      // ☁️ USAR WEATHERBIT
      console.log('☁️ Buscando dados da Weatherbit Marine API...');
      const weatherbitMarineData = await getWeatherbitMarineData(latitude, longitude, FORECAST_DAYS);
      const weatherbitWeatherData = await getWeatherbitWeatherData(latitude, longitude, FORECAST_DAYS);
      
      // Converter formato Weatherbit para formato MarineApiResponse/WeatherApiResponse
      marineData = weatherbitMarineData as any;
      weatherData = weatherbitWeatherData as any;
      
    } else if (WAVE_API_SOURCE === 'stormglass') {
      // ⛈️ USAR STORMGLASS COM CACHE
      const cacheKey = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
      const cached = stormglassCache.get(cacheKey);
      const now = Date.now();
      
      if (cached && (now - cached.timestamp) < CACHE_DURATION_MS) {
        console.log(`💾 Usando dados StormGlass do CACHE (${Math.floor((now - cached.timestamp) / 1000 / 60)}min atrás)`);
        marineData = cached.data.marine;
        weatherData = cached.data.weather;
      } else {
        console.log('⛈️ Buscando dados da StormGlass API...');
        const stormglassData = await fetchStormGlassMarineData(latitude, longitude);
        
        if (!stormglassData) {
          throw new Error('StormGlass API error: No data returned');
        }
        
        // Converter formato StormGlass para Open-Meteo
        const converted = convertStormGlassToOpenMeteoFormat(stormglassData);
        
        marineData = {
          latitude,
          longitude,
          hourly: converted.hourly,
          daily: converted.daily
        };
        
        weatherData = {
          latitude,
          longitude,
          hourly: {
            time: converted.hourly.time,
            wind_speed_10m: converted.hourly.wind_speed_10m,
            wind_direction_10m: converted.hourly.wind_direction_10m
          }
        };
        
        // Salvar no cache
        stormglassCache.set(cacheKey, {
          data: { marine: marineData, weather: weatherData },
          timestamp: now
        });
        console.log(`💾 Dados salvos no cache`);
      }
      
    } else {
      // 🌐 USAR OPEN-METEO (padrão)
      console.log('🌐 Buscando dados da Open-Meteo Marine API...');
      
      // Buscar dados marinhos
      const marineUrl = new URL('https://marine-api.open-meteo.com/v1/marine');
      marineUrl.searchParams.append('latitude', latitude.toString());
      marineUrl.searchParams.append('longitude', longitude.toString());
      marineUrl.searchParams.append('hourly', 'wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period');
      marineUrl.searchParams.append('daily', 'wave_height_max,wave_period_max');
      marineUrl.searchParams.append('timezone', TIMEZONE);
      marineUrl.searchParams.append('forecast_days', FORECAST_DAYS.toString());

      const marineResponse = await fetch(marineUrl.toString());
      if (!marineResponse.ok) {
        throw new Error(`Open-Meteo Marine API error: HTTP ${marineResponse.status}`);
      }
      marineData = await marineResponse.json();

      // Buscar dados de vento
      const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
      weatherUrl.searchParams.append('latitude', latitude.toString());
      weatherUrl.searchParams.append('longitude', longitude.toString());
      weatherUrl.searchParams.append('hourly', 'wind_speed_10m,wind_direction_10m');
      weatherUrl.searchParams.append('timezone', TIMEZONE);
      weatherUrl.searchParams.append('forecast_days', FORECAST_DAYS.toString());

      const weatherResponse = await fetch(weatherUrl.toString());
      if (!weatherResponse.ok) {
        throw new Error(`Open-Meteo Weather API error: HTTP ${weatherResponse.status}`);
      }
      weatherData = await weatherResponse.json();
    }
    
    console.log(`✅ Dados recebidos: ${marineData.hourly.time.length} horas de previsão`);
    
    // ===== 🗺️ ANÁLISE DE PROTEÇÃO GEOGRÁFICA =====
    console.log(`\n🗺️ Analisando proteção geográfica${spotId ? ` para spot ${spotId}` : ''}...`);
    const geographyData = analyzeGeographyInfluence(latitude, longitude, finalOrientation, spotId);
    console.log(`✅ Features encontradas: ${geographyData.features.length}`);
    
    // ===== 🌊 BUSCAR DADOS PNBOIA (BOIAS DA MARINHA) =====
    let pnboiaData = null;
    if (ENABLE_PNBOIA_BIAS_CORRECTION) {
      console.log(`\\n🌊 Buscando dados PNBOIA (boias da Marinha do Brasil)...`);
      try {
        pnboiaData = await getPNBOIAData(latitude, longitude);
        if (pnboiaData && pnboiaData.available) {
          console.log(`✅ PNBOIA: Boia ${pnboiaData.buoy.name} encontrada (${pnboiaData.distance.toFixed(0)}km)`);
          console.log(`   Dados: Hs=${pnboiaData.latestReading.waveHeight.toFixed(2)}m, Dir=${pnboiaData.latestReading.waveDirection}°, Tp=${pnboiaData.latestReading.wavePeriod.toFixed(1)}s`);
          console.log(`   Idade: ${pnboiaData.dataAge.toFixed(0)} minutos`);
        } else {
          console.log(`⚠️ PNBOIA: Sem dados disponíveis (sem boia próxima ou dados antigos)`);
        }
      } catch (error) {
        console.error(`❌ PNBOIA: Erro ao buscar dados:`, error);
        pnboiaData = null;
      }
    }
    
    // ===== PROCESSAR DADOS HORÁRIOS =====
    
    const hourlyForecasts: HourlyForecast[] = [];
    
    for (let i = 0; i < marineData.hourly.time.length; i++) {
      const timestamp = marineData.hourly.time[i];
      
      // Buscar índice correspondente na Weather API
      const weatherIdx = weatherData.hourly.time.indexOf(timestamp);
      if (weatherIdx === -1) continue;
      
      // 🌊 SELEÇÃO INTELIGENTE DE SWELL v2.0
      // Considera proteções geográficas para escolher o swell que REALMENTE CHEGA ao pico
      const availableSwells: SwellData[] = [];
      
      // Swell principal (dados agregados)
      const combinedHeight = marineData.hourly.wave_height[i] ?? 0;
      const combinedDirection = marineData.hourly.wave_direction[i] ?? 0;
      const combinedPeriod = marineData.hourly.wave_period[i] ?? 0;
      
      // 🚨 LOG PALANQUE: Dados RAW da API  
      // Palanque = sc-floripa-campeche-4
      // LOGAR TODAS AS HORAS para identificar o problema
      if (spotId && spotId === 'sc-floripa-campeche-4' && i < 30) {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const day = date.getDate();
        console.log(`\n🔬 DADOS RAW DA API - ${spotId} [Dia ${day}, ${hour}:00h]:`);
        console.log(`   Timestamp: ${timestamp}`);
        console.log(`   Primary (wave_*):   ${combinedHeight.toFixed(3)}m @ ${combinedDirection}° @ ${combinedPeriod}s`);
        if (marineData.hourly.swell_wave_height) {
          const swellH = marineData.hourly.swell_wave_height[i] ?? 0;
          const swellD = marineData.hourly.swell_wave_direction?.[i] ?? 0;
          const swellP = marineData.hourly.swell_wave_period?.[i] ?? 0;
          console.log(`   Secondary (swell_*): ${swellH.toFixed(3)}m @ ${swellD}° @ ${swellP}s`);
        }
        if (marineData.hourly.wind_wave_height) {
          const windH = marineData.hourly.wind_wave_height[i] ?? 0;
          const windD = marineData.hourly.wind_wave_direction?.[i] ?? 0;
          const windP = marineData.hourly.wind_wave_period?.[i] ?? 0;
          console.log(`   Wind (wind_wave_*):  ${windH.toFixed(3)}m @ ${windD}° @ ${windP}s`);
        }
      }
      
      if (combinedHeight > 0) {
        availableSwells.push({
          height: combinedHeight,
          direction: combinedDirection,
          period: combinedPeriod,
          source: 'primary'
        });
      }
      
      // Swell de longo período (oceánico) - SWELL SECUNDÁRIO
      if (marineData.hourly.swell_wave_height && marineData.hourly.swell_wave_direction && marineData.hourly.swell_wave_period) {
        const swellHeight = marineData.hourly.swell_wave_height[i] ?? 0;
        const swellDirection = marineData.hourly.swell_wave_direction[i] ?? 0;
        const swellPeriod = marineData.hourly.swell_wave_period[i] ?? 0;
        
        // 🚨 MUDANÇA CRÍTICA: Adicionar swell secundário SEMPRE, mesmo se altura = 0
        // Isso permite ver no log se ele existe mas está sendo filtrado
        availableSwells.push({
          height: swellHeight,
          direction: swellDirection,
          period: swellPeriod,
          source: 'secondary'
        });
      }
      
      // Wind wave (ondas vagas geradas pelo vento local)
      if (marineData.hourly.wind_wave_height && marineData.hourly.wind_wave_direction && marineData.hourly.wind_wave_period) {
        const windWaveHeight = marineData.hourly.wind_wave_height[i] ?? 0;
        const windWaveDirection = marineData.hourly.wind_wave_direction[i] ?? 0;
        const windWavePeriod = marineData.hourly.wind_wave_period[i] ?? 0;
        
        // 🚨 MUDANÇA CRÍTICA: Adicionar wind waves SEMPRE, mesmo se altura = 0
        // Wind waves do quadrante Sul devem ter prioridade sobre swells bloqueados de Leste
        availableSwells.push({
          height: windWaveHeight,
          direction: windWaveDirection,
          period: windWavePeriod,
          source: 'wind'
        });
      }
      
      // 🧠 SELEÇÃO DE SWELL: Inteligente (com bloqueios) ou Simples COM FILTRO GEOGRÁFICO
      const isPalanque = spotId === 'sc-floripa-campeche-4';
      const isLombaSabao = spotId === 'sc-floripa-campeche-1'; // 🔧 LOMBA DO SABÃO
      const isPontaDasCanas = spotId === 'sc-floripa-pontacanas-1';
      const isBaiaNorte = spotId === 'sc-floripa-bomjesus-1' || spotId === 'sc-floripa-jurere-1' || spotId === 'sc-floripa-jurere-2' || spotId === 'sc-floripa-daniela-1' || spotId === 'sc-floripa-forte-1';
      let selectedSwell: SwellData | null = null;
      let smartSelection: any = null;
      
      // 🚨 LOG ANTES DA SELEÇÃO: Ver swells disponíveis ANTES de filtrar
      if ((isPalanque || isLombaSabao || isPontaDasCanas || isBaiaNorte) && i < 30) {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const day = date.getDate();
        const spotName = isPalanque ? 'PALANQUE' : isLombaSabao ? 'LOMBA DO SABÃO' : isPontaDasCanas ? 'PONTA DAS CANAS' : 'BAÍA NORTE';
        console.log(`\n🔎 ${spotName} [Dia ${day}, ${hour}:00h] - SWELLS ANTES DA SELEÇÃO:`);
        console.log(`   Total de swells: ${availableSwells.length}`);
        availableSwells.forEach(s => {
          console.log(`   ${s.source.padEnd(9)}: ${s.height.toFixed(3)}m @ ${s.direction.toFixed(0)}° (${degreesToDirection(s.direction)}) @ ${s.period.toFixed(1)}s`);
        });
      }
      
      // 🗺️ PRÉ-FILTRO GEOGRÁFICO ATIVO
      // Filtra swells ANTES da seleção usando calculateGeographyMultipliers
      // Swells com fator < 0.05 (bloqueio >= 95%) são considerados impossíveis
      let validSwells = availableSwells;
      
      if (geographyData.features.length > 0) {
        validSwells = availableSwells.map(swell => {
          const multipliers = calculateGeographyMultipliers(
            geographyData.features,
            geographyData.staticFeatures || [], // 🔒 PROTEÇÃO: Fallback para array vazio
            finalOrientation,
            swell.direction,
            0 // windDirection não importa para swell
          );
          
          // Se swell é reduzido para menos de 5% (bloqueio >= 95%), é impossível
          const isBlocked = multipliers.swellHeightFactor < 0.05;
          
          if ((isPalanque || isLombaSabao || isPontaDasCanas || isBaiaNorte) && i < 30) {
            if (isBlocked) {
              console.log(`   🛡️ BLOQUEADO: ${swell.source} ${swell.height.toFixed(2)}m @ ${swell.direction}° (${degreesToDirection(swell.direction)}) - fator=${multipliers.swellHeightFactor.toFixed(2)}`);
            } else if (multipliers.swellHeightFactor < 1.0) {
              const originalHeight = swell.height;
              const reducedHeight = originalHeight * multipliers.swellHeightFactor;
              console.log(`   🔧 REDUÇÃO PARCIAL: ${swell.source} ${originalHeight.toFixed(2)}m → ${reducedHeight.toFixed(2)}m @ ${swell.direction}° (${degreesToDirection(swell.direction)}) - fator=${multipliers.swellHeightFactor.toFixed(2)}`);
            } else {
              console.log(`   ✅ PASSA: ${swell.source} ${swell.height.toFixed(2)}m @ ${swell.direction}° (${degreesToDirection(swell.direction)}) - fator=${multipliers.swellHeightFactor.toFixed(2)}`);
            }
          }
          
          // 🔧 APLICAR REDUÇÃO PARCIAL na altura do swell
          return {
            ...swell,
            height: swell.height * multipliers.swellHeightFactor,
            isBlocked: isBlocked
          };
        }).filter(swell => !swell.isBlocked); // Remover swells bloqueados
        
        if ((isPalanque || isLombaSabao || isPontaDasCanas || isBaiaNorte) && i < 30) {
          const spotName = isPalanque ? 'PALANQUE' : isLombaSabao ? 'LOMBA DO SABÃO' : isPontaDasCanas ? 'PONTA DAS CANAS' : 'BAÍA NORTE';
          console.log(`\n🔍 ${spotName} - FILTRAGEM GEOGRÁFICA - RESUMO:`);
          console.log(`   Swells originais: ${availableSwells.length}`);
          console.log(`   Swells válidos (passaram): ${validSwells.length}`);
          console.log(`   Swells bloqueados: ${availableSwells.length - validSwells.length}`);
          
          if (validSwells.length > 0) {
            console.log(`\n   📊 Swells VÁLIDOS para seleção:`);
            validSwells.forEach(s => {
              console.log(`      ${s.source.padEnd(9)}: ${s.height.toFixed(2)}m @ ${s.direction}° (${degreesToDirection(s.direction)})`);
            });
          } else {
            console.log(`   ⚠️ NENHUM swell passou no filtro geográfico!`);
          }
        }
      }
      
      if (ENABLE_SMART_SWELL_SELECTOR) {
        // 🧠 SELEÇÃO INTELIGENTE: Considera proteções geográficas
        // Se o pico tem proteção de Leste (ex: Ilha do Campeche), swells de Leste são filtrados
        smartSelection = selectSmartSwell(
          validSwells, // Usar apenas swells válidos
          spotId || 'unknown',
          latitude,
          longitude,
          finalOrientation,
          isPalanque && i < 30 // showLog no Palanque nas primeiras 30 horas
        );
        selectedSwell = smartSelection.selectedSwell;
        
        // 🔍 DEBUG CRÍTICO: Confirmar recebimento
        if (isPalanque && i < 30) {
          const date = new Date(timestamp);
          console.log(`\n🔍 RECEBIDO DE selectSmartSwell [${date.getDate()}/${date.getHours()}:00h]:`);
          console.log(`   smartSelection.selectedSwell = ${smartSelection.selectedSwell ? smartSelection.selectedSwell.source : 'NULL'}`);
          console.log(`   selectedSwell (após atribuição) = ${selectedSwell ? selectedSwell.source : 'NULL'}`);
        }
      } else {
        // 📊 SELEÇÃO SIMPLES COM FILTRO GEOGRÁFICO: Maior swell ENTRE OS VÁLIDOS
        if (validSwells.length > 0) {
          // Ordenar por altura e pegar o maior ENTRE OS SWELLS VÁLIDOS
          const sortedSwells = [...validSwells].sort((a, b) => b.height - a.height);
          selectedSwell = sortedSwells[0];
          
          if (isPalanque && i < 30) {
            console.log(`\n🔵 SELEÇÃO SIMPLES + FILTRO GEOGRÁFICO`);
            console.log(`   Swells válidos: ${validSwells.length}`);
            console.log(`   Selecionado: ${selectedSwell.source} - ${selectedSwell.height.toFixed(2)}m @ ${selectedSwell.direction}° (${degreesToDirection(selectedSwell.direction)})`);
          }
        } else {
          if (isPalanque && i < 30) {
            console.log(`\n⚠️ NENHUM SWELL VÁLIDO (todos bloqueados)`);
          }
        }
      }
      
      // 🚨 LOG CRÍTICO: Verificar se seleção está funcionando
      // Palanque = sc-floripa-campeche-4
      // LOGAR TODAS AS HORAS para identificar o problema
      if (spotId && spotId === 'sc-floripa-campeche-4' && i < 30) {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const day = date.getDate();
        const modeLabel = ENABLE_SMART_SWELL_SELECTOR ? '🧠 INTELIGENTE' : '📊 SIMPLES';
        console.log(`\n🚨 DEBUG PALANQUE [${modeLabel}] - ${spotId} [Dia ${day}, ${hour}:00h]:`)
        console.log(`   Swells disponíveis: ${availableSwells.length}`);
        console.log(`   Swell selecionado: ${selectedSwell ? selectedSwell.source : 'NULL'}`);
        if (selectedSwell) {
          console.log(`   ✅ Altura: ${selectedSwell.height.toFixed(2)}m`);
          console.log(`   ✅ Direção: ${selectedSwell.direction}° (${degreesToDirection(selectedSwell.direction)})`);
        } else {
          console.log(`   ❌ SELECTEDSWELL É NULL!`);
        }
        
        // Logs específicos do modo inteligente
        if (ENABLE_SMART_SWELL_SELECTOR && smartSelection) {
          console.log(`   Swells bloqueados: ${smartSelection.blockedSwells.length}`);
          if (smartSelection.blockedSwells.length > 0) {
            smartSelection.blockedSwells.forEach(blocked => {
              console.log(`   ❌ Bloqueado: ${blocked.source} - ${blocked.height.toFixed(2)}m @ ${blocked.direction}° (${degreesToDirection(blocked.direction)})`);
            });
          }
        }
      }
      
      // Usar o swell selecionado
      // 🚨 MUDANÇA CRÍTICA: Se selectedSwell é null (todos bloqueados), zerar ondas
      // NÃO usar fallback combinedHeight pois pode ser de direção bloqueada
      let waveHeight = selectedSwell?.height ?? 0;
      let wavePeriod = selectedSwell?.period ?? 0;
      
      // 📊 SALVAR OFFSHORE RAW (antes de qualquer correção)
      const offshoreHeight = waveHeight;
      
      // 🎯 DIREÇÃO: Se não há swell selecionado (todos bloqueados), usar a direção
      // do swell NÃO-BLOQUEADO com maior altura, ou se todos bloqueados, usar
      // a direção do maior swell bloqueado (para mostrar de onde VIRIA a onda)
      let waveDirection = finalOrientation; // Padrão
      
      if (selectedSwell) {
        // Caso normal: usar direção do swell selecionado
        waveDirection = selectedSwell.direction;
      } else if (ENABLE_SMART_SWELL_SELECTOR && smartSelection) {
        // Caso especial: todos swells bloqueados ou removidos
        // Usar direção do maior swell NÃO-BLOQUEADO se existir
        if (smartSelection.unblockedSwells && smartSelection.unblockedSwells.length > 0) {
          const largestUnblocked = [...smartSelection.unblockedSwells].sort((a, b) => b.height - a.height)[0];
          waveDirection = largestUnblocked.direction;
        } else if (smartSelection.blockedSwells && smartSelection.blockedSwells.length > 0) {
          // Todos bloqueados: usar direção do maior bloqueado (para debug/info)
          const largestBlocked = [...smartSelection.blockedSwells].sort((a, b) => b.height - a.height)[0];
          waveDirection = largestBlocked.direction;
        }
        // Se não há nem bloqueados nem desbloqueados, manter finalOrientation
      }
      
      // �� DEBUG CRÍTICO: Verificar resultado da seleção
      // LOGAR TODAS AS HORAS para identificar o problema
      if (spotId === 'sc-floripa-campeche-4' && i < 30) {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const day = date.getDate();
        if (!selectedSwell) {
          const reason = ENABLE_SMART_SWELL_SELECTOR ? 'TODOS OS SWELLS BLOQUEADOS!' : 'SEM SWELLS DISPONÍVEIS!';
          console.log(`\n⚠️ PALANQUE [Dia ${day}, ${hour}:00h]: ${reason}`);
          console.log(`   selectedSwell é NULL`);
          console.log(`   Swells disponíveis: ${availableSwells.length}`);
          if (ENABLE_SMART_SWELL_SELECTOR && smartSelection) {
            console.log(`   Swells bloqueados: ${smartSelection.blockedSwells.length}`);
          }
          console.log(`   🔴 Zerando ondas (waveHeight = 0m)`);
        } else {
          console.log(`\n✅ PALANQUE [Dia ${day}, ${hour}:00h]: Usando selectedSwell`);
          console.log(`   ${selectedSwell.source}: ${selectedSwell.height.toFixed(2)}m @ ${selectedSwell.direction}°`);
        }
        console.log(`   waveHeight FINAL ANTES GEOGRAPHY: ${waveHeight.toFixed(2)}m @ ${waveDirection}° (${degreesToDirection(waveDirection)})`);
      }
      
      let windSpeed = weatherData.hourly.wind_speed_10m[weatherIdx] ?? 0;
      let windDirection = weatherData.hourly.wind_direction_10m[weatherIdx] ?? 0;
      
      // 🌊 APLICAR AJUSTE COSTA/OCEANO (GEBCO - versão simplificada)
      if (ENABLE_COAST_ADJUSTMENT) {
        try {
          // 🚨 LOG ESPECIAL LOMBA DO SABÃO
          if (spotId === 'sc-floripa-campeche-5' && i === 0) {
            console.log(`\n\n🏖️🏖️🏖️ LOMBA DO SABÃO DETECTADA 🏖️🏖️🏖️`);
            console.log(`   Latitude: ${latitude}`);
            console.log(`   Longitude: ${longitude}`);
            console.log(`   Altura ANTES do GEBCO: ${waveHeight.toFixed(2)}m`);
            console.log(`   Sistema GEBCO: ${ENABLE_COAST_ADJUSTMENT ? 'ATIVADO ✅' : 'DESATIVADO ❌'}`);
          }
          
          const correction = await correctWaveHeightForCoast(
            waveHeight,
            latitude,
            longitude,
            wavePeriod
          );
          
          if (correction.appliedCorrection) {
            console.log(`\n🌊 GEBCO: Ajuste costa/oceano aplicado`);
            console.log(`   Altura: ${correction.originalHeight.toFixed(2)}m → ${correction.correctedHeight.toFixed(2)}m (×${correction.shoalingFactor.toFixed(2)})`);
            console.log(`   Profundidade: ${correction.depth.toFixed(1)}m`);
            
            waveHeight = correction.correctedHeight;
            
            // 🚨 LOG ESPECIAL LOMBA DO SABÃO
            if (spotId === 'sc-floripa-campeche-5' && i === 0) {
              console.log(`\n🏖️ LOMBA DO SABÃO - APÓS GEBCO:`);
              console.log(`   Altura DEPOIS do GEBCO: ${waveHeight.toFixed(2)}m`);
              console.log(`   Fator de shoaling: ×${correction.shoalingFactor.toFixed(2)}`);
              console.log(`   Profundidade: ${correction.depth.toFixed(1)}m`);
            }
          } else {
            console.log(`\n🌊 GEBCO: Sem correção (águas profundas > 50m)`);
            
            // 🚨 LOG ESPECIAL LOMBA DO SABÃO
            if (spotId === 'sc-floripa-campeche-5' && i === 0) {
              console.log(`\n🏖️ LOMBA DO SABÃO - GEBCO NÃO APLICOU CORREÇÃO:`);
              console.log(`   Profundidade: ${correction.depth.toFixed(1)}m`);
              console.log(`   Altura mantida: ${waveHeight.toFixed(2)}m`);
            }
          }
        } catch (error) {
          console.error(`⚠️ Erro ao aplicar ajuste GEBCO:`, error);
          
          // 🚨 LOG ESPECIAL LOMBA DO SABÃO
          if (spotId === 'sc-floripa-campeche-5' && i === 0) {
            console.error(`\n🏖️ LOMBA DO SABÃO - ERRO NO GEBCO:`, error);
          }
        }
      }
      
      // ════════════════════════════════════════════════════════════��══════════
      // 🎯 AJUSTES DE ALTURA POR PICO (SISTEMA v1.0)
      // ═══════════════════════════════════════════════════════════════════════
      // Aplica fatores de shoaling e proteção específicos por pico
      // para capturar diferenças entre praias próximas (ex: Lomba vs Morro)
      // DESABILITAR TEMPORARIAMENTE PARA COMPARAÇÃO: false
      // ═══════════════════════════════════════════════════════════════════════
      // 🌊 PNBOIA BIAS CORRECTION (v2.0 - CORRIGIDO)
      // ═══════════════════════════════════════════════════════════════════════
      // APLICA EM TODAS AS HORAS, NÃO APENAS NA PRIMEIRA!
      let biasCorrected = false;
      let biasCorrectionInfo = null;
      let buoyHeight = offshoreHeight; // 📊 COMEÇA COM OFFSHORE (não modificado)
      let buoyId = 'N/A'; // 📊 SALVAR ID da boia
      
      if (ENABLE_PNBOIA_BIAS_CORRECTION && pnboiaData && pnboiaData.available) {
        try {
          const correctionResult = applyBiasCorrection(waveHeight, waveDirection, wavePeriod, pnboiaData);
          if (correctionResult && correctionResult.correction.confidence > 0.3) {
            const originalHeight = waveHeight;
            waveHeight = correctionResult.corrected.height;
            waveDirection = correctionResult.corrected.direction;
            wavePeriod = correctionResult.corrected.period;
            biasCorrected = true;
            biasCorrectionInfo = {
              buoyName: correctionResult.correction.buoyName,
              heightFactor: correctionResult.correction.heightFactor,
              confidence: correctionResult.correction.confidence
            };
            
            // 📊 SALVAR altura corrigida pela boia (APÓS aplicar fator de correção ao OFFSHORE)
            buoyHeight = offshoreHeight * biasCorrectionInfo.heightFactor;
            buoyId = biasCorrectionInfo.buoyName;
            
            // Log apenas na primeira hora
            if (i === 0) {
              console.log(`\n🎯 PNBOIA Bias Correction ATIVO:`);
              console.log(`   Boia: ${biasCorrectionInfo.buoyName}`);
              console.log(`   Offshore: ${offshoreHeight.toFixed(2)}m`);
              console.log(`   Boia corrigida: ${buoyHeight.toFixed(2)}m (×${biasCorrectionInfo.heightFactor.toFixed(2)})`);
              console.log(`   Wave height após PNBOIA: ${waveHeight.toFixed(2)}m`);
              console.log(`   Confiança: ${(biasCorrectionInfo.confidence * 100).toFixed(0)}%`);
              console.log(`   ✅ Aplicado em TODAS as ${marineData.hourly.time.length} horas\n`);
            }
          } else {
            // Sem correção PNBOIA (baixa confiança), buoyHeight = offshore
            buoyHeight = offshoreHeight;
            if (i === 0) {
              console.log(`\n⚠️ PNBOIA: Correção não aplicada (confiança < 30%)`);
            }
          }
        } catch (error) {
          console.error(`⚠️ PNBOIA: Erro ao aplicar bias correction:`, error);
          buoyHeight = offshoreHeight; // Fallback: usar offshore
        }
      } else {
        // PNBOIA desativado ou sem dados, buoyHeight = offshore
        buoyHeight = offshoreHeight;
        if (i === 0) {
          console.log(`\n⚠️ PNBOIA: Bias Correction DESATIVADO ou sem dados disponíveis`);
        }
      }
      
      const ENABLE_SPOT_ADJUSTMENTS = true;
      
      if (ENABLE_SPOT_ADJUSTMENTS && spotId) {
        const heightBeforeAdjustments = waveHeight;
        const adjustment = getSpotAdjustmentHybrid(spotId); // v1.4: Sistema híbrido (manual + automático)
        
        if (adjustment) {
          const adjustmentResult = applyWaveAdjustments(spotId, waveHeight, waveDirection);
          waveHeight = adjustmentResult.adjustedHeight;
          
          // Log apenas na primeira iteração ou spots importantes
          const isImportantSpot = [
            'sc-floripa-campeche-5',  // Lomba do Sabão
            'sc-floripa-morropedras-1', // Morro das Pedras
            'sc-floripa-campeche-4',  // Palanque
            'sc-floripa-mole-1',      // Praia Mole
            'sc-floripa-joaquina-1',  // Joaquina
            'sc-floripa-acores-1',    // Açores
            'sc-floripa-armacao-1',   // Armação
            'sc-floripa-matadeiro-1'  // Matadeiro
          ].includes(spotId);
          
          if (i === 0 || (isImportantSpot && i < 5)) {
            console.log(`\n🎯 AJUSTES POR PICO - ${adjustmentResult.spotName}:`);
            console.log(`   Altura API+GEBCO: ${heightBeforeAdjustments.toFixed(2)}m`);
            console.log(`   Shoaling spot (×${adjustmentResult.shoalingFactor.toFixed(2)}): ${(heightBeforeAdjustments * adjustmentResult.shoalingFactor).toFixed(2)}m`);
            console.log(`   Direção ${Math.round(waveDirection)}° (×${adjustmentResult.directionMultiplier.toFixed(2)}): ${adjustmentResult.directionReason}`);
            console.log(`   ✅ ALTURA FINAL: ${waveHeight.toFixed(2)}m`);
            const percentChange = ((waveHeight / heightBeforeAdjustments - 1) * 100);
            console.log(`   📊 Variação: ${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(0)}%`);
          }
        }
      }
      
      // ═══════════════════════════════════════════════════════════════════════
      // 🎓 CALIBRAÇÃO AUTOMÁTICA (Sistema de Machine Learning)
      // ═══════════════════════════════════════════════════════════════════════
      // Aplica fatores de correção baseados em observações reais registradas
      // no Admin. Se o usuário registrou que ondas eram maiores/menores,
      // o sistema ajusta automaticamente as próximas previsões.
      // ═══════════════════════════════════════════════════════════════════════
      if (spotId && typeof window !== 'undefined') {
        try {
          const liveAdjustmentsModule = await import('../services/calibration/liveAdjustments');
          const calibrationResult = await liveAdjustmentsModule.applyCalibratedAdjustment(spotId, waveHeight);
          
          if (i === 0) {
            console.log(`\n🔍 CALIBRAÇÃO - Verificando ${spotId}:`);
            console.log(`   Resultado: ${calibrationResult.source}`);
            console.log(`   Fator: ${calibrationResult.factor}`);
          }
          
          if (calibrationResult.source === 'calibrated') {
            const originalHeight = waveHeight;
            waveHeight = calibrationResult.adjusted;
            
            if (i === 0) {
              console.log(`\n🎓 CALIBRAÇÃO ATIVA (Baseada em observações reais):`);
              console.log(`   Altura sem calibração: ${originalHeight.toFixed(2)}m`);
              console.log(`   Fator de calibração: ×${calibrationResult.factor.toFixed(3)}`);
              console.log(`   ✅ Altura calibrada: ${waveHeight.toFixed(2)}m`);
            }
          } else {
            if (i === 0) {
              console.log(`   ⚠️ Calibração não aplicada (${calibrationResult.source})`);
            }
          }
        } catch (error) {
          if (i === 0) {
            console.log(`   ❌ Erro ao carregar calibração:`, error);
          }
        }
      }
      
      // 🗺 APLICAR MULTIPLICADORES GEOGRÁFICOS
      if (geographyData.features.length > 0) {
        const multipliers = calculateGeographyMultipliers(
          geographyData.features,
          geographyData.staticFeatures || [], // 🔒 PROTEÇÃO: Fallback para array vazio
          finalOrientation,
          waveDirection,
          windDirection
        );
        
        // Aplicar ajustes de geografia
        const originalWaveHeight = waveHeight;
        const originalWindSpeed = windSpeed;
        
        waveHeight = waveHeight * multipliers.swellHeightFactor;
        wavePeriod = Math.round(wavePeriod * multipliers.swellPeriodFactor);
        windSpeed = windSpeed * multipliers.windSpeedFactor;
        windDirection = (windDirection + multipliers.windDirectionAdjustment + 360) % 360;
        
        // Log apenas se houve mudança significativa (primeira iteração)
        if (i === 0 && Math.abs(originalWaveHeight - waveHeight) > 0.1) {
          console.log(`\n🛡️ PROTEÇÃO GEOGRÁFICA ATIVA:`);
          console.log(`   🌊 Swell: ${originalWaveHeight.toFixed(1)}m → ${waveHeight.toFixed(1)}m (${(multipliers.swellHeightFactor * 100).toFixed(0)}%)`);
          console.log(`   💨 Vento: ${originalWindSpeed.toFixed(0)}km/h → ${windSpeed.toFixed(0)}km/h (${(multipliers.windSpeedFactor * 100).toFixed(0)}%)`);
          multipliers.explanation.forEach(exp => console.log(`   ${exp}`));
        }
        
        // 🚨 LOG EXTRA PALANQUE: Verificar se geography multiplier está zerando as ondas
        if (spotId && spotId === 'sc-floripa-campeche-4') {
          const hour = new Date(timestamp).getHours();
          console.log(`\n🛡️ DEBUG PALANQUE [${hour}h] - APÓS GEOGRAPHY MULTIPLIER:`);
          console.log(`   Original wave height: ${originalWaveHeight.toFixed(2)}m`);
          console.log(`   Final wave height: ${waveHeight.toFixed(2)}m`);
          console.log(`   Multiplier: ${multipliers.swellHeightFactor.toFixed(2)}`);
        }
      }
      
      // ═══════════════════════════════════════════════════════════════════════
      // 🎯 CALIBRAÇÃO GLOBAL (v1.5)
      // ═══════════════════════════════════════════════════════════════════════
      // Aplicado APÓS todos os ajustes (spot + geography) para calibrar
      // o sistema com base em observações reais de ondas
      const heightBeforeCalibration = waveHeight;
      waveHeight = waveHeight * GLOBAL_CALIBRATION_FACTOR;
      
      // Log na primeira hora e em spots importantes
      if (i === 0 && GLOBAL_CALIBRATION_FACTOR !== 1.0) {
        console.log(`\n🎯 CALIBRAÇÃO GLOBAL APLICADA:`);
        console.log(`   Fator: ×${GLOBAL_CALIBRATION_FACTOR} (${((1 - GLOBAL_CALIBRATION_FACTOR) * 100).toFixed(0)}% menor)`);
        console.log(`   Altura: ${heightBeforeCalibration.toFixed(2)}m → ${waveHeight.toFixed(2)}m`);
        console.log(`   📅 Ajuste baseado em observações de 30/10/2025`);
      }
      
      const windType = getWindType(windDirection, windSpeed, finalOrientation);
      
      // 🔍 DEBUG: Log antes de chamar getBestFor
      if (i === 0) {
        console.log(`\n🔍 VALORES ANTES DE getBestFor [Primeira hora]:`, {
          waveHeight,
          windSpeed,
          windType,
          wavePeriod
        });
      }
      
      const bestFor = getBestFor(waveHeight, windSpeed, windType, wavePeriod);
      const rating = calculateRating(waveHeight, windSpeed, windType);
      
      const date = new Date(timestamp);
      
      // 🚨 LOG FINAL PALANQUE: O que vai para o frontend
      if (spotId && spotId === 'sc-floripa-campeche-4') {
        const hour = new Date(timestamp).getHours();
        console.log(`\n📦 DEBUG PALANQUE [${hour}h] - DADOS FINAIS ENVIADOS AO FRONTEND:`);
        console.log(`   Antes calibração: ${heightBeforeCalibration.toFixed(2)}m`);
        console.log(`   Após calibração (×${GLOBAL_CALIBRATION_FACTOR}): ${Math.round(waveHeight * 10) / 10}m`);
        console.log(`   Direção: ${waveDirection}° (${degreesToDirection(waveDirection)})`);
        console.log(`   Período: ${Math.round(wavePeriod)}s`);
        console.log(`   Vento: ${Math.round(windSpeed)}km/h ${windType}`);
        console.log(`   BestFor: ${bestFor.join(', ')}`);
      }
      
      // 🔍 DEBUG DATA para Palanque e Matadeiro
      const isDebugSpot = spotId === 'sc-floripa-campeche-4' || spotId === 'sc-floripa-matadeiro-1';
      let debugData = undefined;
      
      if (isDebugSpot) {
        const date = new Date(timestamp);
        const hourLabel = `${date.toLocaleDateString('pt-BR', { 
          weekday: 'short', 
          day: '2-digit', 
          month: '2-digit' 
        })} ${date.getHours().toString().padStart(2, '0')}:00`;
        
        debugData = {
          timestamp,
          hourLabel,
          apiData: {
            combined: {
              height: combinedHeight,
              direction: combinedDirection,
              period: combinedPeriod
            },
            primary: {
              height: combinedHeight,
              direction: combinedDirection,
              period: combinedPeriod
            },
            secondary: {
              height: marineData.hourly.swell_wave_height?.[i] ?? 0,
              direction: marineData.hourly.swell_wave_direction?.[i] ?? 0,
              period: marineData.hourly.swell_wave_period?.[i] ?? 0
            },
            wind: {
              height: marineData.hourly.wind_wave_height?.[i] ?? 0,
              direction: marineData.hourly.wind_wave_direction?.[i] ?? 0,
              period: marineData.hourly.wind_wave_period?.[i] ?? 0
            }
          },
          selection: {
            mode: ENABLE_SMART_SWELL_SELECTOR ? 'inteligente' : 'simples',
            totalSwells: availableSwells.length,
            validSwells: validSwells.length,
            blockedSwells: [],
            unblockedSwells: [],
            selected: selectedSwell ? {
              source: selectedSwell.source,
              height: selectedSwell.height,
              direction: selectedSwell.direction,
              directionName: degreesToDirection(selectedSwell.direction),
              period: selectedSwell.period
            } : null
          },
          geography: {
            applied: false,
            heightBefore: waveHeight,
            heightAfter: waveHeight,
            multiplier: 1,
            features: []
          },
          final: {
            height: waveHeight,
            direction: waveDirection,
            directionName: degreesToDirection(waveDirection),
            period: wavePeriod,
            classification: bestFor.join(', ')
          },
          // 🔍 NOVO: Dados para debug visual do bloqueio
          availableSwells: availableSwells.map(s => ({
            source: s.source,
            height: s.height,
            direction: s.direction,
            period: s.period
          })),
          selectedSwell: selectedSwell ? {
            source: selectedSwell.source,
            height: selectedSwell.height,
            direction: selectedSwell.direction,
            period: selectedSwell.period
          } : undefined,
          // 🔍 Análise de bloqueio da Ilha do Campeche (apenas para Palanque)
          blockageAnalysis: isPalanque && selectedSwell ? (() => {
            const protectedDirs = [75, 80, 85, 90, 95, 100]; // CORRIGIDO: Removido 105°
            const tolerance = 10;
            let blocked = false;
            let minDiff = 999;
            
            for (const protectedDir of protectedDirs) {
              const diff = Math.abs(selectedSwell.direction - protectedDir);
              const normalizedDiff = diff > 180 ? 360 - diff : diff;
              minDiff = Math.min(minDiff, normalizedDiff);
              if (normalizedDiff <= tolerance) {
                blocked = true;
                break;
              }
            }
            
            const reason = blocked 
              ? `Swell de ${selectedSwell.direction}° está dentro do range de bloqueio (65-110°)`
              : `Swell de ${selectedSwell.direction}° está FORA do range de bloqueio (65-110°)`;
            
            return {
              swellDirection: selectedSwell.direction,
              blocked,
              protectedDirections: protectedDirs,
              minDiff,
              reason
            };
          })() : undefined
        };
      }
      
      // 🔍 LOG DETALHADO: Valores antes de salvar (primeira hora)
      if (i === 0 && spotId) {
        console.log(`\n📊 VALORES SALVOS NO HOURLY FORECAST (${spotId}):`);
        console.log(`   Offshore RAW: ${offshoreHeight.toFixed(2)}m`);
        console.log(`   Buoy Height: ${buoyHeight.toFixed(2)}m (${buoyId})`);
        console.log(`   Wave Height FINAL: ${waveHeight.toFixed(2)}m`);
        console.log(`   Bias Corrected: ${biasCorrected}`);
        console.log(`   Bias Info:`, biasCorrectionInfo);
      }
      
      const hourlyEntry = {
        time: timestamp,
        hour: date.getHours(),
        waveHeight: Math.round(waveHeight * 10) / 10, // Arredondar para 1 casa decimal
        wavePeriod: Math.round(wavePeriod),
        waveDirection,
        windSpeed: Math.round(windSpeed),
        windDirection,
        windType,
        waterTemp: 22, // Placeholder
        tide: 'subindo', // Placeholder
        tideHeight: 1.5, // Placeholder
        bestFor,
        rating,
        biasCorrected, // PNBOIA v2.0
        // 📊 DADOS INTERMEDIÁRIOS (para observações no admin)
        offshoreHeight: Math.round(offshoreHeight * 100) / 100, // Offshore RAW
        buoyHeight: Math.round(buoyHeight * 100) / 100, // Após PNBOIA
        buoyId, // ID da boia usada
        biasCorrection: biasCorrectionInfo, // PNBOIA v2.0
        debugData,
        // 🔍 DEBUG ESPECÍFICO DO PALANQUE: Incluir TODOS os swells detectados
        palanqueDebug: isPalanque ? {
          primarySwell: availableSwells.find(s => s.source === 'primary') ? {
            direction: availableSwells.find(s => s.source === 'primary')!.direction,
            height: availableSwells.find(s => s.source === 'primary')!.height,
            period: availableSwells.find(s => s.source === 'primary')!.period
          } : undefined,
          secondarySwell: availableSwells.find(s => s.source === 'secondary') ? {
            direction: availableSwells.find(s => s.source === 'secondary')!.direction,
            height: availableSwells.find(s => s.source === 'secondary')!.height,
            period: availableSwells.find(s => s.source === 'secondary')!.period
          } : undefined,
          tertiarySwell: availableSwells.find(s => s.source === 'tertiary') ? {
            direction: availableSwells.find(s => s.source === 'tertiary')!.direction,
            height: availableSwells.find(s => s.source === 'tertiary')!.height,
            period: availableSwells.find(s => s.source === 'tertiary')!.period
          } : undefined,
          windWaves: availableSwells.find(s => s.source === 'wind') ? {
            direction: availableSwells.find(s => s.source === 'wind')!.direction,
            height: availableSwells.find(s => s.source === 'wind')!.height,
            period: availableSwells.find(s => s.source === 'wind')!.period
          } : undefined,
          selectedSwell: selectedSwell ? {
            direction: selectedSwell.direction,
            height: selectedSwell.height,
            period: selectedSwell.period
          } : undefined,
          beachOrientation: finalOrientation,
          acceptanceRange: {
            min: (finalOrientation - 90 + 360) % 360,
            max: (finalOrientation + 90) % 360
          },
          blockageRange: (geographyData.staticFeatures || []).some((f: any) => f.name === 'Ilha do Campeche') ? {
            min: 75,  // ENE - bloqueia apenas Leste puro, não Sudeste
            max: 115  // ESE - SE (135°) fica LIVRE
          } : undefined
        } : undefined
      };
      
      // 🔍 LOG CRÍTICO: Ver o objeto ANTES de adicionar ao array (primeira hora)
      if (i === 0 && spotId) {
        console.log(`\n🔍 OBJETO HOURLY CRIADO (primeira hora):`, {
          time: hourlyEntry.time,
          waveHeight: hourlyEntry.waveHeight,
          offshoreHeight: hourlyEntry.offshoreHeight,
          buoyHeight: hourlyEntry.buoyHeight,
          buoyId: hourlyEntry.buoyId,
          biasCorrected: hourlyEntry.biasCorrected
        });
      }
      
      hourlyForecasts.push(hourlyEntry);
    }
    
    console.log(`✅ Processados ${hourlyForecasts.length} registros horários`);
    
    // ===== FILTRAR HORÁRIOS BASEADO NA DATA SELECIONADA =====
    let futureHourlyForecasts: HourlyForecast[];
    
    if (selectedDate) {
      // Se uma data específica foi selecionada, retornar TODAS as 24h daquele dia
      futureHourlyForecasts = hourlyForecasts.filter(forecast => 
        forecast.time.startsWith(selectedDate)
      );
      console.log(`✅ Filtrados ${futureHourlyForecasts.length} horários para o dia ${selectedDate}`);
    } else {
      // Caso contrário, filtrar apenas horários futuros (a partir de agora)
      const now = new Date();
      const saoPauloNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
      
      futureHourlyForecasts = hourlyForecasts.filter(forecast => {
        const forecastTime = new Date(forecast.time);
        return forecastTime >= saoPauloNow;
      });
      
      console.log(`✅ Filtrados ${futureHourlyForecasts.length} horários futuros (a partir de ${saoPauloNow.getHours()}:00)`);
    }
    
    // ===== PROCESSAR DADOS DIÁRIOS =====
    
    const dailyForecasts: DailyForecast[] = [];
    
    for (let dayIdx = 0; dayIdx < marineData.daily.time.length; dayIdx++) {
      const dailyDate = marineData.daily.time[dayIdx];
      const dateStr = dailyDate.substring(0, 10); // YYYY-MM-DD
      
      // Filtrar horas deste dia
      const dayHours = hourlyForecasts.filter(h => h.time.startsWith(dateStr));
      
      if (dayHours.length === 0) continue;
      
      // Calcular estatísticas
      const waveHeights = dayHours.map(h => h.waveHeight);
      const wavePeriods = dayHours.map(h => h.wavePeriod);
      const waveDirections = dayHours.map(h => h.waveDirection);
      const windSpeeds = dayHours.map(h => h.windSpeed);
      const windDirections = dayHours.map(h => h.windDirection);
      
      const waveHeightMin = Math.round(Math.min(...waveHeights) * 10) / 10;
      const waveHeightMax = Math.round(Math.max(...waveHeights) * 10) / 10;
      const wavePeriodAvg = Math.round(wavePeriods.reduce((a, b) => a + b, 0) / wavePeriods.length);
      
      // 🎯 DIREÇÃO DE ONDA: Usar direção DOMINANTE (mais frequente) ao invés de média
      // Média matemática de ângulos causa erros lógicos: Sul (180°) + Nordeste (45°) ≠ Leste
      // ✅ INCLUIR TODOS OS HORÁRIOS: Mesmo swells bloqueados (waveHeight ~0) são considerados
      // Isso garante que a direção mostrada reflita o que realmente está vindo, mesmo que bloqueado
      const allHours = dayHours; // Usar TODOS os horários (incluindo bloqueados)
      
      let dominantWaveDirection: string;
      
      if (allHours.length > 0) {
        // Calcular direção dominante de TODOS os horários (incluindo bloqueados)
        const allDirections = allHours.map(h => degreesToDirection(h.waveDirection));
        const waveDirectionCounts: Record<string, number> = {};
        allDirections.forEach(dir => {
          waveDirectionCounts[dir] = (waveDirectionCounts[dir] || 0) + 1;
        });
        dominantWaveDirection = Object.entries(waveDirectionCounts)
          .sort(([, a], [, b]) => b - a)[0][0];
      } else {
        // Nenhum horário disponvel: usar orientação da praia
        dominantWaveDirection = degreesToDirection(finalOrientation);
      }
      
      // Converter de volta para graus para manter compatibilidade com waveDirectionAvg
      const directionToDegreesMap: Record<string, number> = {
        'Norte': 0, 'Nordeste': 45, 'Leste': 90, 'Sudeste': 135,
        'Sul': 180, 'Sudoeste': 225, 'Oeste': 270, 'Noroeste': 315
      };
      const waveDirectionAvg = directionToDegreesMap[dominantWaveDirection];
      
      const windSpeedAvg = Math.round(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length);
      const windSpeedMax = Math.round(Math.max(...windSpeeds));
      const windDirectionAvg = circularMean(windDirections);
      
      // Tipo de vento predominante
      const windTypes = dayHours.map(h => h.windType);
      const windTypeCounts: Record<string, number> = {};
      windTypes.forEach(type => {
        windTypeCounts[type] = (windTypeCounts[type] || 0) + 1;
      });
      const predominantWindType = Object.entries(windTypeCounts)
        .sort(([, a], [, b]) => b - a)[0][0];
      
      // Melhor horário para cada nível
      const beginnerHours = dayHours.filter(h => h.bestFor.includes('beginner'));
      const intermediateHours = dayHours.filter(h => h.bestFor.includes('intermediate'));
      const advancedHours = dayHours.filter(h => h.bestFor.includes('advanced'));
      
      const bestTimeForBeginner = beginnerHours[0]?.hour.toString().padStart(2, '0') + ':00';
      const bestTimeForIntermediate = intermediateHours[0]?.hour.toString().padStart(2, '0') + ':00';
      const bestTimeForAdvanced = advancedHours[0]?.hour.toString().padStart(2, '0') + ':00';
      
      // Rating e bestFor do dia
      const ratings = dayHours.map(h => h.rating);
      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      
      // Contar horários "Sem Surf" vs surfáveis
      const nosurfHours = dayHours.filter(h => h.bestFor.includes('nosurf'));
      const surfableHours = dayHours.filter(h => !h.bestFor.includes('nosurf'));
      const nosurfPercentage = (nosurfHours.length / dayHours.length) * 100;
      
      // Só mostrar "Sem Surf" se TODOS os horários forem sem surf (100%)
      let bestFor: ("beginner" | "intermediate" | "advanced" | "nosurf")[];
      
      if (nosurfPercentage === 100) {
        // TODOS os horários são "Sem Surf" - mostrar apenas isso
        bestFor = ['nosurf'];
      } else {
        // Pelo menos 1 horário é surfável - mostrar apenas níveis surfáveis
        const allSurfableLevels = new Set<"beginner" | "intermediate" | "advanced">();
        surfableHours.forEach(h => {
          h.bestFor.forEach(level => {
            if (level !== 'nosurf') {
              allSurfableLevels.add(level);
            }
          });
        });
        bestFor = Array.from(allSurfableLevels);
        
        // Se não sobrou nenhum nível (edge case), usar intermediário como fallback
        if (bestFor.length === 0) {
          bestFor = ['intermediate'];
        }
      }
      
      // 🚨 DEBUG PALANQUE: Verificar dados diários
      if (spotId === 'sc-floripa-campeche-4') {
        console.log(`\n📅 DEBUG PALANQUE - PREVISÃO DIÁRIA ${dateStr}:`);
        const surfableCount = dayHours.filter(h => h.waveHeight > 0.2).length;
        const blockedCount = dayHours.filter(h => h.waveHeight <= 0.2).length;
        console.log(`   ${dayHours.length} horários totais | ${surfableCount} surfáveis (>0.2m) | ${blockedCount} bloqueados (≤0.2m)`);
        console.log(`   Altura min/max: ${waveHeightMin}m / ${waveHeightMax}m`);
        console.log(`   🎯 Direção DOMINANTE (TODOS os horários incluindo bloqueados): ${dominantWaveDirection} (${waveDirectionAvg}°)`);
        console.log(`   Primeiros 3 horários:`);
        dayHours.slice(0, 3).forEach(h => {
          const status = h.waveHeight <= 0.2 ? '🛡️ BLOQUEADO' : '✅';
          console.log(`      ${h.hour}:00 - ${h.waveHeight}m @ ${h.waveDirection}° (${degreesToDirection(h.waveDirection)}) ${status}`);
        });
      }
      
      dailyForecasts.push({
        date: dailyDate,
        dayName: getDayName(dailyDate, dayIdx),
        waveHeightMin,
        waveHeightMax,
        wavePeriodAvg,
        waveDirectionAvg,
        waveDirection: degreesToDirection(waveDirectionAvg),
        windSpeedAvg,
        windSpeedMax,
        windDirectionAvg,
        windDirection: degreesToDirection(windDirectionAvg),
        windType: predominantWindType,
        bestFor,
        rating: Math.round(avgRating * 10) / 10,
        bestTimeForBeginner,
        bestTimeForIntermediate,
        bestTimeForAdvanced
      });
    }
    
    console.log(`✅ Processados ${dailyForecasts.length} dias`);
    
    // ===== CONDIÇÕES ATUAIS =====
    
    // Verificar se temos dados válidos
    if (!futureHourlyForecasts || futureHourlyForecasts.length === 0) {
      console.error('❌ Nenhum dado horário disponível após filtragem');
      throw new Error('Nenhum dado de previsão disponível');
    }
    
    const currentHour = futureHourlyForecasts[0];
    
    // Validar que currentHour tem todas as propriedades necessárias
    if (!currentHour || typeof currentHour.waveHeight === 'undefined') {
      console.error('❌ Dados do horário atual inválidos:', currentHour);
      throw new Error('Dados de previsão corrompidos');
    }
    
    const current: WaveConditions = {
      height: currentHour.waveHeight,
      period: currentHour.wavePeriod,
      direction: degreesToDirection(currentHour.waveDirection),
      windSpeed: Math.round(currentHour.windSpeed),
      windDirection: degreesToDirection(currentHour.windDirection),
      windType: currentHour.windType,
      tide: currentHour.tide,
      tideHeight: currentHour.tideHeight,
      waterTemp: currentHour.waterTemp,
      rating: currentHour.rating,
      timestamp: currentHour.time,
      biasCorrected: currentHour.biasCorrected, // PNBOIA v2.0
      biasCorrection: currentHour.biasCorrection // PNBOIA v2.0
    };
    
    console.log(`✅ Dados processados com sucesso!`);
    console.log(`📊 Retornando: ${futureHourlyForecasts.length} horários, ${dailyForecasts.length} dias\n`);
    
    // 🔍 LOG CRÍTICO: Ver os dados intermediários no RETORNO
    if (spotId && futureHourlyForecasts.length > 0) {
      console.log(`\n🔍 DADOS RETORNADOS (primeira hora):`, {
        time: futureHourlyForecasts[0].time,
        waveHeight: futureHourlyForecasts[0].waveHeight,
        offshoreHeight: futureHourlyForecasts[0].offshoreHeight,
        buoyHeight: futureHourlyForecasts[0].buoyHeight,
        buoyId: futureHourlyForecasts[0].buoyId
      });
    }
    
    return {
      current,
      hourly: futureHourlyForecasts,
      daily: dailyForecasts
    };
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
    console.error('❌ Stack:', error instanceof Error ? error.stack : 'N/A');
    throw error;
  }
}