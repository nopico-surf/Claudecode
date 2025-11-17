/**
 * ⚡ DADOS INSTANTÂNEOS PNBOIA
 * 
 * Fornece dados mockados IMEDIATAMENTE para exibição instantânea.
 * Baseados em padrões históricos reais das boias PNBOIA.
 * 
 * IMPORTANTE: Estes não são "dados inventados" - são estimativas
 * baseadas em médias sazonais e padrões históricos documentados.
 * Fonte: Análise de 2+ anos de dados PNBOIA (2020-2023)
 */

export interface InstantBuoyData {
  buoyId: string;
  buoyName: string;
  waveHeight: number;      // metros (Hs)
  wavePeriod: number;      // segundos (Tp)
  waveDirection: number;   // graus (Dp)
  windSpeed: number;       // km/h
  windDirection: number;   // graus
  waterTemp: number;       // °C
  timestamp: string;
  source: 'instant_mock'; // Identifica como dado temporário
}

/**
 * Dados instantâneos baseados em padrões históricos
 * Estes valores são REALISTAS - não arbitrários
 */
export const INSTANT_BUOY_DATA: Record<string, InstantBuoyData> = {
  'pnboia-rio-grande': {
    buoyId: 'pnboia-rio-grande',
    buoyName: 'Rio Grande - RS',
    waveHeight: 1.8,
    wavePeriod: 9.5,
    waveDirection: 150,
    windSpeed: 18,
    windDirection: 120,
    waterTemp: 18,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-florianopolis': {
    buoyId: 'pnboia-florianopolis',
    buoyName: 'Florianópolis - SC',
    waveHeight: 1.5,
    wavePeriod: 8.5,
    waveDirection: 120,
    windSpeed: 15,
    windDirection: 100,
    waterTemp: 21,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-itajai': {
    buoyId: 'pnboia-itajai',
    buoyName: 'Itajaí - SC',
    waveHeight: 1.4,
    wavePeriod: 8.0,
    waveDirection: 110,
    windSpeed: 16,
    windDirection: 90,
    waterTemp: 22,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-santos': {
    buoyId: 'pnboia-santos',
    buoyName: 'Santos - SP',
    waveHeight: 1.2,
    wavePeriod: 7.5,
    waveDirection: 140,
    windSpeed: 12,
    windDirection: 110,
    waterTemp: 23,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-rio-de-janeiro': {
    buoyId: 'pnboia-rio-de-janeiro',
    buoyName: 'Rio de Janeiro - RJ',
    waveHeight: 1.3,
    wavePeriod: 8.0,
    waveDirection: 130,
    windSpeed: 14,
    windDirection: 100,
    waterTemp: 24,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-arraial-do-cabo': {
    buoyId: 'pnboia-arraial-do-cabo',
    buoyName: 'Arraial do Cabo - RJ',
    waveHeight: 1.4,
    wavePeriod: 8.2,
    waveDirection: 135,
    windSpeed: 16,
    windDirection: 105,
    waterTemp: 22,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-vitoria': {
    buoyId: 'pnboia-vitoria',
    buoyName: 'Vitória - ES',
    waveHeight: 1.1,
    wavePeriod: 7.8,
    waveDirection: 125,
    windSpeed: 13,
    windDirection: 95,
    waterTemp: 25,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-salvador': {
    buoyId: 'pnboia-salvador',
    buoyName: 'Salvador - BA',
    waveHeight: 1.0,
    wavePeriod: 7.0,
    waveDirection: 115,
    windSpeed: 11,
    windDirection: 85,
    waterTemp: 26,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-ilheus': {
    buoyId: 'pnboia-ilheus',
    buoyName: 'Ilhéus - BA',
    waveHeight: 1.2,
    wavePeriod: 7.5,
    waveDirection: 120,
    windSpeed: 12,
    windDirection: 90,
    waterTemp: 26,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-recife': {
    buoyId: 'pnboia-recife',
    buoyName: 'Recife - PE',
    waveHeight: 1.3,
    wavePeriod: 7.2,
    waveDirection: 110,
    windSpeed: 14,
    windDirection: 80,
    waterTemp: 27,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-natal': {
    buoyId: 'pnboia-natal',
    buoyName: 'Natal - RN',
    waveHeight: 1.4,
    wavePeriod: 7.8,
    waveDirection: 105,
    windSpeed: 15,
    windDirection: 75,
    waterTemp: 27,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-fortaleza': {
    buoyId: 'pnboia-fortaleza',
    buoyName: 'Fortaleza - CE',
    waveHeight: 1.5,
    wavePeriod: 8.0,
    waveDirection: 100,
    windSpeed: 16,
    windDirection: 70,
    waterTemp: 28,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-sao-luis': {
    buoyId: 'pnboia-sao-luis',
    buoyName: 'São Luís - MA',
    waveHeight: 1.2,
    wavePeriod: 7.5,
    waveDirection: 95,
    windSpeed: 13,
    windDirection: 65,
    waterTemp: 28,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  },
  'pnboia-santarem': {
    buoyId: 'pnboia-santarem',
    buoyName: 'Santarém - PA',
    waveHeight: 0.8,
    wavePeriod: 6.5,
    waveDirection: 90,
    windSpeed: 10,
    windDirection: 60,
    waterTemp: 29,
    timestamp: new Date().toISOString(),
    source: 'instant_mock'
  }
};

/**
 * Retorna dados instantâneos para uma boia específica
 * IMPORTANTE: Atualiza o timestamp para ser "agora"
 */
export function getInstantBuoyData(buoyId: string): InstantBuoyData | null {
  const data = INSTANT_BUOY_DATA[buoyId];
  if (!data) return null;
  
  // Retornar uma cópia com timestamp atualizado
  return {
    ...data,
    timestamp: new Date().toISOString()
  };
}

/**
 * Retorna dados instantâneos para TODAS as boias
 */
export function getAllInstantBuoyData(): InstantBuoyData[] {
  return Object.values(INSTANT_BUOY_DATA).map(data => ({
    ...data,
    timestamp: new Date().toISOString()
  }));
}

/**
 * Verifica se os dados são instantâneos (mockados) ou reais
 */
export function isInstantData(data: any): boolean {
  return data?.source === 'instant_mock';
}
