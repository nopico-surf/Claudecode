// Banco de observações de surf para calibração
// Cada observação compara previsão vs realidade

export interface SurfObservation {
  id: string;
  timestamp: string;
  spotId: string;
  spotName: string;
  
  // Condições offshore (previsão)
  offshore: {
    height: number;        // metros
    period: number;        // segundos
    direction: number;     // graus (0-360)
    directionLabel: string; // "SE", "S", etc
  };
  
  // Dados da boia PNBOIA (se disponível)
  buoy?: {
    height: number;        // metros (boia real)
    period?: number;       // segundos
    direction?: number;    // graus
    buoyId?: string;       // ID da boia PNBOIA
    correctionApplied?: boolean; // Se bias correction foi aplicado
  };
  
  // Previsão do sistema
  forecast: {
    height: number;        // metros
    multiplier: number;    // multiplicador aplicado
    source: 'manual' | 'pattern' | 'default';
  };
  
  // Realidade observada
  observed: {
    height: number;        // metros (sua observação real)
    quality: 1 | 2 | 3 | 4 | 5; // 1-5 estrelas
  };
  
  // Contexto da sessão
  context: {
    tide: 'low' | 'mid' | 'high';
    tideHeight?: number;   // metros
    wind: string;          // "NE 12kt"
    windDirection?: number;
    windSpeed?: number;
    sessionTime: string;   // "08:00-10:00"
  };
  
  // Análise
  error: number;           // % de erro (positivo = teve MAIS onda que previsto, negativo = teve MENOS)
  errorAbsolute: number;   // metros de diferença (Real - Previsto)
  
  // Notas e confiança
  notes?: string;
  confidence: 'high' | 'medium' | 'low';
  
  // Sugestão automática
  suggestedAdjustment?: {
    currentMultiplier: number;
    suggestedMultiplier: number;
    reason: string;
  };
}

// Banco de observações (localStorage por enquanto, depois Supabase)
export const observationLog: SurfObservation[] = [];

// Helper para adicionar observação
export function addObservation(obs: Omit<SurfObservation, 'id' | 'timestamp' | 'error' | 'errorAbsolute'>): SurfObservation {
  // ✅ CORRIGIDO: Fórmula do ponto de vista do surfista
  // Positivo (+) = Tinha MAIS onda que o previsto (bom!)
  // Negativo (-) = Tinha MENOS onda que o previsto (ruim!)
  // Fórmula: (Real - Previsto) / Previsto × 100
  const error = ((obs.observed.height - obs.forecast.height) / obs.forecast.height) * 100;
  const errorAbsolute = obs.observed.height - obs.forecast.height;
  
  const observation: SurfObservation = {
    ...obs,
    id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    error: parseFloat(error.toFixed(2)),
    errorAbsolute: parseFloat(errorAbsolute.toFixed(2))
  };
  
  observationLog.push(observation);
  saveToLocalStorage();
  
  return observation;
}

// Helper para obter observações de um pico
export function getObservationsBySpot(spotId: string): SurfObservation[] {
  return observationLog.filter(obs => obs.spotId === spotId);
}

// Helper para obter observações por direção
export function getObservationsByDirection(spotId: string, minDeg: number, maxDeg: number): SurfObservation[] {
  return observationLog.filter(obs => 
    obs.spotId === spotId &&
    obs.offshore.direction >= minDeg &&
    obs.offshore.direction <= maxDeg
  );
}

// Persistência localStorage
function saveToLocalStorage() {
  try {
    localStorage.setItem('nopico_observations', JSON.stringify(observationLog));
  } catch (error) {
    console.error('Erro ao salvar observações:', error);
  }
}

export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('nopico_observations');
    if (data) {
      const loaded = JSON.parse(data);
      observationLog.length = 0;
      observationLog.push(...loaded);
      console.log(`✅ Carregadas ${observationLog.length} observações do localStorage`);
    }
  } catch (error) {
    console.error('Erro ao carregar observações:', error);
  }
}

// Helper para REMOVER observações específicas (útil para limpeza de dados poluídos)
export function removeObservationsBySpotAndDate(spotId: string, dateStr?: string) {
  const today = dateStr || new Date().toISOString().split('T')[0];
  
  const beforeCount = observationLog.length;
  
  // Filtrar removendo as observações do spot de hoje
  const filteredObservations = observationLog.filter(obs => {
    const obsDate = obs.timestamp.split('T')[0];
    const shouldRemove = obs.spotId === spotId && obsDate === today;
    
    if (shouldRemove) {
      console.log(`🗑️ Removendo observação poluída: ${obs.spotName} - ${obs.timestamp}`);
      console.log(`   Previsão: ${obs.forecast.height.toFixed(2)}m | Observado: ${obs.observed.height.toFixed(2)}m`);
    }
    
    return !shouldRemove;
  });
  
  const removedCount = beforeCount - filteredObservations.length;
  
  // Atualizar array
  observationLog.length = 0;
  observationLog.push(...filteredObservations);
  
  // Salvar
  saveToLocalStorage();
  
  console.log(`✅ Limpeza concluída: ${removedCount} observação(ões) removida(s) de ${spotId}`);
  console.log(`   Total restante: ${observationLog.length} observações no banco`);
  
  return removedCount;
}

// Helper para limpar TODAS as observações (reset completo)
export function clearAllObservations() {
  const count = observationLog.length;
  observationLog.length = 0;
  saveToLocalStorage();
  console.log(`🗑️ Banco limpo: ${count} observações removidas`);
  return count;
}

// Carregar ao inicializar
if (typeof window !== 'undefined') {
  loadFromLocalStorage();
}
