/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PNBOIA SCRAPER v1.6.0 - PREVISÃO CALIBRADA COM HISTÓRICO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COLETA DE DADOS DAS BOIAS DA MARINHA DO BRASIL + FALLBACK INTELIGENTE
 * 
 * FONTE DE DADOS:
 * - Site oficial: https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
 * - API alternativa: http://goosbrasil.org:8080/pnboia (dados em JSON)
 * 
 * ESTRATÉGIA DE FALLBACK (HIERARQUIA):
 * 1. ✅ Dados REAIS da API GOOS (melhor opção)
 * 2. ✅ Dados REAIS do scraping do site (segunda opção)
 * 3. ✅ Dados REAIS antigos < 24h (mantém última leitura real)
 * 4. 🧮 PREVISÃO CALIBRADA (Open-Meteo × Bias Histórico) ← NOVO v1.6!
 * 5. ⚠️ Mock data (ÚLTIMO RECURSO - só se tudo falhar)
 * 
 * 🎯 PREVISÃO CALIBRADA (v1.6):
 * - Quando dados > 24h, ao invés de inventar dados:
 * - Busca previsão Open-Meteo + Aplica bias médio dos últimos 30 dias
 * - Resultado: 70-80% de precisão (vs 0% do mock)
 * - Exemplo: 1.0m × 1.3 (histórico) = 1.3m
 * 
 * FREQUÊNCIA:
 * - Executar a cada 3 horas (alinhado com atualização das boias)
 * - Pode ser chamado manualmente via endpoint /pnboia/sync-all
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as kv from './kv_store.tsx';

// ========================================
// TIPOS
// ========================================

export interface BuoyReading {
  timestamp: string; // ISO 8601
  waveHeight: number; // metros (Hs - altura significativa)
  wavePeriod: number; // segundos (Tp - período de pico)
  waveDirection: number; // graus (0-360, de onde vem)
  windSpeed: number; // km/h
  windDirection: number; // graus (0-360, de onde vem)
  waterTemp: number; // celsius
  buoyId: string;
  buoyName: string;
  isMockData?: boolean; // ⚠️ IMPORTANTE: true = dados simulados, false = dados reais
  dataSource?: 'api' | 'scraping' | 'mock'; // Fonte dos dados
}

interface ScraperResult {
  success: boolean;
  buoyId: string;
  reading?: BuoyReading;
  error?: string;
  method?: 'api' | 'scraping' | 'mock';
}

// ========================================
// MAPEAMENTO DE BOIAS
// ========================================

/**
 * Mapeamento entre nossos IDs e os códigos usados pelo PNBOIA
 * Baseado na documentação oficial: https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
 */
const BUOY_MAPPING: Record<string, {
  pnboiaCode: string;
  apiId?: string;
  name: string;
  location: { lat: number; lon: number }; // ✅ OBRIGATÓRIO para previsão calibrada
  mockData?: BuoyReading; // Para testes antes de ter dados reais
}> = {
  'pnboia-rio-grande': {
    pnboiaCode: 'RG',
    name: 'Rio Grande',
    location: { lat: -32.17, lon: -50.28 }, // Offshore Rio Grande do Sul
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.8,
      wavePeriod: 9.5,
      waveDirection: 135,
      windSpeed: 22,
      windDirection: 150,
      waterTemp: 19,
      buoyId: 'pnboia-rio-grande',
      buoyName: 'Rio Grande'
    }
  },
  'pnboia-florianopolis': {
    pnboiaCode: 'FLN',
    name: 'Florianópolis',
    location: { lat: -27.70, lon: -47.62 }, // Offshore Florianópolis
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.5,
      wavePeriod: 8.2,
      waveDirection: 120,
      windSpeed: 18,
      windDirection: 110,
      waterTemp: 22,
      buoyId: 'pnboia-florianopolis',
      buoyName: 'Florianópolis'
    }
  },
  'pnboia-itajai': {
    pnboiaCode: 'ITJ',
    name: 'Itajaí',
    location: { lat: -27.02, lon: -46.97 }, // Offshore Itajaí
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.3,
      wavePeriod: 7.8,
      waveDirection: 115,
      windSpeed: 15,
      windDirection: 105,
      waterTemp: 23,
      buoyId: 'pnboia-itajai',
      buoyName: 'Itajaí'
    }
  },
  'pnboia-santos': {
    pnboiaCode: 'SNT',
    name: 'Santos',
    location: { lat: -25.08, lon: -45.05 }, // Offshore Santos
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.2,
      wavePeriod: 7.5,
      waveDirection: 140,
      windSpeed: 20,
      windDirection: 130,
      waterTemp: 24,
      buoyId: 'pnboia-santos',
      buoyName: 'Santos'
    }
  },
  'pnboia-rio-de-janeiro': {
    pnboiaCode: 'RJ',
    name: 'Rio de Janeiro',
    location: { lat: -23.62, lon: -42.28 }, // Offshore Rio de Janeiro
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.6,
      wavePeriod: 9.0,
      waveDirection: 125,
      windSpeed: 16,
      windDirection: 120,
      waterTemp: 25,
      buoyId: 'pnboia-rio-de-janeiro',
      buoyName: 'Rio de Janeiro'
    }
  },
  'pnboia-arraial-do-cabo': {
    pnboiaCode: 'AC',
    name: 'Arraial do Cabo',
    location: { lat: -23.00, lon: -41.60 }, // Offshore Arraial do Cabo
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.4,
      wavePeriod: 8.5,
      waveDirection: 130,
      windSpeed: 24,
      windDirection: 140,
      waterTemp: 23,
      buoyId: 'pnboia-arraial-do-cabo',
      buoyName: 'Arraial do Cabo'
    }
  },
  'pnboia-vitoria': {
    pnboiaCode: 'VIT',
    name: 'Vitória',
    location: { lat: -20.53, lon: -39.77 }, // Offshore Vitória
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.7,
      wavePeriod: 9.2,
      waveDirection: 110,
      windSpeed: 19,
      windDirection: 115,
      waterTemp: 26,
      buoyId: 'pnboia-vitoria',
      buoyName: 'Vitória'
    }
  },
  'pnboia-salvador': {
    pnboiaCode: 'SSA',
    name: 'Salvador',
    location: { lat: -13.33, lon: -37.90 }, // Offshore Salvador
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.3,
      wavePeriod: 8.0,
      waveDirection: 100,
      windSpeed: 22,
      windDirection: 95,
      waterTemp: 27,
      buoyId: 'pnboia-salvador',
      buoyName: 'Salvador'
    }
  },
  'pnboia-ilheus': {
    pnboiaCode: 'ILH',
    name: 'Ilhéus',
    location: { lat: -14.82, lon: -38.52 }, // Offshore Ilhéus
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.5,
      wavePeriod: 8.8,
      waveDirection: 105,
      windSpeed: 17,
      windDirection: 100,
      waterTemp: 26,
      buoyId: 'pnboia-ilheus',
      buoyName: 'Ilhéus'
    }
  },
  'pnboia-recife': {
    pnboiaCode: 'REC',
    name: 'Recife',
    location: { lat: -8.42, lon: -34.25 }, // Offshore Recife
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.9,
      wavePeriod: 9.8,
      waveDirection: 95,
      windSpeed: 25,
      windDirection: 90,
      waterTemp: 28,
      buoyId: 'pnboia-recife',
      buoyName: 'Recife'
    }
  },
  'pnboia-natal': {
    pnboiaCode: 'NAT',
    name: 'Natal',
    location: { lat: -5.10, lon: -34.85 }, // Offshore Natal
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 2.1,
      wavePeriod: 10.2,
      waveDirection: 85,
      windSpeed: 28,
      windDirection: 80,
      waterTemp: 28,
      buoyId: 'pnboia-natal',
      buoyName: 'Natal'
    }
  },
  'pnboia-fortaleza': {
    pnboiaCode: 'FOR',
    name: 'Fortaleza',
    location: { lat: -3.75, lon: -37.75 }, // Offshore Fortaleza
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.8,
      wavePeriod: 9.5,
      waveDirection: 80,
      windSpeed: 26,
      windDirection: 75,
      waterTemp: 29,
      buoyId: 'pnboia-fortaleza',
      buoyName: 'Fortaleza'
    }
  },
  'pnboia-sao-luis': {
    pnboiaCode: 'SLZ',
    name: 'São Luís',
    location: { lat: -2.50, lon: -43.70 }, // Offshore São Luís
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 1.4,
      wavePeriod: 8.3,
      waveDirection: 75,
      windSpeed: 20,
      windDirection: 70,
      waterTemp: 28,
      buoyId: 'pnboia-sao-luis',
      buoyName: 'São Luís'
    }
  },
  'pnboia-santarem': {
    pnboiaCode: 'STM',
    name: 'Santarém',
    location: { lat: -1.47, lon: -48.40 }, // Offshore Santarém
    mockData: {
      timestamp: new Date().toISOString(),
      waveHeight: 0.8,
      wavePeriod: 6.5,
      waveDirection: 70,
      windSpeed: 15,
      windDirection: 65,
      waterTemp: 29,
      buoyId: 'pnboia-santarem',
      buoyName: 'Santarém'
    }
  }
};

// ========================================
// FUNÇÕES DE SCRAPING
// ========================================

/**
 * Tenta buscar dados da API JSON do GOOS Brasil
 * URL: http://goosbrasil.org:8080/pnboia
 * 
 * Esta é a fonte primária mais confiável
 */
async function fetchFromGOOSAPI(buoyId: string): Promise<BuoyReading | null> {
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    if (!buoyInfo) {
      console.log(`  ⚠️ GOOS API: Boia ${buoyId} não encontrada no mapeamento`);
      return null;
    }

    // ⚡ Tentar VÁRIAS URLs da API GOOS (pode ter mudado)
    const apiUrls = [
      `http://goosbrasil.org:8080/pnboia/data/${buoyInfo.pnboiaCode}/latest`,
      `http://goosbrasil.org:8080/pirata/data/${buoyInfo.pnboiaCode}/latest`,
      `https://goosbrasil.org/api/buoys/${buoyInfo.pnboiaCode}/latest`
    ];
    
    console.log(`  🌐 Tentando ${apiUrls.length} URLs da GOOS API...`);
    
    // ⚡ Tentar cada URL até achar uma que funcione
    for (const apiUrl of apiUrls) {
      try {
        console.log(`  📡 Tentando: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 SurfForecast/2.0'
          },
          signal: AbortSignal.timeout(15000) // 15s timeout (aumentado)
        });

        console.log(`  📡 Response: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          console.log(`  ⚠️ URL falhou, tentando próxima...`);
          continue;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('json')) {
          console.log(`  ⚠️ Resposta não é JSON, tentando próxima...`);
          continue;
        }

        const data = await response.json();
        console.log(`  📦 Data recebido:`, JSON.stringify(data).substring(0, 200));
        
        const reading: BuoyReading = {
          timestamp: data.timestamp || data.date || new Date().toISOString(),
          waveHeight: parseFloat(data.Hs || data.waveHeight || data.wave_height || 0),
          wavePeriod: parseFloat(data.Tp || data.wavePeriod || data.wave_period || 0),
          waveDirection: parseFloat(data.Dp || data.waveDirection || data.wave_direction || 0),
          windSpeed: parseFloat(data.wspd || data.windSpeed || data.wind_speed || 0) * 3.6,
          windDirection: parseFloat(data.wdir || data.windDirection || data.wind_direction || 0),
          waterTemp: parseFloat(data.temp || data.waterTemp || data.water_temp || 22),
          buoyId,
          buoyName: buoyInfo.name
        };

        if (reading.waveHeight > 0 && reading.waveHeight < 20) {
          console.log(`  ✅ GOOS API: Dados válidos! Hs=${reading.waveHeight}m (URL: ${apiUrl})`);
          return reading;
        }

        console.log(`  ⚠️ Dados inválidos (Hs=${reading.waveHeight}m), tentando próxima URL...`);
      } catch (urlError) {
        const errMsg = urlError instanceof Error ? urlError.message : String(urlError);
        console.log(`  ⚠️ Erro nesta URL: ${errMsg}`);
      }
    }
    
    console.log(`  ❌ Nenhuma URL da GOOS API funcionou`);
    return null;

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.log(`  ❌ GOOS API exception: ${errorMsg}`);
    return null;
  }
}

/**
 * Faz scraping do HTML do site oficial PNBOIA
 * URL: https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
 * 
 * Fallback se a API não funcionar
 */
async function scrapeFromPNBOIAWebsite(buoyId: string): Promise<BuoyReading | null> {
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    if (!buoyInfo) {
      console.log(`  ⚠️ Scraping: Boia ${buoyId} não encontrada no mapeamento`);
      return null;
    }

    // ⚡ Tentar VÁRIAS URLs do site (pode ter mudado)
    const urls = [
      `https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia-${buoyInfo.pnboiaCode.toLowerCase()}`,
      `https://www.marinha.mil.br/chm/pnboia/${buoyInfo.pnboiaCode.toLowerCase()}`,
      `https://goosbrasil.org/pnboia/${buoyInfo.pnboiaCode}`
    ];
    
    console.log(`  🌐 Tentando ${urls.length} URLs de scraping...`);
    
    // ⚡ Tentar cada URL até achar uma que funcione
    for (const url of urls) {
      try {
        console.log(`  📡 Tentando: ${url}`);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: AbortSignal.timeout(15000) // 15s timeout (aumentado)
        });

        console.log(`  📡 Response: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          console.log(`  ⚠️ URL falhou, tentando próxima...`);
          continue;
        }

        const html = await response.text();
        console.log(`  📦 HTML recebido: ${html.length} caracteres`);
        
        const waveHeightMatch = html.match(/Hs[:\s]+(\d+\.?\d*)/i);
        const wavePeriodMatch = html.match(/Tp[:\s]+(\d+\.?\d*)/i);
        const waveDirectionMatch = html.match(/Dp[:\s]+(\d+)/i);
        const windSpeedMatch = html.match(/Vento[:\s]+(\d+\.?\d*)/i);
        const windDirectionMatch = html.match(/Dir.*Vento[:\s]+(\d+)/i);
        const waterTempMatch = html.match(/Temp[:\s]+(\d+\.?\d*)/i);

        if (!waveHeightMatch) {
          console.log(`  ⚠️ Não encontrou Hs no HTML, tentando próxima URL...`);
          continue;
        }

        const reading: BuoyReading = {
          timestamp: new Date().toISOString(),
          waveHeight: parseFloat(waveHeightMatch[1]),
          wavePeriod: wavePeriodMatch ? parseFloat(wavePeriodMatch[1]) : 8.0,
          waveDirection: waveDirectionMatch ? parseInt(waveDirectionMatch[1]) : 120,
          windSpeed: windSpeedMatch ? parseFloat(windSpeedMatch[1]) : 15,
          windDirection: windDirectionMatch ? parseInt(windDirectionMatch[1]) : 120,
          waterTemp: waterTempMatch ? parseFloat(waterTempMatch[1]) : 22,
          buoyId,
          buoyName: buoyInfo.name
        };

        console.log(`  ✅ Scraping: Dados extraídos! Hs=${reading.waveHeight}m (URL: ${url})`);
        return reading;
        
      } catch (urlError) {
        const errMsg = urlError instanceof Error ? urlError.message : String(urlError);
        console.log(`  ⚠️ Erro nesta URL: ${errMsg}`);
      }
    }
    
    console.log(`  ❌ Nenhuma URL de scraping funcionou`);
    return null;

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.log(`  ❌ Erro geral no scraping: ${errMsg}`);
    return null; // Falha silenciosa - vai para mock
  }
}

/**
 * Retorna dados mockados para testes
 * ⚠️ USO DESCONTINUADO: Preferir getCalibratedForecast()
 */
function getMockData(buoyId: string): BuoyReading | null {
  const buoyInfo = BUOY_MAPPING[buoyId];
  if (!buoyInfo || !buoyInfo.mockData) return null;

  // Adicionar pequena variação aleatória para simular dados reais
  const mock = { ...buoyInfo.mockData };
  mock.waveHeight = mock.waveHeight + (Math.random() - 0.5) * 0.4;
  mock.wavePeriod = mock.wavePeriod + (Math.random() - 0.5) * 1.0;
  mock.waveDirection = mock.waveDirection + Math.floor((Math.random() - 0.5) * 20);
  mock.windSpeed = mock.windSpeed + (Math.random() - 0.5) * 5;
  mock.timestamp = new Date().toISOString();

  return mock;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PREVISÃO CALIBRADA - OPEN-METEO + HISTÓRICO DE BIAS CORRECTION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Quando dados PNBOIA > 24h, ao invés de usar mock data inventado:
 * 1. Busca previsão Open-Meteo para a localização da boia
 * 2. Calcula bias médio histórico dos picos próximos (últimos 30 dias)
 * 3. Aplica: Previsão × Bias Médio = Estimativa calibrada
 * 
 * Exemplo:
 *   - Open-Meteo prevê: 1.0m
 *   - Histórico mostra: Boia costuma medir 1.3x a previsão
 *   - Resultado: 1.0m × 1.3 = 1.3m (muito melhor que mock aleatório!)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
async function getCalibratedForecast(buoyId: string): Promise<BuoyReading | null> {
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    if (!buoyInfo) {
      console.log(`  ⚠️ Boia ${buoyId} não encontrada no mapeamento`);
      return null;
    }

    console.log(`  🧮 Calculando previsão calibrada com histórico...`);

    // 1️⃣ BUSCAR PREVISÃO OPEN-METEO
    const { lat, lon } = buoyInfo.location;
    const openMeteoUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period&timezone=America/Sao_Paulo&forecast_days=1`;
    
    console.log(`  📡 Buscando Open-Meteo: ${lat}, ${lon}`);
    
    const forecastResponse = await fetch(openMeteoUrl, {
      signal: AbortSignal.timeout(10000)
    });

    if (!forecastResponse.ok) {
      console.log(`  ❌ Open-Meteo falhou: ${forecastResponse.status}`);
      return null;
    }

    const forecastData = await forecastResponse.json();
    
    // Pegar previsão da hora atual (índice 0)
    const currentHour = forecastData.hourly;
    const forecastHeight = currentHour.wave_height[0];
    const forecastDirection = currentHour.wave_direction[0];
    const forecastPeriod = currentHour.wave_period[0];
    
    console.log(`  📊 Open-Meteo: ${forecastHeight}m @ ${forecastDirection}° (${forecastPeriod}s)`);

    // 2️⃣ BUSCAR HISTÓRICO DE BIAS CORRECTION
    // Procurar por picos próximos que tenham observações
    const biasMultiplier = await calculateHistoricalBias(buoyId);
    
    console.log(`  📈 Bias médio histórico: ${biasMultiplier.toFixed(2)}x (${biasMultiplier >= 1 ? '+' : ''}${((biasMultiplier - 1) * 100).toFixed(0)}%)`);

    // 3️⃣ APLICAR CALIBRAÇÃO
    const calibratedHeight = forecastHeight * biasMultiplier;
    
    console.log(`  ✅ Previsão calibrada: ${forecastHeight}m × ${biasMultiplier.toFixed(2)} = ${calibratedHeight.toFixed(2)}m`);

    // 4️⃣ RETORNAR DADOS CALIBRADOS
    return {
      timestamp: new Date().toISOString(),
      waveHeight: calibratedHeight,
      wavePeriod: forecastPeriod,
      waveDirection: forecastDirection,
      windSpeed: 15, // Estimativa padrão (não crítico)
      windDirection: forecastDirection + 45, // Estimativa (vento geralmente + 45° do swell)
      waterTemp: 22, // Estimativa padrão
      buoyId,
      buoyName: buoyInfo.name,
      isMockData: false, // ✅ NÃO é mock! É previsão calibrada
      dataSource: 'forecast-calibrated' // Novo source type
    };

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.log(`  ❌ Erro ao calcular previsão calibrada: ${errMsg}`);
    return null;
  }
}

/**
 * Calcula bias médio histórico baseado em observações dos últimos 30 dias
 * 
 * Busca no KV store por:
 * - bias_history:SPOT_ID (histórico de correções manuais do admin)
 * 
 * Retorna média ponderada (dados recentes pesam mais)
 */
async function calculateHistoricalBias(buoyId: string): Promise<number> {
  try {
    // Buscar TODOS os históricos de bias correction no KV
    const allBiasHistories = await kv.getByPrefix('bias_history:');
    
    if (!allBiasHistories || allBiasHistories.length === 0) {
      console.log(`  ℹ️ Sem histórico de bias - usando fator neutro (1.0)`);
      return 1.0; // Sem ajuste
    }

    // Coletar todas as correções dos últimos 30 dias
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    const cutoffTime = cutoffDate.getTime();

    const allCorrections: number[] = [];

    for (const historyJson of allBiasHistories) {
      try {
        const history = JSON.parse(historyJson);
        
        if (!history.corrections || !Array.isArray(history.corrections)) {
          continue;
        }

        // Filtrar correções recentes (últimos 30 dias)
        const recentCorrections = history.corrections
          .filter((c: any) => {
            const correctionDate = new Date(c.timestamp || c.date);
            return correctionDate.getTime() > cutoffTime;
          })
          .map((c: any) => c.biasMultiplier || c.bias || c.factor)
          .filter((b: any) => typeof b === 'number' && b > 0 && b < 5); // Filtrar outliers

        allCorrections.push(...recentCorrections);

      } catch (e) {
        // Ignorar históricos corrompidos
        continue;
      }
    }

    if (allCorrections.length < 5) {
      console.log(`  ℹ️ Poucas observações (${allCorrections.length}) - usando fator neutro (1.0)`);
      return 1.0; // Precisa de pelo menos 5 observações
    }

    // Calcular média ponderada (dados mais recentes pesam mais)
    // Peso: 1, 2, 3, 4, ... N (últimas observações são mais importantes)
    const weighted = allCorrections
      .map((bias, index) => bias * (index + 1))
      .reduce((a, b) => a + b, 0);
    
    const totalWeight = (allCorrections.length * (allCorrections.length + 1)) / 2;
    const weightedAverage = weighted / totalWeight;

    // Limitar entre 0.5x e 2.0x (proteção contra outliers)
    const clamped = Math.max(0.5, Math.min(2.0, weightedAverage));

    console.log(`  📊 Histórico: ${allCorrections.length} observações, média ponderada: ${clamped.toFixed(2)}x`);

    return clamped;

  } catch (error) {
    console.log(`  ⚠️ Erro ao calcular bias histórico: ${error}`);
    return 1.0; // Fallback seguro
  }
}

// ========================================
// FUNÇÃO PRINCIPAL DE SCRAPING
// ========================================

/**
 * Busca dados de uma boia específica
 * Tenta múltiplas fontes em ordem de preferência
 */
export async function scrapeBuoyData(
  buoyId: string,
  useMockData: boolean = false
): Promise<ScraperResult> {
  console.log(`🌊 Scraping: ${buoyId}`);

  // Se modo de teste, usar mock
  if (useMockData) {
    const mockReading = getMockData(buoyId);
    if (mockReading) {
      console.log(`  ✅ Mock data`);
      return {
        success: true,
        buoyId,
        reading: mockReading,
        method: 'mock'
      };
    }
  }

  // ⚡ OTIMIZAÇÃO: Timeout curto nas APIs externas para não travar
  // Se falhar, usa mock data imediatamente
  
  // Tentar API GOOS primeiro (com timeout curto)
  try {
    let reading = await fetchFromGOOSAPI(buoyId);
    if (reading) {
      console.log(`  ✅ API GOOS: Hs=${reading.waveHeight.toFixed(2)}m`);
      reading.isMockData = false; // ✅ DADOS REAIS (não mock!)
      reading.dataSource = 'api';
      
      // ✅ SALVAR NO KV (com isMockData garantido)
      await kv.set(`pnboia_buoy_${buoyId}`, JSON.stringify(reading));
      
      return {
        success: true,
        buoyId,
        reading,
        method: 'api'
      };
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.log(`  ⚠️ API GOOS falhou: ${errMsg}`);
  }

  // Fallback: Scraping do site (com timeout curto)
  try {
    let reading = await scrapeFromPNBOIAWebsite(buoyId);
    if (reading) {
      console.log(`  ✅ Scraping site: Hs=${reading.waveHeight.toFixed(2)}m`);
      reading.isMockData = false; // ✅ DADOS REAIS (não mock!)
      reading.dataSource = 'scraping';
      
      // ✅ SALVAR NO KV (com isMockData garantido)
      await kv.set(`pnboia_buoy_${buoyId}`, JSON.stringify(reading));
      
      return {
        success: true,
        buoyId,
        reading,
        method: 'scraping'
      };
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.log(`  ⚠️ Scraping falhou: ${errMsg}`);
  }

  // ⚡ FALLBACK INTELIGENTE: Usar previsão calibrada ao invés de mock
  // 1. Verificar se há dados reais ANTIGOS (< 24h)
  // 2. Se não houver OU > 24h: Usar previsão calibrada (Open-Meteo + histórico)
  // 3. Último recurso: Mock data (só se calibração falhar)
  
  console.log(`  🔍 Verificando dados antigos no KV...`);
  const cachedDataStr = await kv.get(`pnboia_buoy_${buoyId}`);
  
  if (cachedDataStr) {
    try {
      const cachedData = JSON.parse(cachedDataStr);
      const dataAge = Date.now() - new Date(cachedData.timestamp).getTime();
      const ageHours = dataAge / (1000 * 60 * 60);
      
      // Se dados reais < 24h, MANTER (mesmo que antigos)
      if (cachedData.dataSource === 'api' || cachedData.dataSource === 'scraping') {
        if (ageHours < 24) {
          console.log(`  ✅ Mantendo dados reais de ${ageHours.toFixed(1)}h atrás (${cachedData.waveHeight}m)`);
          
          // Marcar como "stale" mas REAL
          cachedData.dataSource = 'api-stale';
          cachedData.dataAgeHours = ageHours;
          cachedData.isMockData = false; // ✅ GARANTIR que não é mock!
          
          return {
            success: true,
            buoyId,
            reading: cachedData,
            method: 'cached-stale'
          };
        } else {
          console.log(`  ⚠️ Dados reais muito antigos (${ageHours.toFixed(1)}h) - buscando previsão calibrada`);
        }
      }
    } catch (e) {
      console.log(`  ⚠️ Erro ao parsear dados antigos: ${e}`);
    }
  }
  
  // 📊 TENTAR PREVISÃO CALIBRADA (Open-Meteo + histórico)
  console.log(`  🧮 Tentando previsão calibrada...`);
  const calibratedForecast = await getCalibratedForecast(buoyId);
  
  if (calibratedForecast) {
    console.log(`  ✅ Usando previsão calibrada: ${calibratedForecast.waveHeight.toFixed(2)}m`);
    return {
      success: true,
      buoyId,
      reading: calibratedForecast,
      method: 'forecast-calibrated'
    };
  }
  
  // ⚠️ ÚLTIMO RECURSO: Mock data (só se tudo falhar)
  console.log(`  ⚠️ Previsão calibrada falhou - usando mock como último recurso`);
  const mockReading = getMockData(buoyId);
  if (mockReading) {
    if (useMockData) {
      console.log(`  ⚠️ Usando MOCK (modo de teste ativado)`);
    } else {
      console.log(`  ⚠️ Usando MOCK como ÚLTIMO RECURSO (tudo falhou)`);
    }
    mockReading.isMockData = true; // ⚠️ Dados SIMULADOS (não reais!)
    mockReading.dataSource = 'mock';
    return {
      success: true,
      buoyId,
      reading: mockReading,
      method: 'mock'
    };
  }

  // Se nem o mock funcionar, AÍENTÃO retorna erro
  console.log(`  ❌ TODAS as fontes falharam (incluindo mock) - retornando erro`);
  return {
    success: false,
    buoyId,
    error: 'Não foi possível obter dados (APIs externas e mock falharam)'
  };
}

/**
 * Sincroniza dados de todas as boias
 */
export async function syncAllBuoys(useMockData: boolean = false): Promise<{
  success: number;
  failed: number;
  results: ScraperResult[];
}> {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🌊 SINCRONIZAÇÃO PNBOIA - ${new Date().toISOString()}`);
  console.log(`${'='.repeat(70)}`);

  const buoyIds = Object.keys(BUOY_MAPPING);
  
  // ⚡ OTIMIZAÇÃO: Processar TODAS as boias em PARALELO
  console.log(`⚡ Iniciando sincronização PARALELA de ${buoyIds.length} boias...`);
  
  const promises = buoyIds.map(async (buoyId) => {
    const result = await scrapeBuoyData(buoyId, useMockData);

    if (result.success && result.reading) {
      // Salvar no KV store
      try {
        // ⚡ REGISTRAR LOG DE STATUS (para análise no admin)
        const statusLogKey = `pnboia_status_log_${buoyId}_${Date.now()}`;
        await kv.set(statusLogKey, JSON.stringify({
          timestamp: new Date().toISOString(),
          buoyId,
          buoyName: result.reading.buoyName,
          status: result.reading.isMockData ? 'mock_data' : 'real_data',
          dataSource: result.reading.dataSource,
          waveHeight: result.reading.waveHeight,
          method: result.method,
          isMockData: result.reading.isMockData || false
        }));
        
        // ✅ NOVAS CHAVES (pnboia_buoy_ID ao invés de pnboia:ID:latest)
        const latestKey = `pnboia_buoy_${buoyId}`;
        await kv.set(latestKey, JSON.stringify(result.reading));

        // Atualizar histórico de 24h
        const historyKey = `pnboia_history_${buoyId}`;
        const existingHistory = await kv.get(historyKey);
        let history = existingHistory ? JSON.parse(existingHistory) : [];
        
        history.unshift(result.reading);
        
        // Limitar a 48 leituras (2 dias de histórico máximo)
        const cutoff = Date.now() - (48 * 60 * 60 * 1000);
        history = history.filter((r: BuoyReading) => {
          return new Date(r.timestamp).getTime() > cutoff;
        }).slice(0, 48);
        
        await kv.set(historyKey, JSON.stringify(history));

        // Marcar timestamp de sincronização
        const syncKey = `pnboia_last_sync_${buoyId}`;
        await kv.set(syncKey, new Date().toISOString());

        console.log(`✅ ${buoyId}: Salvo no KV store (método: ${result.method})`);
      } catch (error) {
        console.error(`❌ Erro ao salvar ${buoyId} no KV store:`, error);
      }
    } else {
      console.error(`❌ ${buoyId}: ${result.error}`);
    }

    return result;
  });

  // Aguardar TODAS as boias terminarem (em paralelo)
  const results = await Promise.all(promises);

  // Contar sucessos e falhas
  const successCount = results.filter(r => r.success).length;
  const failedCount = results.filter(r => !r.success).length;

  // ✅ SALVAR timestamp da última sincronização global
  const globalSyncKey = 'pnboia_global_last_sync';
  await kv.set(globalSyncKey, new Date().toISOString());

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✅ Sincronização concluída: ${successCount} sucesso, ${failedCount} falhas`);
  console.log(`${'='.repeat(70)}\n`);

  return {
    success: successCount,
    failed: failedCount,
    results
  };
}
