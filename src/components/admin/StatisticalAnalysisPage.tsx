/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANÁLISE ESTATÍSTICA - PADRÕES DE ERRO E CORREÇÃO DE EMERGÊNCIA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Analisa observações reais vs previsões para descobrir padrões de erro:
 * - Erro médio por horário do dia
 * - Erro médio quando PNBOIA está ativa vs offline
 * - Tabela de correção de emergência baseada em dados reais
 * 
 * Essa análise gera os fatores de correção que são aplicados automaticamente
 * quando as boias PNBOIA estão offline.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { RefreshCw, TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { AdminLayout } from './AdminLayout';

interface ErrorPattern {
  hour: number;
  avgError: number;
  count: number;
  avgPredicted: number;
  avgObserved: number;
  correctionFactor: number;
}

interface PNBOIAComparison {
  withPNBOIA: {
    count: number;
    avgError: number;
    avgAbsError: number;
  };
  withoutPNBOIA: {
    count: number;
    avgError: number;
    avgAbsError: number;
  };
}

export function StatisticalAnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [errorByHour, setErrorByHour] = useState<ErrorPattern[]>([]);
  const [pnboiaComparison, setPNBOIAComparison] = useState<PNBOIAComparison | null>(null);
  const [emergencyCorrectionTable, setEmergencyCorrectionTable] = useState<any[]>([]);
  const [totalObservations, setTotalObservations] = useState(0);

  const analyzeObservations = async () => {
    setLoading(true);
    try {
      // Buscar todas as observações
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/observations/all`;
      
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
      const observations = data.observations || [];
      
      setTotalObservations(observations.length);

      // Análise 1: Erro por horário do dia
      const hourlyData: Record<number, { predictions: number[], observed: number[], count: number }> = {};
      
      // Análise 2: Comparação com/sem PNBOIA
      let withPNBOIA = { predictions: [] as number[], observed: [] as number[], count: 0 };
      let withoutPNBOIA = { predictions: [] as number[], observed: [] as number[], count: 0 };

      observations.forEach((obs: any) => {
        const hour = new Date(obs.timestamp).getHours();
        const predicted = obs.forecastHeight;
        const observed = obs.observedHeight;
        const hasPNBOIA = obs.pnboiaStatus !== 'N/A' && obs.pnboiaStatus !== null;

        // Ignorar observações sem dados válidos
        if (!predicted || !observed || predicted <= 0 || observed <= 0) return;

        // Agrupar por hora
        if (!hourlyData[hour]) {
          hourlyData[hour] = { predictions: [], observed: [], count: 0 };
        }
        hourlyData[hour].predictions.push(predicted);
        hourlyData[hour].observed.push(observed);
        hourlyData[hour].count++;

        // Separar por status PNBOIA
        if (hasPNBOIA) {
          withPNBOIA.predictions.push(predicted);
          withPNBOIA.observed.push(observed);
          withPNBOIA.count++;
        } else {
          withoutPNBOIA.predictions.push(predicted);
          withoutPNBOIA.observed.push(observed);
          withoutPNBOIA.count++;
        }
      });

      // Calcular estatísticas por hora
      const hourlyPatterns: ErrorPattern[] = [];
      for (let hour = 0; hour < 24; hour++) {
        if (hourlyData[hour] && hourlyData[hour].count > 0) {
          const data = hourlyData[hour];
          const avgPredicted = data.predictions.reduce((a, b) => a + b, 0) / data.count;
          const avgObserved = data.observed.reduce((a, b) => a + b, 0) / data.count;
          const avgError = ((avgPredicted - avgObserved) / avgObserved) * 100;
          const correctionFactor = avgObserved / avgPredicted;

          hourlyPatterns.push({
            hour,
            avgError,
            count: data.count,
            avgPredicted,
            avgObserved,
            correctionFactor
          });
        }
      }

      setErrorByHour(hourlyPatterns);

      // Calcular comparação PNBOIA
      const calcStats = (predictions: number[], observed: number[], count: number) => {
        if (count === 0) return { count: 0, avgError: 0, avgAbsError: 0 };
        
        const errors = predictions.map((p, i) => ((p - observed[i]) / observed[i]) * 100);
        const avgError = errors.reduce((a, b) => a + b, 0) / count;
        const avgAbsError = errors.map(e => Math.abs(e)).reduce((a, b) => a + b, 0) / count;
        
        return { count, avgError, avgAbsError };
      };

      setPNBOIAComparison({
        withPNBOIA: calcStats(withPNBOIA.predictions, withPNBOIA.observed, withPNBOIA.count),
        withoutPNBOIA: calcStats(withoutPNBOIA.predictions, withoutPNBOIA.observed, withoutPNBOIA.count)
      });

      // Gerar tabela de correção de emergência
      const emergencyTable = [];
      
      // Por blocos de 6 horas
      for (let startHour = 0; startHour < 24; startHour += 6) {
        const endHour = startHour + 6;
        const hoursInBlock = hourlyPatterns.filter(p => p.hour >= startHour && p.hour < endHour);
        
        if (hoursInBlock.length > 0) {
          const avgFactor = hoursInBlock.reduce((sum, h) => sum + h.correctionFactor, 0) / hoursInBlock.length;
          const totalCount = hoursInBlock.reduce((sum, h) => sum + h.count, 0);
          const avgError = hoursInBlock.reduce((sum, h) => sum + h.avgError, 0) / hoursInBlock.length;
          
          emergencyTable.push({
            timeBlock: `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00`,
            correctionFactor: avgFactor,
            observations: totalCount,
            avgError,
            recommendation: avgFactor < 0.7 ? 'Alta correção' : avgFactor < 0.85 ? 'Média correção' : 'Baixa correção'
          });
        }
      }

      setEmergencyCorrectionTable(emergencyTable);

    } catch (error) {
      console.error('Erro ao analisar observações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeObservations();
  }, []);

  return (
    <AdminLayout currentPage="statistics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#001f3d]">Análise Estatística</h2>
          <p className="text-sm text-gray-600 mt-1">
            Padrões de erro e correção automática baseada em {totalObservations} observações reais
          </p>
        </div>
        
        <Button onClick={analyzeObservations} disabled={loading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Recalcular
        </Button>
      </div>

      {/* Comparação PNBOIA */}
      {pnboiaComparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Com PNBOIA Ativa
              </CardTitle>
              <CardDescription>Quando boias estão enviando dados reais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Observações</p>
                  <p className="text-3xl text-[#001f3d]">{pnboiaComparison.withPNBOIA.count}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Erro Médio</p>
                  <p className={`text-2xl ${Math.abs(pnboiaComparison.withPNBOIA.avgError) < 20 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {pnboiaComparison.withPNBOIA.avgError > 0 ? '+' : ''}{pnboiaComparison.withPNBOIA.avgError.toFixed(1)}%
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Erro Absoluto Médio</p>
                  <p className="text-2xl text-blue-600">
                    {pnboiaComparison.withPNBOIA.avgAbsError.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Sem PNBOIA (Offline)
              </CardTitle>
              <CardDescription>Quando boias estão offline ou usando mock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Observações</p>
                  <p className="text-3xl text-[#001f3d]">{pnboiaComparison.withoutPNBOIA.count}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Erro Médio</p>
                  <p className={`text-2xl ${Math.abs(pnboiaComparison.withoutPNBOIA.avgError) < 20 ? 'text-green-600' : Math.abs(pnboiaComparison.withoutPNBOIA.avgError) < 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {pnboiaComparison.withoutPNBOIA.avgError > 0 ? '+' : ''}{pnboiaComparison.withoutPNBOIA.avgError.toFixed(1)}%
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Erro Absoluto Médio</p>
                  <p className="text-2xl text-blue-600">
                    {pnboiaComparison.withoutPNBOIA.avgAbsError.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gráfico de Erro por Horário */}
      <Card>
        <CardHeader>
          <CardTitle>Erro Médio por Horário do Dia</CardTitle>
          <CardDescription>
            Padrão de superestimação/subestimação ao longo do dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={errorByHour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                label={{ value: 'Hora do Dia', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Erro Médio (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: any) => `${value.toFixed(1)}%`}
                labelFormatter={(hour) => `${hour}:00`}
              />
              <Legend />
              <Bar 
                dataKey="avgError" 
                fill="#001f3d" 
                name="Erro Médio (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Fator de Correção */}
      <Card>
        <CardHeader>
          <CardTitle>Fator de Correção por Horário</CardTitle>
          <CardDescription>
            Multiplicador sugerido para ajustar previsões (1.0 = perfeito, &lt;1.0 = reduzir, &gt;1.0 = aumentar)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={errorByHour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                label={{ value: 'Hora do Dia', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                domain={[0.5, 1.2]}
                label={{ value: 'Fator de Correção', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: any) => value.toFixed(3)}
                labelFormatter={(hour) => `${hour}:00`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="correctionFactor" 
                stroke="#ffc72c" 
                strokeWidth={3}
                name="Fator de Correção"
                dot={{ fill: '#001f3d', r: 4 }}
              />
              {/* Linha de referência em 1.0 */}
              <Line 
                type="monotone" 
                dataKey={() => 1.0} 
                stroke="#ccc" 
                strokeDasharray="5 5"
                name="Ideal (1.0)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabela de Correção de Emergência */}
      <Card>
        <CardHeader>
          <CardTitle>Tabela de Correção de Emergência</CardTitle>
          <CardDescription>
            Fatores de correção aplicados automaticamente quando PNBOIA está offline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyCorrectionTable.map((row, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex-1">
                  <p className="text-[#001f3d]">{row.timeBlock}</p>
                  <p className="text-xs text-gray-500">{row.observations} observações</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Erro Médio</p>
                    <p className={`text-sm ${Math.abs(row.avgError) < 20 ? 'text-green-600' : Math.abs(row.avgError) < 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {row.avgError > 0 ? '+' : ''}{row.avgError.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Fator de Correção</p>
                    <p className="text-lg text-[#001f3d]">
                      {row.correctionFactor.toFixed(3)}x
                    </p>
                  </div>
                  
                  <Badge 
                    variant={
                      row.recommendation === 'Alta correção' ? 'destructive' :
                      row.recommendation === 'Média correção' ? 'default' :
                      'secondary'
                    }
                  >
                    {row.recommendation}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>Como funciona:</strong> Quando as boias PNBOIA estão offline, o sistema aplica automaticamente
              estes fatores de correção baseados em análise de dados históricos reais. Por exemplo, se o Open-Meteo
              prevê 1.5m às 05:00 e o fator é 0.65x, a previsão ajustada será 0.98m (mais próximo da realidade).
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </AdminLayout>
  );
}
