/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HOOK: AUTO-SYNC PNBOIA (SINCRONIZAÇÃO AUTOMÁTICA)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este hook MONITORA e SINCRONIZA automaticamente as boias PNBOIA.
 * 
 * ⚡ COMPORTAMENTO:
 * 1. Ao carregar: Verifica se há dados no servidor
 * 2. Se não houver: Sincroniza AUTOMATICAMENTE (primeira vez)
 * 3. Continua monitorando e re-sincronizando a cada 3 horas
 * 
 * ✅ RESULTADO:
 * - Dados aparecem automaticamente (sem precisar apertar botão)
 * - Primeira sincronização: ~20-30 segundos
 * - Atualizações automáticas: a cada 3 horas (alinhado com boias PNBOIA)
 * - Sistema funciona mesmo se boias estiverem offline
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface SyncStatus {
  isInitialized: boolean;
  lastSync: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
  buoysActive: number;
  buoysTotal: number;
}

const CHECK_INTERVAL_INITIAL = 10 * 1000; // ⚡ 10 segundos (primeiros 2 minutos)
const CHECK_INTERVAL_NORMAL = 60 * 1000; // 1 minuto (após dados aparecerem)
const AUTO_SYNC_INTERVAL = 3 * 60 * 60 * 1000; // 3 horas (re-sincronização automática - alinhado com atualização das boias PNBOIA)
const DEBUG = false; // Debug desativado - sistema funciona silenciosamente

export function usePNBOIAAutoSync() {
  const [status, setStatus] = useState<SyncStatus>({
    isInitialized: false,
    lastSync: null,
    isLoading: false,
    isSyncing: false,
    error: null,
    buoysActive: 0,
    buoysTotal: 14
  });

  const checkIntervalRef = useRef<number | null>(null);
  const syncIntervalRef = useRef<number | null>(null);
  const hasCheckedRef = useRef(false);
  const checkCountRef = useRef(0);
  const hasSyncedRef = useRef(false);
  const serverUnavailableRef = useRef(false); // Flag para indicar servidor offline

  /**
   * Verifica status atual das boias no servidor
   * Função RÁPIDA - apenas lê dados, não sincroniza
   */
  const checkBuoyStatus = async (): Promise<{ active: number; lastSync: string | null }> => {
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`;
      
      if (DEBUG) console.log('🔍 PNBOIA: Verificando status...');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        // Se for 500, significa que o Supabase está com problema - retornar silenciosamente
        if (response.status === 500) {
          // Não fazer log para não alarmar o usuário - é uma situação temporária normal
          serverUnavailableRef.current = true;
          return { active: 0, lastSync: null };
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (DEBUG) console.log('📊 PNBOIA:', data.active, '/', data.total, 'boias ativas');
      
      // O endpoint /pnboia/status agora retorna lastGlobalSync
      const lastSync = data.lastGlobalSync || null;
      
      return { active: data.active, lastSync };

    } catch (error) {
      // Servidor indisponível - sistema continua funcionando em modo degradado
      serverUnavailableRef.current = true;
      return { active: 0, lastSync: null };
    }
  };

  /**
   * SINCRONIZA TODAS AS BOIAS AUTOMATICAMENTE
   * Chamado quando não há dados ou a cada 1 hora
   */
  const syncAllBuoys = async (): Promise<boolean> => {
    try {
      console.log('🌊 PNBOIA: Iniciando sincronização automática...');
      console.log('📍 URL:', `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false`);
      setStatus(prev => ({ ...prev, isSyncing: true }));
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=false`;
      
      console.log('📡 Enviando request POST...');
      console.log('⏱️ Timeout configurado: 60 segundos');
      
      // Criar AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.error('⏱️ Timeout! Sincronização demorou mais de 60 segundos');
      }, 60000); // 60 segundos
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      console.log('📥 Response recebido:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        
        // Se for 500, é problema do banco de dados - funcionar em modo degradado
        if (response.status === 500) {
          if (DEBUG) {
            console.log('ℹ️ PNBOIA: Backend indisponível - funcionando apenas com Open-Meteo');
          }
          serverUnavailableRef.current = true;
          setStatus(prev => ({ 
            ...prev, 
            isSyncing: false,
            error: null // Não mostrar erro ao usuário - é temporário
          }));
          return false;
        }
        
        console.error('❌ Resposta de erro:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);
      console.log(`✅ Sincronização concluída: ${data.summary.success}/${data.summary.total} boias`);
      
      setStatus(prev => ({ ...prev, isSyncing: false }));
      
      // Marcar timestamp de última sincronização global
      const syncKey = 'pnboia:global:last_sync';
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/health`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      
      return data.summary.success > 0;

    } catch (error) {
      console.error('❌ ERRO COMPLETO na sincronização automática:', error);
      
      let errorMessage = 'Erro desconhecido';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Timeout: Sincronização demorou mais de 60 segundos';
          console.error('⏱️ A sincronização está demorando muito. Isso pode acontecer se:');
          console.error('   1. As boias da Marinha estão offline');
          console.error('   2. O servidor Supabase está lento');
          console.error('   3. Sua conexão está instável');
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Não foi possível conectar ao servidor';
          console.error('🌐 Possíveis causas:');
          console.error('   1. Edge Function não está ativo (fazer deploy)');
          console.error('   2. Problemas de rede/CORS');
          console.error('   3. URL do servidor incorreta');
          console.error('');
          console.error('💡 SOLUÇÃO: O sistema continuará funcionando apenas com previsões Open-Meteo');
          console.error('   Os dados PNBOIA não estarão disponíveis até o servidor estar online.');
        } else {
          errorMessage = error.message;
        }
        console.error('❌ Tipo do erro:', errorMessage);
      } else {
        console.error('❌ Erro não identificado:', String(error));
      }
      
      setStatus(prev => ({ 
        ...prev, 
        isSyncing: false,
        error: errorMessage
      }));
      return false;
    }
  };

  useEffect(() => {
    // Prevenir execução duplicada em React Strict Mode
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const initialize = async () => {
      console.log('🌊 PNBOIA: Sistema de monitoramento inicializado');
      console.log('ℹ️ Backend sincroniza automaticamente - Frontend lê instantaneamente');

      // ⚡ IMPORTANTE: "Acordar" o Edge Function fazendo uma chamada
      // Isso garante que o código de auto-sincronização seja executado
      try {
        const wakeupUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/health`;
        console.log('⚡ Acordando Edge Function...');
        await fetch(wakeupUrl, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });
        console.log('✅ Edge Function ativo');
      } catch (e) {
        console.log('⚠️ Erro ao acordar Edge Function (pode já estar ativo)');
      }

      // Aguardar 2 segundos para dar tempo do backend iniciar sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Verificar status inicial (RÁPIDO - só lê)
      const { active, lastSync } = await checkBuoyStatus();
      
      console.log('📊 Status recebido:', { active, lastSync });
      
      setStatus({
        isInitialized: true,
        lastSync,
        isLoading: false,
        isSyncing: false,
        error: null,
        buoysActive: active,
        buoysTotal: 14
      });

      if (active > 0) {
        console.log(`✅ PNBOIA: ${active}/14 boias com dados disponíveis`);
        if (lastSync) {
          const syncDate = new Date(lastSync);
          console.log(`   Última sincronização: ${syncDate.toLocaleString('pt-BR')}`);
        }
        hasSyncedRef.current = true;
      } else {
        // Verificar se servidor está disponível antes de tentar sincronizar
        if (serverUnavailableRef.current) {
          if (DEBUG) {
            console.log('ℹ️ PNBOIA: Backend indisponível - Sistema funcionando apenas com Open-Meteo');
          }
          // Não mostrar erro ao usuário - o sistema continua funcionando
        } else {
          console.log('⚠️ PNBOIA: Nenhum dado encontrado - Iniciando sincronização automática...');
          
          // 🚀 SINCRONIZAÇÃO AUTOMÁTICA se não houver dados
          if (!hasSyncedRef.current) {
            hasSyncedRef.current = true; // Prevenir múltiplas sincronizações simultâneas
            
            // Aguardar 3 segundos antes de sincronizar (dar tempo do servidor despertar)
            setTimeout(async () => {
              console.log('⏱️ Iniciando sincronização em 3...2...1...');
              
              try {
                const success = await syncAllBuoys();
              
                if (success) {
                  console.log('🎉 Sincronização inicial concluída! Aguarde 5s para dados aparecerem...');
                  
                  // Verificar novamente após 5 segundos
                  setTimeout(async () => {
                    const { active: newActive, lastSync: newLastSync } = await checkBuoyStatus();
                    setStatus(prev => ({
                      ...prev,
                      buoysActive: newActive,
                      lastSync: newLastSync
                    }));
                    
                    if (newActive > 0) {
                      console.log(`✅ Sucesso! ${newActive}/14 boias agora estão ativas`);
                    } else {
                      console.log('⚠️ Nenhuma boia ativa após sincronização (podem estar offline)');
                    }
                  }, 5000);
                } else {
                  console.log('⚠️ Sincronização retornou sem dados. Verifique logs acima para detalhes.');
                  setStatus(prev => ({
                    ...prev,
                    error: 'Sincronização concluída mas sem dados disponíveis'
                  }));
                }
              } catch (error) {
                console.error('❌ Exceção durante sincronização automática:', error);
                setStatus(prev => ({
                  ...prev,
                  error: error instanceof Error ? error.message : 'Erro desconhecido na sincronização'
                }));
              }
            }, 3000);
          }
        }
      }
    };

    initialize();

    // ⚡ VERIFICAÇÃO ADAPTATIVA:
    // - Primeiros 2 minutos: verifica a cada 10s (aguardando sincronização inicial do backend)
    // - Depois que dados aparecem: verifica a cada 1 minuto
    const startPeriodicCheck = () => {
      checkIntervalRef.current = window.setInterval(async () => {
        checkCountRef.current++;
        const { active, lastSync } = await checkBuoyStatus();
        
        console.log(`🔄 Check #${checkCountRef.current}: ${active}/14 boias`);
        
        setStatus(prev => ({
          ...prev,
          buoysActive: active,
          lastSync
        }));
        
        // ⚡ Mudar para intervalo normal após dados aparecerem ou após 12 checks (2 minutos)
        if (active > 0 || checkCountRef.current >= 12) {
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
          }
          
          if (active > 0) {
            console.log('✅ Dados detectados! Mudando para verificação normal (1 min)');
          } else {
            console.log('⚠️ 2 minutos sem dados. Backend pode não estar sincronizando.');
            console.log('   Mudando para verificação normal (1 min)');
          }
          
          // Reiniciar com intervalo normal
          checkIntervalRef.current = window.setInterval(async () => {
            const { active, lastSync } = await checkBuoyStatus();
            setStatus(prev => ({
              ...prev,
              buoysActive: active,
              lastSync
            }));
          }, CHECK_INTERVAL_NORMAL);
        }
      }, CHECK_INTERVAL_INITIAL);
    };
    
    startPeriodicCheck();

    // 🔄 SINCRONIZAÇÃO PERIÓDICA AUTOMÁTICA (a cada 1 hora)
    syncIntervalRef.current = window.setInterval(async () => {
      // Se servidor estava indisponível, tentar reconectar
      if (serverUnavailableRef.current) {
        const { active } = await checkBuoyStatus();
        if (active > 0) {
          // Servidor voltou!
          serverUnavailableRef.current = false;
          if (DEBUG) console.log('✅ PNBOIA: Servidor voltou online!');
        }
      }
      
      // Sincronizar se servidor disponível
      if (!serverUnavailableRef.current) {
        if (DEBUG) console.log('🔄 PNBOIA: Sincronização automática programada (3h)...');
        await syncAllBuoys();
      }
      
      // Atualizar status após sincronização
      const { active, lastSync } = await checkBuoyStatus();
      setStatus(prev => ({
        ...prev,
        buoysActive: active,
        lastSync
      }));
    }, AUTO_SYNC_INTERVAL);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, []);

  return status;
}
