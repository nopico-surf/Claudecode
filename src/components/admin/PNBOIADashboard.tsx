/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DASHBOARD PNBOIA - ADMINISTRAÇÃO E MONITORAMENTO DE BOIAS
 * ═══════════════════════════════════════════════════════════════════════════
 * v2.0 - Tabs customizadas padronizadas (identidade visual WSL)
 * 
 * Dashboard completo para monitorar e gerenciar o sistema PNBOIA:
 * - Status de todas as 14 boias em tempo real
 * - Histórico de sincronizações
 * - Estatísticas de bias corrections
 * - Forçar sincronização manual
 * - Gráficos de precisão e desempenho
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  RefreshCw, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Waves,
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { usePNBOIAAutoSync } from '../../hooks/usePNBOIAAutoSync';

// ========================================
// TIPOS
// ========================================

interface BuoyStatus {
  buoyId: string;
  hasData: boolean;
  lastSync: string;
  status: 'active' | 'stale' | 'no_data';
  dataAgeMinutes: number | null;
  isFresh: boolean;
}

interface SystemStatus {
  status: string;
  buoys: BuoyStatus[];
  total: number;
  active: number;
  stale: number;
  offline: number;
  lastGlobalSync: string | null;
}

interface BuoyReading {
  buoyId: string;
  buoyName: string;
  waveHeight: number;
  wavePeriod: number;
  waveDirection: number;
  windSpeed: number;
  windDirection: number;
  waterTemp: number;
  timestamp: string;
  source: string;
}

interface Statistics {
  summary: {
    totalBuoys: number;
    activeBuoys: number;
    offlineBuoys: number;
    totalBiasCorrections: number;
    spotsWithCorrections: number;
  };
  buoys: Array<{
    buoyId: string;
    hasData: boolean;
    readingsCount: number;
    lastSync: string | null;
  }>;
  biasCorrections: Array<{
    spotId: string;
    correctionsCount: number;
    lastCorrection: any;
  }>;
}

// ========================================
// MAPEAMENTO DE BOIAS
// ========================================

const BUOY_NAMES: Record<string, { name: string; location: string }> = {
  'pnboia-rio-grande': { name: 'Rio Grande', location: 'RS' },
  'pnboia-florianopolis': { name: 'Florianópolis', location: 'SC' },
  'pnboia-itajai': { name: 'Itajaí', location: 'SC' },
  'pnboia-santos': { name: 'Santos', location: 'SP' },
  'pnboia-rio-de-janeiro': { name: 'Rio de Janeiro', location: 'RJ' },
  'pnboia-arraial-do-cabo': { name: 'Arraial do Cabo', location: 'RJ' },
  'pnboia-vitoria': { name: 'Vitória', location: 'ES' },
  'pnboia-salvador': { name: 'Salvador', location: 'BA' },
  'pnboia-ilheus': { name: 'Ilhéus', location: 'BA' },
  'pnboia-recife': { name: 'Recife', location: 'PE' },
  'pnboia-natal': { name: 'Natal', location: 'RN' },
  'pnboia-fortaleza': { name: 'Fortaleza', location: 'CE' },
  'pnboia-sao-luis': { name: 'São Luís', location: 'MA' },
  'pnboia-santarem': { name: 'Santarém', location: 'PA' }
};

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export function PNBOIADashboard() {
  // 🚀 Hook de sincronização automática
  const autoSyncStatus = usePNBOIAAutoSync();
  
  const [activeTab, setActiveTab] = useState<'status' | 'data' | 'stats'>('status');
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [buoyData, setBuoyData] = useState<BuoyReading[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // CARREGAR DADOS
  // ========================================

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔍 PNBOIA Dashboard: Iniciando carregamento de dados...');
      console.log('📡 ProjectId:', projectId);
      console.log('🔑 PublicAnonKey (primeiros 20 chars):', publicAnonKey.substring(0, 20));
      
      // 1. Status das boias
      const statusUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`;
      console.log('📍 Status URL:', statusUrl);
      
      const statusResponse = await fetch(statusUrl, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      console.log('📊 Status Response:', statusResponse.status, statusResponse.statusText);
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log('✅ Status Data:', statusData);
        setSystemStatus(statusData);
      } else {
        const errorText = await statusResponse.text();
        console.error('❌ Status Error:', statusResponse.status, errorText);
      }

      // 2. Dados das boias
      const dataUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/data`;
      console.log('📍 Data URL:', dataUrl);
      
      const dataResponse = await fetch(dataUrl, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      console.log('📊 Data Response:', dataResponse.status, dataResponse.statusText);
      
      if (dataResponse.ok) {
        const dataJson = await dataResponse.json();
        console.log('✅ Data JSON:', dataJson);
        setBuoyData(dataJson.buoys || []);
      } else {
        const errorText = await dataResponse.text();
        console.error('❌ Data Error:', dataResponse.status, errorText);
      }

      // 3. Estatísticas
      const statsUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/statistics`;
      console.log('📍 Statistics URL:', statsUrl);
      
      const statsResponse = await fetch(statsUrl, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      console.log('📊 Statistics Response:', statsResponse.status, statsResponse.statusText);
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        console.log('✅ Statistics Data:', statsData);
        setStatistics(statsData);
      } else {
        const errorText = await statsResponse.text();
        console.error('❌ Statistics Error:', statsResponse.status, errorText);
      }

      setLastUpdate(new Date());
      console.log('🎉 PNBOIA Dashboard: Carregamento concluído!');
      
    } catch (err: any) {
      console.error('💥 Erro ao carregar dados PNBOIA:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================
  // FORÇAR SINCRONIZAÇÃO
  // ========================================

  const forceSyncAll = async () => {
    setIsSyncing(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erro na sincronização: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Sincronização completa:', result);
      
      // Aguardar 2 segundos e recarregar dados
      setTimeout(loadData, 2000);
      
    } catch (err: any) {
      console.error('Erro ao sincronizar:', err);
      setError(err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // ========================================
  // CARREGAR NA INICIALIZAÇÃO
  // ========================================

  useEffect(() => {
    console.log('%c🌊 PNBOIA DASHBOARD MONTADO', 'background: #001f3d; color: #ffc72c; font-size: 16px; padding: 8px;');
    console.log('Para testar manualmente os endpoints, cole no console:');
    console.log(`fetch('https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status', {headers: {'Authorization': 'Bearer ${publicAnonKey}'}}).then(r=>r.json()).then(d=>console.log('✅ Status:', d))`);
    
    loadData();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(loadData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  const getStatusBadge = (status: string, isFresh: boolean) => {
    if (status === 'active' && isFresh) {
      return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Ativo</Badge>;
    } else if (status === 'stale') {
      return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Antigo</Badge>;
    } else {
      return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Offline</Badge>;
    }
  };

  const formatAge = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return `${hours}h ${mins}min`;
    }
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp || timestamp === 'Nunca') return 'Nunca';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return timestamp;
    }
  };

  // ========================================
  // RENDERIZAÇÃO
  // ========================================

  if (isLoading && !systemStatus) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span>Carregando dados PNBOIA...</span>
      </div>
    );
  }

  return (
    <AdminLayout currentPage="pnboia">
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 mb-2">
            <Waves className="w-6 h-6" />
            Dashboard PNBOIA
          </h1>
          <p className="text-muted-foreground">
            Monitoramento de boias e bias corrections em tempo real
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right text-sm text-muted-foreground">
            <div>Última atualização:</div>
            <div>{lastUpdate.toLocaleTimeString('pt-BR')}</div>
          </div>
          
          <Button 
            onClick={loadData} 
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <Button 
            onClick={forceSyncAll}
            disabled={isSyncing}
            size="sm"
          >
            <Activity className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Sincronizando...' : 'Sincronizar Todas'}
          </Button>
        </div>
      </div>

      {/* INDICADOR DE SINCRONIZAÇÃO AUTOMÁTICA */}
      {autoSyncStatus.isSyncing && (
        <Card className="bg-blue-50 border-2 border-blue-400">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <div>
                <p className="font-semibold text-blue-900">
                  🌊 Sincronização automática em andamento...
                </p>
                <p className="text-sm text-blue-700">
                  Carregando dados das 14 boias PNBOIA. Isso pode levar até 60 segundos.
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  ℹ️ Aguarde sem recarregar a página...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* ERRO NA SINCRONIZAÇÃO AUTOMÁTICA */}
      {autoSyncStatus.error && !autoSyncStatus.isSyncing && (
        <Card className="bg-orange-50 border-2 border-orange-400">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-semibold text-orange-900">
                  ⚠️ Erro na Sincronização Automática
                </p>
                <p className="text-sm text-orange-700 mt-1">
                  {autoSyncStatus.error}
                </p>
                <p className="text-xs text-orange-600 mt-2">
                  💡 Você pode tentar sincronizar manualmente usando o botão abaixo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>Erro: {error}</span>
        </div>
      )}

      {/* DEBUG INFO */}
      {!systemStatus && !isLoading && !autoSyncStatus.isSyncing && (
        <Card className="bg-yellow-50 border-2 border-yellow-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <AlertCircle className="w-5 h-5" />
              Aguardando Sincronização Automática
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-yellow-800">
              O sistema está inicializando. A sincronização automática será iniciada em alguns segundos.
            </p>
            <p className="text-sm text-yellow-700">
              ⏱️ Se após 30 segundos nada acontecer, você pode forçar manualmente:
            </p>
            <Button 
              onClick={forceSyncAll} 
              disabled={isSyncing}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 mr-2" />
                  Sincronizar Boias Agora
                </>
              )}
            </Button>
            <p className="text-xs text-yellow-600 mt-2">
              ⏱️ A primeira sincronização pode levar até 30 segundos
            </p>
            
            <Separator className="my-3" />
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-yellow-900">
                🧪 Testar servidor (cole no console F12):
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
                {`fetch('https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/test', {headers: {'Authorization': 'Bearer ${publicAnonKey}'}}).then(r=>r.json()).then(d=>console.log('✅', d))`}
              </div>
              <p className="text-xs text-yellow-600">
                Se retornar <code className="bg-yellow-200 px-1 rounded">"status": "ok"</code> = servidor funcionando! 
                Clique em "Sincronizar Boias Agora" acima.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CARDS DE RESUMO */}
      {systemStatus && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total de Boias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl">{systemStatus.total}</span>
                <span className="text-muted-foreground text-sm">boias</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-green-600">{systemStatus.active}</span>
                <span className="text-muted-foreground text-sm">
                  ({Math.round((systemStatus.active / systemStatus.total) * 100)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-1">
                <Clock className="w-4 h-4 text-yellow-500" />
                Dados Antigos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-yellow-600">{systemStatus.stale}</span>
                <span className="text-muted-foreground text-sm">boias</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-gray-400" />
                Offline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-gray-400">{systemStatus.offline}</span>
                <span className="text-muted-foreground text-sm">boias</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 🔍 RESUMO REAL vs MOCK */}
      {buoyData.length > 0 && (
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              🔍 Qualidade dos Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {buoyData.filter((b: any) => b.isMockData === false).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Dados Reais (API/Scraping)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">
                    {buoyData.filter((b: any) => b.isMockData === true).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Dados Mockados (Fallback)</div>
                </div>
              </div>
            </div>
            {buoyData.filter((b: any) => b.isMockData === true).length > 0 && (
              <div className="mt-3 p-3 bg-blue-100 border border-blue-300 rounded-md">
                <p className="text-sm text-blue-800">
                  ⚠️ <strong>Atenção:</strong> Algumas boias estão usando dados mockados porque as APIs PNBOIA estão offline ou falharam no último sync.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TABS */}
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-2 p-2 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('status')}
            style={{
              backgroundColor: activeTab === 'status' ? '#001f3d' : '#e5e7eb',
              color: activeTab === 'status' ? '#ffc72c' : '#6b7280',
              border: activeTab === 'status' ? '2px solid #ffc72c' : '1px solid #d1d5db',
              fontWeight: activeTab === 'status' ? '600' : '500',
              padding: '10px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Status das Boias
          </button>
          <button
            onClick={() => setActiveTab('data')}
            style={{
              backgroundColor: activeTab === 'data' ? '#001f3d' : '#e5e7eb',
              color: activeTab === 'data' ? '#ffc72c' : '#6b7280',
              border: activeTab === 'data' ? '2px solid #ffc72c' : '1px solid #d1d5db',
              fontWeight: activeTab === 'data' ? '600' : '500',
              padding: '10px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Dados Atuais
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            style={{
              backgroundColor: activeTab === 'stats' ? '#001f3d' : '#e5e7eb',
              color: activeTab === 'stats' ? '#ffc72c' : '#6b7280',
              border: activeTab === 'stats' ? '2px solid #ffc72c' : '1px solid #d1d5db',
              fontWeight: activeTab === 'stats' ? '600' : '500',
              padding: '10px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Estatísticas
          </button>
        </div>

        {/* TAB: STATUS DAS BOIAS */}
        {activeTab === 'status' && <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status de Todas as Boias</CardTitle>
              <CardDescription>
                {systemStatus?.lastGlobalSync 
                  ? `Última sincronização global: ${formatTimestamp(systemStatus.lastGlobalSync)}`
                  : 'Aguardando primeira sincronização'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {systemStatus && systemStatus.buoys.length > 0 ? (
                <div className="space-y-3">
                  {systemStatus.buoys.map((buoy) => {
                    const info = BUOY_NAMES[buoy.buoyId];
                    
                    return (
                      <div 
                        key={buoy.buoyId}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div>{info?.name || buoy.buoyId}</div>
                            <div className="text-sm text-muted-foreground">{info?.location}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right text-sm">
                            <div className="text-muted-foreground">Idade dos dados</div>
                            <div>{formatAge(buoy.dataAgeMinutes)}</div>
                          </div>
                          
                          <div className="text-right text-sm min-w-[120px]">
                            <div className="text-muted-foreground">Última sync</div>
                            <div>{formatTimestamp(buoy.lastSync)}</div>
                          </div>
                          
                          {getStatusBadge(buoy.status, buoy.isFresh)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Nenhum dado disponível. Clique em "Sincronizar Todas" para começar.
                </div>
              )}
            </CardContent>
          </Card>
        </div>}

        {/* TAB: DADOS ATUAIS */}
        {activeTab === 'data' && <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados Oceanográficos Atuais</CardTitle>
              <CardDescription>
                Últimas medições das boias ativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {buoyData.length > 0 ? (
                <div className="space-y-4">
                  {buoyData.map((reading) => {
                    const info = BUOY_NAMES[reading.buoyId];
                    
                    return (
                      <div 
                        key={reading.buoyId}
                        className="p-4 border rounded-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{info?.name || reading.buoyName}</span>
                              {/* 🔍 INDICADOR REAL vs MOCK */}
                              {(reading as any).isMockData === true ? (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                                  ⚡ MOCK
                                </Badge>
                              ) : (reading as any).isMockData === false ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                                  ✅ REAL
                                </Badge>
                              ) : null}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatTimestamp(reading.timestamp)}
                              {/* Mostrar fonte dos dados */}
                              {(reading as any).dataSource && (
                                <span className="ml-2 text-xs">
                                  (fonte: {(reading as any).dataSource})
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline">{info?.location}</Badge>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Altura (Hs)</div>
                            <div className="text-lg">{reading.waveHeight.toFixed(2)}m</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Período (Tp)</div>
                            <div className="text-lg">{reading.wavePeriod.toFixed(1)}s</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Direção</div>
                            <div className="text-lg">{reading.waveDirection}°</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Temp. Água</div>
                            <div className="text-lg">{reading.waterTemp.toFixed(1)}°C</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Nenhuma boia com dados disponíveis no momento.
                </div>
              )}
            </CardContent>
          </Card>
        </div>}

        {/* TAB: ESTATÍSTICAS */}
        {activeTab === 'stats' && <div className="space-y-4">
          {statistics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Bias Corrections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de correções:</span>
                      <span>{statistics.summary.totalBiasCorrections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Picos calibrados:</span>
                      <span>{statistics.summary.spotsWithCorrections}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance do Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de sucesso:</span>
                      <span className="text-green-600">
                        {Math.round((statistics.summary.activeBuoys / statistics.summary.totalBuoys) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Boias operacionais:</span>
                      <span>{statistics.summary.activeBuoys}/{statistics.summary.totalBuoys}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {statistics.biasCorrections.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Picos com Bias Corrections</CardTitle>
                    <CardDescription>
                      Picos que estão usando dados de boias para calibração
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {statistics.biasCorrections.map((spot) => (
                        <div 
                          key={spot.spotId}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <div>{spot.spotId}</div>
                            <div className="text-sm text-muted-foreground">
                              {spot.correctionsCount} correç{spot.correctionsCount === 1 ? 'ão' : 'ões'}
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {spot.correctionsCount}× calibrado
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* 🧠 CARD DE APRENDIZADO POR BOIA */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🧠</span>
                    Aprendizado por Boia
                  </CardTitle>
                  <CardDescription>
                    Progresso da calibração automática com dados das boias PNBOIA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statistics?.buoys && statistics.buoys.filter(b => b.hasData).slice(0, 5).map((buoy) => {
                      const buoyInfo = BUOY_NAMES[buoy.buoyId] || { name: buoy.buoyId, location: '' };
                      const readingsCount = buoy.readingsCount || 0;
                      const confidencePercent = Math.min((readingsCount / 10) * 100, 100);
                      const confidenceLevel = readingsCount >= 10 ? 'high' : readingsCount >= 5 ? 'medium' : 'low';
                      
                      return (
                        <div key={buoy.buoyId} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-medium text-gray-900">
                                🌊 {buoyInfo.name}
                              </p>
                              <p className="text-xs text-gray-500">{buoyInfo.location}</p>
                            </div>
                            <Badge variant={
                              confidenceLevel === 'high' ? 'default' :
                              confidenceLevel === 'medium' ? 'secondary' :
                              'outline'
                            }>
                              {confidenceLevel === 'high' ? '🟢 Alta' :
                               confidenceLevel === 'medium' ? '🟡 Média' : '🔴 Baixa'}
                            </Badge>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Progresso</span>
                              <span>{readingsCount}/10 obs mínimas</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  confidenceLevel === 'high' ? 'bg-green-500' :
                                  confidenceLevel === 'medium' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${confidencePercent}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 mt-2">
                            {readingsCount === 0 ? (
                              <p>💡 Aguardando primeira leitura da boia</p>
                            ) : readingsCount < 5 ? (
                              <p>💡 Adicione mais {5 - readingsCount} observações próximas</p>
                            ) : readingsCount < 10 ? (
                              <p>⚡ Quase lá! Faltam {10 - readingsCount} observações</p>
                            ) : (
                              <p>✅ Calibração completa! Sistema aprendendo automaticamente.</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {(!statistics?.buoys || statistics.buoys.filter(b => b.hasData).length === 0) && (
                      <div className="text-center py-6 text-gray-500">
                        <p className="mb-2">Nenhuma boia com dados ainda</p>
                        <p className="text-sm text-gray-400">Aguarde a próxima sincronização</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center text-muted-foreground py-8">
                Carregando estatísticas...
              </CardContent>
            </Card>
          )}
        </div>}
      </div>
    </div>
    </AdminLayout>
  );
}
