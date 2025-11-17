/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PNBOIA API - INTEGRAÇÃO COM BOIAS DA MARINHA DO BRASIL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este módulo se comunica com o backend que faz scraping dos dados PNBOIA
 * (Programa Nacional de Boias da Marinha do Brasil)
 * 
 * Dados obtidos:
 * - Altura significativa de ondas (Hs) em tempo real
 * - Período de pico (Tp)
 * - Direção das ondas
 * - Velocidade e direção do vento
 * - Temperatura da água
 * 
 * Fluxo:
 * 1. Frontend chama getPNBOIAData(lat, lon)
 * 2. API encontra boia mais próxima
 * 3. Backend retorna dados em cache (atualizados de hora em hora)
 * 4. Frontend usa dados para bias correction
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { getNearestBuoy, type Buoy } from '../data/buoyLocations';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { 
  shouldUseVercel, 
  getVercelApiUrl, 
  logVercelUsage,
  VERCEL_TIMEOUT_MS 
} from './vercelConfig';

// ========================================
// TIPOS
// ========================================

export interface PNBOIAReading {
  timestamp: string; // ISO 8601
  waveHeight: number; // metros (Hs - altura significativa)
  wavePeriod: number; // segundos (Tp - período de pico)
  waveDirection: number; // graus (0-360, de onde vem)
  windSpeed: number; // km/h
  windDirection: number; // graus (0-360, de onde vem)
  waterTemp: number; // celsius
  buoyId: string;
  buoyName: string;
  isMockData?: boolean; // ⚠️ true = dados simulados, false/undefined = dados reais
  dataSource?: 'api' | 'scraping' | 'mock'; // Fonte dos dados
}

export interface PNBOIAData {
  buoy: Buoy;
  distance: number; // km da boia ao pico
  latestReading: PNBOIAReading | null;
  last24h: PNBOIAReading[]; // Últimas 24h de leituras
  dataAge: number; // minutos desde a última leitura
  available: boolean;
}

// ========================================
// CONFIGURAÇÃO
// ========================================

const MAX_BUOY_DISTANCE_KM = 300; // Máximo 300km de distância
const MAX_DATA_AGE_HOURS = 36; // ✅ Usa último dado disponível (até 36h = 1.5 dias)

// Cache local (browser) - evita múltiplas chamadas na mesma sessão
const localCache = new Map<string, {
  data: PNBOIAData;
  timestamp: number;
}>();

const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutos

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

/**
 * Obtém dados PNBOIA para um pico específico
 * 
 * @param lat Latitude do pico
 * @param lon Longitude do pico
 * @returns Dados da boia mais próxima ou null se não houver boia disponível
 */
export async function getPNBOIAData(
  lat: number,
  lon: number
): Promise<PNBOIAData | null> {
  try {
    // 1. Encontrar boia mais próxima
    const nearestBuoyResult = getNearestBuoy(lat, lon);
    
    if (!nearestBuoyResult) {
      console.log('🌊 PNBOIA: Nenhuma boia ativa encontrada');
      return null;
    }
    
    const { buoy, distance } = nearestBuoyResult;
    
    // 2. Verificar se boia está dentro do raio aceitável
    if (distance > MAX_BUOY_DISTANCE_KM) {
      console.log(`🌊 PNBOIA: Boia ${buoy.name} muito distante (${distance.toFixed(0)}km > ${MAX_BUOY_DISTANCE_KM}km)`);
      return null;
    }
    
    console.log(`🌊 PNBOIA: Boia mais próxima: ${buoy.name} (${distance.toFixed(0)}km)`);
    
    // 3. Verificar cache local
    const cacheKey = `${buoy.id}_${lat.toFixed(4)}_${lon.toFixed(4)}`;
    const cached = localCache.get(cacheKey);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION_MS) {
      console.log(`💾 PNBOIA: Usando cache local (${Math.floor((now - cached.timestamp) / 1000 / 60)}min atrás)`);
      return cached.data;
    }
    
    // 4. Buscar dados do backend
    const buoyData = await fetchBuoyDataFromBackend(buoy.id);
    
    if (!buoyData) {
      console.log(`⚠️ PNBOIA: Sem dados disponíveis para ${buoy.name}`);
      return {
        buoy,
        distance,
        latestReading: null,
        last24h: [],
        dataAge: Infinity,
        available: false
      };
    }
    
    // 5. Verificar idade dos dados
    const latestTimestamp = new Date(buoyData.latestReading.timestamp);
    const dataAgeMs = now - latestTimestamp.getTime();
    const dataAgeMinutes = dataAgeMs / 1000 / 60;
    const dataAgeHours = dataAgeMinutes / 60;
    
    if (dataAgeHours > MAX_DATA_AGE_HOURS) {
      console.log(`⚠️ PNBOIA: Dados muito antigos (${dataAgeHours.toFixed(1)}h > ${MAX_DATA_AGE_HOURS}h)`);
      return {
        buoy,
        distance,
        latestReading: null,
        last24h: [],
        dataAge: dataAgeMinutes,
        available: false
      };
    }
    
    const result: PNBOIAData = {
      buoy,
      distance,
      latestReading: buoyData.latestReading,
      last24h: buoyData.last24h,
      dataAge: dataAgeMinutes,
      available: true
    };
    
    // 6. Salvar no cache local
    localCache.set(cacheKey, {
      data: result,
      timestamp: now
    });
    
    console.log(`✅ PNBOIA: Dados obtidos - Hs=${buoyData.latestReading.waveHeight.toFixed(2)}m, Tp=${buoyData.latestReading.wavePeriod.toFixed(1)}s, Dir=${buoyData.latestReading.waveDirection}°`);
    console.log(`   Idade dos dados: ${dataAgeMinutes.toFixed(0)} minutos`);
    
    return result;
    
  } catch (error) {
    console.error('❌ PNBOIA: Erro ao obter dados:', error);
    return null;
  }
}

/**
 * Busca dados da boia via VERCEL (com fallback para Supabase)
 */
async function fetchBuoyDataFromVercel(buoyId: string): Promise<{
  latestReading: PNBOIAReading;
  last24h: PNBOIAReading[];
} | null> {
  try {
    logVercelUsage('attempt', `Buscando ${buoyId}`);
    
    const url = `${getVercelApiUrl()}/pnboia/${buoyId}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), VERCEL_TIMEOUT_MS);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Vercel retorna { success: true, data: {...}, source: '...' }
    if (result.success && result.data) {
      logVercelUsage('success', `${buoyId} (${result.source})`);
      
      // Converter formato Vercel para formato esperado
      return {
        latestReading: result.data,
        last24h: [result.data] // Vercel retorna só o último
      };
    }
    
    throw new Error('Invalid response format from Vercel');
    
  } catch (error: any) {
    logVercelUsage('failure', `${buoyId}: ${error.message}`);
    return null;
  }
}

/**
 * Busca dados da boia via SUPABASE (fallback)
 */
async function fetchBuoyDataFromSupabase(buoyId: string): Promise<{
  latestReading: PNBOIAReading;
  last24h: PNBOIAReading[];
} | null> {
  try {
    console.log(`[SUPABASE FALLBACK] 🔵 Tentando Supabase para ${buoyId}...`);
    
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/${buoyId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`⚠️ Supabase: Boia ${buoyId} não encontrada`);
        return null;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[SUPABASE FALLBACK] ✅ Sucesso com Supabase para ${buoyId}`);
    return data;
    
  } catch (error) {
    console.error(`❌ Supabase: Erro ao buscar ${buoyId}:`, error);
    return null;
  }
}

/**
 * Busca dados da boia (estratégia inteligente: Vercel → Supabase)
 */
async function fetchBuoyDataFromBackend(buoyId: string): Promise<{
  latestReading: PNBOIAReading;
  last24h: PNBOIAReading[];
} | null> {
  // 1️⃣ TENTAR VERCEL PRIMEIRO (se ativado)
  if (shouldUseVercel()) {
    const vercelData = await fetchBuoyDataFromVercel(buoyId);
    if (vercelData) {
      return vercelData;
    }
    
    console.log(`[FALLBACK] Vercel falhou para ${buoyId}, tentando Supabase...`);
  }
  
  // 2️⃣ FALLBACK PARA SUPABASE
  return await fetchBuoyDataFromSupabase(buoyId);
}

/**
 * Limpa o cache local (útil para debug/testes)
 */
export function clearPNBOIACache(): void {
  localCache.clear();
  console.log('🧹 PNBOIA: Cache local limpo');
}

/**
 * Retorna informações sobre o cache atual
 */
export function getCacheInfo(): {
  entries: number;
  keys: string[];
} {
  return {
    entries: localCache.size,
    keys: Array.from(localCache.keys())
  };
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

/**
 * Formata timestamp para exibição
 */
export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Calcula tempo decorrido desde uma leitura
 */
export function getDataAge(isoString: string): string {
  const now = Date.now();
  const timestamp = new Date(isoString).getTime();
  const ageMinutes = (now - timestamp) / 1000 / 60;
  
  if (ageMinutes < 60) {
    return `${Math.floor(ageMinutes)} min atrás`;
  } else if (ageMinutes < 1440) {
    return `${Math.floor(ageMinutes / 60)}h atrás`;
  } else {
    return `${Math.floor(ageMinutes / 1440)} dias atrás`;
  }
}
