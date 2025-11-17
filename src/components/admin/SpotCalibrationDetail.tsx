import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { observationLog, getObservationsBySpot } from '../../data/calibration/observationLog';
import { calculateSpotConfidence } from '../../data/calibration/confidenceLevels';

interface SpotCalibrationDetailProps {
  spotId: string;
  spotName: string;
  onBack: () => void;
}

export function SpotCalibrationDetail({ spotId, spotName, onBack }: SpotCalibrationDetailProps) {
  const [observations, setObservations] = useState(getObservationsBySpot(spotId));
  
  useEffect(() => {
    setObservations(getObservationsBySpot(spotId));
  }, [spotId]);
  
  const confidence = calculateSpotConfidence(spotId, observations);
  
  // Calcular erro médio
  const avgError = observations.reduce((sum, o) => sum + o.error, 0) / Math.max(observations.length, 1);
  const avgAbsError = observations.reduce((sum, o) => sum + Math.abs(o.error), 0) / Math.max(observations.length, 1);
  
  return (
    <AdminLayout currentPage="observations">
      {/* Header */}
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{spotName}</h1>
            <p className="text-gray-500 mt-1">Detalhes de calibração</p>
          </div>
          
          <Badge 
            variant={
              confidence.overall === 'high' ? 'default' :
              confidence.overall === 'medium' ? 'secondary' : 'outline'
            }
            className="text-lg px-4 py-2"
          >
            {confidence.overall === 'high' ? '✅ Alta Confiança' :
             confidence.overall === 'medium' ? '⚠️ Média Confiança' : 
             '❌ Baixa Confiança'}
          </Badge>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-sm text-gray-500">Total de Observações</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{observations.length}</p>
        </Card>
        
        <Card className="p-6">
          <p className="text-sm text-gray-500">Erro Médio</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-3xl font-bold text-gray-900">{avgError.toFixed(1)}%</p>
            {avgError > 0 ? (
              <TrendingUp className="w-6 h-6 text-red-500" />
            ) : avgError < 0 ? (
              <TrendingDown className="w-6 h-6 text-green-500" />
            ) : (
              <Minus className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {avgError > 0 ? 'Superestimando' : avgError < 0 ? 'Subestimando' : 'Exato'}
          </p>
        </Card>
        
        <Card className="p-6">
          <p className="text-sm text-gray-500">Erro Absoluto</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{avgAbsError.toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">Média de desvio</p>
        </Card>
      </div>
      
      {/* Observations by Direction */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📐 Calibração por Direção</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(confidence.byDirection).map(([key, data]) => (
            <Card key={key} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{key}</h3>
                <Badge variant={
                  data.confidence === 'high' ? 'default' :
                  data.confidence === 'medium' ? 'secondary' : 'outline'
                }>
                  {data.observations} obs
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Erro médio: <span className="font-semibold">{data.averageError.toFixed(1)}%</span>
              </p>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Observations List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Histórico de Observações</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offshore</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Previsto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Real</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Erro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contexto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {observations.slice().reverse().map(obs => (
                  <tr key={obs.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{new Date(obs.timestamp).toLocaleDateString('pt-BR')}</div>
                      <div className="text-gray-500 text-xs">{obs.context.sessionTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{obs.offshore.height.toFixed(1)}m</div>
                      <div className="text-xs">{obs.offshore.period}s {obs.offshore.directionLabel}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {obs.forecast.height.toFixed(2)}m
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {obs.observed.height.toFixed(2)}m
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={Math.abs(obs.error) < 10 ? 'default' : 'destructive'}>
                        {obs.error > 0 ? '+' : ''}{obs.error.toFixed(0)}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>Maré: {obs.context.tide === 'low' ? 'Baixa' : obs.context.tide === 'mid' ? 'Média' : 'Alta'}</div>
                      {obs.context.wind && <div className="text-xs">{obs.context.wind}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
