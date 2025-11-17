import React from 'react';
import { AdminLayout } from './AdminLayout';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Minus, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export function CalibrationAnalysisPage() {
  // ═══════════════════════════════════════════════════════════════════════════
  // 📊 DADOS REAIS PASSADOS PELO USUÁRIO
  // ═══════════════════════════════════════════════════════════════════════════
  
  const spots = [
    {
      name: 'Morro das Pedras',
      id: 'sc-floripa-morropedras-1',
      offshore: 1.43, // API pura (calculada de forecast/multiplier)
      multiplierOld: 0.84,
      forecastOld: 1.2, // O que mostrava antes
      multiplierNew: 0.96,
      forecastNew: 1.54, // O que mostra agora
      observedReal: 1.5, // O que realmente era
      characteristics: {
        orientation: 'Sul/Sudeste',
        exposure: 'Praia aberta',
        bathymetry: 'Areia fina com pedras',
        protection: 'Baixa'
      },
      notes: 'Subestimava ondas de Sul/SE em ~20%. Ajuste aplicado manualmente.'
    },
    {
      name: 'Novo Campeche',
      id: 'sc-floripa-campeche-1',
      offshore: 1.61, // API pura
      multiplierOld: 0.62,
      forecastOld: 1.0,
      multiplierNew: 0.62, // Não mudou
      forecastNew: 1.0,
      observedReal: 1.0,
      characteristics: {
        orientation: 'Leste/Nordeste',
        exposure: 'Praia muito aberta',
        bathymetry: 'Areia',
        protection: 'Nenhuma'
      },
      notes: 'Previsão já estava precisa. Não necessitou ajuste.'
    }
  ];
  
  return (
    <AdminLayout currentPage="analysis">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📊 Análise de Calibração</h1>
        <p className="text-gray-500 mt-2">
          Comparativo detalhado: Offshore → Previsão → Realidade
        </p>
      </div>
      
      {/* Cards de análise para cada pico */}
      <div className="space-y-6">
        {spots.map((spot) => {
          const errorOld = ((spot.forecastOld - spot.observedReal) / spot.observedReal) * 100;
          const errorNew = ((spot.forecastNew - spot.observedReal) / spot.observedReal) * 100;
          const improvement = Math.abs(errorOld) - Math.abs(errorNew);
          const needsAdjustment = Math.abs(errorOld) > 5;
          
          return (
            <Card key={spot.id} className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{spot.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">ID: {spot.id}</p>
                </div>
                
                {needsAdjustment ? (
                  <Badge variant="default" className="text-lg px-4 py-2">
                    ✅ Calibrado (+{improvement.toFixed(0)}% precisão)
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    ✨ Já estava preciso
                  </Badge>
                )}
              </div>
              
              {/* Fluxo de dados */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Offshore */}
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      🌊 OFFSHORE (API pura)
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {spot.offshore.toFixed(2)}m
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Open-Meteo Marine
                    </div>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-gray-400 hidden md:block" />
                  
                  {/* Previsão ANTES */}
                  {needsAdjustment && (
                    <>
                      <div className="flex-1 text-center">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          📉 ANTES (fator {spot.multiplierOld})
                        </div>
                        <div className="text-3xl font-bold text-red-600">
                          {spot.forecastOld.toFixed(2)}m
                        </div>
                        <div className="text-xs text-red-400 mt-1">
                          Erro: {errorOld.toFixed(0)}%
                        </div>
                      </div>
                      
                      <ArrowRight className="w-8 h-8 text-gray-400 hidden md:block" />
                    </>
                  )}
                  
                  {/* Previsão DEPOIS */}
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      📈 {needsAdjustment ? 'DEPOIS' : 'PREVISÃO'} (fator {spot.multiplierNew})
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {spot.forecastNew.toFixed(2)}m
                    </div>
                    <div className="text-xs text-blue-400 mt-1">
                      Erro: {errorNew.toFixed(0)}%
                    </div>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-gray-400 hidden md:block" />
                  
                  {/* Real */}
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      👁️ REAL OBSERVADO
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      {spot.observedReal.toFixed(2)}m
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      Confirmado 10/11/2025
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cálculos detalhados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Ajuste aplicado */}
                {needsAdjustment && (
                  <Card className="p-4 bg-orange-50 border-orange-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      Ajuste Aplicado
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Multiplicador antigo:</span>
                        <span className="font-mono font-semibold">{spot.multiplierOld}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Multiplicador novo:</span>
                        <span className="font-mono font-semibold text-green-600">{spot.multiplierNew}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Correção necessária:</span>
                        <span className="font-mono font-semibold text-orange-600">
                          +{((spot.multiplierNew / spot.multiplierOld - 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-orange-300 pt-2 mt-2">
                        <span className="text-gray-600">Melhoria:</span>
                        <span className="font-mono font-semibold text-green-600">
                          {improvement.toFixed(0)}% mais preciso
                        </span>
                      </div>
                    </div>
                  </Card>
                )}
                
                {/* Características do pico */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    Características do Pico
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Orientação:</span>
                      <span className="font-semibold">{spot.characteristics.orientation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exposição:</span>
                      <span className="font-semibold">{spot.characteristics.exposure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batimetria:</span>
                      <span className="font-semibold">{spot.characteristics.bathymetry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proteção:</span>
                      <span className="font-semibold">{spot.characteristics.protection}</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Notas */}
              <Card className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-2">📝 Observações</h3>
                <p className="text-sm text-gray-700">{spot.notes}</p>
              </Card>
            </Card>
          );
        })}
      </div>
      
      {/* Recomendações */}
      <Card className="p-6 mt-8 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Próximos Passos</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Coletar mais observações</h3>
              <p className="text-sm text-gray-600">
                Registre 10-20 sessões em diferentes condições (swell variado, marés diferentes)
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Identificar padrões</h3>
              <p className="text-sm text-gray-600">
                Ex: "Praias abertas ao Sul precisam +15% em swells de SE"
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Replicar com cautela</h3>
              <p className="text-sm text-gray-600">
                Só aplicar ajustes semelhantes após validar em múltiplos picos similares
              </p>
            </div>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
}
