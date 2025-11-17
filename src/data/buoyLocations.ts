/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LOCALIZAÇÃO DAS BOIAS PNBOIA (MARINHA DO BRASIL)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Sistema de boias oceanográficas da Marinha do Brasil que medem em tempo real:
 * - Altura significativa de ondas (Hs)
 * - Período de pico (Tp)
 * - Direção das ondas
 * - Velocidade e direção do vento
 * - Temperatura da água
 * 
 * Fonte: https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
 * Atualização: Dados disponíveis a cada 1-3 horas
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface Buoy {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  depth: number; // metros (profundidade de instalação)
  status: 'active' | 'maintenance' | 'inactive';
  pnboiaCode?: string; // Código usado no site PNBOIA
  coverageRadius: number; // km (raio aproximado de influência)
  notes?: string;
}

/**
 * Lista de boias PNBOIA ativas e suas coordenadas
 * Dados baseados na rede PNBOIA da Marinha do Brasil
 */
export const pnboiaBuoys: Buoy[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SUL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pnboia-rio-grande',
    name: 'Rio Grande',
    location: 'Rio Grande do Sul',
    latitude: -32.25,
    longitude: -50.0,
    depth: 200,
    status: 'active',
    pnboiaCode: 'RG',
    coverageRadius: 300,
    notes: 'Boia offshore cobrindo litoral do RS'
  },
  
  {
    id: 'pnboia-florianopolis',
    name: 'Florianópolis',
    location: 'Santa Catarina',
    latitude: -27.7,
    longitude: -47.6,
    depth: 150,
    status: 'active',
    pnboiaCode: 'FLN',
    coverageRadius: 250,
    notes: 'Boia offshore cobrindo litoral de SC'
  },
  
  {
    id: 'pnboia-itajai',
    name: 'Itajaí',
    location: 'Santa Catarina',
    latitude: -27.0,
    longitude: -47.2,
    depth: 100,
    status: 'active',
    pnboiaCode: 'ITJ',
    coverageRadius: 200,
    notes: 'Boia offshore norte de SC'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SUDESTE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pnboia-santos',
    name: 'Santos',
    location: 'São Paulo',
    latitude: -25.0,
    longitude: -45.0,
    depth: 200,
    status: 'active',
    pnboiaCode: 'SNT',
    coverageRadius: 300,
    notes: 'Boia offshore cobrindo litoral sul de SP'
  },
  
  {
    id: 'pnboia-rio-de-janeiro',
    name: 'Rio de Janeiro',
    location: 'Rio de Janeiro',
    latitude: -23.6,
    longitude: -42.2,
    depth: 1500,
    status: 'active',
    pnboiaCode: 'RJ',
    coverageRadius: 350,
    notes: 'Boia offshore profunda cobrindo litoral do RJ'
  },
  
  {
    id: 'pnboia-arraial-do-cabo',
    name: 'Arraial do Cabo',
    location: 'Rio de Janeiro',
    latitude: -23.0,
    longitude: -41.8,
    depth: 80,
    status: 'active',
    pnboiaCode: 'AC',
    coverageRadius: 200,
    notes: 'Boia mais próxima da costa, região de Cabo Frio'
  },
  
  {
    id: 'pnboia-vitoria',
    name: 'Vitória',
    location: 'Espírito Santo',
    latitude: -20.5,
    longitude: -40.0,
    depth: 150,
    status: 'active',
    pnboiaCode: 'VIT',
    coverageRadius: 250,
    notes: 'Boia offshore cobrindo litoral do ES'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NORDESTE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pnboia-salvador',
    name: 'Salvador',
    location: 'Bahia',
    latitude: -13.0,
    longitude: -38.0,
    depth: 180,
    status: 'active',
    pnboiaCode: 'SSA',
    coverageRadius: 300,
    notes: 'Boia offshore cobrindo litoral norte da BA'
  },
  
  {
    id: 'pnboia-ilheus',
    name: 'Ilhéus',
    location: 'Bahia',
    latitude: -14.8,
    longitude: -38.8,
    depth: 120,
    status: 'active',
    pnboiaCode: 'ILH',
    coverageRadius: 250,
    notes: 'Boia cobrindo litoral sul da BA'
  },
  
  {
    id: 'pnboia-recife',
    name: 'Recife',
    location: 'Pernambuco',
    latitude: -8.3,
    longitude: -34.5,
    depth: 200,
    status: 'active',
    pnboiaCode: 'REC',
    coverageRadius: 280,
    notes: 'Boia offshore cobrindo litoral de PE'
  },
  
  {
    id: 'pnboia-natal',
    name: 'Natal',
    location: 'Rio Grande do Norte',
    latitude: -5.5,
    longitude: -35.0,
    depth: 150,
    status: 'active',
    pnboiaCode: 'NAT',
    coverageRadius: 250,
    notes: 'Boia offshore cobrindo litoral do RN'
  },
  
  {
    id: 'pnboia-fortaleza',
    name: 'Fortaleza',
    location: 'Ceará',
    latitude: -3.5,
    longitude: -38.5,
    depth: 180,
    status: 'active',
    pnboiaCode: 'FOR',
    coverageRadius: 300,
    notes: 'Boia offshore cobrindo litoral do CE'
  },
  
  {
    id: 'pnboia-sao-luis',
    name: 'São Luís',
    location: 'Maranhão',
    latitude: -2.0,
    longitude: -44.0,
    depth: 100,
    status: 'active',
    pnboiaCode: 'SLZ',
    coverageRadius: 250,
    notes: 'Boia cobrindo litoral do MA'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NORTE
  // ══════��════════════════════════════════════════════════════════════════════
  {
    id: 'pnboia-santarem',
    name: 'Santarém',
    location: 'Pará',
    latitude: -1.5,
    longitude: -48.0,
    depth: 50,
    status: 'active',
    pnboiaCode: 'STM',
    coverageRadius: 200,
    notes: 'Boia na região de influência amazônica'
  }
];

/**
 * Encontra a boia mais próxima de uma coordenada
 * @param lat Latitude do pico
 * @param lon Longitude do pico
 * @returns Boia mais próxima e distância em km
 */
export function getNearestBuoy(
  lat: number,
  lon: number
): { buoy: Buoy; distance: number } | null {
  const activeBuoys = pnboiaBuoys.filter(b => b.status === 'active');
  
  if (activeBuoys.length === 0) return null;
  
  let nearest: Buoy | null = null;
  let minDistance = Infinity;
  
  for (const buoy of activeBuoys) {
    const distance = calculateDistance(lat, lon, buoy.latitude, buoy.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = buoy;
    }
  }
  
  if (!nearest) return null;
  
  return { buoy: nearest, distance: minDistance };
}

/**
 * Calcula distância entre dois pontos usando fórmula de Haversine
 * @returns Distância em quilômetros
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Verifica se uma boia está dentro do raio de cobertura de um pico
 * @param lat Latitude do pico
 * @param lon Longitude do pico
 * @param buoyId ID da boia
 * @returns true se o pico está dentro do raio de cobertura
 */
export function isBuoyInRange(
  lat: number,
  lon: number,
  buoyId: string
): boolean {
  const buoy = pnboiaBuoys.find(b => b.id === buoyId);
  if (!buoy) return false;
  
  const distance = calculateDistance(lat, lon, buoy.latitude, buoy.longitude);
  return distance <= buoy.coverageRadius;
}

/**
 * Lista todas as boias que cobrem um determinado pico
 * @param lat Latitude do pico
 * @param lon Longitude do pico
 * @returns Array de boias que cobrem o pico
 */
export function getBuoysInRange(
  lat: number,
  lon: number
): Array<{ buoy: Buoy; distance: number }> {
  const activeBuoys = pnboiaBuoys.filter(b => b.status === 'active');
  
  const buoysInRange = activeBuoys
    .map(buoy => ({
      buoy,
      distance: calculateDistance(lat, lon, buoy.latitude, buoy.longitude)
    }))
    .filter(item => item.distance <= item.buoy.coverageRadius)
    .sort((a, b) => a.distance - b.distance);
  
  return buoysInRange;
}
