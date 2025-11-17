/**
 * Weatherbit API
 * Interface para dados marinhos e meteorológicos do Weatherbit
 */

export const WEATHERBIT_INFO = {
  name: 'Weatherbit Marine API',
  provider: 'Weatherbit.io',
  model: 'High-resolution marine forecast',
  description: 'API comercial de previsão marinha',
  updateFrequency: 'Diariamente',
  freeLimit: '500 calls/day (free tier)',
  signupUrl: 'https://www.weatherbit.io/pricing'
};

/**
 * Busca dados marinhos do Weatherbit
 */
export async function getWeatherbitMarineData(
  latitude: number,
  longitude: number,
  days: number = 7
): Promise<any> {
  console.warn('Weatherbit API requer API key - usando fallback para Open-Meteo');
  
  // Retornar dados vazios
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
 * Busca dados meteorológicos do Weatherbit
 */
export async function getWeatherbitWeatherData(
  latitude: number,
  longitude: number,
  days: number = 7
): Promise<any> {
  console.warn('Weatherbit Weather API requer API key - usando fallback');
  
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
