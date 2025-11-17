/**
 * ═══════════════════════════════════════════════════════════════════════════
 * STORMGLASS API INTEGRATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * API Documentation: https://docs.stormglass.io/
 * API Key: 5d3d848a-ab63-11f0-a0d3-0242ac130003-5d3d8548-ab63-11f0-a0d3-0242ac130003
 * 
 * Este serviço busca dados meteorológicos marítimos da API StormGlass.
 * StormGlass agrega dados de múltiplas fontes (NOAA, MetOffice, etc.) e é 
 * muito popular para aplicações de surf profissionais.
 */

// API Key é carregada do backend (Supabase Secret)
const STORMGLASS_BASE_URL = 'https://api.stormglass.io/v2';

/**
 * Estrutura de dados de hora da StormGlass
 * Cada parâmetro contém valores de múltiplas fontes (noaa, sg, meteo, etc.)
 */
interface StormGlassHourData {
  time: string;
  // Ondas
  waveHeight?: { [source: string]: number };
  waveDirection?: { [source: string]: number };
  wavePeriod?: { [source: string]: number };
  // Swell
  swellHeight?: { [source: string]: number };
  swellDirection?: { [source: string]: number };
  swellPeriod?: { [source: string]: number };
  // Swell secundário (se disponível)
  secondarySwellHeight?: { [source: string]: number };
  secondarySwellDirection?: { [source: string]: number };
  secondarySwellPeriod?: { [source: string]: number };
  // Wind waves
  windWaveHeight?: { [source: string]: number };
  windWaveDirection?: { [source: string]: number };
  windWavePeriod?: { [source: string]: number };
  // Vento
  windSpeed?: { [source: string]: number };
  windDirection?: { [source: string]: number };
  // Outros
  waterTemperature?: { [source: string]: number };
  airTemperature?: { [source: string]: number };
}

export interface StormGlassResponse {
  hours: StormGlassHourData[];
  meta: {
    cost: number;
    dailyQuota: number;
    lat: number;
    lng: number;
    params: string[];
    requestCount: number;
    source: string[];
    start: string;
    end: string;
  };
}

/**
 * Busca dados meteorológicos marítimos da API StormGlass
 * 
 * @param latitude - Latitude do ponto
 * @param longitude - Longitude do ponto
 * @returns Dados formatados da StormGlass ou null em caso de erro
 */
export async function fetchStormGlassMarineData(
  latitude: number,
  longitude: number
): Promise<StormGlassResponse | null> {
  try {
    // Parâmetros que queremos buscar
    const params = [
      'waveHeight',
      'waveDirection', 
      'wavePeriod',
      'swellHeight',
      'swellDirection',
      'swellPeriod',
      'secondarySwellHeight',
      'secondarySwellDirection',
      'secondarySwellPeriod',
      'windWaveHeight',
      'windWaveDirection',
      'windWavePeriod',
      'windSpeed',
      'windDirection',
      'waterTemperature'
    ].join(',');
    
    // Buscar dados dos próximos 7 dias
    const now = new Date();
    const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const url = new URL(`${STORMGLASS_BASE_URL}/weather/point`);
    url.searchParams.append('lat', latitude.toFixed(4));
    url.searchParams.append('lng', longitude.toFixed(4));
    url.searchParams.append('params', params);
    url.searchParams.append('start', Math.floor(now.getTime() / 1000).toString());
    url.searchParams.append('end', Math.floor(end.getTime() / 1000).toString());
    // Fonte preferida: 'sg' (StormGlass agregado) ou 'noaa' (dados NOAA diretos)
    url.searchParams.append('source', 'sg,noaa,meteo');
    
    console.log(`\n🌊 Buscando dados StormGlass para: ${latitude}, ${longitude}`);
    console.log(`📡 URL: ${url.toString().replace(STORMGLASS_API_KEY, 'API_KEY_HIDDEN')}`);
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': STORMGLASS_API_KEY
      }
    });
    
    if (!response.ok) {
      console.error(`❌ Erro StormGlass: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`📄 Resposta de erro: ${errorText}`);
      
      // Verificar se é erro de quota
      if (response.status === 429) {
        console.error(`⚠️ QUOTA EXCEDIDA: Você atingiu o limite diário da API StormGlass`);
      }
      
      return null;
    }
    
    const data = await response.json() as StormGlassResponse;
    
    console.log(`✅ Dados StormGlass recebidos com sucesso`);
    
    // Log da quota (formato compatível com StormGlassQuotaPanel)
    console.log(`📊 Meta da requisição:`, {
      cost: data.meta.cost,
      dailyQuota: data.meta.dailyQuota,
      requestCount: data.meta.requestCount,
      sources: data.meta.source,
      lat: data.meta.lat,
      lng: data.meta.lng,
      start: data.meta.start,
      end: data.meta.end
    });
    
    // Verificar se temos dados marinhos
    const firstHour = data.hours[0];
    const hasMarineData = !!(
      firstHour?.waveHeight || 
      firstHour?.swellHeight || 
      firstHour?.windWaveHeight
    );
    
    if (!hasMarineData) {
      console.warn('⚠️ ATENÇÃO: Dados marinhos não disponíveis na resposta StormGlass');
      console.warn('   Verifique se sua conta tem acesso aos parâmetros marinhos');
    } else {
      console.log(`✅ Dados marinhos disponíveis!`);
      console.log(`   - Wave Height: ${firstHour.waveHeight ? 'OK' : 'N/A'}`);
      console.log(`   - Swell Height: ${firstHour.swellHeight ? 'OK' : 'N/A'}`);
      console.log(`   - Wind Wave Height: ${firstHour.windWaveHeight ? 'OK' : 'N/A'}`);
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados StormGlass:', error);
    return null;
  }
}

/**
 * Extrai o melhor valor de um parâmetro StormGlass
 * Prioridade: sg (agregado) > noaa > meteo > icon > outros
 */
function extractBestValue(param?: { [source: string]: number }): number {
  if (!param) return 0;
  
  // Prioridade de fontes
  const sources = ['sg', 'noaa', 'meteo', 'icon', 'fcoo', 'fmi', 'meto'];
  
  for (const source of sources) {
    if (param[source] !== undefined && param[source] !== null) {
      return param[source];
    }
  }
  
  // Se não encontrar nenhuma fonte preferida, pegar qualquer valor
  const values = Object.values(param);
  return values.length > 0 ? values[0] : 0;
}

/**
 * Converte dados StormGlass para o formato compatível com Open-Meteo
 * Isso permite usar a mesma lógica de processamento no waveApi.ts
 */
export function convertStormGlassToOpenMeteoFormat(
  stormglass: StormGlassResponse
): {
  hourly: {
    time: string[];
    wave_height: number[];
    wave_direction: number[];
    wave_period: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    swell_wave_height: number[];
    swell_wave_direction: number[];
    swell_wave_period: number[];
    wind_wave_height: number[];
    wind_wave_direction: number[];
    wind_wave_period: number[];
    secondary_swell_wave_height?: number[];
    secondary_swell_wave_direction?: number[];
    secondary_swell_wave_period?: number[];
  };
  daily: {
    time: string[];
    wave_height_max: number[];
    wave_height_min: number[];
  };
} {
  const time: string[] = [];
  const wave_height: number[] = [];
  const wave_direction: number[] = [];
  const wave_period: number[] = [];
  const wind_speed: number[] = [];
  const wind_direction: number[] = [];
  const swell_height: number[] = [];
  const swell_direction: number[] = [];
  const swell_period: number[] = [];
  const wind_wave_height: number[] = [];
  const wind_wave_direction: number[] = [];
  const wind_wave_period: number[] = [];
  const secondary_swell_height: number[] = [];
  const secondary_swell_direction: number[] = [];
  const secondary_swell_period: number[] = [];
  
  // Processar cada hora
  for (const hour of stormglass.hours) {
    time.push(hour.time);
    
    // Extrair valores com fallback para 0
    wave_height.push(extractBestValue(hour.waveHeight));
    wave_direction.push(extractBestValue(hour.waveDirection));
    wave_period.push(extractBestValue(hour.wavePeriod));
    
    // Vento (StormGlass retorna m/s, converter para km/h)
    const windSpeedMs = extractBestValue(hour.windSpeed);
    wind_speed.push(windSpeedMs * 3.6); // m/s para km/h
    wind_direction.push(extractBestValue(hour.windDirection));
    
    // Swell
    swell_height.push(extractBestValue(hour.swellHeight));
    swell_direction.push(extractBestValue(hour.swellDirection));
    swell_period.push(extractBestValue(hour.swellPeriod));
    
    // Wind waves
    wind_wave_height.push(extractBestValue(hour.windWaveHeight));
    wind_wave_direction.push(extractBestValue(hour.windWaveDirection));
    wind_wave_period.push(extractBestValue(hour.windWavePeriod));
    
    // Secondary swell
    secondary_swell_height.push(extractBestValue(hour.secondarySwellHeight));
    secondary_swell_direction.push(extractBestValue(hour.secondarySwellDirection));
    secondary_swell_period.push(extractBestValue(hour.secondarySwellPeriod));
  }
  
  console.log(`🔍 StormGlass Conversão:`);
  console.log(`   - Horários: ${time.length} pontos`);
  console.log(`   - Wave Height: ${wave_height.filter(h => h > 0).length}/${wave_height.length} pontos com dados`);
  console.log(`   - Swell Height: ${swell_height.filter(h => h > 0).length}/${swell_height.length} pontos com dados`);
  console.log(`   - Wind Wave Height: ${wind_wave_height.filter(h => h > 0).length}/${wind_wave_height.length} pontos com dados`);
  console.log(`   - Vento: ${wind_speed.filter(s => s > 0).length}/${wind_speed.length} pontos com dados`);
  
  // Gerar dados diários (agregação simples por dia)
  const dailyData = aggregateToDailyData(time, wave_height);
  
  return {
    hourly: {
      time,
      wave_height,
      wave_direction,
      wave_period,
      wind_speed_10m: wind_speed,
      wind_direction_10m: wind_direction,
      swell_wave_height: swell_height,
      swell_wave_direction: swell_direction,
      swell_wave_period: swell_period,
      wind_wave_height,
      wind_wave_direction,
      wind_wave_period,
      secondary_swell_wave_height: secondary_swell_height,
      secondary_swell_wave_direction: secondary_swell_direction,
      secondary_swell_wave_period: secondary_swell_period
    },
    daily: dailyData
  };
}

/**
 * Agrega dados horários em dados diários
 */
function aggregateToDailyData(
  times: string[], 
  waveHeights: number[]
): {
  time: string[];
  wave_height_max: number[];
  wave_height_min: number[];
} {
  const dailyMap = new Map<string, number[]>();
  
  times.forEach((time, index) => {
    const date = time.split('T')[0]; // Pega apenas YYYY-MM-DD
    if (!dailyMap.has(date)) {
      dailyMap.set(date, []);
    }
    dailyMap.get(date)!.push(waveHeights[index]);
  });
  
  const time: string[] = [];
  const wave_height_max: number[] = [];
  const wave_height_min: number[] = [];
  
  dailyMap.forEach((heights, date) => {
    time.push(date);
    wave_height_max.push(Math.max(...heights));
    wave_height_min.push(Math.min(...heights));
  });
  
  return { time, wave_height_max, wave_height_min };
}

/**
 * Testa a conexão com a API StormGlass
 * Útil para verificar se a chave da API está funcionando
 */
export async function testStormGlassConnection(): Promise<boolean> {
  console.log('\n🧪 Testando conexão com API StormGlass...');
  
  // Testar com coordenadas do Palanque (Florianópolis)
  const testLat = -27.5892;
  const testLon = -48.4686;
  
  const data = await fetchStormGlassMarineData(testLat, testLon);
  
  if (data && data.hours.length > 0) {
    console.log('✅ Conexão com StormGlass OK!');
    console.log(`📍 Testado em: ${data.meta.lat}, ${data.meta.lng}`);
    console.log(`📊 Dados recebidos: ${data.hours.length} horas`);
    console.log(`💰 Custo da requisição: ${data.meta.cost} créditos`);
    console.log(`📈 Quota diária: ${data.meta.requestCount}/${data.meta.dailyQuota}`);
    return true;
  } else {
    console.log('❌ Falha ao conectar com StormGlass');
    return false;
  }
}
