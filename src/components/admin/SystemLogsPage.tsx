/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SYSTEM LOGS - LOGS DETALHADOS DE STATUS DAS BOIAS PNBOIA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Mostra histórico completo de quando cada boia ficou:
 * - ✅ ATIVA (dados reais da Marinha)
 * - ⚠️ MOCK (usando dados simulados por falha nas APIs)
 * 
 * Útil para diagnosticar problemas como o do dia 12/11 às 05:20
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RefreshCw, Activity, AlertTriangle, CheckCircle2, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface LogEntry {
  timestamp: string;
  buoyId: string;
  buoyName: string;
  status: 'real_data' | 'mock_data';
  dataSource: 'api' | 'scraping' | 'mock' | 'unknown';
  waveHeight: number;
  isMockData: boolean;
}

interface BuoyStats {
  buoyId: string;
  buoyName: string;
  totalReadings: number;
  realDataCount: number;
  mockDataCount: number;
  lastStatus: string;
  lastTimestamp: string;
}

import { AdminLayout } from './AdminLayout';

export function SystemLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [buoyStats, setBuoyStats] = useState<BuoyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHours, setSelectedHours] = useState('24');
  const [selectedBuoy, setSelectedBuoy] = useState('all');
  const [statistics, setStatistics] = useState({
    totalLogs: 0,
    realDataCount: 0,
    mockDataCount: 0,
    realDataPercentage: 0
  });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/logs?hours=${selectedHours}${selectedBuoy !== 'all' ? `&buoyId=${selectedBuoy}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      setLogs(data.logs || []);
      setBuoyStats(data.byBuoy || []);
      setStatistics(data.statistics || {
        totalLogs: 0,
        realDataCount: 0,
        mockDataCount: 0,
        realDataPercentage: 0
      });
      
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedHours, selectedBuoy]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusBadge = (log: LogEntry) => {
    if (log.isMockData) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          MOCK
        </Badge>
      );
    }
    
    return (
      <Badge variant="default" className="gap-1 bg-green-600">
        <CheckCircle2 className="h-3 w-3" />
        REAL
      </Badge>
    );
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      api: 'bg-blue-600',
      scraping: 'bg-purple-600',
      mock: 'bg-red-600',
      unknown: 'bg-gray-600'
    };
    
    return (
      <Badge variant="secondary" className={colors[source as keyof typeof colors] || 'bg-gray-600'}>
        {source.toUpperCase()}
      </Badge>
    );
  };

  return (
    <AdminLayout currentPage="logs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#001f3d]">System Logs - Status das Boias</h2>
          <p className="text-sm text-gray-600 mt-1">
            Histórico detalhado de quando cada boia estava com dados reais ou simulados
          </p>
        </div>
        
        <Button onClick={fetchLogs} disabled={loading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600 block mb-2">Período</label>
              <Select value={selectedHours} onValueChange={setSelectedHours}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Última 1 hora</SelectItem>
                  <SelectItem value="6">Últimas 6 horas</SelectItem>
                  <SelectItem value="12">Últimas 12 horas</SelectItem>
                  <SelectItem value="24">Últimas 24 horas</SelectItem>
                  <SelectItem value="48">Últimos 2 dias</SelectItem>
                  <SelectItem value="168">Última semana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-600 block mb-2">Boia</label>
              <Select value={selectedBuoy} onValueChange={setSelectedBuoy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as boias</SelectItem>
                  <SelectItem value="pnboia-florianopolis">Florianópolis</SelectItem>
                  <SelectItem value="pnboia-itajai">Itajaí</SelectItem>
                  <SelectItem value="pnboia-rio-grande">Rio Grande</SelectItem>
                  <SelectItem value="pnboia-santos">Santos</SelectItem>
                  <SelectItem value="pnboia-rio-de-janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="pnboia-arraial-do-cabo">Arraial do Cabo</SelectItem>
                  <SelectItem value="pnboia-vitoria">Vitória</SelectItem>
                  <SelectItem value="pnboia-salvador">Salvador</SelectItem>
                  <SelectItem value="pnboia-ilheus">Ilhéus</SelectItem>
                  <SelectItem value="pnboia-recife">Recife</SelectItem>
                  <SelectItem value="pnboia-natal">Natal</SelectItem>
                  <SelectItem value="pnboia-fortaleza">Fortaleza</SelectItem>
                  <SelectItem value="pnboia-sao-luis">São Luís</SelectItem>
                  <SelectItem value="pnboia-santarem">Santarém</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Leituras</p>
                <p className="text-2xl text-[#001f3d]">{statistics.totalLogs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Dados Reais</p>
                <p className="text-2xl text-green-600">{statistics.realDataCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Dados MOCK</p>
                <p className="text-2xl text-red-600">{statistics.mockDataCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Taxa de Sucesso</p>
                <p className="text-2xl text-blue-600">{statistics.realDataPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Boia */}
      <Card>
        <CardHeader>
          <CardTitle>Status por Boia</CardTitle>
          <CardDescription>Resumo de cada boia no período selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buoyStats.map((stat) => {
              const successRate = stat.totalReadings > 0 
                ? Math.round((stat.realDataCount / stat.totalReadings) * 100) 
                : 0;
              
              return (
                <div key={stat.buoyId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-[#001f3d]">{stat.buoyName}</p>
                    <p className="text-xs text-gray-500">{stat.buoyId}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Total</p>
                      <p className="text-sm text-[#001f3d]">{stat.totalReadings}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Reais</p>
                      <p className="text-sm text-green-600">{stat.realDataCount}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Mock</p>
                      <p className="text-sm text-red-600">{stat.mockDataCount}</p>
                    </div>
                    
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs text-gray-600">Taxa</p>
                      <p className={`text-sm ${successRate >= 80 ? 'text-green-600' : successRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {successRate}%
                      </p>
                    </div>
                    
                    <div className="text-right min-w-[120px]">
                      <p className="text-xs text-gray-600">Última leitura</p>
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(stat.lastTimestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Timeline de Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline de Eventos</CardTitle>
          <CardDescription>
            Histórico cronológico de todas as sincronizações ({logs.length} registros)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {logs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {loading ? 'Carregando logs...' : 'Nenhum log encontrado para o período selecionado'}
                </div>
              ) : (
                logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 p-3 rounded-lg border ${
                      log.isMockData ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="w-32 text-xs text-gray-600 flex-shrink-0">
                      {formatTimestamp(log.timestamp)}
                    </div>
                    
                    <div className="flex-1 min-w-[150px]">
                      <p className="text-sm text-[#001f3d]">{log.buoyName}</p>
                      <p className="text-xs text-gray-500">{log.buoyId}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(log)}
                      {getSourceBadge(log.dataSource)}
                    </div>
                    
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm text-[#001f3d]">{log.waveHeight.toFixed(2)}m</p>
                      <p className="text-xs text-gray-500">Hs</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      </div>
    </AdminLayout>
  );
}
