/**
 * NOAA WaveWatch III API
 * Interface para dados de ondas do NOAA
 */

export const NOAA_INFO = {
  name: 'NOAA WaveWatch III',
  provider: 'NOAA - National Oceanic and Atmospheric Administration',
  model: 'WaveWatch III Global Wave Model',
  description: 'Modelo global de ondas usado profissionalmente',
  updateFrequency: 'A cada 6 horas',
  coverage: 'Global',
  resolution: '0.5° (~50km)'
};

/**
 * Busca dados de ondas do NOAA
 * Nota: Esta é uma implementação simplificada
 */
export async function getNOAAWaveData(
  latitude: number,
  longitude: number,
  days: number = 7
): Promise<any> {
  // NOAA não tem API pública fácil de usar
  // Esta é uma implementação placeholder
  console.warn('NOAA API não implementada - usando fallback para Open-Meteo');
  
  // Retornar dados vazios que serão tratados pelo sistema
  return {
    latitude,
    longitude,
    hourly: {
      time: [],
      wave_height: [],
      wave_period: [],
      wave_direction: []
    },
    daily: {
      time: [],
      wave_height_max: [],
      wave_period_max: []
    }
  };
}

/**
 * Busca dados meteorológicos do NOAA
 */
export async function getNOAAWeatherData(
  latitude: number,
  longitude: number,
  days: number = 7
): Promise<any> {
  console.warn('NOAA Weather API não implementada - usando fallback');
  
  return {
    latitude,
    longitude,
    hourly: {
      time: [],
      wind_speed_10m: [],
      wind_direction_10m: []
    }
  };
}
