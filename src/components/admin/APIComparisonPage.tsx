import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BarChart, TrendingUp, TrendingDown, RefreshCw, Trophy, Activity } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Comparison {
  id: string;
  timestamp: string;
  spotId: string;
  spotName: string;
  observedWaveHeight: number;
  openMeteo: {
    forecast: number;
    error: number;
    errorPercent: number;
  };
  stormglass: {
    forecast: number;
    error: number;
    errorPercent: number;
    quotaUsed: number;
    quotaRemaining: number;
  };
  winner: 'open-meteo' | 'stormglass';
}

interface Statistics {
  totalComparisons: number;
  validComparisons: number;
  openMeteo: {
    wins: number;
    winRate: string;
    avgError: string;
  };
  stormglass: {
    wins: number;
    winRate: string;
    avgError: string;
  };
  quota: {
    used: number;
    remaining: number;
    total: number;
  } | null;
}

export function APIComparisonPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [history, setHistory] = useState<Comparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/api-comparison/history`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setStatistics(data.statistics);
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Erro ao carregar comparações:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout currentPage="api-comparison">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-gray-600">Carregando comparações...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  const quotaPercent = statistics?.quota ? 
    (statistics.quota.used / statistics.quota.total * 100).toFixed(0) : null;
  
  const openMeteoWinRate = parseFloat(statistics?.openMeteo.winRate || '0');
  const stormglassWinRate = parseFloat(statistics?.stormglass.winRate || '0');
  
  return (
    <AdminLayout currentPage="api-comparison">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🧪 Comparação de APIs</h1>
            <p className="text-gray-500 mt-1">
              Teste científico: Open-Meteo vs Stormglass
            </p>
          </div>
          
          <Button onClick={loadData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Comparações */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Comparações</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics?.totalComparisons || 0}
                </p>
              </div>
              <BarChart className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          
          {/* Quota Stormglass */}
          {statistics?.quota && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Quota Stormglass</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.quota.used}/{statistics.quota.total}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        parseInt(quotaPercent!) > 80 ? 'bg-red-600' :
                        parseInt(quotaPercent!) > 50 ? 'bg-yellow-600' :
                        'bg-green-600'
                      }`}
                      style={{ width: `${quotaPercent}%` }}
                    />
                  </div>
                </div>
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </Card>
          )}
          
          {/* Erro Médio Open-Meteo */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Erro Médio Open-Meteo</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics?.openMeteo.avgError}%
                </p>
                <Badge className="mt-1 bg-blue-100 text-blue-800">
                  {statistics?.openMeteo.wins} vitórias
                </Badge>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          
          {/* Erro Médio Stormglass */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Erro Médio Stormglass</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics?.stormglass.avgError}%
                </p>
                <Badge className="mt-1 bg-purple-100 text-purple-800">
                  {statistics?.stormglass.wins} vitórias
                </Badge>
              </div>
              <TrendingDown className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>
        
        {/* Comparação Visual */}
        {statistics && statistics.validComparisons > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">🏆 Performance Comparativa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Open-Meteo */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-600">Open-Meteo</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {statistics.openMeteo.winRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    className="bg-blue-600 h-8 rounded-full flex items-center justify-end pr-2 text-white text-sm font-semibold"
                    style={{ width: `${statistics.openMeteo.winRate}%` }}
                  >
                    {statistics.openMeteo.wins} vitórias
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Erro médio: {statistics.openMeteo.avgError}%
                </p>
              </div>
              
              {/* Stormglass */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-purple-600">Stormglass</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {statistics.stormglass.winRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    className="bg-purple-600 h-8 rounded-full flex items-center justify-end pr-2 text-white text-sm font-semibold"
                    style={{ width: `${statistics.stormglass.winRate}%` }}
                  >
                    {statistics.stormglass.wins} vitórias
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Erro médio: {statistics.stormglass.avgError}%
                </p>
              </div>
            </div>
            
            {/* Conclusão */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">💡 Análise:</h3>
              {openMeteoWinRate > stormglassWinRate ? (
                <p className="text-gray-700">
                  <strong>Open-Meteo está vencendo</strong> com {statistics.openMeteo.winRate}% de taxa de vitória. 
                  A diferença de erro médio é de {Math.abs(parseFloat(statistics.openMeteo.avgError) - parseFloat(statistics.stormglass.avgError)).toFixed(1)}%.
                  {parseFloat(statistics.openMeteo.avgError) < parseFloat(statistics.stormglass.avgError) * 0.5 && (
                    <span className="block mt-1 text-green-700">
                      ✅ <strong>Conclusão:</strong> Continuar com Open-Meteo (grátis) é a melhor escolha!
                    </span>
                  )}
                </p>
              ) : stormglassWinRate > openMeteoWinRate ? (
                <p className="text-gray-700">
                  <strong>Stormglass está vencendo</strong> com {statistics.stormglass.winRate}% de taxa de vitória.
                  A diferença de erro médio é de {Math.abs(parseFloat(statistics.openMeteo.avgError) - parseFloat(statistics.stormglass.avgError)).toFixed(1)}%.
                  {parseFloat(statistics.stormglass.avgError) < parseFloat(statistics.openMeteo.avgError) * 0.7 && (
                    <span className="block mt-1 text-purple-700">
                      💰 <strong>Conclusão:</strong> Stormglass vale o investimento de R$ 270/mês se você monetizar o site!
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-gray-700">
                  <strong>Empate técnico!</strong> Ambas as APIs têm performance similar.
                  Continue coletando mais observações para ter uma análise mais conclusiva.
                </p>
              )}
            </div>
          </Card>
        )}
      </div>
      
      {/* Histórico de Comparações */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">📋 Histórico de Comparações</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BarChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma comparação realizada ainda</p>
            <p className="text-sm mt-1">
              Adicione observações no painel "Observações" para começar a comparar
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Data</th>
                  <th className="text-left py-3 px-2">Pico</th>
                  <th className="text-right py-3 px-2">Observado</th>
                  <th className="text-right py-3 px-2">Open-Meteo</th>
                  <th className="text-right py-3 px-2">Stormglass</th>
                  <th className="text-center py-3 px-2">Vencedor</th>
                </tr>
              </thead>
              <tbody>
                {history.map((comp) => (
                  <tr key={comp.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">
                      {new Date(comp.timestamp).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-2 text-sm font-medium">
                      {comp.spotName}
                    </td>
                    <td className="py-3 px-2 text-right font-bold">
                      {comp.observedWaveHeight.toFixed(2)}m
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="text-sm">
                        {comp.openMeteo.forecast?.toFixed(2)}m
                      </div>
                      <Badge 
                        className={`text-xs ${
                          comp.openMeteo.errorPercent < 20 ? 'bg-green-100 text-green-800' :
                          comp.openMeteo.errorPercent < 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {comp.openMeteo.errorPercent?.toFixed(0)}% erro
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="text-sm">
                        {comp.stormglass.forecast?.toFixed(2)}m
                      </div>
                      <Badge 
                        className={`text-xs ${
                          comp.stormglass.errorPercent < 20 ? 'bg-green-100 text-green-800' :
                          comp.stormglass.errorPercent < 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {comp.stormglass.errorPercent?.toFixed(0)}% erro
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {comp.winner === 'open-meteo' ? (
                        <Trophy className="w-5 h-5 inline text-blue-600" />
                      ) : (
                        <Trophy className="w-5 h-5 inline text-purple-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      
      {/* Instruções */}
      <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Como funciona</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Cada vez que você adiciona uma <strong>observação real</strong>, o sistema automaticamente compara Open-Meteo vs Stormglass</li>
          <li>• Stormglass tem limite de <strong>10 requests/dia</strong> no trial (depois $49/mês)</li>
          <li>• Com 10-15 observações você terá dados sólidos para decidir se vale pagar</li>
          <li>• API vencedora = menor erro percentual em relação à onda real observada</li>
        </ul>
      </Card>
    </AdminLayout>
  );
}
