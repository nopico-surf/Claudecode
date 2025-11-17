/**
 * ════════════════════════════════════════════════════════════════════════════
 * API DE OBSERVAÇÕES - COMUNICAÇÃO COM BACKEND SUPABASE
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Este serviço substitui o localStorage por chamadas ao banco de dados.
 * Agora as observações ficam salvas no servidor e acessíveis de qualquer lugar!
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b`;

interface Observation {
  id: string;
  timestamp: string;
  spotId: string;
  spotName: string;
  offshore: {
    height: number;
    period: number;
    direction: number;
    directionLabel: string;
  };
  buoy?: {
    height: number;
    buoyId: string;
    correctionApplied: boolean;
  };
  forecast: {
    height: number;
    multiplier: number;
  };
  observed: {
    height: number;
    quality: number;
  };
  error: number;
  errorAbsolute: number;
  notes?: string;
}

/**
 * Buscar todas as observações do servidor
 */
export async function getAllObservations(): Promise<Observation[]> {
  try {
    console.log('📊 Buscando observações do servidor...');
    
    const response = await fetch(`${BASE_URL}/observations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log(`✅ ${data.total} observações carregadas do servidor`);
    
    return data.observations || [];
    
  } catch (error) {
    console.error('❌ Erro ao buscar observações:', error);
    
    // Fallback: tentar carregar do localStorage
    console.log('⚠️ Tentando fallback do localStorage...');
    const stored = localStorage.getItem('nopico_observations');
    if (stored) {
      try {
        const local = JSON.parse(stored);
        console.log(`✅ ${local.length} observações carregadas do localStorage (fallback)`);
        return local;
      } catch (e) {
        console.error('❌ Erro ao parsear localStorage:', e);
      }
    }
    
    return [];
  }
}

/**
 * Salvar uma nova observação no servidor
 */
export async function saveObservation(observation: Observation): Promise<boolean> {
  try {
    console.log(`📝 Salvando observação: ${observation.spotName}...`);
    
    const response = await fetch(`${BASE_URL}/observations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(observation)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log(`✅ Observação salva! Total: ${data.total} observações`);
    
    // Também salvar no localStorage como backup
    try {
      const all = await getAllObservations();
      localStorage.setItem('nopico_observations', JSON.stringify(all));
      console.log('💾 Backup salvo no localStorage');
    } catch (e) {
      console.warn('⚠️ Não foi possível salvar backup no localStorage:', e);
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao salvar observação:', error);
    
    // Fallback: salvar no localStorage
    console.log('⚠️ Salvando no localStorage (fallback)...');
    try {
      const stored = localStorage.getItem('nopico_observations');
      const observations = stored ? JSON.parse(stored) : [];
      
      // Remover duplicata se existir
      const filtered = observations.filter((o: Observation) => o.id !== observation.id);
      filtered.push(observation);
      
      // Ordenar por timestamp
      filtered.sort((a: Observation, b: Observation) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      localStorage.setItem('nopico_observations', JSON.stringify(filtered));
      console.log('✅ Salvo no localStorage (fallback)');
      
      return true;
    } catch (e) {
      console.error('❌ Erro ao salvar no localStorage:', e);
      return false;
    }
  }
}

/**
 * Atualizar flag de calibração de uma observação
 */
export async function updateObservationCalibration(id: string, calibrationEnabled: boolean): Promise<boolean> {
  try {
    console.log(`🔧 Atualizando calibração: ${id} → ${calibrationEnabled ? 'ATIVAR' : 'DESATIVAR'}...`);
    
    const url = `${BASE_URL}/observations/${id}/calibration`;
    console.log(`📍 URL: ${url}`);
    console.log(`📦 Body: ${JSON.stringify({ calibrationEnabled })}`);
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ calibrationEnabled }),
      mode: 'cors'
    });
    
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error response: ${errorText}`);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`✅ Server response:`, result);
    console.log(`✅ Calibração ${calibrationEnabled ? '🟢 ATIVADA' : '⚪ DESATIVADA'}`);
    
    // Limpar cache de ajustes para recalcular
    const { clearAdjustmentsCache } = await import('./calibration/liveAdjustments');
    clearAdjustmentsCache();
    console.log('🔄 Cache de calibração limpo - ajustes serão recalculados');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao atualizar calibração:', error);
    return false;
  }
}

/**
 * Deletar uma observação específica
 */
export async function deleteObservation(id: string): Promise<boolean> {
  try {
    console.log(`🗑️ Deletando observação: ${id}...`);
    
    const response = await fetch(`${BASE_URL}/observations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    console.log(`✅ Observação ${id} deletada`);
    
    // Também remover do localStorage
    try {
      const stored = localStorage.getItem('nopico_observations');
      if (stored) {
        const observations = JSON.parse(stored);
        const filtered = observations.filter((o: Observation) => o.id !== id);
        localStorage.setItem('nopico_observations', JSON.stringify(filtered));
      }
    } catch (e) {
      console.warn('⚠️ Erro ao remover do localStorage:', e);
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao deletar observação:', error);
    return false;
  }
}

/**
 * Deletar TODAS as observações
 */
export async function deleteAllObservations(): Promise<boolean> {
  try {
    console.log(`🗑️ Deletando TODAS as observações...`);
    
    const response = await fetch(`${BASE_URL}/observations`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    console.log(`✅ Todas as observações foram deletadas`);
    
    // Também limpar localStorage
    localStorage.removeItem('nopico_observations');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao deletar todas as observações:', error);
    return false;
  }
}

/**
 * Obter estatísticas das observações
 */
export async function getObservationStats(): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/observations/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.stats;
    
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    return null;
  }
}

/**
 * Migrar observações do localStorage para o servidor
 * (Executar uma vez para transferir dados antigos)
 */
export async function migrateLocalStorageToServer(): Promise<{ success: number; failed: number }> {
  try {
    console.log('🔄 Iniciando migração do localStorage para servidor...');
    
    const stored = localStorage.getItem('nopico_observations');
    if (!stored) {
      console.log('⚠️ Nenhuma observação no localStorage');
      return { success: 0, failed: 0 };
    }
    
    const observations: Observation[] = JSON.parse(stored);
    console.log(`📦 ${observations.length} observações encontradas no localStorage`);
    
    let success = 0;
    let failed = 0;
    
    for (const obs of observations) {
      const saved = await saveObservation(obs);
      if (saved) {
        success++;
      } else {
        failed++;
      }
    }
    
    console.log(`✅ Migração concluída: ${success} sucesso, ${failed} falhas`);
    
    return { success, failed };
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    return { success: 0, failed: 0 };
  }
}
