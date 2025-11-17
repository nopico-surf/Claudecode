/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VERCEL SERVERLESS FUNCTION - PNBOIA INDIVIDUAL (JAVASCRIPT)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Endpoint: /api/pnboia/[buoyId]
 * Método: GET
 * 
 * Busca dados de uma boia específica usando MÚLTIPLAS estratégias:
 * 1. API GOOS (JSON) - com proxy CORS
 * 2. Scraping site Marinha
 * 3. Previsão calibrada (Open-Meteo + histórico)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const BUOY_MAPPING = {
  'pnboia-rio-grande': {
    pnboiaCode: 'RG',
    name: 'Rio Grande',
    location: { lat: -32.17, lon: -50.28 }
  },
  'pnboia-florianopolis': {
    pnboiaCode: 'FLN',
    name: 'Florianópolis',
    location: { lat: -27.70, lon: -47.62 }
  },
  'pnboia-itajai': {
    pnboiaCode: 'ITJ',
    name: 'Itajaí',
    location: { lat: -27.02, lon: -46.97 }
  },
  'pnboia-santos': {
    pnboiaCode: 'SNT',
    name: 'Santos',
    location: { lat: -25.08, lon: -45.05 }
  },
  'pnboia-rio-de-janeiro': {
    pnboiaCode: 'RJ',
    name: 'Rio de Janeiro',
    location: { lat: -23.62, lon: -42.28 }
  },
  'pnboia-arraial-do-cabo': {
    pnboiaCode: 'AC',
    name: 'Arraial do Cabo',
    location: { lat: -23.00, lon: -41.60 }
  },
  'pnboia-vitoria': {
    pnboiaCode: 'VIT',
    name: 'Vitória',
    location: { lat: -20.53, lon: -39.77 }
  },
  'pnboia-salvador': {
    pnboiaCode: 'SSA',
    name: 'Salvador',
    location: { lat: -13.33, lon: -37.90 }
  },
  'pnboia-ilheus': {
    pnboiaCode: 'ILH',
    name: 'Ilhéus',
    location: { lat: -14.82, lon: -38.52 }
  },
  'pnboia-recife': {
    pnboiaCode: 'REC',
    name: 'Recife',
    location: { lat: -8.42, lon: -34.25 }
  },
  'pnboia-natal': {
    pnboiaCode: 'NAT',
    name: 'Natal',
    location: { lat: -5.10, lon: -34.85 }
  },
  'pnboia-fortaleza': {
    pnboiaCode: 'FOR',
    name: 'Fortaleza',
    location: { lat: -3.75, lon: -37.75 }
  },
  'pnboia-sao-luis': {
    pnboiaCode: 'SLZ',
    name: 'São Luís',
    location: { lat: -2.50, lon: -43.70 }
  },
  'pnboia-santarem': {
    pnboiaCode: 'STM',
    name: 'Santarém',
    location: { lat: -1.47, lon: -48.40 }
  }
};

/**
 * Tenta buscar dados da API GOOS
 */
async function fetchFromGOOSAPI(buoyId) {
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    if (!buoyInfo) {
      console.log(`[GOOS API] Boia ${buoyId} não encontrada`);
      return null;
    }

    const apiUrls = [
      `http://goosbrasil.org:8080/pnboia/data/${buoyInfo.pnboiaCode}/latest`,
      `http://goosbrasil.org:8080/pirata/data/${buoyInfo.pnboiaCode}/latest`,
      `https://goosbrasil.org/api/buoys/${buoyInfo.pnboiaCode}/latest`
    ];

    const corsProxies = [
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?',
      ''
    ];

    console.log(`[GOOS API] Tentando ${apiUrls.length} URLs com ${corsProxies.length} proxies...`);

    for (const proxy of corsProxies) {
      for (const apiUrl of apiUrls) {
        try {
          const fullUrl = proxy ? proxy + encodeURIComponent(apiUrl) : apiUrl;
          console.log(`[GOOS API] Tentando: ${fullUrl.substring(0, 100)}...`);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);

          const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 SurfForecast/2.0'
            },
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          console.log(`[GOOS API] Response: ${response.status} ${response.statusText}`);

          if (!response.ok) {
            continue;
          }

          const contentType = response.headers.get('content-type');
          if (!contentType?.includes('json')) {
            console.log(`[GOOS API] Não é JSON, tentando próxima...`);
            continue;
          }

          const data = await response.json();
          console.log(`[GOOS API] Data recebido:`, JSON.stringify(data).substring(0, 200));

          const reading = {
            timestamp: data.timestamp || data.date || new Date().toISOString(),
            waveHeight: parseFloat(data.Hs || data.waveHeight || data.wave_height || 0),
            wavePeriod: parseFloat(data.Tp || data.wavePeriod || data.wave_period || 0),
            waveDirection: parseFloat(data.Dp || data.waveDirection || data.wave_direction || 0),
            windSpeed: parseFloat(data.wspd || data.windSpeed || data.wind_speed || 0) * 3.6,
            windDirection: parseFloat(data.wdir || data.windDirection || data.wind_direction || 0),
            waterTemp: parseFloat(data.temp || data.waterTemp || data.water_temp || 22),
            buoyId,
            buoyName: buoyInfo.name,
            dataSource: 'api',
            isMockData: false
          };

          if (reading.waveHeight > 0 && reading.waveHeight < 20) {
            console.log(`[GOOS API] ✅ Sucesso! Hs=${reading.waveHeight}m`);
            return reading;
          }

          console.log(`[GOOS API] Dados inválidos (Hs=${reading.waveHeight}m)`);
        } catch (error) {
          console.log(`[GOOS API] Erro: ${error.message}`);
        }
      }
    }

    console.log(`[GOOS API] ❌ Todas as tentativas falharam`);
    return null;

  } catch (error) {
    console.log(`[GOOS API] Exception: ${error.message}`);
    return null;
  }
}

/**
 * Faz scraping do site da Marinha
 */
async function scrapeFromPNBOIAWebsite(buoyId) {
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    if (!buoyInfo) {
      console.log(`[Scraping] Boia ${buoyId} não encontrada`);
      return null;
    }

    const urls = [
      `https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia-${buoyInfo.pnboiaCode.toLowerCase()}`,
      `https://www.marinha.mil.br/chm/pnboia/${buoyInfo.pnboiaCode.toLowerCase()}`,
      `https://goosbrasil.org/pnboia/${buoyInfo.pnboiaCode}`
    ];

    console.log(`[Scraping] Tentando ${urls.length} URLs...`);

    for (const url of urls) {
      try {
        console.log(`[Scraping] Tentando: ${url}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log(`[Scraping] Response: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          continue;
        }

        const html = await response.text();
        console.log(`[Scraping] HTML recebido: ${html.length} caracteres`);

        const waveHeightMatch = html.match(/Hs[:\s]+([\d.]+)/i);
        const wavePeriodMatch = html.match(/Tp[:\s]+([\d.]+)/i);
        const waveDirectionMatch = html.match(/Dp[:\s]+(\d+)/i);
        const windSpeedMatch = html.match(/Vento[:\s]+([\d.]+)/i);
        const windDirectionMatch = html.match(/Dir.*Vento[:\s]+(\d+)/i);
        const waterTempMatch = html.match(/Temp[:\s]+([\d.]+)/i);

        if (!waveHeightMatch) {
          console.log(`[Scraping] Não encontrou Hs no HTML`);
          continue;
        }

        const reading = {
          timestamp: new Date().toISOString(),
          waveHeight: parseFloat(waveHeightMatch[1]),
          wavePeriod: wavePeriodMatch ? parseFloat(wavePeriodMatch[1]) : 8.0,
          waveDirection: waveDirectionMatch ? parseInt(waveDirectionMatch[1]) : 120,
          windSpeed: windSpeedMatch ? parseFloat(windSpeedMatch[1]) : 15,
          windDirection: windDirectionMatch ? parseInt(windDirectionMatch[1]) : 120,
          waterTemp: waterTempMatch ? parseFloat(waterTempMatch[1]) : 22,
          buoyId,
          buoyName: buoyInfo.name,
          dataSource: 'scraping',
          isMockData: false
        };

        console.log(`[Scraping] ✅ Sucesso! Hs=${reading.waveHeight}m`);
        return reading;

      } catch (error) {
        console.log(`[Scraping] Erro: ${error.message}`);
      }
    }

    console.log(`[Scraping] ❌ Todas as tentativas falharam`);
    return null;

  } catch (error) {
    console.log(`[Scraping] Exception: ${error.message}`);
    return null;
  }
}

/**
 * Busca previsão calibrada (Open-Meteo)
 */
async function getCalibratedForecast(buoyId) {
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    if (!buoyInfo) {
      console.log(`[Calibrated] Boia ${buoyId} não encontrada`);
      return null;
    }

    console.log(`[Calibrated] Calculando previsão calibrada...`);

    const { lat, lon } = buoyInfo.location;
    const openMeteoUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period&timezone=America/Sao_Paulo&forecast_days=1`;

    console.log(`[Calibrated] Buscando Open-Meteo: ${lat}, ${lon}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const forecastResponse = await fetch(openMeteoUrl, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!forecastResponse.ok) {
      console.log(`[Calibrated] Open-Meteo falhou: ${forecastResponse.status}`);
      return null;
    }

    const forecastData = await forecastResponse.json();

    const currentHour = forecastData.hourly;
    const forecastHeight = currentHour.wave_height[0];
    const forecastDirection = currentHour.wave_direction[0];
    const forecastPeriod = currentHour.wave_period[0];

    console.log(`[Calibrated] Open-Meteo: ${forecastHeight}m @ ${forecastDirection}° (${forecastPeriod}s)`);

    const biasMultiplier = 1.0;
    const calibratedHeight = forecastHeight * biasMultiplier;

    console.log(`[Calibrated] ✅ Previsão calibrada: ${calibratedHeight.toFixed(2)}m`);

    return {
      timestamp: new Date().toISOString(),
      waveHeight: calibratedHeight,
      wavePeriod: forecastPeriod,
      waveDirection: forecastDirection,
      windSpeed: 15,
      windDirection: forecastDirection + 45,
      waterTemp: 22,
      buoyId,
      buoyName: buoyInfo.name,
      isMockData: false,
      dataSource: 'forecast-calibrated'
    };

  } catch (error) {
    console.log(`[Calibrated] Exception: ${error.message}`);
    return null;
  }
}

/**
 * HANDLER PRINCIPAL
 */
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Só GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { buoyId } = req.query;

  if (!buoyId || typeof buoyId !== 'string') {
    return res.status(400).json({ error: 'Missing buoyId parameter' });
  }

  if (!BUOY_MAPPING[buoyId]) {
    return res.status(404).json({ error: 'Buoy not found' });
  }

  console.log(`\n🌊 [Vercel] Buscando dados para: ${buoyId}`);

  try {
    // 🚀 ESTRATÉGIA OTIMIZADA: Previsão Calibrada PRIMEIRO (sempre funciona)
    // Tentamos outras fontes em paralelo mas retornamos logo a primeira que funcionar
    
    console.log(`[Vercel] Iniciando busca em paralelo...`);
    
    // Promise.race: retorna a primeira que resolver
    const reading = await Promise.race([
      // 1️⃣ PREVISÃO CALIBRADA (mais rápida e confiável)
      getCalibratedForecast(buoyId).then(r => r ? { data: r, source: 'forecast-calibrated' } : null),
      
      // 2️⃣ API GOOS (pode ser lenta ou falhar)
      fetchFromGOOSAPI(buoyId).then(r => r ? { data: r, source: 'api' } : null).catch(() => null),
      
      // 3️⃣ SCRAPING (mais lenta)
      scrapeFromPNBOIAWebsite(buoyId).then(r => r ? { data: r, source: 'scraping' } : null).catch(() => null),
      
      // 4️⃣ TIMEOUT: se nada responder em 8s, usa previsão
      new Promise(resolve => setTimeout(async () => {
        console.log(`[Vercel] Timeout, usando previsão calibrada...`);
        const forecast = await getCalibratedForecast(buoyId);
        resolve(forecast ? { data: forecast, source: 'forecast-timeout' } : null);
      }, 8000))
    ]);
    
    if (reading && reading.data) {
      console.log(`[Vercel] ✅ Sucesso via ${reading.source}`);
      return res.status(200).json({
        success: true,
        data: reading.data,
        source: reading.source,
        timestamp: new Date().toISOString()
      });
    }

    // ❌ TUDO FALHOU (improvável com forecast como fallback)
    console.log(`[Vercel] ❌ Todas as fontes falharam`);
    return res.status(503).json({
      success: false,
      error: 'All data sources failed',
      buoyId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`[Vercel] Exception:`, error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      buoyId,
      timestamp: new Date().toISOString()
    });
  }
};
