/**
 * ⚡⚡⚡ HOOK PNBOIA INSTANTÂNEO ⚡⚡⚡
 * 
 * ESTRATÉGIA: Mostrar dados IMEDIATAMENTE (0 segundos de espera)
 * 
 * COMO FUNCIONA:
 * 1. Retorna dados instantâneos mockados IMEDIATAMENTE (baseados em médias históricas)
 * 2. Backend sincroniza dados reais em background (automático)
 * 3. Quando dados reais chegam, atualiza automaticamente (transparente para usuário)
 * 
 * IMPORTANTE: Dados "mockados" não são inventados - são baseados em:
 * - Médias sazonais documentadas (2020-2023)
 * - Padrões históricos das boias PNBOIA
 * - Condições típicas de cada região
 * 
 * Para bias correction, médias históricas são MAIS DO QUE ADEQUADAS
 * porque os ajustes são baseados em diferenças relativas, não valores absolutos.
 */

import { useEffect, useState } from 'react';
import { getAllInstantBuoyData, InstantBuoyData } from '../services/pnboiaInstantData';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PNBOIAStatus {
  buoys: InstantBuoyData[];
  isUsingRealData: boolean;
  lastSync: string | null;
  activeCount: number;
  totalCount: number;
}

export function usePNBOIAInstant() {
  const [status, setStatus] = useState<PNBOIAStatus>({
    buoys: getAllInstantBuoyData(), // ⚡ INSTANTÂNEO - dados aparecem imediatamente!
    isUsingRealData: false,
    lastSync: null,
    activeCount: 14,
    totalCount: 14
  });

  useEffect(() => {
    let isMounted = true;

    const checkForRealData = async () => {
      try {
        // Buscar dados reais das boias
        const dataUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/data`;
        const dataResponse = await fetch(dataUrl, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });

        if (!dataResponse.ok) {
          // Backend não respondeu - continuar com dados instantâneos
          return;
        }

        const dataResult = await dataResponse.json();

        if (dataResult.buoys && dataResult.buoys.length > 0) {
          // 🔍 VERIFICAR SE OS DADOS SÃO REAIS OU MOCKADOS
          const realBuoys = dataResult.buoys.filter((b: any) => b.hasData && b.isMockData === false);
          const mockBuoys = dataResult.buoys.filter((b: any) => b.hasData && b.isMockData === true);
          
          console.log(`🌊 PNBOIA Status: ${realBuoys.length} reais, ${mockBuoys.length} mock, ${dataResult.buoys.length - realBuoys.length - mockBuoys.length} offline`);

          // Buscar status para pegar lastGlobalSync
          const statusUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`;
          const statusResponse = await fetch(statusUrl, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          });
          
          let lastSync = null;
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            lastSync = statusData.lastGlobalSync;
          }

          if (isMounted) {
            // Mesclar dados do servidor com instantâneos (servidor tem prioridade)
            const instantBuoys = getAllInstantBuoyData();
            const mergedBuoys = instantBuoys.map(instant => {
              const serverData = dataResult.buoys.find((b: any) => b.id === instant.buoyId || b.buoyId === instant.buoyId);
              
              if (serverData && serverData.hasData) {
                // Usar dados do servidor (podem ser reais ou mock)
                return {
                  buoyId: serverData.buoyId || serverData.id,
                  buoyName: serverData.name || instant.buoyName,
                  waveHeight: serverData.waveHeight,
                  wavePeriod: serverData.wavePeriod,
                  waveDirection: serverData.waveDirection,
                  windSpeed: instant.windSpeed, // KV não tem vento
                  windDirection: instant.windDirection,
                  waterTemp: serverData.waterTemp || instant.waterTemp,
                  timestamp: serverData.timestamp,
                  source: serverData.isMockData ? 'server_mock' : serverData.dataSource || 'server_real'
                };
              }
              
              // Fallback para dados instantâneos
              return instant;
            });

            setStatus({
              buoys: mergedBuoys,
              isUsingRealData: realBuoys.length > 0, // TRUE se pelo menos 1 boia tem dados reais
              lastSync: lastSync,
              activeCount: dataResult.buoys.filter((b: any) => b.hasData).length,
              totalCount: 14
            });
          }
        } else {
          // Ainda não há dados reais - continuar com instantâneos
          console.log('ℹ️ Aguardando dados reais PNBOIA... (usando médias históricas)');
        }
      } catch (error) {
        // Erro ao verificar - continuar com dados instantâneos (graceful degradation)
        console.log('⚠️ Erro ao verificar dados reais, continuando com dados instantâneos');
      }
    };

    // Verificar imediatamente
    checkForRealData();

    // Verificar periodicamente (a cada 15 segundos nos primeiros 2 minutos, depois 1 minuto)
    let checkCount = 0;
    const maxFastChecks = 8; // 8 x 15s = 2 minutos
    
    const runCheck = () => {
      checkForRealData();
      checkCount++;
    };

    const fastInterval = setInterval(() => {
      if (checkCount < maxFastChecks) {
        runCheck();
      }
    }, 15000); // 15 segundos

    const slowInterval = setInterval(() => {
      if (checkCount >= maxFastChecks) {
        runCheck();
      }
    }, 60000); // 1 minuto

    return () => {
      isMounted = false;
      clearInterval(fastInterval);
      clearInterval(slowInterval);
    };
  }, []);

  return status;
}

/**
 * Hook para obter dados de uma boia específica (INSTANTÂNEO)
 */
export function useBuoyData(buoyId: string) {
  const { buoys, isUsingRealData, lastSync } = usePNBOIAInstant();
  
  const buoy = buoys.find(b => b.buoyId === buoyId);
  
  return {
    data: buoy || null,
    isReal: isUsingRealData,
    lastSync
  };
}
